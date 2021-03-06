# Explore your database or NoSQL system using the Flow Service API

Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

This tutorial uses the Flow Service API to explore databases or NoSQL systems and includes the following steps:

* [Explore your data tables](#explore-your-data-tables)
* [Inspect the structure of a table](#inspect-the-structure-of-a-table)

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

* [Sources](../../../technical_overview/acp_connectors_overview/acp-connectors-overview.md): Experience Platform allows data to be ingested from various sources while providing you with the ability to structure, label, and enhance incoming data using Platform services.
* [Sandboxes](../../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to sucessfully connect to a database or NoSQL system using the Flow Service API.

### Obtain a base connection

In order to explore your database or NoSQL system using Platform APIs, you must possess a valid base connection ID. If you do not already have a base connection for the database or NoSQL system you wish to work with, you can create one through the following tutorials:

* [Amazon Redshift](./aws-redshift-api-tutorial.md)
* [Google BigQuery](./google-big-query-api-tutorial.md)
* [MySQL](./my-sql-api-tutorial.md)
* [PostgreSQL](./postgresql-api-tutorial.md)

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

Using the base connection for your database or NoSQL system, you can explore your data tables by performing GET requests. Use the following call to find the path of the table you wish to inspect or ingest into Platform.

#### API Format

```http
GET /connections/{BASE_CONNECTION_ID}/explore?objectType=root
```

*   `{BASE_CONNECTION_ID}`: The ID of the base connection for your database or NoSQL system.

#### Request

```shell
curl -X GET \
    'http://platform.adobe.io/data/foundation/flowservice/connections/54c22133-3a01-4d3b-8221-333a01bd3b03/explore?objectType=root' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns an array of tables from your database or NoSQL system. Find the table you wish to bring into Platform and take note of its `path` property, as you are required to provide it in the next step to inspect its structure.

```json
[
    {
        "type": "table",
        "name": "test1.Mytable",
        "path": "test1.Mytable",
        "canPreview": true,
        "canFetchSchema": true
    },
    {
        "type": "table",
        "name": "test1.austin_demo",
        "path": "test1.austin_demo",
        "canPreview": true,
        "canFetchSchema": true
    }
]
```

## Inspect the structure of a table

To inspect the structure of a table from your database or NoSQL system, perform a GET request while specifying the path of a table as a query parameter.

#### API format

```http
GET /connections/{BASE_CONNECTION_ID}/explore?objectType=table&object={TABLE_PATH}
```

*   `{BASE_CONNECTION_ID}`: The ID of the base connection for your database or NoSQL system.
*   `{TABLE_PATH}`: The path of a table.

#### Request

```shell
curl -X GET \
    'http://platform.adobe.io/data/foundation/flowservice/connections/54c22133-3a01-4d3b-8221-333a01bd3b03/explore?objectType=table&object=test1.Mytable' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the structure of the specified table. Details regarding each of the table's columns are located within elements of the `columns` array.

```json
{
    "format": "flat",
    "schema": {
        "columns": [
            {
                "name": "TestID",
                "type": "string",
                "xdm": {
                    "type": "string"
                }
            },
            {
                "name": "Name",
                "type": "string",
                "xdm": {
                    "type": "string"
                }
            }
        ]
    }
}
```

## Next steps

By following this tutorial, you have explored your database or NoSQL system, found the path of the table you wish to ingest into Platform, and obtained information regarding its structure. You can use this information in the next tutorial to [retrieve data from your database or NoSQL system and bring it into Platform](./retrieve-dbnosql-data-api-tutorial.md).