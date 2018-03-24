
<a name="queries-queryid-get"></a>
### Requests query status.
```
GET /queries/{queryid}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|API key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**queryid**  <br>*required*|Query ID|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Query status|[status](../definitions/status.md#status)|
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
/queries/string
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
{
  "dbName" : "string",
  "id" : "string",
  "status" : "string",
  "url" : "string",
  "created" : 0,
  "elapsedTime" : 0,
  "recordCount" : 0,
  "createdUser" : "string",
  "errors" : [ {
    "code" : "string",
    "message" : "string",
    "location" : "string",
    "line" : 0,
    "col" : 0,
    "description" : "string"
  } ]
}
```



