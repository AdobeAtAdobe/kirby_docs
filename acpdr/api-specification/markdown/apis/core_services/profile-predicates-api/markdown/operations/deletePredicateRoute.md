
<a name="deletepredicateroute"></a>
### Deleted the predicate given an id
```
DELETE /predicates/{predicateId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**predicateId**  <br>*required*|Predicate Id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Profile Predicate deleted successfully|[MessageResponse](../definitions/MessageResponse.md#messageresponse)|
|**403**|Forbidden|No Content|
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
  "status" : true,
  "message" : "string"
}
```



