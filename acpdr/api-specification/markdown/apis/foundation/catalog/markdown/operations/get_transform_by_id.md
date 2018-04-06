
<a name="get_transform_by_id"></a>
### Fetches Transforms by ID.
```
GET /transforms/{id}
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
|**200**|Transform object for given transformId.|< string, [transformResponse](../definitions/transformResponse.md#transformresponse) > map|
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
/transforms/string
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
  "5abac7063998860540c7b848" : {
    "version" : "1.0.5",
    "imsOrg" : "4F3BB22C5631222A7F000101@AdobeOrg",
    "created" : 1522190086195,
    "createdClient" : "acp_foundation_catalog",
    "createdUser" : "acp_foundation_catalog@AdobeID",
    "updatedUser" : "acp_foundation_catalog@AdobeID",
    "updated" : 1522190612384,
    "codeUrl" : "git://example.com/foo/bar/something.git",
    "args" : [ "--context_param profile_dsv_in0.inputPath=${CATALOG.DSV.5ab540d0864cf0267448ead4.inputFiles}" ],
    "inputs" : [ ],
    "outputs" : [ {
      "dataSet" : "@/dataSets/123456"
    } ]
  }
}
```



