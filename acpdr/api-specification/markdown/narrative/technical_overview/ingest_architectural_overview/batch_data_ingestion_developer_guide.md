# Batch ingestion developer guide

This document provides a comprehensive overview of using [batch ingestion APIs][6]. Specifically, this documentation will show you how to do the following:

- [Ingest JSON files](#how-to-ingest-json-files)
- [Ingest Parquet files](#how-to-ingest-parquet-files)
- [Ingest large Parquet files](#how-to-ingest-large-parquet-files)
- [Ingest CSV files](#how-to-ingest-csv-files)
- [Cancel a batch](#cancelling-a-batch)
- [Delete a batch](#deleting-a-batch)
- [Replay a batch](#replaying-a-batch)

The appendix to this document provides information for [formatting data to be used for ingestion](#data-transformation-for-batch-ingestion), including sample CSV and JSON data files.

## Getting started

Catalog provides a RESTful API through which you can perform basic CRUD operations against the supported object types.

The following sections provide additional information that you will need to know or have on-hand in order to successfully make calls to the Catalog Service API.

This guide requires a working understanding of the following components of Adobe Experience Platform:

* [Batch ingestion](ingest_architectural_overview.md): Allows you to ingest data into Adobe Experience Platform as batch files.
* [Experience Data Model (XDM) System](xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Experience Platform organizes customer experience data.
* [Sandboxes](../sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

### Reading sample API calls

This guide provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform, including those belonging to Data Governance, are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../sandboxes/sandboxes-overview.md). 

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

## Types

When ingesting data, it is important to understand how Experience Data Model (XDM) schemas work. For more information about how XDM field types map to different formats, check out the [Schema Developer Guide][4].

There is some flexibility when ingesting data -  if a type does not match what is in the target schema, the data will be converted to the expressed target type.  If it cannot, it will fail the batch with a `TypeCompatibilityException`. 

For example, neither JSON nor CSV has a date or date-time type. As a result, these values are expressed using [ISO 8061 formatted strings][5] ("2018-07-10T15:05:59.000-08:00") or Unix Time formatted in milliseconds (1531263959000) and are converted at ingestion time to the target XDM type.

The table below shows the conversions supported when ingesting data.

| Inbound (row) vs Target (col) | String  | Byte  | Short  | Integer  | Long  | Double  | Date  | Date-Time  | Boolean  | Object  | Array  | Map |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:----:|
| String    | X | X | X | X | X | X | X | X |   |   |   |   |
| Byte      | X | X | X | X | X | X |   |   |   |   |   |   |
| Short     | X | X | X | X | X | X |   |   |   |   |   |   |
| Integer   | X | X | X | X | X | X |   |   |   |   |   |   |
| Long      | X | X | X | X | X | X | X | X |   |   |   |   |
| Double    | X | X | X | X | X | X |   |   |   |   |   |   |
| Date      |   |   |   |   |   |   | X |   |   |   |   |   |
| Date-Time |   |   |   |   |   |   |   | X |   |   |   |   |
| Boolean   |   |   |   |   |   |   |   |   | X |   |   |   |
| Object    |   |   |   |   |   |   |   |   |   | X |   | X |
| Array     |   |   |   |   |   |   |   |   |   |   | X |   |
| Map       |   |   |   |   |   |   |   |   |   |   |   | X |


## Ingestion Constraints

Batch data ingestion has some constraints:
- Maximum number of files per batch: 1500
- Maximum batch size: 100 GB
- Maximum number of properties or fields per row: 10000
- Maximum number of batches per minute, per user: 138

## How to Ingest JSON files

> **Note**: The following steps are applicable for small files (256 MB or less). If you hit a gateway timeout or request body size errors, you need to switch to large file upload.

### Create Batch

Firstly, you will need to create a batch, with JSON as the input format. When creating the batch, you will need to provide a dataset ID. You will also need to ensure that all the files uploaded as part of the batch conform to the XDM schema linked to the provided dataset.

#### API format

```http
POST /batches
```

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "Accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
  -d '{
          "datasetId": "{DATASET_ID}",
           "inputFormat": {
                "format": "json"
           }
      }'
```   
- `{DATASET_ID}`: The ID of the reference dataset.

#### Response

```json
{
    "id": "{BATCH_ID}",
    "imsOrg": "{IMS_ORG}",
    "updated": 0,
    "status": "loading",
    "created": 0,
    "relatedObjects": [
        {
            "type": "dataSet",
            "id": "{DATASET_ID}"
        }
    ],
    "version": "1.0.0",
    "tags": {},
    "createdUser": "{USER_ID}",
    "updatedUser": "{USER_ID}"
}
```

Where:

- `{BATCH_ID}`: The ID of the newly created batch.  
- `{DATASET_ID}`: The ID of the referenced dataset.  

### Upload files

Now that you have created a batch, you can use the `batchId` from before to upload files to the batch. You can upload multiple files to the batch.

> **Note:** See the appendix section for an [example of a properly-formatted JSON data file](#data-transformation-for-batch-ingestion).


#### API format

```http
PUT /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}
```
- `{BATCH_ID}`: The ID of the batch you just created.
- `{DATASET_ID}`: The ID of the dataset that you're referring to in the created batch.
- `{FILE_NAME}`: The name of the file you want to upload.

#### Request

```shell
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.json" \
  -H "content-type: application/octet-stream" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}" \
  --data-binary "@{FILE_PATH_AND_NAME}.json"
```  
- `{FILE_PATH_AND_NAME}`: The full path and name of the file you're trying to upload.  

> **Note**: The API only supports single-part upload. Ensure that the content-type is application/octet-stream. 

#### Response

```http
200 OK
```

### Complete Batch

Once you have finished uploading all the different parts of the file, you will need to signal that the data has been fully uploaded, and that the batch is ready for promotion.

#### API format

```http
POST /batches/{BATCH_ID}?action=COMPLETE
```
- `{BATCH_ID}`: The ID of the batch you created.  

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
``` 

#### Response

```http
200 OK
```

## How to ingest Parquet files

> **Note**: The following steps are applicable for small files (256 MB or less). If you hit a gateway timeout or request body size errors, you will need to switch to large file upload.

### Create Batch

Firstly, you will need to create a batch, with Parquet as the input format. When creating the batch, you will need to provide a dataset ID. You will also need to ensure that all the files uploaded as part of the batch conform to the XDM schema linked to the provided dataset.

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
  -d '{
          "datasetId": "{DATASET_ID}",
           "inputFormat": {
                "format": "parquet"
           }
      }'
```

Where:

- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.   
- `{DATASET_ID}`: The ID of the reference dataset.

#### Response

```http
201 Created
```

```json
{
    "id": "{BATCH_ID}",
    "imsOrg": "{IMS_ORG}",
    "updated": 0,
    "status": "loading",
    "created": 0,
    "relatedObjects": [
        {
            "type": "dataSet",
            "id": "{DATASET_ID}"
        }
    ],
    "version": "1.0.0",
    "tags": {},
    "createdUser": "{USER_ID}",
    "updatedUser": "{USER_ID}"
}
```

Where:

- `{BATCH_ID}`: The ID of the newly created batch.  
- `{IMS_ORG}`: The ID of the IMS Organization that created the batch.  
- `{DATASET_ID}`: The ID of the referenced dataset.  
- `{USER_ID}`: The ID of the user who created the batch.

### Upload files

Now that you have created a batch, you can use the `batchId` from before to upload files to the batch. You can upload multiple files to the batch.

#### Request

```shell
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet" \
  -H "content-type: application/octet-stream" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}" \
  --data-binary "@{FILE_PATH_AND_NAME}.parquet"
```

Where:

- `{BATCH_ID}`: The ID of the batch you just created.
- `{DATASET_ID}`: The ID of the dataset that you're referring to in the created batch.
- `{FILE_NAME}`: The name of the file you want to upload.
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.   
- `{FILE_PATH_AND_NAME}`: The full path and name of the file you're trying to upload.  

> **Note**: The API only supports single-part upload. Ensure that the content-type is application/octet-stream.

#### Response

```http
200 OK
```

### Complete Batch

Once you have finished uploading all the different parts of the file, you will need to signal that the data has been fully uploaded, and that the batch is ready for promotion.

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

Where:

- `{BATCH_ID}`: The ID of the newly created batch.  
- `{IMS_ORG}`: The ID of the IMS Organization that created the batch.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  

#### Response

```http
200 OK
```

## How to ingest large Parquet files

> **Note**: This section details how to upload files that are larger than 256 MB. The large files are uploaded in chunks and then stitched via an API signal.

### Create Batch

Firstly, you will need to create a batch, with Parquet as the input format. When creating the batch, you will need to provide a dataset ID. You will also need to ensure that all the files uploaded as part of the batch conform to the XDM schema linked to the provided dataset.

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
  -d '{
          "datasetId": "{DATASET_ID}",
           "inputFormat": {
             "format": "parquet"
           }
      }'
```

Where:

- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.   
- `{DATASET_ID}`: The ID of the reference dataset.

#### Response

```http
201 Created
```
```json
{
    "id": "{BATCH_ID}",
    "imsOrg": "{IMS_ORG}",
    "updated": 0,
    "status": "loading",
    "created": 0,
    "relatedObjects": [
        {
            "type": "dataSet",
            "id": "{DATASET_ID}"
        }
    ],
    "version": "1.0.0",
    "tags": {},
    "createdUser": "{USER_ID}",
    "updatedUser": "{USER_ID}"
}
```

Where:

- `{BATCH_ID}`: The ID of the newly created batch.  
- `{IMS_ORG}`: The ID of the IMS Organization that created the batch.  
- `{DATASET_ID}`: The ID of the referenced dataset.  
- `{USER_ID}`: The ID of the user who created the batch.

### Initialize Large File

After creating the batch, you will need to initialize the large file before uploading chunks to the batch.

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet?action=INITIALIZE" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}"
```

Where:

- `{BATCH_ID}`: The ID of the batch you just created.
- `{DATASET_ID}`: The ID of the dataset that you're referring to in the created batch.
- `{FILE_NAME}`: The name of the file you want to upload.
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.   

#### Response

```http
201 Created
```

### Upload Large File Chunks

Now that the file has been created, all subsequent chunks can be uploaded by making repeated PATCH requests, one for each section of the file.

#### Request

```shell
curl -X PATCH "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet" \
  -H "content-type: application/octet-stream" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}" \
  -H "Content-Range: bytes {CONTENT_RANGE}" \
  --data-binary "@{FILE_PATH_AND_NAME}.parquet"
```

Where:

- `{BATCH_ID}`: The ID of the batch you just created.
- `{DATASET_ID}`: The ID of the dataset that you're referring to in the created batch.
- `{FILE_NAME}`: The name of the file you want to upload.
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.   
- `{CONTENT_RANGE}`: In integers, the beginning and the end of the requested range.
- `{FILE_PATH_AND_NAME}`: The full path and name of the file you're trying to upload.  

> **Note**: The API only supports single-part upload. Ensure that the content-type is application/octet-stream.

#### Response

```http
200 OK
```

### Complete Large File

Now that you have created a batch, you can use the `batchId` from before to upload files to the batch. You can upload multiple files to the batch.

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet?action=COMPLETE" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}"
```

Where:

- `{BATCH_ID}`: The ID of the batch you created. 
- `{DATASET_ID}`: The ID of the dataset that you're referring to in the created batch.
- `{FILE_NAME}`: The name of the file you want to upload.
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  

#### Response

```http
201 Created
```

### Complete Batch

Once you have finished uploading all the different parts of the file, you will need to signal that the data has been fully uploaded, and that the batch is ready for promotion.

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

Where:

- `{BATCH_ID}`: The ID of the batch you created.  
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  

#### Response

```http
200 OK
```

## How to ingest CSV files

In order to ingest CSV files, you'll need to create a class, schema, and a dataset that supports CSV. For detailed information on how to create the necessary class and schema, follow the instructions provided in the [Schema Registry Developer Guide][ad-hoc]. 

> **Note**: The following steps are applicable for small files (256 MB or less). If you hit a gateway timeout or request body size errors, you will need to switch to large file upload.

### Create Dataset

After following the instructions above to create the necessary class and schema, you'll need to create a dataset that can support CSV.

#### Request

```shell
curl -X POST 'https://platform.adobe.io/data/foundation/catalog/dataSets'
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
      "name": "{DATASET_NAME}",
      "schemaRef": {
          "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
          "contentType": "application/vnd.adobe.xed+json;version=1"
      },
      "fileDescription": {
          "format": "parquet",
          "delimiters": [","], 
          "quotes": ["\""],
          "escapes": ["\\"],
          "header": true,
          "charset": "UTF-8"
      }      
  }'

```

Where:

- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.   
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{TENANT_ID}`: This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Org.
- `{SCHEMA_ID}`: The ID of the schema you've created.

An explanation of what the different part of the "fileDescription" section of the JSON body can be seen below:

```json
{
    "fileDescription": {
        "format": "parquet",
        "delimiters": [","],
        "quotes": ["\""],
        "escapes": ["\\"],
        "header": true,
        "charset": "UTF-8"
    }
}
```

- "format": The format of the mastered file, not the format of the input file.
- "delimiters": The character to use as the delimiter.
- "quotes": The character to use for quotes.
- "escapes": The character to use as the escape character.
- "header": The uploaded file **must** contain headers. Since schema validation is done, this must be set to true. In addition, headers may **not** contain any spaces - if you have any spaces in your header, please replace them with underscores instead.
- "charset": An optional field. Other supported charsets include "US-ASCII" and "ISO-8869-1". If left empty, UTF-8 is assumed by default.

The dataset referenced must have the file description block listed above and must point to a valid schema in the registry. Otherwise, the file will not be mastered into parquet.

### Create Batch

Next, you will need to create a batch with CSV as the input format. When creating the batch, you will need to provide a dataset ID. You will also need to ensure that all of the files uploaded as part of the batch conform to the schema linked to the provided dataset.

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
  -d '{
          "datasetId": "{DATASET_ID}",
           "inputFormat": {
             "format": "csv"
           }
      }'
```

Where:

- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.   
- `{DATASET_ID}`: The ID of the reference dataset.

#### Response

```http
201 Created
```
```json
+{
    "id": "{BATCH_ID}",
    "imsOrg": "{IMS_ORG}",
    "updated": 0,
    "status": "loading",
    "created": 0,
    "relatedObjects": [
        {
            "type": "dataSet",
            "id": "{DATASET_ID}"
        }
    ],
    "version": "1.0.0",
    "tags": {},
    "createdUser": "{USER_ID}",
    "updatedUser": "{USER_ID}"
}
```

Where:

- `{BATCH_ID}`: The ID of the newly created batch.  
- `{IMS_ORG}`: The ID of the IMS Organization that created the batch.  
- `{DATASET_ID}`: The ID of the referenced dataset.  
- `{USER_ID}`: The ID of the user who created the batch.

### Upload files

Now that you have created a batch, you can use the `batchId` from before to upload files to the batch. You can upload multiple files to the batch.

> **Note:** See the appendix section for an [example of a properly-formatted CSV data file](#data-transformation-for-batch-ingestion).

#### Request

```shell
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.csv" \
  -H "content-type: application/octet-stream" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}" \
  --data-binary "@{FILE_PATH_AND_NAME}.csv"
```

Where:

- `{BATCH_ID}`: The ID of the batch you just created.
- `{DATASET_ID}`: The ID of the dataset that you're referring to in the created batch.
- `{FILE_NAME}`: The name of the file you want to upload.
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.   
- `{FILE_PATH_AND_NAME}`: The full path and name of the file you're trying to upload.  

> **Note**: The API only supports single-part upload. Ensure that the content-type is application/octet-stream.

#### Response

```http
200 OK
```

### Complete Batch

Once you have finished uploading all of the different parts of the file, you will need to signal that the data has been fully uploaded, and that the batch is ready for promotion.

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

Where:

- `{BATCH_ID}`: The ID of the newly created batch.  
- `{IMS_ORG}`: The ID of the IMS Organization that created the batch.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  

#### Response

```http
200 OK
```

## Cancelling a batch

While the batch is processing, it can still be cancelled. However, once a batch is finalized (such as either a success or failed state), the batch cannot be cancelled.

### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=ABORT" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

Where:

- `{BATCH_ID}`: The ID of the batch you want to cancel.  
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.   

### Response

```http
200 OK
```

## Deleting a batch

A batch can be deleted by performing the following POST request with the `action=REVERT` query parameter to the ID of the batch you wish to delete. The batch is the marked as "inactive", making it eligible for garbage collection. The batch will be asynchronously collected, at which time it will be marked as "deleted".

### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=REVERT" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

Where:

- `{BATCH_ID}`: The ID of the newly created batch.  
- `{IMS_ORG}`: The ID of the IMS Organization that created the batch.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  

### Response

```http
200 OK
```

## Replaying a batch

If you want to replace an already ingested batch, you can do so with "batch replay" - this action is equivalent to deleting the old batch and ingesting a new one instead.

### Create Batch

Firstly, you will need to create a batch, with JSON as the input format. When creating the batch, you will need to provide a dataset ID. You will also need to ensure that all the files uploaded as part of the batch conform to the XDM schema linked to the provided dataset. Additionally, you will need to provide the old batch(es) as reference in the replay section. In the  example below, you are replaying batches with IDs `batchIdA` and `batchIdB`.

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
  -d '{
          "datasetId": "{DATASET_ID}",
           "inputFormat": {
             "format": "json"
           },
            "replay": {
                "predecessors": ["${batchIdA}","${batchIdB}"],
                "reason": "replace"
             }
      }'
```

Where: 

- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.   
- `{DATASET_ID}`: The ID of the reference dataset.

#### Response

```http
201 Created
```

```json
{
    "id": "{BATCH_ID}",
    "imsOrg": "{IMS_ORG}",
    "updated": 0,
    "status": "loading",
    "created": 0,
    "relatedObjects": [
        {
            "type": "dataSet",
            "id": "{DATASET_ID}"
        }
    ],
    "replay": {
        "predecessors": [
            "batchIdA", "batchIdB"
        ],
        "reason": "replace"
    },
    "version": "1.0.0",
    "tags": {},
    "createdUser": "{USER_ID}",
    "updatedUser": "{USER_ID}"
}
```

Where:

- `{BATCH_ID}`: The ID of the newly created batch.  
- `{IMS_ORG}`: The ID of the IMS Organization that created the batch.  
- `{DATASET_ID}`: The ID of the referenced dataset.  
- `{USER_ID}`: The ID of the user who created the batch.


### Upload files

Now that you have created a batch, you can use the `batchId` from before to upload files to the batch. You can upload multiple files to the batch.

#### Request

```shell
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.json" \
  -H "content-type: application/octet-stream" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}" \
  --data-binary "@{FILE_PATH_AND_NAME}.json"
```

Where:

- `{BATCH_ID}`: The ID of the batch you just created.
- `{DATASET_ID}`: The ID of the dataset that you're referring to in the created batch.
- `{FILE_NAME}`: The name of the file you want to upload.
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.     
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.   
- `{FILE_PATH_AND_NAME}`: The full path and name of the file you're trying to upload.  

> **Note**: The API only supports single-part upload. Ensure that the content-type is application/octet-stream. Do not use the curl -F option, as it defaults to multi-part request that's incompatible with the API.

#### Response

```http
200 OK
```

### Complete Batch

Once you have finished uploading all the different parts of the file, you will need to signal that the data has been fully uploaded, and that the batch is ready for promotion.

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

- `{BATCH_ID}`: The ID of the batch you created.  
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  

#### Response

```http
200 OK
```

## Appendix

### Data transformation for batch ingestion

In order to ingest a data file into Experience Platform, the hierarchical structure of the file must comply with the [Experience Data Model (XDM)](../schema_registry/xdm_system/xdm_system_in_experience_platform.md) schema associated with the dataset being uploaded to.

Information on how to map a CSV file to comply with an XDM schema can be found in the [sample transformations](../../integration_guides/etl_integration_guide/etl_transformation.md) document, along with an example of a properly formatted JSON data file. Sample files provided in the document can be found here:

* [CRM_profiles.csv](https://github.com/adobe/experience-platform-etl-reference/blob/master/example_files/CRM_profiles.csv)
* [CRM_profiles.json](https://github.com/adobe/experience-platform-etl-reference/blob/master/example_files/CRM_profiles.json)

[1]: ../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md 

[2]: https://medium.com/adobetech/using-postman-for-jwt-authentication-on-adobe-i-o-7573428ffe7f

[3]: ../../tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md

[4]: ../schema_registry/schema_registry_developer_guide.md

[5]: https://www.iso.org/iso-8601-date-and-time-format.html

[6]: ../../../../../../acpdr/swagger-specs/ingest-api.yaml

[ad-hoc]: ../schema_registry/schema_registry_developer_guide.md#ad-hoc-schema-workflow