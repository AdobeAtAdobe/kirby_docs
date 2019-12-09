# Collect CRM data from Microsoft Dynamics 365 or Salesforce using the Flow Service API

Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

This tutorial uses the Flow Service API to walk you through the steps to create a Microsoft Dynamics 365 (hereinafter referred to as "Dynamics") or Salesforce source connector for collecting CRM data, including showing you how to:

*   [Lookup connection specifications](#lookup-connection-specifications)
*   [Create a base connection](#create-a-base-connection)
*   [Explore your data tables](#explore-your-data-tables)
*   [Inspect a table](#inspect-a-table)
*   [Create an ad hoc class](#create-an-ad-hoc-class)
*   [Create an ad hoc schema](#create-an-ad-hoc-schema)
*   [Create a source connection](#create-a-source-connection)
*   [Create a target schema](#create-a-target-schema)
*   [Create a target dataset](#create-a-target-dataset)
*   [Create a target connection](#create-a-target-connection)
*   [Create a mapping](#create-a-mapping)
*   [Lookup dataflow specifications](#lookup-dataflow-specifications)
*   [Create a dataflow](#create-a-dataflow)

If you would prefer to use the user interface in Experience Platform, the [Dynamics or Salesforce source connector UI tutorial](../dynamics-salesforce-ui-tutorial.md) provides step-by-step instructions for performing similar actions.

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

*   [Experience Data Model (XDM) System](../../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Experience Platform organizes customer experience data.
    *   [Basics of schema composition](../../../technical_overview/schema_registry/schema_composition/schema_composition.md): Learn about the basic building blocks of XDM schemas, including key principles and best practices in schema composition.
    *   [Schema Registry developer guide](../../../technical_overview/schema_registry/schema_registry_developer_guide.md): Includes important information that you need to know in order to successfully perform calls to the Schema Registry API. This includes your `{TENANT_ID}`, the concept of "containers", and the required headers for making requests (with special attention to the Accept header and its possible values).
*   [Catalog Service](../../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md): Catalog is the system of record for data location and lineage within Experience Platform.
*   [Batch ingestion](../../../technical_overview/ingest_architectural_overview/ingest_architectural_overview.md): The Batch Ingestion API allows you to ingest data into Experience Platform as batch files.
*   [Sandboxes](../../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to create a collect CRM data from Dynamics or Salesforce using the Flow Service API.

### Gather required credentials

In order to access your Dynamics account within Platform, you must provide your **Service URI**, **username**, and **password**.

Similarly, accessing your Salesforce account within Platform requires you to provide your **environment URL**, **username**, **password**, and **security token**.

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

## Create a Dynamics or Salesforce source connector 

Example API calls shown in the following sections are specific to creating a Salesforce source connector. However, the same workflow applies to creating a Dynamics source connector with some minor differences.

### Lookup connection specifications

Before creating a source connector, you must verify that the target source's connection specifications exist. If not, the source connector cannot be created.

Each available source has its own unique set of connection specifications for describing connector properties such as authentication requirements. You can lookup connection specifications for Dynamics or Salesforce by performing a GET request and using query parameters.

#### API Format

Sending a GET request without query parameters will return connection specifications for all available sources. You can include the query `property=name=="{SOURCE_NAME}"` to refine the response where `{SOURCE_NAME}` refers to a specific source. Use `dynamics-online` for Dynamics connection specifications, or `salesforce` for Salesforce.

```http
GET /connectionSpecs
GET /connectionSpecs?property=name=="dynamics-online"
GET /connectionSpecs?property=name=="salesforce"
```

#### Request

The following request retrieves the connection specifications for Salesforce.

```shell
curl -X GET \
    'https://platform.adobe.io/data/foundation/flowservice/connectionSpecs?property=name==%22salesforce%22' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the connection specifications for Salesforce, including its unique identifier (`id`). Store this ID as it is required in the next step to create a base connection.

```json
{
    "items": [
        {
            "id": "cfc0fee1-7dc0-40ef-b73e-d8b134c436f5",
            "name": "salesforce",
            "providerId": "0ed90a81-07f4-4586-8190-b40eccef1c5a",
            "version": "1.0",
            "authSpec": [
                {
                    "name": "Basic Authentication",
                    "type": "Basic_Authentication",
                    "spec": {
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "type": "object",
                        "description": "defines auth params",
                        "properties": {
                            "environmentUrl": {
                                "type": "string",
                                "description": "URL of the source instance"
                            },
                            "username": {
                                "type": "string",
                                "description": "User name for the user account"
                            },
                            "password": {
                                "type": "string",
                                "description": "Password for the user account",
                                "format": "password"
                            },
                            "securityToken": {
                                "type": "string",
                                "description": "Security token for the user account",
                                "format": "password"
                            }
                        },
                        "required": [
                            "username",
                            "password",
                            "securityToken"
                        ]
                    }
                }
            ],
            "sourceSpec": {
                "name": "CRM",
                "type": "CRM",
                "spec": {
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "object",
                    "properties": {
                        "tableName": {
                            "type": "string",
                            "description": "input table to pull data from"
                        },
                        "columns": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "type": {
                                        "type": "string"
                                    },
                                    "meta": {
                                        "type": "object",
                                        "description": "defines meta information for each column",
                                        "originalType": {
                                            "type": "string"
                                        }
                                    }
                                },
                                "required": [
                                    "name",
                                    "type",
                                    "meta"
                                ]
                            }
                        }
                    },
                    "required": [
                        "tableName",
                        "columns"
                    ]
                }
            },
            "exploreSpec": {
                "name": "Tabular",
                "type": "Tabular",
                "requestSpec": {
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "object",
                    "description": "defines explorable objects",
                    "properties": {
                        "objectType": {
                            "type": "string",
                            "enum": [
                                "table",
                                "root"
                            ]
                        }
                    },
                    "allOf": [
                        {
                            "if": {
                                "properties": {
                                    "objectType": {
                                        "enum": [
                                            "table"
                                        ]
                                    }
                                }
                            },
                            "then": {
                                "properties": {
                                    "object": {
                                        "type": "string"
                                    },
                                    "preview": {
                                        "type": "boolean"
                                    }
                                },
                                "required": [
                                    "object"
                                ]
                            }
                        }
                    ]
                },
                "responseSpec": {
                    "root": {
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string"
                                },
                                "name": {
                                    "type": "string"
                                },
                                "path": {
                                    "type": "string"
                                },
                                "canPreview": {
                                    "type": "boolean"
                                },
                                "canFetchSchema": {
                                    "type": "boolean"
                                }
                            }
                        }
                    },
                    "table": {
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "type": "object",
                        "properties": {
                            "format": {
                                "type": "string"
                            },
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "columns": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string"
                                                },
                                                "type": {
                                                    "type": "string"
                                                },
                                                "meta": {
                                                    "type": "object",
                                                    "originalType": {
                                                        "type": "string"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "data": {
                                "type": "array",
                                "items": {
                                    "type": "object"
                                }
                            }
                        }
                    }
                }
            },
            "attributes": {
                "category": "CRM",
                "isSource": true,
                "documentationLink": "http://www.adobe.com/go/data-connector-Salesforce-en"
            }
        }
    ]
}
```

### Create a base connection

A base connection specifies a source and contains your credentials for that source. Only one base connection is required per Dynamics or Salesforce account as it can be used to create multiple source connectors to bring in different tables.

Perform the following POST request to create a base connection. 

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
        "name": "Salesforce Base Connection",
        "description": "Base connection for Salesforce account",
        "auth": {
            "specName": "Basic Authentication",
            "params": {
                "username": "{USERNAME}",
                "password": "{PASSWORD}",
                "securityToken": "{SECURITY_TOKEN}"
            }
        },
        "connectionSpec": {
            "id": "{SPEC_ID}",
            "version": "1.0"
        }
    }'
```

*   `{USERNAME}`: Salesforce username.
*   `{PASSWORD}`: Salesforce password.
*   `{SECURITY_TOKEN}`: Salesforce security token.
*   `{SPEC_ID}`: Salesforce connection specifications ID.

#### Response

A successful response contains the base connection's unique identifier (`id`). Store this ID as it is required in the next step to explore CRM data from Dynamics or Salesforce.

```json
{
    "id": "4cb0c374-d3bb-4557-b139-5712880adc55"
}
```

### Explore your data tables

Having a base connection for your Dynamics or Salesforce account enables you to to explore your data tables using Flow Service APIs. Use the following call to find the data table you wish to bring into Platform.

#### API Format

```http
GET /connections/{BASE_CONNECTION_ID}/explore?objectType=root
```

*   `{BASE_CONNECTION_ID}`: The ID of your Dynamics or Salesforce base connection.

#### Request

```shell
curl -X GET \
    'http://platform.adobe.io/data/foundation/flowservice/connections/{BASE_CONNECTION_ID}/explore?objectType=root' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response is an array of tables from to your CRM storage. Find the table you wish to bring into Platform and take note of its `path` property, as you are required to provide it in the next step to inspect its structure.

```json
[
    {
        "type": "table",
        "name": "Solution Component Summary",
        "path": "msdyn_solutioncomponentsummary",
        "canPreview": true,
        "canFetchSchema": true
    },
    {
        "type": "table",
        "name": "Quote Invoicing Product",
        "path": "msdyn_quoteinvoicingproduct",
        "canPreview": true,
        "canFetchSchema": true
    },
    {
        "type": "table",
        "name": "Opportunity Relationship",
        "path": "customeropportunityrole",
        "canPreview": true,
        "canFetchSchema": true
    }
]
```

### Inspect a table

Your Dynamics or Salesforce base connection allows you to inspect a table's structure. Perform a GET request while specifying the path of a table as a query parameter.

#### API Format

```http
GET /connections/{BASE_CONNECTION_ID}/explore?objectType=table&object={TABLE_PATH}
```

*   `{BASE_CONNECTION_ID}`: The ID of your Dynamics or Salesforce base connection.
*   `{TABLE_PATH}`: The path of a table.

#### Request

```shell
curl -X GET \
    'http://platform.adobe.io/data/foundation/flowservice/connections/{BASE_CONNECTION_ID}/explore?objectType=table&object={TABLE_PATH}' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the structure of a table. Details regarding each of the table's columns are located within elements of the `columns` array.

```json
{
    "format": "flat",
    "schema": {
        "columns": [
            {
                "name": "first_name",
                "type": "string",
                "meta": {
                    "originalType": "String"
                }
            },
            {
                "name": "last_name",
                "type": "string",
                "meta": {
                    "originalType": "String"
                }
            },
            {
                "name": "email",
                "type": "string",
                "meta": {
                    "originalType": "String"
                }
            }
        ]
    }
}
```

### Create an ad hoc class

In order to bring a data table into Platform, an ad hoc class must be created to fully describe the table's structure. You can create a class by defining properties within a POST request payload and sending it to the Schema Registry API. 

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
        "description": "an optional description",
        "type": "object",
        "allOf": [
            {
                "$ref": "https://ns.adobe.com/xdm/data/adhoc"
            },
            {
                "properties": {
                    "_adhoc": {
                        "properties": {
                            "first_name": {
                                "type": "string"
                            },
                            "last_name": {
                                "type": "string"
                            },
                            "email": {
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

A successful response returns details of the newly created class including its unique identifier (`$id`). This ID is required in the next step for creating an ad hoc XDM schema.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/classes/f787bf8af0a3997295c626ea10055722",
    "meta:altId": "ims_organization.classes.f787bf8af0a3997295c626ea10055722",
    "meta:resourceType": "classes",
    "version": "1.0",
    "title": "adhoc-class",
    "description": "an optional description",
    "type": "object",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/xdm/data/adhoc"
        },
        {
            "properties": {
                "_f787bf8af0a3997295c626ea10055722": {
                    "properties": {
                        "first_name": {
                            "type": "string",
                            "meta:xdmType": "string"
                        },
                        "last_name": {
                            "type": "string",
                            "meta:xdmType": "string"
                        },
                        "email": {
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

### Create an ad hoc schema

Using the newly created ad hoc class, you can create a schema by performing a POST request to the Schema Registry.

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
        "description": "an optional description",
        "type": "object",
        "allOf": [
            {
                "$ref": "https://ns.adobe.com/{TENANT_ID}/classes/f787bf8af0a3997295c626ea10055722"
            }
        ]
    }'
```

*   `allOf > $ref`: The ID of the ad hoc class.

#### Response

A successful response contains details of the newly created schema including its unique identifier (`$id`). This ID is required in the next step for creating a source connection.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/140c03de81b959db95879033945cfd4c",
    "meta:altId": "{TENANT_ID}.schemas.140c03de81b959db95879033945cfd4c",
    "meta:resourceType": "schemas",
    "version": "1.0",
    "title": "adhoc-schema",
    "description": "an optional description",
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

With an ad hoc schema made for the source data table, a source connection can now be created by performing a POST request to the Flow Service API. A source connection consists a base connection, a data table, and a reference to the schema that describes the table.

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
        "name": "Source Connection {{$guid}}",
        "baseConnectionId": "4cb0c374-d3bb-4557-b139-5712880adc55",
        "description": "Source Connection {{$guid}}",
        "data": {
            "format": "parquet_xdm",
            "schema": {
                "id": "https://ns.adobe.com/{TENANT_ID}/schemas/140c03de81b959db95879033945cfd4c",
                "version": "application/vnd.adobe.xed-full-notext+json; version=1"
            }
        },
        "params": {
            "tableName": "{TABLE_PATH}",
            "columns": [
                {
                    "name": "first_name",
                    "type": "string",
                    "meta": {
                        "originalType": "String"
                    }
                },
                {
                    "name": "last_name",
                    "type": "string",
                    "meta": {
                        "originalType": "String"
                    }
                },
                {
                    "name": "email",
                    "type": "string",
                    "meta": {
                        "originalType": "String"
                    }
                }
            ]
        }
    }'
```

*   `baseConnectionId`: The ID of your Dynamics or Salesforce base connection.
*   `data > schema > id`: The ID of the ad hoc XDM schema.
*   `{TABLE_PATH}`: The path of the source data table.

#### Response

A successful response returns the unique identifier (`id`) for the newly created source connection. Store this value as it is required in later steps.

```json
{
    "id": "9a603322-19d2-4de9-89c6-c98bd54eb184"
}
```

### Create a target schema

In an earlier step, an ad hoc XDM schema was created to define the structure of the source data table. In order for the datable to be ingested into Platform, a target schema must also be created to structure the inbound data according to your needs. The target schema is then used to create a Platform dataset in which the source data table is contained. In this tutorial, the target XDM schema extends the XDM Individual Profile class. 

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
        "title": "Target schema for CRM source connector",
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

A successful response returns details of the newly created schema including its unique identifier (`$id`). Store this ID as it is required for creating a target dataset, mapping, and dataflow.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/417a33eg81a221bd10495920574gfa2d",
    "meta:altId": "{TENANT_ID}.schemas.417a33eg81a221bd10495920574gfa2d",
    "meta:resourceType": "schemas",
    "version": "1.0",
    "title": "Target schema for CRM source connector",
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
        "name": "Target Dataset for CRM data",
        "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/417a33eg81a221bd10495920574gfa2d",
            "contentType": "application/vnd.adobe.xed-full-notext+json; version=1"
        }
    }'
```

*   `schemaRef > id`: The ID of the target schema.

#### Response

A successful response returns the ID of the newly created dataset in the format `"@/datasets/{DATASET_ID}"`. The dataset ID is a read-only, system-generated string that is used to reference the dataset in API calls. Store the target dataset ID as it is required in the next steps to create a target connection and a dataflow.

```json
[
    "@/dataSets/5c8c3c555033b814b69f947f"
]
```

### Create a target connection

You now have unique identifiers for a base connection, a target schema, and a target dataset. You can now create a target connection which specifies the dataset that will contain the inbound source data.

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
        "baseConnectionId": "{BASE_CONNECTION_ID}",
        "name": "Target Connection",
        "description": "Target Connection for CRM data",
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

*   `{BASE_CONNECTION_ID}`: The ID of your Dynamics or Salesforce base connection.
*   `data > schema > id`: The ID of the target schema.
*   `params > dataSetId`: The ID of the target dataset.

#### Response

A successful response returns the target connection's unique identifier (`id`). Store this value as it is required in later steps.

```json
{
    "id": "4ee890c7-519c-4291-bd20-d64186b62da8"
}
```

### Create a mapping

In order to ingest incoming source data into a Platform dataset, the data must first be mapped to the target schema. This is achieved by performing a POST request to the Conversion Service API with data mappings defined within the request payload.

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
                "sourceAttribute": "first_name",
                "identity": false,
                "identityGroup": null,
                "namespaceCode": null,
                "version": 0
            },
            {
                "destinationXdmPath": "person.name.lastName",
                "sourceAttribute": "last_name",
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
            }
        ]
    }'
```

*   `xdmSchema`: The ID of the target XDM schema.

#### Response

A successful response returns details of the newly created mapping including its unique identifier (`id`). Store this value as it is required in a later step to create a dataflow.

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
        "id": "https://ns.adobe.com/{TENANT_ID}/schemas/2574494fdb01fa14c25b52d717ccb828",
        "contentType": "1.0"
    },
    "xdmSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/2574494fdb01fa14c25b52d717ccb828"
}
```

### Lookup dataflow specifications

A dataflow is responsible for collecting data from sources and bringing them into Platform. In order to create a dataflow, you must first obtain the dataflow specifications that are responsible for collecting CRM data.

#### API Format

```http
GET /flowSpecs?property=name=="CRMToAEP"
```

#### Request

```shell
curl -X GET \
    'https://platform.adobe.io/data/foundation/flowservice/flowSpecs?property=name==%22CRMToAEP%22' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the details of the dataflow specification that is responsible for collecting CRM data. Store the value of the id field `id` as it is required in the next step to create a new dataflow.

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

### Create a dataflow

The following values were obtained in previous steps, and are now required for the successful creation of a dataflow:

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
        "name": "Dataflow for CRM data",
        "description": "An optional description",
        "flowSpec": {
            "id": "14518937-270c-4525-bdec-c2ba7cce3860",
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
            "frequency": "minute",
            "interval": "30"
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

By following this tutorial, you have created a source connector to collect CRM data from Microsoft Dynamics or Salesforce on a scheduled basis. Incoming data can now be used by downstream Platform services such as Real-time Customer Profile and Data Science Workspace. See the following documents for more details:

*   [Real-time Customer Profile overview](../../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md)
*   [Data Science Workspace overview](../../../technical_overview/data_science_workspace_overview/dsw_overview.md)