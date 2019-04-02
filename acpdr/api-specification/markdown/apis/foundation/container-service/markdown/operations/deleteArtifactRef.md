
<a name="deleteartifactref"></a>
### Delete an artifactRef from a container.
```
DELETE /artifactRefs/{artifactRefId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**artifactRefId**  <br>*required*|artifactRefs to delete.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Array[ @/artifactRef/artifactRefId ]|string|
|**403**|Forbidden|No Content|
|**404**|Not found|No Content|
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
/artifactRefs/string
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
"string"
```



