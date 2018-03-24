
<a name="get_data_set_view_by_data_set_id_by_id"></a>
### Fetches a particular DataSetView for this DataSet.
```
GET /dataSets/{id}/views/{viewid}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Path**|**viewid**  <br>*required*|datasetview id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|dataSet response|< string, [dataSetView](../definitions/dataSetView.md#datasetview) > map|
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
/dataSets/string/views/string
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



