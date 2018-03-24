
<a name="uploadfile"></a>
### Upload file to a dataset in a batch
```
POST /batches/{batchId}/datasets/{datasetId}/files
```


#### Description
For a batch initialized by the bulk ingestion api, this endpoint lets you upload files under datasets. You can either upload the entire file in a single multipart request or upload the file in patches/parts using the resumable upload option. We have soft size limits enforced by the gateways which is why a file larger than 512MB can only be uploaded via the resumable option.
 To choose the resumable upload, you need to specify the query param uploadType=resumable and then use the file PATCH endpoint below to send the subsequent byte ranges


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The id of the ims organization associated with the batch|string|
|**Path**|**batchId**  <br>*required*|The id of the batch data is being uploaded to|string|
|**Path**|**datasetId**  <br>*required*|The id of the dataset data is being uploaded to|string|
|**Query**|**uploadType**  <br>*required*|The optional uploadType with the only supported value being 'resumable'. By default, the files are uploaded in a single multipart request but if the file is larger than 512MB, it needs to be sent in parts or 512MB or lesser as multiple requests|enum (resumable)|
|**FormData**|**file**  <br>*required*|The content bytes for the file or file part being uploaded|file|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Created  <br>**Headers** :   <br>`Location` (string) : /batches/{batchId}/datasets/{datasetId}/files/{fileId}.|[File](../definitions/File.md#file)|
|**400**|Bad Request. The request is malformed.|No Content|
|**401**|Unauthorized. The IMS token provided is invalid.|No Content|
|**404**|Batch or DataSet resource not found.|No Content|
|**414**|URL length exceeds the allowed 2000 characters.|No Content|
|**415**|Unsupported Media Type. The uploaded file media isn't supported.|No Content|
|**500**|Internal server error.|No Content|
|**503**|Service Unavailable. The bulk ingest api or dependency is unavailable.|No Content|


#### Consumes

* `multipart/form-data`


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
/batches/string/datasets/string/files
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
  "uploadType" : "string"
}
```


##### Request formData
```
json :
"file"
```


#### Example HTTP response

##### Response 201
```
json :
{
  "name" : "string",
  "sizeInBytes" : 0
}
```



