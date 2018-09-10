
<a name="post_octo_deploy"></a>
### Create and deploy environments
```
POST /jobs
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
*Type* : [Environment Model](../definitions/Environment_Model.md#environment-model)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**202**|Octo deploy API started deployment process|No Content|
|**400**|Octo deploy API failed|No Content|
|**403**|Octo deploy API failed authentication|No Content|


#### Tags

* octo


#### Example HTTP request

##### Request path
```
/jobs
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
  "provider" : "string",
  "environmentName" : "string",
  "defaultTemplateFile" : "string",
  "servicePrincipals" : [ {
    "role" : "string",
    "name" : "string",
    "scopes" : [ "string" ]
  } ],
  "groups" : [ {
    "groupName" : "string",
    "resources" : [ {
      "fileName" : "string",
      "dependsOn" : [ "string" ],
      "defaultTemplateResourceName" : "string",
      "resourceName" : "string",
      "type" : "string",
      "parameters" : "object"
    } ]
  } ],
  "location" : "string",
  "subscriptionId" : "string",
  "region" : "string"
}
```



