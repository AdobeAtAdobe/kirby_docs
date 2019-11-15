# Streaming validation

Streaming ingestion allows you to upload your data to Adobe Experience Platform using streaming endpoints in real-time. Streaming ingestion APIs support two modes of validation - synchronous and asynchronous.

This user guide explains how Streaming Ingestion APIs handle validation of records. Specifically, this guide will explain the following methods:

- [Synchronous validation](#synchronous-validation)
- [Asynchronous validation](#asynchronous-validation)

## Getting started

This guide requires a working understanding of the following components of Adobe Experience Platform:

- [Experience Data Model (XDM) System](../schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Experience Platform organizes customer experience data.
- [Streaming Ingestion](./streaming_ingest_overview.md): One of the methods by which data can be sent to Experience Platform.

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

The API calls shown in this tutorial are demonstrated using cURL commands. To follow along, you may wish to use [Postman](https://www.getpostman.com/), a free, third-party software that is helpful for visualizing API calls. You can download a [Postman collection](https://raw.githubusercontent.com/adobe/experience-platform-postman-samples/master/postman/schema_editor_tutorial/Schema%20Registry%20API%20Tutorial.postman_collection.json) and corresponding [Postman environment](https://raw.githubusercontent.com/adobe/experience-platform-postman-samples/master/postman/schema_editor_tutorial/Schema%20Registry%20API%20Tutorial.postman_environment.json) to begin using the Schema Registry API. Steps for importing environments and collections are available through the [Postman Learning Center](https://learning.getpostman.com/docs/postman/collection_runs/using_environments_in_collection_runs/). 

> **Note:** In order to successfully use the collection and environment you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform, including those belonging to the Schema Registry, are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../sandboxes/sandboxes-overview.md). 

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: `application/json`

### Validation coverage

Streaming Validation Service covers validation in the following areas:
-  Range
-  Presence
-  Enum
-  Pattern
-  Type
-  Format

## Synchronous validation

Synchronous validation is a method of validation that provides immediate feedback about why an ingestion failed. However, upon failure, the records that fail validation are dropped and prevented from being sent downstream. As a result, synchronous validation should only be used during the development process. When doing synchronous validation, the callers are informed of both the result of the XDM validation, and, if it failed, the reason for failure. 

By default, synchronous validation is not turned on. To enable it, you must pass in the optional query parameter `synchronousValidation=true` when making API calls. In addition, synchronous validation is currently only available if your stream endpoint is on the VA7 data center.

If a message fails during synchronous validation, the message will not be written to the output queue, which provides immediate feedback for users.

#### Request

Submit the following request to ingest data to your data inlet with synchronous validation:

```shell
curl -X POST https://dcs.adobedc.net/collection/{INLET_ID}?synchronousValidation=true \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -d '{JSON_PAYLOAD}'
```

- `{INLET_ID}`: The data inlet which you wish to request synchronous validation for.
- `{JSON_PAYLOAD}`: The JSON body of a data you wish to ingest.

#### Response

With synchronous validation enabled, a successful response includes any encountered validation errors in its payload:

```json
{
    "type": "http://ns.adobe.com/adobecloud/problem/data-collection-service/inlet",
    "status": 400,
    "title": "Invalid XDM Message Format",
    "report": {
        "message": "inletId: [6aca7aa2d87ebd6b2780ca5724d94324a14475f140a2b69373dd5c714430dfd4] imsOrgId: [7BF122A65C5B3FE40A494026@AdobeOrg] Message is invalid",
        "cause": {
            "_streamingValidation": [
                {
                    "schemaLocation": "#",
                    "pointerToViolation": "#",
                    "causingExceptions": [
                        {
                            "schemaLocation": "#",
                            "pointerToViolation": "#",
                            "causingExceptions": [],
                            "keyword": "additionalProperties",
                            "message": "extraneous key [workEmail] is not permitted"
                        },
                        {
                            "schemaLocation": "#",
                            "pointerToViolation": "#",
                            "causingExceptions": [],
                            "keyword": "additionalProperties",
                            "message": "extraneous key [person] is not permitted"
                        },
                        {
                            "schemaLocation": "#/properties/_id",
                            "pointerToViolation": "#/_id",
                            "causingExceptions": [],
                            "keyword": "type",
                            "message": "expected type: String, found: Long"
                        }
                    ],
                    "message": "3 schema violations found"
                }
            ]
        }
    }
}
```

The above response lists how many schema violations were found, and what the violations were. For example, this response states that the keys `workEmail` and `person` were not defined in the schema, and therefore are not allowed. It also flags the value for `_id` as incorrect, since the schema expected a `string`, but a `long` was inserted instead. Note that once five errors are encountered, validation service will **stop** processing that message. Other messages will continue to be parsed, however.

## Asynchronous validation

Asynchronous validation is a method of validation that does not provide immediate feedback. Instead, the data is sent to a failed batch in Data Lake to prevent data loss. This failed data can be later retrieved for further analysis and replay. This method should be used in production. Unless otherwise requested, streaming ingestion operates in asynchronous validation mode.  

#### Request

Submit the following request to ingest data to your data inlet with asynchronous validation:

```shell
curl -X POST https://dcs.adobedc.net/collection/{INLET_ID} \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -d '{JSON_PAYLOAD}'
```

- `{INLET_ID}`: The data inlet which you wish to request asynchronous validation for.
- `{JSON_PAYLOAD}`: The JSON body of a data you wish to ingest.

Please note that no extra query parameter is required, as asynchronous validation is enabled by default.

#### Response

With asynchronous validation enabled, a successful response returns the following:

```json
{
    "inletId": "f6ca9706d61de3b78be69e2673ad68ab9fb2cece0c1e1afc071718a0033e6877",
    "xactionId": "1555445493896:8600:8",
    "receivedTimeMs": 1555445493932,
    "synchronousValidation": {
        "skipped": true
    }
}
```

Please note how the response states that synchronous validation has been skipped, as it has not been explicitly requested.

## Appendix

This section contains information about what the various status codes mean for responses for ingesting data.

### Status codes

Status Code | What it means
----------- | -------------
200 | Success. For synchronous validation, it means that it has passed the validation checks. For asynchronous validation, it means that it only has successfully received the message. Users can find out the eventual message status by observing the dataset.
400 | Error. There is something wrong with your request. An error message with further details is received from the Streaming Validation Services.
401 | Error. Your request is unauthorized - you'll need to request with a bearer token. For further information about how to request access, check out this [tutorial][1] or this [blog post][2].
500 | Error. There is an internal system error.
501 | Error. This means that synchronous validation is **not** supported for this location.
503 | Error. The service is currently unavailable. Clients should retry at least three times using an exponential back-off strategy.

[xdminfo]: ../schema_registry/schema_composition/schema_composition.md 
[1]: ../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md 
[2]: https://medium.com/adobetech/using-postman-for-jwt-authentication-on-adobe-i-o-7573428ffe7f