
<a name="batchpatchrequest"></a>
### batchPatchRequest

|Name|Description|Schema|
|---|---|---|
|**availableDates**  <br>*optional*|Describes what date range of data is available in the Batch. Null if dates aren't relevant for data related to this Batch.  <br>**Example** : `"object"`|[availableDates](#batchpatchrequest-availabledates)|
|**completed**  <br>*optional*|The Unix timestamp (in milliseconds) when the Batch processing action was completed. Completed - Started should yield the total processing time.  <br>**Example** : `0`|integer (int64)|
|**errors**  <br>*optional*|**Example** : `[ "[errors](#errors)" ]`|< [errors](errors.md#errors) > array|
|**failedRecordCount**  <br>*optional*|The number of records that could not be processed in this Batch.  <br>**Example** : `0`|integer (int64)|
|**metrics**  <br>*optional*|Contains metrics related to this Batch.  Metric names are determined by the producer of the object since each Batch may want to record metrics that are relevant to the process  <br>**Example** : `{<br>  "string" : 0<br>}`|< string, integer (int64) > map|
|**recordCount**  <br>*optional*|The total number of data records (rows/documents) processed in this Batch.  <br>**Example** : `0`|integer (int64)|
|**relatedObjects**  <br>*optional*|List of associated objects for this Batch, such as dataSets, connections, dataSetView, dataSetFiles etc.  <br>**Example** : `[ "[relatedobjects](#relatedobjects)" ]`|< [relatedObjects](relatedObjects.md#relatedobjects) > array|
|**size**  <br>*optional*|Number of bytes processed in this Batch.  <br>**Example** : `0`|integer (int64)|
|**started**  <br>*optional*|The Unix timestamp (in milliseconds) when the Batch processing action was started.  <br>**Example** : `0`|integer (int64)|
|**status**  <br>*optional*|The current (mutable) status of this Batch.  <br>**Example** : `"string"`|enum (processing, success, failure, queued, retrying, stalled, aborted, abandoned, inactive, failed, loading, loaded, staged, active, staging)|
|**tags**  <br>*optional*|Tags are values associated with a particular object,  these are generally used by external systems for marking an object in a way that it understands.  Normally tags are not used for internal Catalog business logic  <br>**Example** : `{<br>  "string" : [ "string" ]<br>}`|< string, < string > array > map|

<a name="batchpatchrequest-availabledates"></a>
**availableDates**

|Name|Description|Schema|
|---|---|---|
|**endDate**  <br>*optional*|The Unix timestamp (in seconds) for the most recent data available in this Batch.  <br>**Example** : `0`|integer (int64)|
|**startDate**  <br>*optional*|The Unix timestamp (in seconds) for the oldest data available in this Batch.  <br>**Example** : `0`|integer (int64)|



