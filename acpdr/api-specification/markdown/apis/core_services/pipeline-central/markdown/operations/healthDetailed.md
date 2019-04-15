
<a name="healthdetailed"></a>
### Detailed Health Check for Pipeline Central Service
```
GET /health-detailed
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Healthy|[HealthResponse](../definitions/HealthResponse.md#healthresponse)|
|**503**|Service not healthy|[HealthResponse](../definitions/HealthResponse.md#healthresponse)|


#### Produces

* `application/json`


#### Tags

* Health Check


#### Example HTTP request

##### Request path
```
/health-detailed
```


#### Example HTTP response

##### Response 200
```
json :
{
  "status" : true,
  "dependencies" : [ {
    "service" : "service",
    "status" : true
  }, {
    "service" : "service",
    "status" : true
  } ]
}
```


##### Response 503
```
json :
{
  "status" : true,
  "dependencies" : [ {
    "service" : "service",
    "status" : true
  }, {
    "service" : "service",
    "status" : true
  } ]
}
```



