
<a name="createcontainer"></a>
### Create a container.
```
POST /containers
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|


#### Body parameter
Container data

*Name* : data  
*Flags* : required  
*Type* : [containerCreate](../definitions/containerCreate.md#containercreate)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Newly created container|[containerResponse](../definitions/containerResponse.md#containerresponse)|
|**403**|Forbidden|No Content|
|**500**|Internal server error|No Content|
|**default**|Unexpected error|No Content|


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/containers
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
  "name" : "string",
  "parentUri" : "string"
}
```


#### Example HTTP response

##### Response 201
```
json :
{
  "id" : "string",
  "uri" : "string",
  "imsOrg" : "string",
  "name" : "string",
  "created" : 0.0,
  "updated" : 0.0,
  "createdUser" : "string",
  "updatedUser" : "string",
  "parentUri" : "string",
  "ancestorPath" : [ "string" ]
}
```



