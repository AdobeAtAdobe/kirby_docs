
<a name="gethealthstatus"></a>
### Health Check for Discovery Service
```
GET /discovery/health
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Healthy|string|
|**503**|Service not healthy|No Content|


#### Produces

* `application/json`


#### Tags

* Health Check


#### Example HTTP request

##### Request path
```
/discovery/health
```


#### Example HTTP response

##### Response 200
```
json :
"string"
```



