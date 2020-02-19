# Connect to Google BigQuery using the Flow Service API

Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

This tutorial uses the Flow Service API to walk you through the steps to connect Experience Platform to Google BigQuery (hereinafter referred to as "BigQuery"), including showing you how to:

* [Look up connection specifications](#look-up-connection-specifications)
* [Create a base connection](#create-a-base-connection)

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

- [Sources](../../../../technical_overview/acp_connectors_overview/acp-connectors-overview.md): Experience Platform allows data to be ingested from various sources while providing you with the ability to structure, label, and enhance incoming data using Platform services.
- [Sandboxes](../../../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully connect to BigQuery using the Flow Service API.

### Gather required credentials

In order for Flow Service to connect with BigQuery, you must provide the following connection properties:

| Credential | Description |
| ---------- | ----------- |
| `project` | The project ID of the default BigQuery project to query against. |
| `clientID` | The ID of the application used to generate the refresh token. |
| `clientSecret` | The secret for the application used to generate the refresh token. |
| `refreshToken` | The refresh token obtained from Google used to authorize access to BigQuery. |

For more information about these values, refer to [this BigQuery document](https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing).

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../../../technical_overview/platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

* Authorization: Bearer `{ACCESS_TOKEN}`
* x-api-key: `{API_KEY}`
* x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform, including those belonging to the Flow Service, are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

* x-sandbox-name: `{SANDBOX_NAME}`

All requests that contain a payload (POST, PUT, PATCH) require an additional media type header:

* Content-Type: application/json

## Look up connection specifications

In order to create a BigQuery connection, a set of BigQuery connection specifications must exist within Flow Service. The first step in connecting Platform to BigQuery is to retrieve these specifications.

#### API format

Each available source has its own unique set of connection specifications for describing connector properties such as authentication requirements. You can look up connection specifications for BigQuery by performing a GET request and using query parameters.

Sending a GET request without query parameters will return connection specifications for all available sources. You can include the query `property=name=="google-big-query"` to obtain information specifically for BigQuery.

```http
GET /connectionSpecs
GET /connectionSpecs?property=name=="google-big-query"
```

#### Request

The following request retrieves the connection specifications for BigQuery.

```shell
curl -X GET \
    'https://platform.adobe.io/data/foundation/flowservice/connectionSpecs?property=name=="google-big-query"' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the connection specifications for BigQuery, including its unique identifier (`id`). This ID is required in the next step to create a base connection.

```json
{
    "items": [
        {
            "id": "3c9b37f8-13a6-43d8-bad3-b863b941fedd",
            "name": "google-big-query",
            "providerId": "0ed90a81-07f4-4586-8190-b40eccef1c5a",
            "version": "1.0",
            "authSpec": [
                {
                    "name": "Basic Authentication",
                    "spec": {
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "type": "object",
                        "description": "defines auth params",
                        "properties": {
                            "project": {
                                "type": "string",
                                "description": "The project ID of the default BigQuery project to query against"
                            },
                            "clientId": {
                                "type": "string",
                                "description": "ID of the application used to generate the refresh token."
                            },
                            "clientSecret": {
                                "type": "string",
                                "description": "Secret of the application used to generate the refresh token.",
                                "format": "password"
                            },
                            "refreshToken": {
                                "type": "string",
                                "description": "The refresh token obtained from Google used to authorize access to BigQuery.",
                                "format": "password"
                            }
                        },
                        "required": [
                            "project",
                            "clientId",
                            "clientSecret",
                            "refreshToken"
                        ]
                    }
                }
            ]
        }
    ]
}
```

## Create a base connection

A base connection specifies a source and contains your credentials for that source. Only one base connection is required per BigQuery account as it can be used to create multiple source connectors to bring in different data.

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
        "name": "BigQuery base connection",
        "description": "Base connection for Google BigQuery",
        "auth": {
            "specName": "Basic Authentication",
            "params": {
                "project": "{PROJECT}",
                "clientId": "{CLIENT_ID}",
                "clientSecret": "{CLIENT_SECRET}",
                "refreshToken": "{REFRESH_TOKEN}"
            }
        },
        "connectionSpec": {
            "id": "3c9b37f8-13a6-43d8-bad3-b863b941fedd",
            "version": "1.0"
    }'
```

| Property | Description |
| --------- | ----------- |
| `auth.params.project` | The project ID of the default BigQuery project to query. against. |
| `auth.params.cliendId` | The ID of the application used to generate the refresh token. |
| `auth.params.clientSecret` | The client secret of the application used to generate the refresh token. |
| `auth.params.refreshToken` | The refresh token obtained from Google used to authorize access to BigQuery. |
| `connectionSpec.id` | TThe connection specification `id` of your BigQuery account retrieved in the previous step. |

#### Response

A successful response returns details of the newly created base connection, including its unique identifier (`id`). This ID is required to explore your data in the next tutorial.

```json
{
    "id": "26ced882-729b-470f-8ed8-82729b570f03",
    "etag": "\"6507cfd8-0000-0200-0000-5e18fc600000\""
}
```

## Next steps

By following this tutorial, you have created an BigQuery base connection using the Flow Service API, and have obtained the connection's unique ID value. You can use this base connection ID in the next tutorial as you learn how to [explore CRM systems using the Flow Service API](./explore-crm-system-api-tutorial.md).
