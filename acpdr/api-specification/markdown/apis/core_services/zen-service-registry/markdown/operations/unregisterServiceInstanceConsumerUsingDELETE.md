
<a name="unregisterserviceinstanceconsumerusingdelete"></a>
### Unregister consumer by id
```
DELETE /zenregistry/{serviceName}/instances/{instanceId}/consumers/{consumerId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**consumerId**  <br>*required*|consumerId|string|
|**Path**|**instanceId**  <br>*required*|instanceId|string|
|**Path**|**serviceName**  <br>*required*|serviceName|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[Consumer](../definitions/Consumer.md#consumer)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* consumers


#### Example HTTP request

##### Request path
```
/zenregistry/string/instances/string/consumers/string
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : "string",
  "eventSchema" : "string",
  "expression" : "string",
  "consumerGroup" : "string"
}
```



