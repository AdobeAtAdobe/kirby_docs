
<a name="create-ims-service"></a>
### Creates a new IMS Service
```
POST /admin/imsService
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
*Type* : [IMS Service Request Model](../definitions/IMS_Service_Request_Model.md#ims-service-request-model)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Success|[IMS Service Response Model](../definitions/IMS_Service_Response_Model.md#ims-service-response-model)|
|**400**|Unable to process the request|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/imsService
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
  "serviceName" : "string",
  "status" : "string",
  "scope" : "string"
}
```


#### Example HTTP response

##### Response 201
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



