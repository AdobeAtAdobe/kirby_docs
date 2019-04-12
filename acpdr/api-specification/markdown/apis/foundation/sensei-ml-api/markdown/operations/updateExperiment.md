
<a name="updateexperiment"></a>
### Update an Experiment using Experiment ID
```
PUT /experiments/{experimentId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS org id of the caller|string|
|**Path**|**experimentId**  <br>*required*|The identifier of the experiment|string|


#### Body parameter
Experiment object to be updated

*Name* : experiment  
*Flags* : required  
*Type* : [Experiment](../definitions/Experiment.md#experiment)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Returns the Experiment object|[Experiment](../definitions/Experiment.md#experiment)|
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

* `application/vnd.adobe.platform.sensei+json;profile=experiment.v1.json`


#### Produces

* `application/vnd.adobe.platform.sensei+json;profile=experiment.v1.json`


#### Tags

* Experiment


#### Example HTTP request

##### Request path
```
/experiments/string
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
  "name" : "string",
  "mlInstanceId" : "string",
  "mlInstanceQuery" : "string",
  "description" : "string",
  "created" : "string",
  "createdBy" : "object",
  "updated" : "string",
  "deleted" : true,
  "workflowId" : "string",
  "_links" : "object",
  "tags" : {
    "string" : "string"
  },
  "template" : {
    "experimentRunId" : "string",
    "tasks" : { },
    "schedule" : "object"
  }
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : "string",
  "name" : "string",
  "mlInstanceId" : "string",
  "mlInstanceQuery" : "string",
  "description" : "string",
  "created" : "string",
  "createdBy" : "object",
  "updated" : "string",
  "deleted" : true,
  "workflowId" : "string",
  "_links" : "object",
  "tags" : {
    "string" : "string"
  },
  "template" : {
    "experimentRunId" : "string",
    "tasks" : { },
    "schedule" : "object"
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



