
<a name="createconfigusingpost"></a>
### Create client config
```
POST /rulesadapter/system/config/
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|x-gw-ims-org-id|string|


#### Body parameter
clientConfigDto

*Name* : clientConfigDto  
*Flags* : required  
*Type* : [ClientConfigDto](../definitions/ClientConfigDto.md#clientconfigdto)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[ClientConfigDto](../definitions/ClientConfigDto.md#clientconfigdto)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* client-controller


#### Example HTTP request

##### Request path
```
/rulesadapter/system/config/
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
  "proxyCompany" : "string",
  "url" : "string",
  "username" : "string",
  "wsseUrl" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "proxyCompany" : "string",
  "url" : "string",
  "username" : "string",
  "wsseUrl" : "string"
}
```



