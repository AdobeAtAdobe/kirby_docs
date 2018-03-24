
<a name="deletecluster"></a>
### Delete the cluster. If any jobs are running, they will be killed
```
DELETE /data/foundation/compute/clusters/{clusterId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**clusterId**  <br>*required*|Cluster id of the cluster|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**default**|successful operation|No Content|


#### Tags

* Describes operations performed on clusters


#### Example HTTP request

##### Request path
```
/data/foundation/compute/clusters/4b3c4fae-212c-404f-9565-9b3fa0a9cb4f
```



