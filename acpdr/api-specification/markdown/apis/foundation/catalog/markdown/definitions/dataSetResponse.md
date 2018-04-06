
<a name="datasetresponse"></a>
### dataSetResponse

|Name|Description|Schema|
|---|---|---|
|**aspect**  <br>*optional*|Aspect represents the particular perspective or target you're after when viewing a dataset. Sandbox views are a version of the dataset that's being used to iterate towards a final ETL job definition. The production aspect is then used (by default).  <br>**Example** : `"string"`|enum (production, sandbox)|
|**basePath**  <br>*optional*  <br>*read-only*|Fully qualified base path for all DataSetFiles associated with this view. For views cached in a database (HBase or Cassandra), supply a templatized DSN.  <br>**Example** : `"string"`|string|
|**connectionId**  <br>*optional*|Foreign key to the Connection this DataSet originates from.  <br>**Example** : `"string"`|string|
|**connectorId**  <br>*optional*|Foreign key to the Connector this DataSet originates from. Template DataSets are tied to Connectors and not Connections.  <br>**Example** : `"string"`|string|
|**created**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) when this DataSet was persisted.  <br>**Example** : `0`|integer (int64)|
|**createdClient**  <br>*optional*  <br>*read-only*|The ID of the IMS client that created this Batch.  <br>**Example** : `"string"`|string|
|**createdUser**  <br>*optional*  <br>*read-only*|The ID of the user who created this object.  <br>**Example** : `"string"`|string|
|**dataSourceId**  <br>*optional*|The Id of the datasource. It must be unique, along with it's name.  <br>**Example** : `0`|integer|
|**dependencies**  <br>*optional*|An array of dependency objects. If a DataSetView is referenced in a transform, data about that linkage should be found in this array.  <br>**Example** : `[ "[dependencies](#dependencies)" ]`|< [dependencies](dependencies.md#dependencies) > array|
|**description**  <br>*optional*|A longer text description of the DataSet.  <br>**Example** : `"string"`|string|
|**dule**  <br>*optional*|DULE labels.  <br>**Example** : `"object"`|[dule](#datasetresponse-dule)|
|**editable**  <br>*optional*|Determines whether or not this DataSetView definition should be editable by the user.  Some documents are 'locked' and not available for edit.  <br>**Example** : `true`|boolean|
|**fields**  <br>*optional*|Ordered array of fields describing the resulting schema (output) for this view.  <br>**Example** : `[ "[field](#field)" ]`|< [field](field.md#field) > array|
|**fileDescription**  <br>*optional*|Metadata describing the DataSetFiles associated with this DataSetView.  <br>**Example** : `"object"`|[fileDescription](#datasetresponse-filedescription)|
|**files**  <br>*optional*|Associated files for given dataset in following string format dataSets/{dataSetId}/views/{dataSetViewId}/files By using query param 'expansion=files', this object can be requested as part of response.  <br>**Example** : `"string"`|string|
|**imsOrg**  <br>*optional*|The owning IMS organization identifier.  <br>**Example** : `"string"`|string|
|**lastBatchId**  <br>*optional*|ID of the last batch that modified the data set.  <br>**Example** : `"string"`|string|
|**lastBatchStatus**  <br>*optional*|status of the last batch that modified the data set.  <br>**Example** : `"string"`|enum (processing, success, failure, queued, retrying, stalled, aborted, abandoned)|
|**lastFailedBatch**  <br>*optional*|The ID of the last failed batch that has modified this data set.  <br>**Example** : `"string"`|string|
|**lastSuccessfulBatch**  <br>*optional*|The ID of the last successful batch that has modified this data set.  <br>**Example** : `"string"`|string|
|**name**  <br>*optional*|A descriptive, human-readable name for this DataSet.  <br>**Example** : `"string"`|string|
|**namespace**  <br>*optional*|One of the registered platform acronyms that identify the platform.  <br>**Example** : `"string"`|enum (AA, AAM, AEM, AC, AT, AMO, PT, AS, AMC, ACP)|
|**observableSchema**  <br>*optional*|observableSchema stores a JSON Schema object that is a valid subset (including the null case) of the XDM model specified by `schema`.  <br>**Example** : `"object"`|object|
|**partitions**  <br>*optional*|**Example** : `[ "string" ]`|< string > array|
|**requestStartDate**  <br>*optional*|The oldest date and the time, when the data was last ingested  <br>**Example** : `"string"`|string|
|**saveStrategy**  <br>*optional*|Denotes save strategy for this dataset.  <br>**Example** : `"string"`|enum (append, overwrite, delta)|
|**schema**  <br>*optional*|This is the uri for the XDM model  <br>**Example** : `"string"`|string|
|**statsCache**  <br>*optional*|Cached statistics for this data set. These values cannot be submitted to Catalog.  <br>**Example** : `"object"`|[statsCache](#datasetresponse-statscache)|
|**status**  <br>*optional*|Describes the current state of the view.  If a view is not enabled, it should not be used by any process even when it is specified as a dependency. Only one view of a given aspect should be enabled at any time. For example, no DataSet should have more than one enabled production or sandbox view.  <br>**Example** : `"string"`|enum (enabled, disabled)|
|**tags**  <br>*optional*|Tags are values associated with a particular object,  these are generally used by external systems for marking an object in a way that it understands.  Normally tags are not used for internal Catalog business logic  <br>**Example** : `{<br>  "string" : [ "string" ]<br>}`|< string, < string > array > map|
|**transforms**  <br>*optional*|Associated transforms for given dataset in following string format /dataSets/{dataSetId}/views/{dataSetViewId}/transforms By using query param 'expansion=transforms', this object can be requested as part of response.  <br>**Example** : `"string"`|string|
|**updated**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) for the time of last modification.  <br>**Example** : `0`|integer (int64)|
|**updatedUser**  <br>*optional*  <br>*read-only*|The ID of the user who changed this object.  <br>**Example** : `"string"`|string|
|**version**  <br>*optional*  <br>*read-only*|The Semantic version of the DataSet. Updated when the DataSet is modified.  <br>**Example** : `"string"`|string|
|**viewId**  <br>*optional*|The ID for associated DataSet view.  <br>**Example** : `"string"`|string|

<a name="datasetresponse-dule"></a>
**dule**

|Name|Description|Schema|
|---|---|---|
|**contracts**  <br>*optional*|What Contractual Considerations, if any, apply to this data?  <br>**Example** : `[ "string" ]`|< enum (C1, C2, C3, C4, C5, C6, C7, C8, C9, None) > array|
|**identifiability**  <br>*optional*|Should this data be treated as Indirectly Identifiable Data or Directly Identifiable Data? (What is the level of Identifiability?)  <br>**Example** : `[ "string" ]`|< enum (I1, I2) > array|
|**loginState**  <br>*optional*|What is the Log-in State?  <br>**Example** : `[ "string" ]`|< enum (Identified, Incognito, Ambiguous, Not Provided) > array|
|**other**  <br>*optional*|Other information that may govern the use of this data.  <br>**Example** : `"string"`|string|
|**specialTypes**  <br>*optional*|Is this a special data type? (Relative to a regulated industry, or distinct regulatory rules, e.g. GDPR Special data, health data, or Financial data)  <br>**Example** : `[ "string" ]`|< enum (S1, S2) > array|

<a name="datasetresponse-filedescription"></a>
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

<a name="datasetresponse-statscache"></a>
**statsCache**

|Name|Description|Schema|
|---|---|---|
|**endDate**  <br>*optional*|Unix timestamp indicating the end date of the data set.  <br>**Example** : `0`|integer (int64)|
|**failedRowCount**  <br>*optional*|Rows that failed processing.  <br>**Example** : `0`|integer (int64)|
|**rowCount**  <br>*optional*|Total number of rows processed in the data set.  <br>**Example** : `0`|integer (int64)|
|**startDate**  <br>*optional*|Unix timestamp indicating the start date of the data set.  <br>**Example** : `0`|integer (int64)|



