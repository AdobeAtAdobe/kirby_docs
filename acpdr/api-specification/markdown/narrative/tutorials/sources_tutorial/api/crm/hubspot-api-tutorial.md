# Connect to HubSpot using the Flow Service API

***WARNING: This documentation is no longer being maintained and may be outdated. Find up-to-date guides and tutorials in the new [Sources documentation](https://docs.adobe.com/content/help/en/experience-platform/sources/home.html) area.***

Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

This tutorial uses the Flow Service API to walk you through the steps to connect Experience Platform to HubSpot including showing you how to:

- [Look up connection specifications](#look-up-connection-specifications)
- [Create a connection for the API](#create-a-connection-for-the-api)

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

- [Sources](../../../../technical_overview/acp_connectors_overview/acp-connectors-overview.md): Experience Platform allows data to be ingested from various sources while providing you with the ability to structure, label, and enhance incoming data using Platform services.
- [Sandboxes](../../../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully connect to HubSpot using the Flow Service API.

### Gather required credentials

In order for Flow Service to connect with HubSpot, you must provide the following connection properties:

| Credential | Description |
| ---------- | ----------- |
| `clientId` | The client ID associated with your HubSpot application. |
| `clientSecret` | The client secret associated with your HubSpot application. |
| `accessToken` | The access token obtained when initially authenticating your OAuth integration. |
| `refreshToken` | The refresh token obtained when initially authenticating your OAuth integration. |

For more information about getting started, refer to this [HubSpot document](https://developers.hubspot.com/docs/methods/oauth2/oauth2-overview).

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../../../technical_overview/platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform, including those belonging to the Flow Service, are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`
  
All requests that contain a payload (POST, PUT, PATCH) require an additional media type header:

- Content-Type: application/json

## Look up connection specifications

In order to create a HubSpot connection, a set of HubSpot connection specifications must exist within Flow Service. The first step in connecting Platform to HubSpot is to retrieve these specifications.

#### API format

Each available source has its own unique set of connection specifications for describing connector properties such as authentication requirements. Sending a GET request to the `/connectionSpecs` endpoint will return connection specifications for all available sources. You can also include the query `property=name=="hubspot"` to obtain information specifically for HubSpot.

```http
GET /connectionSpecs
GET /connectionSpecs?property=name=="hubspot"
```

#### Request

The following request retrieves the connection specifications for HubSpot.

```shell
curl -X GET \
    'https://platform.adobe.io/data/foundation/flowservice/connectionSpecs?property=name=="hubspot"' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the connection specification for HubSpot, including its unique identifier (`id`). This ID is required in the next step to create a connection for the API.

```json
{
    "items": [
        {
            "id": "cc6a4487-9e91-433e-a3a3-9cf6626c1806",
            "name": "hubspot",
            "providerId": "0ed90a81-07f4-4586-8190-b40eccef1c5a",
            "version": "1.0",
            "authSpec": [
                {
                    "name": "Basic Authentication",
                    "spec": {
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "type": "object",
                        "description": "defines auth params required for connecting to HubSpot",
                        "properties": {
                            "clientId": {
                                "type": "string",
                                "description": "The client ID associated with your HubSpot application."
                            },
                            "clientSecret": {
                                "type": "string",
                                "description": "The client secret associated with your HubSpot application.",
                                "format": "password"
                            },
                            "accessToken": {
                                "type": "string",
                                "description": "The access token obtained when initially authenticating your OAuth integration.",
                                "format": "password"
                            },
                            "refreshToken": {
                                "type": "string",
                                "description": "The refresh token obtained when initially authenticating your OAuth integration.",
                                "format": "password"
                            }
                        },
                        "required": [
                            "clientId",
                            "clientSecret",
                            "accessToken",
                            "refreshToken"
                        ]
                    }
                }
            ],
        }
    ]
}
```

## Create a connection for the API

A connection for the API specifies a sources and contains your credentials for that source. Only one connection for the API is required per HubSpot account as it can be used to create multiple source connectors to bring in different data.

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
        "name": "connection for hubspot",
        "description": "connection for hubspot",
        "auth": {
            "specName": "Basic Authentication",
            "params": {
                "clientId": "{CLIENT_ID}",
                "clientSecret": "{CLIENT_SECRET}",
                "accessToken": "{ACCESS_TOKEN}",
                "refreshToken": "{REFRESH_TOKEN}"
            }
        },
        "connectionSpec": {
            "id": "cc6a4487-9e91-433e-a3a3-9cf6626c1806",
            "version": "1.0"
        }
    }
```

| Property | Description |
| -------- | ----------- |
| `auth.params.clientId` | The client ID associated with your HubSpot application. |
| `auth.params.clientSecret` | The client secret associated with your HubSpot application. |
| `auth.params.accessToken` | The access token obtained when initially authenticating your OAuth integration. |
| `auth.params.refreshToken` | The refresh token obtained when initially authenticating your OAuth integration. |

#### Response

A successful response returns details of the newly created connection for the API, including its unique identifier (`id`). This ID is required to explore your data in the next tutorial.

```json
{
    "id": "2eb9c78b-e8b8-4400-b9c7-8be8b86400b2",
    "etag": "\"05026cf5-0000-0200-0000-5e4c42920000\""
}
```

By following this tutorial, you have created a HubSpot connection using the Flow Service API, and have obtained the connection's unique ID value. You can use this connection ID in the next tutorial as you learn how to [explore CRM systems using the Flow Service API](./explore-crm-system-api-tutorial.md).