
<a name="message"></a>
### Message
Message to be sent to the Pipeline


|Name|Description|Schema|
|---|---|---|
|**imsOrg**  <br>*optional*|Pipeline will query systems of record to determine where the message needs to be routed by using the IMS ID provided in the value. This is also used for performing security checks to validate that the imsOrg has permissions to publish to the topic, if the topic has ACLs specified on it.  <br>**Example** : `"string"`|string|
|**locations**  <br>*optional*|Pipeline will pickup the list locations provided in the value and attempt routing to that location. If this field is provided, it will override the routing logic based on imsOrg field. List of pipeline locations can be obtained by calling GET /pipeline/admin/locations API  <br>**Example** : `[ "string" ]`|< string > array|
|**message**  <br>*optional*|The actual message body  <br>**Example** : `"string"`|string|
|**messageContentType**  <br>*optional*|Useful if the message producer wants to indicate to the consumer the type of content in the message body. This is a free-form field and the producer is free to use it as per their needs. For example, the if the message body is binary data (base64 encoded if packaged in a JSON), then the producer can tell the consumer for what type of data it is.  <br>**Example** : `"string"`|string|
|**messageId**  <br>*optional*|The ID of the message, assigned by message producing solution. Useful for sharding messages as well as sequencing them back at the consumer end when multiple consumers read from a topic  <br>**Example** : `"string"`|string|
|**messageType**  <br>*optional*|Determines the body of the message  <br>**Example** : `"string"`|string|
|**properties**  <br>*optional*|Message producer can choose to send any arbitrary application specific metadata (such as key/value pairs) for the consumption of the consumer.  <br>**Example** : `"object"`|object|
|**schemaRef**  <br>*optional*|When message is in JSON format, it needs to reference to a schema registered in the schema registry. This value provides a pointer to the schema in the registry.  <br>**Example** : `"string"`|string|
|**schemaVersion**  <br>*optional*|When message is in JSON format, it needs to reference a schema version registered in the schema registry. This value provides a pointer to the schema version in the registry.  <br>**Example** : `"string"`|string|
|**sentTime**  <br>*optional*|The sentTime field is a timestamp (in milliseconds) that indicates when the message was generated.  <br>**Example** : `0`|integer (int64)|
|**source**  <br>*optional*|The source field is an identifier for the solution that generated the message. Ideally, it is based on the standard service names defined in CMDB  <br>**Example** : `"string"`|string|



