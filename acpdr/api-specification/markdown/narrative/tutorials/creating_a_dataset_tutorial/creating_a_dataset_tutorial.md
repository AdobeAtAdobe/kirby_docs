# Tutorial: Configuring a Dataset

## Objective

This document explains how to create and populate a customer dataset using a file. To create a dataset::

1. Extend an existing XDM schema with custom properties.
1. Create a new Dataset using the updated schema.
1. Create a Batch for uploading data into the new Dataset.
1. Upload the files to the batch using the Bulk Ingestion API.
1. Signal to the server that the Batch has been completed.
1. Verify that the operation was successful by reading back the data in the dataset using Data Access APIs.
1. Add additional fields to an XDM schema.

You can set a connector to ingest data. For information about, how to create and populate a dataset using a connector, see [Creating a Connector](../creating_a_connector_tutorial/creating_a_connector_tutorial.md).

---

## Datasets from a Schema

You can ingest data into a dataset in the following ways:

* Batch ingestion using file upload

* [Set up a connector to ingest files](../creating_a_connector_tutorial/creating_a_connector_tutorial.md)

### Prerequisites

Follow this [Tutorial](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) to set up authorization for API calls and gather the following values:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.

### Creating Dataset and Ingest File

Create a dataset by:

* Extending the `Profile` XDM schema
* Populating the XDM schema by uploading a file through the Bulk Ingestion API.

#### Extending the standard Schema

The `Person` standard schema describes the qualities of a person. For example their name, gender, and birthday. Extend the `Person` schema with the custom property, `hairColor`.

Use the following API call in the terminal to create a custom object. The response indicates the path where the schema is stored.

#### API Format

```http
PUT /xdms/{namespace}/{objectName}/_customer/{extensionNS}
```

#### Request

```SHELL
curl -X PUT 'https://platform.adobe.io/data/foundation/catalog/xdms/context/person/_customer/CustomerCompany' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {CLIENT_ID}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'content-type: application/json' \
  -d '{JSON_PAYLOAD}'
```

In the example, the `Person` object in JSON format is in the `{objectName}` field, `context` is in the `{namespace}` field and `CustomerCompany` is in the `{extensionNS}` field. Using names in additional fields extends the context `person` entity in the IMS organization's namespace. Modifying this context entity reflects other datasets that use the `person` entity. The `CustomerCompany` value creates an extension namespace you can use for different branches of a company. In the example, `CustomerCompany` is an extension of the namespace value `CustomerCompany`.


