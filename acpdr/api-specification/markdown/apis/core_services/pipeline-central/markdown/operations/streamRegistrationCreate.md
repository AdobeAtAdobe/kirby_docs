
<a name="streamregistrationcreate"></a>
### Register new stream
```
POST /registration
```


#### Description
Create new stream registration record


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Header**|**Authorization**  <br>*required*|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|string|


#### Body parameter
Stream Registration Record

*Name* : body  
*Flags* : required  
*Type* : [StreamRegistrationRequest](../definitions/StreamRegistrationRequest.md#streamregistrationrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|OK - Stream record is created|[StreamRegistrationResponse](../definitions/StreamRegistrationResponse.md#streamregistrationresponse)|
|**400**|There was a problem with the request. See the response body for a more specific error message.|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|
|**403**|Forbidden|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|
|**500**|Internal Server error. Please check logs for details.|[BaseErrorResponse](../definitions/BaseErrorResponse.md#baseerrorresponse)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Data Collection Registration


#### Example HTTP request

##### Request path
```
/registration
```


##### Request header
```
json :
"string"
```


##### Request body
```
json :
{
  "messageFormat" : "XDM",
  "imsOrg" : "imsOrg",
  "source" : "source"
}
```


#### Example HTTP response

##### Response 201
```
json :
{
  "data-collection-url" : "data-collection-url"
}
```


##### Response 400
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "report" : {
    "message" : "string"
  }
}
```


##### Response 403
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "report" : {
    "message" : "string"
  }
}
```


##### Response 500
```
json :
{
  "type" : "string",
  "title" : "string",
  "status" : 0,
  "report" : {
    "message" : "string"
  }
}
```



