
<a name="getsparkjobstatus"></a>
### Finds status of a submitted Spark job
```
GET /data/foundation/compute/jobs/{jobID}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**jobID**  <br>*required*|Job ID|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Spark job retrieved|[Job](../definitions/Job.md#job)|
|**401**|Unauthorized access|No Content|
|**404**|Job ID not found|No Content|
|**406**|Non Acceptable Response Type.Only application/json allowed|No Content|
|**422**|Input validation failure|No Content|
|**503**|Spark job retrieval request failed|No Content|


#### Produces

* `application/json`


#### Tags

* Describes operations performed on Batch Spark jobs


#### Example HTTP request

##### Request path
```
/data/foundation/compute/jobs/4b3c4fae-212c-404f-9565-9b3fa0a9cb4f
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : "98b8c5a6-15e0-4680-8852-1218866f759d",
  "clusterJobId" : "driver-20170903072614-0099",
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
    "userId" : "Compute@AdobeID"
  },
  "createdAt" : "2017-09-07T18:17:19Z",
  "updatedAt" : "2017-09-07T18:17:19Z",
  "userId" : "Compute@AdobeID",
  "status" : "string",
  "message" : "string"
}
```



