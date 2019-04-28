
<a name="deletemodeltask"></a>
### Delete a model task
```
DELETE /taskQueues/modelProcessing/tasks/{modelTaskId}
```


#### Description
Deletes a model task


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS org id of the caller|string|
|**Path**|**modelTaskId**  <br>*required*|The identifier of the model processing task|string (uuid)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**204**|Successful operation|No Content|
|**400**|Bad request|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**401**|Unauthorized|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**404**|Resource could not be found|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**410**|Resource gone|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**500**|Internal Server Error|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**503**|Service Unavailable|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|


#### Produces

* `application/vnd.adobe.platform.ml+json;profile=api-response.v1.json`


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


#### Example HTTP response

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



