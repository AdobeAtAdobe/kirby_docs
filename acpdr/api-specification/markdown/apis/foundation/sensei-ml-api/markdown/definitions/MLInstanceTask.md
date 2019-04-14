
<a name="mlinstancetask"></a>
### MLInstanceTask
A single execution unit of Sensei


|Name|Description|Schema|
|---|---|---|
|**datasets**  <br>*optional*|**Example** : `"object"`|[datasets](#mlinstancetask-datasets)|
|**name**  <br>*optional*|**Example** : `"string"`|string|
|**parameters**  <br>*optional*|**Example** : `[ "[mlinstancetaskparameter](#mlinstancetaskparameter)" ]`|< [MLInstanceTaskParameter](MLInstanceTaskParameter.md#mlinstancetaskparameter) > array|
|**specification**  <br>*optional*|**Example** : `"[taskspec](#taskspec)"`|[TaskSpec](TaskSpec.md#taskspec)|

<a name="mlinstancetask-datasets"></a>
**datasets**

|Name|Description|Schema|
|---|---|---|
|**inputs**  <br>*optional*|**Example** : `[ "object" ]`|< [inputs](#mlinstancetask-inputs) > array|
|**outputs**  <br>*optional*|**Example** : `[ "object" ]`|< [outputs](#mlinstancetask-outputs) > array|

<a name="mlinstancetask-inputs"></a>
**inputs**

|Name|Description|Schema|
|---|---|---|
|**diskSizeInGB**  <br>*optional*|**Example** : `0`|integer|
|**downloadRequired**  <br>*optional*|**Example** : `true`|boolean|
|**id**  <br>*optional*|**Example** : `"string"`|string (urn)|
|**metadata**  <br>*optional*|**Example** : `{<br>  "string" : "object"<br>}`|< string, object > map|
|**name**  <br>*optional*|**Example** : `"string"`|string|
|**refInput**  <br>*optional*|**Example** : `"object"`|[refInput](#mlinstancetask-inputs-refinput)|
|**resType**  <br>*optional*|**Example** : `"string"`|enum (dataset, model, genericFile)|

<a name="mlinstancetask-inputs-refinput"></a>
**refInput**

|Name|Description|Schema|
|---|---|---|
|**experimentRunId**  <br>*optional*|**Example** : `"string"`|string|
|**outputName**  <br>*optional*|**Example** : `"string"`|string|
|**taskName**  <br>*optional*|**Example** : `"string"`|string|

<a name="mlinstancetask-outputs"></a>
**outputs**

|Name|Description|Schema|
|---|---|---|
|**diskSizeInGB**  <br>*optional*|**Example** : `0`|integer|
|**generatedURI**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*optional*|**Example** : `"string"`|string (urn)|
|**metadata**  <br>*optional*|**Example** : `{<br>  "string" : "object"<br>}`|< string, object > map|
|**name**  <br>*optional*|**Example** : `"string"`|string|
|**resType**  <br>*optional*|**Example** : `"string"`|enum (dataset, model, genericFile)|
|**uploadRequired**  <br>*optional*|**Example** : `true`|boolean|



