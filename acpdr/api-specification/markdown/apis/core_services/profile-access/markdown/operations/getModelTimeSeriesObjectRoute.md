
<a name="getmodeltimeseriesobjectroute"></a>
### Gets a specified XDM Model Object and retrieves all its ExperienceEvent properties.
```
GET /{model}/{recordId}/ExperienceEvent
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**model**  <br>*required*|Name of XDM model, case in-sensitive.|string|
|**Path**|**recordId**  <br>*required*|Unique identifier for the model object. In case of Profile XDM Model, {recordId} is expected to be in XID format|string|
|**Query**|**endTime**  <br>*optional*|Epoch time of end of the time range query. Excluded. If not specified, will fetch till the end.|string|
|**Query**|**fields**  <br>*optional*|Selective fields to be fetched. Separated by comma. By default all fields. field=* means all fields.|string|
|**Query**|**graphType**  <br>*optional*|Graph-type (output type) you want to get the cluster from. Only 'coop' is supported for now|string|
|**Query**|**limit**  <br>*optional*|How many entries should be present in a page. 1000 if not specified.|integer|
|**Query**|**start**  <br>*optional*|Ordering value of first record in result. Dictates the ordering value of first record in desired page. Ordering field is a combination of schemaRef Index and the ordering field within a schemaRef (in reverse order).|string|
|**Query**|**startTime**  <br>*optional*|Epoch time of start of the time range query. Included. If not specified, will fetch from the beginning.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|XDM model objects of given {recordId} successfully returned.|[TimeSeriesObjectResponseEntity](../definitions/TimeSeriesObjectResponseEntity.md#timeseriesobjectresponseentity)|
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
/profile/252132804/ExperienceEvent
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
  "endTime" : "1517019396",
  "fields" : "field1.field2,field3",
  "graphType" : "coop",
  "limit" : 100,
  "start" : "start=1-12345678",
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



