
<a name="get_subscription"></a>
### Returns a single subscription
```
GET /subscriptionsMgmt/{sub_id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**sub_id**  <br>*required*|Azure Subscription Id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|[Subscription Response Model](../definitions/Subscription_Response_Model.md#subscription-response-model)|
|**400**|Subscription id lookup failed|No Content|
|**403**|Failed authentication|No Content|
|**404**|Subscription id was not found|No Content|


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



