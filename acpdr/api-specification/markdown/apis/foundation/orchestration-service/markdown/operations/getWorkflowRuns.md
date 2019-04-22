
<a name="getworkflowruns"></a>
### Get All workflow Runs information for a given workflow
```
GET /workflows/{workflowId}/runs
```


#### Description
Get information about all runs of a given workflow


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**workflowId**  <br>*required*|Id of the Workflow whose runs are required|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|< [WorkflowRun](../definitions/WorkflowRun.md#workflowrun) > array|
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
/workflows/string/runs
```


##### Request header
```
json :
"string"
```


#### Example HTTP response

##### Response 200
```
json :
[ {
  "id" : "string",
  "workflowId" : "string",
  "executionDate" : "string",
  "state" : "string",
  "startDate" : "string",
  "endDate" : "string",
  "scheduled" : true
} ]
```



