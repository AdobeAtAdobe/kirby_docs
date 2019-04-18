
<a name="endcustomerentitypageresponse"></a>
### EndCustomerEntityPageResponse
The endcustomer entity response, with current page information and next page link.


|Name|Description|Schema|
|---|---|---|
|**link**  <br>*optional*|The href links.  <br>**Example** : `"[link](#link)"`|[Link](Link.md#link)|
|**page**  <br>*optional*|The page information of the current response entity.  <br>**Example** : `"[page](#page)"`|[Page](Page.md#page)|
|**results**  <br>*optional*|The list of endcustomer entities.  <br>**Example** : `[ "[previewsegmentswrapperresponse](#previewsegmentswrapperresponse)" ]`|< [PreviewSegmentsWrapperResponse](PreviewSegmentsWrapperResponse.md#previewsegmentswrapperresponse) > array|
|**state**  <br>*optional*|The execution State of the query  <br>**Example** : `"string"`|string|



