
<a name="putentry"></a>
### Insert/Update a Key
```
PUT /lookup/dataSets/{dataSetId}/keys/{key}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*optional*|IMS Org Id. It will have higher priority over imsOrg query param|string|
|**Path**|**dataSetId**  <br>*required*|dataSetId|string|
|**Path**|**key**  <br>*required*|Key to be inserted/updated. It should not contain special characters(%,",',/)|string|
|**Query**|**imsOrg**  <br>*optional*|The owning IMS organization identifier|string|


#### Body parameter
Key to be inserted/updated.

*Name* : body  
*Flags* : required  
*Type* : < string, object > map


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Created  <br>**Headers** :   <br>`Location` (string) : URL of inserted/updated Key.|No Content|
|**400**|Bad Request|No Content|
|**403**|Forbidden|No Content|
|**414**|URI Too Long|No Content|
|**500**|Internal Server Error|No Content|


#### Produces

* `application/json`


#### Tags

* Point APIs


#### Example HTTP request

##### Request path
```
/lookup/dataSets/string/keys/string
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
  "imsOrg" : "string"
}
```


##### Request body
```
json :
{ }
```



