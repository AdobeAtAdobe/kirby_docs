
<a name="status"></a>
### status

|Name|Description|Schema|
|---|---|---|
|**created**  <br>*optional*|The Unix timestamp (in milliseconds) when this DataSetView was  <br>**Example** : `0`|integer (int64)|
|**createdUser**  <br>*optional*|The ID of the user who created this object.  <br>**Example** : `"string"`|string|
|**dbName**  <br>*optional*|Driving Data Base name.  <br>**Example** : `"string"`|string|
|**elapsedTime**  <br>*optional*|Elapsed time in ms  <br>**Example** : `0`|integer|
|**errors**  <br>*optional*|**Example** : `[ "[errors](#errors)" ]`|< [errors](errors.md#errors) > array|
|**id**  <br>*optional*|**Example** : `"string"`|string|
|**recordCount**  <br>*optional*|The total number of data records (rows) in result set  <br>**Example** : `0`|integer|
|**status**  <br>*required*|The current status of this query.  <br>**Example** : `"string"`|enum (processing, success, failure, queued, retrying, stalled)|
|**url**  <br>*optional*|status or results API url  <br>**Example** : `"string"`|string|



