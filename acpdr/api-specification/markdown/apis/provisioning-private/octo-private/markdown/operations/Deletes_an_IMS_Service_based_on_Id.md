
<a name="deletes-an-ims-service-based-on-id"></a>
### Deletes an IMS Services based on id
```
DELETE /admin/imsService/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**id**  <br>*required*|IMS Service Id|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**204**|Deletes an IMS Service|No Content|
|**400**|Unable to process the request|No Content|
|**404**|IMS Service Not Found|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/imsService/0
```


##### Request header
```
json :
"string"
```



