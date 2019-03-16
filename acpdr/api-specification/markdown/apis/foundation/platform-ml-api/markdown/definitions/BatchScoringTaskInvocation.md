
<a name="batchscoringtaskinvocation"></a>
### BatchScoringTaskInvocation
*Polymorphism* : Inheritance  
*Discriminator* : type


|Name|Description|Schema|
|---|---|---|
|**created**  <br>*optional*|**Example** : `"string"`|string (date-time)|
|**id**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (uuid)|
|**modelInstanceId**  <br>*optional*|**Example** : `"string"`|string (uuid)|
|**modelInstanceQuery**  <br>*optional*|**Example** : `"string"`|string|
|**name**  <br>*optional*|**Example** : `"string"`|string|
|**schedule**  <br>*optional*|**Example** : `"object"`|[schedule](#batchscoringtaskinvocation-schedule)|
|**trainedModelId**  <br>*optional*|**Example** : `"string"`|string (uuid)|
|**trainedModelQuery**  <br>*optional*|**Example** : `"string"`|string|
|**type**  <br>*required*|**Example** : `"string"`|string|
|**updated**  <br>*optional*|**Example** : `"string"`|string (date-time)|

<a name="batchscoringtaskinvocation-schedule"></a>
**schedule**

|Name|Description|Schema|
|---|---|---|
|**delay**  <br>*optional*|Amount of time, in milliseconds, before starting the job  <br>**Example** : `0`|integer (int64)|
|**startTime**  <br>*optional*|Time the job should start, epoch timestamp in milliseconds1  <br>**Example** : `0`|integer (int64)|



