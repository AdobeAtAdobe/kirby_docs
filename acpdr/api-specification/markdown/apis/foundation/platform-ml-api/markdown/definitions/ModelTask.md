
<a name="modeltask"></a>
### ModelTask
*Polymorphism* : Composition


|Name|Description|Schema|
|---|---|---|
|**attributes**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#modeltask-createdby)|
|**eta**  <br>*optional*  <br>*read-only*|**Example** : `0.0`|number|
|**id**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (uuid)|
|**materializedConfigs**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**name**  <br>*optional*|**Example** : `"string"`|string|
|**startTime**  <br>*optional*  <br>*read-only*|**Example** : `0`|integer (int64)|
|**status**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|enum (pending, running, terminated, failed)|
|**taskLogs**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string|
|**type**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="modeltask-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|



