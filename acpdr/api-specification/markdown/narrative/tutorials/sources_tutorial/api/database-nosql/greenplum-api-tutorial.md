# Connect to GreenPlum using the Flow Service API

***WARNING: This documentation is no longer being maintained and may be outdated. Find up-to-date guides and tutorials in the new [Sources documentation](https://docs.adobe.com/content/help/en/experience-platform/sources/home.html) area.***

Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

This tutorial uses the Flow Service API to walk you through the steps to connect GreenPlum to Experience Platform.

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

- [Sources](https://docs.adobe.com/content/help/en/experience-platform/source-connectors/home.html): Experience Platform allows data to be ingested from various sources while providing you with the ability to structure, map, and enhance incoming data using Platform services.
- [Sandboxes](https://docs.adobe.com/content/help/en/experience-platform/sandbox/home.html): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully connect to GreenPlum using the Flow Service API.

### Gather required credentials

In order for Flow Service to connect with GreenPlum, you must provide values for the following connection properties:

| Credential | Description |
| ---------- | ----------- |
| `connectionString` | The connection string to connect to any GreenPlum instance. |
| `connectionSpec.id` | The unique identifier needed to create a connection. The connection specification ID for GreenPlum is: `37b6bf40-d318-4655-90be-5cd6f65d334b` |

For more information about getting started refer to [this GreenPlum document](https://gpdb.docs.pivotal.io/580/security-guide/topics/Authenticate.html#topic_fzv_wb2_jr__config_ssl_client_conn).

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

A connection specifies a source and contains your credentials for that source. Only one connection is required per GreenPlum account as it can be used to create multiple source connectors to bring in different data.

#### API format

```http
POST /connections
```

#### Request

In order to create a GreenPlum connection, its unique connection specification ID must be provided as part of the POST request. The connection specification ID for GreenPlum is `37b6bf40-d318-4655-90be-5cd6f65d334b`.

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/flowservice/connections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "name": "GreenPlum test connection",
        "description": "GreenPlum test connection",
        "auth": {
            "specName": "Connection String Based Authentication",
            "params": {
                "connectionString": "{CONNECTION_STRING}"
            }
        },
        "connectionSpec": {
            "id": "37b6bf40-d318-4655-90be-5cd6f65d334b",
            "version": "1.0"
        }
    }'
```

| Parameter | Description |
| --------- | ----------- |
| `auth.params.connectionString` | The connection string associated with your GreenPlum account. |
| `connectionSpec.id` | The GreenPlum connection specification ID: `37b6bf40-d318-4655-90be-5cd6f65d334b`. |

#### Response

A successful response returns details of the newly created connection, including its unique identifier (`id`). This ID is required to explore your data in the next tutorial.

```json
{
    "id": "6bc13a3b-3546-455f-813a-3b3546a55fb1",
    "etag": "\"3500866c-0000-0200-0000-5e83afa30000\""
}
```

## Next steps

By following this tutorial, you have created a GreenPlum connection using the Flow Service API and have obtained the connection's unique ID value. You can use this ID in the next tutorial as you learn how to [explore databases using the Flow Service API](./explore-dbnosql-api-tutorial.md).
