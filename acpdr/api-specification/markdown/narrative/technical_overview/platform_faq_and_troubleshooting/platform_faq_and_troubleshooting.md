# Adobe Experience Platform FAQ and troubleshooting guide

This document provides answers to frequently asked questions about Adobe Experience Platform, as well as a high-level troubleshooting guide for common errors that may be encountered in any Experience Platform API. For troubleshooting guides on individual Platform services, see the [service troubleshooting directory](#service-troubleshooting-directory) below.

### FAQ
- [What are Experience Platform APIs?](#what-are-experience-platform-apis)
- [How do I format an API request?](#how-do-i-format-an-api-request)
- [What is my IMS organization?](#what-is-my-ims-organization)
- [Where can I find my API key?](#where-can-i-find-my-api-key)
- [How do I get an access token?](#how-do-i-get-an-access-token)
- [How do I use query parameters?](#how-do-i-use-query-parameters)
- [Can I use Postman to make calls to Platform APIs?](#can-i-use-postman-to-make-calls-to-platform-apis)

### Errors and troubleshooting
- [API status codes](#api-status-codes)
- [Request header errors](#request-header-errors)
    - [OAuth token is missing](#oauth-token-is-missing)
    - [OAuth token is not valid](#oauth-token-is-not-valid)
    - [API key is required](#api-key-is-required)
    - [API key is invalid](#api-key-is-invalid)
    - [Missing header](#missing-header)
    - [Profile is not valid](#profile-is-not-valid)
    - [Valid content-type not specified](#valid-content-type-not-specified)

### More resources
- [Service troubleshooting directory](#service-troubleshooting-directory)

## FAQ

The following is a list of answers to frequently asked questions about Adobe Experience Platform.

## What are Experience Platform APIs?

Experience Platform offers multiple RESTful APIs that use HTTP requests to access Platform resources. These Service APIs each expose multiple endpoints, and allow you to perform operations to list (GET), lookup (GET), edit (PUT and/or PATCH), and delete (DELETE) resources.

For more information on specific endpoints and operations available for each service, please see the [API Reference documentation](https://www.adobe.io/apis/experienceplatform/home/api-reference.html).

## How do I format an API request?

Request formats vary depending on the Platform API being used. The best way to learn how to structure your API calls is by following along with the examples provided in the documentation for the particular Platform service you are using.

### Reading example API calls

The documentation for Experience Platform shows example API calls in two different ways. First, the call is presented in its **API format**, a template representation showing only the operation (GET, POST, PUT, PATCH, DELETE) and the endpoint being used (for example, `/global/classes`). Some templates also show the location of variables to help illustrate how a call should be formulated, such as `GET /{VARIABLE}/classes/{ANOTHER_VARIABLE}`.

The calls are then shown as cURL commands in a **Request**, which includes the necessary headers and full "base path" needed to successfully interact with the API. The base path should be pre-pended to all endpoints. For example, the aforementioned `/global/classes` endpoint becomes `https://platform.adobe.io/data/foundation/schemaregistry/global/classes`.

You will see the API format / Request pattern throughout the documentation, and are expected to use the complete path shown in the example Request when making your own calls to Platform APIs.

### Example API request

The following is an example API request that demonstrates the format you will encounter in the documentation.

#### API format

The API format shows the operation (GET) and the endpoint being used. Variables are indicated by curly braces (in this case, `{CONTAINER_ID}`).

```http
GET /{CONTAINER_ID}/classes
```

#### Request

In this example request, the variables from the API format are given actual values in the request path. All required headers are shown as well, as either sample header values or variables where sensitive information (such as security tokens and access IDs) should be included.

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/global/classes \
  -H 'Accept: application/vnd.adobe.xed-id+json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

The response illustrates what you would expect to receive following a successful call to the API, based on the request that was sent.

```json
{
    "results": [
        {
            "title": "XDM ExperienceEvent",
            "$id": "https://ns.adobe.com/xdm/context/experienceevent",
            "meta:altId": "_xdm.context.experienceevent",
            "version": "1"
        },
        {
            "title": "XDM Profile",
            "$id": "https://ns.adobe.com/xdm/context/profile",
            "meta:altId": "_xdm.context.profile",
            "version": "1"
        }
    ],
    "_links": {}
}
```

For more information on specific endpoints in Platform APIs, including required headers and request bodies, please see the [API Reference documentation](https://www.adobe.io/apis/experienceplatform/home/api-reference.html).

## What is my IMS organization?

An IMS organization is an an Adobe representation of a customer. Any licensed Adobe solutions are integrated with this customer organization. When an IMS organization is entitled to Experience Platform, it can assign access to developers.

The IMS Org ID (`x-gw-ims-org-id`) represents the organization that an API call should be executed for, and is therefore required as a header in all API requests. This ID can be found through the [Adobe I/O Console](https://console.adobe.io/): in the **Integrations** tab, navigate to the **Overview** section for any particular integration to find the ID under **Client Credentials**. 

For a step-by-step walkthrough of how to authenticate into Platform, see the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).

## Where can I find my API key?

An API key is required as a header in all API requests. It can be found through the [Adobe I/O Console](https://console.adobe.io/). Within the console, on the **Integrations** tab, navigate to the **Overview** section for a specific integration and you will find the key under **Client Credentials**. 

For a step-by-step walkthrough of how to authenticate to Platform, see the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).

## How do I get an access token?

Access tokens are required in the Authorization header of all API calls. They can be generated using a `curl` command, provided you have access to an integration for an IMS organization. Access tokens are only valid for 24 hours, after which a new token must be generated to continue using the API.

For details on generating access tokens, see the [Generate access token](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md#generate-access-token) section in the authentication tutorial.

## Can I use Postman to make calls to Platform APIs?

[Postman](https://www.getpostman.com/) is a useful tool for visualizing calls to RESTful APIs. This [Medium post](https://medium.com/adobetech/using-postman-for-jwt-authentication-on-adobe-i-o-7573428ffe7f) describes how you can set up Postman to automatically perform authentication and use it to consume Experience Platform APIs.

## How do I use query parameters?

Some Platform API endpoints accept query parameters to locate specific information and filter the results returned in the response. Query parameters are appended to request paths with a question mark (`?`) symbol, followed by one or more query parameters using the format `paramName=paramValue`. When combining multiple parameters in a single call, you must use an ampersand (`&`) to separate individual parameters.

The following example demonstrates how a request that uses multiple query parameters is represented in the documentation.

Examples of commonly used query parameters include:

```http
GET /tenant/schemas?orderby=title
GET /datasets?limit=36&start=10
GET /batches?createdAfter=1559775880000&orderBy=desc:created
```

For detailed information on which query parameters are available for a specific service or endpoint, please review the service-specific documentation.


## Errors and troubleshooting

The following is a list of errors that you may encounter when using any Experience Platform service. For troubleshooting guides on individual Platform services, see the [service troubleshooting directory](#service-troubleshooting-directory) below.

## API status codes

The following status codes may be encountered on any Experience Platform API. Each has a variety of causes, therefore the explanations given in this section are general in nature. For more details regarding specific errors in individual Platform services, please see the [service troubleshooting directory](#service-troubleshooting-directory) below.

Status Code | Description | Possible Causes
--- | --- | ---
400 | Bad request | The request was improperly constructed, missing key information, and/or contained incorrect syntax.
401 | Authentication failed | The request did not pass an authentication check. Your access token may be missing or invalid. See the [OAuth token errors](#oauth-token-is-missing) section below for more details.
403 | Forbidden | The resource was found, but you do not have the right credentials to view it.
404 | Not found | The requested resource could not be found on the server. The resource may have been deleted, or the requested path was entered incorrectly.
500 | Internal server error | This is a server-side error. If you are making many simultaneous calls, you may be reaching the API limit and need to filter your results (see the [Filtering data](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md#filter-using-limits) section in the Catalog Service overview for details). Wait for a moment before trying your request again, and contact your administrator if the problem persists.

## Request header errors

All API calls in Platform require specific request headers. To see which headers are required for individual services, please see the [API Reference documentation](https://www.adobe.io/apis/experienceplatform/home/api-reference.html). To find the values for the required authentication headers, see the [Authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).

If any of these headers are missing or invalid when making an API call, the following errors may occur.

### OAuth token is missing

```
{
    "error_code": "403010",
    "message": "Oauth token is missing."
}
```

This error message displays when an `Authorization` header is missing from an API request. Ensure that the Authorization header is included with a valid access token before trying again.

### OAuth token is not valid

```
{
    "error_code": "401013",
    "message": "Oauth token is not valid"
}
```

This error message displays when the provided access token in the `Authorization` header is not valid. Ensure that the token has been entered correctly, or [generate a new token](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md#generate-access-token) in the Adobe I/O Console.

### API key is required

```
{
    "error_code": "403000",
    "message": "Api Key is required"
}
```

This error message displays when an API key header (`x-api-key`) is missing from an API request. Ensure that the header is included with a valid API key before trying again.

### API key is invalid

```
{
    "error_code": "403003",
    "message": "Api Key is invalid"
}
```

This error message displays when the value of the provided API key header (`x-api-key`) is invalid. Ensure that you have entered the key correctly before trying again. 

If you do not know your API key, you can find it in the [Adobe I/O Console](https://console.adobe.io): in the **Integrations** tab, navigate to the **Overview** section for a specific integration to find the API key under **Client Credentials**.



### Missing header

```
{
    "error_code": "400003",
    "message": "Missing header"
}
```

This error message displays when an IMS org header (`x-gw-ims-org-id`) is missing from an API request. Ensure that the header is included with the ID of your IMS organization before trying again.

### Profile is not valid

```
{
    "error_code": "403025",
    "message": "Profile is not valid"
}
```

This error message displays when the user or Adobe I/O integration (identified by the [access token](#how-do-I-get-an-access-token) in the `Authorization` header) is not entitled to make calls to Experience Platform APIs for the IMS Org provided in the `x-gw-ims-org-id` header. Ensure that you have provided the correct ID for your IMS organization in the header before trying again.

If you do not know your organization ID, you can find it in the [Adobe I/O Console](https://console.adobe.io): in the **Integrations** tab, navigate to the **Overview** section for a specific integration to find the ID under **Client Credentials**.

### Valid content-type not specified

```
{
    "type": "/placeholder/type/uri",
    "status": 400,
    "title": "BadRequestError",
    "detail": "A valid content-type must be specified"
}
```

This error message displays when a POST, PUT or PATCH request has an invalid or missing `Content-Type` header. Ensure that the header is included in the request and that its value is `application/json`.


## Service troubleshooting directory

The following is a list of troubleshooting guides and API reference documentation for Experience Platform APIs. Each troubleshooting guide provides answers to frequently asked questions and solutions to problems that are specific to individual Platform services. The API reference documents provide a comprehensive guide to all available endpoints for each service, and show sample request bodies, responses, and error codes that you may receive.

Service | API Reference | Troubleshooting
--- | --- | ---
Catalog | [Catalog Service API](../../../../../acpdr/swagger-specs/catalog.yaml)
Data Ingestion | [Data Ingestion API](../../../../../acpdr/swagger-specs/ingest-api.yaml) | [Batch Data Ingestion troubleshooting guide](../ingest_architectural_overview/batch_data_ingestion_troubleshooting_guide.md)
Data Science Workspace | [Sensei Machine Learning API](../../../../../acpdr/swagger-specs/sensei-ml-api.yaml)
Data Usage Labeling and Enforcement (DULE) | [DULE Policy Service API](../../../../../acpdr/swagger-specs/dule-policy-service.yaml)
Experience Data Model (XDM) | [Schema Registry API](../../../../../acpdr/swagger-specs/schema-registry.yaml) | [XDM System FAQ and troubleshooting guide](../schema_registry/xdm_troubleshooting/xdm_system_faq_and_troubleshooting.md)
Identity Service | [Identity Service API](../../../../../acpdr/swagger-specs/id-service-api.yaml) | [Identity Service FAQ and recommendations](../identity_services_architectural_overview/identity_services_faq.md)
Query Service | [Query Service API](../../../../../acpdr/swagger-specs/qs-api.yaml) | [Query Service errors and troubleshooting](../../../../../end-user/markdown/query-service/qs-errors-troubleshooting.md)
Real-time Customer Profile | [Real-time Customer Profile APIs](../../../../../acpdr/swagger-specs/unified-profile-service-apis.yaml)