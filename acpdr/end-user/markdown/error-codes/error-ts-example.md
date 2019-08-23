

# Troubleshooting and error codes for batch ingestion

- [**Error Codes**](#error-codes)

- **Bulk Ingestion API**
  - [CompleteBatch API returned 200, why isn't my batch active?](#completebatch-api-returned-200-why-isnt-my-batch-active)
  - [CompleteBatch API failed. Is it safe to retry?](#completebatch-api-failed-is-it-safe-to-retry)
  - [When should I use the Large File Upload feature?](#when-should-i-use-the-large-file-upload-feature)
  - [Why is my Large File Complete api call failing with 400 Bad Request?](#why-is-my-large-file-complete-api-call-failing-with-400-bad-request)
- **Ingestion format**
  - [What are the supported ingest formats?](#what-are-the-supported-ingest-formats)
  - [Where do I specify the batch input format?](#where-do-i-specify-the-batch-input-format)
  - [How do I ingest multiline json?](#how-do-i-ingest-multiline-json)
  - [What csv ingest support do I get?](#what-csv-ingest-support-do-i-get)
- **Features**
  - [What are direct writers and how do I become one?](#what-are-direct-writers-and-how-do-i-become-one)
  - [What are trusted providers and how do I become one?](#what-are-trusted-providers-and-how-do-i-become-one)
  - [What are row level validations and can I turn them off?](#what-are-row-level-validations-and-can-i-turn-them-off)
  - [How do I replace an already ingested batch?](#how-do-i-replace-an-already-ingested-batch)
- **Batch states**
  - [What are the possible batch states?](#what-are-the-possible-batch-states) 
  - [How do I monitor batch ingestion?](#how-do-i-monitor-batch-ingestion)
  - [What does a staging batch mean?](#what-does-a-staging-batch-mean)
  - [How do I know my batch is successfully ingested?](#how-do-i-know-my-batch-is-successfully-ingested)
  - [My batch failed, what are the next steps?](#my-batch-failed-what-are-the-next-steps)
  - [What does retrying batch mean?](#what-does-retrying-batch-mean)
  - [What does stalled batch mean?](#what-does-stalled-batch-mean)
  - [Why is my batch still in loading?](#why-is-my-batch-still-in-loading)
- **Batch metrics**
  - [What Batch level metrics are available?](#what-batch-level-metrics-are-available)
  - [Why does my Batch not have metrics on it?](#why-does-my-batch-not-have-metrics-on-it)
  - [Should inputRecordCount always equal outputRecordCount?](#should-inputrecordcount-always-equal-outputrecordcount)

## Error codes
| Error Codes        | Description           
| ------------- |:-------------| 
| 106      |  Dataset file is empty. Please upload file with data.     |
| 118      |  CSV file contains empty header row.     |
| 200      | The batch has been accepted for processing and will transition to a final state (e.g., active, failure, etc.). Once submitted, the batch can be monitored via the Catalog services `GetBatch` endpoint. | 
| 300      |  Stalled Batch.     |
| 400  | Bad request. The large file upload works on co-operation model where server expects client to upload file chunks. The byte range of the chunk is specified via the Content-Range header and is validated against the Content-Length of the same request. It is possible however to upload overlapping chunks as the range validations are done at the time of file completion when the file chunks are stitched together. If the chunks are found overlapping or missing, the server responds with a 400 Bad Request.  

## CompleteBatch API returned 200, why isn't my batch active?

It is important to note that the CompleteBatch endpoint is a signal mechanism that triggers batch promotion asynchronously. A 200 OK response from the API means that the batch has been accepted for processing and will transition to a final state (for example active or failure). Once submitted, the batch can be monitored via the Catalog services GetBatch endpoint. See [How do I monitor batch ingestion?](#how-do-i-monitor-batch-ingestion)

## CompleteBatch API failed. Is it safe to retry?

Yes. The CompleteBatch API internally attempts to update the batch state and can receive errors from underlying system despite the necessary state transition going through successfully. In other words, despite failure there are chances the operation succeeded and the batch was successfully accepted. The clients however are expected to have retries in case of API failures and are encouraged to retry. The API is designed to be idempotent and should return success if the desired effect is already achieved.

## When should I use the Large File Upload feature?

The file upload endpoint supports simple file PUTs, which is an easier way of uploading files. The mechanism however is limited by network constraints and can only work uptil a size threshold. The threshold itself is influenced by various factors but we recommend that files larger than 256MB should be uploaded via the Large File Upload mechanism. Please refer to the recipe [How to ingest large files.](https://git.corp.adobe.com/experience-platform/siphon-docs/blob/master/dev-guide.md#how-to-ingest-large-parquet-files)

## Why is my Large File Complete API call failing with 400 Bad Request?

The large file upload works on a co-operation model where the server expects the client to upload file chunks. The byte range of the chunk is specified via the Content-Range header and is validated against the Content-Length of the same request. It is possible however to upload overlapping chunks as the range validations are done at the time of file completion when the file chunks are stitched together. If the chunks are found overlapping or missing, the server responds with a 400 Bad Request.

## What are the supported ingestion formats?

We currently support parquet and json for ingestion. There's legacy support for CSV where the data is promoted to master location with preliminary checks but no conversion, partitioning, row validation, etc. that is otherwise supported. 

## Where do I specify the batch input format?

The input format defines how the batch should be scanned and parsed, and is specified at the time of batch creation via the inputFormat api section. Here is a sample request that demonstrates setting the format

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

<!---## How do I ingest multiline json?--->

## What CSV ingest support do I get?

CSV is not fully supported yet. There's legacy support that promotes the file to master location but there's no Spark ingestion of the data provided. Hence, features like data conversion, schema validation, partitioning, row-level validation, and batch metrics aren't available on CSV ingest. To get the full ingestion features, please use JSON or Parquet format.

## What are direct writers and how do I become one?

Batch promotion via the Bulk Ingestion API comprises three steps:
1. Batch Creation
2. Data Upload
3. Batch Completion

While steps 1 and 3 are control signals that must be invoked for all batches, you may choose to perform the data upload to ADLS staging area directly. By doing so, you get the benefit of not going through additional gateway hops and achieve better transfer speeds. It also helps with uploading large files without having to break it in to chunks because direct ADLS upload does not suffer from the same gateway problems.

If you wish to be a direct writer, you need to:
1. Provision your client ID for data lake permissions via the Provisioning team. Without that, you'll have problems writing under your assigned client directory space.
2. Raise a JIRA issue to have your client ID whitelisted for direct writing in the Bulk Ingestion API. Alternately, you can reach the Slack channel #aep-siphon-users for assistance.

## What are trusted providers and how do I become one?

A typical batch ingestion involves firing of a Spark job that scans the data and performs schema validations, type conversions, partitioning, stat computations, etc. There are some upstream components that already have Spark processes that either already do all of the ingestion tasks or can be easily modified to do so. By doing that upstream, when possible, you save a redundant scan on data and reduce the data promotion latency.

Please log a JIRA to have your client id whitelisted as trusted provider. Alternately, you can reach the Slack channel #aep-siphon-users for assistance.

<!---## What are row level validations and can I turn them off?--->

## How do I replace an already ingested batch?

An already ingested batch can be replaced via the Batch Replay feature. Please see https://git.corp.adobe.com/experience-platform/siphon-docs/blob/master/dev-guide.md#how-to-replay-a-batch for further details.

## What are the possible batch states?

On signaling data ingestion for batch promotion, it goes through an ingestion life cycle and different statuses watermark
the progress of batch ingestion. During its life cycle, a batch will go through following statuses: 

| Status         | Data written to Master | Description                                                                                                                                                                                                                                                   |
|----------------|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Abandoned      |                        | The client failed to complete the batch in the expected time frame.                                                                                                                                                                                            |
| Aborted        |                        | The client has explicitly called an abort operation (via Bulk Ingest API) for the specified batch. A batch cannot be aborted once it is in a Loaded state.                                                                                                     |
| Active/Success | X                      | The batch has been successfully promoted from stage to master and is available for downstream consumption. Note: Active and Success are interchangeable.                                                                                                      |
| Archived       |                        | The batch has been archived into cold storage.                                                                                                                                                                                                                |
| Failed/Failure |                        | A terminal state that results from either bad configuration and/or bad data. An actionable error is recorded along with the batch to enable you to make corrections and resubmit the data.  Note: Failed and Failure are interchangeable.                 |
| InActive       | X                      | The batch was successfully promoted but has been reverted or has expired. The batch is no longer available for downstream consumption but the underlying data still resides in Master until it has been retained, archived, or otherwise deleted.              |
| Loading        |                        | The client is currently writing data to stage for this batch which is currently NOT ready for promotion.                                                                                                                                                      |
| Loaded         |                        | The client has completed the batch (via Bulk Ingest API) signaling the batch is ready for promotion.                                                                                                                                                          |
| Retained       |                        | The data has been moved out of Master into a designated History path in ADLS.                                                                                                                                                                                 |
| Staging        | X                      | The client has successfully signaled the batch for promotion and data is being staged for consumption to processes downstream.                                                                                                                                |
| Retrying       | X                      | Same as staging but the batch failed due to system/transient error and this batch is being retried by a Batch Monitoring service. This state can be used by clients to detect there might be delays in ingesting the data (but not going beyond SLAs). |
| Stalled        | X                      | Same as staging but the batch promotion has stalled after `n` number of retries by Batch Monitoring service. This state will be used by Data Ingestion engineering to monitor batch ingestion before it goes beyond SLA.                                      |

## How do I monitor batch ingestion?

Once you signal Data Ingestion for batch promotion, you can monitor batch ingestion progress (status).

`GET https://platform.adobe.io/data/foundation/catalog/batches/{BATCH_ID}`

**REQUEST**

```
curl -X GET "https://platform.adobe.io/data/foundation/catalog/batches/{BATCH_ID}" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
```

**RESPONSE**

200 Ok
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
## What does a staging batch mean?

Batch was successfully signaled for promotion and data is being staged for consumption to processes downstream.

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
    "version":"1.0.9",
    "relatedObjects":[
      {
        "type":"dataSet",
        "id":"{DATASET_ID}"
      }
    ],
    "metrics":{},
    "inputFormat":{
      "format":"{INGEST_FORMAT}"
    }
  }
}
```

## How do I know my batch is successfully ingested?

When status becomes active, you can consider your batch was successfully ingested and necessary data is available for consumption to processes downstream. The `metrics` section identifies the number of records and size successfully ingested. Data is compressed during ingestion, which accounts for the discrepancy in the size of the data made available to processes downstream. Although not supported currently, there can be partial row failures which can widen the gap between `inputByteSize` and `outputByteSize`.

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
    "status":"active",
    "errors":[],
    "version":"1.0.9",
    "relatedObjects":[
      {
        "type":"dataSet",
        "id":"{DATASET_ID}"
      }
    ],
    "metrics":{
      "partitionCount":1,
      "outputByteSize":90145,
      "inputByteSize":357917,
      "outputRecordCount":107,
      "inputRecordCount":107
    },
    "inputFormat":{
      "format":"{INGEST_FORMAT}"
    }
  }
}
```

## My batch failed, what are the next steps?

A batch only fails when there's bad input detected. Data Ingestion failed, which can be due to a variety of reasons identified in `errors` section of the payload. 
Data uploaded as part of the batch is made available at a failed location for customers to access and/or download.

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
    "status":"failed",
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
    ],
    "version":"1.0.5",
    "relatedObjects":[
      {
        "type":"dataSet",
        "id":"{DATASET_ID}"
      }
    ],
    "metrics":{},
    "inputFormat":{
      "format":"{INGEST_FORMAT}"
    }
  }
}
```

## What does retrying batch mean?

Data ingestion can be temporarily halted due to intermittent issues. It will be retried without supervision. This is a 
transient status and no customer intervention is needed at this time.

```json
{
  "{BATCH_ID}":{
    "imsOrg":"{IMS_ORG}",
    "created":1494349962314,
    "createdClient":"{API_KEY}",
    "createdUser":"{USER_ID}",
    "updatedUser":"{USER_ID}",
    "updated":1494349963467,
    "externalId":"{EXTERNAL_ID}",
    "status":"retrying",
    "version":"1.0.4",
    "relatedObjects":[
      {
        "type":"dataSet",
        "id":"{DATASET_ID}"
      }
    ],
    "tags":{
      "acp_stallDetail":[
        "com.adobe.platform.data.siphon.data.tracker.action.StallPromotionException",
        "Ingest job failed with intermitent error"
      ]
    },
    "inputFormat":{
      "format":"{INGEST_FORMAT}"
    }
  }
}
```

## What does stalled batch mean?

If retry attempts are exhausted and you continue to experience difficulty ingesting data, then batch ingestion is `stalled` and 
necessary processes are triggered to signal manual intervention from Data Ingestion engineering.

```json
{
  "{BATCH_ID}":{
    "imsOrg":"{IMS_ORG}",
    "created":1494349962314,
    "createdClient":"{API_KEY}",
    "createdUser":"{USER_ID}",
    "updatedUser":"{USER_ID}",
    "updated":1494349963467,
    "externalId":"{EXTERNAL_ID}",
    "status":"stalled",
    "version":"1.0.5",
    "relatedObjects":[
      {
        "type":"dataSet",
        "id":"{DATASET_ID}"
      }
    ],
    "tags":{
      "acp_stallDetail":[
        "com.adobe.platform.data.siphon.data.tracker.action.StallPromotionException",
        "Ingest job failed with intermitent error"
      ]
    },
    "inputFormat":{
      "format":"{INGEST_FORMAT}"
    }
  }
}
```
## Why is my batch still in loading?

The loading state is representative of client staging data onto the batch. Siphon doesn't try to promote the data unless signalled and loading state indicates the batch hasn't been completed by the client. Please invoke the CompleteBatch API endpoint to promote the batch. On successful invocation, the batch should reflect in loaded state before it's picked by Siphon and transitioned to other batch states.


## What batch-level metrics are available?
The following metrics are available for an Active/Successful Batch:

| Metric            | Description                                                                                                                                                   |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| inputByteSize     | The total number of bytes staged for Siphon to process.                                                                                                       |
| inputRecordCount  | The total number of rows staged for Siphon to process.                                                                                                        |
| outputByteSize    | The total number of bytes output by Siphon into DataLake.                                                                                                     |
| outputRecordCount | The total number of rows output by Siphon into DataLake.                                                                                                      |
| partitionCount    | The number of partitions written to in DataLake (for example, in the case of Experience Events this number would equal the number of days represented in the data).   |

## Why does my batch not have metrics on it?

There could be several reasons why a batch does not have metrics on it:

1) The batch never successfully made it to an Active/Success status, i.e. Siphon will only generate stats if it can process the data.
2) The batch was processed on a legacy promotion path for CSV, which is not currently handled/processed by Siphon. 

## Should inputRecordCount always equal outputRecordCount?
For now yes.  In the future, we are likely to allow for "partial failures," where some of the rows are landed
successfully, but others fail ingestion and are tracked/reported separately. When this happens,
outputRecordCount could possibly be less than inputRecordCount, but never higher.