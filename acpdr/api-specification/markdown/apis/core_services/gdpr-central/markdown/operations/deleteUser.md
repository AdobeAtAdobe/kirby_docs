
<a name="deleteuser"></a>
### Delete user from GDPR config
```
DELETE /data/privacy/gdpr/users/{userId}
```


#### Description
Returns deleted user json with status


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|Bearer XXXXX|string|
|**Header**|**Content-Type**  <br>*required*|application/json|string|
|**Header**|**x-api-key**  <br>*required*|acp_XXX_XXXX, IMS Client id which is whitelisted and subscribed to consume services on adobe.io|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|XXXXX47E56F59C747FXXXXX@AdobeOrg|string|
|**Path**|**userId**  <br>*required*|User id to delete|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful deletion of user|[UserInfo](../definitions/UserInfo.md#userinfo)|
|**404**|No user found in the system for deletion|No Content|
|**417**|Expectation Failed!! Validation failed|No Content|
|**500**|Internal server error|No Content|
|**503**|Exception Occurred!!|No Content|


#### Tags

* GDPR User Management CRUD API


#### Example HTTP request

##### Request path
```
/data/privacy/gdpr/users/string
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
  "id" : 0,
  "userId" : "string",
  "role" : "string",
  "emailId" : "string",
  "statusCode" : "string",
  "statusMessage" : "string"
}
```



