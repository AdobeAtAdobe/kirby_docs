
<a name="triggerworkflowaction"></a>
### Stop a Workflow Run
```
POST /workflows/{workflowId}/runs/{runId}?action=stop
```


#### Description
Stop a workflow run eventually.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**runId**  <br>*required*|id of the workflow run instance|string|
|**Path**|**workflowId**  <br>*required*|id of the workflow|string|
|**Query**|**action**  <br>*required*|stop action|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**204**|Stopped|No Content|
|**401**|Unauthorized access.|No Content|
|**404**|Not Found|No Content|
|**500**|Internal Server Error|No Content|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Describe operations on Workflow Runs


#### Example HTTP request

##### Request path
```
/workflows/string/runs/string?action=stop
```


##### Request header
```
json :
"string"
```


##### Request query
```
json :
{
  "action" : "string"
}
```



