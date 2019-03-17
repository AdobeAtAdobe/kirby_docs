# Activating Unified Profile

## Overview

Unified Profile is the centrally accessible source of data for Adobe Experience Platform solutions, providing access to unified customer profile data that helps inform and empower actions across any channel, platform and Adobe Solution integrations. This customer data, paired with a rich history of behavioral and interaction data, is used to power machine learning & Sensei. Unified Profile APIs can also be used directly to enrich the functionality of third-party solutions, CRMs, and proprietary solutions.

On Experience Platform, "profile" is a term used to describe the attributes of an entity. The profile of a product may include a SKU and description, where the profile of a person contains information like first name, last name, and email address. An entity as it exists in a single dataset is considered a "profile fragment". This is fitting, as it is only a fragment of the total potential data you could have for that entity. When Unified Profile is used to access an entity, it can supply you with a merged view of all profile fragments for that entity across datasets, referred to as the unified profile.

### Objective

This tutorial covers configurations for Unified Profile. In specific, it covers configuring Unified Profile for accessing data:

[Accessing Your Merge Policies](#accessing-your-merge-policies) - Inspect the merge policies available for use by your organization.  
[Creating a Merge Policy](#creating-a-merge-policy) - Create a new merge policy for use by your organization.

### Merge Policies

One of the primary objectives of Unified Profile is to create a view of your entities as an aggregate of all of that entity's data from all of your systems wherein that entity is represented. When merging profile fragments, there exists the potential for data conflicts. To control how merge conflicts are handled, what datasets to merge data from, and how to deal with stitching identities, Unified Profile uses Merge Policies. Some use cases handled by Merge Policies include:

* Accessing data from a specific dataset
* Placing a higher priority on data coming from a dataset more likely than others to have updated and maintained information
* Adhering to legal concerns such as contractual or DULE obligations, where use of data from a particular dataset is not allowed, perhaps for a particular purpose

Merge policies are private to an organization, allowing you to create different policies for merging different schemas in the ways you need. Any API to access Unified Profile data requires a merge policy, though a default will be used if one is not explicitly provided. Adobe Experience Platform provides a default merge policy, or you can create a merge policy and mark it as your organization's default per an XDM schema.

### Prerequisite Topics

[__Unified Profile__](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md) is a generic lookup entity store, and is used to manage any XDM Platform data. Unified Profile facilitates building customer personalization use cases by merging data across various enterprise data assets and providing access to that unified data. Unified Profile provides tools for looking up entities by ID, as well as robust segmentation tools.  
[__Identity Service__](../../technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md) stitches related identities when more than one are provided in a data fragment, building and managing your identity graph. Unified Profile uses Identity Service to glean all possible identities for a managed entity at access/segmentation time, merging all relating entities into a unified view.  
[__Authenticating and Accessing Adobe Experience Platform APIs__](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) - This tutorial shows the initial steps to set up an integration in Adobe I/O Console and use the created integration to access Adobe Experience Platform APIs. The steps in this tutorial describe how to gain access to the following values needed for required headers:
* IMS Organization ID
* API Key (Client ID)
* Access Token

### Requirements

All APIs in this document require the following headers. Some service calls may require additional headers which will be listed in context.

|Header|Description|Example Value|
|---|---|---|
|Authorization|The Access Token as described in [Prerequisite Topics](#prerequisite-topics), prefixed with "Bearer "|Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....|
|x-gw-ims-org-id|The IMS Organization ID as described in [Prerequisite Topics](#prerequisite-topics)|17FA2AFD56CF35747F000101@AdobeOrg|
|x-api-key|The API Key (Client ID) as described in [Prerequisite Topics](#prerequisite-topics)|25622d14d3894ea590628717f2cb7462|

---

## Components Used in Unified Profile Configuration API

Unified Profile Configuration API services use various objects which are described in this section.

### IdentityGraph

Identity Service manages the identity graphs used globally and for each organization on Experience Platform. `IdentityGraph` defines how to determine the related identities for a user.

__`IdentityGraph` object__

```
{
    "type": "{IDENTITY_GRAPH_TYPE}"
}
```

Where `IDENTITY_GRAPH_TYPE` is one of the following:

* "none" : Do not do any identity stitching
* "auto" (default) : Use the default identity graph; private identity graph (pdg)
* "pdg" : Private device graph; refers to your organization's private identity graph

__Example `IdentityGraph`__

```
{
    "type": "auto"
}
```

###  AttributeMerge

A profile fragment is the profile information we have for just one identity out of the list of identities that you have for a particular user. When the identity graph type used results in more than one identity, the potential for conflicting values for profile properties, where priority must be specified. Using `AttributeMerge`, you specify which dataset profile's values to use.

__`AttributeMerge` object__

```
{
    "type": "{ATTRIBUTE_MERGE_TYPE}",
    "data": "{ATTRIBUTE_MERGE_TYPE_SUPPORTING_DATA}"
}
```

Where `ATTRIBUTE_MERGE_TYPE` is one of the following:

* "timestampOrdered" (default) : Give priority to the profile which was updated last in case of conflict.
* "dataSetPrecedence" : Give priority to profile fragments based on the dataset from which they came. This is for the use case where client trusts information present in one data set over other. This type requires list of datasets to be provided in data field.

The value for `ATTRIBUTE_MERGE_TYPE_SUPPORTING_DATA` depends on the `AttributeMerge` type specified.

__Example `AttributeMerge` object using `dataSetPrecedence` type__

```
{
    "type":"dataSetPrecedence", 
     "data": {
         "order" : ["dataSetId1", "dataSetId2"]
     }
}
```

__Example `AttributeMerge` object using `timestampOrdered` type__

```
{
    "type":"timestampOrdered"
}
```

### Schema

The `Schema` object specifies the XDM schema for which this merge policy is created.

__`Schema` object__

```
{
    "name": "{SCHEMA_NAME}"
}
```

Where `SCHEMA_NAME` is the fully qualified name of the XDM schema associated with the merge policy.

__Example `Schema`__ 

<!-- What's the diff from @/xdms/context/profile? -->
```
{
    "name":"_xdm.model.Profile" 
}
```

### MergePolicy

The `MergePolicy` object represents a set of preferences controlling aspects of merging profile fragments. Each organization can potentially have multiple merge policies per schema. Any merge policy set as default will be used in use cases where merge policy is required but not provided and only schema is provided.

For your organization, each schema can have only one default merge policy. When you create or make a merge policy default, any existing default merge policy will automatically no longer be used by default.

__`MergePolicy` object__

```
{
    "id": "{MERGE_POLICY_ID}",
    "internalId": "{PLATFORM_INTERNAL_ID}",
    "name": "{HUMAN_FRIENDLY_NAME}",
    "imsOrgId": "{ORGANIZATION_ID}",
    "identityGraph": "{IDENTITY_GRAPH_OBJECT}",
    "attributeMerge": "{ATTRIBUTE_MERGE_OBJECT}",
    "schema": "{SCHEMA_OBJECT}", 
    "default": "{IS_DEFAULT}",
    "version": "{VERSION}",
    "current": "{IS_CURRENT}",
    "creationTime": "{CREATION_TIME}",
    "updateTime": "{UPDATE_TIME}"
}
```

Where the values are as follows:

* __`MERGE_POLICY_ID`__: User specified id of the merge policy. This should be unique
* __`PLATFORM_INTERNAL_ID`__: This is the internal id that we provide to each merge policy
* __`HUMAN_FRIENDLY_NAME`__: Human readable name of the merge policy
* __`ORGANIZATION_ID`__: Organization ID to which this merge policy belongs
* __`IDENTITY_GRAPH_OBJECT`__: `IdentityGraph` object
* __`ATTRIBUTE_MERGE_OBJECT`__: `AttributeMerge` object
* __`SCHEMA_OBJECT`__: `Schema` object
* __`IS_DEFAULT`__: Boolean (true/false) value indicating if this merge policy is the default for the specified schema
* __`VERSION`__: Platform maintained version of merge policy, which is incremented whenever a merge policy is patched
* __`IS_CURRENT`__: Boolean (true/false) value indicating whether the version mentioned is the current version or not
* __`CREATION_TIME`__: The time at which this policy was created
* __`UPDATE_TIME`__: The time at which the policy was last updated

__Example `MergePolicy`__

```
{
    "version": 1,
    "identityGraph": {
        "type": "auto"
    },
    "id": "10648288-cda5-11e8-a8d5-f2801f1b9fd1",
    "schema": {
        "name": "_xdm.model.Profile",
        "id":""
     },
    "default": true,
    "current": true,
    "updateTime": 1539116953565,
    "attributeMerge": { 
        "type": "dataSetPrecedence",
        "data": {
            "order": [
                "5b020a27e7040801dedbf46e",
                "5b565efc0a488f01e2c19972"
            ]
        }
    },
    "internalId": 26,
    "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
    "creationTime": 1539116953565
}
```

---

## Accessing Your Merge Policies

List the details of all merge policies configured for your organization.

__Service endpoint__

`GET https://platform.adobe.io/data/core/ups/config/mergePolicies`

__Request parameters__

|Parameter|Required|Description|
|---|---|---|
|current|Optional|Whether looking for the current version of the merge policy - true/false|
|default|Optional|Whether looking for default policy - true/false|
|limit|Optional|Page size limit (__default value__: 20)|
|order|Optional|Page order - asc/desc (__default value__: asc)|
|schema|Required|Name of the schema for which to retrieve available merge policies|
|start|Optional|Page offset - as per crated time of resource (__default value__: 0)|
|version|Optional|Specify this if you are looking for a specific version of merge policy|

__Example request__

```
curl -X GET \
  'https://platform.adobe.io/data/core/ups/config/mergePolicies?schema=_xdm.context.profile' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 1BD6382559DF0C130A49422D@AdobeOrg'
```

__Example response__

```
{
    "mergePolicies": [
        {
            "version": 1,
            "identityGraph": {
                "type": "none"
            },
            "id": "0e530929-0054-45b9-ac35-97140863db54",
            "schema": {
                "name": "_xdm.context.profile",
                "id": ""
            },
            "default": false,
            "current": true,
            "updateTime": 1538761450095,
            "attributeMerge": {
                "type": "timestampOrdered"
            },
            "internalId": 226,
            "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
            "creationTime": 1533879873660
        }
    ]
}
```

---

## Creating a Merge Policy

Create a new merge policy for your organization.

__Service endpoint__

`POST https://platform.adobe.io/data/core/ups/config/mergePolicies`

__Request body__

```
{
    "id": "{UNIQUE_MERGE_POLICY_ID}",
    "identityGraph" : {
        "type": "{IDENTITY_GRAPH_TYPE}"
    },
    "attributeMerge" : {
        "type": "{ATTRIBUTE_MERGE_TYPE}",
        "data": "{ATTRIBUTE_MERGE_TYPE_SUPPORTING_DATA}"
    },
    "schema": {
        "name":"{SCHEMA_NAME}"
    },
    "default": "{true/false}"
}
```

Where the values are as follows:

* __UNIQUE_MERGE_POLICY_ID__: Supply an ID to reference the merge policy in API service requests
* __IDENTITY_GRAPH_TYPE__: `IdentityGraph` type
* __ATTRIBUTE_MERGE_TYPE__: `AttributeMerge` type
* __SCHEMA_NAME__: The fully qualified name of the XDM schema associated with the merge policy.
* __ATTRIBUTE_MERGE_TYPE__: Set to one of the following:
  * __"timestampOrdered"__ : Give priority to the profile which was updated last in case of conflict.
  * __"dataSetPrecedence"__ : Give priority to profile fragments based on the dataset from which they came. This is for the use case where client trusts information present in one data set over other. This type requires list of datasets to be provided in data field. Any datasets not included in the list will not be merged. In other words, datasets must be explicitly listed in order to be merged into a unified profile.
* __ATTRIBUTE_MERGE_TYPE_SUPPORTING_DATA__: depends on the `AttributeMerge` type specified.

__Example request__

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/config/mergepolicies \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 1BD6382559DF0C130A49422D@AdobeOrg'
  -d '{
    "id": "8e56f4e8-cdad-11e8-a8d5-f2801f1b9fd1",
    "identityGraph" : {
        "type": "auto"
    },
    "attributeMerge" : {
        "type":"dataSetPrecedence",
        "data": {
            "order" : [
                "5b020a27e7040801dedbf46e",
                "5b565efc0a488f01e2c19972"
            ]
        }
    },
    "schema": {
        "name":"_xdm.context.profile"
    },
    "default": true
}'
```

__Example response__

```
{
    "version": 1,
    "identityGraph": {
        "type": "auto"
    },
    "id": "8e56f4e8-cdad-11e8-a8d5-f2801f1b9fd1",
    "schema": {
        "name": "_xdm.context.profile",
        "id": ""
    },
    "default": true,
    "current": true,
    "updateTime": 1539300397512,
    "attributeMerge": {
        "type": "dataSetPrecedence",
        "data": {
            "order": [
                "5b020a27e7040801dedbf46e",
                "5b565efc0a488f01e2c19972"
            ]
        }
    },
    "internalId": 1434,
    "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
    "creationTime": 1539300397512
}
```

---

## Conclusion

This tutorial covers only some of the Unified Profile Configuration API. For more details, see the [API Reference](../../../../../../acpdr/swagger-specs/profile-config-api.yaml).

<!--
## Next Topics

Adding Data to Unified Profile  
Consuming Unified Profile Data  
Creating Audience Segments
-->
