# Microsoft Dynamics Connector for Adobe Experience Platform

The Microsoft Dynamics Connector for Adobe Experience Platform provides an API and wizard to ingest your Microsoft Dynamics CRM data onto Adobe Experience Platform, allowing you to:

* Authenticate to your Microsoft Dynamics account.
* Select one or more datasets from a list of available datasets.
* Preview a sample of your data for accuracy.
* Identify each dataset as a lookup file, event, or record.
* Set a schedule and frequency for ingesting data.
* Save the connector and modify it as needed.

This article provides steps to set up and configure the Microsoft Dynamics connector through API calls. For further details you can refer to - [Swagger Documentation](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/partner-connectors-api.yaml)

## Setting up the Microsoft Dynamics Connector
Set up an account to access APIs and provide credentials to create a connector:

<!---### Prerequisites
* Register the schema of the incoming file.
* Register the metadata associated with the file, such as *DataSetName*, *UserID*, *IMSOrg*, and *ConnectionParameters*.
* Get the details of the file ingested using an API call to the Catalog API.--->

### Set up an Adobe I/O account
See [authenticating and accessing APIs](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) to create an access token used to authenticate API calls from Adobe I/O.

After you set up authorization for APIs, the following values are returned:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.

### Set up a Platform connection to Microsoft Dynamics

You will need the following credentials:

* `{MS-Dynamics_USER_NAME}`: Your MS Dynamics CRM user name
* `{MS-Dynamics_PASSWORD}`: Your MS Dynamics CRM password
* `{MS-Dynamics_ORGANIZATION_URI}`: Your MS Dynamics Organization URI
* `{MS-Dynamics_ORGANIZATION_NAME}`: Your MS Dynamics Organization Name
* `{MS-Dynamics_HOST_NAME}`: Your MS Dynamics Host Name for dynamics-on premise
After you are authorized to make API calls from the Adobe I/O Gateway and your Microsoft Dynamics credentials, generate a dataset from the Microsoft Dynamics objects.

## Setting up the Microsoft Dynamics Connector
Follow these steps to create a dataset from Microsoft Dynamics and set up a connector to trigger a one-time or scheduled ingestion.

#### Create Account and Connection

First, request a Microsoft Dynamics CRM account entity. You need your Microsoft Dynamics CRM User Name, Microsoft Dynamics CRM  Password, Microsoft Dynamics CRM Organization URI and Microsoft Dynamics CRM Organization Name to request an account and connection entity. The response to this request includes the *Account ID* and *Connection ID* in Catalog.

##### Request

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
* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
* `{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{MS-Dynamics_USER_NAME}`: Your username for MS Dynamic CRM.
* `{MS-Dynamics_PASSWORD}`: Your MS Dynamics CRM password
* `{MS-Dynamics_ORGANIZATION_URI}`: Your MS Dynamics Organization URI
* `{MS-Dynamics_ORGANIZATION_NAME}`: Your MS Dynamics Organization Name
* `{MS-Dynamics_HOST_NAME}`: Your MS Dynamics Host Name

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

For Ingesting data into the platform, data needs to be complaint with a schema. Data Connectors provide POST /schemas API to create custom schema of the data you wish to ingest. This custom schema is called Adhoc schema since it has the capability to not comply with any of the standard XDM models. Please refer to [XDM Schema Registry Guide](https://www.adobe.io/apis/experienceplatform/home/xdm/xdmservices.html#!api-specification/markdown/narrative/technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md) for details on XDM models.

Creating custom schema is a two step process -

1. Selecting desired table to ingest. You can use GET /objects call to list tables.
2. Creating custom schema from table or fields of that table.

##### Creating Custom Schema with table name
Select a Microsoft Dynamics table to ingest. Use the below request to get a list of tables from the MS Dynamics connection:

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

> **Note: ** The return response is a partial list of all available Microsoft Dynamics CRM objects. Use the `{OBJECT_ID}` as the `logicalName` of the objects.

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
* `{OBJECT_ID}`: Logical Name of the Microsoft Dynamics Object you want to ingest.

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
* `{OBJECT_ID}`: Logical Name of the Microsoft Dynamics Object whose fields are to be fetched.

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
The required fields are passed to create /schemas API call for construction of custom adhoc schema:

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

