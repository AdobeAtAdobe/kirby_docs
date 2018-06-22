
<a name="query_links"></a>
### query_links

|Name|Description|Schema|
|---|---|---|
|**cancel**  <br>*optional*|**Example** : `"object"`|[cancel](#query_links-cancel)|
|**created_dataset**  <br>*optional*|If this query is a CTAS query, we will expose the created dataset under this object.  <br>**Example** : `"object"`|[created_dataset](#query_links-created_dataset)|
|**referenced_datasets**  <br>*optional*|Datasets utilized by this query, if any. Note that these datasets are resolved when the query is in state IN_PROGRESS.  <br>**Example** : `[ "object" ]`|< [referenced_datasets](#query_links-referenced_datasets) > array|
|**soft_delete**  <br>*optional*|**Example** : `"object"`|[soft_delete](#query_links-soft_delete)|

<a name="query_links-cancel"></a>
**cancel**

|Name|Description|Schema|
|---|---|---|
|**body**  <br>*optional*|the JSON body to send.  <br>**Example** : `"string"`|string|
|**href**  <br>*optional*|URI to call to try to cancel this Query. Canceling a query only works if the query is state IN_PROGRESSS.  <br>**Example** : `"string"`|string|
|**method**  <br>*optional*|the HTTP method to use  <br>**Example** : `"string"`|string|

<a name="query_links-created_dataset"></a>
**created_dataset**

|Name|Description|Schema|
|---|---|---|
|**href**  <br>*optional*|Catalog owned URI related to this Dataset.  <br>**Example** : `"string"`|string|
|**name**  <br>*optional*|Name of the referenced Dataset.  <br>**Example** : `"string"`|string|

<a name="query_links-referenced_datasets"></a>
**referenced_datasets**

|Name|Description|Schema|
|---|---|---|
|**href**  <br>*optional*|Catalog owned URI related to this Dataset.  <br>**Example** : `"string"`|string|
|**name**  <br>*optional*|Name of the referenced Dataset.  <br>**Example** : `"string"`|string|

<a name="query_links-soft_delete"></a>
**soft_delete**

|Name|Description|Schema|
|---|---|---|
|**body**  <br>*optional*|the JSON body to send.  <br>**Example** : `"string"`|string|
|**href**  <br>*optional*|URI to call to soft delete this Query. Soft Deleting stops listing this query, but it does not delete it from the system.  <br>**Example** : `"string"`|string|
|**method**  <br>*optional*|the HTTP method to use  <br>**Example** : `"string"`|string|



