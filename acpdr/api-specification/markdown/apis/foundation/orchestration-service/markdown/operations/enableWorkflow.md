
<a name="enableworkflow"></a>
### Enable a workflow
```
POST /workflows/{workflowId}/state?state=enable
```


#### Description
Enable a workflow. Only enabled workflows can be scheduled or triggered


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**workflowId**  <br>*required*|Id of the workflow to enable|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**204**|No Content|No Content|
|**400**|Bad Request|string|
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
/workflows/string/state?state=enable
```


##### Request header
```
json :
"string"
```


#### Example HTTP response

##### Response 400
```
json :
"string"
```



