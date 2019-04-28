
<a name="getpackageinfoforclientusingget"></a>
### Get the list of categories loaded for a given client
```
GET /rulesets
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|x-gw-ims-org-id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|< [PackagerDto](../definitions/PackagerDto.md#packagerdto) > array|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* packager-controller


#### Example HTTP request

##### Request path
```
/rulesets
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
  "category" : "string",
  "imsOrgId" : "string",
  "packageSize" : 0,
  "packageUrl" : "string",
  "rulesetId" : "string",
  "version" : "string"
} ]
```



