
<a name="registerserviceinstanceusingpost"></a>
### Register service instance with consumers and action handlers
```
POST /zenregistry/{serviceName}/instances
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**serviceName**  <br>*required*|serviceName|string|


#### Body parameter
serviceInstance

*Name* : serviceInstance  
*Flags* : required  
*Type* : [ServiceInstance](../definitions/ServiceInstance.md#serviceinstance)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Created|[ServiceInstance](../definitions/ServiceInstance.md#serviceinstance)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* service instances


#### Example HTTP request

##### Request path
```
/zenregistry/string/instances
```


##### Request body
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


#### Example HTTP response

##### Response 201
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



