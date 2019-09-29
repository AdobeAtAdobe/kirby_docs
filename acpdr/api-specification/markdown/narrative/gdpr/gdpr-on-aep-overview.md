
# GDPR on Adobe Experience Platform Overview
===================

Adobe Experience Platform Privacy Service provides a method to submit both access and delete GDPR job requests by the data controller, ensuring that marketing actions taken in Adobe Experience Platform are GDPR compliant.

GDPR requests can be submitted to Adobe Experience Platform using the [Privacy Service API](../tutorials/privacy_service_tutorial/privacy_service_api_tutorial.md) or [Privacy Service user interface](../tutorials/privacy_service_tutorial/privacy_service_ui_tutorial.md). There are two different data stores on the Platform where requests are to be processed:

* Data Lake
* Unified Profile 


The following workflow describes how data needs to be set up by the customer for Experience Platform to process the requests.

## Step 1: Associate identities when profile data is ingested to Platform


Data access and delete requests in Unified Profile on Platform is facilitated by the Profile GDPR service.

The profile GDPR honors namespaces that are registered with the Identity core service for that IMSOrg.

A list of standard namespaces are available for all organizations. For example: Email and ECID. Additionally, custom namespaces can be created for the organization. Both aspects are documented at [Identity Namespace Overview](https://www.adobe.io/apis/cloudplatform/dataservices/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/identity_namespace_overview/identity_namespace_overview.md).

If profile schema-based data ingested into Platform has an associated identity namespace, Unified Profile can process a GDPR request submitted in the appropriate format against that data, as shown in Step 3 (below).

The example below shows how the identities column for a record in the profile-schema-based dataset might look. In this example, only the standard identity namespace Email is associated with the data:

```json
identities: [
 {
    "id": "example@email.com",
    "xid": "",
    "authenticatedState": "",
    "primary": "",
    "namespace" : {
      "code": "Email"
    }
 }
]
```

## Step 2: Label datasets persisted to Data Lake

For the data lake to process GDPR requests, you should first identify fields in Platform datasets that have to be labeled with the appropriate GDPR namespaces with which you expect to send GDPR requests. 

In the example below:

* A dataset based on the Profile schema includes email address in the `personalEmail.address` field. If you deem that the field should be available for GDPR requests, label the field with a namespace.
* Use the catalog dataset API to patch the dataset and apply the label you want. In this case the `email_ns` namespace is applied. Step 3 (below) shows how the namespace is used when submitting access and delete requests using the central service API.

```json
{
  "schemaMetadata": {
    "gdpr": [{
        "path": "/properties/personalEmail/properties/address",
        "namespace": ["email_label"]
    }]
  }
}
```

```shell
curl -X PATCH \
  https://platform.adobe.io/data/foundation/catalog/dataSets/5bc391a7e388cc12f991678e \
  -H 'accept: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'content-type: application/json' \
  -d '{
    "schemaMetadata": {
      "gdpr": [
        {
          "path": "/properties/personalEmail/properties/address",
          "namespace": ["email_ns"] 
        }
      ] 
    }
  }'
```

Labels are an array of string values. In the above example, the label is `email_ns`. Labels should only be applied to leaf fields (fields without children). In the sample above, the path refers to a leaf field.

## Step 3: Submit GDPR request 

Submit GDPR requests to Adobe Experience Platform using the [Privacy Service API](../tutorials/privacy_service_tutorial/privacy_service_api_tutorial.md) or [Privacy Service UI](../tutorials/privacy_service_tutorial/privacy_service_ui_tutorial.md). 

The following shows an example request:

Request endpoint: `https://platform.adobe.io/data/privacy/gdpr/`

Request payload:

```json
{
  "companyContexts": [{
    "namespace": "imsOrgID",
    "value": "orgId"
  }],
  "users": [{
    "key": "David Smith", // user id on controller side submitting GDPR request
    "action": ["access"], // type of GDPR request - access or delete
    "userIDs": [  // list of namespaces to lookup in platform or other solutions
    {
      "namespace": "Email", // Email is a standard identity namespace to lookup in Profile store
      "value": "example@email.com",
      "type": "standard"
    },
    {
      "namespace": "email_label", //namespace labelled for dataset persisted in data lake
      "value": "example@email.com",
      "type": "unregistered"
    }]
  }],
  "include":["aepDataLake", "profileService"]
} 
```

* Parameter type `unregistered` is required for the data lake because the namespace applied for the dataset in Step 2 is not registered with the identity. For more information regarding the type parameter, refer to [Privacy Service API](../tutorials/privacy_service_tutorial/privacy_service_api_tutorial.md#namespace-qualifiers).
* The parameter type should be `standard` for the profile to process based on standard namespaces.
* The parameter type should be `custom` for the profile to process based on custom namespaces.
* The `include` field is optional in the request format. The central service sends the GDPR request to all registered products if no inclusion is specified. If an inclusion is specified, specify `aepDataLake` and `profileService` in the list of include parameters for the GDPR request to be processed in Data Lake and Unified Profile respectively. 

## Step 4: Track the status of the GDPR request

Refer to the [Privacy Service API](../tutorials/privacy_service_tutorial/privacy_service_api_tutorial.md) or [Privacy Service UI](../tutorials/privacy_service_tutorial/privacy_service_ui_tutorial.md) documentation for information about how to track the status (submitted, processing, completed, error, expired) of GDPR requests.