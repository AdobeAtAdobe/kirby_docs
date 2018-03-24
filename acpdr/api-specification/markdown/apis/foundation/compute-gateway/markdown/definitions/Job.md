
<a name="job"></a>
### Job

|Name|Description|Schema|
|---|---|---|
|**clusterJobId**  <br>*optional*|Cluster generated job ID  <br>**Example** : `"driver-20170903072614-0099"`|string|
|**createdAt**  <br>*optional*|The DateTime when job was submitted  <br>**Example** : `"2017-09-07T18:17:19Z"`|string|
|**id**  <br>*optional*|System generated Job ID  <br>**Example** : `"98b8c5a6-15e0-4680-8852-1218866f759d"`|string|
|**message**  <br>*optional*|Message as retrieved from Spark  <br>**Example** : `"string"`|string|
|**request**  <br>*optional*|The Job Request  <br>**Example** : `"[job-request](#job-request)"`|[Job Request](Job_Request.md#job-request)|
|**status**  <br>*optional*|**Example** : `"string"`|enum (TASK_RUNNING, TASK_KILLED, TASK_STAGING, TASK_FINISHED, TASK_FAILED, TASK_UNKNOWN)|
|**updatedAt**  <br>*optional*|The DateTime when job was last updated  <br>**Example** : `"2017-09-07T18:17:19Z"`|string|
|**userId**  <br>*optional*|The user who submitted job  <br>**Example** : `"Compute@AdobeID"`|string|



