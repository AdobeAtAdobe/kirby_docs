
<a name="updatepackageusingpatch"></a>
### Create package rules from ARL file
```
PATCH /rulesets/{imsOrg}/{category}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**category**  <br>*required*|category|string|
|**Path**|**imsOrg**  <br>*required*|imsOrg|string|


#### Body parameter
packagerInput

*Name* : packagerInput  
*Flags* : required  
*Type* : [PackageInput](../definitions/PackageInput.md#packageinput)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[PackagerDto](../definitions/PackagerDto.md#packagerdto)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* packager-controller


#### Example HTTP request

##### Request path
```
/rulesets/string/string
```


##### Request body
```
json :
{
  "rulesFileLocation" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "category" : "string",
  "clientId" : "string",
  "id" : "string",
  "packageSize" : 0,
  "packageUrl" : "string",
  "version" : "string"
}
```



