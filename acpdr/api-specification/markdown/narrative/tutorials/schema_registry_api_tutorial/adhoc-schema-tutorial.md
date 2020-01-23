# Create an ad-hoc schema using the Schema Registry API

In specific circumstances, it may be necessary to create an Experience Data Model (XDM) schema with fields that are namespaced for usage only by a single dataset. This is referred to as an "ad-hoc" schema. Ad-hoc schemas are used in various data ingestion workflows for Experience Platform, including ingesting CSV files and creating certain kinds of source connections.

This document provides general steps for creating an ad-hoc schema using the [Schema Registry API](../../../../../../acpdr/swagger-specs/schema-registry.yaml). It is intended to be used in conjunction with other Experience Platform tutorials that require creating an ad-hoc schema as part of their workflow. Each of those documents provides detailed information on how to properly configure an ad-hoc schema for its specific use case.

This tutorial covers the following steps:

- [Create an ad-hoc class](#create-an-ad-hoc-class)
- [Create a schema based on the ad-hoc class](#create-an-ad-hoc-schema)
- _(Optional)_ [View the schema](#view-the-full-ad-hoc-schema) 

## Getting started

This tutorial requires a working understanding of Experience Data Model (XDM) System. Before starting this tutorial, please review the following XDM documentation:

- [XDM System overview](../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): A high-level overview of XDM and its implementation in Experience Platform.
- [Basics of schema composition](../../technical_overview/schema_registry/schema_composition/schema_composition.md): An overview of the basic components of XDM schemas.
- [Schema Registry developer guide](../../technical_overview/schema_registry/schema_registry_developer_guide.md): A comprehensive guide that covers each of the available endpoints of the Schema Registry API and how to make calls to them. This includes knowing your `{TENANT_ID}`, which appears in calls throughout this tutorial.

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in the documentation for sample API calls, see the section on [how to read example API calls](../../technical_overview/platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

This tutorial also requires you to have completed the [authentication tutorial](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) in order to successfully make calls to Platform APIs. Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform are isolated to specific virtual sandboxes. Requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../../technical_overview/sandboxes/sandboxes-overview.md).

All lookup (GET) requests to the Schema Registry require an additional Accept header, whose value determines the format of information returned by the API. See the [Accept header](../../technical_overview/schema_registry/schema_registry_developer_guide.md#accept-header) section in the Schema Registry developer guide for more details.

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

## Create an ad-hoc class

The data behavior of an XDM schema is determined by its underlying class. The first step in creating an ad-hoc schema is to create a class based on the `adhoc` behavior. This is done by making a POST request to the `/tenant/classes` endpoint.

#### API format

```http
POST /tenant/classes
```

#### Request

The following request creates a new XDM class, configured by the attributes supplied in the payload. By supplying a `$ref` property set to `https://ns.adobe.com/xdm/data/adhoc` in the `allOf` array, this class inherits the `adhoc` behavior. The request also defines an `_adhoc` object, which contains the custom fields for the class.

> **Note:** The custom fields defined under `_adhoc` vary depending the use case of the ad-hoc schema. Please refer to the specific workflow in the appropriate tutorial for required custom fields based on use case.

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/classes \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "title":"New ad-hoc class",
        "description": "New ad-hoc class description",
        "type":"object",
        "allOf": [
          {
            "$ref":"https://ns.adobe.com/xdm/data/adhoc"
          },
          {
            "properties": {
              "_adhoc": {
                "type":"object",
                "properties": {
                  "field1": {
                    "type":"string"
                  },
                  "field2": {
                    "type":"string"
                  }
                }
              }
            }
          }
        ]
      }'
```
Property | Description
--- | ---
`$ref` | The data behavior for the new class. For ad-hoc classes, this value must be set to `https://ns.adobe.com/xdm/data/adhoc`.
`properties._adhoc` | An object that contains the custom fields for the class, expressed as key-value pairs of field names and data types.

#### Response

A successful response returns the details of the new class, replacing the `properties._adhoc` object's name with a GUID that is a system-generated, read-only unique identifier for the class. The `meta:datasetNamespace` attribute is also generated automatically and included in the response.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/classes/6395cbd58812a6d64c4e5344f7b9120f",
    "meta:altId": "_{TENANT_ID}.classes.6395cbd58812a6d64c4e5344f7b9120f",
    "meta:resourceType": "classes",
    "version": "1.0",
    "title": "New Class",
    "description": "New class description",
    "type": "object",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/xdm/data/adhoc"
        },
        {
            "properties": {
                "_6395cbd58812a6d64c4e5344f7b9120f": {
                    "type": "object",
                    "properties": {
                        "field1": {
                            "type": "string",
                            "meta:xdmType": "string"
                        },
                        "field2": {
                            "type": "string",
                            "meta:xdmType": "string"
                        }
                    },
                    "meta:xdmType": "object"
                }
            },
            "type": "object",
            "meta:xdmType": "object"
        }
    ],
    "meta:abstract": true,
    "meta:extensible": true,
    "meta:extends": [
        "https://ns.adobe.com/xdm/data/adhoc"
    ],
    "meta:containerId": "tenant",
    "meta:datasetNamespace": "_6395cbd58812a6d64c4e5344f7b9120f",
    "imsOrg": "{IMS_ORG}",
    "meta:xdmType": "object",
    "meta:registryMetadata": {
        "repo:createdDate": 1557527784822,
        "repo:lastModifiedDate": 1557527784822,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:lastModifiedClientId": "{MODIFIED_CLIENT}",
        "eTag": "Jggrlh4PQdZUvDUhQHXKx38iTQo="
    }
}
```
Property | Description
--- | ---
`$id` | A URI that serves as the read-only, system generated unique identifier for the new ad-hoc class. This value is used in the next step of creating an ad-hoc schema.

## Create an ad-hoc schema

Once you have created an ad-hoc class, you can create a new schema that implements that class by making a POST request to the `/tenant/schemas` endpoint.

#### API format

```http
POST /tenant/schemas
```

#### Request

The following request creates a new schema, providing a reference (`$ref`) to the `$id` of the previously created ad-hoc class in its payload.

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "title":"New Schema",
        "description": "New schema description.",
        "type":"object",
        "allOf": [
          {
            "$ref":"https://ns.adobe.com/{TENANT_ID}/classes/6395cbd58812a6d64c4e5344f7b9120f"
          }
        ]
      }'
```

