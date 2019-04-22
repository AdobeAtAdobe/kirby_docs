
<a name="deletes-a-subscription-based-on-id"></a>
### Deletes a Subscription based on Subscription Id
```
DELETE /admin/subscriptionsMgmt/{sub_id}
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
|**204**|Deletes a Subscription|No Content|
|**400**|Unable to process the request|No Content|
|**404**|Subscription Not Found|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/subscriptionsMgmt/string
```


##### Request header
```
json :
"string"
```



