
<a name="delete_service_principals_modify"></a>
### Delete Service Principals
```
DELETE /servicePrincipals
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [access token]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|


#### Body parameter
*Name* : payload  
*Flags* : required  
*Type* : [Service Principal Delete Main Model](../definitions/Service_Principal_Delete_Main_Model.md#service-principal-delete-main-model)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**202**|Service principal delete request received.|No Content|
|**400**|Service principal delete bad Request|No Content|
|**403**|Failed authentication|No Content|
|**404**|Service principal not found in Octo DB|No Content|


#### Tags

* octo


#### Example HTTP request

##### Request path
```
/servicePrincipals
```


##### Request header
```
json :
"string"
```


##### Request body
```
json :
{
  "octoPayloadContentVersion" : 0,
  "schema" : "string",
  "subscriptionId" : "string",
  "location" : "string",
  "jobName" : "string",
  "servicePrincipals" : [ {
    "name" : "string",
    "applicationId" : "string"
  } ]
}
```



