
<a name="pingroute"></a>
### Return a ping message
```
GET /ping
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Ping succeeded|[PingResponse](../definitions/PingResponse.md#pingresponse)|
|**503**|Service unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* ping


#### Example HTTP request

##### Request path
```
/ping
```


#### Example HTTP response

##### Response 200
```
json :
{
  "code" : "string",
  "message" : "string"
}
```



