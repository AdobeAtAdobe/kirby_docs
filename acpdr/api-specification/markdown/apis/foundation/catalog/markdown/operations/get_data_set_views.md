
<a name="get_data_set_views"></a>
### Fetches a list of DataSetViews.
```
GET /dataSetViews
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**aspect**  <br>*optional*|Aspect represents the particular perspective or target you're after when viewing a dataset. Sandbox views are a version of the dataset that's being used to iterate towards a final ETL job definition. The production aspect is then used (by default). This query param allows filtering all dataSetViews by their aspect field value.|string|
|**Query**|**basePath**  <br>*optional*|Filter by the fully qualified base path for all DataSetFiles associated with this view. For views cached in a database (HBase or Cassandra), supply a templatized DSN.|string|
|**Query**|**created**  <br>*optional*|Filter by the Unix timestamp (in milliseconds) when this object was persisted.|integer (int64)|
|**Query**|**createdClient**  <br>*optional*|Filter by the ID of the IMS client that created this object.|string|
|**Query**|**createdUser**  <br>*optional*|Filter by the  ID of the user who created this object.|string|
|**Query**|**dataSetId**  <br>*optional*|Filter by the foreign key to the owning DataSet.|string|
|**Query**|**editable**  <br>*optional*|Determines whether or not this DataSetView definition should be editable by the user.  Some documents are 'locked' and not available for edit. This query param allows filtering all dataSetViews by their status editable value.|boolean|
|**Query**|**isCached**  <br>*optional*|Some DataSetViews are pre-cached in a high-speed lookup table for faster access, this flag indicates if that has been done. This query param allows filtering all dataSetViews by their isCached field value.|boolean|
|**Query**|**isDefault**  <br>*optional*|Marks this view as the default for it's DataSet. DataSets should only be associated to a single default view. This query param allows filtering of dataSetViews by their isDefault field value.|boolean|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**name**  <br>*optional*|Filter by the name of this DataSetView.|string|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**saveStrategy**  <br>*optional*|Filter by the save strategy for this dataset.|string|
|**Query**|**schema**  <br>*optional*|This is the uri for the XDM model.|string|
|**Query**|**sdsVersion**  <br>*optional*|Filter by the semantic version of the SDS this view (and it's transforms) are compatible with.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**status**  <br>*optional*|Describes the current state of the view.  If a view is not enabled, it should not be used by any process even when it is specified as a dependency. Only one view of a given aspect should be enabled at any time. For example, no DataSet should have more than one enabled production or sandbox view. This query param allows filtering all dataSetViews by their status field value.|string|
|**Query**|**updated**  <br>*optional*|Filter by the Unix timestamp (in milliseconds) for the time of last modification.|integer (int64)|
|**Query**|**updatedUser**  <br>*optional*|Filter by the  ID of the user who changed this object.|string|
|**Query**|**version**  <br>*optional*|Filter by Semantic version of the account. Updated when the object is modified.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of all dataSetViews associated with given ims_org_id.|< string, [dataSetViewResponse](../definitions/dataSetViewResponse.md#datasetviewresponse) > map|
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
/dataSetViews
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
  "aspect" : "string",
  "basePath" : "string",
  "created" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "dataSetId" : "string",
  "editable" : true,
  "isCached" : true,
  "isDefault" : true,
  "limit" : 0,
  "name" : "string",
  "orderBy" : "string",
  "property" : "string",
  "saveStrategy" : "string",
  "schema" : "string",
  "sdsVersion" : "string",
  "start" : 0,
  "status" : "string",
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



