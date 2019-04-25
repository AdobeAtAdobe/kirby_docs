
<a name="createworkflow"></a>
### Create a new workflow
```
POST /workflows
```


#### Description
Creates a new workflow to be scheduled or triggered manually


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|


#### Body parameter
Workflow DSL payload. The 'typeProperties' object in the DSL is specific to a particular task DSL and contains details about that particular task type as documented on the wiki

*Name* : body  
*Flags* : required  
*Type* : [Workflow](../definitions/Workflow.md#workflow)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Created  <br>**Headers** :   <br>`Location` (string) : Location of the newly created Workflow.|No Content|
|**400**|Bad Request|string|
|**401**|Forbidden|No Content|
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
/workflows
```


##### Request header
```
json :
"string"
```


##### Request body
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


#### Example HTTP response

##### Response 400
```
json :
"string"
```



