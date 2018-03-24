
<a name="results"></a>
### results
query results.


|Name|Description|Schema|
|---|---|---|
|**_page**  <br>*optional*|**Example** : `"[page](#page)"`|[_page](page.md#page)|
|**data**  <br>*optional*|Array of rows  <br>**Example** : `[ "object" ]`|< < string, object > map > array|
|**schema**  <br>*optional*|Results Schema  <br>**Example** : `[ "object" ]`|< [schema](#results-schema) > array|

<a name="results-schema"></a>
**schema**

|Name|Description|Schema|
|---|---|---|
|**dule**  <br>*optional*|**Example** : `"[dule](#dule)"`|[dule](dule.md#dule)|
|**format**  <br>*optional*|conversion format  <br>**Example** : `"string"`|string|
|**label**  <br>*optional*|display name of the column  <br>**Example** : `"string"`|string|
|**name**  <br>*optional*|Name of the column  <br>**Example** : `"string"`|string|
|**type**  <br>*optional*|Data type of the column  <br>**Example** : `"string"`|enum (int, string)|



