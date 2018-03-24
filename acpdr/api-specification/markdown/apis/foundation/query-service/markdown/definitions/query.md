
<a name="query"></a>
### query
query, parameters and configuration.


|Name|Description|Schema|
|---|---|---|
|**config**  <br>*optional*|**Example** : `"object"`|[config](#query-config)|
|**export**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**parameters**  <br>*optional*|Array of query parameters  <br>**Example** : `[ "object" ]`|< [parameters](#query-parameters) > array|
|**sql**  <br>*optional*|**Example** : `"string"`|string|

<a name="query-config"></a>
**config**

|Name|Description|Schema|
|---|---|---|
|**debugLevel**  <br>*optional*|**Example** : `"string"`|string|
|**timeout**  <br>*optional*|**Example** : `0`|integer|

<a name="query-parameters"></a>
**parameters**

|Name|Description|Schema|
|---|---|---|
|**format**  <br>*optional*|conversion format  <br>**Example** : `"string"`|string|
|**name**  <br>*optional*|Name of the parameter  <br>**Example** : `"string"`|string|
|**type**  <br>*optional*|Data type of the parameter  <br>**Example** : `"string"`|enum (int, string)|
|**value**  <br>*optional*|Value of the parameter  <br>**Example** : `"string"`|string|



