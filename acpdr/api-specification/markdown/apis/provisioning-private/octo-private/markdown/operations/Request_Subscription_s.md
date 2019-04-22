
<a name="request-subscription-s"></a>
### Request Subscription(s)
```
GET /subscriptionsMgmt/{ims_client}/{count}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**count**  <br>*required*|Subscription Request Count|integer|
|**Path**|**ims_client**  <br>*required*|IMS Client|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|[Subscription Response Model](../definitions/Subscription_Response_Model.md#subscription-response-model)|
|**400**|Unable to process the request|No Content|
|**404**|IMS Client Not Found|No Content|


#### Tags

* octo


#### Example HTTP request

##### Request path
```
/subscriptionsMgmt/string/0
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



