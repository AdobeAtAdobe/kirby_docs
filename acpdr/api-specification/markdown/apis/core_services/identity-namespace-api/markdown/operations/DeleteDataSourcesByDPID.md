
<a name="deletedatasourcesbydpid"></a>
### Delete namespace owned by `x-gw-ims-org-id` and identified by the given `id`.
```
DELETE /identities/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API Key (IMS ClientID) that has already been whitelisted with the Identity Namespace API|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The IMS Org ID (Example - "09A55EBC5639E6017F000101@AdobeOrg" )|string|
|**Path**|**id**  <br>*required*|The Namespace ID (Example - 123 )|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**204**|No Content. Delete Successful|No Content|
|**default**|Error|[Error](../definitions/Error.md#error)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Example HTTP request

##### Request path
```
/identities/0
```


##### Request header
```
json :
"string"
```


#### Example HTTP response

##### Response default
```
json :
{
  "code" : "string",
  "detail" : "string",
  "message" : "string"
}
```



