
<a name="importanalyticsrulesusingpost"></a>
### Export segments using Analytics API  and convert them to ARL rules
```
POST /rulesadapter/{category}
```


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Authorization**  <br>*optional*|Authorization|string||
|**Header**|**x-gw-ims-org-id**  <br>*required*|x-gw-ims-org-id|string||
|**Path**|**category**  <br>*required*|category|string||
|**Query**|**op**  <br>*required*|op|string||
|**Query**|**package**  <br>*optional*|package|boolean|`"false"`|
|**Query**|**src**  <br>*optional*|src|string||
|**Query**|**userName**  <br>*optional*|userName|string||


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[AdapterDto](../definitions/AdapterDto.md#adapterdto)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* rule-controller


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
  "op" : "string",
  "package" : true,
  "src" : "string",
  "userName" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "category" : "string",
  "importedSegments" : 0,
  "importedTimestamp" : 0,
  "imsOrgId" : "string",
  "packageSize" : 0,
  "packageUrl" : "string",
  "rulesetId" : "string",
  "translatedSegments" : 0,
  "version" : "string"
}
```



