
<a name="registerserviceinstanceconsumerusingpost"></a>
### Register consumer for service instance
```
POST /zenregistry/{serviceName}/instances/{instanceId}/consumers
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**instanceId**  <br>*required*|instanceId|string|
|**Path**|**serviceName**  <br>*required*|serviceName|string|


#### Body parameter
consumerRegistration

*Name* : consumerRegistration  
*Flags* : required  
*Type* : [Consumer](../definitions/Consumer.md#consumer)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Created|[Consumer](../definitions/Consumer.md#consumer)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* consumers


#### Example HTTP request

##### Request path
```
/zenregistry/string/instances/string/consumers
```


##### Request body
```
json :
{
  "id" : "string",
  "eventSchema" : "string",
  "expression" : "string",
  "consumerGroup" : "string"
}
```


#### Example HTTP response

##### Response 201
```
json :
{
  "id" : "string",
  "eventSchema" : "string",
  "expression" : "string",
  "consumerGroup" : "string"
}
```



