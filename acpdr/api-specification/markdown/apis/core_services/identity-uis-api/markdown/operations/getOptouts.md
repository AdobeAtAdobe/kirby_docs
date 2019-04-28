
<a name="optout"></a>
### Given a timestamp, return all opted out id's for a customer
```
GET /data/core/identity/optout
```

#### Description
Given a timestamp returns all public (not internal to Adobe) IDs opted out for the given client as identified by IMS org id. Note that this does not include transitive opt outs using identity graph.

#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|The version of the resource's representation.|string|`"application/vnd.adobe.identity+json;version=1.2"`|
|**Header**|**Authorization**  <br>*required*|Should be a valid IMS token for authenticating with Identity Services|string||
|**Header**|**x-api-key**  <br>*required*|Should be a valid client ID|string|<api-key>|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id of requesting client|string|`"2ASDRTGUIytrOURsdr1001"`|
|**Query**|**timestamp**  <br>*required*|timestamp in RFC3339 format.This method returns all opted out ids in the time range [timestamp, NOW].|timestamp|`2018-08-15T15:10:50Z`|

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

##### Request query
```

/identity/optout?timestamp=2018-08-15T15:10:50Z

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