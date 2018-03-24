
<a name="deleteuser"></a>
### Delete user from GDPR config
```
DELETE /data/privacy/gdpr/users/{userId}
```


#### Description
Returns deleted user json with status


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Path**|**userId**  <br>*required*|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful deletion of user|[UserInfo](../definitions/UserInfo.md#userinfo)|
|**404**|No user found in the system for deletion|No Content|
|**417**|Expectation Failed!! Validation failed|No Content|
|**500**|Internal server error|No Content|
|**503**|Exception Occurred!!|No Content|


#### Tags

* GDPR Admin user management service


#### Example HTTP request

##### Request path
```
/data/privacy/gdpr/users/string
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



