
<a name="getclustermembers"></a>
### Given an identity, returns all linked identities in that cluster.
```
GET /data/core/identity/cluster/members
```


#### Description
Given an ID return all IDs, in the same or other namespaces, that are linked to it by the device graph type. The related IDs are considered to be part of the same "cluster".


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|The version of the resource's representation.|string|`"application/vnd.adobe.identity+json;version=1.2"`|
|**Header**|**Authorization**  <br>*required*|Should be a valid IMS token for authenticating with Identity Services|string||
|**Header**|**x-api-key**  <br>*required*|Should be a valid client ID|string||
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id of requesting client|string|`"2ASDRTGUIytrOURsdr1001"`|
|**Header**|**x-uis-cst-ctx**  <br>*optional*|Customer context to be used for stub response|string|`"stub"`|
|**Query**|**graph-type**  <br>*optional*|Graph type (output type) you want to get the cluster from|string|`"coop"`|
|**Query**|**xid**  <br>*required*|Identity string as returned by /identity GET api|string|`"2521328045094711779817"`|
|**Query**|**namespace**  <br>*optional*|Case insensitive namespace enum - {"ecid", "idfa", "gaid", "email", "core"}. "core" is for internal Adobe use only. When namespace is 'core', return ids will be in 'core' namespace and not in 'ecid' namespace.<br>Although both namespace and nsid are optional, specifying one of them is mandatory if xid is not specified.|string|`"ecid"`|
|**Query**|**nsid**  <br>*optional*|Namespace Id. This is provided for backward compatibility with V1. <br> For backward compatibility reasons if the parameter is passed in nsid form, response will be in nsid format (numbers).|int|`411`|
|**Query**|**id**  <br>*required*|Id in that given namespace id.|string|`"2521328045094711779817"`|
|**Query**|**outputNamespaceIncludes**  <br>*required*|Comma separated list of namespace enum values to be included in the output.|string|`"ecid,email"`|
|**Query**|**outputNamespaceIncludes**  <br>*required*|Comma separated list of namespace enum values to be excuded in the output.|string|`"ecid,email"`|

#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK  <br>**Headers** :   <br>`content-type` (string) : Response is a JSON document with UTF-8 encoding. **Default** : `"application/vnd.adobe.identity+json;version=1.2;charset=utf-8;profile= https://ns.adobe.com/schemas/json/identity-cluster-response"`  <br>`cache-control` (string) : caching policy for response. **Default** : `"no-cache"`|[ClusterMembers](../definitions/ClusterMembers.md#clustermembers)|
|**204**|No related IDs were available for the given input|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**400**|Bad Request from the client|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**401**|IMS token is missing or invalid|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**429**|The client is calling the API more times than it has the capacity for right now. The system will auto scale to suit your needs.|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**500**|Unexpected Internal application error|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**503**|The service is unavailable|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**504**|ID Lookup didn't complete in a timely manner from datastore.|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|


#### Produces

* `application/json`


#### Tags

* Cluster


#### Example HTTP request

##### Request path
```
/data/core/identity/cluster/members
```


##### Request header

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|The version of the resource's representation.|string|`"application/vnd.adobe.identity+json;version=1.2"`|
|**Header**|**Authorization**  <br>*required*|Should be a valid IMS token for authenticating with Identity Services|string||
|**Header**|**x-api-key**  <br>*required*|Should be a valid client ID|string||
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id of requesting client|string|`"2ASDRTGUIytrOURsdr1001"`|
|**Header**|**x-uis-cst-ctx**  <br>*optional*|Customer context to be used for stub response|string|`"stub"`|




##### Request query
```

/cluster/members?id=123&namespace=idfa

/cluster/members?xid=252132804&graph-type=coop

/cluster/members?nsid=411&id=7HKS711HKHS&graph-type=coop

/cluster/members?nsid=411&id=7HKS711HKHS&graph-type=coop
```


#### Example HTTP response

##### Response 200

XID format

```
json :
{
  "value" : {
    "version" : "1.0",
    "clusters" : [ {
      "xid" : "27064814400205787570627663430729680462",
      "xidsInCluster" : [ "e8138f65-d3d3-4485-a7e1-6712e047349d", "21312343536983537571245438594" ]
    } ],
    "unprocessedXids" : []
  }
}
```
Namespace format
```
json :
{
    "version": 1,
    "clusters": [{
            "compositeXid": {
                "namespace": 'adcloud",
                "id": "WRbM7AAAAJ_PBZHl"
            },
          
            "members": [{
                    "namespace": "ecid",
                    "id": "27064814400205787570627663430729680462"
                },
                {
                    "namespace": "adcloud",
                    "id": "WRbM7AAAAJ_PBZHl"
                }
            ]
        }
    ],
    "unprocessedNids": []
}
```

##### Response 400
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 401
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 429
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 500
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 503
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 504
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```



