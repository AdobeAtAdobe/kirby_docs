
<a name="getdatasetinfo"></a>
### Get the count of all keys of the respective tenant based on the dataSetId
```
GET /lookup/dataSets/{dataSetId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*optional*|IMS Org Id. It will have higher priority over imsOrg query param|string|
|**Path**|**dataSetId**  <br>*required*|dataSetId|string|
|**Query**|**imsOrg**  <br>*optional*|The owning IMS organization identifier|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|data|[DataSetApiResponse](../definitions/DataSetApiResponse.md#datasetapiresponse)|
|**400**|Bad Request|No Content|
|**403**|Forbidden|No Content|
|**404**|Not Found|No Content|
|**414**|URI Too Long|No Content|
|**500**|Internal Server Error|No Content|


#### Produces

* `application/json`


#### Tags

* Dataset APIs


#### Example HTTP request

##### Request path
```
/lookup/dataSets/string
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
  "imsOrg" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "records" : 0
}
```



