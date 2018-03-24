
<a name="getpreview"></a>
### Generates preview for a batch
```
GET /batches/{batchId}/datasets/{datasetId}/preview
```


#### Description
Generates data preview for the files uploaded to the batch so far. The preview could be generated for all the batch datasets collectively or per selected datasets


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The id of the ims organization associated with the batch|string||
|**Path**|**batchId**  <br>*required*|The id of the batch data is being uploaded to|string||
|**Path**|**datasetId**  <br>*required*|The id of the dataset data is being uploaded to|string||
|**Query**|**charset**  <br>*optional*|The encoding to use for parsing|string|`"UTF-8"`|
|**Query**|**delimiter**  <br>*optional*|The delimiter to use for parsing column values|string|`","`|
|**Query**|**escape**  <br>*optional*|The escape character to use while parsing|string|`"\\"`|
|**Query**|**format**  <br>*required*|The file format for the uploaded file|string||
|**Query**|**header**  <br>*optional*|The flag to indicate if the header is supplied in the dataset files. Currently headerless files aren't supported and the header flag should always be true. This is kept for future implementation|boolean|`"true"`|
|**Query**|**nrow**  <br>*optional*|The number of rows to parse|integer (int32)|`0`|
|**Query**|**quote**  <br>*optional*|The quote value to use while parsing|string|`"\""`|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[PreviewResponse](../definitions/PreviewResponse.md#previewresponse)|
|**400**|Bad Request. The request is malformed.|No Content|
|**401**|Unauthorized. The IMS token provided is invalid.|No Content|
|**404**|Batch or DataSet resource not found.|No Content|
|**414**|URL length exceeds the allowed 2000 characters.|No Content|
|**415**|Unsupported Media Type. The uploaded file media isn't supported.|No Content|
|**500**|Internal server error.|No Content|
|**503**|Service Unavailable. The bulk ingest api or dependency is unavailable.|No Content|


#### Produces

* `application/json`


#### Tags

* Ingest Batch


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/batches/string/datasets/string/preview
```


##### Request header
```
json :
"string"
```


##### Request query
```
json :
{
  "charset" : "string",
  "delimiter" : "string",
  "escape" : "string",
  "format" : "string",
  "header" : true,
  "nrow" : 0,
  "quote" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "formatParams" : {
    "delimiter" : "string",
    "quote" : "string",
    "escape" : "string",
    "charset" : "string",
    "header" : true,
    "format" : "string"
  },
  "preview" : {
    "columns" : [ {
      "cid" : "string",
      "name" : "string"
    } ],
    "rows" : [ "object" ]
  }
}
```



