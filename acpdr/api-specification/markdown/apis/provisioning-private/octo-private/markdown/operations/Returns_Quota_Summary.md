
<a name="returns-quota-summary"></a>
### Returns a Summary of Subscription Quotas
```
GET /admin/subscriptionsMgmt/quotas/summary
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
|**200**|Success|[Subscription Response Quota Summary Model](../definitions/Subscription_Response_Quota_Summary_Model.md#subscription-response-quota-summary-model)|
|**400**|Unable to process the request|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/subscriptionsMgmt/quotas/summary
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
  "totalSubscriptions" : 0,
  "totalAllocatedSubscriptions" : 0,
  "totalUnallocatedSubscriptions" : 0
}
```



