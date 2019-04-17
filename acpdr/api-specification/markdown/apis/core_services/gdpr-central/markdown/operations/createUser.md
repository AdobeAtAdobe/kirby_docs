
<a name="createuser"></a>
### Add user as admin for GDPR central service
```
POST /data/privacy/gdpr/users
```


#### Description
Returns added user json with status


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|Bearer XXXXX|string|
|**Header**|**Content-Type**  <br>*required*|application/json|string|
|**Header**|**x-api-key**  <br>*required*|acp_XXX_XXXX, IMS Client id which is whitelisted and subscribed to consume services on adobe.io|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|XXXXX47E56F59C747FXXXXX@AdobeOrg|string|


#### Body parameter
User details to be added

*Name* : body  
*Flags* : required  
*Type* : [UserInfo](../definitions/UserInfo.md#userinfo)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful creation of user|[UserInfo](../definitions/UserInfo.md#userinfo)|
|**400**|User already exists in the system & can not be added|No Content|
|**417**|Expectation Failed!! Validation failed|No Content|
|**500**|Internal server error|No Content|
|**503**|Exception Occurred!!|No Content|


#### Tags

* GDPR User Management CRUD API


#### Example HTTP request

##### Request path
```
/data/privacy/gdpr/users
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
  "id" : 0,
  "userId" : "string",
  "role" : "string",
  "emailId" : "string",
  "statusCode" : "string",
  "statusMessage" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : 0,
  "userId" : "string",
  "role" : "string",
  "emailId" : "string",
  "statusCode" : "string",
  "statusMessage" : "string"
}
```



