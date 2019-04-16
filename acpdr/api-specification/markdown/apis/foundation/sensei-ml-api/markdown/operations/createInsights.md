
<a name="createinsights"></a>
### Add a new model insight
```
POST /insights
```


#### Description
Creates a new model insight


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS org id of the caller|string|


#### Body parameter
Insight object that needs to be added

*Name* : insight  
*Flags* : required  
*Type* : [Insight](../definitions/Insight.md#insight)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Creation successful  <br>**Headers** :   <br>`Location` (string) : URL indicating the location of the created Engine resource.|[Insight](../definitions/Insight.md#insight)|
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

* `application/vnd.adobe.platform.sensei+json;profile=insight.v1.json`


#### Produces

* `application/vnd.adobe.platform.sensei+json;profile=insight.v1.json`


#### Tags

* Insight


#### Example HTTP request

##### Request path
```
/insights
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
  "context" : {
    "clientId" : "string",
    "notebookId" : "string",
    "experimentId" : "string",
    "engineId" : "string",
    "mlInstanceId" : "string",
    "experimentRunId" : "string",
    "modelId" : "string",
    "dataSetId" : "string"
  },
  "events" : {
    "name" : "string",
    "eventValues" : {
      "string" : "string"
    }
  },
  "metrics" : { },
  "created" : "string",
  "updated" : "string",
  "_links" : "object"
}
```


#### Example HTTP response

##### Response 201
```
json :
{
  "id" : "string",
  "context" : {
    "clientId" : "string",
    "notebookId" : "string",
    "experimentId" : "string",
    "engineId" : "string",
    "mlInstanceId" : "string",
    "experimentRunId" : "string",
    "modelId" : "string",
    "dataSetId" : "string"
  },
  "events" : {
    "name" : "string",
    "eventValues" : {
      "string" : "string"
    }
  },
  "metrics" : { },
  "created" : "string",
  "updated" : "string",
  "_links" : "object"
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



