
<a name="gettable"></a>
### Get the list of all keys of the respective tenant based on the dataSetId, start and limit filter (max is 100)
```
GET /lookup/dataSets/{dataSetId}/keys
```


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*optional*|IMS Org Id. It will have higher priority over imsOrg query param|string||
|**Path**|**dataSetId**  <br>*required*|dataSetId|string||
|**Query**|**imsOrg**  <br>*optional*|The owning IMS organization identifier|string||
|**Query**|**keysOnly**  <br>*optional*|Flag to return only set of Keys. Maxiumum page size is 100|string|`"false"`|
|**Query**|**limit**  <br>*optional*|Page limit. Maxiumum page size is 100|integer (int32)|`-1`|
|**Query**|**start**  <br>*optional*|Start Index of Page|integer (int32)|`-1`|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|data|[PageResponse](../definitions/PageResponse.md#pageresponse)|
|**400**|Bad Request|No Content|
|**403**|Forbidden|No Content|
|**404**|Not Found|No Content|
|**414**|URI Too Long|No Content|
|**500**|Internal Server Error|No Content|


#### Produces

* `application/json`


#### Tags

* Batch APIs


#### Example HTTP request

##### Request path
```
/lookup/dataSets/string/keys
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
  "imsOrg" : "string",
  "keysOnly" : "string",
  "limit" : 0,
  "start" : 0
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "_page" : {
    "start" : 0,
    "next" : 0,
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
  },
  "values" : [ "object" ]
}
```



