
<a name="cluster"></a>
### Cluster

|Name|Description|Schema|
|---|---|---|
|**createdAt**  <br>*required*  <br>*read-only*|Creation date of the cluster  <br>**Example** : `"2017-10-02T18:17:19Z"`|string|
|**id**  <br>*required*|The ID of the cluster  <br>**Example** : `"8a475fbd-4a58-4b90-bb9b-bb23b6c873ff"`|string|
|**maxInstance**  <br>*required*|Maximum number of instances of the worker type to be provisioned in the cluster.  <br>**Example** : `16`|integer (int32)|
|**minInstance**  <br>*optional*|Minimum number of instances of the worker type to be provisioned in the cluster. Default value = 1  <br>**Example** : `4`|integer (int32)|
|**name**  <br>*required*|The name of the cluster  <br>**Example** : `"Reporting Jobs Cluster"`|string|
|**property**  <br>*required*  <br>*read-only*|Mesos constraint that identifies that cluster  <br>**Example** : `"ethos_role:8a475fbd-4a58-4b90-bb9b-bb23b6c873ff"`|string|
|**status**  <br>*required*|Current status of the cluster. Status can be Pending, Active, Destroyed  <br>**Example** : `"string"`|enum (Pending, Active, Deleted)|
|**tags**  <br>*optional*|A map containing key value pairs containing user specified tags  <br>**Example** : `"[sample_tags](#sample_tags)"`|[sample_tags](sample_tags.md#sample_tags)|
|**updatedAt**  <br>*required*  <br>*read-only*|Updated date of the cluster  <br>**Example** : `"2017-10-03T18:17:19Z"`|string|
|**userId**  <br>*required*|List of users to which the cluster belongs  <br>**Example** : `"[MCDP_HARVESTER@AdobeID]"`|< string > array|
|**workerType**  <br>*required*|Worker type represents the size of a single node to use in the cluster  <br>**Example** : `"ML_SIZE_LARGE"`|string|



