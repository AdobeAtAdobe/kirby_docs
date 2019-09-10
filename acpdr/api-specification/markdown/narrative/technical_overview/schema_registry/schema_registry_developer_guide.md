# Schema Registry API developer guide

The Schema Registry is used to access the Schema Library within Adobe Experience Platform. The registry provides a user interface and RESTful API from which all available library resources are accessible.

This developer guide provides steps to help you [start using the Schema Registry API](#getting-started-with-the-schema-registry-api) and includes [sample API calls](#sample-api-calls) for performing the following actions via the Schema Registry:

* [Listing schemas, classes, mixins, or data types](#list-resources)
* [Lookup specific schemas, classes, mixins, or data types](#lookup-specific-resource)
* [Create a schema, class, mixin, or data type](#create-a-resource)
* [Update a schema, class, mixin, or data type](#update-a-resource)
* [Replace a schema, class, mixins, or data types](#replace-a-resource)
* [Delete a schema, class, mixin, or data type](#delete-a-resource)
* [Use descriptors to describe schema metadata](#descriptors)
* [Enable and view unions for Unified Profile Service](#unified-profile)

The [Appendix](#appendix) to this document includes additional helpful resources related to the Schema Registry, including:

* A brief introduction to [XDM Compatibility Mode](#compatibility-mode)
* How to [define XDM Field Types in the API](#defining-xdm-field-types-in-the-api) 
* How to [map XDM Field Types to other Serialization Formats](#mapping-xdm-types-to-other-formats) (such as Parquet and Scala)
* How to create an [ad-hoc schema](#ad-hoc-schema-workflow) for specific data ingestion workflows

## Getting started with the Schema Registry API

Using the Schema Registry API, you are able to perform basic CRUD operations in order to view and manage all schemas and related resources available to you within Adobe Experience Platform. This includes those defined by Adobe, Experience Platform partners, and vendors whose applications you use. You can also use API calls to create new schemas and resources for your organization, as well as view and edit resources that you have already defined.

It is recommended that you review the [basics of schema composition](schema_composition/schema_composition.md) before beginning to work with the Schema Registry.

The following sections provide additional information that you will need to know or have on-hand in order to successfully make calls to the Schema Registry API.

### Reading the calls

Before making calls to the API, it is important to understand how to read the calls in this document. 

Each API call is shown in two different ways. First, the command is presented in its "API format", a template representation showing only the operation (GET, POST, PUT, PATCH, DELETE) and the endpoint being used (e.g. `/tenant/schemas`). Some templates also include examples or show the location of variables to help illustrate how a call should be formulated, such as `GET /{variable}/classes/{anotherVariable}`.

The calls are then shown as curl commands in a "Request", which includes the necessary headers and full "base path" needed to successfully interact with the registry.

The Schema Registry base path is: `https://platform.adobe.io/data/foundation/schemaregistry`. 

The base path should be pre-pended to all endpoints. For example, the aforementioned `/tenant/schemas` endpoint becomes: `https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas` in order to make a call to the registry.

You will see the API format / Request pattern throughout the developer guide, and should be sure to use the complete path shown in the sample Request when making your own calls to the schema registry.

### Know your `TENANT_ID`

Throughout the developer guide you will see references to a `TENANT_ID`. This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Organization. If you are unsure of your ID, you can access it by performing the following GET request.

#### API format

```SHELL
GET /stats
```

#### Request

The request requires three headers, as shown in the sample request below. The proper use of headers is covered in more detail in the [Request Headers](#request-headers) section that follows.

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/stats \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
```

#### Response

The response includes a "tenantId" attribute, the value of which is your `TENANT_ID`. It also includes information regarding your organization's use of the Schema Registry, such as resource counts, a list of recently created resources, a list of recently updated resources, and information on class usage. (The values shown below are sample values only.)

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

### Understand the `CONTAINER_ID`

Calls to the Schema Registry API require the use of a `CONTAINER_ID`. There are two containers against which API calls can be made, the "global" container and the "tenant" container.

#### Global container

The global container holds all standard Adobe and Experience Platform partner provided classes, mixins, data types, and schemas. You may only perform list and lookup (GET) requests against the global container.

#### Tenant container

Not to be confused with your unique `TENANT_ID`, the tenant container holds all classes, mixins, data types, schemas, and descriptors defined by an IMS Organization. These are unique to each organization, meaning they are not visible or manageable by other IMS Orgs. You may perform all CRUD operations (GET, POST, PUT, PATCH, DELETE) against resources that you create in the tenant container. 

When you create a class, mixin, schema or datatype in the tenant container, it is saved to the Schema Registry and assigned an `$id` URI that includes your `TENANT_ID`. This `$id` is used throughout the API to reference a specific resource. Examples of the `$id` are shown in the Schema Identification section that follows.

### Schema identification

Schemas are identified with an `$id` attribute in the form of a URI, such as: 
* `https://ns.adobe.com/xdm/context/profile` 
* `https://ns.adobe.com/{TENANT_ID}/schemas/7442343-abs2343-21232421` 

To make the URI more REST-friendly, schemas also have a `meta:altId` which is a dot-notation encoding of the URI:
* `_xdm.context.profile`
* `_{TENANT_ID}.schemas.7442343-abs2343-21232421`

Calls to the Schema Registry API will support either the url encoded `$id` URI or the `meta:altId` (dot-notation format). Best practice is to use the url encoded `$id` URI when making a REST call to the API, like so:
* `https%3A%2F%2Fns.adobe.com%2Fxdm%2Fcontext%2Fprofile`
* `https%3A%2F%2Fns.adobe.com%2F{TENANT_ID}%2Fschemas%2F7442343-abs2343-21232421`

### Request headers

The Schema Registry requires four request headers be sent with each call in order to successfully use the API. 

The headers, and the values required, are:

* Authorization: Bearer `{ACCESS_TOKEN}` - The token provided after [authentication](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). 
* x-api-key: `{API_KEY}` - Your specific API key for your unique Platform integration.
* x-gw-ims-org-id: `{IMS_ORG}` - The IMS Organization credentials for your unique Platform integration.

And either of the following:

* Content-Type: application/json (when sending a request body)   
* Accept (see table of values in the [Accept Header section](#accept-header) that follows.) 

#### Accept header

Accept | Description
-------|------------
application/vnd.adobe.xed-id+json |Returns a list of ID's only (This is most commonly used for listing resources)
application/vnd.adobe.xed+json |Returns a list of full JSON schema with original $ref and allOf included (Used when listing to return the full resource)
application/vnd.adobe.xed+json; version={major version}	|Raw with $ref and allOf, has titles and descriptions
application/vnd.adobe.xed-full+json; version={major version} |$refs and allOf resolved, has titles and descriptions
application/vnd.adobe.xed-notext+json; version={major version}	|Raw with $ref and allOf, no titles or descriptions
application/vnd.adobe.xed-full-notext+json; version={major version}	|$refs and allOf resolved, no titles or descriptions
application/vnd.adobe.xed-full-desc+json; version={major version}	|$refs and allOf resolved, descriptors included

> **Note:** If supplying the `major` version only (e.g. 1, 2, 3), the registry will return the latest `minor` version (e.g. .1, .2, .3) automatically.

### Defining fields

Fields are listed within the `properties` object. Each field is itself an object, containing attributes to describe and constrain the data that the field can contain. 

More information about [defining field types in the API](#defining-xdm-field-types-in-the-api) can be found later in this document, including code samples and optional constraints for the most commonly used data types.

Here is a sample field that illustrates some best practices to follow when defining fields. These best practices can also be applied when defining other resources that contain similar attributes.

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
1. The name of a field object may contain alphanumeric, dash, or underscore characters, but **may not** start with an underscore.  
  _**Correct:**_ `"fieldName"`, `"field_name2"`, `"Field-Name"`, `"field-name_3"`  
  _**Incorrect:**_ `"_fieldName"`
1. camelCase is preferred for the name of the field object. Example: `"fieldName"`
1. The field should include a `"title"`, written in Title Case. Example: `"Field Name"`
1. The field requires a `"type"`.  
    * Defining certain types may require an optional `"format"`.  
    * Where a specific formatting of data is required, `"examples"` can be added as an array.
    * The field type may also be defined using any data type in the registry. This is explained in more detail in the [Create a data type](#create-a-data-type) section later in this document. 
1. The `"description"` explains the field and pertinent information regarding field data. It should be written in full sentences with clear language so that anyone accessing the schema can understand the intention of the field.


## Sample API calls

Now that you know your `TENANT_ID`, are familiar with 'containers', understand which headers to use, and have reviewed best practices for defining resources, you are ready to begin making calls to the Schema Registry API. The following sections walk through the most common API calls you will make using the Schema Registry. Each call includes the general API format, a sample request showing required headers, and a sample response. 

## List resources

You are able to view a list of all resources (schemas, classes, mixins, or data types) within a container by performing a single GET request. To help filter results, the Schema Registry supports the use of query parameters when listing resources.

The most common query parameters include:
* `limit` - Limit the number of resources returned. Example:`limit=5` will return a list of five resources.
* `orderby` - Sort results by a specific property. Example: `orderby=title` will sort results by title ascending (A-Z). Adding a `-` before title (`orderby=-title`) will sort items by title descending (Z-A). 
* `property` - Filter results on any top-level attributes. Example: `property=meta:intendedToExtend==https://ns.adobe.com/xdm/context/profile` returns only mixins that are compatible with the XDM Profile class.
* You may use an ampersand (`&`) to combine query parameters.

#### API format

```SHELL
GET /{CONTAINER_ID}/{schemas|classes|datatypes|mixins}

GET /global/datatypes
GET /tenant/mixins?property=meta:intendedToExtend==https://ns.adobe.com/xdm/context/experienceevent
GET /tenant/schemas?limit=3
GET /global/classes?orderby=title&limit=4
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/global/classes \
  -H 'Accept: application/vnd.adobe.xed-id+json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```
The response format depends on the Accept header sent in the request. The following Accept headers are available for listing resources:

Accept | Description
-------|------------
application/vnd.adobe.xed-id+json | Returns a short summary of each resource, generally the preferred header for listing
application/vnd.adobe.xed+json | Returns full JSON schema for each resource, with original $ref and allOf included

#### Response

The request above used the `application/vnd.adobe.xed-id+json` Accept header, therefore the response includes only the `title`, `$id`, `meta:altId`, and `version` attributes for each resource. Substituting `full` into the Accept header returns all attributes of each resource. You can select the appropriate Accept header depending on the information you require in your response.

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
        "title": "XDM Profile",
        "$id": "https://ns.adobe.com/xdm/context/profile",
        "meta:altId": "_xdm.context.profile",
        "version": "1"
    }
  ]
}
```

## Lookup specific resource

If you would like to view a specific resource, be it a schema, class, mixin, or data type, you can perform a GET request that includes the `$id` (URL encoded URI) of the resource and, depending on the Accept header, some or all of the details of the resource.

#### API format

```SHELL
GET /{CONTAINER_ID}/{schemas|classes|datatypes|mixins}/{meta:altId or the url encoded $id URI} 

GET /global/mixins/_xdm.context.profile-person-details
GET /global/mixins/https%3A%2F%2Fns.adobe.com%2Fxdm%2Fcontext%2Fprofile-person-details

GET /tenant/mixins/_{TENANT_ID}.mixins.bce6c11bbe4ad4155dd940c15dfe74e1
GET /tenant/mixins/https%3A%2F%2Fns.adobe.com%2F{TENANT_ID}%2Fmixins%2Fbce6c11bbe4ad4155dd940c15dfe74e1
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/global/mixins/https%3A%2F%2Fns.adobe.com%2Fxdm%2Fcontext%2Fprofile-person-details \
  -H 'Accept: application/vnd.adobe.xed+json; version=1' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

Resource lookup requests require a `version` be included in the Accept header. The following Accept headers are available for lookups:

Accept | Description
-------|------------
application/vnd.adobe.xed+json; version={major version}	|Raw with $ref and allOf, has titles and descriptions
application/vnd.adobe.xed-full+json; version={major version} |$refs and allOf resolved, has titles and descriptions
application/vnd.adobe.xed-notext+json; version={major version}	|Raw with $ref and allOf, no titles or descriptions
application/vnd.adobe.xed-full-notext+json; version={major version}	|$refs and allOf resolved, no titles or descriptions
application/vnd.adobe.xed-full-desc+json; version={major version}	|$refs and allOf resolved, descriptors included

> **Note:** If supplying the `major` version only (1, 2, 3, etc), the registry will return the latest `minor` version (.1, .2, .3, etc) automatically.

#### Response

Once again, the response format depends on the Accept header sent in the request. Experiment with different Accept headers to compare the responses and determine which header is best for your use case. 

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

> **Note:** When composing a schema based on a class that you define, you will not be able to use standard mixins. Mixins define the class(es) they are compatible with in the `meta:intendedToExtend` attribute. Once you begin defining mixins that are compatible with your new class (by using the `$id` of your new class in the `meta:intendedToExtend` field of the mixin), you will be able to reuse those mixins every time you define a schema that implements the class you defined. Details for creating schemas and mixins appear further on in this developer guide.

#### API format

```SHELL
POST /tenant/classes
```

#### Request

The request to create (POST) a class must include an `allOf` attribute containing a `$ref` to one of two values: `https://ns.adobe.com/xdm/data/record` or `httpd://ns.adobe.com/xdm/data/time-series`. 

These values represent the behavior upon which the class is based. For more information on the differences between `record` data and `time series` data, see the section on behavior types within [Schema Composition Basics](schema_composition/schema_composition.md).

When you define a class, you may also include mixins or custom fields within the class definition. This would result in the mixin(s) for field(s) being included every time the class is implemented by a schema. The following example defines a class called Property to capture information regarding different properties owned and operated by a company. It includes a "propertyId" field to be included each time the class is used.

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/classes \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
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

#### Response

You will receive an HTTP Response Status 201 (Created) and the response body will contain the details of the newly created class including the `$id`, `meta:altIt`, and `version`. These three values are read-only and are assigned by the Schema Registry.

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

Performing a GET request to list all classes in the tenant container would now include the Property class. You can also perform a lookup (GET) request using the URL encoded `$id` URI to view the new class directly. Be sure to include the `version` in the Accept header when performing a lookup request.

### Create a data type

When there are common data structures that your organization wishes to use in multiple ways, you may wish to define a data type. Data types allow for the consistent use of multi-field structures, with more flexibility than mixins because they can be included anywhere in a schema by adding them as the ‘type’ of a field. 

In other words, data types allow you to define an object hierarchy once, and refer to it in a field much like you would for any other scalar type.

#### API format

```SHELL
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

You will receive an HTTP Response Status 201 (Created) and the response body will contain the details of the newly created data type, including the `$id`, `meta:altIt`, and `version`. These three values are read-only and are assigned by the Schema Registry.

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

Performing a GET request to list all data types in the tenant container would now include the Property Construction data type. You can also perform a lookup (GET) request using the url encoded `$id` URI to view the new data type directly. Be sure to include the `version` in your Accept header for a lookup request.

### Create a mixin

Mixins are a set of fields used to describe a particular concept, such as "address" or "profile preferences". There are numerous standard mixins available, or you can define your own when you wish to capture information that is unique to your organization. Each mixin contains a `meta:intendedToExtend` field which lists the class(es) the mixin is compatible with. 

> **Note:** You may find it helpful to review all available mixins to familiarize yourself with the fields included in each. You can list (GET) all mixins compatible with a particular class by performing a request against each of the "global" and "tenant" containers, returning only those mixins where the "meta:intendedToExtend" field matches the class you're using. The examples below will return all mixins that can be used with the XDM Profile class: 

```SHELL
GET /global/mixins?property=meta:intendedToExtend==https://ns.adobe.com/xdm/context/profile
GET /tenant/mixins?property=meta:intendedToExtend==https://ns.adobe.com/xdm/context/profile
```

#### API format

```SHELL
POST /tenant/mixins
```

#### Request

When defining a new mixin, it must include a `meta:intendedToExtend` attribute, listing the `$id` of the class(es) with which the mixin is compatible. In this example, the mixin is compatible with the Property class you previously defined. Custom fields must be nested under `_{TENANT_ID}` (as shown in the example) to avoid any collisions with other mixins or fields from the class schemas. Notice that the `propertyConstruction` field is a reference to the data type created in the previous call.

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/mixins \
  -H 'Authorization: Bearer {ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
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

You will receive an HTTP Response Status 201 (Created) and the response body will contain the details of the newly created mixin, including the `$id`, `meta:altIt`, and `version`. These values are read-only and are assigned by the Schema Registry.

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

Performing a GET request to list all mixins in the tenant container would now include the Vehicle Details mixin, or you can perform a lookup (GET) request using the URL encoded `$id` URI to view the new mixin directly. Remember to include the `version` in the Accept header for all lookup requests.

### Create a schema

A schema can be thought of as the blueprint for the data you wish to ingest into Experience Platform. Each schema is composed of a class and zero or more mixins. In other words, you do not have to add a mixin in order to define a schema, but in most cases at least one mixin will be used. 

The schema composition process begins by assigning a class. The class defines key behavioral aspects of the data (record vs time series), as well as the minimum fields that are required to describe the data that will be ingested.

#### API format

```SHELL
POST /tenant/schemas
```

#### Request

The request must include an `allOf` attribute which references the `$id` of a class. This attribute defines the "base class" that the schema will implement. In this example, the base class is the Property class you created previously. The `$id` of the Property class is used as the value of the `$ref` field in the `allOf` array below. 

```SHELL
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas \
  -H 'Authorization: Bearer {ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
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
#### Response

You will receive an HTTP Response Status 201 (Created) and the response body will contain the details of the newly created schema including the `$id`, `meta:altIt`, and `version`. These values are read-only and are assigned by the Schema Registry.

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

Performing a GET request to list all schemas in the tenant container would now include the Property Information schema, or you can perform a lookup (GET) request using the URL encoded `$id` URI to view the new schema directly. Remember to include the `version` in the Accept header for all lookup requests.

## Update a resource

If you ever need to modify or update a resource in the tenant container, this can be done using a PATCH request. The Schema Registry supports all standard JSON Patch operations, including add, remove, and replace. 

For more information on JSON Patch, including available operations, see the official [JSON Patch documentation](http://jsonpatch.com/).

#### API format

```SHELL
PATCH /tenant/{schemas|classes|datatypes|mixins}/{meta:altId or the url encoded $id URI} 
```

#### Request

Using a PATCH operation, you can update the Property Information schema to include the fields that were defined in the Property Details mixin. To do this, you must perform a PATCH request to the schema using its `meta:altId` or the url encoded `$id` URI. 

The request body includes the operation (`op`) that you wish to perform, where (`path`) you would like to perform the operation, and what information (`value`) you would like to include in the operation. In this example, the mixin `$id` is being added to both the `meta:extends` and `allOf` fields.

```SHELL
curl -X PATCH\
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas/_{TENANT_ID}.schemas.d5cc04eb8d50190001287e4c869ebe67 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
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
PATCH /tenant/{schemas|classes|datatypes|mixins}/{meta:altId or the url encoded $id URI} 
```

#### Request

The request body includes the operation (`op`), location (`path`), and information (`value`) needed to update the mixin. This request updates the Property Details mixin to remove the "propertyCity" field and add a new "propertyAddress" field the references a standard data type containing address information. It also adds a new "emailAddress" field that references a standard data type with email information.

```SHELL
curl -X PATCH\
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/mixins/_{TENANT_ID}.mixins.e49cbb2eec33618f686b8344b4597ecf \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
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

The response shows that the operations were completed successfully because the new fields are present and the "propertyCity" field has been removed.

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

In the previous examples, a PATCH operation was used to update part of a resource, and the payload included only the path and value that you wanted to update. The Schema Registry also allows you to _replace_ an entire resource through a PUT operation where the payload includes all required values for defining that resource.

In other words, you can perform a PUT request that essentially _re-writes_ the resource, therefore the request body must include all of the fields that were used when you created (POST) the resource. 

This is especially useful if you want to update a lot of information in the resource at once. 

#### API format

A PUT request can only be performed against resources that you define in the tenant container.

```SHELL
PUT /tenant/{schemas|classes|datatypes|mixins}/{meta:altId or the url encoded $id URI} 
```

#### Request

This sample request replaces the Property Construction datatype that was created in a previous example. The request body looks similar to the POST request used to create the data type, except that it now contains an updated set of fields with new values replacing what was previously defined.

```SHELL
curl -X PUT \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/mixins/_{TENANT_ID}.datatypes.24c643f618647344606222c494bd0102 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
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

The response includes the details of the data type, showing the updated fields and values as provided in the request.

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

It may occasionally be necessary to remove (DELETE) a resource from the registry. Only resources that you create in the tenant container may be deleted. This is done by performing a DELETE request to the `$id` of the resource you wish to delete.

#### API format

```SHELL
DELETE /tenant/{schemas|classes|datatypes|mixins}/{meta:altId or the url encoded $id URI} 
```

#### Request 

A DELETE request does not require an Accept header.

```SHELL
curl -X DELETE \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/mixins/https%3A%2F%2Fns.adobe.com%2F{TENANT_ID}%2Fmixins%2F4fbd5368aa67f0e74d5838f67694c867 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

The response body will be blank with an HTTP Status 204 (No Content). 

You can confirm the deletion by attempting a lookup (GET) request to the resource. You will need to include an Accept header in the request, but should receive an HTTP Status 404 (Not Found) because the resource has been removed from the Schema Registry.

## Descriptors

Schemas define a static view of data entities, but do not provide specific details on how data based on these schemas (datasets, etc) may relate to one another. Adobe Experience Platform allows you to describe these relationships and other interpretive metadata about a schema using descriptors. 

Schema descriptors are tenant-level metadata, meaning they are unique to your IMS Organization and all descriptor operations take place in the tenant container. 

Each schema can have one or more schema descriptor entities applied to it. Each schema descriptor entity includes a descriptor `@type` and the `sourceSchema` to which it applies. Once applied, these descriptors will apply to all datasets created using the schema.

Sample descriptor calls are shown below. For a complete list of available descriptors, and the fields required for defining each type, see the [Defining descriptors in the API](#defining-descriptors-in-the-api) section in the Appendix.

> **Note:** Descriptors require unique Accept headers that replace `xed` with `xdm`, but otherwise look very similar to Accept headers used elsewhere in the Schema Registry. The proper Accept headers have been included in the sample calls below, but take extra caution to ensure the correct headers are being used.

### List descriptors

A single GET request can be used to return a list of all descriptors that have been defined by your organization.

#### API format

```SHELL
GET /tenant/descriptors
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Accept: application/vnd.adobe.xdm-link+json' \
```

The response format depends on the Accept header sent in the request. Notice that the `/descriptors` endpoint uses Accept headers that are different than all other endpoints. 

Descriptor Accept headers replace `xed` with `xdm`, and offer a `link` header that is unique to descriptors.

Accept | Description
-------|------------
application/vnd.adobe.xdm-id+json | Returns an array of descriptor IDs
application/vnd.adobe.xdm-link+json | Returns an array of descriptor API paths
application/vnd.adobe.xdm+json | Returns an array of expanded descriptor objects

#### Response

The response includes an array for each descriptor type that has defined descriptors. In other words, if there are no descriptors of a certain `@type` defined, the registry will not return an empty array for that descriptor type. 

When using the `link` Accept header, each descriptor is shown as an array item in the format `/{container}/descriptors/{descriptor @id}`

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

```SHELL
GET /tenant/descriptors/{descriptor @id}
```

#### Request

Descriptors are not versioned, therefore no Accept header is required in the lookup request.

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors/f3a1dfa38a4871cf4442a33074c1f9406a593407 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
```

#### Response

The response provides details of the descriptor, including its `@type` and `sourceSchema`, as well as additional information that varies depending on the type of descriptor. The `@id` returned should match the descriptor `@id` provided in the request.

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

The Schema Registry allows you to define several different descriptor types. Each descriptor type requires its own specific fields be sent in the POST request. A complete list of descriptors, and the fields necessary to define them, is available in the [Defining descriptors in the API](#defining-descriptors-in-the-api) table in the Appendix.

#### API format

```SHELL
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

> **Note:** For details regarding the fields required to define a descriptor, see the [Defining descriptors in the API](#defining-descriptors-in-the-api) table in the Appendix.

#### Response

You will receive an HTTP Status 201 (Created) and a response object containing the details of the newly created descriptor, including its `@id`. The `@id` is a read-only field assigned by the Schema Registry and used for referencing the descriptor in the API.

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

To update a descriptor, a PUT request is made to the registry referencing the `@id` of the descriptor you wish to update.

#### API format

```SHELL
PUT /tenant/descriptors/{@id of descriptor to be updated}
```

#### Request

The PUT request is essentially _re-writing_ the descriptor, so the request body must include all fields required for defining a descriptor of that type. In other words, the request body to update (PUT) a descriptor is the same as the request body to create (POST) a descriptor of that type.

In this example, the identity descriptor is being updated to reference a different `xdm:sourceProperty` ("mobile phone") and change the `xdm:namespace` to "Phone".

```SHELL
curl -X PUT \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors/f3a1dfa38a4871cf4442a33074c1f9406a593407 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
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

Details regarding `xdm:namespace` and `xdm:property`, including how to access them, are available in the [Defining descriptors in the API](#defining-descriptors-in-the-api) table.

#### Response

You will receive an HTTP Status 201 (Created) and the response object will contain the `@id` of the updated descriptor (which should match the `@id` sent in the request).

```JSON
{
    "@id": "f3a1dfa38a4871cf4442a33074c1f9406a593407"
}
```

Performing a lookup (GET) request to view the descriptor will show that the fields have now been updated to reflect the changes sent in the request.

### Delete descriptor

Occasionally you may need to remove a descriptor that you have defined from the Schema Registry. This is done by sending a DELETE request to the `@id` of the descriptor you wish to remove.

#### API format

```SHELL
DELETE /tenant/descriptors/{@id of descriptor to be deleted}
```

#### Request

An Accept header is not required to delete a descriptor.

```SHELL
curl -X DELETE \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/descriptors/ca921946fb5281cbdb8ba5e07087486ce531a1f2  \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
```

#### Response

The response body will be blank and you will receive an HTTP Status 204 (No Content).

To confirm the descriptor has been deleted, you can perform a lookup request against the descriptor `@id`. It will return an HTTP Status 404 (Not Found) because the descriptor has been removed from the Schema Registry.

## Unified Profile

The Unified Profile Service (UPS) provides a holistic view of an individual by building a robust, 360&deg; profile of attributes as well as a timestamped account of every event that individual has had across any system your organization has integrated with Experience Platform. 

For more information on how unified profiles are used across Platform, see the [Unified Profile Overview](../unified_profile_architectural_overview/unified_profile_architectural_overview.md).

By enabling a schema for use with UPS, you are indicating that the data the schema defines should be included in the union view for the class that the schema implements.

This is done through the use of the `meta:immutableTags` attribute. 

### Enable "union" tag

In order for a schema to be included in the merged union view, the "union" tag must be added to the `meta:immutableTags` attribute of the schema. This is done through a PATCH request to update the schema and add the `meta:immutableTags` array with a value of "union".

> **Note:** Immutable Tags are tags that are intended to be set, but never removed.

#### API format

```SHELL
PATCH /tenant/schemas/{meta:altId or the url encoded $id URI}
```

#### Request

```SHELL
curl -X PATCH \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas/_{TENANT_ID}.schemas.d5cc04eb8d50190001287e4c869ebe67 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '[
        { "op": "add", "path": "/meta:immutableTags", "value": ["union"]}
      ]'
```

#### Response

The response shows that the operation was performed successfully, and the schema now contains a top-level attribute, `meta:immutableTags`, which is an array containing the value, "union".

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

When you set the "union" tag on a schema, the Schema Registry will automatically create and maintain a union for the class upon which the schema is based. The `$id` for the union is similar to the standard `$id` of a class, with the only difference being that is appended by two underscores and the word "union" (`"__union"`).

To view a list of available unions, you can perform a GET request to the `/unions` endpoint.

#### API format

```SHELL
GET /tenant/unions
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/unions \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Accept: application/vnd.adobe.xed-id+json' \
```

#### Response

If unions have been defined, the `title`, `$id`, `meta:altId`, and `version` for each union will be provided as objects within the "results" array.

If no unions have been defined, you will still receive an HTTP Status 200 (OK) but the response object will contain an empty "results" array. 

```JSON
{
    "results": [
        {
            "title": "XDM Profile",
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

If you would like to view a specific union, you can perform a GET request that includes the `$id` (URL encoded URI) and, depending on the Accept header, some or all of the details of the union.

> **Note:** Union lookups are available using the `/unions` and `/schemas` endpoint to enable them for use in UPS exports into a dataset. 

#### API format

```SHELL
GET /tenant/unions/{meta:altId or the url encoded $id URI}
GET /tenant/schemas/{meta:altId or the url encoded $id URI}

GET /tenant/unions/_xdm.context.profile__union
GET /tenant/unions/https%3A%2F%2Fns.adobe.com%2Fxdm%2Fcontext%2Fprofile__union

GET /tenant/schemas/_{TENANT_ID}.classes.19e1d8b5098a7a76e2c10a81cbc99590__union
GET /tenant/schemas/https%3A%2F%2Fns.adobe.com%2F{TENANT_ID}%2Fclasses%2F19e1d8b5098a7a76e2c10a81cbc99590__union
```

#### Request

```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/unions/https%3A%2F%2Fns.adobe.com%2Fxdm%2Fcontext%2Fprofile__union \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Accept: application/vnd.adobe.xed+json; version=1' \
```

Union lookup requests require a `version` be included in the Accept header. 

The following Accept headers are available for union schema lookups:

Accept | Description
-------|------------
application/vnd.adobe.xed+json; version={major version}|Raw with $ref and allOf, has titles and descriptions
application/vnd.adobe.xed-full+json; version={major version}|$refs and allOf resolved, has titles and descriptions

#### Response

The response object provides a union view of all schemas that implement the class whose `$id` was provided in the request path.

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

Using the `property` query parameter, you can specify that only schemas containing a `meta:immutableTags` field and with a `meta:class` equal to the class whose union you are interested in are returned.

#### API Format

```SHELL
GET /tenant/schemas?property=meta:immutableTags==union&property=meta:class=={CLASS_ID}
```

#### Request

In the example below, the request will return all schemas that are part of the XDM Profile class union.

```SHELL
curl -X GET \
  'https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas?property=meta:immutableTags==union&property=meta:class==https://ns.adobe.com/xdm/context/profile' \
  -H 'Accept: application/vnd.adobe.xed-id+json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
```

#### Response

The response is a filtered list of schemas, containing only those that satisfy both requirements. Remember that when using multiple query parameters, an AND relationship is assumed. The format of the response depends on the Accept header sent in the request.

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

Most Experience Platform services including Catalog, Data Lake, and Unified Profile Service use Compatibility Mode in lieu of standard XDM. The Schema Registry API also uses Compatibility Mode, and the examples in this document are all shown using Compatibility Mode.

It is worthwhile to know that a mapping takes place between standard XDM and the way it is operationalized in Experience Platform, but it should not affect your use of Platform services.

The open source project is available to you, but when it comes to interacting with resources through the Schema Registry, the API examples in this document provide the best practices you should know and follow.

### Defining XDM field types in the API

As shown in the examples above, schemas are defined using JSON Schema standards and basic field types. XDM allows you to define additional field types through the use of formats and optional constraints. The XDM field types are exposed by the field-level attribute, "meta:xdmType".

The following table outlines the appropriate formatting to define scalar field types and more specific field types using optional properties. More information regarding optional properties and type-specific keywords is available through the [JSON Schema Documentation](https://json-schema.org/understanding-json-schema/reference/type.html).

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
<td colspan=2><strong>Identity Descriptor</strong></td>
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
<td colspan=2><strong>Friendly Name Descriptor</strong></td>
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
<!-- (To be revised and added later)
<tr>
<td colspan=2><strong>Relationship Descriptor</strong></td>
</tr>

<tr>
<td><p><strong>xdm:descriptorOneToOne</strong><br/>
<strong>xdm:descriptorOneToMany</strong><br/>
<strong>xdm:descriptorManyToMany</strong><br/>
</p>
<p>Describes a relationship between independent schemas or classes, keyed on the properties described in "sourceProperty" and "destProperty".</p>
</td>
<td>
<pre class="JSON language-JSON hljs">
{
  "@type": "xdm:descriptorOneToOne",
  "xdm:sourceSchema":
    "https://ns.adobe.com/{TENANT_ID}/schemas/fbc52b243d04b5d4f41eaa72a8ba58be",
  "xdm:sourceVersion": 1,
  "xdm:sourceProperty": "/parentField/subField",
  "xdm:label": {string label if xdm:sourceProperty not provided},
  "xdm:destSchema":
    "https://ns.adobe.com/{TENANT_ID}/classes/5bdb5582be0c0f3ebfc1c603b705764f",
  "xdm:destVersion": 1,
  "xdm:destProperty": "/parentField/subField"
}
</pre>
<p>
<strong>Required Fields:</strong>
<ul>
<li><strong>"@type"</strong>: The type of descriptor being defined: <br/>
"xdm:descriptorOneToOne", "xdm:descriptorOneToMany", or "xdm:descriptorManyToMany"</li>
<li><strong>"xdm:sourceSchema"</strong>: The $id URI of the schema where the descriptor is being defined.</li>
<li><strong>"xdm:sourceVersion"</strong>: The major version of the source schema.
<li><strong>"xdm:sourceProperty"</strong>: Optional path to field in the source schema where the relationship is being defined. Path should begin with a "/" and not end with one. Do not include "properties" in the path (e.g. "/personalEmail/address" instead of "/properties/personalEmail/properties/address").</li>
<li><strong>"xdm:label"</strong>: String label provided only if "xdm:sourceProperty" not provided.</li>
<li><strong>"xdm:destSchema"</strong>: Despite the title, this field contains the $id URI of a class. The source schema has an identity that is related to all fields with the same identity based on this destination class.</li>
<li><strong>"xdm:destVersion"</strong>: The major version of the destination class.</li>
<li><strong>"xdm:destProperty"</strong>: Optional path to field. If not providing an "xdm:destProperty", any field with the same "xdm:namespace" as the "xdm:sourceProperty" can be used for a join.</li>
</ul>
</p>
</td>
</tr> -->
</table>

### Ad-hoc schema workflow

In specific circumstances, it may be necessary to create an XDM schema with fields that are namespaced for usage only by a single dataset. This is referred to as an 'ad-hoc' schema. The following steps outline how to create a new class using the `adhoc` behavior and then create an ad-hoc schema that implements that class.

This type of schema is interpreted differently by the data ingestion process. Please refer to the [Batch Ingestion Developer Guide](../ingest_architectural_overview/batch_data_ingestion_developer_guide.md) section on [how to ingest CSV files](../ingest_architectural_overview/batch_data_ingestion_developer_guide.md#how-to-ingest-csv-files) for more information on how to create an input file that is intended for a dataset associated with an ad-hoc schema.

### Create ad-hoc class

Creating an ad-hoc schema requires first creating an ad-hoc class, based on the `adhoc` behavior.

#### API format

```
POST /tenant/classes
```

#### Request

The request body references (`$ref`) the behavior `https://ns.adobe.com/xdm/data/adhoc` and defines an object named `_adhoc` which acts as the parent for all custom fields as shown in the sample request:

```
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/classes \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
        "title":"New Class",
        "description": "New class description",
        "type":"object",
        "allOf": [
          {"$ref":"https://ns.adobe.com/xdm/data/adhoc"},
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

The response replaces `_adhoc` with a GUID that is a system-generated, read-only unique identifier for the newly defined class. The `meta:datasetNamespace` attribute is also generated automatically and included in the response.

```
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

```
POST /tenant/schemas
```

#### Request

The request body references (`$ref`) the `$id` of the newly created ad-hoc class.

```
curl -X POST \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
        "title":"New Schema",
        "description": "New schema description.",
        "type":"object",
        "allOf": [
          {"$ref":"https://ns.adobe.com/{TENANT_ID}/classes/6395cbd58812a6d64c4e5344f7b9120f"}
        ]
      }'
```

#### Response

The response includes the system-generated, read-only `$id` of the newly created schema.

```
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

Once the ad-hoc schema has been created, you can use a lookup (GET) request to view the schema in its expanded form. This is done by using the appropriate Accept header in the GET request.

#### API format

```
GET /tenant/schemas/{meta:altId or url encoded $id of the schema}
```

#### Request

Using the Accept header `application/vnd.adobe.xed-full+json; version=1` returns the expanded form of the schema. It is important to remember that all lookup requests require the major version be included.

```
curl -X GET \
  https://platform.adobe.io/data/foundation/schemaregistry/tenant/schemas/_{TENANT_ID}.schemas.26f6833e55db1dd8308aa07a64f2042d \
  -H 'Accept: application/vnd.adobe.xed-full+json; version=1' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
```

#### Response

The response object shows the details of the schema, including all fields nested under `properties`.

```
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

<button style="position: fixed; bottom: 30px; float: right; right: 15%; left: 85%; max-width: 80px; width: 100%; font-size: 12px; border-color: rgba(85, 85, 85, 0.2); background-color: white; padding: .5px; border-radius: 4px; opacity: 0.3; height: 50px" onmouseover="this.style.opacity='1'"><a href="#schema-registry-api-developer-guide">Back to top</a></button>