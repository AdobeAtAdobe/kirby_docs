
<a name="deletepreviewsessionroute"></a>
### Deletes a preview session
```
DELETE /previewsession/{sessionId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**sessionId**  <br>*required*|Preview Session Id.|string|


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



