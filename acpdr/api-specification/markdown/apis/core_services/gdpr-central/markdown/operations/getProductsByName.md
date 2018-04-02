
<a name="getproductsbyname"></a>
### Returns details of single product based on productName parameter
```
GET /data/privacy/gdpr/products/{productName}
```


#### Description
Returns details of a product.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**productName**  <br>*required*|ProductName to fetch details|string|


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


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful retrieval of product details|[Product](../definitions/Product.md#product)|
|**404**|No Products found in the system|No Content|
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
{ }
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



