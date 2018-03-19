
<a name="post_service_resources"></a>
### Allows for multiple and related Catalog API calls.
```
POST /
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|


#### Body parameter
See: https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=DMSArchitecture&title=Catalog+Service#CatalogService-BatchingCatalogAPIRequests.

*Name* : resources  
*Flags* : required  
*Type* : < [resourceItem](../definitions/resourceItem.md#resourceitem) > array


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/resource/resourceId ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
|**400**|Bad request|No Content|
|**403**|forbidden|No Content|
|**500**|internal server error|No Content|
|**default**|unexpected error|No Content|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[Bearer](security.md#bearer)**|


#### Example HTTP request

##### Request path
```
/
```


##### Request header
```
json :
"string"
```


##### Request body
```
json :
[ {
  "id" : "string",
  "method" : "string",
  "resource" : "string",
  "body" : "object"
} ]
```


#### Example HTTP response

##### Response 201
```
json :
[ "string" ]
```



