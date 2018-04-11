
<a name="get_obect_in_namespace"></a>
### Returns specific object for that namespace.
```
GET /xdms/{namespace}/{objectName}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**namespace**  <br>*required*|Filter by the base namespace ("model" or "core").|string|
|**Path**|**objectName**  <br>*required*|Name of custom object.|string|
|**Query**|**excludeExtension**  <br>*optional*|Set to true to exclude extensions.|boolean|
|**Query**|**expansion**  <br>*optional*|Set to 'xdm' to expand XDM schema.|string|
|**Query**|**xdmVersion**  <br>*optional*|The version of the base XDM schemas that are being requested.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Returns the object for that namespace with or without the _customer extension depending if excludeExtension is set.|[xdm](../definitions/xdm.md#xdm)|
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
/xdms/string/string
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
  "expansion" : "string",
  "xdmVersion" : "string"
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
  "properties" : "object",
  "state" : "string",
  "xdmType" : "string"
}
```



