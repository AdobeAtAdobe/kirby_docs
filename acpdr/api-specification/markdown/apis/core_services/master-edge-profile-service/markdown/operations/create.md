
<a name="create"></a>
### Creates the edge projection configuration for a customer.
```
POST /data/core/ups/config/projections
```


#### Description
The API response is immediate, but the actual changes to the projections on the edges take place asynchronously. There is no guarantee whatsoever that changes to the definition of the projection are reflected instantly on the edges – in fact, it's best to assume that there is a noticeable amount of time between the update of the definition of the projection and the update of the actual projection on any edge.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|IMS service token.|string|
|**Header**|**x-gw-ims-authorization**  <br>*required*|Gateway IMS service token.|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Header**|**x-request-id**  <br>*optional*|Optional header that may be used for debugging purposes when investigating issues with a client flow. The same ID can be used to identify a single request to the service from a flow. A new ID should be created for each request.|string|
|**Header**|**x-user-token**  <br>*optional*|User access token.|string|
|**Query**|**modelName**  <br>*required*||string|


#### Body parameter
*Name* : body  
*Flags* : required  
*Type* : [InputProjectionConfig](../definitions/InputProjectionConfig.md#inputprojectionconfig)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Creation was successful.|[ProjectionConfig](../definitions/ProjectionConfig.md#projectionconfig)|
|**400**|The request is malformed.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**401**|The request has not been applied because it lacks valid authentication credentials for the target resource.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**403**|The requester is not authorized to access the resource.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**405**|Client sent a request using a HTTP method that the server doesn't support.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**406**|Unacceptable content type. Client sent an Accept header for a content type which does not exist on the server.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**409**|Projection config already exists.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**422**|Client sent a correct request that contained invalid values for one or more parameters.|[ProblemDetail](../definitions/ProblemDetail.md#problemdetail)|
|**500**|This is an indicator of a server-side error.|No Content|
|**502**|This is an indicator that the back-end service did not send a valid response.|No Content|
|**503**|This is an indicator of a potential server overload.|No Content|
|**504**|This is an indicator that the back-end service did not complete a response within an allowed time period.|No Content|


#### Consumes

* `application/vnd.adobe.platform.projectionConfig+json; version=1`


#### Produces

* `application/vnd.adobe.platform.projectionConfig+json; version=1`


#### Tags

* Projection Configuration


#### Example HTTP request

##### Request path
```
/data/core/ups/config/projections
```


##### Request header
```
json :
"Bearer <token>"
```


##### Request query
```
json :
{
  "modelName" : "string"
}
```


##### Request body
```
json :
{
  "properties" : "person.gender,addresses.city,phoneNumbers.number",
  "ttl" : "86400"
}
```


#### Example HTTP response

##### Response 201
```
json :
{
  "selector" : "person.gender,addresses.city,phoneNumbers.number",
  "ttl" : 86400,
  "replicationPolicy" : "PROACTIVE",
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


##### Response 409
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



