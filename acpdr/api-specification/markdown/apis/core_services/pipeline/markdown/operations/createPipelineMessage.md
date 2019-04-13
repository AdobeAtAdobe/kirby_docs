
<a name="createpipelinemessage"></a>
### Produce Messages to Pipeline
```
POST /pipeline/topics/{topicName}/messages
```


#### Description
This API is used by message producers to send message to a specific topic. Messages can be single or batched. Message size upper limit is 1 MB for single and 2 MB for batched. Messages will be retained for a configured TTL for reading by a consumer.


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|Must be in the following format 'Bearer $TOKEN', Where $TOKEN is either an IMS Service Token (used for authenticating producer service) or an IMS Gateway Token (used for authenticating IMS Org)|string||
|**Header**|**Content-Type**  <br>*optional*||enum (x-protobuf, application/json)|`"x-protobuf"`|
|**Path**|**topicName**  <br>*required*||string||


#### Body parameter
The message to be sent to the Pipeline

*Name* : body  
*Flags* : required  
*Type* : [Message](../definitions/Message.md#message)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|No Content|
|**400**|There was a problem with the request. See the response body for a more specific error message|No Content|
|**401**|Unauthorized - Need to provide a valid bearer token|No Content|
|**404**|You requested to produce to a topic that does not exist or is not accessible to the endpoint|No Content|
|**500**|Internal server error|No Content|
|**503**|Service is not currently available. Clients should retry at least 3 times using an exponential back-off strategy  <br>**Headers** :   <br>`Retry-After` (integer) : Specifies number of seconds to retry after.|No Content|


#### Produces

* `application/json`


#### Tags

* Produce Messages


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


##### Request body
```
json :
{
  "messageType" : "string",
  "source" : "string",
  "sentTime" : 0,
  "imsOrg" : "string",
  "properties" : "object",
  "messageId" : "string",
  "locations" : [ "string" ],
  "messageContentType" : "string",
  "schemaRef" : "string",
  "schemaVersion" : "string",
  "message" : "string"
}
```



