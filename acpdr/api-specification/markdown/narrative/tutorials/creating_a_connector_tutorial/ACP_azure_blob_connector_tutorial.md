# Azure Blob connector for Adobe Experience Platform

The Azure Blob connector for Adobe Experience Platform provides an API and user interface to ingest data from your Azure Blob data store onto Adobe Experience Platform. The Azure Blob connector for Platform allows you to:

* Connect to your Azure Blob account.
* Select one or more datasets from a list of available datasets.
* Preview a sample of data for accuracy.
* Identify each dataset as a lookup file, event, or record.
* Set a schedule and frequency for ingesting data.
* Save the Azure Blob connector and modify it as needed.

This article provides a step-by-step tutorial on how to set up and configure the Azure Blob connector through API calls. For a comprehensive list of all API calls that are compatible with the connector, please refer to the [API reference documentation](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/partner-connectors-api.yaml).


## Authenticate and configure the Azure Blob connector
The following steps cover how to authenticate the data connection with the Azure Blob connector.

### Gather Experience Platform credentials

You will need an Adobe I/O account and the following credentials to authenticate API calls:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.

If you do not know your authentication credentials, please follow the steps in the [authenticating and accessing APIs tutorial](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).

### Gather Azure Blob credentials

You will need the following credentials:
* `{BLOB_CONNECTION_STRING}`: Your Azure Blob Connection String

### Create account and connection

Use your `{BLOB_CONNECTION_STRING}` to request an Azure Blob account and connection entity:

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
  -d '{
	"params": {
		"connectionString": {BLOB_CONNECTION_STRING}
	},
	"type": "azure-blob-inbound"
}
'
```

#### Response
```json
{
    "accountId": "{ACCOUNT_ID}",
    "connectionId": "{CONNECTION_ID}"
}
```

* `{ACCOUNT_ID}`: Account ID in catalog.
* `{CONNECTION_ID}`: Connection ID in catalog.

Copy down your `{ACCOUNT_ID}` and `{CONNECTION_ID}` for further use.

## Configure schedule for ingestion
> **Note:** This step is optional. Make this call only if you want to set up scheduled ingestion or send an empty JSON object as the payload for a one-time run.

You can schedule the `ingestStart` and `frequency` for data ingestion by making a PUT request to the /schedule endpoint. The request can provide an empty payload `{}` for one-time batch ingestion.

#### API format
```http
PUT /connections/{CONNECTION_ID}/schedule
```

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

**Daily**
```shell
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
```shell
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
```shell
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

```json
[
  "@/connections/{CONNECTION_ID}"
]
```

A successful response includes an array containing the ID of the newly updated connection.

## Create a dataset
The dataset defines the structure of the data that the connector ingests. Once you create the account and connection, you can use the `{CONNECTION_ID}` to create a dataset. You can configure datasets, pipeline, and triggers with a successful POST call.

The following are various properties of JSON for creating a dataset:

