
<a name="connection_parameters-options"></a>
### Describes allowed actions.
```
OPTIONS /connection_parameters
```


#### Description
Returns headers required to comply with Cross Origin Resource Sharing (CORS)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**204**|No content  <br>**Headers** :   <br>`Access-Control-Allow-Headers` (string)  <br>`Access-Control-Allow-Origin` (string)  <br>`Access-Control-Max-Age` (string)  <br>`Access-Control-Allow-Methods` (string)|No Content|


#### Example HTTP request

##### Request path
```
/connection_parameters
```



