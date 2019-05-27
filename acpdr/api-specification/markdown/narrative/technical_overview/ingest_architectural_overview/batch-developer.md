# Batch ingestion for developers

- [Batch ingestion for developers](#batch-ingestion-for-developers)
- [Prerequisites](#prerequisites)
- [Ingestion Constraints](#ingestion-constraints)
- [Related Links](#related-links)
- [Types](#types)
- [Recipes](#recipes)
  - [How to ingest JSON file(s)](#how-to-ingest-json-files)
      - [1. Create Batch](#1-create-batch)
      - [2. Upload files](#2-upload-files)
      - [3. Complete Batch](#3-complete-batch)
  - [How to ingest Parquet file(s)](#how-to-ingest-parquet-files)
      - [1. Create Batch](#1-create-batch-1)
      - [2. Upload files](#2-upload-files-1)
      - [3. Complete Batch](#3-complete-batch-1)
  - [How to ingest large parquet file(s)](#how-to-ingest-large-parquet-files)
      - [1. Create Batch](#1-create-batch-2)
      - [2.1 Initialize Large File](#21-initialize-large-file)
      - [2.2 Upload Large File Chunks](#22-upload-large-file-chunks)
      - [2.3 Complete Large File](#23-complete-large-file)
      - [3. Complete Batch](#3-complete-batch-2)
  - [How to abort a batch](#how-to-abort-a-batch)
  - [How to delete a batch](#how-to-delete-a-batch)
  - [How to replay a batch](#how-to-replay-a-batch)
      - [1. Create Batch](#1-create-batch-3)
      - [2. Upload files](#2-upload-files-2)
      - [3. Complete Batch](#3-complete-batch-3)

# Prerequisites
- You must have a valid {ACCESS_TOKEN}, {API_KEY} and {IMS_ORG}. See this [tutorial](https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for help, if needed.
- Must have valid {DATASET_ID}.  See this [tutorial](https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md) for help, if needed.
# Ingestion Constraints
- Max files per batch: 1500
- Max batch size: 100gb
- Max number of properties/field per row: 10k
- Max batches/minute per provider: 138
# Related Links
- [Batch Ingestion API](https://git.corp.adobe.com/pages/experience-platform/api-specification/?urls.primaryName=%E2%94%94%20Bulk%20Ingestion%20API)
- [Troubleshooting Guide](https://git.corp.adobe.com/pages/experience-platform/siphon-troubleshooting-guide/)
# Types
When ingesting data, it's important to understand the underlying system of XDM schemas.  The batches you submit will be validated
against a "target" schema that expresses the shape of your data with type and constraint information defined in the schema.
See this [XDM specification](https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=DMSArchitecture&title=XDM+Architecture#XDMArchitecture-XDMDataTypes) 
for detailed mappings between XDM schema logical data types and physical formats (such as JSON, Parquet).

Siphon allows for some flexibility when ingesting data.  If a type does not match what is in the target schema,
Siphon will make a best effort to convert the data to the expressed target type.  If it can't, it will fail the batch with a
`TypeCompatibilityException`. 

For example, JSON (or CSV) does not have a date or 
date-time type. Consequently, such values are expresses using strings ([ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) 
e.g. "2018-07-10T15:05:59.000-08:00") or numbers (Unix Time in milliseconds for example 1531263959000) and Siphon converts them at 
ingestion time to the target XDM type.

The matrix below shows the conversions supported by Siphon when ingesting data.

| Inbound (row) vs Target (col) | String  | Byte  | Short  | Integer  | Long  | Double  | Date  | Date-Time  | Boolean  | Object  | Array  | Map |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
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

# Recipes

## How to ingest JSON file(s)

> NOTE: Below are steps applicable for ingestion of files that are below a size threshold (256MB). If you hit a gateway timeout or request body size errors, you might want to switch to large file upload as described in the following section.

#### 1. Create Batch
You need to create a batch providing the format as JSON and reference
to the dataset for which you are going to ingest data. The XDM schema linked to
the referenced dataset is validated against it when ingesting the data. All
files uploaded as part of the batch must conform to the schema.

`POST /batches`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
  -d '{
          "datasetId": "{DATASET_ID}",
           "inputFormat": {
             "format": "json"
           }
      }'
```

**RESPONSE**

201 Created

```
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

#### 2. Upload files
Use the `batchId` created earlier to post to the below URL. You can upload multiple files.

`PUT /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}`

**REQUEST**

```
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.json" \
  -H "content-type: application/octet-stream" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}" \
  --data-binary "@{FILE_PATH_AND_NAME}.json"
```

> NOTE: The API supports single-part upload only.
> Ensure that the content-type is application/octet-stream.
> DON'T use the curl -F option as it defaults to multi-part request that's
> incompatible with the API.

**RESPONSE**

200 Ok

#### 3. Complete Batch

Signal data ingestion that the data is uploaded and the batch is ready for promotion.

`POST /batches/{BATCH_ID}?action=COMPLETE`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
```

**RESPONSE**

200 OK

## How to ingest Parquet file(s)

> NOTE: Below steps are applicable for ingestion of files that are below a size threshold (256MB). If you hit gateway timeout or request body size errors, you might want to switch to large file upload, described in the following section.

#### 1. Create Batch
You will need to create a batch providing the format as Parquet and reference
 the dataset for which you are going to ingest data. The XDM schema linked to
the referenced dataset is validated against when ingesting the data. All
files uploaded as part of this batch must conform to the schema.

`POST /batches`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
  -d '{
          "datasetId": "{DATASET_ID}",
           "inputFormat": {
             "format": "parquet"
           }
      }'
```

**RESPONSE**

201 Created

```
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

#### 2. Upload files
Use the `batchId` created earlier to post to the below URL. You can upload multiple files:

`PUT /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}`

**REQUEST**

```
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet" \
  -H "content-type: application/octet-stream" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}" \
  --data-binary "@{FILE_PATH_AND_NAME}.parquet"
```

> NOTE: The API supports single-part upload only.
> Ensure that the content-type is application/octet-stream.
> DON'T use the curl -F option as it defaults to multi-part request that's
> incompatible with the API

**RESPONSE**

200 OK

#### 3. Complete Batch

Signal Data Ingestion that the data is uploaded and the batch is ready for promotion

`POST /batches/{BATCH_ID}?action=COMPLETE`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
```

**RESPONSE**

200 OK

## How to ingest large parquet file(s)

> NOTE: This section details how to upload files that are large enough to be PUT via the regular upload endpoint. The large files are uploaded in chunks and then stitched via api signal.

#### 1. Create Batch
We need to create a batch providing the format as parquet and reference
to the dataset we're going to ingest data for. The xdm schema linked to
the referenced dataset is validated against when ingesting the data. So all
filed uploaded as part of this batch must conform to the schema.

`POST /batches`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
  -d '{
          "datasetId": "{DATASET_ID}",
           "inputFormat": {
             "format": "parquet"
           }
      }'
```

**RESPONSE**

201 Created

```
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

#### 2.1 Initialize Large File
We initialize the large file before uploading chunks to it

`POST /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}?action=INITIALIZE`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet?action=INITIALIZE" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}"
```

**RESPONSE**

201 Created

#### 2.2 Upload Large File Chunks

After the file has been created, all subsequent chunks can be uploaded by making repeated PATCH requests, one for each section of the file.

`PATCH /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet`

**REQUEST**
```
curl -X PATCH "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet" \
  -H "content-type: application/octet-stream" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}" \
  -H "Content-Range: bytes {CONTENT_RANGE}" \
  --data-binary "@{FILE_PATH_AND_NAME}.parquet"
```

> NOTE: The API supports single-part upload only.
> Ensure that the content-type is application/octet-stream.
> DON'T use the curl -F option as it defaults to multi-part request that's
> incompatible with the API.

**RESPONSE**

200 Ok

#### 2.3 Complete Large File
Use the `batchId` created earlier to post to the below URL. You can upload multiple files

`POST /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}?action=COMPLETE`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet?action=COMPLETE" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}"
```

**RESPONSE**

200 Created



#### 3. Complete Batch

Signal data ingestion that the data is uploaded and the batch is ready for promotion.

`POST /batches/{BATCH_ID}?action=COMPLETE`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
```

**RESPONSE**

200 OK

## How to abort a batch

A batch can be aborted while it is processing. 

>Note: a batch cannot be aborted once it is finalized (i.e., in a success or otherwise failed status).

`POST /batches/{BATCH_ID}?action=ABORT`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=ABORT" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
```

**RESPONSE**

200 OK

## How to delete a batch

A batch can be withdrawn via the REVERT operation. Note that the API call will put the batch in an "inactive" state and make it eligible for garbage collection. The batch will be collected asynchronously and marked deleted once that happens.

`POST /batches/{BATCH_ID}?action=REVERT`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=REVERT" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
```

**RESPONSE**

200 OK

## How to replay a batch

Already ingested batch(es) can be replaced by another batch. This action is recognized as "Batch replay" and is equivalent of deleting the old batch(es) and ingesting a new one. 

The complete batch lifecycle is followed, as if ingesting a new batch, while specifying the old batch(es) that we're replacing as a `CreateBatch` payload parameter. Siphon ensures that the batches are atomically swapped when the new batch is ready for mastering.

#### 1. Create Batch

If ingesting data in JSON format, you will need to create a batch providing the format as JSON and reference
the dataset for which you are going to ingest data. The XDM schema linked to
the referenced dataset is validated against when ingesting the data. Consequently, all
files uploaded as part of this batch must conform to the schema. Additionally, you will need
to provide the old batch(es) as reference in the replay section. In the  example below, you are replaying batches with ids `batchIdA` and `batchIdB`

`POST /batches`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
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

**RESPONSE**

201 Created

```
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

#### 2. Upload files
Use the `batchId` created earlier to post to the below URL. You can upload multiple files

`PUT /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}`

**REQUEST**

```
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.json" \
  -H "content-type: application/octet-stream" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}" \
  --data-binary "@{FILE_PATH_AND_NAME}.json"
```

> NOTE: The API supports single-part upload only.
> Ensure that the content-type is application/octet-stream.
> DON'T use the curl -F option as it defaults to multi-part request that's
> incompatible with the API

**RESPONSE**

200 OK

#### 3. Complete Batch

Signal data ingestion that the data is uploaded and the batch is ready for promotion.

`POST /batches/{BATCH_ID}?action=COMPLETE`

**REQUEST**

```
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
```

**RESPONSE**

200 OK