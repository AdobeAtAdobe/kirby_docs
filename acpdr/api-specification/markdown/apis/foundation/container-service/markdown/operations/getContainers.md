
<a name="getcontainers"></a>
### Lists all the containers in the hierarchy.
```
GET /containers
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of containers|< [containerResponse](../definitions/containerResponse.md#containerresponse) > array|
|**403**|Forbidden|No Content|
|**404**|Not found|No Content|
|**500**|Internal server error|No Content|
|**default**|Unexpected error|No Content|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/containers
```


##### Request header
```
json :
"string"
```


#### Example HTTP response

##### Response 200
```
json :
[ {
  "id" : "string",
  "uri" : "string",
  "imsOrg" : "string",
  "name" : "string",
  "created" : 0.0,
  "updated" : 0.0,
  "createdUser" : "string",
  "updatedUser" : "string",
  "parentUri" : "string",
  "ancestorPath" : [ "string" ]
} ]
```



