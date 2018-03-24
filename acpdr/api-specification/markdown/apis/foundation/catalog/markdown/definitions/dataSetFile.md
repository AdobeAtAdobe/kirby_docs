
<a name="datasetfile"></a>
### dataSetFile

|Name|Description|Schema|
|---|---|---|
|**availableDates**  <br>*optional*|**Example** : `"[availabledates](#availabledates)"`|[availableDates](availableDates.md#availabledates)|
|**batchId**  <br>*optional*|The ID of the Batch operation that created this DataSetFile.  <br>**Example** : `"string"`|string|
|**created**  <br>*optional*|The Unix timestamp (in milliseconds) when this DataSetFile was persisted.  <br>**Example** : `0`|integer (int64)|
|**createdClient**  <br>*optional*|The ID of the IMS client that created this Batch.  <br>**Example** : `"string"`|string|
|**createdUser**  <br>*optional*|The ID of the user who created this object.  <br>**Example** : `"string"`|string|
|**dataSetViewId**  <br>*optional*|The ID of the owning DataSetView.  <br>**Example** : `"string"`|string|
|**folderName**  <br>*optional*|The name of the folder as it resides in the basePath (provided from the DataSetView).  <br>**Example** : `"string"`|string|
|**imsOrg**  <br>*optional*|The owning IMS organization identifier. Pattern: ^[0-9A-Za-z]@[Aa]dobe[Oo]rg$  <br>**Example** : `"string"`|string|
|**isValid**  <br>*optional*|True if the file can still be used. False if the file was part of a batch that was mistakenly uploaded or incorrect, and should no longer be considered.  <br>**Example** : `true`|boolean|
|**records**  <br>*optional*|The number of records/rows/transactions contained in file represented by this DataSetFile.  <br>**Example** : `0`|integer (int64)|
|**sampleParent**  <br>*optional*|If this is a sample then this field contains the ID's of the DataSetFiles that it was generated from  <br>**Example** : `[ "string" ]`|< string > array|
|**size**  <br>*optional*|Size for the file in bytes.  <br>**Example** : `0`|integer (int64)|
|**updated**  <br>*optional*|The Unix timestamp (in milliseconds) of last modification.  <br>**Example** : `0`|integer (int64)|
|**updatedUser**  <br>*optional*|The ID of the user who changed this object.  <br>**Example** : `"string"`|string|
|**version**  <br>*optional*|The Semantic version of the DataSetFile. Updated when the DataSetFile is modified. Pattern: Pattern: ^[0-9]+\.[0-9]+\.[0-9]+((-[.0-9A-Za-z\-\+]+)\|(\+[.0-9A-Za-z\-\+]+))*$  <br>**Example** : `"string"`|string|



