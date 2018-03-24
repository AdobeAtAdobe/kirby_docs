
<a name="post_connection"></a>
### Saves a new Connection.
```
POST /connections
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|


#### Body parameter
Connection to be posted.

*Name* : connection  
*Flags* : required  
*Type* : [connection](../definitions/connection.md#connection)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/connection/connectionId ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
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
/connections
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
  "parentConnectionId" : "string",
  "name" : "string",
  "description" : "string",
  "enabled" : true,
  "version" : "string",
  "created" : 0,
  "updated" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "updatedUser" : "string",
  "attributes" : "object",
  "dependencies" : [ "string" ],
  "imsOrg" : "string",
  "contacts" : [ {
    "email" : "string",
    "displayName" : "string",
    "isPrimary" : true
  } ],
  "ingestStart" : "string",
  "frequency" : "object",
  "accountId" : "string",
  "ingestParams" : "object",
  "statsCache" : "object",
  "tags" : {
    "string" : [ "string" ]
  },
  "dule" : "object"
}
```


#### Example HTTP response

##### Response 201
```
json :
[ "string" ]
```



