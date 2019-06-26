# Working with merge policies via API

## Overview

This tutorial covers using RESTful services to work with merge policies, as discussed in the [merge policies section](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md#merge-policies) of the Unified Profile overview. In specific, this tutorial demonstrates:

[Accessing your merge policies](#accessing-your-merge-policies) - Inspect the merge policies available for use by your organization.  
[Creating a merge policy](#creating-a-merge-policy) - Create a new merge policy for use by your organization.  
[Updating an existing merge policy](#updating-a-merge-policy) - Change all or part of a merge policy previously created.  

### Prerequisite topics

[Unified Profile](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md) is a generic lookup entity store, and is used to manage any XDM Platform data. Unified Profile facilitates building customer personalization use cases by merging data across various enterprise data assets and providing access to that unified data. Unified Profile provides tools for looking up entities by ID, as well as robust segmentation tools.  
[Identity Service](../../technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md) stitches related identities when more than one are provided in a data fragment, building and managing your identity graph. Unified Profile uses Identity Service to glean all possible identities for a managed entity at access/segmentation time, merging all related entities into a unified view.  
[Authenticating and Accessing Adobe Experience Platform APIs](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) - This tutorial shows the initial steps to set up an integration in Adobe I/O Console and use an integration to access Adobe Experience Platform APIs. The steps in this tutorial describe how to gain access to the following values needed for required headers:
* IMS Organization ID
* API Key (Client ID)
* Access Token

### Requirements

All service calls in this document require the following headers. Some service calls may require additional headers which will be listed in context.

|Header|Description|Example Value|
|---|---|---|
|Authorization|The Access Token as described in [Prerequisite topics](#prerequisite-topics), prefixed with "Bearer "|Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....|
|x-gw-ims-org-id|The IMS Organization ID as described in [Prerequisite topics](#prerequisite-topics)|17FA2AFD56CF35747F000101@AdobeOrg|
|x-api-key|The API Key (Client ID) as described in [Prerequisite topics](#prerequisite-topics)|25622d14d3894ea590628717f2cb7462|

---

## Components of merge policies

Merge policies are private to an organization, allowing you to create different policies for merging different schemas in the ways you need. Any API to access Unified Profile data requires a merge policy, though a default will be used if one is not explicitly provided. Platform provides a default merge policy, or you can create a merge policy and mark it as your organization's default per an XDM schema.

Unified Profile [Configuration API](../../../../../../acpdr/swagger-specs/profile-config-api.yaml) services use various objects which are described in this section.

### Identity graph

Identity Service manages the identity graphs used globally and for each organization on Experience Platform. `IdentityGraph` defines how to determine the related identities for a user.

__`IdentityGraph` object__

```
{
    "type": "{IDENTITY_GRAPH_TYPE}"
}
```

Where `{IDENTITY_GRAPH_TYPE}` is one of the following:

* "none" : Do not do any identity stitching
* "auto" (default) : Use the default identity graph; private identity graph (pdg)
* "pdg" : Private device graph; refers to your organization's private identity graph

__Example `IdentityGraph`__

```
{
    "type": "auto"
}
```

###  Attribute merge

A profile fragment is the profile information we have for just one identity out of the list of identities that you have for a particular user. When the identity graph type used results in more than one identity, the potential for conflicting values for profile properties, where priority must be specified. Using `AttributeMerge`, you specify which dataset profile's values to use.

__`AttributeMerge` object__

```
{
    "type": "{ATTRIBUTE_MERGE_TYPE}",
    "data": "{ATTRIBUTE_MERGE_TYPE_SUPPORTING_DATA}"
}
```

Where `{ATTRIBUTE_MERGE_TYPE}` is one of the following:

* __"timestampOrdered"__ : (default) Give priority to the profile which was updated last in case of conflict. Using this merge type, the `data` attribute is not required.
* __"dataSetPrecedence"__ : Give priority to profile fragments based on the dataset from which they came. This is for the use case where client trusts information present in one data set over other. This type requires list of datasets to be provided in data field. Any datasets not included in the list will not be merged. In other words, datasets must be explicitly listed in order to be merged into a unified profile. Using this merge type, the `data` attribute is required, as it lists the datasets in the order of priority.

The value for `{ATTRIBUTE_MERGE_TYPE_SUPPORTING_DATA}` depends on the value indicated for `{ATTRIBUTE_MERGE_TYPE}`.

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

Where the value of `name` is the fully qualified name of the XDM schema class associated with the merge policy.

__Example `Schema`__ 

```
{
    "name":"_xdm.context.profile" 
}
```

### Merge policy

The `MergePolicy` object represents a set of preferences controlling aspects of merging profile fragments. Each organization can potentially have multiple merge policies per schema. Any merge policy set as default will be used in use cases where merge policy is required but not provided and only schema is provided.

For your organization, each schema can have only one default merge policy. When you create or make a merge policy default, any existing default merge policy will automatically no longer be used by default.

__`MergePolicy` object__

```
{
    "id": "{MERGE_POLICY_ID}",
    "name": "{HUMAN_FRIENDLY_NAME}",
    "imsOrgId": "{ORGANIZATION_ID}",
    "identityGraph": "{IDENTITY_GRAPH_OBJECT}",
    "attributeMerge": "{ATTRIBUTE_MERGE_OBJECT}",
    "schema": "{SCHEMA_OBJECT}", 
    "default": "{IS_DEFAULT}",
    "version": "{VERSION}",
    "updateEpoch": "{UPDATE_TIME}"
}
```

Where the values are as follows:

|Attribute|Description|
|---|---|
|`id`|The system generated unique identifier assigned at creation time|
|`name`|Human friendly name by which the merge policy can be identified in list views.|
|`imsOrgId`|Organization ID to which this merge policy belongs|
|`identityGraph`|[`IdentityGraph`](#identitygraph) object indicating the identity graph from which related identities will be obtained. Profile fragments found for all related identities will be merged.|
|`attributeMerge`|[`AttributeMerge`](#attributemerge) object indicating the manner by which the merge policy will prioritize profile attribute values in the case of data conflicts.|
|`schema`|The [`Schema'](#schema) object on which the merge policy can be used.|
|`default`|Boolean (true/false) value indicating if this merge policy is the default for the specified schema.|
|`version`|Platform maintained version of merge policy, which is incremented whenever a merge policy is updated.|
|`updateEpoch`|Date of the last update to the merge policy.|

__Example `MergePolicy`__

```
{
    "id": "10648288-cda5-11e8-a8d5-f2801f1b9fd1",
    "name": "unified-profile-default",
    "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
    "schema": {
        "name": "_xdm.context.profile"
    },
    "version": 1,
    "identityGraph": {
        "type": "auto"
    },
    "attributeMerge": {
        "type": "timestampOrdered"
    },
    "default": true,
    "updateEpoch": 1551660639
}
```

## Accessing your merge policies

Access a specific merge policy by ID, or list the merge policies in effect for your organization using criteria.

### Access a merge policy by ID

Glean the details of a specific merge policy by ID.

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
        "type": "timestampOrdered"
    },
    "default": false,
    "updateEpoch": 1551127597
}
```

### Access merge policies by criteria

List merge policies by a given set of parameters controlling filtering, ordering, and pagination.

__Service endpoint__

```
GET https://platform.adobe.io/data/core/ups/config/mergePolicies
```

__Request parameters__

All of the following parameters are optional. Calling this service with no parameters will retrieve all merge policies available for your organization.

|Parameter|Description|
|---|---|
|`default`|Filter results by whether the merge policies are default for a schema class. true/false|
|`limit`|Specify the page size limit to control the number of results are included in a page. (__default value__: 20)|
|`orderBy`|Specify the field by which to order results as in `orderBy=name` to sort by name in ascending order (the default), or `orderBy=-name`, to sort in descending order. To omit this value would result in the default sorting of `timestamp` in ascending order.|
|`schema.name`|Name of the schema for which to retrieve available merge policies.|
|`identityGraph.type`|Filter results by the identity graph.|
|`attributeMerge.type`|Filter results by the attribute merge type used.|
|`start`|Page offset - specify the starting ID for data to retrieve.  (__default value__: 0)|
|`version`|Specify this if you are looking to use a specific version of the merge policy. By default, the latest version will be used.|

__Example request__

The following example demonstrates listing all merge policies for a given schema.

```
curl -X GET \
  'https://platform.adobe.io/data/core/ups/config/mergePolicies?schema.name=_xdm.context.profile' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 1BD6382559DF0C130A49422D@AdobeOrg'
```

__Example response__

```
{
    "_page": {
        "count": 2,
        "next": "K1JJRDpFaWc5QUpZWHY1c2JBQUFBQUFBQUFBPT0jUlQ6MSNUUkM6MiNGUEM6QWdFQUFBQldBQkVBQVBnaFFQLzM4VUIvL2tKQi8rLysvMUpBLzMrMi8wRkFmLzR4UUwvL0VrRC85em4zRTBEcmNmYi92Kzh4UUwvL05rQVgzRi8rMStqNS80WHQwN2NhUUVzQUFBUUFleGpLQ1JnVXRVcEFCQUFFQVBBRA=="
    },
    "children": [
        {
            "id": "unified-profile-default",
            "name": "unified-profile-default",
            "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
            "schema": {
                "name": "_xdm.context.profile"
            },
            "version": 1,
            "identityGraph": {
                "type": "auto"
            },
            "attributeMerge": {
                "type": "timestampOrdered"
            },
            "default": true,
            "updateEpoch": 1551660639
        },
        {
            "id": "timestampOrdered-pdg-mp",
            "name": "timestampOrdered-pdg-mp",
            "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
            "schema": {
                "name": "_xdm.context.profile"
            },
            "version": 1,
            "identityGraph": {
                "type": "pdg"
            },
            "attributeMerge": {
                "type": "timestampOrdered"
            },
            "default": false,
            "updateEpoch": 1551661137
        }
    ],
    "_links": {
        "next": {
            "href": "@/mergePolicies?start=K1JJRDpFaWc5QUpZWHY1c2JBQUFBQUFBQUFBPT0jUlQ6MSNUUkM6MiNGUEM6QWdFQUFBQldBQkVBQVBnaFFQLzM4VUIvL2tKQi8rLysvMUpBLzMrMi8wRkFmLzR4UUwvL0VrRC85em4zRTBEcmNmYi92Kzh4UUwvL05rQVgzRi8rMStqNS80WHQwN2NhUUVzQUFBUUFleGpLQ1JnVXRVcEFCQUFFQVBBRA==&orderBy=&limit=2"
        }
    }
}
```

---

## Creating a merge policy

Create a new merge policy for your organization.

__Service endpoint__

```
POST https://platform.adobe.io/data/core/ups/config/mergePolicies
```

__Request body__

```
{
    "name": "{UNIQUE_MERGE_POLICY_NAME}",
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
    "default": "{IS_DEFAULT}"
}
```

Where the values are as follows:

|Attribute|Required|Description|
|---|---|---|
|`name`|Optional|Supply a human friendly name by which the merge policy can be identified in list views.|
|`identityGraph`|Required|[`IdentityGraph`](#identitygraph) object indicating the identity graph from which to obtain related identities to merge.|
|`attributeMerge`|Required|[`AttributeMerge`](#attributemerge) object indicating the manner by which to prioritize profile attribute values in the case of data conflicts.|
|`schema`|Required|The [`Schema`](#schema) object providing the XDM schema class associated with the merge policy.|
|`default`|Optional|Specify whether this merge policy is the default for the schema.|

__Example request__

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/config/mergePolicies \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 1BD6382559DF0C130A49422D@AdobeOrg'
  -d '{
    "name": "All-ID-Order-By-CMS-Loyalty",
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
    "id": "e5bc94de-cd14-4cdf-a2bc-88b6e8cbfac2",
    "name": "All-ID-Order-By-CMS-Loyalty",
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
            "order" : [
                "5b020a27e7040801dedbf46e",
                "5b565efc0a488f01e2c19972"
            ]
        }
    },
    "default": true,
    "updateEpoch": 1551898378
}
```

---

## Updating a merge policy

Modify an existing merge policy by editing individual attributes, or by overwriting the merge policy with a new one.

### Update individual merge policy fields

Update a field for a given merge policy.

__Service endpoint__

```
PATCH https://platform.adobe.io/data/core/ups/config/mergePolicies/{MERGE_POLICY_ID}
```

__Request body__

```
{
  "op": "{OPERATION}",
  "path": "{PATH_OF_FIELD}",
  "value": "{SET_TO_VALUE}"
}
```

The attributes break down as follows:

|Attribute|Description|
|---|---|
|`op`|Specify the operation to take. Currently only "add" is supported|
|`path`|Provide the path of the field to update. Valid values are: "/name", "/identityGraph.type", "/attributeMerge.type", "/schema.name", "/version", "/default"|
|`value`|Provide the value to set the specified attribute|

__Example request__

```
curl -X PATCH \
  https://platform.adobe.io/data/core/ups/config/mergePolicies/e5bc94de-cd14-4cdf-a2bc-88b6e8cbfac2 \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 1BD6382559DF0C130A49422D@AdobeOrg'
  -d '{
    "op": "add",
    "path": "/default",
    "value": true
    }'
```

__Example response__

```
{
  "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
  "schema": {
    "name": "_xdm.context.profile"
  },
  "name": "All-ID-Order-By-CMS-Loyalty",
  "id": "e5bc94de-cd14-4cdf-a2bc-88b6e8cbfac2",
  "identityGraph": {
    "type": "auto"
  },
  "attributeMerge": {
    "type": "dataSetPrecedence",
    "data": {
      "order": [
        "5b020a27e7040801dedbf46e",
        "5b565efc0a488f01e2c19972"
      ]
    }
  },
  "default": true,
  "version": 1,
  "updateEpoch": 1551898378
}
```

### Overwrite a merge policy

Another way to modify a merge policy is to supply an entire merge policy, overwriting the existing.

__Service endpoint__

```
POST https://platform.adobe.io/data/core/ups/config/mergePolicies/{MERGE_POLICY_ID}
```

__Request body__

```
{
    "name": "{UNIQUE_MERGE_POLICY_NAME}",
    "identityGraph" : {
        "type": "{IDENTITY_GRAPH_TYPE}"
    },
    "attributeMerge" : {
        "type": "{ATTRIBUTE_MERGE_TYPE}",
        "data": "{ATTRIBUTE_MERGE_TYPE_SUPPORTING_DATA}"
    },
    "schema": {
        "name":"{SCHEMA_CLASS_NAME}"
    },
    "default": "{IS_DEFAULT}"
}
```

Where the values are as follows:

|Attribute|Required|Description|
|---|---|---|
|`name`|Optional|Supply a human friendly name by which the merge policy can be identified in list views.|
|`identityGraph`|Required|[`IdentityGraph`](#identitygraph) object indicating the identity graph from which to obtain related identities to merge.|
|`attributeMerge`|Required|[`AttributeMerge`](#attributemerge) object indicating the manner by which to prioritize profile attribute values in the case of data conflicts.|
|`schema`|Required|The [`Schema`](#schema) object providing the XDM schema class associated with the merge policy.|
|`default`|Optional|Specify whether this merge policy is the default for the schema.|

__Example request__

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/config/mergePolicies/e5bc94de-cd14-4cdf-a2bc-88b6e8cbfac2 \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 1BD6382559DF0C130A49422D@AdobeOrg'
  -d '{
    "name": "All-ID-Order-By-CMS-Loyalty",
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
    "id": "e5bc94de-cd14-4cdf-a2bc-88b6e8cbfac2",
    "name": "All-ID-Order-By-CMS-Loyalty",
    "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
    "schema": {
        "name": "_xdm.context.profile"
    },
    "version": 1,
    "identityGraph": {
        "type": "auto"
    },
    "attributeMerge": {
        "type":"dataSetPrecedence",
        "data": {
            "order" : [
                "5b020a27e7040801dedbf46e",
                "5b565efc0a488f01e2c19972"
            ]
        }
    },
    "default": true,
    "updateEpoch": 1551898378
}
```

---

## Conclusion

This tutorial covers only some of the Unified Profile Configuration API. For more details, see the [API Reference](../../../../../../acpdr/swagger-specs/profile-config-api.yaml).