
<a name="deletes-a-health-check-based-on-id"></a>
### Deletes a Health Check based on id
```
DELETE /admin/healthCheck/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**id**  <br>*required*|Health Check Id|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**204**|Deletes a Health Check|No Content|
|**400**|Unable to process the request|No Content|
|**404**|Health Check Not Found|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/healthCheck/0
```


##### Request header
```
json :
"string"
```



