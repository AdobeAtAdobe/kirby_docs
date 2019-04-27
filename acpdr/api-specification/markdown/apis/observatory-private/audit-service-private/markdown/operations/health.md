
<a name="health"></a>
### Returns a json response showing health of services
```
GET /audit/health
```


#### Description
Returns a json response showing health of services


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
/audit/health
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



