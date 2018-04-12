
<a name="get_data_sets_by_connection_id"></a>
### Fetches DataSets for the given Connection.
```
GET /connections/{id}/dataSets
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**properties**  <br>*optional*|A comma separated whitelist of top-level object properties to be returned in the response. Used to cut down the number of properties and amount of data returned in the response bodies.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**tags**  <br>*optional*|Filter response by the specified tags. Ex. tags=ns:tag,ns2:tag2|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Datasets associated with input connectionId.|< string, [dataSetResponse](../definitions/dataSetResponse.md#datasetresponse) > map|
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
/connections/string/dataSets
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
  "start" : 0,
  "tags" : "string"
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



