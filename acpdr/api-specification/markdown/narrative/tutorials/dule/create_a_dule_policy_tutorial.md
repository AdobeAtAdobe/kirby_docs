# Create and evaluate a DULE policy using the Policy Service API

Data Usage Labeling and Enforcement (DULE) is the core mechanism of Adobe Experience Platform Data Governance. The [DULE Policy Service API](../../../../../../dule-policy-service.yaml) allows you to create and manage DULE policies to determine what marketing actions can be taken against data that contains certain DULE labels.

This document provides a step-by-step tutorial for creating a DULE policy and using it to evaluate a marketing action for policy violations. For a more comprehensive guide to the different operations available in the Policy Service API, see the [Policy Service developer guide](../../technical_overview/data_governance/dule_policy_service_developer_guide.md).

The tutorial covers the following steps:
1. [Define a marketing action](#define-a-marketing-action)
1. [Create a DULE policy](#create-a-dule-policy) for that marketing action
1. *(Optional)* [Enable the DULE policy](#enable-the-dule-policy)
1. [Evaluate the DULE policy](#evaluate-the-dule-policy)

## Getting started

This tutorial requires a working understanding of the following key concepts involved in creating and evaluating DULE policies:

* [Data Governance](../../technical_overview/data_governance/dule_overview.md) &ndash; The framework by which Platform enforces data usage compliance.
* [Experience Data Model (XDM)](../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md) &ndash; The standardized framework by which Platform organizes customer experience data.
* [DULE labels](dule_working_with_labels.md) &ndash; Data usage labels are applied to XDM data fields, specifying restrictions for how that data can be accessed.
* [Sandboxes](../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully make calls to the Policy Service API.

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../../technical_overview/platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform, including those belonging to Data Governance, are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

* x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../../technical_overview/sandboxes/sandboxes-overview.md). 

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

## Define a marketing action

In the Data Governance framework, a marketing action is an action that an Experience Platform data consumer takes, for which there is a need to check for violations of data usage policies.

The first step in creating a DULE policy is to determine what marketing action the policy will evaluate. This can be done using one of the following options:

* [Lookup an existing marketing action](#lookup-an-existing-marketing-action)
* [Create a new marketing action](#create-a-new-marketing-action)

### Lookup an existing marketing action

You can lookup existing marketing actions to be evaluated by your DULE policy by making a GET request to one of the `/marketingActions` endpoints.

#### API format

Depending on whether you are looking up a marketing action provided by Experience Platform or a custom marketing action created by your organization, use the `marketingActions/core` or `marketingActions/custom` endpoints, respectively.

```http
GET /marketingActions/core
GET /marketingActions/custom
```

#### Request

The following request uses the `marketingActions/custom` endpoint, which fetches a list of all marketing actions defined by your IMS Organization.

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the total number of marketing actions found (`count`) and lists the details of the marketing actions themselves within the `children` array.

```json
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
            "createdClient": "{CREATED_CLIENT}",
            "createdUser": "{CREATED_USER}",
            "updated": 1550714012088,
            "updatedClient": "{UPDATED_CLIENT}",
            "updatedUser": "{UPDATED_USER}",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/sampleMarketingAction"
                }
            }
        },
        {
            "name": "newMarketingAction",
            "description": "Another marketing action.",
            "imsOrg": "{IMS_ORG}",
            "created": 1550793833224,
            "createdClient": "{CREATED_CLIENT}",
            "createdUser": "{CREATED_USER}",
            "updated": 1550793833224,
            "updatedClient": "{UPDATED_CLIENT}",
            "updatedUser": "{UPDATED_USER}",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/newMarketingAction"
                }
            }
        }
    ]
}
```
* `children > _links > self > href`: The URL ID for a listed marketing action. 

When you find the marketing action that you want to use, record the value of its `href` property. This value is used during the next step of [creating a DULE policy](#create-a-dule-policy).

### Create a new marketing action

You can create a new marketing action by making a PUT request to the `/marketingActions/custom/` endpoint and providing a name for the marketing action at the end of the request path.

#### API format

```http
PUT /marketingActions/custom/{MARKETING_ACTION_NAME}
```
* `{MARKETING_ACTION_NAME}`: The name of the new marketing action you want to create. This name acts as the marketing action's primary identifier and therefore must be unique. Best practice is to give the marketing action a name that is descriptive but concise.

#### Request

The following request creates a new custom marketing action called `exportToThirdParty`. Notice that the `name` in the request payload is the same as the name provided in the request path.

```shell
curl -X PUT \  
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'Content-Type: application/json' \
  -d '{
      "name": "exportToThirdParty",
      "description": "Export data to a third party"
    }'
```
* `name`: The name of the marketing action you want to create. This name must match the name provided in the request path or a 400 (Bad Request) error will occur.
* `description`: A human-readable description of the marketing action.

#### Response

A successful response returns HTTP status 201 (Created) and the details of the newly created marketing action.

```json
{
    "name": "exportToThirdParty",
    "description": "Export data to a third party",
    "imsOrg": "{IMS_ORG}",
    "created": 1550713341915,
    "createdClient": "{CREATED_CLIENT}",
    "createdUser": "{CREATED_USER",
    "updated": 1550713856390,
    "updatedClient": "{UPDATED_CLIENT}",
    "updatedUser": "{UPDATED_USER}",
    "_links": {
        "self": {
            "href": "https://platform.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty"
        }
    }
}
```
* `_links > self > href`: The URL ID of the marketing action.

Record the URL ID of the newly created marketing action, as it will be used in the next step of creating a DULE policy.

## Create a DULE policy

Creating a new policy requires you to provide the URL ID of a marketing action with an expression of the DULE labels that prohibit that marketing action. 

This expression is called a **policy expression** and is an object containing either (A) a DULE label, or (B) an operator and operands, but not both. In turn, each operand is also a policy expression object. For example, a policy regarding the export of data to a third party might be prohibited if `C1 OR (C3 AND C7)` labels are present. This expression would be specified as:

```json
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
}
```

> **Note:** Only OR and AND operators are supported.

Once you have configured your policy expression, you can create a new DULE policy by making a POST request to the `/policies/custom` endpoint.

#### API format

```http
POST /policies/custom
```

#### Request

The following request creates a DULE policy called "Export Data to Third Party" by providing a marketing action and policy expression in the request payload.

```shell
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
* `marketingActionRefs`: An array containing the `href` value of a marketing action, obtained in the [previous step](#define-a-marketing-action). While the above example lists only one marketing action, multiple actions can also be provided.
* `deny`: The policy expression object. Defines the DULE labels and conditions that would cause the policy to reject the marketing action referenced in `marketingActionRefs`.

#### Response

A successful response returns HTTP status 201 (Created) and the details of the newly created policy.

```json
{
    "name": "Export Data to Third Party",
    "status": "DRAFT",
    "marketingActionRefs": [
        "https://platform-stage.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty"
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
    "created": 1565651746693,
    "createdClient": "{CREATED_CLIENT}",
    "createdUser": "{CREATED_USER",
    "updated": 1565651746693,
    "updatedClient": "{UPDATED_CLIENT}",
    "updatedUser": "{UPDATED_USER}",
    "_links": {
        "self": {
            "href": "https://platform-stage.adobe.io/data/foundation/dulepolicy/policies/custom/5d51f322e553c814e67af1a3"
        }
    },
    "id": "5d51f322e553c814e67af1a3"
}
```
* `id`: A read-only, system-generated value that uniquely identifies the DULE policy.

Record the URL ID of the newly created DULE policy, as it will be used later in this tutorial.

## Enable the DULE policy

> **Note:** While this step is optional if you wish to leave your DULE policy in `DRAFT` status, please note that by default a policy must have its status set to `ENABLED` in order to participate in evaluation. See the next section on [evaluating DULE policies](#evaluate-the-dule-policy) for information on how to make exceptions for policies in `DRAFT` status.

By default, DULE policies that have their `status` property set to `DRAFT` do not participate in evaluation. You can enable your policy for evaluation by making a PATCH request to the `/policies/custom/` endpoint and providing the unique identifier for the policy at the end of the request path.

#### API format

```http
PATCH /policies/custom/{POLICY_ID}
```
* `{POLICY_ID}`: The `id` value of the policy you want to enable.

#### Request

The following request performs a PATCH operation on the `status` property of the DULE policy, changing its value from `DRAFT` to `ENABLED`.

```shell
curl -X PATCH \
  https://platform.adobe.io/data/foundation/dulepolicy/policies/custom/5d51f322e553c814e67af1a3
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '[
    {
      "op": "replace",
      "path": "/status",
      "value": "ENABLED"
    }
  ]'
```
* `op`: The type of PATCH operation to perform. This request performs a "replace" operation.
* `path`: The path to the field to be updated.
* `value`: The new value to be assigned to the property specified in `path`. This request sets the policy's `status` property to `ENABLED`.

#### Response

A successful response returns HTTP status 200 (OK) and the details of the updated policy, with its `status` now set to `ENABLED`.

```json
{
    "name": "Export Data to Third Party",
    "status": "ENABLED",
    "marketingActionRefs": [
        "https://platform-stage.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty"
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
    "created": 1565651746693,
    "createdClient": "{CREATED_CLIENT}",
    "createdUser": "{CREATED_USER}",
    "updated": 1565723012139,
    "updatedClient": "{UPDATED_CLIENT}",
    "updatedUser": "{UPDATED_USER}",
    "_links": {
        "self": {
            "href": "https://platform-stage.adobe.io/data/foundation/dulepolicy/policies/custom/5d51f322e553c814e67af1a3"
        }
    },
    "id": "5d51f322e553c814e67af1a3"
}
```

## Evaluate the DULE policy

Now that you have created a DULE policy for a marketing action, you can use the Policy Service API to evaluate whether the policy rejects the marketing action on a dataset or set of DULE labels that fit the criteria defined in the policy expression.

> **Note:** By default, only policies whose status is set to `ENABLED` can participate in evaluation. To allow `DRAFT` policies to participate in evaluation, you must include the query parameter `includeDraft=true` in the request path.

You can evaluate the policy using either of the following two methods:

* [Evaluate using DULE labels and a marketing action](#evaluate-using-dule-labels-and-a-marketing-action)
* [Evaluate using datasets and a marketing action](#evaluate-using-dule-labels-and-a-marketing-action)

### Evaluate using DULE labels and a marketing action

You can evaluate a policy by testing a marketing action against a set of DULE labels that would hypothetically be present within a dataset. This is done through the use of query parameters, where DULE labels are provided as a comma-separated list of values, as shown in the following example.

#### API format

```http
GET /marketingActions/core/{MARKETING_ACTION_NAME}/constraints?duleLabels={LABEL_1},{LABEL_2}
GET /marketingActions/custom/{MARKETING_ACTION_NAME}/constraints?duleLabels={LABEL_1},{LABEL_2}
```
* `{MARKETING_ACTION_NAME}`: The name of the marketing action associated with the DULE policy you are evaluating.
* `{LABEL_1}`: A DULE label to test the marketing action against. At least one label must be provided. When providing multiple labels, they must be separated by commas.

#### Request

The following request tests the `exportToThirdParty` marketing action against DULE labels `C1` and `C3`. Since the DULE policy you created earlier in this tutorial defines the `C1` label as one of the `deny` conditions in its policy expression, the marketing action should trigger a policy violation.

> **Note:** DULE labels are case-sensitive. Policy violations only occur when the labels defined in their policy expressions are matched exactly. In this example, a `C1` label would trigger a violation, whereas a `c1` label would not.

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty/constraints?duleLabels=C1,C3 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the URL for the marketing action, the DULE labels it was tested against, and a list of any DULE policies that were violated as a result of testing the action against those labels. In this example, the "Export Data to Third Party" policy is shown in the `violatedPolicies` array, indicating that the marketing action triggered the expected policy violation.

```json
{
    "timestamp": 1565727821209,
    "clientId": "string",
    "userId": "string",
    "imsOrg": "{IMS_ORG}",
    "marketingActionRef": "https://platform-stage.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty",
    "duleLabels": [
        "C1",
        "C3"
    ],
    "violatedPolicies": [
        {
            "name": "Export Data to Third Party",
            "status": "ENABLED",
            "marketingActionRefs": [
                "https://platform-stage.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty"
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
            "created": 1565651746693,
            "createdClient": "{CREATED_CLIENT}",
            "createdUser": "{CREATED_USER",
            "updated": 1565723012139,
            "updatedClient": "{UPDATED_CLIENT}",
            "updatedUser": "{UPDATED_USER}",
            "_links": {
                "self": {
                    "href": "https://platform-stage.adobe.io/data/foundation/dulepolicy/policies/custom/5d51f322e553c814e67af1a3"
                }
            },
            "id": "5d51f322e553c814e67af1a3"
        }
    ]
}
```
* `violatedPolicies`: An array listing any DULE policies that were violated by testing the marketing action (specified in `marketingActionRef`) against the provided `duleLabels`.

### Evaluate using datasets

You can evaluate a DULE policy by testing a marketing action against one or more datasets from which DULE labels can be collected. This is done by making a POST request to `/marketingActions/core/{MARKETING_ACTION_NAME}/constraints` endpoint and providing dataset IDs within the request body, as shown in the following example.

#### API format

```http
POST /marketingActions/core/{MARKETING_ACTION_NAME}/constraints
POST /marketingActions/custom/{MARKETING_ACTION_NAME}/constraints
```
* `{MARKETING_ACTION_NAME}`: The name of the marketing action associated with the DULE policy you are evaluating.

#### Request

The following request tests the `exportToThirdParty` marketing action against three different datasets. The datasets are referenced by type and ID in an array provided in the payload.

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty/constraints
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'Content-Type: application/json' \
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
* `entityType`: The type of entity being defined. For this use case, the value will always be "dataSet".
* `entityId`: The ID of the dataset.

#### Response

A successful response returns the URL for the marketing action, the DULE labels that were collected from the provided datasets, and a list of any DULE policies that were violated as a result of testing the action against those labels. In this example, the "Export Data to Third Party" policy is shown in the `violatedPolicies` array, indicating that the marketing action triggered the expected policy violation.

```json
{
    "timestamp": 1556324277895,
    "clientId": "{CLIENT_ID}",
    "userId": "{USER_ID}",
    "imsOrg": "{IMS_ORG}",
    "marketingActionRef": "https://platform.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty",
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
            "name": "Export Data to Third Party",
            "status": "ENABLED",
            "marketingActionRefs": [
                "https://platform-stage.adobe.io:443/data/foundation/dulepolicy/marketingActions/custom/exportToThirdParty"
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
            "created": 1565651746693,
            "createdClient": "{CREATED_CLIENT}",
            "createdUser": "{CREATED_USER",
            "updated": 1565723012139,
            "updatedClient": "{UPDATED_CLIENT}",
            "updatedUser": "{UPDATED_USER}",
            "_links": {
                "self": {
                    "href": "https://platform-stage.adobe.io/data/foundation/dulepolicy/policies/custom/5d51f322e553c814e67af1a3"
                }
            },
            "id": "5d51f322e553c814e67af1a3"
        }
    ]
}
```
* `duleLabels`: A list of DULE labels that were extracted from the datasets provided in the request payload.
* `discoveredLabels`: A list of the datasets that were provided in the request payload, displaying the dataset-level and field-level DULE labels that were found in each.
* `violatedPolicies`: An array listing any DULE policies that were violated by testing the marketing action (specified in `marketingActionRef`) against the provided `duleLabels`.

## Next steps

By following this tutorial, you have successfully created and evaluated a DULE policy for a marketing action. For more information on the different available operations in the Policy Service API,  see the [Policy Service developer guide](../../technical_overview/data_governance/dule_policy_service_developer_guide.md). For information on how to enforce DULE policies for Real-time Customer Profile data, see the tutorial on [enforcing data usage compliance for audience segments](data_governance_and_segmentation.md).