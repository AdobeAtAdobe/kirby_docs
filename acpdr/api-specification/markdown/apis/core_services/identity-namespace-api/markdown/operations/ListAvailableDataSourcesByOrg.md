
<a name="listavailabledatasourcesbyorg"></a>
### Lists all namespaces available to the client `x-gw-ims-org-id`
```
GET /identities/
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API Key (IMS ClientID) that has already been whitelisted with the Identity Namespace API|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The IMS Org ID (Example - "09A55EBC5639E6017F000101@AdobeOrg" )|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|< [Namespace](../definitions/Namespace.md#namespace) > array|
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


#### Example HTTP response

##### Response 200
```
json :
[ {
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
} ]
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



