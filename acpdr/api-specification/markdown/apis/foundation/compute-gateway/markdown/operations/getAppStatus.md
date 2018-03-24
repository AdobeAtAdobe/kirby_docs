
<a name="getappstatus"></a>
### Finds status of an application
```
GET /data/foundation/compute/apps/{appID}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**appID**  <br>*required*|App ID|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|App retrieved|string|
|**401**|Unauthorized access|No Content|
|**404**|App ID not found|No Content|
|**406**|Non Acceptable Response Type.Only application/json allowed|No Content|
|**422**|Input validation failure|No Content|
|**503**|App retrieval request failed|No Content|


#### Produces

* `application/json`


#### Tags

* Describes operations performed on Spark applications


#### Example HTTP request

##### Request path
```
/data/foundation/compute/apps/4b3c4fae-212c-404f-9565-9b3fa0a9cb4f
```


#### Example HTTP response

##### Response 200
```
json :
"string"
```



