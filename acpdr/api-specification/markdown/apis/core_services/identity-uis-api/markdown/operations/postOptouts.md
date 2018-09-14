
<a name="optout"></a>
### Given a timestamp, return all opted out id's for a customer
```
POST /data/core/identity/optout
```

#### Description
A batch equivalent of GET method. Returns all public IDs opted out for the given client as identified by IMS org id, in the same or other namespaces, that are linked to it by the device graph type. 

GET and POST supports the same functionality [and not a batch version] and is only provided for consistency with other functions


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|The version of the resource's representation.|string|`"application/vnd.adobe.identity+json;version=1.2"`|
|**Header**|**Authorization**  <br>*required*|Should be a valid IMS token for authenticating with Identity Services|string||
|**Header**|**x-api-key**  <br>*required*|Should be a valid client ID|string|<api-key>|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id of requesting client|string|`"2ASDRTGUIytrOURsdr1001"`|
|**Header**|**Content-type**  <br>*required*|Response is a JSON document with UTF-8 encoding|string|`"application/json"`|


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


#### Example HTTP request

##### Request path
```
/data/core/identity/optout
```

##### Request header

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|The version of the resource's representation.|string|`"application/vnd.adobe.identity+json;version=1.2"`|
|**Header**|**Authorization**  <br>*required*|Should be a valid IMS token for authenticating with Identity Services|string||
|**Header**|**x-api-key**  <br>*required*|Should be a valid client ID|string||
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id of requesting client|string|`"2ASDRTGUIytrOURsdr1001"`|

##### Request body
```

json :
{
"timestamp": "2018-08-15T15:10:50Z"
}

```

#### Example HTTP response

##### Response 200
```
json :
{
  "value" : {
    "version" : "1.1",
    "optoutids" : [ "12345TY6789000", "2ASDRTGUIytrOURsdr1001"]
  }
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