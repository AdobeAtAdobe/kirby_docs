
<a name="returns-a-health-check-based-on-id"></a>
### Returns a Health Check based on id
```
GET /admin/healthCheck/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**id**  <br>*required*|Health Check Id|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|[IMS Service Response Model](../definitions/IMS_Service_Response_Model.md#ims-service-response-model)|
|**400**|Unable to process the request|No Content|
|**404**|Health Check Not Found|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/healthCheck/0
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
  "serviceName" : "string",
  "status" : "string",
  "scope" : "string",
  "timeCreated" : 0,
  "timeUpdated" : 0
}
```



