
<a name="post_custom_object"></a>
### Create a custom object in the extension namespace.
```
POST /xdms/_customer/{extensionNS}/{objectName}
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
*Type* : [xdmExtensionRequest](../definitions/xdmExtensionRequest.md#xdmextensionrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/xdms/_customer/{extensionNS}/{objectName} ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
|**400**|Bad request|No Content|
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
  "schemaId" : "string",
  "title" : "string",
  "type" : "string",
  "description" : "string",
  "properties" : "object",
  "xdmType" : "string"
}
```


#### Example HTTP response

##### Response 201
```
json :
[ "string" ]
```



