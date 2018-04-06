
<a name="datasetfilerequest"></a>
### dataSetFileRequest

|Name|Description|Schema|
|---|---|---|
|**availableDates**  <br>*optional*|**Example** : `"[availabledates](#availabledates)"`|[availableDates](availableDates.md#availabledates)|
|**batchId**  <br>*optional*|The ID of the Batch operation that created this DataSetFile.  <br>**Example** : `"string"`|string|
|**dataSetViewId**  <br>*required*|The ID of the owning DataSetView.  <br>**Example** : `"string"`|string|
|**folderName**  <br>*optional*|The name of the folder as it resides in the basePath (provided from the DataSetView).  <br>**Example** : `"string"`|string|
|**isValid**  <br>*optional*|True if the file can still be used. False if the file was part of a batch that was mistakenly uploaded or incorrect, and should no longer be considered.  <br>**Example** : `true`|boolean|
|**records**  <br>*optional*|The number of records/rows/transactions contained in file represented by this DataSetFile.  <br>**Example** : `0`|integer (int64)|
|**sampleParent**  <br>*optional*|If this is a sample then this field contains the ID's of the DataSetFiles that it was generated from  <br>**Example** : `[ "string" ]`|< string > array|
|**size**  <br>*optional*|Size for the file in bytes.  <br>**Example** : `0`|integer (int64)|



