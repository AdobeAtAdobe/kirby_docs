
<a name="getserviceusingget"></a>
### Get service details: all instances with registered consumers and actions
```
GET /zenregistry/{serviceName}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**serviceName**  <br>*required*|serviceName|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[Service](../definitions/Service.md#service)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* services


#### Example HTTP request

##### Request path
```
/zenregistry/string
```


#### Example HTTP response

##### Response 200
```
json :
{
  "name" : "string",
  "instances" : [ {
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
  } ]
}
```



