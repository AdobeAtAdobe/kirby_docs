
<a name="getendcustomerroute"></a>
### Retrieve records of an endcustomer by id.
```
GET /profile/endcustomers/{endCustomerId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-client-id**  <br>*required*|IMS Client Id|string|
|**Path**|**endCustomerId**  <br>*required*|Id of the endcustomer whose records will be retrieved|string|
|**Query**|**limit**  <br>*optional*|How many entries should be present in a page. 1000 if not specified.|integer|
|**Query**|**start**  <br>*optional*|Ordering value of first record in result. Dictates the ordering value of first record in desired page. Ordering field is a combination of schemaRef Index and the ordering field within a schemaRef (in reverse order).|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Records of given {endCustomerId} successfully returned.|[EndCustomerEntityPageResponse](../definitions/EndCustomerEntityPageResponse.md#endcustomerentitypageresponse)|
|**403**|You are forbidden to make this request.|No Content|
|**404**|EndCustomer with id {endCustomerId} does not exist.|No Content|
|**503**|Service unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* endcustomers


#### Example HTTP request

##### Request path
```
/profile/endcustomers/12345678
```


##### Request header
```
json :
"southwest@adobe.com"
```


##### Request query
```
json :
{
  "limit" : 100,
  "start" : "start=1:12345678"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "page" : {
    "orderField" : "string",
    "offset" : "string",
    "size" : 0
  },
  "link" : {
    "nextPage" : "string"
  },
  "children" : [ {
    "xid" : "string",
    "timestamp" : "string",
    "sourceId" : "string",
    "record" : "string"
  } ]
}
```



