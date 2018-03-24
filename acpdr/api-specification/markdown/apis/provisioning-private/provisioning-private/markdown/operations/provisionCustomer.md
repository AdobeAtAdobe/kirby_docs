
<a name="provisioncustomer"></a>
### Provision Resources for a Customer
```
POST /provisioning/customer
```


#### Description
Provision Resources for a Customer


#### Parameters

|Type|Name|Schema|Default|
|---|---|---|---|
|**Header**|**Authorization**  <br>*optional*|string|`""`|
|**Header**|**x-gw-ims-authorization**  <br>*optional*|string|`""`|
|**Header**|**x-gw-ims-org-id**  <br>*optional*|string|`""`|
|**Query**|**reprovision**  <br>*optional*|string||


#### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : [ProvisioningRequest](../definitions/ProvisioningRequest.md#provisioningrequest)


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success|[ProvisioningResponse](../definitions/ProvisioningResponse.md#provisioningresponse)|
|**400**|Unable to process the input request. Please verify the input.|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**403**|Forbidden|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|
|**500**|Internal Server error. Please check logs for details.|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Experience Platform Provisioning


#### Example HTTP request

##### Request path
```
/provisioning/customer
```


##### Request header
```
json :
"string"
```


##### Request query
```
json :
{
  "reprovision" : "string"
}
```


##### Request body
```
json :
{
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
}
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



