
<a name="healthroute"></a>
### Return a health check message
```
GET /health
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Health check succeeded|[HealthResponse](../definitions/HealthResponse.md#healthresponse)|
|**503**|Service is unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* health


#### Example HTTP request

##### Request path
```
/health
```


#### Example HTTP response

##### Response 200
```
json :
{
  "status" : true
}
```



