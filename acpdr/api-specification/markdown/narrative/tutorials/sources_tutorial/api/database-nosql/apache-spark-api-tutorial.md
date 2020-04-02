# Connect to Apache Spark on Azure HDInsight using the Flow Service API

Flow Service is used to collect and centralize customer data from various disparate sources within Adobe Experience Platform. The service provides a user interface and RESTful API from which all supported sources are connectable.

This tutorial uses the Flow Service API to walk you through the steps to connect Apache Spark on Azure HDInsights (hereinafter referred to as "Spark") to Experience Platform.

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

- [Sources](https://docs.adobe.com/content/help/en/experience-platform/source-connectors/home.html): Experience Platform allows data to be ingested from various sources while providing you with the ability to structure, map, and enhance incoming data using Platform services.
- [Sandboxes](https://docs.adobe.com/content/help/en/experience-platform/sandbox/home.html): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully connect to Spark using the Flow Service API.

### Gather required credentials

In order for Flow Service to connect with Spark, you must provide values for the following connection properties:

| Credential | Description |
| ---------- | ----------- |
| `host` | The IP address or host name of the Spark server. |
| `username` | The user name that you use to access Spark Server. |
| `password` | The password corresponding to the user. |
| `connectionSpec.id` | The unique identifier needed to create a connection. The connection specification ID for Spark is: `6a8d82bc-1caf-45d1-908d-cadabc9d63a6` |

For more information about getting started refer to [this Spark document](https://docs.microsoft.com/en-us/azure/hdinsight/spark/apache-spark-overview).

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

A connection specifies a source and contains your credentials for that source. Only one connection is required per Spark account as it can be used to create multiple source connectors to bring in different data.

#### API format

```http
POST /connections
```

#### Request

In order to create a Spark connection, its unique connection specification ID must be provided as part of the POST request. The connection specification ID for Spark is `6a8d82bc-1caf-45d1-908d-cadabc9d63a6`.

```shell
curl -X POST \
    'https://platform.adobe.io/data/foundation/flowservice/connections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d '{
        "name": "Spark test connection",
        "description": "A Spark test connection",
        "auth": {
            "specName": "HDInsights Basic Authentication",
        "params": {
            "host" :  "{HOST}",
            "username" : "{USERNAME}",
            "password" :"{PASSWORD}"
            }
        },
        "connectionSpec": {
            "id": "6a8d82bc-1caf-45d1-908d-cadabc9d63a6",
            "version": "1.0"
        }
    }'
```

| Parameter | Description |
| --------- | ----------- |
| `auth.params.host` | The host of the Spark server. |
| `auth.params.username` | The username associated with your Spark connection. |
| `auth.params.password` | The password associated with your Spark connection. |
| `connectionSpec.id` | The Spark connection specification ID: `6a8d82bc-1caf-45d1-908d-cadabc9d63a6`. |

#### Response

A successful response returns details of the newly created connection, including its unique identifier (`id`). This ID is required to explore your data in the next tutorial.

```json
{
    "id": "a45f2f58-e3a2-46ba-9f2f-58e3a2b6baf2",
    "etag": "\"900009d6-0000-0200-0000-5e8500010000\""
}
```

## Next steps

By following this tutorial, you have created a Spark connection using the Flow Service API and have obtained the connection's unique ID value. You can use this ID in the next tutorial as you learn how to [explore databases using the Flow Service API](./explore-dbnosql-api-tutorial.md).