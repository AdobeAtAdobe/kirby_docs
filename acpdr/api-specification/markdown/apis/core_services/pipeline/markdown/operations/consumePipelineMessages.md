
<a name="consumepipelinemessages"></a>
### Consume Messages from Pipeline
```
GET /pipeline/topics/{topicName}/messages
```


#### Description
This API is used by message consumers to ingest messages from a specific topic.


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Accept**  <br>*optional*||enum (x-protobuf, application/json)|`"x-protobuf"`|
|**Header**|**Authorization**  <br>*required*|Must be in the following format 'Bearer $TOKEN', Where $TOKEN is either an IMS Service Token (used for authenticating consumer service) or an IMS Gateway Token (used for authenticating IMS Org)|string||
|**Path**|**topicName**  <br>*required*||string||
|**Query**|**assign**  <br>*optional*|Let's you specify exactly which partitions of a topic to consume. When this parameter is used, there is no automated balancing or rebalancing of partitions. In other words, clients are responsible for making sure that all partitions for a given topic are being consumed. This option is most useful when offsets are stored outside of pipeline. Specified as <partition>:<offset>,<partition>:<offset>,...|string||
|**Query**|**debug**  <br>*optional*|Applicable only when consuming from protobuf-based topics. Set to true to have the consumer API deserialize the protobuf messages for you and return user-friendly text/plain messages. Clients should not attempt to parse these messages programmatically as the format is arbitrary. However, you can and should use this option with tools like 'curl' as a quick way to inspect the messages being written to a given topic (see the section on debugging for more info).|boolean|`"false"`|
|**Query**|**group**  <br>*required*|The name of a consumer group to use for the connection. If you open up multiple connections with the same group name, the messages will be split between the connections (i.e. a given message will only be delivered to one of the connections). This is one way for clients to handle higher-volume topics.|string||
|**Query**|**org**  <br>*optional*|Only send messages for the specified imsOrg.|string||
|**Query**|**regex**  <br>*optional*|Set to true when the specified topic should be treated as a regular expression. This option is not compatible with the offsets option.|boolean||
|**Query**|**reset**  <br>*optional*|Tells the consumer where to start reading when there is no stored offset for a given group/partition (or if the stored offset is invalid because the message has expired).|enum (earliest, latest)|`"latest"`|
|**Query**|**syncInterval**  <br>*optional*|The interval (in milliseconds) at which to send SYNC messages|integer|`0`|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|No Content|
|**400**|There was a problem with the request. See the response body for a more specific error message. There is no point in retrying|No Content|
|**401**|Unauthorized - Need to provide a valid bearer token|No Content|
|**404**|You requested to consume from a topic that does not exist or is not accessible to the endpoint|No Content|
|**500**|Internal server error|No Content|
|**503**|Service is not currently available. Clients should retry at least 3 times using an exponential back-off strategy  <br>**Headers** :   <br>`Retry-After` (integer) : Specifies number of seconds to retry after.|No Content|


#### Produces

* `x-protobuf`
* `application/json`


#### Tags

* Consume Messages


#### Example HTTP request

##### Request path
```
/pipeline/topics/string/messages
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
  "assign" : "string",
  "debug" : true,
  "group" : "string",
  "org" : "string",
  "regex" : true,
  "reset" : "string",
  "syncInterval" : 0
}
```



