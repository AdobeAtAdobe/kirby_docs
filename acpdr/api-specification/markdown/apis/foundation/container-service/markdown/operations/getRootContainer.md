
<a name="getrootcontainer"></a>
### Get the global root container, the starting point for any hierarchical traversal
```
GET /containers/root
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Returns the root container.|[containerResponse](../definitions/containerResponse.md#containerresponse)|
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
/containers/root
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



