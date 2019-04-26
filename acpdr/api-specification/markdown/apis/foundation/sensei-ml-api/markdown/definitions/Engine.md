
<a name="engine"></a>
### Engine
*Polymorphism* : Composition


|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#engine-links)|
|**algorithm**  <br>*optional*|**Example** : `"string"`|string|
|**artifacts**  <br>*optional*|**Example** : `"object"`|[artifacts](#engine-artifacts)|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#engine-createdby)|
|**deleted**  <br>*optional*|**Default** : `false`  <br>**Example** : `true`|boolean|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**gitRepo**  <br>*optional*|**Example** : `"string"`|string|
|**iconUrl**  <br>*optional*|Url of the thumbnail image  <br>**Example** : `"string"`|string|
|**id**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string|
|**language**  <br>*optional*|**Example** : `[ "string" ]`|< enum (Python, Java, Scala, R, C++) > array|
|**mlLibrary**  <br>*optional*|**Example** : `"string"`|string|
|**name**  <br>*required*|**Example** : `"string"`|string|
|**tags**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**type**  <br>*optional*|**Example** : `"string"`|string|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="engine-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**createMLInstance**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**getEngine**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**listMLInstances**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="engine-artifacts"></a>
**artifacts**

|Name|Description|Schema|
|---|---|---|
|**default**  <br>*optional*|**Example** : `"object"`|[default](#engine-default)|
|**overrides**  <br>*optional*|**Example** : `[ "[mlengineartifactoverride](#mlengineartifactoverride)" ]`|< [MLEngineArtifactOverride](MLEngineArtifactOverride.md#mlengineartifactoverride) > array|

<a name="engine-default"></a>
**default**

|Name|Description|Schema|
|---|---|---|
|**defaultMLInstanceConfigs**  <br>*optional*|**Example** : `"[mlinstancetasklist](#mlinstancetasklist)"`|[MLInstanceTaskList](MLInstanceTaskList.md#mlinstancetasklist)|
|**image**  <br>*optional*|**Example** : `"[mlengineartifact](#mlengineartifact)"`|[MLEngineArtifact](MLEngineArtifact.md#mlengineartifact)|

<a name="engine-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|



