
<a name="updateuser"></a>
### Update user details
```
PUT /data/privacy/gdpr/users/{userId}
```


#### Description
Returns updated user json with status


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Path**|**userId**  <br>*required*|string|


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : [UserInfo](../definitions/UserInfo.md#userinfo)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful updation of user|[UserInfo](../definitions/UserInfo.md#userinfo)|
|**404**|No user found in the system for update|No Content|
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



