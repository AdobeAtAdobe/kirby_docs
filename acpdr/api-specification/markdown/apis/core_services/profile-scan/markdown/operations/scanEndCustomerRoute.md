
<a name="scanendcustomerroute"></a>
### Retrieve records of a model for given partition id.
```
GET /models/{model}/{partitionId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**token**  <br>*optional*|Continutation token for continuing the records on the next page. If retrieving the first set of records, leave it as empty string while calling the API|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**model**  <br>*required*|Model name whose records will be retrieved|string|
|**Path**|**partitionId**  <br>*required*|Partition whose records will be retrieved|string|
|**Query**|**limit**  <br>*optional*|How many entries should be present in a page. 1000 if not specified.|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Records of given model and partition id successfully returned.|[ScanCustomerEntityPageResponse](../definitions/ScanCustomerEntityPageResponse.md#scancustomerentitypageresponse)|
|**403**|You are forbidden to make this request.|No Content|
|**404**|Model with given model name does not exist.|No Content|
|**503**|Service unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* models


#### Example HTTP request

##### Request path
```
/models/12345678/12345678
```


##### Request header
```
json :
"southwest@adobe.com"
```


##### Request query
```
json :
{
  "limit" : 100
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "continuationToken" : "string",
  "children" : [ {
    "xid" : "string",
    "timestamp" : "string",
    "sourceId" : "string",
    "record" : "string"
  } ]
}
```



