
<a name="publishdcsmessagewithoutinletid"></a>
### Publish Messages to DCS without an Inlet ID
```
POST /collection/
```


#### Description
This API is used by any mobile application, web application or a service to stream data into ACP. Data Collection service uses the default inlet-id for that imsOrg to retrieve associated metadata to process data and land it on a designated Pipeline topic for the downstream systems to consume


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|Bearer $token. IMS Service token. Authorization token will be necessary only if during inlet registration the need for authorization is specified|string|
|**Header**|**Content-Type**  <br>*required*||enum (application/json)|
|**Header**|**x-gw-ims-org-id**  <br>*required*|The owning IMS organization identifier|string|
|**Query**|**debug**  <br>*optional*||enum (, )|


#### Body parameter
The message to be published in DCS

*Name* : body  
*Flags* : required  
*Type* : [Message](../definitions/Message.md#message)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|[Response](../definitions/Response.md#response)|
|**400**|There was a problem with the request. See the response body for a more specific error message|No Content|
|**401**|Unauthorized - Need to provide a valid bearer token|No Content|
|**500**|Internal server error|No Content|
|**503**|Service is not currently available. Clients should retry at least 3 times using an exponential back-off strategy  <br>**Headers** :   <br>`Retry-After` (integer) : Specifies number of seconds to retry after.|No Content|


#### Produces

* `application/json`


#### Tags

* Publish Messages without an Inlet ID


#### Example HTTP request

##### Request path
```
/collection/
```


##### Request header
```
json :
"string"
```


##### Request query
```
json :
{
  "debug" : true
}
```


##### Request body
```
json :
{
  "header" : {
    "schema" : {
      "name" : "ExperienceEvent"
    },
    "imsOrg" : "368B035E52D87F760A490D44@AdobeOrg",
    "source" : {
      "id" : "event-generator"
    },
    "eventType" : "MobileInteraction",
    "action" : "Update"
  },
  "body" : {
    "profileEvent" : {
      "id" : "80846848",
      "timestamp" : 1518486924,
      "endCustomerIds" : {
        "mcId" : ""
      },
      "person" : {
        "firstName" : "John",
        "lastName" : "Doe",
        "courtesyTitle" : "",
        "birthDay" : 1,
        "birthMonth" : 1,
        "birthYear" : 1970,
        "gender" : "unknown"
      }
    }
  }
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "inletId" : "string",
  "xactionId" : "string",
  "receivedTimeMs" : 0
}
```



