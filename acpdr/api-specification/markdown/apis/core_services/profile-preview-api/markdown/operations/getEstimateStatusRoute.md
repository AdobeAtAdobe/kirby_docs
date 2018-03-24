
<a name="getestimatestatusroute"></a>
### Gets result of the Estimate Job. Updated every 5 Seconds as the Job is running.
```
GET /estimate/{previewQueryId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**previewQueryId**  <br>*required*|Preview Job Id.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Estimate Successfully retrieved.|[EstimateResponse](../definitions/EstimateResponse.md#estimateresponse)|
|**403**|You are forbidden to make this request.|No Content|
|**404**|Preview jobId {jobId} does not exist.|No Content|
|**503**|Service unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* estimate


#### Example HTTP request

##### Request path
```
/estimate/123421
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
  "estimatedSize" : 0,
  "standardError" : 0,
  "confidenceInterval" : "string",
  "profilesReadSoFar" : 0,
  "profilesMatchedSoFar" : 0,
  "_links" : {
    "preview" : "string"
  }
}
```



