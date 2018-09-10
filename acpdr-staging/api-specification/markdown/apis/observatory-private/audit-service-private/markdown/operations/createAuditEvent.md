
<a name="createauditevent"></a>
### Provides a rest endpoint to post audit data
```
POST /audits
```


#### Description
Post request to audit service


#### Body parameter
Audit event in json format

*Name* : auditevent  
*Flags* : required


|Name|Description|Schema|
|---|---|---|
|**action**  <br>*required*|Capture the CRUD operations performed on a stream  <br>**Example** : `"string"`|string|
|**imsOrgId**  <br>*required*|ImsOrgId  <br>**Example** : `"string"`|string|
|**resource**  <br>*required*|**Example** : `"[resource](#resource)"`|[resource](../definitions/resource.md#resource)|
|**service**  <br>*required*|**Example** : `"[service](#service)"`|[service](../definitions/service.md#service)|
|**source**  <br>*required*|Specifies the source of event, Example- azure,marketingcloud,creativecloud,etc  <br>**Example** : `"string"`|string|
|**tags**  <br>*optional*|Additional and optional metadata for the audit record  <br>**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**timestamp**  <br>*required*|Time at which the event occured in UTC in ISO 8601 format in UTC,Example 2017-10-31T00:02:04.232Z  <br>**Example** : `"string"`|string|
|**userIdentifier**  <br>*required*|Detail about user of the service  <br>**Example** : `"string"`|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|OK|string|
|**400**|Invalid Request|string|
|**401**|Unauthorized Request|string|
|**500**|Internal Server Error|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**503**|Service Unavailable|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Audit Service API


#### Security

|Type|Name|
|---|---|
|**apiKey**|**[IMSClientId](security.md#imsclientid)**|
|**apiKey**|**[ImsBearerToken](security.md#imsbearertoken)**|


#### Example HTTP request

##### Request path
```
/audits
```


##### Request body
```
json :
{
  "source" : "string",
  "service" : {
    "serviceId" : "SKMS id"
  },
  "resource" : {
    "resourceId" : "string"
  },
  "action" : "string",
  "imsOrgId" : "string",
  "timestamp" : "string",
  "tags" : {
    "string" : "string"
  },
  "userIdentifier" : "string"
}
```


#### Example HTTP response

##### Response 201
```
json :
"string"
```


##### Response 400
```
json :
"string"
```


##### Response 401
```
json :
"string"
```


##### Response 500
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 503
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```



