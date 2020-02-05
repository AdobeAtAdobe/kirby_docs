# Explore a data store repository using the Flow Service API

This tutorial uses the Flow Service API to explore data store repository, and includes the following topics:

* [Explore your data tables](#explore-your-data-tables)
* [Inspect the structure of a table](#inspect-the-structure-of-a-table)

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

* [Sources](../../../technical_overview/acp_connectors_overview/acp-connectors-overview.md): Experience Platform allows data to be ingested from various sources while providing you with the ability to structure, map, and enhance incoming data using Platform services.
* [Sandboxes](../../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully connect to a data store repository using the Flow Service API.

### Obtain a base connection

In order to explore your data store repository using Platform APIs, you must possess a valid base connection ID. If you do not already have a base connection for the data store repository you wish to work with, you can create one through the [MySQL tutorial](./mysql-db-api-tutorial.md).

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

## Explore your data tables

Using the base connection for your data store repository, you can explore your data tables by performing GET requests. Use the following call to find the path of the table you wish to inspect or ingest into Platform.

#### API format

```http
GET /connections/{BASE_CONNECTION_ID}/explore?objectType=root
```

*   `{BASE_CONNECTION_ID}`: The ID of the base connection for your data store repository.

#### Request

```shell
curl -X GET \
    'http://platform.adobe.io/data/foundation/flowservice/connections/1a444165-3439-4c16-8441-653439dc166a/explore?objectType=root' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response is an array of tables from your data store repository. Find the table you wish to bring into Platform and take note of its `path` property, as you are required to provide it in the next step to inspect its structure.

```json
[
    {
        "type": "table",
        "name": "test_table",
        "path": "test_table",
        "canPreview": true,
        "canFetchSchema": true
    }
]
```

## Inspect the structure of a table

To inspect the structure of data table from your data store, perform a GET request while providing the table's path as a query parameter.

#### API format

```http
GET /connections/{BASE_CONNECTION_ID}/explore?objectType=table&object={TABLE_PATH}
```

*   `{BASE_CONNECTION_ID}`: The ID of a data store base connection.
*   `{TABLE_PATH}`: The path to a table.

#### Request

```shell
curl -X GET \
    'http://platform.adobe.io/data/foundation/flowservice/connections/1a444165-3439-4c16-8441-653439dc166a/explore?objectType=table&object=/test_table' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the structure of the queried file including table names and data types.

```json
{
    "format": "flat",
    "schema": {
        "columns": [
            {
                "name": "name",
                "type": "string",
                "xdm": {
                    "type": "string"
                }
            },
            {
                "name": "email",
                "type": "string",
                "xdm": {
                    "type": "string"
                }
            },
            {
                "name": "phone",
                "type": "string",
                "xdm": {
                    "type": "string"
                }
            },
        ]
    },
}
```

## Next steps

By following this tutorial, you have explored your data store repository, found the path of the table you wish to bring in to Platform, and obtained information regarding its structure. You can use this information in the next tutorial to [retrieve data from your data store repository and bring it into Platform](./retrieve-data-store-api-tutorial.md).