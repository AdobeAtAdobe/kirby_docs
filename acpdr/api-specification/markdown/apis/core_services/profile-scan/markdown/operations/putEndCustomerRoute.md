
<a name="putendcustomerroute"></a>
### Create single or multiple Profile and Touchpoint records. Not necessarily for the same endcustomer. 
```
PUT /profile/endcustomers
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-client-id**  <br>*required*|IMS Client Id|string|


#### Body parameter
Set of Profile and Touchpoint records to be created. Each should be in Json format.

*Name* : content  
*Flags* : required  
*Type* : < [EndCustomerEntity](../definitions/EndCustomerEntity.md#endcustomerentity) > array


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Records created successfully.|No Content|
|**403**|You are forbidden to make this request.|No Content|
|**422**|Failed to create the records.|No Content|
|**503**|Service unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* endcustomers


#### Example HTTP request

##### Request path
```
/profile/endcustomers
```


##### Request header
```
json :
"southwest@adobe.com"
```


##### Request body
```
json :
[ {
  "xid" : "string",
  "timestamp" : "string",
  "sourceId" : "string",
  "record" : "string"
} ]
```



