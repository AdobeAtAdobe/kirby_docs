
<a name="createmodelspecification"></a>
### Create a new model specification
```
POST /modelSpecifications
```


#### Description
Creates a new model specification


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS org id of the caller|string|
|**FormData**|**config**  <br>*optional*|Default configuration for the model specification|file|
|**FormData**|**modelSpecification**  <br>*optional*|The Model specification object|string|
|**FormData**|**scoringArtifact**  <br>*optional*|The artifact used during model scoring.|file|
|**FormData**|**trainingArtifact**  <br>*optional*|The artifact used during model training.|file|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Creation successful  <br>**Headers** :   <br>`Location` (string) : URL indicating the location of the created model specification resource.  <br>`Link` (string) : Indicates a target link and a link relation, contextual to the current resource, that allows clients to  discover and navigate the resources via this API.  <br>`Link-Template` (string) : Indicates a target link utilizing URL Templates and a link relation, contextual to the current resource,  that allows clients to discover and navigate the resources via this API.|[ModelSpecification](../definitions/ModelSpecification.md#modelspecification)|
|**400**|Bad request|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**401**|Unauthorized|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**415**|Unsupported media type|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**422**|Unprocessable input|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**500**|Internal Server Error|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**503**|Service Unavailable|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|


#### Consumes

* `multipart/form-data`


#### Produces

* `application/vnd.adobe.platform.ml+json;profile=model-specification.v1.json`


#### Tags

* Model Specifications


#### Example HTTP request

##### Request path
```
/modelSpecifications
```


##### Request header
```
json :
"string"
```


##### Request formData
```
json :
"file"
```


#### Example HTTP response

##### Response 201
```
json :
{
  "application/vnd.adobe.platform.ml+json;profile=model-specification.v1.json" : {
    "id" : "9fc1ceb0-95d0-47c3-a02a-ad6de4df1690",
    "name" : "Multi-Channel Attribution",
    "description" : "Multi-Channel attribution Model for attributing conversion across web, email, and social channels",
    "created" : "2017-06-24T10:11:21.432Z",
    "updated" : "2017-07-21T20:43:04.432Z",
    "artifacts" : {
      "training" : {
        "location" : "http://mystorageaccount.blob.core.windows.net/mycontainer/my-training-jar",
        "name" : "my attribution engine"
      },
      "scoring" : {
        "location" : "http://mystorageaccount.blob.core.windows.net/mycontainer/my-scoring-jar",
        "name" : "my attribution engine scorer"
      }
    },
    "_links" : {
      "self" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelSpecifications/9fc1ceb0-95d0-47c3-a02a-ad6de4df1690"
      },
      "get-model-specification" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelSpecifications/9fc1ceb0-95d0-47c3-a02a-ad6de4df1690"
      },
      "update-model-specification" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelSpecifications/9fc1ceb0-95d0-47c3-a02a-ad6de4df1690",
        "method" : "PUT"
      },
      "delete-model-specification" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelSpecifications/9fc1ceb0-95d0-47c3-a02a-ad6de4df1690",
        "method" : "DELETE"
      },
      "list-model-instances" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelInstances?property=modelSpecificationIds%3D%3D9fc1ceb0-95d0-47c3-a02a-ad6de4df1690"
      },
      "add-model-instance" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelInstances",
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



