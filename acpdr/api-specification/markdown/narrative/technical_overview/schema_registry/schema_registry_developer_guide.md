# Schema Registry developer guide

The Schema Registry is used to access the Schema Library within Adobe Experience Platform, providing a user interface and RESTful API from which all available library resources are accessible.

This developer guide provides steps to help you [start using the Schema Registry API](#getting-started-with-the-schema-registry-api), including:

* [Know your `TENANT_ID`](#know-your--tenant-id-)
* [Understand the `CONTAINER_ID`](#understand-the--container-id-)
* [Schema identification](#schema-identification)
* [Accept headers](#accept-header)
* [XDM field constraints and best practices](#xdm-field-constraints-and-best-practices)

The guide then provides [sample API calls](#sample-api-calls) for performing the following actions using the Schema Registry:

* [Listing schemas, classes, mixins, or data types](#list-resources)
* [Lookup specific schemas, classes, mixins, or data types](#lookup-a-specific-resource)
* [Create a schema, class, mixin, or data type](#create-a-resource)
* [Update a schema, class, mixin, or data type](#update-a-resource)
* [Replace a schema, class, mixin, or data type](#replace-a-resource)
* [Delete a schema, class, mixin, or data type](#delete-a-resource)
* [Use descriptors to describe schema metadata](#descriptors)
* [Enable and view unions for Real-time Customer Profile](#real-time-customer-profile)

The [Appendix](#appendix) to this document includes additional helpful resources related to the Schema Registry, including:

* A brief introduction to [XDM Compatibility Mode](#compatibility-mode)
* How to [define XDM field types in the API](#defining-xdm-field-types-in-the-api) 
* How to [map XDM field types to other serialization formats](#mapping-xdm-types-to-other-formats) (such as Parquet and Scala)
* How to [define descriptors in the API](#defining-descriptors-in-the-api)
* How to create an [ad-hoc schema](#ad-hoc-schema-workflow) for specific data ingestion workflows

## Getting started with the Schema Registry API

Using the Schema Registry API, you can perform basic CRUD operations in order to view and manage all schemas and related resources available to you within Adobe Experience Platform. This includes those defined by Adobe, Experience Platform partners, and vendors whose applications you use. You can also use API calls to create new schemas and resources for your organization, as well as view and edit resources that you have already defined.

This guide requires a working understanding of the following components of Adobe Experience Platform:

* [Experience Data Model (XDM) System](xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Experience Platform organizes customer experience data.
    * [Basics of schema composition](schema_composition/schema_composition.md): Learn about the basic building blocks of XDM schemas.
* [Real-time Customer Profile](../unified_profile_architectural_overview/unified_profile_architectural_overview.md): Provides a unified, real-time consumer profile based on aggregated data from multiple sources.
* [Sandboxes](../sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to successfully make calls to the Schema Registry API.

### Reading sample API calls

This guide provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform, including those belonging to the Schema Registry, are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../sandboxes/sandboxes-overview.md). 

All lookup (GET) requests to the Schema Registry require an additional Accept header, whose value determines the format of information returned by the API. See the [Accept header](#accept-header) section below for more details.

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

### Know your `TENANT_ID`

Throughout this guide you will see references to a `TENANT_ID`. This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Organization. If you do not know your ID, you can access it by performing the following GET request:

#### API format

```http
GET /stats
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/stats \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns information regarding your organization's use of the Schema Registry. This includes a `tenantId` attribute, the value of which is your `TENANT_ID`. 

```JSON
{
  "imsOrg":"{IMS_ORG}",
  "tenantId":"{TENANT_ID}",
  "counts": {
    "schemas": 4,
    "mixins": 3,
    "datatypes": 1,
    "classes": 2,
    "unions": 0,
  },
  "recentlyCreatedResources": [ 
    {
      "title": "Sample Mixin",
      "description": "New Sample Mixin.",
      "meta:resourceType": "mixins",
      "meta:created": "Sat Feb 02 2019 00:24:30 GMT+0000 (UTC)",
      "version": "1.1"
    },
    {
      "$id": "https://ns.adobe.com/{TENANT_ID}/classes/5bdb5582be0c0f3ebfc1c603b705764f",
      "title": "Tenant Class",
      "description": "Tenant Defined Class",
      "meta:resourceType": "classes",
      "meta:created": "Fri Feb 01 2019 22:46:21 GMT+0000 (UTC)",
      "version": "1.0"
    } 
  ],
  "recentlyUpdatedResources": [
    {
      "title": "Sample Mixin",
      "description": "New Sample Mixin.",
      "meta:resourceType": "mixins",
      "meta:updated": "Sat Feb 02 2019 00:34:06 GMT+0000 (UTC)",
      "version": "1.1"
    },
    {
      "title": "Data Schema",
      "description": "Schema for Data Information",
      "meta:resourceType": "schemas",
      "meta:updated": "Fri Feb 01 2019 23:47:43 GMT+0000 (UTC)",
      "meta:class": "https://ns.adobe.com/{TENANT_ID}/classes/47b2189fc135e03c844b4f25139d10ab",
      "meta:classTitle": "Sample Class",
      "version": "1.1"
    }
 ],
 "classUsage": {
    "https://ns.adobe.com/{TENANT_ID}/classes/47b2189fc135e03c844b4f25139d10ab": [
      {
        "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/274f17bc5807ff307a046bab1489fb18",
        "title": "Tenant Data Schema",
        "description": "Schema for tenant-specific data."
      }
    ],
    "https://ns.adobe.com/xdm/context/profile": [
      {
        "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/3ac6499f0a43618bba6b138226ae3542",
        "title": "Simple Profile",
        "description": "A simple profile schema."
      },
      {
        "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/fbc52b243d04b5d4f41eaa72a8ba58be",
        "title": "Program Schema",
        "description": "Schema for program-related data."
      },
      {
        "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/4025a705890c6d4a4a06b16f8cf6f4ca",
        "title": "Sample Schema",
        "description": "A sample schema."
      }
    ]
  }
 }
```
* `tenantId`: The `TENANT_ID` value for your IMS Organization.

### Understand the `CONTAINER_ID`

Calls to the Schema Registry API require the use of a `CONTAINER_ID`. There are two containers against which API calls can be made: the **global container** and the **tenant container**.

**Global container**

The global container holds all standard Adobe and Experience Platform partner provided classes, mixins, data types, and schemas. You may only perform list and lookup (GET) requests against the global container.

**Tenant container**

Not to be confused with your unique `TENANT_ID`, the tenant container holds all classes, mixins, data types, schemas, and descriptors defined by an IMS Organization. These are unique to each organization, meaning they are not visible or manageable by other IMS Orgs. You may perform all CRUD operations (GET, POST, PUT, PATCH, DELETE) against resources that you create in the tenant container. 

When you create a class, mixin, schema or data type in the tenant container, it is saved to the Schema Registry and assigned an `$id` URI that includes your `TENANT_ID`. This `$id` is used throughout the API to reference specific resources. Examples of `$id` values are provided in the next section.

### Schema identification

Schemas are identified with an `$id` attribute in the form of a URI, such as: 
* `https://ns.adobe.com/xdm/context/profile` 
* `https://ns.adobe.com/{TENANT_ID}/schemas/7442343-abs2343-21232421` 

To make the URI more REST-friendly, schemas also have a dot-notation encoding of the URI in a property called `meta:altId`:
* `_xdm.context.profile`
* `_{TENANT_ID}.schemas.7442343-abs2343-21232421`

Calls to the Schema Registry API will support either the URL-encoded `$id` URI or the `meta:altId` (dot-notation format). Best practice is to use the URL-encoded `$id` URI when making a REST call to the API, like so:
* `https%3A%2F%2Fns.adobe.com%2Fxdm%2Fcontext%2Fprofile`
* `https%3A%2F%2Fns.adobe.com%2F{TENANT_ID}%2Fschemas%2F7442343-abs2343-21232421`

### Accept header

When performing list and lookup (GET) operations in the Schema Registry API, an Accept header is required to determine the format of the data returned by the API. When looking up specific resources, a version number must also be included in the Accept header.

The following table lists compatible Accept header values, including those with version numbers, along with descriptions of what the API will return when they are used.

Accept | Description
-------|------------
application/vnd.adobe.xed-id+json |Returns a list of IDs only. This is most commonly used for listing resources.
application/vnd.adobe.xed+json |Returns a list of full JSON schema with original `$ref` and `allOf` included. This is used to return a list of full resources.
application/vnd.adobe.xed+json; version={MAJOR_VERSION}	|Raw XDM with `$ref` and `allOf`. Has titles and descriptions.
application/vnd.adobe.xed-full+json; version={MAJOR_VERSION} |`$ref` attributes and `allOf` resolved. Has titles and descriptions.
application/vnd.adobe.xed-notext+json; version={MAJOR_VERSION}	|Raw XDM with `$ref` and `allOf`. No titles or descriptions.
application/vnd.adobe.xed-full-notext+json; version={MAJOR_VERSION}	|`$ref` attributes and `allOf` resolved. No titles or descriptions.
application/vnd.adobe.xed-full-desc+json; version={MAJOR_VERSION}	|`$ref` attributes and `allOf` resolved. Descriptors are included.

> **Note:** If supplying the `major` version only (e.g. 1, 2, 3), the registry will return the latest `minor` version (e.g. .1, .2, .3) automatically.

### XDM field constraints and best practices

The fields of a schema are listed within its `properties` object. Each field is itself an object, containing attributes to describe and constrain the data that the field can contain. 

More information about [defining field types in the API](#defining-xdm-field-types-in-the-api) can be found later in this document, including code samples and optional constraints for the most commonly used data types.

The following sample field illustrates a properly formatted XDM field, with further details on naming constraints and best practices provided below. These practices can also be applied when defining other resources that contain similar attributes.

```JSON
"fieldName": {
    "title": "Field Name",
    "type": "string",
    "format": "date-time",
    "examples": [
        "2004-10-23T12:00:00-06:00"
    ],
    "description": "Full sentence describing the field, using proper grammar and punctuation.",
}
```
* The name of a field object may contain alphanumeric, dash, or underscore characters, but **may not** start with an underscore.  
  - _**Correct:**_ `fieldName`, `field_name2`, `Field-Name`, `field-name_3`  
  - _**Incorrect:**_ `_fieldName`
* camelCase is preferred for the name of the field object. Example: `fieldName`
* The field should include a `title`, written in Title Case. Example: `Field Name`
* The field requires a `type`.  
    * Defining certain types may require an optional `format`.  
    * Where a specific formatting of data is required, `examples` can be added as an array.
    * The field type may also be defined using any data type in the registry. See the section on [creating a data type](#create-a-data-type) in this document for more information. 
* The `description` explains the field and pertinent information regarding field data. It should be written in full sentences with clear language so that anyone accessing the schema can understand the intention of the field.

See the appendix for more information how to [define field types in the API](#defining-xdm-field-types-in-the-api).

## Sample API calls

Now that you know your `TENANT_ID`, are familiar with containers, understand which headers to use, and have reviewed best practices for defining resources, you are ready to begin making calls to the Schema Registry API. The following sections walk through the most common API calls you will make using the Schema Registry. Each call includes the general API format, a sample request showing required headers, and a sample response. 

## List resources

You can view a list of all resources (schemas, classes, mixins, or data types) within a container by performing a single GET request. To help filter results, the Schema Registry supports the use of query parameters when listing resources.

The most common query parameters include:
* `limit` - Limit the number of resources returned. Example: `limit=5` will return a list of five resources.
* `orderby` - Sort results by a specific property. Example: `orderby=title` will sort results by title in ascending order (A-Z). Adding a `-` before title (`orderby=-title`) will sort items by title in descending order (Z-A). 
* `property` - Filter results on any top-level attributes. Example: `property=meta:intendedToExtend==https://ns.adobe.com/xdm/context/profile` returns only mixins that are compatible with the XDM Individual Profile class.

When combining multiple query parameters, they must be separated by ampersands (`&`).

#### API format

```http
GET /{CONTAINER_ID}/{RESOURCE_TYPE}

GET /global/datatypes
GET /tenant/mixins?property=meta:intendedToExtend==https://ns.adobe.com/xdm/context/experienceevent
GET /tenant/schemas?limit=3
GET /global/classes?orderby=title&limit=4
```
* `{CONTAINER_ID}`: The container where the resources are located ("global" or "tenant").
* `{RESOURCE_TYPE}`: The type of resource to retrieve from the Schema Library. Valid types are `datatypes`, `mixins`, `schemas`, and `classes`.

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/global/classes \
  -H 'Accept: application/vnd.adobe.xed-id+json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```
The response format depends on the Accept header sent in the request. The following Accept headers are available for listing resources:

Accept | Description
-------|------------
application/vnd.adobe.xed-id+json | Returns a short summary of each resource, generally the preferred header for listing
application/vnd.adobe.xed+json | Returns full JSON schema for each resource, with original `$ref` and `allOf` included

#### Response

The request above used the `application/vnd.adobe.xed-id+json` Accept header, therefore the response includes only the `title`, `$id`, `meta:altId`, and `version` attributes for each resource. Substituting `full` into the Accept header returns all attributes of each resource. Select the appropriate Accept header depending on the information you require in your response.

```JSON
{
  "results": [
    {
        "title": "XDM ExperienceEvent",
        "$id": "https://ns.adobe.com/xdm/context/experienceevent",
        "meta:altId": "_xdm.context.experienceevent",
        "version": "1"
    },
    {
        "title": "XDM Individual Profile",
        "$id": "https://ns.adobe.com/xdm/context/profile",
        "meta:altId": "_xdm.context.profile",
        "version": "1"
    }
  ]
}
```

## Lookup a specific resource

You can lookup specific resources by making a GET request that includes the `$id` (URL-encoded URI) of the resource in the request path.

#### API format

```http
GET /{CONTAINER_ID}/{RESOURCE_TYPE}/{RESOURCE_ID} 

GET /global/mixins/_xdm.context.profile-person-details
GET /global/mixins/https%3A%2F%2Fns.adobe.com%2Fxdm%2Fcontext%2Fprofile-person-details

GET /tenant/mixins/_{TENANT_ID}.mixins.bce6c11bbe4ad4155dd940c15dfe74e1
GET /tenant/mixins/https%3A%2F%2Fns.adobe.com%2F{TENANT_ID}%2Fmixins%2Fbce6c11bbe4ad4155dd940c15dfe74e1
```
* `{CONTAINER_ID}`: The container where the resources are located ("global" or "tenant").
* `{RESOURCE_TYPE}`: The type of resource to retrieve from the Schema Library. Valid types are `datatypes`, `mixins`, `schemas`, and `classes`.
* `{RESOURCE_ID}`: The URL-encoded `$id` URI or `meta:altId` of the resource.

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/global/mixins/https%3A%2F%2Fns.adobe.com%2Fxdm%2Fcontext%2Fprofile-person-details \
  -H 'Accept: application/vnd.adobe.xed+json; version=1' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

Resource lookup requests require a `version` be included in the Accept header. The following Accept headers are available for lookups:

Accept | Description
-------|------------
application/vnd.adobe.xed+json; version={MAJOR_VERSION}	|Raw with `$ref` and `allOf`, has titles and descriptions.
application/vnd.adobe.xed-full+json; version={MAJOR_VERSION} |`$ref` and `allOf` resolved, has titles and descriptions.
application/vnd.adobe.xed-notext+json; version={MAJOR_VERSION}	|Raw with `$ref` and `allOf`, no titles or descriptions.
application/vnd.adobe.xed-full-notext+json; version={MAJOR_VERSION}	|`$ref` and `allOf` resolved, no titles or descriptions.
application/vnd.adobe.xed-full-desc+json; version={MAJOR_VERSION}	|`$ref` and `allOf` resolved, descriptors included.

> **Note:** If supplying the `major` version only (1, 2, 3, etc), the registry will return the latest `minor` version (.1, .2, .3, etc) automatically.

#### Response

A successful response returns the details of the resource. The fields that are returned depend on the Accept header sent in the request. Experiment with different Accept headers to compare the responses and determine which header is best for your use case. 

```JSON
{
    "$id": "https://ns.adobe.com/xdm/context/profile-person-details",
    "title": "Profile Person Details",
    "type": "object",
    "meta:extensible": true,
    "meta:abstract": true,
    "meta:intendedToExtend": [
        "https://ns.adobe.com/xdm/context/profile"
    ],
    "description": "Profile person details including naming, gender etc.",
    "definitions": {
        "profile-person-details": {
            "properties": {
                "person": {
                    "title": "Person",
                    "$ref": "https://ns.adobe.com/xdm/context/person",
                    "description": "An individual actor, contact, or owner.",
                    "meta:xdmField": "xdm:person"
                }
            }
        }
    },
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/xdm/common/extensible#/definitions/@context"
        },
        {
            "$ref": "#/definitions/profile-person-details"
        }
    ],
    "meta:xdmId": "https://ns.adobe.com/xdm/context/profile-person-details",
    "meta:altId": "_xdm.context.profile-person-details",
    "meta:xdmType": "object",
    "meta:status": "experimental",
    "version": "1",
    "$schema": "http://json-schema.org/draft-06/schema#",
    "meta:resourceType": "mixins",
    "meta:registryMetadata": {
        "repo:createDate": 1551745787442,
        "repo:lastModifiedDate": 1551745787442
    }
}
```

## Create a resource

The Schema Registry allows you to create new resources within the tenant container. These resources are unique to your IMS Organization, meaning they are not discoverable, editable, or usable by other organizations. 

### Create a class

The primary building block of a schema is a class. The class contains the minimum set of fields that must be defined in order to capture the core data of a schema. For example, if you were designing a schema for cars and trucks they would most likely use a class called Vehicle that described the basic common properties of all vehicles.

There are several standard classes provided by Adobe and other Experience Platform partners, but you may also define your own classes and save them to the Schema Registry. You can then compose a schema that implements the class you created, and define mixins that are compatible with your newly defined class.

> **Note:** When composing a schema based on a class that you define, you will not be able to use standard mixins. Each mixin defines the classes they are compatible with in their `meta:intendedToExtend` attribute. Once you begin defining mixins that are compatible with your new class (by using the `$id` of your new class in the `meta:intendedToExtend` field of the mixin), you will be able to reuse those mixins every time you define a schema that implements the class you defined. Details for creating schemas and mixins appear further on in this developer guide.

#### API format

```http
POST /tenant/classes
```

#### Request

The request to create (POST) a class must include an `allOf` attribute containing a `$ref` to one of two values: `https://ns.adobe.com/xdm/data/record` or `https://ns.adobe.com/xdm/data/time-series`. These values represent the behavior upon which the class is based (record or time-series, respectively). For more information on the differences between record data and time series data, see the section on behavior types within the [basics of schema composition](schema_composition/schema_composition.md).

When you define a class, you may also include mixins or custom fields within the class definition. This would cause the added mixins and fields to be included in all schemas that implement the class. The following example request defines a class called "Property", which captures information regarding different properties owned and operated by a company. It includes a `propertyId` field to be included each time the class is used.

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/classes \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "title":"Property",
        "description":"Properties owned and operated by the company.",
        "type":"object",
        "definitions": {
          "property": {
            "properties": {
              "_{TENANT_ID}": {
                "type": "object",
                "properties": {
                  "property": {
                    "title": "Property Information",
                    "type": "object",
                    "description": "Information about different owned and operated properties.",
                    "properties": {
                      "propertyId": {
                        "title": "Property Identification Number",
                        "type": "string",
                        "description": "Unique Property identification number"
                      }
                    }
                  }
                }
              }
            },
            "type": "object"
          }
        },
        "allOf": [
          {
            "$ref": "https://ns.adobe.com/xdm/data/record"
          },
          {
            "$ref": "#/definitions/property"
          }
        ]
      }'
```
* `_{TENANT_ID}`: The `TENANT_ID` namespace for your organization. All resources created by your organization must include this property to avoid collisions with other resources in the Schema Registry.
* `allOf`: A list of resources whose properties are to be inherited by the new class. One of the `$ref` objects within the array defines the behavior of the class. In this example, the class inherits "record" behavior.

#### Response

A successful response returns HTTP status 201 (Created) and a payload containing the details of the newly created class including the `$id`, `meta:altId`, and `version`. These three values are read-only and are assigned by the Schema Registry.

```JSON
{
    "title": "Property",
    "description": "Properties owned and operated by the company.",
    "type": "object",
    "definitions": {
        "property": {
            "properties": {
                "_{TENANT_ID}": {
                    "type": "object",
                    "properties": {
                        "property": {
                            "title": "Property Information",
                            "type": "object",
                            "description": "Information about different owned and operated properties.",
                            "properties": {
                                "propertyId": {
                                    "title": "Property Identification Number",
                                    "type": "string",
                                    "description": "Unique Property identification number",
                                    "meta:xdmType": "string"
                                }
                            },
                            "meta:xdmType": "object"
                        }
                    },
                    "meta:xdmType": "object"
                }
            },
            "type": "object",
            "meta:xdmType": "object"
        }
    },
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/xdm/data/record"
        },
        {
            "$ref": "#/definitions/property"
        }
    ],
    "meta:abstract": true,
    "meta:extensible": true,
    "meta:extends": [
        "https://ns.adobe.com/xdm/data/record"
    ],
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:altId": "_{TENANT_ID}.classes.19e1d8b5098a7a76e2c10a81cbc99590",
    "meta:xdmType": "object",
    "$id": "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590",
    "version": "1.0",
    "meta:resourceType": "classes",
    "meta:registryMetadata": {
        "repo:createDate": 1552086405448,
        "repo:lastModifiedDate": 1552086405448,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:repositoryCreatedBy": "{CREATED_BY}"
    }
}
```

Performing a GET request to list all classes in the tenant container would now include the Property class. You can also perform a lookup (GET) request using the URL-encoded `$id` URI to view the new class directly. Be sure to include the `version` in the Accept header when performing a lookup request.

### Create a data type

When there are common data structures that your organization wishes to use in multiple ways, you may wish to define a data type. Data types allow for the consistent use of multi-field structures, with more flexibility than mixins because they can be included anywhere in a schema by adding them as the `type` of a field. 

In other words, data types allow you to define an object hierarchy once, and refer to it in a field in the same manner as any other scalar type.

#### API format

```http
POST /tenant/datatypes
```

#### Request

Defining a data type does not require `meta:extends` or `meta:intendedToExtend` fields, nor do fields need to be nested to avoid collisions.

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/datatypes \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "title":"Property Construction",
        "description":"Information related to the property construction",
        "type":"object",
        "properties": {
          "yearBuilt": {
            "type":"integer",
            "title": "Year Built",
            "description": "The year the property was constructed."
          },
          "propertyType": {
            "type":"string",
            "title": "Property Type",
            "description": "Type of building or structure in which the property exists.",
            "enum": [
              "freeStanding",
              "mall",
              "shoppingCenter"
            ],
            "meta:enum": {
              "freeStanding": "Free Standing Building",
              "mall": "Mall Space",
              "shoppingCentre": "Shopping Center"
            }
          }
        } 
      }'
```

#### Response

A successful response returns HTTP status 201 (Created) and a payload containing the details of the newly created data type, including the `$id`, `meta:altId`, and `version`. These three values are read-only and are assigned by the Schema Registry.

```JSON
{
    "title": "Property Construction",
    "description": "Information related to the property construction",
    "type": "object",
    "properties": {
        "yearBuilt": {
            "type": "integer",
            "title": "Year Built",
            "description": "The year the property was constructed.",
            "meta:xdmType": "int"
        },
        "constructionType": {
            "type": "string",
            "title": "Construction Type",
            "description": "Type of building or structure in which the property exists.",
            "enum": [
                "freeStanding",
                "mall",
                "shoppingCenter"
            ],
            "meta:enum": {
                "freeStanding": "Free Standing Building",
                "mall": "Mall Space",
                "shoppingCentre": "Shopping Center"
            },
            "meta:xdmType": "string"
        }
    },
    "meta:abstract": true,
    "meta:extensible": true,
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:altId": "_{TENANT_ID}.datatypes.24c643f618647344606222c494bd0102",
    "meta:xdmType": "object",
    "$id": "https://ns.adobe.com/{TENANT_ID}/datatypes/24c643f618647344606222c494bd0102",
    "version": "1.0",
    "meta:resourceType": "datatypes",
    "meta:registryMetadata": {
        "repo:createDate": 1552087079285,
        "repo:lastModifiedDate": 1552087079285,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:repositoryCreatedBy": "{CREATED_BY}"
    }
}
```

Performing a GET request to list all data types in the tenant container would now include the Property Construction data type. You can also perform a lookup (GET) request using the URL-encoded `$id` URI to view the new data type directly. Be sure to include the `version` in your Accept header for a lookup request.

### Create a mixin

Mixins are a set of fields used to describe a particular concept, such as "address" or "profile preferences". There are numerous standard mixins available, or you can define your own when you wish to capture information that is unique to your organization. Each mixin contains a `meta:intendedToExtend` field which lists the classes the mixin is compatible with. 

You may find it helpful to review all available mixins to familiarize yourself with the fields included in each. You can list (GET) all mixins compatible with a particular class by performing a request against each of the "global" and "tenant" containers, returning only those mixins where the "meta:intendedToExtend" field matches the class you're using. The examples below will return all mixins that can be used with the XDM Individual Profile class: 

```http
GET /global/mixins?property=meta:intendedToExtend==https://ns.adobe.com/xdm/context/profile
GET /tenant/mixins?property=meta:intendedToExtend==https://ns.adobe.com/xdm/context/profile
```

The example API request below creates a new mixin in the tenant container.

#### API format

```http
POST /tenant/mixins
```

#### Request

When defining a new mixin, it must include a `meta:intendedToExtend` attribute, listing the `$id` of the classes with which the mixin is compatible. In this example, the mixin is compatible with the Property class you previously defined. Custom fields must be nested under `_{TENANT_ID}` (as shown in the example) to avoid any collisions with other mixins or fields from the class schemas. Notice that the `propertyConstruction` field is a reference to the data type created in the previous call.

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/mixins \
  -H 'Authorization: Bearer {ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "title":"Property Details",
        "description":"Detailed information related to the properties owned and operated by the company.",
        "type":"object",
        "meta:intendedToExtend":["https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590"],
        "definitions": {
          "property": {
            "properties": {
              "_{TENANT_ID}": {
            	"type":"object",
            	"properties": {
                  "propertyName": {
                    "type": "string",
                    "title": "Property Name",
                    "description": "Name of the property"
                  },
	                "propertyCity": {
                    "title": "Property City",
                    "description": "City where the property is located.",
                    "type": "string"
	                },
	                "phoneNumber": {
                    "title": "Phone Number",
                    "description": "Primary phone number for the property.",
                    "type": "string"
	                },
                  "propertyType": {
                    "type": "string",
                    "title": "Property Type",
                    "description": "Type and primary use of property.",
                    "enum": [
                        "retail",
                        "yoga",
                        "fitness"
                    ],
                    "meta:enum": {
                        "retail": "Retail Store",
                        "yoga": "Yoga Studio",
                        "fitness": "Fitness Center"
                    }
                  },
	                "propertyConstruction": {
	                  "$ref": "https://ns.adobe.com/{TENANT_ID}/datatypes/24c643f618647344606222c494bd0102"
	                }
                }
              }
            }
          }
        },
        "allOf": [
            {
                "$ref": "#/definitions/property"
            }
        ]
}'
```

#### Response

A successful response returns HTTP status 201 (Created) and a payload containing the details of the newly created mixin, including the `$id`, `meta:altId`, and `version`. These values are read-only and are assigned by the Schema Registry.

```JSON
{
    "title": "Property Details",
    "description": "Detailed information related to the properties owned and operated by the company.",
    "type": "object",
    "meta:intendedToExtend": [
        "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590"
    ],
    "definitions": {
        "property": {
            "properties": {
                "_{TENANT_ID}": {
                    "type": "object",
                    "properties": {
                        "propertyName": {
                            "type": "string",
                            "title": "Property Name",
                            "description": "Name of the property",
                            "meta:xdmType": "string"
                        },
                        "propertyCity": {
                            "title": "Property City",
                            "description": "City where the property is located.",
                            "type": "string",
                            "meta:xdmType": "string"
                        },
                        "phoneNumber": {
                            "title": "Phone Number",
                            "description": "Primary phone number for the property.",
                            "type": "string",
                            "meta:xdmType": "string"
                        },
                        "propertyType": {
                            "type": "string",
                            "title": "Property Type",
                            "description": "Type and primary use of property.",
                            "enum": [
                                "retail",
                                "yoga",
                                "fitness"
                            ],
                            "meta:enum": {
                                "retail": "Retail Store",
                                "yoga": "Yoga Studio",
                                "fitness": "Fitness Center"
                            },
                            "meta:xdmType": "string"
                        },
                        "propertyConstruction": {
                            "$ref": "https://ns.adobe.com/{TENANT_ID}/datatypes/24c643f618647344606222c494bd0102"
                        }
                    },
                    "meta:xdmType": "object"
                }
            },
            "type": "object",
            "meta:xdmType": "object"
        }
    },
    "allOf": [
        {
            "$ref": "#/definitions/property"
        }
    ],
    "meta:abstract": true,
    "meta:extensible": true,
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:altId": "_{TENANT_ID}.mixins.e49cbb2eec33618f686b8344b4597ecf",
    "meta:xdmType": "object",
    "$id": "https://ns.adobe.com/{TENANT_ID}/mixins/e49cbb2eec33618f686b8344b4597ecf",
    "version": "1.0",
    "meta:resourceType": "mixins",
    "meta:registryMetadata": {
        "repo:createDate": 1552088205144,
        "repo:lastModifiedDate": 1552088205144,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:repositoryCreatedBy": "{CREATED_BY}"
    }
}
```

Performing a GET request to list all mixins in the tenant container would now include the Vehicle Details mixin, or you can perform a lookup (GET) request using the URL-encoded `$id` URI to view the new mixin directly. Remember to include the `version` in the Accept header for all lookup requests.

### Create a schema

A schema can be thought of as the blueprint for the data you wish to ingest into Experience Platform. Each schema is composed of a class and zero or more mixins. In other words, you do not have to add a mixin in order to define a schema, but in most cases at least one mixin will be used. 

The schema composition process begins by assigning a class. The class defines key behavioral aspects of the data (record or time series), as well as the minimum fields that are required to describe the data that will be ingested.

#### API format

```http
POST /tenant/schemas
```

#### Request

The request must include an `allOf` attribute which references the `$id` of a class. This attribute defines the "base class" that the schema will implement. In this example, the base class is the Property class you created previously.

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas \
  -H 'Authorization: Bearer {ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "title":"Property Information",
        "description": "Property-related information.",
        "type": "object",
        "allOf": [ 
          { 
            "$ref": "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590" 
          } 
        ]
      }'
```
* `allOf > $ref`: The `$id` value of the class the new schema will implement.

#### Response

A successful response returns HTTP status 201 (Created) and a payload containing the details of the newly created schema, including the `$id`, `meta:altId`, and `version`. These values are read-only and are assigned by the Schema Registry.

```JSON
{
    "title": "Property Information",
    "description": "Property-related information.",
    "type": "object",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590"
        }
    ],
    "meta:class": "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590",
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:extends": [
        "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590",
        "https://ns.adobe.com/xdm/data/record"
    ],
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:altId": "_{TENANT_ID}.schemas.d5cc04eb8d50190001287e4c869ebe67",
    "meta:xdmType": "object",
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/d5cc04eb8d50190001287e4c869ebe67",
    "version": "1.0",
    "meta:resourceType": "schemas",
    "meta:registryMetadata": {
        "repo:createDate": 1552088461236,
        "repo:lastModifiedDate": 1552088461236,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:repositoryCreatedBy": "{CREATED_BY}"
    }
}
```

Performing a GET request to list all schemas in the tenant container would now include the Property Information schema, or you can perform a lookup (GET) request using the URL-encoded `$id` URI to view the new schema directly. Remember to include the `version` in the Accept header for all lookup requests.

## Update a resource

You can modify or update resources in the tenant container using a PATCH request. The Schema Registry supports all standard JSON Patch operations, including add, remove, and replace. 

For more information on JSON Patch, including available operations, see the official [JSON Patch documentation](http://jsonpatch.com/).

> **Note:** If you want to replace an entire resource with new values instead of updating individual fields, see the section on [replacing a resource using a PUT operation](#replace-a-resource).

#### API format

```http
PATCH /tenant/{RESOURCE_TYPE}/{RESOURCE_ID} 
```
* `{RESOURCE_TYPE}`: The type of resource to be updated from the Schema Library. Valid types are `datatypes`, `mixins`, `schemas`, and `classes`.
* `{RESOURCE_ID}`: The URL-encoded `$id` URI or `meta:altId` of the resource.

#### Request

Using a PATCH operation, you can update the Property Information schema to include the fields that were defined in the Property Details mixin. To do this, you must perform a PATCH request to the schema using its `meta:altId` or the URL-encoded `$id` URI. 

The request body includes the operation (`op`) that you wish to perform, where (`path`) you would like to perform the operation, and what information (`value`) you would like to include in the operation. In this example, the mixin `$id` is being added to both the `meta:extends` and `allOf` fields.

```SHELL
curl -X PATCH\
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas/_{TENANT_ID}.schemas.d5cc04eb8d50190001287e4c869ebe67 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'content-type: application/json' \
  -d '[
        { "op": "add", "path": "/meta:extends/-", "value":  "https://ns.adobe.com/{TENANT_ID}/mixins/e49cbb2eec33618f686b8344b4597ecf"},
        { "op": "add", "path": "/allOf/-", "value":  {"$ref": "https://ns.adobe.com/{TENANT_ID}/mixins/e49cbb2eec33618f686b8344b4597ecf"}}
      ]'
```

#### Response

The response shows that both operations were performed successfully. The mixin `$id` has been added to the `meta:extends` array and a reference (`$ref`) to the mixin `$id` now appears in the `allOf` array.

```JSON
{
    "title": "Property Information",
    "description": "Property-related information.",
    "type": "object",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590"
        },
        {
            "$ref": "https://ns.adobe.com/{TENANT_ID}/mixins/e49cbb2eec33618f686b8344b4597ecf"
        }
    ],
    "meta:class": "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590",
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:extends": [
        "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590",
        "https://ns.adobe.com/xdm/data/record",
        "https://ns.adobe.com/{TENANT_ID}/mixins/e49cbb2eec33618f686b8344b4597ecf"
    ],
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:altId": "_{TENANT_ID}.schemas.d5cc04eb8d50190001287e4c869ebe67",
    "meta:xdmType": "object",
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/d5cc04eb8d50190001287e4c869ebe67",
    "version": "1.1",
    "meta:resourceType": "schemas",
    "meta:registryMetadata": {
        "repo:createDate": 1552088461236,
        "repo:lastModifiedDate": 1552088649634,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:repositoryCreatedBy": "{CREATED_BY}"
    }
}
```

## Additional update (PATCH) example

The Property Details mixin defines fields for property-related information, but additional information is required. In order to update the mixin, a PATCH request can be made that contains multiple changes to be performed.

#### API format

```SHELL
PATCH /tenant/{RESOURCE_TYPE}/{RESOURCE_ID} 
```
* `{RESOURCE_TYPE}`: The type of resource to be updated from the Schema Library. Valid types are `datatypes`, `mixins`, `schemas`, and `classes`.
* `{RESOURCE_ID}`: The URL-encoded `$id` URI or `meta:altId` of the resource.

#### Request

The request body includes the operation (`op`), location (`path`), and information (`value`) needed to update the mixin. This request updates the Property Details mixin to remove the "propertyCity" field and add a new "propertyAddress" field that references a standard data type containing address information. It also adds a new "emailAddress" field that references a standard data type with email information.

```SHELL
curl -X PATCH \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/mixins/_{TENANT_ID}.mixins.e49cbb2eec33618f686b8344b4597ecf \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'content-type: application/json' \
  -d '[
          { "op": "remove", "path": "/definitions/vehicles/properties/_{TENANT_ID}/properties/propertyCity"},
          { "op": "add", "path": "/definitions/property/properties/_{TENANT_ID}/properties/propertyAddress", "value":
            {
              "title": "Property Address",
              "description": "Address of the Property",
              "$ref": "https://ns.adobe.com/xdm/common/address"
            } 
          },
          { "op": "add", "path": "/definitions/property/properties/_{TENANT_ID}/properties/emailAddress", "value":
            {
              "title": "Property Email Address",
              "description": "Email address of the Property",
              "$ref": "https://ns.adobe.com/xdm/context/emailaddress"
            } 
          },
      ]'
```

#### Response

A successful response shows that the operations were completed successfully because the new fields are present and the "propertyCity" field has been removed.

```JSON
{
    "title": "Property Details",
    "description": "Detailed information related to the properties owned and operated by the company.",
    "type": "object",
    "meta:intendedToExtend": [
        "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590"
    ],
    "definitions": {
        "property": {
            "properties": {
                "_{TENANT_ID}": {
                    "type": "object",
                    "properties": {
                        "propertyName": {
                            "type": "string",
                            "title": "Property Name",
                            "description": "Name of the property",
                            "meta:xdmType": "string"
                        },
                        "phoneNumber": {
                            "title": "Phone Number",
                            "description": "Primary phone number for the property.",
                            "type": "string",
                            "meta:xdmType": "string"
                        },
                        "propertyType": {
                            "type": "string",
                            "title": "Property Type",
                            "description": "Type and primary use of property.",
                            "enum": [
                                "retail",
                                "yoga",
                                "fitness"
                            ],
                            "meta:enum": {
                                "retail": "Retail Store",
                                "yoga": "Yoga Studio",
                                "fitness": "Fitness Center"
                            },
                            "meta:xdmType": "string"
                        },
                        "propertyConstruction": {
                            "$ref": "https://ns.adobe.com/{TENANT_ID}/datatypes/24c643f618647344606222c494bd0102"
                        },
                        "propertyAddress": {
                            "title": "Property Address",
                            "description": "Address of the Property",
                            "$ref": "https://ns.adobe.com/xdm/common/address"
                        },
                        "emailAddress": {
                            "title": "Property Email Address",
                            "description": "Email address of the Property",
                            "$ref": "https://ns.adobe.com/xdm/context/emailaddress"
                        }
                    },
                    "meta:xdmType": "object"
                }
            },
            "type": "object",
            "meta:xdmType": "object"
        }
    },
    "allOf": [
        {
            "$ref": "#/definitions/property"
        }
    ],
    "meta:abstract": true,
    "meta:extensible": true,
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:altId": "_{TENANT_ID}.mixins.e49cbb2eec33618f686b8344b4597ecf",
    "meta:xdmType": "object",
    "$id": "https://ns.adobe.com/{TENANT_ID}/mixins/e49cbb2eec33618f686b8344b4597ecf",
    "version": "1.1",
    "meta:resourceType": "mixins",
    "meta:registryMetadata": {
        "repo:createDate": 1552088205144,
        "repo:lastModifiedDate": 1552089776535,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:repositoryCreatedBy": "{CREATED_BY}"
    }
}
```

## Replace a resource

The Schema Registry allows you to replace an entire resource through a PUT operation. This operation essentially re-writes the resource, therefore the request body must include all of the fields that would be required when creating a new resource using a POST request.

This method is especially useful if you want to update a lot of information in the resource at once.

> **Note:** If you only want to update part of a resource instead of replacing it entirely, see the section on [updating a resource using a PATCH operation](#update-a-resource).


#### API format

A PUT request can only be performed against resources that you define in the tenant container.

```http
PUT /tenant/{RESOURCE_TYPE}/{RESOURCE_ID} 
```
* `{RESOURCE_TYPE}`: The type of resource to be updated from the Schema Library. Valid types are `datatypes`, `mixins`, `schemas`, and `classes`.
* `{RESOURCE_ID}`: The URL-encoded `$id` URI or `meta:altId` of the resource.

#### Request

This sample request replaces the Property Construction datatype that was created in a previous example. The request body looks similar to the POST request used to create the data type, except that it now contains an updated set of fields with new values replacing what was previously defined.

```SHELL
curl -X PUT \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/mixins/_{TENANT_ID}.datatypes.24c643f618647344606222c494bd0102 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "title":"Property Construction",
        "description":"Information related to the construction of the property.",
        "type":"object",
        "properties": {
          "dateOpened": {
            "type":"string",
            "format": "date",
            "title": "Date Opened",
            "description": "The date the property was first opened."
          },
          "propertyType": {
            "type":"string",
            "title": "Property Type",
            "description": "Type of building or structure in which the property exists.",
            "enum": [
              "standAlone",
              "highRise",
              "stripMall"
            ],
            "meta:enum": {
              "standAlone": "Stand-Alone Building",
              "highRise": "High Rise Building",
              "stripMall": "Strip Mall"
            }
          },
          "constructionCompany": {
          	"type": "string",
          	"title": "Construction Company",
          	"description": "Name of the construction company that completed the construction of the property."
          },
          "totalSquareFootage": {
          	"type": "integer",
          	"title": "Total Square Footage",
          	"description": "Total square footage of the property."
          }
        } 
      }'
```

#### Response

A successful response returns the details of the data type, showing the updated fields and values as provided in the request.

```JSON
{
    "title": "Property Construction",
    "description": "Information related to the construction of the property.",
    "type": "object",
    "properties": {
        "dateOpened": {
            "type": "string",
            "format": "date",
            "title": "Date Opened",
            "description": "The date the property was first opened.",
            "meta:xdmType": "date"
        },
        "propertyType": {
            "type": "string",
            "title": "Property Type",
            "description": "Type of building or structure in which the property exists.",
            "enum": [
                "standAlone",
                "highRise",
                "stripMall"
            ],
            "meta:enum": {
                "standAlone": "Stand-Alone Building",
                "highRise": "High Rise Building",
                "stripMall": "Strip Mall"
            },
            "meta:xdmType": "string"
        },
        "constructionCompany": {
            "type": "string",
            "title": "Construction Company",
            "description": "Name of the construction company that completed the construction of the property.",
            "meta:xdmType": "string"
        },
        "totalSquareFootage": {
            "type": "integer",
            "title": "Total Square Footage",
            "description": "Total square footage of the property.",
            "meta:xdmType": "int"
        }
    },
    "meta:abstract": true,
    "meta:extensible": true,
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:altId": "_{TENANT_ID}.datatypes.24c643f618647344606222c494bd0102",
    "meta:xdmType": "object",
    "$id": "https://ns.adobe.com/{TENANT_ID}/datatypes/24c643f618647344606222c494bd0102",
    "version": "1.2",
    "meta:resourceType": "datatypes",
    "meta:registryMetadata": {
        "repo:createDate": 1552087079285,
        "repo:lastModifiedDate": 1552090569013,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:repositoryCreatedBy": "{CREATED_BY}"
    }
}
```

## Delete a resource

It may occasionally be necessary to remove (DELETE) a resource from the registry. Only resources that you create in the tenant container may be deleted. This is done by performing a DELETE request using the `$id` of the resource you wish to delete.

#### API format

```http
DELETE /tenant/{RESOURCE_TYPE}/{RESOURCE_ID} 
```
* `{RESOURCE_TYPE}`: The type of resource to be updated from the Schema Library. Valid types are `datatypes`, `mixins`, `schemas`, and `classes`.
* `{RESOURCE_ID}`: The URL-encoded `$id` URI or `meta:altId` of the resource.

#### Request 

DELETE requests do not require Accept headers.

```SHELL
curl -X DELETE \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/mixins/https%3A%2F%2Fns.adobe.com%2F{TENANT_ID}%2Fmixins%2F4fbd5368aa67f0e74d5838f67694c867 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns HTTP status 204 (No Content) and a blank body. 

You can confirm the deletion by attempting a lookup (GET) request to the resource. You will need to include an Accept header in the request, but should receive an HTTP status 404 (Not Found) because the resource has been removed from the Schema Registry.

## Descriptors

Schemas define a static view of data entities, but do not provide specific details on how data based on these schemas (datasets, for example) may relate to one another. Adobe Experience Platform allows you to describe these relationships and other interpretive metadata about a schema using descriptors. 

Schema descriptors are tenant-level metadata, meaning they are unique to your IMS Organization and all descriptor operations take place in the tenant container. 

Each schema can have one or more schema descriptor entities applied to it. Each schema descriptor entity includes a descriptor `@type` and the `sourceSchema` to which it applies. Once applied, these descriptors will apply to all datasets created using the schema.

Sample descriptor calls are shown below. For a complete list of available descriptors and the fields required for defining each type, see the appendix section on [defining descriptors in the API](#defining-descriptors-in-the-api).

> **Note:** Descriptors require unique Accept headers that replace `xed` with `xdm`, but otherwise look very similar to Accept headers used elsewhere in the Schema Registry. The proper Accept headers have been included in the sample calls below, but take extra caution to ensure the correct headers are being used.

### List descriptors

A single GET request can be used to return a list of all descriptors that have been defined by your organization.

#### API format

```http
GET /tenant/descriptors
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'Accept: application/vnd.adobe.xdm-link+json'
```

The response format depends on the Accept header sent in the request. Notice that the `/descriptors` endpoint uses Accept headers that are different than all other endpoints. 

Descriptor Accept headers replace `xed` with `xdm`, and offer a `link` option that is unique to descriptors.

Accept | Description
-------|------------
application/vnd.adobe.xdm-id+json | Returns an array of descriptor IDs
application/vnd.adobe.xdm-link+json | Returns an array of descriptor API paths
application/vnd.adobe.xdm+json | Returns an array of expanded descriptor objects

#### Response

The response includes an array for each descriptor type that has defined descriptors. In other words, if there are no descriptors of a certain `@type` defined, the registry will not return an empty array for that descriptor type. 

When using the `link` Accept header, each descriptor is shown as an array item in the format `/{CONTAINER}/descriptors/{DESCRIPTOR_ID}`

```JSON
{
  "xdm:alternateDisplayInfo": [
    "/tenant/descriptors/85dc1bc8b91516ac41163365318e38a9f1e4f351",
    "/tenant/descriptors/49bd5abb5a1310ee80ebc1848eb508d383a462cf",
    "/tenant/descriptors/b3b3e548f1c653326bcf5459ceac4140fc0b9e08"
  ],
  "xdm:descriptorIdentity": [
    "/tenant/descriptors/f7a4bc25429496c4740f8f9a7a49ba96862c5379"
  ]
}
```

<!-- Relationship descriptor to be added later:
 "xdm:descriptorOneToOne": [
    "/tenant/descriptors/cb509fd6f8ab6304e346905441a34b58a0cd481a"
  ] -->

### Lookup descriptor

If you wish to view the details of a specific descriptor, you can lookup (GET) an individual descriptor using its `@id`.

#### API format

```http
GET /tenant/descriptors/{DESCRIPTOR_ID}
```
* `{DESCRIPTOR_ID}`: The `@id` of the descriptor you want to lookup.

#### Request

Descriptors are not versioned, therefore no Accept header is required in the lookup request.

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors/f3a1dfa38a4871cf4442a33074c1f9406a593407 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the details of the descriptor, including its `@type` and `sourceSchema`, as well as additional information that varies depending on the type of descriptor. The returned `@id` should match the descriptor `@id` provided in the request.

```JSON
{
  "@type": "xdm:descriptorIdentity",
  "xdm:sourceSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/fbc52b243d04b5d4f41eaa72a8ba58be",
  "xdm:sourceVersion": 1,
  "xdm:sourceProperty": "/personalEmail/address",
  "xdm:namespace": "Email",
  "xdm:property": "xdm:code",
  "xdm:isPrimary": false,
  "createdUser": "{CREATED_USER}",
  "imsOrg": "{IMS_ORG}",
  "createdClient": "{CREATED_CLIENT}",
  "updatedUser": "{UPDATED_USER}",
  "created": 1548899346989,
  "updated": 1548899346989,
  "meta:containerId": "tenant",
  "@id": "f3a1dfa38a4871cf4442a33074c1f9406a593407"
}
```

### Create descriptor

The Schema Registry allows you to define several different descriptor types. Each descriptor type requires its own specific fields be sent in the POST request. A complete list of descriptors, and the fields necessary to define them, is available in the appendix section on [defining descriptors in the API](#defining-descriptors-in-the-api).

#### API format

```http
POST /tenant/descriptors
```

#### Request

The following request defines an identity descriptor on an "email address" field in a sample schema. This tells Experience Platform to use the email address as an identifier to help stitch together information about the individual.

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '
      {
        "@type": "xdm:descriptorIdentity",
        "xdm:sourceSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/fbc52b243d04b5d4f41eaa72a8ba58be",
        "xdm:sourceVersion": 1,
        "xdm:sourceProperty": "/personalEmail/address",
        "xdm:namespace": "Email",
        "xdm:property": "xdm:code",
        "xdm:isPrimary": false
      }'
```

> **Note:** For details regarding the fields required to define a descriptor, see the [Defining descriptors in the API](#defining-descriptors-in-the-api) table in the appendix.

#### Response

A successful response returns HTTP status 201 (Created) and the details of the newly created descriptor, including its `@id`. The `@id` is a read-only field assigned by the Schema Registry and used for referencing the descriptor in the API.

```JSON
{
  "@type": "xdm:descriptorIdentity",
  "xdm:sourceSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/fbc52b243d04b5d4f41eaa72a8ba58be",
  "xdm:sourceVersion": 1,
  "xdm:sourceProperty": "/personalEmail/address",
  "xdm:namespace": "Email",
  "xdm:property": "xdm:code",
  "xdm:isPrimary": false,
  "meta:containerId": "tenant",
  "@id": "f3a1dfa38a4871cf4442a33074c1f9406a593407"
}
```

### Update descriptor

You can update a descriptor by making a PUT request to the registry referencing the `@id` of the descriptor you wish to update.

#### API format

```http
PUT /tenant/descriptors/{DESCRIPTOR_ID}
```
* `{DESCRIPTOR_ID}`: The `@id` of the descriptor you want to update.

#### Request

This request essentially _re-writes_ the descriptor, so the request body must include all fields required for defining a descriptor of that type. In other words, the request payload to update (PUT) a descriptor is the same as the payload to create (POST) a descriptor of the same type.

In this example, the identity descriptor is being updated to reference a different `xdm:sourceProperty` ("mobile phone") and change the `xdm:namespace` to "Phone".

```SHELL
curl -X PUT \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors/f3a1dfa38a4871cf4442a33074c1f9406a593407 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "@type": "xdm:descriptorIdentity",
        "xdm:sourceSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/fbc52b243d04b5d4f41eaa72a8ba58be",
        "xdm:sourceVersion": 1,
        "xdm:sourceProperty": "/mobilePhone/number",
        "xdm:namespace": "Phone",
        "xdm:property": "xdm:code",
        "xdm:isPrimary": false
      }'
```

Details regarding the properties `xdm:namespace` and `xdm:property`, including how to access them, are available in the appendix section on [defining descriptors in the API](#defining-descriptors-in-the-api).

#### Response

A successful response returns HTTP status 201 (Created) and the `@id` of the updated descriptor (which should match the `@id` sent in the request).

```JSON
{
    "@id": "f3a1dfa38a4871cf4442a33074c1f9406a593407"
}
```

Performing a lookup (GET) request to view the descriptor will show that the fields have now been updated to reflect the changes sent in the PUT request.

### Delete descriptor

Occasionally you may need to remove a descriptor that you have defined from the Schema Registry. This is done by making a DELETE request referencing the `@id` of the descriptor you wish to remove.

#### API format

```http
DELETE /tenant/descriptors/{DESCRIPTOR_ID}
```
* `{DESCRIPTOR_ID}`: The `@id` of the descriptor you want to delete.

#### Request

Accept headers are not required when deleting descriptors.

```SHELL
curl -X DELETE \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors/ca921946fb5281cbdb8ba5e07087486ce531a1f2  \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns HTTP status 204 (No Content) and a blank body.

To confirm the descriptor has been deleted, you can perform a lookup request against the descriptor `@id`. The response returns HTTP status 404 (Not Found) because the descriptor has been removed from the Schema Registry.

## Real-time Customer Profile

Real-time Customer Profile provides a holistic view of an individual by building a robust, 360&deg; profile of attributes as well as a timestamped account of every event that individual has had across any system your organization has integrated with Experience Platform. 

For more information on how these profiles are used across Platform, see the [Real-time Customer Profile overview](../unified_profile_architectural_overview/unified_profile_architectural_overview.md).

By enabling a schema for use with Profile, you are indicating that the data the schema defines should be included in the union view for the class that the schema implements.

### Union view

Union views are system-generated, read-only schemas that aggregate the fields of all Profile-enabled schemas which share the same class (XDM ExperienceEvent or XDM Individual Profile). See the section on unions in the [basics of schema composition](schema_composition/schema_composition.md#union) for more information.

The Schema Registry automatically includes three mixins within the union schema: `identityMap`, `timeSeriesEvents`, and `segmentMembership`.

**Identity map**

A union schema's `identityMap` is a representation of the known identities within the union's associated record schemas. The identity map separates identities into different arrays keyed by namespace. Each listed identity is itself an object containing a unique `id` value.

See the [Identity Service documentation](../identity_services_architectural_overview/identity_services_architectural_overview.md) for more information.

**Time-series events**

The `timeSeriesEvents` array is a list of time-series events that relate to the record schemas that are associated with the union. When Profile data is exported to datasets, this array is included for each record. This is useful for various use-cases, such as machine learning where models need a profile's entire behavior history in addition to its record attributes.

**Segment membership map**

The `segmentMembership` map stores the results of segment evaluations. When segment jobs are successfully run using the [Segment Jobs API](../../../../../../acpdr/swagger-specs/profile-segment-jobs-api.yaml), the map is updated. `segmentMembership` also stores any pre-evaluated audience segments that are ingested into Platform, allowing for integration with other solutions like Adobe Audience Manager.

See the tutorial on [creating segments using APIs](../../tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md) for more information.

### Enable "union" tag

In order for a schema to be included in the merged union view, the "union" tag must be added to the `meta:immutableTags` attribute of the schema. This is done through a PATCH request to update the schema and add the `meta:immutableTags` array with a value of "union".

> **Note:** Immutable tags are tags that are intended to be set, but never removed.

#### API format

```http
PATCH /tenant/schemas/{SCHEMA_ID}
```
* `{SCHEMA_ID}`: The URL-encoded `$id` URI or `meta:altId` of the schema you want to enable for use in Profile.

#### Request

```SHELL
curl -X PATCH \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas/_{TENANT_ID}.schemas.d5cc04eb8d50190001287e4c869ebe67 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '[
        { "op": "add", "path": "/meta:immutableTags", "value": ["union"]}
      ]'
```

#### Response

A successful response returns the details of the updated schema, which now includes a `meta:immutableTags` array containing the string value, "union".

```JSON
{
    "title": "Property Information",
    "description": "Property-related information.",
    "type": "object",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590"
        },
        {
            "$ref": "https://ns.adobe.com/{TENANT_ID}/mixins/e49cbb2eec33618f686b8344b4597ecf"
        }
    ],
    "meta:class": "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590",
    "meta:abstract": false,
    "meta:extensible": false,
    "meta:extends": [
        "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590",
        "https://ns.adobe.com/xdm/data/record",
        "https://ns.adobe.com/{TENANT_ID}/mixins/e49cbb2eec33618f686b8344b4597ecf"
    ],
    "meta:containerId": "tenant",
    "imsOrg": "{IMS_ORG}",
    "meta:immutableTags": [
        "union"
    ],
    "meta:altId": "_{TENANT_ID}.schemas.d5cc04eb8d50190001287e4c869ebe67",
    "meta:xdmType": "object",
    "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/d5cc04eb8d50190001287e4c869ebe67",
    "version": "1.2",
    "meta:resourceType": "schemas",
    "meta:registryMetadata": {
        "repo:createDate": 1552088461236,
        "repo:lastModifiedDate": 1552091263267,
        "xdm:createdClientId": "{CREATED_CLIENT}",
        "xdm:repositoryCreatedBy": "{CREATED_BY}"
    }
}
```

### List unions

When you set the "union" tag on a schema, the Schema Registry automatically creates and maintains a union for the class upon which the schema is based. The `$id` for the union is similar to the standard `$id` of a class, with the only difference being that is appended by two underscores and the word "union" (`"__union"`).

To view a list of available unions, you can perform a GET request to the `/unions` endpoint.

#### API format

```http
GET /tenant/unions
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/unions \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'Accept: application/vnd.adobe.xed-id+json'
```

#### Response

A successful response returns HTTP status 200 (OK) and a `results` array in the response body. If unions have been defined, the `title`, `$id`, `meta:altId`, and `version` for each union are provided as objects within the array. If no unions have been defined, HTTP status 200 (OK) is still returned but the `results` array will be empty.

```JSON
{
    "results": [
        {
            "title": "XDM Individual Profile",
            "$id": "https://ns.adobe.com/xdm/context/profile__union",
            "meta:altId": "_xdm.context.profile__union",
            "version": "1"
        },
        {
            "title": "Property",
            "$id": "https://ns.adobe.com/{TENANT_ID}/classes/19e1d8b5098a7a76e2c10a81cbc99590__union",
            "meta:altId": "_{TENANT_ID}.classes.19e1d8b5098a7a76e2c10a81cbc99590__union",
            "version": "1"
        }
    ]
}
```

### Lookup specific union

You can view a specific union by performing a GET request that includes the `$id` and, depending on the Accept header, some or all of the details of the union.

> **Note:** Union lookups are available using the `/unions` and `/schemas` endpoint to enable them for use in Profile exports into a dataset. 

#### API format

```http
GET /tenant/unions/{UNION_ID}
GET /tenant/schemas/{UNION_ID}
```
* `{UNION_ID}`: The URL-encoded `$id` URI of the union you want to lookup. URIs for union schemas are appended with "__union".

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/unions/https%3A%2F%2Fns.adobe.com%2Fxdm%2Fcontext%2Fprofile__union \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'Accept: application/vnd.adobe.xed+json; version=1'
```

Union lookup requests require a `version` be included in the Accept header. 

The following Accept headers are available for union schema lookups:

Accept | Description
-------|------------
application/vnd.adobe.xed+json; version={MAJOR_VERSION}|Raw with `$ref` and `allOf`. Includes titles and descriptions.
application/vnd.adobe.xed-full+json; version={MAJOR_VERSION}|`$ref` attributes and `allOf` resolved. Includes titles and descriptions.

#### Response

A successful response returns the union view of all schemas that implement the class whose `$id` was provided in the request path.

The response format depends on the Accept header sent in the request. Experiment with different Accept headers to compare the responses and determine which header is best for your use case. 

```JSON
{
    "type": "object",
    "description": "Union view of all schemas that extend https://ns.adobe.com/xdm/context/profile",
    "allOf": [
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile-person-details"
        },
        {
            "$ref": "https://ns.adobe.com/{TENANT_ID}/mixins/477bb01d7125b015b4feba7bccc2e599"
        },
        {
            "$ref": "https://ns.adobe.com/xdm/context/profile-personal-details"
        }
    ],
    "meta:extends": [
        "https://ns.adobe.com/xdm/context/profile",
        "https://ns.adobe.com/xdm/data/record",
        "https://ns.adobe.com/xdm/context/identitymap",
        "https://ns.adobe.com/xdm/common/extensible",
        "https://ns.adobe.com/xdm/common/auditable",
        "https://ns.adobe.com/xdm/context/profile-person-details",
        "https://ns.adobe.com/{TENANT_ID}/mixins/477bb01d7125b015b4feba7bccc2e599",
        "https://ns.adobe.com/xdm/context/profile-personal-details"
    ],
    "title": "Union object for https://ns.adobe.com/xdm/context/profile",
    "$id": "https://ns.adobe.com/xdm/context/profile__union",
    "meta:containerId": "tenant",
    "meta:class": "https://ns.adobe.com/xdm/context/profile",
    "meta:altId": "_xdm.context.profile__union",
    "version": "1.0",
    "meta:resourceType": "unions",
    "meta:registryMetadata": {}
}
```

### List schemas in a union

In order to see which schemas are part of a specific union, you can perform a GET request using query parameters to filter the schemas within the tenant container. 

Using the `property` query parameter, you can configure the response to only return schemas containing a `meta:immutableTags` field and a `meta:class` equal to the class whose union you are accessing.

#### API Format

```http
GET /tenant/schemas?property=meta:immutableTags==union&property=meta:class=={CLASS_ID}
```
* `{CLASS_ID}`: The `$id` of the class whose union you want to access.

#### Request

The following request looks up all schemas that are part of the XDM Individual Profile class union.

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas?property=meta:immutableTags==union&property=meta:class==https://ns.adobe.com/xdm/context/profile' \
  -H 'Accept: application/vnd.adobe.xed-id+json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a filtered list of schemas, containing only those that satisfy both requirements. Remember that when using multiple query parameters, an AND relationship is assumed. The format of the response depends on the Accept header sent in the request.

```JSON
{
    "results": [
        {
            "title": "Schema 1",
            "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/142afb78d8b368a5ba97a6cc8fc7e033",
            "meta:altId": "_{TENANT_ID}.schemas.142afb78d8b368a5ba97a6cc8fc7e033",
            "version": "1.2"
        },
        {
            "title": "Schema 2",
            "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/e7297a6ddfc7812ab3a7b504a1ab98da",
            "meta:altId": "_{TENANT_ID}.schemas.e7297a6ddfc7812ab3a7b504a1ab98da",
            "version": "1.5"
        },
        {
            "title": "Schema 3",
            "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/50f960bb810e99a21737254866a477bf",
            "meta:altId": "_{TENANT_ID}.schemas.50f960bb810e99a21737254866a477bf",
            "version": "1.2"
        },
        {
            "title": "Schema 4",
            "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/a39655ca8ea3d5c1f36a463b45fccca8",
            "meta:altId": "_{TENANT_ID}.schemas.a39655ca8ea3d5c1f36a463b45fccca8",
            "version": "1.1"
        },
        {
            "title": "Schema 5",
            "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/c063fac45c6d6285ef33b0e2af09f633",
            "meta:altId": "_{TENANT_ID}.schemas.c063fac45c6d6285ef33b0e2af09f633",
            "version": "1.2"
        },
        {
            "title": "Schema 6",
            "$id": "https://ns.adobe.com/{TENANT_ID}/schemas/dfebb19b93827b70bbad006137812537",
            "meta:altId": "_{TENANT_ID}.schemas.dfebb19b93827b70bbad006137812537",
            "version": "1.7"
        }
    ],
    "_links": {
        "global_schemas": {
            "href": "https://platform.adobe.io/data/foundation/schemaregistry/global/schemas?property=meta:immutableTags==union&property=meta:class==https://ns.adobe.com/xdm/context/profile"
        }
    }
}
```

## Next steps

Now that you have learned how to make calls using the Schema Registry API, follow the [Schema Registry API tutorial](../../tutorials/schema_registry_api_tutorial/schema_registry_api_tutorial.md) to begin composing a schema of your own.

## Appendix

The following sections provide supplemental information related to the Schema Registry API:

* [Understanding Compatibility Mode](#compatibility-mode)
* [How to Define XDM Field Types in the API](#defining-xdm-field-types-in-the-api)
* [Mapping XDM Types to other Serialization Formats, such as Parquet and Scala](#mapping-xdm-types-to-other-formats)
* [Defining descriptors in the API](#defining-descriptors-in-the-api)
* [Ad-hoc schema workflow](#ad-hoc-schema-workflow)

### Compatibility Mode

Experience Data Model (XDM) is a publicly documented specification, driven by Adobe to improve the interoperability, expressiveness, and power of digital experiences. Adobe maintains the source code and formal XDM definitions in an [open source project on GitHub](https://github.com/adobe/xdm/). These definitions are written in XDM Standard Notation, using JSON-LD (JavaScript Object Notation for Linked Data) and JSON Schema as the grammar for defining XDM schemas.

When looking at formal XDM definitions in the public repository, you can see that standard XDM differs from what you see in Adobe Experience Platform. What you are seeing in Experience Platform is called Compatibility Mode, and it provides a simple mapping between standard XDM and the way it is used within Platform.

#### How Compatibility Mode works

Compatibility Mode allows the XDM JSON-LD model to work with existing data infrastructure by altering values within standard XDM while keeping the semantics the same. It uses a nested JSON structure, displaying schemas in a tree-like format.

The main difference you will notice between standard XDM and Compatibility Mode is the removal of the "xdm:" prefix for field names. 

The following is a side-by-side comparison showing birthday-related fields (with "description" attributes removed) in both standard XDM and Compatibility Mode. Notice that the Compatibility Mode fields include a reference to the XDM field and its data type in the "meta:xdmField" and "meta:xdmType" attributes.

<table>
<th>Standard XDM</th>
<th>Compatibility Mode</th>
<tr>
<td>
<pre class="JSON language-JSON hljs">
{
  "xdm:birthDate": {
      "title": "Birth Date",
      "type": "string",
      "format": "date",
  },
  "xdm:birthDayAndMonth": {
      "title": "Birth Date",
      "type": "string",
      "pattern": "[0-1][0-9]-[0-9][0-9]",
  },
  "xdm:birthYear": {
      "title": "Birth year",
      "type": "integer",
      "minimum": 1,
      "maximum": 32767
}
</pre>
</td>
<td>
<pre class="JSON language-JSON hljs">
{
  "birthDate": {
      "title": "Birth Date",
      "type": "string",
      "format": "date",
      "meta:xdmField": "xdm:birthDate",
      "meta:xdmType": "date"
  },
  "birthDayAndMonth": {
      "title": "Birth Date",
      "type": "string",
      "pattern": "[0-1][0-9]-[0-9][0-9]",
      "meta:xdmField": "xdm:birthDayAndMonth",
      "meta:xdmType": "string"
  },
  "birthYear": {
      "title": "Birth year",
      "type": "integer",
      "minimum": 1,
      "maximum": 32767,
      "meta:xdmField": "xdm:birthYear",
      "meta:xdmType": "short"
}
</pre>
</td>
</tr>
</table>

#### Why do we need Compatibility Mode?

Adobe Experience Platform is designed to work with multiple solutions and services, each with their own technical challenges and limitations (for example, how certain technologies handle special characters). In order to overcome these limitations, Compatibility Mode was developed.

Most Experience Platform services including Catalog, Data Lake, and Real-time Customer Profile use Compatibility Mode in lieu of standard XDM. The Schema Registry API also uses Compatibility Mode, and the examples in this document are all shown using Compatibility Mode.

It is worthwhile to know that a mapping takes place between standard XDM and the way it is operationalized in Experience Platform, but it should not affect your use of Platform services.

The open source project is available to you, but when it comes to interacting with resources through the Schema Registry, the API examples in this document provide the best practices you should know and follow.

### Defining XDM field types in the API

XDM schemas are defined using JSON Schema standards and basic field types, with additional constraints for field names which are enforced by Experience Platform. XDM allows you to define additional field types through the use of formats and optional constraints. The XDM field types are exposed by the field-level attribute, `meta:xdmType`.

> **Note:** `meta:xdmType` is a system-generated value, and therefore you are not required to add this property to the JSON for your field. Best practice is to use JSON Schema types (such as string and integer) with the appropriate min/max constraints as defined in the table below.

The following table outlines the appropriate formatting to define scalar field types and more specific field types using optional properties. More information regarding optional properties and type-specific keywords is available through the [JSON Schema documentation](https://json-schema.org/understanding-json-schema/reference/type.html).

To begin, find the desired field type and use the sample code provided to build your API request.

<table>
<tr>
<th width="200px">Desired Type<br/>(meta:xdmType)</th>
<th width="250px">JSON<br/>(JSON Schema)</th>
<th width="400px">Code Sample</th>
</tr>

<tr>
<td>string</td>
<td><br/>type: string<br/><br/>
<strong>Optional properties:</strong><br/>
<ul>
<li>pattern</li>
<li>minLength</li>
<li>maxLength</li>
</ul>
</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "string",
    "pattern": "^[A-Z]{2}$",
    "maxLength": 2
}
</pre>
</tr>

<tr>
<td>uri<br/>
(xdmType:string)</td>
<td>type: string<br/>format: uri</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "string",
    "format": "uri"
}
</pre>
</tr>

<tr>
<td>enum<br/>
(xdmType: string)</td>
<td>type: string<br/><br/>
<strong>Optional property:</strong><br/>
<ul>
<li>default</li>
</ul>
</td>
<td>Specify customer-facing option labels using "meta:enum":
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "string",
    "enum": [
        "value1",
        "value2",
        "value3"
    ],
    "meta:enum": {
        "value1": "Value 1",
        "value2": "Value 2",
        "value3": "Value 3"
    },
    "default": "value1"
}
</pre>
</tr>

<tr>
<td>number</td>
<td>type: number<br/>
minimum: ±2.23×10^308<br/>
maximum: ±1.80×10^308

</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "number"
}
</pre>
</tr>

<tr>
<td>long</td>
<td>type: integer<br/>
maximum:2^53+1<br>minimum:-2^53+1</td>

<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "integer",
    "minimum": -9007199254740992,
    "maximum": 9007199254740992
}
</pre>
</tr>

<tr>
<td>int</td>
<td>type: integer<br/>maximum:2^31<br>minimum:-2^31</td>

<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "integer",
    "minimum": -2147483648,
    "maximum": 2147483648
}
</pre>
</tr>

<tr>
<td>short</td>
<td>type: integer<br/>maximum:2^15<br>minimum:-2^15</td>

<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "integer",
    "minimum": -32768,
    "maximum": 32768
}
</pre>
</tr>
<tr>
<td>byte</td>
<td>type: integer<br/>maximum:2^7<br>minimum:-2^7</td>

<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "integer",
    "minimum": -128,
    "maximum": 128
}
</pre>
</tr>

<tr>
<td>boolean</td>
<td><br/>type: boolean<br/>{true, false}<br/><br/>
<strong>Optional property:</strong><br/>
<ul>
<li>default</li>
</ul>
</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "boolean",
    "default": false
}
</pre>
</tr>

<tr>
<td>date</td>
<td>type: string<br/>format: date</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "string",
    "format": "date",
    "examples": [
        "2004-10-23"
    ],
}
</pre>
Date as defined by <a href="https://tools.ietf.org/html/rfc3339#section-5.6" target="_blank">RFC 3339, section 5.6</a>, where "full-date" = date-fullyear "-" date-month "-" date-mday (YYYY-MM-DD)
</td>
</tr>

<tr>
<td>date-time</td>
<td>type: string<br/>format: date-time</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "string",
    "format": "date-time",
    "examples": [
      "2004-10-23T12:00:00-06:00"
    ],
}
</pre>
Date-Time as defined by <a href="https://tools.ietf.org/html/rfc3339#section-5.6" target="_blank">RFC 3339, section 5.6</a>, where "date-time" = full-date "T" full-time:<br/>
(YYYY-MM-DD'T'HH:MM:SS.SSSSX)
</tr>

<tr>
<td>array</td>
<td>type: array</td>
<td>items.type can be defined using any scalar type:
<pre class="JSON language-JSON hljs">
"sampleField": {
  "type": "array",
  "items": {
    "type": "string"
  }
}
</pre>
Array of objects defined by another schema:<br/>
<pre class="JSON language-JSON hljs">
"sampleField": {
  "type": "array",
  "items": {
    "$ref": "id"
  }
}
</pre>
Where "id" is the {id} of the reference schema.
</td>

<tr>
<td>object</td>
<td>type: object</td>
<td>properties.{field}.type can be defined using any scalar type:
<pre class="JSON language-JSON hljs">
"sampleField": {
  "type": "object",
  "properties": {
    "field1": {
      "type": "string"
    },
    "field2": {
      "type": "number"
    }
  }
}
</pre>
Field of type "object" that is defined by a reference schema:
<pre class="JSON language-JSON hljs">
"sampleField": {
  "type": "object",
  "$ref": "id"
}
</pre>
Where "id" is the {id} of the reference schema.
</td>
</tr>

<tr>
<td>map</td>
<td>type: object<br/><br/>
<strong>Note:</strong><br/>
Use of the 'map' data type is reserved for industry and vendor schema usage and is not available for use in tenant defined fields. It is used in standard schemas when data is represented as keys that map to some value, or where keys cannot reasonably be included in a static schema and must be treated as data values.
</td>
<td>A 'map' MUST NOT define any properties. It MUST define a single "additionalProperties" schema to describe the type of values contained in the 'map'. A 'map' in XDM can contain only a single data type. Values may be any valid XDM schema definition, including an array or an object, or as a reference to another schema (via $ref). <br/><br/>

Map field with values of type 'string':
<pre class="JSON language-JSON hljs">
"sampleField": {
  "type": "object",
  "additionalProperties":{
    "type": "string"
  }
}
</pre>
Map field with values being an array of strings:
<pre class="JSON language-JSON hljs">
"sampleField": {
  "type": "object",
  "additionalProperties":{
    "type": "array",
    "items": {
      "type": "string"
    }
  }
}
</pre>
Map field that references another schema:
<pre class="JSON language-JSON hljs">
"sampleField": {
  "type": "object",
  "additionalProperties":{
    "$ref": "id"
  }
}
</pre>
Where "id" is the {id} of the reference schema.
</td>
</tr>
</table>

### Mapping XDM types to other formats

The table below describes the mapping between "meta:xdmType" and other serialization formats.

|XDM Type<br>(meta:xdmType)|JSON<br>(JSON Schema)|Parquet<br>(type/annotation)|Spark SQL|Java|Scala|.NET|CosmosDB|MongoDB|Aerospike|Protobuf 2
|---|---|---|---|---|---|---|---|---|---|---|
|string|type:string|BYTE_ARRAY/UTF8|StringType|java.lang.String|String|System.String|String|string|String|string
|number|type:number|DOUBLE|DoubleType|java.lang.Double|Double|System.Double|Number|double|Double|double
|long|type:integer<br>maximum:2^53+1<br>minimum:-2^53+1|INT64|LongType|java.lang.Long|Long|System.Int64|Number|long|Integer|int64
|int|type:integer<br>maximum:2^31<br>minimum:-2^31|INT32/INT_32|IntegerType|java.lang.Integer|Int|System.Int32|Number|int|Integer|int32
|short|type:integer<br>maximum:2^15<br>minimum:-2^15|INT32/INT_16|ShortType|java.lang.Short|Short|System.Int16|Number|int|Integer|int32
|byte|type:integer<br>maximum:2^7<br>minimum:-2^7|INT32/INT_8|ByteType|java.lang.Short|Byte|System.SByte|Number|int|Integer|int32
|boolean|type:boolean|BOOLEAN|BooleanType|java.lang.Boolean|Boolean|System.Boolean|Boolean|bool|Integer|Integer|bool
|date|type:string<br>format:date<br>(RFC 3339, section 5.6)|INT32/DATE|DateType|java.util.Date|java.util.Date|System.DateTime|String|date|Integer<br>(unix millis)|int64<br>(unix millis)
|date-time|type:string<br>format:date-time<br>(RFC 3339, section 5.6)|INT64/TIMESTAMP_MILLIS|TimestampType|java.util.Date|java.util.Date|System.DateTime|String|timestamp|Integer<br>(unix millis)|int64<br>(unix millis)
|map|object|MAP annotated group<br><br><key_type> MUST be STRING<br><br><value_type> type of map values|MapType<br><br>"keyType" MUST be StringType<br><br>"valueType" is type of map values.|java.util.Map|Map|---|object|object|map|map<key_type, value_type>|

### Defining descriptors in the API

The following table provides an overview of available descriptor types, including the required fields for defining a descriptor of each type.

This table should be used as a reference for the [Descriptors](#descriptors) section found earlier in this document.

<table>
<tr>
<th>@type</th>
<th>Description</th>
</tr>

<tr>
<td colspan=2><strong>Identity descriptor</strong></td>
</tr>

<tr>
<td><p><strong>xdm:descriptorIdentity</strong></p>
<p>
Signals that the "sourceProperty" of the "sourceSchema" is an Identity field as described by the <a href="../identity_services_architectural_overview/identity_services_architectural_overview.md">Adobe Experience Platform Identity Service</a>.
</p></td>
<td>
<pre class="JSON language-JSON hljs">
{
  "@type": "xdm:descriptorIdentity",
  "xdm:sourceSchema":
    "https://ns.adobe.com/{TENANT_ID}/schemas/fbc52b243d04b5d4f41eaa72a8ba58be",
  "xdm:sourceVersion": 1,
  "xdm:sourceProperty": "/personalEmail/address",
  "xdm:namespace": "Email",
  "xdm:property": "xdm:code",
  "xdm:isPrimary": false
}
</pre>
<p><strong>Required Fields:</strong>
<ul>
<li><strong>"@type"</strong>: The type of descriptor being defined.</li>
<li><strong>"xdm:sourceSchema"</strong>: The $id URI of the schema where the descriptor is being defined.</li>
<li><strong>"xdm:sourceVersion"</strong>: The major version of the source schema.
<li><strong>"xdm:sourceProperty"</strong>: The path to the specific property that will be the identity. Path should begin with a "/" and not end with one. Do not include "properties" in the path (e.g. use "/personalEmail/address" instead of "/properties/personalEmail/properties/address")</li>
<li><strong>"xdm:namespace"</strong>: The "id" or "code" value of the identity namespace. A list of namespaces can be found using the <a href="../../../../../../acpdr/swagger-specs/id-service-api.yaml">Identity Namespace Service API</a>.</li>
<li><strong>"xdm:property"</strong>: Either "xdm:id" or "xdm:code", depending on the "xdm:namespace" used.</li>
<li><strong>"xdm:isPrimary"</strong>: An optional boolean value. When "true", indicates the field as the primary identity. Schemas may contain only one primary identity.</li>
</ul></p>
</td>
</tr>

<tr>
<td colspan=2><strong>Friendly name descriptor</strong></td>
</tr>

<tr>
<td><p><strong>xdm:alternateDisplayInfo</strong></p>
<p>Allows a user to modify the "title" and "description" values of the core library schema fields. Especially useful when working with "eVars" and other "generic" fields that you wish to label as containing information specific to your organization. The UI can use these to show a more 'friendly' name or to only show fields that have a friendly name.</p>
</td>
<td>
<pre class="JSON language-JSON hljs">
{
  "@type": "xdm:alternateDisplayInfo",
  "xdm:sourceSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/274f17bc5807ff307a046bab1489fb18",
  "xdm:sourceVersion": 1
  "xdm:sourceProperty": "/eVars/eVar1",
  "xdm:title": {
    "en_us":{"Loyalty ID"}
  },
  "xdm:description": {
    "en_us":{"Unique ID of loyalty program member."}
  },
}
</pre>
<p><strong>Required Fields:</strong>
<ul>
<li><strong>"@type"</strong>: The type of descriptor being defined.</li>
<li><strong>"xdm:sourceSchema"</strong>: The $id URI of the schema where the descriptor is being defined.</li>
<li><strong>"xdm:sourceVersion"</strong>: The major version of the source schema.
<li><strong>"xdm:sourceProperty"</strong>: The path to the specific property that will be the identity. Path should begin with a "/" and not end with one. Do not include "properties" in the path (e.g. use "/personalEmail/address" instead of "/properties/personalEmail/properties/address")</li>
<li><strong>"xdm:title"</strong>: The new title you wish to display for this field, written in Title Case.</li>
<li><strong>"xdm:description"</strong>: An optional description can be added along with the title. </li>
</ul></p>
</td>
</tr>

<tr>
<td colspan=2><strong>Relationship descriptor</strong></td>
</tr>

<tr>
<td><p><strong>xdm:descriptorOneToOne</strong>
</p>
<p>Describes a relationship between two different schemas, keyed on the properties described in "sourceProperty" and "destinationProperty". See the tutorial on <a href="../../tutorials/schema_registry_api_tutorial/relationship_descriptor_tutorial.md">defining a relationship between two schemas</a> for more information.</p>
</td>
<td>
<pre class="JSON language-JSON hljs">
{
  "@type": "xdm:descriptorOneToOne",
  "xdm:sourceSchema":
    "https://ns.adobe.com/{TENANT_ID}/schemas/fbc52b243d04b5d4f41eaa72a8ba58be",
  "xdm:sourceVersion": 1,
  "xdm:sourceProperty": "/parentField/subField",
  "xdm:destinationSchema": 
    "https://ns.adobe.com/{TENANT_ID}/schemas/78bab6346b9c5102b60591e15e75d254",
  "xdm:destinationVersion": 1,
  "xdm:destinationProperty": "/parentField/subField"
}
</pre>
<p>
<strong>Required Fields:</strong>
<ul>
<li><strong>"@type"</strong>: The type of descriptor being defined.</li>
<li><strong>"xdm:sourceSchema"</strong>: The $id URI of the schema where the descriptor is being defined.</li>
<li><strong>"xdm:sourceVersion"</strong>: The major version of the source schema.
<li><strong>"xdm:sourceProperty"</strong>: Path to the field in the source schema where the relationship is being defined. Should begin with a "/" and not end with one. Do not include "properties" in the path (for example, "/personalEmail/address" instead of "/properties/personalEmail/properties/address").</li>
<li><strong>"xdm:destinationSchema"</strong>: The $id URI of the destination schema this descriptor is defining a relationship with.</li>
<li><strong>"xdm:destinationVersion"</strong>: The major version of the destination schema.</li>
<li><strong>"xdm:destinationProperty"</strong>: Optional path to a target field within the destination schema. If this property is omitted, the target field is inferred by any fields that contain a matching reference identity descriptor (see below).</li>
</ul>
</p>
</td>
</tr>

<tr>
<td colspan=2><strong>Reference identity descriptor</strong></td>
</tr>

<tr>
<td><p><strong>xdm:descriptorReferenceIdentity</strong>
</p>
<p>Provides a reference context to a schema field, allowing it to be linked with the primary identity field of a destination schema.<br/><br/>
<strong>Note: </strong>Fields must already be labeled with an identity descriptor before a reference descriptor can be applied to them.</p>
</td>
<td>
<pre class="JSON language-JSON hljs">
{
  "@type": "xdm:descriptorReferenceIdentity",
  "xdm:sourceSchema": "https://ns.adobe.com/{TENANT_ID}/schemas/78bab6346b9c5102b60591e15e75d254",
  "xdm:sourceVersion": 1,
  "xdm:sourceProperty": "/parentField/subField",
  "xdm:identityNamespace": "Email"
}
</pre>
<p>
<strong>Required Fields:</strong>
<ul>
<li><strong>"@type"</strong>: The type of descriptor being defined.</li>
<li><strong>"xdm:sourceSchema"</strong>: The $id URI of the schema where the descriptor is being defined.</li>
<li><strong>"xdm:sourceVersion"</strong>: The major version of the source schema.
<li><strong>"xdm:sourceProperty"</strong>: Path to the field in the source schema where the descriptor is being defined. Should begin with a "/" and not end with one. Do not include "properties" in the path (for example, "/personalEmail/address" instead of "/properties/personalEmail/properties/address").</li>
<li><strong>"xdm:identityNamespace"</strong>: The identity namespace code for the source property.</li>
</ul>
</p>
</td>
</tr>
</table>

### Ad-hoc schema workflow

In specific circumstances, it may be necessary to create an XDM schema with fields that are namespaced for usage only by a single dataset. This is referred to as an "ad-hoc" schema. The following steps outline how to create a new class using the `adhoc` behavior and then create an ad-hoc schema that implements that class.

This type of schema is interpreted differently by the data ingestion process. Please refer to the section on [how to ingest CSV files](../ingest_architectural_overview/batch_data_ingestion_developer_guide.md#how-to-ingest-csv-files) in the batch ingestion developer guide for more information on how to create an input file that is intended for a dataset associated with an ad-hoc schema.

### Create ad-hoc class

To create an ad-hoc schema, you must first create a class based on the `adhoc` behavior.

#### API format

```http
POST /tenant/classes
```

#### Request

The following request references (`$ref`) the behavior `https://ns.adobe.com/xdm/data/adhoc` and defines an object named `_adhoc` which acts as the parent for all custom fields as shown in the sample request:

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/classes \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "title":"New Class",
        "description": "New class description",
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

#### Response

A successful response returns the details of the new class, replacing `_adhoc` with a GUID that is a system-generated, read-only unique identifier for the class. The `meta:datasetNamespace` attribute is also generated automatically and included in the response.

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

### Create ad-hoc schema

Once you have created an ad-hoc class based on the `adhoc` behavior, you can create a schema that implements this class.

#### API format

```http
POST /tenant/schemas
```

#### Request

The request body references (`$ref`) the `$id` of the newly created ad-hoc class.

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

### View ad-hoc schema

Once the ad-hoc schema has been created, you can make a lookup (GET) request to view the schema in its expanded form. This is done by using the appropriate Accept header in the GET request, as demonstrated below:

#### API format

```http
GET /tenant/schemas/{SCHEMA_ID}
```
* `{SCHEMA_ID}`: The URL-encoded `$id` URI or `meta:altId` of the ad-hoc schema you want to access.

#### Request

The following request uses the Accept header `application/vnd.adobe.xed-full+json; version=1`, which returns the expanded form of the schema. It is important to remember that all lookup requests to the Schema Registry require the major version be included.

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

<img src="https://i.imgur.com/aIgvaQu.png" alt="back-to-top" width="50" height="50" style="position: fixed; bottom: 30px; float: right; right: 10%; left: 90%; opacity: 0.4; padding-top: 0px; padding-bottom: 0px; border-style: hidden; border-radius: 50%;" onmouseover="this.style.opacity = 0.9;" onmouseout="this.style.opacity = 0.4;" onclick="document.documentElement.scrollTop = document.getElementsByClassName('udp-header')[0].offsetHeight; document.body.scrollTop = document.getElementsByClassName('udp-header')[0].offsetHeight;">
