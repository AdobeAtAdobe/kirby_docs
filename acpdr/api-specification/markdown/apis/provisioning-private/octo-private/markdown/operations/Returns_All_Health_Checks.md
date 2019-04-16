
<a name="returns-all-health-checks"></a>
### Returns a list of Health Checks
```
GET /admin/healthCheck
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
|**200**|Success|< [IMS Service Response Model](../definitions/IMS_Service_Response_Model.md#ims-service-response-model) > array|
|**400**|Unable to process the request|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/healthCheck
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
  "id" : 0,
  "serviceName" : "string",
  "status" : "string",
  "scope" : "string",
  "timeCreated" : 0,
  "timeUpdated" : 0
} ]
```



