
<a name="returns-job-payload"></a>
### Returns a Job Payload
```
GET /admin/jobs/payload/{job_id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Path**|**job_id**  <br>*required*|Job Id|integer|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Octo job id was found and job payload returned|No Content|
|**400**|Octo status API failed. Unable to process the request|No Content|
|**403**|Octo status API failed authentication|No Content|
|**404**|Octo job id was not found|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/jobs/payload/0
```


##### Request header
```
json :
"string"
```



