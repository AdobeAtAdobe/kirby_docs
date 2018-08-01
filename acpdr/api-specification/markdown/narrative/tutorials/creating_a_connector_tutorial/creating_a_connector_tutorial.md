# Setting up a Connector Tutorial

## 1. Objective

Create and populate a dataset using the a connector in the Adobe Cloud Platform (ACP). 

* Create Catalog Account Entity  
* Create Catalog Connection Entity
* Create Catalog Dataset Entity

Instructions to create and populate a dataset from a file can be found [here](./alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md).

### 1.1. Audience
This article helps you understand the Adobe Cloud Platform and integrate the platform using a connector. Users of this document include data engineers, data architects, data scientists, and app developers using Adobe I/O who want to perform Adobe Cloud Platform API calls.

### 1.2. Version Information
*Version* : Preview

### 1.3. License Information
Terms of service : https://www.adobe.com/legal/terms.html


### 1.4 URI Scheme
*Host* : __platform.adobe.io__  
*Schemes* : __HTTPS__

---

## 2. Datasets from a Schema

There are two ways data can be ingested into a dataset. The first is [batch ingestion via file upload](./alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md) and the second is ingestion via setting up a connector. The following steps show you how to ingest CRM data using the ACP Salesforce Connector.

For instructions on setting up other connectors, see

* [Amazon S3 Connector](./alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_connector_tutorial/ACP_s3_connector_tutorial.md)
* [Azure Blob Connector](./alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_connector_tutorial/ACP_azure_blob_connector_tutorial.md)
* [Microsoft Dynamics Connector](./alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_connector_tutorial/ACP_dynamic_connector_tutorial.md)



### 2.1. Prerequisites

Follow this [guide](./alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for authorization to make API calls.

After setting up authorization, you should now have the following values:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.


To set up the ACP Salesforce Connector, you will also need the following Salesforce credentials:

* `{SALESFORCE_USER_NAME}`: Your Salesforce CRM user name
* `{SALESFORCE_PASSWORD}`: Your Salesforce CRM password
* `{SALESFORCE_SECURITY_TOKEN}`: Your Salesforce security token. This can be found following these steps:  
  1. Go to https://developer.salesforce.com/
  2. Log in using your Salesforce CRM credentials
  3. Click on top right user avatar and select "Settings" link
  4. Now in the "Personal Information" view click on "Reset My Security Token"
  5. You will receive a new security token via email.

With the above values we can move on to the next section:

### 2.2. Ingesting Data from Salesforce Connector<a name="2_3_Header"></a>

Now you will go through the API request steps required to set up a Salesforce connector to trigger data ingestion daily. The Salesforce CRM object used will be the `Account` object.

#### 2.2.1. Create Catalog Account Entity

First you will create a Salesforce CRM catalog account entity. This request takes a Salesforce User Name, Salesforce Password, and Salesforce Security Token. The response contains the account ID.

#### Request
POST /connections

```SHELL
curl -X POST https://platform-int.adobe.io/data/foundation/catalog/accounts/ \
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

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{SALESFORCE_USER_NAME}`: Your username for Salesforce CRM.  
`{SALESFORCE_PASSWORD}`: Your password for Salesforce CRM.  
`{SALESFORCE_SECURITY_TOKEN}`: Your security token for Salesforce CRM.  

#### Response
```JSON
[
  "@/accounts/{ACCOUNT_ID}"
]
```

`{ACCOUNT_ID}`: Copy this account ID. You will use this value in future steps by referring to it as {ACCOUNT_ID}.

#### 2.2.2. Create Catalog Connection Entity

With an account ID, you can now create a Salesforce Catalog connection entity. In this request you will identify when the ingestion starts (`"ingestStart"`), and the frequency for ingestion to occur (`"frequency"`). 

In the following request, you will enter the default value for daily ingestion and its frequency.

#### Request
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

`{API_KEY}`: Specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials  
`{CONNECTION_NAME}`: Name of the connection you are creating.  
`{INGEST_START}`: Date and time when ingestion is scheduled to start. If time is set to the past (relative to current time) ingestion will begin immediately. Format is `"yyyy-mm-ddThh:mm:ss.000Z"` (E.g. `"2018-03-22T23:59:59.000Z"`)  

#### Response
```JSON
[
    "@/connections/{CONNECTION_ID}"
]
```

`{CONNECTION_ID}`: ID of the connector you just created. We will refer to this as {CONNECTION_ID} in future steps.

#### 2.2.3. Get Salesforce CRM Selected Object

Next select what Salesforce CRM object to ingest. You can get the entire list of available objects from the Salesforce CRM connection using the following request.

#### Request
GET /connectors/connections/{CONNECTION_ID}/objects

```SHELL
curl -X GET https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' \
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.

#### Response

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

The above object is just a partial response of the actual list of available Salesforce CRM objects. Note that the `logicalName` of the objects you want to use. This will be used as the {OBJECT_ID}

The next step will be ingesting fields from the `Account` object. However first you need to determine which fields you want from the object. 

For example, you can return the following response to see all fields for a specific Salesforce CRM object.

#### Request
POST /connectors/connections/{CONNECTION_ID}/object/{OBJECT_ID}/fields

```SHELL
curl -X GET https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects/{{OBJECT_ID}}/fields \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials.  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.  
`{OBJECT_ID}`: Logical Name of the Salesforce Object you want to ingest.  

#### Response  

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

Note that the above request is only a segment of the actual response.  

You can choose to have all the fields of an object ingested or only select the fields you are interested in. 

Here is an example of identifying fields in a request.

#### 2.2.4. Create Dataset Catalog Entity

The last step is to create the Salesforce CRM dataset catalog entity. The dataset will define the structure of the data to be ingested from the connection.

#### Request
POST /datasets

```SHELL
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

The `"connectors-saveStrategy"` field refers to how the data will be ingested. In this example, the Append data instead of Delta or Overwrite was used. 

For Append and Delta save strategies, since they are sorted by time, you will also need to decide the value to use in the time-based column if time-based queries take place (such as System Modstamp, Created Date, and Last Modified Date). 

Adding a `"delta": {}` in the `"meta"` field indicates the method selected to be in the time-based column. In the example, the tag into the `"SystemModstamp"` object for the `"JSON_PAYLOAD"` was passed back to the request.

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

#### Response

```JSON
[
    ["@/dataSets/{DATASET_ID}"]
]
```

`{DATASET_ID}`: The ID of the dataset that was created. This can be used in the future to make a request to Catalog to identify the DatasetView ID associated with this dataset.
