
<a name="deletesparkjob"></a>
### Deletes the specified Spark job
```
DELETE /data/foundation/compute/jobs/{jobID}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**jobID**  <br>*required*|Job ID|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**202**|Spark job kill request submitted successfully|No Content|
|**401**|Unauthorized access|No Content|
|**404**|Job Not Found|No Content|
|**409**|Job kill requested failed as the job might already have terminated or it was not found on the cluster.|No Content|
|**414**|Request URI is longer than allowed 2000 chars|No Content|
|**422**|Input validation failure|No Content|
|**503**|Kill request submission failed|No Content|


#### Produces

* `application/json`


#### Tags

* Describes operations performed on Batch Spark jobs


#### Example HTTP request

##### Request path
```
/data/foundation/compute/jobs/4b3c4fae-212c-404f-9565-9b3fa0a9cb4f
```