`{namespace}`: The base namespace (for example, `context`).
`{objectName}`: Name of the entity to extend.
`{extensionNS}`: Name of the extension namespace in which to put the extension, for example, Customer's company,
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
`{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
`{JSON_PAYLOAD}`: Data set to post. Following the same logic as the examples, `JSON_PAYLOAD` is:

```JSON
{
    "title": "Company Customer Hair-Related Information",
    "type": "object",
    "description": "Custom fields for customers to track hair-related queries",
    "extNamespace": "CustomerCompany",
    "properties": {
        "hairColor":{
            "title": "Hair Color",
            "type": "string",
            "description": "Hair color of the individual."
        }
    }
}
```

#### Response

```shell
@/xdms/context/person/_customer/CustomerCompany/
```

Query the `person` entity object using a separate API call to verify the extension.

#### API Format

```http
GET /xdms/{namespace}/{objectName}
```

#### Request

```SHELL
curl -X GET 'https://platform.adobe.io/data/foundation/catalog/xdms/context/person' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {CLIENT_ID}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```
`{namespace}`: The base namespace. (E.g. context)
`{objectName}`: Name of the entity to extend.
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
`{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.

#### Response

```JSON
{
    "created": "number",
    "updated": "number",
    "title": "Person",
    "type": "object",
    "description": "An individual actor, contact, or owner.",
    "properties": {
        "firstName": {},
        "lastName": {},
        "middleName": {},
        "courtesyTitle": {},
        "birthDay": {},
        "birthMonth": {},
        "birthYear": {},
        "gender": {},
        "audit": {},
        "_customer": {
            "type": "object",
            "properties": {
                "default": {},
                "CustomerCompany": {
                    "version": "1",
                    "created": "number",
                    "updated": "number",
                    "createdClient": "{API_KEY}",
                    "updatedUser": "string",
                    "imsOrg": "{IMS_ORG}",
                    "title": "Company Customer Hair-Related Information",
                    "type": "object",
                    "description": "Custom fields for customers to track hair-related queries",
                    "properties": {
                        "hairColor": {
                            "title": "Hair Color",
                            "type": "string",
                            "description": "Hair color of the individual."
                        }
                    },
                    "extNamespace": "{extensionNS}"
                }
            }
        }
    },
    "id": "context/person",
    "xdmVersion": "0.9.9.8",
}
```

The `hairColor` extension displays under the `properties` key of `Person`. By extending the `Person` entity here, datasets in the same IMS organization with the parent schema (for example, `Profile`) inherit the newly extended property. If a user in the same IMS organization extends the `Person` entity with another property (for example, `hairLength`), existing datasets with schemas with the `Person` entity also gain the `hairLength` property.


#### Creating a Dataset

After you extend the `Person` entity, you can create a dataset with the parent schema `Profile`. Thge parent schema includes the `hairColor` extended property. You can create the dataset using the following API call.

#### API Format

```http
POST /dataSets
```

#### Request

```SHELL
curl -X POST 'https://platform.adobe.io/data/foundation/catalog/dataSets?requestDataSource=true' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {CLIENT_ID}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'content-type: application/json' \
  -d '{JSON_PAYLOAD}'
```

`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
`{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
`{JSON_PAYLOAD}`: Data set to be posted. The example we used in our tutorial is here:

```JSON
{
    "name":"ProfileDataset",
    "schema":"@/xdms/context/profile",
    "fileDescription": {
        "persisted": true,
        "containerFormat": "parquet",
        "format": "parquet"
    }
}
```

The example used the `Profile` schema for this dataset. For information about other schemas you can use, see the [XDM registry](https://github.com/adobe/xdm/blob/master/docs/reference/README.md). For the file format, the examples uses [parquet](https://parquet.apache.org/documentation/latest/).

#### Response ####
```JSON
["@/dataSets/{DATASET_ID}"]
```

`{DATASET_ID}`: The ID of the dataset. Use this ID when creating a batch in the next section.

#### Creating a Batch

Before you can add data to a dataset, you must link it to a batch that you upload into a specified dataset.

#### API Format
```http
POST /batches
```

#### Request

```SHELL
curl -X POST 'https://platform.adobe.io/data/foundation/import/batches' \
  -H 'accept: application/json' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key : {API_KEY}' \
  -H 'content-type: application/json' \
  -d '{"datasetId":"{DATASET_ID}"}'
```
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
`{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
`{DATASET_ID}`: The ID of the dataset to upload the files into.


#### Response
```JSON
{
    "id": "{BATCH_ID}",
    "imsOrg": "{IMG_ORG}",
    "updated": 1520368161969,
    "status": "loading",
    "created": 1520368161969,
    "relatedObjects": [

    ],
    "version": "1.0.0",
    "tags": {
        "acp_producer": [
            "e6be7e083490427b8aab60ba4abfb981"
        ],
        "acp_stagePath": [
            "acp_foundation_push/stage/18dda765fa6048e4901add83f926f399"
        ]
    },
    "createdUser": "{CREATED_USER}@AdobeID",
    "updatedUser": "{UPDATED_USER}@AdobeID"
}
```

The response gives the batch ID that you use to upload files and signal for promotion in future calls.

`{BATCH_ID}`: The ID of the batch that was just created (used in future calls).
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration



#### File Upload

After successfully creating a new batch for uploading, you can upload files to a specific dataset. Note that in [Creating a Dataset](#creating-a-dataset) the example specified the format of the data as parquet. The files you upload must be in the same format which you specified.

If the original file being uploaded is greater than 512 MB, you must break it up into 512 MB chunks and upload each file one at a time. Upload each 512 MB chunkto a dataset in the same batch by repeating this step for each file, using the same batch ID.

#### API Format

```http
PUT /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}
```

#### Request

```SHELL
curl -X PUT 'https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet' \
  -H 'content-type: application/octet-stream' \
  -H 'x-api-key : {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMG_ORG}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  --data-binary '@{FILE_PATH_AND_NAME}.parquet'
```

`{BATCH_ID}`: The ID of the batch that was just created (used in future calls).
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
`{DATASET_ID}`: The ID of the dataset to upload the files into.
`{FILE_NAME}` Name of file as it will be seen in the dataset.
`{FILE_PATH_AND_NAME}`: The path and filename of the file to be uploaded into the dataset.
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
`{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.

#### Response
```http
#Status 200 OK, with empty response
```

#### Signal Batch Completion

After you upload all data files to the batch, you can signal for promotion. Signaling for a promotion causes the service to create Catalog DataSetFile entries for the promoted files and associate them with the Batch generated above. The Catalog Batch is marked successful which triggers any downstream flows that can then work on the now available data.

#### API Format

```http
POST /batches/{BATCH_ID}?actions=PROMOTE
```

#### Request

```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
  -H 'x-api-key : {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMG_ORG}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}'
```

`{BATCH_ID}`: The ID of the batch that was just created (used in future calls).
`{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.

#### Response
```http
#Status 200 OK, with empty response
```

#### Read data from the dataset

With the batch ID you can use the Data Access APIs to get a list of files in the batch that you uploaded previously. The response will return an array containing a list of files IDs which reference the files in the batch. Next the files can be downloaded with the Data Access APIs. The name, size in bytes, and a link to download the file or folder will be returned.

Detailed steps to do this can be found in the [Data Access Tutorial](../data_access_tutorial/data_access_tutorial.md).

#### Adding additional fields

There may be times that you need to add fields to a dataset you've already extended. To do this, you'll need to first **view** the extension as it exists currently.

#### API Format - Retrieving Current Extension

```http
GET /xdms/{namespace}/{objectName}/_customer/{extensionNS}
```

#### Request

```shell
curl -X GET 'https://platform.adobe.io/data/foundation/catalog/xdms/context/person/_customer/CustomerCompany' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```
#### Response

Let's use the previous example of the `CustomerCompany` object.

```JSON
{
    "title": "Company Customer Hair-Related Information",
    "type": "object",
    "description": "Custom fields for customers to track hair-related queries",
    "properties": {
        "hairColor": {
            "title": "Hair Color",
            "type": "string",
            "description": "Hair color of the individual."
        }
    },
    "extNamespace": "CustomerCompany",
    "version": "1",
    "created": 1536877166554,
    "updated": 1536877452280,
    "createdClient": "{API_KEY}",
    "updatedUser": "{UPDATED_USER}@AdobeID",
    "imsOrg": "{IMS_ORG}"
}
```

As it currently exists, it has the property `hairColor`, but now, let's add the property `hairLength`.

#### API Format - Adding Fields to the Extension

```http
PUT /xdms/{namespace}/{objectName}/_customer/{extensionNS}
```

After confirming that the GET request's response is, in fact, the correct extension, you can now add fields to the extension and issue a PUT request.

#### Request
Since to add the property `hairLength`, you would need to take all the previous properties, and add the property `hairLength`, along with its title, type, and description.

```json
    ...
    "title": "Company Customer Hair-Related Information",
    "type": "object",
    "description": "Custom fields for customers to track hair-related queries",
    "properties": {
        "hairColor": {
            "title": "Hair Color",
            "type": "string",
            "description": "Hair Color"
        },
        "hairLength": {
            "title": "Hair Length",
            "type": "string",
            "description": "Hair Length"
        }
    },
    ...
```

Or, to put in a full CURL request:

```shell
curl -X PUT  'https://platform.adobe.io/data/foundation/catalog/xdms/context/person/_customer/CustomerCompany' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'content-type: application/json' \
  -d ' {
        "title": "Company Customer Hair-Related Information",
        "type": "object",
        "description": "Custom fields for customers to track hair-related queries",
        "properties": {
            "hairColor": {
                "title": "Hair Color",
                "type": "string",
                "description": "Hair Color"
            },
            "hairLength": {
                "title": "Hair Length",
                "type": "string",
                "description": "Hair Length"
            }
        }
    }'
```

**Note:** The PUT request is, essentially, **re-writing** the existing extension, and is **not** appending to it. As a result, ensure your PUT request includes **ALL** the fields (old and new) that you wish to have in the updated extension.

In addition, it is good to follow basic XDM principles - ensure **no** breaking changes are made - other good XDM principles can be found [here](../../technical_overview/schema_registry/schema_design/schema_principles.md).

#### API Format - Verifying the Field is Added

```http
GET /xdms/{namespace}/{objectName}/_customer/{extensionNS}
```

#### Request

Now that you've PUT in a new field, you can perform the same GET request on the `CustomerCompany` object to ensure the updated field has been added.

```shell
curl -X GET 'https://platform.adobe.io/data/foundation/catalog/xdms/context/person/_customer/CustomerCompany' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

```json
{
    "title": "Company Customer Hair-Related Information",
    "type": "object",
    "description": "Custom fields for customers to track hair-related queries",
    "properties": {
        "hairColor": {
            "title": "Hair Color",
            "type": "string",
            "description": "Hair color of the individual."
        },
        "hairLength": {
            "title": "Hair Length",
            "type": "string",
            "description": "Hair length of the individual"
        }
    },
    "extNamespace": "CustomerCompany",
    "version": "2",
    "created": 1536877166554,
    "updated": 1536877452280,
    "createdClient": "{API_KEY}",
    "updatedUser": "{UPDATED_USER}@AdobeID",
    "imsOrg": "{IMS_ORG}"
}
```

More detailed steps to add fields to an extension can be found in the [schema registry developer guide](../../technical_overview/schema_registry/acp_schema_registry.md#add-fields-to-an-extension).

Now that the schema has been updated with the additional field, you can re-follow the tutorial to ingest new data that conforms to the revised schema.

Remember, that any changes to the schema must be **non-breaking**, meaning that schema evolution is purely additive. More details can be found in the [Schema Design Principles and Best Practices guide](../../technical_overview/schema_registry/schema_design/schema_principles.md).
