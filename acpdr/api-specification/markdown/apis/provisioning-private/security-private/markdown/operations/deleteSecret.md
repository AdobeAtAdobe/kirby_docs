
<a name="deletesecret"></a>
### Delete a secret in key vault belonging to specified ims org
```
DELETE /security/secret
```


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|IMS Service Token|string|`""`|
|**Header**|**x-gw-ims-authorization**  <br>*required*|Gateway Service Token|string|`""`|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization Id|string|`""`|
|**Query**|**uri**  <br>*required*|Secret to Delete|string||


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|No Content|
|**400**|Invalid Request|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**500**|Internal Server Error|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Azure Key Vault


#### Example HTTP request

##### Request path
```
/security/secret
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
  "uri" : "string"
}
```


#### Example HTTP response

##### Response 400
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



