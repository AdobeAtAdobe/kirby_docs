
<a name="getartifactref"></a>
### Gets an individual artifactRef.
```
GET /artifactRefs/{artifactRefId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**artifactRefId**  <br>*required*|Id of the artifactRef|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Returns the artifactRef.|[artifactRef](../definitions/artifactRef.md#artifactref)|
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
{
  "id" : "string",
  "uri" : "string",
  "artifactUri" : "string",
  "type" : "string",
  "containerUri" : "string",
  "ancestorPath" : [ "string" ]
}
```



