
<a name="uploadfilepart"></a>
### Upload file part to a resumable file being uploaded to a batch dataset
```
PATCH /batches/{batchId}/datasets/{datasetId}/files/{fileId}
```


#### Description
Files larger than 512MB are uploaded in parts and this PATCH endpoint provides you a way to upload a part of your large file that was initialized via the POST endpoint above


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Content-Range**  <br>*required*|The range of bytes of the file being uploaded with this request|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The id of the ims organization associated with the batch|string|
|**Path**|**batchId**  <br>*required*|The id of the batch data is being uploaded to|string|
|**Path**|**datasetId**  <br>*required*|The id of the dataset data is being uploaded to|string|
|**Path**|**fileId**  <br>*required*|The id of the file the file part is being uploaded for|string|
|**FormData**|**file**  <br>*required*|The content bytes for the file or file part being uploaded|file|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation  <br>**Headers** :   <br>`Range` (string) : bytes 0-512000000.|[File](../definitions/File.md#file)|
|**400**|Bad Request. The request is malformed.|No Content|
|**401**|Unauthorized. The IMS token provided is invalid.|No Content|
|**404**|Batch or DataSet or File resource not found.|No Content|
|**414**|URL length exceeds the allowed 2000 characters.|No Content|
|**415**|Unsupported Media Type. The uploaded file media isn't supported.|No Content|
|**500**|Internal server error.|No Content|
|**503**|Service Unavailable. The bulk ingest api or dependency is unavailable.|No Content|


#### Consumes

* `multipart/form-data`


#### Tags

* Ingest Batch


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/batches/string/datasets/string/files/string
```


##### Request header
```
json :
"string"
```


##### Request formData
```
json :
"file"
```


#### Example HTTP response

##### Response 200
```
json :
{
  "name" : "string",
  "sizeInBytes" : 0
}
```



