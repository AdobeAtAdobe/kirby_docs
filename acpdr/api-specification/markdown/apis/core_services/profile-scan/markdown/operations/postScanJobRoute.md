
<a name="postscanjobroute"></a>
### Posts a Profile Scan Job
```
POST /models/{model}/jobs
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**model**  <br>*required*|Model Name|string|


#### Body parameter
datasetId: Dataset ID

isMemberOfAudience -  Output field name of audience that you supplied during batch segmentation job

*Name* : body  
*Flags* : required  
*Type* : [ScanJobEntityRequest](../definitions/ScanJobEntityRequest.md#scanjobentityrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Profile Scan Job successfully Posted  <br>**Headers** :   <br>`X-Location` (string) : HRef to the Profile Scan Job.|[ScanJobResponse](../definitions/ScanJobResponse.md#scanjobresponse)|
|**403**|Forbidden|No Content|
|**422**|Profile Scan Job already exists. Please do patch to update.|No Content|
|**503**|Service Unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* models


#### Example HTTP request

##### Request path
```
/models/profile/jobs
```


##### Request header
```
json :
"southwest@adobe.com"
```


##### Request body
```
json :
{
  "datasetId" : "string",
  "isMemberOfAudience" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : 0.0,
  "datasetId" : "string",
  "isMemberOfAudience" : "string",
  "status" : "string",
  "batchId" : "string",
  "jobType" : "string",
  "imsOrgId" : "string",
  "creationTime" : "string",
  "updateTime" : "string"
}
```



