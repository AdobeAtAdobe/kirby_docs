
<a name="get_batch"></a>
### Fetches a list of Batches.
```
GET /batches
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**batch**  <br>*optional*|Used to filter on the related object: &batch=batchId.|string|
|**Query**|**completed**  <br>*optional*|The Unix timestamp (in milliseconds) when the Batch processing action was completed. Completed - Started should yield the total processing time.|integer (int64)|
|**Query**|**connection**  <br>*optional*|Used to filter on the related object: &connection=connectionId.|string|
|**Query**|**connector**  <br>*optional*|Used to filter on the related object: &connector=connectorId.|string|
|**Query**|**created**  <br>*optional*|The Unix timestamp (in milliseconds) when this object was persisted.|integer (int64)|
|**Query**|**createdAfter**  <br>*optional*|Exclusively filter records created after this timestamp.|integer (int64)|
|**Query**|**createdBefore**  <br>*optional*|Exclusively filter records created before this timestamp.|integer (int64)|
|**Query**|**createdClient**  <br>*optional*|The ID of the IMS client that created this object.|string|
|**Query**|**createdUser**  <br>*optional*|The ID of the user who created this object.|string|
|**Query**|**dataSet**  <br>*optional*|Used to filter on the related object: &dataSet=dataSetId.|string|
|**Query**|**dataSetFile**  <br>*optional*|Used to filter on the related object: &dataSetFile=dataSetFileId.|string|
|**Query**|**dataSetView**  <br>*optional*|Used to filter on the related object: &dataSetView=dataSetViewId.|string|
|**Query**|**endAfter**  <br>*optional*|Query only batches with availability dates that end after the specified timestamp.|integer (int64)|
|**Query**|**endBefore**  <br>*optional*|Query only batches with availability dates that end before the specified timestamp.|integer (int64)|
|**Query**|**failedRecordCount**  <br>*optional*|The number of records that could not be processed in this Batch.|integer (int64)|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**recordCount**  <br>*optional*|The total number of data records (rows/documents) processed in this Batch.|integer (int64)|
|**Query**|**size**  <br>*optional*|Number of bytes processed in this Batch.|integer (int64)|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**startAfter**  <br>*optional*|Query only batches with availability dates that start after the specified timestamp.|integer (int64)|
|**Query**|**startBefore**  <br>*optional*|Query only batches with availability dates that start before the specified timestamp.|integer (int64)|
|**Query**|**started**  <br>*optional*|The Unix timestamp (in milliseconds) when the Batch processing action was started.|integer (int64)|
|**Query**|**status**  <br>*optional*|The current (mutable) status of this Batch.|string|
|**Query**|**transform**  <br>*optional*|Used to filter on the related object: &transform=transformId.|string|
|**Query**|**updated**  <br>*optional*|The Unix timestamp (in milliseconds) for the time of last modification.|integer (int64)|
|**Query**|**updatedUser**  <br>*optional*|The ID of the user who changed this object.|string|
|**Query**|**version**  <br>*optional*|The Semantic version of the account. Updated when the object is modified.|string|


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
/batches
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
  "batch" : "string",
  "completed" : 0,
  "connection" : "string",
  "connector" : "string",
  "created" : 0,
  "createdAfter" : 0,
  "createdBefore" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "dataSet" : "string",
  "dataSetFile" : "string",
  "dataSetView" : "string",
  "endAfter" : 0,
  "endBefore" : 0,
  "failedRecordCount" : 0,
  "limit" : 0,
  "orderBy" : "string",
  "property" : "string",
  "recordCount" : 0,
  "size" : 0,
  "start" : 0,
  "startAfter" : 0,
  "startBefore" : 0,
  "started" : 0,
  "status" : "string",
  "transform" : "string",
  "updated" : 0,
  "updatedUser" : "string",
  "version" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
"object"
```



