
<a name="sendsyncmarker"></a>
### Send Sync Markers to Pipeline
```
POST /pipeline/consumer/sync
```


#### Description
Used when the consumer wants the pipeline to manage the offsets.


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|Must be in the following format 'Bearer $TOKEN', Where $TOKEN is either an IMS Service Token (used for authenticating service) or an IMS Gateway Token (used for authenticating IMS Org)|string||
|**Header**|**Content-Type**  <br>*optional*||enum (text/plain)|`"text/plain"`|


#### Body parameter
The sync marker

*Name* : body  
*Flags* : required  
*Type* : [SyncMarker](../definitions/SyncMarker.md#syncmarker)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|No Content|
|**400**|There was a problem with the request. See the response body for a more specific error message|No Content|
|**401**|Unauthorized - Need to provide a valid bearer token|No Content|
|**500**|Internal server error|No Content|
|**503**|Service is not currently available. Clients should retry at least 3 times using an exponential back-off strategy  <br>**Headers** :   <br>`Retry-After` (integer) : Specifies number of seconds to retry after.|No Content|


#### Produces

* `application/json`


#### Tags

* Send Sync Markers


#### Example HTTP request

##### Request path
```
/pipeline/consumer/sync
```


##### Request header
```
json :
"string"
```


##### Request body
```
json :
{ }
```



