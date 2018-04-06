
<a name="datatype"></a>
### dataType

|Name|Description|Schema|
|---|---|---|
|**keyType**  <br>*optional*|required for type 'map'  <br>**Example** : `"string"`|enum (string, integer, long, double, boolean, date, byte, binary, float)|
|**precision**  <br>*optional*|required for type 'number'  <br>**Example** : `0.0`|number|
|**scale**  <br>*optional*|required for type 'number'  <br>**Example** : `0.0`|number|
|**subFields**  <br>*optional*|**Example** : `"[datatype](#datatype)"`|[dataType](dataType.md#datatype)|
|**subType**  <br>*optional*|**Example** : `"[datatype](#datatype)"`|[dataType](dataType.md#datatype)|
|**type**  <br>*optional*|**Example** : `"string"`|enum (string, integer, long, double, boolean, date, byte, binary, float, number, array, object, map)|
|**valueType**  <br>*optional*|**Example** : `"[datatype](#datatype)"`|[dataType](dataType.md#datatype)|



