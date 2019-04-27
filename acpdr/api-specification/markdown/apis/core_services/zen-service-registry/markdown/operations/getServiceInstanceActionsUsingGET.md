
<a name="getserviceinstanceactionsusingget"></a>
### List actions registered by service instance
```
GET /zenregistry/{serviceName}/instances/{instanceId}/actions
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**instanceId**  <br>*required*|instanceId|string|
|**Path**|**serviceName**  <br>*required*|serviceName|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[ServiceInstanceActions](../definitions/ServiceInstanceActions.md#serviceinstanceactions)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* actions


#### Example HTTP request

##### Request path
```
/zenregistry/string/instances/string/actions
```


#### Example HTTP response

##### Response 200
```
json :
{
  "instanceId" : "string",
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
  } ]
}
```



