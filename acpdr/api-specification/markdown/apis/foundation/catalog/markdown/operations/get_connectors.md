
<a name="get_connectors"></a>
### Fetches the list of Connectors.
```
GET /connectors
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|
|**Query**|**category**  <br>*optional*|Connectors currently have 2 categories: 1) standard: we are connecting to a known source with known data (ie. other companies data stores) or 2) custom: a generaic connector to FTP or S3 etc. This query param can be used to filter all connectors by their category.|string|
|**Query**|**description**  <br>*optional*|Filter by the introductory text describing this connector, it's primary functionality, relevant data sets, etc.|string|
|**Query**|**ingestStart**  <br>*optional*|Filter by the suggested date/time to start ingesting.|string|
|**Query**|**limit**  <br>*optional*|Limit response to a specified number of objects. Ex. limit=10|integer|
|**Query**|**maxConnections**  <br>*optional*|Filter by the maximum number of connections a customer (IMS Org) can create of this type.|integer|
|**Query**|**name**  <br>*optional*|Filter by the name of this Connector.|string|
|**Query**|**orderBy**  <br>*optional*|Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated. This was previously called sort.|string|
|**Query**|**properties**  <br>*optional*|A comma separated whitelist of top-level object properties to be returned in the response. Used to cut down the number of properties and amount of data returned in the response bodies.|string|
|**Query**|**property**  <br>*optional*|Regex used to filter objects in the response. Ex. property=name~^test.|string|
|**Query**|**start**  <br>*optional*|Returns results from a specific offset of objects. This was previously called offset. Ex. start=3.|integer|
|**Query**|**type**  <br>*optional*|Filter by the ingest type for this Connector.|string|
|**Query**|**uiCreationAllowed**  <br>*optional*|When set to false, this connector should not be shown by the UI Connector Library. Essentially, the UI is not to create connectors of this type, but should show status related to this connector elsewhere.|boolean|
|**Query**|**version**  <br>*optional*|Filter by Semantic version of the account. Updated when the object is modified.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of all connectors for given ims_org_id.|< string, [connectorResponse](../definitions/connectorResponse.md#connectorresponse) > map|
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
/connectors
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
  "category" : "string",
  "description" : "string",
  "ingestStart" : "string",
  "limit" : 0,
  "maxConnections" : 0,
  "name" : "string",
  "orderBy" : "string",
  "properties" : "string",
  "property" : "string",
  "start" : 0,
  "type" : "string",
  "uiCreationAllowed" : true,
  "version" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "dynamics-online" : {
    "name" : "Microsoft Dynamics 365",
    "category" : "standard",
    "version" : "0.1",
    "type" : "batch",
    "description" : "",
    "documents" : [ ],
    "ingestStart" : "",
    "frequency" : {
      "userEditable" : "minute",
      "minute" : "30",
      "hour" : "2",
      "month" : "*",
      "day" : "*",
      "dayOfWeek" : "*",
      "timezone" : "",
      "live" : false
    },
    "uiCreationAllowed" : true,
    "paramsSchema" : {
      "properties" : {
        "organizationName" : {
          "description" : "The organization name of the Dynamics instance.",
          "type" : "string"
        },
        "username" : {
          "description" : "The user's identification name associated with the credential.",
          "type" : "string"
        },
        "password" : {
          "description" : "The Dynamics password.",
          "type" : "string"
        },
        "organizationUri" : {
          "description" : "The Dynamics urganization URI",
          "type" : "string"
        },
        "akvSecretPassword" : {
          "description" : "The Azure Key Vault secret identifier of the password for the user name associated with the credential.",
          "type" : "string"
        }
      },
      "required" : [ "username", "password", "organizationUri" ]
    },
    "stats" : "@/connectors/dynamics-online/stats"
  }
}
```



