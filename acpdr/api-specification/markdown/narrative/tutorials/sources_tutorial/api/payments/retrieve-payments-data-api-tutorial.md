# Collect data from a payments application using the Flow Service API

 ***WARNING: This documentation is no longer being maintained and may be outdated. Find up-to-date guides and tutorials in the new [Sources documentation](https://docs.adobe.com/content/help/en/experience-platform/sources/home.html) area.***
 
 Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

This tutorial covers the steps for retrieving data from a payments application and ingesting it into Platform through source connectors and APIs. The steps include:

-   [Create an ad-hoc XDM class and schema](#create-an-ad-hoc-xdm-class-and-schema)
-   [Create a source connection](#create-a-source-connection)
-   [Create a target XDM schema](#create-a-target-xdm-schema)
-   [Create a target dataset](#create-a-target-dataset)
-   [Create a target connection](#create-a-target-connection)
-   [Create a mapping](#create-a-mapping)
-   [Look up dataflow specifications](#look-up-dataflow-specifications)
-   [Create a dataflow](#create-a-dataflow)

## Getting started

This tutorial requires you to have a working understanding of the following components of Adobe Experience Platform:

- [Experience Data Model (XDM) System](https://docs.adobe.com/content/help/en/experience-platform/xdm/home.html): The standardized framework by which Experience Platform organizes customer experience data.
  - [Basics of schema composition](https://docs.adobe.com/content/help/en/experience-platform/xdm/schema/composition.html): Learn about the basic building blocks of XDM schemas, including key principles and best practices in schema composition.
  - [Schema Registry developer guide](https://docs.adobe.com/content/help/en/experience-platform/xdm/api/getting-started.html): Includes important information that you need to know in order to successfully perform calls to the Schema Registry API. This includes your `{TENANT_ID}`, the concept of "containers", and the required headers for making requests (with special attention to the Accept header and its possible values).
- [Catalog Service](https://docs.adobe.com/content/help/en/experience-platform/catalog/home.html): Catalog is the system of record for data location and lineage within Experience Platform.
- [Data Ingestion](https://docs.adobe.com/content/help/en/experience-platform/ingestion/home.html): Adobe Experience Platform Data Ingestion represents the multiple methods by which Platform ingests data, as well as how data is persisted within the Data Lake for use by downstream Platform services.
- [Sandboxes](https://docs.adobe.com/content/help/en/experience-platform/sandbox/home.html): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully connect to a payments application using the Flow Service API.

### Gather required credentials

This tutorial requires you to have a valid connection with the third-party payments application you wish to ingest data from. A valid connection involves your application's connection specification ID and connection ID. More information about creating a payments connection and retrieving these values can be found in the [create a source in the API](../sources-api-tutorial.md) tutorial.

This tutorial also requires you to have information about the file you wish to bring into Platform, including the file's path and structure. If you do not have this information, see the tutorial on [exploring a payments application using the Flow Service API](./explore-payments-api-tutorial.md) before attempting this tutorial.

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](https://docs.adobe.com/content/help/en/experience-platform/landing/troubleshooting.html#reading-example-api-calls) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](https://docs.adobe.com/content/help/en/experience-platform/tutorials/authentication.html). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform, including those belonging to the Flow Service, are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

All requests that contain a payload (POST, PUT, PATCH) require an additional media type header:

- Content-Type: `application/json`

## Create an ad-hoc XDM class and schema

In order to bring external data into Platform through source connectors, an ad-hoc XDM class and schema must be created for the raw source data.

To create an ad-hoc class and schema, follow the steps outlined in the [ad-hoc schema tutorial](https://docs.adobe.com/content/help/en/experience-platform/xdm/tutorials/ad-hoc.html). When creating an ad-hoc class, all fields found in the source data must be described within the request body.

Continue following the steps outlined in the developer guide until you have created an ad-hoc schema. Obtain and store the unique identifier (`$id`) of the ad-hoc schema and then proceed to the next step of this tutorial.

## Create a source connection

With an ad-hoc XDM schema created, a source connection can now be created using a POST request to the Flow Service API. A source connection consists of a connection ID, a source data file, and a reference to the schema that describes the source data.

#### API format

```http
POST /sourceConnections
```

#### Request

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/flowservice/sourceConnections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "name": "Paypal source connection",
        "baseConnectionId": "24151d58-ffa7-4960-951d-58ffa7396097",
        "description": "Paypal",
        "data": {
            "format": "parquet_xdm",
            "schema": {
                "id": "https://ns.adobe.com/{TENANT_ID}/schemas/396f583b57577b2f2fca79c2cb88e9254992f5fa70ce5f1a",
                "version": "application/vnd.adobe.xed-full-notext+json; version=1"
            }
        },
        "params": {
            "path": "PayPal.Catalog_Products"
        },
        "connectionSpec": {
            "id": "221c7626-58f6-4eec-8ee2-042b0226f03b",
            "version": "1.0"
        }
    }'
```

| Property | Description |
| -------- | ----------- |
| `baseConnectionId`| The connection ID of your payments application |
| `data.schema.id`| The `$id` of the ad-hoc XDM schema. |
| `params.path`| The path of the source file. |
| `connectionSpec.id`| The connection specification ID of your payments application. |

#### Response

A successful response returns the unique identifier (`id`) of the newly created source connection. This ID is required in later steps to create a target connection.

```json
{
    "id": "2c48a152-3d49-43cb-88a1-523d49e3cbcb",
    "etag": "\"8000c843-0000-0200-0000-5e8917ea0000\""
}
```

## Create a target XDM schema

In earlier steps, an ad-hoc XDM schema was created to structure the source data. In order for the source data to be used in Platform, a target schema must also be created to structure the source data according to your needs. The target schema is then used to create a Platform dataset in which the source data is contained. This target XDM schema also extends the XDM Individual Profile class.

A target XDM schema can be created by performing a POST request to the [Schema Registry API](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/schema-registry.yaml).

>**Note:** If you would prefer to use the user interface in Experience Platform, the [Schema Editor tutorial](https://docs.adobe.com/content/help/en/experience-platform/xdm/tutorials/create-schema-ui.html) provides step-by-step instructions for performing similar actions in the Schema Editor.

#### API format

```http
POST /tenant/schemas
```

#### Request

The following example request creates an XDM schema that extends the XDM Individual Profile class.

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "type": "object",
        "title": "Target schema for payments",
        "description": "Target schema for payments",
        "allOf": [
            {
                "$ref": "https://ns.adobe.com/xdm/context/profile"
            },
            {
                "$ref": "https://ns.adobe.com/xdm/context/profile-person-details"
            },
            {
                "$ref": "https://ns.adobe.com/xdm/context/profile-personal-details"
            },
                    {
                "$ref": "https://ns.adobe.com/xdm/context/profile-personal-details"
            }
        ],
        "meta:containerId": "tenant",
        "meta:resourceType": "schemas",
        "meta:xdmType": "object",
        "meta:class": "https://ns.adobe.com/xdm/context/profile"
}'
```

#### Response

A successful response returns details of the newly created schema including its unique identifier (`$id`). This ID is required in later steps to create a target dataset, mapping, and dataflow.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/14d89c5bb88e2ff488f23db896be469e7e30bb166bda8722",
    "meta:altId": "_{TENANT_ID}.schemas.14d89c5bb88e2ff488f23db896be469e7e30bb166bda8722",
    "meta:resourceType": "schemas",
    "version": "1.0",
    "title": "Target schema for payments",
    "type": "object",
    "description": "Target schema for Paypal",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile",
            "type": "object",
            "meta:xdmType": "object"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile-person-details",
            "type": "object",
            "meta:xdmType": "object"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile-personal-details",
            "type": "object",
            "meta:xdmType": "object"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile-personal-details",
            "type": "object",
            "meta:xdmType": "object"
        }
    ],
    "refs": [
        "https://ns.adobe.com/xdm/context/profile-person-details",
        "https://ns.adobe.com/xdm/context/profile-personal-details",
        "https://ns.adobe.com/xdm/context/profile"
    ],
    "imsOrg": "{IMS_ORG}",
    "meta:extensible": false,
    "meta:abstract": false,
    "meta:extends": [
        "https://ns.adobe.com/xdm/context/profile-person-details",
        "https://ns.adobe.com/xdm/context/profile-personal-details",
        "https://ns.adobe.com/xdm/common/auditable",
        "https://ns.adobe.com/xdm/data/record",
        "https://ns.adobe.com/xdm/context/profile"
    ],
    "meta:xdmType": "object",
    "meta:registryMetadata": {
        "repo:createdDate": 1586042956286,
        "repo:lastModifiedDate": 1586042956286,
        "xdm:createdClientId": "{CREATED_CLIENT_ID}",
        "xdm:lastModifiedClientId": "{LAST_MODIFIED_CLIENT_ID}",
        "xdm:createdUserId": "{CREATED_USER_ID}",
        "xdm:lastModifiedUserId": "{LAST_MODIFIED_USER_ID}",
        "eTag": "952e8912724d7f43cbc1471e3987bc5b6899519c186126b7c50619f2dddf8650"
    },
    "meta:class": "https://ns.adobe.com/xdm/context/profile",
    "meta:containerId": "tenant",
    "meta:tenantNamespace": "_{TENANT_ID}"
}
```

## Create a target dataset

A target dataset can be created by performing a POST request to the [Catalog Service API](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/catalog.yaml), providing the ID of the target schema within the payload.

#### API format

```http
POST /dataSets
```

#### Request

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/catalog/dataSets?requestDataSource=true' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "name": "Target dataset for payments",
        "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/14d89c5bb88e2ff488f23db896be469e7e30bb166bda8722",
            "contentType": "application/vnd.adobe.xed-full-notext+json; version=1"
        }
    }'
```

| Property | Description |
| -------- | ----------- |
| `schemaRef.id` | The `$id` of the target XDM schema. |

#### Response

A successful response returns an array containing the ID of the newly created dataset in the format `"@/datasets/{DATASET_ID}"`. The dataset ID is a read-only, system-generated string that is used to reference the dataset in API calls. Store the target dataset ID as it is required in later steps to create a target connection and a dataflow.

```json
[
    "@/dataSets/5e8918669cbbee18ad9771f3"
]
```

## Create a dataset base connection

In order to ingest external data into Platform, an Experience Platform dataset base connection must first be acquired.

To create a dataset base connection, follow the steps outlined in the [dataset base connection tutorial](../dataset-base-connection-tutorial.md).

Continue following the steps outlined in the developer guide until you have created a dataset base connection. Obtain and store the unique identifier (`$id`) and proceed to use it as the connection ID in the next step to create a target connection.

## Create a target connection

You now have with you the unique identifiers for a dataset base connection, a target schema, and a target dataset. You can now create a target connection using the Flow Service API to specify the dataset that will contain the inbound source data.

#### API format

```http
POST /targetConnections
```

#### Request

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/flowservice/targetConnections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "baseConnectionId": "72c47da8-c225-40c0-847d-a8c22550c01b",
        "name": "Target Connection for payments",
        "description": "Target Connection for payments",
        "data": {
            "format": "parquet_xdm",
            "schema": {
                "id": "https://ns.adobe.com/{TENANT_ID}/schemas/14d89c5bb88e2ff488f23db896be469e7e30bb166bda8722"
            }
        },
        "params": {
            "dataSetId": "5e8918669cbbee18ad9771f3"
        },
            "connectionSpec": {
            "id": "221c7626-58f6-4eec-8ee2-042b0226f03b",
            "version": "1.0"
        }
    }'
```

| Property | Description |
| -------- | ----------- |
| `baseConnectionId` | The ID of your dataset base connection. |
| `data.schema.id` | The `$id` of the target XDM schema. |
| `params.dataSetId` | The ID of the target dataset. |
| `connectionSpec.id` | The connection specification ID for your payments application. |

#### Response

A successful response returns the new target connection's unique identifier (`id`). This value is required in a later step to create a dataflow.

```json
{
    "id": "c8e12917-ac33-44d7-a129-17ac3364d7b7",
    "etag": "\"0f015874-0000-0200-0000-5e8918e60000\""
}
```

## Create a mapping

In order for the source data to be ingested into a target dataset, it must first be mapped to the target schema the target dataset adheres to. This is achieved by performing a POST request to the [Conversion Service API](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/mapping-service-api.yaml) with data mappings defined within the request payload.

#### API format

```http
POST /mappingSets
```

#### Request

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/conversion/mappingSets' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "version": 0,
        "xdmSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/14d89c5bb88e2ff488f23db896be469e7e30bb166bda8722",
        "xdmVersion": "1.0",
        "id": null,
        "mappings": [
            {
                "destinationXdmPath": "_id",
                "sourceAttribute": "Product_Id",
                "identity": false,
                "identityGroup": null,
                "namespaceCode": null,
                "version": 0
            },
            {
                "destinationXdmPath": "product.name",
                "sourceAttribute": "Product_Name",
                "identity": false,
                "identityGroup": null,
                "namespaceCode": null,
                "version": 0
            },
            {
                "destinationXdmPath": "product.description",
                "sourceAttribute": "Description",
                "identity": false,
                "identityGroup": null,
                "namespaceCode": null,
                "version": 0
            },
            {
                "destinationXdmPath": "product.type",
                "sourceAttribute": "Type",
                "identity": false,
                "identityGroup": null,
                "namespaceCode": null,
                "version": 0
            }
        ]
    }'
```

| Property | Description |
| -------- | ----------- |
| `xdmSchema` | The `$id` of the target XDM schema. |

#### Response

A successful response returns details of the newly created mapping including its unique identifier (`id`). This ID is required in a later step to create a dataflow.

```json
{
    "id": "b54a8dc38e8d4e31a2dc096e413ae8e5",
    "version": 0,
    "createdDate": 1586043319604,
    "modifiedDate": 1586043319604,
    "createdBy": "28AF22BA5DE6B0B40A494036@AdobeID",
    "modifiedBy": "28AF22BA5DE6B0B40A494036@AdobeID"
}
```

## Look up dataflow specifications

A dataflow is responsible for collecting data from sources and bringing them into Platform. In order to create a dataflow, you must first obtain the dataflow specifications by performing a GET request to the Flow Service API. Dataflow specifications are responsible for collecting data from an external database or NoSQL system.

#### API Format

```http
GET /flowSpecs?property=name=="CRMToAEP"
```

#### Request

```shell
curl -X GET \
    'https://platform.adobe.io/data/foundation/flowservice/flowSpecs?property=name=="CRMToAEP"' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```


#### Response

A successful response returns the details of the dataflow specification that is responsible for bringing data from your payments application into Platform. This ID is required in the next step to create a new dataflow.

```json
{
    "items": [
        {
            "id": "14518937-270c-4525-bdec-c2ba7cce3860",
            "name": "CRMToAEP",
            "providerId": "0ed90a81-07f4-4586-8190-b40eccef1c5a",
            "version": "1.0",
            "transformationSpecs": [
                {
                    "name": "Copy",
                    "spec": {
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "type": "object",
                        "properties": {
                            "deltaColumn": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "dateFormat": {
                                        "type": "string"
                                    },
                                    "timezone": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "name"
                                ]
                            }
                        },
                        "required": [
                            "deltaColumn"
                        ]
                    }
                },
                {
                    "name": "Mapping",
                    "spec": {
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "type": "object",
                        "description": "defines various params required for different mapping from source to target",
                        "properties": {
                            "mappingId": {
                                "type": "string"
                            },
                            "mappingVersion": {
                                "type": "string"
                            }
                        }
                    }
                }
            ],
            "scheduleSpec": {
                "name": "PeriodicSchedule",
                "type": "Periodic",
                "spec": {
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "object",
                    "properties": {
                        "startTime": {
                            "description": "epoch time",
                            "type": "integer"
                        },
                        "endTime": {
                            "description": "epoch time",
                            "type": "integer"
                        },
                        "interval": {
                            "type": "integer"
                        },
                        "frequency": {
                            "type": "string",
                            "enum": [
                                "minute",
                                "hour",
                                "day",
                                "week"
                            ]
                        },
                        "backfill": {
                            "type": "boolean",
                            "default": true
                        }
                    },
                    "required": [
                        "startTime",
                        "frequency",
                        "interval"
                    ],
                    "if": {
                        "properties": {
                            "frequency": {
                                "const": "minute"
                            }
                        }
                    },
                    "then": {
                        "properties": {
                            "interval": {
                                "minimum": 15
                            }
                        }
                    },
                    "else": {
                        "properties": {
                            "interval": {
                                "minimum": 1
                            }
                        }
                    }
                }
            }
        }
    ]
}
```

## Create a dataflow

The last step towards collecting data is to create a dataflow. At this point, you should have the following required values prepared:

- [Source connection ID](#create-a-source-connection)
- [Target connection ID](#create-a-target-connection)
- [Mapping ID](#create-a-mapping)
- [Dataflow specification ID](#look-up-dataflow-specifications)

A dataflow is responsible for scheduling and collecting data from a source. You can create a dataflow by performing a POST request while providing the previously mentioned values within the payload.

#### API Format

```http
POST /flows
```

#### Request

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/flowservice/flows' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "name": "Dataflow between payments Platform",
        "description": "Inbound data to Platform",
        "flowSpec": {
            "id": "14518937-270c-4525-bdec-c2ba7cce3860",
            "version": "1.0"
        },
        "sourceConnectionIds": [
            "2c48a152-3d49-43cb-88a1-523d49e3cbcb"
        ],
        "targetConnectionIds": [
            "c8e12917-ac33-44d7-a129-17ac3364d7b7"
        ],
        "transformations": [
            {
                "name": "Copy",
                "params": {
                    "deltaColumn": {
                        "name": "updatedAt",
                        "dateFormat": "YYYY-MM-DD",
                        "timezone": "UTC"
                    }
                }
            },
            {
                "name": "Mapping",
                "params": {
                    "mappingId": "b54a8dc38e8d4e31a2dc096e413ae8e5",
                    "mappingVersion": "0"
                }
            }
        ],
        "scheduleParams": {
            "startTime": "1567411548",
            "frequency":"minute",
            "interval":"30"
        }
    }'
```

#### Response

A successful response returns the ID `id` of the newly created dataflow.

```json
{
    "id": "8256cfb4-17e6-432c-a469-6aedafb16cd5"
}
```

## Next steps

By following this tutorial, you have created a source connector to collect data from a payments application on a scheduled basis. Incoming data can now be used by downstream Platform services such as Real-time Customer Profile and Data Science Workspace. See the following documents for more details:

- [Real-time Customer Profile overview](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/overview.html)
- [Data Science Workspace overview](https://docs.adobe.com/content/help/en/experience-platform/data-science-workspace/home.html)