# Configure a dataset for Real-time Customer Profile and Identity Service using APIs

This document provides a step-by-step tutorial that covers the process of enabling a dataset for use in Real-time Customer Profile and Identity Service. For information on streaming ingestion as it relates to Profile and Identity Service, see the [streaming ingestion overview](../../technical_overview/streaming_ingest/streaming_ingest_overview.md).

This tutorial covers the following steps:

1. Enable a dataset for use in Real-time Customer Profile, using one of two options:
    - [Create a new dataset](#create-a-dataset-with-real-time-customer-profile-and-identity-service-enabled)
    - [Configure an existing dataset](#configure-an-existing-dataset-for-real-time-customer-profile-and-identity-service)
1. [Upload data to the dataset](#upload-data-to-the-dataset)  
1. [Confirm data ingest by Real-time Customer Profile](#confirm-data-ingest-by-real-time-customer-profile)  
1. [Confirm data ingest by Identity Service](#confirm-data-ingest-by-identity-service)  

## Getting started

This tutorial requires a working understanding of the various Adobe Experience Platform services involved in managing Profile-enabled datasets. Before beginning this tutorial, please review the documentation for the following services:
- [Real-time Customer Profile](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md): Provides a unified, real-time consumer profile based on aggregated data from multiple sources.
- [Identity Service](../../technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md): Enables Real-time Customer Profile by bridging identities from disparate data sources being ingested into Platform.
- [Catalog Service](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md): A RESTful API that allows you to create datasets and configure them for Real-time Customer Profile and Identity Service.
- [Experience Data Model (XDM)](../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Platform organizes customer experience data.

## Tutorial

This tutorial requires you to have completed the
[Authentication to Adobe Experience Platform tutorial](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) in order to successfully make calls to Platform APIs. Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

* Authorization: Bearer `{ACCESS_TOKEN}`
* x-api-key: `{API_KEY}`
* x-gw-ims-org-id: `{IMS_ORG}`

All POST, PUT, and PATCH requests require an additional header:

* Content-Type: application/json

## Create a dataset with Real-time Customer Profile and Identity Service enabled

You can enable a dataset for Real-time Customer Profile and Identity Service immediately upon creation. If you would like to enable a dataset that has already been created, follow the steps for [configuring an existing dataset](#configure-an-existing-dataset-for-real-time-customer-profile-and-identity-service) found later in this document.

In order to create a new dataset, you must know the ID of an existing XDM schema that is enabled for Real-time Customer Profile. For more information on how to lookup or create a Profile-enabled schema, see the [Schema Registry API tutorial](../schema_registry_api_tutorial/schema_registry_api_tutorial.md). 

The following call to the Catalog API enables a dataset for Profile and Identity Service:

#### API format

```http
POST /datasets
```

#### Request

By including `unifiedProfile` and `unifiedIdentity` under `tags` in the request body, the dataset will be immediately enabled for Profile and Identity Service, respectively. The values of these tags must be an array containing the string `"enabled:true"`.

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/catalog/datasets \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
    "fileDescription" : {
    "persisted": true,
        "containerFormat": "parquet",
        "format": "parquet"
    },
    "fields":[],
    "schemaRef" : {
        "id": "https://ns.adobe.com/{TENANT_ID}/schemas/31670881463308a46f7d2cb09762715",
        "contentType": "application/vnd.adobe.xed-full-notext+json; version=1"
    },
    "tags" : {
       "unifiedProfile": ["enabled:true"],
       "unifiedIdentity": ["enabled:true"]
    }
  }'
```
- `schemaRef > id`: The ID of the Profile-enabled schema that the dataset will be based on.
- `{TENANT_ID}`: The namespace within the Schema Registry which contains resources belonging to your IMS Organization. See the [TENANT_ID](../../technical_overview/schema_registry/schema_registry_developer_guide.md#know-your-tenant_id) section of the Schema Registry developer guide for more information.

#### Response

A successful response shows an array containing the ID of the newly created dataset. Once you have successfully created and enabled a dataset, please proceed to the steps for [uploading data](#upload-data-to-the-dataset).

```json
[
    "@/datasets/5b020a27e7040801dedbf46e"
] 
```

## Configure an existing dataset for Real-time Customer Profile and Identity Service

The following steps cover how to enable a previously created dataset for Real-time Customer Profile and Identity Service. If you have already created a Profile-enabled dataset, please proceed to the steps for [uploading data](#upload-data-to-the-dataset).

### Check if the dataset is enabled

Using the Catalog API, you can inspect an existing dataset to determine whether it is enabled for use in Real-time Customer Profile and Identity Service. 

The following call retrieves the details of a dataset by ID:

#### API format

```http
GET /dataSets/{DATASET_ID}
```

- `{DATASET_ID}` : The ID of a dataset you want to inspect. To find the ID of a dataset, see the [listing datasets](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md#listing-objects) section in the Catalog Service overview.

#### Request

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets/5b020a27e7040801dedbf46e' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {ORG_ID}'
```

#### Response

```json
{
    "5b020a27e7040801dedbf46e": {
        "name": "Commission Program Events DataSet",
        "imsOrg": "{IMS_ORG}",
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
        "createdClient": "{CLIENT_CREATED}",
        "createdUser": "{CREATED_BY}",
        "updatedUser": "{CREATED_BY}",
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
Under the `tags` property, you can see that `unifiedProfile` and `unifiedIdentity` are both present with the value `enabled:true`. Therefore, Real-time Customer Profile and Identity Service are enabled for this dataset, respectively.

### Enable the dataset
If the existing dataset has not been enabled for Profile or Identity Service, you can enable it by making a PATCH request using the dataset ID:

#### API format

```http
PATCH /dataSets/{DATASET_ID}
```

#### Request
```shell
curl -X PATCH \
  https://platform.adobe.io/data/foundation/catalog/dataSets/5b020a27e7040801dedbf46e \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
    "tags" : {
        "unifiedProfile": ["enabled:true"],
        "unifiedIdentity": ["enabled:true"]
    }
  }'
```

The request body includes a `tags` property, which contains two sub-properties: `unifiedProfile` and `unifiedIdentity`. The values of these sub-properties are arrays containing the string `"enabled:true"`.

#### Response
A successful PATCH request returns HTTP Status 200 (OK) and an array containing the ID of the updated dataset. This ID should match the one sent in the PATCH request.

The `unifiedProfile` and `unifiedIdentity` tags have now been added and the dataset is enabled for use by Profile and Identity services.

```json
[
    "@/dataSets/5b020a27e7040801dedbf46e"
]
```

## Upload data to the dataset

Both Real-time Customer Profile and Identity Service consume XDM data as it is being ingested to a dataset. For instructions on how to upload data files to your dataset, see the [Create a batch](../creating_a_dataset_tutorial/creating_a_dataset_tutorial.md#create-a-batch) and [File upload](../creating_a_dataset_tutorial/creating_a_dataset_tutorial.md#file-upload) sections in the dataset tutorial.

When planning what data to send to your Profile-enabled dataset, consider the following best practices:

* Include any data you want to use as audience segment criteria. 
* Include as many identifiers as you can ascertain from your profile data to maximize your identity graph. This allows Identity Service to stitch identities across datasets more effectively.

<!-- Section needs to show API way to tell which components reported any errors before including any of the following info

### Data upload errors

Catalog Service, Real-time Customer Profile, and Identity Service each maintain data in their own respective formats. All data ingested from either batch or streaming ingestion is persisted on **Data Lake**. Real-time Customer Profile maintains a **profile store** and Identity Service maintains **identity graphs**.

During data uploads, either solution may experience and report errors, even if another solution processes the upload successfully.

-->

## Confirm data ingest by Real-time Customer Profile

When uploading data to a new dataset for the first time, or as part of a process involving a new ETL or data source, it is recommended to carefully check the data to ensure it has been uploaded as expected.

Using the Real-time Customer Profile Access API, you can retrieve batch data as it gets loaded into a dataset. If you are unable to retrieve any of the entities you expect, your dataset may not be enabled for Real-time Customer Profile. After confirming that your dataset has been enabled, ensure that your source data format and identifiers support your expectations.

For detailed instructions on how to use the Real-time Customer Profile API, please follow the [Accessing Unified Profile data via API](../consuming_unified_profile_data/consuming_unified_profile_data.md) tutorial.

## Confirm data ingest by Identity Service

Each data fragment ingested that contains more than one identity creates a link in your private identity graph. To confirm that identities are reflected correctly, use the [Identity Service API](../../../../../../acdpr/swagger-specs/id-service-api.yaml) to ensure the data can be found when viewing the appropriate identity cluster. See the section on viewing identity clusters section in the [Identity Service API guide](../../technical_overview/identity_services_architectural_overview/identity_services_api.md) for more information.