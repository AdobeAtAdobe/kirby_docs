
<a name="deletesegmentjobroute"></a>
### Deleted the segment job given an id
```
DELETE /jobs/{jobId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Path**|**jobId**  <br>*required*|Segment Job Id|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Profile Segment Job deleted successfully|[MessageResponse](../definitions/MessageResponse.md#messageresponse)|
|**403**|Forbidden|No Content|
|**503**|Service Unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* jobs


#### Example HTTP request

##### Request path
```
/jobs/12345678
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



