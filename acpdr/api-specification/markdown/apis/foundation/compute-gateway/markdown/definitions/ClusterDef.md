
<a name="clusterdef"></a>
### ClusterDef

|Name|Description|Schema|
|---|---|---|
|**maxInstance**  <br>*required*  <br>*read-only*|Maximum number of instances of the worker type to be provisioned in the cluster.  <br>**Example** : `16`|integer (int32)|
|**minInstance**  <br>*optional*  <br>*read-only*|Minimum number of instances of the worker type to be provisioned in the cluster. Default value = 1  <br>**Example** : `4`|integer (int32)|
|**name**  <br>*required*  <br>*read-only*|The name of the cluster  <br>**Example** : `"Reporting Jobs Cluster"`|string|
|**property**  <br>*required*  <br>*read-only*|Mesos constraint that identifies that cluster  <br>**Example** : `"ethos_role:8a475fbd-4a58-4b90-bb9b-bb23b6c873ff"`|string|
|**tags**  <br>*optional*|A map containing key value pairs containing user specified tags  <br>**Example** : `"{\"jobType\" : \"Reporting\"}"`|object|
|**userId**  <br>*optional*|The list of users to which this cluster belongs.Empty array for access to all  <br>**Example** : `"[MCDP_HARVESTER@Adobe]"`|< string > array|
|**workerType**  <br>*required*  <br>*read-only*|Worker type represents the size of a single node to use in the cluster  <br>**Example** : `"ML_SIZE_LARGE"`|string|



