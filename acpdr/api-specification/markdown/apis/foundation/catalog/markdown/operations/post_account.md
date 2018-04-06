
<a name="post_account"></a>
### Saves a new account.
```
POST /accounts
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|


#### Body parameter
Account to be posted.

*Name* : account  
*Flags* : required  
*Type* : [accountRequest](../definitions/accountRequest.md#accountrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/accounts/accountId ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
|**400**|Bad request|No Content|
|**403**|Forbidden|No Content|
|**500**|Internal server error|No Content|
|**default**|Unexpected error|No Content|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/accounts
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
  "connector" : "string",
  "description" : "string",
  "params" : "object"
}
```


#### Example HTTP response

##### Response 201
```
json :
[ "string" ]
```



