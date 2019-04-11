
<a name="heartbeatusingput"></a>
### Send heartbeat for service instance
```
PUT /zenregistry/{serviceName}/instances/{instanceId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**instanceId**  <br>*required*|instanceId|string|
|**Path**|**serviceName**  <br>*required*|serviceName|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[ServiceInstance](../definitions/ServiceInstance.md#serviceinstance)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* service instances


#### Example HTTP request

##### Request path
```
/zenregistry/string/instances/string
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : "string",
  "port" : 0,
  "host" : "string",
  "consumers" : [ {
    "id" : "string",
    "eventSchema" : "string",
    "expression" : "string",
    "consumerGroup" : "string"
  } ],
  "actions" : [ {
    "id" : "string",
    "name" : "string",
    "requestSchema" : "string",
    "responseSchema" : "string",
    "version" : {
      "major" : 0,
      "minor" : 0,
      "patch" : 0
    }
  } ],
  "lastUpdatedTimestamp" : 0
}
```



