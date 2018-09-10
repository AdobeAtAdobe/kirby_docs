
<a name="post_service_principals_role_assignments"></a>
### Add Service Principal Role Assignment
```
POST /servicePrincipals/{sp_name}/roleAssignments
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [access token]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**sp_name**  <br>*required*|Service principal name|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**202**|Service principal role assignment add request received|No Content|
|**400**|Service principal role assignment add bad request|No Content|
|**403**|Failed authentication|No Content|


#### Tags

* octo


#### Example HTTP request

##### Request path
```
/servicePrincipals/string/roleAssignments
```


##### Request header
```
json :
"string"
```



