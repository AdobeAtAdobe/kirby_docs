
<a name="query"></a>
### query
query, parameters and configuration.


|Name|Description|Schema|
|---|---|---|
|**ctasParameters**  <br>*optional*|If this property is defined, this query will be converted into a CTAS query. Optional.  <br>**Example** : `"object"`|[ctasParameters](#query-ctasparameters)|
|**dbName**  <br>*optional*|Name of database you intend to query against. Required.  <br>**Example** : `"string"`|string|
|**description**  <br>*optional*|A comment on the query intent. Optional.  <br>**Example** : `"string"`|string|
|**name**  <br>*optional*|A friendly name for the query. Optional.  <br>**Example** : `"string"`|string|
|**sql**  <br>*optional*|**Example** : `"SELECT * from t1;"`|string|

<a name="query-ctasparameters"></a>
**ctasParameters**

|Name|Description|Schema|
|---|---|---|
|**datasetName**  <br>*optional*|Name of the dataset to create as part of the CTAS.  <br>**Example** : `"string"`|string|
|**description**  <br>*optional*|A description for the new dataset. Optional.  <br>**Example** : `"string"`|string|



