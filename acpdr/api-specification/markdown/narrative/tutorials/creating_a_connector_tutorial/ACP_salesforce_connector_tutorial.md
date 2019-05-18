
# Salesforce Connector for Adobe Experience Platform

The Salesforce Connector for Adobe Experience Platform provides an API and wizard to ingest your Salesforce CRM data onto Adobe Experience Platform. The Salesforce connector allows you to:

* Authenticate to your Salesforce account.
* Select one or more datasets from a list of available datasets.
* Preview a sample of your data for accuracy.
* Identify each dataset as a lookup file, event, or record.
* Set a schedule and frequency for uploading data.
* Save the Salesforce connector and modify it as needed.

This article provides steps to set up and configure the Salesforce connector through API calls. For further details you can refer to - [Swagger Documentation](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/partner-connectors-api.yaml)

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


### Set up Platform connection to Salesforce

You will need the following credentials:

* `{SALESFORCE_USER_NAME}`: Your Salesforce CRM user name
* `{SALESFORCE_PASSWORD}`: Your Salesforce CRM password
* `{SALESFORCE_SECURITY_TOKEN}`: Find your Salesforce security token by following these steps:
  1. Go to `https://developer.salesforce.com/`.
  2. Log in using your Salesforce CRM credentials.
  3. Select the user and the *Settings* link.
  4. In the *Personal Information* view, select *Reset My Security Token*. You will receive a new security token via email.

After you set up authorization to make API calls from the Adobe I/O Gateway and enter your Salesforce credentials, you create a dataset from Salesforce objects.

## Setting up the Salesforce Connector

Follow these steps to create a dataset from Salesforce and set up a connector to trigger a one-time or scheduled ingestion. The example uses the Salesforce `Account` object.

### Create a dataset from a Salesforce object

#### Create Account and Connection

First, request a Salesforce CRM account entity. You need your Salesforce User Name, Salesforce Password, and Salesforce Security Token to request a Salesforce CRM account and connection entity. The response to this request includes the Salesforce *Account ID* and *Connection ID* in Catalog.

