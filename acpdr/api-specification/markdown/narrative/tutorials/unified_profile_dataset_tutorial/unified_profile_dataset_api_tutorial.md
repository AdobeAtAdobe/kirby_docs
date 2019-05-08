# Configuring a dataset for Unified Profile and Identity Service via API

## Overview

In the ecosystem of Adobe Experience Platform, one fundamental path for providing your data to Unified Profile and Identity Service is with the use of datasets. This tutorial covers the process of creating and configuring a dataset to enable Unified Profile and or Identity Service.

The other path is by streaming ingestion. Streaming Ingestion provides users a method to send data from client and server-side devices to Experience Platform in real-time. To get started, visit the [Streaming Ingestion Overview](../../technical_overview/streaming_ingest/streaming_ingest_overview.md).

### Objective

This tutorial covers how to create, configure, and work with datasets as they relate specifically to Unified Profile and Identity Service, because most use cases require both. Specifically, this tutorial covers:

[Creating a dataset with Unified Profile and Identity Service enabled](#creating-a-dataset-with-unified-profile-and-identity-service-enabled)  
[Configuring an existing dataset for Unified Profile and Identity Service](#configuring-an-existing-dataset-for-unified-profile-and-identity-service)  
[Checking an existing dataset's configuration for Unified Profile and Identity Service](#step-1---check-your-dataset-for-being-enabled-for-unified-profile-and-identity-service)  
[Uploading profile and identity data](#uploading-profile-and-identity-data)  
[Confirming data ingest by Unified Profile](#confirming-data-ingest-by-unified-profile)  
[Confirming data ingest by Identity Service](#confirming-data-ingest-by-identity-service)  

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

* Your data must be delivered as a [Parquet](http://parquet.apache.org/documentation/latest/) file. If you are starting from CSV, Experience Platform supplies a UI "workflow" tool that converts CSV to a desired format and can be used for this purpose.
* "Schema" type datasets are the only supported for this use case.
* Your data must conform to the dataset's XDM schema. 
* Your data must conform to an XDM schema enabled for Unified Profile. For more on this, see the [Unified Profile section of the Schema Registry API developer guide](../../technical_overview/schema_registry/schema_registry_developer_guide.md#unified-profile).
* Unified Profile and Identity Service only consume and process data that is delivered after they have been enabled for that dataset. That is covered by this tutorial.

All APIs in this document require the following headers. Some service calls may require additional headers which will be listed in context.

|Header|Description|Example Value|
|---|---|---|
|Authorization|The Access Token as described in [Prerequisite topics](#prerequisite-topics), prefixed with "Bearer "|Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....|
|x-gw-ims-org-id|The IMS Organization ID as described in [Prerequisite topics](#prerequisite-topics)|17FA2AFD56CF35747F000101@AdobeOrg|
|x-api-key|The API Key (Client ID) as described in [Prerequisite topics](#prerequisite-topics)|25622d14d3894ea590628717f2cb7462|

---

## Creating a dataset with Unified Profile and Identity Service enabled

It is possible to create the dataset such that is enabled for Unified Profile and/or Identity Service upon creation.

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

## Configuring an existing dataset for Unified Profile and Identity Service

### Step 1 - Check your dataset for being enabled for Unified Profile and Identity Service

Using Catalog Service APIs, you can inspect an existing dataset to determine whether it is configured for Unified Profile and/or Identity Service. Get the dataset and inspect the `tags` property of the API response. The presence of a `unifiedProfile` or `unifiedIdentity` tag indicates which have been enabled.

Use Catalog Service APIs to retrieve the details of a dataset by ID.

#### Service endpoint

```
GET https://platform.adobe.io/data/foundation/catalog/dataSets/{DATASET_ID}
```

`{DATASET_ID}` : The ID of a dataset is returned from creating the dataset via API as the sole string value in an array. To get the ID of a previously created dataset, you can use Catalog Service APIs to fetch a list of datasets which would provide the name and ID of your organization's datasets. Using the Experience Platform UI, navigating to the detail page of a dataset reveals that dataset's ID in the address bar, such as "https:/<span></span>/ui-prod1-va7.cloud.adobe.io/datasets/5b020a27e7040801dedbf46e", where "5b020a27e7040801dedbf46e" is the dataset ID.

#### Example request

```
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets/5b020a27e7040801dedbf46e' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
```

#### Example response

```
{
    "5b020a27e7040801dedbf46e": {
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
        "viewId": "5b020a27e7040801dedbf46f",
        "aspect": "production",
        "status": "enabled",
        "fileDescription": {
            "persisted": true,
            "containerFormat": "parquet",
            "format": "parquet"
        },
        "transforms": "@/dataSets/5b020a27e7040801dedbf46e/views/5b020a27e7040801dedbf46f/transforms",
        "files": "@/dataSets/5b020a27e7040801dedbf46e/views/5b020a27e7040801dedbf46f/files",
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

### Step 2: Enable Unified Profile and Identity Service
In the case of a dataset created without enabling Unified Profile or Identity Service, use the following service call to enable the dataset for either or both. 

#### Service endpoint

```
PATCH https://platform.adobe.io/data/foundation/catalog/dataSets/{DATASET_ID}
```

`{DATASET_ID}` : The ID of a dataset is returned from creating the dataset via API as the sole string value in an array. To get the ID of a previously created dataset, you can use Catalog Service APIs to fetch a list of datasets which would provide the name and ID of your organization's datasets. Using the Experience Platform UI, navigating to the detail page of a dataset reveals that dataset's ID in the address bar, such as "https:/<span></span>/ui-prod1-va7.cloud.adobe.io/datasets/5b020a27e7040801dedbf46e", where "5b020a27e7040801dedbf46e" is the dataset ID.

#### Additional required headers

The following headers are required in addition to those listed in [Requirements](#requirements), above.

|Header|Value|
|---|---|
|Content-Type|application/json|

#### Example request

```
curl -X PATCH \
  https://platform.adobe.io/data/foundation/catalog/dataSets/5b020a27e7040801dedbf46e \
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

## Uploading profile and identity data

Both Unified Profile and Identity Service consume XDM data as it is being ingested to a dataset. For instruction on sending Parquet data files to your dataset, start with [Create a batch](../creating_a_dataset_tutorial/creating_a_dataset_tutorial.md#create-a-batch).

When planning what data to send to Platform, consider the following:

* Include any data you may wish to use to base audience segment criteria. When you require proprietary data not included in a standard schema, you can extend an XDM schema to accommodate your additional data. For more on working with XDM schemas, see the [Schema Registry API Developer Guide](../../technical_overview/schema_registry/schema_registry_developer_guide.md).
* The schema defining the structure of your record and time series data must have been enabled for Unified Profile and Identity Service, which is to say it has been enabled as a union schema. To learn how to enable schemas for union via API, visit [Enable XDM schemas for Unified Profile and Identity Service](../../technical_overview/schema_registry/schema_registry_api_tutorial/schema_registry_api_tutorial.md#enable-schema-for-use-in-unified-profile-service).
* Include as many identifiers as you can ascertain from your profile data to maximize your identity graph, and hence the ability of Identity Service to effectively stitch identities across datasets.

### Understanding the Data Lake, Profile Store, and Identity Graph

Each Catalog Service, Unified Profile, and Identity Service, maintains data in their own respective formats. All data ingested from either batch or streaming ingestion is persisted on Data Lake. Unified Profile maintains a profile store and Identity Service maintains identity graphs.

Data Lake is very granular and contains all information that has ever been collected. This includes data that you may not have a use for today, but that you may discover value for using in the future.

Unified Profile data in the profile store represents an aggregation of subject data, merging it together to create a single view of each individual in your user base. This information is therefore not as granular, and may lose fidelity over time as it is updated and merged together.

During data uploads, either solution may experience and report errors, though another solution may complete processing successfully.

<!-- Should show API way to tell which components reported any errors -->

---

## Confirming data ingest by Unified Profile

It is always a good idea to spot check your upload when it is the first of a new dataset or if any part of your process changes, such as using a new ETL or new data source. To do this, use Unified Profile Access API to ensure you can retrieve a sampling of known identities from your source data as expected.

Unified Profile receives batch data as it gets loaded into a dataset. If you are unable to retrieve any of the entities you expect, your dataset may not be enabled for Unified Profile. If you check and your dataset has been enabled, try ensuring your source data format and identifiers support your expectations.

You can find details on this by visiting the tutorial covering [Accessing Unified Profile data via API](../consuming_unified_profile_data/consuming_unified_profile_data.md).

---

## Confirming data ingest by Identity Service

Each data fragment in an ingest that contains more than one identity will create a link in your private identity graph. To validate your identities are reflected as you expect, [view identity clusters](../../technical_overview/identity_services_architectural_overview/identity_services_api.md#get-all-identities-in-a-cluster) for a sample of identities from your upload.

