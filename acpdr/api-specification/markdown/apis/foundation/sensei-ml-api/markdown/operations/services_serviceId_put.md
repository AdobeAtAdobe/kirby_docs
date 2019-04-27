
<a name="services-serviceid-put"></a>
### Update a Service by id
```
PUT /services/{serviceId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS org id of the caller|string|
|**Path**|**serviceId**  <br>*required*|The identifier of the Sensei Service|string|


#### Body parameter
Service object to be updated

*Name* : service  
*Flags* : required  
*Type* : [Service](../definitions/Service.md#service)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Returns the Service object|[Service](../definitions/Service.md#service)|
|**400**|Bad request|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**401**|Unauthorized|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**403**|Forbidden|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**404**|Resource could not be found|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**406**|Unacceptable|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**500**|Internal Server Error|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**502**|Bad Gateway|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**503**|Service Unavailable|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**504**|Gateway Timeout|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|


#### Consumes

* `application/vnd.adobe.platform.sensei+json;profile=service.v1.json`


#### Produces

* `application/vnd.adobe.platform.sensei+json;profile=service.v1.json`


#### Tags

* Service (Not Supported)


#### Example HTTP request

##### Request path
```
/services/string
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
  "id" : "string",
  "mlInstanceId" : "string",
  "modelId" : "string",
  "description" : "string",
  "created" : "string",
  "createdBy" : "object",
  "updated" : "string",
  "_links" : "object",
  "mlInstanceSpec" : "object",
  "tags" : {
    "string" : "string"
  }
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : "string",
  "mlInstanceId" : "string",
  "modelId" : "string",
  "description" : "string",
  "created" : "string",
  "createdBy" : "object",
  "updated" : "string",
  "_links" : "object",
  "mlInstanceSpec" : "object",
  "tags" : {
    "string" : "string"
  }
}
```


##### Response 400
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 401
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 403
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 404
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 406
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 500
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 502
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 503
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 504
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```



