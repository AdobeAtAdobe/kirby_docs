# Work with merge policies using APIs

This tutorial provides step-by-step instructions for working with merge policies using the [Real-time Customer Profile API](../../../../../../acpdr/swagger-specs/real-time-customer-profile.yaml). The tutorial covers the following actions:

* [Accessing merge policies](#access-merge-policies)
* [Creating a merge policy](#create-a-merge-policy)
* [Updating an existing merge policy](#update-a-merge-policy)
    * [Editing individual merge policy fields](#edit-individual-merge-policy-fields)
    * [Overwriting a merge policy](#overwrite-a-merge-policy)

The [Appendix](#appendix) to this tutorial contains important information regarding [components of merge policies](#components-of-merge-policies) and serves as a helpful resource to reference as you learn to work with merge policies.

## Getting started

This tutorial requires a working understanding of the various Experience Platform services involved with merge policies. Before beginning this tutorial, please review the documentation for the following services:

* [Real-time Customer Profile](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md): Provides a unified, real-time consumer profile based on aggregated data from multiple sources.
* [Identity Service](../../technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md): Enables Real-time Customer Profile by bridging identities from disparate data sources being ingested into Platform.
* [Experience Data Model (XDM)](../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Platform organizes customer experience data.

The following sections provide additional information that you will need to know in order to successfully make calls to the Platform APIs.

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

## Access merge policies

Using the Real-time Customer Profile API, the `/config/mergePolicies` endpoint allows you perform a lookup request to view a specific merge policy by its ID, or access all of the merge policies in your IMS Organization, filtered by specific criteria.

### Access a single merge policy by ID

You can access a single merge policy by its ID by making a GET request to the `/config/mergePolicies` endpoint and including the `mergePolicyId` in the request path.

#### API format

```http
GET /config/mergePolicies/{mergePolicyId}
```

* `{mergePolicyId}`: The ID of the merge policy you want to access.

#### Request

```shell
curl -X GET \
  'https://platform.adobe.io/data/core/ups/config/mergePolicies/10648288-cda5-11e8-a8d5-f2801f1b9fd1' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}
```

#### Response

A successful response returns the details of the merge policy.

```json
{
    "id": "10648288-cda5-11e8-a8d5-f2801f1b9fd1",
    "imsOrgId": "{IMS_ORG}",
    "schema": {
        "name": "_xdm.context.profile"
    },
    "version": 1,
    "identityGraph": {
        "type": "Private Graph"
    },
    "attributeMerge": {
        "type": "timestampOrdered"
    },
    "default": false,
    "updateEpoch": 1551127597
}
```

### List multiple merge policies by criteria

You can list multiple merge policies within your IMS Organization by issuing a GET request to the `/config/mergePolicies` endpoint and using optional query parameters to filter, order, and paginate the response.

#### API format

```http
GET /config/mergePolicies?{QUERY_PARAMS}
```

* `{QUERY_PARAMS}`: *(Optional)* Parameters added to the request path which configure the results returned in the response. Multiple parameters can be included, separated by ampersands (`&`). Available parameters are listed below.

**Query parameters**

The following is a list of available query parameters for listing merge policies. All of these parameters are optional. Making a call to this endpoint with no parameters will retrieve all merge policies available for your organization.

|Parameter|Description|
|---|---|
|`default`|Filters results by whether the merge policies are default for a schema class. (*Boolean*)|
|`limit`|Specifies the page size limit to control the number of results that are included in a page. (*Default value: 20*)|
|`orderBy`|Specifies the field by which to order results as in `orderBy=name` or `orderBy=+name` to sort by name in ascending order, or `orderBy=-name`, to sort in descending order. Omitting this value results in the default sorting of `name` in ascending order.|
|`schema.name`|Name of the schema for which to retrieve available merge policies.|
|`identityGraph.type`|Filters results by the identity graph type. Possible values include "None" and "Private Graph".|
|`attributeMerge.type`|Filters results by the attribute merge type used. Possible values include "timestampOrdered" and "dataSetPrecedence".|
|`start`|Page offset - specify the starting ID for data to retrieve.  (*Default value: 0*)|
|`version`|Specify this if you are looking to use a specific version of the merge policy. By default, the latest version will be used.|

For more information regarding `schema.name`, `identityGraph.type`, and `attributeMerge.type`, see the [components of merge policies](#components-of-merge-policies) section in the Appendix.


#### Request

The following request lists all merge policies for a given schema:

```shell
curl -X GET \
  'https://platform.adobe.io/data/core/ups/config/mergePolicies?schema.name=_xdm.context.profile' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}
```

#### Response

A successful response returns a paginated list of merge policies that meet the criteria specified by the query parameters sent in the request.

```json
{
    "_page": {
        "count": 2,
        "next": "K1JJRDpFaWc5QUpZWHY1c2JBQUFBQUFBQUFBPT0jUlQ6MSNUUkM6MiNGUEM6QWdFQUFBQldBQkVBQVBnaFFQLzM4VUIvL2tKQi8rLysvMUpBLzMrMi8wRkFmLzR4UUwvL0VrRC85em4zRTBEcmNmYi92Kzh4UUwvL05rQVgzRi8rMStqNS80WHQwN2NhUUVzQUFBUUFleGpLQ1JnVXRVcEFCQUFFQVBBRA=="
    },
    "children": [
        {
            "id": "profile-default",
            "name": "profile-default",
            "imsOrgId": "{IMS_ORG}",
            "schema": {
                "name": "_xdm.context.profile"
            },
            "version": 1,
            "identityGraph": {
                "type": "None"
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
            "imsOrgId": "{IMS_ORG}",
            "schema": {
                "name": "_xdm.context.profile"
            },
            "version": 1,
            "identityGraph": {
                "type": "Private Graph"
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

* `_links.next.href`: A URI address for the next page of results. Use this URI as the request parameter for another API call to the same endpoint to view the page. If no next page exists, this value will be an empty string.

## Create a merge policy

You can create a new merge policy for your organization by making a POST request to the `/config/mergePolicies` endpoint.

#### API format

```http
POST /config/mergePolicies
```

#### Request
The following request creates a new merge policy, which is configured by the attribute values provided in the payload:

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/config/mergePolicies \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME} \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "All-ID-Order-By-CMS-Loyalty",
    "identityGraph" : {
        "type": "None"
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
* `name`: *(Optional)* A human-friendly name by which the merge policy can be identified in list views.
* `identityGraph.type`: The identity graph type from which to obtain related identities to merge. Possible values: "None", "Private Graph"
* `attributeMerge`: The manner by which to prioritize profile attribute values in the case of data conflicts.
* `schema`: The XDM schema class associated with the merge policy.
* `default`: *(Optional)* Specifies whether this merge policy is the default for the schema.

For more information, see the [components of merge policies](#components-of-merge-policies) section in the Appendix.

#### Response

A successful response returns the details of the newly created merge policy.

```json
{
    "id": "e5bc94de-cd14-4cdf-a2bc-88b6e8cbfac2",
    "name": "All-ID-Order-By-CMS-Loyalty",
    "imsOrgId": "{IMS_ORG}",
    "schema": {
        "name": "_xdm.context.profile"
    },
    "version": 1,
    "identityGraph": {
        "type": "None"
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

## Update a merge policy

You can modify an existing merge policy by editing individual attributes (PATCH) or by overwriting the entire merge policy with new attributes (PUT). Examples of each are shown below.

### Edit individual merge policy fields

You can edit individual fields for a merge policy by making a PATCH request to the `/config/mergePolicies/{mergePolicyId}` endpoint:

#### API format

```http
PATCH /config/mergePolicies/{mergePolicyId}
```

* `{mergePolicyId}`: The ID of the merge policy you want to update.

#### Request

The following request updates a specified merge policy by changing the value of its `default` property to `true`:

```shell
curl -X PATCH \
  https://platform.adobe.io/data/core/ups/config/mergePolicies/e5bc94de-cd14-4cdf-a2bc-88b6e8cbfac2 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME} \
  -H 'Content-Type: application/json' \
  -d '{
    "op": "add",
    "path": "/default",
    "value": "true"
  }'
```

* `op`: Specifies the operation to take. Examples of other PATCH operations can be found in the [JSON Patch documentation](http://jsonpatch.com).
* `path`: The path of the field to update. Accepted values are: 
    * "/name"
    * "/identityGraph.type"
    * "/attributeMerge.type"
    * "/schema.name"
    * "/version"
    * "/default"
* `value`: The value to set the specified field to.

For more information, see the [components of merge policies](#components-of-merge-policies) section in the Appendix.


#### Response

A successful response returns the details of the newly updated merge policy.

```json
{
  "imsOrgId": "{IMS_ORG}",
  "schema": {
    "name": "_xdm.context.profile"
  },
  "name": "All-ID-Order-By-CMS-Loyalty",
  "id": "e5bc94de-cd14-4cdf-a2bc-88b6e8cbfac2",
  "identityGraph": {
    "type": "None"
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

Another way to modify a merge policy is to use a PUT request, which overwrites the entire merge policy.

#### API format

```http
PUT /config/mergePolicies/{mergePolicyId}
```

* `{mergePolicyId}`: The identifier of the merge policy you want to overwrite.

#### Request

The following request overwrites the specified merge policy, replacing its attribute values with those supplied in the payload. Since this request completely replaces an existing merge policy, you are required to supply all of the same fields that were required when originally defining the merge policy. However, this time you are providing updated values for the fields you want to change.

```shell
curl -X PUT \
  https://platform.adobe.io/data/core/ups/config/mergePolicies/b83185bb-0bc6-489c-9363-0075eb30b4c8 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME} \
  -H 'Content-Type: application/json' \
  -d '{
        "name": "All-ID-Order-By-CMS-Loyalty",
        "identityGraph": {
            "type": "None"
        },
        "attributeMerge": {
            "type": "dataSetPrecedence",
            "order": [
                "5bb5331a94ef7e000091b1d4",
                "5a909a508db82e01d6654940"
            ]
        },
        "schema": {
            "name": "_xdm.context.profile"
        },
        "default": true,
        "version": 1,
        "updateEpoch": 1559156392,
        "imsOrgId": "{IMS_ORG}"
      }'
```
* `name`: *(Optional)* A human-friendly name by which the merge policy can be identified in list views.
* `identityGraph`: The identity graph from which to obtain related identities to merge.
* `attributeMerge`: The manner by which to prioritize profile attribute values in the case of data conflicts.
* `schema`: The XDM schema class associated with the merge policy.
* `default`: *(Optional)* Specifies whether this merge policy is the default for the schema.

For more information, see the [components of merge policies](#components-of-merge-policies) section in the Appendix.


#### Response

A successful response returns the details of the updated merge policy.

```json
{
    "id": "b83185bb-0bc6-489c-9363-0075eb30b4c8",
    "name": "All-ID-Order-By-CMS-Loyalty",
    "imsOrgId": "{IMS_ORG}",
    "schema": {
        "name": "_xdm.context.profile"
    },
    "version": 1,
    "identityGraph": {
        "type": "None"
    },
    "attributeMerge": {
        "type":"dataSetPrecedence",
        "order" : [
            "5b020a27e7040801dedbf46e",
            "5b565efc0a488f01e2c19972"
        ]
    },
    "default": true,
    "updateEpoch": 1551898378
}
```

## Next steps

Now that you have created and configured merge policies for your IMS Organization, you can use them to create audience segments from your Real-time Customer Profile data. See the [Create a segment tutorial](../creating_a_segment_tutorial/creating_a_segment_tutorial.md) for more information.

## Appendix

The following information is supplemental to this tutorial and useful when working with merge policies.

## Components of merge policies

Merge policies are private to an organization, allowing you to create different policies for merging different schemas in the ways you need. Any API accessing Profile data requires a merge policy, though a default will be used if one is not explicitly provided. Platform provides a default merge policy, or you can create a merge policy for a specific schema and mark it as the default for your organization. 

Each organization can potentially have multiple merge policies per schema, however each schema can have only one default merge policy. Any merge policy set as default will be used in cases where a merge policy is required but not provided and only the schema name is provided.

When you set a merge policy as the default, any existing merge policy that was previously set as the default will automatically be updated to no longer be used as the default.

### Merge policy

The complete merge policy object represents a set of preferences controlling aspects of merging profile fragments. 

**Merge policy object**

```
    {
        "id": "{MERGE_POLICY_ID}",
        "name": "{NAME}",
        "imsOrgId": "{IMS_ORG}",
        "schema": {
            "name": "{SCHEMA_NAME}"
        },
        "version": 1,
        "identityGraph": {
            "type": "{IDENTITY_GRAPH_TYPE}"
        },
        "attributeMerge": {
            "type": "{ATTRIBUTE_MERGE_TYPE}"
        },
        "default": {BOOLEAN},
        "updateEpoch": {UPDATE_TIME}
    }
```

Where the values are as follows:

|Attribute|Description|
|---|---|
|`id`|The system generated unique identifier assigned at creation time|
|`name`|Friendly name by which the merge policy can be identified in list views.|
|`imsOrgId`|Organization ID to which this merge policy belongs|
|`identityGraph`|[Identity graph](#identity-graph) object indicating the identity graph from which related identities will be obtained. Profile fragments found for all related identities will be merged.|
|`attributeMerge`|[Attribute merge](#attribute-merge) object indicating the manner by which the merge policy will prioritize profile attribute values in the case of data conflicts.|
|`schema`|The [schema](#schema) object on which the merge policy can be used.|
|`default`|Boolean value indicating if this merge policy is the default for the specified schema.|
|`version`|Platform maintained version of merge policy. This read-only value is incremented whenever a merge policy is updated.|
|`updateEpoch`|Date of the last update to the merge policy.|

**Example merge policy**

```
    {
        "id": "10648288-cda5-11e8-a8d5-f2801f1b9fd1",
        "name": "profile-default",
        "imsOrgId": "{IMS_ORG}",
        "schema": {
            "name": "_xdm.context.profile"
        },
        "version": 1,
        "identityGraph": {
            "type": "None"
        },
        "attributeMerge": {
            "type": "timestampOrdered"
        },
        "default": true,
        "updateEpoch": 1551660639
    }
``` 

### Identity graph

[Adobe Experience Platform Identity Service](/api-specification/markdown/narrative/technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md) manages the identity graphs used globally and for each organization on Experience Platform. The `identityGraph` attribute of the merge policy defines how to determine the related identities for a user.

**`identityGraph` object**

```
    "identityGraph": {
        "type": "{IDENTITY_GRAPH_TYPE}"
    }
```

Where `{IDENTITY_GRAPH_TYPE}` is one of the following:

* **"None":** Perform no identity stitching.
* **"Private Graph":** Perform identity stitching based on your private identity graph. If no type is provided, this is the default.

**Example `identityGraph`**

```
    "identityGraph": {
        "type": "None"
    }
```

### Attribute merge

A profile fragment is the profile information for just one identity out of the list of identities that exist for a particular user. When the identity graph type used results in more than one identity, there is a potential for conflicting values for profile properties and priority must be specified. Using `attributeMerge`, you can specify which dataset profile values to prioritize in the event of a merge conflict.

**`attributeMerge` object**

```
    "attributeMerge": {
        "type": "{ATTRIBUTE_MERGE_TYPE}"
    }
```

Where `{ATTRIBUTE_MERGE_TYPE}` is one of the following:

* **"timestampOrdered"**: (default) Give priority to the profile which was updated last in case of conflict. Using this merge type, the `data` attribute is not required.
* **"dataSetPrecedence"** : Give priority to profile fragments based on the dataset from which they came. This could be used when information present in one dataset is preferred or trusted over data in another dataset. When using this merge type, the `data` attribute is required, as it lists the datasets in the order of priority.
    * **"data"**: When "dataSetPrecedence" is used, a `data` field must be supplied with a list of list of datasets. Any datasets not included in the list will not be merged. In other words, datasets must be explicitly listed to be merged into a profile. The `data` object contains an `order` array that lists the IDs of the datasets in order of priority.

**Example `attributeMerge` object using `dataSetPrecedence` type**

```
    "attributeMerge": {
        "type": "dataSetPrecedence",
        "data": {
            "order" : ["dataSetId2", "dataSetId3", "dataSetId1", "dataSetId4"]
        }
    }
```

**Example `attributeMerge` object using `timestampOrdered` type**

```
    "attributeMerge": {
        "type": "timestampOrdered"
    }
```

### Schema

The schema object specifies the XDM schema for which this merge policy is created.

**`schema` object**

```
    "schema": {
        "name": "{SCHEMA_NAME}"
    }
```

Where the value of `name` is the name of the XDM class upon which the schema associated with the merge policy is based.

**Example `schema`**

```
    "schema": {
        "name": "_xdm.context.profile"
    }
```


