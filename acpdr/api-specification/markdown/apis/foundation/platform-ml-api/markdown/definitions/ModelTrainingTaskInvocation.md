
<a name="modeltrainingtaskinvocation"></a>
### ModelTrainingTaskInvocation
*Polymorphism* : Inheritance  
*Discriminator* : type


|Name|Description|Schema|
|---|---|---|
|**created**  <br>*optional*|**Example** : `"string"`|string (date-time)|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (uuid)|
|**modelInstanceId**  <br>*optional*|**Example** : `"string"`|string (uuid)|
|**modelInstanceQuery**  <br>*optional*|**Example** : `"string"`|string|
|**name**  <br>*optional*|**Example** : `"string"`|string|
|**schedule**  <br>*optional*|**Example** : `"object"`|[schedule](#modeltrainingtaskinvocation-schedule)|
|**type**  <br>*required*|**Example** : `"string"`|string|
|**updated**  <br>*optional*|**Example** : `"string"`|string (date-time)|

<a name="modeltrainingtaskinvocation-schedule"></a>
**schedule**

|Name|Description|Schema|
|---|---|---|
|**delay**  <br>*optional*|Amount of time, in milliseconds, before starting the job  <br>**Example** : `0`|integer (int64)|
|**startTime**  <br>*optional*|Time the job should start, epoch timestamp in milliseconds  <br>**Example** : `0`|integer (int64)|



