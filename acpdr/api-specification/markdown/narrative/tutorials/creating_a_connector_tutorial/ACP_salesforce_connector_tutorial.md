
# Salesforce connector for Adobe Experience Platform

Adobe Experience Platform provides a RESTful API and user interface that allow you to ingest your Salesforce CRM data.

This tutorial covers the following steps for setting up and configuring the Salesforce connector using the [Partner Connectors API](../../../../../../acpdr/swagger-specs/partner-connectors-api.yaml):

* [Create a data connection](#create-a-data-connection) using your Salesforce credentials
* [Create a custom schema](#create-a-custom-schema) for the connection
* [Set a schedule and frequency for ingesting data](#configure-schedule-for-ingestion)
* [Create a dataset](#create-a-dataset) for the connection
* [Preview a sample of data for accuracy](#preview-source-data-for-accuracy)

## Getting started

This tutorial requires a working understanding of Data Ingestion and related services within Adobe Experience Platform. Before starting this tutorial, please review the following documentation containing key concepts you should know:

- [Data connectors](../../technical_overview/acp_connectors_overview/acp-connectors-overview.md): Enables data ingestion from a variety of sources such as CRM and cloud-based storage.
- At least one of the ingestion methods used to upload data to Platform:
    - [Batch ingestion](../../technical_overview/ingest_architectural_overview/ingest_architectural_overview.md): Uploads datafiles to Platform as batch files.
    - [Streaming ingestion](../../technical_overview/streaming_ingest/streaming_ingest_overview.md): Sends data to Platform from client- and server-side devices in real time.
- [Experience Data Model (XDM)](../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Platform organizes customer experience data.

The following sections provide additional information that you will need to know in order to successfully make calls to the Platform APIs.

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../../technical_overview/platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

* x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../../technical_overview/sandboxes/sandboxes-overview.md). 

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

<!---### Prerequisites
* Register the schema of the incoming file.
* Register the metadata associated with the file, such as *DataSetName*, *UserID*, *IMSOrg*, and *ConnectionParameters*.
* Get the details of the file ingested using an API call to the Catalog API.--->

## Create a data connection
The following steps cover how to create a data connection. In order to create a data connection, you require the following Salesforce credential values:

* `{SALESFORCE_USER_NAME}`: Your Salesforce CRM user name
* `{SALESFORCE_PASSWORD}`: Your Salesforce CRM password
* `{SALESFORCE_SECURITY_TOKEN}`: Your Salesforce security token, found by following these steps:
  1. Go to https://developer.salesforce.com/.
  2. Log in using your Salesforce CRM credentials.
  3. Select the user icon and click **Settings**.
  4. In the *Personal Information* view, select **Reset My Security Token**. You will receive a new security token by email.

### Create account and connection

Using the [Partner Connectors API](../../../../../../acpdr/swagger-specs/partner-connectors-api.yaml), you can create a new connection entity for your Salesforce account by providing your credentials in the payload of a POST request.

#### API format

```http
POST /account
```

#### Request

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/account/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
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

#### Response

A successful response returns the connection ID for the newly created data connection. This value is used for lookup purposes later in this document when [creating a custom schema](#create-a-custom-schema) for the connection.

```json
{
    "accountId": "3225a37800be46169f20e893b",
    "connectionId": "57eaaa10a6604462ae5588925"
}
```

* `connectionId`: The lookup ID for the data connection.


## Create a custom schema

Data that is ingested into Platform must conform to the structure of a specified XDM schema. Using the [Partner Connectors API](../../../../../../acpdr/swagger-specs/partner-connectors-api.yaml), you can create a custom schema for the data you wish to ingest. This custom schema is called an ad-hoc schema because it is designed to interact with one specific dataset, whereas standard schemas can be associated with multiple datasets.

The following sections cover the steps for creating a custom schema for your data connection:

1. [Lookup a Salesforce table for ingestion](#lookup-a-table-for-ingestion)
1. Create a custom schema using one of the following values:
    * [The name of the table](#create-a-custom-schema-using-a-table-name)
    * [The names of specific fields within the table](#create-a-custom-schema-from-specific-fields)


### Lookup a table for ingestion

The following API call retrieves a list of tables from your Salesforce connection.

#### API format

```http
GET /connections/{connectionId}/objects
```

* `{connectionId}`: The ID of the connection that was created in the previous step.

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/objects \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a partial list of all available Salesforce CRM tables for your connection.

```json
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
    {
        "logicalName": "WebLink",
        "displayName": "Custom Buttons or Links"
    }
]
```
* `logicalName`: The lookup name for a table, used when creating a custom schema in the next step.
* `displayName`: A human-friendly version of the table name used for display purposes.

### Create a custom schema using a table name

The following API call creates a custom schema for all the fields of a table by providing the table's `logicalName` in the request payload, as described below. If you want to create a custom schema using specified table fields, please skip to the section on [creating a custom schema using field names](#create-a-custom-schema-from-specific-fields).

#### API format

```http
POST /connections/{connectionId}/schemas
```

#### Request

```SHELL
curl -X POST \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/schemas' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "objectName" : "AcceptedEventRelation"
  }'
```

* `objectName`: The `logicalName` of the CRM table you want to ingest.

#### Response
```json
{
    "title": "AcceptedEventRelation",
    "schemaRef": {
        "id": "https://ns.adobe.com/{TENANT_ID}/schemas/78bab6346b9c5102b60591e15e75d254",
        "contentType": "application/vnd.adobe.xed-full+json;version=1"
    },
    "namespace": "{NAMESPACE}"
}
```
* `title`: The title of the schema in Schema Registry.
* `schemaRef`: An object that is used to reference the schema in other API calls. This object will be used later in the tutorial during the [create a dataset](#create-a-dataset) step. It contains the following values:
    * `id`: The unique ID of the schema.
    * `contentType`: The content-type and version of the schema.
* `{NAMESPACE}`: A unique ID generated by the Schema Registry as a namespace corresponding to the custom schema.

Now that you have created a custom schema for your Salesforce connection, you can proceed to the next step of [configuring an ingestion schedule](#configure-schedule-for-ingestion).

### Create a custom schema from specific fields

This section covers the following stetps for constructing a custom schema from a subset of fields:

1. Fetch the details of the desired results
1. Provide the field details in the payload of a POST request

The following API Call lists the fields of a specified CRM table by providing the table's `logicalName` in the request path.

#### API format

```http
GET /connections/{connectionId}/fields?object={logicalName}
```
* `{logicalName}`: The identifier of the table you want to access, as returned in the response from the [previous step](#lookup-a-table-for-ingestion).

#### Request
```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/fields?object=AcceptedEventRelation' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of objects that represent the fields of the specified CRM table. Each object contains details about an individual field, including its name, data type, and associated metadata.

```json
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
  },
  {
    "logicalName": "DateAccepted",
    "displayName": "Date Accepted",
    "isPrimaryKey": false,
    "type": "datetime",
    "meta": {
      "inboundSupported": true,
      "outboundSupported": true,
      "originalType": "datetime",
      "options": []
    }
  }
]
```
 
 Once you have determined your required subset of fields, you can create a custom schema by copying the values of these fields (as provided in the response of the previous API call) and supplying them in the payload of a POST request, as demonstrated below.

#### API format

```http
POST /connections/{connectionId}/schemas
```

#### Request

```SHELL
curl -X POST \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/schemas' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
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

* `fields`: An array that lists the desired fields for the custom schema.

#### Response
```json
{
    "title": "AcceptedEventRelation",
    "schemaRef": {
        "id": "https://ns.adobe.com/{TENANT_ID}/schemas/78bab6346b9c5102b60591e15e75d254",
        "contentType": "application/vnd.adobe.xed-full+json; version=1"
    },
    "namespace": "{NAMESPACE}"
}
```
* `title`: The title of the schema in Schema Registry.
* `schemaRef`: An object that is used to reference the schema in other API calls. This object will be used later in the tutorial during the [create a dataset](#create-a-dataset) step. It contains the following values:
    * `id`: The unique ID of the schema.
    * `contentType`: The content-type and version of the schema.
* `{NAMESPACE}`: A unique ID generated by the Schema Registry as a namespace corresponding to the custom schema.

## Configure schedule for ingestion

The Salesforce connector is a relational connector, therefore it is mandatory to set an ingestion schedule for your data connection. You can schedule the `ingestStart` and `frequency` for data ingestion by making a PUT request to the `/schedule` endpoint of the [Partner Connectors API](../../../../../../acpdr/swagger-specs/partner-connectors-api.yaml).

#### API format

```http
PUT /connections/{connectionId}/schedule
```

#### Request

```SHELL
curl -X PUT \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/schedule' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
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
* `ingestStart`: The start time of ingestion. Can only be the current date or a future date. If no value is provided, the start time defaults to current UTC time.
* `frequency`: The pace of ingestion. The above example ingests data every 15 minutes. Hourly, daily, monthly, and yearly frequencies can be provided alongside custom schedules. Some sample frequencies are listed below:


    **Daily**
    ```json
    "frequency": {
        "month": "*",
        "day": "*",
        "dayOfWeek": "*",
        "hour": "0",
        "minute": "0",
        "timezone": "UTC"
      }
    ```

    **Monthly**
    ```json
    "frequency": {
        "month": "*",
        "day": "1",
        "dayOfWeek": "*",
        "hour": "0",
        "minute": "0",
        "timezone": "UTC"
      }
    ```

    **Yearly**
    ```json
    "frequency": {
        "month": "1",
        "day": "1",
        "dayOfWeek": "*",
        "hour": "0",
        "minute": "0",
        "timezone": "UTC"
      }
    ```

#### Response

A successful response returns an array containing the ID of the updated connection.

```json
[
    "@/connections/57eaaa10a6604462ae5588925"
]
```

## Create a dataset

Once you have created a connection and configured its ingestion schedule, you must create a dataset for the connection to use when ingesting data. All datasets in Experience Platform must conform to an existing XDM schema, whose ID and content type are provided in order to create a new dataset. In this tutorial, the dataset will conform to the ad-hoc schema you created. The necessary values are located in the `schemaRef` attribute that was returned in the previous step for [creating a custom schema](#create-a-custom-schema).

#### API format

```http
POST /connections/{connectionId}/datasets
```

#### Request

```SHELL
curl -X POST \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/datasets' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "params": {
      "datasets": [
        {
          "name": "AcceptedEventRelationDataset",
          "tags": {
            "connectors-objectName": [
              "AcceptedEventRelation"
            ]
          },
          "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/78bab6346b9c5102b60591e15e75d254",
            "contentType": "application/vnd.adobe.xed-full+json; version=1"
          },
          "saveStrategy": "delta",
          "backfillDate": "2019-03-15 16:11:00"
          "schemaMetadata": {
            "delta": [
              {
                "path": "DateAccepted",
                "format": "2019-05-29T12:00:00Z",
                "timezone": "UTC"
              }
            ]
          }
        }
      ]
    }
  }'
```
* `name`: The name of the dataset you want to create. Ensure that you provide a unique and identifiable name for the dataset to identify it clearly when monitoring your data ingestion.
* `schemaRef > id`: The unique identifier of an XDM schema (the ad-hoc schema you created) which defines the structure of that dataset.
* `schemaRef > contentType`: The content-type and version of the schema.
* `saveStrategy`: The method by which the connection saves data as it is being ingested. The following options are accepted as values:
    * `overwrite`: Overwrites existing data. Pulls in all data for ingestion.
    * `delta`: Merges changes into existing data. Pulls in data after a designated `backfillDate`.
    * `append`: Adds to existing data. Pulls in data after a designated `backfillDate`
    * Both `delta` and `append`   options are sorted by time, and require you to provide a time-based property to order the changes under `schemaMetadata`, as described below.
* `backfillDate`: A date-time value from which to start data ingestion when using `delta` or `append` as the `saveStrategy`. This attribute is not compatible with the `overwrite`, as that strategy will ingest all data regardless of timestamps. Accepted formats are `YYYY-MM-DD hh:mm:ss` and `YYYY-MM-DD`.
* `schemaMetadata`: An object that orders ingested changes when using `delta` or `append` as the `saveStrategy`, based on a specified time-based property. The object contains a single attribute (either `delta` or `append`, depending on the `saveStrategy` being used), which itself is an array containing another object with the following attributes:
    * `path`: The path within the connection schema for the time-based field that ingested data will be ordered by. Suggested values for this property include system modstamps, created dates, and last modified dates.
    * `format`: The date-time format of the XDM field specified in `path`.
    * `timezone`: The timezone to be used for the XDM field specified in `path`.

#### Response

```json
{
    "success": [
        {
            "name": "AcceptedEventRelationDataset",
            "id": "5cf8abadb9d7e11453eee27c"
        }
    ],
    "error": []
}
```

## Preview source data for accuracy

Before your Salesforce connector ingests data for the first time, it is best practice to preview the data to see if it will be ingested as expected. The following sections demonstrate the different available methods for previewing data using the Partner Connectors API.

### List the objects of a connection

#### API format

```http
GET /connections/{connectionId}/objects
```

#### Request

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/objects' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of objects contained in the Salesforce connection.

```json
[
  {
    "logicalName": "AcceptedEventRelation",
    "displayName": "Accepted Event Relation"
  },
  {
    "logicalName": "Account",
    "displayName": "Account"
  },
  {
    "logicalName": "AccountCleanInfo",
    "displayName": "Account Clean Info" 
  } 
]
```

### List the fields of an object

#### API format

```http
GET /connections/{connectionId}/fields?object={SALESFORCE_OBJECT_NAME}
```

* `{SALESFORCE_OBJECT_NAME}`: The name of the Salesforce table you want to preview.

#### Request

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/fields?object=Account' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of data fields contained in the specified table.

```json
[  
  {  
    "logicalName":"Id",
    "displayName":"Account ID",
    "isPrimaryKey":true,
    "type":"string",
    "meta":{  
      "inboundSupported":true,
      "outboundSupported":true,
      "originalType":"id",
      "maxLength":18,
      "options":[]
    }
  },
  {  
    "logicalName":"IsDeleted",
    "displayName":"Deleted",
    "isPrimaryKey":false,
    "type":"boolean",
    "meta":{  
      "inboundSupported":true,
      "outboundSupported":true,
      "originalType":"boolean",
      "options":[]
    }
  }
]
```

### Access the contents of an object

#### API format

```http
GET /connections/{connectionId}/rows?object={SALESFORCE_OBJECT_NAME}
```

* `{SALESFORCE_OBJECT_NAME}`: The name of the Salesforce table you want to preview.

#### Request

The following request previews the contents of the Salesforce table specified in the path.

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/rows?object=Account' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the rows of the specified table.

```json
{  
  "format":"tabular",
  "fields":[  
    {  
      "id":"1",
      "name":"Id"
    },
    {  
      "id":"2",
      "name":"IsDeleted"
    }
  ],
  "data":[  
    {  
      "1":"0010Y000003fmrRQAQ",
      "2":false
    },
    {  
      "1":"0010Y000002VMCDQA4",
      "2":true
    }
  ]
}
```

## Next steps

You have now successfully created a Salesforce connector and tested its source data for accuracy. To create additional connections, see the [data connectors](../../technical_overview/acp_connectors_overview/acp-connectors-overview.md) documentation.
