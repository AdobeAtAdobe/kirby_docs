
<a name="createnamespace"></a>
### Create namespace under `x-gw-ims-org-id` IMS Org .
```
POST /identities/
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API Key (IMS ClientID) that has already been whitelisted with the Identity Namespace API|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The IMS Org ID (Example - "09A55EBC5639E6017F000101@AdobeOrg" )|string|


#### Body parameter
Namespace details as a json input

*Name* : namespace_to_create  
*Flags* : required  
*Type* : [NamespaceForCreate](../definitions/NamespaceForCreate.md#namespaceforcreate)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Created. Namespace created sucessfully.|[Namespace](../definitions/Namespace.md#namespace)|
|**default**|Error|[Error](../definitions/Error.md#error)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Example HTTP request

##### Request path
```
/identities/
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
  "shared" : true,
  "description" : "string",
  "idType" : "string",
  "code" : "string",
  "name" : "string"
}
```


#### Example HTTP response

##### Response 201
```
json :
{
  "shared" : true,
  "custom" : true,
  "createTime" : 0,
  "description" : "string",
  "idType" : "string",
  "code" : "string",
  "name" : "string",
  "id" : 0,
  "status" : "string",
  "updateTime" : 0
}
```


##### Response default
```
json :
{
  "code" : "string",
  "detail" : "string",
  "message" : "string"
}
```



