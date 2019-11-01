# DULE Policy Service developer guide

Data Usage Labeling and Enforcement (DULE) is the core mechanism of Adobe Experience Platform Data Governance. The DULE Policy Service provides a RESTful API that allows you to create and manage data usage policies to determine what marketing actions can be taken against data that has been labeled with certain data usage labels.

This document provides instructions for performing the key operations available in the Policy Service API. If you have not yet done so, please begin by reviewing the [Data Governance overview](dule_overview.md) to familiarize yourself with the DULE framework. For step-by-step instructions for creating and enforcing DULE policies, see the [DULE policy tutorial](../../tutorials/dule/create_a_dule_policy_tutorial.md).

This document provides instructions for performing the following operations using the Policy Service API:

* [Listing all available policies](#list-all-policies)
* [Performing a lookup for a specific policy](#lookup-specific-policy)
* [Creating a new policy](#create-a-policy)
* [Updating an existing policy](#update-a-policy)
* [Updating a portion of an existing policy](#update-a-portion-of-a-policy)
* [Deleting a policy](#delete-a-policy)
* [Listing all marketing actions](#list-all-marketing-actions)
* [Viewing a specific marketing action](#lookup-specific-marketing-action)
* [Creating and updating marketing actions](#create-or-update-a-marketing-action)
* [Deleting a marketing action](#delete-a-marketing-action)
* [Evaluating if any policies are violated by performing certain marketing actions](#policy-evaluation) 
* [Policy evaluation for Real-time Customer Profile](#policy-evaluation-for-real-time-customer-profile)

Using the API requires you to have an Adobe ID and access to Adobe Experience Platform. The information in the "getting started" section that follows will provide an understanding of core concepts you need to know before attempting to make calls to the Policy Service API.

## Getting started with DULE Policy Service

Before beginning to work with the Policy Service, data on Experience Platform must have appropriate DULE labels applied. Complete step-by-step instructions for applying data usage labels to datasets and fields can be found in the [DULE labels user guide](../../tutorials/dule/dule_working_with_labels.md). 

This guide requires a working understanding of the following components of Adobe Experience Platform:

* [Data Governance](dule_overview.md): The framework by which Experience Platform enforces data usage compliance.
    * [DULE labels](../../tutorials/dule/dule_working_with_labels.md): Data usage labels are applied to Experience Data Model (XDM) data fields, specifying restrictions for how that data can be accessed.
* [Experience Data Model (XDM) System](../schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Experience Platform organizes customer experience data.
* [Real-time Customer Profile](../unified_profile_architectural_overview/unified_profile_architectural_overview.md): Provides a unified, real-time consumer profile based on aggregated data from multiple sources.
* [Sandboxes](../sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully make calls to the Policy Service API.

### Reading sample API calls

This guide provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform, including those belonging to Data Governance, are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../sandboxes/sandboxes-overview.md). 

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

### Core vs custom resources

Within the Policy Service API, all policies and marketing actions are referred to as either `core` or `custom` resources. 

The `core` resources are ones defined and maintained by Adobe, whereas `custom` resources are created and maintained by individual customers and are therefore unique and visible solely to the IMS organization that created them. As such, listing and lookup operations (`GET`) are the only operations permitted on `core` resources, whereas listing, lookup and update operations (`POST`, `PUT`, `PATCH`, and `DELETE`) are available for `custom` resources.

### Policy status

Data usage policies can have one of three possible statuses: `DRAFT`, `ENABLED`, or `DISABLED`. 

By default, only "ENABLED" policies participate in policy evaluation. 

"DRAFT" policies can also be considered in policy evaluation, but only by setting the query parameter `?includeDraft=true`. More information on policy evaluation can be found in the [Policy Evaluation](#policy-evaluation) section at the end of this document.

### Marketing action names

Marketing action names are unique identifiers for marketing actions. Each `core` marketing action has a unique name that applies across all IMS Orgs. These names are defined and maintained by Adobe. Meanwhile, all customer-defined marketing actions (`custom` resources) are unique within your individual organization and are not visible or shared with other IMS Orgs. 

Steps for working with marketing actions in the Policy Service API are outlined in the [Marketing Actions](#marketing-actions) section later in this document.

## Sample API calls

The following API calls provide examples of basic Policy Service operations, including listing resources (GET), looking up specific resources (GET), creating (POST) and updating (PUT) resources, and deleting resources. As noted previously, the only operations available on `core` resources are those to view (GET) a resource. You will not be able to alter (POST, PUT, DELETE) `core` resources.

## Policies

Data usage policies are rules your organization adopts that describe the kinds of marketing actions that you are allowed to, or restricted from, performing on data within Experience Platform.

The `/policies` endpoint is used for all API calls related to viewing, creating, updating, or deleting data usage policies.

### List all policies

To view a list of policies, a GET request can be made to `/policies/core` or `/policies/custom` that returns all policies for the specified container. 

#### API format

```http
GET /policies/core
GET /policies/custom
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/dulepolicy/policies/custom \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

The response includes a "count" showing the total number of policies within the specified container, as well as the details of each policy including its `id`. The `id` field is used to perform lookup requests to view specific policies, as well as to perform update and delete operations.

```JSON
{
    "_page": {
        "start": "5c6dacdf685a4913dc48937c",
        "count": 2
    },
    "_links": {
        "page": {
            "href": "https://platform.adobe.io/policies/custom?{?limit,start,property}",
            "templated": true
        }
    },
    "children": [
        {
            "name": "Export Data to Third Party",
            "status": "DRAFT",
            "marketingActionRefs": [
                "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty"
            ],
            "description": "Conditions under which data cannot be exported to a third party",
            "deny": {
                "operator": "AND",
                "operands": [
                    {
                        "label": "C1"
                    },
                    {
                        "operator": "OR",
                        "operands": [
                            {
                                "label": "C3"
                            },
                            {
                                "label": "C7"
                            }
                        ]
                    }
                ]
            },
            "imsOrg": "{IMS_ORG}",
            "created": 1550691551888,
            "createdClient": "string",
            "createdUser": "string",
            "updated": 1550701472910,
            "updatedClient": "string",
            "updatedUser": "string",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6dacdf685a4913dc48937c"
                }
            },
            "id": "5c6dacdf685a4913dc48937c"
        },
        {
            "name": "Combine Data",
            "status": "ENABLED",
            "marketingActionRefs": [
                "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/combineData"
            ],
            "description": "Data that meets these conditions cannot be combined.",
            "deny": {
                "operator": "AND",
                "operands": [
                    {
                        "label": "C3"
                    },
                    {
                        "label": "I1"
                    }
                ]
            },
            "imsOrg": "{IMS_ORG}",
            "created": 1550703519823,
            "createdClient": "string",
            "createdUser": "string",
            "updated": 1550714340335,
            "updatedClient": "string",
            "updatedUser": "string",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6ddb9f5c404513dc2dc454"
                }
            },
            "id": "5c6ddb9f5c404513dc2dc454"
        }
    ]
}
```

### Lookup specific policy

Each policy contains an `id` field that can be used to request the details of a specific policy. If the `id` of a policy is unknown, it can be found using the listing (GET) request to list all policies within a specific container (`core` or `custom`) as shown in the previous step.

#### API format

```http
GET /policies/core/{id}
GET /policies/custom/{id}
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6dacdf685a4913dc48937c \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

The response contains the details of the policy, including key fields such as `id` (this field should match the `id` sent in the request), `name`, `status`, and `description`, as well as a reference link to the marketing action upon which the policy is based (`marketingActionRefs`).

```JSON
{
    "name": "Export Data to Third Party",
    "status": "DRAFT",
    "marketingActionRefs": [
        "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty"
    ],
    "description": "Conditions under which data cannot be exported to a third party",
    "deny": {
        "operator": "AND",
        "operands": [
            {
                "label": "C1"
            },
            {
                "operator": "OR",
                "operands": [
                    {
                        "label": "C3"
                    },
                    {
                        "label": "C7"
                    }
                ]
            }
        ]
    },
    "imsOrg": "{IMS_ORG}",
    "created": 1550691551888,
    "createdClient": "string",
    "createdUser": "string",
    "updated": 1550701472910,
    "updatedClient": "string",
    "updatedUser": "string",
    "_links": {
        "self": {
            "href": "https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6dacdf685a4913dc48937c"
        }
    },
    "id": "5c6dacdf685a4913dc48937c"
}
```

### Create a policy

Creating a policy requires the inclusion of a marketing action with an expression of the DULE labels that prohibit that marketing action. Policy definitions must include a `deny` property, which is a boolean expression regarding the presence of DULE labels. 

This expression is called a `PolicyExpression` and is an object containing _either_ a label _or_ an operator and operands, but not both. In turn, each operand is also a `PolicyExpression` object. For example, a policy regarding the export of data to a third party might be prohibited if `C1 OR (C3 AND C7)` labels are present. This expression would be specified as:

```JSON
"deny": {
  "operator": "OR",
  "operands": [
    {"label": "C1"},
    {
      "operator": "AND",
      "operands": [
        {"label": "C3"},
        {"label": "C7"}
      ]
    }
  ]
}
```

#### API format

```http
POST /policies/custom
```

#### Request

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/dulepolicy/policies/custom \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "name": "Export Data to Third Party",
        "status": "DRAFT",
        "marketingActionRefs": [
          "../marketingActions/custom/exportToThirdParty"
        ],
        "description": "Conditions under which data cannot be exported to a third party",
        "deny": {
          "operator": "OR",
          "operands": [
            {"label": "C1"},
            {
              "operator": "AND",
              "operands": [
                {"label": "C3"},
                {"label": "C7"}
              ]
            }
          ]
        }
      }'
```

#### Response

If successfully created, you will receive an HTTP Status 201 (Created) and the response body will contain the details of the newly created policy, including its `id`. This value is read-only and is assigned automatically when the policy is created.

```JSON
{
    "name": "Export Data to Third Party",
    "status": "DRAFT",
    "marketingActionRefs": [
        "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty"
    ],
    "description": "Conditions under which data cannot be exported to a third party",
    "deny": {
        "operator": "OR",
        "operands": [
            {
                "label": "C1"
            },
            {
                "operator": "AND",
                "operands": [
                    {
                        "label": "C3"
                    },
                    {
                        "label": "C7"
                    }
                ]
            }
        ]
    },
    "imsOrg": "{IMS_ORG}",
    "created": 1550691551888,
    "createdClient": "string",
    "createdUser": "string",
    "updated": 1550691551888,
    "updatedClient": "string",
    "updatedUser": "string",
    "_links": {
        "self": {
            "href": "https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6dacdf685a4913dc48937c"
        }
    },
    "id": "5c6dacdf685a4913dc48937c"
}
```

### Update a policy

You may find that you need to update a data usage policy after it has been created. This is done through a PUT request to the policy `id` with a payload that includes the updated form of the policy, in its entirety. In other words, the PUT request is essentially _rewriting_ the policy, therefore the body must include all required information as shown in the example below.

#### API format

```http
PUT /policies/custom/{id}
```

#### Request

In this example, the conditions for exporting data to a third party have changed, and now you require the policy that you created to deny this marketing action if `C1 AND (C3 OR C7)` data labels are present. You would use the following call to update the existing policy.

```SHELL
curl -X PUT \
  https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6dacdf685a4913dc48937c \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "name": "Export Data to Third Party",
        "status": "DRAFT",
        "marketingActionRefs": [
          "../marketingActions/custom/exportToThirdParty"
        ],
        "description": "Conditions under which data cannot be exported to a third party",
        "deny": {
          "operator": "AND",
          "operands": [
            {"label": "C1"},
            {
              "operator": "OR",
              "operands": [
                {"label": "C3"},
                {"label": "C7"}
              ]
            }
          ]
        }
      }'
```

#### Response

A successful update request returns an HTTP Status 200 (OK) and the response body will show the updated policy. The `id` should match the `id` sent in the request.

```JSON
{
    "name": "Export Data to Third Party",
    "status": "DRAFT",
    "marketingActionRefs": [
        "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/core/exportToThirdParty"
    ],
    "description": "Conditions under which data cannot be exported to a third party",
    "deny": {
        "operator": "AND",
        "operands": [
            {
                "label": "C1"
            },
            {
                "operator": "OR",
                "operands": [
                    {
                        "label": "C3"
                    },
                    {
                        "label": "C7"
                    }
                ]
            }
        ]
    },
    "imsOrg": "{IMS_ORG}",
    "created": 1550691551888,
    "createdClient": "string",
    "createdUser": "string",
    "updated": 1550701472910,
    "updatedClient": "string",
    "updatedUser": "string",
    "_links": {
        "self": {
            "href": "https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6dacdf685a4913dc48937c"
        }
    },
    "id": "5c6dacdf685a4913dc48937c"
}
```

### Update a portion of a policy

A specific portion of a policy may be updated using a PATCH request. Unlike PUT requests that _rewrite_ the policy, PATCH requests update only the path specified in the request body. This is especially useful when you want to enable or disable a policy, as you need only send the specific path that you wish to update (`/status`) and its value (`ENABLE` or `DISABLE`). 

The Policy Service API currently supports "add", "replace", and "remove" PATCH operations, and allows you to combine several updates together into a single call by adding each as an object within the array, as shown in the following examples.

#### API format

```http
PATCH /policies/custom/{id}
```

#### Request

In this example, we are using the "replace" operation to change the policy status from "DRAFT" to "ENABLED" and to update the description field with a new description. We could have also updated the description field by using the "delete" operation to remove the policy description and then using the "add" operation to add a new once, like so:

```SHELL
[
    {
        "op": "remove",
        "path": "/description"
    },
    {
        "op": "add",
        "path": "/description",
        "value": "New policy description."
    }
]
```

When sending multiple PATCH operations in a single request, remember that they will be processed in the order in which they appear in the array, so ensure that you are sending the requests in the correct order where necessary.

```SHELL
curl -X PATCH \
  https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6dacdf685a4913dc48937c \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d ' [
          {
            "op": "replace",
            "path": "/status",
            "value": "ENABLED"
          },
          {
            "op": "replace",
            "path": "/description",
            "value": "New policy description."
          }
        ]'
```

#### Response

A successful update request will return an HTTP Status 200 (OK) and the response body will show the updated policy ("status" is now "ENABLED" and "description" has been changed). The policy `id` should match the `id` sent in the request.


```JSON
{
    "name": "Export Data to Third Party",
    "status": "ENABLED",
    "marketingActionRefs": [
        "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty"
    ],
    "description": "New policy description.",
    "deny": {
        "operator": "AND",
        "operands": [
            {
                "label": "C1"
            },
            {
                "operator": "OR",
                "operands": [
                    {
                        "label": "C3"
                    },
                    {
                        "label": "C7"
                    }
                ]
            }
        ]
    },
    "imsOrg": "{IMS_ORG}",
    "created": 1550703519823,
    "createdClient": "string",
    "createdUser": "string",
    "updated": 1550712163182,
    "updatedClient": "string",
    "updatedUser": "string",
    "_links": {
        "self": {
            "href": "https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6dacdf685a4913dc48937c"
        }
    },
    "id": "5c6dacdf685a4913dc48937c"
}
```

### Delete a policy

If you need to remove a policy that you have created, you can do so by issuing a DELETE request to the `id` of the policy you wish to delete. It is best practice to perform a lookup (GET) request first to view the policy and confirm it is the correct policy you wish to remove. **Once deleted, policies cannot be recovered.**

#### API format

```http
DELETE /policies/custom/{id}
```

#### Request

```SHELL
curl -X DELETE \
  https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6ddb56eb60ca13dbf8b9a8 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

If the policy has been successfully deleted, the response body will be blank with an HTTP Status 200 (OK). 

You can confirm the deletion by attempting to lookup (GET) the policy again. You should receive an HTTP Status 404 (Not Found) along with a "Not Found" error message because the policy has been removed.

## Marketing actions

A marketing action, in the context of the data governance framework, is an action that an Experience Platform data consumer takes, for which there is a need to check for violations of data usage policies.

Working with marketing actions in the API requires you to use the `/marketingActions` endpoint.

### List all marketing actions

To view a list of all marketing actions, a GET request can be made to `/marketingActions/core` or `/marketingActions/custom` that returns all policies for the specified container.

#### API format

```http
GET /marketingActions/core
GET /marketingActions/custom
```

#### Request

The following request will return a list of all custom marketing actions defined by the IMS Organization. 

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

The response object provides the total number of marketing actions in the container (`count`) and the `children` array contains the details for each marketing action, including the `name` and an `href` for the marketing action. This path (`_links.self.href`) is used to complete the `marketingActionsRefs` array when [creating a data usage policy](#create-a-policy).

```JSON
{
    "_page": {
        "start": "sampleMarketingAction",
        "count": 2
    },
    "_links": {
        "page": {
            "href": "https://platform.adobe.io/marketingActions/custom?{?limit,start,property}",
            "templated": true
        }
    },
    "children": [
        {
            "name": "sampleMarketingAction",
            "description": "Marketing Action description.",
            "imsOrg": "{IMS_ORG}",
            "created": 1550714012088,
            "createdClient": "string",
            "createdUser": "string",
            "updated": 1550714012088,
            "updatedClient": "string",
            "updatedUser": "string",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/sampleMarketingAction"
                }
            }
        },
        {
            "name": "newMarketingAction",
            "description": "Another marketing action.",
            "imsOrg": "{IMS_ORG}",
            "created": 1550793833224,
            "createdClient": "string",
            "createdUser": "string",
            "updated": 1550793833224,
            "updatedClient": "string",
            "updatedUser": "string",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/newMarketingAction"
                }
            }
        }
    ]
}
```

### Lookup specific marketing action

You can also perform a lookup (GET) request to view the details of a specific marketing action. This is done using the `name` of the marketing action. If the name is unknown, it can be found using the listing (GET) request shown previously.

#### API format

```http
GET /marketingActions/core/{marketingActionName}
GET /marketingActions/custom/{marketingActionName}
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/combineData \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

The response object contains the details for the marketing action, including the path (`_links.self.href`) needed to reference the marketing action when defining a data usage policy (`marketingActionsRefs`).

```JSON
{
    "name": "combineData",
    "description": "Combine multiple data sources together.",
    "imsOrg": "{IMS_ORG}",
    "created": 1550793805590,
    "createdClient": "string",
    "createdUser": "string",
    "updated": 1550793805590,
    "updatedClient": "string",
    "updatedUser": "string",
    "_links": {
        "self": {
            "href": "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/combineData"
        }
    }
}
```

### Create or update a marketing action

The Policy Service API allows you to define your own marketing actions, as well as update existing ones. Creating and updating are both done using a PUT operation to the name of the marketing action. 

#### API format

```http
PUT /marketingActions/custom/{marketingActionName}
```

#### Request

In the request that follows, notice that the `name` in the request payload is the same as the `{marketingActionName}` in the API call. Unlike the `id` of a policy that is read-only and system-generated, creating a marketing action requires you to provide the _intended_ name of the marketing action as you create it. 

> **Note:** Failure to supply the `{marketingActionName}` in the call will result in a 405 Error (Method Not Allowed) as you are not permitted to perform a PUT to the `/marketingActions/custom` endpoint directly. Also, if the `name` in the payload doesn't match the `{marketingActionName}` in the path, you will receive a 400 Error (Bad Request).

```SHELL
curl -X PUT \
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "name": "crossSiteTargeting",
        "description": "Perform targeting on information obtained across multiple web sites."
      }'
```

#### Response

If successfully created, you will receive an HTTP Status 201 (Created) and the response body will contain the details of the newly created marketing action. The `name` in the response should match what was sent in the request.

```JSON
{
    "name": "crossSiteTargeting",
    "description": "Perform targeting on information obtained across multiple web sites.",
    "imsOrg": "{IMS_ORG}",
    "created": 1550713341915,
    "createdClient": "string",
    "createdUser": "string",
    "updated": 1550713856390,
    "updatedClient": "string",
    "updatedUser": "string",
    "_links": {
        "self": {
            "href": "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting"
        }
    }
}
```

### Delete a marketing action

It is possible to delete marketing actions by sending a DELETE request to the `{marketingActionName}` of the marketing action you wish to remove. 

> **Note:** You are not able to delete marketing actions that are referenced by exiting policies. Trying to do so will result in a 400 Error (Bad Request) along with an error message that includes the `id` (or multiple IDs) of any policy (or policies) containing a reference to the marketing action you are trying to delete.

#### API format

```http
DELETE /marketingActions/custom/{marketingActionName}
```

#### Request

```SHELL
curl -X DELETE \
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

If the marketing action has been successfully deleted, the response body will be blank with an HTTP Status 200 (OK). 

You can confirm the deletion by attempting to lookup (GET) the marketing action. You should receive an HTTP Status 404 (Not Found) along with a "Not Found" error message because the marketing action has been removed.

## Policy evaluation

Once marketing actions have been created and policies have been defined, you can use the Policy Service API to evaluate if any policies are violated by certain actions. The returned constraints take the form of a set of policies that would be violated by attempting the marketing action on the specified data containing DULE labels.

By default, **only policies whose status is set to "ENABLED" participate in evaluation**, however you can use the query parameter `?includeDraft=true` to include "DRAFT" policies in evaluation.

Evaluation requests can be made in one of three ways:
1. Given a set of DULE labels and a marketing action, does the action violate any policies?
1. Given one or more datasets and a marketing action, does the action violate any policies?
1. Given one or more datasets and a subset of one or more fields within each of those datasets, does the action violate any policies?

### Evaluate policies using DULE labels and a marketing action

Evaluating policy violations based on the presence of DULE labels requires you to specify the set of labels that would be present on the data during the request. This is done through the use of query parameters, where DULE labels are provided as a comma-separated list of values, as shown in the following example.

#### API format

```http
GET /marketingActions/core/{marketingActionName}/constraints?duleLabels={value1},{value2}
GET /marketingActions/custom/{marketingActionName}/constraints?duleLabels={value1},{value2}
```

#### Request

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/sampleMarketingAction/constraints?duleLabels=C1,C3' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

_**Important information for policy evaluation using DULE labels:**_
* **DULE labels are case sensitive.** The request shown above returns a violated policy, whereas making the same request using lowercase DULE labels (e.g. `"c1,c3"`, `"C1,c3"`, `"c1,C3"`) does not.
* **Be aware of the `AND` and `OR` operators in your policy expressions.** In this example, if either DULE label (`C1` or `C3`) had appeared alone in the request, the marketing action would not have violated this policy. It takes both labels (`C1 AND C3`) to return the violated policy. Ensure you are evaluating policies carefully and defining policy expressions with equal care.

#### Response

The response object includes a `duleLabels` array that should match the labels sent in the request. If performing the specified marketing action against the DULE labels violates a policy, the `violatedPolicies` array will contain the details of the policy (or policies) affected. If no policies are violated, the `violatedPolicies` array will appear empty (`[]`).

```JSON
{
    "timestamp": 1551134846737,
    "clientId": "{CLIENT_ID}",
    "userId": "{USER_ID}",
    "imsOrg": "{IMS_ORG}",
    "marketingActionRef": "https://platform.adobe.io/marketingActions/custom/sampleMarketingAction",
    "duleLabels": [
        "C1",
        "C3"
    ],
    "violatedPolicies": [
        {
            "name": "Export Data to Third Party",
            "status": "ENABLED",
            "marketingActionRefs": [
                "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/sampleMarketingAction"
            ],
            "description": "NEW content for description.",
            "deny": {
                "operator": "AND",
                "operands": [
                    {
                        "label": "C1"
                    },
                    {
                        "operator": "OR",
                        "operands": [
                            {
                                "label": "C3"
                            },
                            {
                                "label": "C7"
                            }
                        ]
                    }
                ]
            },
            "imsOrg": "{IMS_ORG}",
            "created": 1550703519823,
            "createdClient": "{CREATED_CLIENT}",
            "createdUser": "{CREATED_USER}",
            "updated": 1550714340335,
            "updatedClient": "{UPDATED_CLIENT}",
            "updatedUser": "{UPDATED_USER}",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6ddb9f5c404513dc2dc454"
                }
            },
            "id": "5c6ddb9f5c404513dc2dc454"
        }
    ]
}
```

### Evaluate policies using datasets and a marketing action

You can also evaluate policy violations by specifying the ID of one or more datasets from which DULE labels can be collected. This is done by performing a POST request to either the core or custom `/constraints` endpoint for a marketing action and specifying dataset IDs within the request body, as shown below.

#### API format

```http
POST /marketingActions/core/{marketingActionName}/constraints
POST /marketingActions/custom/{marketingActionName}/constraints
```

#### Request

The request body contains an array with an object for each dataset ID. Since you are sending a request body, the "Content-Type: application/json" request header is required, as shown in the following example.

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting/constraints \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '[
        {
            "entityType": "dataSet",
            "entityId": "5c423dc25f2f2e00005e2319"
        },
        {
            "entityType": "dataSet",
            "entityId": "5cc323e15410ef14b749481e"
        },
        {
            "entityType": "dataSet",
            "entityId": "5cc1fb685410ef14b748c55f"
        }
      ]'
```

#### Response

The response object includes a `duleLabels` array that contains a consolidated list of all labels found within the specified datasets. This list includes dataset- and field-level labels on all fields within the dataset.

The response also includes a `discoveredLabels` array containing objects for each dataset, showing `datasetLabels` broken down into dataset- and field-level labels. Each field-level label shows the path to the specific field with that label.

If the specified marketing action violates a policy involving the `duleLabels` within the datasets, the `violatedPolicies` array will contain the details of the policy (or policies) affected. If no policies are violated, the `violatedPolicies` array will appear empty (`[]`).

```JSON
{
    "timestamp": 1556324277895,
    "clientId": "{CLIENT_ID}",
    "userId": "{USER_ID}",
    "imsOrg": "{IMS_ORG}",
    "marketingActionRef": "https://platform.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting",
    "duleLabels": [
        "C1",
        "C2",
        "C4",
        "C5",
        "C6"
    ],
    "discoveredLabels": [
        {
            "entityType": "dataSet",
            "entityId": "5c423dc25f2f2e00005e2319",
            "dataSetLabels": {
                "connection": {
                    "labels": []
                },
                "dataSet": {
                    "labels": [
                        "C6"
                    ]
                },
                "fields": [
                    {
                        "labels": [
                            "C2",
                            "C5"
                        ],
                        "path": "/properties/_customer"
                    },
                    {
                        "labels": [
                            "C4",
                            "C5"
                        ],
                        "path": "/properties/geoUnit"
                    },
                    {
                        "labels": [
                            "C4"
                        ],
                        "path": "/properties/identityMap"
                    },
                    {
                        "labels": [
                            "C4"
                        ],
                        "path": "/properties/journeyAI"
                    },
                    {
                        "labels": [
                            "C5"
                        ],
                        "path": "/properties/createdByBatchID"
                    },
                    {
                        "labels": [
                            "C5"
                        ],
                        "path": "/properties/faxPhone"
                    }
                ]
            }
        },
        {
            "entityType": "dataSet",
            "entityId": "5cc323e15410ef14b749481e",
            "dataSetLabels": {
                "connection": {
                    "labels": []
                },
                "dataSet": {
                    "labels": [
                        "C5"
                    ]
                },
                "fields": [
                    {
                        "labels": [
                            "C2",
                        ],
                        "path": "/properties/_customer"
                    },
                    {
                        "labels": [
                            "C5"
                        ],
                        "path": "/properties/geoUnit"
                    },
                    {
                        "labels": [
                            "C1"
                        ],
                        "path": "/properties/identityMap"
                    }
                ]
            }
        },
        {
            "entityType": "dataSet",
            "entityId": "5cc1fb685410ef14b748c55f",
            "dataSetLabels": {
                "connection": {
                    "labels": []
                },
                "dataSet": {
                    "labels": [
                        "C5"
                    ]
                },
                "fields": [
                    {
                        "labels": [
                            "C5"
                        ],
                        "path": "/properties/createdByBatchID"
                    },
                    {
                        "labels": [
                            "C5"
                        ],
                        "path": "/properties/faxPhone"
                    }
                ]
            }
        }
    ],
    "violatedPolicies": [
        {
            "name": "Targeting Ads or Content",
            "status": "ENABLED",
            "marketingActionRefs": [
                "https://platform.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting"
            ],
            "description": "Data cannot be used for targeting any ads or content, either on-site or cross-site.",
            "deny": {
                "operator": "AND",
                "operands": [
                    {
                        "label": "C4"
                    },
                    {
                        "label": "C6"
                    }
                ]
            },
            "imsOrg": "{IMS_ORG}",
            "created": 1551141210463,
            "createdClient": "{CREATED_CLIENT}",
            "createdUser": "{CREATED_USER}",
            "updated": 1551146178603,
            "updatedClient": "{UPDATED_CLIENT}",
            "updatedUser": "{UPDATED_USER}",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io:443/data/foundation/dulepolicy/policies/custom/5c74895a74744d13dc2d87cc"
                }
            },
            "id": "5c74895a74744d13dc2d87cc"
        }
    ]
}
```

### Evaluate policies using datasets, fields, and a marketing action

In addition to supplying one or more dataset IDs, a subset of fields from within each dataset may also be specified, indicating that only the DULE labels on those fields should be evaluated. Similar to the POST request involving only datasets, this request adds specific fields for each dataset to the request body.

_**Important information for policy evaluation using dataset fields:**_
* **Field names are case sensitive.** When providing fields, they must be written exactly as they appear in the dataset. (e.g. `firstName` vs `firstname`)
* **Dataset label inheritance.** DULE labels can be applied at multiple levels and are inherited downward. If your policy evaluations are not returning the way you thought they might, be sure to check the inherited labels from datasets down to fields in addition to those applied at the field level.

#### API format

```http
POST /marketingActions/core/{marketingActionName}/constraints
POST /marketingActions/custom/{marketingActionName}/constraints
```

#### Request

The request body contains an array with an object for each dataset ID and the subset of fields within that dataset that should be used for evaluation. Since you are sending a request body, the "Content-Type: application/json" request header is required, as shown in the following example. 

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting/constraints \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '[
        {
            "entityType": "dataSet",
            "entityId": "5c423dc25f2f2e00005e2319",
            "entityMeta": {
                "fields": [
                    "/properties/_customer",
                    "/properties/faxPhone"
                ]
            }
        },
        {
            "entityType": "dataSet",
            "entityId": "5cc323e15410ef14b749481e",
            "entityMeta": {
                "fields": [
                    "/properties/_customer",
                    "/properties/geoUnit"
                ]
            }
        },
        {
            "entityType": "dataSet",
            "entityId": "5cc1fb685410ef14b748c55f",
            "entityMeta": {
                "fields": [
                    "/properties/faxPhone"
                ]
            }
        }
      ]'
```

#### Response

The response object includes a `duleLabels` array that contains the consolidated list of labels found on the specified fields. Remember that this includes dataset labels as well, as they are inherited down to fields. 

If a policy is violated by performing the specified marketing action on the data in the provided fields, the `violatedPolicies` array will contain the details of the policy (or policies) affected. If no policies are violated, the `violatedPolicies` array will appear empty (`[]`).

In the response below, you can see that the list of `duleLabels` is now shorter, as is the `discoveredLabels` for each dataset as it only includes the fields specified in the request body. You will also notice that the previously violated policy, "Targeting Ads or Content", required both `C4 AND C6` labels, so it is therefore no longer violated and the `violatedPolicies` array appears empty.

```JSON
{
    "timestamp": 1556325503038,
    "clientId": "{CLIENT_ID}",
    "userId": "{USER_ID}",
    "imsOrg": "{IMS_ORG}",
    "marketingActionRef": "https://platform.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting",
    "duleLabels": [
        "C2",
        "C5",
        "C6"
    ],
    "discoveredLabels": [
        {
            "entityType": "dataSet",
            "entityId": "5c423dc25f2f2e00005e2319",
            "dataSetLabels": {
                "connection": {
                    "labels": []
                },
                "dataSet": {
                    "labels": [
                        "C6"
                    ]
                },
                "fields": [
                    {
                        "labels": [
                            "C2",
                            "C5"
                        ],
                        "path": "/properties/_customer"
                    },
                    {
                        "labels": [
                            "C5"
                        ],
                        "path": "/properties/faxPhone"
                    }
                ]
            }
        },
        {
            "entityType": "dataSet",
            "entityId": "5cc323e15410ef14b749481e",
            "dataSetLabels": {
                "connection": {
                    "labels": []
                },
                "dataSet": {
                    "labels": [
                        "C5"
                    ]
                },
                "fields": [
                    {
                        "labels": [
                            "C2",
                            "C5"
                        ],
                        "path": "/properties/_customer"
                    },
                    {
                        "labels": [
                            "C5"
                        ],
                        "path": "/properties/geoUnit"
                    }
                ]
            }
        },
        {
            "entityType": "dataSet",
            "entityId": "5cc1fb685410ef14b748c55f",
            "dataSetLabels": {
                "connection": {
                    "labels": []
                },
                "dataSet": {
                    "labels": [
                        "C5"
                    ]
                },
                "fields": [
                    {
                        "labels": [
                            "C5"
                        ],
                        "path": "/properties/faxPhone"
                    }
                ]
            }
        }
    ],
    "violatedPolicies": []
}
```


## Policy evaluation for Real-time Customer Profile

The Policy Service API can also be used to check for policy violations involving the use of Real-time Customer Profile segments. See the tutorial on [enforcing data usage compliance for audience segments](../../tutorials/dule/data_governance_and_segmentation.md) for more information.

## Next steps

Now that you have learned how to use the DULE Policy Service API, you can begin creating and evaluating data usage policies of your own. 

The DULE framework is an invaluable resource to help your organization ensure the proper use of data across Experience Platform. If used correctly, you will be able to perform marketing actions with confidence, knowing that data is being used properly and that no usage policies are being violated.