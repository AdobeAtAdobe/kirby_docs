
<a name="getdetailedhealthstatus"></a>
### Detailed Health Check for Observatory Backend Service
```
GET /observatory/health-detailed
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK - indicates the service is healthy.|[HealthCheckDetailedResponse](../definitions/HealthCheckDetailedResponse.md#healthcheckdetailedresponse)|
|**503**|Service Unavailable - if any dependent services are unavailable.|[HealthCheckDetailedResponse](../definitions/HealthCheckDetailedResponse.md#healthcheckdetailedresponse)|


#### Produces

* `application/json`


#### Tags

* Health Check


#### Example HTTP request

##### Request path
```
/observatory/health-detailed
```


#### Example HTTP response

##### Response 200
```
json :
{
  "status" : true,
  "dependencies" : [ "object" ]
}
```


##### Response 503
```
json :
{
  "status" : true,
  "dependencies" : [ "object" ]
}
```



