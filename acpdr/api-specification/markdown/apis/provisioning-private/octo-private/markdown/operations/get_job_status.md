
<a name="get_job_status"></a>
### Returns environment status based on a job id
```
GET /jobs/{job_id}
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
|**200**|Octo job id was found and results returned|No Content|
|**400**|Octo status API failed|No Content|
|**403**|Octo status API failed authentication|No Content|
|**404**|Octo job id was not found|No Content|


#### Tags

* octo


#### Example HTTP request

##### Request path
```
/jobs/0
```


##### Request header
```
json :
"string"
```



