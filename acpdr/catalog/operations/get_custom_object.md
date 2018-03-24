
<a name="get_custom_object"></a>
### Returns specific custom object in the extension namespace.
```
GET /xdms/_customer/{extensionNS}/{objectName}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**extensionNS**  <br>*required*|The extension namespace.|string|
|**Path**|**objectName**  <br>*required*|Name of custom object.|string|
|**Query**|**expansion**  <br>*optional*|Set to 'xdm' to expand XDM schema.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Returns the custom object.|[xdmExtension](../definitions/xdmExtension.md#xdmextension)|
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
/xdms/_customer/string/string
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
  "expansion" : "string"
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
  "xdmType" : "string"
}
```



