
<a name="experimenttemplate"></a>
### ExperimentTemplate

|Name|Description|Schema|
|---|---|---|
|**experimentRunId**  <br>*optional*|**Example** : `"string"`|string|
|**schedule**  <br>*optional*|**Example** : `"object"`|[schedule](#experimenttemplate-schedule)|
|**tasks**  <br>*optional*|**Example** : `"[mlinstancetasklist](#mlinstancetasklist)"`|[MLInstanceTaskList](MLInstanceTaskList.md#mlinstancetasklist)|

<a name="experimenttemplate-schedule"></a>
**schedule**

|Name|Description|Schema|
|---|---|---|
|**cron**  <br>*optional*|**Example** : `"string"`|string|
|**endTime**  <br>*optional*|**Example** : `"string"`|string (datetime)|
|**startTime**  <br>*optional*|**Example** : `"string"`|string (datetime)|



