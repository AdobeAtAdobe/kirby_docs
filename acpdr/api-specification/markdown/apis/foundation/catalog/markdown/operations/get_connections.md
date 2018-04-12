
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
|**Query**|**accountId**  <br>*optional*|Filter by the foreign key to the account where the credentials and related fields of the connector and connection combination is stored.|string|
|**Query**|**connector**  <br>*optional*|Filter by the ID for the Connector this Connection was created from.|string|
|**Query**|**created**  <br>*optional*|Filter by the Unix timestamp (in milliseconds) when this object was persisted.|integer (int64)|
|**Query**|**createdClient**  <br>*optional*|Filter by the ID of the IMS client that created this object.|string|
|**Query**|**createdUser**  <br>*optional*|Filter by the  ID of the user who created this object.|string|
|**Query**|**description**  <br>*optional*|Filter by the user-provided description of the Connection.|string|
|**Query**|**enabled**  <br>*optional*|Indicates the status of the Connection. Should be interpreted as disabled or suspended when set to false.|boolean|
|**Query**|**ingestStart**  <br>*optional*|Filter by the suggested date/time to start ingesting.|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**name**  <br>*optional*|Filter by the user-facing name of this Connection.|string|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**parentConnectionId**  <br>*optional*|Used in cases where global/shared data is managed by this connection. The parent connection performs the ETL/Mapping jobs, and this child connection represents a customer's membership and visibility into the parent. This query param will filter all connectors by the parentConnectorId value.|string|
|**Query**|**properties**  <br>*optional*|A comma separated whitelist of top-level object properties to be returned in the response. Used to cut down the number of properties and amount of data returned in the response bodies.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**updated**  <br>*optional*|Filter by the Unix timestamp (in milliseconds) for the time of last modification.|integer (int64)|
|**Query**|**updatedUser**  <br>*optional*|Filter by the  ID of the user who changed this object.|string|
|**Query**|**version**  <br>*optional*|Filter by Semantic version of the account. Updated when the object is modified.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Connections response. The response also includes a reference to linked datasets.|< string, [connectionResponse](../definitions/connectionResponse.md#connectionresponse) > map|
|**400**|Bad request|No Content|
|**403**|Forbidden|No Content|
|**404**|Not found|No Content|
|**500**|Internal server error|No Content|
|**default**|Unexpected error|No Content|


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
  "properties" : "string",
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
{
  "56a1c00e9f8e2c53284add34" : {
    "connector" : "dfa",
    "name" : "connection_1",
    "enabled" : true,
    "version" : "1.0.0",
    "created" : 1453441038288,
    "updated" : 1453441038288,
    "createdClient" : "MCDPCatalogServiceStage",
    "imsOrg" : "4F3BB22C5631222A7F000101@AdobeOrg",
    "dataSets" : "@/connections/56a1c00e9f8e2c53284add34/dataSets",
    "statsCache" : {
      "earliestAvailableData" : null,
      "latestAvailableData" : null,
      "lastSuccess" : null,
      "recentFailure" : null
    }
  }
}
```



