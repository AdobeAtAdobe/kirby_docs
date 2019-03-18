
<a name="getlistofclustermembers"></a>
### Given set of identities, returns all linked identities in cluster corresponding to each identity.
```
POST /data/core/identity/clusters/members
```


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|The version of the resource's representation.|string|`"application/vnd.adobe.identity+json;version=1.2"`|
|**Header**|**Authorization**  <br>*required*|Should be a valid IMS token for authenticating with Identity Services|string||
|**Header**|**x-api-key**  <br>*required*|Should be a valid client ID|string||
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id of requesting client|string|`"2ASDRTGUIytrOURsdr1001"`|
|**Header**|**x-uis-cst-ctx**  <br>*optional*|Customer context to be used for stub response|string|`"stub"`|


#### Body parameter
List of ID's for which we need to find related IDs

*Name* : body  
*Flags* : required  
*Type* : [ListOfIdentity](../definitions/ListOfIdentity.md#listofidentity)


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


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Cluster


#### Example HTTP request

##### Request path
```
/data/core/identity/clusters/members
```


##### Request header

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|The version of the resource's representation.|string|`"application/vnd.adobe.identity+json;version=1.2"`|
|**Header**|**Authorization**  <br>*required*|Should be a valid IMS token for authenticating with Identity Services|string||
|**Header**|**x-api-key**  <br>*required*|Should be a valid client ID|string||
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id of requesting client|string|`"2ASDRTGUIytrOURsdr1001"`|
|**Header**|**x-uis-cst-ctx**  <br>*optional*|Customer context to be used for stub response|string|`"stub"`|



##### Request body

Xid format
```
json :
{
  "xids" : [ {
    "xid" : "string"
  } ],
  "graph-type" : "string"
}
```
Namespace format

```
json :
{
  "CompositeXids" : [ {
    "namespace" : "ecid",
    "id" : "567890876543123467789000987765"
  } ],
  "graph-type" : "coop"
}
```

#### Example HTTP response

##### Response 200

Xid format
```
json :
{
  "value" : {
    "version" : "1.0",
    "clusters" : [ {
      "xid" : "27064814400205787570627663430729680462",
      "xidsInCluster" : [ "e8138f65-d3d3-4485-a7e1-6712e047349d", "21312343536983537571245438594" ]
    }, {
      "xid" : "WTCpVgAAAFq14FMF",
      "xidsInCluster" : [ ]
    } ],
    "unprocessedXids" : "[cb0665db616f49758713252d8a335c1e]"
  }
}
```
Namespace format
```
json:
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
    "unprocessedNids": [{
        "namespace": "adcloud",
        "id": "WY-RNgAAArI4rGBo"
    }]
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