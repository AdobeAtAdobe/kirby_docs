
<a name="unregisterallserviceinstanceconsumersusingdelete"></a>
### Unregister all consumer for service instance
```
DELETE /zenregistry/{serviceName}/instances/{instanceId}/consumers
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**instanceId**  <br>*required*|instanceId|string|
|**Path**|**serviceName**  <br>*required*|serviceName|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[ServiceInstanceConsumers](../definitions/ServiceInstanceConsumers.md#serviceinstanceconsumers)|


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


#### Example HTTP response

##### Response 200
```
json :
{
  "instanceId" : "string",
  "consumers" : [ {
    "id" : "string",
    "eventSchema" : "string",
    "expression" : "string",
    "consumerGroup" : "string"
  } ]
}
```



