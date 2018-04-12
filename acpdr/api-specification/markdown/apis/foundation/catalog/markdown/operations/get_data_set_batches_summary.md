
<a name="get_data_set_batches_summary"></a>
### Retrieves summarized stats for a DataSet's batches. Default time window: last seven days.
```
GET /dataSets/{id}/ingestBatchSummary
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Query**|**createdAfter**  <br>*optional*|Exclusively filter records created after this timestamp.|integer (int64)|
|**Query**|**createdBefore**  <br>*optional*|Exclusively filter records created before this timestamp.|integer (int64)|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**properties**  <br>*optional*|A comma separated whitelist of top-level object properties to be returned in the response. Used to cut down the number of properties and amount of data returned in the response bodies.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**tags**  <br>*optional*|Filter response by the specified tags. Ex. tags=ns:tag,ns2:tag2|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Batch summary object for given dataSetId.|[batchResponse](../definitions/batchResponse.md#batchresponse)|
|**400**|Bad request|No Content|
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
/dataSets/string/ingestBatchSummary
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
  "createdAfter" : 0,
  "createdBefore" : 0,
  "limit" : 0,
  "orderBy" : "string",
  "properties" : "string",
  "property" : "string",
  "start" : 0,
  "tags" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
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
  "metrics" : {
    "string" : 0
  },
  "tags" : {
    "string" : [ "string" ]
  }
}
```



