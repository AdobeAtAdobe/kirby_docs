
<a name="get_sample_data_set_files"></a>
### Fetches a list of DataSetFiles.
```
GET /sampleFiles
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**batchId**  <br>*optional*|The ID of the Batch operation that created this DataSetFile.|string|
|**Query**|**created**  <br>*optional*|The Unix timestamp (in milliseconds) when this object was persisted.|integer (int64)|
|**Query**|**createdAfter**  <br>*optional*|Exclusively filter records created after this timestamp.|integer (int64)|
|**Query**|**createdBefore**  <br>*optional*|Exclusively filter records created before this timestamp.|integer (int64)|
|**Query**|**createdClient**  <br>*optional*|The ID of the IMS client that created this object.|string|
|**Query**|**createdUser**  <br>*optional*|The ID of the user who created this object.|string|
|**Query**|**dataSetViewId**  <br>*required*|The ID of the owning DataSetView.|string|
|**Query**|**folderName**  <br>*optional*|The name of the folder as it resides in the basePath (provided from the DataSetView).|string|
|**Query**|**isValid**  <br>*optional*|True if the file can still be used. False if the file was part of a batch that was mistakenly uploaded or incorrect, and should no longer be considered.|boolean|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**records**  <br>*optional*|The number of records/rows/transactions contained in file represented by this DataSetFile.|integer (int64)|
|**Query**|**size**  <br>*optional*|Size for the file in bytes.|integer (int64)|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**updated**  <br>*optional*|The Unix timestamp (in milliseconds) for the time of last modification.|integer (int64)|
|**Query**|**updatedUser**  <br>*optional*|The ID of the user who changed this object.|string|
|**Query**|**version**  <br>*optional*|The Semantic version of the account. Updated when the object is modified.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|connections response|< string, [dataSetFile](../definitions/dataSetFile.md#datasetfile) > map|
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
/sampleFiles
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
  "batchId" : "string",
  "created" : 0,
  "createdAfter" : 0,
  "createdBefore" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "dataSetViewId" : "string",
  "folderName" : "string",
  "isValid" : true,
  "limit" : 0,
  "orderBy" : "string",
  "property" : "string",
  "records" : 0,
  "size" : 0,
  "start" : 0,
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



