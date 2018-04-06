
<a name="post_data_set_file_by_data_set_id_and_data_set_view_id"></a>
### Adds DataSetFile to a particular DataSetView for this DataSet.
```
POST /dataSets/{id}/views/{viewId}/files
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Path**|**viewId**  <br>*required*|dataSetView ID|string|


#### Body parameter
Data set file to be posted.

*Name* : dataSetFile  
*Flags* : required  
*Type* : [dataSetFileRequest](../definitions/dataSetFileRequest.md#datasetfilerequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/dataSets/{datasetId}/views/{viewId}/files/{fileId} ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
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
/dataSets/string/views/string/files
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
  "folderName" : "string",
  "batchId" : "string",
  "dataSetViewId" : "string",
  "records" : 0,
  "size" : 0,
  "isValid" : true,
  "availableDates" : {
    "startDate" : 0,
    "endDate" : 0
  },
  "sampleParent" : [ "string" ]
}
```


#### Example HTTP response

##### Response 201
```
json :
[ "string" ]
```



