
<a name="delete_sample_data_set_file_by_search"></a>
### Deletes a DataSetFile based on a search criteria.
```
DELETE /sampleFiles
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**batchId**  <br>*required*|ID of the batch object associated with the creation of a DataSetFile.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Array[ @/dataSets/dataSetFileId ]|< string > array|
|**400**|Bad request|No Content|
|**403**|forbidden|No Content|
|**404**|Not found|No Content|
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
/sampleFiles
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
  "batchId" : "string",
  "property" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
[ "string" ]
```



