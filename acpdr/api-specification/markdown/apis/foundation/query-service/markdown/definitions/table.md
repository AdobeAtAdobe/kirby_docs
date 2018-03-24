
<a name="table"></a>
### table

|Name|Description|Schema|
|---|---|---|
|**created**  <br>*optional*|The Unix timestamp (in milliseconds) when this DataSetView was persisted.  <br>**Example** : `0`|integer (int64)|
|**createdUser**  <br>*optional*|The ID of the user who created this object.  <br>**Example** : `"string"`|string|
|**datasetLink**  <br>*optional*|Link to the associated datatset  <br>**Example** : `"string"`|string|
|**dule**  <br>*optional*|**Example** : `"[dule](#dule)"`|[dule](dule.md#dule)|
|**name**  <br>*optional*|The Unique Table Name  <br>**Example** : `"string"`|string|
|**type**  <br>*optional*|Type of the table - BASE TABLE for a persistent base table (the normal table type based on existing dataset), VIEW for a view or LOCAL TEMPORARY for a temporary table  <br>**Example** : `"string"`|enum (BASE TABLE, VIEW, LOCAL TEMPORARY)|
|**updatedUser**  <br>*optional*|The ID of the user who changed this object.  <br>**Example** : `"string"`|string|



