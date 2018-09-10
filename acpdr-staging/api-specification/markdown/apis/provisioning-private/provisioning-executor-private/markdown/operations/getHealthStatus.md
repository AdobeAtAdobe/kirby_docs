
<a name="gethealthstatus"></a>
### Health Check for Provisioning Service
```
GET /execute/health
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Healthy|string|
|**503**|Internal Server Error|No Content|


#### Produces

* `application/json`


#### Tags

* Health Check


#### Example HTTP request

##### Request path
```
/execute/health
```


#### Example HTTP response

##### Response 200
```
json :
"string"
```



