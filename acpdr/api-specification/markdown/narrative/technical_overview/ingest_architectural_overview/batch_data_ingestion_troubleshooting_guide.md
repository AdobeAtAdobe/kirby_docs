# Batch Data Ingestion Troubleshooting Guide

This documentation will help answer frequently asked questions regarding Adobe Experience Platform Batch Data Ingestion APIs. Specifically, this documentation will answer the following questions:

## Batch API Calls

- [Are batches immediately active after receiving an HTTP 200 OK from the CompleteBatch API?](#are-batches-immediately-active-after-receiving-an-http-200-ok-from-the-completebatch-api)
- [Is it safe to retry the CompleteBatch API call after it fails?](#is-it-safe-to-retry-the-completebatch-api-call-after-it-fails)
- [When should the Large File Upload API be used?](#when-should-the-large-file-upload-api-be-used)
- [Why is the Large File Complete API call failing?](#why-is-the-large-file-complete-api-call-failing)

## Ingestion Support

- [What are the supported ingestion formats?](#what-are-the-supported-ingest-formats)
- [Where should the input batch format be specified?](#where-should-the-batch-input-format-be-specified)
- [How is multi-line JSON ingested?](#how-is-multi-line-json-ingested)
- [What is the difference between single-line and multi-line JSON?](#what-is-the-difference-between-json-lines-single-line-json-and-multi-line-json)
- [Is CSV ingestion supported?](#is-csv-ingestion-supported)
- [What types of validation are performed on the data?](#what-types-of-validation-are-performed-on-the-data)
- [How can an already ingested batch be replaced?](#how-can-an-already-ingested-batch-be-replaced)
- [How is batch ingestion monitored?](#how-is-batch-ingestion-monitored)

## Batch States

- [What are the possible batch states?](#what-are-the-possible-batch-states)
- [What does the "Staging" state mean for batches?](#what-does-%22staging%22-mean-for-batches)
- [What does the "Retrying" state mean for a batch?](#what-does-it-mean-when-a-batch-is-%22retrying%22)
- [What does the "Stalled" state mean for a batch?](#what-does-it-mean-when-a-batch-is-%22stalled%22)
- [What does the "Loading" state mean for a batch?](#what-does-it-mean-if-a-batch-is-still-%22loading%22)
- [Is there a way to know if a batch is successfully ingested?](#is-there-a-way-to-know-if-a-batch-has-been-successfully-ingested)
- [What happens after a batch fails?](#what-happens-after-a-batch-fails)


## Batch Support

- [How should batches be deleted?](#how-should-batches-be-deleted)
- [What batch-level metrics are available?](#what-batch-level-metrics-are-available)
- [Why are batch-level metrics not available on all batches?](#why-are-metrics-not-available-on-some-batches)
- [What do the different status codes mean?](#what-do-the-different-status-codes-mean)

---

# Batch API Calls

## Are batches immediately active after receiving an HTTP 200 OK from the CompleteBatch API?

The `200 OK` response from the API means that the batch has been accepted for processing - it is not active until it transitions to its final state, such as Active or Failure. 

## Is it safe to retry the CompleteBatch API call after it fails?

Yes - it is safe to retry the API call. Despite the failure, it is possible that the operation actually succeeded and the batch was successfully accepted. However, clients are expected to have retry mechanisms in case of API failure, and are, in fact, encouraged to retry. If the operation actually succeeded, the API will return success, even after retrying.

## When should the Large File Upload API be used?

The recommended file size for using the Large File Upload API is 256 MB or larger. More information about how to use the Large File Upload API can be found [here][large-file-upload].

## Why is the Large File Complete API call failing?

If chunks of a large file are found overlapping or missing, the server responds with an HTTP 400 Bad Request. This can occur because it is possible to upload overlapping chunks, as range validations are done at the time of file completion, when the file chunks are stitched together.

---

# Ingestion Support

## What are the supported ingest formats?

Currently, both Parquet and JSON are supported. CSV is supported on a legacy basis - while data will be promoted to master and preliminary checks will be done, no modern features, such as conversion, partitioning, or row validation will be supported.

## Where should the batch input format be specified?

The input format should be specified at batch creation time within the payload. An example of how to specify the batch input format can be seen below:

```shell
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

## How is multi-line JSON ingested?

To ingest multi-line JSON, the `isMultiLineJson` flag needs to be set at the time of batch creation. An example of this can be seen below:

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
  -d '{
          "datasetId": "{DATASET_ID}",
           "inputFormat": {
                "format": "json",
                "isMultiLineJson": true
           }
      }'
```

## What is the difference between JSON lines (single-line JSON) and multi-line JSON?

For JSON lines, there is one JSON object per line. For example:

```json
{"string":"string1","int":1,"array":[1,2,3],"dict": {"key": "value1"}}
{"string":"string2","int":2,"array":[2,4,6],"dict": {"key": "value2"}}
{"string":"string3","int":3,"array":[3,6,9],"dict": {"key": "value3", "extra_key": "extra_value3"}}
```

For multi-line JSON, one object can occupy multiple lines, while all the objects are wrapped in a JSON array. For example:

```json
[
    {"string":"string1","int":1,"array":[1,2,3],"dict": {"key": "value1"}},
    {"string":"string2","int":2,"array":[2,4,6],"dict": {"key": "value2"}},
    {
        "string": "string3",
        "int": 3,
        "array": [
            3,
            6,
            9
        ],
        "dict": {
            "key": "value3",
            "extra_key": "extra_value3"
        }
    }
]
```

By default, Batch Data Ingestion uses single-line JSON.

## Is CSV ingestion supported?

CSV ingestion is only supported for flat schemas. Currently, ingesting hierarchical data in CSV is not supported.

To get all the data ingestion features, JSON or Parquet formats need to be used.

## What types of validation are performed on the data?

There are three levels of validation performed on the data:

- Schema - Batch Ingestion ensures that the schema of the of the ingested data matches the schema of the dataset.
- Data Type - Batch Ingestion ensures that the type for each field ingested matches the type defined in the schema of the dataset.
- Constraints - Batch Ingestion ensures constraints, such as "Required", "enum", and "format" are properly defined in the schema definition.

## How can an already ingested batch be replaced?

An already ingested batch can be replaced by using the Batch Replay feature. More information about Batch Replay can be found [here][replay].

## How is batch ingestion monitored?

Once a batch has been signaled for batch promotion, the batch ingestion progress can be monitored with the following request:

```shell
curl -X GET "https://platform.adobe.io/data/foundation/catalog/batches/{BATCH_ID}" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

With this request, you will get a response similar to this:

```http
200 OK
```

```json
{
    "{BATCH_ID}":{
        "imsOrg":"{IMS_ORG}",
        "created":1494349962314,
        "createdClient":"{API_KEY}",
        "createdUser":"{USER_ID}",
        "updatedUser":"{USER_ID}",
        "completed":1494349963467,
        "externalId":"{EXTERNAL_ID}",
        "status":"staging",
        "errors":[],
    }
}
```

---

# Batch States

## What are the possible batch states?

A batch can, in its lifecycle, go through the following states:

Status | Data written to Master | Description
------ | ---------------------- | -----------
Abandoned | | The client failed to complete the batch in the expected timeframe.
Aborted | | The client has explicitly called, via the Batch Data Ingestion APIs, an abort operation for the specified batch. Once a batch is in the Loaded state, the batch cannot be aborted.
Active/Success | x | The batch has been successfully promoted from stage to master, and is now available for downstream consumption. **Note:** Active and Success are used interchangeably.
Archived | | The batch has been archived into cold storage.
Failed/Failure | | A terminal state that results from either bad configuration and/or bad data. An actionable error is recorded, along with the batch, to enable clients to correct and resubmit the data. **Note:** Failed and Failure are used interchangeably. 
Inactive | x | The batch was successfully promoted, but has either been reverted or has expired. The batch will no longer be available for downstream consumption, but the underlying data will remain in Master until it has been retained, archived, or otherwise deleted. 
Loading | | The client is currently writing data for the batch. The batch is **not** ready for promotion, at this point in time.
Loaded | | The client has completed writing data for the batch. The batch is ready for promotion.
Retained | | The data has been taken out of Master, and in a designated archive in Adobe Data Lake.
Staging | | The client has successfully signaled the batch for promotion, and the data is being staged for consumption downstream.
Retrying | | The client has signaled the batch for promotion, but due to an error, the batch is being retried by a Batch Monitoring service. This state can be used to tell clients that there may be a delay in ingesting the data.
Stalled | | The client has signaled the batch for promotion, but after `n` retries by a Batch Monitoring service, the batch promotion has stalled. 

## What does "Staging" mean for batches?

When a batch is in "Staging", it means that the batch was successfully signaled for promotion, and that the data is being staged for consumption downstream.

## What does it mean when a batch is "Retrying"?

When a batch is in "Retrying", it means that the batch's data ingestion has been temporarily halted due to intermittent issues. When this happens, it requires no customer intervention.

## What does it mean when a batch is "Stalled"?

When a batch is in "Stalled", it means that Data Ingestion Services is experiencing difficulty ingesting the batch and all retries have been exhausted. 

## What does it mean if a batch is still "Loading"?

When a batch is in "Loading", it means that the CompleteBatch API has not been called to promote the batch. 

## Is there a way to know if a batch has been successfully ingested?

Once the batch status is "Active", the batch has been successfully ingested. To find out the status of the batch, follow the steps detailed [earlier][batch-monitoring].

## What happens after a batch fails?

When a batch fails, the reason it fails can be identified in the `errors` section of the payload. Examples of errors can be seen below:

```json
    "errors":[
        {
            "code":"106",
            "description":"Dataset file is empty. Please upload file with data.",
            "rows":[]
        },
        {
            "code":"118",
            "description":"CSV file contains empty header row.",
            "rows":[]
        }
    ]
```

Once the errors have been corrected, the batch can be re-uploaded.



---

# Batch Support

## How should batches be deleted?

Instead of deleting directly from Catalog, batches should be removed using either method provided below:

1. If the batch is in progress, the batch should be aborted.
2. If the batch is successfully mastered, the batch should be reverted.

## What batch-level metrics are available?

The following batch-level metrics are available for batches in the Active/Success state:

Metric | Description
------ | -----------
inputByteSize | The total number of bytes staged for Data Ingestion Services to process.
inputRecordSize | The total number of rows staged for Data Ingestion Services to process.
outputByteSize | The total number of bytes outputted by Data Ingestion Services to Data Lake.
outputRecordSize | The total number of rows outputted by Data Ingestion Services to Data Lake.
partitionCount | The total number of partitions written into Data Lake.   

## Why are metrics not available on some batches?

There are two reasons that metrics may not be available on your batch:

1. The batch never successfully made it to the Active/Success state.
2. The batch was promoted using a legacy promotion path, such as CSV ingestion.

## What do the different status codes mean?

Status Code | Description
----------- | -----------
106 | The dataset file is empty.
118 | The CSV file contains an empty header row.
200 | The batch has been accepted for processing, and will transition to a final state, such as Active or Failure. Once submitted, the batch can be monitored using the `GetBatch` endpoint.
400 | Bad Request. Returned if there are either missing or overlapping chunks in a batch.

[large-file-upload]: batch_data_ingestion_developer_guide.md#how-to-ingest-large-parquet-files

[replay]: batch_data_ingestion_developer_guide.md#replaying-a-batch

[batch-monitoring]: #how-is-batch-ingestion-monitored