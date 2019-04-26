
<a name="getscanjobroute"></a>
### Returns the Profile Scan Job
```
GET /models/{model}/jobs/{scanJobId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**model**  <br>*required*|Model Name|string|
|**Path**|**scanJobId**  <br>*required*|Scan Job Id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Profile Scan Job successfully Returned|[ScanJobResponse](../definitions/ScanJobResponse.md#scanjobresponse)|
|**403**|Forbidden|No Content|
|**404**|Profile Scan Job not found|No Content|
|**503**|Service Unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* models


#### Example HTTP request

##### Request path
```
/models/profile/jobs/12345678
```


##### Request header
```
json :
"southwest@adobe.com"
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



