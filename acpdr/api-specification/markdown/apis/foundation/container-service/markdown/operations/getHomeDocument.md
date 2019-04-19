
<a name="gethomedocument"></a>
### Returns the API Home Document for the Container Service
```
GET /
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|The service home document|No Content|
|**403**|Forbidden|No Content|
|**500**|Internal server error|No Content|
|**default**|Unexpected error|No Content|


#### Produces

* `application/json-home`


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



