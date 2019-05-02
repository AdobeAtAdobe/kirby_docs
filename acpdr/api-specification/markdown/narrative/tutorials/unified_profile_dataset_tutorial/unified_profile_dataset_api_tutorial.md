# Configuring a dataset for Unified Profile and Identity Service via API

## Overview

In the ecosystem of Adobe Experience Platform, one fundamental path for providing your data to Unified Profile and Identity Service is with the use of datasets. This tutorial covers the process of creating and configuring a dataset to enable Unified Profile and or Identity Service.

The other path is by streaming ingestion. Streaming Ingestion provides users a method to send data from client and server-side devices to Experience Platform in real-time. To get started, visit the [Streaming Ingestion Overview](../../technical_overview/streaming_ingest/streaming_ingest_overview.md).

### Objective

This tutorial covers how to create and/or configure a dataset to forward uploaded data to Unified Profile and Identity Service, because most use cases require both. Specifically, this tutorial covers:

[Creating a dataset](#step-1-create-a-dataset) - Using Catalog Service APIs, create a dataset.  
[Checking an existing dataset's configuration](#step-2-check-a-datasets-configuration) - View the details of an existing dataset to determine whether it is configured for Unified Profile and/or Identity Service.  
[Configuring an existing dataset for Unified Profile and Identity Service](#step-3-configure-your-dataset-for-unified-profile-and-identity-service) - To enable data to be forwarded to Unified Profile and/or Identity Service, add a tag to the dataset.  
[Upload your data](#step-4-upload-your-data) - Use Catalog Service to create a batch, upload your data files, and promote the batch.  
[Monitor your data upload](#step-5-monitor-the-data-upload) - Monitor the asynchronous data ingestion.  
[Confirm your data](#optional-step-6-confirm-your-data) - Cross check Unified Profile records against your source data to ensure your data was added as expected. 

### Prerequisite topics

[Authenticating and Accessing Adobe Experience Platform APIs](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) - This tutorial shows the initial steps to set up an integration in Adobe I/O Console and use an integration to access Adobe Experience Platform APIs. The steps in this tutorial describe how to gain access to the following values needed for required headers:
* IMS Organization ID
* API Key (Client ID)
* Access Token

### Related topics

In the context of managing your data entities, several Experience Platform solutions and components come into play. For this tutorial, it would be helpful to have an understanding of each of the following:

[Unified Profile](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md) is a generic lookup entity store, and is used to manage any XDM Platform data. Unified Profile facilitates building customer personalization use cases by merging data across various enterprise data assets and providing access to that unified data. Unified Profile provides tools for looking up entities by ID, as well as robust segmentation tools.  
[Identity Service](../../technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md) associates identifiers related to each data entity, building your identity graph. Unified Profile uses Identity Service to glean all possible identities for a managed entity at access or segmentation time, merging all related entities into a unified view.  
[Catalog Service](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md) provides the means to upload data files to Experience Platform and maintains metadata about batch transfers. Catalog Service can be configured to notify Unified Profile and Identity Service of data uploaded to datasets.  
[Experience Data Model (XDM)](../../technical_overview/schema_registry/schema_composition/schema_composition.md) provides the framework to refer to and manage the schemas that your data must conform to for use as entities on Platform.

### Requirements

First, please note the following requirements for Unified Profile and Identity Service to consume data delivered to a Catalog dataset:

* Your data must be delivered as a [Parquet](http://parquet.apache.org/documentation/latest/) file.
* "Schema" type datasets are the only supported for this use case.
* Your data must conform to the XDM schema matching the dataset schema. 
* Unified Profile and Identity Service only consume and process data that is delivered after they have been enabled for that dataset. That is covered by this tutorial.

All APIs in this document require the following headers. Some service calls may require additional headers which will be listed in context.

|Header|Description|Example Value|
|---|---|---|
|Authorization|The Access Token as described in [Prerequisite topics](#prerequisite-topics), prefixed with "Bearer "|Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....|
|x-gw-ims-org-id|The IMS Organization ID as described in [Prerequisite topics](#prerequisite-topics)|17FA2AFD56CF35747F000101@AdobeOrg|
|x-api-key|The API Key (Client ID) as described in [Prerequisite topics](#prerequisite-topics)|25622d14d3894ea590628717f2cb7462|

---

## Step 1: Create a dataset

Start with creating a dataset to which you send data compliant to a union schema. There are several options for delivering data to datasets, but for Unified Profile and Identity Service, only datasets of "Schema" type are supported, and only where the schema is a union schema. To learn how to enable your schema, see [Enable XDM schemas for Unified Profile and Identity Service](../../technical_overview/schema_registry/schema_registry_api_tutorial/schema_registry_api_tutorial.md#enable-schema-for-use-in-unified-profile-service).  

### Create a dataset

Use Catalog Service APIs to create a new dataset. This step covers creating a dataset which can then be configured separately for use with Unified Profile and Identity Service.

#### Service endpoint

```
POST https://platform.adobe.io/data/foundation/catalog/datasets
```

#### Additional required headers

The following headers are required in addition to those listed in [Requirements](#requirements), above.

|Header|Value|
|---|---|
|Content-Type|application/json|

#### Example request

```
curl -X POST \
  https://platform.adobe.io/data/foundation/catalog/datasets \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  -d '{
    "fileDescription" : {
    "persisted": true,
        "containerFormat": "parquet",
        "format": "parquet"
    },
    "fields":[],
    "schemaRef" : {
        "id": "https://ns.adobe.com/coresvc/schemas/31670881463308a46f7d2cb09762715",
        "contentType": "application/vnd.adobe.xed-full-notext+json; version=1"
    }
}'
```

The above example request body creates a "Schema" type dataset, where XDM schema with ID "31670881463308a46f7d2cb09762715" is supported.

### Create a dataset with Unified Profile and Identity Service enabled

It is possible to create the dataset such that is enabled for Unified Profile and/or Identity Service upon creation. If you create a dataset by these instructions, you can skip steps 2 and 3, which are only necessary for checking and configuring a dataset that has been created without enabling these solutions.

#### Service endpoint

```
POST https://platform.adobe.io/data/foundation/catalog/datasets
```

#### Additional required headers

The following headers are required in addition to those listed in [Requirements](#requirements), above.

|Header|Value|
|---|---|
|Content-Type|application/json|

#### Example request

```
curl -X POST \
  https://platform.adobe.io/data/foundation/catalog/datasets \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  -d '{
    "fileDescription" : {
    "persisted": true,
        "containerFormat": "parquet",
        "format": "parquet"
    },
    "fields":[],
    "schemaRef" : {
        "id": "https://ns.adobe.com/coresvc/schemas/31670881463308a46f7d2cb09762715",
        "contentType": "application/vnd.adobe.xed-full-notext+json; version=1"
    },
    "tags" : {
       "unifiedProfile": ["enabled:true"],
       "unifiedIdentity": ["enabled:true"]
    }
  }'
```

The above example request body creates a "Schema" type dataset, where XDM schema with ID "31670881463308a46f7d2cb09762715" is supported. Including the tags in the request enables Unified Profile and Identity Service immediately.

#### Example response

```
[@/datasets/5b020a27e7040801dedbf46e"] 
```

The response to the API request to create a dataset comes in the form of an array of string dataset IDs containing exactly one ID, "5b020a27e7040801dedbf46e" in the example above.

---

## Step 2: Check a dataset's configuration

Using Catalog Service APIs, you can inspect an existing dataset to determine whether it is configured for Unified Profile and/or Identity Service. Get the dataset and inspect the `tags` property of the API response. The presence of a `unifiedProfile` or `unifiedIdentity` tag indicates which have been enabled.

### Get a dataset

Use Catalog Service APIs to retrieve the details of a dataset by ID.

#### Service endpoint

```
GET https://platform.adobe.io/data/foundation/catalog/dataSets/{DATASET_ID}
```

`{DATASET_ID}` : The ID of a dataset is returned from [Step 1](#step-1-create-a-dataset), as the sole string value in an array. To get the ID of a previously created dataset, you can use Catalog Service APIs to fetch a list of datasets which would provide the name and ID of your organization's datasets. Using the Experience Platform UI, navigating to the detail page of a dataset reveals that dataset's ID in the address bar, such as "https://<span></span>ui-prod1-va7.cloud.adobe<span></span>.io/datasets/5b95b155419ec801e6eee780", where "5b95b155419ec801e6eee780" is the dataset ID.

#### Example request

```
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets/5b95b155419ec801e6eee780' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
```

#### Example response

```
{
    "5b95b155419ec801e6eee780": {
        "name": "Commission Program Events DataSet",
        "imsOrg": "6A29340459CA8D350A49413A@AdobeOrg",
        "tags": {
            "adobe/pqs/table": [
                "unifiedprofileingestiontesteventsdataset"
            ],
            "unifiedProfile": [
                "enabled:true"
            ],
            "unifiedIdentity": [
                "enabled:true"
            ]
        },
        "lastBatchId": "6dcd9128a1c84e6aa5177641165e18e4",
        "lastBatchStatus": "success",
        "dule": {},
        "statsCache": {
            "startDate": null,
            "endDate": null
        },
        "namespace": "ACP",
        "state": "DRAFT",
        "version": "1.0.1",
        "created": 1536536917382,
        "updated": 1539793978215,
        "createdClient": "acp_ui_platform",
        "createdUser": "1F5AE6B4592F63150A494005@AdobeID",
        "updatedUser": "853640915B846ACE0A49421A@AdobeID",
        "viewId": "5b95b155419ec801e6eee781",
        "aspect": "production",
        "status": "enabled",
        "fileDescription": {
            "persisted": true,
            "containerFormat": "parquet",
            "format": "parquet"
        },
        "transforms": "@/dataSets/5b95b155419ec801e6eee780/views/5b95b155419ec801e6eee781/transforms",
        "files": "@/dataSets/5b95b155419ec801e6eee780/views/5b95b155419ec801e6eee781/files",
        "schema": "@/xdms/context/experienceevent",
        "schemaMetadata": {
            "primaryKey": [],
            "delta": [],
            "dule": [],
            "gdpr": []
        },
        "schemaRef": {
            "id": "https://ns.adobe.com/xdm/context/experienceevent",
            "contentType": "application/vnd.adobe.xed+json"
        }
    }
}
```

In the example above, Unified Profile and Identity Service are enabled for this dataset.

---

## Step 3: Configure your dataset for Unified Profile and Identity Service

In the case of a dataset created without enabling Unified Profile or Identity Service, use the following service call to enable the dataset for either or both. 

#### Service endpoint

```
PATCH https://platform.adobe.io/data/foundation/catalog/dataSets/{DATASET_ID}
```

`{DATASET_ID}` : The ID of a dataset is returned from [Step 1](#step-1-create-a-dataset), as the sole string value in an array. To get the ID of a previously created dataset, you can use Catalog Service APIs to fetch a list of datasets which would provide the name and ID of your organization's datasets. Using the Experience Platform UI, navigating to the detail page of a dataset reveals that dataset's ID in the address bar, such as "https://ui-prod1-va7.cloud.adobe.io/datasets/5b95b155419ec801e6eee780", where "5b95b155419ec801e6eee780" is the dataset ID.

#### Additional required headers

The following headers are required in addition to those listed in [Requirements](#requirements), above.

|Header|Value|
|---|---|
|Content-Type|application/json|

#### Example request

```
curl -X PATCH \
  https://platform.adobe.io/data/foundation/catalog/dataSets/5b95b155419ec801e6eee780 \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  -d '{
    "tags" : {
        "unifiedProfile": ["enabled:true"],
        "unifiedIdentity": ["enabled: true"]
    }
  }'
```

---

## Step 4: Upload your data

Using an ETL tool, export your data to a Parquet file in a format conforming to the XDM schema you configured your dataset to support. When planning what data to export, consider the following:

* Include any data you may wish to use to base audience segment criteria. When you require proprietary data not included in a standard schema, you can extend an XDM schema to accommodate your additional data. For more on working with XDM schemas, see the [Schema Registry API Developer Guide](../../technical_overview/schema_registry/schema_registry_developer_guide.md).
* The schema defining the structure of your record and time series data must have been enabled for Unified Profile and Identity Service, which is to say it has been enabled as a union schema. To learn how to enable schemas for union via API, visit [Enable XDM schemas for Unified Profile and Identity Service](../../technical_overview/schema_registry/schema_registry_api_tutorial/schema_registry_api_tutorial.md#enable-schema-for-use-in-unified-profile-service).
* Include as many identifiers as you can ascertain from your profile data to maximize your identity graph, and hence the ability of Identity Service to effectively stitch identities across datasets.

When uploading data files, the largest file supported is 512 MB. If your data file is larger than this, it will need to be broken into chunks no larger than 512 MB. There is no limit to the number if files you can upload as part of a batch.

To send Parquet data files to your dataset, you will:

[Create a batch](#step-4.a-Create-a-batch) - Use Catalog Service APIs to initialize a batch.  
[Upload files to the batch](#step-4.b-upload-files) - Upload data files from your hard drive to a dataset, associating them with the batch.  
[Signal batch completion](#step-4.c-signal-batch-completion) - Promote the batch by signaling batch completion.

### Step 4.a: Create a batch

Use Catalog Service APIs to initialize a batch. Data files are uploaded in association with a batch.

#### Service endpoint

```
POST https://platform.adobe.io/data/foundation/catalog/batches
```

#### Additional required headers

The following headers are required in addition to those listed in [Requirements](#requirements), above.

|Header|Value|
|---|---|
|Content-Type|application/json|

#### Example request

```
curl -X POST \
  https://platform.adobe.io/data/foundation/catalog/batches \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  -H 'Content-Type: application/json' \
  -d '{
    "status": "processing"
  }'
```

Initialize the batch with a status of "processing". The status will automatically be updated as the batch is processed.

#### Example response

```
[
    "@/batches/5c55f7f990c28e14cd2631b1"
]
```

In the above example response, the batch ID is "5c55f7f990c28e14cd2631b1".

---

### Step 4.b: Upload files

Upload data files from your hard drive to a dataset, associating them with the batch.

#### Service endpoint

```
PUT https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet
```

`{BATCH_ID}` : The ID of the batch created in [Step 4.a](#step-4.a-create-a-batch) ("5c55f7f990c28e14cd2631b1" in the example).  
`{DATASET_ID}` : The ID of a dataset is returned from [Step 1](#step-1-create-a-dataset), as the sole string value in an array. To get the ID of a previously created dataset, you can use Catalog Service APIs to fetch a list of datasets which would provide the name and ID of your organization's datasets. Using the Experience Platform UI, navigating to the detail page of a dataset reveals that dataset's ID in the address bar, such as `https://ui-prod1-va7.cloud.adobe.io/datasets/5b95b155419ec801e6eee780`, where "5b95b155419ec801e6eee780" is the dataset ID.  
`{FILE_NAME}` : The filename as it will be represented on Platform.

#### Additional required headers

The following headers are required in addition to those listed in [Requirements](#requirements), above.

|Header|Value|
|---|---|
|Content-Type|application/octet-stream|

#### Example request

```
curl -X PUT 'https://platform.adobe.io/data/foundation/import/batches/5c55f7f990c28e14cd2631b1/datasets/5b95b155419ec801e6eee780/files/events-upload.parquet' \
  -H 'content-type: application/octet-stream' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  --data-binary '@/etc/data/events-to-upload.parquet'
```

---

### Step 4.c: Signal batch completion

Once you've completed uploading the data files for the batch, promote the batch by signaling batch completion.

#### Service Endpoint

```
POST https://platform.adobe.io/data/foundation/catalog/batches/{BATCH_ID}?actions=PROMOTE
```

`{BATCH_ID}`: The ID of the batch that was created in [step 4.a](#step-4.a-create-a-batch) and with which you associated the uploaded files.

#### Example Request

```
curl -X POST 'https://platform.adobe.io/data/foundation/catalog/batches/5c55f7f990c28e14cd2631b1?actions=PROMOTE' \
  -H 'content-type: application/octet-stream' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  --data-binary '@/etc/data/events-to-upload.parquet'
```

## Optional Step 5: Monitor ingestion

Depending on the size of the data, batches take varying lengths of time to ingest. Using the Bulk Ingestion API, the first step to uploading a batch of data is to create the batch. You are provided with a `batchId` in the response. In the example below the batch ID is "29285e08378f4a41827e7e70fb7cb8f0", provided as the value to the `batch` request parameter, indicating to retrieve all batches related to that batch. Using that ID, you are able to poll the dataset for the status of the batch from ingestion until the `status` in the response indicates completion ("success" or "failure"). <!--  I believe something should be said about this method isolating UP's ingestion of the batch data? -->

__Service endpoint__

```
GET https://platform.adobe.io/data/foundation/catalog/batches?batch=[BATCH_ID]&createdClient=acp_core_unifiedProfile_feeds
```

__Example request for related Unified Profile batches__

```
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/batches?batch=29285e08378f4a41827e7e70fb7cb8f0&createdClient=acp_core_unifiedProfile_feeds' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
```

__Request parameters__

* `batch` - optional - Indicates to retrieve all batches _related to_ the ID provided as the value of this parameter
* `createdClient` - This parameter filters by the client who generated the batch. In the case of Unified Profile, that will always be "acp_core_unifiedProfile_feeds"

__Example positive response__

```
{
    "5b7129a879323401ef2a6486": {
        "imsOrg": "F47E32E75AB004490A49403E@AdobeOrg",
        "created": 1534142888068,
        "createdClient": "acp_core_unifiedProfile_feeds",
        "createdUser": "acp_core_unifiedProfile_feeds@AdobeID",
        "updatedUser": "acp_core_unifiedProfile_feeds@AdobeID",
        "updated": 1534142955152,
        "replay": {},
        "status": "success",
        "errors": [],
        "version": "1.0.3",
        "availableDates": {},
        "relatedObjects": [
            {
                "type": "batch",
                "id": "29285e08378f4a41827e7e70fb7cb8f0"
            }
        ],
        "metrics": {
            "startTime": 1534142943819,
            "endTime": 1534142951760,
            "recordsRead": 108,
            "recordsWritten": 108
        }
    }
}
```

__Example negative response__

```
{
    "5b96ce65badcf701e51f075d": {
        "imsOrg": "4A21D36B544916100A4C98A7@AdobeOrg",
        "status": "failed",
        "relatedObjects": [
            {
                "type": "batch",
                "id": "29285e08378f4a41827e7e70fb7cb8f0"
            }
        ],
        "replay": {},
        "availableDates": {},
        "metrics": {
            "startTime": 1536610322329,
            "endTime": 1536610438083,
            "recordsRead": 4004,
            "recordsWritten": 4004,
            "failureReason": "Job aborted due to stage failure: Task 0 in stage 1.0 failed 4 times,:"
        },
        "errors": [
            {
                "code": "0070000017",
                "description": "Unknown error occurred."
            },
            {
                "code": "unknown",
                "description": "Job aborted."
            }
        ],
        "created": 1536609893629,
        "createdClient": "acp_core_unifiedProfile_feeds",
        "createdUser": "acp_core_unifiedProfile_feeds@AdobeID",
        "updatedUser": "acp_core_unifiedProfile_feeds@AdobeID",
        "updated": 1536610442814,
        "version": "1.0.5"
    }
}
```

A recommended polling interval is two minutes. For more information on working with Catalog datasets and batches, see the [Catalog Service overview](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md).

---

## Optional Step 6: Confirm your data

While this step is optional, it is always a good idea to spot check your upload when it is the first of a new dataset or if any part of your process changes, such as using a new ETL or new data source. To do this, use Unified Profile Access API to ensure you can retrieve a sampling of known identities from your source data as expected.

Unified Profile receives batch data as it gets loaded into a dataset. If you are unable to retrieve any of the entities you expect, your dataset may not be enabled for Unified Profile. If you check and your dataset has been enabled, try ensuring your source data format and identifiers support your expectations.

You can find details on this by visiting the tutorial covering [Accessing Unified Profile data via API](../consuming_unified_profile_data/consuming_unified_profile_data.md).