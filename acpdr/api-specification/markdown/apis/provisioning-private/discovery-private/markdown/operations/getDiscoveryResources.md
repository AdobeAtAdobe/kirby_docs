
<a name="getdiscoveryresources"></a>
### Returns resources given an IMS Org Id
```
GET /discovery/customer/resources
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id <br>e.g. ACPDev1@AdobeOrg|string|
|**Query**|**name**  <br>*optional*|filter by resource name|string|
|**Query**|**tag**  <br>*optional*|filter by tagname/tagvalue. Syntax is tagname:tagvalue.<br>An example of tag query suffix ?tag=adobe.environment:integration. More than 1 tag filter is allowed. For example, ?tag=tagname1:tagvalue1&tag=tagname2:tagvalue2|< string > array(multi)|
|**Query**|**type**  <br>*optional*|filter by resource type <br>provider/type e.g. Microsoft.DataLakeStore/accounts. No type validation check at the moment.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation<br>A list of resources or an empty list if no resources are found.|< [DiscoveryResponse](../definitions/DiscoveryResponse.md#discoveryresponse) > array|
|**400**|Bad Rquest<br>messages:<br>* "No x-gw-ims-org-id header provided"|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**404**|Not Found<br>messages:<br>* "No subscription found for imsOrgId [imsOrgId]"|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
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
/discovery/customer/resources
```


##### Request header
```
json :
"string"
```


##### Request query
```
json :
{
  "name" : "string",
  "tag" : "string",
  "type" : "string"
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



