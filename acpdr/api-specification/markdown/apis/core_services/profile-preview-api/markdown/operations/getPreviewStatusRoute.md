
<a name="getpreviewstatusroute"></a>
### Gets result of the Preview Job in a paginated fashion. Ordering will be by objectId.
```
GET /preview/{sessionId}/execution/{previewExecutionId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**previewExecutionId**  <br>*required*|Preview Execution Id.|string|
|**Path**|**sessionId**  <br>*required*|Preview Session Id.|string|
|**Query**|**limit**  <br>*optional*|How many entries should be present in a page. 1000 if not specified.|integer|
|**Query**|**offset**  <br>*optional*|Page offset|string|
|**Query**|**previewQueryId**  <br>*required*|Preview Job Id.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|XDM model objects of given {jobId} successfully returned.|[EndCustomerEntityPageResponse](../definitions/EndCustomerEntityPageResponse.md#endcustomerentitypageresponse)|
|**403**|You are forbidden to make this request.|No Content|
|**404**|Preview jobId {jobId} does not exist.|No Content|
|**503**|Service unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* preview


#### Example HTTP request

##### Request path
```
/preview/123421/execution/42
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
  "limit" : 100,
  "offset" : "offset=10200",
  "previewQueryId" : "ce775645-e8ca-41e2-a74f-5729fe478ef0"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "page" : {
    "offset" : 0,
    "size" : 0
  },
  "link" : {
    "nextPage" : "string"
  },
  "state" : "string",
  "results" : [ {
    "objectId" : "string",
    "_href" : "string",
    "relatedObjects" : [ {
      "objectId" : "string",
      "_href" : "string"
    } ]
  } ]
}
```



