
<a name="getdetailedhealthstatus"></a>
### Detailed Health Check for Security Service
```
GET /security/health-detailed
```


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|IMS Service Token|string|`""`|
|**Header**|**x-gw-ims-authorization**  <br>*required*|Gateway Service Token|string|`""`|


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
/security/health-detailed
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