Property Name | Description
------------ | -------------
params/datasets/name  | Mandatory. Name of the dataset.
params/datasets/tags/* | Provide tags associated with data. The connectors-objectName tag is mandatory to specify the path in Azure Blob for ingestion. Rest of the tags are optional.
params/datasets/schemaRef  | Mandatory. This contains information about the schema of files to be ingested. This is pointer to the schema in XDM schema registry.

> **Important:** Ensure that you provide a unique and identifiable name for the dataset to identify it clearly when monitoring your data ingestion.
Below is an example of a simple request payload:

#### API format
```http
POST /connections/{CONNECTION_ID}/datasets
```

#### Request
```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/datasets \
  -H 'Accept: application/json' \
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
            {BLOB_PATH}
          ],
          "connectors-sourceFormat": [
            {SOURCE_FILE_FORMAT}
          ]
        },
        "schemaRef": {
          "id": {SCHEMA_ID},
          "contentType": {SCHEMA_CONTENT_TYPE}
        }
      }
    ]
  }
}'
```

* `{BLOB_PATH}`: Path of file/folder in MS Azure Blob to be ingested.
For example - https://{BLOB_URL_PREFIX}.blob.core.windows.net/{BLOB_CONTAINER}/{path-of-files-or-folder}/
* `{SOURCE_FILE_FORMAT}`: File format of the source file to be ingested. Can be one of `parquet`, `json` or `cvs`.
* `{SCHEMA_ID}`: Unique id of schema in XDM Schema Registry.
* `{SCHEMA_CONTENT_TYPE}`: Content-type and version of schema.

> Note: The allowed values for `connectors-sourceFormat` tag are `parquet`, `json` and `csv`. If not specified, default value of `parquet` is considered.

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

### Recursive ingestion
To recursively copy files from nested folders, add the `connectors-recursiveIngestion` tag inside the tags.

```SHELL
"connectors-recursiveIngestion": [
   "<true or false>"
]
```
Default value of `connectors-recursiveIngestion` tag is `false`. If this tag is set to `true`, it will pick up files from folders inside the folder specified in `{BLOB_PATH}` recursively starting from root level.

### Incremental ingestion

Incremental ingestion allows you to incrementally ingest data based on a preferred frequency and picked regularly from the specified location. You can specify a "backfill" date to start data ingestion from the specified date.

[Configuring a schedule for ingestion](#configure-schedule-for-ingestion) is mandatory in this case.

Incremental ingestion is supported in two ways:

* Generic format on `lastModifiedDate` of files.
* Regular expression (`DateTime` format) based on incremental ingestion using `connectors-objectDateTimeRegex` and `isFolderRegex` tags in payload for POST dataset. It provides capabilities to pick files and folders pertaining to a regular expression (regex).

### Incremental ingestion using `lastModifiedDate`
Files in the specified folder path `{S3_PATH}` are picked based on whether the file's last modified date falls within the trigger interval.

To support incremental ingestion using `lastModifiedDate`, you will need to provide `saveStrategy` and `backfillDate` in a create (POST) /dataset call, and ingestion `frequency` should be specified through a PUT request to the /schedule endpoint.

### Incremental ingestion using regular expressions
Currently, incremental ingestion through regex is supported in two ways:

* Providing regex for files
* Providing regex for folders

Additionally, to leverage scheduled ingestion in a higher performing way, data should be partitioned with a time-based format either in folders or in files for each application.

**Providing regex on folder name**

You can provide a `DateTime` format in the `connectors-objectDateTimeRegex` tag when creating a dataset, along with the `isFolderRegex` tag.

| Property Name                  | Description   |
| ------------------------------ |-------------  |
| `connectors-objectDateTimeRegex` | Provide supported DateTime formats in this tag. Similar Frequency (Daily for ddMMyyyy) should be set prior to post datasets.                                                              |
| `connectors-isFolderRegex`       | Boolean value to determine if regex should be implemented on folders. The default value is *false*. This can be used only if `connectors-objectDateTimeRegex` is also provided. |

Below are a few examples that use the regex tag and file format at the source:

| `connectors-objectDateTimeRegex` tag | Example file names |
| -------------------------------------|--------------------|
| dd-MM-yyyyTHH (Hourly) | {sample}-01-10-2018T08-{sample}.parquet, {sample}-01-10-2018T09-{sample}.parquet|
| dd-MM-yyyy (Daily) | {sample}-01-10-2018-{sample}.parquet , {sample}-01-12-2018-{sample}.parquet |
| MM-yyyy (Monthly) | {sample}-10-2018-{sample}.parquet |
| yyyy (Yearly) | {sample}-2018-{sample}.parquet , {sample}-2019-{sample}.parquet |

| Blob Path | isFolderRegex | Description |
| ------- | ------------- | ----------- |
| https://{BLOB_URL}/FolderA  | false | All files inside FolderA having names with {objectDateTimeRegex} values will be picked. |
| https://{BLOB_URL}/FolderA/ | true | Regex will be applied on folder names. All folders inside FolderA having names with {objectDateTimeRegex} values will be picked. All files within the matching folders will be picked. |
| https://{BLOB_URL}/FolderA/FolderB | true | Regex will be applied on folder names. All folders inside FolderA having names starting with FolderB and containing regex {objectDateTimeRegex} values will be picked. Since path does not end with '/', it will be treated as folder regex prefix.  |

#### API format
```http
POST /connections/{CONNECTION_ID}/datasets
```

#### Request

Payload example for regex-based incremental ingestion on files:

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/datasets \
  -H 'Accept: application/json' \
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
            {BLOB_PATH}
          ],
          "connectors-objectDateTimeRegex": [
            {SUPPORTED_REGEX}
          ],
          "connectors-isFolderRegex": [
            "<true or false>"
          ]
        },
        "schemaRef": {
          "id": {SCHEMA_ID},
          "contentType": {SCHEMA_CONTENT_TYPE}
        },
        "saveStrategy": "{SAVE_STRATEGY}",
        "backfillDate": "{BACKFILL_DATE}"
      }
    ]
  }
}'
```

* `{DATASET_NAME}`: Name of the dataset you want to create.
* `{BLOB_PATH}`: Path of file/folder in MS Azure Blob to be ingested.
For example - https://{BLOB_URL_PREFIX}.blob.core.windows.net/{BLOB_CONTAINER}/{path-of-files-or-folder}/
* `{SUPPORTED_REGEX}`: Regular expression to support hourly, daily, monthly or yearly scheduled-ingestion as defined above.
* `{SCHEMA_ID}`: Unique id of schema in XDM Schema Registry.
* `{SCHEMA_CONTENT_TYPE}`: Content-type and version of schema.
* `{SAVE_STRATEGY}`: Enum [overwrite/delta/appeSnd] to overwrite, change or add data. To specify how data will be ingested. Append and Delta options are sorted by time, requiring you to select a time-based property to order the data, such as `System Modstamp`, `Created Date`, or `Last Modified Date`.
* `{BACKFILL_DATE}`: Past date to begin ingestion.

### Default settings
* For an incremental ingestion, you must clean up the data after every ingestion run.
* Currently, the pipeline run is configured for a delay of 30 minutes between consecutive runs. In the future, this will be configurable.

## Additional Adobe Experience Platform APIs

In addition to the Create Account and Create Dataset APIs, you can use the following APIs for specific needs.

**Object Listing API**

This API lists the content of an Azure blob.

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects?object={BLOB_PATH}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

**Preview Object API**

This API lists the content of the file.


```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/rows?object={BLOB_PATH}&fileType=parquet&format=tabular' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

* `parquet`, `json` and `delimited` are supported values for the `fileType` query parameter.

* The `format` query parameter can take values `json` or `tabular`, corresponding to hierarchical and flat output respectively. Currently supported only for parquet files.

**Schema Discovery API**

This API lists fields of a file.

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/fields?object={BLOB_PATH}&fileType=parquet' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

> **Note:** `parquet`, `json` and `delimited` are supported values for the `fileType` query parameter.
