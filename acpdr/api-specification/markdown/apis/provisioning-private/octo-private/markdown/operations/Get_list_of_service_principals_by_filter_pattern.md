
<a name="get-list-of-service-principals-by-filter-pattern"></a>
### Returns service principals info
```
GET /admin/servicePrincipals
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Accept**  <br>*optional*|API Version|string|
|**Header**|**Authorization**  <br>*required*|Bearer [ access_token ]|string|
|**Header**|**x-api-key**  <br>*required*|API Key|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|
|**Query**|**filter_by_name**  <br>*required*|Service Principal name filter pattern|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Service Principals found in Octo DB|No Content|
|**400**|Service Principals lookup failed|No Content|
|**403**|Failed authentication|No Content|
|**404**|Service Principals not found in Octo DB|No Content|


#### Tags

* admin


#### Example HTTP request

##### Request path
```
/admin/servicePrincipals
```


##### Request header
```
json :
"string"
```


##### Request query
```
json :
{
  "filter_by_name" : "string"
}
```



