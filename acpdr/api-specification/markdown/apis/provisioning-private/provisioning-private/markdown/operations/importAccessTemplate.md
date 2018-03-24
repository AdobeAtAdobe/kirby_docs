
<a name="importaccesstemplate"></a>
### Upload an access template
```
POST /provisioning/accesstemplate/{serviceId}
```


#### Description
Upload a new access template


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|IMS Service Token|string|`""`|
|**Header**|**x-gw-ims-authorization**  <br>*required*|Gateway Service Token|string|`""`|
|**Path**|**serviceId**  <br>*required*|id of service for this access template|string||


#### Body parameter
json access template file

*Name* : body  
*Flags* : required  
*Type* : [InputStream](../definitions/InputStream.md#inputstream)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ProvisioningResponse](../definitions/ProvisioningResponse.md#provisioningresponse)|
|**400**|Unable to process the input request. Please verify the input.|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**403**|Forbidden|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**500**|Internal Server error. Please check logs for details.|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Consumes

* `multipart/form-data`


#### Produces

* `application/json`


#### Tags

* Experience Platform Provisioning


#### Example HTTP request

##### Request path
```
/provisioning/accesstemplate/string
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


#### Example HTTP response

##### Response 200
```
json :
{
  "message" : "string",
  "status" : 0,
  "connectionString" : "string",
  "errors" : [ "string" ],
  "azureResponse" : "string",
  "storedRequest" : {
    "id" : "string",
    "imsOrgId" : "string",
    "stored" : {
      "customer" : {
        "name" : "string",
        "imsOrgId" : "string",
        "contact" : "string",
        "tenentId" : "string",
        "region" : "string"
      },
      "entitlement" : {
        "valuePropId" : "string",
        "valuePropSKUID" : "string",
        "location" : "string",
        "metrics" : {
          "numberOfProfiles" : "string",
          "capacityCPU" : "string",
          "capacityStorage" : "string",
          "capacityBandwidth" : "string"
        }
      },
      "reports" : {
        "eccid" : "string",
        "dealRegistrationNumber" : "string",
        "startDate" : "string",
        "endDate" : "string",
        "recordOwner" : "string"
      }
    },
    "timestamp" : 0
  },
  "pollRequired" : true
}
```


##### Response 400
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 403
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```


##### Response 500
```
json :
{
  "reason" : "string",
  "message" : "string"
}
```



