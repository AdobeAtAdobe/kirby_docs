
<a name="getlistofmappings"></a>
### Given set of identities and target namespace, returns the corresponding linked identities.
```
POST /data/core/identity/mappings
```


#### Description
Given an identity, returns all identity mappings in requested namespace (target namespace).


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|The version of the resource's representation.|string|`"application/vnd.adobe.identity+json;version=1.2"`|
|**Header**|**Authorization**  <br>*required*|Should be a valid IMS token for authenticating with Identity Services|string||
|**Header**|**x-api-key**  <br>*required*|Should be a valid client ID|string||
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id of requesting client|string|`"2ASDRTGUIytrOURsdr1001"`|
|**Header**|**x-uis-cst-ctx**  <br>*optional*|Customer context to be used for stub response|string|`"stub"`|


#### Body parameter
List of identities for which we need to find related mappings

*Name* : body  
*Flags* : required  
*Type* : [ListOfMappings](../definitions/ListOfMappings.md#listofmappings)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK  <br>**Headers** :   <br>`content-type` (string) : Response is a JSON document with UTF-8 encoding. **Default** : `"application/vnd.adobe.identity+json;version=1.2;charset=utf-8"`  <br>`cache-control` (string) : caching policy for response. **Default** : `"no-cache"`|[mappingResponse](../definitions/mappingResponse.md#mappingresponse)|
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

* mappings


#### Example HTTP request

##### Request path
```
/data/core/identity/mappings
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
  "identities" : [ {
    "xid" : "string"
  } ],
  "targetNS" : [ 0 ],
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
    "version" : 1,
    "mappings" : [ {
      "xid" : "CAESEPl1uYyma1kMDWxx7dhbwGo",
      "mapping" : [ {
        "xid" : "81218968060697815473313992060878182012",
        "lastAssociationTime" : "1493310475047"
      } ],
      "regions" : [ {
        "regionId" : 10,
        "lastAssociationTime" : "1493310475047"
      } ]
    }, {
      "xid" : "VtZu9QAABVHLXi37",
      "mapping" : [ {
        "xid" : "21684852643374208863181383242303716482",
        "lastAssociationTime" : "1493310475047"
      } ],
      "regions" : [ {
        "regionId" : 9,
        "lastAssociationTime" : "1499463357424"
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



