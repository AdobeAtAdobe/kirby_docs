
<a name="getpreviewsessionroute"></a>
### Gets details for a session in which we can perform the Preview Operations
```
GET /previewsession/{sessionId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**sessionId**  <br>*required*|Preview Session Id.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Session successfully Retrieved|[PreviewSessionResponse](../definitions/PreviewSessionResponse.md#previewsessionresponse)|
|**403**|You are forbidden to make this request.|No Content|
|**503**|No Sessions available. Going to try to re-instantiate sessions.|No Content|


#### Produces

* `application/json`


#### Tags

* preview


#### Example HTTP request

##### Request path
```
/previewsession/123421
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
{
  "previewSessionId" : 0,
  "status" : "string"
}
```



