
<a name="update_data_set_file_by_id"></a>
### Updates an existing DataSetFile by ID.
```
PUT /dataSetFiles/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Body parameter
Data set file field(s) to be updated.

*Name* : dataSetFile  
*Flags* : required  
*Type* : [dataSetFile](../definitions/dataSetFile.md#datasetfile)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|@/dataSets/dataSetFileId|No Content|
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
  "version" : "string",
  "folderName" : "string",
  "batchId" : "string",
  "created" : 0,
  "updated" : 0,
  "imsOrg" : "string",
  "dataSetViewId" : "string",
  "createdClient" : "string",
  "createdUser" : "string",
  "updatedUser" : "string",
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



