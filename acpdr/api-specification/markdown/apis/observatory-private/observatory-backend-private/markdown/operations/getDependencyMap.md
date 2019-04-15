
<a name="getdependencymap"></a>
### Perform a dependency map creation.
```
GET /observatory/dependency
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Nodes and connections are available.|[ObservatoryResponse](../definitions/ObservatoryResponse.md#observatoryresponse)|
|**503**|Internal Server Error|No Content|


#### Produces

* `application/json`


#### Tags

* Observatory


#### Example HTTP request

##### Request path
```
/observatory/dependency
```


#### Example HTTP response

##### Response 200
```
json :
{
  "nodes" : [ {
    "name" : "string",
    "displayName" : "string",
    "renderer" : "string",
    "nodeType" : "string",
    "metadata" : {
      "health" : "string",
      "grafanaUrl" : "string",
      "healthUrl" : "string",
      "splunkUrl" : "string",
      "serviceHealth" : {
        "service" : "string",
        "status" : "string",
        "dependencies" : [ {
          "service" : "string",
          "status" : "string",
          "dependencies" : [ "..." ]
        } ]
      }
    }
  } ],
  "connections" : [ {
    "source" : "string",
    "target" : "string",
    "metrics" : "string",
    "streaming" : true
  } ]
}
```



