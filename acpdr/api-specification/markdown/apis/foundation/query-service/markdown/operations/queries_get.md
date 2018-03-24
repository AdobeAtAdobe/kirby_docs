
<a name="queries-get"></a>
### Fetches a list of queries for this IMS organization
```
GET /queries
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|API key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=dbName=myDefaultDB,created>=1516665287,status==processing|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Query response|[Response 200](#queries-get-response-200)|
|**401**|Unauthorized|No Content|
|**404**|Not Found|No Content|
|**500**|Internal Server Error|No Content|

<a name="queries-get-response-200"></a>
**Response 200**

|Name|Description|Schema|
|---|---|---|
|**_page**  <br>*optional*|**Example** : `"[page](#page)"`|[_page](../definitions/page.md#page)|
|**queries**  <br>*optional*|**Example** : `[ "[status](#status)" ]`|< [status](../definitions/status.md#status) > array|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/queries
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
"object"
```



