
<a name="healthcheck"></a>
### HealthCheck

|Name|Description|Schema|
|---|---|---|
|**delaySeconds**  <br>*optional*|(Optional. Default: 15): Delay to be applied for the health check.  <br>**Example** : `15`|integer (int32)|
|**gracePeriodSeconds**  <br>*optional*|(Optional. Default: 300): Health check failures are ignored within this number of seconds or until the task becomes healthy for the first time.  <br>**Example** : `300`|integer (int32)|
|**ignoreHttp1xx**  <br>*optional*|(Optional. Default: false): Ignore HTTP informational status codes 100 to 199  <br>**Example** : `false`|boolean|
|**intervalSeconds**  <br>*optional*|(Optional. Default: 60): Number of seconds to wait between health checks.  <br>**Example** : `60`|integer (int32)|
|**maxConsecutiveFailures**  <br>*optional*|(Optional. Default: 3): Number of consecutive health check failures after which the unhealthy task should be killed  <br>**Example** : `3`|integer (int32)|
|**path**  <br>*optional*|(Optional. Default: “/health”): Path to endpoint exposed by the task that will provide health status  <br>**Example** : `"/path/to/health"`|string|
|**protocol**  <br>*optional*|(Optional. Default: “HTTP”): Protocol to be used for health check  <br>**Example** : `"HTTP"`|string|
|**timeoutSeconds**  <br>*optional*|(Optional. Default: 20): Number of seconds after which a health check is considered a failure regardless of the response.  <br>**Example** : `20`|integer (int32)|



