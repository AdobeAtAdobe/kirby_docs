
<a name="initializepreviewsessionroute"></a>
### Initializes an interactive session with the Profile Specific Helpers through which we can perform the Preview Operations. Intialize only when Session State is READY_TO_INITIALIZE
```
POST /previewsession/{sessionId}/initialize
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**sessionId**  <br>*required*|Preview Session Id.|string|


#### Body parameter
modelName: XDM Model on which we are going to run our queries.

*Name* : body  
*Flags* : required  
*Type* : [PreviewSessionRequest](../definitions/PreviewSessionRequest.md#previewsessionrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[PreviewSessionResponse](../definitions/PreviewSessionResponse.md#previewsessionresponse)|
|**201**|Session successfully Instantiated|[PreviewSessionResponse](../definitions/PreviewSessionResponse.md#previewsessionresponse)|
|**400**|Session Not Initialized Yet.|No Content|
|**403**|You are forbidden to make this request.|No Content|
|**503**|Session Not Initialized. Retry or Contact Admin.|No Content|


#### Produces

* `application/json`


#### Tags

* preview


#### Example HTTP request

##### Request path
```
/previewsession/123421/initialize
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
  "modelName" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "previewSessionId" : 0,
  "status" : "string"
}
```


##### Response 201
```
json :
{
  "previewSessionId" : 0,
  "status" : "string"
}
```



