
<a name="getworkflowstatus"></a>
### Get Status of Workflow
```
GET /workflows/{workflowId}/state
```


#### Description
Get to know whether a workflow is enabled, disabled or inactive


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Query**|**workflowId**  <br>*required*|Id of the workflow whose status is required|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|enum (INACTIVE, ACTIVE)|
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
/workflows/{workflowId}/state
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
"string"
```



