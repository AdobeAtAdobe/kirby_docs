
<a name="enginesummary"></a>
### EngineSummary

|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#enginesummary-links)|
|**algorithm**  <br>*optional*|**Example** : `"string"`|string|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#enginesummary-createdby)|
|**deleted**  <br>*optional*|**Default** : `false`  <br>**Example** : `true`|boolean|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**gitRepo**  <br>*optional*|**Example** : `"string"`|string|
|**iconUrl**  <br>*optional*|Url of the thumbnail image  <br>**Example** : `"string"`|string|
|**id**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string|
|**language**  <br>*optional*|**Example** : `[ "string" ]`|< enum (Python, Java, Scala, R, C++) > array|
|**mlLibrary**  <br>*optional*|**Example** : `"string"`|string|
|**name**  <br>*required*|**Example** : `"string"`|string|
|**type**  <br>*optional*|**Example** : `"string"`|string|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="enginesummary-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="enginesummary-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|



