# Create an Azure Blob or Amazon S3 source connector using the Flow Service API

Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

This tutorial uses the Flow Service API to walk you through to steps to create an Azure Blob (hereinafter referred to as "Blob") or Amazon S3 (hereinafter referred to as "S3") source connector, including showing you how to:

*   [Lookup connection specifications](#lookup-connection-specifications)
*   [Create a base connection](#create-a-base-connection)
*   [Explore your Azure Blob or Amazon S3 storage](#explore-your-blob-stores-or-s3-containers)
*   [Inspect the structure of a file](#inspect-the-structure-of-a-file)
*   [Create an Ad-hoc XDM class](#create-an-ad-hoc-xdm-class)
*   [Create an Ad-hoc XDM schema](#create-an-ad-hoc-xdm-schema)
*   [Create a source connection](#create-a-source-connection)
*   [Create a target XDM schema](#create-a-target-xdm-schema)
*   [Create a target dataset](#create-a-target-dataset)
*   [Create a target connection](#create-a-target-connection)
*   [Create a mapping](#create-a-mapping)
*   [Lookup dataflow specifications](#lookup-dataflow-specifications)
*   [Create a dataflow](#create-a-dataflow)

If you would prefer to use the user interface in Experience Platform, the [Azure Blob or Amazon S3 source connector tutorial](../amazon-s3-ui-tutorial.md) provides step-by-step instructions for performing similar actions.

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

*   [Experience Data Model (XDM) System](../../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Experience Platform organizes customer experience data.
    *   [Basics of schema composition](../../../technical_overview/schema_registry/schema_composition/schema_composition.md): Learn about the basic building blocks of XDM schemas, including key principles and best practices in schema composition.
    *   [Schema Registry developer guide](../../../technical_overview/schema_registry/schema_registry_developer_guide.md): Includes important information that you need to know in order to successfully perform calls to the Schema Registry API. This includes your `{TENANT_ID}`, the concept of "containers", and the required headers for making requests (with special attention to the Accept header and its possible values).
*   [Catalog Service](../../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md): Catalog is the system of record for data location and lineage within Experience Platform.
*   [Batch ingestion](../../../technical_overview/ingest_architectural_overview/ingest_architectural_overview.md): The Batch Ingestion API allows you to ingest data into Experience Platform as batch files.
*   [Sandboxes](../../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully create Azure Blob or Amazon S3 source connectors using the Flow Service API.

### Gather required credentials

In order for the Flow Service to connect with your Blob storage, you must provide a valid **Azure Storage connection string**. You can learn more about connection strings including ways to obtain them through <a href="https://docs.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string" target="_blank">this Microsoft Azure document</a>.

Similarly, a connection to your Amazon S3 storage requires you to provide your **S3 Access Key** and **S3 Secret Key**. For more information, refer to <a href="https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/" target="_blank">this AWS document</a>.

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../../../technical_overview/platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.


### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

*   Authorization: Bearer `{ACCESS_TOKEN}`
*   x-api-key: `{API_KEY}`
*   x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform, including those belonging to the Flow Service, are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

*   x-sandbox-name: `{SANDBOX_NAME}`

All requests that contain a payload (POST, PUT, PATCH) require an additional media type header:

*   Content-Type: `application/json`

## Create an Azure Blob or Amazon S3 source connector

Example API calls shown in the following sections are specific to creating an S3 source connector. However, the same workflow applies to creating a Blob source connector with some minor differences.

### Lookup connection specifications

The first step in creating a source connector is to verify that connection specifications exist for the target source, and if not, then a source connector cannot be made.

Connection specifications are unique to each source. Before you create a source connection, you must first verify that connection specifications exist for the target source. If it does not exist, then a connection to the source cannot be made.

You can lookup connection specifications by performing a GET request. Query parameters can be used to obtain information specifically for Blob or S3.

#### API Format

```http
GET /connectionSpecs
GET /connectionSpecs?property=name=="amazon-s3"
GET /connectionSpecs?property=name=="azure-blob"
```

#### Request

The following request retrieves the connection specifications for Amazon S3.

```shell
curl -X GET \
    'https://platform.adobe.io/data/foundation/flowservice/connectionSpecs?property=name==%22amazon-s3%22' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the connection specifications for Amazon S3, including its unique identifier (`id`). Store this ID as it is required in the next step for creating a base connection.

```json
{
    "items": [
        {
            "id": "ecadc60c-7455-4d87-84dc-2a0e293d997b",
            "name": "amazon-s3",
            "providerId": "0ed90a81-07f4-4586-8190-b40eccef1c5a",
            "version": "1.0",
            "authSpec": [
                {
                    "name": "Access Key",
                    "type": "Access Key Auth",
                    "spec": {
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "type": "object",
                        "description": "defines auth params required for connecting to amazon-s3",
                        "properties": {
                            "s3AccessKey": {
                                "type": "string",
                                "description": "access key id"
                            },
                            "s3SecretKey": {
                                "type": "string",
                                "description": "Secret access key for the user account",
                                "format": "password"
                            }
                        },
                        "required": [
                            "accessKeyId",
                            "secretAccessKey"
                        ]
                    }
                }
            ]
        }
    ]
}
```

### Create a base connection

A base connection specifies a source and contains your credentials for that source. Only one base connection is required per Blob or S3 account as it can be used to create multiple source connectors to bring in different data.

#### API Format

```http
POST /connections
```

#### Request

```shell
curl -X POST \
    'http://platform.adobe.io/data/foundation/flowservice/connections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "name": "S3 Base Connection",
        "description": "Base connection for an Amazon S3 account",
        "auth": {
            "specName": "Access Key",
            "params": {
                "s3AccessKey": "{S3_ACCESS_KEY}",
                "s3SecretKey": "{S3_SECRET_KEY}"
            }
        },
        "connectionSpec": {
            "id": "{SPEC_ID}",
            "version": "1.0"
        }
    }'
```

*   `{S3_ACCESS_KEY}`: Your Amazon S3 access key.
*   `{S3_SECRET_KEY}`: Your Amazon S3 secret key.
*   `connectionSpec > id`: The ID of the connection specifications for Amazon S3 or Azure Blob.

#### Response

A successful response returns details of the newly created base connection, including its unique identifier (`id`). Store this ID as it is required in the next step to explore your cloud storage.

```json
{
    "id": "4cb0c374-d3bb-4557-b139-5712880adc55"
}
```

### Explore your Blob stores or S3 containers

Now that a base connection has been established, your Blob stores or S3 containers can now be explored by performing GET requests. Use the following call to find the path of the file you wish to bring into Platform.

When performing GET requests to explore your cloud storage, you must include the query parameters that are listed in the table below:

| Parameter | Description |
| --------- | ----------- |
| `objectType` | The type of object that you wish to explore. Set this value as either: <ul><li>`folder`: Explore a specific directory</li><li>`root`: Explore the root directory.</li></ul> |
| `object` | This parameter is required only when viewing a specific directory. Its value represents the path of the directory you wish to explore. |


#### API Format

```http
GET /connections/{BASE_CONNECTION_ID}/explore?objectType=root
GET /connections/{BASE_CONNECTION_ID}/explore?objectType=folder&object={PATH}
```

*   `{BASE_CONNECTION_ID}`: The ID of an Azure Blob or Amazon S3 base connection.
*   `{PATH}`: The path of a directory.

#### Request

```shell
curl -X GET \
    'http://platform.adobe.io/data/foundation/flowservice/connections/{BASE_CONNECTION_ID}/explore?objectType=folder&object=/some/path/' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns an array of files and folders found within the queried directory. Take note of the `path` property of the file you wish you upload, as you are required to provide it in the next step to inspect its structure.

```json
[
    {
        "type": "File",
        "name": "data.csv",
        "path": "/some/path/data.csv"
    },
    {
        "type": "Folder",
        "name": "foobar",
        "path": "/some/path/foobar"
    }
]
```

### Inspect the structure of a file

To inspect the structure of data file within your cloud storage, perform a GET request while providing the file's path as a query parameter.

#### API Format

```http
GET /connections/{BASE_CONNECTION_ID}/explore?objectType=file&object={FILE_PATH}&fileType={FILE_TYPE}
```

*   `{BASE_CONNECTION_ID}`: The ID of an Azure Blob or Amazon S3 base connection.
*   `{FILE_PATH}`: Path to a file.
*   `{FILE_TYPE}`: The type of the file. Supported file types include:
    *   `DELIMITED`: Delimiter-separated value. DSV files must be comma-separated.
    *   `JSON`: JavaScript Object Notation. JSON files must be XDM compliant.
    *   `PARQUET`: Apache Parquet. Parquet files must be XDM compliant.

#### Request

```shell
curl -X GET \
    'http://platform.adobe.io/data/foundation/flowservice/connections/{BASE_CONNECTION_ID}/explore?objectType=file&object=/some/path/data.csv&fileType=DELIMITED' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the structure of the queried file including table names and data types.

```json
[
    {
        "name": "Id",
        "type": "String"
    },
    {
        "name": "FirstName",
        "type": "String"
    },
    {
        "name": "LastName",
        "type": "String"
    },
    {
        "name": "Email",
        "type": "String"
    },
    {
        "name": "Phone",
        "type": "String"
    }
]
```

### Create an Ad-hoc XDM class

In order to bring external data into Platform through source connectors, an Ad-hoc XDM class and schema must be created for the raw source data. The Ad-hoc class must describe all fields existing within the source data. You can create an XDM class by performing a POST request to the Schema Registry.

#### API Format

```http
POST /schemaregistry/tenant/classes
```

#### Request

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/schemaregistry/tenant/classes' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "title": "adhoc-class",
        "description": "adhoc-class-for-data-csv",
        "type": "object",
        "allOf": [
            {
                "$ref": "https://ns.adobe.com/xdm/data/adhoc"
            },
            {
                "properties": {
                    "_adhoc": {
                        "properties": {
                            "Id": {
                                "type": "string"
                            },
                            "FirstName": {
                                "type": "string"
                            },
                            "LastName": {
                                "type": "string"
                            },
                            "Email": {
                                "type": "string"
                            },
                            "Phone": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        ]
    }'
```

#### Response

A successful response returns details of the new XDM class including its unique identifier (`$id`). This ID is required in the next step for creating an ad-hoc XDM schema.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/classes/f787bf8af0a3997295c626ea10055722",
    "meta:altId": "{TENANT_ID}.classes.f787bf8af0a3997295c626ea10055722",
    "meta:resourceType": "classes",
    "version": "1.0",
    "title": "adhoc-class",
    "description": "adhoc-class-for-data-csv",
    "type": "object",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/xdm/data/adhoc"
        },
        {
            "properties": {
                "_f787bf8af0a3997295c626ea10055722": {
                    "properties": {
                        "Id": {
                            "type": "string",
                            "meta:xdmType": "string"
                        },
                        "FirstName": {
                            "type": "string",
                            "meta:xdmType": "string"
                        },
                        "LastName": {
                            "type": "string",
                            "meta:xdmType": "string"
                        },
                        "Email": {
                            "type": "string",
                            "meta:xdmType": "string"
                        },
                        "Phone": {
                            "type": "string",
                            "meta:xdmType": "string"
                        }
                    },
                    "type": "object",
                    "meta:xdmType": "object"
                }
            },
            "type": "object",
            "meta:xdmType": "object"
        }
    ],
    "meta:xdmType": "object",
    "meta:abstract": true,
    "meta:extensible": true,
    "meta:extends": [
        "https://ns.adobe.com/xdm/data/adhoc"
    ],
    "meta:containerId": "tenant",
    "meta:datasetNamespace": "_f787bf8af0a3997295c626ea10055722",
    "meta:registryMetadata": {
        "eTag": "6m/FrIlXYU2+yH6idbcmQhKSlMo="
    }
}
```

### Create an Ad-hoc XDM schema

Using the newly created ad-hoc XDM class, you can now create an ad-hoc XDM schema by performing a POST request to the Schema Registry.

#### API Format

```http
POST /schemaregistry/tenant/schemas
```

#### Request

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "title": "adhoc-schema",
        "description": "adhoc-schema-for-data-csv",
        "type": "object",
        "allOf": [
            {
                "$ref": "https://ns.adobe.com/{TENANT_ID}/classes/f787bf8af0a3997295c626ea10055722"
            }
        ]
    }'
```

*   `allOf > $ref`: The unique identifier of the ad-hoc XDM class.

#### Response

A successful response contains details of the newly created ad-hoc XDM schema, including its unique identifier (`$id`). The schema ID is required in the next step for creating a source connection.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/140c03de81b959db95879033945cfd4c",
    "meta:altId": "{TENANT_ID}.schemas.140c03de81b959db95879033945cfd4c",
    "meta:resourceType": "schemas",
    "version": "1.0",
    "title": "adhoc-schema",
    "description": "adhoc-schema-for-data-csv",
    "type": "object",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/{TENANT_ID}/classes/f787bf8af0a3997295c626ea10055722"
        }
    ],
    "meta:xdmType": "object",
    "meta:datasetNamespace": "_f787bf8af0a3997295c626ea10055722",
    "meta:class": "https://ns.adobe.com/{TENANT_ID}/classes/f787bf8af0a3997295c626ea10055722",
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:extends": [
        "https://ns.adobe.com/{TENANT_ID}/classes/f787bf8af0a3997295c626ea10055722",
        "https://ns.adobe.com/xdm/data/adhoc"
    ],
    "meta:containerId": "tenant",
    "meta:registryMetadata": {
        "eTag": "6m/FrIlXYU2+yH6idbcmQhKSlMo="
    }
}
```

### Create a source connection

With an ad-hoc XDM schema created, a source connection can now be created using a POST request to the Flow Service API. A source connection consists of a base connection, a source data file, and a reference to the schema that describes the source data.

#### API Format

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
        "name": "Source Connection for S3",
        "baseConnectionId": "4cb0c374-d3bb-4557-b139-5712880adc55",
        "description": "Source Connection for S3 to ingest data.csv",
        "data": {
            "format": "parquet_xdm",
            "schema": {
                "id": "https://ns.adobe.com/{TENANT_ID}/schemas/140c03de81b959db95879033945cfd4c",
                "version": "application/vnd.adobe.xed-full-notext+json; version=1"
            }
        },
        "params": {
            "path": "/some/path/data.csv",
            "recursive": "true"
        }
    }'
```

*   `baseConnectionId`: The ID of your Blob or S3 base connection.
*   `data > schema > id`: The ID of the ad-hoc XDM schema.
*   `params > path`: The path of the source file.

#### Response

A successful response returns the unique identifier (`id`) of the newly created source connection. Store this value as it is required in later steps for creating a target connection.

```json
{
    "id": "9a603322-19d2-4de9-89c6-c98bd54eb184"
}
```

### Create a target XDM schema

In earlier steps, an ad-hoc XDM schema was created to structure the source data. In order for the source data to be used in Platform, a target schema must also be created to structure the source data according to your needs. The target schema is then used to create a Platform dataset in which the source data is contained. In this tutorial, the target XDM schema extends the XDM Individual Profile class. 

If you would prefer to use the user interface in Experience Platform, the [Schema Editor tutorial](../../schema_editor_tutorial/schema_editor_tutorial.md) provides step-by-step instructions for performing similar actions in the Schema Editor.

#### API Format

```http
POST /schemaregistry/tenant/schemas
```

#### Request

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
        "title": "Target schema for S3 source connector",
        "description": "",
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
        "meta:containerId": "tenant",
        "meta:resourceType": "schemas",
        "meta:xdmType": "object",
        "meta:class": "https://ns.adobe.com/xdm/context/profile"
    }'
```

#### Response

A successful response returns details of the newly created schema including its unique identifier (`$id`). Store this ID as it is required in later steps to create a target dataset, mapping, and dataflow.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/417a33eg81a221bd10495920574gfa2d",
    "meta:altId": "{TENANT_ID}.schemas.417a33eg81a221bd10495920574gfa2d",
    "meta:resourceType": "schemas",
    "version": "1.0",
    "title": "Target schema for S3 source connector",
    "description": "",
    "type": "object",
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
    "meta:xdmType": "object",
    "meta:class": "https://ns.adobe.com/xdm/context/profile",
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:extends": [
        "https://ns.adobe.com/xdm/context/profile",
        "https://ns.adobe.com/xdm/context/profile-person-details",
        "https://ns.adobe.com/xdm/context/profile-personal-details"
    ],
    "meta:containerId": "tenant",
    "meta:registryMetadata": {
        "eTag": "6m/FrIlXYU2+yH6idbcmQhKSlMo="
    }
}
```

### Create a target dataset

A target dataset can be created by performing a POST request to the Catalog Service API, providing the ID of the target schema within the payload.

#### API Format

```http
POST /catalog/dataSets
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
        "name": "Target Dataset",
        "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/417a33eg81a221bd10495920574gfa2d",
            "contentType": "application/vnd.adobe.xed-full-notext+json; version=1"
        }
    }'
```

*   `schemaRef > id`: The ID of the target XDM schema.

#### Response

A successful response an array containing the ID of the newly created dataset in the format `"@/datasets/{DATASET_ID}"`. The dataset ID is a read-only, system-generated string that is used to reference the dataset in API calls. Store the target dataset ID as it is required in later steps to create a target connection and a dataflow.

```json
[
    "@/dataSets/5c8c3c555033b814b69f947f"
]
```

### Create a target connection

You now have with you the the unique identifiers for a base connection, a target schema, and a target dataset. You can now create a target connection to specify the dataset that will contain the inbound source data.

#### API Format

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
        "baseConnectionId": "4cb0c374-d3bb-4557-b139-5712880adc55",
        "name": "Target Connection",
        "description": "Target Connection for Amazon S3 data",
        "data": {
            "format": "parquet_xdm",
            "schema": {
                "id": "https://ns.adobe.com/{TENANT_ID}/schemas/417a33eg81a221bd10495920574gfa2d",
                "version": "application/vnd.adobe.xed-full+json;version=1.0"
            }
        },
        "params": {
            "dataSetId": "5c8c3c555033b814b69f947f"
        }
    }'
```

*   `baseConnectionId`: The ID of an Azure Blob or Amazon S3 base connection.
*   `data > schema > id`: The ID of the target XDM schema.
*   `params > dataSetId`: The ID of the target dataset.

#### Response

A successful response returns the new target connection's unique identifier (`id`). Store this value as it is required in later steps.

```json
{
    "id": "4ee890c7-519c-4291-bd20-d64186b62da8"
}
```

### Create a mapping

In order for the source data to be ingested into a target dataset, it must first be mapped to the target schema the target dataset adheres to. This is achieved by performing a POST request to Conversion Service with data mappings defined within the request payload.

#### API Format

```http
POST /conversion/mappingSets
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
        "xdmSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/417a33eg81a221bd10495920574gfa2d",
        "xdmVersion": "1.0",
        "id": null,
        "mappings": [
            {
                "destinationXdmPath": "person.name.firstName",
                "sourceAttribute": "FirstName",
                "identity": false,
                "identityGroup": null,
                "namespaceCode": null,
                "version": 0
            },
            {
                "destinationXdmPath": "person.name.lastName",
                "sourceAttribute": "LastName",
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
                "sourceAttribute": "Email",
                "identity": false,
                "identityGroup": null,
                "namespaceCode": null,
                "version": 0
            },
            {
                "destinationXdmPath": "_id",
                "sourceAttribute": "Id",
                "identity": false,
                "identityGroup": null,
                "namespaceCode": null,
                "version": 0
            }
        ]
    }'
```

*   `xdmSchema`: The ID of the target XDM schema.

#### Response

A successful response returns details of the newly created mapping including its unique identifier (`id`). Store this value as it is required in later step for creating a dataflow.

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
        "id": "https://ns.adobe.com/{TENANT_ID}/schemas/417a33eg81a221bd10495920574gfa2d",
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
        "id": "https://ns.adobe.com/adobe_mcdp_connectors_stg/schemas/2574494fdb01fa14c25b52d717ccb828",
        "contentType": "1.0"
    },
    "xdmSchema": "https://ns.adobe.com/adobe_mcdp_connectors_stg/schemas/2574494fdb01fa14c25b52d717ccb828"
}
```

### Lookup dataflow specifications

A dataflow is responsible for collecting data from sources, and bringing them into Platform. In order to create a dataflow, you must first obtain the dataflow specifications that are responsible for collecting cloud storage data.

#### API Format

```http
GET /flowSpecs?property=name=="CloudStorageToAEP"
```

#### Request

```shell
curl -X GET \
    'https://platform.adobe.io/data/foundation/flowservice/flowSpecs?property=name==%22CloudStorageToAEP%22' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the details of the dataflow specification that is responsible for bringing data from your Azure Blob or Amazon S3 storage into Platform. Store the value of the `id` field as it is required in the next step to create a new dataflow.

```json
{
    "items": [
        {
            "id": "9753525b-82c7-4dce-8a9b-5ccfce2b9876",
            "name": "CloudStorageToAEP",
            "providerId": "0ed90a81-07f4-4586-8190-b40eccef1c5a",
            "version": "1.0",
            "transformationSpecs": [
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

### Create a dataflow

The last step in creating an Azure Blob or Amazon S3 source connector is to create a dataflow. By now, you have the following required values prepared:

*   [Source connection ID](#create-a-source-connection)
*   [Target connection ID](#create-a-target-connection)
*   [Mapping ID](#create-a-mapping)
*   [Dataflow specification ID](#lookup-dataflow-specifications)

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
        "name": "Dataflow between S3 and Platform",
        "description": "collecting data.csv",
        "flowSpec": {
            "id": "9753525b-82c7-4dce-8a9b-5ccfce2b9876",
            "version": "1.0"
        },
        "sourceConnectionIds": [
            "9a603322-19d2-4de9-89c6-c98bd54eb184"
        ],
        "targetConnectionIds": [
            "4ee890c7-519c-4291-bd20-d64186b62da8"
        ],
        "transformations": [
            {
                "name": "Copy",
                "params": {
                    "mode": "append"
                }
            },
            {
                "name": "Mapping",
                "params": {
                    "mappingId": "ab91c736-1f3d-4b09-8424-311d3d3e3cea"
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

*   `flowSpec > id`: Dataflow specification ID
*   `sourceConnectionIds`: Source connection ID
*   `targetConnectionIds`: Target connection ID
*   `transformations > params > mappingId`: Mapping ID

#### Response

A successful response returns the ID (`id`) of the newly created dataflow.

```json
{
    "id": "8256cfb4-17e6-432c-a469-6aedafb16cd5"
}
```

## Next steps

By following this tutorial, you have created a source connector to collect data from your Azure Blob or Amazon S3 storage on a scheduled basis. Incoming data can now be used by downstream Platform services such as Real-time Customer Profile and Data Science Workspace. See the following documents for more details:

*   [Real-time Customer Profile overview](../../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md)
*   [Data Science Workspace overview](../../../technical_overview/data_science_workspace_overview/dsw_overview.md)