
<a name="postsegmentjobroute"></a>
### Posts a Profile Segment Job
```
POST /jobs
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|


#### Body parameter
type - This is the type of the segment job. It can take values BATCH/STREAMING. This field is an optional field. In case nothing is provided, type is considered to be BATCH

predicateIds - The comma separated list of predicate ids. These predicate ids are created when a new predicate is created using Predicates API. This is also an optional field. If this is not provided predicates field needs to be present.

predicates - The comma separated list of predicates. This is also an optional field. If this is not provided predicateIds field needs to be present.

model - This is the name of the model where the result of the query will be saved

dataStart - Start timestamp to process to evaluate this predicate if XDM Model Object contains time series events also. If this attribute is missing, this job would consider the data Unified Profile Service has from the intital timestamp of the data.

dataEnd - End timestamp to process to evaluate this predicate if XDM Model Object contains time series events also. If this attribute is missing, this job would consider the data Unified Profile Service has till the time of execution of the job.

dataGraphType - Graph Type you want to get the cluster from. Possible values are (coop - graph built by using coop data, pdg - private device graph, psr - propriatery stiched rules)

sink - sink is where results of segmentation job is published as and when they are computed. This is comma separated list of the locations of the fields in the profile store which need to be updated with the segmentation result. There needs to exactly one entry per predicate in this list.

*Name* : body  
*Flags* : required  
*Type* : [SegmentJobEntityRequest](../definitions/SegmentJobEntityRequest.md#segmentjobentityrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Profile Segment Job successfully Posted  <br>**Headers** :   <br>`X-Location` (string) : HRef to the Profile Segment Job.|[SegmentJobResponse](../definitions/SegmentJobResponse.md#segmentjobresponse)|
|**403**|Forbidden|No Content|
|**422**|Profile Segment Job already exists. Please do patch to update.|No Content|
|**503**|Service Unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* segmentjobs


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


##### Request body
```
json :
{
  "type" : "string",
  "predicateIds" : "string",
  "predicates" : "string",
  "model" : "string",
  "dataStart" : "string",
  "dataEnd" : "string",
  "dataGraphType" : "string",
  "sink" : "string"
}
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
    "dataGraphType" : "string",
    "sink" : "string",
    "mergeStrategy" : "string",
    "creationTime" : "string",
    "updateTime" : "string"
  }
}
```



