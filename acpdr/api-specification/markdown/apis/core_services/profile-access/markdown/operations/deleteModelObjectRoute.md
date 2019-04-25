
<a name="deletemodelobjectroute"></a>
### Deletes specified XDM Model objects
```
DELETE /{model}/{recordId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**model**  <br>*required*|Name of XDM model. Case in-sensitive.|string|
|**Path**|**recordId**  <br>*required*|Unique identifier for the model object. In case of Profile XDM Model, {recordId} is expected to be in XID format.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Function1DataAccessServiceFunction1RequestContextFutureRouteResult](../definitions/Function1DataAccessServiceFunction1RequestContextFutureRouteResult.md#function1dataaccessservicefunction1requestcontextfuturerouteresult)|
|**204**|XDM Model objects deleted successfully.|[ErrorMessage](../definitions/ErrorMessage.md#errormessage)|
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


#### Example HTTP response

##### Response 200
```
json :
{ }
```


##### Response 204
```
json :
{
  "errorCode" : "string",
  "errorMessage" : "string"
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



