# Working with Data Usage Policies in Adobe Experience Platform

Data Usage Labeling and Enforcement (DULE) is at the core of the data governance infrastructure included in Adobe Experience Platform. If you have not yet done so, you may wish to begin by reviewing the [DULE User Guide](dule_overview.md) to familiarize yourself with the DULE framework.

Through a RESTful API, DULE enables the creation and management of data usage policies to determine what marketing actions can be taken against data that has been labelled with certain data usage labels.

The examples in this document will walk you through key operations you can perform using the DULE Policy Service API. This includes:

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

Using the API requires you to have an Adobe ID and access to Adobe Experience Platform. Follow the steps for [getting started](getting-started-with-dule-policy-service) to ensure you have all of the information that you need and an understanding of core concepts before attempting to make calls to the Policy Service API.

## Getting Started with DULE Policy Service

Before beginning to work with the Policy Service, data on Experience Platform must have appropriate DULE labels applied. Complete step-by-step instructions for applying data usage labels at the connection-, dataset-, and field-level can be found in the [Working with Data Labels](duel_working_with_labels.md) guide. 

### Authentication

Accessing the Policy Service API requires you to have access to Adobe Experience Platform. If you have not done so already, follow the tutorial for [Authenticating and accessing Experience Platform APIs](../../../api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).

Once complete, you should have the following values:

* `{ACCESS_TOKEN}`: Your specific Bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS Org credentials found in your unique Adobe Experience Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.

### Headers

