
<a name="replacemodelprocessingtask"></a>
### Update a model processing task
```
PUT /taskQueues/modelProcessing/tasks/{modelTaskId}
```


#### Description
Perform a full replacement of a model processing task


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS org id of the caller|string|
|**Path**|**modelTaskId**  <br>*required*|The identifier of the model processing task|string (uuid)|


#### Body parameter
Replacement model Task

*Name* : modelTask  
*Flags* : required  
*Type* : [ModelTask](../definitions/ModelTask.md#modeltask)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful operation  <br>**Headers** :   <br>`ETag` (string) : An identifier for a specific version of the resource.  <br>`Last-Modified` (string) : The date and time at which the resource was last modified.  <br>`Cache-Control` (string) : Instructions to clients and web proxies indicating the preferred caching behavior.  <br>`Link` (string) : Indicates a target link and a link relation, contextual to the current resource, that allows clients to discover and navigate the resources via this API.  <br>`Link-Template` (string) : Indicates a target link utilizing URL Templates and a link relation, contextual to the current resource, that allows clients to discover and navigate the resources via this API.|[ModelTask](../definitions/ModelTask.md#modeltask)|
|**400**|Bad request|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**401**|Unauthorized|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**404**|Resource could not be found|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**410**|Resource gone|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**500**|Internal Server Error|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**503**|Service Unavailable|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|


#### Consumes

* `application/vnd.adobe.platform.ml+json;profile=model-task.v1.json`


#### Produces

* `application/vnd.adobe.platform.ml+json;profile=model-task.v1.json`


#### Tags

* Model Tasks


#### Example HTTP request

##### Request path
```
/taskQueues/modelProcessing/tasks/string
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
  "name" : "string",
  "status" : "string",
  "eta" : 0.0,
  "id" : "string",
  "startTime" : 0,
  "type" : "string",
  "created" : "string",
  "updated" : "string",
  "taskLogs" : "string",
  "attributes" : {
    "string" : "string"
  },
  "materializedConfigs" : {
    "string" : "string"
  },
  "createdBy" : "object"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "name" : "string",
  "status" : "string",
  "eta" : 0.0,
  "id" : "string",
  "startTime" : 0,
  "type" : "string",
  "created" : "string",
  "updated" : "string",
  "taskLogs" : "string",
  "attributes" : {
    "string" : "string"
  },
  "materializedConfigs" : {
    "string" : "string"
  },
  "createdBy" : "object"
}
```


##### Response 400
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Name must not be empty",
  "instance" : "https://platform.adobe.io/data/foundation/ml/problem-instances/5a24926a-e346-43e0-a931-de09d1736b16",
  "report" : {
    "exception" : [ {
      "message" : "Name must not be empty",
      "stackTrace" : [ ]
    } ]
  }
}
```


##### Response 401
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/unauthorized",
  "title" : "Unauthorized",
  "status" : 401,
  "detail" : "Authentication must be provided to access this method",
  "instance" : "https://platform.adobe.io/data/foundation/ml/problem-instances/63c4926a-e346-43e0-a931-de09d1736b16",
  "report" : {
    "exception" : [ {
      "message" : "Authentication must be provided to access this method",
      "stackTrace" : [ ]
    } ]
  }
}
```


##### Response 404
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/unknown-resource",
  "title" : "Unknown Resource",
  "status" : 404,
  "detail" : "Model could not be found",
  "instance" : "https://platform.adobe.io/data/foundation/ml/problem-instances/925a246a-e346-43e0-a931-de09d1736b16",
  "report" : {
    "exception" : [ {
      "message" : "Model could not be found",
      "stackTrace" : [ ]
    } ]
  }
}
```


##### Response 410
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/resource-gone",
  "title" : "Resource Gone",
  "status" : 410,
  "detail" : "Model has been previously deleted",
  "instance" : "https://platform.adobe.io/data/foundation/ml/problem-instances/a931926a-e346-43e0-5a24-de09d1736b16",
  "report" : {
    "exception" : [ {
      "message" : "Model has been previously deleted",
      "stackTrace" : [ ]
    } ]
  }
}
```


##### Response 500
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/internal-server-error",
  "title" : "Internal Server Error",
  "status" : 500,
  "detail" : "Database connection failed",
  "instance" : "https://platform.adobe.io/data/foundation/ml/problem-instances/c0c19a1d-3bb8-4a92-a5f7-08909076500b",
  "report" : {
    "exception" : [ {
      "message" : "Database connection failed",
      "stackTrace" : [ ]
    } ]
  }
}
```


##### Response 503
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/service-unavailable",
  "title" : "Service Unavailable",
  "status" : 500,
  "detail" : "Service is currently not responding. Please try again later.",
  "instance" : "https://platform.adobe.io/data/foundation/ml/problem-instances/c0c19a1d-3bb8-4a92-a5f7-08909076500b",
  "report" : {
    "exception" : [ {
      "message" : "Service is currently not responding. Please try again later.",
      "stackTrace" : [ ]
    } ]
  }
}
```



