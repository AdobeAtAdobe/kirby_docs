
<a name="get_service_principals_read"></a>
### Returns service principals info
```
GET /servicePrincipals/{sp_name}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**sp_name**  <br>*required*|Service principal name|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Service principal found|No Content|
|**400**|Service principal lookup failed|No Content|
|**403**|Failed authentication|No Content|
|**404**|Service principal was not found|No Content|


#### Tags

* octo


#### Example HTTP request

##### Request path
```
/servicePrincipals/string
```


##### Request header
```
json :
"string"
```



