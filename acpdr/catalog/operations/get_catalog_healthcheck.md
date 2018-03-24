
<a name="get_catalog_healthcheck"></a>
### Catalog healthcheck report. Used by monitoring services and dashboards.
```
GET /catalog/health
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|healthcheck response|[healthcheck](../definitions/healthcheck.md#healthcheck)|
|**503**|service unavailable|No Content|
|**default**|unexpected error|No Content|


#### Produces

* `application/json`


#### Example HTTP request

##### Request path
```
/catalog/health
```


#### Example HTTP response

##### Response 200
```
json :
{
  "status" : true
}
```



