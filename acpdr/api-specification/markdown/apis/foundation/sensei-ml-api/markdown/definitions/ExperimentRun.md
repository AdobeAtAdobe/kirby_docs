
<a name="experimentrun"></a>
### ExperimentRun
*Polymorphism* : Composition


|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#experimentrun-links)|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#experimentrun-createdby)|
|**deleted**  <br>*optional*|**Default** : `false`  <br>**Example** : `true`|boolean|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**experimentId**  <br>*required*|**Example** : `"string"`|string|
|**id**  <br>*optional*|**Example** : `"string"`|string|
|**mode**  <br>*optional*|**Example** : `"string"`|string|
|**runChain**  <br>*optional*|**Example** : `"object"`|[runChain](#experimentrun-runchain)|
|**tasks**  <br>*optional*|**Example** : `"[mlinstancetasklist](#mlinstancetasklist)"`|[MLInstanceTaskList](MLInstanceTaskList.md#mlinstancetasklist)|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="experimentrun-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="experimentrun-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|

<a name="experimentrun-runchain"></a>
**runChain**

|Name|Description|Schema|
|---|---|---|
|**batchScoreTaskId**  <br>*optional*|**Example** : `"string"`|string (urn)|
|**evaluateTaskId**  <br>*optional*|**Example** : `"string"`|string (urn)|
|**preprocessTaskId**  <br>*optional*|**Example** : `"string"`|string (urn)|
|**trainTaskId**  <br>*optional*|**Example** : `"string"`|string (urn)|
|**validateTaskId**  <br>*optional*|**Example** : `"string"`|string (urn)|



