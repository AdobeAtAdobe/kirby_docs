
<a name="provisionpipeline"></a>
### Creates Data Factory Pipeline
```
POST /execute/provision/pipeline
```


#### Description
Creates Data Factory Pipeline


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ProvisioningResponse](../definitions/ProvisioningResponse.md#provisioningresponse)|
|**500**|Pipeline couldn't be created|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Produces

* `application/json`


#### Tags

* provision


#### Example HTTP request

##### Request path
```
/execute/provision/pipeline
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



