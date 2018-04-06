
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
*Type* : [connectionRequest](../definitions/connectionRequest.md#connectionrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/connections/connectionId ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
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



