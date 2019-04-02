
<a name="getdegradedstatuslist"></a>
### Collects application specific metrics.
```
GET /observatory/appmetrics
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Application metrics are available.|[AppMetricsResponse](../definitions/AppMetricsResponse.md#appmetricsresponse)|


#### Produces

* `application/json`


#### Tags

* Observatory


#### Example HTTP request

##### Request path
```
/observatory/appmetrics
```


#### Example HTTP response

##### Response 200
```
json :
{
  "nodes" : [ {
    "service" : "string",
    "metrics" : "object"
  } ]
}
```



