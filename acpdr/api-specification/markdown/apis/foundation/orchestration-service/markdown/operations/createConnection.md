
<a name="createconnection"></a>
### Create a Connection
```
POST /connections
```


#### Description
Connection encapsulates the details of third party services


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS Org Id|string|


#### Body parameter
Connection payload

*Name* : body  
*Flags* : required  
*Type* : [Connection](../definitions/Connection.md#connection)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Connection Created  <br>**Headers** :   <br>`Location` (string) : Location of the newly created Connection instance.|No Content|
|**400**|Bad Request|No Content|
|**401**|Forbidden|No Content|
|**500**|Internal Server Error|No Content|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Describe Operations on Connections


#### Example HTTP request

##### Request path
```
/connections
```


##### Request header
```
json :
"string"
```


##### Request body
```
json :
{
  "name" : "string",
  "description" : "string",
  "uriEndpoint" : "string",
  "metadata" : {
    "string" : "string"
  }
}
```



