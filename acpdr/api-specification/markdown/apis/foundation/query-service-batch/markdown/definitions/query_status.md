
<a name="query_status"></a>
### query_status

|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"[query_links](#query_links)"`|[query_links](query_links.md#query_links)|
|**client**  <br>*optional*|The User Agent of the calling client if this was an HTTP API (ex. "XDW User Interface"), or the Application Name if it was submitted via the interactive interface (ex. "Tableau 1.0").  <br>**Example** : `"string"`|string|
|**created**  <br>*optional*|UTC time when query was SUBMITTED.  <br>**Example** : `"string"`|string|
|**effectiveSQL**  <br>*optional*|If the query was somehow modified from the original, as in the case of a conversion to a CTAS, this property will be defined and it will include the effective SQL.  <br>**Example** : `"string"`|string|
|**elapsedTime**  <br>*optional*|Elapsed time in milliseconds since the query state changed to IN_PROGRESS, or total time between IN_PROGRESS and a terminal state.  <br>**Example** : `0`|integer|
|**errors**  <br>*optional*|**Example** : `[ "[errors](#errors)" ]`|< [errors](errors.md#errors) > array|
|**id**  <br>*optional*|**Example** : `"string"`|string|
|**isCTAS**  <br>*optional*|Whether the original sql matches the pattern of a CTAS query, or if the query included a ctasDataset name that effectively turned the query into a CTAS.  <br>**Example** : `true`|boolean|
|**recordCount**  <br>*optional*|The total number of data records (rows) in result set, or in created dataset.  <br>**Example** : `0`|integer|
|**request**  <br>*optional*|**Example** : `"[query](#query)"`|[query](query.md#query)|
|**state**  <br>*optional*|The current state of this query.  <br>**Example** : `"string"`|enum (SUBMITTED, IN_PROGRESS, SUCCESS, FAILED, KILLED, TIMEOUT)|
|**updated**  <br>*optional*|UTC time when query was last updated.  <br>**Example** : `"string"`|string|
|**userId**  <br>*optional*|The ID of the user who created this object.  <br>**Example** : `"string"`|string|
|**version**  <br>*optional*|REST API version of this resource  <br>**Example** : `0`|integer|



