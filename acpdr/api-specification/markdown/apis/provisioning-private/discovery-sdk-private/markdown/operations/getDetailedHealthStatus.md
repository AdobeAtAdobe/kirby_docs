
<a name="getdetailedhealthstatus"></a>
### Detailed Health Check for Discovery Service
```
GET /discovery/health-detailed
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
/discovery/health-detailed
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



