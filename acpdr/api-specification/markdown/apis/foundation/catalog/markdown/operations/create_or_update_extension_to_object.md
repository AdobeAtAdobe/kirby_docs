
<a name="create_or_update_extension_to_object"></a>
### Create or update extension to object in the namespace.
```
PUT /xdms/{namespace}/{objectName}/_customer/{extensionNS}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**extensionNS**  <br>*required*|The extension namespace.|string|
|**Path**|**namespace**  <br>*required*|Filter by the base namespace ("model" or "core").|string|
|**Path**|**objectName**  <br>*required*|Name of custom object.|string|


#### Body parameter
The payload JSON that goes in the body of the request.

*Name* : payload  
*Flags* : required  
*Type* : [xdmExtensionRequest](../definitions/xdmExtensionRequest.md#xdmextensionrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Sucessfully updated an existing extension to a standard XDM object. Response payload - 'Array[ @/xdms/{namespace}/{objectName}/_customer/{extensionNS} ]'|< string > array|
|**201**|Sucessfully created an extension to a standard XDM object. Response payload - 'Array[ @/xdms/{namespace}/{objectName}/_customer/{extensionNS} ]'|< string > array|
|**400**|bad request|No Content|
|**500**|Internal server error|No Content|
|**default**|Unexpected error|No Content|


#### Consumes

* `application/json`


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


##### Request body
```
json :
{
  "schemaId" : "string",
  "title" : "string",
  "type" : "string",
  "description" : "string",
  "properties" : "object",
  "xdmType" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
[ "string" ]
```


##### Response 201
```
json :
[ "string" ]
```



