
<a name="status"></a>
### Fetch the status of deployment for a given imsOrgId
```
GET /provisioning/status
```


#### Description
Get all status for an imsOrg


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Header**|**Authorization**  <br>*required*|IMS Service Token|string|`""`|
|**Header**|**x-gw-ims-authorization**  <br>*required*|Gateway Service Token|string|`""`|
|**Header**|**x-gw-ims-org-id**  <br>*optional*||string|`""`|
|**Query**|**request**  <br>*optional*||string||


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[OrgStatusResponse](../definitions/OrgStatusResponse.md#orgstatusresponse)|
|**500**|Provisioning Status could not be found|[ErrorResponse](../definitions/ErrorResponse.md#errorresponse)|


#### Produces

* `application/json`


#### Tags

* Experience Platform Provisioning


#### Example HTTP request

##### Request path
```
/provisioning/status
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
  "request" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
{
  "status" : "string",
  "subscriptionId" : "string",
  "request" : {
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
      },
      "subscriptionId" : "string"
    },
    "timestamp" : 0
  },
  "actionStatusList" : [ {
    "imsOrgId" : "string",
    "name" : "string",
    "status" : "string",
    "msg" : "string",
    "jobId" : "string",
    "resourceName" : "string",
    "resourceIdentifier" : "string",
    "resourceDefinition" : "string",
    "resourceDefinitionType" : "string",
    "responseCode" : 0,
    "reason" : "string",
    "attempts" : 0,
    "requestId" : "string",
    "id" : "string",
    "created" : 0,
    "updated" : 0
  } ]
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



