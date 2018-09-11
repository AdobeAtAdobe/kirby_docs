# Microsoft Dynamics Connector for Adobe Cloud Platform

The Microsoft Dynamics Connector for Adobe Cloud Platform provides an API and wizard to ingest your Microsoft Dynamics CRM data onto Adobe Cloud Platform (ACP), allowing you to:   

* Authenticate to your Microsoft Dynamics account. 
* Select one or more datasets from a list of available datasets.
* Preview a sample of your data for accuracy.
* Identify each dataset as a lookup file, event, or record.
* Set a schedule and frequency for ingesting data.
* Save the connector and modify it as needed.

This article provides steps to set up and configure the Microsoft Dynamics connector through API calls.  

## Setting up the Microsoft Dynamics Connector
Set up an account to access APIs and provide credentials to create a connector: 


<!---### Prerequisites
* Register the schema of the incoming file.
* Register the metadata associated with the file, such as *DataSetName*, *UserID*, *IMSOrg*, and *ConnectionParameters*.
* Get the details of the file ingested using an API call to the Catalog API.--->

### Set up an Adobe I/O account
See [authenticating and accessing APIs](https://www.adobe.io/apis/cloudplatform/dataservices/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) to  create an access token used to authenticate API calls from Adobe I/O.

After setting up authorization for APIs, these values will be returned:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.

### Set up an ACP connection to Microsoft Dynamics

You will need the following credentials:

* `{MS Dynamic_USER_NAME}`: Your MS Dynamic CRM user name
* `{MS Dynamic_PASSWORD}`: Your MS Dynamic CRM password
* `{MS Dynamic_SECURITY_TOKEN}`: Your MS Dynamic security token. The token can be accessed following these steps:  
  1. Go to *https://developer.MS Dynamic.com*.
  2. Log in using your MS Dynamic CRM credentials.
  3. Click on top-right user avatar and select *Settings*.
  4. In the *Personal Information*, select *Reset My Security Token*.
     You will receive a new security token via email.

With authorization to make API calls from the Adobe I/O Gateway and your Microsoft Dynamics credentials, your next step is to generate a dataset from the Microsoft Dynamics objects. 

## Setting up the Microsoft Dynamics Connector
Follow these steps to create a dataset from Microsoft Dynamics and trigger a daily ingestion. 


#### 1. Create a Catalog Account entity

As a first step, you need to create a Catalog account entity corresponding to your Microsoft Dynamics CRM credentials. This request requires your Microsoft Dynamics user name, password, and security token. The response to this request includes the *Account ID*.

##### Request

```
curl -X POST https://platform.adobe.io/data/foundation/catalog/accounts/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' \
  -d '{
  "params": {
    "organizationName":"<>"
    "username": "<>",
    "password": {
    "value": "<>",
    "isSecret": true
    },
  "organizationUri": "<>"  
  },
  "connector": "dynamics-online"
}'
```
For on premise

```
{
"connector": "dynamics-onprem",
"params": {
"username": "{{DYNAMICS_ONPREM_USERNAME}}",
"hostName": "{{DYNAMICS_ONPREM_HOSTNAME}}",
"organizationName": "{{DYNAMICS_ONPREM_ORGANIZATION_NAME}}",
"password": {
"value": "{{DYNAMICS_ONPREM_PASSWORD}}",
"isSecret": true
}
}
}

```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{MS Dynamic_USER_NAME}`: Your username for MS Dynamic CRM.  
`{MS Dynamic_PASSWORD}`: Your password for MS Dynamic CRM.  
`{MS Dynamic_SECURITY_TOKEN}`: Your security token for MS Dynamic CRM.  

##### Response
```
JSON
[
  "@/accounts/{ACCOUNT_ID}"
]
```

You will use your account ID in future steps and refer to it as `{ACCOUNT_ID}`.

#### 2. Create a Catalog Connection entity

With the `{ACCOUNT_ID}`, you can now create an MS Dynamic Catalog Connection entity. In this request, you identify when you want the ingestion to start (`"ingestStart"`) and what frequency for ingestion to occur (`"frequency"`). The following request defaults to daily ingestion.

##### Request

```
curl -X POST https://platform.adobe.io/data/foundation/catalog/connections/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' \
  -d '{
      "name": "{CONNECTION_NAME}",
      "description": "",
      "ingestStart": "{INGEST_START}",
      "frequency": {
        "timezone": "UTC",
        "month": "*",
        "day": "*",
        "hour": "00",
        "minute": "00",
        "dayOfWeek": "*"
        },
      "connector": "MS Dynamic",
      "accountId": "{ACCOUNT_ID}"
    }'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your MS Dynamic credentials  
