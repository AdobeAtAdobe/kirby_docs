
<a name="modeltranscodingsummary"></a>
### ModelTranscodingSummary

|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#modeltranscodingsummary-links)|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#modeltranscodingsummary-createdby)|
|**deleted**  <br>*optional*|**Default** : `false`  <br>**Example** : `true`|boolean|
|**id**  <br>*optional*|**Example** : `"string"`|string|
|**modelId**  <br>*required*|**Example** : `"string"`|string|
|**targetFormat**  <br>*optional*|**Example** : `"string"`|enum (CoreML, TF, K2, Deepnet)|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="modeltranscodingsummary-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="modeltranscodingsummary-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|



