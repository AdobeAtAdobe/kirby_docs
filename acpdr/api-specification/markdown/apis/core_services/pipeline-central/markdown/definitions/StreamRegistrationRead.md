
<a name="streamregistrationread"></a>
### StreamRegistrationRead

|Name|Description|Schema|
|---|---|---|
|**authenticationRequired**  <br>*optional*|This flag will instruct the data collection API to peform authentication on the incoming request  <br>**Example** : `true`|boolean|
|**imsOrg**  <br>*optional*|IMS Org of the entity that will produce streaming data  <br>**Example** : `"string"`|string|
|**messageFormat**  <br>*optional*|Options will be following enumerations  <br>**Example** : `"string"`|enum (XDM, RAW)|
|**source**  <br>*optional*|An Identifier that uniquely identifies a data source that produces streaming data. This can be any, and not limited to the following - 1. Account ID 2. App ID (Mobile/Web app/Service ID)  <br>**Example** : `"string"`|string|
|**topicName**  <br>*optional*|Name of the topic to read processed data  <br>**Example** : `"string"`|string|
|**validateMessage**  <br>*optional*|If the dataType = xdm, then this flag will instruct data collection API to perform validations against schema  <br>**Example** : `true`|boolean|



