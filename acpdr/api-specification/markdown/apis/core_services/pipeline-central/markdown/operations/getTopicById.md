
<a name="gettopicbyid"></a>
### Fetch topic for the given id
```
GET /pipeline/topics/{topicGuid}
```


#### Description
Fetch topic for the given id


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Header**|**Authorization**  <br>*required*|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|string|
|**Path**|**topicGuid**  <br>*required*|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK - Returns the topic with the given id|< [TopicResponse](../definitions/TopicResponse.md#topicresponse) > array|
|**404**|Topic Not found|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|
|**500**|Internal Server Error|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|


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


#### Example HTTP response

##### Response 200
```
json :
[ {
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
} ]
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



