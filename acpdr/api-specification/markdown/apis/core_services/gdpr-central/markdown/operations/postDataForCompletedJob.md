
<a name="postdataforcompletedjob"></a>
### Files upload utility for GDPR
```
POST /data/privacy/gdpr/files/{jobId}/{solutionName}
```


#### Description
Returns File upload status and error object


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Path**|**jobId**  <br>*required*|string|
|**Path**|**solutionName**  <br>*required*|string|


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : string


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


##### Request body
```
json :
{ }
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



