
<a name="update-a-cluster"></a>
### Update the cluster
```
PUT /data/foundation/compute/clusters/{clusterId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**clusterId**  <br>*required*|Cluster ID|string|


#### Body parameter
Cluster Request

*Name* : body  
*Flags* : required  
*Type* : [Cluster Creation Request](../definitions/Cluster_Creation_Request.md#cluster-creation-request)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**202**|Cluster successfully submitted for update|No Content|
|**401**|Unauthorized access|No Content|
|**404**|Cluster does not exist|No Content|
|**414**|URI length exceeds 2000 characters limit|No Content|
|**422**|Input validation failure|No Content|
|**503**|Cluster update failed|No Content|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Describes operations performed on clusters


#### Example HTTP request

##### Request path
```
/data/foundation/compute/clusters/4b3c4fae-212c-404f-9565-9b3fa0a9cb4f
```


##### Request body
```
json :
{
  "name" : "Reporting Jobs Cluster",
  "tags" : "{\"jobType\" : \"Reporting\"}",
  "workerType" : "ML_SIZE_LARGE",
  "minInstance" : 4,
  "maxInstance" : 16,
  "supportInteractiveJobs" : true,
  "userId" : "[MCDP_HARVESTER@Adobe]",
  "property" : "ethos_role:8a475fbd-4a58-4b90-bb9b-bb23b6c873ff"
}
```



