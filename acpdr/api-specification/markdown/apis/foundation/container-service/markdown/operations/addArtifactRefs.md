
<a name="addartifactrefs"></a>
### Creates one or more artifactRefs.
```
POST /artifactRefs
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|


#### Body parameter
List of artifactRefs to add.

*Name* : artifactRefs  
*Flags* : required  
*Type* : < [artifactRef](../definitions/artifactRef.md#artifactref) > array


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/container/containderId/artifactRef/artifactRefId ]|string|
|**403**|Forbidden|No Content|
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
/artifactRefs
```


##### Request header
```
json :
"string"
```


##### Request body
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


#### Example HTTP response

##### Response 201
```
json :
"string"
```



