
<a name="update_connection_by_id"></a>
### Updates an existing Connection by ID.
```
PUT /connections/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**E-tag**  <br>*optional*|Set to verify the right version of document to be modified by matching the version.|string|
|**Header**|**if-match**  <br>*optional*|Set to verify the right version of document to be modified by matching the updated date.|string|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Body parameter
Connection field(s) to be updated.

*Name* : connection  
*Flags* : required  
*Type* : [connection](../definitions/connection.md#connection)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Array[ @/connections/connectionId ]|< string > array|
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
/connections/string
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

##### Response 200
```
json :
[ "string" ]
```



