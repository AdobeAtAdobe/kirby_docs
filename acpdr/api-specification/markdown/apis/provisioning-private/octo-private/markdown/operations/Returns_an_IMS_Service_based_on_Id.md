
<a name="returns-an-ims-service-based-on-id"></a>
### Returns an IMS Services based on id
```
GET /admin/imsService/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**id**  <br>*required*|IMS Service Id|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|[IMS Service Response Model](../definitions/IMS_Service_Response_Model.md#ims-service-response-model)|
|**400**|Unable to process the request|No Content|
|**404**|IMS Service Not Found|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/imsService/0
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
  "imsClient" : "string",
  "type" : "string",
  "url" : "string",
  "environment" : "string",
  "status" : "string",
  "timeCreated" : 0,
  "timeUpdated" : 0
}
```



