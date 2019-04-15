
<a name="getartifactreflist"></a>
### Gets the list artifactRefs for a container.
```
GET /containers/{id}/artifactRefs
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Id of the container|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Returns list of artifactsRefs.|< [artifactRef](../definitions/artifactRef.md#artifactref) > array|
|**403**|Forbidden|No Content|
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
/containers/string/artifactRefs
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
[ {
  "id" : "string",
  "uri" : "string",
  "artifactUri" : "string",
  "type" : "string",
  "containerUri" : "string",
  "ancestorPath" : [ "string" ]
} ]
```



