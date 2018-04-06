
<a name="get_all_custom_objects"></a>
### Returns all custom xdm objects under all namespaces the imsOrg has access to; can be filtered by xdmType (model|entity).
```
GET /xdms/_customer
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**xdmType**  <br>*optional*|Custom xdm object type, possible values are model and entity.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|custom xdm objects response|[xdm](../definitions/xdm.md#xdm)|
|**403**|Forbidden|No Content|
|**404**|not found|No Content|
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
/xdms/_customer
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
  "limit" : 0,
  "orderBy" : "string",
  "property" : "string",
  "start" : 0,
  "xdmType" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "version" : "string",
  "created" : 0,
  "updated" : 0,
  "createdClient" : "string",
  "updatedUser" : "string",
  "imsOrg" : "string",
  "schemaId" : "string",
  "title" : "string",
  "type" : "string",
  "description" : "string",
  "key" : [ "string" ],
  "properties" : "object",
  "state" : "string",
  "xdmType" : "string"
}
```



