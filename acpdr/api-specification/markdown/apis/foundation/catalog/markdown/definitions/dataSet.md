
<a name="dataset"></a>
### dataSet

|Name|Description|Schema|
|---|---|---|
|**connectionId**  <br>*optional*|Foreign key to the Connection this DataSet originates from.  <br>**Example** : `"string"`|string|
|**connectorId**  <br>*optional*|Foreign key to the Connector this DataSet originates from. Template DataSets are tied to Connectors and not Connections.  <br>**Example** : `"string"`|string|
|**created**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) when this DataSet was persisted.  <br>**Example** : `0`|integer (int64)|
|**createdClient**  <br>*required*  <br>*read-only*|The ID of the IMS client that created this Batch.  <br>**Example** : `"string"`|string|
|**createdUser**  <br>*optional*  <br>*read-only*|The ID of the user who created this object.  <br>**Example** : `"string"`|string|
|**dataSourceId**  <br>*optional*|The Id of the datasource. It must be unique, along with it's name.  <br>**Example** : `0`|integer|
|**description**  <br>*optional*|A longer text description of the DataSet.  <br>**Example** : `"string"`|string|
|**dule**  <br>*optional*|DULE labels.  <br>**Example** : `"object"`|[dule](#dataset-dule)|
|**imsOrg**  <br>*required*|The owning IMS organization identifier.  <br>**Example** : `"string"`|string|
|**isPublic**  <br>*optional*|Marks this dataset as available for use (by UI) in lookup operations with datasets not in the current connection, or across customers.  <br>**Example** : `true`|boolean|
|**lastBatchId**  <br>*optional*|ID of the last batch that modified the data set.  <br>**Example** : `"string"`|string|
|**lastBatchStatus**  <br>*optional*|status of the last batch that modified the data set.  <br>**Example** : `"string"`|enum (processing, success, failure, queued, retrying, stalled, aborted, abandoned)|
|**lastFailedBatch**  <br>*optional*|The ID of the last failed batch that has modified this data set.  <br>**Example** : `"string"`|string|
|**lastSuccessfulBatch**  <br>*optional*|The ID of the last successful batch that has modified this data set.  <br>**Example** : `"string"`|string|
|**name**  <br>*required*|A descriptive, human-readable name for this DataSet.  <br>**Example** : `"string"`|string|
|**namespace**  <br>*optional*|One of the registered platform acronyms that identify the platform.  <br>**Example** : `"string"`|string|
|**statsCache**  <br>*optional*|Cached statistics for this data set. These values cannot be submitted to Catalog.  <br>**Example** : `"object"`|[statsCache](#dataset-statscache)|
|**tags**  <br>*optional*|Tags are values associated with a particular object,  these are generally used by external systems for marking an object in a way that it understands.  Normally tags are not used for internal Catalog business logic  <br>**Example** : `{<br>  "string" : [ "string" ]<br>}`|< string, < string > array > map|
|**updated**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) for the time of last modification.  <br>**Example** : `0`|integer (int64)|
|**updatedUser**  <br>*optional*  <br>*read-only*|The ID of the user who changed this object.  <br>**Example** : `"string"`|string|
|**version**  <br>*optional*  <br>*read-only*|The Semantic version of the DataSet. Updated when the DataSet is modified.  <br>**Example** : `"string"`|string|

<a name="dataset-dule"></a>
**dule**

|Name|Description|Schema|
|---|---|---|
|**contracts**  <br>*optional*|What Contractual Considerations, if any, apply to this data?  <br>**Example** : `[ "string" ]`|< enum (C1, C2, C3, C4, C5, C6, C7, C8, C9, None) > array|
|**identifiability**  <br>*optional*|Should this data be treated as Indirectly Identifiable Data or Directly Identifiable Data? (What is the level of Identifiability?)  <br>**Example** : `[ "string" ]`|< enum (I1, I2) > array|
|**loginState**  <br>*optional*|What is the Log-in State?  <br>**Example** : `[ "string" ]`|< enum (Identified, Incognito, Ambiguous, Not Provided) > array|
|**other**  <br>*optional*|Other information that may govern the use of this data.  <br>**Example** : `"string"`|string|
|**specialTypes**  <br>*optional*|Is this a special data type? (Relative to a regulated industry, or distinct regulatory rules, e.g. GDPR Special data, health data, or Financial data)  <br>**Example** : `[ "string" ]`|< enum (S1, S2) > array|

<a name="dataset-statscache"></a>
**statsCache**

|Name|Description|Schema|
|---|---|---|
|**endDate**  <br>*optional*|Unix timestamp indicating the end date of the data set.  <br>**Example** : `0`|integer (int64)|
|**failedRowCount**  <br>*optional*|Rows that failed processing.  <br>**Example** : `0`|integer (int64)|
|**rowCount**  <br>*optional*|Total number of rows processed in the data set.  <br>**Example** : `0`|integer (int64)|
|**startDate**  <br>*optional*|Unix timestamp indicating the start date of the data set.  <br>**Example** : `0`|integer (int64)|



