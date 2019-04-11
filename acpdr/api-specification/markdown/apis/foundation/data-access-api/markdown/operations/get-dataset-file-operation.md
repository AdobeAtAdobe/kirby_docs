
<a name="get-dataset-file-operation"></a>
### Gets headers in response signifying what is allowed on this file
```
HEAD /files/{dataSetFileId}
```


#### Description
Gets headers in response signifying what is allowed on this file


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|API key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|Ims Org Identifier|string|
|**Path**|**dataSetFileId**  <br>*required*|File Identifier|string|
|**Query**|**path**  <br>*required*|Name of file under partition identified by File Identifier|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK  <br>**Headers** :   <br>`Content-type` (string) : application/json.  <br>`Accept-Ranges` (string) : Unit of Range E.g, bytes.  <br>`Content-Length` (integer) : Size of payload (bytes) in the response.|No Content|
|**401**|Unauthorized|No Content|
|**404**|Not Found|No Content|
|**500**|Internal Server Error|No Content|


#### Tags

* dataAccess


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/files/string
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
  "path" : "string"
}
```



