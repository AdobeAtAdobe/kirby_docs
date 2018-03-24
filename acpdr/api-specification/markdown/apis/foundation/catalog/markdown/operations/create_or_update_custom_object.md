
<a name="create_or_update_custom_object"></a>
### Create or update a custom object in the extension namespace.
```
PUT /xdms/_customer/{extensionNS}/{objectName}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**extensionNS**  <br>*required*|The extension namespace.|string|
|**Path**|**objectName**  <br>*required*|Name of custom object.|string|


#### Body parameter
The payload JSON that goes in the body of the request.

*Name* : payload  
*Flags* : required  
*Type* : [xdmExtension](../definitions/xdmExtension.md#xdmextension)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Sucessfully updated an existing custom XDM object. Response payload - 'Array[ @/xdms/_customer/{extensionNS}/{objectName} ]'|< string > array|
|**201**|Sucessfully created a custom XDM object. Response payload - 'Array[ @/xdms/_customer/{extensionNS}/{objectName} ]'|< string > array|
|**400**|bad request|No Content|
|**500**|internal server error|No Content|
|**default**|unexpected error|No Content|


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
/xdms/_customer/string/string
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



