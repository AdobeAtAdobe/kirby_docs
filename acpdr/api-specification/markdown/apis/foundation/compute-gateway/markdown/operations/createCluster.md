
<a name="createcluster"></a>
### Creates a cluster to run compute jobs
```
POST /data/foundation/compute/clusters
```


#### Body parameter
Cluster Creation Request

*Name* : body  
*Flags* : required  
*Type* : [Cluster Creation Request](../definitions/Cluster_Creation_Request.md#cluster-creation-request)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Cluster successfully created|[Cluster Details](../definitions/Cluster_Details.md#cluster-details)|
|**401**|Unauthorized access|No Content|
|**414**|URI length exceeds 2000 characters limit|No Content|
|**422**|Input validation failure|No Content|
|**503**|Cluster creation failed|No Content|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Describes operations performed on clusters


#### Example HTTP request

##### Request path
```
/data/foundation/compute/clusters
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


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : "8a475fbd-4a58-4b90-bb9b-bb23b6c873ff",
  "name" : "Reporting Jobs Cluster",
  "status" : "string",
  "tags" : {
    "batch" : "123"
  },
  "workerType" : "ML_SIZE_LARGE",
  "minInstance" : 4,
  "maxInstance" : 16,
  "livy" : "{\"url\" : \"http://8a475fbd-livy.ethos.adobe.com\", \"username\" : \"mluser\", \"password\" : \"gJMGq*7Uzg8X3\"",
  "userId" : "[MCDP_HARVESTER@AdobeID]",
  "createdAt" : "2017-10-02T18:17:19Z",
  "updatedAt" : "2017-10-03T18:17:19Z",
  "property" : "ethos_role:8a475fbd-4a58-4b90-bb9b-bb23b6c873ff"
}
```



