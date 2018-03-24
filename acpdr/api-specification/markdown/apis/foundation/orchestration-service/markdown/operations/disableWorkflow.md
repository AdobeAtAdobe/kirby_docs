
<a name="disableworkflow"></a>
### Disables a workflow
```
POST /workflows/{workflowId}/state?state=disable
```


#### Description
Disables a workflow. Disabled workflows cannot be scheduled or triggered


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**workflowId**  <br>*required*|Id of the workflow to disable|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|No Content|
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
/workflows/string/state?state=disable
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



