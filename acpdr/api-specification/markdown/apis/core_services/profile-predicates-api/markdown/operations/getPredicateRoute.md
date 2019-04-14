
<a name="getpredicateroute"></a>
### Returns the Profile Predicate
```
GET /predicates/{predicateId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**predicateId**  <br>*required*|Predicate Id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Profile Predicate successfully Returned|[PredicateEntity](../definitions/PredicateEntity.md#predicateentity)|
|**403**|Forbidden|No Content|
|**404**|Profile Predicate not found|No Content|
|**503**|Service Unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* predicates


#### Example HTTP request

##### Request path
```
/predicates/12345678
```


##### Request header
```
json :
"southwest@adobe.com"
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



