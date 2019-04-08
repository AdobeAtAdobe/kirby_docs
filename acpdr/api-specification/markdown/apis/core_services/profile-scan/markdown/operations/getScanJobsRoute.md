
<a name="getscanjobsroute"></a>
### Get list of all Profile scan jobs
```
GET /models/{model}/jobs
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**model**  <br>*required*|Model Name|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of Profile scan jobs returned|[ScanJobsResponse](../definitions/ScanJobsResponse.md#scanjobsresponse)|
|**403**|Forbidden|No Content|
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


#### Example HTTP response

##### Response 200
```
json :
{
  "scanJobs" : [ {
    "id" : 0.0,
    "type" : "string",
    "imsOrgId" : "string",
    "datasetId" : "string",
    "status" : "string",
    "model" : "string",
    "isMemberOfAudience" : "string",
    "batchId" : "string",
    "computeJobId1" : 0,
    "computeJobId1Status" : "string",
    "computeJobId1Meta" : "string",
    "computeJobId2" : 0,
    "computeJobId2Status" : "string",
    "computeJobId2Meta" : "string",
    "creationTime" : "string",
    "updateTime" : "string"
  } ]
}
```



