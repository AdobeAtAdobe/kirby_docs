
<a name="queries-queryid-results-get"></a>
### Requests query status.
```
GET /queries/{queryid}/results
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|API key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**queryid**  <br>*required*|Query ID|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter result set in the response. Ex. property=columnName==columnValue.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Query results|[results](../definitions/results.md#results)|
|**401**|Unauthorized|No Content|
|**404**|Not Found|No Content|
|**500**|Internal Server Error|No Content|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/queries/string/results
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
  "property" : "string",
  "start" : 0
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "schema" : [ "object" ],
  "data" : [ "object" ],
  "_page" : {
    "orderby" : "string",
    "order" : "string",
    "start" : "string",
    "next" : "string",
    "property" : "string",
    "type" : "string",
    "count" : 0
  }
}
```



