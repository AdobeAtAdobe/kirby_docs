
<a name="get_data_sets"></a>
### Fetches a list of DataSets.
```
GET /dataSets
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**connectionId**  <br>*optional*|Foreign key to the Connection this DataSet originates from.|string|
|**Query**|**connectorId**  <br>*optional*|Foreign key to the Connector this DataSet originates from. Template DataSets are tied to Connectors and not Connections.|string|
|**Query**|**created**  <br>*optional*|The Unix timestamp (in milliseconds) when this object was persisted.|integer (int64)|
|**Query**|**createdClient**  <br>*optional*|The ID of the IMS client that created this object.|string|
|**Query**|**createdUser**  <br>*optional*|The ID of the user who created this object.|string|
|**Query**|**description**  <br>*optional*|A longer text description of the DataSet.|string|
|**Query**|**isPublic**  <br>*optional*|Marks this dataset as available for use (by UI) in lookup operations with datasets not in the current connection, or across customers.|boolean|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**name**  <br>*optional*|A descriptive, human-readable name for this DataSet.|string|
|**Query**|**namespace**  <br>*optional*|One of the registered platform acronyms that identify the platform.|string|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**tags**  <br>*optional*|Filter response by the specified tags. Ex. tags=ns:tag,ns2:tag2|string|
|**Query**|**type**  <br>*optional*|DataSet types reflect where the data is in the MCDP lifecycle. Raw datasets are created by ingest, Master datasets are created by the Harvester, and Model datasets are configured by users. App datasets can then be created by MCDP services.|string|
|**Query**|**updated**  <br>*optional*|The Unix timestamp (in milliseconds) for the time of last modification.|integer (int64)|
|**Query**|**updatedUser**  <br>*optional*|The ID of the user who changed this object.|string|
|**Query**|**version**  <br>*optional*|The Semantic version of the account. Updated when the object is modified.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|connections response|< string, [dataSet](../definitions/dataSet.md#dataset) > map|
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
/dataSets
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
  "connectionId" : "string",
  "connectorId" : "string",
  "created" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "description" : "string",
  "isPublic" : true,
  "limit" : 0,
  "name" : "string",
  "namespace" : "string",
  "orderBy" : "string",
  "property" : "string",
  "start" : 0,
  "tags" : "string",
  "type" : "string",
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