`{CONNECTION_NAME}`: Name of the connection you are creating.  
`{INGEST_START}`: Date and time when ingestion is scheduled to start. If time is set to the past (relative to current time) ingestion will begin immediately. Format is `"yyyy-mm-ddThh:mm:ss.000Z"` (E.g. `"2018-03-22T23:59:59.000Z"`)  

##### Response
```
JSON
[
    "@/connections/{CONNECTION_ID}"
]
```

`{CONNECTION_ID}`: ID of the connector you just created. 

#### 3. Select an Microsoft Dynamics Object

Next, select the Microsoft Dynamics CRM object to ingest. You can get the entire list of available objects from the MS Dynamic CRM connection using the following request.

##### Request

```
curl -X GET https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' \
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your MS Dynamic credentials  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.

##### Response

```
JSON
[
    {
        "logicalName": "AcceptedEventRelation",
        "displayName": "Accepted Event Relations"
    },
    {
        "logicalName": "Account",
        "displayName": "Accounts"
    },
    {
        "logicalName": "Contact",
        "displayName": "Contacts"
    },
    {
        "logicalName": "User",
        "displayName": "Users"
    },
      "..."
    {
        "logicalName": "WebLink",
        "displayName": "Custom Buttons or Links"
    }
]
```

The above object is just a partial response of the actual list of available MS Dynamic CRM objects. Note that the `logicalName` of the objects is used as the `{OBJECT_ID}`


The next step will be ingesting fields from the `Account` object. You will need to determine which fields you want from the object and add them to the API call. 

#### To view all fields in an object
Make the following request to see all fields for a specific MS Dynamic object.

##### Request
POST /connectors/connections/{CONNECTION_ID}/object/{OBJECT_ID}/fields

```
SHELL
curl -X GET https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects/{{OBJECT_ID}}/fields \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your MS Dynamic credentials.  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.  
`{OBJECT_ID}`: Logical Name of the MS Dynamic Object you want to ingest.  

##### Response  

```
JSON
[
    {
        "logicalName": "Name",
        "displayName": "Account Name",
        "isPrimaryKey": false,
        "type": "string",
        "meta": {
            "inboundSupported": true,
            "outboundSupported": true,
            "originalType": "string",
            "maxLength": 255,
            "options": null
        }
    },
    {
        "logicalName": "Site",
        "displayName": "Account Site",
        "isPrimaryKey": false,
        "type": "string",
        "meta": {
            "inboundSupported": true,
            "outboundSupported": true,
            "originalType": "string",
            "maxLength": 80,
            "options": null
        }
    },
    {
        "logicalName": "SystemModstamp",
        "displayName": "System Modstamp",
        "isPrimaryKey": false,
        "type": "date",
        "meta": {
            "inboundSupported": true,
            "outboundSupported": true,
            "originalType": "datetime",
            "options": null
        }
    },
      "..."
    {
        "logicalName": "UpsellOpportunity__c",
        "displayName": "Upsell Opportunity",
        "isPrimaryKey": false,
        "type": "string",
        "meta": {
            "inboundSupported": true,
            "outboundSupported": true,
            "originalType": "picklist",
            "maxLength": 255,
            "options": [
                {
                    "value": "Maybe",
                    "label": "Maybe"
                },
                {
                    "value": "No",
                    "label": "No"
                },
                {
                    "value": "Yes",
                    "label": "Yes"
                }
            ]
        }
    }
]
```

Note that the above request is only a segment of the actual response. You can choose to have all the fields of an object ingested or only selected fields. 

#### 4. Create Catalog Dataset Entity

