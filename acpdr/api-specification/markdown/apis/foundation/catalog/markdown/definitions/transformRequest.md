
<a name="transformrequest"></a>
### transformRequest

|Name|Description|Schema|
|---|---|---|
|**args**  <br>*optional*|Contains all arguments that are required to actually run Transform entity.  <br>**Example** : `[ "string" ]`|< string > array|
|**body**  <br>*optional*|Lines of script that make up the transformation/mapping logic for this Transform.  <br>**Example** : `"string"`|string|
|**codeUrl**  <br>*optional*|If the body of this transform is not used, it is expected that a URL pointing to the location of the code to be used for this transform is placed in this field.  <br>**Example** : `"string"`|string|
|**inputs**  <br>*optional*|Input array for dataSetIds  <br>**Example** : `[ "object" ]`|< [inputs](#transformrequest-inputs) > array|
|**language**  <br>*optional*|The type of language this transform's body contains.  <br>**Example** : `"string"`|enum (application/vnd.apache.spark-sql)|
|**name**  <br>*optional*|The human-readable name or title for this Transform.  <br>**Example** : `"string"`|string|
|**outputs**  <br>*optional*|Output array for dataSetIds  <br>**Example** : `[ "object" ]`|< [outputs](#transformrequest-outputs) > array|
|**vehicleUrl**  <br>*optional*|The URL of the vehicle that will orchestrate or otherwise run the code in this transform.  <br>**Example** : `"string"`|string|

<a name="transformrequest-inputs"></a>
**inputs**

|Name|Description|Schema|
|---|---|---|
|**dataSet**  <br>*optional*|**Example** : `"string"`|string|

<a name="transformrequest-outputs"></a>
**outputs**

|Name|Description|Schema|
|---|---|---|
|**dataSet**  <br>*optional*|**Example** : `"string"`|string|



