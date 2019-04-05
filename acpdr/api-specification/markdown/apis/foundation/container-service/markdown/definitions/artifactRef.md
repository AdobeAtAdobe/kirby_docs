
<a name="artifactref"></a>
### artifactRef

|Name|Description|Schema|
|---|---|---|
|**ancestorPath**  <br>*optional*|An ordered array of container parents, where 0th element is the root container.  Supplied from a GET call only when query parameters include "expand=ancestorPath".  <br>**Example** : `[ "string" ]`|< string > array|
|**artifactUri**  <br>*optional*|URI of the artifact.  <br>**Example** : `"string"`|string|
|**containerUri**  <br>*optional*|URI of the container to which this artifact belongs.  <br>**Example** : `"string"`|string|
|**id**  <br>*optional*|a unique identifier for this artifactRef resource  <br>**Example** : `"string"`|string|
|**type**  <br>*optional*|The type of artifact.  <br>**Example** : `"string"`|enum (dataSet, connection, transform)|
|**uri**  <br>*optional*|/artifactRefs/{id}  <br>**Example** : `"string"`|string|



