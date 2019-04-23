
<a name="postpreviewroute"></a>
### Submits a Preview Job for a Profile Query
```
POST /preview/{sessionId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**sessionId**  <br>*required*|Preview Session Id.|string|


#### Body parameter
predicateExpression - Expression of the predicate that is to be evaluated 
predicateType - Default: PQL The only value that is available to use for this is PQL for now.
predicateModel - Default: xdm.model.profile The model against which this predicate is to be evaulated. Please note that 'touchpoint' is not treated as model as it can be associated with any of the models like profile.
graphType - Graph Type you want to get the cluster from. Possible values are (coop - graph built by using coop data, pdg - private device graph, psr - propriatery stiched rules)

*Name* : body  
*Flags* : required  
*Type* : [PreviewQueryRequest](../definitions/PreviewQueryRequest.md#previewqueryrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[PreviewQueryResponse](../definitions/PreviewQueryResponse.md#previewqueryresponse)|
|**201**|Profile Preview successfully Posted  <br>**Headers** :   <br>`X-Location` (string) : HRef to the Profile Preview.|[PreviewQueryResponse](../definitions/PreviewQueryResponse.md#previewqueryresponse)|
|**403**|Forbidden|No Content|
|**503**|Service Unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* preview


#### Example HTTP request

##### Request path
```
/preview/123421
```


##### Request header
```
json :
"southwest@adobe.com"
```


##### Request body
```
json :
{
  "previewSessionId" : 0,
  "predicateExpression" : "string",
  "predicateType" : "string",
  "predicateModel" : "string",
  "graphType" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "previewQueryId" : "string",
  "previewExecutionId" : 0,
  "previewQueryStatus" : "string",
  "state" : "string"
}
```


##### Response 201
```
json :
{
  "previewQueryId" : "string",
  "previewExecutionId" : 0,
  "previewQueryStatus" : "string",
  "state" : "string"
}
```



