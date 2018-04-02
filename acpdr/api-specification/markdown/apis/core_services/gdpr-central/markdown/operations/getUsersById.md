
<a name="getusersbyid"></a>
### Returns details of single user based on userId parameter
```
GET /data/privacy/gdpr/users/{userId}
```


#### Description
Returns details of a user.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**userId**  <br>*required*|User id for details|string|


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful retrieval of user details|[UserInfo](../definitions/UserInfo.md#userinfo)|
|**404**|No Users found in the system|No Content|
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
{ }
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



