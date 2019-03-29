
<a name="gethealthstatus"></a>
### Health Check for Observatory Backend
```
GET /observatory/health
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK - indicates the service is healthy.|[HealthCheckResponse](../definitions/HealthCheckResponse.md#healthcheckresponse)|
|**503**|Internal Server Error|No Content|


#### Produces

* `application/json`


#### Tags

* Health Check


#### Example HTTP request

##### Request path
```
/observatory/health
```


#### Example HTTP response

##### Response 200
```
json :
{
  "status" : true
}
```



