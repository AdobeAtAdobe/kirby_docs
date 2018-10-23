# Batch Ingestion Overview


The Batch Ingestion API allows you to ingest batch data into the Adobe Experience Platform. Data being ingested can be the profile data from a CRM system, or data that conforms to a known schema in the XDM registry.

![Bulk Data Ingestion](Bulk-Ingest.png)


The Swagger API reference documentation can be found [here](../../../../../../acpdr/swagger-specs/bulk-ingest-api.yaml).

## Using the API

The Data Ingestion API allows you to ingest data as batches (a unit of data that consists of one or more files to be ingested as a single unit) into the Adobe Experience Platform in three basic steps:

1. Creates a new batch. 
2. Uploads files to a specified dataset that matches the data's XDM schema. 
3. Signals the end of the batch. 


### Data Ingestion Prerequisites
- Data to upload must be in [.parquet](http://parquet.apache.org/documentation/latest/) format.
- A [dataset created in the Catalog component] (../allservices.html.html#!api-specification/markdown/narrative/technical_overview/catalog_architectural_overview/catalog_architectural_overview.md).
- Contents of the parquet file must match (a subset of) the schema of the dataset being uploaded into.
- Have your unique Access Token, given after authentication.

### Batch Ingestion Status
* **Active**:  The batch has been successfully promoted and is available for downstream consumption.

* **Loaded**: Data for the batch is complete and the batch is ready for promotion.

* **Loading**: Data is being uploaded and converted for this batch and is currently NOT ready to be promoted.

* **Staged**: The staging phase of the promotion process for a batch is complete and the ingestion job has been run.

* **Staging**: Data for the batch is being processed by Data Tracker.

* **Failed**: A terminal state that results from either a bad configuration and/or bad data.  In either case, it's mandatory that an actionable error is recorded along with the batch to enable you to make corrections and resubmit the data.

* **Abandoned**: The batch has not completed in the expected timeframe.

* **Aborted**: You has explicitly called an abort operation (via Batch Ingest API) for the specified batch.

* **Inactive**: The batch was successfully promoted, but has been reverted or has expired.  The batch is no longer available for downstream consumption.  


## Creating a Batch

#### POST /batches

Before data can be added to a dataset, it must be linked to a batch, which will later be uploaded into a specified dataset.

#### Request
POST /batches

```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
-H "accept: application/json" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
-d '{"datasetId":"{DATASET_ID}"}'
```
**IMS_ORG:** Your IMS organization credentials found in your unique Adobe Experience Platform integration.

**ACCESS_TOKEN:** Token provided after authentication.

**API_KEY:** Your specific API key value found in your unique Adobe Experience Platform integration.

**DATASET_ID:** The ID of the dataset to upload the files into.

#### Response
```JSON
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
    "createdUser": "string",
    "updatedUser": "string"
}
```
**BATCH_ID:** The ID of the batch that was just created (used in subsequent requests).

**IMS_ORG:** Your IMS org specified in the request.

**DATASET_ID:** The ID of the dataset to upload the files into.


### File Upload
After successfully creating a new batch for uploading, files can then be uploaded to a specific dataset.

You can upload files using the Small File Upload API. However, if your files are too large and the gateway limits exceeded--such as extended timeouts, requests for body size exceeded, and other constrictions--you can switch over to the Large File Upload API. This API uploads the file in chunks, and stitches data together using the Large File Upload Complete API call.

### Small File Upload
Once a batch is created, data can be uploaded to a preexisting dataset.  The file being uploaded must match its referenced XDM schema.

#### Request
PUT /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}

```SHELL
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet" \
-H "content-type: application/octet-stream" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}" \
--data-binary "@{FILE_PATH_AND_NAME}.parquet"
```
**BATCH_ID:** The ID of the batch.

**DATASET_ID:** The ID of the dataset to upload files.

**FILE_NAME:** Name of file as it will be seen in the dataset.

**IMS_ORG:** Your IMS organization credentials for your unique Adobe Experience Platform integration.

**ACCESS_TOKEN:** Token provided after authentication.

**FILE\_PATH\_AND_NAME:** The path and filename of the file to be uploaded into the dataset.

#### Response
```JSON
#Status 200 OK, with empty response
```

### Large File Upload - Create File
To upload a large file, the file must be split into smaller chunks and uploaded one at a time.

#### Request
POST /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}?action=initialize

```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/part1=a/part2=b/{FILE_NAME}.parquet?action=initialize" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key: {API_KEY}"
```
**BATCH_ID:** The ID of the batch.

**DATASET_ID:** The ID of the dataset ingesting the files.

**IMS_ORG:** Your IMS org credentials found in your unique Adobe Experience Platform integration.

**ACCESS_TOKEN:** Token provided after authentication.

**API_KEY:** Your specific API key value found in your unique Adobe Experience Platform integration.

#### Response
```JSON
#Status 201 CREATED, with empty response
```

### Large File Upload - Upload Subsequent Parts
After the file has been created, all subsequent chunks can be uploaded by making repeated PATCH requests, one for each piece of the file.

#### Request
PATCH /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}

```SHELL
curl -X PATCH "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/part1=a/part2=b/{FILE_NAME}.parquet" \
-H "content-type: application/octet-stream" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key: {API_KEY}" \
-H "Content-Range: bytes {CONTENT_RANGE}" \
--data-binary "@{FILE_PATH_AND_NAME}.parquet"
```
**BATCH_ID:** The ID of the batch.

**DATASET_ID:** The ID of the dataset to upload the files into.

**FILE_NAME:** Name of file as it will be seen in the dataset.

**IMS_ORG:** Your IMS org credentials found in your unique Adobe Experience Platform integration.

**ACCESS_TOKEN:** Token provided after authentication.

**FILE\_PATH\_AND_NAME:** The path and filename of the file to be uploaded into the dataset.

**CONTENT_RANGE:** The range of bytes of the file being uploaded with this request. (for example: 0-82/164)

#### Response
```JSON
#Status 200 OK, with empty response
```

### Signal Batch Completion
After all files have been uploaded to the batch, the batch can be signaled for completion. By doing this, the Catalog *DataSetFile* entries are created for the completed files and associated with the batch generated above. The Catalog batch is then marked as successful, which triggers any downstream flows to work on the available data.

#### Request
POST /batches/{BATCH_ID}?actions=COMPLETE

```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
```
**BATCH_ID:** The ID of the batch to be uploaded into the dataset.

**IMS_ORG:** Your IMS org credentials found in your unique Adobe Experience Platform integration.

**ACCESS_TOKEN:** Token provided after authentication.

**API_KEY:** Your specific API key value found in your unique Adobe Experience Platform integration.

#### Response
```JSON
#Status 200 OK, with empty response
```