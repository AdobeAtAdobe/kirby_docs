
<a name="deleteresourcegroup"></a>
### Deletes a ResourceGroup
```
DELETE /execute/delete/{resourceGroupName}
```


#### Description
Deletes a ResourceGroup


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Path**|**resourceGroupName**  <br>*required*|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ProvisioningResponse](../definitions/ProvisioningResponse.md#provisioningresponse)|
|**500**|ResourceGroup not found|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* provision


#### Example HTTP request

##### Request path
```
/execute/delete/string
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



