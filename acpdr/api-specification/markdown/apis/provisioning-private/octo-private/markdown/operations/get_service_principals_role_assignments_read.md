
<a name="get_service_principals_role_assignments_read"></a>
### Returns service principals info
```
GET /servicePrincipals/{sp_name}/roleAssignments/subscription/{az_subscription_id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**az_subscription_id**  <br>*required*|Azure subscription ID|string|
|**Path**|**sp_name**  <br>*required*|Service principal name|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Service principal found|No Content|
|**400**|Service principal lookup failed|No Content|
|**403**|Failed authentication|No Content|
|**404**|Service principal not found in Octo DB|No Content|


#### Tags

* octo


#### Example HTTP request

##### Request path
```
/servicePrincipals/string/roleAssignments/subscription/string
```


##### Request header
```
json :
"string"
```



