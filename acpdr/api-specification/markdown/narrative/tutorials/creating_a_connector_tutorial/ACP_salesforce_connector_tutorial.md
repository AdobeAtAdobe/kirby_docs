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
See [authenticating and accessing APIs](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) to create an access token you can use to authenticate API calls from Adobe I/O.

After you set up authorization for APIs, these values are returned:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.


### Set up a Platform connection to Salesforce

You must have the following credentials:

* `{SALESFORCE_USER_NAME}`: Your Salesforce CRM user name
* `{SALESFORCE_PASSWORD}`: Your Salesforce CRM password
* `{SALESFORCE_SECURITY_TOKEN}`: Find your Salesforce security token by following these steps:
  1. Go to `https://developer.salesforce.com/`.
  2. Log in using your Salesforce CRM credentials.
  3. Select the user and the *Settings* link.
  4. In the *Personal Information* view, select *Reset My Security Token*. You will receive a new security token via email.

After you set up authorization to make API calls from the Adobe I/O Gateway and enter your Salesforce credentials, you create a dataset from Salesforce objects.

## Setting up the Salesforce Connector

Follow these steps to create a dataset from Salesforce and set up a connector to trigger a daily ingestion. The example uses the Salesforce `Account` object.

### Create a dataset from a Salesforce Object

#### 1. Create a Catalog Account entity

First, request a Salesforce CRM catalog account entity. You need your Salesforce User Name, Salesforce Password, and Salesforce Security Token to request a Salesforce CRM catalog acount entity. The response to this request includes the Salesforce *Account ID*.

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

`{ACCOUNT_ID}`: Copy this account ID. Use this value in future steps.

#### 2. Create a Catalog Connection entity

With an account ID, you can create a Salesforce Catalog connection entity. In this request, identify when the ingestion starts (`ingestStart`), and the frequency you want ingestion to occur (`frequency`).

In the example request, enter the default value for daily ingestion and its frequency.

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
`{INGEST_START}`: Date and time when ingestion is scheduled to start. If time is set to the past (relative to current time) ingestion begins immediately. Format is `"yyyy-mm-ddThh:mm:ss.000Z"` (E.g. `"2018-03-22T23:59:59.000Z"`)

##### Response
```JSON
[
    "@/connections/{CONNECTION_ID}"
]
```

`{CONNECTION_ID}`: ID of the connector you created.

#### 3. Select a Salesforce object

Select a Salesforce object to ingest. Use the following request to get a list of all available objects from the Salesforce connector:

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
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials.
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

> **Note:** The return response is a partial list of all available Salesforce CRM objects. Use the `{OBJECT_ID}` as the `logicalName` of the objects.

#### Ingesting selected fields from the Salesforce object

To ingest select fields form the `Account` object:

1. Determine which fields you want from the object. For example, you can request all fields for a specific Salesforce CRM object.

1. Ingest select fields

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
`{OBJECT_ID}`: Logical name of the Salesforce Object you want to ingest.

##### Response

The following code sample displays part of the response you will receive. You can choose to ingest all the fields of an object or only select the fields you are interested in.

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

 Here is an example of identifying fields in a request:

 <!-- Where is the example?-->

#### 4. Create a Dataset Catalog entity
The dataset defines the structure of the data the connector ingests.

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

`{JSON_PAYLOAD}`: The dataset you will post.

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


| Field | Format | Description |
|--- |--- |--- |
|`{JSON PAYLOAD}`|  |Subset of the object fields you selected from the previous response to get all fields for the `Account` Salesforce CRM object. This defines the fields populated by the connector on a recurring frequency (such as Account Name, Account Site, System Modstamp, etc.).|
|`"requestStartDate"`| Date and time |How far in the past (relative to now) the back-fill goes. To back-fill 30 days, enter `now() - 30 days` and the current date and time.|
|`"connectors-saveStrategy"`| | how the data will be ingested. In the example, the Append option was used instead of the Delta or Overwrite options. Append and Delta options are sorted by time, requiring you to select a time-based property to order the data, such as `System Modstamp`, `Created Date`, or `Last Modified Date`. |

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

`{DATASET_ID}`: The ID of the dataset you created. Use `{DATASET_ID}` to make a request to Catalog to identify the DatasetView ID associated with this dataset.

<!---## Viewing Data in the Connector Wizard
(under construction)--->