#### Response

A successful response returns the details of the newly created schema, including its system-generated, read-only `$id`.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/26f6833e55db1dd8308aa07a64f2042d",
    "meta:altId": "_{TENANT_ID}.schemas.26f6833e55db1dd8308aa07a64f2042d",
    "meta:resourceType": "schemas",
    "version": "1.0",
    "title": "New Schema",
    "description": "New schema description.",
    "type": "object",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/{TENANT_ID}/classes/6395cbd58812a6d64c4e5344f7b9120f"
        }
    ],
    "meta:datasetNamespace": "_6395cbd58812a6d64c4e5344f7b9120f",
    "meta:class": "https://ns.adobe.com/{TENANT_ID}/classes/6395cbd58812a6d64c4e5344f7b9120f",
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:extends": [
        "https://ns.adobe.com/{TENANT_ID}/classes/6395cbd58812a6d64c4e5344f7b9120f",
        "https://ns.adobe.com/xdm/data/adhoc"
    ],
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:xdmType": "object",
    "meta:registryMetadata": {
        "repo:createdDate": 1557528570542,
        "repo:lastModifiedDate": 1557528570542,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:lastModifiedClientId": "{MODIFIED_CLIENT}",
        "eTag": "Jggrlh4PQdZUvDUhQHXKx38iTQo="
    }
}
```

## View the full ad-hoc schema

> **Note:** This step is optional. If you do not wish to inspect the field structure of your ad-hoc schema, you can skip to the [next steps](#next-steps) section at the end of this tutorial.

Once the ad-hoc schema has been created, you can make a lookup (GET) request to view the schema in its expanded form. This is done by using the appropriate Accept header in the GET request, as demonstrated below.

#### API format

```http
GET /tenant/schemas/{SCHEMA_ID}
```
Parameter | Description
--- | ---
`{SCHEMA_ID}` | The URL-encoded `$id` URI or `meta:altId` of the ad-hoc schema you want to access.

#### Request

The following request uses the Accept header `application/vnd.adobe.xed-full+json; version=1`, which returns the expanded form of the schema. Note that when retrieving a specific resource from the Schema Registry, the request's Accept header must include major version of the resource in question.

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas/_{TENANT_ID}.schemas.26f6833e55db1dd8308aa07a64f2042d \
  -H 'Accept: application/vnd.adobe.xed-full+json; version=1' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
```

#### Response

A successful response returns the details of the schema, including all fields nested under `properties`.

```json
{
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/26f6833e55db1dd8308aa07a64f2042d",
    "meta:altId": "_{TENANT_ID}.schemas.26f6833e55db1dd8308aa07a64f2042d",
    "meta:resourceType": "schemas",
    "version": "1.0",
    "title": "New Schema",
    "description": "New schema description.",
    "type": "object",
    "meta:datasetNamespace": "_6395cbd58812a6d64c4e5344f7b9120f",
    "meta:class": "https://ns.adobe.com/{TENANT_ID}/classes/6395cbd58812a6d64c4e5344f7b9120f",
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:extends": [
        "https://ns.adobe.com/{TENANT_ID}/classes/6395cbd58812a6d64c4e5344f7b9120f",
        "https://ns.adobe.com/xdm/data/adhoc"
    ],
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:xdmType": "object",
    "properties": {
        "_6395cbd58812a6d64c4e5344f7b9120f": {
            "type": "object",
            "meta:xdmType": "object",
            "properties": {
                "field1": {
                    "type": "string",
                    "meta:xdmType": "string"
                },
                "field2": {
                    "type": "string",
                    "meta:xdmType": "string"
                }
            }
        }
    },
    "meta:registryMetadata": {
        "repo:createdDate": 1557528570542,
        "repo:lastModifiedDate": 1557528570542,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:lastModifiedClientId": "{MODIFIED_CLIENT}",
        "eTag": "bTogM1ON2LO/F7rlcc1iOWmNVy0="
    }
}
```

## Next steps

By following this tutorial, you have successfully created a new ad-hoc schema. If you were brought to this document as part of another tutorial, you can now use the `$id` of your ad-hoc schema to complete the workflow as directed.

For more information on working with the Schema Registry API, please refer to the [developer guide](../../technical_overview/schema_registry/schema_registry_developer_guide.md).