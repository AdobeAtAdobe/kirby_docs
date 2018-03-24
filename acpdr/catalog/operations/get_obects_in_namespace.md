
<a name="get_obects_in_namespace"></a>
### List all objects of that namespace.
```
GET /xdms/{namespace}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**namespace**  <br>*required*|The base namespace ("model" or "core").|string|
|**Query**|**excludeExtension**  <br>*optional*|Set to true to exclude extensions.|boolean|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**xdmVersion**  <br>*optional*|The version of the base XDM schemas that are being requested|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|standard xdm objects response.|< string, [xdm](../definitions/xdm.md#xdm) > map|
|**404**|not found|No Content|
|**500**|internal server error|No Content|
|**default**|unexpected error|No Content|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/xdms/string
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
  "excludeExtension" : true,
  "limit" : 0,
  "orderBy" : "string",
  "property" : "string",
  "start" : 0,
  "xdmVersion" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
"object"
```



