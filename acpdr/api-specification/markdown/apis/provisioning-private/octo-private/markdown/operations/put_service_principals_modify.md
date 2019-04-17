
<a name="put_service_principals_modify"></a>
### Update Service Principals
```
PUT /servicePrincipals
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
*Type* : [Service Principal Update Main Model](../definitions/Service_Principal_Update_Main_Model.md#service-principal-update-main-model)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**202**|Service principal update request received.|No Content|
|**400**|Service principal update bad request|No Content|
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
    "role" : "string",
    "scopes" : [ "string" ]
  } ]
}
```



