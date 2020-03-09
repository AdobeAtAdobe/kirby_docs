# Create an Experience Platform dataset base connection using the Flow Service API

Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

In order to connect data from a third-party source to Platform, a dataset base connection must first be established.

This tutorial uses the Flow Service API to walk you through the steps to create a dataset base connection, including showing you how to:

- [Look up connection specifications](#look-up-connection-specifications)
- [Create a dataset base connection](#create-a-dataset-base-connection)

## Getting started

This tutorial requires a working understanding of the following components of Adobe Experience Platform:

*   [Experience Data Model (XDM) System](./../../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Experience Platform organizes customer experience data.
    *   [Basics of schema composition](./../../../technical_overview/schema_registry/schema_composition/schema_composition.md): Learn about the basic building blocks of XDM schemas, including key principles and best practices in schema composition.
    *   [Schema Registry developer guide](./../../../technical_overview/schema_registry/schema_registry_developer_guide.md): Includes important information that you need to know in order to successfully perform calls to the Schema Registry API. This includes your `{TENANT_ID}`, the concept of "containers", and the required headers for making requests (with special attention to the Accept header and its possible values).
*   [Catalog Service](./../../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md): Catalog is the system of record for data location and lineage within Experience Platform.
*   [Batch ingestion](./../../../technical_overview/ingest_architectural_overview/ingest_architectural_overview.md): The batch ingestion API allows you to ingest data into Experience Platform as batch files.
*   [Sandboxes](./../../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully connect to Data Lake using the Flow Service API.

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

## Look up connection specifications

 The first step in creating a dataset base connection is to retrieve a set of connection specifications from within Flow Service.

#### API format

Each available source has its own unique set of connection specifications for describing connector properties such as authentication requirements. You can look up connection specifications for a dataset base connection by performing a GET request and using query parameters.

Sending a GET request without query parameters will return connection specifications for all available sources. You can include the query `property=id=="c604ff05-7f1a-43c0-8e18-33bf874cb11c"` to obtain information for your dataset base connection.

```http
GET /connectionSpecs
GET /connectionSpecs?property=id=="c604ff05-7f1a-43c0-8e18-33bf874cb11c"
```

#### Request

The following request retrieves the connection specifications for a dataset base connection.

```shell
curl -X GET \
    'https://platform.adobe.io/data/foundation/flowservice/connectionSpecs?property=id=="c604ff05-7f1a-43c0-8e18-33bf874cb11c"' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the connection specifications and the unique identifier (`id`) required to create a base connection.

```json
{
    "items": [
        {
            "id": "c604ff05-7f1a-43c0-8e18-33bf874cb11c",
            "name": "{NAME}",
            "providerId": "0ed90a81-07f4-4586-8190-b40eccef1c5a",
            "version": "1.0",
            "targetSpec": {
                "spec": {
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "object",
                    "properties": {
                        "dataSetId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "dataSetId"
                    ]
                }
            },
            "attributes": {
                "category": "{CATEGORY}"
            },
            "permissionsInfo": {
                "view": [
                    {
                        "@type": "lowLevel",
                        "name": "Dataset",
                        "permissions": [
                            "read"
                        ]
                    }
                ],
                "manage": [
                    {
                        "@type": "lowLevel",
                        "name": "Dataset",
                        "permissions": [
                            "write"
                        ]
                    }
                ]
            }
        }
    ]
}
```

## Create a dataset base connection

A base connection specifies a source and contains your credentials for that source. Only one dataset base connection is required as it can be used to create multiple source connectors to bring in different data.

#### API format

```http
POST /connections
```

#### Request

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/flowservice/connections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "name": "Dataset Base Connection",
        "description": "Dataset Base Connection",
        "connectionSpec": {
            "id": "c604ff05-7f1a-43c0-8e18-33bf874cb11c",
            "version": "1.0"
        }
    }'
```

| Property | Description |
| ------------- | --------------- |
| `connectionSpec.id` | The connection specification `id` retrieved in the previous step. |

#### Response

A successful response returns details of the newly created base connection, including its unique identifier (`id`). This ID is required to create a target connection and ingest data from a third-party source connector.

```json
{
    "id": "d6c3988d-14ef-4000-8398-8d14ef000021",
    "etag": "\"d502e61b-0000-0200-0000-5e62a1f90000\""
}
```

## Next steps

By following this tutorial, you have created a dataset base connection connection using the Flow Service API, and have obtained the connection's unique ID value. You can use this base connection to create a target connection in any of the following tutorials:

- [Cloud storage](./cloud-storages/retrieve-cloud-storage-api-tutorial.md)
- [CRM](./crm/retrieve-crm-data-api-tutorial.md)
- [Customer Success](./customer-success/retrieve-cs-data-api-tutorial.md)
- [Database](./database-nosql/retrieve-dbnosql-data-api-tutorial.md)