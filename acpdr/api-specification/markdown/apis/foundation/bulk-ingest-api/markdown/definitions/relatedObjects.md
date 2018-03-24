
<a name="relatedobjects"></a>
### relatedObjects

|Name|Description|Schema|
|---|---|---|
|**errors**  <br>*optional*|**Example** : `[ "[errors](#errors)" ]`|< [errors](errors.md#errors) > array|
|**id**  <br>*optional*|**Example** : `"string"`|string|
|**metrics**  <br>*optional*|Contains metrics related to this dataset.  <br>**Example** : `{<br>  "string" : 0<br>}`|< string, integer > map|
|**status**  <br>*optional*|The current (mutable) status of this dataset.  <br>**Example** : `"string"`|enum (processing, success, failure, queued, retrying, stalled)|
|**tag**  <br>*optional*|The name for the relation the specified object had with this Batch operation. Examples: input, output, trigger, etc.  <br>**Example** : `"string"`|string|
|**type**  <br>*optional*|The type of object processed in this Batch.  <br>**Example** : `"string"`|enum (batch, connection, connector, dataSet, dataSetFile, dataSetView, transform)|



