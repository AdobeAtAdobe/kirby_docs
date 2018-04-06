
<a name="get_data_set_file_by_data_set_id_and_data_set_view_id_by_id"></a>
### Fetches a dataSetFile for a particular dataSetView for this dataSet.
```
GET /dataSets/{id}/views/{viewId}/files/{fileId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**fileId**  <br>*required*|file ID|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Path**|**viewId**  <br>*required*|dataSetView ID|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|DataSetFile for given fileId, dataSetViewId and dataSetId.|< string, [dataSetFileResponse](../definitions/dataSetFileResponse.md#datasetfileresponse) > map|
|**400**|Bad request|No Content|
|**403**|Forbidden|No Content|
|**404**|Not found|No Content|
|**500**|Internal server error|No Content|
|**default**|Unexpected error|No Content|


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
{
  "5abd49645591445e1ba04f87" : {
    "version" : "1.0.0",
    "created" : 1522354532905,
    "updated" : 1522354532905,
    "imsOrg" : "4F3BB22C5631222A7F000101@AdobeOrg",
    "dataSetViewId" : "5ab54170864cf0267448ead5",
    "createdClient" : "acp_foundation_catalog",
    "createdUser" : "acp_foundation_catalog@AdobeID",
    "updatedUser" : "acp_foundation_catalog@AdobeID",
    "availableDates" : {
      "startDate" : 4444,
      "endDate" : 5555
    }
  }
}
```



