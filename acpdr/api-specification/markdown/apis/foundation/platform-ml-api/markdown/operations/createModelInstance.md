
<a name="createmodelinstance"></a>
### Create a new model instance
```
POST /modelInstances
```


#### Description
Creates a new model instance


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS org id of the caller|string|
|**FormData**|**configuration**  <br>*optional*|Configuration for the model instance|file|
|**FormData**|**modelInstance**  <br>*required*|Model instance object that needs to be added|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Creation successful  <br>**Headers** :   <br>`Location` (string) : URL indicating the location of the created model instance resource.  <br>`Link` (string) : Indicates a target link and a link relation, contextual to the current resource, that allows clients to  discover and navigate the resources via this API.  <br>`Link-Template` (string) : Indicates a target link utilizing URL Templates and a link relation, contextual to the current resource,  that allows clients to discover and navigate the resources via this API.|[ModelInstance](../definitions/ModelInstance.md#modelinstance)|
|**400**|Bad request|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**401**|Unauthorized|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**415**|Unsupported media type|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**422**|Unprocessable input|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
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
/modelInstances
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

##### Response 201
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


##### Response 415
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/invalid-format",
  "title" : "Invalid Format",
  "status" : 415,
  "detail" : "The 'text/csv' media type is not acceptable for use as input to this method",
  "instance" : "https://platform.adobe.io/data/foundation/ml/problem-instances/43e0de09-e346-d173-a931-6b165a24926a",
  "report" : {
    "exception" : [ {
      "message" : "The 'text/csv' media type is not acceptable for use as input to this method",
      "stackTrace" : [ ]
    } ]
  }
}
```


##### Response 422
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/invalid-input",
  "title" : "Invalid Input",
  "status" : 422,
  "detail" : "Scheduling parameters are not applicable to real-time scoring",
  "instance" : "https://platform.adobe.io/data/foundation/ml/problem-instances/de09d173-e346-43e0-a931-6b165a24926a",
  "report" : {
    "exception" : [ {
      "message" : "Scheduling parameters are not applicable to real-time scoring",
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



