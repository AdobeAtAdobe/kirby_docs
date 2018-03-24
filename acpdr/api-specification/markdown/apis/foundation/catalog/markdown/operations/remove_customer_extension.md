
<a name="remove_customer_extension"></a>
### Remove extension to object in the namespace.
```
DELETE /xdms/{namespace}/{objectName}/_customer/{extensionNS}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**extensionNS**  <br>*required*|The extension namespace.|string|
|**Path**|**namespace**  <br>*required*|The base namespace ("model" or "core").|string|
|**Path**|**objectName**  <br>*required*|Name of custom object.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Array[ @/xdms/{namespace}/{objectName}/_customer/{extensionNS} ]|< string > array|
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
/xdms/string/string/_customer/string
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
[ "string" ]
```



