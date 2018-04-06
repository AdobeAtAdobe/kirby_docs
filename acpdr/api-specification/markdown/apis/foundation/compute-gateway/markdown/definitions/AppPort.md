
<a name="appport"></a>
### AppPort

|Name|Description|Schema|
|---|---|---|
|**healthCheck**  <br>*optional*|Indicates a custom health check.There should only be 1 health check defined  <br>**Example** : `"[healthcheck](#healthcheck)"`|[HealthCheck](HealthCheck.md#healthcheck)|
|**name**  <br>*optional*|Indicates name to be given to the port  <br>**Example** : `"http port"`|string|
|**port**  <br>*required*|The port number to be used for this port.Specifying port=0 indicates value should be assigned dynamically  <br>**Example** : `0`|integer (int32)|
|**sparkUI**  <br>*optional*|Indicates if this port should be used for the spark-ui  <br>**Example** : `true`|boolean|



