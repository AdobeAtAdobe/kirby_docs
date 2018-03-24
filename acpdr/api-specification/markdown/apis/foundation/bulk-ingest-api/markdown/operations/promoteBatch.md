
<a name="promotebatch"></a>
### Promote batch
```
POST /batches/{batchId}
```


#### Description
Update the batch to trigger the downstream data promotion workflow


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The id of the ims organization associated with the batch|string|
|**Path**|**batchId**  <br>*required*|The id of the batch that needs to be updated|string|
|**Query**|**action**  <br>*required*|The action to take on the Batch|enum (COMPLETE, ABORT, FAIL, REVERT)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Batch](../definitions/Batch.md#batch)|
|**400**|Bad Request. The request is malformed.|No Content|
|**401**|Unauthorized. The IMS token provided is invalid.|No Content|
|**404**|Batch not found.|No Content|
|**414**|URL length exceeds the allowed 2000 characters.|No Content|
|**500**|Internal server error.|No Content|
|**503**|Service Unavailable. The bulk ingest api or dependency is unavailable.|No Content|


#### Produces

* `application/json`


#### Tags

* Ingest Batch


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
  "action" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : "string",
  "imsOrg" : "string",
  "created" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "updatedUser" : "string",
  "updated" : 0,
  "started" : 0,
  "completed" : 0,
  "status" : "string",
  "recordCount" : 0,
  "failedRecordCount" : 0,
  "errors" : [ {
    "code" : "string",
    "rows" : [ "string" ],
    "description" : "string"
  } ],
  "size" : 0,
  "version" : "string",
  "availableDates" : "object",
  "relatedObjects" : [ {
    "type" : "string",
    "id" : "string",
    "tag" : "string",
    "status" : "string",
    "errors" : [ {
      "code" : "string",
      "rows" : [ "string" ],
      "description" : "string"
    } ],
    "metrics" : {
      "string" : 0
    }
  } ],
  "metrics" : "object",
  "tags" : "object"
}
```



