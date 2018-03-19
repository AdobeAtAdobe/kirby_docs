
<a name="update_data_set_view_by_id"></a>
### Updates an existing DataSetView by ID.
```
PUT /dataSetViews/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**E-tag**  <br>*optional*|Set to verify the right version of document to be modified by matching the version.|string|
|**Header**|**if-match**  <br>*optional*|Set to verify the right version of document to be modified by matching the updated date.|string|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Body parameter
Data set views to be posted.

*Name* : dataSetView  
*Flags* : required  
*Type* : [dataSetView](../definitions/dataSetView.md#datasetview)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/dataSetViews/dataSetViewId ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
|**400**|Bad request|No Content|
|**403**|forbidden|No Content|
|**500**|internal server error|No Content|
|**default**|unexpected error|No Content|


#### Consumes

* `application/json`


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


##### Request body
```
json :
{
  "version" : "string",
  "imsOrg" : "string",
  "dataSetId" : "string",
  "aspect" : "string",
  "observableSchema" : "object",
  "status" : "string",
  "requestStartDate" : "string",
  "editable" : true,
  "dependencies" : [ {
    "dataSetId" : "string",
    "dataSetViewId" : "string",
    "type" : "string"
  } ],
  "sdsVersion" : "string",
  "fields" : [ "object" ],
  "storageType" : "string",
  "basePath" : "string",
  "isCached" : true,
  "fileDescription" : "object",
  "partitions" : [ "string" ],
  "saveStrategy" : "string",
  "created" : 0,
  "updated" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "updatedUser" : "string",
  "schema" : "string"
}
```


#### Example HTTP response

##### Response 201
```
json :
[ "string" ]
```



