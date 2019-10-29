# Streaming ingestion API developer guide

This developer guide will help begin using streaming ingestion APIs, part of the Adobe Experience Platform Data Ingestion Service APIs. Specifically, this documentation will help you:

- [Create a data inlet](#create-a-data-inlet)
- [Stream an XDM Individual Profile object to Adobe Experience Platform](#stream-an-xdm-individual-profile-object-to-adobe-experience-platform)
    - [Compose an XDM Individual Profile schema](#compose-an-xdm-individual-profile-schema)
    - [Set Primary Identity Descriptor for XDM Individual Profile](#set-primary-identity-descriptor-for-xdm-individual-profile)
    - [Create a dataset for XDM Individual Profile records](#create-a-dataset-for-xdm-individual-profile-records)
    - [Call Streaming Ingestion APIs to create an XDM Individual Profile record](#call-streaming-ingestion-apis-to-create-an-xdm-individual-profile-record)
    - [Retrieve the newly created Customer Profile](#retrieve-the-newly-created-customer-profile)
- [Stream an XDM ExperienceEvent to Adobe Experience Platform](#stream-an-xdm-experienceevent-to-adobe-experience-platform)
    - [Compose an XDM ExperienceEvent schema](#compose-an-xdm-experienceevent-schema)
    - [Set Primary Identity Descriptor for XDM ExperienceEvent](#set-primary-identity-descriptor-for-xdm-experienceevent)
    - [Create a dataset for XDM ExperienceEvents](#create-a-dataset-for-xdm-experienceevents)
    - [Call Streaming Ingestion APIs to ingest an XDM ExperienceEvent](#call-streaming-ingestion-apis-to-ingest-an-xdm-experienceevent)
    - [Retrieve the newly persisted XDM ExperienceEvent back from Unified Profile](#retrieve-the-newly-persisted-xdm-experienceevent-back-from-unified-profile)

## Getting started

Data inlet registration is the first step for you to start streaming data to Adobe Experience Platform. When registering a data inlet, you need to provide some key details like the source of streaming data, and whether or not you intend to send records expressed in [Experience Data Model (XDM) schema][xdminfo].

After registering a data inlet, you, as the data producer, will have a unique URL which can be used to stream data to Platform.

To complete this tutorial, you will first need to obtain your **developer credentials** and an **authorization token**. Follow the tutorial for [authenticating to Adobe Experience Platform][1] in order to gather the necessary credentials to successfully make calls using Platform APIs.

This tutorial also requires a working knowledge of various Adobe Experience Platform services. Before beginning this tutorial, please review the documentation for the following services:

- [Experience Data Model (XDM)][xdm]: The standardized framework by which Platform organizes experience data.
- [Real-time Customer Profile][rtcp]: Provides a unified, consumer profile in real-time based on aggregated data from multiple sources.

The following sections provide additional information that you will need to know in order to successfully make calls to the Schema Registry API.

### Reading sample API calls

This guide provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../sandboxes/sandboxes-overview.md). 

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

## Create a data inlet

Using the API Key and Access Token generated during authentication, you can now create a data inlet. The following cURL command demonstrates the information that is required when creating a data inlet, such as a Name and Description for the inlet being created.

If you want to create a data inlet with authenticated data collection, please read the [authenticated data collection][adc] guide.

#### Request

```SHELL
CURL -X POST "https://platform.adobe.io/data/core/edge/inlet" \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}" \
  -d '{JSON_PAYLOAD}'
```

> **Note:** To find your API Key and IMS Organization ID, go to <https://console.adobe.io/integrations>, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` :  Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.  
- `{JSON_PAYLOAD}` : An example JSON payload format can be seen below:

```JSON
{
    "name": "My Data Inlet",
    "description": "Collects streaming data from my website",
    "sourceId": "website",
    "dataType": "xdm"
}
```

- `name`: The name you want to use for your data inlet.   
- `description`: The description you want to use for your data inlet.   
- `sourceId`: A meaningful identifier or name of the source sending the streaming data.
- `dataType`: The type of data that is being streamed.


#### Response

An example of a successful response can be seen below:

```JSON
{
    "inletId": "{DATA_INLET_ID}",
    "imsOrg": "{IMS_ORG}",
    "sourceId": "website",
    "dataType": "xdm",
    "name": "My Data Inlet",
    "description": "Collects streaming data from my website",
    "createdAt": "2019-04-04T18:48:47.606Z",
    "createdBy": "{API_KEY}",
    "authenticationRequired": false,
    "modifiedAt": "2019-04-04T18:48:47.606Z",
    "modifiedBy": "{API_KEY}",
    "validationRequired": true,
    "inletUrl": "https://dcs.adobedc.net/collection/{DATA_INLET_ID}"
}
```

Where:

- `{DATA_INLET_ID}` : The ID of your newly created Data Inlet.   
- `{IMS_ORG}`:  The IMS Organization ID that you used in your request.    
- `{SOURCE_ID}`: The meaningful identifier or name of the source you sent in your request.    
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  

## Retrieve your data inlet

Once you've created your data inlet, you can verify its creation, in addition to checking on other inlets created.

#### Request

```SHELL
curl -X GET https://platform.adobe.io/data/core/edge/inlet \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` : Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.

#### Response

The above call will send a list of all the data inlets created.

```json
{
    "items":[
        {
            "inletId": "{INLET_ID}",
            "imsOrg": "{IMS_ORG}",
            "sourceId": "website",
            "dataType": "xdm",
            "name": "My Data Inlet",
            "description": "Collects streaming data from my website",
            "authenticationRequired": false,
            "createdAt": "2018-10-05T00:00:00.000Z",
            "createdBy": "{API_KEY}",
            "modifiedAt": "2018-10-05T00:00:00.000Z",
            "modifiedBy": "{API_KEY}",
            "inletUrl": "https://dcs.adobedc.net/collection/{INLET_ID}"
        }
    ],
    "total": 1
}
```

- `{INLET_ID}` : The ID of your newly created data inlet.   
- `{IMS_ORG}`: The IMS Organization ID that you used in your request.  
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  


## Stream an XDM Individual Profile object to Adobe Experience Platform

Once you've created a data inlet, you can use it to stream XDM records and create or update [Real-time Customer Profiles][rtcp].

### Compose an XDM Individual Profile schema

This guide composes a schema using standard mixins provided by Platform to describe personal and work-related details. Begin by calling the Schema Registry API to create a schema that implements XDM Individual Profile, a standard class, and enables the schema for use with Unified Profile Service (UPS).

> **Note:** For more information about how to create schemas, please read the [Schema Registry API Developer Guide][schema-registry].

#### Request

```shell
CURL -X POST https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{JSON_PAYLOAD}
```

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` : Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.
- `{JSON_PAYLOAD}`: An example of the JSON payload is shown below: 

```json
{
    "type": "object",
    "title": "{SCHEMA_NAME}",
    "description": "{SCHEMA_DESCRIPTION}",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile-person-details"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile-work-details"
        }
    ],
    "meta:immutableTags": [
        "union"
    ]
}
```

Where:

- `{SCHEMA_NAME}`: The name you want to use for your schema. This name must be unique.
- `{SCHEMA_DESCRIPTION}`: A meaningful description for the schema you're creating.
- `meta:immutableTags`: In this example, the `union` tag is used to persist your data into [Real-time Customer Profile][rtcp].

#### Response

```json
{
    "$id": "{SCHEMA_REF_ID}",
    "meta:altId": "_{TENANT_ID}.schemas.{SCHEMA_ID}",
    "meta:resourceType": "schemas",
    "version": "{SCHEMA_VERSION}",
    "type": "object",
    "title": "{SCHEMA_NAME}",
    "description": "{SCHEMA_DESCRIPTION}",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile-person-details"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile-work-details"
        }
    ],
    "meta:class": "https://ns.adobe.com/xdm/context/profile",
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:extends": [
        "https://ns.adobe.com/xdm/context/profile",
        "https://ns.adobe.com/xdm/data/record",
        "https://ns.adobe.com/xdm/cpmtext/identitymap",
        "https://ns.adobe.com/xdm/common/extensible",
        "https://ns.adobe.com/xdm/common/auditable",
        "https://ns.adobe.com/xdm/context/profile-person-details",
        "https://ns.adobe.com/xdm/context/profile-work-details"
    ],
    "meta:immutableTags": [
        "union"
    ],
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:xdmType": "object",
    "meta:registryMetadata": {
        "repo:createDate": 1551376506996,
        "repo:lastModifiedDate": 1551376506996,
        "xdm:createdClientId": "{CLIENT_ID}",
        "xdm:repositoryCreatedBy": "{CREATED_BY}"
    }
}
```

Where:
- `{SCHEMA_NAME}`: The name of the schema you created.
- `{SCHEMA_DESCRIPTION}`: The description of the schema you created. 
- `{IMS_ORG}`: The ID of the IMS Organization that created the schema.
- `{SCHEMA_REF_ID}`: The ID in the response should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`.
- `{TENANT_ID}`: This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Org. For more information about the Tenant ID, please read the [schema registry guide][schema-registry].
- `{SCHEMA_ID}`: The ID of your newly created schema.
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, please read [the schema composition guide][xdminfo].

Please take note of the `$id` as well as the `version` attributes, as both of these will be used when sending records to the Streaming Ingest APIs.

### Set Primary Identity Descriptor for XDM Individual Profile

Next, add an [Identity Descriptor][identity-descriptor] to the schema created above, using the work email address attribute as the primary identifier. Doing this will result in two changes:

1. The work email address will become a mandatory field. This means messages sent without this field will fail validation and will not be ingested.

2. Real-time Customer Profile will use the work email address as an identifier to help stitch together more information about that individual.

### Request
```shell
CURL -X POST https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{JSON_PAYLOAD}'
```
Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` : Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.
- `{JSON_PAYLOAD}`: An example of the JSON payload is shown below: 

```json
{
	"@type":"xdm:descriptorIdentity",
	"xdm:sourceProperty":"/workEmail/address",
	"xdm:property":"xdm:code",
	"xdm:isPrimary":true,
	"xdm:namespace":"Email",
	"xdm:sourceSchema":"{SCHEMA_REF_ID}",
	"xdm:sourceVersion":1
}
```

Where:

- `{SCHEMA_REF_ID}`: The `$id` that you previously received when you composed the XDM schema. It should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`

---
 ℹ️   ​ ​ ​**Identity Namespace Codes**

 Please ensure that the codes are valid - the example above uses "email" which is a standard identity namespace. Other commonly used standard identity namespaces can be found within the [Identity Service FAQ][standardnamespace] documentation in [this table][standardnamespace-identity-namespaces].

 If you would like to create a custom namespace, follow the steps outlined in the [identity namespace overview][customnamespace] documentation.

---

### Create a dataset for XDM Individual Profile records

You need to create a dataset so that any XDM Individual Profile records you stream (that pass validation) will be persisted to it. 

There are **two** important things to note about this dataset:

1. This dataset will be streaming enabled which will be signaled to Catalog by setting `streamingIngestionEnabled` to true. This signals to Platform Services, such as Identity and Profile, that they can read data sent to these datasets instantaneously rather than waiting for it to be batched into the data lake. 
   
Other consumers that work with data in the data lake, such as Data Science Workspace and Query Service will safely ignore this attribute.

1. This dataset will be enabled for **Real-time Customer Profile** and **Identity Service** by setting the appropriate tags.

#### Request

```shell
CURL -X POST https://platform.adobe.io/data/foundation/catalog/datasets \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{JSON_PAYLOAD}'
```

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` : Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.
- `{JSON_PAYLOAD}`: An example of the JSON payload is shown below: 

```json
{
    "name": "{DATASET_NAME}",
    "description": "{DATASET_DESCRIPTION}",
    "schemaRef": {
        "id": "{SCHEMA_REF_ID}",
        "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
    },
    "fileDescription": {
        "persisted": true,
        "containerFormat": "parquet",
        "format": "parquet"
    },
    "streamingIngestionEnabled": "true",
    "tags": {
        "unifiedIdentity": ["enabled:true"],
        "unifiedProfile": ["enabled:true"]
    }
}
```

Where:

- `{DATASET_NAME}`: The name of the dataset you're creating.
- `{DATASET_DESCRIPTION}`: A meaningful description for the dataset you're creating.
- `{IMS_ORG}`: Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.
- `{SCHEMA_ID}`: The ID of the previously created schema. 
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, please read [the schema composition guide][xdminfo].
- `{SCHEMA_REF_ID}`: The `$id` that you previously received when you composed the XDM schema. It should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`

#### Response

An example of a successful response can be found below:

```json
[
    "@/datasets/{DATASET_ID}"
]
```

### Call Streaming Ingestion APIs to create an XDM Individual Profile record

With the dataset in place, you can ingest XDM-formatted JSON records to create an XDM Individual Profile record within Platform.

>**Note:** The following API call does **not** require any authentication headers.

#### Request

```SHELL
CURL -X POST https://dcs.adobedc.net/collection/{INLET_ID}?synchronousValidation=true \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -d '{JSON_PAYLOAD}'
```

Where:

- `{INLET_ID}`: The ID of the created data inlet.  
- `{JSON_PAYLOAD}`: An example of the JSON payload is shown below: 
- `?synchronousValidation=true`: An optional query parameter intended for development purposes. Can be used for immediate feedback to determine if the request was successfully sent.

> **Note:** You will have to replace the {IMS_ORG} with the one you used previously creating a data inlet. To find your IMS Organization ID, go to <https://console.adobe.io/integrations>, click on the Overview for the integration you want to use, and copy the Organization ID listed.

```JSON
{
    "header": {
        "schemaRef": {
            "id": "{SCHEMA_REF_ID}",
            "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
        },
        "imsOrgId": "{IMS_ORG}",
        "source": {
            "name": "GettingStarted"
        },
        "datasetId": "{DATASET_ID}"
    },
    "body": {
        "xdmMeta": {
            "schemaRef": {
                "id": "{SCHEMA_REF_ID}",
                "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
            }
        },
        "xdmEntity": {
            "person": {
                "name": {
                    "firstName": "Jane",
                    "middleName": "F",
                    "lastName": "Doe"
                },
                "birthDate": "1969-03-14",
                "gender": "female"
            },
            "workEmail": {
                "primary": true,
                "address": "janedoe@example.com",
                "type": "work",
                "status": "active"
            }
        }
    }
}
```
Where:
 
- `schemaRef`: The $id value of the schema that describes the streamed record.
- `imsOrgId`: Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.  
- `source`: The source of the streamed record - this should be the **same** as the one specified earlier, when you created the data inlet.
- `{IMS_ORG}`: Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.
- `{SCHEMA_ID}`: The ID of the schema you previously created.
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, please read [the schema composition guide][xdminfo].
- `{DATASET_ID}`: The ID of the dataset you previously created.
- `{SCHEMA_REF_ID}`: The `$id` that you previously received when you composed the XDM schema. It should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`

#### Response

An example of a successful response can be seen below:

```JSON
{
    "inletId": "{INLET_ID}",
    "xactionId": "1532625558467:0001:13", 
    "receivedTimeMs": 1532625558467,
    "synchronousValidation": {
        "skipped": true
    }
}
```

Where:

- `{INLET_ID}`: The ID of the previously created data inlet.
- `xactionId`: The xactionID is a unique identifier generated server-side for the XDM record you just sent. This ID helps Adobe trace this record's lifecycle through various systems and with debugging.    
- `receivedTimeMs`: receivedTimeMs is a timestamp (epoch in milliseconds) that shows what time the request was received.
- `synchronousValidation`: You can add the query parameter `?synchronousValidation=true` for development purposes to check that the payload is actually being sent. If you have included the `synchronousValidation` parameter and the value returns `true` the payload was invalid and not sent.

### Retrieve the newly created Customer Profile

To validate the XDM Individual Profile records you just sent, you can use the [Real-time Customer Profile Access API][rtcp] to read it back.

To query using email address, your request would need to look something like this:

`{PROFILE_ACCESS_URL}?schema.name=_xdm.context.profile&entityId=janedoe@example.com&entityIdNS=email`

Where:
- `janedoe@example.com` is the provided entity ID
- `email` is the entity namespace code

`{PROFILE_ACCESS_URL}`: The URL that is used to access the Profile Access API.

> **Note:** If the merge policy ID is not defined and the schema.</span>name or relatedSchema</span>.name is `_xdm.context.profile`, Profile Access will fetch **all** related identities.

#### Request

Now that you understand the role of entity ID and entity namespace codes, you can review the Consumer Profile created previously with the following GET request.

```SHELL
CURL -X GET 'https://platform.adobe.io/data/core/ups/access/entities?schema.name=_xdm.context.profile&entityId=janedoe%40example.com&entityIdNS=email'\
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

> **Note:** To find your API Key and IMS Organization ID, go to <https://console.adobe.io/integrations>, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` : Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.

For further information about this API call, please read the Profile Access API documentation [here][rtcp].

#### Response

An example of a successful response can be seen below. As you can see, this is the same record as the one previously submitted.

```JSON

{
    "A29cgveD5y64ezlhxjUXNzcm": {
        "entityId": "A29cgveD5y64ezlhxjUXNzcm",
        "sources": [
            "GettingStarted"
        ],
        "tags": [
            ""
        ],
        "identityGraph": [
            "A29cgveD5y64ezlhxjUXNzcm"
        ],
        "entity": {
            "identityMap": {
                "email": [
                    {
                        "id": "janedoe@example.com"
                    }
                ]
            },
            "person": {
                "name": {
                    "firstName": "Jane",
                    "middleName": "F",
                    "lastName": "Doe"
                },
                "birthDate": "1969-03-14",
                "gender": "female"
            },
            "workEmail": {
                "primary": true,
                "address": "janedoe@example.com",
                "label": "Jane Doe",
                "type": "work",
                "status": "active"
            }
        },
        "lastModifiedAt": "2018-09-18T02:07:42Z"
    }
}

```

---

- Try making more calls with different values for work email to create additional XDM Individual Profile records, and see if you can read them back
- Also try changing other attributes like birthYear, gender, or name for a given Profile, and retrieve their updated values.

---

## Stream an XDM ExperienceEvent to Adobe Experience Platform

Once you've confirmed your Profile can be properly accessed, you can use Adobe's Streaming Ingestion APIs to stream ExperienceEvents as they happen. Streamed ExperienceEvents will be instantaneously available on Adobe Experience Platform services, such as Real-time Customer Profile. 

The example below associates a new ExperienceEvent with the Consumer Profile you created above. It captures some details about the browser, the product items they viewed, and the web page they viewed it on.

### Compose an XDM ExperienceEvent schema

To begin, you will need to create a new schema that implements the XDM ExperienceEvent class.

#### Request

```shell
curl -X POST https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{JSON_PAYLOAD}'
```

> **Note:** To find your API Key and IMS Organization ID, go to <https://console.adobe.io/integrations>, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` : Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.
- `{JSON_PAYLOAD}`: An example of the JSON Payload can be seen below:

```JSON
{
    "type": "object",
    "title": "{SCHEMA_NAME}",
    "description": "{SCHEMA_DESCRIPTION}",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/xdm/context/experienceevent"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/experienceevent-environment-details"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/experienceevent-commerce"
        },
        {  
         "$ref":"https://ns.adobe.com/experience/campaign/experienceevent-profile-work-details"
        }
    ],
    "meta:immutableTags": [
        "union"
    ]
}
```

Where:

- `{SCHEMA_NAME}`: The name you want to use for your schema. 
- `{SCHEMA_DESCRIPTION}`: A meaningful description for the schema you're creating.
- `meta:immutableTags`: In this example, the `union` tag is used to persist your data into [Real-time Customer Profile][rtcp].  

> **Note:** This example uses the ExperienceEvent - Profile Snapshot Work Details mixin to grab the users work email address and use it as a Primary Identifier later on. Try using other mixins and Primary Identifiers once you've completed this tutorial. 

#### Response

An example of a successful response can be found below:

```json
{
    "$id": "{SCHEMA_REF_ID}",
    "meta:altId": "_{TENANT_ID}.schemas.{SCHEMA_ID}",
    "meta:resourceType": "schemas",
    "version": "{SCHEMA_VERSION}",
    "type": "object",
    "title": "{SCHEMA_NAME}",
    "description": "{SCHEMA_DESCRIPTION}",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/xdm/context/experienceevent"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/experienceevent-environment-details"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/experienceevent-commerce"
        },
        {
            "$ref": "https://ns.adobe.com/experience/campaign/experienceevent-profile-work-details"
        }
    ],
    "meta:immutableTags": [
        "union"
    ],
    "meta:class": "https://ns.adobe.com/xdm/context/experienceevent",
    "required": [
        "_id",
        "timestamp"
    ],
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:extends": [
        "https://ns.adobe.com/xdm/context/experienceevent",
        "https://ns.adobe.com/xdm/data/time-series",
        "https://ns.adobe.com/xdm/context/identitymap",
        "https://ns.adobe.com/xdm/common/extensible",
        "https://ns.adobe.com/xdm/context/experienceevent-environment-details",
        "https://ns.adobe.com/xdm/context/experienceevent-commerce",
        "https://ns.adobe.com/experience/campaign/experienceevent-profile-work-details"
    ],
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:xdmType": "object",
    "meta:registryMetadata": {
        "repo:createDate": 1551229957987,
        "repo:lastModifiedDate": 1551229957987,
        "xdm:createdClientId": "{CLIENT_ID}",
        "xdm:repositoryCreatedBy": "{CREATED_BY}"
    }
}
```

Where:

- `{SCHEMA_NAME}`: The name of the schema you created.
- `{SCHEMA_DESCRIPTION}`: The description of the schema you created. 
- `{IMS_ORG}`: The ID of the IMS Organization that created the schema.
- `{TENANT_ID}`: This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Organization. For more information about the Tenant ID, please read the [schema registry guide][schema-registry].
- `{SCHEMA_REF_ID}`: The ID in the response should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`
- `{SCHEMA_ID}`: The ID of your newly created schema.
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, please read [the schema composition guide][xdminfo].

Please take note of the `$id` as well as the `version` attributes, as both of these will be used when sending records to the Streaming Ingest APIs.

### Set Primary Identity Descriptor for XDM ExperienceEvent 
Next, add an [Identity Descriptor][identity-descriptor] to the schema created above, using the work email address attribute as the primary identifier. Doing this will result in two changes:

1. The work email address will become a mandatory field. This means messages sent without this field will fail validation and will not be ingested.

2. Real-time Customer Profile will use the work email address as an identifier to help stitch together more information about that individual.

```shell
CURL -X POST https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{JSON_PAYLOAD}'
```
Where:
- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.
- `{IMS_ORG}` : Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.
- `{JSON_PAYLOAD}`: An example of the JSON payload is shown below:
```json
{  
   "@type":"xdm:descriptorIdentity",
   "xdm:sourceProperty":"/_experience/campaign/message/profileSnapshot/workEmail/address",
   "xdm:property":"xdm:code",
   "xdm:isPrimary":true,
   "xdm:namespace":"Email",
   "xdm:sourceSchema":"{SCHEMA_REF_ID}",
   "xdm:sourceVersion":1
}
```
Where:
- `sourceProperty`: contains the path to the mixin you are using as a primary identity. 
- `{SCHEMA_REF_ID}`: The `$id` that you previously received when you composed the XDM ExperienceEvent schema. It should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`


### Create a dataset for XDM ExperienceEvents

Like before, you'll need to create a dataset so any ExperienceEvents streamed, assuming they pass XDM validation, will be persisted into the dataset.

There are **two** important things to note about this dataset:

1. This dataset will be **streaming enabled**, which will be signaled to Catalog by setting the **streamingIngestionEnabled** field to true. This signals to Platform Services, such as Identity and Profile, that they can read data sent to these datasets **instantaneously**, rather than waiting for it to be batched into the data lake. Other consumers that work with data in the data lake, such as Data Science Workspace and Query Service will safely ignore this attribute.
2. This dataset will be enabled for **Real-time Customer Profile** and **Unified Identity** by setting the appropriate tags.

#### Request

```shell
curl -X POST https://platform.adobe.io/data/foundation/catalog/datasets \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{JSON_PAYLOAD}'
```

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` : Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.
- `{JSON_PAYLOAD}`: An example of the JSON Payload can be seen below:

```json
{
    "name": "{DATASET_NAME}",
    "description": "{DATASET_DESCRIPTION}",
    "schemaRef": {
        "id": "{SCHEMA_REF_ID}",
        "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
    },
    "fileDescription": {
        "persisted": true,
        "containerFormat": "parquet",
        "format": "parquet"
    },
    "streamingIngestionEnabled": "true",
    "tags": {
        "unifiedIdentity": ["enabled:true"],
        "unifiedProfile": ["enabled:true"]
    }
}
```

Where:

- `{DATASET_NAME}`: The name of the dataset you're creating.
- `{DATASET_DESCRIPTION}`: A meaningful description for the dataset you're creating.
- `{TENANT_ID}`: This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Org. For more information about the Tenant ID, please read the [schema registry guide][schema-registry].
- `{SCHEMA_ID}`: The ID of the previously created schema. 
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, please read [the schema composition guide][xdminfo].
- `{SCHEMA_REF_ID}`: The `$id` that you previously received when you composed the XDM schema. It should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`


#### Response

An example of a successful response can be found below:

```json
[
    "@/datasets/{DATASET_ID}"
]
```


### Call Streaming Ingestion APIs to ingest an XDM ExperienceEvent

Now, you can send some XDM formatted JSON records to create an ExperienceEvent within Platform.

>**Note:** The following API call does **not** require any authentication headers.

#### Request

```SHELL
curl -X POST "https://dcs.adobedc.net/collection/{INLET_ID}?synchronousValidation=true" \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -d '{JSON_PAYLOAD}'
```

- `{INLET_ID}`: The ID of the created data inlet.  
- `{JSON_PAYLOAD}`: An example of the JSON Payload can be seen below:
- `?synchronousValidation=true`: An optional query parameter intended for development purposes. Can be used for immediate feedback to determine if the request was successfully sent.

> **Note:** You will need to generate your own `_id` and `timestamp`. A good way to generate an ID is to use a UUID.

```JSON
{
    "header": {
        "schemaRef": {
            "id": "{SCHEMA_REF_ID}",
            "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
        },
        "imsOrgId": "{IMS_ORG}",
        "source": {
            "name": "GettingStarted"
        },
        "datasetId": "{DATASET_ID}"
    },
    "body": {
        "xdmMeta": {
            "schemaRef": {
                "id": "{SCHEMA_REF_ID}",
                "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
            }
        },
        "xdmEntity":{
            "_id": "9af5adcc-db9c-4692-b826-65d3abe68c22",
            "timestamp": "2019-02-23T22:07:01Z",
            "environment": {
                "browserDetails": {
                    "userAgent": "Mozilla\/5.0 (Windows NT 5.1) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/29.0.1547.57 Safari\/537.36 OPR\/16.0.1196.62",
                    "acceptLanguage": "en-US",
                    "cookiesEnabled": true,
                    "javaScriptVersion": "1.6",
                    "javaEnabled": true
                },
                "colorDepth": 32,
                "viewportHeight": 799,
                "viewportWidth": 414
            },
            "productListItems": [
                {
                    "SKU": "CC",
                    "name": "Fernie Snow",
                    "quantity": 30,
                    "priceTotal": 7.8
                }
            ],
            "commerce": {
                "productViews": {
                    "value": 1
                }
            },
            "_experience": {
                "campaign": {
                    "message": {
                        "profileSnapshot": {
                            "workEmail":{
                                "address": "janedoe@example.com"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

Where: 

- `{IMS_ORG}`:  Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.
- `{SCHEMA_ID}`: The ID of the previously created schema. 
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, please read [the schema composition guide][xdminfo].
- `{DATASET_ID}`: The ID of the previously created dataset.
- `{SCHEMA_REF_ID}`: The `$id` that you previously received when you composed the XDM schema. It should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"` 

#### Response

An example of a successful response can be seen below:

```JSON
{
    "inletId": "3c3a530cf4528ca067550a88ae88696bd2932c0b0d6bca826b3d12d79344b10d",
    "xactionId": "1551307525735:0515:4",
    "receivedTimeMs": 1551307525735,
    "synchronousValidation": {
        "skipped": false
    }
}
```
Where:

- `xactionId`: The xactionID is a unique identifier generated server-side for the XDM record you just sent. This ID helps Adobe trace this record's lifecycle through various systems and with debugging.    
- `receivedTimeMs`: receivedTimeMs is a timestamp (epoch in milliseconds) that shows what time the request was received.
- `synchronousValidation`: You can add the query parameter `?synchronousValidation=true` for development purposes to check that the payload is actually being sent. If you have included the `synchronousValidation` parameter and the value returns `true` the payload was invalid and not sent.



### Retrieve the newly persisted XDM ExperienceEvent back from Unified Profile

Now, you can use the Profile Access APIs to read the ExperienceEvent you just sent back.

#### Request

```SHELL
curl -X GET \
  https://platform-stage.adobe.io/data/core/ups/access/entities?schema.name=_xdm.context.experienceevent&relatedSchema.name=_xdm.context.profile&relatedEntityId=janedoe@example.com&relatedEntityIdNS=email \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Cache-Control: no-cache" \
  -H "x-api-key: {API_KEY}" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-sandbox-name: {SANDBOX_NAME}"

```
Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` : Your IMS Organization ID can be found under the integration details in the Adobe I/O Console.

> **Note:** To find your API Key and IMS Organization ID, go to <https://console.adobe.io/integrations>, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.

#### Response

An example of a successful response can be seen below. As you can see, this is the same event that you sent previously.

```JSON
{
    "_page": {
        "orderby": "timestamp",
        "start": "9af5adcc-db9c-4692-b826-65d3abe68c22",
        "count": 1,
        "next": ""
    },
    "children": [
        {
            "relatedEntityId": "BVrqzwVv7o2p3naHvnsWpqZXv3KJgA",
            "entityId": "9af5adcc-db9c-4692-b826-65d3abe68c22",
            "timestamp": 1550959621000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "cookiesEnabled": true,
                        "acceptLanguage": "en-US",
                        "javaEnabled": true,
                        "javaScriptVersion": "1.6",
                        "userAgent": "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36 OPR/16.0.1196.62"
                    },
                    "viewportWidth": 414,
                    "colorDepth": 32,
                    "viewportHeight": 799
                },
                "_id": "9af5adcc-db9c-4692-b826-65d3abe68c22",
                "commerce": {
                    "productViews": {
                        "value": 1
                    }
                },
                "productListItems": [
                    {
                        "quantity": 30,
                        "priceTotal": 7.8,
                        "name": "Fernie Snow",
                        "SKU": "CC"
                    }
                ],
                "_experience": {
                    "campaign": {
                        "message": {
                            "profileSnapshot": {
                                "workEmail": {
                                    "address": "janedoe@example.com"
                                }
                            }
                        }
                    }
                },
                "timestamp": "2019-02-23T22:07:01Z"
            },
            "lastModifiedAt": "2019-06-17T22:10:07Z"
        }
    ],
    "_links": {
        "next": {
            "href": ""
        }
    }
}
```

--- 
> **Tip:** Try streaming new ExperienceEvents by changing the timestamp or record ID fields. Subsequent POST calls with different timestamps and event IDs will simulate subsequent user activity. Subsequent GET calls will return an increasing array of the ExperienceEvents that are associated with the consumer's Profile. 

---

## Next Steps

You have now successfully used the streaming ingestion APIs to request a data inlet, group data together using a descriptor, and stream data into Profile Events and ExperienceEvents to be ingested into Experience Platform. 

You can try using the [Adobe Experience Platform extension][aep-extension] to create a new streaming connection and use the streaming ingestion APIs to send and retrieve data from Experience Platform. 

Now that you are able to get your data into Adobe Experience Platform, you can start monitoring your data through Platform UI, see the [monitoring streaming data flows][monitoring-streaming-data-flows] guide for more information.

[1]: ../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md 

[2]: https://medium.com/adobetech/using-postman-for-jwt-authentication-on-adobe-i-o-7573428ffe7f

[3]: https://console.adobe.io/

[apispecs]: ./streaming_endpoint_registration/streaming_endpoint_registration.md

[standardnamespace]: ../identity_services_architectural_overview/identity_services_faq.md

[standardnamespace-identity-namespaces]: ../identity_services_architectural_overview/identity_services_faq.md#are-there-any-identity-namespaces-i-can-use-out-of-the-box

[customnamespace]: ../identity_namespace_overview/identity_namespace_overview.md


[identityapi]: ../identity_services_architectural_overview/identity_services_architectural_overview.md

[xdm]: ../schema_registry/xdm_system/xdm_system_in_experience_platform.md
[rtcp]: ../unified_profile_architectural_overview/unified_profile_architectural_overview.md

[xdminfo]: ../schema_registry/schema_composition/schema_composition.md

[schema-registry]: ../schema_registry/schema_registry_developer_guide.md

[adc]: ./authenticated_data_collection.md

[identity-descriptor]: ../schema_registry/schema_registry_developer_guide.md#descriptors

[monitoring-streaming-data-flows]: e2e-monitor-streaming-data-flows.md

[aep-extension]: https://docs.adobe.com/content/help/en/launch/using/extensions-ref/adobe-extension/adobe-experience-platform-extension.html