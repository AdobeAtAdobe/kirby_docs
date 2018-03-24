
<a name="databases-dbname-tables-tablename-get"></a>
### Lists the columns for a particular table for this database.
```
GET /databases/{dbName}/tables/{tableName}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|API key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**dbName**  <br>*required*|Object ID|string|
|**Path**|**tableName**  <br>*required*|Unique Table Name for this database|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|table response|[Response 200](#databases-dbname-tables-tablename-get-response-200)|
|**400**|Bad request|No Content|
|**403**|forbidden|No Content|
|**404**|Not found|No Content|
|**500**|internal server error|No Content|
|**default**|unexpected error|No Content|

<a name="databases-dbname-tables-tablename-get-response-200"></a>
**Response 200**

|Name|Description|Schema|
|---|---|---|
|**columns**  <br>*optional*|**Example** : `[ "[column](#column)" ]`|< [column](../definitions/column.md#column) > array|
|**table**  <br>*optional*|**Example** : `"[table](#table)"`|[table](../definitions/table.md#table)|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/databases/string/tables/string
```


##### Request header
```
json :
"string"
```


#### Example HTTP response

##### Response 200
```
json :
"object"
```



