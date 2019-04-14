
<a name="updatemodelinstance"></a>
### Update an existing model instance
```
PUT /modelInstances/{modelInstanceId}
```


#### Description
Update an existing model instance


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS org id of the caller|string|
|**Path**|**modelInstanceId**  <br>*required*|The identifier of the model instance|string (uuid)|
|**FormData**|**modelInstance**  <br>*optional*|Model instance object that needs to be updated|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Update successful  <br>**Headers** :   <br>`ETag` (string) : An identifier for a specific version of the resource.  <br>`Last-Modified` (string) : The date and time at which the resource was last modified.  <br>`Cache-Control` (string) : Instructions to clients and web proxies indicating the preferred caching behavior.  <br>`Link` (string) : Indicates a target link and a link relation, contextual to the current resource, that allows clients to discover and navigate the resources via this API.  <br>`Link-Template` (string) : Indicates a target link utilizing URL Templates and a link relation, contextual to the current resource, that allows clients to discover and navigate the resources via this API.|[ModelInstance](../definitions/ModelInstance.md#modelinstance)|
|**400**|Bad request|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**401**|Unauthorized|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**404**|Resource could not be found|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**410**|Resource gone|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**500**|Internal Server Error|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**503**|Service Unavailable|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|


#### Consumes

* `multipart/form-data`


#### Produces

* `application/vnd.adobe.platform.ml+json;profile=model-instance.v1.json`


#### Tags

* Model Instances


#### Example HTTP request

##### Request path
```
/modelInstances/string
```


##### Request header
```
json :
"string"
```


##### Request formData
```
json :
"string"
```


#### Example HTTP response

##### Response 200
```
json :
{
  "application/vnd.adobe.platform.ml+json;profile=model-instance.v1.json" : {
    "id" : "826a0112-491a-4900-a0ff-3c96de479f64",
    "name" : "Time-decay - Long",
    "description" : "Time Decay Multi-Channel Attribution model with long half-life",
    "created" : "2017-05-15T19:58:20.000",
    "updated" : "2017-06-12T07:14:16.000Z",
    "content" : {
      "name" : "long-halflife-attribution-config.json",
      "location" : "http://mystorageaccount.blob.core.windows.net/mycontainer/long-halflife-attribution-config"
    },
    "modelSpecificationId" : "9fc1ceb0-95d0-47c3-a02a-ad6de4df1690",
    "_links" : {
      "self" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelInstances/826a0112-491a-4900-a0ff-3c96de479f64"
      },
      "get-model-instance" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelInstances/826a0112-491a-4900-a0ff-3c96de479f64"
      },
      "update-model-instance" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelInstances/826a0112-491a-4900-a0ff-3c96de479f64",
        "method" : "PUT"
      },
      "delete-model-instance" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelInstances/826a0112-491a-4900-a0ff-3c96de479f64",
        "method" : "DELETE"
      },
      "list-trained-models" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/trainedModels?property=modelInstanceId%3D%3D826a0112-491a-4900-a0ff-3c96de479f64"
      },
      "add-trained-model" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/trainedModels",
        "method" : "POST"
      },
      "perform-model-training" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/taskQueues/modelProcessing/tasks",
        "method" : "POST"
      }
    }
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



