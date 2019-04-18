
<a name="patchpredicateroute"></a>
### Overwrites a Profile Predicate
```
PATCH /predicates/{predicateId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|


#### Body parameter
name - Name of the predicate

queryFormat - This is the query format of the predicate. It can take only pql/text and pql/json as of now

description - Description of the predicate

expression - PQL expression

*Name* : body  
*Flags* : required  
*Type* : [PredicateEntityUpdate](../definitions/PredicateEntityUpdate.md#predicateentityupdate)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Profile Predicate successfully Put  <br>**Headers** :   <br>`X-Location` (string) : HRef to the Profile Predicate.|[PredicateEntity](../definitions/PredicateEntity.md#predicateentity)|
|**400**|Invalid profile predicate|No Content|
|**403**|Forbidden|No Content|
|**503**|Service Unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* predicates


#### Example HTTP request

##### Request path
```
/predicates/{predicateId}
```


##### Request header
```
json :
"southwest@adobe.com"
```


##### Request body
```
json :
{
  "name" : "string",
  "queryFormat" : "string",
  "description" : "string",
  "expression" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : 0.0,
  "imsOrgId" : "string",
  "name" : "string",
  "queryFormat" : "string",
  "description" : "string",
  "expression" : "string",
  "creationTime" : "string",
  "updateTime" : "string"
}
```



