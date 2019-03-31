
<a name="provisionresourcegroup"></a>
### Creates an Azure Resource Group
```
POST /execute/provisionResourceGroup
```


#### Description
Creates an Azure Resource Group


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ProvisioningResponse](../definitions/ProvisioningResponse.md#provisioningresponse)|
|**500**|Azure resource group couldnt be created|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Produces

* `application/json`


#### Tags

* provision


#### Example HTTP request

##### Request path
```
/execute/provisionResourceGroup
```


#### Example HTTP response

##### Response 200
```
json :
{
  "message" : "string",
  "status" : 0,
  "connectionString" : "string",
  "errors" : [ "string" ],
  "azureResponse" : "string",
  "pollRequired" : true
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



