
<a name="trainedmodel"></a>
### TrainedModel
*Polymorphism* : Composition


|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#trainedmodel-links)|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#trainedmodel-createdby)|
|**dashBoardUrl**  <br>*optional*|**Example** : `"string"`|string|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (uuid)|
|**livyJobID**  <br>*optional*|**Example** : `"string"`|string|
|**modelInstanceId**  <br>*optional*|**Example** : `"string"`|string (uuid)|
|**modelMetricUrl**  <br>*optional*|**Example** : `"string"`|string|
|**modelTaskId**  <br>*optional*|**Example** : `"string"`|string|
|**name**  <br>*required*|**Example** : `"string"`|string|
|**schedule**  <br>*optional*|**Example** : `"object"`|[schedule](#trainedmodel-schedule)|
|**tags**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**trainedModelArtifactUri**  <br>*optional*|**Example** : `"string"`|string|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="trainedmodel-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**delete-trained-model**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**get-trained-model**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**perform-batch-scoring**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**update-trained-model**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="trainedmodel-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|

<a name="trainedmodel-schedule"></a>
**schedule**

|Name|Description|Schema|
|---|---|---|
|**delay**  <br>*optional*|Amount of time, in milliseconds, before starting the job  <br>**Example** : `0`|integer (int64)|
|**startTime**  <br>*optional*|Time the job should start, epoch timestamp in milliseconds  <br>**Example** : `0`|integer (int64)|



