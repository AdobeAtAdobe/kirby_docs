
<a name="post_transform"></a>
### Saves a new Transform.
```
POST /transforms
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-api-key**  <br>*required*|The API key belonging to the calling client.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|


#### Body parameter
Transform to be posted

*Name* : transform  
*Flags* : required  
*Type* : [transform](../definitions/transform.md#transform)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Array[ @/transforms/transformId ]  <br>**Headers** :   <br>`Location` (string) : The URI of the newly created resource.|< string > array|
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
/transforms
```


##### Request header
```
json :
"string"
```


##### Request body
```
json :
{
  "version" : "string",
  "imsOrg" : "string",
  "inputs" : [ "object" ],
  "outputs" : [ "object" ],
  "dataSetId" : "string",
  "created" : 0,
  "createdClient" : "string",
  "createdUser" : "string",
  "updatedUser" : "string",
  "updated" : 0,
  "name" : "string",
  "body" : "string",
  "language" : "string",
  "codeUrl" : "string",
  "vehicleUrl" : "string",
  "args" : [ "string" ]
}
```


#### Example HTTP response

##### Response 201
```
json :
[ "string" ]
```



