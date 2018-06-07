
# GDPR on ACP Overview
===================



Employ the Adobe GDPR APIs to submit both `access` and `delete` requests to anonymize data to comply with the General Data Protection Regulations (GDPR) on the Adobe Cloud Platform (ACP). The following are practices and prerequisites required to submit GDPR requests to the ACP.

## GDPR Labeling in Platform using API

First, look at the datasets ingested into your platform and decide the dataset fields applicable to GDPR requests. Then add the appropriate GDPR labels to the fields using the DatasetAPI.

For example, a dataset in ACP includes the fields `id`, `address`, and `product purchased`. If you deem that `address` should be available for GDPR requests, you should label the field with a unique label. These labels can then be specified when submitting `access` and `delete` requests to the GDPR APIs on ACP.

## Submitting GDPR Requests

All GDPR APIs are REST-based with JSON used as the payload for requests and responses. Documentation on each of the supported APIs can be found here: [GDPR API Specification](http://www.adobe.io/).

All requests are submitted to the following base URL:

`https://platform.adobe.io/data/privacy/gdpr/`

The following APIs are used to submit GDPR API requests and to check on the status of submitted requests.

### Updating an Existing DataSet by ID

**Request endpoint**:  `/dataSets/{id}`
(*Updates an existing DataSet by ID*)

**Request Payload** 

``` 
fields: [{
"name": "address",
"type": "object",
"gdpr": [{
"namespace": "gdprAddress"

}]
```

**Note:** The fields are dependent on what you expect to read. If the platform wants to honor “unregistered” namespace types, then this will work. The namespace name and value will be the key for which you’ll qualify the data and search. Your code can look at “unregistered” namespace types.
 


### Submitting a GDPR request for ACP in the GDPR Central Service


**Request endpoint**: `/data/privacy/gdpr`

**Request Payload** 

``` {
  "companyContexts": [{
    "namespace": "imsOrgID",
    "value": orgId
  }],
  "users": 
    "key": "David Smith",
    "action": ["access"],
    "userIDs": [{
      "namespace": "gdprTest",
      "value": "123",
      "type": "unregistered"
    }]
  }],
  "exclude": ["Analytics"]
} 
```
**Note:** The “exclude” field is not really necessary, as we send out the job with all solutions in our product list if no exclusion is specified. 
 

### Retrieve Details of all Previously-Submitted Requests for a Specific Authenticated User

`/data/privacy/gdpr` (*Retrieve details of all JobId's for a specific UserId/Logged in Users id*)
