
<a name="get_connections"></a>
### Fetches a list of Connections.
```
GET /connections
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**accountId**  <br>*optional*|Foreign key to the account where the credentials and related fields of the connector and connection combination is stored.|string|
|**Query**|**connector**  <br>*optional*|The ID for the Connector this Connection was created from.|string|
|**Query**|**created**  <br>*optional*|The Unix timestamp (in milliseconds) when this object was persisted.|integer (int64)|
|**Query**|**createdClient**  <br>*optional*|The ID of the IMS client that created this object.|string|
|**Query**|**createdUser**  <br>*optional*|The ID of the user who created this object.|string|
|**Query**|**description**  <br>*optional*|The user-provided description of the Connection.|string|
|**Query**|**enabled**  <br>*optional*|Indicates the status of the Connection. Should be interpreted as disabled or suspended when set to false.|boolean|
|**Query**|**ingestStart**  <br>*optional*|Suggested date/time to start ingesting.|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**name**  <br>*optional*|The user-facing name of this Connection.|string|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**parentConnectionId**  <br>*optional*|Used in cases where global/shared data is managed by this connection. The parent connection performs the ETL/Mapping jobs, and this child connection represents a customer's membership and visibility into the parent.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**updated**  <br>*optional*|The Unix timestamp (in milliseconds) for the time of last modification.|integer (int64)|
|**Query**|**updatedUser**  <br>*optional*|The ID of the user who changed this object.|string|
|**Query**|**version**  <br>*optional*|The Semantic version of the account. Updated when the object is modified.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|connections response|< string, [connection](../definitions/connection.md#connection) > map|
|**400**|Bad request|No Content|
|**403**|forbidden|No Content|
|**404**|Not found|No Content|
|**500**|internal server error|No Content|
|**default**|unexpected error|No Content|


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/connections
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
  "accountId" : "string",
  "connector" : "string",
  "created" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "description" : "string",
  "enabled" : true,
  "ingestStart" : "string",
  "limit" : 0,
  "name" : "string",
  "orderBy" : "string",
  "parentConnectionId" : "string",
  "property" : "string",
  "start" : 0,
  "updated" : 0,
  "updatedUser" : "string",
  "version" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
"object"
```



