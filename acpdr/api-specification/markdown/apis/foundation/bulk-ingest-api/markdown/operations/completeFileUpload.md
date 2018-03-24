
<a name="completefileupload"></a>
### Operate on the identified file
```
POST /batches/{batchId}/datasets/{datasetId}/files/{fileId}
```


#### Description
Used to signal completion of the file that's uploaded in parts


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The id of the ims organization associated with the batch|string|
|**Path**|**batchId**  <br>*required*|The id of the batch data is being uploaded to|string|
|**Path**|**datasetId**  <br>*required*|The id of the dataset data is being uploaded to|string|
|**Path**|**fileId**  <br>*required*|The id of the file the file part is being uploaded for|string|
|**Query**|**action**  <br>*required*|The action to perform on the file with the only supported value currently being COMPLETE|enum (COMPLETE)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[File](../definitions/File.md#file)|
|**400**|Bad Request. The request is malformed.|No Content|
|**401**|Unauthorized. The IMS token provided is invalid.|No Content|
|**404**|Batch or DataSet or File resource not found.|No Content|
|**414**|URL length exceeds the allowed 2000 characters.|No Content|
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


##### Request query
```
json :
{
  "action" : "string"
}
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



