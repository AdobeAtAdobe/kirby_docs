
<a name="getdiscoveryresource"></a>
### Returns a single resource given an Azure resource id
```
GET /discovery/resource
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**id**  <br>*required*|lookup by resource id|string|
|**Query**|**imsorgonly**  <br>*optional*|Only lookup imsOrgId and not the other resource properties such as tags. Request should be faster when this parameter is set to true because there's not need to call Azure to lookup the resource properties.|boolean|
|**Query**|**nocache**  <br>*optional*|do not use cached values|boolean|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation<br>A list containing just 1 resource|[DiscoveryResponse](../definitions/DiscoveryResponse.md#discoveryresponse)|
|**400**|Bad Rquest<br>messages:<br>* "Missing required query parameter id."<br>* "No IMS Org Id found for subscription [subscription id]"|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**404**|Not Found<br>messages:<br>* "Resource not found: [id]"|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Produces

* `application/json`


#### Tags

* Resource Discovery


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[IMS Service Token](security.md#ims-service-token)**|


#### Example HTTP request

##### Request path
```
/discovery/resource
```


##### Request query
```
json :
{
  "id" : "string",
  "imsorgonly" : true,
  "nocache" : true
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : "string",
  "name" : "string",
  "location" : "string",
  "type" : "string",
  "resourceGroupName" : "string",
  "subscriptionId" : "string",
  "tenantId" : "string",
  "imsOrgId" : "string",
  "tags" : {
    "string" : "string"
  },
  "errorMessage" : "string",
  "clientId" : "string",
  "clientKey" : "string",
  "properties" : {
    "string" : "object"
  },
  "sasToken" : "string"
}
```


##### Response 400
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 404
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```



