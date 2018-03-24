
<a name="getmodelobjectroute"></a>
### Gets a specified KeyValue XDM Model Object and retrieves all its properties.
```
GET /{model}/{recordId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**model**  <br>*required*|Name of XDM model, case in-sensitive.|string|
|**Path**|**recordId**  <br>*required*|Unique identifier for the model object. In case of Profile XDM Model, {recordId} is expected to be in XID format|string|
|**Query**|**fields**  <br>*optional*|Fields for the model object. By default, all fields will be fetched. Separated by comma.|string|
|**Query**|**graphType**  <br>*optional*|Graph-type (output type) you want to get the cluster from. Only 'coop' is supported for now|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|XDM model objects of given {recordId} successfully returned.|[ModelObjectEntity](../definitions/ModelObjectEntity.md#modelobjectentity)|
|**403**|You are forbidden to make this request.|No Content|
|**404**|{model} with recordId {recordId} does not exist.|No Content|
|**503**|Service unavailable|No Content|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* models


#### Example HTTP request

##### Request path
```
/profile/252132804
```


##### Request header
```
json :
"southwest@adobe.com"
```


##### Request query
```
json :
{
  "fields" : "person.firstName,person.lastName",
  "graphType" : "coop"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "recordId" : "string",
  "timestamp" : "string",
  "sourceId" : "string",
  "record" : {
    "string" : 0.0
  }
}
```



