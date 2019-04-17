
<a name="getkeyvault"></a>
### Get credentials to a key vault belonging to specified ims org
```
GET /security/keyvault
```


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|IMS Service Token|string|`""`|
|**Header**|**x-gw-ims-authorization**  <br>*required*|Gateway Service Token|string|`""`|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization Id|string|`""`|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|[KeyVaultResponse](../definitions/KeyVaultResponse.md#keyvaultresponse)|
|**400**|Invalid Request|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**404**|Not Found|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**500**|Internal Server Error|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Produces

* `application/json`


#### Tags

* Azure Key Vault


#### Example HTTP request

##### Request path
```
/security/keyvault
```


##### Request header
```
json :
"string"
```


#### Example HTTP response

##### Response 200
```
json :
{
  "clientId" : "string",
  "clientKey" : "string"
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


##### Response 404
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



