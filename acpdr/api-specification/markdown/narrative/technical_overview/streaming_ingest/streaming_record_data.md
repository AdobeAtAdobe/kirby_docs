# Stream record data to Adobe Experience Platform

This tutorial will help you begin using streaming ingestion APIs, part of the Adobe Experience Platform Data Ingestion Service APIs. Specifically, this documentation will help you:

- [Compose a schema based off of the XDM Individual Profile class](#compose-a-schema-based-off-of-the-xdm-individual-profile-class)
- [Set a primary identity descriptor for the schema](#set-a-primary-identity-descriptor-for-the-schema)
- [Create a dataset for record data](#create-a-dataset-for-record-data)
- [Ingest record data to the streaming connection](#ingest-record-data-to-the-streaming-connection)
- [Retrieve the newly ingested record data](#retrieve-the-newly-ingested-record-data)

## Getting started

This tutorial requires a working knowledge of various Adobe Experience Platform services. Before beginning this tutorial, please review the documentation for the following services:

- [Experience Data Model (XDM)](../schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Platform organizes experience data.
- [Real-time Customer Profile](../unified_profile_architectural_overview/unified_profile_architectural_overview.md): Provides a unified, consumer profile in real-time based on aggregated data from multiple sources.
- [Schema Registry developer guide](../../technical_overview/schema_registry/schema_registry_developer_guide.md): A comprehensive guide that covers each of the available endpoints of the Schema Registry API and how to make calls to them. This includes knowing your `{TENANT_ID}`, which appears in calls throughout this tutorial, as well as knowing how to create schemas, which is used in creating a dataset for ingestion.

Additionally, this tutorial requires that you have already created a streaming connection. For more information on creating a streaming connection, please read the [create a streaming connection tutorial](./creating_a_streaming_connection.md).

The following sections provide additional information that you will need to know in order to successfully make calls to streaming ingestion APIs.

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

## Compose a schema based off of the XDM Individual Profile class

To create a dataset, you will first need to create a new schema that implements the XDM Individual Profile class. For more information about how to create schemas, please read the [Schema Registry API developer guide](../schema_registry/schema_registry_developer_guide.md).

#### API format

```http
POST /schemaregistry/tenant/schemas
```

#### Request

```shell
curl -X POST https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "type": "object",
    "title": "Sample schema",
    "description": "Sample description",
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
  }'
```

| Property | Description |
| -------- | ----------- |
| `title` | The name you want to use for your schema. This name must be unique. |
| `description` | A meaningful description for the schema you are creating. |
| `meta:immutableTags` | In this example, the `union` tag is used to persist your data into [Real-time Customer Profile](../unified_profile_architectural_overview/unified_profile_architectural_overview.md). |

#### Response

A successful response returns HTTP status 201 with details of your newly created schema.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
    "meta:altId": "_{TENANT_ID}.schemas.{SCHEMA_ID}",
    "meta:resourceType": "schemas",
    "version": "1.0",
    "type": "object",
    "title": "Sample schema",
    "description": "Sample description",
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

| Property | Description |
| -------- | ----------- |
| `{TENANT_ID}` | This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Organization. For more information about the Tenant ID, please read the [schema registry guide](../schema_registry/schema_registry_developer_guide.md). |

Please take note of the `$id` as well as the `version` attributes, as both of these will be used when creating your dataset.

## Set a primary identity descriptor for the schema

Next, add an [identity descriptor](../schema_registry/schema_registry_developer_guide.md#descriptors) to the schema created above, using the work email address attribute as the primary identifier. Doing this will result in two changes:

1. The work email address will become a mandatory field. This means messages sent without this field will fail validation and will not be ingested.

2. Real-time Customer Profile will use the work email address as an identifier to help stitch together more information about that individual.

### Request

```shell
curl -X POST https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
	"@type":"xdm:descriptorIdentity",
	"xdm:sourceProperty":"/workEmail/address",
	"xdm:property":"xdm:code",
	"xdm:isPrimary":true,
	"xdm:namespace":"Email",
	"xdm:sourceSchema":"{SCHEMA_REF_ID}",
	"xdm:sourceVersion":1
}
```

| Property | Description |
| -------- | ----------- |
| `{SCHEMA_REF_ID}` | The `$id` that you previously received when you composed the schema. It should look something like this: `"https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}"` |

---
 ℹ️   ​ ​ ​**Identity Namespace Codes**

 Please ensure that the codes are valid - the example above uses "email" which is a standard identity namespace. Other commonly used standard identity namespaces can be found within the [Identity Service FAQ](../identity_services_architectural_overview/identity_services_faq.md) documentation in [this table](../identity_services_architectural_overview/identity_services_faq.md#are-there-any-identity-namespaces-i-can-use-out-of-the-box).

 If you would like to create a custom namespace, follow the steps outlined in the [identity namespace overview](../identity_namespace_overview/identity_namespace_overview.md).

---

#### Response

A successful response returns HTTP status 201 with information on the newly created primary identity descriptor for the schema.

```json
{
    "xdm:property": "xdm:code",
    "xdm:sourceSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
    "xdm:namespace": "Email",
    "@type": "xdm:descriptorIdentity",
    "xdm:sourceVersion": 1,
    "xdm:isPrimary": true,
    "xdm:sourceProperty": "/workEmail/address",
    "@id": "17aaebfa382ce8fc0a40d3e43870b6470aab894e1c368d16",
    "meta:containerId": "tenant",
    "version": "1",
    "imsOrg": "{IMS_ORG}"
}
```

## Create a dataset for record data

Once you have created your schema, you will need to create a dataset to ingest record data.

>**Note:** This dataset will be enabled for **Real-time Customer Profile** and **Identity Service**.

#### API format

```http
POST /catalog/dataSets
```

#### Request

```shell
curl -X POST https://platform.adobe.io/data/foundation/catalog/dataSets \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d ' {
	"name": "Dataset name",
	"description": "Dataset description",
	"schemaRef": {
		"id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID},
		"contentType": "application/vnd.adobe.xed-full+json;version=1.0"
	},
	"tags": {
		"unifiedIdentity": ["enabled:true"],
		"unifiedProfile": ["enabled:true"]
	}
}'
```

#### Response

A successful response returns HTTP status 201 and an array containing the ID of the newly created dataset in the format `@/dataSets/{DATASET_ID}`.

```json
[
    "@/dataSets/5e30d7986c0cc218a85cee65
]
```

## Ingest record data to the streaming connection

With the dataset and streaming connection in place, you can ingest XDM-formatted JSON records to ingest record data into Platform.

#### API format

```http
POST /collection/{CONNECTION_ID}?synchronousValidation=true
```

| Parameter | Description |
| --------- | ----------- |
| `{CONNECTION_ID}` | The `id` value of the streaming connection previously created. |
| `synchronousValidation`| An optional query parameter intended for development purposes. If set to `true`, it can be used for immediate feedback to determine if the request was successfully sent. By default, this value is set to `false`. |

#### Request

>**Note:** The following API call does **not** require any authentication headers.

```shell
curl -X POST https://dcs.adobedc.net/collection/{CONNECTION_ID}?synchronousValidation=true \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -d '{
    "header": {
        "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
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
                "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
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
}'
```

#### Response

A successful response returns HTTP status 200 with details of the newly streamed Profile.

```json
{
    "inletId": "{CONNECTION_ID}",
    "xactionId": "1584479347507:2153:240",
    "receivedTimeMs": 1584479347507,
    "synchronousValidation": {
        "status": "pass"
    }
}
```

| Property | Description |
| -------- | ----------- |
| `{CONNECTION_ID}` | The ID of the previously created streaming connection. |
| `xactionId` | A unique identifier generated server-side for the record you just sent. This ID helps Adobe trace this record's lifecycle through various systems and with debugging. |    
| `receivedTimeMs` | A timestamp (epoch in milliseconds) that shows what time the request was received. |
| `synchronousValidation.status` | Since the query parameter `synchronousValidation=true` was added, this value will appear. If the validation has succeeded, the status will be `pass`. |

## Retrieve the newly ingested record data

To validate the previously ingested records, you can use the [Profile Access API](../../tutorials/consuming_unified_profile_data/consuming_unified_profile_data.md) to retrieve the record data.

> **Note:** If the merge policy ID is not defined and the schema.</span>name or relatedSchema</span>.name is `_xdm.context.profile`, Profile Access will fetch **all** related identities.

#### API format

```http
GET /access/entities
GET /access/entities?{QUERY_PARAMETERS}
GET /access/entities?schema.name=_xdm.context.profile&entityId=janedoe@example.com&entityIdNS=email
```

| Parameter | Description |
| --------- | ----------- |
| `schema.name` | **Required.** The name of the schema you are accessing. |
| `entityId` | The ID of the entity. If provided, you must also provide the entity namespace. |
| `entityIdNS` | The namespace of the ID you are trying to retrieve. |

#### Request

You can review the previously ingested record data with the following GET request.

```shell
curl -X GET 'https://platform.adobe.io/data/core/ups/access/entities?schema.name=_xdm.context.profile&entityId=janedoe@example.com&entityIdNS=email'\
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns HTTP status 200 with details of the entities requested. As you can see, this is the same record that was successfully ingested earlier.

```json
{
    "BVrqzwVv7o2p3naHvnsWpqZXv3KJgA": {
        "entityId": "BVrqzwVv7o2p3naHvnsWpqZXv3KJgA",
        "mergePolicy": {
            "id": "e161dae9-52f0-4c7f-b264-dc43dd903d56"
        },
        "sources": [
            "5e30d7986c0cc218a85cee65"
        ],
        "tags": [
            "1580346827274:2478:215"
        ],
        "identityGraph": [
            "BVrqzwVv7o2p3naHvnsWpqZXv3KJgA"
        ],
        "entity": {
            "person": {
                "name": {
                    "lastName": "Doe",
                    "middleName": "F",
                    "firstName": "Jane"
                },
                "gender": "female",
                "birthDate": "1969-03-14"
            },
            "workEmail": {
                "type": "work",
                "address": "janedoe@example.com",
                "status": "active",
                "primary": true
            },
            "identityMap": {
                "email": [
                    {
                        "id": "janedoe@example.com"
                    }
                ]
            }
        },
        "lastModifiedAt": "2020-01-30T01:13:59Z"
    }
}
```

## Next steps

By reading this document, you now understand how to ingest record data into Platform using streaming connections. You can try making more calls with different values and retrieving the updated values. Additionally, you can start monitoring your ingested data through Platform UI. For more information, please read the [monitoring streaming data flows](monitor-data-flows.md) guide.

For more information about streaming ingestion in general, please read the [streaming ingestion overview](./streaming_ingest_overview.md). 

