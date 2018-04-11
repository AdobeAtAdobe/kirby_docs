
<a name="get_extension_to_object"></a>
### Return extension to object in the namespace.
```
GET /xdms/{namespace}/{objectName}/_customer/{extensionNS}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**extensionNS**  <br>*required*|The extension namespace.|string|
|**Path**|**namespace**  <br>*required*|Filter by the base namespace ("model" or "core").|string|
|**Path**|**objectName**  <br>*required*|Name of custom object.|string|
|**Query**|**expansion**  <br>*optional*|Set to 'xdm' to expand XDM schema.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Return extension to object in the namespace.|[xdmExtensionResponse](../definitions/xdmExtensionResponse.md#xdmextensionresponse)|
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
/xdms/string/string/_customer/string
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
  "properties" : "object",
  "xdmType" : "string"
}
```



