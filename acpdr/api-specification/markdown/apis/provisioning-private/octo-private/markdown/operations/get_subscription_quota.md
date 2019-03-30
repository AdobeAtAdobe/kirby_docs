
<a name="get_subscription_quota"></a>
### Returns subscription quota based on IMS client
```
GET /subscriptionsMgmt/{ims_client}/quota
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**ims_client**  <br>*required*|IMS Client|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|IMS Client found and subscription quota returned|[Subscription Response Quota Model](../definitions/Subscription_Response_Quota_Model.md#subscription-response-quota-model)|
|**400**|IMS Client lookup failed|No Content|
|**403**|Failed authentication|No Content|
|**404**|IMS Client was not found|No Content|


#### Tags

* octo


#### Example HTTP request

##### Request path
```
/subscriptionsMgmt/string/quota
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
  "imsClient" : "string",
  "allocatedSubscriptions" : 0,
  "unallocatedSubscriptions" : 0
}
```



