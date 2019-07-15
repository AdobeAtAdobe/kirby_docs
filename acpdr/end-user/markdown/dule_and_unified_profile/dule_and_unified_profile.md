# Unified Profile and data usage compliance via API

## Overview

Adobe Experience Platform allows companies to bring data from multiple enterprise systems together to better allow marketers to identify, understand, and engage customers. Experience Platform includes an end-to-end data governance infrastructure to help companies ensure the proper use of data within Platform and when being shared between systems.

Data governance is a series of strategies and technologies used to manage customer data and ensure compliance with regulations, restrictions, and policies applicable to data use. It plays a key role within Platform at various levels, including cataloging, data lineage, data usage labeling, data access policies, and access control on data for marketing actions.

This document describes the components and workflows that play together to support the configuration and enforcement of data usage policies on Platform.

[Configuring for data governance](#configuring-for-data-governance)

* [Unified Profile merge policies](#create-merge-policies)
* [DULE data usage labels](#apply-data-usage-labels)
* [DULE marketing actions](#create-marketing-actions)
* [DULE data usage policies](#create-data-usage-policies)

[Enforcing policies for data governance](#enforcing-policies-for-data-governance)

* [Obtain merge policy](#step-1---obtain-the-merge-policy-from-the-segment-definition)
* [Obtain source datasets](#step-2---obtain-the-source-datasets-from-the-merge-policy)
* [Gather DULE labels](#step-3---gather-dule-labels)
* [Redact data](#step-4---optionally-redact-data)
* [Evaluate for policy violations](#step-5---evaluate-data-access-for-policy-violations)

### Platform components in data governance

The following Platform solutions play into data governance, controlling the data that is accessed by Unified Profile's access or segmentation tools.

[__Unified Profile__](../../../api-specification/markdown/narrative/technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md) - Unified Profile is a generic lookup entity store, and is used to manage any XDM Platform data. Unified Profile merges data across various enterprise data assets and provides access to that unified data. At segmentation or access, Unified Profile allows you to control which datasets are merged and what fields are retrieved.  
[__Data Usage Labeling and Enforcement (DULE)__](../dule_overview/dule_overview.md) - DULE provides the infrastructure for using [data usage labels](../dule_overview/dule_working_with_labels.md) to describe datasets, data fields, and the [connections](../../../api-specification/markdown/narrative/technical_overview/acp_connectors_overview/acp-connectors-overview.md) used to populate datasets in terms of the level of sensitivity with which to handle the data they hold. Use DULE's [Policy Service](../dule_overview/dule_working_with_policies.md#policy-evaluation) to validate data being accessed against policies based on those labels.

---

## Configuring for data governance

Configuring Platform for data governance involves:

* [Unified Profile merge policies](#create-merge-policies)
* [DULE data usage labels](#apply-data-usage-labels)
* [DULE marketing actions](#create-marketing-actions)
* [DULE data usage policies](#create-data-usage-policies)

### Create merge policies

In terms of configuring Unified Profile for data governance, merge policies can be used to explicitly specify the datasets to merge for profile data. In this way, you can create merge policies that include only the datasets permissible for the various marketing actions your data will serve. If you do not create your own merge policies, a default is used for you. This default merge policy will merge from all datasets and all linked identities.

Visit the [tutorial for configuring Unified Profile](../../../api-specification/markdown/narrative/tutorials/activating_up_tutorial/activating_up_tutorial.md) to learn how to work with merge policies using the API.

### Apply data usage labels

Data usage labels are a component of the DULE framework. They are applied to data connections, datasets, and data fields to indicate purposes for which they are prohibited from use. As part of configuring Platform for data governance, data usage labels should be added to any dataset, connection, or data field where data usage limitations should be imposed. Examples of the rules implied by these labels are "Data cannot be exported to a third-party." or "Data cannot be used for on-site targeting of content.". For the full list of labels, visit [Supported data usage labels](../dule_overview/dule_supported_labels.md).

To learn more about data usage labels, visit [Working with Data Usage Labels in Adobe Experience Platform](../dule_overview/dule_working_with_labels.md).

### Create marketing actions

In the DULE framework, a marketing action represents a purpose for which your marketing team may wish to access Platform data. Marketing actions serve to describe a data usage policy, described next.

To learn how to work with your organization's marketing actions via API, visit [DULE marketing actions](../dule_overview/dule_working_with_policies.md#marketing-actions).

### Create data usage policies

A data usage policy is a set of rules associating marketing actions with data usage labels. The rules indicate which labels, or combination of labels, prohibit data access for a given action. For example, you can create a data usage policy which prohibit the marketing action "Send to 3rd party analytics" if any dataset included in the merged dataset has the "C2" (Data cannot be exported to a third-party) label or the "C8" (Data cannot be used for measurement of your organization’s websites or apps) label. 

For more on working with data usage policies, visit [DULE data usage policies](../dule_overview/dule_working_with_policies.md#policies).

## Enforcing policies for data governance

> *It is your responsibility to understand what obligations and limitations come along with your data and how you use that data in the Adobe Experience Platform.  The Adobe Experience Platform provides tools to help you manage some of those obligations within the Adobe Experience Platform.  More information, including tutorials and guides for managing labels and policies can be found here (with a link to the DULE policy guide).*

Using the configurations described [above](#configuring-for-data-governance), you could use any number of patterns for enforcing data governance policies. The workflow described by this section is one approach and is used to illuminate the various options for working with DULE and Unified Profile tools. The various strategies for policy compliance include:

* Exclude restricted datasets from participating in the union view - When creating a segment, you are required to specify a merge policy. Using merge policies, you can limit the datasets used to merge data to only those appropriate to an intention.
* Exclude sensitive fields - When exporting a segment, you are able to specify which fields to access (using the `fields` parameter).
* DULE labels on connections, datasets, and datafields - As part of accessing your customer segments, evaluate your segment data for violating any data access policies.

> **Note:** Data usage labels are inherited from connection to dataset. A dataset that is populated by a connection will inherit the labels from that connection.

The data governance enforcement workflow described here centers around the DULE aspects of data governance.

1. [Obtain merge policy](#step-1---obtain-the-merge-policy-from-the-segment-definition)
1. [Obtain source datasets](#step-2---obtain-the-source-datasets-from-the-merge-policy)
1. [Gather DULE labels](#step-3---gather-dule-labels)
1. [Redact data](#step-4---optionally-redact-data)
1. [Evaluate for policy violations](#step-5---evaluate-data-access-for-policy-violations)

### Step 1 - Obtain the merge policy from the segment definition

In this workflow, we start at the requirement to access a known segment for a particular marketing action. A segment details include reference to the merge policy used to export that segment. 

From the Experience Platform UI, you can see which merge policy was used for a segment by viewing the edit page for the segment. The following describes using the Segment Definition API.

__Segmentation Service API endpoint to access the details for a segment__

```
GET https://platform.adobe.io/data/core/ups/segment/definitions/{SEGMENT_DEFINITION_ID}
```

__Example request to get segment details__

```
curl -X GET \
  'https://platform.adobe.io/data/core/ups/segment/definitions/24379cae-726a-4987-b7b9-79c32cddb5c1' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
```

__Example response__

<!-- TODO: I need an official response. I pulled this together from a couple places. Swagger is unclear -->
```
{
    "name": "Cart abandons in CA",
    "id": 24379cae-726a-4987-b7b9-79c32cddb5c1, 
    "version": 1,
    "expression": {
        "type": "PQL", 
        "format": "pql/text", 
        "value": "homeAddress.countryISO = 'US'"
    },
    "mergePolicyId": "2b43d78d-0ad4-4c1e-ac2d-574c09b01119",
    "createdBy": "Unified Segmentation Service",
    "createdAt": 1542065612211
    "schema": { 
        "id": "some id", 
        "name": "_xdm.context.profile"
    },
    "ttlInDays": 90,
    "_links": {
        "self": {
            "href": "https://platform.adobe.io/data/core/ups/segment/definitions/24379cae-726a-4987-b7b9-79c32cddb5c1"
        }
    }
}
```

### Step 2 - Obtain the source datasets from the merge policy

If the merge policy has an `attributeMerge.type` of "dataSetPrecedence", the merge policy will list the datasets included in merged data (`attributeMerge.data.order`). 

__Service endpoint__

```
GET https://platform.adobe.io/data/core/ups/config/mergePolicies/{MERGE_POLICY_ID}
```

__Example request__

```
curl -X GET \
  'https://platform.adobe.io/data/core/ups/config/mergePolicies/10648288-cda5-11e8-a8d5-f2801f1b9fd1' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 1BD6382559DF0C130A49422D@AdobeOrg'
```

__Example response__

```
{
    "id": "10648288-cda5-11e8-a8d5-f2801f1b9fd1",
    "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
    "schema": {
        "name": "_xdm.context.profile"
    },
    "version": 1,
    "identityGraph": {
        "type": "none"
    },
    "attributeMerge": {
        "type":"dataSetPrecedence", 
        "data": {
            "order" : ["5b95b155419ec801e6eee780", "5b7c86968f7b6501e21ba9df"]
        }
    },
    "default": false,
    "updateEpoch": 1551127597
}
```

If `attributeMerge.type` is "timestampOrdered", then all datasets of the schema type referenced by the merge policy were merged. 

### Step 3 - Gather DULE labels

Get the DULE labels configured for the datasets and/or fields from the related schema from the datasets from [step 1](#step-2---obtain-the-source-datasets-from-the-merge-policy) by calling the following service for each dataset. 

__Catalog Service API endpoint to access DULE labels__

```
GET https://platform.adobe.io/data/foundation/catalog/datasets/{DATASET_ID}/dule
```

__Example request for dataset DULE labels__

```
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/datasets/5b95b155419ec801e6eee780/dule' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
```

__Example response__

```
{
    "connection": {},
    "dataset": {
        "identity": [],
        "contract": [
            "C3"
        ],
        "sensitive": [],
        "contracts": [
            "C3"
        ],
        "identifiability": [],
        "specialTypes": []
    },
    "fields": [],
    "schemaFields": [
        {
            "path": "/properties/personalEmail/properties/address",
            "identity": [
                "I1"
            ],
            "contract": [
                "C2",
                "C9"
            ],
            "sensitive": [],
            "contracts": [
                "C2",
                "C9"
            ],
            "identifiability": [
                "I1"
            ],
            "specialTypes": []
        }
    ]
}
```

In the above example, the dataset has one label; "C3", which means "Data cannot be used in conjunction with directly identifiable information". Further, the field `/properties/personalEmail/properties/address` is labeled as a personally identifiable value (the "I1" label indicates "Directly identifiable data that can identify or contact a specific person, rather than a device."). 

### Step 4 - Optionally redact data

You could design your solution to attempt to generate an export based on an evaluation of labels on datasets and fields. You could use a merge policy which excludes any restricted datasets, generating a more restrictive merge policy on the fly if one matching your needs doesn't exist. You could also redact data using the `fields` parameter of the Export API to exclude any restricted data fields.

For more information on exporting segments, see [Segment your user base](../../../api-specification/markdown/narrative/tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md#step-3-segment-your-user-base) which entails creating a segment job from a segment definition. Once the job is complete, you then export the segment to a dataset, specifying a merge policy.

### Step 5 - Evaluate data access for policy violations

Using the DULE policy engine, you can request an evaluation in one of two ways:

* Given a set of DULE labels and a marketing action, indicate if the action violates any policies.
* Given a dataset (and an optional subset of fields in the dataset) and a marketing action, determine if the action violates any policies.

For more on evaluating data usage policies, see [Policy evaluation](../dule_overview/dule_working_with_policies.md#policy-evaluation).
