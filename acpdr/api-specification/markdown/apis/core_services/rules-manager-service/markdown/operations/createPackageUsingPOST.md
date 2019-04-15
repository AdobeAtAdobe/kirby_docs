
<a name="createpackageusingpost"></a>
### Create package rules from ARL file
```
POST /rulesets/{category}
```


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|x-gw-ims-org-id|string|
|**Path**|**category**  <br>*required*|category|string|


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
/rulesets/string
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
  "rulesFileLocation" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "category" : "string",
  "imsOrgId" : "string",
  "packageSize" : 0,
  "packageUrl" : "string",
  "rulesetId" : "string",
  "version" : "string"
}
```



