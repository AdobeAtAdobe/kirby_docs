
<a name="getclustermembers"></a>
### Given an identity, returns all linked identities in that cluster.
```
GET /data/core/identity/cluster/members
```


#### Description
Given an XID return all XIDs, in the same or other namespaces, that are linked to it by the device graph type. The related XIDs are considered to be part of the same cluster


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
```
json :
"string"
```


##### Request query
```
json :
{
  "graph-type" : "string",
  "xid" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "value" : {
    "version" : "1.0",
    "clusters" : [ {
      "xid" : "27064814400205787570627663430729680462",
      "xidsInCluster" : [ "e8138f65-d3d3-4485-a7e1-6712e047349d", "21312343536983537571245438594" ]
    } ],
    "unprocessedXids" : "[cb0665db616f49758713252d8a335c1e]"
  }
}
```


##### Response 204
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "detail" : "string"
}
```


##### Response 400
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "detail" : "string"
}
```


##### Response 401
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "detail" : "string"
}
```


##### Response 429
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "detail" : "string"
}
```


##### Response 500
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "detail" : "string"
}
```


##### Response 503
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "detail" : "string"
}
```


##### Response 504
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "detail" : "string"
}
```



