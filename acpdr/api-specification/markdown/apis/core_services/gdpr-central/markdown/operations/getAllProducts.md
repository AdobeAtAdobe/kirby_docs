
<a name="getallproducts"></a>
### Returns details of all products
```
GET /data/privacy/gdpr/products
```


#### Description
Returns a complete list of all products with details.


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful retrieval of all product detail|[Product](../definitions/Product.md#product)|
|**404**|No Products found in the system|No Content|
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



