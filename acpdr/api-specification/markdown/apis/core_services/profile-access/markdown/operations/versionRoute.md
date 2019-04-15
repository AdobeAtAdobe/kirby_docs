
<a name="versionroute"></a>
### Return version information
```
GET /version
```


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Version info response succeeded|[VersionResponse](../definitions/VersionResponse.md#versionresponse)|
|**503**|Service unavailable|No Content|


#### Produces

* `application/json`


#### Tags

* version


#### Example HTTP request

##### Request path
```
/version
```


#### Example HTTP response

##### Response 200
```
json :
{
  "projectName" : "string",
  "projectVersion" : "string",
  "buildInfo" : "string",
  "versionNumber" : "string",
  "branchName" : "string",
  "cycleNumber" : "string",
  "gitCommit" : "string",
  "buildDate" : "string"
}
```



