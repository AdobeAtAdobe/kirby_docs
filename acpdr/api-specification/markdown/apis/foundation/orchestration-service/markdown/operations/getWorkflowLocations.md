
<a name="getworkflowlocations"></a>
### Returns all Workflow locations for an Ims Org
```
GET /workflows
```


#### Description
Returns all  workflow locations


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[GetAllWorkflows](../definitions/GetAllWorkflows.md#getallworkflows)|
|**400**|Bad Request|string|
|**401**|Unauthorized access|No Content|
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


#### Example HTTP response

##### Response 200
```
json :
{
  "location" : [ "string" ]
}
```


##### Response 400
```
json :
"string"
```



