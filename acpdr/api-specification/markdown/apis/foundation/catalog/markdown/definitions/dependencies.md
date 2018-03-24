
<a name="dependencies"></a>
### dependencies

|Name|Description|Schema|
|---|---|---|
|**dataSetId**  <br>*optional*|The ID of the dataset this view is dependent upon.  <br>**Example** : `"string"`|string|
|**dataSetViewId**  <br>*optional*|The ID of the view this view is dependent upon.  <br>**Example** : `"string"`|string|
|**type**  <br>*optional*|The type dependency. Activity for views that generate rows needed to be incorporated, and Lookup for views that provide metadata-like lookups/additional columns.  <br>**Example** : `"string"`|enum (lookup, activity, snapshot-lookup, snapshot-activity)|



