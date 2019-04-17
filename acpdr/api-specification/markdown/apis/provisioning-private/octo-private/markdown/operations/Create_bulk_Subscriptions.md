
<a name="create-bulk-subscriptions"></a>
### Creates Subscriptions in bulk
```
POST /admin/subscriptionsMgmt/bulk
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
*Type* : [Subscription Bulk Request Model](../definitions/Subscription_Bulk_Request_Model.md#subscription-bulk-request-model)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Success|< [Subscription Response Model](../definitions/Subscription_Response_Model.md#subscription-response-model) > array|
|**400**|Unable to process the request|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/subscriptionsMgmt/bulk
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
  "subscriptions" : [ {
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
  } ]
}
```


#### Example HTTP response

##### Response 201
```
json :
[ {
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
} ]
```



