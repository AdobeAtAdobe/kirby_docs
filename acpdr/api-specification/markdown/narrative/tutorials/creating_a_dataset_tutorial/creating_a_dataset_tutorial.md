# Tutorial: Configure a dataset using a file

This tutorial will walk you through the steps to create and populate a dataset using a file. 

The steps involved include:

1. Create a dataset based on a schema
1. Create a batch for uploading data into the dataset
1. Upload the files to the batch
1. Signal to the server that the batch has been completed
1. Verify that the operation was successful by reading back the data in the dataset

## Getting started

You can ingest data into a dataset in two different ways:

* Batch ingestion using file upload
* Set up a connector to ingest files

Batch ingestion using a file will be covered by this tutorial. For information about how to create and populate a dataset using a connector, see the [Setting up Connectors](../creating_a_connector_tutorial/creating_a_connector_tutorial.md) documentation.

### Reading the API calls

Before making calls to the API, it is important to understand how to read the calls in this document. 

Each API call is shown in two different ways. First, the command is presented in its "API format", a template representation showing only the operation (GET, POST, PUT, PATCH, DELETE) and the endpoint being used (e.g. `/datasets`). Some templates also include examples or show the location of variables to help illustrate how a call should be formulated, such as `GET /datasets/{variable}`.

The calls are then shown as [curl](https://curl.haxx.se/docs/faq.html#What_is_cURL) commands in a "Request", which includes the necessary headers and full "base path" needed to successfully interact with the API.

For example, the base path for the Catalog Service API is: `https://platform.adobe.io/data/foundation/catalog`. 

The base path should be pre-pended to all endpoints. For example, the `/datasets` endpoint becomes: `https://platform.adobe.io/data/foundation/catalog/datasets` in order to make a call to the API.

You will see the API format / Request pattern throughout the tutorial, and should be sure to use the complete path shown in the sample Request, as the calls in this tutorial use multiple services with different base paths.

### Authentication and request headers

The calls in this tutorial require specific request headers be sent with each call in order to successfully use the APIs. 

The headers, and the values required, are:

* Authorization: Bearer `{ACCESS_TOKEN}` - The token provided after [authentication](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). 
* x-api-key: `{API_KEY}` - Your specific API key for your unique Platform integration.
* x-gw-ims-org-id: `{IMS_ORG}` - The IMS Organization credentials for your unique Platform integration.

You will also occasionally need the following headers:

* Content-Type: Used to specify acceptable media types in the request body
* Accept: Used to specify acceptable media types in the response body

The correct headers are included in the Request example for each call.

## Tutorial

In order to create a dataset, a schema must first be defined. A schema is a set of rules to help represent data. In addition to describing the structure of data, schemas provide constraints and expectations that can be applied and used to validate data as it is moved between systems. 

These standard definitions allow data to be interpreted consistently, regardless of origin, and remove the need for translation across applications. For more information about composing schemas, read [Basics of Schema Composition](../../technical_overview/schema_registry/schema_composition/schema_composition.md)

## Lookup dataset schema

This tutorial begins where the [Schema Registry API Tutorial](../../technical_overview/schema_registry/schema_registry_api_tutorial/schema_registry_api_tutorial.md) ends, making use of the Loyalty Members schema created during that tutorial. 

If you have not completed the Schema Registry tutorial, please start there and continue with this dataset tutorial only once you have composed the necessary schema.

The following call can be used to view the Loyalty Members schema you created during the [Schema Registry API Tutorial](../../technical_overview/schema_registry/schema_registry_api_tutorial/schema_registry_api_tutorial.md).

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

You will receive an HTTP Status 201 (Created) and a response body that consists of an array containing the ID of the newly created dataset in the format `"@/datasets/{DATASET_ID}"`. The dataset ID is a read-only, system-generated string that will be used to reference the dataset throughout this tutorial.

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

You will receive an HTTP Status 201 (Created) and a response object containing details of the newly created batch, including its `id`, a read-only, system generated string.

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

## File upload

After successfully creating a new batch for uploading, you can now upload files to the specific dataset. It is important to remember that when you defined the dataset, you specified the file format as parquet. Therefore, the files you upload must be in that format.

> **Note:** If the file being uploaded is greater than 512 MB, you must break it into 512 MB chunks and upload each file one at a time. You can upload each 512 MB chunk to a dataset in the same batch by repeating this step for each file, using the same batch ID.

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

## Read data from the dataset

With the batch ID, you can use the Data Access API to read-back and verify all of the files uploaded to the batch. The response will return an array containing a list of file IDs, each referencing a file in the batch. 

You can also use the Data Access API to return the name, size in bytes, and a link to download the file or folder.

Detailed steps for working with the Data Access API can be found in the [Data Access Tutorial](../data_access_tutorial/data_access_tutorial.md).

## Updating the dataset schema

In the future, you may find yourself needing to add fields and ingest additional data into a dataset that you have created. To do this, you first need to update the schema to add additional properties to define the new data. This can be done using PATCH and/or PUT operations to update the existing schema.

For more information about updating schemas, see the [Schema Registry API Developer Guide](../../technical_overview/schema_registry/schema_registry_developer_guide.md).

Once you have updated the schema, you can re-follow the steps in this tutorial to ingest new data that conforms to the revised schema.

It is important to remember that schema evolution is purely additive, meaning you cannot introduce a breaking change to a schema once it has been saved to the registry and used for data ingestion. To learn more about best practices for composing schema for use with Adobe Experience Platform, read the [Basics of Schema Composition](../../technical_overview/schema_registry/schema_composition/schema_composition.md).