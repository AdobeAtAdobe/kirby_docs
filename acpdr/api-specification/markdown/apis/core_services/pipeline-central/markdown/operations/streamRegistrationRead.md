
<a name="streamregistrationread"></a>
### Read stream registration
```
GET /registration/{stream-id}
```


#### Description
Read registration record for the supplied stream-id


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Header**|**Authorization**  <br>*required*|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|string|
|**Path**|**stream-id**  <br>*required*|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK - Stream registration record is returned|[StreamRegistrationRead](../definitions/StreamRegistrationRead.md#streamregistrationread)|
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
/registration/string
```


##### Request header
```
json :
"string"
```


#### Example HTTP response

##### Response 200
```
json :
{
  "authenticationRequired" : true,
  "messageFormat" : "XDM",
  "imsOrg" : "imsOrg",
  "validateMessage" : true,
  "topicName" : "topicName",
  "source" : "source"
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



