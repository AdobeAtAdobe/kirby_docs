
<a name="deleteentry"></a>
### Delete a Key
```
DELETE /lookup/dataSets/{dataSetId}/keys/{key}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*optional*|IMS Org Id. It will have higher priority over imsOrg query param|string|
|**Path**|**dataSetId**  <br>*required*|dataSetId|string|
|**Path**|**key**  <br>*required*|Key to be deleted. It should not contain special characters(%,",',/)|string|
|**Query**|**imsOrg**  <br>*optional*|The owning IMS organization identifier|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**204**|No Content|No Content|
|**400**|Bad Request|No Content|
|**403**|Forbidden|No Content|
|**404**|Not Found|No Content|
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



