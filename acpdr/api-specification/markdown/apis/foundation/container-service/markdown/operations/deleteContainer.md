
<a name="deletecontainer"></a>
### Delete a container.
```
DELETE /containers/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Id of the container|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|@/container/id|string|
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
/containers/string
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



