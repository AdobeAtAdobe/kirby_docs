
<a name="getmodelobjectroute"></a>
### Gets an Key-value XDM Model object and retrieves all its properties.
```
GET /{model}/{recordId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**model**  <br>*required*|Name of XDM model. Case in-sensitive.|string|
|**Path**|**recordId**  <br>*required*|Unique identifier for the model object. In case of Profile XDM Model, {recordId} is expected to be in XID format.|string|
|**Query**|**fields**  <br>*optional*|Fields for the model object. By default, all fields will be fetched. Separated by comma.|string|
|**Query**|**graphType**  <br>*optional*|Graph-type (output type) you want to get the cluster from. Only 'coop', 'pdg', 'psr' are supported.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Key-value XDM Model object of given {recordId} successfully returned.|[ModelObjectEntity](../definitions/ModelObjectEntity.md#modelobjectentity)|
|**403**|You are forbidden to make this request.|[ErrorMessage](../definitions/ErrorMessage.md#errormessage)|
|**404**|XDM Model objects are no longer resources, i.e. the objects were deleted.|[ErrorMessage](../definitions/ErrorMessage.md#errormessage)|
|**503**|Service Unavailable|No Content|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* models


#### Example HTTP request

##### Request path
```
/profile/byvezUola9d3AEltgvN11FQ
```


##### Request header
```
json :
"1BD6382559DF0C130A49422D@AdobeOrg"
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


##### Response 403
```
json :
{
  "errorCode" : "string",
  "errorMessage" : "string"
}
```


##### Response 404
```
json :
{
  "errorCode" : "string",
  "errorMessage" : "string"
}
```



