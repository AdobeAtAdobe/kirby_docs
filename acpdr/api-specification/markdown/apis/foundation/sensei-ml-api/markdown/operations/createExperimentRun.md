
<a name="createexperimentrun"></a>
### Run an experiment with parameter values
```
POST /experiments/{experimentId}/runs
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|IMS User token or Service token of the caller|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS org id of the caller|string|
|**Path**|**experimentId**  <br>*required*|The identifier of the experiment|string|


#### Body parameter
Run object that needs to be added

*Name* : Run  
*Flags* : required  
*Type* : [ExperimentRun](../definitions/ExperimentRun.md#experimentrun)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Creation successful  <br>**Headers** :   <br>`Location` (string) : URL indicating the location of the created ExperimentRun resource.|[ExperimentRun](../definitions/ExperimentRun.md#experimentrun)|
|**400**|Bad request|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**401**|Unauthorized|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**403**|Forbidden|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**406**|Unacceptable|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**415**|Unsupported media type|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**422**|Unprocessable input|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**500**|Internal Server Error|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**502**|Bad Gateway|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**503**|Service Unavailable|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**504**|Gateway Timeout|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|


#### Consumes

* `application/vnd.adobe.platform.sensei+json;profile=experimentRun.v1.json`


#### Produces

* `application/vnd.adobe.platform.sensei+json;profile=experimentRun.v1.json`


#### Tags

* Experiment


#### Example HTTP request

##### Request path
```
/experiments/string/runs
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
  "mode" : "string",
  "description" : "string",
  "experimentId" : "string",
  "created" : "string",
  "createdBy" : "object",
  "updated" : "string",
  "deleted" : true,
  "_links" : "object",
  "tasks" : { },
  "runChain" : "object"
}
```


#### Example HTTP response

##### Response 201
```
json :
{
  "id" : "string",
  "mode" : "string",
  "description" : "string",
  "experimentId" : "string",
  "created" : "string",
  "createdBy" : "object",
  "updated" : "string",
  "deleted" : true,
  "_links" : "object",
  "tasks" : { },
  "runChain" : "object"
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


##### Response 415
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


##### Response 422
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



