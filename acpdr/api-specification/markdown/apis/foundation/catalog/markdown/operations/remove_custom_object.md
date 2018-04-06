
<a name="remove_custom_object"></a>
### Remove custom object in the extension namespace.
```
DELETE /xdms/_customer/{extensionNS}/{objectName}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**extensionNS**  <br>*required*|The extension namespace.|string|
|**Path**|**objectName**  <br>*required*|Name of custom object.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Array[ @/xdms/_customer/{extensionNS}/{objectName} ]|No Content|
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
/xdms/_customer/string/string
```


##### Request header
```
json :
"string"
```



