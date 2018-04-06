
<a name="patch_data_set_by_id"></a>
### Updates specified attributes of an existing DataSet.
```
PATCH /dataSets/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**if-match**  <br>*optional*|Set to verify the right version of document to be modified by matching the updated date.|string|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Body parameter
Data set field(s) to be updated.

*Name* : dataSet  
*Flags* : required  
*Type* : [dataSetRequest](../definitions/dataSetRequest.md#datasetrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Array[ @/dataSets/dataSetId ]|< string > array|
|**400**|Bad request|No Content|
|**403**|Forbidden|No Content|
|**404**|Not found|No Content|
|**500**|Internal server error|No Content|
|**default**|Unexpected error|No Content|


#### Consumes

* `application/json`
* `application/json-patch+json`


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


##### Request body
```
json :
{
  "connectorId" : "string",
  "connectionId" : "string",
  "name" : "string",
  "description" : "string",
  "namespace" : "string",
  "tags" : {
    "string" : [ "string" ]
  },
  "statsCache" : "object",
  "lastBatchId" : "string",
  "lastBatchStatus" : "string",
  "lastSuccessfulBatch" : "string",
  "lastFailedBatch" : "string",
  "aspect" : "string",
  "observableSchema" : "object",
  "status" : "string",
  "requestStartDate" : "string",
  "editable" : true,
  "dependencies" : [ {
    "dataSetId" : "string",
    "dataSetViewId" : "string",
    "type" : "string"
  } ],
  "fields" : [ {
    "dataType" : {
      "type" : "string",
      "precision" : 0.0,
      "scale" : 0.0,
      "subType" : {
        "type" : "string",
        "precision" : 0.0,
        "scale" : 0.0,
        "subType" : "...",
        "subFields" : "...",
        "keyType" : "string",
        "valueType" : "..."
      },
      "subFields" : "...",
      "keyType" : "string",
      "valueType" : "..."
    },
    "name" : "string",
    "definition" : "object",
    "meta" : "object",
    "dule" : "object"
  } ],
  "basePath" : "string",
  "fileDescription" : "object",
  "partitions" : [ "string" ],
  "saveStrategy" : "string",
  "schema" : "string",
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



