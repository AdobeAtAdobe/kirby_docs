
<a name="delete_sample_file_by_data_set_id_and_data_set_view_id_by_id"></a>
### Removes a sample File for a particular DataSetView for this DataSet.
```
DELETE /dataSets/{id}/views/{viewId}/sampleFile/{fileId}
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
|**200**|Array[@/{datasetId}/views/{viewId}/sampleFiles/{fileId} ]|< string > array|
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
/dataSets/string/views/string/sampleFile/string
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
[ "string" ]
```



