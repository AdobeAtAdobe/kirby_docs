
<a name="deletescanjobroute"></a>
### Deleted the scan job given an id
```
DELETE /models/{model}/jobs/{scanJobId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**model**  <br>*required*|Model Name|string|
|**Path**|**scanJobId**  <br>*required*|Scan Job Id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Profile Scan Job deleted successfully|[MessageResponse](../definitions/MessageResponse.md#messageresponse)|
|**403**|Forbidden|No Content|
|**503**|Service Unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* models


#### Example HTTP request

##### Request path
```
/models/profile/jobs/12345678
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
  "status" : true,
  "message" : "string"
}
```



