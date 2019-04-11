
<a name="mlengineartifact"></a>
### MLEngineArtifact

|Name|Description|Schema|
|---|---|---|
|**executionType**  <br>*optional*|**Example** : `"string"`|string|
|**location**  <br>*required*|**Example** : `"string"`|string|
|**metadata**  <br>*optional*|**Example** : `{<br>  "string" : "object"<br>}`|< string, object > map|
|**name**  <br>*required*|**Example** : `"string"`|string|
|**packagingType**  <br>*required*|**Default** : `"docker"`  <br>**Example** : `"string"`|enum (docker)|
|**reference**  <br>*optional*|**Example** : `"[artifactreference](#artifactreference)"`|[ArtifactReference](ArtifactReference.md#artifactreference)|



