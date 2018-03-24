
<a name="createpreviewsessionroute"></a>
### Creates an interactive session in which we can perform the Preview Operations
```
POST /previewsession
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|


#### Body parameter
modelName: XDM Model on which we are going to run our queries.

*Name* : body  
*Flags* : required  
*Type* : [PreviewSessionRequest](../definitions/PreviewSessionRequest.md#previewsessionrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[PreviewSessionResponse](../definitions/PreviewSessionResponse.md#previewsessionresponse)|
|**201**|Session successfully Created|[PreviewSessionResponse](../definitions/PreviewSessionResponse.md#previewsessionresponse)|
|**403**|You are forbidden to make this request.|No Content|
|**503**|Session Not Created. Retry or Contact Admin.|No Content|


#### Produces

* `application/json`


#### Tags

* preview


#### Example HTTP request

##### Request path
```
/previewsession
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



