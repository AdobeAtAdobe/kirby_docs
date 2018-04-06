
<a name="patch_data_set_view_by_id"></a>
### Updates specified attributes of an existing DataSetView.
```
PATCH /dataSetViews/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**if-match**  <br>*optional*|Set to verify the right version of document to be modified by matching the updated date.|string|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Body parameter
Data set view field(s) to be updated.

*Name* : dataSetView  
*Flags* : required  
*Type* : [dataSetViewPatchRequest](../definitions/dataSetViewPatchRequest.md#datasetviewpatchrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Array[ @/dataSetViews/{dataSetViewId} ]|< string > array|
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
/dataSetViews/string
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

##### Response 200
```
json :
[ "string" ]
```



