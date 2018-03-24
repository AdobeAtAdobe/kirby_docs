
<a name="gethealthstatus"></a>
### Health Check for Discovery Service
```
GET /discovery/health
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


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[X-API-Key](security.md#x-api-key)**|


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



