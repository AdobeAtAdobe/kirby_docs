
<a name="updates-a-subscription-based-on-id"></a>
### Updates a Subscription based on Subscription Id
```
PUT /subscriptionsMgmt/{sub_id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**sub_id**  <br>*required*|Azure Subscription Id|string|


#### Body parameter
*Name* : payload  
*Flags* : required  
*Type* : [Subscription Request Model](../definitions/Subscription_Request_Model.md#subscription-request-model)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|[Subscription Response Model](../definitions/Subscription_Response_Model.md#subscription-response-model)|
|**400**|Unable to process the request|No Content|
|**404**|Subscription Not Found|No Content|


#### Tags

* octo


#### Example HTTP request

##### Request path
```
/subscriptionsMgmt/string
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
  "subscriptionId" : "string",
  "subscriptionName" : "string",
  "description" : "string",
  "klamAccount" : "string",
  "klamGroups" : "string",
  "costCenter" : "string",
  "costType" : "string",
  "imsClient" : "string",
  "allocation" : "string",
  "status" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : 0,
  "subscriptionId" : "string",
  "subscriptionName" : "string",
  "description" : "string",
  "klamAccount" : "string",
  "klamGroups" : "string",
  "costCenter" : "string",
  "costType" : "string",
  "imsClient" : "string",
  "allocation" : "string",
  "status" : "string",
  "timeCreated" : 0,
  "timeUpdated" : 0
}
```



