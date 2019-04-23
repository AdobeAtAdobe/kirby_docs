
<a name="getservicesusingget"></a>
### List all registered services, instances, their consumers and action handlers
```
GET /zenregistry
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[Registry](../definitions/Registry.md#registry)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* services


#### Example HTTP request

##### Request path
```
/zenregistry
```


#### Example HTTP response

##### Response 200
```
json :
{
  "services" : [ {
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
  } ]
}
```



