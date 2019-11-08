# Evaluate events in real-time with streaming segmentation

Streaming segmentation (also known as continuous query evaluation) is the ability to instantly evaluate a customer as soon as an event comes into a particular segment group. With this capability, most segment rules can now be evaluated as the data is passed into Adobe Experience Platform, meaning segment membership will be kept up to date without running scheduled segmentation jobs.

This document provides a tutorial for managing streaming segmentation. Specifically, this tutorial covers the following details:

- [Retrieving all streaming enabled segments](#retrieve-all-streaming-segmentation-enabled-segments)
- [Creating a streaming enabled segment](#create-a-streaming-enabled-segment)
- [Enabling an existing segment for streaming segmentation](#enable-an-existing-segment-for-streaming-segmentation)

>**Note:** Streaming segmentation is a beta feature, and will be available on request.

## Getting started

This tutorial requires a working understanding of the various Adobe Experience Platform services involved with streaming segmentation. Before beginning this tutorial, please review the documentation for the following services:

- [Real-time Customer Profile][rtcp]: Provides a unified consumer profile in real-time, based on aggregated data from multiple sources.
- [Segmentation][seg-service]: Provides the ability to create segments and audiences from your Real-time Customer Profile data.
- [Experience Data Model (XDM)][xdm]: The standardized framework by which Platform organizes customer experience data.

The following sections provide additional information that you will need to know in order to successfully make calls to Platform APIs.

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../../technical_overview/platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

* x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../../technical_overview/sandboxes/sandboxes-overview.md). 

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

Additional headers may be required to complete specific requests. The correct headers are shown in each of the examples within this document. Please pay special attention to the sample requests in order to ensure that all required headers are included.

### Streaming segmentation enabled query types

The following table lists the different types of segmentation queries and whether or not they support streaming segmentation.

Query type | Sample query | Streaming segmentation supported
---------- | ------------ | ---------------------------------
Simple demographic | "Give me all the people whose home address is in Canada." | Supported
Time-series events | "Give me all the people who downloaded Lightroom." | Supported
Demographic and time-series | "Give me all the people who live in Canada and have placed an order in the last 30 days." | Supported
Absence of events | "Give me all the people who have abandoned two separate carts within two days of each other." | Supported
Multi-entity | "Give me all the people whose entitlement type is 'Experienced'." | Not supported
Advanced PQL functions | "Give me all the profiles which placed an order in the last week, and include the SKU and Name for all the products purchased." | Not supported

## Retrieve all streaming segmentation enabled segments

Before creating a new streaming-enabled segment or updating an existing segment to be streaming-enabled, you should ensure that you are not duplicating information by retrieving a list of all the streaming-enabled segments.

#### API format

To retrieve streaming-enabled segments, you must include the query parameter `evaluationInfo.continuous.enabled=true` in the request path.

```http
GET /segment/definitions?evaluationInfo.continuous.enabled=true
```

#### Request

```shell
curl -X GET \
  'https://platform.adobe.io/data/core/ups/segment/definitions?evaluationInfo.continuous.enabled=true' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG_ID}' \
  -H 'x-sandbox-name: {SANDBOX_NAME'
```

#### Response

A successful response returns an array of segments in your IMS Organization that are enabled for streaming segmentation.

```json
{
    "segments": [
        {
            "id": "15063cb-2da8-4851-a2e2-bf59ddd2f004",
            "schema": {
                "name": "_xdm.context.profile"
            },
            "ttlInDays": 30,
            "imsOrgId": "{IMS_ORG_ID}",
            "sandbox": {
                "sandboxId": "",
                "sandboxName": "",
                "type": "production",
                "default": true
            },
            "name": " People who are NOT on their homepage ",
            "expression": {
                "type": "PQL",
                "format": "pql/text",
                "value": "select var1 from xEvent where var1._experience.analytics.endUser.firstWeb.webPageDetails.isHomePage = false"
            },
            "evaluationInfo": {
                "batch": {
                    "enabled": false
                },
                "continuous": {
                    "enabled": true
                },
                "synchronous": {
                    "enabled": false
                }
            },
            "creationTime": 1572029711000,
            "updateEpoch": 1572029712000,
            "updateTime": 1572029712000
        },
        {
            "id": "f15063cb-2da8-4851-a2e2-bf59ddd2f004",
            "schema": {
                "name": "_xdm.context.profile"
            },
            "ttlInDays": 30,
            "imsOrgId": "{IMS_ORG_ID}",
            "sandbox": {
                "sandboxId": "",
                "sandboxName": "",
                "type": "production",
                "default": true
            },
            "name": "Homepage_continuous",
            "description": "People who are on their homepage - continuous",
            "expression": {
                "type": "PQL",
                "format": "pql/text",
                "value": "select var1 from xEvent where var1._experience.analytics.endUser.firstWeb.webPageDetails.isHomePage = true"
            },
            "evaluationInfo": {
                "batch": {
                    "enabled": true
                },
                "continuous": {
                    "enabled": true
                },
                "synchronous": {
                    "enabled": false
                }
            },
            "creationTime": 1572021085000,
            "updateEpoch": 1572021086000,
            "updateTime": 1572021086000
        }
    ],
    "page": {
        "totalCount": 2,
        "totalPages": 1,
        "sortField": "creationTime",
        "sort": "desc",
        "pageSize": 2,
        "limit": 100
    },
    "link": {}
}
```

## Create a streaming-enabled segment

After confirming that the segment you want to create does not already exist, you can create a new segment that is enabled for streaming segmentation.

#### API format

```http
POST /segment/definitions
```

#### Request

The following request creates a new segment that is streaming segmentation enabled. Note that the `continuous` section is set to `enabled: true`.

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/segment/definitions \
  -H 'Authorization: Bearer {ACCESS_TOKEN}'  \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "schema": {
        "name": "_xdm.context.profile"
    },
    "ttlInDays": 30,
    "name": "Homepage_continuous",
    "description": "People who are on their homepage - continuous",
    "expression": {
        "type": "PQL",
        "format": "pql/text",
        "value": "select var1 from xEvent where var1._experience.analytics.endUser.firstWeb.webPageDetails.isHomePage = true"
    },
    "evaluationInfo": {
        "batch": {
            "enabled": false
        },
        "continuous": {
            "enabled": true
        },
        "synchronous": {
            "enabled": false
        }
    }
}'
```

>**Note:** This is a standard "create a segment" request, with the added parameter of the `continuous` section being set to `enabled: true`. For more information about creating a segment definition, please read the documentation on [segment creation](../creating_a_segment_tutorial/creating_a_segment_tutorial.md).

#### Response

A successful response returns the details of the newly created streaming-enabled segment definition.

```json
{
    "id": "f15063cb-2da8-4851-a2e2-bf59ddd2f004",
    "schema": {
        "name": "_xdm.context.profile"
    },
    "ttlInDays": 30,
    "imsOrgId": "{IMS_ORG}",
    "sandbox": {
        "sandboxId": "{SANDBOX_ID}",
        "sandboxName": "{SANDBOX_NAME}",
        "type": "production",
        "default": true
    },
    "name": "Homepage_continuous",
    "description": "People who are on their homepage - continuous",
    "expression": {
        "type": "PQL",
        "format": "pql/text",
        "value": "select var1 from xEvent where var1._experience.analytics.endUser.firstWeb.webPageDetails.isHomePage = true"
    },
    "evaluationInfo": {
        "batch": {
            "enabled": false
        },
        "continuous": {
            "enabled": true,
                   },
        "synchronous": {
            "enabled": false
        }
    },
    "creationTime": 1572021085000,
    "updateEpoch": 1572021086000,
    "updateTime": 1572021086000
}
```

## Enable an existing segment for streaming segmentation

You can enable an existing segment for streaming segmentation by supplying the segment definition's ID in the path of a PATCH request. In addition, the payload of this PATCH request must include the full details of the existing segment definition, which can be accessed by making a GET request to the segment definition in question.

### Look up an existing segment definition

To look up an existing segment definition, you must supply its ID in the path of a GET request.

#### API format

```http
GET /segment/definitions/{SEGMENT_DEFINITION_ID}
```
- `{SEGMENT_DEFINITION_ID}`: The ID of the segment definition you want to look up.

#### Request

```shell
curl -X GET \
  https://platform.adobe.io/data/core/ups/segment/definitions/15063cb-2da8-4851-a2e2-bf59ddd2f004\
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response will return details of the segment definition you requested. 

```json
{
    "id": "15063cb-2da8-4851-a2e2-bf59ddd2f004",
    "schema": {
        "name": "_xdm.context.profile"
    },
    "sandbox": {
        "sandboxId": "",
        "sandboxName": "",
        "type": "production",
        "default": true
    },
    "name": "TestStreaming1",
    "expression": {
        "type": "PQL",
        "format": "pql/json",
        "value": "select var1 from xEvent where var1._experience.analytics.endUser.firstWeb.webPageDetails.isHomePage = true"
    },
    "mergePolicyId": "50de2f9c-990c-4b96-945f-9570337ffe6d",
    "evaluationInfo": {
        "batch": {
            "enabled": false
        },
        "continuous": {
            "enabled": false
        },
        "synchronous": {
            "enabled": false
        }
    }
}
```

>**Note:** For the next request, you will need the full details of the segment definition you just requested. Please copy the details of this payload to be used in the body of the next request.

### Enable the existing segment for streaming segmentation

Now that you know the details of the segment you want to update, you can perform a PATCH request to update the segment to enable streaming segmentation.

#### API format

```http
PATCH /segment/definitions/{SEGMENT_DEFINITION_ID}
```

#### Request

The payload of the following request supplies the details of the segment definition (obtained in the [previous step](#look-up-an-existing-segment-definition)), and updates it by changing its `continuous.enabled` property to `true`.

```shell
curl -X PATCH \
  https://platform.adobe.io/data/core/ups/segment/definitions/15063cb-2da8-4851-a2e2-bf59ddd2f004 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG_ID}' \
  -d '{
    "id": "15063cb-2da8-4851-a2e2-bf59ddd2f004",
    "schema": {
        "name": "_xdm.context.profile"
    },
    
    "sandbox": {
        "sandboxId": "{SANDBOX_ID}",
        "sandboxName": "{SANDBOX_NAME}",
        "type": "production",
        "default": true
    },
    "name": "TestStreaming1",
    "expression": {
        "type": "PQL",
        "format": "pql/json",
        "value": "select var1 from xEvent where var1._experience.analytics.endUser.firstWeb.webPageDetails.isHomePage = true"
    },
    "mergePolicyId": "50de2f9c-990c-4b96-945f-9570337ffe6d",
    "evaluationInfo": {
        "batch": {
            "enabled": false
        },
        "continuous": {
            "enabled": true
        },
        "synchronous": {
            "enabled": false
        }
    }
}'
```

#### Response

A successful response returns the details of the newly updated segment definition. 

```json
{
    "id": "15063cb-2da8-4851-a2e2-bf59ddd2f004",
    "schema": {
        "name": "_xdm.context.profile"
    },
    "ttlInDays": 30,
    "imsOrgId": "4A21D36B544916100A4C98A7@AdobeOrg",
    "sandbox": {
        "sandboxId": "{SANDBOX_ID}",
        "sandboxName": "{SANDBOX_NAME}",
        "type": "production",
        "default": true
    },
    "name": "TestStreaming1",
    "expression": {
        "type": "PQL",
        "format": "pql/text",
        "value": "select var1 from xEvent where var1._experience.analytics.endUser.firstWeb.webPageDetails.isHomePage = true"
    },
    "evaluationInfo": {
        "batch": {
            "enabled": false
        },
        "continuous": {
            "enabled": true
        },
        "synchronous": {
            "enabled": false
        }
    },
    "creationTime": 1572029711000,
    "updateEpoch": 1572029712000,
    "updateTime": 1572029712000
}

```


## Next steps

[rtcp]: ../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md
[seg-service]: ../../../../../end-user/markdown/segmentation_overview/segmentation.md
[xdm]: ../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md
[json-patch]: http://jsonpatch.com/