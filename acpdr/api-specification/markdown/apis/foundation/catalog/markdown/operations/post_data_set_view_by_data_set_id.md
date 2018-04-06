
<a name="post_data_set_view_by_data_set_id"></a>
### Creates a new DataSetView for this dataSet.
```
POST /dataSets/{id}/views
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Body parameter
Datasetview to be posted

*Name* : dataSetView  
*Flags* : required  
*Type* : [dataSetViewRequest](../definitions/dataSetViewRequest.md#datasetviewrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/dataSets/dataSetId/views/viewId ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
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
/dataSets/string/views
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
  "dataSetId" : "string",
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
  "sdsVersion" : "string",
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
  "storageType" : "string",
  "basePath" : "string",
  "isCached" : true,
  "transforms" : "string",
  "files" : "string",
  "fileDescription" : "object",
  "partitions" : [ "string" ],
  "saveStrategy" : "string",
  "schema" : "string"
}
```


#### Example HTTP response

##### Response 201
```
json :
[ "string" ]
```



