
<a name="get-dataset-file-data"></a>
### Download a file
```
GET /files/{dataSetFileId}
```


#### Description
Returns complete or chunked data for a particular file.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Range**  <br>*optional*|Range of bytes requested. E.g, Range: bytes=0-100000|string|
|**Header**|**x-api-key**  <br>*required*|API key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|Ims Org Identifier|string|
|**Path**|**dataSetFileId**  <br>*required*|File Identifier|string|
|**Query**|**limit**  <br>*optional*|Paging parameter to specify number of results per page. E.g, limit=10|integer|
|**Query**|**path**  <br>*optional*|Name of file under partition identified by File Identifier. The file would be downloaded if path is provided. Otherwise, it lists all the files under the direcotry.|string|
|**Query**|**start**  <br>*optional*|Paging parameter to specify start of new page. E.g, start=fileName.csv|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[files](../definitions/files.md#files)|
|**206**|Partial Content  <br>**Headers** :   <br>`Content-Range` (string) : Range of bytes sent by the server. Can be different from what user requested. E.g, Content-Range: bytes 0-100/124000.  <br>`Content-Length` (integer) : Size of payload (bytes) in the response.|No Content|
|**401**|Unauthorized|No Content|
|**404**|Not Found|No Content|
|**500**|Internal Server Error|No Content|


#### Produces

* `application/json`
* `application/octet-stream`


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
  "limit" : 0,
  "path" : "string",
  "start" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "data" : [ {
    "name" : "string",
    "length" : "string",
    "_links" : {
      "self" : {
        "href" : "string"
      }
    }
  } ],
  "_page" : {
    "limit" : 0,
    "count" : 0
  },
  "_links" : {
    "next" : {
      "href" : "string"
    },
    "page" : {
      "href" : "string",
      "templated" : true
    }
  }
}
```



