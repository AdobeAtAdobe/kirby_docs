
<a name="getdetailedhealthstatus"></a>
### Detailed Health Check for Provisioning Service
```
GET /execute/health-detailed
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Healthy|[HealthCheckResponse](../definitions/HealthCheckResponse.md#healthcheckresponse)|
|**503**|Service not healthy|[HealthCheckResponse](../definitions/HealthCheckResponse.md#healthcheckresponse)|


#### Produces

* `application/json`


#### Tags

* Health Check


#### Example HTTP request

##### Request path
```
/execute/health-detailed
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


##### Response 503
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



