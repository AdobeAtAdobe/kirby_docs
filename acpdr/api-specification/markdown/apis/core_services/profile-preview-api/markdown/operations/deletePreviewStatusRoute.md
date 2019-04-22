
<a name="deletepreviewstatusroute"></a>
### Cancels the execution of the Preview Job
```
DELETE /preview/{sessionId}/execution/{previewExecutionId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**previewExecutionId**  <br>*required*|Preview Execution Id.|string|
|**Path**|**sessionId**  <br>*required*|Preview Session Id.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Job Successfully cancelled|[MessageResponse](../definitions/MessageResponse.md#messageresponse)|
|**403**|You are forbidden to make this request.|No Content|
|**404**|Preview jobId {jobId} does not exist.|No Content|
|**503**|Service unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* preview


#### Example HTTP request

##### Request path
```
/preview/123421/execution/42
```


##### Request header
```
json :
"southwest@adobe.com"
```


#### Example HTTP response

##### Response 200
```
json :
{
  "status" : true,
  "message" : "string"
}
```



