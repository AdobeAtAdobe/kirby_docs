# Identity Services API

Adobe's Identity Services manages cross-device, cross-channel identification of your end consumers as an identity graph. Accessing and interacting with your data in the identity graph is accomplished using the APIs summarized in this document.

## Using the API

This document describes interacting with Identity Namespace Services using Adobe Experience Platform APIs. See the [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html) for information on how to access these services.

![](lightbulb.jpg) Before you start using the APIs, please read though these notes.

* All variations of Cluster and Mapping APIs support both XID and NID in their requests and response. One of the parameters is required - `xid` or combination of (`nsid`, `id`) to use these APIs
* To limit the payload in response, APIs are adapt their responses to `xid` or `uid`. That is, if you pass XID your responses will have XIDs, if you pass NID responses will have NIDs
* The below examples don't cover all usages of XIDs and NIDs. For the complete API, see the [Swagger API Reference](../../../../../../acpdr/swagger-specs/id-namespace-api.yaml)

## Required Headers

All APIs in this document require the following headers unless otherwise indicated:

|Header|Value|Description|
|---|---|---|
|content-type|application/json|The input content type (Only for POST)|
|Authorization|Bearer {TOKEN}|The IMS service token used for authenticating the caller, prefixed with the string "Bearer "|
|Accept|application/vnd.adobe.identity+json;version=1.2|The version of the resource's representation|
|x-gw-ims-org-id|{imsOrgId}, Eg: 17FA2AFD56CF35747F000101@AdobeOrg|The IMS Org ID of client|
|x-api-key|API key|The Client ID/API key of whitelisted client|

# Working with Identity Services

As the single source of truth for identity resolution in Experience Platform, Identity Services provide the following capability:

* __Generation of ID__ - establishment of links between namespaces
* __Computation of identity clusters__ - internal device graph resolves device specific identities
* __Access to identify clusters and mappings through APIs__ - this document covers the Identity Services API

The following are examples meant to describe the way the UIS APIs behave.

## Get XID

Given the Identity Namespace (identified by namespace ID (e.g. "411") or namespace code (e.g. "AMO") as `nsId` or `ns` respectively) and `id` in that Namespace, returns XID string.

```
GET https://platform.adobe.io/data/core/identity?nsId=411&id=WTCpVgAAAFq14FMF HTTP/1.1
```

or

```
GET https://platform.adobe.io/data/core/identity?ns=AMO&id=WTCpVgAAAFq14FMF HTTP/1.1
```

__Example cURL requests__

```
# Request for stubbed data
curl -X GET \
  'https://platform.adobe.io/data/core/identity/identity?nsId=411&id=WTCpVgAAAFq14FMF' \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-uis-cst-ctx: stub' \
  -H 'x-gw-ims-org-id: 111'

# Real API
curl -X GET \
  'https://platform.adobe.io/data/core/identity/identity?nsId=411&id=WTCpVgAAAFq14FMF' \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: 111'
```

![](lightbulb.jpg) NOTE: Usage of `x-uis-cst-ctx: stub` header will return a stubbed response. This is only a stop gap solution for our consumers to facilitate early integration development progress, while services are being completed. We will keep our consumers advised to when this is no longer needed or supported.

__Example response__

Returns an HTTP 200 OK on success.

```
{
    "xid": "CJsDEAMaEAHmCKwPCQYNvzxD9JGDHZ8"
}
```

## Cluster Members API

Given an XID return all XIDs, in the same or other Namespaces, that are linked to it. The related XIDs are considered to be part of the same "cluster".

![](lightbulb.jpg) NOTE: Use optional `graph-type` parameter to indicate the output type to get the cluster from. Options are:

* __coop__ - graph built by using coop data
* __pdg__ - private device graph  

```
GET https://platform.adobe.io/data/core/identity/cluster/members?xid=CJsDEAMaEAHmCKwPCQYNvzxD9JGDHZ8 HTTP/1.1
```

or

```
GET https://platform.adobe.io/data/core/identity/cluster/members?nsId=411&id=WTCpVgAAAFq14FMF HTTP/1.1
```

or

```
GET https://platform.adobe.io/data/core/identity/cluster/members?ns=AMO&id=WTCpVgAAAFq14FMF HTTP/1.1
```


OR, use `POST` as a batch equivalent of `GET` method. Returns the XIDs that belong to the same cluster, for multiple XIDs.

![](lightbulb.jpg) NOTE: Caller should limit their requests to 1000 XIDs. Request exceeding 1000 XIDs will result in 400 status code.

```
POST https://platform.adobe.io/data/core/identity/clusters/members HTTP/1.1
```

__Example body__

```
{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"]
}
```

or

```
{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"],
    "graph-type": "coop"
}
```

or

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
    "graph-type": "coop"
}
```

__Example cURL requests__

```
## Stub
curl -X POST \
  https://platform.adobe.io/data/core/identity/clusters/members \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-uis-cst-ctx: stub' \
  -H 'x-gw-ims-org-id: B3349894589501FE0A494034@AdobeOrg' \
  -d '{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"]
}'

## Real Call - Using XIDs
curl -X POST \
  https://platform.adobe.io/data/core/identity/clusters/members \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: B3349894589501FE0A494034@AdobeOrg' \
  -d '{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"],
    "graph-type": "coop"
}' | json_pp

