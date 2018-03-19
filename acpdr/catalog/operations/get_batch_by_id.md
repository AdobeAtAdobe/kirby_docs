
<a name="get_batch_by_id"></a>
### GET /batches/{id}

#### Description
Fetches Batches by ID.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Query**|**aggregate**  <br>*optional*|If true, then return the aggregated status, metrics, and errors in the root level status, metrics, and errors (default is false).|boolean|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|batch response|< string, [batch](../definitions/batch.md#batch) > map|
|**400**|Bad request|No Content|
|**403**|forbidden|No Content|
|**404**|Not found|No Content|
|**500**|internal server error|No Content|
|**default**|unexpected error|No Content|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/batches/string
```


##### Request header
```
json :
"string"
```


##### Request query
```
json :
{
  "aggregate" : true
}
```


#### Example HTTP response

##### Response 200
```
json :
"object"
```



