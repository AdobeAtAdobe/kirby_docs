
<a name="get_credentials_by_data_set_id"></a>
### Fetches credentials for the given dataSet.
```
GET /dataSets/{id}/credentials
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|
|**Query**|**batchId**  <br>*optional*|If wishing to write, the batchId used during writing. Required for buliding a stage path.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Creadential object given dataSet.|[dataSetCredentials](../definitions/dataSetCredentials.md#datasetcredentials)|
|**400**|Bad request|No Content|
|**403**|Forbidden|No Content|
|**500**|Internal server error|No Content|
|**default**|Unexpected error|No Content|


#### Consumes

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/dataSets/string/credentials
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
  "batchId" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "dataSetId" : "string",
  "path" : "string",
  "stagePath" : "string",
  "credentials" : {
    "clientKey" : "string",
    "clientId" : "string",
    "tenantId" : "string",
    "resourceGroupName" : "string",
    "subscriptionId" : "string"
  }
}
```



