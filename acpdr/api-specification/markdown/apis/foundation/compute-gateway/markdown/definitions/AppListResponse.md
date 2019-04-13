
<a name="applistresponse"></a>
### AppListResponse

|Name|Description|Schema|
|---|---|---|
|**_page**  <br>*required*|Pagination details  <br>**Example** : `"[page](#page)"`|[Page](Page.md#page)|
|**next**  <br>*optional*|Url for next page, if exists  <br>**Example** : `"string"`|string|
|**result**  <br>*required*|List of fetched collection  <br>**Example** : `[ "[app](#app)" ]`|< [App](App.md#app) > array|



