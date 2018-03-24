
<a name="deletemodelobjectroute"></a>
### Deletes a specified XDM Model Object.
```
DELETE /{model}/{recordId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**model**  <br>*required*|Name of XDM model, case in-sensitive.|string|
|**Path**|**recordId**  <br>*required*|Unique identifier for the model object. In case of Profile XDM Model, {recordId} is expected to be in XID format|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Function1DataAccessServiceFunction1RequestContextFutureRouteResult](../definitions/Function1DataAccessServiceFunction1RequestContextFutureRouteResult.md#function1dataaccessservicefunction1requestcontextfuturerouteresult)|
|**204**|The delete operation was successful.|No Content|
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


#### Example HTTP response

##### Response 200
```
json :
{ }
```



