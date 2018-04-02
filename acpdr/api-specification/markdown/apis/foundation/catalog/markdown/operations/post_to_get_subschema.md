
<a name="post_to_get_subschema"></a>
### Gets the subschema of an XDM object.
```
POST /xdms/{namespace}/{objectName}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**namespace**  <br>*required*|The base namespace ("model" or "core").|string|
|**Path**|**objectName**  <br>*required*|Name of custom object.|string|
|**Query**|**excludeExtension**  <br>*optional*|Set to true to exclude extensions.|boolean|
|**Query**|**xdmVersion**  <br>*optional*|The version of the base XDM schemas that are being requested|string|


#### Body parameter
The payload JSON that goes in the body of the request.

*Name* : payload  
*Flags* : required  
*Type* : [subSchema](../definitions/subSchema.md#subschema)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|XDM sub-schema response.|object|
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
  "xdmVersion" : "string"
}
```


##### Request body
```
json :
{
  "schema" : "object"
}
```


#### Example HTTP response

##### Response 200
```
json :
"object"
```



