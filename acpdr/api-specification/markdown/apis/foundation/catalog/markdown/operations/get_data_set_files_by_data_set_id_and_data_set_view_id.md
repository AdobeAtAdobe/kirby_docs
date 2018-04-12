
<a name="get_data_set_files_by_data_set_id_and_data_set_view_id"></a>
### Lists the dataSetFiles for a particular dataSetView for this dataSet.
```
GET /dataSets/{id}/views/{viewId}/files
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Path**|**viewId**  <br>*required*|dataSetViewId|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**properties**  <br>*optional*|A comma separated whitelist of top-level object properties to be returned in the response. Used to cut down the number of properties and amount of data returned in the response bodies.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of dataSetFiles for given dataSetViewId and dataSetId.|< string, [dataSetFileResponse](../definitions/dataSetFileResponse.md#datasetfileresponse) > map|
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
/dataSets/string/views/string/files
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
  "limit" : 0,
  "orderBy" : "string",
  "properties" : "string",
  "property" : "string",
  "start" : 0
}
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



