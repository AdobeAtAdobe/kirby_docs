
<a name="storenewsecret"></a>
### Stores secret in key vault belonging to ims org and returns a URL pointing to it
```
POST /security/secret
```


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|IMS Service Token|string|`""`|
|**Header**|**x-gw-ims-authorization**  <br>*required*|Gateway Service Token|string|`""`|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization Id|string|`""`|


#### Body parameter
Secret to Store

*Name* : body  
*Flags* : required  
*Type* : [SecretStoreRequest](../definitions/SecretStoreRequest.md#secretstorerequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|[SecretResponse](../definitions/SecretResponse.md#secretresponse)|
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


##### Request body
```
json :
{
  "secret" : "P4$$vv0r|)"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "secret" : "P4$$vv0r|)"
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


##### Response 500
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```



