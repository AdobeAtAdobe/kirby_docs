
<a name="putentries"></a>
### Insert/Update all keys of the respective tenant based on the dataSetId ((max size limit of batch is 100)) and id is the mandatory primary key field
```
PUT /lookup/dataSets/{dataSetId}/keys
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*optional*|IMS Org Id. It will have higher priority over imsOrg query param|string|
|**Path**|**dataSetId**  <br>*required*|dataSetId|string|
|**Query**|**imsOrg**  <br>*optional*|The owning IMS organization identifier|string|


#### Body parameter
Key Batch to be inserted/updated. Max Batch size is 100

*Name* : body  
*Flags* : required  
*Type* : < object > array


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Created|[BulkIngestResponse](../definitions/BulkIngestResponse.md#bulkingestresponse)|
|**400**|Bad Request|No Content|
|**403**|Forbidden|No Content|
|**414**|URI Too Long|No Content|
|**500**|Internal Server Error|No Content|


#### Produces

* `application/json`


#### Tags

* Batch APIs


#### Example HTTP request

##### Request path
```
/lookup/dataSets/string/keys
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
  "imsOrg" : "string"
}
```


##### Request body
```
json :
[ "object" ]
```


#### Example HTTP response

##### Response 201
```
json :
{
  "status" : "string",
  "href" : "string",
  "templated" : true
}
```



