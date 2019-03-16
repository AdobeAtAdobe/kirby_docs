
<a name="getconnection"></a>
### Get Connection Details
```
GET /connections/{connectionId}
```


#### Description
Get details about a particular connection


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Query**|**connectionId**  <br>*required*|Id of the connection whose details are to be fetched|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Connection info retrieved|[Connection](../definitions/Connection.md#connection)|
|**401**|Forbidden|No Content|
|**404**|Not Found|No Content|
|**500**|Internal Server Error|No Content|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Describe Operations on Connections


#### Example HTTP request

##### Request path
```
/connections/{connectionId}
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
  "connectionId" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "name" : "string",
  "description" : "string",
  "uriEndpoint" : "string",
  "metadata" : {
    "string" : "string"
  }
}
```



