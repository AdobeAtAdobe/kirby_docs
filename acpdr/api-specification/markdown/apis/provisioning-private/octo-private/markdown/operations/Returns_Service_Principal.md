
<a name="returns-service-principal"></a>
### Returns a Service Principal
```
GET /admin/servicePrincipals/{sp_name}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**sp_name**  <br>*required*|Service Principal name|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Service Principal found in Octo DB|No Content|
|**400**|Service Principal lookup failed|No Content|
|**403**|Failed authentication|No Content|
|**404**|Service Principal Not Found in Octo DB|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/servicePrincipals/string
```


##### Request header
```
json :
"string"
```



