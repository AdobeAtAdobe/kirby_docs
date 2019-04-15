
<a name="jobdef"></a>
### JobDef

|Name|Description|Schema|
|---|---|---|
|**args**  <br>*optional*|Any arguments to be passed to your application  <br>**Example** : `"[3]"`|< string > array|
|**className**  <br>*required*|The main application class name to run  <br>**Example** : `"org.apache.spark.examples.SparkPi"`|string|
|**clusterId**  <br>*optional*|The cluster id of the cluster on which this job should be run  <br>**Example** : `"38b60713-68df-4b34-9030-bb85a5447bcd"`|string|
|**driverCores**  <br>*optional*|Number of cores to allocate for the driver.Default value: 1  <br>**Example** : `1`|integer (int32)|
|**driverMemory**  <br>*optional*|Amount of memory, in MB, to allocate for the driver.Default value: 1024M  <br>**Example** : `1024`|integer (int32)|
|**envVars**  <br>*optional*|A map containing key value pairs of environment variables needed for the job  <br>**Example** : `"#/definitions/sample_env_vars"`|< string, string > map|
|**executorCores**  <br>*optional*|Number of cores to allocate per executor.Default value: 1  <br>**Example** : `1`|integer (int32)|
|**executorMemory**  <br>*optional*|Amount of memory, in MB, to allocate per executor.Default value: 1024M  <br>**Example** : `1024`|integer (int32)|
|**jar**  <br>*required*|Location of the jar containing used to run the job  <br>**Example** : `"https://aphatakstorageeast.blob.core.windows.net/campaign/spark-examples_2.11-2.1.0.jar"`|string|
|**name**  <br>*required*|The name of the Spark Job. Note:Spaces in name will be replaced with _.  <br>**Example** : `"SparkPi"`|string|
|**numExecutors**  <br>*optional*|The number of executors to launch.Default value: 1  <br>**Example** : `1`|integer (int32)|
|**sparkConf**  <br>*optional*|A map containing key value pairs containing Spark configuration properties  <br>**Example** : `"#/definitions/sample_spark_properties"`|< string, string > map|
|**tags**  <br>*optional*|A map containing key value pairs containing user specified tags  <br>**Example** : `"#/definitions/sample_tags"`|< string, string > map|
|**userId**  <br>*optional*|The user who submitted job  <br>**Example** : `"Compute@AdobeID"`|string|



