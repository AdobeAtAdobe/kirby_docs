
<a name="returns-all-subscription-quotas"></a>
### Returns a list of Subscription Quotas
```
GET /admin/subscriptionsMgmt/quota
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|< [Subscription Response Quota Model](../definitions/Subscription_Response_Quota_Model.md#subscription-response-quota-model) > array|
|**400**|Unable to process the request|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/subscriptionsMgmt/quota
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
[ {
  "imsClient" : "string",
  "allocatedSubscriptions" : 0,
  "unallocatedSubscriptions" : 0
} ]
```



