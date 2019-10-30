# Identity Service API developer guide

Adobe Experience Platform Identity Service manages the cross-device, cross-channel, and near real-time identification of your customers as an identity graph in Adobe Experience Platform. This document discusses working with your identity graph using Experience Platform APIs, including:

* [Labeling a field as identity](#label-a-field-as-identity) - Identity Service will interpret XDM field values as identities for all fields labeled as identity. Labeling a field as identity is a function of using the Schema Registry API to add a descriptor to a field.  
* [Getting cluster identities](#get-all-identities-in-a-cluster) - A cluster is a collection of all identities which identify the same individual, across all namespaces.  
* [Getting the cluster history of an identity](#get-the-cluster-history-of-an-identity) - Identities can move clusters over the course of various device graph runs. A cluster's history provides the cluster associations of a given identity over time.  
* [Getting identity mappings](#get-identity-mappings) - A mapping is a collection of all identities in a cluster, for a specified namespace.  
* [Listing available namespaces](#listing-available-namespaces) - View all namespaces available for use by your organization. For more on namespaces, visit the[Identity namespace overview](../identity_namespace_overview/identity_namespace_overview.md).  
* [Creating a custom namespace](#creating-a-custom-namespace) - Create custom namespaces for classifying your identities.  
* [Getting the native ID for an identity](#get-the-xid-for-an-identity) - A fully qualified identity consists of an ID value and a namespace. Upon persisting a new identity, Identity Service generates and associates a single ID, referred to as the XID or native ID, representing the composite identity properties. Identities can be referenced by XID in API calls, as well as identity maps in XDM data.  

## Getting started

This tutorial requires a working understanding of the following components of Adobe Experience Platform:

* [Identity Service](../../technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md): Identity Service solves the fundamental challenge posed by the fragmentation of consumer profile data. It does this by bridging identities across devices and across the various systems whereby your consumers engage with your brand. 
* [Experience Data Model (XDM)](../../technical_overview/schema_registry/schema_composition/schema_composition.md) provides the framework to refer to and manage the schemas that your data must conform to for use as entities on Platform. Some services covered by this overview require an understanding of XDM schema fields and how to refer to an individual field by name.

The following sections provide additional information that you will need to know or have on-hand in order to successfully make calls to the Identity Service API.

### Reading sample API calls

This guide provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../sandboxes/sandboxes-overview.md). 

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

### Region-based routing

The Identity Service API employs region-specific endpoints that require the inclusion of a `{REGION}` as part of the request path. During the provisioning of your IMS Organization, a region is determined and stored within your IMS Org profile. Using the correct region with each endpoint ensures that all requests made using the Identity Service API are routed to the appropriate region. 

There are two regions currently supported by Identity Service APIs: VA7 and NLD2. 

The table below shows example paths using regions:

|Service|Region: VA7|Region: NLD2
|------|--------|---------|
|Identity Service API|https://platform-va7.adobe.io/data/core/identity/{ENDPOINT}|https://platform-nld2.adobe.io/data/core/identity/{ENDPOINT}
|Identity Namespace API|https://platform-va7.adobe.io/data/core/idnamespace/{ENDPOINT}|https://platform-nld2.adobe.io/data/core/idnamespace{ENDPOINT}|

> Note: Requests made without specifying a region may result in calls routing to the incorrect region or cause calls to fail unexpectedly.

If you are unable to locate the region within your IMS Org profile, please contact your system administrator for support.

## Using the Identity Service API

Identity parameters used in these services can be expressed in one of two ways; composite or XID. 

Composite identities are constructs including both the ID value and namespace. When using composite identities, the namespace can be supplied by either name (`namespace.code`) or ID (`namespace.id`).

When an identity is persisted, Identity Service generates and assigns an ID to that identity, called the native ID, or XID. All variations of Cluster and Mapping APIs support both composite identities and XID in their requests and response. One of the parameters is required - `xid` or combination of [`ns` or `nsid`] and `id` to use these APIs.

To limit the payload in response, APIs adapt their responses to the type of identity construct used. That is, if you pass XID your responses will have XIDs, if you pass composite identities, the response will follow the structure used in the request.

The below examples don't cover all Identity Service APIs fully. For the complete API, see the [Swagger API Reference](../../../../../../acpdr/swagger-specs/id-service-api.yaml).

> **Note:**
> 
> * All member identities returned will be in native XID form when native XID is used in the request
> * We recommend using ID/namespace form
> * Getting the XID for an identity is covered [below](#get-the-xid-for-an-identity)

## Label a field as identity

Fields that contain personally identifiable information (PII) can be labeled as identity fields. A value provided in an identity field is interpreted as an identity by Identity Service. The namespace of the identity is specified as a part of labeling the field.

The following criteria must be met for a field to be labeled as identity:

* Only string type fields can be used for identity
* Identities are only recognized in record and time series data
* Only PII fields should be marked as identity. Choosing a field representing more generic data would result in less precise relationships and potentially errors accessing related identities from the identity graph

For instructions on how to use the Schema Registry API to label a field as identity, visit [Create a descriptor](../schema_registry/schema_registry_developer_guide.md#create-descriptor).

## Get all identities in a cluster

Identities that are related in an identity graph, regardless of namespace, are considered to be part of the same "cluster" in that identity graph. The options below provide the means to access all cluster members.

### Get associated identities for a single identity

Retrieve all cluster members for a single identity.

You can use the optional `graph-type` parameter to indicate the identity graph to get the cluster from. Options are:
* None - Perform no identity stitching.
* Private Graph - Perform identity stitching based on your private identity graph. If no `graph-type` is provided, this is the default.

__Service endpoint__

```
GET https://platform-{REGION}.adobe.io/data/core/identity/cluster/members?{PARAMETERS}
```

__Example requests__

Option 1: Supply the identity as namespace (`nsId`, by ID) and ID value (`id`). 
```
curl -X GET \
  'https://platform-va7.adobe.io/data/core/identity/cluster/members?nsId=411&id=WTCpVgAAAFq14FMF' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

Option 2: Supply the identity as namespace (`ns`, by name) and ID value (`id`).
```
curl -X GET \
  'https://platform-va7.adobe.io/data/core/identity/cluster/members?ns=AMO&id=WTCpVgAAAFq14FMF' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

Option 3: Supply the identity as XID (`xid`). For more on how to obtain an identity's XID, see the section of this document covering [getting the XID for an identity](#get-the-xid-for-an-identity).
```
curl -X GET \
  'https://platform-va7.adobe.io/data/core/identity/cluster/members?xid=CJsDEAMaEAHmCKwPCQYNvzxD9JGDHZ8' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

### Get associated identities for multiple identities

Use `POST` as a batch equivalent of the `GET` method described above to return the identities in the clusters of multiple identities.

> **NOTE:** Request should indicate no more than a maximum of 1000 identities. Requests exceeding 1000 identities will result in 400 status code.

__Service endpoint__

```
POST https://platform-{REGION}.adobe.io/data/core/identity/clusters/members
```

__Request body__

The following demonstrates supplying a list of XIDs for which to retrieve cluster members.
```
{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"]
}
```

__Example requests__

```
## Stub
curl -X POST \
  https://platform-va7.adobe.io/data/core/identity/clusters/members \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-uis-cst-ctx: stub' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"]
}'

## Real Call - Using XIDs
curl -X POST \
  https://platform-va7.adobe.io/data/core/identity/clusters/members \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"],
    "graph-type": "Private Graph"
}' | json_pp

## Real Call - Using UIDs
curl -X POST \
  https://platform-va7.adobe.io/data/core/identity/clusters/members \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "compositeXids": [{
            "nsid": 411,
            "id": "WRbM7AAAAJ_PBZHl"
        },
        {
            "nsid": 411,
            "id": "WY-RNgAAArI4rGBo"
        }
    ],
    "graph-type": "Private Graph"
}' | json_pp
```

> **Note:** Usage of `x-uis-cst-ctx: stub` header will return a stubbed response. This is only a stop gap solution for our consumers to facilitate early integration development progress, while services are being completed. We will keep our consumers advised to when this is no longer needed or supported.

### Responses for requests for cluster members

__Example stubbed response__

```
{
   "version": 1,
   "clusters": [{
           "xid": "GZsBQnHQaGtL46ZKSvO9bNRE1DcUyQA",
           "compositeXid": {
               "nsid": 411,
               "id": "WRbM7AAAAJ_PBZHl"
           },
           "members": ["e8138f65-d3d3-4485-a7e1-6712e047349d", "21312343536983537571245438594"],
           "members": [{
                   "nsid": 0,
                   "id": "27064814400205787570627663430729680462"
               },
               {
                   "nsid": 411,
                   "id": "86826386186182763871263871263876128612"
               }
           ]
       },
       {
           "xid": "CJsDEAMaEAHmCKwPCQYNvzxD9JGDHZ8",
           "compositeXid": {
               "nsid": 411,
               "id": "WRbM7AAAAJ_PBZHl"
           },
           "members": [],
           "members": []
       }
   ],
   "unprocessedXids": ["cb0665db616f49758713252d8a335c1e"],
   "unprocessedNids": [{
       "nsid": 411,
       "id": "WY-RNgAAArI4rGBo"
   }]
}
```

__Example real response__

```
{
   "unprocessedXids": [],
   "unprocessedNids": [],
   "version": "1.0.0",
   "clusters": [{
           "xid": "411|WRbM7AAAAJ_PBZHl",
           "members": [
               "411|WRbM7AAAAJ_PBZHl",
               "0|47713142741924778930324734610798294416"
           ],
           "compositeXid": {
               "nsid": 411,
               "id": "WRbM7AAAAJ_PBZHl"
           },
           "members": [{
                   "nsid": 411,
                   "id": "WRbM7AAAAJ_PBZHl"
               },
               {
                   "nsid": 0,
                   "id": "47713142741924778930324734610798294416"
               }
           ]
       },
       {
           "xid": "411|WY-RNgAAArI4rGBo",
           "compositeXid": {
               "nsid": 411,
               "id": "WY-RNgAAArI4rGBo"
           },
           "members": [
               "411|WY-RNgAAArI4rGBo",
               "411|WY-RNgAAArI4rGGy"
           ],
           "members": [{
                   "nsid": 411,
                   "id": "WY-RNgAAArI4rGBo"
               },
               {
                   "nsid": 411,
                   "id": "WY-RNgAAArI4rGGy"
               }
           ]

       }
   ]
}
```

> **Note:** The response will always have one entry for each XID provided in the request regardless of whether a request's XIDs belong to the same cluster or if one or more have any cluster associated at all.

## Get the cluster history of an identity

Identities can move clusters over the course of various device graph runs. Identity Service provides visibility into the cluster associations of a given identity over time.

> **Note:** Use optional `graph-type` parameter to indicate the output type to get the cluster from. Options are:
> * None - Perform no identity stitching.
> * Private Graph - Perform identity stitching based on your private identity graph. If no `graph-type` is provided, this is the default.

### Get the cluster history of a single identity

__Service endpoint__

```
GET https://platform-{REGION}.adobe.io/data/core/identity/cluster/history
```

__Example requests__

Option 1: Supply the identity as namespace (`nsId`, by ID) and ID value (`id`). 
```
curl -X GET \
  'https://platform-va7.adobe.io/data/core/identity/cluster/history?nsId=411&id=WTCpVgAAAFq14FMF' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

Option 2: Supply the identity as namespace (`ns`, by name) and ID value (`id`).
```
curl -X GET \
  'https://platform-va7.adobe.io/data/core/identity/cluster/history?ns=AMO&id=WTCpVgAAAFq14FMF' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

Option 3: Supply the identity as XID (`xid`). For more on how to obtain an identity's XID, see the section of this document covering [getting the XID for an identity](#get-the-xid-for-an-identity).
```
curl -X GET \
  'https://platform-va7.adobe.io/data/core/identity/cluster/history?xid=CJsDEAMaEAHmCKwPCQYNvzxD9JGDHZ8' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

### Get the cluster history of a multiple identities

Use the `POST` method as a batch equivalent of the `GET` method described above to return the cluster histories of multiple identities.

> **NOTE:** Request should indicate no more than a maximum of 1000 identities. Requests exceeding 1000 identities will result in 400 status code.

__Service endpoint__

```
POST https://platform-va7.adobe.io/data/core/identity/clusters/history
```

__Example body__

Option 1: Supply a list of XIDs for which to retrieve cluster members.
```
{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"],
    "graph-type": "Private Graph"
}
```

Option 2: Supply a list of identities as composite IDs, where each names the ID value and namespace by namespace code.
```
{
    "compositeXids": [{
            "ns": "AdCloud",
            "id": "WRbM7AAAAJ_PBZHl"
        },
        {
            "ns": "AddCloud",
            "id": "WY-RNgAAArI4rGBo"
        }
    ]
}
```

__Example requests__

```
#Stub Response
curl -X POST \
  https://platform-va7.adobe.io/data/core/identity/clusters/history \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'x-uis-cst-ctx: stub' \
  -d '{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"],
    "graph-type": "Private Graph"
}'

# Using XIDs
curl -X POST \
  https://platform-va7.adobe.io/data/core/identity/clusters/history \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"],
    "graph-type": "Private Graph"
}' | json_pp

# Using UIDs
curl -X POST \
  https://platform-va7.adobe.io/data/core/identity/clusters/history \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "compositeXids": [{
            "nsid": 411,
            "id": "WRbM7AAAAJ_PBZHl"
        },
        {
            "nsid": 411,
            "id": "WY-RNgAAArI4rGBo"
        }
    ],
    "graph-type": "Private Graph"
}' | json_pp
```

> **Note:** Usage of `x-uis-cst-ctx: stub` header will return a stubbed response. This is only a stop gap solution for our consumers to facilitate early integration development progress, while services are being completed. We will keep our consumers advised to when this is no longer needed or supported.

__Example response__

```
{
    "version": 1,
    "xidsClusterHistory": [{
            "xid": "GZsBQnHQaGtL46ZKSvO9bNRE1DcUyQA",
            "compositeXid": {
                "nsid": 411,
                "id": "WY-RNgAAArI4rGBo"
            },
            "clusterHistory": [{
                    "clusterId": "4c686f23-0871-41c2-b4f4-adef89f6bd2c",
                    "cRecordedTS": "1504741401382"
                },
                {
                    "clusterId": "29bf066c-971a-11e7-abc4-cec278b6b50a",
                    "cRecordedTS": "1502063001629"
                },
                {
                    "clusterId": "aeb2f60c-b0f1-446a-91dd-d28ab6a44ff9",
                    "cRecordedTS": "1499384601763"
                }
            ]
        },
        {
            "xid": "CJsDEAMaEAHmCKwPCQYNvzxD9JGDHZ8",
            "compositeXid": {
                "nsid": 411,
                "id": "WY-RNgAAArI4rGBo"
            },
            "clusterHistory": [{
                "clusterId": "4c686f23-0871-41c2-b4f4-adef89f6bd2c",
                "cRecordedTS": "1504741401937"
            }]
        }
    ],
    "unprocessedXids": ["cb0665db616f49758713252d8a335c1e"],
    "unprocessedNids": [{
        "nsid": 411,
        "id": "WY-RNgAAArI4rGBo"
    }]

}
```

> **Note:** The response will always have one entry for each XID provided in the request regardless of whether a request's XIDs belong to the same cluster or if one or more have any cluster associated at all.

## Get identity mappings

A mapping is a collection of all identities in a cluster, for a specified namespace

### Get an identity mapping for a single identity

Given an identity, retrieve all related identities from the same namespace as that represented by the identity in the request.

__Service endpoint__

```
GET https://platform-{REGION}.adobe.io/data/core/identity/mapping
```

__Example requests__

Option 1: Supply the identity as namespace (`nsId`, by ID) and ID value (`id`). 
```
curl -X GET \
  'https://platform-va7.adobe.io/data/core/identity/mapping?nsId=411&id=WTCpVgAAAFq14FMF' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

Option 2: Supply the identity as namespace (`ns`, by name) and ID value (`id`).
```
curl -X GET \
  'https://platform-va7.adobe.io/data/core/identity/mapping?ns=AMO&id=WTCpVgAAAFq14FMF' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

Option 3: Supply the identity as XID (`xid`). For more on how to obtain an identity's XID, see the section of this document covering [getting the XID for an identity](#get-the-xid-for-an-identity).
```
curl -X GET \
  'https://platform-va7.adobe.io/data/core/identity/mapping?xid=CJsDEAMaEAHmCKwPCQYNvzxD9JGDHZ8' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

### Get identity mappings for multiple identities

Use the `POST` method as a batch equivalent of the `GET` method described above to retrieve mappings for multiple identities.

> **NOTE:** Request should indicate no more than a maximum of 1000 identities. Requests exceeding 1000 identities will result in 400 status code.

__Service endpoint__

```
POST https://platform.adobe.io/data/core/identity/mappings
```

__Example body__

Option 1: Supply a list of XIDs for which to retrieve mappings.

```
{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"],
    "graph-type": "Private Graph"
}
```

Option 2: Supply a list of identities as composite IDs, where each names the ID value and namespace by namespace ID. This example demonstrates using this method while overwriting the default `graph-type` of "Private Graph".
```
{
    "compositeXids": [{
            "nsid": 411,
            "id": "WRbM7AAAAJ_PBZHl"
        },
        {
            "nsid": 411,
            "id": "WY-RNgAAArI4rGBo"
        }
    ],
    "graph-type": "None"
}
```

__Example cURL requests__

```
# Using XIDs
curl -X POST \
  https://platform-va7.adobe.io/data/core/identity/mappings \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: 111111@AdobeOrg' \
  -d '{
 "xids" : ["GesCQXX0CAESEE8wHpswUoLXXmrYy8KBTVgA"],
 "targetNs": "0",
 "graph-type": "Private Graph"
}' | json_pp

# Using UIDs
curl -X POST \
  https://platform-va7.adobe.io/data/core/identity/mappings \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: 111111@AdobeOrg' \
  -d '{
    "compositeXids": [{
            "nsid": 411,
            "id": "WRbM7AAAAJ_PBZHl"
        },
        {
            "nsid": 411,
            "id": "WY-RNgAAArI4rGBo"
        }
    ],
 "targetNs": "0",
 "graph-type": "Private Graph"
}' | json_pp
```

If no related identities were found with the provided input, an `HTTP 204` response code is returned with no content.

> **Note:** Usage of `x-uis-cst-ctx: stub` header will return a stubbed response. This is only a stop gap solution for our consumers to facilitate early integration development progress, while services are being completed. We will keep our consumers advised to when this is no longer needed or supported.

__Example response__

```
{
    "version": 1,
    "mappings": [{
        "xid": "CAESEPl1uYyma1kMDWxx7dhbwGo",
        "mapping": [{
            "xid": "81218968060697815473313992060878182012",
            "lastAssociationTime": "1493310475047"
        }],
        "compositeXid": {
            "nsid": 411,
            "id": "WY-RNgAAArI4rGBo"
        },
        "mapping": [{
            "compositeXid": {
                "nsid": 411,
                "id": "WY-RNchvdsTSJS"
            },
            "lastAssociationTime": "1493310475047"
        }],

        "regions": [{
            "regionId": "10",
            "lastAssociationTime": "1493310475047"
        }]
    }],
    "unprocessedXids": ["cb0665db616f49758713252d8a335c1e"],
    "unprocessedNids": [{
        "nsid": 411,
        "id": "WY-RNgAAArI4rGBo"
    }]
}
```

Where `lastAssociationTime` represents the timestamp when the input identity was last associated with this this identity and a `region` is a tuple of `regionId` and `lastAssociationTime` for where the identity was seen.

---

## Listing available namespaces

__Service endpoint__

```
GET https://platform-{REGION}.adobe.io/data/core/idnamespace/identities
```

__Example request__

```
curl -X GET \
  'https://platform-va7.adobe.io/data/core/idnamespace/identities' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

__Example response__

```
[
  {
        "updateTime": 1441122419000,
        "code": "CORE",
        "status": "ACTIVE",
        "description": "CORE Namespace",
        "id": 0,
        "createTime": 1441122419000,
        "idType": "COOKIE",
        "name": "CORE",
        "custom": false
    },
    {
        "updateTime": 1495153678000,
        "code": "ECID",
        "status": "ACTIVE",
        "description": "ECID Namespace",
        "id": 4,
        "createTime": 1495153678000,
        "idType": "COOKIE",
        "name": "ECID",
        "custom": false
    },
    {
        "updateTime": 1522783145000,
        "code": "AdCloud",
        "status": "ACTIVE",
        "description": "Adobe AdCloud - ID Syncing Partner",
        "id": 411,
        "createTime": 1522783145000,
        "idType": "COOKIE",
        "name": "AdCloud",
        "custom": false
    },
    ...
]
```

## Creating a custom namespace

When your goals require a Namespace besides what is available, you can create a custom Namespace which will be available only to your organization.

For recommendations around creating custom Namespaces, see [the FAQ](../identity_services_architectural_overview/identity_services_faq.md).

> **Note:** Namespaces are a qualifier for identities. As such, once a Namespace has been created, it cannot be deleted.

__Service endpoint__

```
POST https://platform-va7.adobe.io/data/core/idnamespace/identities
```

__Example request to create a Namespace__

```
curl -X POST \
  https://platform-va7.adobe.io/data/core/idnamespace/identities \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'x-uis-cst-ctx: stub' \
  -d '{
  "description": "Test Namespace Details",
  "idType": "COOKIE",
  "code": "TEST",
  "name": "Test Namespace"
}'
```
__Example body__


__Example response__

```
{
    "updateTime": 1525129290000,
    "code": "TEST",
    "status": "ACTIVE",
    "description": "Test Namespace Details",
    "id": 56011,
    "createTime": 1525129290000,
    "idType": "COOKIE",
    "name": "Test Namespace",
    "custom": false
}
```

---

## Advanced Topics

### Get the XID for an identity

Identity data is typically provided as an ID string value and identity namespace in XDM data ingested, and when supplying an identity for use in an API call. When identities are persisted in Identity Service, an ID is generated and assigned to that identity, called the native XID. Platform APIs requiring identity data support using this more compact form for the aggregated ID and namespace. XID is a base64 encoded string.

> **Note:** This format is mainly for internal Adobe use. Native XID as a singular value is more space efficient and is what is used internally within Platform solutions for storage and serialization. However it is not human readable, it is opaque, and requires a separate call to obtain it to use.

Acquire the XID for a given ID value and namespace using the service described in this section.

__Service endpoint__

```
GET https://platform-{REGION}.adobe.io/data/core/identity/identity?namespace={NAMESPACE}&id={ID_VALUE}
```

__Example request__

```
curl -X GET \
  'https://platform-va7.adobe.io/data/core/identity/identity?namespace=email&id=test@adobetest.com' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

__Example response__

```
{
    "xid":"BVrqzwVuzbXrLfmnaG3rXrLf3KJg"
}
```
