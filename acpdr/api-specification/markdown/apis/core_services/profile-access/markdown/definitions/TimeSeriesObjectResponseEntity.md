
<a name="timeseriesobjectresponseentity"></a>
### TimeSeriesObjectResponseEntity
The XDM Model Object entity response, with current page information and next page link.


|Name|Description|Schema|
|---|---|---|
|**link**  <br>*optional*|The href links.  <br>**Example** : `"[link](#link)"`|[Link](Link.md#link)|
|**page**  <br>*optional*|The page information of the current response entity.  <br>**Example** : `"[page](#page)"`|[Page](Page.md#page)|
|**records**  <br>*optional*|The list of XDM Model object records.  <br>**Example** : `[ "[modelobjectentity](#modelobjectentity)" ]`|< [ModelObjectEntity](ModelObjectEntity.md#modelobjectentity) > array|



