
<a name="post_batch_by_id"></a>
### Creates a new Batch with a specified Id.
```
POST /batches/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Body parameter
Batch to be created.

*Name* : batch  
*Flags* : required  
*Type* : [batchRequest](../definitions/batchRequest.md#batchrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/batches/batchId ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
|**400**|Bad request|No Content|
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
/batches/string
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
  "metrics" : {
    "string" : 0
  },
  "tags" : {
    "string" : [ "string" ]
  }
}
```


#### Example HTTP response

##### Response 201
```
json :
[ "string" ]
```



