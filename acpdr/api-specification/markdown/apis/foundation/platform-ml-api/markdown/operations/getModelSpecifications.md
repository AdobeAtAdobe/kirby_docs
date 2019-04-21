
<a name="getmodelspecifications"></a>
### List all model specifications
```
GET /modelSpecifications
```


#### Description
Lists all model specifications providing mechanisms for pagination, filtering, and sorting. The default sort order is descending upon the creation date-time (equivalent to "orderby=-created").


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS org id of the caller|string||
|**Query**|**limit**  <br>*optional*|Limit value for pagination. Indicates the requested number of items to return. The service may return a different number of items than requested.|integer (int32)|`25`|
|**Query**|**orderby**  <br>*optional*|Sort order for pagination. Indicates the fields and direction to use for sorting in priority order.|< string > array(csv)||
|**Query**|**property**  <br>*optional*|Property matching expression for filtering paginated results. Indicates the comparision  expression that items must match in order to be returned.|< string > array(csv)||
|**Query**|**start**  <br>*optional*|Start value for pagination. Indicates the starting index for the items to return.|string||


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful operation  <br>**Headers** :   <br>`Link` (string) : Indicates a target link and a link relation, contextual to the current resource, that allows clients to  discover and navigate the resources via this API.  <br>`Link-Template` (string) : Indicates a target link utilizing URL Templates and a link relation, contextual to the current resource,  that allows clients to discover and navigate the resources via this API.|[ModelSpecificationListing](../definitions/ModelSpecificationListing.md#modelspecificationlisting)|
|**400**|Bad request|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**401**|Unauthorized|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**500**|Internal Server Error|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|
|**503**|Service Unavailable|[MachineLearningApiResponse](../definitions/MachineLearningApiResponse.md#machinelearningapiresponse)|


#### Produces

* `application/vnd.adobe.platform.ml+json;profile=model-specification-listing.v1.json`


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


##### Request query
```
json :
{
  "limit" : 0,
  "orderby" : "string",
  "property" : "string",
  "start" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "application/vnd.adobe.platform.ml+json;profile=model-specification-listing.v1.json" : {
    "children" : [ {
      "id" : "9fc1ceb0-95d0-47c3-a02a-ad6de4df1690",
      "name" : "Multi-Channel Attribution",
      "description" : "Multi-Channel attribution Model for attributing conversion across web, email, and social channels",
      "created" : "2017-06-24T10:11:21.432Z",
      "updated" : "2017-07-21T20:43:04.432Z"
    }, {
      "id" : "b09fc1ce-a02a-47c3-95d0-ad6de4df1690",
      "name" : "Tweet Sentiment",
      "description" : "An experimental sentiment analysis model using the well-established ANEW NLP lexicon for english language tweets",
      "created" : "2016-04-24T11:10:21.432Z",
      "updated" : "2017-01-21T17:43:04.432Z"
    } ],
    "_page" : {
      "orderby" : "-created",
      "start" : 0,
      "count" : 2,
      "next" : "c1ceb09f-a02a-47c3-95d0-ad6de4df1690"
    },
    "_links" : {
      "self" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelSpecifications"
      },
      "next" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelSpecifications?orderby=-created&start=c1ceb09f-a02a-47c3-95d0-ad6de4df1690"
      },
      "page" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelSpecifications{?orderby,limit,start,property,type}",
        "templated" : true
      },
      "create-model-specification" : {
        "href" : "https://platform.adobe.io/data/foundation/ml/modelSpecifications",
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



