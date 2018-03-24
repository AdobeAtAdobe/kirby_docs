
<a name="databases-get"></a>
### Fetches a list of databases.
```
GET /databases
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|API key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=property=dbname==test,created<=1516665287 Use SQL with WHERE conditions to filter results before serialization. Use this parameter to apply filters before transfer|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|table response|[Response 200](#databases-get-response-200)|
|**400**|Bad request|No Content|
|**403**|forbidden|No Content|
|**404**|Not found|No Content|
|**500**|internal server error|No Content|
|**default**|unexpected error|No Content|

<a name="databases-get-response-200"></a>
**Response 200**

|Name|Description|Schema|
|---|---|---|
|**_page**  <br>*optional*|**Example** : `"[page](#page)"`|[_page](../definitions/page.md#page)|
|**databases**  <br>*optional*|**Example** : `[ "[database](#database)" ]`|< [database](../definitions/database.md#database) > array|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/databases
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



