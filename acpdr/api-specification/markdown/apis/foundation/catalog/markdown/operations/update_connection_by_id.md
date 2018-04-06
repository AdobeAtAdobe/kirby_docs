
<a name="update_connection_by_id"></a>
### Updates an existing Connection by ID.
```
PUT /connections/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**if-match**  <br>*optional*|Set to verify the right version of document to be modified by matching the updated date.|string|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Body parameter
Connection field(s) to be updated.

*Name* : connection  
*Flags* : required  
*Type* : [connectionRequest](../definitions/connectionRequest.md#connectionrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Array[ @/connections/connectionId ]|< string > array|
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



