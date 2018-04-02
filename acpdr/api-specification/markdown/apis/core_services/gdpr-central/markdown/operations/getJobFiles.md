
<a name="getjobfiles"></a>
### Retrieve or list files utility for GDPR
```
GET /data/privacy/gdpr/files/{jobId}
```


#### Description
Returns list of files uploaded for {jobId}


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Path**|**jobId**  <br>*required*|string|


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
|**200**|Successful list of files|[FileResponse](../definitions/FileResponse.md#fileresponse)|
|**417**|Expectation Failed!! Validation failed|No Content|
|**500**|Internal server error|No Content|
|**503**|Exception Occurred!!|No Content|


#### Tags

* GDPR Files Management Service


#### Example HTTP request

##### Request path
```
/data/privacy/gdpr/files/string
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



