
<a name="get_transforms_by_data_set_id_and_data_set_view_id"></a>
### Lists the Transforms for a particular dataSetView for this dataSet.
```
GET /dataSets/{id}/views/{viewId}/transforms
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Path**|**viewId**  <br>*required*|dataSetView ID.|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of transforms associated with given dataSetViewId and dataSetId.|< string, [transformResponse](../definitions/transformResponse.md#transformresponse) > map|
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
/dataSets/string/views/string/transforms
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
  "property" : "string",
  "start" : 0
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "5abac7063998860540c7b848" : {
    "version" : "1.0.5",
    "imsOrg" : "4F3BB22C5631222A7F000101@AdobeOrg",
    "created" : 1522190086195,
    "createdClient" : "acp_foundation_catalog",
    "createdUser" : "acp_foundation_catalog@AdobeID",
    "updatedUser" : "acp_foundation_catalog@AdobeID",
    "updated" : 1522190612384,
    "codeUrl" : "git://example.com/foo/bar/something.git",
    "args" : [ "--context_param profile_dsv_in0.inputPath=${CATALOG.DSV.5ab540d0864cf0267448ead4.inputFiles}" ],
    "inputs" : [ ],
    "outputs" : [ {
      "dataSet" : "@/dataSets/123456"
    } ]
  }
}
```



