# Salesforce Connector for Adobe Experience Platform

The Salesforce Connector for Adobe Experience Platform provides an API and wizard to ingest your Salesforce CRM data onto Adobe Experience Platform. The Salesforce connector allows you to:   

* Authenticate to your Salesforce account.
* Select one or more datasets from a list of available datasets.
* Preview a sample of your data for accuracy.
* Identify each dataset as a lookup file, event, or record.
* Set a schedule and frequency for uploading data.
* Save the Salesforce connector and modify it as needed.

This article provides steps to set up and configure the Salesforce connector through API calls.  

## Setting up the Salesforce Connector
Set up an account to access APIs and provide credentials to create a connector:  

<!---### Prerequisites
* Register the schema of the incoming file.
* Register the metadata associated with the file, such as *DataSetName*, *UserID*, *IMSOrg*, and *ConnectionParameters*.
* Get the details of the file ingested using an API call to the Catalog API.--->

### Set up an Adobe I/O account
See [authenticating and accessing APIs](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) to  create an access token used to authenticate API calls from Adobe I/O.

After setting up authorization for APIs, these values will be returned:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.


### Set up a Platform connection to Salesforce

You will need the following credentials:

* `{SALESFORCE_USER_NAME}`: Your Salesforce CRM user name
* `{SALESFORCE_PASSWORD}`: Your Salesforce CRM password
* `{SALESFORCE_SECURITY_TOKEN}`: Your Salesforce security token can be found following these steps:  
  1. Go to `https://developer.salesforce.com/`.
  2. Log in using your Salesforce CRM credentials.
  3. Select the user and select the *Settings* link.
  4. In the *Personal Information* view, select *Reset My Security Token*. You will receive a new security token via email.

With authorization to make API calls from the Adobe I/O Gateway and your Salesforce credentials, your next step is to generate a dataset from Salesforce objects. 

## Setting up the Salesforce Connector

Follow these steps to create a dataset from Salesforce and set up a connector to trigger a daily ingestion.  The Salesforce `Account` object is used in the example.

### Creating a dataset from a Salesforce Object

#### 1. Create a Catalog Account entity

First, you need to request a Salesforce CRM catalog account entity. This request requires your Salesforce User Name, Salesforce Password, and Salesforce Security Token. The response to this request includes the Salesforce *Account ID*.

##### Request
POST /connections

```SHELL
curl -X POST https://platform.adobe.io/data/foundation/catalog/accounts/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' \
  -d '{
  "params": {
    "username": "{SALESFORCE_USER_NAME}",
    "password": {
      "value": "{SALESFORCE_PASSWORD}",
      "isSecret": true
    },
    "securityToken": {
      "value": "{SALESFORCE_SECURITY_TOKEN}",
      "isSecret": true
    },
    "serviceUrl": "login.salesforce.com"
  },
  "connector": "salesforce"
}'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{SALESFORCE_USER_NAME}`: Your username for Salesforce CRM.  
`{SALESFORCE_PASSWORD}`: Your password for Salesforce CRM.  
`{SALESFORCE_SECURITY_TOKEN}`: Your security token for Salesforce CRM.  

##### Response
```JSON
[
  "@/accounts/{ACCOUNT_ID}"
]
```

`{ACCOUNT_ID}`: Copy this account ID. You will use this value in future steps.

#### 2. Create a Catalog Connection entity

With an account ID, you can now create a Salesforce Catalog connection entity. In this request, you will identify when the ingestion starts (`ingestStart`), and the frequency for ingestion to occur (`frequency`). 

In the example request, you will enter the default value for daily ingestion and its frequency.

##### Request
POST /connections

```SHELL
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
      "connector": "salesforce",
      "accountId": "{ACCOUNT_ID}"
    }'
```

`{API_KEY}`: Specific API key value found in your unique Adobe Experience Platform integration.  
`{IMG_ORG}`: IMS org credentials found in your unique Adobe Experience Platform integration.  
`{ACCESS_TOKEN}`: Specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials  
`{CONNECTION_NAME}`: Name of the connection you are creating.  
`{INGEST_START}`: Date and time when ingestion is scheduled to start. If time is set to the past (relative to current time) ingestion will begin immediately. Format is `"yyyy-mm-ddThh:mm:ss.000Z"` (E.g. `"2018-03-22T23:59:59.000Z"`)  

##### Response
```JSON
[
    "@/connections/{CONNECTION_ID}"
]
```

`{CONNECTION_ID}`: ID of the connector you just created. We will refer to this as {CONNECTION_ID} in future steps.

#### 3. Select a Salesforce object

Next, select a Salesforce object to ingest. You can get the entire list of available objects from the Salesforce connector using the following request.

##### Request
GET /connectors/connections/{CONNECTION_ID}/objects

```SHELL
curl -X GET https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' 
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.

##### Response
```JSON
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

NOTE: The above object is just a partial response of the actual list of available Salesforce CRM objects. Note that the `logicalName` of the objects is used as the `{OBJECT_ID}`.

#### Ingesting selected fields from the Salesforce object
You can ingest select fields from the `Account` object, but first you need to determine which fields you want from the object. For example, you can get all of the fields for a specific Salesforce CRM object.

##### Request
POST /connectors/connections/{CONNECTION_ID}/object/{OBJECT_ID}/fields

```SHELL
curl -X GET https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects/{{OBJECT_ID}}/fields \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials.  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.  
`{OBJECT_ID}`: Logical Name of the Salesforce Object you want to ingest.  

##### Response  

```JSON
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

NOTE: The above request is only a segment of the actual response.
You can choose to have all the fields of an object ingested or only select the fields you are interested in. Here is an example of identifying fields in a request:

#### 4. Create a Dataset Catalog entity
The last step is to create the Catalog dataset entity. The dataset will define the structure of the data to be ingested from the connector.

##### Request
POST /datasets

```SHELL
curl -X POST https://platform.adobe.io/data/foundation/catalog/datasets/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' \
  -d '{JSON_PAYLOAD}'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials.  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.  
`{OBJECT_ID}`: Logical Name of the Salesforce Object you want to ingest.  

`{JSON_PAYLOAD}`: This is the dataset to be posted. 

```JSON
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
    "connectorId": "salesforce",
    "requestStartDate": "2018-02-14 16:06:44",
    "status": "enabled",
    "aspect": "production"
}
```

The `{JSON PAYLOAD}` used is the subset of the object fields you selected from the previous response to get all fields for the `Account` Salesforce CRM object. This defines the fields populated by the connector on a recurring frequency (such as Account Name, Account Site, System Modstamp, etc.).

The field `"requestStartDate"` dictates how far in the past (relative to now) the back-fill will go. The `"requestStartDate"` field is always a date in the past. If you want a back-fill of 30 days, then you have to calculate `now() - 30 days` and enter a valid date and time value for this field.

The `"connectors-saveStrategy"` field refers to how the data will be ingested. In this example, the Append option was used instead of the Delta or Overwrite options. 

Append and Delta options are sorted by time, requiring you to select a time-based property to order the data, such as `System Modstamp`, `Created Date`, or `Last Modified Date`. 

Adding a `"delta": {}` in the `"meta"` field indicates the method selected is to be in the time-based column. In the example, the tag into the `"SystemModstamp"` object for the `"JSON_PAYLOAD"` was passed back to the request.

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

`{DATASET_ID}`: The ID of the dataset that was created. This can be used to make a request to Catalog to identify the DatasetView ID associated with this dataset.

<!---## Viewing Data in the Connector Wizard
(under construction)--->

