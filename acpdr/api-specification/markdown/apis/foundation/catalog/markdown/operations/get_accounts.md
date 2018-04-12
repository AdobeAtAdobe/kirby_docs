
<a name="get_accounts"></a>
### Fetches a list of Accounts.
```
GET /accounts
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**connector**  <br>*optional*|The ID for the Connector this Account params was created from.|string|
|**Query**|**created**  <br>*optional*|Filter by the Unix timestamp (in milliseconds) when this object was persisted.|integer (int64)|
|**Query**|**createdClient**  <br>*optional*|Filter by the ID of the IMS client that created this object.|string|
|**Query**|**createdUser**  <br>*optional*|Filter by the  ID of the user who created this object.|string|
|**Query**|**description**  <br>*optional*|Filter by user-provided description of the account.|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**properties**  <br>*optional*|A comma separated whitelist of top-level object properties to be returned in the response. Used to cut down the number of properties and amount of data returned in the response bodies.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**updated**  <br>*optional*|Filter by the Unix timestamp (in milliseconds) for the time of last modification.|integer (int64)|
|**Query**|**updatedUser**  <br>*optional*|Filter by the  ID of the user who changed this object.|string|
|**Query**|**version**  <br>*optional*|Filter by Semantic version of the account. Updated when the object is modified.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|account response.|< string, [accountResponse](../definitions/accountResponse.md#accountresponse) > map|
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
/accounts
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
  "connector" : "string",
  "created" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "description" : "string",
  "limit" : 0,
  "orderBy" : "string",
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
  "597650bf4b358a650c6127bb" : {
    "connector" : "salesforce",
    "version" : "1.0.0",
    "created" : 1500926143359,
    "updated" : 1500926143359,
    "createdClient" : "MCDPCatalogServiceStage",
    "createdUser" : "MCDPCatalogServiceStage@AdobeID",
    "updatedUser" : "MCDPCatalogServiceStage@AdobeID",
    "imsOrg" : "4F3BB22C5631222A7F000101@AdobeOrg",
    "params" : {
      "username" : "foo",
      "password" : {
        "value" : "XXXXXXX",
        "isSecret" : true
      },
      "securityToken" : {
        "value" : "XXXXXXX",
        "isSecret" : true
      }
    }
  }
}
```



