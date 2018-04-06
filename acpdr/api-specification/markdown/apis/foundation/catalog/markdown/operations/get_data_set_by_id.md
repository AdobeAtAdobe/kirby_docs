
<a name="get_data_set_by_id"></a>
### Fetches DataSets by ID.
```
GET /dataSets/{id}
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
|**200**|DataSet object for input DataSetId.|< string, [dataSetResponse](../definitions/dataSetResponse.md#datasetresponse) > map|
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
/dataSets/string
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
  "5ab540d0864cf0267448ead4" : {
    "version" : "1.0.0",
    "imsOrg" : "4F3BB22C5631222A7F000101@AdobeOrg",
    "connectorId" : "s3-push",
    "connectionId" : "5ab5249e864cf0267448ead1",
    "name" : "connections functional tests - 1521827915638",
    "created" : 1521828048923,
    "updated" : 1521828208046,
    "createdClient" : "acp_foundation_catalog",
    "createdUser" : "acp_foundation_catalog@AdobeID",
    "updatedUser" : "acp_foundation_catalog@AdobeID",
    "namespace" : "ACP",
    "tags" : {
      "foo" : [ "bar", "foos", "ball" ],
      "adobe/touchpoint/appliedTransformations" : [ "CLUSTERED:FOO" ]
    },
    "viewId" : "5ab54170864cf0267448ead5",
    "aspect" : "production",
    "status" : "enabled",
    "fields" : [ ],
    "basePath" : "s3://bar/ball/baz",
    "fileDescription" : {
      "persisted" : false
    },
    "transforms" : "@/dataSets/5ab540d0864cf0267448ead4/views/5ab54170864cf0267448ead5/transforms",
    "files" : "@/dataSets/5ab540d0864cf0267448ead4/views/5ab54170864cf0267448ead5/files",
    "observableSchema" : { }
  }
}
```