##### Request

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/account/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Accept: application/vnd.adobe.validCredentials+json;version=2' \
  -d '{
  "type": "salesforce",
  "params": {
    "username": {SALESFORCE_USER_NAME},
    "password": {SALESFORCE_PASSWORD},
    "securityToken": {SALESFORCE_SECURITY_TOKEN}
  }
}'
```
* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
* `{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{SALESFORCE_USER_NAME}`: Your username for Salesforce CRM.
* `{SALESFORCE_PASSWORD}`: Your password for Salesforce CRM.
* `{SALESFORCE_SECURITY_TOKEN}`: Your security token for Salesforce CRM.

##### Response
```javascript
{
    "accountId": {ACCOUNT_ID},
    "connectionId": {CONNECTION_ID}
}
```

* `{ACCOUNT_ID}`: Account ID in catalog.
* `{CONNECTION_ID}`: Connection ID in catalog.

Please note `{ACCOUNT_ID}` and `{CONNECTION_ID}` for further use.

#### Create Custom Schema

For Ingesting data into the platform, data needs to be compliant with a schema. Data Connectors provide POST /schemas API to create custom schema of the data you wish to ingest. This custom schema is called Adhoc schema since it has the capability to not comply with any of the standard XDM models. Please refer to [XDM Schema Registry Guide](https://www.adobe.io/apis/experienceplatform/home/xdm/xdmservices.html#!api-specification/markdown/narrative/technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md) for details on XDM models.

Creating custom schema is a two step process -

1. Selecting desired table to ingest. You can use GET /objects call to list tables.
2. Creating custom schema from table or fields of that table.

##### Creating Custom Schema with table name
Select a Salesforce table to ingest. Use the below request to get a list of tables from the Salesforce connection:

##### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
* `{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{CONNECTION_ID}`: ID of the connector you created from the previous steps.

##### Response
```javascript
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

> **Note: ** The return response is a partial list of all available Salesforce CRM objects. Use the `{OBJECT_ID}` as the `logicalName` of the objects.

Use the `logicalName` of the selected object as `{OBJECT_ID}` to create custom schema in the next step.
Create custom schema from table name:
##### Request

```SHELL
curl -X POST \
  'https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/schemas' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
   "objectName" : {OBJECT_ID}
}'
```
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
* `{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{CONNECTION_ID}`: ID of the connector you created from the previous steps.
* `{OBJECT_ID}`: Logical Name of the Salesforce Object you want to ingest.

##### Response
```javascript
{
    "title": {SCHEMA_TITLE},
    "schemaRef": {
        "id": {SCHEMA_ID},
        "contentType": {SCHEMA_CONTENT_TYPE}
    },
    "namespace": {NAMESPACE}
}
```
* `{SCHEMA_TITLE}`: Title of schema in XDM Schema Registry.
* `{SCHEMA_ID}`: Unique id of schema in XDM Schema Registry.
* `{SCHEMA_CONTENT_TYPE}`: Content-type and version of schema.
* `{NAMESPACE}`: Unique ID generated by XDM Schema Registry as namespace corresponding to adhoc schema.

This `schemaRef` can be used further to create dataset entity through dataset API. [Creating a Dataset](#create_dataset)

##### Creating Custom Schema from fields
To construct custom schema from a subset of fields of any object, use "fields" API to fetch fields and use the required subset of fields as payload in create schema.

Get fields of object:

##### Request
```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/fields?object={OBJECT_ID}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
* `{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{CONNECTION_ID}`: ID of the connector you created from the previous steps.
* `{OBJECT_ID}`: Logical Name of the Salesforce Object whose fields are to be fetched.

##### Response
```javascript
[
  {
    "logicalName": "Id",
    "displayName": "Account ID",
    "isPrimaryKey": true,
    "type": "string",
    "meta": {
      "inboundSupported": true,
      "outboundSupported": true,
      "originalType": "id",
      "maxLength": 18,
      "options": []
    }
  },
  {
    "logicalName": "IsDeleted",
    "displayName": "Deleted",
    "isPrimaryKey": false,
    "type": "boolean",
    "meta": {
      "inboundSupported": true,
      "outboundSupported": true,
      "originalType": "boolean",
      "options": []
    }
  }
]
```
The required fields are passed to POST /schemas call for construction of custom adhoc schema:

##### Request

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/schemas \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
  "fields": [
    {
      "logicalName": "Id",
      "displayName": "Account ID",
      "isPrimaryKey": true,
      "type": "string",
      "meta": {
        "inboundSupported": true,
        "outboundSupported": true,
        "originalType": "id",
        "maxLength": 18,
        "options": []
      }
    },
    {
      "logicalName": "IsDeleted",
      "displayName": "Deleted",
      "isPrimaryKey": false,
      "type": "boolean",
      "meta": {
        "inboundSupported": true,
        "outboundSupported": true,
        "originalType": "boolean",
        "options": []
      }
    }
  ]
}'
```
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
* `{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{CONNECTION_ID}`: ID of the connector you created from the previous steps.

##### Response
```javascript
{
    "title": {SCHEMA_TITLE},
    "schemaRef": {
        "id": {SCHEMA_ID},
        "contentType": {SCHEMA_CONTENT_TYPE}
    },
    "namespace": {ADHOC_NAMESPACE}
}
```
* `{SCHEMA_TITLE}`: Title of schema in XDM Schema Registry.
* `{SCHEMA_ID}`: Unique id of schema in XDM Schema Registry.
* `{SCHEMA_CONTENT_TYPE}`: Content-type and version of schema.
* `{ADHOC_NAMESPACE}`: Unique ID generated by XDM Schema Registry as namespace of adhoc schema.

This `schemaRef` is used in the next step to create dataset entity through dataset API. [Creating a Dataset](#create_dataset)

#### Configure schedule for ingestion
Scheduling ingestion is mandatory for relational connectors before posting dataset. `ingestStart` and `frequency` are provided through PUT /schedule API call. Empty payload `{}` can be provided for one time ingestion.

##### Request

```SHELL
curl -X PUT \
  'https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/schedule' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
  "ingestStart": "2018-05-24T09:36:01.257Z",
  "frequency": {
    "month": "*",
    "day": "*",
    "dayOfWeek": "*",
    "hour": "*",
    "minute": "*/15",
    "timezone": "UTC"
  }
}'
```
`ingestStart` can only be current or future date and denotes the start time of ingestion. If no value is provided, is it taken as current UTC time.
`frequency` denotes the pace of ingestion. Preceeding example ingests data every 15 minutes. Hourly, daily, monthly and yearly frequencies can be provided alongside custom schedules.
For example -
```javascript
Daily
"frequency": {
    "month": "*",
    "day": "*",
    "dayOfWeek": "*",
    "hour": "0",
    "minute": "0",
    "timezone": "UTC"
  }

Monthly
"frequency": {
    "month": "*",
    "day": "1",
    "dayOfWeek": "*",
    "hour": "0",
    "minute": "0",
    "timezone": "UTC"
  }

Yearly
"frequency": {
    "month": "1",
    "day": "1",
    "dayOfWeek": "*",
    "hour": "0",
    "minute": "0",
    "timezone": "UTC"
  }
```

* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
* `{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{CONNECTION_ID}`: ID of the connector you created from the previous steps.

##### Response
```javascript
[
    "@/connections/{CONNECTION_ID}"
]
```

#### <a name="create_dataset">Create a Dataset</a>
The dataset defines the structure of the data the connector ingests. Once you create the account and connection, you can use the *Connection ID* to create a dataset. You can configure Platform datasets, pipeline, and triggers with a successful POST call.
Provide a unique and identifiable name for the dataset to identify it clearly when monitoring your data ingestion.

##### Request

```SHELL
curl -X POST \
  'https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/datasets' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
  "params": {
    "datasets": [
      {
        "name": {DATASET_NAME},
        "tags": {
          "connectors-objectName": [
            {OBJECT_ID}
          ]
        },
        "schemaRef": {
          "id": {SCHEMA_ID},
          "contentType": {SCHEMA_CONTENT_TYPE}
        },
        "saveStrategy": {SAVE_STRATEGY},
        "backfillDate": {BACKFILL_DATE},
        "schemaMetadata": {
          "delta": [
            {
              "path": {FIELD_SCHEMA_PATH},
              "format": "YYYY-MM-DDThh:mm:ssZ",
              "timezone": "UTC"
            }
          ]
        }
      }
    ]
  }
}'
```
* `schemaRef` tag is used as returned by the create schema /schemas API. It contains the id and content-type of the created adhoc schema in XDM Schema Registry for the `{OBJECT_ID}` specified.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
* `{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{CONNECTION_ID}`: ID of the connector you created from the previous steps.
* `{DATASET_NAME}`: Name of the dataset you want to create.
* `{SCHEMA_ID}`: Unique id of schema in XDM Schema Registry.
* `{SCHEMA_CONTENT_TYPE}`: Content-type and version of schema.
* `{SAVE_STRATEGY}`: Enum [overwrite/delta/append] to overwrite, change or add data. To specify how data will be ingested. Append and Delta options are sorted by time, requiring you to select a time-based property to order the data, such as `System Modstamp`, `Created Date`, or `Last Modified Date`.
* `{BACKFILL_DATE}`: Past date to begin ingestion.
* `{FIELD_SCHEMA_PATH}`: Path of date-time field in schema.

##### Response

```javascript
{
    "success": [
        {
            "name": {DATASET_NAME},
            "id": {DATASET_ID}
        }
    ],
    "error": []
}
```
* `{DATASET_NAME}`: Name of the dataset you specified.
* `{DATASET_ID}`: The ID of the dataset you created. Use `{DATASET_ID}` to make a request to Catalog to identify the DatasetView ID associated with this dataset.