The last step is to create the MS Dynamic Catalog entity. The dataset will define the structure of the data that will be ingested from the connector.

##### Request
```
SHELL
curl -X POST https://platform.adobe.io/data/foundation/catalog/datasets/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG' \
  -H 'Content-Type: application/json' \
  -d '{JSON_PAYLOAD}'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your MS Dynamic credentials.  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.  
`{OBJECT_ID}`: Logical Name of the MS Dynamic Object you want to ingest.  

`{JSON_PAYLOAD}`: The dataset to be posted is a JSON payload as used in this example:

```
JSON
{
      "objectId": "{OBJECT_ID}",
      "name": "Accounts",
      "saveStrategy": "append",
      "connectionId": "{CONNECTION_ID}",
      "tags": {
        "connectors-objectName": [
          "{OBJECT_ID}"
        ],
        "connectors-saveStrategy": [
          "append"
        ]
      },
      "fields": [
        {
            "logicalName": "Name",
            "displayName": "Account Name",
            "isPrimaryKey": false,
            "type": "string",
            "meta": {
                "inboundSupported": true,
                "outboundSupported": true,
                "originalType": "string",
                "maxLength": 255,
                "options": null
            }
        },
        {
            "logicalName": "Site",
            "displayName": "Account Site",
            "isPrimaryKey": false,
            "type": "string",
            "meta": {
                "inboundSupported": true,
                "outboundSupported": true,
                "originalType": "string",
                "maxLength": 80,
                "options": null
            }
        },
        {
            "logicalName": "SystemModstamp",
            "displayName": "System Modstamp",
            "isPrimaryKey": false,
            "type": "date",
            "meta": {
                "inboundSupported": true,
                "outboundSupported": true,
                "originalType": "datetime",
                "options": null,
                "delta": {}
            }
        },
        {
            "logicalName": "UpsellOpportunity__c",
            "displayName": "Upsell Opportunity",
            "isPrimaryKey": false,
            "type": "string",
            "meta": {
                "inboundSupported": true,
                "outboundSupported": true,
                "originalType": "picklist",
                "maxLength": 255,
                "options": [
                    {
                        "value": "Maybe",
                        "label": "Maybe"
                    },
                    {
                        "value": "No",
                        "label": "No"
                    },
                    {
                        "value": "Yes",
                        "label": "Yes"
                    }
                ]
            }
        }
      ],
      "connectorId": "MS Dynamic",
      "requestStartDate": "2018-02-14 16:06:44",
      "status": "enabled",
      "aspect": "production"
    }
```

The `{JSON PAYLOAD}` is the subset of object fields selected from the previous response to get all fields for the `Account` object. This object defines the fields to be populated by the connector on a recurring frequency, such as the account Name, account Site, system modstamp, etc.).


The field `"requestStartDate"` dictates how far in the past (relative to now) the backfill should go. The `"requestStartDate"` parameter is always a date in the past. If you want a backfill of 30 days then you have to calculate `now() - 30 days` and enter a valid date time value for this field.

The `"connectors-saveStrategy"` field refers to how the data will be ingested. In the example, Append data is required instead of a Delta or Overwrite parameter. For Append and Delta save strategies, since they are sorted by time, you will need to decide a value to use in the time-based-column if time-based-queries take place (such as System Modstamp, Created Date, and Last Modified Date). 

Adding a `"delta": {}` in the `"meta"` field indicates the method for the time-based-column. In the example, a tag was added into the `"SystemModstamp"` object for the `"JSON_PAYLOAD"` request.

```JSON
{
  "logicalName": "SystemModstamp",
  "displayName": "System Modstamp",
  "isPrimaryKey": false,
  "type": "date",
  "meta": {
      "inboundSupported": true,
      "outboundSupported": true,
      "originalType": "datetime",
      "options": null,
      "delta": {}
  }
}
```

##### Response

```JSON
[
    ["@/dataSets/{DATASET_ID}"]
]
```

`{DATASET_ID}`: The ID of the dataset that was created. This can be used in the future to make a request to Catalog to identify the DatasetView ID associated with this dataset.

<!---## Viewing Data in the Connector Wizard
(under construction)--->
