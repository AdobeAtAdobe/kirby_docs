
<a name="detailedhealthroute"></a>
### Return a detailed health check message
```
GET /health-detailed
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Detailed health check succeeded|[HealthDetailedResponse](../definitions/HealthDetailedResponse.md#healthdetailedresponse)|
|**503**|Service is unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* health-detailed


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
    "service" : "string",
    "status" : true
  } ]
}
```



