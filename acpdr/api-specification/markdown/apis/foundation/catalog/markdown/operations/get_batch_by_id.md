
<a name="get_batch_by_id"></a>
### GET /batches/{id}

#### Description
Fetches Batches by ID.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Query**|**aggregate**  <br>*optional*|If true, then return the aggregated status, metrics, and errors in the root level status, metrics, and errors (default is false).|boolean|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Batch object for given batchId.|< string, [batchResponse](../definitions/batchResponse.md#batchresponse) > map|
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
/batches/string
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
  "aggregate" : true
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "5911f88ae2f4bf657c5a8cb5" : {
    "imsOrg" : "4F3BB22C5631222A7F000101@AdobeOrg",
    "created" : 1494349962314,
    "createdClient" : "MCDPCatalogServiceStage",
    "createdUser" : "MCDPCatalogServiceStage@AdobeID",
    "updatedUser" : "MCDPCatalogServiceStage@AdobeID",
    "updated" : 1494349963467,
    "status" : "success",
    "errors" : [ {
      "code" : "err-1494349963436"
    } ],
    "version" : "1.0.3",
    "availableDates" : {
      "startDate" : 1337,
      "endDate" : 4000
    },
    "relatedObjects" : [ {
      "type" : "batch",
      "id" : "foo_batch"
    }, {
      "type" : "connection",
      "id" : "foo_connection"
    }, {
      "type" : "connector",
      "id" : "foo_connector"
    }, {
      "type" : "dataSet",
      "id" : "foo_dataSet"
    }, {
      "type" : "dataSetView",
      "id" : "foo_dataSetView"
    }, {
      "type" : "dataSetFile",
      "id" : "foo_dataSetFile"
    }, {
      "type" : "expressionBlock",
      "id" : "foo_expressionBlock"
    }, {
      "type" : "service",
      "id" : "foo_service"
    }, {
      "type" : "serviceDefinition",
      "id" : "foo_serviceDefinition"
    } ],
    "metrics" : {
      "foo" : 1337
    },
    "tags" : {
      "foo_bar" : [ "stuff" ],
      "bar_foo" : [ "woo", "baz" ],
      "foo/bar/foo-bar" : [ "weehaw", "wee:haw" ]
    }
  }
}
```