Each of the API calls in this document requires you to send headers in your request. In general, each call requires three or four headers, depending on the type of request. All requests require the follow three headers, containing the values established during [authentication](#authentication):

* Authorization: Bearer {ACCESS_TOKEN}
* x-api-key: {API_KEY}
* x-gw-ims-org-id: {IMS_ORG}

Calls in which a payload (body) are sent will require a fourth header:

* Content-Type: application/json

The necessary headers for each operation are included in the sample CURL requests below.

### Core vs Custom Resources

Within the Policy Service API, all policies and marketing actions are referred to as either `core` or `custom` resources. 

The `core` resources are ones defined and maintained by Adobe, whereas `custom` resources are created and maintained by individual customers and are therefore unique and visible solely to the IMS organization that created them. As such, listing and lookup operations (`GET`) are the only operations permitted on `core` resources, whereas listing, lookup and update operations (`POST`, `PUT`, `PATCH`, and `DELETE`) are available for `custom` resources.

### Policy Status

Data usage policies can have one of three possible statuses: `DRAFT`, `ENABLED`, or `DISABLED`. 

By default, only "ENABLED" policies participate in policy evaluation. 

"DRAFT" policies can also be considered in policy evaluation, but only by setting the query parameter `?includeDraft=true`. More information on policy evaluation can be found in the [Policy Evaluation](#policy-evaluation) section at the end of this document.

### Marketing Action Names

Marketing Action Names are unique identifiers for marketing actions. Each `core` marketing action has a unique name that applies across all IMS Orgs. These names are defined and maintained by Adobe. Meanwhile, all customer-defined marketing actions (`custom` resources) are unique within your individual organization and are not visible or shared with other IMS Orgs. 

Steps for working with marketing actions in the Policy Service API are outlined in the [Marketing Actions](#marketing-actions) section later in this document.

## Sample API Calls

The following API calls provide examples of basic Policy Service operations, including listing resources (GET), looking up specific resources (GET), creating (POST) and updating (PUT) resources, and deleting resources. As noted previously, the only operations available on `core` resources are those to view (GET) a resource. You will not be able to alter (POST, PUT, DELETE) `core` resources.

## Policies

Data usage policies are rules that describe the kinds of marketing actions that you are allowed to, or restricted from, performing on data within Experience Platform.

The `/policies` endpoint is used for all API calls related to viewing, creating, updating, or deleting data usage policies.

### List All Policies

To view a list of policies, a GET request can be made to `/policies/core` or `/policies/custom` that returns all policies for the specified container. 

#### API Format

```SHELL
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

### Lookup Specific Policy

Each policy contains an `id` field that can be used to request the details of a specific policy. If the `id` of a policy is unknown, it can be found using the listing (GET) request to list all policies within a specific container (`core` or `custom`) as shown in the previous step.

#### API Format

```SHELL
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

### Create a Policy

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

#### API Format

```SHELL
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

### Update a Policy

You may find that you need to update a data usage policy after it has been created. This is done through a PUT request to the policy `id` with a payload that includes the updated form of the policy, in its entirety. In other words, the PUT request is essentially _rewriting_ the policy, therefore the body must include all required information as shown in the example below.

#### API Format

```SHELL
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

If the update is successful, you will receive an HTTP Status 200 (OK) and the response body will show the updated policy. The `id` should match the `id` sent in the request.

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

### Update a Portion of a Policy

A specific portion of a policy may be updated using a PATCH request. Unlike PUT requests that _rewrite_ the policy, PATCH requests update only the path specified in the request body. This is especially useful when you want to enable or disable a policy, as you need only send the specific path that you wish to update (`/status`) and its value (`ENABLE` or `DISABLE`). 

The Policy Service API currently supports "add", "replace", and "remove" PATCH operations, and allows you to combine several updates together into a single call by adding each as an object within the array, as shown in the following examples.

#### API Format

```SHELL
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

If successfully updated, you will receive an HTTP Status 200 (OK) and the response body will show the updated policy ("status" is now "ENABLED" and "description" has been changed). The policy `id` should match the `id` sent in the request.


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

### Delete a Policy

If you need to remove a policy that you have created, you can do so by issuing a DELETE request to the `id` of the policy you wish to delete. It is best practice to perform a lookup (GET) request first to view the policy and confirm it is the correct policy you wish to remove. **Once deleted, policies cannot be recovered.**

#### API Format

```SHELL
DELETE /policies/custom/{id}
```

#### Request

```SHELL
curl -X DELETE \
  https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c6ddb56eb60ca13dbf8b9a8 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
```

#### Response

If the policy has been successfully deleted, the response body will be blank with an HTTP Status 200 (OK). 

You can confirm the deletion by attempting to lookup (GET) the policy again. You should receive an HTTP Status 404 (Not Found) along with a "Not Found" error message because the policy has been removed.

## Marketing Actions

A marketing action, in the context of the data governance framework, is an action that an Experience Platform data consumer takes, for which there is a need to check for violations of data usage policies.

Working with marketing actions in the API requires you to use the `/marketingActions` endpoint.

### List All Marketing Actions

To view a list of all marketing actions, a GET request can be made to `/marketingActions/core` or `/marketingActions/custom` that returns all policies for the specified container.

#### API Format

```SHELL
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

### Lookup Specific Marketing Action

You can also perform a lookup (GET) request to view the details of a specific marketing action. This is done using the `name` of the marketing action. If the name is unknown, it can be found using the listing (GET) request shown previously.

#### API Format

```SHELL
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

### Create or Update a Marketing Action

The Policy Service API allows you to define your own marketing actions, as well as update existing ones. Creating and updating are both done using a PUT operation to the name of the marketing action. 

#### API Format

```SHELL
PUT /marketingActions/custom/{marketingActionName}
```

#### Request

In the request that follows, notice that the `name` in the request payload is the same as the `{marketingActionName}` in the API call. Unlike the `id` of a policy that is read-only and system-generated, creating a marketing action requires you to provide the _intended_ name of the marketing action as you create it. 

_**Note:**_ Failure to supply the `{marketingActionName}` in the call will result in a 405 Error (Method Not Allowed) as you are not permitted to perform a PUT to the `/marketingActions/custom` endpoint directly. Also, if the `name` in the payload doesn't match the `{marketingActionName}` in the path, you will receive a 400 Error (Bad Request).

```SHELL
curl -X PUT \
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
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

### Delete a Marketing Action

It is possible to delete marketing actions by sending a DELETE request to the `{marketingActionName}` of the marketing action you wish to remove. 

_**Note:**_ You are not able to delete marketing actions that are referenced by exiting policies. Trying to do so will result in a 400 Error (Bad Request) along with an error message that includes the `id` (or multiple IDs) of any policy (or policies) containing a reference to the marketing action you are trying to delete.

#### API Format

```SHELL
DELETE /marketingActions/custom/{marketingActionName}
```

#### Request

```SHELL
curl -X DELETE \
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
```

#### Response

If the marketing action has been successfully deleted, the response body will be blank with an HTTP Status 200 (OK). 

You can confirm the deletion by attempting to lookup (GET) the marketing action. You should receive an HTTP Status 404 (Not Found) along with a "Not Found" error message because the marketing action has been removed.

## Policy Evaluation

Once marketing actions have been created and policies have been defined, you can use the Policy Service API to evaluate if any policies are violated by certain actions. The returned constraints take the form of a set of policies that would be violated by attempting the marketing action.

By default, **only policies whose status is set to "ENABLED" participate in evaluation**, however you can use the query parameter `?includeDraft=true` to include "DRAFT" policies in evaluation.

Evaluation requests can be made in one of two ways:
1. Given a set of DULE labels and a marketing action, does the action violate any policies?
1. Given a dataset (and an optional subset of fields in the dataset) and a marketing action, does the action violate any policies?

### DULE Labels and Marketing Action

Evaluating policy violations based on the presence of DULE labels requires you to specify the set of labels that would be present on the data during the request. This is done through the use of query parameters, where DULE labels are provided as a comma-separated list of values, as shown in the following example.

_**Important Notes for Policy Evaluation using DULE labels:**_
* **DULE labels are case sensitive.** The request shown below returns a violated policy, whereas making the same request using lowercase DULE labels (e.g. `"c1,c3"`, `"C1,c3"`, `"c1,C3"`) does not.
* **Be aware of the `AND` and `OR` operators in your policy expressions.** In this example, if either DULE label (`C1` or `C3`) had appeared alone in the request, the marketing action would not have violated this policy. It takes both labels (`C1 AND C3`) being included in the request to return the violated policy. Ensure you are evaluating policies carefully and defining policy expressions with equal care.

#### API Format

```SHELL
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
```

#### Response

The response object includes a `duleLabels` array that should match the labels sent in the request. If performing the specified marketing action against the DULE labels violates a policy, the `violatedPolicies` array will contain the details of the policy (or policies) affected. If no policies are violated, the `violatedPolicies` array will appear empty (`[]`).

```JSON
{
    "timestamp": 1551134846737,
    "clientId": "string",
    "userId": "string",
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
            "createdClient": "{API_KEY}",
            "createdUser": "string",
            "updated": 1550714340335,
            "updatedClient": "{API_KEY}",
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

### Dataset ID and Marketing Action

You can also evaluate policy violations by specifying the ID of a dataset from which DULE labels can be collected.

In order to see the DULE labels associated with a given dataset, the Catalog Service API provides a `/dataSets/{id}/dule` operation. For more information, see the [Catalog Service API](../../../../acpdr/swagger-specs/catalog.yaml) reference documentation.

#### API Format

```SHELL
GET /marketingActions/core/{marketingActionName}/constraints?datasetId={datasetId}
GET /marketingActions/custom/{marketingActionName}/constraints?datasetId={datasetId}
```

#### Request

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting/constraints?dataSetId=5c423dc25f2f2e00005e2319' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

The response object includes a `dataSetId` which should match the ID of the dataset that you provided in the request. Also included is a `duleLabels` array that contains the full list of labels found on the dataset. This list includes connection-, dataset-, and field-level labels on all fields within the dataset.

If the specified marketing action violates a policy involving the `duleLabels` within the dataset, the `violatedPolicies` array will contain the details of the policy (or policies) affected. If no policies are violated, the `violatedPolicies` array will appear empty (`[]`).

```JSON
{
    "timestamp": 1551147116048,
    "clientId": "string",
    "userId": "string",
    "imsOrg": "{IMS_ORG}",
    "marketingActionRef": "https://platform.adobe.io/marketingActions/custom/crossSiteTargeting",
    "duleLabels": [
        "C2",
        "C5",
        "C4",
        "C6"
    ],
    "dataSetId": "5c423dc25f2f2e00005e2319",
    "violatedPolicies": [
        {
            "name": "Targeting Ads or Content",
            "status": "ENABLED",
            "marketingActionRefs": [
                "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting"
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
            "createdClient": "string",
            "createdUser": "string",
            "updated": 1551146178603,
            "updatedClient": "string",
            "updatedUser": "string",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c74895a74744d13dc2d87cc"
                }
            },
            "id": "5c74895a74744d13dc2d87cc"
        }
    ]
}
```

### Dataset ID, Fields, and Marketing Action

In addition to supplying a dataset ID, a sub-set of fields from within the dataset may also be specified, indicating that only the DULE labels on those fields should be evaluated. 

The Catalog Service API provides a `/dataSets/{id}/dule` operation to see the DULE labels associated with a dataset. For more information, see the [Catalog Service API](../../../../acpdr/swagger-specs/catalog.yaml) reference documentation.

_**Important Notes for Policy Evaluation using Datasets:**_
* **Field names are case sensitive.** If providing fields, they must be written exactly as they appear in the dataset. (e.g. `firstName` vs `firstname`)
* **Connection-, dataset-, and field-level labels.** DULE labels can be applied at multiple levels and are inherited downward. If your policy evaluations are not returning they way you thought they might, be sure to check the inherited labels in addition to those at the field-level.

#### API Format

In order to include dataset fields in the query parameter, the fields must be URL encoded, meaning `/properties/firstName` becomes `%2Fproperties%2FfirstName`. 

You may include multiple fields using a comma-separated list, being sure to include `%2Fproperties%2F` before each field, as shown in the example.

```SHELL
GET /marketingActions/core/{marketingActionName}/constraints?datasetId={datasetId}&fields=%2Fproperties%2F{field1},%2Fproperties%2F{field2}
GET /marketingActions/custom/{marketingActionName}/constraints?datasetId={datasetId}&fields=%2Fproperties%2F{field1},%2Fproperties%2F{field2}
```

#### Request

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting/constraints?dataSetId=5c423dc25f2f2e00005e2319&fields=%2Fproperties%2FemailAddress,%2Fproperties%2FfirstName' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

The response object includes `dataSetId` and `fields` attributes, the values of which should match the ID of the dataset and the optional sub-set of field(s) that were provided in the request. Also included is a `duleLabels` array that contains the list of labels found on the specified fields. Remember that this includes connection-, dataset-, and field-level labels as they are inherited down. 

If a policy is violated by performing the specified marketing action on the data in the provided fields, the `violatedPolicies` array will contain the details of the policy (or policies) affected. If no policies are violated, the `violatedPolicies` array will appear empty (`[]`).

```JSON
{
    "timestamp": 1551146287018,
    "clientId": "string",
    "userId": "string",
    "imsOrg": "{IMS_ORG}",
    "marketingActionRef": "https://platform.adobe.io/marketingActions/custom/crossSiteTargeting",
    "duleLabels": [
        "C4",
        "C6"
    ],
    "dataSetId": "5c423dc25f2f2e00005e2319",
    "fields": [
        "/properties/emailAddress",
        "/properties/firstName"
    ],
    "violatedPolicies": [
        {
            "name": "Targeting Ads or Content",
            "status": "ENABLED",
            "marketingActionRefs": [
                "https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/crossSiteTargeting"
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
            "createdClient": "string",
            "createdUser": "string",
            "updated": 1551146178603,
            "updatedClient": "string",
            "updatedUser": "string",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5c74895a74744d13dc2d87cc"
                }
            },
            "id": "5c74895a74744d13dc2d87cc"
        }
    ]
}
```

## Next Steps

Now that you have learned how to use the DULE Policy Service API, you can begin creating and evaluating data usage policies of your own. 

The DULE framework is an invaluable resource to help your organization ensure the proper use of data across Experience Platform. If used correctly, you will be able to perform marketing actions with confidence, knowing that data is being used properly and that no usage policies are being violated.