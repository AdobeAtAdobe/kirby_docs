
<a name="app"></a>
### App

|Name|Description|Schema|
|---|---|---|
|**createdAt**  <br>*required*|The DateTime when app was submitted  <br>**Example** : `"2017-09-07T18:17:19Z"`|string|
|**id**  <br>*required*|System generated App ID  <br>**Example** : `"98b8c5a6-15e0-4680-8852-1218866f759d"`|string|
|**message**  <br>*optional*|Message as retrieved from Marathon  <br>**Example** : `"Task ran successfully"`|string|
|**request**  <br>*required*|The App Request  <br>**Example** : `"[appdef](#appdef)"`|[AppDef](AppDef.md#appdef)|
|**status**  <br>*optional*|**Example** : `"string"`|enum (TASK_RUNNING, TASK_KILLED, TASK_STAGING, TASK_FINISHED, TASK_FAILED, TASK_UNKNOWN, TASK_STARTING, TASK_KILLING)|
|**tasks**  <br>*optional*|**Example** : `"[apptasks](#apptasks)"`|[AppTasks](AppTasks.md#apptasks)|
|**updatedAt**  <br>*required*|The DateTime when app was last updated  <br>**Example** : `"2017-09-07T18:17:19Z"`|string|
|**userId**  <br>*required*|The user who submitted the app  <br>**Example** : `"user1"`|string|



