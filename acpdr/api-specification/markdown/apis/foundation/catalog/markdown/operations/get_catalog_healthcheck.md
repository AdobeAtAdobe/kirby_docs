
<a name="get_catalog_healthcheck"></a>
### Catalog healthcheck report. Used by monitoring services and dashboards. On local the URI is /catalog/health.
```
GET /health
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**api_key**  <br>*required*|API key for request.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|healthcheck response|[healthcheck](../definitions/healthcheck.md#healthcheck)|
|**503**|service unavailable|No Content|
|**default**|Unexpected error|No Content|


#### Produces

* `application/json`


#### Example HTTP request

##### Request path
```
/health
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
  "status" : true
}
```



