
<a name="delete_service_principals_role_assignments"></a>
### Delete Service Principal Role Assignment
```
DELETE /servicePrincipals/{sp_name}/roleAssignments
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
|**202**|Service principal role assignment delete request received.|No Content|
|**400**|Service principal role assignment delete bad Request|No Content|
|**403**|Failed authentication|No Content|
|**404**|Service principal not found in Octo DB|No Content|


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



