# Connect to Generic OData using the Flow Service API

***WARNING: This documentation is no longer being maintained and may be outdated. Find up-to-date guides and tutorials in the new [Sources documentation](https://docs.adobe.com/content/help/en/experience-platform/sources/home.html) area.***

Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

This tutorial uses the Flow Service API to walk you through the steps to connect Generic OData to Experience Platform.

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

- [Sources](https://docs.adobe.com/content/help/en/experience-platform/source-connectors/home.html): Experience Platform allows data to be ingested from various sources while providing you with the ability to structure, map, and enhance incoming data using Platform services.
- [Sandboxes](https://docs.adobe.com/content/help/en/experience-platform/sandbox/home.html): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully connect to OData using the Flow Service API.

### Gather required credentials

In order for Flow Service to connect with OData, you must provide values for the following connection properties:

| Credential | Description |
| ---------- | ----------- |
| url | The root URL of the OData service. |
| connectionSpec.id | The unique identifier needed to create a connection. The connection specification ID for OData is: `8e6b41a8-d998-4545-ad7d-c6a9fff406c3` |

For more information about getting started refer to [this OData document](https://www.odata.org/getting-started/basic-tutorial/).

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](https://docs.adobe.com/content/help/en/experience-platform/landing/troubleshooting.html#reading-example-api-calls) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](https://docs.adobe.com/content/help/en/experience-platform/tutorials/authentication.html). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform, including source connectors, are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

All requests that contain a payload (POST, PUT, PATCH) require an additional media type header:

- Content-Type: `application/json`

## Create a connection

A connection specifies a source and contains your credentials for that source. Only one connection is required per OData account as it can be used to create multiple source connectors to bring in different data.

#### API format

```http
POST /connections
```

#### Request

In order to create a OData connection, its unique connection specification ID must be provided as part of the POST request. The connection specification ID for OData is `8e6b41a8-d998-4545-ad7d-c6a9fff406c3`.

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/flowservice/connections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "name": "Protocols",
        "description": "A test connection for a Protocols source",
        "auth": {
            "specName": "Anonymous Authentication",
        "params": {
            "url" :  "{URL}"
            }
        },
        "connectionSpec": {
            "id": "8e6b41a8-d998-4545-ad7d-c6a9fff406c3",
            "version": "1.0"
        }
    }'
```

| Property | Description |
| --------- | ----------- |
| `auth.params.url` | The host of the OData server. |
| `connectionSpec.id` | The OData connection specification ID: `8e6b41a8-d998-4545-ad7d-c6a9fff406c3`. |

#### Response

A successful response returns details of the newly created connection, including its unique identifier (`id`). This ID is required to explore your data in the next tutorial.

```json
{
    "id": "a5c6b647-e784-4b58-86b6-47e784ab580b",
    "etag": "\"7b01056a-0000-0200-0000-5e8a4f5b0000\""
}
```

## Next steps

By following this tutorial, you have created an OData connection using the Flow Service API and have obtained the connection's unique ID value. You can use this ID in the next tutorial as you learn how to [explore protocols applications using the Flow Service API](./explore-protocols-api-tutorial.md).