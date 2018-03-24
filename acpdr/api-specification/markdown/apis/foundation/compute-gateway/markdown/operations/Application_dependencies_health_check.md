
<a name="application-dependencies-health-check"></a>
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

* Describes health-checks for the Compute Gateway


#### Example HTTP request

##### Request path
```
/compute-gateway/health-detailed
```



