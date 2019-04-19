
<a name="get-dataset-files-by-batchid"></a>
### Get dataset files.
```
GET /batches/{batchId}/files
```


#### Description
List all Dataset files under a batch.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|API key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|Ims Org Identifier|string|
|**Path**|**batchId**  <br>*required*|Batch Identifier|string|
|**Query**|**limit**  <br>*optional*|Paging parameter to specify number of results per page. E.g, limit=10|string|
|**Query**|**start**  <br>*optional*|Paging parameter to specify start of new page. E.g, start=1|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[dataSetFiles](../definitions/dataSetFiles.md#datasetfiles)|
|**401**|Unauthorized|No Content|
|**500**|Internal Server Error|No Content|


#### Produces

* `application/json`


#### Tags

* dataAccess


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/batches/string/files
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
  "limit" : "string",
  "start" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "data" : [ {
    "dataSetFileId" : "string",
    "dataSetViewId" : "string",
    "version" : "string",
    "created" : "string",
    "updated" : "string",
    "records" : "string",
    "size" : "string",
    "isValid" : true,
    "_links" : {
      "self" : {
        "href" : "string"
      }
    }
  } ],
  "_page" : {
    "limit" : 0,
    "count" : 0
  },
  "_links" : {
    "next" : {
      "href" : "string"
    },
    "page" : {
      "href" : "string",
      "templated" : true
    }
  }
}
```



