
<a name="app"></a>
### App

|Name|Description|Schema|
|---|---|---|
|**createdAt**  <br>*optional*|The DateTime when app was submitted  <br>**Example** : `"2017-09-07T18:17:19Z"`|string|
|**id**  <br>*optional*|System generated App ID  <br>**Example** : `"98b8c5a6-15e0-4680-8852-1218866f759d"`|string|
|**message**  <br>*optional*|Message as retrieved from Marathon  <br>**Example** : `"Task ran successfully"`|string|
|**request**  <br>*optional*|The App Request  <br>**Example** : `"[streaming-application-request](#streaming-application-request)"`|[Streaming Application Request](Streaming_Application_Request.md#streaming-application-request)|
|**status**  <br>*optional*|**Example** : `"string"`|enum (TASK_RUNNING, TASK_KILLED, TASK_STAGING, TASK_FINISHED, TASK_FAILED, TASK_UNKNOWN)|
|**updatedAt**  <br>*optional*|The DateTime when app was last updated  <br>**Example** : `"2017-09-07T18:17:19Z"`|string|
|**userId**  <br>*optional*|The user who submitted the app  <br>**Example** : `"user1"`|string|



