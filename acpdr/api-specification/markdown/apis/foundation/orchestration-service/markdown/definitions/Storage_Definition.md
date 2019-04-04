
<a name="storage-definition"></a>
### Storage Definition

|Name|Description|Schema|
|---|---|---|
|**id**  <br>*required*|Empty or registered dataset id  <br>**Example** : `"string"`|string (uuid)|
|**mountPathEnvVar**  <br>*required*|Mount Path  <br>**Example** : `"string"`|string|
|**name**  <br>*required*|**Pattern** : `"^([^\\\"\\\\]*(\\\\\")*(\\\\\\\\)*)*$"`**Example** : `"string"`|string|
|**properties**  <br>*optional*|**Example** : `"[storage-properties](#storage-properties)"`|[Storage properties](Storage_properties.md#storage-properties)|
|**relativePath**  <br>*required*|Relative Path for data availability  <br>**Example** : `"string"`|string|
|**storageInGB**  <br>*required*|Storage Size IN GB  <br>**Example** : `0`|integer (int32)|
|**type**  <br>*required*|Type of Input like S3  <br>**Example** : `"string"`|string|



