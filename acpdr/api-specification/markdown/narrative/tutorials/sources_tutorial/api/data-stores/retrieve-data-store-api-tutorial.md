# Collect data from external data stores using the Flow Service API

This tutorial covers the steps for retrieving data from a data store repository and ingesting it into Platform through source connectors and APIs. The steps involved include:

*   [Create an ad-hoc XDM class and schema](#create-an-ad-hoc-xdm-class-and-schema)
*   [Create a source connection](#create-a-source-connection)
*   [Create a target XDM schema](#create-a-target-xdm-schema)
*   [Create a target dataset](#create-a-target-dataset)
*   [Create a target connection](#create-a-target-connection)
*   [Create a mapping](#create-a-mapping)
*   [Look up dataflow specifications](#look-up-dataflow-specifications)
*   [Create a dataflow](#create-a-dataflow)

## Getting started

This tutorial requires you to have access to a third-party data store through a valid base connection and information about the file you wish to bring into Platform, including the file's path and structure. If you do not have this information, see the tutorial on [exploring a data store repository using the Flow Service API](./explore-data-store-api-tutorial.md) before attempting this tutorial.

This tutorial also requires you to have a working understanding of the following components of Adobe Experience Platform:

*   [Experience Data Model (XDM) System](../../../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Experience Platform organizes customer experience data.
    *   [Basics of schema composition](../../../../technical_overview/schema_registry/schema_composition/schema_composition.md): Learn about the basic building blocks of XDM schemas, including key principles and best practices in schema composition.
    *   [Schema Registry developer guide](../../../../technical_overview/schema_registry/schema_registry_developer_guide.md): Includes important information that you need to know in order to successfully perform calls to the Schema Registry API. This includes your `{TENANT_ID}`, the concept of "containers", and the required headers for making requests (with special attention to the Accept header and its possible values).
*   [Catalog Service](../../../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md): Catalog is the system of record for data location and lineage within Experience Platform.
*   [Data Ingestion](../../../technical_overview/ingest_architectural_overview/data-ingestion-overview.md): Adobe Experience Platform Data Ingestion represents the multiple methods by which Platform ingests data, as well as how data is persisted within the Data Lake for use by downstream Platform services.
*   [Sandboxes](../../../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully connect to a data store using the Flow Service API.

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../../../../technical_overview/platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

*   Authorization: Bearer `{ACCESS_TOKEN}`
*   x-api-key: `{API_KEY}`
*   x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform, including those belonging to the Flow Service, are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

*   x-sandbox-name: `{SANDBOX_NAME}`

All requests that contain a payload (POST, PUT, PATCH) require an additional media type header:

*   Content-Type: `application/json`

## Create an ad-hoc XDM class and schema

In order to bring external data into Platform through source connectors, an ad-hoc XDM class and schema must be created for the raw source data.

To create an ad-hoc class and schema, follow the steps outlined in the [ad-hoc schema tutorial](../../../schema_registry_api_tutorial/adhoc-schema-tutorial.md). When creating an ad-hoc class, all fields found in the source data must be described within the request body.

Continue following the steps outlined in the developer guide until you have created an ad-hoc schema. Obtain and store the unique identifier (`$id`) of the ad-hoc schema and then proceed to the next step of this tutorial.

## Create a source connection

With an ad-hoc XDM schema created, a source connection can now be created using a POST request to the Flow Service API. A source connection consists of a base connection, a source data file, and a reference to the schema that describes the source data.

#### API format

```http
POST /sourceConnections
```

#### Request

```shell
curl -X POST \
    'http://platform.adobe.io/data/foundation/flowservice/sourceConnections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "name": "Source Connection for data store",
        "baseConnectionId": "cad954c6-afc0-4604-9954-c6afc0f604a6",
        "description": "Source Connection for data store to ingest test_table",
        "data": {
            "format": "parquet_xdm",
            "schema": {
                "id": "https://ns.adobe.com/{TENANT_ID}/schemas/83fcac3846f0eb87e5ec19cf97a6a18f",
                "version": "application/vnd.adobe.xed-full-notext+json; version=1"
            }
        },
        "params": {
            "path": "test_table"
        },
        "connectionSpec": {
            "id": "26d738e0-8963-47ea-aadf-c60de735468a",
            "version": "1.0"
        }
}
```

| Property | Description |
| -------- | ----------- |
| `baseConnectionId`| The ID of a base connection for a a data store repository.
| `data.schema.id`| The `$id` of the ad-hoc XDM schema.
| `params.path`| The path of the source file.
| `connectionSpec.id`| The connection specification ID for a data store repository.

#### Response

A successful response returns the unique identifier (`id`) of the newly created source connection. This ID is required in later steps to create a target connection.

```json
{
    "id": "1ca6736d-2f65-4770-a673-6d2f65c770a3"
}
```

## Create a target XDM schema

In earlier steps, an ad-hoc XDM schema was created to structure the source data. In order for the source data to be used in Platform, a target schema must also be created to structure the source data according to your needs. The target schema is then used to create a Platform dataset in which the source data is contained. This target XDM schema also extends the XDM Individual Profile class.

A target XDM schema can be created by performing a POST request to the [Schema Registry API](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/schema-registry.yaml).

> If you would prefer to use the user interface in Experience Platform, the [Schema Editor tutorial](../../../schema_editor_tutorial/schema_editor_tutorial.md) provides step-by-step instructions for performing similar actions in the Schema Editor.

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
        "title": "Target schema for data store source connector",
        "description": "Target schema for data store source connector",
        "allOf": [
            {
                "$ref": "https://ns.adobe.com/xdm/context/profile"
            },
            {
                "$ref": "https://ns.adobe.com/xdm/context/profile-person-details"
            },
            {
                "$ref": "https://ns.adobe.com/xdm/context/profile-personal-details"
            }
        ],
    }'
```

#### Response

A successful response returns details of the newly created schema including its unique identifier (`$id`). This ID is required in later steps to create a target dataset, mapping, and dataflow.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/efea012ad5deefcdf51afd23ceb3583f",
    "meta:altId": "_{TENANT_ID}.schemas.efea012ad5deefcdf51afd23ceb3583f",
    "meta:resourceType": "schemas",
    "version": "1.0",
    "type": "object",
    "title": "Target schema for data store source connector",
    "description": "Target schema for data store source connector",
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
        }
    ],
    "meta:containerId": "tenant",
    "meta:xdmType": "object",
    "meta:class": "https://ns.adobe.com/xdm/context/profile",
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:extends": [
        "https://ns.adobe.com/xdm/context/profile",
        "https://ns.adobe.com/xdm/common/auditable",
        "https://ns.adobe.com/xdm/data/record",
        "https://ns.adobe.com/xdm/context/profile-person-details",
        "https://ns.adobe.com/xdm/context/profile-personal-details"
    ],
    "meta:tenantNamespace": "_{TENANT_ID}",
    "imsOrg": "{IMS_ORG}",
    "meta:registryMetadata": {
        "xdm:createdClientId": "{CREATED_CLIENT_ID}",
        "xdm:createdUserId": "{CREATED_USER_ID}",
        "xdm:lastModifiedClientId": "{LAST_MODIFIED_CLIENT_ID}",
        "xdm:lastModifiedUserId": "{LAST_MODIFIED_USER_ID}",
        "eTag": "/HJ4Np4iPnjjlfobyamH7o3xj/k=",
        "palm:sandboxName": "prod"
    }
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
        "name": "Target Dataset for data store",
        "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/efea012ad5deefcdf51afd23ceb3583f",
            "contentType": "application/vnd.adobe.xed-full-notext+json; version=1"
        }
    }'
```

| Property | Description |
| -------- | ----------- |
| `schemaRef.id` | The (`$id`) of the target XDM schema. |

#### Response

A successful response returns an array containing the ID of the newly created dataset in the format `"@/datasets/{DATASET_ID}"`. The dataset ID is a read-only, system-generated string that is used to reference the dataset in API calls. Store the target dataset ID as it is required in later steps to create a target connection and a dataflow.

```json
[
    "@/dataSets/5e2f4f302b0c0618ad482b53"
]
```

## Create a target connection

You now have with you the unique identifiers for a base connection, a target schema, and a target dataset. You can now create a target connection using the Flow Service API to specify the dataset that will contain the inbound source data.

#### API format

```http
POST /targetConnections
```

#### Request

```shell
curl -X POST \
    'http://platform.adobe.io/data/foundation/flowservice/targetConnections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "baseConnectionId": "cad954c6-afc0-4604-9954-c6afc0f604a6",
        "name": "Target Connection for data store data",
        "description": "Target Connection for data store data",
        "data": {
            "format": "parquet_xdm",
            "schema": {
                "id": "https://ns.adobe.com/{TENANT_ID}/schemas/efea012ad5deefcdf51afd23ceb3583f",
                "version": "application/vnd.adobe.xed-full+json;version=1.0"
            }
        },
        "params": {
            "dataSetId": "5e2f4f302b0c0618ad482b53"
        }
    }'
```

| Property | Description |
| -------- | ----------- |
| `baseConnectionId`| The ID of a base connection for a data store.
| `data.schema.id`| The `$id` of the target XDM schema.
| `params.dataSetId`| The ID of the target dataset.

#### Response

A successful response returns the new target connection's unique identifier (`id`). Store this value as it is required in later steps.

```json
{
    "id": "b86801ce-3b8a-42d3-a801-ce3b8a22d351"
}
```

## Create a mapping

In order for the source data to be ingested into a target dataset, it must first be mapped to the target schema the target dataset adheres to. This is achieved by performing a POST request to the Conversion Service API with data mappings defined within the request payload.

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
        "xdmSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/efea012ad5deefcdf51afd23ceb3583f",
        "xdmVersion": "1.0",
        "id": null,
        "mappings": [
            {
                "destinationXdmPath": "person.name",
                "sourceAttribute": "Name",
                "identity": false,
                "identityGroup": null,
                "namespaceCode": null,
                "version": 0
            },
            {
                "destinationXdmPath": "mobilePhone.number",
                "sourceAttribute": "Phone",
                "identity": false,
                "identityGroup": null,
                "namespaceCode": null,
                "version": 0
            },
            {
                "destinationXdmPath": "personalEmail.address",
                "sourceAttribute": "email",
                "identity": false,
                "identityGroup": null,
                "namespaceCode": null,
                "version": 0
            },
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
    "id": "ab91c736-1f3d-4b09-8424-311d3d3e3cea",
    "version": 1,
    "createdDate": 1568047685000,
    "modifiedDate": 1568047703000,
    "inputSchemaRef": {
        "id": null,
        "contentType": null
    },
    "outputSchemaRef": {
        "id": "https://ns.adobe.com/{TENANT_ID}/schemas/efea012ad5deefcdf51afd23ceb3583f",
        "contentType": "1.0"
    },
    "mappings": [
        {
            "id": "7bbea5c0f0ef498aa20aa2e2e5c22290",
            "version": 0,
            "createdDate": 1568047685000,
            "modifiedDate": 1568047685000,
            "sourceType": "text/x.schema-path",
            "source": "Id",
            "destination": "_id",
            "identity": false,
            "primaryIdentity": false,
            "matchScore": 0.0,
            "sourceAttribute": "Id",
            "destinationXdmPath": "_id"
        },
        {
            "id": "def7fd7db2244f618d072e8315f59c05",
            "version": 0,
            "createdDate": 1568047685000,
            "modifiedDate": 1568047685000,
            "sourceType": "text/x.schema-path",
            "source": "FirstName",
            "destination": "person.name.firstName",
            "identity": false,
            "primaryIdentity": false,
            "matchScore": 0.0,
            "sourceAttribute": "FirstName",
            "destinationXdmPath": "person.name.firstName"
        },
        {
            "id": "e974986b28c74ed8837570f421d0b2f4",
            "version": 0,
            "createdDate": 1568047685000,
            "modifiedDate": 1568047685000,
            "sourceType": "text/x.schema-path",
            "source": "LastName",
            "destination": "person.name.lastName",
            "identity": false,
            "primaryIdentity": false,
            "matchScore": 0.0,
            "sourceAttribute": "LastName",
            "destinationXdmPath": "person.name.lastName"
        }
    ],
    "status": "PUBLISHED",
    "xdmVersion": "1.0",
    "schemaRef": {
        "id": "https://ns.adobe.com/{TENANT_ID}/schemas/2574494fdb01fa14c25b52d717ccb828",
        "contentType": "1.0"
    },
    "xdmSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/2574494fdb01fa14c25b52d717ccb828"
}
```

## Look up dataflow specifications

A dataflow is responsible for collecting data from sources and bringing them into Platform. In order to create a dataflow, you must first obtain the dataflow specifications by performing a GET request to the Flow Service API. Dataflow specifications are responsible for collecting data from an external data store.

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

A successful response returns the details of the dataflow specification that is responsible for bringing data from your data store repository into Platform. This ID is required in the next step to create a new dataflow.

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

*   [Source connection ID](#create-a-source-connection)
*   [Target connection ID](#create-a-target-connection)
*   [Mapping ID](#create-a-mapping)
*   [Dataflow specification ID](#look-up-dataflow-specifications)

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
        "name": "Dataflow between MySQL and Platform",
        "description": "Inbound data to Platform",
        "flowSpec": {
            "id": "14518937-270c-4525-bdec-c2ba7cce3860",
            "version": "1.0"
        },
        "sourceConnectionIds": [
            "1ca6736d-2f65-4770-a673-6d2f65c770a3"
        ],
        "targetConnectionIds": [
            "b86801ce-3b8a-42d3-a801-ce3b8a22d351"
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
                    "mappingId": "ab91c736-1f3d-4b09-8424-311d3d3e3cea",
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

| Property | Description |
| -------- | ----------- |
| `flowSpec.id`| The dataflow specification ID associated with your data store.
| `sourceConnectionIds`| The source connection ID associated with your data store.
| `targetConnectionIds`| The target connection ID associated with your data store.
| `transformations.params.mappingId`| The mapping ID associated with your data store.

#### Response

A successful response returns the ID (`id`) of the newly created dataflow.

```json
{
    "id": "8256cfb4-17e6-432c-a469-6aedafb16cd5"
}
```

## Next steps

By following this tutorial, you have created a source connector to collect data from a data store repository on a scheduled basis. Incoming data can now be used by downstream Platform services such as Real-time Customer Profile and Data Science Workspace. See the following documents for more details:

*   [Real-time Customer Profile overview](../../../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md)
*   [Data Science Workspace overview](../../../../technical_overview/data_science_workspace_overview/dsw_overview.md)