# Setting up an Azure Blob Connector


This article helps you build and ingest a dataset from a Microsoft Azure Blob using the ACP Azure Blob Connector from the Adobe Cloud Platform (ACP). 

* Create Catalog Account Entity  
* Create Catalog Connection Entity
* Create Catalog Dataset Entity

The customer needs to understand the availability of the ingested data, the source schema. The platform needs to have a record of the data ingested and source schema to help build the ETL template.

Adobe connectors provide two ways that data can be ingested into a dataset. 

* Use the Batch Ingestion API batch ingestion of delimited files. See  [batch ingestion via file upload](./alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md). 

* Ingest files by setting up a connector. The following steps show you how to ingest CRM data using the ACP Azure Blob Connector.




## Step One: Create a Dataset
Instructions to create and populate a dataset from a file can be found [here](./alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md).

Adobe connectors provide two ways that data can be ingested into a dataset: 

* Use the [Batch Ingestion via file upload](./alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md) to 

The second way is to ingest files by setting up a connector. The following steps show you how to ingest CRM data using the ACP Azure Blob Connector.



## stuff
Work to move the connector from POC phase to complete, allowing a customer user to upload a file (via drag-and-drop and CLI upload) to Azure Blob Store. Refer PLAT-801

Finalization of requirements and workflow
Coordination with Siphon team on file layout
Implementation and related tests
Provisioning of other objects (storage containers, Azure functions, Notification Hub?)
Story: Allow a customer to upload a csv file to their Azure blob container and have a record of this ingestion and schema for further reference thru the pipeline.

Business Value: The customer needs to understand the availability of the ingested data, the source schema. The platform needs to have a record of the data ingested and source schema to help build the ETL template.

Acceptance Criteria:
1. Ability to register the schema of the incoming file
2. Ability to register the metadata associated with the file: DataSetName,UserID,IMSOrg, ConnectionParameters
3. Platform engineer should be able to get the details of the file ingested thru an API Call to catalog.









## Datasets from a Schema


### 2.1. Prerequisites

Follow this [guide](./alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for authorization to make API calls.

After setting up authorization, you should now have the following values:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.


To set up the ACP Azure Blob Connector, you will also need the following Azure Blob credentials:

* `{Azure Blob_USER_NAME}`: Your Azure Blob CRM user name
* `{Azure Blob_PASSWORD}`: Your Azure Blob CRM password
* `{Azure Blob_SECURITY_TOKEN}`: Your Azure Blob security token. This can be found following these steps:  
  1. Go to https://developer.Azure Blob.com/
  2. Log in using your Azure Blob CRM credentials
  3. Click on top right user avatar and select "Settings" link
  4. Now in the "Personal Information" view click on "Reset My Security Token"
  5. You will receive a new security token via email.

With the above values we can move on to the next section:

### 2.2. Ingesting Data from Azure Blob Connector<a name="2_3_Header"></a>

Now you will go through the API request steps required to set up a Azure Blob connector to trigger data ingestion daily. The Azure Blob CRM object used will be the `Account` object.

#### 2.2.1. Create Catalog Account Entity

First you will create a Azure Blob CRM catalog account entity. This request takes a Azure Blob User Name, Azure Blob Password, and Azure Blob Security Token. The response contains the account ID.

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
    "username": "{Azure Blob_USER_NAME}",
    "password": {
      "value": "{Azure Blob_PASSWORD}",
      "isSecret": true
    },
    "securityToken": {
      "value": "{Azure Blob_SECURITY_TOKEN}",
      "isSecret": true
    },
    "serviceUrl": "login.Azure Blob.com"
  },
  "connector": "Azure Blob"
}'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{Azure Blob_USER_NAME}`: Your username for Azure Blob CRM.  
`{Azure Blob_PASSWORD}`: Your password for Azure Blob CRM.  
`{Azure Blob_SECURITY_TOKEN}`: Your security token for Azure Blob CRM.  

#### Response
```JSON
[
  "@/accounts/{ACCOUNT_ID}"
]
```

`{ACCOUNT_ID}`: Copy this account ID. You will use this value in future steps by referring to it as {ACCOUNT_ID}.

#### 2.2.2. Create Catalog Connection Entity

With an account ID, you can now create a Azure Blob Catalog connection entity. In this request you will identify when the ingestion starts (`"ingestStart"`), and the frequency for ingestion to occur (`"frequency"`). 

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
      "connector": "Azure Blob",
      "accountId": "{ACCOUNT_ID}"
    }'
```

`{API_KEY}`: Specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Azure Blob credentials  
`{CONNECTION_NAME}`: Name of the connection you are creating.  
`{INGEST_START}`: Date and time when ingestion is scheduled to start. If time is set to the past (relative to current time) ingestion will begin immediately. Format is `"yyyy-mm-ddThh:mm:ss.000Z"` (E.g. `"2018-03-22T23:59:59.000Z"`)  

#### Response
```JSON
[
    "@/connections/{CONNECTION_ID}"
]
```

`{CONNECTION_ID}`: ID of the connector you just created. We will refer to this as {CONNECTION_ID} in future steps.

#### 2.2.3. Get Azure Blob CRM Selected Object

Next select what Azure Blob CRM object to ingest. You can get the entire list of available objects from the Azure Blob CRM connection using the following request.

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
`{ACCOUNT_ID}`: Account ID generated from your Azure Blob credentials  
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

The above object is just a partial response of the actual list of available Azure Blob CRM objects. Note that the `logicalName` of the objects you want to use. This will be used as the {OBJECT_ID}

The next step will be ingesting fields from the `Account` object. However first you need to determine which fields you want from the object. 

For example, you can return the following response to see all fields for a specific Azure Blob CRM object.

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
`{ACCOUNT_ID}`: Account ID generated from your Azure Blob credentials.  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.  
`{OBJECT_ID}`: Logical Name of the Azure Blob Object you want to ingest.  

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

The last step is to create the Azure Blob CRM dataset catalog entity. The dataset will define the structure of the data to be ingested from the connection.

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
`{ACCOUNT_ID}`: Account ID generated from your Azure Blob credentials.  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.  
`{OBJECT_ID}`: Logical Name of the Azure Blob Object you want to ingest.  

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
      "connectorId": "Azure Blob",
      "requestStartDate": "2018-02-14 16:06:44",
      "status": "enabled",
      "aspect": "production"
    }
```

The `{JSON PAYLOAD}` used is the subset of the object fields you selected from the previous response to get all fields for the `Account` Azure Blob CRM object. This defines the fields populated by the connector on a recurring frequency (such as Account Name, Account Site, System Modstamp, etc.).


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

