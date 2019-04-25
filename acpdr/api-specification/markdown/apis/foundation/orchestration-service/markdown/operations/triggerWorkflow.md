
<a name="triggerworkflow"></a>
### Trigger a workflow or Create a Workflow Run
```
POST /workflows/{workflowId}/runs
```


#### Description
Trigger a workflow manually. Only an enabled workflow can be triggered


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**workflowId**  <br>*required*|id of the workflow to trigger|string|


#### Body parameter
Optional Workflow Run config object

*Name* : body  
*Flags* : optional  
*Type* : object


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Created  <br>**Headers** :   <br>`Location` (string) : Location of the newly created Workflow RUN instance.|No Content|
|**401**|Unauthorized access.|No Content|
|**409**|Conflict - Workflow cannot be triggered|string|
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


##### Request body
```
json :
{ }
```


#### Example HTTP response

##### Response 409
```
json :
"string"
```



