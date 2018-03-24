
<a name="get_data_set_file_by_data_set_id_and_data_set_view_id_by_id"></a>
### Fetches a DataSetFile for a particular DataSetView for this DataSet.
```
GET /dataSets/{id}/views/{viewId}/files/{fileId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**fileId**  <br>*required*|dataSetView ID|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Path**|**viewId**  <br>*required*|dataSetView ID|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|dataset response|< string, [dataSetFile](../definitions/dataSetFile.md#datasetfile) > map|
|**400**|Bad request|No Content|
|**403**|forbidden|No Content|
|**404**|Not found|No Content|
|**500**|internal server error|No Content|
|**default**|unexpected error|No Content|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/dataSets/string/views/string/files/string
```


##### Request header
```
json :
"string"
```


#### Example HTTP response

##### Response 200
```
json :
"object"
```



