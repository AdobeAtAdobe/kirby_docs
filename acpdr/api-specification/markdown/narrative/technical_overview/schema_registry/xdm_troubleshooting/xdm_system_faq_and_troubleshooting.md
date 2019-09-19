# XDM System troubleshooting guide

This document provides answers to frequently asked questions about Experience Data Model (XDM) System, as well as a troubleshooting guide for common errors. For questions and troubleshooting related to other services in Adobe Experience Platform, please refer to the [Experience Platform troubleshooting guide](../../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md).

**Experience Data Model (XDM)** is an open-source specification that defines standardized schemas for customer experience management. The methodology on which Experience Platform is built, **XDM System**, operationalizes Experience Data Model schemas for use by Platform services. The **Schema Registry** provides a user interface and a RESTful API to access the **Schema Library** within Experience Platform. See the [XDM documentation](https://www.adobe.io/apis/experienceplatform/home/xdm.html) for more information.


### FAQ
- **Schema composition**
    - [How do I add fields to a schema?](#how-do-i-add-fields-to-a-schema)
    - [What are the best uses for mixins vs data types?](#what-are-the-best-uses-for-mixins-vs-data-types)
    - [What is the unique ID for a schema?](#what-is-the-unique-id-for-a-schema)
    - [When does a schema start preventing breaking changes?](#when-does-a-schema-start-preventing-breaking-changes)
    - [What is the maximum size of a long field type?](#what-is-the-maximum-size-of-a-long-field-type)
- **XDM and Identity Service**
    - [How do I define identities for my schema?](#how-do-i-define-identities-for-my-schema)
    - [Does my schema need a primary identity?](#does-my-schema-need-a-primary-identity)
- **XDM and Real-time Customer Profile**
    - [How do I enable a schema for use in Real-time Customer Profile?](#how-do-i-enable-a-schema-for-use-in-real-time-customer-profile)
    - [Can I edit a union schema directly?](#can-i-edit-a-union-schema-directly)
- **XDM and data ingestion**
    - [How should I format my datafile to ingest data into my schema?](#how-should-i-format-my-datafile-to-ingest-data-into-my-schema)

### Errors and troubleshooting

- [Object not found](#object-not-found)
- [Title must be unique](#title-must-be-unique)
- [Custom fields must use a top level field](#custom-fields-must-use-a-top-level-field)
- [Real-time Customer Profile errors](#real-time-customer-profile-errors)
    - [To enable profile datasets the schema should be valid](#to-enable-profile-datasets-the-schema-should-be-valid)
    - [There must be an reference identity descriptor](#there-must-be-an-reference-identity-descriptor)
    - [The namespaces of the reference identity descriptor field and destination schema must match](#the-namespaces-of-the-reference-identity-descriptor-field-and-destination-schema-must-match)
- [Accept header errors](#accept-header-errors)
    - [Accept header parameter is required](#accept-header-parameter-is-required)
    - [Unknown Accept media supplied](#unknown-accept-media-supplied)
    - [Unknown Accept format available](#unknown-accept-format-available)
    - [Version must be supplied in the Accept header](#version-must-be-supplied-in-the-accept-header)
    - [Version must not be supplied in the Accept header](#version-must-not-be-supplied-in-the-accept-header)

## FAQ

The following is a list of answers to frequently asked questions about XDM System and use of the Schema Registry API.

## How do I add fields to a schema?

You can add fields to a schema by using a mixin. Each mixin is compatible with one or more classes, allowing the mixin to be used in any schema that implements one of those compatible classes. While Adobe Experience Platform provides several industry mixins with their own pre-defined fields, you can add your own fields to a schema by creating new mixins using the API or the user interface.

For details on creating new mixins in the API, see the [Create a resource](../schema_registry_developer_guide.md#create-a-resource) section in the Schema Registry API developer guide. If you are using the UI, see the [Schema Editor tutorial](../../../tutorials/schema_editor_tutorial/schema_editor_tutorial.md).

## What are the best uses for mixins vs data types?

[Mixins](../schema_composition/schema_composition.md#mixin) are components that define one or more fields in a schema. Mixins enforce how their fields appear in the schema's hierarchy, and therefore exhibit the same structure in every schema that they are included in. Mixins are only compatible with specific classes, as identified by their `meta:intendedToExtend` attribute. 

[Data types](../schema_composition/schema_composition.md#data-type) can also provide one or more fields for a schema. However, unlike mixins, data types are not constrained to a particular class. This makes data types a more flexible option to describe common data structures that are reusable across multiple schemas with potentially different classes.

## What is the unique ID for a schema?

All Schema Registry resources (schemas, mixins, data types, classes) have a URI that acts as an unique ID for reference and lookup purposes. When viewing a schema in the API, it can be found in the top-level `$id` and `meta:altId` attributes.

For more information, see the [Schema identification](../schema_registry_developer_guide.md#schema-identification) section in the Schema Registry API developer guide.

## When does a schema start preventing breaking changes?

Breaking changes can be made to a schema as long as it has never been used in the creation of a dataset or enabled for use in [Real-time Customer Profile](../../unified_profile_architectural_overview/unified_profile_architectural_overview.md). Once a schema has been used in dataset creation or enabled for use with Real-time Customer Profile, the rules of [Schema Evolution](../schema_composition/schema_composition.md#schema-evolution-principles) become strictly enforced by the system.

## What is the maximum size of a long field type?

A long field type is an integer with a maximum size of 53(+1) bits, giving it a potential range between -9007199254740992 and 9007199254740992. This is due to a limitation of how JavaScript implementations of JSON represent long integers.

For more information on field types, see the [Defining XDM field types](../schema_registry_developer_guide.md#defining-xdm-field-types-in-the-api) section in the Schema Registry API developer guide.

## How do I define identities for my schema?

In Experience Platform, identities are used to identify a subject (typically an individual person) regardless of the sources of data being interpreted. They are defined in schemas by marking key fields as "Identity". Commonly used fields for identity include email address, phone number, [Experience Cloud ID (ECID)](https://marketing.adobe.com/resources/help/en_US/mcvid/), CRM ID, and other unique ID fields.

Fields can be marked as identities using either the API or user interface.

### Defining identities in the API

In the API, identities are established by creating identity descriptors. Identity descriptors signal that a particular property for a schema is a unique identifier.

Identity descriptors are created by a POST request to the /descriptors endpoint. If successful, you will receive an HTTP Status 201 (Created) and a response object containing the details of the new descriptor.

For more details on creating identity descriptors in the API, see the [Define identity descriptor](../../../tutorials/schema_registry_api_tutorial/schema_registry_api_tutorial.md#define-identity-descriptor) section in the Schema Registry API tutorial.

### Defining identities in the UI

With your schema open in the Schema Editor, click on the field in the **Structure** section of the editor that you wish to mark as an identity. Under **Field Properties** on the right-hand side, click on the **Identity** checkbox. 

For more details on managing identities in the UI, see the [Identity](../../../tutorials/schema_editor_tutorial/schema_editor_tutorial.md#identity) section in the Schema Editor tutorial.

## Does my schema need a primary identity?

Primary identities are optional, since schemas may have 0 or 1 of them. However, a schema must have a primary identity in order for the schema to be enabled for use in Real-time Customer Profile. See the [Identity](../../../tutorials/schema_editor_tutorial/schema_editor_tutorial.md#identity) section of the Schema Editor tutorial for more information. 

## How do I enable a schema for use in Real-time Customer Profile?

Schemas are enabled for use in [Real-time Customer Profile](../../unified_profile_architectural_overview/unified_profile_architectural_overview.md) through the addition of a "union" tag, located in the `meta:immutableTags` attribute of the schema. Enabling a schema for use with Profile can be done using the API or the user interface.

### Enabling an existing schema for Profile using the API

Make a PATCH request to update the schema and add the `meta:immutableTags` attribute as an array containing the value "union". If the update is successful, the response will show the updated schema which now contains the union tag.

For more information on using the API to enable a schema for use in Real-time Customer Profile, see the [Real-time Customer Profile](../schema_registry_developer_guide.md#unified-profile) section of the Schema Registry developer guide. 

### Enabling an existing schema for Profile using the UI

In Experience Platform, click on **Schemas** in the left-navigation, and select the name of the schema you wish to enable from the list of schemas. Then, on the right-hand side of the editor under **Schema Properties**, click on **Unified Profile** to toggle it on.


For more information, see the [Use in Real-time Customer Profile](../../../tutorials/schema_editor_tutorial/schema_editor_tutorial.md#use-in-unified-profile-service) section in the Schema Editor tutorial.

## Can I edit a union schema directly?

Union schemas are read-only and are automatically generated by the system. They cannot be edited directly. Union schemas are created for a specific class when a "union" tag is added to schema that implements that class.

For more information on unions in XDM, see the [Real-time Customer Profile](../schema_registry_developer_guide.md#unified-profile) section in the Schema Registry API developer guide.

## How should I format my datafile to ingest data into my schema?

Experience Platform accepts datafiles in either Parquet or JSON format. The contents of these files must conform to the schema referenced by the dataset. For details about best practices for datafile ingestion, see the [batch ingestion overview](../../ingest_architectural_overview/ingest_architectural_overview.md).

## Errors and troubleshooting

The following is a list of error messages that you may encounter when working with the Schema Registry API. 

## Object not found

```json
{
    "type": "/placeholder/type/uri",
    "status": 404,
    "title": "NotFoundError",
    "detail": "Object https://ns.adobe.com/incorrectTenantId/schemas/ee067e31b08514d21e2b82577813409d 
      with version 1 not found"
}
```

This error displays when the system could not find a particular resource. The resource may have been deleted, or the path in the API call is invalid. Ensure that you have entered a valid path for your API call before trying again. You may want to check that you have entered the correct ID for the resource, and that the path is properly namespaced with the appropriate container (global or tenant).

For more information on constructing lookup paths in the API, see the [container](../schema_registry_developer_guide.md#understand-the-container_id) and [schema identification](../schema_registry_developer_guide.md#schema-identification) sections in the Schema Registry developer guide.

## Title must be unique

```json
{
    "type": "/placeholder/type/uri",
    "status": 400,
    "title": "BadRequestError",
    "detail": "Title must be unique. An object 
      https://ns.adobe.com/{TENANT_ID}/schemas/26f6833e55db1dd8308aa07a64f2042d 
      already exists with the same title."
}
```

This error message displays when you attempt to create a resource with a title that is already being used by another resource. Titles must be unique across all resource types. For example, if you try to create a mixin with a title that is already being used by a schema, you will receive this error.

## Custom fields must use a top level field

```json
{
    "type": "/placeholder/type/uri",
    "status": 400,
    "title": "BadRequestError",
    "detail": "For custom fields, you must use a top level field named _{TENANT_ID}
       and all the other fields must be defined under it"
}
```

This error message displays when you attempt to create a new mixin with improperly namespaced fields. Mixins that are defined by your IMS organization must namespace their fields with a `TENANT_ID` in order to avoid conflicts with other industry and vendor resources. Detailed examples of proper data structures for mixins can be found in the [Create a mixin](../schema_registry_developer_guide.md#create-a-mixin) section in the Schema Registry API developer guide.


## Real-time Customer Profile errors

The following error messages are associated with operations involved in enabling schemas for Real-time Customer Profile. See the [Real-time Customer Profile](../schema_registry_developer_guide.md#real-time-customer-profile) section in the Schema Registry API developer guide for more information.

### To enable profile datasets the schema should be valid

```json
{
    "type": "/placeholder/type/uri",
    "status": 400,
    "title": "BadRequestError",
    "detail": "To enable profile datasets the schema should be valid"
}
```

This error message displays when you attempt to enable a profile dataset for a schema that has not been enabled for Real-time Customer Profile. Ensure that the schema contains a union tag before enabling the dataset.

### There must be an reference identity descriptor

```json
{
    "type": "/placeholder/type/uri",
    "status": 400,
    "title": "BadRequestError",
    "detail": "For a schema to be able to participate in union, if any of its 
      property is associated with a xdm:descriptorOneToOne descriptor, there must 
      be a xdm:descriptorReferenceIdentity descriptor for that property"
}
```

This error message displays when you attempt to enable a schema for Profile and one of its properties contains a relationship descriptor without a reference identity descriptor. Add a reference identity descriptor to the schema field in question to resolve this error.

### The namespaces of the reference identity descriptor field and destination schema must match

```json
{
    "type": "/placeholder/type/uri",
    "status": 400,
    "title": "BadRequestError",
    "detail": "If both schemas from an already defined xdm:descriptorOneToOne 
      descriptor are promoted to union, and if there is a primary identity on one of 
      the schemas from the xdm:descriptorOneToOne descriptor, the 
      xdm:identityNamespace of the sourceSchema's descriptorReferenceIdentity and the 
      xdm:namespace field of the xdm:descriptorIdentity for the destinationSchema must 
      match"
}
```

In order to enable schemas that contain relationship descriptors for use in Profile, the namespace of the source field and the primary namespace of the target field must be the same. This error message displays when you attempt to enable a schema that contains an unmatched namespace for its reference identity descriptor. Ensure that the `xdm:namespace` value of the destination schema's identity field matches that of the `xdm:identityNamespace` property in the source field's reference identity descriptor to resolve this issue.

For a list of supported identity namespace codes, see the section on [standard namespaces](../../identity_namespace_overview/identity_namespace_overview.md) in the identity namespace overview.

## Accept header errors

Most GET requests in the Schema Registry API require an Accept header in order for the system to determine how to format the response. The following is a list of common errors associated with the Accept header. For lists of compatible Accept headers for different API requests, please refer to their corresponding sections in the [Schema Registry developer guide](../schema_registry_developer_guide.md).

### Accept header parameter is required

```json
{
    "type": "/placeholder/type/uri",
    "status": 406,
    "title": "NotAcceptableError",
    "detail": "Accept header parameter is required"
}
```

This error message displays when an Accept header is missing from an API request. Ensure that an Accept header is included before trying again.

### Unknown Accept media supplied

```json
{
    "type": "/placeholder/type/uri",
    "status": 406,
    "title": "NotAcceptableError",
    "detail": "Unknown Accept media supplied: xed+json"
}
```

This error message displays when an Accept header is invalid. Ensure that you have correctly entered an Accept header that is compatible with the API request you are trying to make before trying again.

### Unknown Accept format available

```json
{
    "type": "/placeholder/type/uri",
    "status": 406,
    "title": "NotAcceptableError",
    "detail": "Unknown Accept format available "
}
```

This error message displays when the Accept header has been provided incorrectly when looking up a descriptor. Ensure that you have correctly entered one of the [supported Accept headers for descriptors](https://www.adobe.io/apis/experienceplatform/home/xdm/xdmservices.html#!api-specification/markdown/narrative/technical_overview/schema_registry/schema_registry_developer_guide.md#descriptors) before trying again.

### Version must be supplied in the Accept header

```json
{
    "type": "/placeholder/type/uri",
    "status": 400,
    "title": "BadRequestError",
    "detail": "version must be supplied in the accept header. Example: 
      application/vnd.adobe.xed-full-notext+json; version=1"
}
```

This error message displays when a version number has not been included in the Accept header. Certain elements like schemas require a version to be specified when looking up individual instances. An Accept header containing a version number will look similar to the following: 

```plaintext
application/vnd.adobe.xed+json; version=1
```

For a list of supported Accept headers, see the [Accept header](https://www.adobe.io/apis/experienceplatform/home/xdm/xdmservices.html#!api-specification/markdown/narrative/technical_overview/schema_registry/schema_registry_developer_guide.md#accept-header) section in the Schema Registry developer guide.

### Version must not be supplied in the Accept header

```json
{
    "type": "/placeholder/type/uri",
    "status": 400,
    "title": "BadRequestError",
    "detail": "version must not be supplied in the accept header. Example: 
      application/vnd.adobe.xed-full+json"
}
```

If you attempt to include a version in your Accept header when listing (GET) resources, you will receive this error. Versions are required only when attempting a lookup request on a single resource. Remove the version from the Accept header to resolve the error.