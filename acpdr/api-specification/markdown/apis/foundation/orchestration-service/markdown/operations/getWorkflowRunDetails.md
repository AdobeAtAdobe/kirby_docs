
<a name="getworkflowrundetails"></a>
### Get Workflow Run Details
```
GET /workflows/{workflowId}/runs/{runId}
```


#### Description
Get details about a particular run instance of the workflow


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**runId**  <br>*required*|id of the workflow run instance|string|
|**Path**|**workflowId**  <br>*required*|id of the workflow|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[WorkflowRun](../definitions/WorkflowRun.md#workflowrun)|
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
/workflows/string/runs/string
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
{
  "id" : "string",
  "workflowId" : "string",
  "executionDate" : "string",
  "state" : "string",
  "startDate" : "string",
  "endDate" : "string",
  "scheduled" : true
}
```



