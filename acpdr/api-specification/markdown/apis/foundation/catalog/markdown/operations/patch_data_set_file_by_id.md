
<a name="patch_data_set_file_by_id"></a>
### Updates specified attributes of an existing DataSetFile.
```
PATCH /dataSetFiles/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Body parameter
DataSetFile field(s) to be updated.

*Name* : dataSetFile  
*Flags* : required  
*Type* : [dataSetFilePatchRequest](../definitions/dataSetFilePatchRequest.md#datasetfilepatchrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|@/dataSets/dataSetFileId|No Content|
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
/dataSetFiles/string
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



