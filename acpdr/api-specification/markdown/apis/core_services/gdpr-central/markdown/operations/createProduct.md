
<a name="createproduct"></a>
### Add product to product master for GDPR central service
```
POST /data/privacy/gdpr/products
```


#### Description
Returns added product json with status


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
Product details which needs to be added

*Name* : body  
*Flags* : required  
*Type* : [Product](../definitions/Product.md#product)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful creation of product|[Product](../definitions/Product.md#product)|
|**400**|Product already exists in the system & can not be added|No Content|
|**417**|Expectation Failed!! Validation failed|No Content|
|**500**|Internal server error|No Content|
|**503**|Exception Occurred!!|No Content|


#### Tags

* GDPR Admin product management service


#### Example HTTP request

##### Request path
```
/data/privacy/gdpr/products
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



