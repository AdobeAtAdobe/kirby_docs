
<a name="get_account_by_id"></a>
### Fetches Accounts by ID.
```
GET /accounts/{id}
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
/accounts/string
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



