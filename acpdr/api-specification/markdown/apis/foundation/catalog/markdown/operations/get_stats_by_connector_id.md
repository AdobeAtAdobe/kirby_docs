
<a name="get_stats_by_connector_id"></a>
### Fetches statistics for a given Connector.
```
GET /connectors/{id}/stats
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Path**|**id**  <br>*required*|Object ID|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Returns connection count for given connector id.|[Response 200](#get_stats_by_connector_id-response-200)|
|**400**|Bad request|No Content|
|**403**|Forbidden|No Content|
|**404**|Not found|No Content|
|**500**|Internal server error|No Content|
|**default**|Unexpected error|No Content|

<a name="get_stats_by_connector_id-response-200"></a>
**Response 200**

|Name|Description|Schema|
|---|---|---|
|**connectorId**  <br>*optional*|**Example** : `0`|integer|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/connectors/string/stats
```


##### Request header
```
json :
"string"
```


#### Example HTTP response

##### Response 200
```
json :
"object"
```



