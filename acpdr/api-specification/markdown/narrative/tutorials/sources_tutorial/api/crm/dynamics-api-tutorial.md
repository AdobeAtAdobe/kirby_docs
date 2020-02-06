# Connect to Microsoft Dynamics 365 using the Flow Service API

Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

This tutorial uses the Flow Service API to walk you through the steps to connect Platform to a Microsoft Dynamics (hereinafter referred to as "Dynamics") account for collecting CRM data, including showing you how to:

*   [Look up connection specifications](#look-up-connection-specifications)
*   [Create a base connection](#create-a-base-connection)

If you would prefer to use the user interface in Experience Platform, the [Dynamics or Salesforce source connector UI tutorial](../../dynamics-salesforce-ui-tutorial.md) provides step-by-step instructions for performing similar actions.

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

*   [Sources](../../../../technical_overview/acp_connectors_overview/acp-connectors-overview.md): Experience Platform allows data to be ingested from various sources while providing you with the ability to structure, label, and enhance incoming data using Platform services.
*   [Sandboxes](../../../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully connect Platform to a Dynamics account using the Flow Service API.

### Gather required credentials

In order for Flow Service to connect to Dynamics, you must provide values for the following connection properties:

| Credential | Description |
| ---------- | ----------- |
| `serviceUri` | The service URL of your Dynamics instance. |
| `username` | The user name for your Dynamics user account. |
| `password` | The password for your Dynamics account. |

For more information on getting started, visit [this Dynamics document](https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/authenticate-oauth).

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

Before connecting Platform to a Dynamics account, you must verify that connection specifications exist for Dynamics. If connection specifications do not exist then a connection cannot be made.

Each available source has its own unique set of connection specifications for describing connector properties such as authentication requirements. You can look up connection specifications for Dynamics by performing a GET request and using query parameters.

#### API format

Sending a GET request without query parameters will return connection specifications for all available sources. You can include the query `property=name=="dynamics-online"` to obtain information specifically for Dynamics.

```http
GET /connectionSpecs
GET /connectionSpecs?property=name=="dynamics-online"
```

#### Request

The following request retrieves the connection specifications for Dynamics.

```shell
curl -X GET \
    'https://platform.adobe.io/data/foundation/flowservice/connectionSpecs?property=name=="dynamics-online"' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the connection specifications for Dynamics, including its unique identifier (`id`). This ID is required in the next step to create a base connection.

```json
{
    "items": [
        {
            "id": "38ad80fe-8b06-4938-94f4-d4ee80266b07",
            "name": "dynamics-online",
            "providerId": "0ed90a81-07f4-4586-8190-b40eccef1c5a",
            "version": "1.0",
            "authSpec": [
                {
                    "name": "Basic Authentication for Dynamics-Online",
                    "settings": {
                        "authenticationType": "Office365",
                        "deploymentType": "Online"
                    },
                    "spec": {
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "type": "object",
                        "description": "defines auth params required for connecting to dynamics-online",
                        "properties": {
                            "serviceUri": {
                                "type": "string",
                                "description": "The service URL of your Dynamics instance"
                            },
                            "username": {
                                "type": "string",
                                "description": "User name for the user account"
                            },
                            "password": {
                                "type": "string",
                                "description": "Password for the user account",
                                "format": "password"
                            }
                        },
                        "required": [
                            "username",
                            "password",
                            "serviceUri"
                        ]
                    }
                }
            ]
        }
    ]
}
```

## Create a base connection

A base connection specifies a source and contains your credentials for that source. Only one base connection is required per Dynamics account as it can be used to create multiple source connectors to bring in different data.

Perform the following POST request to create a base connection.

#### API format

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
        "name": "Dynamics Base Connection",
        "description": "Base connection for Dynamics account",
        "auth": {
            "specName": "Basic Authentication for Dynamics-Online",
            "params": {
                "serviceUri": "{SERVICE_URI}",
                "username": "{USERNAME}",
                "password": "{PASSWORD}"
            }
        },
        "connectionSpec": {
            "id": "38ad80fe-8b06-4938-94f4-d4ee80266b07",
            "version": "1.0"
        }
    }'
```

| Property | Description |
| -------- | ----------- |
| `auth.params.serviceUri` | The service URI associated with your Dynamics instance. |
| `auth.params.username` | The username associated with your Dynamics account. |
| `auth.params.password` | The password associated with your Dynamics account. |
| `connectionSpec.id` | The connection specification `id` of your Dynamics account retrieved in the previous step. |

#### Response

A successful response contains the base connection's unique identifier (`id`). This ID is required to explore your data in the next tutorial.

```json
{
    "id": "4cb0c374-d3bb-4557-b139-5712880adc55",
    "etag": "\"9e0052a2-0000-0200-0000-5e35tb330000\""
}
```

## Next steps

By following this tutorial, you have created a base connection for your Dynamics account using APIs and a unique ID was obtained as part of the response body. You can use this base connection ID in the next tutorial as you learn how to [explore CRM systems using the Flow Service API](./explore-crm-system-api-tutorial.md).