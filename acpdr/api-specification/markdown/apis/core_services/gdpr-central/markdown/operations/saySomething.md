
<a name="saysomething"></a>
### Access or Delete GDPR service requests
```
GET /data/privacy/gdpr/ping
```


#### Description
The message is read from the properties


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|Authorization|string|
|**Header**|**Content-Type**  <br>*required*|application/json|string|
|**Header**|**x-api-key**  <br>*required*|IMS Client id which is whitelisted and subscribed to consume services on adobe.io|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|Org ID associated with logged in user|string|
|**Query**|**status**  <br>*required*||integer (int32)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Something](../definitions/Something.md#something)|
|**400**|Bad Request!!!|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**401**|Unauthorized!!!|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**403**|Forbidden!!!|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**500**|Something went wrong, Internal Server Error|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Tags

* GDPR Central Service Health Check


#### Example HTTP request

##### Request path
```
/data/privacy/gdpr/ping
```


##### Request header
```
json :
"string"
```


##### Request query
```
json :
{
  "status" : 0
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "message" : "string"
}
```


##### Response 400
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 401
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 403
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 500
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```



