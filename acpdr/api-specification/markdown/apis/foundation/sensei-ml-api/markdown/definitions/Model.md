
<a name="model"></a>
### Model
*Polymorphism* : Composition


|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#model-links)|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#model-createdby)|
|**deleted**  <br>*optional*|**Default** : `false`  <br>**Example** : `true`|boolean|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**experimentId**  <br>*optional*|**Example** : `"string"`|string|
|**experimentRunId**  <br>*required*|**Example** : `"string"`|string|
|**id**  <br>*optional*|**Example** : `"string"`|string|
|**modelArtifactUri**  <br>*optional*|**Example** : `"string"`|string|
|**name**  <br>*optional*|**Example** : `"string"`|string|
|**state**  <br>*optional*|**Example** : `[ "string" ]`|< enum (trained, published, transcoded) > array|
|**tags**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="model-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="model-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|



