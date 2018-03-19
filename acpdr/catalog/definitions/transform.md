
<a name="transform"></a>
### transform

|Name|Description|Schema|
|---|---|---|
|**args**  <br>*optional*|Contains all arguments that are required to actually run Transform entity.  <br>**Example** : `[ "string" ]`|< string > array|
|**body**  <br>*optional*|Lines of script that make up the transformation/mapping logic for this Transform.  <br>**Example** : `"string"`|string|
|**codeUrl**  <br>*optional*|If the body of this transform is not used, it is expected that a URL pointing to the location of the code to be used for this transform is placed in this field.  <br>**Example** : `"string"`|string|
|**created**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) when this DataSetView was persisted.  <br>**Example** : `0`|integer (int64)|
|**createdClient**  <br>*optional*  <br>*read-only*|The ID of the IMS client that created this Batch.  <br>**Example** : `"string"`|string|
|**createdUser**  <br>*optional*  <br>*read-only*|The ID of the user who created this object.  <br>**Example** : `"string"`|string|
|**dataSetId**  <br>*optional*|The ID of the dataSet.  <br>**Example** : `"string"`|string|
|**imsOrg**  <br>*required*|The owning IMS organization identifier.  <br>**Example** : `"string"`|string|
|**inputs**  <br>*optional*|Input array for dataSetIds  <br>**Example** : `[ "object" ]`|< [inputs](#transform-inputs) > array|
|**language**  <br>*optional*|The type of language this transform's body contains.  <br>**Example** : `"string"`|enum (application/vnd.apache.spark-sql)|
|**name**  <br>*optional*|The human-readable name or title for this Transform.  <br>**Example** : `"string"`|string|
|**outputs**  <br>*optional*|Output array for dataSetIds  <br>**Example** : `[ "object" ]`|< [outputs](#transform-outputs) > array|
|**updated**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) for the time of last modification.  <br>**Example** : `0`|integer (int64)|
|**updatedUser**  <br>*optional*  <br>*read-only*|The ID of the user who changed this object.  <br>**Example** : `"string"`|string|
|**vehicleUrl**  <br>*optional*|The URL of the vehicle that will orchestrate or otherwise run the code in this transform.  <br>**Example** : `"string"`|string|
|**version**  <br>*optional*  <br>*read-only*|The Semantic version of the Transform. Updated when the Transform is modified.  <br>**Example** : `"string"`|string|

<a name="transform-inputs"></a>
**inputs**

|Name|Description|Schema|
|---|---|---|
|**dataSet**  <br>*optional*|**Example** : `"string"`|string|

<a name="transform-outputs"></a>
**outputs**

|Name|Description|Schema|
|---|---|---|
|**dataSet**  <br>*optional*|**Example** : `"string"`|string|



