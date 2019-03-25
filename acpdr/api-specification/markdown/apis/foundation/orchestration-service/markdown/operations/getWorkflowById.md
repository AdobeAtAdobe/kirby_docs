
<a name="getworkflowbyid"></a>
### Returns the Workflow
```
GET /workflows/{workflowId}
```


#### Description
Returns the workflow given the id


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Query**|**workflowId**  <br>*required*|id of workflow to retrieve|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[Workflow](../definitions/Workflow.md#workflow)|
|**401**|Unauthorized access.|No Content|
|**404**|Not Found|No Content|
|**500**|Internal Server Error|No Content|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Describe Operations on Workflows


#### Example HTTP request

##### Request path
```
/workflows/{workflowId}
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
  "workflowId" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "name" : "string",
  "description" : "string",
  "tasks" : [ {
    "id" : "string",
    "typeProperties" : "object",
    "type" : "string",
    "description" : "string",
    "connections" : [ {
      "name" : "string",
      "description" : "string",
      "uriEndpoint" : "string",
      "metadata" : {
        "string" : "string"
      }
    } ],
    "policy" : {
      "retries" : 0,
      "retryDelay" : 0
    },
    "dependsOn" : {
      "tasks" : [ "string" ],
      "condition" : "string"
    }
  } ],
  "parameters" : {
    "schedule" : "string",
    "startDate" : "string",
    "endDate" : "string",
    "maxActiveRuns" : 0,
    "timeout" : 0,
    "email" : "string",
    "emailOnFailure" : "string"
  }
}
```



