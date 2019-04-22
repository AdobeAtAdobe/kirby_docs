# Getting Started with Adobe Experience Platform Streaming Ingestion APIs

## Overview

This documentation will help you quickly get started with the Adobe Experience Platform Streaming Ingestion APIs. Specifically, this documentation will help you:

- [Create a data inlet](#create-a-data-inlet)
- [Stream an XDM Profile object to Adobe Experience Platform](#stream-an-xdm-profile-object-to-adobe-experience-platform)
    - [Compose an XDM Profile schema](#step-1-compose-an-xdm-profile-schema)
    - [Create a dataset for XDM profile records](#step-2-create-a-dataset-for-xdm-profile-records)
    - [Call Streaming Ingestion APIs to create an XDM profile record](#step-3-call-streaming-ingestion-apis-to-create-an-xdm-profile-record)
    - [Retrieve the newly created Customer Profile](#step-4-retrieve-the-newly-created-customer-profile)
- [Stream an XDM ExperienceEvent to Adobe Experience Platform](#stream-an-xdm-experienceevent-to-adobe-experience-platform)
    - [Compose an XDM ExperienceEvent schema](#step-1-compose-an-xdm-experienceevent-schema)
    - [Create a dataset for XDM ExperienceEvents](#step-2-create-a-dataset-for-xdm-experienceevents)
    - [Call Streaming Ingestion APIs to ingest an XDM ExperienceEvent](#step-3-call-streaming-ingestion-apis-to-ingest-an-xdm-experienceevent)
    - [Retrieve the newly persisted XDM ExperienceEvent back from Unified Profile](#step-4-retrieve-the-newly-persisted-xdm-experienceevent-back-from-unified-profile)

## Getting started

Data inlet registration is the first step for you to start streaming data to Adobe Experience Platform. When registering a data inlet, you need to provide some key details like the source of streaming data, and whether or not you intend to send records expressed in [Experience Data Model (XDM) schema][xdminfo].

After registering a data inlet, you, as the data producer, will have a unique URL which can be used to stream data to Platform.

To complete this tutorial, you will first need to obtain your **developer credentials** and an **authorization token**. Follow this [tutorial][1] or this [blog post][2] for detailed information on how to go through this process.

## Create a data inlet

Firstly, start by creating a new data inlet. Assuming you have an API Key and Access Token, you can insert them into the cURL command below, providing other details, like data inlet Name and Description, which are meaningful to you.

If you want to create a data inlet with authenticated data collection, check out the [authenticated data collection][adc] guide.

### Request

```SHELL
CURL -X POST "https://platform.adobe.io/data/core/edge/inlet" \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -d '{JSON_PAYLOAD}'
```

> **Note:** To find your API Key and IMS Org ID, go to <https://console.adobe.io/integrations>, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` :  Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
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


### Response

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
    "inletUrl": "https://dcs.data.adobe.net/collection/{DATA_INLET_ID}"
}
```

Where:

- `{DATA_INLET_ID}` : The ID of your newly created Data Inlet.   
- `{IMS_ORG}`:  The IMS organization ID that you used in your request.    
- `{SOURCE_ID}`: The meaningful identifier or name of the source you sent in your request.    
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  

## Retrieve your data inlet

Once you've created your data inlet, you can verify its creation, in addition to checking on other inlets created.

### Request

```SHELL
curl -X GET https://platform.adobe.io/data/core/edge/inlet \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` : Your IMS organization ID can be found under the integration details in the Adobe I/O Console.

### Response

With the above call, you will receive a list of all the data inlets created.

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
            "inletUrl": "https://dcs.data.adobe.net/collection/{INLET_ID}"
        }
    ],
    "total": 1
}
```

- `{INLET_ID}` : The ID of your newly created data inlet.   
- `{IMS_ORG}`: The IMS organization ID that you used in your request.  
- `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  


## Stream an XDM Profile object to Adobe Experience Platform

Once you've created a data inlet, you can use it to stream XDM records and create or update [Customer Profiles][customerprofiles].

### Step 1: Compose an XDM Profile schema

This guide composes a schema using standard mixins provided by Platform to describe personal and work-related details. You will begin by calling the Schema Registry API to create a schema that implements XDM Profile, a standard class, and enables the schema for use with Unified Profile Service (UPS).

> **Note:** For more information about how to create schemas, check out the [Schema Registry API Developer Guide][schema-registry].

#### Request

```shell
CURL -X POST https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{JSON_PAYLOAD}
```

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` : Your IMS organization ID can be found under the integration details in the Adobe I/O Console.
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
            "$ref": "https://ns.adobe.com/xdm/context/identitymap"
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

#### Response

With this call, you will get a response similar to the one below:

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
            "$ref": "https://ns.adobe.com/xdm/context/identitymap"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile-work-details"
        }
    ],
    "meta:extends": [
        "https://ns.adobe.com/xdm/context/profile",
        "https://ns.adobe.com/xdm/data/record",
        "https://ns.adobe.com/xdm/context/identitymap",
        "https://ns.adobe.com/xdm/common/extensible",
        "https://ns.adobe.com/xdm/common/auditable",
        "https://ns.adobe.com/xdm/context/profile-person-details",
        "https://ns.adobe.com/xdm/context/profile-work-details"
    ],
    "meta:immutableTags": [
        "union"
    ],
    "meta:class": "https://ns.adobe.com/xdm/context/profile",
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG_ID}",
    "meta:altId": "_{TENANT_ID}.schemas.{SCHEMA_ID}",
    "meta:xdmType": "object",
    "$id": "{SCHEMA_REF_ID}",
    "version": "{SCHEMA_VERSION}",
    "meta:resourceType": "schemas",
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
- `{IMS_ORG_ID}`: The ID of the IMS Organization that created the schema.
- `{SCHEMA_REF_ID}`: The ID in the response should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`.
- `{TENANT_ID}`: This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Org. For more information about the Tenant ID, check out the [schema registry guide][schema-registry].
- `{SCHEMA_ID}`: The ID of your newly created schema.
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, check out [the schema composition guide][xdminfo].

Please take note of the `$id` as well as the `version` attributes, as both of these will be used when sending records to the Streaming Ingest APIs.

### Step 2: Create a dataset for XDM profile records

Now, you need to create a Dataset so any XDM profile records you stream, assuming it passes XDM validation, will be persisted into it. 

There are **two** important things to note about this dataset:

1. This dataset will be streaming enabled which will be signaled to Catalog by setting `streamingIngestionEnabled` to true. This signals to Platform Services, such as Identity and Profile, that they can read data sent to these datasets instantaneously rather than waiting for it to be batched into the data lake. 
   
Other consumers that work with data in the data lake, such as Data Science Workspace and Query Service will safely ignore this attribute.

2. This dataset will be enabled for **Unified Profile** and **Identity Service** by setting the appropriate tags.

#### Request

```shell
CURL -X POST https://platform.adobe.io/data/foundation/catalog/datasets \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{JSON_PAYLOAD}'
```

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` : Your IMS organization ID can be found under the integration details in the Adobe I/O Console.
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
- `{IMS_ORG_ID}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.
- `{SCHEMA_ID}`: The ID of the previously created schema. 
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, check out [the schema composition guide][xdminfo].
- `{SCHEMA_REF_ID}`: The `$id` that you previously received when you composed the XDM schema. It should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`

#### Response

An example of a successful response can be found below:

```json
[
    "@/datasets/{DATASET_ID}"
]
```

### Step 3: Call Streaming Ingestion APIs to create an XDM profile record

Now, you can send some XDM formatted JSON records to create an XDM profile record within Platform. 

#### Request

```SHELL
CURL -X POST https://dcs.data.adobe.net/collection/{INLET_ID} \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -d '{JSON_PAYLOAD}'
```

Where:

- `{INLET_ID}`: The ID of the created data inlet.  
- `{JSON_PAYLOAD}`: An example of the JSON payload is shown below: 

> **Note:** You will have to replace the {IMS_ORG} with the one you used previously creating a data inlet.

Where:
 
- `schemaRef`: The $id value of the schema that describes the streamed record.
- `imsOrgId`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `source`: The source of the streamed record - this should be the **same** as the one specified earlier, when you created the data inlet.

> **Note:** To find your IMS Org ID, go to <https://console.adobe.io/integrations>, click on the Overview for the integration you want to use, and copy the Organization ID listed.

```JSON
{
    "header": {
        "schemaRef": {
            "id": "{SCHEMA_REF_ID}",
            "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
        },
        "imsOrgId": "{IMS_ORG_ID}",
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
            "identityMap": {
                "ecid": [
                    {
                        "id": "10000000000000000000000000000000000001"
                    }
                ],
                "email": [
                    {
                        "id": "janedoe@example.com",
                        "primary": true
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
                "type": "work",
                "status": "active"
            }
        }
    }
}
```

Where:

- `{IMS_ORG_ID}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.
- `{SCHEMA_ID}`: The ID of the schema you previously created.
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, check out [the schema composition guide][xdminfo].
- `{DATASET_ID}`: The ID of the dataset you previously created.
- `{SCHEMA_REF_ID}`: The `$id` that you previously received when you composed the XDM schema. It should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`


---
 ℹ️   ​ ​ ​**Identity Namespace Codes**

 Please ensure that the codes used for the Identity Namespace are valid - the ones used in the example above use "email" and "ECID" (Experience Cloud ID) which are standard identity namespaces. A list of other commonly used standard identity namespaces can be found [here][standardnamespace]. 

 If you need a custom namespace, click [here][customnamespace] to learn how.

---


#### Response

An example of a successful response can be seen below:

```JSON
{
    "inletId": "{INLET_ID}",
    "xactionId": "1532625558467:0001:13", 
    "receivedTimeMs": 1532625558467
}
```

Where:

- `{INLET_ID}`: The ID of the previously created data inlet.
- `xactionId`: The xactionID is a unique identifier generated server-side for the XDM record you just sent. This ID helps Adobe trace this record's lifecycle through various systems and with debugging.    
- `receivedTimeMs`: receivedTimeMs is a timestamp (epoch in milliseconds) that shows what time the request was received.

### Step 4: Retrieve the newly created Customer Profile

To validate the XDM profile records you just sent, you can use the [Profile Access API][profileapi] to read it back.

Let's look using the identities you used previously:

```JSON
"identityMap": {
    "ecid": [
        {
            "id": "10000000000000000000000000000000000001"
        }
    ],
    "email": [
        {
            "id": "janedoe@example.com",
            "primary": true
        }
    ]
}
```

You could query using either email address or by ECID.

To query using email address, your request would need to look something like this:

`{PROFILE_ACCESS_URL}?schema.name=_xdm.context.profile&entityId=janedoe@example.com&entityIdNS=email`

Where:
- `janedoe@example.com` is the provided entity ID
- `email` is the entity namespace code

Alternatively, if you wanted to query using Experience Cloud ID, your request should look similar to this:
`{PROFILE_ACCESS_URL}?schema.name=_xdm.context.profile&entityId=10000000000000000000000000000000000001&entityIdNS=ecid`

Where:
- `10000000000000000000000000000000000001` is the provided entity ID
- `ecid` (Experience Cloud ID) is the entity namespace code

`{PROFILE_ACCESS_URL}`: The URL that is used to access the Profile Access API.

> **Note:** If the merge policy ID is not defined and the schema.</span>name or relatedSchema</span>.name is `_xdm.context.profile`, Profile Access will fetch **all** related identities.

#### Request

Now that you understand the multiple ways that you can query for your newly created Consumer Profile, here's an example request of how to read back the Consumer Profile created previously.

```SHELL
CURL -X GET 'https://platform.adobe.io/data/core/ups/access/entities?schema.name=_xdm.context.profile&entityId=janedoe%40example.com&entityIdNS=email'\
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG_ID}'
```

> **Note:** To find your API Key and IMS Org ID, go to <https://console.adobe.io/integrations>, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG_ID}` : Your IMS organization ID can be found under the integration details in the Adobe I/O Console.

For further information about this API call, check out the Profile Access API documentation [here][profileapi].

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
                ],
                "ecid": [
                    {
                        "id": "10000000000000000000000000000000000001"
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

- Try making more calls with different values for **ecid** and **email** in the “identities” block to create additional XDM profile records, and see if you can read them back
- Also try changing other attributes like birthYear, gender, or workEmail for a given Profile, and retrieve their updated values.

---

## Stream an XDM ExperienceEvent to Adobe Experience Platform

Once you've confirmed your Profile can be properly accessed, you can use Adobe's Streaming Ingestion APIs to stream ExperienceEvents as they happen. Streamed ExperienceEvents will be instantaneously available on Adobe Experience Platform services, such as Unified Profile. 

The example below associates a new ExperienceEvent with the Consumer Profile you created above. It captures some details about the browser, the product items they viewed, and the web page they viewed it on.

### Step 1: Compose an XDM ExperienceEvent schema

To begin, you will need to create a new schema that implements the XDM ExperienceEvent class.

#### Request

```shell
curl -X POST https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG_ID}' \
  -d '{JSON_PAYLOAD}'
```

> **Note:** To find your API Key and IMS Org ID, go to <https://console.adobe.io/integrations>, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG_ID}` : Your IMS organization ID can be found under the integration details in the Adobe I/O Console.
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
            "$ref": "https://ns.adobe.com/xdm/context/identitymap"
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

#### Response

An example of a successful response can be found below:

```json
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
            "$ref": "https://ns.adobe.com/xdm/context/identitymap"
        }
    ],
    "meta:extends": [
        "https://ns.adobe.com/xdm/context/experienceevent",
        "https://ns.adobe.com/xdm/data/time-series",
        "https://ns.adobe.com/xdm/context/identitymap",
        "https://ns.adobe.com/xdm/common/extensible",
        "https://ns.adobe.com/xdm/context/experienceevent-environment-details",
        "https://ns.adobe.com/xdm/context/experienceevent-commerce"
    ],
    "meta:immutableTags": [
        "union"
    ],
    "meta:class": "https://ns.adobe.com/xdm/context/experienceevent",
    "required": [
        "_id",
        "timestamp",
        "identityMap"
    ],
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG_ID}",
    "meta:altId": "_{TENANT_ID}.schemas.{SCHEMA_ID}",
    "meta:xdmType": "object",
    "$id": "{SCHEMA_REF_ID}",
    "version": "{SCHEMA_VERSION}",
    "meta:resourceType": "schemas",
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
- `{IMS_ORG_ID}`: The ID of the IMS Organization that created the schema.
- `{TENANT_ID}`: This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Org. For more information about the Tenant ID, check out the [schema registry guide][schema-registry].
- `{SCHEMA_REF_ID}`: The ID in the response should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`
- `{SCHEMA_ID}`: The ID of your newly created schema.
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, check out [the schema composition guide][xdminfo].

Please take note of the `$id` as well as the `version` attributes, as both of these will be used when sending records to the Streaming Ingest APIs.

### Step 2: Create a dataset for XDM ExperienceEvents

Like before, you'll need to create a dataset so any ExperienceEvents streamed, assuming they pass XDM validation, will be persisted into the dataset.

There are **two** important things to note about this dataset:

1. This dataset will be **streaming enabled**, which will be signaled to Catalog by setting the **streamingIngestionEnabled** field to true. This signals to Platform Services, such as Identity and Profile, that they can read data sent to these datasets **instantaneously**, rather than waiting for it to be batched into the data lake. Other consumers that work with data in the data lake, such as Data Science Workspace and Query Service will safely ignore this attribute.
2. This dataset will be enabled for **Unified Profile** and **Unified Identity** by setting the appropriate tags.

#### Request

```shell
curl -X POST https://platform.adobe.io/data/foundation/catalog/datasets \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG_ID}' \
  -d '{JSON_PAYLOAD}'
```

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG_ID}` : Your IMS organization ID can be found under the integration details in the Adobe I/O Console.
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
- `{TENANT_ID}`: This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Org. For more information about the Tenant ID, check out the [schema registry guide][schema-registry].
- `{SCHEMA_ID}`: The ID of the previously created schema. 
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, check out [the schema composition guide][xdminfo].
- `{SCHEMA_REF_ID}`: The `$id` that you previously received when you composed the XDM schema. It should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`


#### Response

An example of a successful response can be found below:

```json
[
    "@/datasets/{DATASET_ID}"
]
```


### Step 3: Call Streaming Ingestion APIs to ingest an XDM ExperienceEvent

Now, you can send some XDM formatted JSON records to create an ExperienceEvent within Platform.

#### Request

```SHELL
curl -X POST "https://dcs.data.adobe.net/collection/{INLET_ID}" \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -d '{JSON_PAYLOAD}'
```

`{INLET_ID}`: The ID of the created data inlet.  
`{JSON_PAYLOAD}`: An example of the JSON Payload can be seen below:

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
            "identityMap": {
                "ecid": [
                    {
                        "id": "10000000000000000000000000000000000001"
                    }
                ],
                "email": [
                    {
                        "id": "janedoe@example.com",
                        "primary": true
                    }
                ]
            },
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
            }
        }
    }
}
```

Where: 

- `{IMS_ORG}`:  Your IMS organization ID can be found under the integration details in the Adobe I/O Console.
- `{SCHEMA_ID}`: The ID of the previously created schema. 
- `{SCHEMA_VERSION}`: The version of the previously created schema. As digital experiences change, schemas will need to evolve. As a result, it is required to have the schema version. For more information about schema evolution, check out [the schema composition guide][xdminfo].
- `{DATASET_ID}`: The ID of the previously created dataset.
- `{SCHEMA_REF_ID}`: The `$id` that you previously received when you composed the XDM schema. It should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"`

#### Response

An example of a successful response can be seen below:

```JSON
{
    "inletId": "3c3a530cf4528ca067550a88ae88696bd2932c0b0d6bca826b3d12d79344b10d",
    "xactionId": "1551307525735:0515:4",
    "receivedTimeMs": 1551307525735
}
```
Where:

- `xactionId`: The xactionID is a unique identifier generated server-side for the XDM record you just sent. This ID helps Adobe trace this record's lifecycle through various systems and with debugging.    
- `receivedTimeMs`: receivedTimeMs is a timestamp (epoch in milliseconds) that shows what time the request was received.


### Step 4: Retrieve the newly persisted XDM ExperienceEvent back from Unified Profile

Now, you can use the Profile Access APIs to read the ExperienceEvent you just sent back.

#### Request

```SHELL
curl -X GET \
  "https://platform.adobe.io/data/core/ups/access/entities?schema.name=_xdm.context.experienceEvent&relatedSchema.name=_xdm.context.profile&relatedEntityId=10000000000000000000000000000000000001&relatedEntityIdNS=ecid" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Cache-Control: no-cache" \
  -H "x-api-key: {API_KEY}" \
  -H "x-gw-ims-org-id: {IMS_ORG_ID}"

```

> **Note:** To find your API Key and IMS org ID, go to <https://console.adobe.io/integrations>, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG_ID}` : Your IMS organization ID can be found under the integration details in the Adobe I/O Console.

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
                "identityMap": {
                    "ecid": [
                        {
                            "id": "10000000000000000000000000000000000001"
                        }
                    ],
                    "email": [
                        {
                            "id": "janedoe@example.com",
                            "primary": true
                        }
                    ]
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
                "timestamp": "2019-02-23T22:07:01Z"
            },
            "lastModifiedAt": "2019-03-01T01:31:58Z"
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

- Try streaming new ExperienceEvents by changing the timestamp or record ID fields.
- Subsequent POST calls with different timestamps and event IDs will simulate subsequent user activity. Subsequent GET calls will return an increasing array of the ExperienceEvents that are associated with the consumer's Profile. 

---

Following this guide, you should be able to do the following actions:
- Request a Data Inlet
- Stream and retrieve Profile Events
- Stream and retrieve ExperienceEvents from Adobe Experience Platform

With this knowledge, you should be able to easily get your data to Adobe Experience Platform. Now that you can stream and retrieve your own events, try repeating these steps with other data and see if you can replicate your results.

[1]: ../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md 

[2]: https://medium.com/adobetech/using-postman-for-jwt-authentication-on-adobe-i-o-7573428ffe7f

[3]: https://console.adobe.io/

[apispecs]: streaming_endpoint_registration/streaming_endpoint_registration.md

[standardnamespace]: ../identity_services_architectural_overview/identity_services_faq.md

[customnamespace]: ../identity_namespace_overview/identity_namespace_overview.md


[identityapi]: ../identity_services_architectural_overview/identity_services_architectural_overview.md


[xdminfo]: ../schema_registry/schema_composition/schema_composition.md

[schema-registry]: ../schema_registry/schema_registry_developer_guide.md

[profileapi]: ../unified_profile_architectural_overview/unified_profile_architectural_overview.md


[customerprofiles]: ../unified_profile_architectural_overview/unified_profile_architectural_overview.md

[adc]: authenticated_data_collection.md