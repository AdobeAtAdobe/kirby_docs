
<a name="getmetainfousingget"></a>
### Fetches the history of all previously imported segments.
```
GET /rulesadapter
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|x-gw-ims-org-id|string|
|**Query**|**category**  <br>*optional*|category|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|< [AdapterDto](../definitions/AdapterDto.md#adapterdto) > array|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* rule-controller


#### Example HTTP request

##### Request path
```
/rulesadapter
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
  "category" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
[ {
  "category" : "string",
  "importedSegments" : 0,
  "importedTimestamp" : 0,
  "imsOrgId" : "string",
  "packageSize" : 0,
  "packageUrl" : "string",
  "rulesetId" : "string",
  "translatedSegments" : 0,
  "version" : "string"
} ]
```



