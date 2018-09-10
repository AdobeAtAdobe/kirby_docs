
<a name="getmodeltimeseriesobjectroute"></a>
### Gets Time-series XDM Model objectsand retrieves all properties. 
```
GET /{model}/{recordId}/ExperienceEvent
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**model**  <br>*required*|Name of XDM model. Case in-sensitive.|string|
|**Path**|**recordId**  <br>*required*|Unique identifier for the model object. In case of Profile XDM Model, {recordId} is expected to be in XID format.|string|
|**Query**|**endTime**  <br>*optional*|Epoch time of end of the time range query. Excluded. If not specified, will fetch till the end.|string|
|**Query**|**fields**  <br>*optional*|Fields for the model object. By default, all fields will be fetched. Separated by comma.|string|
|**Query**|**graphType**  <br>*optional*|Graph-type (output type) you want to get the cluster from. Only 'coop', 'pdg', 'psr' are supported.|string|
|**Query**|**limit**  <br>*optional*|How many entries should be present in a page. 1000 if not specified.|integer|
|**Query**|**startTime**  <br>*optional*|Epoch time of start of the time range query. Included. If not specified, will fetch from the beginning.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Time-series XDM Model objects of given {recordId} successfully returned.|[TimeSeriesObjectResponseEntity](../definitions/TimeSeriesObjectResponseEntity.md#timeseriesobjectresponseentity)|
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
/profile/byvezUola9d3AEltgvN11FQ/ExperienceEvent
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
  "endTime" : "1517019396",
  "fields" : "person.firstName,person.lastName",
  "graphType" : "coop",
  "limit" : 100,
  "startTime" : "1517019315"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "records" : [ {
    "recordId" : "string",
    "timestamp" : "string",
    "sourceId" : "string",
    "record" : {
      "string" : 0.0
    }
  } ],
  "page" : {
    "sortField" : "string",
    "sort" : "string",
    "pageOffset" : "string",
    "pageSize" : 0
  },
  "link" : {
    "next" : "string"
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



