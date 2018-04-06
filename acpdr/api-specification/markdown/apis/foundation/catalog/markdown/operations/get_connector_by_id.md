
<a name="get_connector_by_id"></a>
### Fetches Connectors by ID.
```
GET /connectors/{id}
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
|**200**|Connector object for input connectorId.|< string, [connectorResponse](../definitions/connectorResponse.md#connectorresponse) > map|
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
/connectors/string
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



