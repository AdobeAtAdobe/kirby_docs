
<a name="deleteapp"></a>
### Deletes the specified App
```
DELETE /data/foundation/compute/apps/{appID}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**appID**  <br>*required*|App ID|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**202**|App kill request submitted successfully|No Content|
|**401**|Unauthorized access|No Content|
|**404**|App Not Found|No Content|
|**414**|Request URI is longer than allowed 2000 chars|No Content|
|**422**|Input validation failure|No Content|
|**503**|Kill request submission failed|No Content|


#### Produces

* `application/json`


#### Tags

* Describes operations performed on Spark applications


#### Example HTTP request

##### Request path
```
/data/foundation/compute/apps/4b3c4fae-212c-404f-9565-9b3fa0a9cb4f
```



