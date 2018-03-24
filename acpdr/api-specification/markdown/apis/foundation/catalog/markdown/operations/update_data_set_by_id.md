
<a name="update_data_set_by_id"></a>
### Updates an existing DataSet by ID.
```
PUT /dataSets/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**E-tag**  <br>*optional*|Set to verify the right version of document to be modified by matching the version.|string|
|**Header**|**if-match**  <br>*optional*|Set to verify the right version of document to be modified by matching the updated date.|string|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Query**|**requestDataSource**  <br>*optional*|Set to true if you want Catalog to create a dataSource on your behalf; otherwise, pass a dataSourceId in the body.|string|


#### Body parameter
Data set field(s) to be updated.

*Name* : dataSet  
*Flags* : required  
*Type* : [dataSet](../definitions/dataSet.md#dataset)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Array[ @/dataSets/dataSetId ]|< string > array|
|**400**|Bad request|No Content|
|**403**|forbidden|No Content|
|**500**|internal server error|No Content|
|**default**|unexpected error|No Content|


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
/dataSets/string
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
  "requestDataSource" : "string"
}
```


##### Request body
```
json :
{
  "version" : "string",
  "imsOrg" : "string",
  "isPublic" : true,
  "connectorId" : "string",
  "connectionId" : "string",
  "name" : "string",
  "description" : "string",
  "created" : 0,
  "updated" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "updatedUser" : "string",
  "namespace" : "string",
  "tags" : {
    "string" : [ "string" ]
  },
  "statsCache" : "object",
  "lastBatchId" : "string",
  "lastBatchStatus" : "string",
  "lastSuccessfulBatch" : "string",
  "lastFailedBatch" : "string",
  "dule" : "object",
  "dataSourceId" : 0
}
```


#### Example HTTP response

##### Response 200
```
json :
[ "string" ]
```



