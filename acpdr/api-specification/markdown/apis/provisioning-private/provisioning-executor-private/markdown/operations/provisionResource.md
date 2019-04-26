
<a name="provisionresource"></a>
### Creates an Azure Resource
```
POST /execute/provision
```


#### Description
Creates an Azure Resource


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ProvisioningResponse](../definitions/ProvisioningResponse.md#provisioningresponse)|
|**500**|Azure resources couldnt be created|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* provision


#### Example HTTP request

##### Request path
```
/execute/provision
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



