# Enforce data usage policies using the Policy Service API

Once you have created a Data Usage Labeling and Enforcement (DULE) labels for your data, and have created DULE policies for marketing actions against those labels, you can use the [DULE Policy Service API](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/dule-policy-service.yaml) to evaluate whether a marketing action performed on a dataset or an arbitrary group of DULE labels constitutes a policy violation. You can then set up your own internal protocols to handle policy violations based on the API response.

> **Note:** By default, only policies whose status is set to `ENABLED` can participate in evaluation. To allow `DRAFT` policies to participate in evaluation, you must include the query parameter `includeDraft=true` in the request path.

This document provides steps on how to use the Policy Service API to check for policy violations for the following scenarios:

* [Evaluate using DULE labels and a marketing action](#evaluate-using-dule-labels-and-a-marketing-action)
* [Evaluate using datasets and a marketing action](#evaluate-using-dule-labels-and-a-marketing-action)

## Getting started

This tutorial requires a working understanding of the following key concepts involved in enforcing DULE policies:

* [Data Governance](../../technical_overview/data_governance/dule_overview.md): The framework by which Platform enforces data usage compliance.
    * [Managing DULE labels](dule_working_with_labels.md): Data usage labels are applied to datasets (and/or individual fields within those datasets), specifying restrictions for how that data can be used.
    * [Managing DULE policies](create_a_dule_policy_tutorial.md): Data usage policies are rules that describe the kinds of marketing actions that are allowed or restricted for certain sets of DULE labels.
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

## Evaluate using DULE labels and a marketing action

You can evaluate a policy by testing a marketing action against a set of DULE labels that would hypothetically be present within a dataset. This is done through the use of the `duleLabels` query parameter, where DULE labels are provided as a comma-separated list of values, as shown in the example below.

#### API format

```http
GET /marketingActions/core/{MARKETING_ACTION_NAME}/constraints?duleLabels={LABEL_1},{LABEL_2}
GET /marketingActions/custom/{MARKETING_ACTION_NAME}/constraints?duleLabels={LABEL_1},{LABEL_2}
```

| Parameter | Description |
| --- | --- |
| `{MARKETING_ACTION_NAME}` | The name of the marketing action associated with the DULE policy you are evaluating. |
| `{LABEL_1}` | A DULE label to test the marketing action against. At least one label must be provided. When providing multiple labels, they must be separated by commas. |

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

| Property | Description |
| --- | --- |
| `violatedPolicies` | An array listing any DULE policies that were violated by testing the marketing action (specified in `marketingActionRef`) against the provided `duleLabels`. |

## Evaluate using datasets

You can evaluate a DULE policy by testing a marketing action against one or more datasets from which DULE labels can be collected. This is done by making a POST request to `/marketingActions/core/{MARKETING_ACTION_NAME}/constraints` and providing dataset IDs within the request body, as shown in the example below.

#### API format

```http
POST /marketingActions/core/{MARKETING_ACTION_NAME}/constraints
POST /marketingActions/custom/{MARKETING_ACTION_NAME}/constraints
```

| Parameter | Description |
| --- | --- |
| `{MARKETING_ACTION_NAME}` | The name of the marketing action associated with the DULE policy you are evaluating. |

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

| Property | Description |
| --- | --- |
| `entityType` | Each item in the payload array must indicate the type of entity being defined. For this use case, the value will always be "dataSet". |
| `entityId` | Each item in the payload array must provide the unique ID for a dataset. |

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

| Property | Description |
| --- | --- |
| `duleLabels` | A list of DULE labels that were extracted from the datasets provided in the request payload. |
| `discoveredLabels` | A list of the datasets that were provided in the request payload, displaying the dataset-level and field-level DULE labels that were found in each. |
| `violatedPolicies` | An array listing any DULE policies that were violated by testing the marketing action (specified in `marketingActionRef`) against the provided `duleLabels`. |

## Next steps

By reading this document, you have successfully checked for policy violations when performing a marketing action on a dataset or a set of DULE labels. Using the data returned in API responses, you can set up protocols within your experience application to appropriately enforce policy violations when they occur.

For steps on how to enforce data usage policies for audience segments in Real-time Customer Profile, please refer to the following [tutorial](data_governance_and_segmentation.md).

If you are using Real-time Customer Data Platform, see the section on [automatic enforcement](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/privacy/data-governance-overview.html#enforce-data-usage-compliance) in the Real-time CDP Data Governance overview for details on how policy enforcement is provided in the user interface.