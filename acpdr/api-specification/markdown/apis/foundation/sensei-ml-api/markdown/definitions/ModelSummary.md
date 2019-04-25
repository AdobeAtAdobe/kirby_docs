
<a name="modelsummary"></a>
### ModelSummary

|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#modelsummary-links)|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#modelsummary-createdby)|
|**deleted**  <br>*optional*|**Default** : `false`  <br>**Example** : `true`|boolean|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**experimentId**  <br>*optional*|**Example** : `"string"`|string|
|**experimentRunId**  <br>*required*|**Example** : `"string"`|string|
|**id**  <br>*optional*|**Example** : `"string"`|string|
|**modelArtifactUri**  <br>*optional*|**Example** : `"string"`|string|
|**name**  <br>*optional*|**Example** : `"string"`|string|
|**state**  <br>*optional*|**Example** : `[ "string" ]`|< enum (trained, published, transcoded) > array|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="modelsummary-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="modelsummary-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|



