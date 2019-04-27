
<a name="detailedhealth"></a>
### Returns a detailed json response showing health of services and its dependencies
```
GET /audit/health-detailed
```


#### Description
Returns a detailed json response showing health of services and its dependencies


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|string|
|**500**|Internal Server Error|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Produces

* `application/json`


#### Tags

* audit


#### Example HTTP request

##### Request path
```
/audit/health-detailed
```


#### Example HTTP response

##### Response 200
```
json :
"string"
```


##### Response 500
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```



