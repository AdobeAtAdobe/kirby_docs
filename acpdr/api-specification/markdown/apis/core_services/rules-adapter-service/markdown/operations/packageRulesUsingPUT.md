
<a name="packagerulesusingput"></a>
### package rules
```
PUT /rulesadapter/{category}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|x-gw-ims-org-id|string|
|**Path**|**category**  <br>*required*|category|string|
|**Query**|**op**  <br>*required*|op|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[PackagerDto](../definitions/PackagerDto.md#packagerdto)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* rules-package-controller


#### Example HTTP request

##### Request path
```
/rulesadapter/string
```


##### Request header
```
json :
"string"
```


##### Request query
```
json :
{
  "op" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "category" : "string",
  "imsOrgId" : "string",
  "packageSize" : 0,
  "packageUrl" : "string",
  "rulesetId" : "string",
  "version" : "string"
}
```



