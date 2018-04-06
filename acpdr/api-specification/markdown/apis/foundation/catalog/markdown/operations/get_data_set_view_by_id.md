
<a name="get_data_set_view_by_id"></a>
### Fetches DataSetViews by ID.
```
GET /dataSetViews/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|DataSetView for given dataSetViewId.|< string, [dataSetViewResponse](../definitions/dataSetViewResponse.md#datasetviewresponse) > map|
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
/dataSetViews/string
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
  "5ab54170864cf0267448ead5" : {
    "version" : "1.0.0",
    "imsOrg" : "4F3BB22C5631222A7F000101@AdobeOrg",
    "dataSetId" : "5ab540d0864cf0267448ead4",
    "aspect" : "production",
    "status" : "enabled",
    "editable" : false,
    "fields" : [ ],
    "storageType" : "s3",
    "basePath" : "s3://bar/ball/baz",
    "fileDescription" : {
      "persisted" : false
    },
    "created" : 1521828208046,
    "updated" : 1521828208046,
    "createdClient" : "acp_foundation_catalog",
    "createdUser" : "acp_foundation_catalog@AdobeID",
    "updatedUser" : "acp_foundation_catalog@AdobeID",
    "observableSchema" : { },
    "transforms" : "@/dataSets/5ab540d0864cf0267448ead4/views/5ab54170864cf0267448ead5/transforms",
    "files" : "@/dataSets/5ab540d0864cf0267448ead4/views/5ab54170864cf0267448ead5/files",
    "isLookup" : false,
    "tags" : {
      "foo" : [ "bar", "foos", "ball" ],
      "adobe/touchpoint/appliedTransformations" : [ "CLUSTERED:FOO" ]
    }
  }
}
```



