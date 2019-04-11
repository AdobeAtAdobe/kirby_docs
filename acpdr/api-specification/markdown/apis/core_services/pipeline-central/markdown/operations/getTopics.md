
<a name="gettopics"></a>
### Query topics
```
GET /pipeline/topics
```


#### Description
Search for topics with the given parameters


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*required*||string|
|**Header**|**x-gw-ims-org-id**  <br>*required*||string|
|**Query**|**location**  <br>*optional*|Supports a comma separated list of locations - OR1, VA5, VA6, LON5, HK2, DA2, SIN2, AMS1, VA7|string|
|**Query**|**name**  <br>*optional*||string|
|**Query**|**owner**  <br>*optional*||string|
|**Query**|**topology**  <br>*optional*|Supports a comma separated list of topology values - LOCAL, BROADCAST, ROUTED|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK - topic(s) are fetched that match the criteria|< [TopicResponse](../definitions/TopicResponse.md#topicresponse) > array|
|**400**|Unable to process the input request. Please verify the input.|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|
|**403**|Forbidden|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|
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


##### Request query
```
json :
{
  "location" : "string",
  "name" : "string",
  "owner" : "string",
  "topology" : "string"
}
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



