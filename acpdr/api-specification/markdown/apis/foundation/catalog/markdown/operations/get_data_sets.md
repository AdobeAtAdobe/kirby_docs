
<a name="get_data_sets"></a>
### Fetches a list of DataSets.
```
GET /dataSets
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**connectionId**  <br>*optional*|Filter by the foreign key to the Connection this DataSet originates from.|string|
|**Query**|**connectorId**  <br>*optional*|Filter by the foreign key to the Connector this DataSet originates from. Template DataSets are tied to Connectors and not Connections.|string|
|**Query**|**created**  <br>*optional*|Filter by the Unix timestamp (in milliseconds) when this object was persisted.|integer (int64)|
|**Query**|**createdClient**  <br>*optional*|Filter by the ID of the IMS client that created this object.|string|
|**Query**|**createdUser**  <br>*optional*|Filter by the  ID of the user who created this object.|string|
|**Query**|**description**  <br>*optional*|Filter by the longer text description of the DataSet.|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**name**  <br>*optional*|Filter by the a descriptive, human-readable name for this DataSet.|string|
|**Query**|**namespace**  <br>*optional*|One of the registered platform acronyms that identify the platform.|string|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**properties**  <br>*optional*|A comma separated whitelist of top-level object properties to be returned in the response. Used to cut down the number of properties and amount of data returned in the response bodies.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**tags**  <br>*optional*|Filter response by the specified tags. Ex. tags=ns:tag,ns2:tag2|string|
|**Query**|**type**  <br>*optional*|DataSet types reflect where the data is in the MCDP lifecycle. Raw datasets are created by ingest, Master datasets are created by the Harvester, and Model datasets are configured by users. App datasets can then be created by MCDP services. This query param allows filtering of datasets by their type.|string|
|**Query**|**updated**  <br>*optional*|Filter by the Unix timestamp (in milliseconds) for the time of last modification.|integer (int64)|
|**Query**|**updatedUser**  <br>*optional*|Filter by the  ID of the user who changed this object.|string|
|**Query**|**version**  <br>*optional*|Filter by Semantic version of the account. Updated when the object is modified.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|All datasets for given imsOrg.|< string, [dataSetResponse](../definitions/dataSetResponse.md#datasetresponse) > map|
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
/dataSets
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
  "connectionId" : "string",
  "connectorId" : "string",
  "created" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "description" : "string",
  "limit" : 0,
  "name" : "string",
  "namespace" : "string",
  "orderBy" : "string",
  "properties" : "string",
  "property" : "string",
  "start" : 0,
  "tags" : "string",
  "type" : "string",
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