## Real Call - Using UIDs
curl -X POST \
  https://platform.adobe.io/data/core/identity/clusters/members \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: B3349894589501FE0A494034@AdobeOrg' \
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
    "graph-type": "coop"
}' | json_pp
```

![](lightbulb.jpg) Usage of `x-uis-cst-ctx: stub` header will return a stubbed response. This is only a stop gap solution for our consumers to facilitate early integration development progress, while services are being completed. We will keep our consumers advised to when this is no longer needed or supported.

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

![](lightbulb.jpg) The response will always have one entry for each XID provided in the request regardless of whether a request's XIDs belong to the same cluster or if one or more have any cluster associated at all.

## Cluster History API

Given an XID, return all cluster associations with that XID. Cluster Associations - XIDs can move clusters over the course of various device graph runs, this API provides cluster id associations of a given XID over time.

![](lightbulb.jpg) NOTE: Use optional `graph-type` parameter to indicate the output type to get the cluster from. Options are:

* __coop__ - graph built by using coop data
* __pdg__ - private device graph  

```
GET https://platform.adobe.io/data/core/identity/cluster/history?xid=CJsDEAMaEAHmCKwPCQYNvzxD9JGDHZ8 HTTP/1.1
```

or

```
GET https://platform.adobe.io/data/core/identity/cluster/history?nsId=411&id=WTCpVgAAAFq14FMF HTTP/1.1
```

or

```
GET https://platform.adobe.io/data/core/identity/cluster/history?ns=AMO&id=WTCpVgAAAFq14FMF HTTP/1.1
```

OR, use POST as a batch equivalent of GET method. Returns the cluster history for each of the given XIDs.

![](lightbulb.jpg) Caller should limit their requests to 1000 XIDs. Request exceeding 1000 XIDs will result in 400 status code.

```
POST https://platform.adobe.io/data/core/identity/clusters/history HTTP/1.1
```

__Example body__


```
{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"],
    "graph-type": "coop"
}
```

or

```
{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"],
    "graph-type": "coop"
}
```

or

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
    "graph-type": "coop"
}
```

__Example cURL requests__

```
#Stub Response
curl -X POST \
  https://platform.adobe.io/data/core/identity/clusters/history \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: B3349894589501FE0A494034@AdobeOrg' \
  -H 'x-uis-cst-ctx: stub' \
  -d '{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"],
    "graph-type": "coop"
}'

# Using XIDs
curl -X POST \
  https://platform.adobe.io/data/core/identity/clusters/history \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: B3349894589501FE0A494034@AdobeOrg' \
  -d '{
    "xids": ["GYMBWaoXbMtZ1j4eAAACepuQGhs","b2NJK9a5X7x4LVE4rUqkMyM"],
    "graph-type": "coop"
}' | json_pp

# Using UIDs
curl -X POST \
  https://platform.adobe.io/data/core/identity/clusters/history \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: B3349894589501FE0A494034@AdobeOrg' \
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
    "graph-type": "coop"
}' | json_pp
```

![](lightbulb.jpg) Usage of `x-uis-cst-ctx: stub` header will return a stubbed response. This is only a stop gap solution for our consumers to facilitate early integration development progress, while services are being completed. We will keep our consumers advised to when this is no longer needed or supported.

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

![](lightbulb.jpg) The response will always have one entry for each XID provided in the request regardless of whether a request's XIDs belong to the same cluster or if one or more have any cluster associated at all.

## Mapping API

Given an XID, returns all XID mappings in the requested Namespace (targetNs).

```
GET https://platform.adobe.io/data/core/identity/mapping?xid=CJsDEAMaEAHmCKwPCQYNvzxD9JGDHZ8 HTTP/1.1
```

or

```
GET https://platform.adobe.io/data/core/identity/mapping?nsId=411&id=WTCpVgAAAFq14FMF HTTP/1.1
```

or

```
GET https://platform.adobe.io/data/core/identity/mapping?ns=AMO&id=WTCpVgAAAFq14FMF HTTP/1.1
```

Or, use POST as a batch equivalent of GET method. Returns mappings for multiple identities.

![](lightbulb.jpg) Caller should limit their requests to 1000 XIDs. Request exceeding 1000 XIDs will result in 400 status code.

```
POST https://platform.adobe.io/data/core/identity/mappings HTTP/1.1
```

__Example body__

```
{
    "xids" : ["GesCQXX0CAESEE8wHpswUoLXXmrYy8KBTVgA"],
    "targetNs": "0",
    "graph-type": "coop"
}
```

or

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
 "targetNs": "0",
 "graph-type": "coop"
}
```

__Example cURL requests__

```
# Using XIDs
curl -X POST \
  https://platform.adobe.io/data/core/identity/mappings \
  -H 'authorization: CALLERS_IMS_SERVICE_TOKEN' \
  -H 'content-type: application/json' \
  -H 'x-api-key: CALLERS_API_KEY/CLIENT_ID' \
  -H 'x-gw-ims-org-id: 111111@AdobeOrg' \
  -d '{
 "xids" : ["GesCQXX0CAESEE8wHpswUoLXXmrYy8KBTVgA"],
 "targetNs": "0",
 "graph-type": "coop"
}' | json_pp

# Using UIDs
curl -X POST \
  https://platform.adobe.io/data/core/identity/mappings \
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
 "graph-type": "coop"
}' | json_pp
```

If no related identities were found with the provided input, an `HTTP 204` response code is returned with no content.

![](lightbulb.jpg) Usage of `x-uis-cst-ctx: stub` header will return a stubbed response. This is only a stop gap solution for our consumers to facilitate early integration development progress, while services are being completed. We will keep our consumers advised to when this is no longer needed or supported.

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
