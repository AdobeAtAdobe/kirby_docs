
<a name="updatecontainerbyid"></a>
### Update a container.
```
PUT /containers/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Id of the container|string|


#### Body parameter
Container data

*Name* : data  
*Flags* : required  
*Type* : [containerCreate](../definitions/containerCreate.md#containercreate)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|@/container/id|[containerResponse](../definitions/containerResponse.md#containerresponse)|
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
/containers/string
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

##### Response 200
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



