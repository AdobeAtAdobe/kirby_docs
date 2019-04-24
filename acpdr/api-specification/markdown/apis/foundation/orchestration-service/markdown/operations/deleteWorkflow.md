
<a name="deleteworkflow"></a>
### Deletes a workflow
```
DELETE /workflows/{workflowId}
```


#### Description
Soft deletes a workflow. Disables it and mark for deletion at a later stage


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Query**|**workflowId**  <br>*required*|id of workflow to retrieve|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**204**|No Content|No Content|
|**401**|Unauthorized access.|No Content|
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



