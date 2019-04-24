
<a name="getjobfiles"></a>
### Retrieve or list files utility for GDPR
```
GET /data/privacy/gdpr/files/{jobId}
```


#### Description
Returns list of files uploaded for {jobId}


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|Bearer XXXXX|string|
|**Header**|**Content-Type**  <br>*required*|application/json|string|
|**Header**|**x-api-key**  <br>*required*|acp_XXX_XXXX, IMS Client id which is whitelisted and subscribed to consume services on adobe.io|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|XXXXX47E56F59C747FXXXXX@AdobeOrg|string|
|**Path**|**jobId**  <br>*required*|jobId to retrieve or list files|string|


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


##### Request header
```
json :
"string"
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



