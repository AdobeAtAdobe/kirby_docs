
<a name="get_scale_sets_read"></a>
### Returns Azure scale sets capacity
```
GET /subscriptions/{az_subscription_id}/resourceGroups/{az_resource_group_name}/scaleSets/{az_scale_set_name}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**az_resource_group_name**  <br>*required*||string|
|**Path**|**az_scale_set_name**  <br>*required*||string|
|**Path**|**az_subscription_id**  <br>*required*|Azure subscription ID|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Scale set capacity returned|[Scale sets response model](../definitions/Scale_sets_response_model.md#scale-sets-response-model)|
|**400**|Scale set lookup failed|No Content|
|**403**|Failed authentication|No Content|
|**404**|Scale Set Not Found|No Content|


#### Tags

* octo


#### Example HTTP request

##### Request path
```
/subscriptions/string/resourceGroups/string/scaleSets/string
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
  "subscriptionId" : "string",
  "resourceGroupName" : "string",
  "scaleSetName" : "string",
  "size" : 0,
  "status" : "string"
}
```



