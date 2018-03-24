
<a name="create-a-marathon-spark-application"></a>
### Create Marathon application
```
POST /data/foundation/compute/apps
```


#### Body parameter
App Request

*Name* : body  
*Flags* : required  
*Type* : [Streaming Application Request](../definitions/Streaming_Application_Request.md#streaming-application-request)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Application successfully submitted for execution|[App](../definitions/App.md#app)|
|**401**|Unauthorized access|No Content|
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
/data/foundation/compute/apps
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


#### Example HTTP response

##### Response 201
```
json :
{
  "id" : "98b8c5a6-15e0-4680-8852-1218866f759d",
  "request" : {
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
  },
  "createdAt" : "2017-09-07T18:17:19Z",
  "updatedAt" : "2017-09-07T18:17:19Z",
  "userId" : "user1",
  "status" : "string",
  "message" : "Task ran successfully"
}
```



