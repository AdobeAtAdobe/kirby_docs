
<a name="updateproduct"></a>
### Update product details
```
PUT /data/privacy/gdpr/products/{productName}
```


#### Description
Returns updated product json with status


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**productName**  <br>*required*|productName to update|string|


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : [Product](../definitions/Product.md#product)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful updation of product|[Product](../definitions/Product.md#product)|
|**404**|No product found in the system for update|No Content|
|**417**|Expectation Failed!! Validation failed|No Content|
|**500**|Internal server error|No Content|
|**503**|Exception Occurred!!|No Content|


#### Tags

* GDPR Admin product management service


#### Example HTTP request

##### Request path
```
/data/privacy/gdpr/products/string
```


##### Request body
```
json :
{
  "productId" : 0,
  "productName" : "string",
  "inUse" : true,
  "createdOn" : "string",
  "createdBy" : "string",
  "comments" : "string",
  "responseThreshold" : 0,
  "statusCode" : "string",
  "statusMessage" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "productId" : 0,
  "productName" : "string",
  "inUse" : true,
  "createdOn" : "string",
  "createdBy" : "string",
  "comments" : "string",
  "responseThreshold" : 0,
  "statusCode" : "string",
  "statusMessage" : "string"
}
```



