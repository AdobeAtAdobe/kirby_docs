
<a name="get_catalog_detailed_healthcheck"></a>
### Catalog healthcheck report with dependencies. Used by monitoring services and dashboards.On local the URI should be /catalog/health-detailed.
```
GET /health-detailed
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**api_key**  <br>*required*|API key for request.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|healthcheck response|[health-detailed](../definitions/health-detailed.md#health-detailed)|
|**503**|service unavailable|No Content|
|**default**|Unexpected error|No Content|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/health-detailed
```


##### Request query
```
json :
{
  "api_key" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "status" : true,
  "dependencies" : [ {
    "service" : "string",
    "status" : true,
    "duration" : 0
  } ]
}
```



