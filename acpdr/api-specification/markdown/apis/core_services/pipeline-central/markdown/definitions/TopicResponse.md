
<a name="topicresponse"></a>
### TopicResponse

|Name|Description|Schema|
|---|---|---|
|**allowedMessageSize**  <br>*optional*|**Example** : `0`|integer (int64)|
|**burrowEndpoint**  <br>*optional*|**Example** : `"string"`|string|
|**createdBy**  <br>*optional*|**Example** : `"string"`|string|
|**createdDate**  <br>*optional*|**Example** : `"string"`|string (date-time)|
|**deliveryReliability**  <br>*optional*|Delivery reliability set to the topic  <br>**Example** : `"string"`|enum (EXTREME, HIGH, MEDIUM, LOW)|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**environment**  <br>*optional*|Environment  <br>**Example** : `"string"`|enum (DEV, QE, INT, STG, PROD)|
|**expiryTimestamp**  <br>*optional*|**Example** : `0`|integer (int64)|
|**flexibleRouter**  <br>*optional*|**Example** : `"string"`|string|
|**flexibleRouterHandlerParam**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**httpEndPoint**  <br>*optional*|pipeline http service endpoint to produce and consume messages from the topic  <br>**Example** : `"string"`|string|
|**kafkaBrokers**  <br>*optional*|Kafka broker hosts for direct topic access  <br>**Example** : `[ "string" ]`|< string > array|
|**kafkaTopicConfig**  <br>*optional*|**Example** : `[ "[topicresponse_kafkatopicconfig](#topicresponse_kafkatopicconfig)" ]`|< [TopicResponse_kafkaTopicConfig](TopicResponse_kafkaTopicConfig.md#topicresponse_kafkatopicconfig) > array|
|**location**  <br>*optional*|Location - Data center where the topic is in  <br>**Example** : `"string"`|enum (OR1, VA5, VA6, LON5, HK2, DA2, SIN2, AMS1, VA7)|
|**maxThroughput**  <br>*optional*|**Example** : `0`|integer (int64)|
|**modifiedBy**  <br>*optional*|**Example** : `"string"`|string|
|**modifiedDate**  <br>*optional*|**Example** : `"string"`|string (date-time)|
|**ownerSolution**  <br>*optional*|**Example** : `"string"`|string|
|**partitions**  <br>*optional*|**Example** : `0`|integer (int32)|
|**replicas**  <br>*optional*|**Example** : `0`|integer (int32)|
|**status**  <br>*optional*|Status of the topic  <br>**Example** : `"string"`|enum (CREATED, ACTIVE, DELETED)|
|**topicGuid**  <br>*optional*|**Example** : `"string"`|string|
|**topicName**  <br>*optional*|**Example** : `"string"`|string|
|**topology**  <br>*optional*|Topic Topology  <br>**Example** : `"string"`|enum (LOCAL, ROUTED, BROADCAST)|
|**zookeeperChRoot**  <br>*optional*|Root path for the zookeeper  <br>**Example** : `"string"`|string|
|**zookeeperHosts**  <br>*optional*|Zookeeper hosts for direct topic access  <br>**Example** : `[ "string" ]`|< string > array|



