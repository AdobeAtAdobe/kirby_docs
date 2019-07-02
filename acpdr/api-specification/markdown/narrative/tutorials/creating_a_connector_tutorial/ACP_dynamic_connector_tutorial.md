# Microsoft Dynamics connector for Adobe Experience Platform

The Microsoft Dynamics connector for Adobe Experience Platform provides an API and wizard to ingest your Microsoft Dynamics CRM data onto Adobe Experience Platform, allowing you to:

* Authenticate to your Microsoft Dynamics account.
* Select one or more datasets from a list of available datasets.
* Preview a sample of your data for accuracy.
* Identify each dataset as a lookup file, event, or record.
* Set a schedule and frequency for ingesting data.
* Save the connector and modify it as needed.

This article provides a step-by-step tutorial on how to set up and configure the Azure Blob connector through API calls. For a comprehensive list of all API calls that are compatible with the connector, please refer to the [API reference documentation](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/partner-connectors-api.yaml).

## Authenticate and configure the Microsoft Dynamics connector
The following steps cover how to authenticate the data connection with the Microsoft Dynamics connector.

<!---### Prerequisites
* Register the schema of the incoming file.
* Register the metadata associated with the file, such as *DataSetName*, *UserID*, *IMSOrg*, and *ConnectionParameters*.
* Get the details of the file ingested using an API call to the Catalog API.--->

### Gather Experience Platform credentials
You will need an Adobe I/O account and the following credentials to authenticate API calls:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.

If you do not know your authentication credentials, see the [authenticating and accessing APIs tutorial](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for more information.

### Gather Microsoft Dynamics credentials

You will need the following credentials:

* `{MS-Dynamics_USER_NAME}`: Your MS Dynamics CRM user name
* `{MS-Dynamics_PASSWORD}`: Your MS Dynamics CRM password
* `{MS-Dynamics_ORGANIZATION_URI}`: Your MS Dynamics Organization URI
* `{MS-Dynamics_ORGANIZATION_NAME}`: Your MS Dynamics Organization Name
* `{MS-Dynamics_HOST_NAME}`: Your MS Dynamics Host Name for dynamics-on premise
After you are authorized to make API calls from the Adobe I/O Gateway and your Microsoft Dynamics credentials, generate a dataset from the Microsoft Dynamics objects.

### Create account and connection

Use your Microsoft Dynamics credentials to request an account and connection entity:

#### Request

For dynamics-online:
```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/account \
  -H 'Accept: application/vnd.adobe.validCredentials+json;version=2' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-request-id: {REQUEST_ID}' \
  -d '{
  "type": "dynamics-online",
  "params": {
    "username": {MS-Dynamics_USER_NAME},
    "password": {MS-Dynamics_PASSWORD},
    "organizationUri": {MS-Dynamics_ORGANIZATION_URI},
    "organizationName": {MS-Dynamics_ORGANIZATION_NAME}
  }
}'
```
For on premise:

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/account \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
  "type": "dynamics-onprem",
  "params": {
    "username": {MS-Dynamics_USER_NAME},
    "password": {MS-Dynamics_PASSWORD},
    "organizationName": {MS-Dynamics_ORGANIZATION_NAME},
    "hostName": {MS-Dynamics_HOST_NAME}
  }
}'
```

#### Response
```javascript
{
    "accountId": {ACCOUNT_ID},
    "connectionId": {CONNECTION_ID}
}
```

* `{ACCOUNT_ID}`: Account ID in catalog.
* `{CONNECTION_ID}`: Connection ID in catalog.

Copy down your `{ACCOUNT_ID}` and `{CONNECTION_ID}` for further use before moving on to the next step.

## Create custom schema

Data that is ingested into the platform needs to be complaint with a schema. You can create a custom schema for the data you wish to ingest by making a POST request to the /schemas endpoint in the Data Connectors namespace. This custom schema is called adhoc schema since it has the capability to not comply with any of the standard XDM models. Please refer to [XDM System overview](https://www.adobe.io/apis/experienceplatform/home/xdm/xdmservices.html#!api-specification/markdown/narrative/technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md) for details on XDM models.

Creating a custom schema is a two-step process:

1. Select a desired table to ingest. You can use the GET /objects endpoint to list tables.
2. Create a custom schema from the table or fields of that table.

### Creating Custom Schema with table name
Select a Microsoft Dynamics table to ingest. Use the below request to get a list of tables from the MS Dynamics connection:

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response
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

A successful response returns a partial list of all available Microsoft Dynamics CRM objects. Find the object you wish to ingest, and copy the `logicalName` of the selected object to use as `{OBJECT_ID}` in the following request:

#### Request

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

* `{OBJECT_ID}`: The `logicalName` of the Microsoft Dynamics object you want to ingest.

#### Response
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
* `{SCHEMA_ID}`: Unique ID of schema in XDM Schema Registry.
* `{SCHEMA_CONTENT_TYPE}`: Content-type and version of schema.
* `{NAMESPACE}`: Unique ID generated by XDM Schema Registry as namespace corresponding to adhoc schema.

This `schemaRef` will be used to create a dataset entity later in this tutorial.

### Creating Custom Schema from fields
To construct a custom schema from a subset of fields of any object, start by using the /fields endpoint to fetch the object's fields:

#### Request
```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/fields?object={OBJECT_ID}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

* `{OBJECT_ID}`: Logical Name of the Microsoft Dynamics Object whose fields are to be fetched.

#### Response
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
 Determine the required subset of fields for the schema, and pass them to the POST /schemas endpoint to create a new adhoc schema:

#### Request

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

#### Response
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

This `schemaRef` will be used to create a dataset entity later in this tutorial.

### Configure schedule for ingestion
Scheduling ingestion is mandatory for relational connectors before creating a dataset. You can schedule the `ingestStart` and `frequency` for data ingestion by making a call to the PUT /schedule endpoint:

#### Request

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
`ingestStart` denotes the start time of ingestion, and can only be current or a future date. If no value is provided, is it taken as current UTC time.

`frequency` denotes the pace of ingestion. The preceding example ingests data every 15 minutes. Hourly, daily, monthly and yearly frequencies can be provided alongside custom schedules. Some sample frequencies are listed below:

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

## Create a dataset
The dataset defines the structure of the data that the connector ingests. Once you create the account and connection, you can use the `{CONNECTION_ID}` to create a dataset. You can configure datasets, pipeline, and triggers with a successful POST call.

#### Request

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

> **Important:** Ensure that you provide a unique and identifiable name for the dataset to identify it clearly when monitoring your data ingestion.

#### Response

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

