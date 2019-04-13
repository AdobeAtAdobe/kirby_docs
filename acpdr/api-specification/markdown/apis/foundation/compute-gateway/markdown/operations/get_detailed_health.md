
<a name="get_detailed_health"></a>
### Checks if the Compute Gateway's dependencies are healthy
```
GET /compute-gateway/health-detailed
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Application dependencies are healthy|No Content|
|**503**|Application dependencies are unhelathy|No Content|


#### Produces

* `application/json`


#### Tags

* ComputeHealth


#### Example HTTP request

##### Request path
```
/compute-gateway/health-detailed
```



