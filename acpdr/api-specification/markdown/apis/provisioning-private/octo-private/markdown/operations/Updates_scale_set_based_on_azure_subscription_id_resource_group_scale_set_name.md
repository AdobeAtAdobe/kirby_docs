
<a name="updates-scale-set-based-on-azure-subscription-id-resource-group-scale-set-name"></a>
### Updates Azure scale sets capacity
```
PUT /scaleSets
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|


#### Body parameter
*Name* : payload  
*Flags* : required  
*Type* : [Scale sets Request Model](../definitions/Scale_sets_Request_Model.md#scale-sets-request-model)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|[Scale sets modify response model](../definitions/Scale_sets_modify_response_model.md#scale-sets-modify-response-model)|
|**400**|Unable to process the request|No Content|
|**404**|Scale Set Not Found|No Content|


#### Tags

* octo


#### Example HTTP request

##### Request path
```
/scaleSets
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
  "jobName" : "string",
  "subscriptionId" : "string",
  "resourceGroupName" : "string",
  "scaleSetName" : "string",
  "newSize" : 0
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "jobId" : 0
}
```



