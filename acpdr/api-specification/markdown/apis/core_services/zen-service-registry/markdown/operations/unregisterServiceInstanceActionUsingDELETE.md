
<a name="unregisterserviceinstanceactionusingdelete"></a>
### Unregister action for service instance
```
DELETE /zenregistry/{serviceName}/instances/{instanceId}/actions/{actionId}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**actionId**  <br>*required*|actionId|string|
|**Path**|**instanceId**  <br>*required*|instanceId|string|
|**Path**|**serviceName**  <br>*required*|serviceName|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[Action](../definitions/Action.md#action)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* actions


#### Example HTTP request

##### Request path
```
/zenregistry/string/instances/string/actions/string
```


#### Example HTTP response

##### Response 200
```
json :
{
  "id" : "string",
  "name" : "string",
  "requestSchema" : "string",
  "responseSchema" : "string",
  "version" : {
    "major" : 0,
    "minor" : 0,
    "patch" : 0
  }
}
```



