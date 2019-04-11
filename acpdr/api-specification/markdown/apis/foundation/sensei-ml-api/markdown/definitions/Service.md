
<a name="service"></a>
### Service
*Polymorphism* : Composition


|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#service-links)|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#service-createdby)|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*optional*|**Example** : `"string"`|string|
|**mlInstanceId**  <br>*optional*|**Example** : `"string"`|string|
|**mlInstanceSpec**  <br>*optional*|**Example** : `"object"`|[mlInstanceSpec](#service-mlinstancespec)|
|**modelId**  <br>*required*|**Example** : `"string"`|string|
|**tags**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="service-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="service-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|

<a name="service-mlinstancespec"></a>
**mlInstanceSpec**

|Name|Description|Schema|
|---|---|---|
|**deploySpec**  <br>*optional*|**Example** : `"object"`|[deploySpec](#service-deployspec)|
|**dockerImage**  <br>*optional*|**Example** : `"string"`|string|
|**gitRepo**  <br>*optional*|**Example** : `"string"`|string|

<a name="service-deployspec"></a>
**deploySpec**

|Name|Description|Schema|
|---|---|---|
|**backendUrl**  <br>*optional*|**Example** : `"string"`|string|
|**cmd**  <br>*optional*|**Example** : `"string"`|string|
|**cpus**  <br>*optional*|**Example** : `0.0`|number|
|**gpus**  <br>*optional*|**Example** : `0.0`|number|
|**instances**  <br>*optional*|**Example** : `0.0`|number|
|**memory**  <br>*optional*|**Example** : `"string"`|string|
|**regions**  <br>*optional*|**Example** : `"string"`|enum (UE1, EW1, AN1)|
|**splunkIndex**  <br>*optional*|**Example** : `"string"`|string|



