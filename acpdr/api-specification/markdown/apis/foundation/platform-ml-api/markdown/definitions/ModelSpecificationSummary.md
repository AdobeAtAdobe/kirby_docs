
<a name="modelspecificationsummary"></a>
### ModelSpecificationSummary

|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#modelspecificationsummary-links)|
|**additionalDocumentation**  <br>*optional*|**Example** : `"string"`|string|
|**config**  <br>*optional*|**Example** : `{<br>  "string" : "object"<br>}`|< string, object > map|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#modelspecificationsummary-createdby)|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (uuid)|
|**imageUrl**  <br>*optional*|Url of the thumbnail image  <br>**Example** : `"string"`|string|
|**modelType**  <br>*required*|**Example** : `"string"`|string|
|**name**  <br>*required*|**Example** : `"string"`|string|
|**tags**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**type**  <br>*optional*|**Example** : `"string"`|string|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="modelspecificationsummary-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="modelspecificationsummary-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|



