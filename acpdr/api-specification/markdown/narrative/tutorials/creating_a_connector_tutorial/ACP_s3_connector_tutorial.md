# Amazon S3 connector for Adobe Experience Platform (Legacy)

>   **Note**: The Amazon S3 connector outlined in this document is being deprecated. For documentation on the updated Amazon S3 connector, see the tutorial on [creating an Azure Blob or Amazon S3 source connector using the Flow Service API](../sources_tutorial/api/blob-s3-api-tutorial.md).

Adobe Experience Platform provides a RESTful API and user interface that allow you to ingest data from your Amazon S3 data store. 

This tutorial covers the following steps for setting up and configuring the Amazon S3 connector using the [Partner Connectors API](../../../../../../acpdr/swagger-specs/partner-connectors-api.yaml):

* [Create a data connection](#create-a-data-connection) using your Amazon S3 credentials
* [Set a schedule and frequency for ingesting data](#configure-schedule-for-ingestion) *(Optional)*
* [Create a dataset for the connection](#create-a-dataset), using one or more of the following options:
    * [Create a basic connection dataset](#create-a-basic-dataset)
    * [Create a dataset configured for recursive ingestion](#create-a-dataset-for-recursive-ingestion)
    * [Create a dataset configured for incremental ingestion](#create-a-dataset-for-incremental-ingestion)
* [Preview a sample of data for accuracy](#preview-data-for-accuracy)

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

## Create a data connection

The following steps cover how to create a data connection. In order to create a data connection, you require the following Amazon S3 credential values:

* `{S3_ACCESS_KEY}`: Your Amazon S3 access key
* `{S3_SECRET_KEY}`: Your Amazon S3 secret key

Using the [Partner Connectors API](../../../../../../acpdr/swagger-specs/partner-connectors-api.yaml), you can create a new connection entity for your S3 account by providing your `{S3_ACCESS_KEY}` and `{S3_SECRET_KEY}` in the payload of a POST request.

#### API format

```http
POST /account
```

#### Request
```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/account \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "params": {
      "s3AccessKey": {S3_ACCESS_KEY},
      "s3SecretKey": {S3_SECRET_KEY}
    },
    "type": "amazon-s3"
  }'
```

#### Response

A successful response returns the connection ID for the newly created data connection. This value can be used for lookup purposes later in this document during the [creating a dataset](#create-a-dataset) step or in the following section when setting up an optional ingestion schedule.

```json
{
    "accountId": "3225a37800be46169f20e893b",
    "connectionId": "57eaaa10a6604462ae5588925"
}
```
* `connectionId`: The lookup ID for the data connection.

## Configure schedule for ingestion
>**Note:** This step is only mandatory for configuring a connector for incremental ingestion. Unless you are using incremental ingestion or sending an empty JSON object as the payload for a one-time run, you can skip this step and proceed to [creating a dataset](#create-a-dataset).

You can schedule the `ingestStart` and `frequency` for data ingestion by making a PUT request to the [Partner Connectors API](../../../../../../acpdr/swagger-specs/partner-connectors-api.yaml). 

#### API format

```http
PUT /connections/{connectionId}/schedule
```
* `{connectionId}`: The ID of the connection that was created in the previous step.

#### Request

The following request sets the ingest schedule for the data connection specified in the request path. The schedule is configured based on the parameters provided in the request payload. If you are setting up a connection for one-time batch ingestion, leave the payload empty.

```SHELL
curl -X PUT \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/schedule' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "ingestStart": "2020-05-24T09:36:01.257Z",
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
* `frequency`: The pace of ingestion. The above example ingests data every 15 minutes. Hourly, daily, monthly and yearly frequencies can be provided alongside custom schedules. Some sample frequencies are listed below:

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

```javascript
[
  "@/connections/57eaaa10a6604462ae5588925"
]
```

## Create a dataset

Once you have created a connection, you must create a dataset in order to ingest connection data. All datasets in Experience Platform must conform to an existing XDM schema, whose ID and content type must be provided in order to create a new dataset. For detailed steps on viewing and creating schemas using APIs, see the [Schema Registry API tutorial](../schema_registry_api_tutorial/schema_registry_api_tutorial.md).

You can create a dataset using one or more of the following configurations, depending on how you want to set up the ingestion behavior for your connection:

  * [Basic connection dataset](#create-a-basic-dataset)
  * A dataset configured for [recursive ingestion](#create-a-dataset-for-recursive-ingestion)
  * A dataset configured for [incremental ingestion](#create-a-dataset-for-incremental-ingestion)

The following sections cover the steps for creating each of these datasets.

## Create a basic dataset

The following API call demonstrates how to create a dataset that meets the minimum requirements for being used by a data connection.

#### API format

```http
POST /connections/{connectionId}/datasets
```

* `{connectionId}`: The ID of the data connection that the dataset will be associated with.

#### Request

The following request creates a dataset named "VIPCustomersDataset" for the Amazon S3 connection that is specified in the request path. The dataset is configured based on the attributes provided in the request payload, as described below.

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/datasets \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "params": {
      "datasets": [
        {
          "name": "VIPCustomersDataset",
          "tags": {
            "connectors-objectName": [
              "s3://test-acpconnector-new/testConfigs/IncrementalTest/YearlyData_Folder_Regex/"
            ],
            "connectors-sourceFormat": [
              "json"
            ]
          },
          "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/78bab6346b9c5102b60591e15e75d254",
            "contentType": "application/vnd.adobe.xed-full+json;version=1"
          }
        }
      ]
    }
  }'
```

* `name`: The name of the dataset you want to create. Ensure that you provide a unique and identifiable name for the dataset to identify it clearly when monitoring your data ingestion.
* `tags > connectors-objectName`: The path to the file or folder in S3 to be ingested.
* `tags > connectors-sourceFormat`: The file format of the source file to be ingested. Accepted values are `parquet`, `json`, or `csv`. If this value is omitted, the default value of `parquet` is used.
* `schemaRef > id`: The unique identifier of an XDM schema which defines the structure of that dataset.
* `schemaRef > contentType`: The content-type and version of the schema. See the appendix section at the end of this document for a [list of supported values](#supported-contenttype-values).

#### Response

A successful response returns the `name` and `id` of the newly created dataset under a `success` attribute. While you have control over the `name` of the dataset by providing it in the request payload, its `id` is a unique, read-only, system generated string.

```json
{
    "success": [
        {
            "name": "VIPCustomersDataset",
            "id": "5cf8abadb9d7e11453eee27c"
        }
    ],
    "error": []
}
```

Now that a dataset has been created for your connection, the connection can ingest data. Before the connection ingests data for the first time, however, it is best practice to proceed to the next step of [previewing the data for accuracy](#preview-data-for-accuracy).

## Create a dataset for recursive ingestion

The following API call demonstrates how to create a dataset that enables the connection to recursively copy files from nested folders.

#### API format

```http
POST /connections/{connectionId}/datasets
```

* `{connectionId}`: The ID of the data connection that the dataset will be associated with.

#### Request

This request creates a dataset that is configured for recursive ingestion by including a `connectors-recursiveIngestion` tag under the `tags` attribute in the request payload. If this tag is set to "true", the data connection will recursively ingest files from folders inside the folder specified in `connectors-objectName`, starting from root level.

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/datasets \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "params": {
      "datasets": [
        {
          "name": "VIPCustomersDataset",
          "tags": {
            "connectors-objectName": [
              "s3://test-acpconnector-new/testConfigs/IncrementalTest/YearlyData_Folder_Regex/"
            ],
            "connectors-sourceFormat": [
              "json"
            ],
            "connectors-recursiveIngestion": [
              "true"
            ]
          },
          "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/78bab6346b9c5102b60591e15e75d254",
            "contentType": "application/vnd.adobe.xed-full+json;version=1"
          }
        }
      ]
    }
  }'
```

* `name`: The name of the dataset you want to create. Ensure that you provide a unique and identifiable name for the dataset to identify it clearly when monitoring your data ingestion.
* `tags > connectors-objectName`: The path to the file or folder in S3 to be ingested.
* `tags > connectors-sourceFormat`: The file format of the source file to be ingested. Accepted values are `parquet`, `json`, or `csv`. If this value is omitted, the default value of `parquet` is used.
* `tags > connectors-recursiveIngestion`: When set to "true", this tag enables the connector associated with this dataset for recursive ingestion. When omitted, the value defaults to "false".
* `schemaRef > id`: The unique identifier of an XDM schema which defines the structure of that dataset.
* `schemaRef > contentType`: The content-type and major version of the schema. See the appendix section at the end of this document for a [list of supported values](#supported-contenttype-values).

#### Response

A successful response returns the `name` and `id` of the newly created dataset under a `success` attribute.

```json
{
    "success": [
        {
            "name": "VIPCustomersDataset",
            "id": "5cf8abadb9d7e11453eee27c"
        }
    ],
    "error": []
}
```

Now that a dataset has been created for your connection, the connection can ingest data. Before the connection ingests data for the first time, however, it is best practice to proceed to the next step of [previewing the data for accuracy](#preview-data-for-accuracy).

## Create a dataset for incremental ingestion

Incremental ingestion allows you to ingest data based on a preferred frequency and starting on a specified date. Before creating a dataset configured for incremental ingestion, you must first [configure an ingestion schedule](#configure-schedule-for-ingestion) for the associated connection.

Incremental ingestion is supported in two ways, both of which are described in the following sections:

* [Using last modified date](#incremental-ingestion-using-last-modified-date)
* [Using regular expressions](#incremental-ingestion-using-regular-expressions)


### Incremental ingestion using last modified date

You can create a dataset that configures the connection to ingest files based on whether the last modified date of a file or folder is within a specified trigger interval.

#### API format

```http
POST /connections/{connectionId}/datasets
```

* `{connectionId}`: The ID of the data connection that the dataset will be associated with.

#### Request

The following request enables a connection for incremental ingestion by including `saveStrategy` and `backfillDate` attributes in the request payload, as described below.

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/datasets \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "params": {
      "datasets": [
        {
          "name": "VIPCustomersDataset",
          "tags": {
            "connectors-objectName": [
              "s3://test-acpconnector-new/testConfigs/IncrementalTest/YearlyData_Folder_Regex/"
            ],
            "connectors-sourceFormat": [
              "json"
            ]
          },
          "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/78bab6346b9c5102b60591e15e75d254",
            "contentType": "application/vnd.adobe.xed-full+json;version=1"
          },
          "saveStrategy": "delta",
          "backfillDate": "2019-03-15 16:11:00"
        }
      ]
    }
  }'
```

* `name`: The name of the dataset you want to create. Ensure that you provide a unique and identifiable name for the dataset to identify it clearly when monitoring your data ingestion.
* `tags > connectors-objectName`: The path to the file or folder in S3 to be ingested.
* `tags > connectors-sourceFormat`: The file format of the source file to be ingested. Accepted values are `parquet`, `json`, or `csv`. If this value is omitted, the default value of `parquet` is used.
* `schemaRef > id`: The unique identifier of an XDM schema which defines the structure of that dataset.
* `schemaRef > contentType`: The content-type and version of the schema. See the appendix section at the end of this document for a [list of supported values](#supported-contenttype-values).
* `saveStrategy`: The method by which the connection saves data as it is being ingested. The following options are accepted as values:
    * `overwrite`: Pulls in all data for ingestion, with no filters. The data store is overwritten each time data is ingested.
    * `delta`: Merges changes into existing data. Pulls in data after a designated `backfillDate`, as described below.
    * `append`: Adds to existing data. Pulls in data after a designated `backfillDate`, as described below.
* `backfillDate`: A date-time value from which to start data ingestion when using `delta` or `append` as the `saveStrategy`. This attribute is not compatible with `overwrite`, as that strategy will ingest all data regardless of timestamps. Data is picked up based on its last modified date. Accepted formats are `YYYY-MM-DD hh:mm:ss` and `YYYY-MM-DD`.

#### Response

A successful response returns the `name` and `id` of the newly created dataset under a `success` attribute.

```json
{
    "success": [
        {
            "name": "VIPCustomersDataset",
            "id": "5cf8abadb9d7e11453eee27c"
        }
    ],
    "error": []
}
```

Now that a dataset has been created for your connection, the connection can ingest data. Before the connection ingests data for the first time, however, it is best practice to proceed to the next step of [previewing the data for accuracy](#preview-data-for-accuracy).

### Incremental ingestion using regular expressions
Incremental ingestion using regular expressions (regex) is supported in two ways:

* Providing regex for folders
* Providing regex for files

For best performance with scheduled ingestion, data should be partitioned with a time-based format either in the folders or in the files for each application.

#### API format

```http
POST /connections/{connectionId}/datasets
```

* `{connectionId}`: The ID of the data connection that the dataset will be associated with.

#### Request

The following request creates a dataset enabled for incremental ingestion by providing a date-time regex under the `connectors-objectDateTimeRegex` attribute in the payload, along with the `isFolderRegex` tag. Examples of properly formatted date-time regex are provided later in this section. 

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/datasets \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "params": {
      "datasets": [
        {
          "name": "VIPCustomersDataset",
          "tags": {
            "connectors-objectName": [
              "s3://test-acpconnector-new/testConfigs/IncrementalTest/YearlyData_Folder_Regex/"
            ],
            "connectors-objectDateTimeRegex": [
              "dd-MM-yyyy"
            ],
            "connectors-isFolderRegex": [
              "true"
            ]
          },
          "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/78bab6346b9c5102b60591e15e75d254",
            "contentType": "application/vnd.adobe.xed-full+json;version=1"
          },
          "saveStrategy": "delta",
          "backfillDate": "2019-03-15 16:11:00"
        }
      ]
    }
  }'
```
* `name`: The name of the dataset you want to create. Ensure that you provide a unique and identifiable name for the dataset to identify it clearly when monitoring your data ingestion.
* `tags > connectors-objectName`: The path to the file or folder in S3 to be ingested.
* `tags > connectors-objectDateTimeRegex`: Regular expression to support hourly, daily, monthly or yearly scheduled ingestion as defined in the examples below. It is best practice to [configure the connector's ingestion schedule](#configure-schedule-for-ingestion) to be a similar frequency before creating this dataset.
* `tags > connectors-isFolderRegex`: When set to "true", this attribute signals that the above regex is for folder names. Examples of how this value affects ingestion behavior are provided later in this section.
* `schemaRef > id`: The unique identifier of an XDM schema which defines the structure of that dataset.
* `schemaRef > contentType`: The content-type and version of the schema. See the appendix section at the end of this document for a [list of supported values](#supported-contenttype-values).
* `saveStrategy`: The method by which the connection saves data as it is being ingested. The following options are accepted as values:
    * `overwrite`: Pulls in all data for ingestion, with no filters. The data store is overwritten each time data is ingested.
    * `delta`: Merges changes into existing data. Pulls in data after a designated `backfillDate` as described below.
    * `append`: Adds to existing data. Pulls in data after a designated `backfillDate` as described below.
* `backfillDate`: A date-time value from which to start data ingestion when using `delta` or `append` as the `saveStrategy`. This attribute is not compatible with `overwrite`, as that strategy will ingest all data regardless of timestamps. Data is picked up based on its last modified date. Accepted formats are `YYYY-MM-DD hh:mm:ss` and `YYYY-MM-DD`.

**Example date-time regex**

The following table shows example regex for the `connectors-objectDateTimeRegex` tag, including the ingestion frequencies they represent and example folder names that would be ingested.

| `connectors-objectDateTimeRegex` | Frequency | Example folder names |
| ---------------------------------|-----------|--------------------|
| dd-MM-yyyyTHH | Hourly | HourlyData-01-10-2018T08 </br> 01-10-2018T09-vip-customers|
| dd-MM-yyyy | Daily | DailyData-01-10-2018 </br> 01-12-2018-vip-customers |
| MM-yyyy | Monthly | MonthlyData-10-2018 </br> 11-2018-vip-customers|
| yyyy | Yearly | YearlyData-2018 </br> 2019-vip-customers |

**Example `isFolderRegex` behaviors**

The following table shows example values for the `isFolderRegex` tag, and how they behave for different S3 paths.

| S3 path | `isFolderRegex` | Ingestion behavior |
| ------- | ------------- | ----------- |
| s3://{Bucket-Name}/FolderA/ | false | All files inside FolderA having names with date-time regex values are picked. |
| s3://{Bucket-Name}/FolderA/ | true | All folders inside FolderA having names with date-time regex values are picked. All files within the matching folders are also be picked. |
| s3://{Bucket-Name}/FolderA/FolderB | true | All folders inside FolderA having names starting with "FolderB" and containing date-time regex values are picked. Since the S3 path does not end with a slash (`/`), the name of the last folder ("FolderB") is treated as a prefix for the regular expression being used. | 

#### Response

A successful response returns the `name` and `id` of the newly created dataset under a `success` attribute.

```json
{
    "success": [
        {
            "name": "VIPCustomersDataset",
            "id": "5cf8abadb9d7e11453eee27c"
        }
    ],
    "error": []
}
```

Now that a dataset has been created for your connection, the connection can ingest data. Before the connection ingests data for the first time, however, it is best practice to proceed to the next step of previewing the data for accuracy.

<!-- * Currently, the pipeline run is configured for a delay of 30 minutes between consecutive runs. In the future, this will be configurable. -->

## Preview data for accuracy

Before your S3 connector ingests data for the first time, it is best practice to preview the data to see if it will be ingested as expected. The following sections demonstrate the different available methods for previewing data using the Partner Connectors API.


### List the contents of a folder

#### API format

```http
GET /connections/{connectionId}/objects?object={S3_PATH}
```

* `{S3_PATH}`: The path to the S3 folder you want to preview.

#### Request

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/objects?object=s3://test-acpconnector-new/testConfigs/cc-sample-data-transformed/output_folder/' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of the specified folder's contents.

```json
[
    {
        "logicalName": "cc-sample-data-transformed/output_folder/sample_20190530T08.json",
        "displayName": "sample_20190530T08.json",
        "meta": {
            "type": "File",
            "isLeaf": "true"
        }
    }
]
```

### List the fields of a file

#### API format

```http
GET /connections/{connectionId}/fields?object={S3_PATH}&fileType={FILE_TYPE}
```

* `{S3_PATH}`: The path to the S3 file you want to preview.
* `{FILE_TYPE}`: The format of the file to be previewed. Supported values are `parquet`, `json`, and `delimited`.

#### Request

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/fields?object=s3://test-acpconnector-new/testConfigs/IncrementalTest/YearlyData_Folder_Regex/sample.parquet&fileType=parquet' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of XDM fields contained in the specified file.

```json
[
    {
        "logicalName": "id",
        "displayName": "id",
        "type": "Int64"
    },
    {
        "logicalName": "personalDetails.firstName",
        "displayName": "personalDetails.firstName",
        "type": "String"
    },
    {
        "logicalName": "personalDetails.age",
        "displayName": "personalDetails.age",
        "type": "Int64"
    },
    {
        "logicalName": "personalDetails.isEmployee",
        "displayName": "personalDetails.isEmployee",
        "type": "Boolean"
    },
    {
        "logicalName": "personalDetails.hobbies",
        "displayName": "personalDetails.hobbies",
        "type": "String"
    },
    {
        "logicalName": "email",
        "displayName": "email",
        "type": "String"
    },
    {
        "logicalName": "mobile",
        "displayName": "mobile",
        "type": "String"
    }
]
```

### Access the contents of a file

#### API format

```http
GET /connections/{connectionId}/rows?object={S3_PATH}&fileType={FILE_TYPE}
GET /connections/{connectionId}/rows?object={S3_PATH}&fileType=parquet&format={FORMAT}
```

* `{S3_PATH}`: The path to the S3 file you want to preview.
* `{FILE_TYPE}`: The format of the file to be previewed. Supported values are `parquet`, `json`, and `delimited`.
* `{FORMAT}`: Required when the `{FILE_TYPE}` is `parquet`. Supported values are `json` and `tabular`, corresponding to hierarchical and flat output respectively.

#### Request

The following request previews the contents of a parquet file with a tabular (flat) output.

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/57eaaa10a6604462ae5588925/rows?object=s3://test-acpconnector-new/testConfigs/IncrementalTest/YearlyData_Folder_Regex/sample.parquet&fileType=parquet&format=tabular' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the contents of the specified file.

```json
{
    "format": "tabular",
    "fields": [
        {
            "id": "1",
            "name": "events"
        }
    ],
    "data": [
        {
            "1": "[
                {
                    \"dts\":\"2019-03-16T01:59:51.369-0000\",
                    \"event_dts_end\":\"2019-03-16T01:59:51.369-0000\",
                    \"event_user_guid\":\"56B25044F4672820A490D45@AdobeID\",
                    \"event_type\":\"render\",\"event_subtype\":\"playlist\",
                    \"content_id\":\"14687aa3-7148-4518-aaca-df0bd71a0dbe\",
                    \"source_name\":\"Photoshop\",
                    \"source_platform\":\"Win\"
                },
                {
                    \"dts\":\"2019-03-16T01:59:51.369-0000\",
                    \"event_dts_end\":\"2019-03-16T01:59:51.369-0000\",
                    \"event_user_guid\":\"56B25044F4672820A490D45@AdobeID\",
                    \"event_type\":\"render\",
                    \"event_subtype\":\"playlist\",
                    \"content_id\":\"14687aa3-7148-4518-aaca-df0bd71a0dbe\",
                    \"source_name\":\"Photoshop\",
                    \"source_platform\":\"Win\"
                },
                {
                    \"dts\":\"2019-03-16T01:59:51.369-0000\",
                    \"event_dts_end\":\"2019-03-16T01:59:51.369-0000\",
                    \"event_user_guid\":\"56B25044F4672820A490D45@AdobeID\",
                    \"event_type\":\"render\",
                    \"event_subtype\":\"playlist\",
                    \"content_id\":\"14687aa3-7148-4518-aaca-df0bd71a0dbe\",
                    \"source_name\":\"Photoshop\",\"source_platform\":\"Win\"
                }
            ]"
        },
    ]
}
```

## Next steps

You have now successfully created an Amazon S3 connector and tested that it is correctly ingesting data into Platform. To create additional connections, see the [data connectors](../../technical_overview/acp_connectors_overview/acp-connectors-overview.md) documentation.

## Appendix

### Supported contentType values

The following table lists accepted `contentType` values for creating a connection dataset.

`contentType` | Description
--- | ---
application/vnd.adobe.xed-full+json; version=1 | Schema includes titles and descriptions. Returns first major version of the schema.
application/vnd.adobe.xed-full-notext+json; version=1 | Schema does not include titles or descriptions. Returns first major version of the schema.
application/vnd.adobe.xed-full-desc+json; version=1 | Schema includes descriptors. Returns first major version of the schema.

> **Note:** The above examples all use "version=1" for demonstration purposes. This value can be changed to return different major versions of a particular schema (for example, "version=3").