
<a name="getdiscoveryresource"></a>
### Returns a single resource given an Azure resource id
```
GET /discovery/resource
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**id**  <br>*required*|lookup by resource id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation<br>A list containing just 1 resource|< [DiscoveryResponse](../definitions/DiscoveryResponse.md#discoveryresponse) > array|
|**400**|Bad Rquest<br>messages:<br>* "Missing required query parameter id."<br>* "No IMS Org Id found for subscription [subscription id]"|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**404**|Not Found<br>messages:<br>* "Resource not found: [id]"|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**500**|Internal Server Error<br>messages:<br>* "Can't obtain access token"|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Produces

* `application/json`


#### Tags

* Resource Discovery


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[X-API-Key](security.md#x-api-key)**|
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
  "id" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
[ {
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
} ]
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


##### Response 500
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```



