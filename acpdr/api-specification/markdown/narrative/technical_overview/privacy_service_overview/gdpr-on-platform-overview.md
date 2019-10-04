# GDPR in Adobe Experience Platform

Adobe Experience Platform Privacy Service provides a method to submit both access and delete requests by the data controller as delineated by privacy regulations such as the General Data Protection Regulation (GDPR).

GDPR job requests can be submitted to Adobe Experience Platform using the [Privacy Service API](../tutorials/privacy_service_tutorial/privacy_service_api_tutorial.md) or [Privacy Service UI](../tutorials/privacy_service_tutorial/privacy_service_ui_tutorial.md). There are two different data stores on Experience Platform where requests are to be processed:

* Data lake
* Real-time Customer Profile 

This document describes how data needs to be set up by the customer for Adobe Experience Platform in order to process GDPR job requests.

## Understanding Real-time Customer Profile and Identity Service

Data access and delete requests for [Real-time Customer Profile](../unified_profile_architectural_overview/unified_profile_architectural_overview.md) data is facilitated by Adobe Experience Platform Identity Service.

Identity Service honors namespaces that are registered with the Identity core service for your IMS Organization. A list of standard namespaces are available for all organizations (for example, "Email" and "ECID"). Additionally, custom namespaces can be created for the organization. For more information about identity namespaces in Experience Platform, see the [identity namespace overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/identity_namespace_overview/identity_namespace_overview.md). To learn more about how to associate identities when sending data to Platform, please refer to the [Identity Service overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md).

If data ingested into Profile has an associated identity namespace, Profile can process a GDPR request in the appropriate format against that data, as shown in the section on “Submitting requests” below.

## Labeling data fields with GDPR namespaces

In order for the data lake to process GDPR requests, any relevant data fields in Platform datasets must be labeled with appropriate GDPR namespaces with which you expect to send GDPR requests. This section demonstrates how to add a GDPR namespace to a dataset.

Consider the following dataset:

```json
{
    "5d8e9cf5872f18164763f971": {
        "name": "Loyalty Members",
        "description": "Dataset for the Loyalty Members schema",
        "imsOrg": "{IMS_ORG}",
        "tags": {
            "adobe/pqs/table": [
                "loyalty_members"
            ]
        },
        "namespace": "ACP",
        "state": "DRAFT",
        "id": "5d8e9cf5872f18164763f971",
        "dule": {
            "identity": [],
            "contract": [
                "C2",
                "C5"
            ],
            "sensitive": [],
            "contracts": [
                "C2",
                "C5"
            ],
            "identifiability": [],
            "specialTypes": []
        },
        "version": "1.0.2",
        "created": 1569627381749,
        "updated": 1569880723282,
        "createdClient": "acp_ui_platform",
        "createdUser": "{USER_ID}",
        "updatedUser": "{USER_ID}",
        "viewId": "5d8e9cf5872f18164763f972",
        "aspect": "production",
        "status": "enabled",
        "fileDescription": {
            "persisted": true,
            "containerFormat": "parquet",
            "format": "parquet"
        },
        "files": "@/dataSets/5d8e9cf5872f18164763f971/views/5d8e9cf5872f18164763f972/files",
        "schemaMetadata": {
            "primaryKey": [],
            "delta": [],
            "dule": [
                {
                    "path": "/properties/personalEmail/properties/address",
                    "identity": [
                        "I1"
                    ],
                    "contract": [],
                    "sensitive": [],
                    "contracts": [],
                    "identifiability": [
                        "I1"
                    ],
                    "specialTypes": []
                }
            ],
            "gdpr": []
        },
        "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/2c66c3a4323128d3701289df4468e8a6",
            "contentType": "application/vnd.adobe.xed-full+json;version=1"
        },
        "streamingIngestionEnabled": "false"
    }
}
```

The `schemaMetadata` property for the dataset contains a `gdpr` array, which is currently empty. To add GDPR namespaces to the dataset, this array must be updated using a PATCH operation to the [Catalog Service API](../../../../../../acpdr/swagger-specs/catalog.yaml).

#### API format

```http
PATCH /datasets/{DATASET_ID}
```
* `{DATASET_ID}`: The `id` value of the dataset to be updated.

#### Request

In this example, a dataset includes an email address in the `personalEmail.address` field. The following request assigns an `email_label` namespace to the field, enabling it to be used when submitting access and delete requests using the Privacy Service API.

> **Important:** When running a PATCH operation on a dataset's `schemaMetadata` property, be sure to copy any existing sub-properties within the request payload. Excluding any existing values from the payload will cause them to be removed from the dataset.

```shell
curl -X PATCH 'https://platform.adobe.io/data/foundation/catalog/datasets/5d8e9cf5872f18164763f971' \ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' \
  -d '{ 
    "schemaMetadata": { 
      "primaryKey": [],
      "delta": [],
      "dule": [
        {
          "path": "/properties/personalEmail/properties/address",
          "identity": [
              "I1"
          ],
          "contract": [],
          "sensitive": [],
          "contracts": [],
          "identifiability": [
              "I1"
          ],
          "specialTypes": []
        }
      ],
      "gdpr": [
          {
              "path": "/properties/personalEmail/properties/address",
              "namespace": ["email_label"]
          }
      ]
  }'
```
* `gdpr > path`: The path to the field to be updated within the dataset's associated schema. Ideally, labels should only be applied to "leaf" fields (fields without sub-fields).
* `gdpr > namespace`: An array listing the namespaces to be added to the field specified in `path`. In this case, the namespace `email_label` is added.

#### Response

A successful response returns HTTP status 200 (OK) with the ID of the dataset provided in the payload. Using the ID to lookup the dataset again reveals that the GDPR namespaces has been added.

```json
[
    "@/dataSets/5d8e9cf5872f18164763f971"
]
```

## Submitting requests 

Privacy Service provides a RESTful API and user interface that allow you to submit GDPR job requests to Adobe Experience Platform. Please refer to the [Privacy Service API](../tutorials/privacy_service_tutorial/privacy_service_api_tutorial.md) or [Privacy Service UI](../tutorials/privacy_service_tutorial/privacy_service_ui_tutorial.md) documentation for information about how to submit and monitor of GDPR job requests.
