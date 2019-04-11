
<a name="get-health-detailed"></a>
### Perform a health check for dependent services
```
GET /health-detailed
```


#### Description
Returns status of each dependent service signifying its health


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|API key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|Ims Org Identifier|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[health-detailed](../definitions/health-detailed.md#health-detailed)|
|**500**|Internal Server Error|No Content|


#### Tags

* dataAccess


#### Example HTTP request

##### Request path
```
/health-detailed
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
  "status" : true,
  "dependencies" : [ {
    "service" : "string",
    "status" : true
  } ]
}
```



