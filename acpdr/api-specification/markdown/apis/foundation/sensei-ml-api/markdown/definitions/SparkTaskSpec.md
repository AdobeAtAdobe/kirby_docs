
<a name="sparktaskspec"></a>
### SparkTaskSpec
*Polymorphism* : Inheritance  
*Discriminator* : type


|Name|Description|Schema|
|---|---|---|
|**args**  <br>*optional*|**Example** : `[ "string" ]`|< string > array|
|**className**  <br>*required*|**Example** : `"string"`|string|
|**driverCores**  <br>*required*|**Example** : `0`|integer (int32)|
|**driverMemoryInMB**  <br>*required*|**Example** : `0`|integer (int32)|
|**executorCores**  <br>*required*|**Example** : `0`|integer (int32)|
|**executorMemoryInMB**  <br>*required*|**Example** : `0`|integer (int32)|
|**name**  <br>*required*|**Example** : `"string"`|string|
|**numExecutors**  <br>*required*|**Example** : `0`|integer (int32)|
|**sparkConf**  <br>*required*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**type**  <br>*required*|**Example** : `"string"`|enum (ContainerTaskSpec, SparkTaskSpec)|



