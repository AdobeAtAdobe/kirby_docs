
<a name="post_account_by_id"></a>
### Saves a new Account with a specified ID.
```
POST /accounts/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Body parameter
Account to be posted

*Name* : account  
*Flags* : required  
*Type* : [account](../definitions/account.md#account)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/accounts/accountId ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
|**400**|Bad request|No Content|
|**403**|forbidden|No Content|
|**500**|internal server error|No Content|
|**default**|unexpected error|No Content|


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
/accounts/string
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
  "version" : "string",
  "created" : 0,
  "updated" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "imsOrg" : "string",
  "params" : "object"
}
```


#### Example HTTP response

##### Response 201
```
json :
[ "string" ]
```



