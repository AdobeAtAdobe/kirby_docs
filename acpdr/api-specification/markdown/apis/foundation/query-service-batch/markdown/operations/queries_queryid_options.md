
<a name="queries-queryid-options"></a>
### Describes allowed actions.
```
OPTIONS /queries/{queryid}
```


#### Description
Returns headers required to comply with Cross Origin Resource Sharing (CORS)


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**queryid**  <br>*required*|Query ID|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**204**|No content  <br>**Headers** :   <br>`Access-Control-Allow-Headers` (string)  <br>`Access-Control-Allow-Origin` (string)  <br>`Access-Control-Max-Age` (string)  <br>`Access-Control-Allow-Methods` (string)|No Content|


#### Example HTTP request

##### Request path
```
/queries/string
```



