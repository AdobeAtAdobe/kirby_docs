
<a name="runstatus"></a>
### RunStatus

|Name|Description|Schema|
|---|---|---|
|**deleted**  <br>*optional*|**Default** : `false`  <br>**Example** : `true`|boolean|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**experimentRunId**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*optional*|**Example** : `"string"`|string|
|**name**  <br>*optional*|**Example** : `"string"`|string|
|**status**  <br>*optional*|**Example** : `"object"`|[status](#runstatus-status)|

<a name="runstatus-status"></a>
**status**

|Name|Description|Schema|
|---|---|---|
|**tasks**  <br>*optional*|**Example** : `[ "[status](#status)" ]`|< [Status](Status.md#status) > array|



