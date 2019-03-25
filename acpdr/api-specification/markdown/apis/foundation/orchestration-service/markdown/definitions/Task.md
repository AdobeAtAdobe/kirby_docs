
<a name="task"></a>
### Task

|Name|Description|Schema|
|---|---|---|
|**connections**  <br>*optional*|**Example** : `[ "[connection](#connection)" ]`|< [Connection](Connection.md#connection) > array|
|**dependsOn**  <br>*optional*|**Example** : `"[taskdependency](#taskdependency)"`|[TaskDependency](TaskDependency.md#taskdependency)|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*required*|**Example** : `"string"`|string|
|**policy**  <br>*optional*|**Example** : `"[taskpolicy](#taskpolicy)"`|[TaskPolicy](TaskPolicy.md#taskpolicy)|
|**type**  <br>*required*|**Example** : `"string"`|enum (ACPComputeGateway, ACPQueryService, SenseiTrainman)|
|**typeProperties**  <br>*required*|**Example** : `"object"`|object|



