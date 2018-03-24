
<a name="putmodelobjectroute"></a>
### Puts XDM Model objects into the Unified Profile Store.
```
PUT /{model}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**model**  <br>*required*|Name of XDM model. Case in-sensitive.|string|


#### Body parameter
List of XDM Model objects to be put. Each should be in Json format.

*Name* : body  
*Flags* : required  
*Type* : < [ModelObjectEntity](../definitions/ModelObjectEntity.md#modelobjectentity) > array


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Objects created successfully.|No Content|
|**403**|You are forbidden to make this request.|No Content|
|**422**|Failed to create the objects.|[FailedModelObjectRecord](../definitions/FailedModelObjectRecord.md#failedmodelobjectrecord)|
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
/profile
```


##### Request header
```
json :
"123@AdobeOrg"
```


##### Request body
```
json :
[ {
  "recordId" : "string",
  "timestamp" : "string",
  "sourceId" : "string",
  "record" : {
    "string" : 0.0
  }
} ]
```


#### Example HTTP response

##### Response 422
```
json :
{
  "record" : "object",
  "failedReason" : "string"
}
```



