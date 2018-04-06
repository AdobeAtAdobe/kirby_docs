
<a name="delete_data_set_file_by_search"></a>
### Deletes a DataSetFile based on a search criteria.
```
DELETE /dataSetFiles
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**batchId**  <br>*optional*|ID of the batch object associated with the creation of a DataSetFile.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Array[ @/dataSets/dataSetFileId ]|< string > array|
|**400**|Bad request|No Content|
|**403**|Forbidden|No Content|
|**404**|Not found|No Content|
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
/dataSetFiles
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



