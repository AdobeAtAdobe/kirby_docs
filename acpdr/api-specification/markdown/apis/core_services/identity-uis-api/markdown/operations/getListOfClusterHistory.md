
<a name="getlistofclusterhistory"></a>
### Given a set of XIDs, return all corresponding cluster association statistics
```
POST /data/core/identity/clusters/history
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
List of ID's for which we need to find related cluster IDs

*Name* : body  
*Flags* : required  
*Type* : [ListOfIdentity](../definitions/ListOfIdentity.md#listofidentity)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK  <br>**Headers** :   <br>`content-type` (string) : Response is a JSON document with UTF-8 encoding. **Default** : `"application/vnd.adobe.identity+json;version=1.2;charset=utf-8"`  <br>`cache-control` (string) : caching policy for response. **Default** : `"no-cache"`|[ClusterHistory](../definitions/ClusterHistory.md#clusterhistory)|
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
/data/core/identity/clusters/history
```


##### Request header
```
json :
"string"
```


##### Request body
```
json :
{
  "xids" : [ {
    "xid" : "string"
  } ],
  "graph-type" : "string",
  "imsOrgId" : "string",
  "version" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "value" : {
    "version" : "1",
    "xidsClusterHistory" : [ {
      "xid" : "27064814400205787570627663430729680462",
      "clusterHistory" : [ {
        "clusterId" : "4c686f23-0871-41c2-b4f4-adef89f6bd2c",
        "cRecordedTS" : "1504741401382"
      }, {
        "clusterId" : "29bf066c-971a-11e7-abc4-cec278b6b50a",
        "cRecordedTS" : "1502063001629"
      }, {
        "clusterId" : "aeb2f60c-b0f1-446a-91dd-d28ab6a44ff9",
        "cRecordedTS" : "1499384601763"
      } ]
    }, {
      "xid" : "WTCpVgAAAFq14FMF",
      "clusterHistory" : [ {
        "clusterId" : "4c686f23-0871-41c2-b4f4-adef89f6bd2c",
        "cRecordedTS" : "1504741401937"
      } ]
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



