
<a name="registerserviceinstanceactionusingpost"></a>
### Register action for service instance
```
POST /zenregistry/{serviceName}/instances/{instanceId}/actions
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**instanceId**  <br>*required*|instanceId|string|
|**Path**|**serviceName**  <br>*required*|serviceName|string|


#### Body parameter
actionRegistration

*Name* : actionRegistration  
*Flags* : required  
*Type* : [Action](../definitions/Action.md#action)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Created|[Action](../definitions/Action.md#action)|


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


##### Request body
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


#### Example HTTP response

##### Response 201
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



