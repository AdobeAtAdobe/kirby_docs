
<a name="datasetviewresponse"></a>
### dataSetViewResponse

|Name|Description|Schema|
|---|---|---|
|**aspect**  <br>*optional*|Aspect represents the particular perspective or target you're after when viewing a dataset. Sandbox views are a version of the dataset that's being used to iterate towards a final ETL job definition. The production aspect is then used (by default).  <br>**Example** : `"string"`|enum (production, sandbox)|
|**basePath**  <br>*optional*  <br>*read-only*|Fully qualified base path for all DataSetFiles associated with this view. For views cached in a database (HBase or Cassandra), supply a templatized DSN.  <br>**Example** : `"string"`|string|
|**created**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) when this DataSetView was persisted.  <br>**Example** : `0`|integer (int64)|
|**createdClient**  <br>*optional*  <br>*read-only*|The ID of the IMS client that created this DataSetView.  <br>**Example** : `"string"`|string|
|**createdUser**  <br>*optional*  <br>*read-only*|The ID of the user who created this object.  <br>**Example** : `"string"`|string|
|**dataSetId**  <br>*optional*|Foreign key to the owning DataSet.  <br>**Example** : `"string"`|string|
|**dependencies**  <br>*optional*|An array of dependency objects. If a DataSetView is referenced in a transform, data about that linkage should be found in this array.  <br>**Example** : `[ "[dependencies](#dependencies)" ]`|< [dependencies](dependencies.md#dependencies) > array|
|**editable**  <br>*optional*|Determines whether or not this DataSetView definition should be editable by the user.  Some documents are 'locked' and not available for edit.  <br>**Example** : `true`|boolean|
|**fields**  <br>*optional*|Ordered array of fields describing the resulting schema (output) for this view.  <br>**Example** : `[ "[field](#field)" ]`|< [field](field.md#field) > array|
|**fileDescription**  <br>*optional*|Metadata describing the DataSetFiles associated with this DataSetView.  <br>**Example** : `"object"`|[fileDescription](#datasetviewresponse-filedescription)|
|**files**  <br>*optional*|Link to associated files in following string format /dataSets/{dataSetId}/views/{dataSetViewId}/files  <br>**Example** : `"string"`|string|
|**imsOrg**  <br>*optional*|The owning IMS organization identifier.  <br>**Example** : `"string"`|string|
|**isCached**  <br>*optional*|Some DataSetViews are pre-cached in a high-speed lookup table for faster access, this flag indicates if that has been done.  <br>**Example** : `true`|boolean|
|**observableSchema**  <br>*optional*|observableSchema stores a JSON Schema object that is a valid subset (including the null case) of the XDM model specified by `schema`.  <br>**Example** : `"object"`|object|
|**partitions**  <br>*optional*|**Example** : `[ "string" ]`|< string > array|
|**requestStartDate**  <br>*optional*|The oldest date and the time, when the data was last ingested  <br>**Example** : `"string"`|string|
|**saveStrategy**  <br>*optional*|Denotes save strategy for this dataset.  <br>**Example** : `"string"`|enum (append, overwrite, delta)|
|**schema**  <br>*optional*|This is the uri for the XDM model  <br>**Example** : `"string"`|string|
|**sdsVersion**  <br>*optional*|The semantic version of the SDS this view (and it's transforms) are compatible with.  <br>**Example** : `"string"`|string|
|**status**  <br>*optional*|Describes the current state of the view.  If a view is not enabled, it should not be used by any process even when it is specified as a dependency. Only one view of a given aspect should be enabled at any time. For example, no DataSet should have more than one enabled production or sandbox view.  <br>**Example** : `"string"`|enum (enabled, disabled)|
|**storageType**  <br>*optional*|Specifies the type of storage that applies to basePath. It is required only when basePath is not empty.  <br>**Example** : `"string"`|enum (s3, hdfs, azure-blob)|
|**transforms**  <br>*optional*|Link to associated transforms in following string format /dataSets/{dataSetId}/views/{dataSetViewId}/transforms  <br>**Example** : `"string"`|string|
|**updated**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) for the time of last modification.  <br>**Example** : `0`|integer (int64)|
|**updatedUser**  <br>*optional*  <br>*read-only*|The ID of the user who changed this object.  <br>**Example** : `"string"`|string|
|**version**  <br>*optional*  <br>*read-only*|The Semantic version of the DataSetView. Updated when the DataSetView is modified.  <br>**Example** : `"string"`|string|

<a name="datasetviewresponse-filedescription"></a>
**fileDescription**

|Name|Description|Schema|
|---|---|---|
|**charset**  <br>*optional*|The character encoding of the files.  <br>**Example** : `"string"`|enum (US-ASCII, UTF-8, ISO-8859-1, )|
|**containerFormat**  <br>*optional*|The Container format for all dataSetFiles associated with this view.  <br>**Example** : `"string"`|enum (text, sequence, parquet)|
|**delimiters**  <br>*optional*|Characters used to separate fields.  <br>**Example** : `[ "string" ]`|< string > array|
|**escapes**  <br>*optional*|**Example** : `[ "string" ]`|< string > array|
|**format**  <br>*optional*|The file format for all dataSetFiles associated with this view.  <br>**Example** : `"string"`|enum (, csv, text, parquet, json, sequencefile)|
|**header**  <br>*optional*|**Example** : `true`|boolean|
|**nullMarkers**  <br>*optional*|**Example** : `[ "string" ]`|< string > array|
|**persisted**  <br>*optional*|Determines whether or not we are persisting the view to disk.  If this is false then the other fields in this object are redundant, but may be used for identifying old data that was persisted previously.  <br>**Example** : `true`|boolean|
|**quotes**  <br>*optional*|**Example** : `[ "string" ]`|< string > array|



