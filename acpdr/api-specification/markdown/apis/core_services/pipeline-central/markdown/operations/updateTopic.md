
<a name="updatetopic"></a>
### Update topic metadata
```
PATCH /pipeline/topics/{topicGuid}
```


#### Description
Update the topic with the new metadata. This doesn't make changes to the actual topic in Kafka (for now).


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Header**|**Authorization**  <br>*required*|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|string|
|**Path**|**topicGuid**  <br>*required*|string|


#### Body parameter
Topic object with fields that needs to be updated to the store

*Name* : body  
*Flags* : required  
*Type* : [UpdateTopicRequest](../definitions/UpdateTopicRequest.md#updatetopicrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK - Update successful|[TopicResponse](../definitions/TopicResponse.md#topicresponse)|
|**400**|Unable to process the input request. Please verify the input.|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|
|**403**|Forbidden|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|
|**404**|Not Found|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|
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
/pipeline/topics/string
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
  "flexibleRouterHandlerParam" : {
    "key" : "flexibleRouterHandlerParam"
  },
  "flexibleRouter" : "flexibleRouter",
  "createdBy" : "createdBy",
  "description" : "description",
  "ownerSolution" : "ownerSolution",
  "status" : "CREATED"
}
```


#### Example HTTP response

##### Response 200
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


##### Response 404
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



