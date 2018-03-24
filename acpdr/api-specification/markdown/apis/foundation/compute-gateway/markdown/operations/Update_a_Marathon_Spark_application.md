
<a name="update-a-marathon-spark-application"></a>
### Update Marathon application
```
PUT /data/foundation/compute/apps/{appID}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**appID**  <br>*required*|App ID|string|


#### Body parameter
App Request

*Name* : body  
*Flags* : required  
*Type* : [Streaming Application Request](../definitions/Streaming_Application_Request.md#streaming-application-request)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**202**|Application successfully submitted for update|No Content|
|**401**|Unauthorized access|No Content|
|**404**|App does not exist|No Content|
|**414**|URI length exceeds 2000 characters limit|No Content|
|**422**|Input validation failure|No Content|
|**503**|Application creation failed|No Content|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Describes operations performed on Spark applications


#### Example HTTP request

##### Request path
```
/data/foundation/compute/apps/4b3c4fae-212c-404f-9565-9b3fa0a9cb4f
```


##### Request body
```
json :
{
  "name" : "SparkPi",
  "sparkConf" : {
    "spark.eventLog.enabled" : "false"
  },
  "envVars" : {
    "CONF_SECRET1_VALUE" : "{vault.secret/ethos/tenants/acp-compute/spark_hadoop_fs_azure_account_key_blob_core_windows_net}"
  },
  "className" : "org.apache.spark.examples.SparkPi",
  "jar" : "https://aphatakstorageeast.blob.core.windows.net/campaign/spark-examples_2.11-2.1.0.jar",
  "args" : "[3]",
  "driverMemory" : 1024,
  "driverCores" : 1,
  "executorMemory" : 1024,
  "executorCores" : 1,
  "numExecutors" : 1,
  "tags" : {
    "batch" : "123"
  },
  "clusterId" : "38b60713-68df-4b34-9030-bb85a5447bcd",
  "userId" : "ACP@Adobe.com",
  "cmd" : "string"
}
```



