
<a name="createtopicrequest"></a>
### CreateTopicRequest

|Name|Description|Schema|
|---|---|---|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**flexibleRouter**  <br>*optional*|**Example** : `"string"`|string|
|**flexibleRouterHandlerParam**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**kafkaTopicConfig**  <br>*optional*|**Example** : `[ "[topicresponse_kafkatopicconfig](#topicresponse_kafkatopicconfig)" ]`|< [TopicResponse_kafkaTopicConfig](TopicResponse_kafkaTopicConfig.md#topicresponse_kafkatopicconfig) > array|
|**location**  <br>*optional*|Location - Data center where the topic is in  <br>**Example** : `"string"`|enum (OR1, VA5, VA6, LON5, HK2, DA2, SIN2, AMS1, VA7)|
|**name**  <br>*optional*|**Example** : `"string"`|string|
|**ownerSolution**  <br>*optional*|**Example** : `"string"`|string|
|**partitions**  <br>*optional*|**Example** : `0`|integer (int32)|
|**topicConfig**  <br>*optional*|**Example** : `"[topicconfig](#topicconfig)"`|[TopicConfig](TopicConfig.md#topicconfig)|



