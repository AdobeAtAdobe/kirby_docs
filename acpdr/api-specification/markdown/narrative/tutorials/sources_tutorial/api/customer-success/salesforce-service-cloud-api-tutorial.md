# Connect to Salesforce Service Cloud using the Flow Service API

***WARNING: This documentation is no longer being maintained and may be outdated. Find up-to-date guides and tutorials in the new [Sources documentation](https://docs.adobe.com/content/help/en/experience-platform/sources/home.html) area.***

Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

This tutorial uses the Flow Service API to walk you through the steps to connect Experience Platform to Salesforce Service Cloud (hereinafter referred to as "SSC"), including showing you how to:

- [Look up connection specifications](#look-up-connection-specifications)
- [Create a base connection](#create-a-base-connection)

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

- [Sources](../../../../technical_overview/acp_connectors_overview/acp-connectors-overview.md): Experience Platform allows data to be ingested from various sources while providing you with the ability to structure, map, and enhance incoming data using Platform services.
- [Sandboxes](../../../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully connect to SSC using the Flow Service API.

### Gather required credentials

In order for Flow Service to connect with SSC, you must provide values for the following connection properties:

| Credential | Description |
| ---------- | ----------- |
| `username` | The user name for the user account. |
| `password` | The password for the user account. |
| `securityToken` | The security token for the user account. |

For more information about getting started refer to [this Salesforce Service Cloud document](https://developer.salesforce.com/docs/atlas.en-us.api_iot.meta/api_iot/qs_auth_access_token.htm).

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

## Look up connection specifications

In order to create an SSC connection, a set of SSC connection specifications must exist within Flow Service. The first step in connecting Platform to SSC is to retrieve these specifications.

#### API format

Each available source has its own unique set of connection specifications for describing connector properties such as authentication requirements. Sending a GET request to the `/connectionSpecs` endpoint will return connection specifications for all available sources. You can also include the query `property=name=="salesforce-service-cloud"` to obtain information specifically for SSC.

```http
GET /connectionSpecs
GET /connectionSpecs?property=name=="salesforce-service-cloud"
```

#### Request

The following request retrieves the connection specification for SSC.

```shell
curl -X GET \
    'https://platform.adobe.io/data/foundation/flowservice/connectionSpecs?property=name=="mysql"' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the connection specifications for SSC, including its unique identifier (`id`). This ID is required in the next step for creating a base connection.

```json
{
    "items": [
        {
            "id": "cb66ab34-8619-49cb-96d1-39b37ede86ea",
            "name": "salesforce-service-cloud",
            "providerId": "0ed90a81-07f4-4586-8190-b40eccef1c5a",
            "version": "1.0",
            "authSpec": [
                {
                    "name": "Basic Authentication",
                    "type": "BasicAuthentication",
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
        }
    ]
}
```

## Create a base connection

A base connection specifies a source and contains your credentials for that source. Only one base connection is required per SSC account as it can be used to create multiple source connectors to bring in different data.

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
        "name": "Base connection for salesforce service cloud",
        "description": "Base connection for salesforce service cloud",
        "auth": {
            "specName": "Basic Authentication",
            "params": {
                "username": "{USERNAME}",
                "password": "{PASSWORD}",
                "securityToken": "{SECURITY_TOKEN}"
            }
        },
        "connectionSpec": {
            "id": "b66ab34-8619-49cb-96d1-39b37ede86ea",
            "version": "1.0"
        }
    }'
```

| Parameter | Description |
| --------- | ----------- |
| `auth.params.username` | The username associated with your SSC account. |
| `auth.params.password` | The password associated with your SSC account. |
| `auth.params.securityToken` | The security token associated with your SSC account. |
| `connectionSpec.id` | he connection specification `id` of your SSC account retrieved in the previous step. |

#### Response

A successful response returns details of the newly created base connection, including its unique identifier (`id`). This ID is required to explore your data in the next tutorial.

```json
{
    "id": "4267c2ab-2104-474f-a7c2-ab2104d74f86",
    "etag": "\"0200f1c5-0000-0200-0000-5e4352bf0000\""
}
```

## Next steps

By following this tutorial, you have created an SSC base connection using the Flow Service API, and have obtained the connection's unique ID value. You can use this base connection ID in the next tutorial as you learn how to [explore customer success systems using the Flow Service API](./explore-cs-api-tutorial.md).
