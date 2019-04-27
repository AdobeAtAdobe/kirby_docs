
<a name="createtopic"></a>
### Create topic
```
POST /pipeline/topics
```


#### Description
Create a topic with the given specifications on Pipeline


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Header**|**Authorization**  <br>*required*|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|string|


#### Body parameter
TopicRequest object

*Name* : body  
*Flags* : required  
*Type* : [CreateTopicRequest](../definitions/CreateTopicRequest.md#createtopicrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|OK - topic is created|[TopicResponse](../definitions/TopicResponse.md#topicresponse)|
|**400**|Unable to process the input request. Please verify the input.|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|
|**403**|Forbidden|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|
|**409**|Conflict. Topic already exists.|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|
|**500**|Internal Server error. Please check logs for details.|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Pipeline Topic Management


#### Example HTTP request

##### Request path
```
/pipeline/topics
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
  "partitions" : 1,
  "flexibleRouterHandlerParam" : {
    "key" : "flexibleRouterHandlerParam"
  },
  "flexibleRouter" : "flexibleRouter",
  "topicConfig" : {
    "deliveryReliability" : "EXTREME",
    "topology" : "LOCAL",
    "allowedMessageSize" : 0,
    "maxThroughput" : 6
  },
  "kafkaTopicConfig" : [ {
    "name" : "name",
    "value" : "value"
  }, {
    "name" : "name",
    "value" : "value"
  } ],
  "name" : "name",
  "description" : "description",
  "location" : "OR1",
  "ownerSolution" : "ownerSolution"
}
```


#### Example HTTP response

##### Response 201
```
json :
{
  "description" : "description",
  "allowedMessageSize" : 0,
  "flexibleRouterHandlerParam" : {
    "key" : "flexibleRouterHandlerParam"
  },
  "zookeeperChRoot" : "zookeeperChRoot",
  "deliveryReliability" : "EXTREME",
  "modifiedBy" : "modifiedBy",
  "partitions" : 1,
  "flexibleRouter" : "flexibleRouter",
  "expiryTimestamp" : 5,
  "kafkaTopicConfig" : [ {
    "name" : "name",
    "value" : "value"
  }, {
    "name" : "name",
    "value" : "value"
  } ],
  "topology" : "LOCAL",
  "replicas" : 5,
  "ownerSolution" : "ownerSolution",
  "environment" : "DEV",
  "createdDate" : "2000-01-23T04:56:07.000+00:00",
  "burrowEndpoint" : "burrowEndpoint",
  "createdBy" : "createdBy",
  "topicGuid" : "topicGuid",
  "modifiedDate" : "2000-01-23T04:56:07.000+00:00",
  "topicName" : "topicName",
  "location" : "OR1",
  "zookeeperHosts" : [ "zookeeperHosts", "zookeeperHosts" ],
  "kafkaBrokers" : [ "kafkaBrokers", "kafkaBrokers" ],
  "maxThroughput" : 6,
  "httpEndPoint" : "httpEndPoint",
  "status" : "CREATED"
}
```


##### Response 400
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "report" : {
    "message" : "string"
  }
}
```


##### Response 403
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "report" : {
    "message" : "string"
  }
}
```


##### Response 409
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "report" : {
    "message" : "string"
  }
}
```


##### Response 500
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "report" : {
    "message" : "string"
  }
}
```



