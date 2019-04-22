
<a name="experimentsummary"></a>
### ExperimentSummary

|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#experimentsummary-links)|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#experimentsummary-createdby)|
|**deleted**  <br>*optional*|**Default** : `false`  <br>**Example** : `true`|boolean|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string|
|**mlInstanceId**  <br>*optional*|**Example** : `"string"`|string|
|**mlInstanceQuery**  <br>*optional*|**Example** : `"string"`|string|
|**name**  <br>*required*|**Example** : `"string"`|string|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**workflowId**  <br>*optional*|**Example** : `"string"`|string|

<a name="experimentsummary-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="experimentsummary-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|



