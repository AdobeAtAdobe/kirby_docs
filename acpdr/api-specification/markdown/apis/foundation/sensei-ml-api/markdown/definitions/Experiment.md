
<a name="experiment"></a>
### Experiment
*Polymorphism* : Composition


|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#experiment-links)|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#experiment-createdby)|
|**deleted**  <br>*optional*|**Default** : `false`  <br>**Example** : `true`|boolean|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string|
|**mlInstanceId**  <br>*optional*|**Example** : `"string"`|string|
|**mlInstanceQuery**  <br>*optional*|**Example** : `"string"`|string|
|**name**  <br>*required*|**Example** : `"string"`|string|
|**tags**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**template**  <br>*optional*|**Example** : `"[experimenttemplate](#experimenttemplate)"`|[ExperimentTemplate](ExperimentTemplate.md#experimenttemplate)|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**workflowId**  <br>*optional*|**Example** : `"string"`|string|

<a name="experiment-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**createExperimentRun**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**getExperiment**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**listExperimentRuns**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="experiment-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|



