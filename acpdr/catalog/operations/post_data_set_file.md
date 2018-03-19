
<a name="post_data_set_file"></a>
### Saves a new DataSetFile.
```
POST /dataSetFiles
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|


#### Body parameter
Data set file to be posted.

*Name* : dataSetFile  
*Flags* : required  
*Type* : [dataSetFile](../definitions/dataSetFile.md#datasetfile)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/dataSets/dataSetFileId ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
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
/dataSetFiles
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


#### Example HTTP response

##### Response 201
```
json :
[ "string" ]
```



