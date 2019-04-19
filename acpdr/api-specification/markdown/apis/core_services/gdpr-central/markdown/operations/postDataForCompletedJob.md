
<a name="postdataforcompletedjob"></a>
### Files upload utility for GDPR
```
POST /data/privacy/gdpr/files/{jobId}/{solutionName}
```


#### Description
Returns File upload status and error object


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|Bearer XXXXX|string|
|**Header**|**Content-Type**  <br>*required*|application/json|string|
|**Header**|**x-api-key**  <br>*required*|acp_XXX_XXXX, IMS Client id which is whitelisted and subscribed to consume services on adobe.io|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|XXXXX47E56F59C747FXXXXX@AdobeOrg|string|
|**Path**|**jobId**  <br>*required*|jobId to upload the files|string|
|**Path**|**solutionName**  <br>*required*|SolutionName|string|
|**FormData**|**file**  <br>*optional*|file|file|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful upload of files|[FileResponse](../definitions/FileResponse.md#fileresponse)|
|**417**|Expectation Failed!! Validation failed|No Content|
|**500**|Internal server error|No Content|
|**503**|Exception Occurred!!|No Content|


#### Tags

* GDPR Files Management Service


#### Example HTTP request

##### Request path
```
/data/privacy/gdpr/files/string/string
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
  "files" : [ "string" ],
  "message" : "string"
}
```



