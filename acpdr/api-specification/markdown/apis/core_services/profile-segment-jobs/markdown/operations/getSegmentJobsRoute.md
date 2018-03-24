
<a name="getsegmentjobsroute"></a>
### Get list of all Profile segment jobs
```
GET /jobs
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Query**|**limit**  <br>*optional*|Page Size|integer|
|**Query**|**start**  <br>*optional*|Page Offset - As per created Time of resource|integer (int64)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of Profile segment jobs returned|[SegmentJobsResponse](../definitions/SegmentJobsResponse.md#segmentjobsresponse)|
|**403**|Forbidden|No Content|
|**503**|Service Unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* jobs


#### Example HTTP request

##### Request path
```
/jobs
```


##### Request header
```
json :
"southwest@adobe.com"
```


##### Request query
```
json :
{
  "limit" : 10,
  "start" : 109103839
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "status" : true,
  "segmentJobs" : [ {
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
    "dataGraphType" : "string",
    "sink" : "string",
    "mergeStrategy" : "string",
    "creationTime" : "string",
    "updateTime" : "string"
  } ]
}
```



