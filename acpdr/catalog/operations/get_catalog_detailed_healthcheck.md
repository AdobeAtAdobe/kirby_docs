
<a name="get_catalog_detailed_healthcheck"></a>
### Catalog healthcheck report with dependencies. Used by monitoring services and dashboards.
```
GET /catalog/health-detailed
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|healthcheck response|[health-detailed](../definitions/health-detailed.md#health-detailed)|
|**503**|service unavailable|No Content|
|**default**|unexpected error|No Content|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/catalog/health-detailed
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



