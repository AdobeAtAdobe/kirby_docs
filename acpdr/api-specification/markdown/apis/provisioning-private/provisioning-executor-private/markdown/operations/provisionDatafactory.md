
<a name="provisiondatafactory"></a>
### Creates Data Factory
```
POST /execute/provision/datafactory
```


#### Description
Creates Data Factory


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ProvisioningResponse](../definitions/ProvisioningResponse.md#provisioningresponse)|
|**500**|Datafactory couldnt be created|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Produces

* `application/json`


#### Tags

* provision


#### Example HTTP request

##### Request path
```
/execute/provision/datafactory
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



