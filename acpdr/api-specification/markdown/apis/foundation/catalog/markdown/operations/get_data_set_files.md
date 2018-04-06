
<a name="get_data_set_files"></a>
### Fetches a list of DataSetFiles.
```
GET /dataSetFiles
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**batchId**  <br>*optional*|Filter by the ID of the Batch operation that created this DataSetFile.|string|
|**Query**|**created**  <br>*optional*|Filter by the Unix timestamp (in milliseconds) when this object was persisted.|integer (int64)|
|**Query**|**createdAfter**  <br>*optional*|Exclusively filter records created after this timestamp.|integer (int64)|
|**Query**|**createdBefore**  <br>*optional*|Exclusively filter records created before this timestamp.|integer (int64)|
|**Query**|**createdClient**  <br>*optional*|Filter by the ID of the IMS client that created this object.|string|
|**Query**|**createdUser**  <br>*optional*|Filter by the  ID of the user who created this object.|string|
|**Query**|**dataSetViewId**  <br>*optional*|Filter by the ID of the owning DataSetView.|string|
|**Query**|**folderName**  <br>*optional*|Filter by the name of the folder as it resides in the basePath (provided from the DataSetView).|string|
|**Query**|**isValid**  <br>*optional*|True if the file can still be used. False if the file was part of a batch that was mistakenly uploaded or incorrect, and should no longer be considered. This query param can be used to filter all files with isValid field value.|boolean|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**records**  <br>*optional*|Filter by the number of records/rows/transactions contained in file represented by this DataSetFile.|integer (int64)|
|**Query**|**size**  <br>*optional*|Filter by the size for the file in bytes.|integer (int64)|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**updated**  <br>*optional*|Filter by the Unix timestamp (in milliseconds) for the time of last modification.|integer (int64)|
|**Query**|**updatedUser**  <br>*optional*|Filter by the  ID of the user who changed this object.|string|
|**Query**|**version**  <br>*optional*|Filter by Semantic version of the account. Updated when the object is modified.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of dataSetFiles associated with given ims_org_id.|< string, [dataSetFileResponse](../definitions/dataSetFileResponse.md#datasetfileresponse) > map|
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
  "created" : 0,
  "createdAfter" : 0,
  "createdBefore" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "dataSetViewId" : "string",
  "folderName" : "string",
  "isValid" : true,
  "limit" : 0,
  "orderBy" : "string",
  "property" : "string",
  "records" : 0,
  "size" : 0,
  "start" : 0,
  "updated" : 0,
  "updatedUser" : "string",
  "version" : "string"
}
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



