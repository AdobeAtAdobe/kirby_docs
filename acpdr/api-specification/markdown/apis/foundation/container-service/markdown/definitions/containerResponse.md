
<a name="containerresponse"></a>
### containerResponse

|Name|Description|Schema|
|---|---|---|
|**ancestorPath**  <br>*optional*|An ordered array of container parents, where 0th element is the root container.  Supplied from a GET call only when query parameters include "expand=ancestorPath".  <br>**Example** : `[ "string" ]`|< string > array|
|**created**  <br>*optional*|**Example** : `0.0`|number|
|**createdUser**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*optional*|a unique identifier for this container resource  <br>**Example** : `"string"`|string|
|**imsOrg**  <br>*optional*|**Example** : `"string"`|string|
|**name**  <br>*optional*|Human readable name. Should be unique among siblings in hierarchy.  <br>**Example** : `"string"`|string|
|**parentUri**  <br>*optional*|URI of the parent container  <br>**Example** : `"string"`|string|
|**updated**  <br>*optional*|**Example** : `0.0`|number|
|**updatedUser**  <br>*optional*|**Example** : `"string"`|string|
|**uri**  <br>*optional*|/containers/{id}  <br>**Example** : `"string"`|string|



