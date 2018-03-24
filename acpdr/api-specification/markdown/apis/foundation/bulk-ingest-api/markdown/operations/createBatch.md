
<a name="createbatch"></a>
### Registers a new batch in Catalog
```
POST /batches
```


#### Description
Creates a new batch in Catalog as a first step to bulk data ingestion. The data is uploaded to this batch after which the batch is marked ready for triggering data registration in Catalog


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The id of the ims organization to create the batch under|string|


#### Body parameter
Ingest object that contains information needed to create batch

*Name* : body  
*Flags* : required  
*Type* : [IngestBatch](../definitions/IngestBatch.md#ingestbatch)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Created|[Batch](../definitions/Batch.md#batch)|
|**400**|Bad Request. The request is malformed.|No Content|
|**401**|Unauthorized|No Content|
|**414**|URL length exceeds the allowed 2000 characters.|No Content|
|**500**|Internal server error.|No Content|
|**503**|Service Unavailable. The bulk ingest api or dependency is unavailable.|No Content|


#### Consumes

* `application/json`


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
/batches
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
  "datasetId" : "string"
}
```


#### Example HTTP response

##### Response 201
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



