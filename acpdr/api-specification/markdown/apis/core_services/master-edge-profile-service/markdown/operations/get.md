
<a name="get"></a>
### Return the configuration of the edge projection for the given customer. The latest definition is returned.
```
GET /data/core/ups/config/projections/{projectionid}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|IMS service token.|string|
|**Header**|**x-gw-ims-authorization**  <br>*required*|Gateway IMS service token.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Header**|**x-request-id**  <br>*optional*|Optional header that may be used for debugging purposes when investigating issues with a client flow. The same ID can be used to identify a single request to the service from a flow. A new ID should be created for each request.|string|
|**Header**|**x-user-token**  <br>*optional*|User access token.|string|
|**Path**|**projectionid**  <br>*required*||string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|The edge projection configuration is returned.|[ProjectionConfig](../definitions/ProjectionConfig.md#projectionconfig)|
|**400**|The request is malformed.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**401**|The request has not been applied because it lacks valid authentication credentials for the target resource.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**403**|The requester is not authorized to access the resource.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**404**|The edge projection configuration has not yet been created.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**405**|Client sent a request using a HTTP method that the server doesn't support.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**406**|Unacceptable content type. Client sent an Accept header for a content type which does not exist on the server.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**422**|Client sent a correct request that contained invalid values for one or more parameters.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**500**|This is an indicator of a server-side error.|No Content|
|**502**|This is an indicator that the back-end service did not send a valid response.|No Content|
|**503**|This is an indicator of a potential server overload.|No Content|
|**504**|This is an indicator that the back-end service did not complete a response within an allowed time period.|No Content|


#### Produces

* `application/vnd.adobe.platform.projectionConfig+json; version=1`


#### Tags

* Projection Configuration


#### Example HTTP request

##### Request path
```
/data/core/ups/config/projections/string
```


##### Request header
```
json :
"Bearer <token>"
```


#### Example HTTP response

##### Response 200
```
json :
{
  "selector" : "person.gender,addresses.city,phoneNumbers.number",
  "ttl" : 86400,
  "replicationPolicy" : "PROACTIVE",
  "dataCenters" : [ "string" ],
  "id" : "111-222-333-444",
  "modelName" : "profile",
  "_links" : "object"
}
```


##### Response 400
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client error"
}
```


##### Response 401
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client error"
}
```


##### Response 403
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client error"
}
```


##### Response 404
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client error"
}
```


##### Response 405
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client error"
}
```


##### Response 406
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client error"
}
```


##### Response 422
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client error"
}
```



