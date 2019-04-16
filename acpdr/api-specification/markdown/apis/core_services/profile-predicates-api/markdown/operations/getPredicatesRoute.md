
<a name="getpredicatesroute"></a>
### Get list of all Profile predicates
```
GET /predicates
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Query**|**limit**  <br>*optional*|Page Size|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of Profile predicates returned|number|
|**403**|Forbidden|No Content|
|**503**|Service Unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* predicates


#### Example HTTP request

##### Request path
```
/predicates
```


##### Request header
```
json :
"southwest@adobe.com"
```


##### Request query
```
json :
{
  "limit" : 10
}
```


#### Example HTTP response

##### Response 200
```
json :
0.0
```



