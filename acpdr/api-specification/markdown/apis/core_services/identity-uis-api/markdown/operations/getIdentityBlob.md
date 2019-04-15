
<a name="getidentityblob"></a>
### Given an id and namespace returns an identity string
```
GET /data/core/identity/identity
```


#### Description
Given the namespace and id in that namespace, returns XID string.


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|The version of the resource's representation.|string|`"application/vnd.adobe.identity+json;version=1.2"`|
|**Header**|**Authorization**  <br>*required*|Should be a valid IMS token for authenticating with Identity Services|string||
|**Header**|**x-api-key**  <br>*required*|Should be a valid client ID|string||
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id of requesting client|string|`"2ASDRTGUIytrOURsdr1001"`|
|**Header**|**x-uis-cst-ctx**  <br>*optional*|Customer context to be used for stub response|string|`"stub"`|
|**Query**|**id**  <br>*required*|Id in given namespace|string|`"2521328045094711779817"`|
|**Query**|**ns**  <br>*optional*|namespace string|string|`"411"`|
|**Query**|**nsId**  <br>*required*|namespace string|integer|`411`|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK  <br>**Headers** :   <br>`content-type` (string) : Response is a JSON document with UTF-8 encoding. **Default** : `"application/vnd.adobe.identity+json;version=1.2;charset=utf-8"`  <br>`cache-control` (string) : caching policy for response. **Default** : `"no-cache"`|[Response 200](#getidentityblob-response-200)|
|**204**|No related IDs were available for the given input|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**400**|Bad Request from the client|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**401**|IMS token is missing or invalid|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**429**|The client is calling the API more times than it has the capacity for right now. The system will auto scale to suit your needs.|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**500**|Unexpected Internal application error|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**503**|The service is unavailable|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|
|**504**|ID Lookup didn't complete in a timely manner from datastore.|[ServiceErrorStatus](../definitions/ServiceErrorStatus.md#serviceerrorstatus)|

<a name="getidentityblob-response-200"></a>
**Response 200**

|Name|Description|Schema|
|---|---|---|
|**identity**  <br>*optional*|**Example** : `"HHDAHDKYYD"`|string|


#### Produces

* `application/json`


#### Tags

* Identity


#### Example HTTP request

##### Request path
```
/data/core/identity/identity
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
  "id" : "string",
  "ns" : "string",
  "nsId" : 0
}
```


#### Example HTTP response

##### Response 200
```
json :
"object"
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



