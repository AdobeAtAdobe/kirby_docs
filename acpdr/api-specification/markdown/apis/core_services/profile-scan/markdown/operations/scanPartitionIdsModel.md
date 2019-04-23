
<a name="scanpartitionidsmodel"></a>
### Retrieves partition ranges of a model.
```
OPTIONS /models/{model}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Client Id|string|
|**Path**|**model**  <br>*required*|Model name whose partition ranges will be retrieved|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Partition Ranges of the given model successfully returned.|[ScanCustomerPartitionPageResponse](../definitions/ScanCustomerPartitionPageResponse.md#scancustomerpartitionpageresponse)|
|**403**|You are forbidden to make this request.|No Content|
|**404**|Model with the given model name does not exist.|No Content|
|**503**|Service unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* models


#### Example HTTP request

##### Request path
```
/models/12345678
```


##### Request header
```
json :
"southwest@adobe.com"
```


#### Example HTTP response

##### Response 200
```
json :
{
  "numberOfPartitions" : "string",
  "linkForPartitions" : [ "string" ]
}
```



