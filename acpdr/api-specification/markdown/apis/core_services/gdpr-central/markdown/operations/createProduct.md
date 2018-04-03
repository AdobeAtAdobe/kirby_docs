
<a name="createproduct"></a>
### Add product to product master for GDPR central service
```
POST /data/privacy/gdpr/products
```


#### Description
Returns added product json with status


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|Bearer XXXXX|string|
|**Header**|**Content-Type**  <br>*required*|application/json|string|
|**Header**|**x-api-key**  <br>*required*|acp_XXX_XXXX, IMS Client id which is whitelisted and subscribed to consume services on adobe.io|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|XXXXX47E56F59C747FXXXXX@AdobeOrg|string|


#### Body parameter
Product details for creating record

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

* GDPR Product Management CRUD API


#### Example HTTP request

##### Request path
```
/data/privacy/gdpr/products
```


##### Request header
```
json :
"string"
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



