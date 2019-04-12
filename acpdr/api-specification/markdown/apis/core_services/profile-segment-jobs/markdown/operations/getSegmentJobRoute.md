
<a name="getsegmentjobroute"></a>
### Returns the Profile Segment Job
```
GET /segment/jobs/{segmentJobId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**segmentJobId**  <br>*required*|Segment Job Id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Profile Segment Job successfully Returned|[SegmentJobResponse](../definitions/SegmentJobResponse.md#segmentjobresponse)|
|**403**|Forbidden|No Content|
|**404**|Profile Segment Job not found|No Content|
|**503**|Service Unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* segmentjobs


#### Example HTTP request

##### Request path
```
/segment/jobs/12345678
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
  "status" : true,
  "segmentJob" : {
    "id" : 0.0,
    "type" : "string",
    "imsOrgId" : "string",
    "status" : "string",
    "progress" : "string",
    "predicateIds" : "string",
    "predicates" : "string",
    "model" : "string",
    "computeJobId" : 0,
    "dataStart" : "string",
    "dataEnd" : "string",
    "graphType" : "string",
    "sink" : "string",
    "mergeStrategy" : "string",
    "creationTime" : "string",
    "updateTime" : "string"
  }
}
```



