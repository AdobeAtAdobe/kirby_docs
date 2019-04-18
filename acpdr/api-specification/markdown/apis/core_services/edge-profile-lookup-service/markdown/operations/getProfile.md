
<a name="getprofile"></a>
### Retrieve the profile associated with the id.
```
GET /data/core/ups/models/{model}/{id}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*optional*|Authorization|string|
|**Header**|**x-gw-ims-client-id**  <br>*optional*|IMS Client ID|string|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Organization ID|string|
|**Header**|**x-request-id**  <br>*optional*|Optional header that may be used for debugging purposes when investigating issues with a client flow. The same ID can be used to identify a single request to the service from a flow. A new ID should be created for each request.|string|
|**Path**|**id**  <br>*required*|The id used for profile retrieval|string|
|**Path**|**model**  <br>*required*|The XDM model / schema used of the profile being retrieved|string|
|**Query**|**fields**  <br>*optional*|Comma separated list strings used for filtering|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|If found, the requested profile is returned.|[Profile](../definitions/Profile.md#profile)|
|**400**|Bad Request. The request is malformed|[Problem Detail](../definitions/Problem_Detail.md#problem-detail)|
|**401**|Unauthorized. The request has not been applied because it  lacks valid authentication credentials for the target resource.|[Problem Detail](../definitions/Problem_Detail.md#problem-detail)|
|**403**|Forbidden. That combination of arguments is not allowed.|[Problem Detail](../definitions/Problem_Detail.md#problem-detail)|
|**405**|Method Not Allowed. Client sent a request using a HTTP method that the server doesn't support.|[Problem Detail](../definitions/Problem_Detail.md#problem-detail)|
|**406**|Not Acceptable. Unacceptable content type. The caller sent an <b>Accept</b> header for a content type which does not exist on the server|[Problem Detail](../definitions/Problem_Detail.md#problem-detail)|
|**422**|Unprocessable Entity. Client sent a correct request that contained invalid values for one or more parameters.|[Problem Detail](../definitions/Problem_Detail.md#problem-detail)|
|**500**|Internal Server Error. This is an indicator of a server-side error.|No Content|
|**502**|Bad Gateway. This is an indicator that the search back-end did not send a valid response.|No Content|
|**503**|Service Unavailable. This is an indicator of a potential server overload.|No Content|
|**504**|Gateway Timeout. This is an indicator that the search back-end did not complete a response within an allowed time period.|No Content|


#### Produces

* `application/vnd.adobe.platform.profile+json; version=1`


#### Tags

* profiles


#### Example HTTP request

##### Request path
```
/data/core/ups/models/profile/GbMCQm-uOYBLtxhNbYHfZqq6GPMi
```


##### Request header
```
json :
"1111-2222-3333-4444"
```


##### Request query
```
json :
{
  "fields" : "person.firstName"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "person" : {
    "firstName" : "John",
    "lastName" : "Doe",
    "middleName" : "Cameron",
    "courtesyTitle" : "Mr.",
    "birthDay" : 29,
    "birthMonth" : 2,
    "birthYear" : 1998,
    "gender" : "male"
  },
  "addresses" : [ {
    "city" : "San Francisco",
    "type" : "home",
    "street1" : "Main Street"
  } ],
  "_links" : "object"
}
```


##### Response 400
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client side error",
  "detail" : "Invalid ID format"
}
```


##### Response 401
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client side error",
  "detail" : "Invalid ID format"
}
```


##### Response 403
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client side error",
  "detail" : "Invalid ID format"
}
```


##### Response 405
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client side error",
  "detail" : "Invalid ID format"
}
```


##### Response 406
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client side error",
  "detail" : "Invalid ID format"
}
```


##### Response 422
```
json :
{
  "type" : "https://mcloud.io/client-error",
  "status" : "4xx",
  "title" : "Client side error",
  "detail" : "Invalid ID format"
}
```



