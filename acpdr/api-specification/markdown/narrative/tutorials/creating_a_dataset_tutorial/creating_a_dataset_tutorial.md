# Create a dataset using APIs

This tutorial walks through the steps to create a dataset using Adobe Experience Platform APIs, and populate the dataset using a file.

The steps involved include:

1. [Lookup a dataset schema](#lookup-dataset-schema)
1. [Create a dataset](#create-a-dataset) based on the schema
1. [Create a batch](#create-a-batch) for uploading data into the dataset
1. [Upload files](#upload-files-to-a-batch) to the batch
1. [Signal to the server that the batch has been completed](#signal-batch-completion)
1. [Monitor data ingestion](#monitor-ingestion) for a batch
1. Verify that the operation was successful by [reading back the data in the dataset](#read-data-from-the-dataset)
1. (Optional) [Update the dataset schema](#update-the-dataset-schema) to ingest additional data into an existing dataset

## Getting started

You can ingest data into a dataset in two different ways:

* Batch ingestion using file upload
* Set up a connector to ingest files

This tutorial covers batch ingestion using a file. For information about how to create and populate a dataset using a connector, see the documentation on [creating a connector](../creating_a_connector_tutorial/creating_a_connector_tutorial.md).

### Reading the API calls

Before making calls to the API, it is important to understand how to read the calls in this document. 

Each API call is shown in two different ways. First, the command is presented in its "API format", a template representation showing only the operation (GET, POST, PUT, PATCH, DELETE) and the endpoint being used (for example, `/datasets`). Some templates also show the location of variables to help illustrate how a call should be formulated, such as `GET /datasets/{variable}`.

The calls are then shown as [cURL](https://curl.haxx.se/docs/faq.html#What_is_cURL) commands in a "Request", which includes the necessary headers and full "base path" needed to successfully interact with the API.

For example, the base path for the Catalog Service API is: `https://platform.adobe.io/data/foundation/catalog`. 

The base path should be pre-pended to all endpoints. For example, the `/datasets` endpoint becomes: `https://platform.adobe.io/data/foundation/catalog/datasets` in order to make a call to the API.

The API format / Request pattern is used throughout the tutorial. Please ensure that you are using the complete path shown in the Request section, as the calls in this tutorial use multiple services with different base paths.

### Authentication and request headers

The calls in this tutorial require the following three request headers to be sent with each call in order to successfully use the APIs:

* Authorization: Bearer `{ACCESS_TOKEN}` - The token provided after [authentication](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). 
* x-api-key: `{API_KEY}` - Your specific API key for your unique Platform integration.
* x-gw-ims-org-id: `{IMS_ORG}` - The IMS Organization credentials for your unique Platform integration.

The following headers are also occasionally required:

* Content-Type: Used to specify acceptable media types in the request body
* Accept: Used to specify acceptable media types in the response body

The correct headers are included in the Request example for each call.

## Tutorial

In order to create a dataset, a schema must first be defined. A schema is a set of rules to help represent data. In addition to describing the structure of data, schemas provide constraints and expectations that can be applied and used to validate data as it is moved between systems. 

These standard definitions allow data to be interpreted consistently, regardless of origin, and remove the need for translation across applications. For more information about composing schemas, read [Basics of Schema Composition](../../technical_overview/schema_registry/schema_composition/schema_composition.md)

## Lookup dataset schema

This tutorial begins where the [Schema Registry API tutorial](../schema_registry_api_tutorial/schema_registry_api_tutorial.md) ends, making use of the Loyalty Members schema created during that tutorial. 

If you have not completed the Schema Registry tutorial, please start there and continue with this dataset tutorial only once you have composed the necessary schema.

The following call can be used to view the Loyalty Members schema you created during the [Schema Registry API tutorial](../../tutorials/schema_registry_api_tutorial/schema_registry_api_tutorial.md):

#### API format

```HTTP
GET /tenant/schemas/{schema meta:altId or URL encoded $id URI}
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas/_{TENANT_ID}.schemas.533ca5da28087c44344810891b0f03d9 \
  -H 'Accept: application/vnd.adobe.xed-full+json; version=1' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
```

#### Response

The format of the response object depends on the Accept header sent in the request. Individual properties in this response have been minimized for space.

```JSON
{
    "type": "object",
    "title": "Loyalty Members",
    "description": "Information for all members of the loyalty program",
    "meta:class": "https://ns.adobe.com/xdm/context/profile",
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:extends": [
        "https://ns.adobe.com/xdm/context/profile",
        "https://ns.adobe.com/xdm/data/record",
        "https://ns.adobe.com/xdm/context/identitymap",
        "https://ns.adobe.com/xdm/common/extensible",
        "https://ns.adobe.com/xdm/common/auditable",
        "https://ns.adobe.com/xdm/context/profile-person-details",
        "https://ns.adobe.com/xdm/context/profile-personal-details",
        "https://ns.adobe.com/{TENANT_ID}/mixins/bb118e507bb848fd85df68fedea70c62"
    ],
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:immutableTags": [
        "union"
    ],
    "meta:altId": "_{TENANT_ID}.schemas.533ca5da28087c44344810891b0f03d9",
    "meta:xdmType": "object",
    "properties": {
        "repositoryCreatedBy": {},
        "repositoryLastModifiedBy": {},
        "createdByBatchID": {},
        "modifiedByBatchID": {},
        "_repo": {},
        "identityMap": {},
        "_id": {},
        "timeSeriesEvents": {},
        "person": {},
        "homeAddress": {},
        "personalEmail": {},
        "homePhone": {},
        "mobilePhone": {},
        "faxPhone": {},
        "_{TENANT_ID}": {
            "type": "object",
            "meta:xdmType": "object",
            "properties": {
                "loyalty": {
                    "title": "Loyalty",
                    "description": "Loyalty Info",
                    "type": "object",
                    "meta:xdmType": "object",
                    "meta:referencedFrom": "https://ns.adobe.com/{TENANT_ID}/datatypes/49b594dabe6bec545c8a6d1a0991a4dd",
                    "properties": {
                        "loyaltyId": {
                            "title": "Loyalty Identifier",
                            "type": "string",
                            "description": "Loyalty Identifier.",
                            "meta:xdmType": "string"
                        },
                        "loyaltyLevel": {
                            "title": "Loyalty Level",
                            "type": "string",
                            "meta:xdmType": "string"
                        },
                        "loyaltyPoints": {
                            "title": "Loyalty Points",
                            "type": "integer",
                            "description": "Loyalty points total.",
                            "meta:xdmType": "int"
                        },
                        "memberSince": {
                            "title": "Member Since",
                            "type": "string",
                            "format": "date-time",
                            "description": "Date the member joined the Loyalty Program.",
                            "meta:xdmType": "date-time"
                        }
                    }
                }
            }
        }
    },
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/533ca5da28087c44344810891b0f03d9",
    "version": "1.4",
    "meta:resourceType": "schemas",
    "meta:registryMetadata": {
        "repo:createDate": 1551836845496,
        "repo:lastModifiedDate": 1551843052271,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:repositoryCreatedBy": "{CREATED_BY}"
    }
}
```

## Create a dataset

With the Loyalty Members schema in place, you can now create a dataset that references the schema.

#### API format

```HTTP
POST /dataSets
```

#### Request

```SHELL
curl -X POST \
  'https://platform.adobe.io/data/foundation/catalog/dataSets?requestDataSource=true' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
    "name":"LoyaltyMembersDataset",
    "schemaRef": {
        "id": "https://ns.adobe.com/{TENANT_ID}/schemas/719c4e19184402c27595e65b931a142b",
        "contentType": "application/vnd.adobe.xed+json;version=1"
    },
    "fileDescription": {
        "persisted": true,
        "containerFormat": "parquet",
        "format": "parquet"
    }
}'
```

For the file format, this tutorial uses [parquet](https://parquet.apache.org/documentation/latest/).

#### Response

A successful response returns HTTP Status 201 (Created) and a response object that consists of an array containing the ID of the newly created dataset in the format `"@/datasets/{DATASET_ID}"`. The dataset ID is a read-only, system-generated string that is used to reference the dataset in API calls.

```JSON
[
    "@/dataSets/5c8c3c555033b814b69f947f"
]
```

## Create a batch

Before you can add data to a dataset, you must create a batch that is linked to the dataset. The batch will then be used for uploading.

#### API format

```HTTP
POST /batches
```

#### Request

The request body includes a "datasetId" field, the value of which is the `{DATASET_ID}` generated in the previous step.

```SHELL
curl -X POST 'https://platform.adobe.io/data/foundation/import/batches' \
  -H 'accept: application/json' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key : {API_KEY}' \
  -H 'content-type: application/json' \
  -d '{
        "datasetId":"5c8c3c555033b814b69f947f"
      }'
```

#### Response

A successful response returns HTTP Status 201 (Created) and a response object containing details of the newly created batch, including its `id`, a read-only, system generated string.

```JSON
{
    "id": "5d01230fc78a4e4f8c0c6b387b4b8d1c",
    "imsOrg": "{IMS_ORG}",
    "updated": 1552694873602,
    "status": "loading",
    "created": 1552694873602,
    "relatedObjects": [
        {
            "type": "dataSet",
            "id": "5c8c3c555033b814b69f947f"
        }
    ],
    "version": "1.0.0",
    "tags": {
        "acp_producer": [
            "{CREATED_CLIENT}"
        ],
        "acp_stagePath": [
            "{CREATED_CLIENT}/stage/5d01230fc78a4e4f8c0c6b387b4b8d1c"
        ],
        "use_plan_b_batch_status": [
            "false"
        ]
    },
    "createdUser": "{CREATED_BY}",
    "updatedUser": "{CREATED_BY}",
    "externalId": "5d01230fc78a4e4f8c0c6b387b4b8d1c",
    "createdClient": "{CREATED_CLIENT}",
    "inputFormat": {
        "format": "parquet"
    }
}
```

## Upload files to a batch

After successfully creating a new batch for uploading, you can now upload files to the specific dataset. It is important to remember that when you defined the dataset, you specified the file format as parquet. Therefore, the files you upload must be in that format.

> **Note:** The largest data upload file supported is 512 MB. If your data file is larger than this, it needs to be broken into chunks no larger than 512 MB, to be uploaded one at a time. You can upload each file in the same batch by repeating this step for each file, using the same batch ID. There is no limit to the number if files you can upload as part of a batch.

#### API format

```http
PUT /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}
```

#### Request

```SHELL
curl -X PUT 'https://platform.adobe.io/data/foundation/import/batches/5d01230fc78a4e4f8c0c6b387b4b8d1c/datasets/5c8c3c555033b814b69f947f/files/loyaltyData.parquet' \
  -H 'content-type: application/octet-stream' \
  -H 'x-api-key : {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMG_ORG}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  --data-binary '@{FILE_PATH_AND_NAME}.parquet'
```

#### Response

A successfully uploaded file returns a blank response body and HTTP Status 200 (OK).

## Signal batch completion

After you upload all of your data files to the batch, you can signal the batch for completion. Signaling completion causes the service to create Catalog DataSetFile entries for the uploaded files and associate them with the batch generated previously. The Catalog batch is marked successful, which triggers any downstream flows that can then work on the now available data.

#### API format

```HTTP
POST /batches/{BATCH_ID}?action=COMPLETE
```

#### Request

```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/5d01230fc78a4e4f8c0c6b387b4b8d1c?action=COMPLETE" \
  -H 'x-api-key : {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMG_ORG}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}'
```

#### Response

A successfully completed batch returns a blank response body and HTTP Status 200 (OK).


## Monitor ingestion

Depending on the size of the data, batches take varying lengths of time to ingest. You can monitor the status of a batch by appending a `batch` request parameter containing the batch's ID to a `GET /batches` request. The API polls the dataset for the status of the batch from ingestion until the `status` in the response indicates completion ("success" or "failure").

#### API format

```HTTP
GET /batches?batch={BATCH_ID}
```

#### Request

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/batches?batch=5d01230fc78a4e4f8c0c6b387b4b8d1c' \
  -H 'x-api-key : {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMG_ORG}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}'
```

#### Response

A positive response returns an object with its `"status"` attribute containing the value of `"success"`:

```JSON
{
    "5b7129a879323401ef2a6486": {
        "imsOrg": "{IMS_ORG}",
        "created": 1534142888068,
        "createdClient": "{CREATED_CLIENT}",
        "createdUser": "{CREATED_BY}",
        "updatedUser": "{CREATED_BY}",
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

A negative response returns an object with the value of `"failed"` in its `"status"` attribute, and includes any relevant error messages:

```JSON
{
    "5b96ce65badcf701e51f075d": {
        "imsOrg": "{IMS_ORG}",
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
        "createdClient": "{CREATED_CLIENT}",
        "createdUser": "{CREATED_BY}",
        "updatedUser": "{CREATED_BY}",
        "updated": 1536610442814,
        "version": "1.0.5"
    }
}
```

A recommended polling interval is two minutes. For more information on working with Catalog datasets and batches, see the [Catalog Service overview](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md).

## Read data from the dataset

With the batch ID, you can use the Data Access API to read-back and verify all of the files uploaded to the batch. The response returns an array containing a list of file IDs, each referencing a file in the batch. 

You can also use the Data Access API to return the name, size in bytes, and a link to download the file or folder.

Detailed steps for working with the Data Access API can be found in the [Data Access Tutorial](../data_access_tutorial/data_access_tutorial.md).

## Update the dataset schema

You can add fields and ingest additional data into datasets that you have created. To do this, you first need to update the schema by adding additional properties that define the new data. This can be done using PATCH and/or PUT operations to update the existing schema.

For more information about updating schemas, see the [Schema Registry API Developer Guide](../../technical_overview/schema_registry/schema_registry_developer_guide.md).

Once you have updated the schema, you can re-follow the steps in this tutorial to ingest new data that conforms to the revised schema.

It is important to remember that schema evolution is purely additive, meaning you cannot introduce a breaking change to a schema once it has been saved to the registry and used for data ingestion. To learn more about best practices for composing schema for use with Adobe Experience Platform, read the [Basics of Schema Composition](../../technical_overview/schema_registry/schema_composition/schema_composition.md).