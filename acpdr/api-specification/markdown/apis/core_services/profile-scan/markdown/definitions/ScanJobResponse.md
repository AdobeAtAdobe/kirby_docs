
<a name="scanjobresponse"></a>
### ScanJobResponse
The information after submitting a scan job eg. job id.


|Name|Description|Schema|
|---|---|---|
|**batchId**  <br>*optional*|Output catalog batch id which contains data- only available when job is success  <br>**Example** : `"string"`|string|
|**creationTime**  <br>*optional*|The creation time of the job.  <br>**Example** : `"string"`|string (date-time)|
|**datasetId**  <br>*optional*|Dataset id provided for the scan job.  <br>**Example** : `"string"`|string|
|**id**  <br>*optional*|Id of the scan job  <br>**Example** : `0.0`|number|
|**imsOrgId**  <br>*optional*|ImsOrgId provided.  <br>**Example** : `"string"`|string|
|**isMemberOfAudience**  <br>*optional*|Output field name of audience that you applied during the batch segmentation job.  <br>**Example** : `"string"`|string|
|**jobType**  <br>*optional*|Job type: batch or streaming.  <br>**Example** : `"string"`|string|
|**status**  <br>*optional*|NEW/PROCESSING/SUCCEEDED/FAILED.  <br>**Example** : `"string"`|string|
|**updateTime**  <br>*optional*|The updated time for the job.  <br>**Example** : `"string"`|string (date-time)|



