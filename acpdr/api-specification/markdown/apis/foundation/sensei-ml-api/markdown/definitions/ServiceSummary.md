
<a name="servicesummary"></a>
### ServiceSummary

|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#servicesummary-links)|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#servicesummary-createdby)|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*optional*|**Example** : `"string"`|string|
|**mlInstanceId**  <br>*optional*|**Example** : `"string"`|string|
|**modelId**  <br>*required*|**Example** : `"string"`|string|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="servicesummary-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="servicesummary-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|



