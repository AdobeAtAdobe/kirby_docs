# Basics of schema composition

This document provides an introduction to schemas and the building blocks, principles, and best practices for composing schemas to be used with Adobe Experience Platform.

Within this document you will find information on the following topics:

* [Understanding schemas](#understanding-schemas)
* [Schema-based workflows](#schema-based-workflows-in-experience-platform)
* [Planning a schema](#planning-your-schema), including: types of data, identity fields, and schema evolution principles
* [Schema building blocks](#building-blocks-of-schema): class, mixin, data type, field
* [Standard fields for use in schemas](#xdm-fields)
* [Schema composition](#composition-example)
* [Union schemas](#union)

## Understanding schemas

A schema is a set of rules to help represent and validate data. At a high-level, schemas provide an abstract definition of a real-world object (such as a Person) and outline what data should be included in each instance of that object (such as First Name, Last Name, Birthday, etc).

In addition to describing the structure of data, schemas provide constraints and expectations that can be applied and used to validate data as it is moved between systems. These standard definitions allow data to be interpreted consistently, regardless of origin, and remove the need for translation across applications.

Experience Platform maintains this semantic normalization through the use of schemas. Schemas are the standard way of describing data in Experience Platform, allowing all data that conforms to schemas to be reusable without conflicts across an organization and even to be sharable between multiple organizations.

### Relational Tables vs Embedded Objects

When working with relational databases, best practices involve normalizing data, or taking an entity and dividing it into discrete pieces that are then displayed across multiple tables. In order to read the data as a whole or update the entity, read and write operations must be made across many individual tables using JOIN.

Through the use of embedded objects, XDM schemas can directly represent complex data and store it in self-contained documents with hierarchical structure. The benefit is you can query the data without having to reconstruct the entity by expensive joins to multiple denormalized tables.

### Schema and Big Data

Modern digital systems generate vast amounts of behavioral signals (transaction data, web logs, IOT, display, etc.). This Big Data offers extraordinary opportunities to optimize experiences, but due to the scale and variety of the data, it is challenging to use. In order to gain value from the data, the structure, format, and definitions of the data must be standardized so that it can be processed consistently and efficiently.

Schemas solve this big data problem by allowing data to be integrated from multiple sources, standardized through common structures and definitions, and shared across solutions. This allows subsequent processes and services to answer any type of question being asked of the data, moving away from the traditional approach to data modeling where all of the questions that will be asked of the data are known in advance and the data is modeled to suit.

## Schema-based workflows in Experience Platform

Standardization is a key concept behind Experience Platform. Experience Data Model (XDM), driven by Adobe, is an effort to standardize customer experience data and define standard schemas for customer experience management. 

XDM provides a common format for any application to use to communicate with services on Adobe Experience Platform. By adhering to XDM standards, all customer experience data can be incorporated into a common representation delivering insights in a faster, more integrated way. Through standardization of data, you can gain valuable insights from customer actions, define customer audiences through segments, and express customer attributes for personalization purposes.

XDM is the fuel that allows Experience Cloud, powered by Adobe Experience Platform, to deliver the right message to the right person, on the right channel, at exactly the right moment. 

### Experience Data Model and XDM System

Experience Data Model is a publicly documented specification designed to improve the interoperability, expressiveness, and power of digital experiences. XDM provides a common language through which data can be shared and understood across Experience Platform and other services interacting with Platform. XDM provides common structures and definitions in order to help standardize data from disparate sources.

The infrastructure on which Experience Platform is built, known as XDM System, facilitates schema-based workflows and includes the Schema Registry, schema editor, schema metadata, and service consumption patterns. 

In other words, XDM System operationalizes Experience Data Model schemas.

## Planning your schema

The first step in building a schema is to determine the concept, or real world object, that you are trying to capture within the schema. Once you identify the concept you are trying to describe, you can begin planning your schema by thinking about things like the type of data, potential identity fields, and how the schema may evolve in the future.

### Data in Experience Platform

Data intended for use in Experience Platform is grouped into two types: Record and Time Series.

Schemas on Experience Platform implement classes that are based on one of these two types.

Record data provides information about attributes of a subject. This could be an organization or individual. The XDM Profile class is an example of a record data-based class that a schema may implement, but not the only one. You are able to define your own classes within Experience Platform, however, XDM Profile is the preferred class for schemas to implement when describing consumer record data.

Time series data provides a snapshot of the system at the time an action was taken either directly or indirectly by a subject. XDM ExperienceEvent is one example of a time series data-based class that a schema may implement, but you can also define your own within Experience Platform. It is recommended that you use XDM ExperienceEvent, as it is the preferred class to express time series data in Adobe Experience Platform.

Record schemas and Time Series schemas both contain a map of identities (`xdm:identityMap`). This field contains the identity representation of a subject, drawn from fields marked as "Identity" as described in the following section.

### Identity

Schemas are used for ingesting data into Experience Platform. This data will ultimately be used across multiple services to create a single, unified view of an individual entity. Therefore, it is important when thinking about schemas to think about "Identity" and which fields can be used to identify a subject regardless of where the data may be coming from. 

To help with this process, key fields can be marked as "Identity" and, upon data ingestion, the data in those fields will be inserted into the "Identity Graph" for that individual. The graph data can then be accessed by [Unified Profile Service](../../unified_profile_architectural_overview/unified_profile_architectural_overview.md) (UPS) and other Experience Platform services to provide a stitched together view of each individual customer.

Fields that are commonly marked as "Identity" include: email address, phone number, [Experience Cloud ID (ECID)](https://marketing.adobe.com/resources/help/en_US/mcvid/), CRM ID, or other unique ID fields. You will want to consider any unique identifiers specific to your organization, as they may be good "Identity" fields as well.

It is important to think about customer identities during the schema planning phase, to help ensure data is being brought together to form the most robust profile possible. You can learn more about how identity information can help you deliver digital experiences to your customers by reading the [Identity Service Overview](../../identity_services_architectural_overview/identity_services_architectural_overview.md).

### Schema evolution principles

As the nature of digital experiences continues to evolve, so must the schemas used to represent them. Therefore, a well designed schema is able to adapt and evolve as needed, without causing destructive changes to previous versions of the schema.

Since maintaining backwards compatibility is crucial for schema evolution, Experience Platform enforces a purely additive versioning principle to ensure that any revisions to the schema result in non-destructive updates and changes only. In other words, **breaking changes are not supported.**

|Supported Changes | Breaking Changes (Not Supported)|
|------------------------------------|---------------------------------|
|Adding new fields to existing schema|Removing previously defined fields|
|Making a mandatory field optional |Introducing new mandatory fields|
| |Renaming or redefining existing fields|
| |Removing or restricting previously supported field values|
| |Moving attributes to a different location in the tree|

> **Note:** If a schema has not yet been used to ingest data into Experience Platform, you may introduce a breaking change to that schema. However, once the schema has been used in Platform, it must adhere to the additive versioning policy.

### Composition

Experience Platform uses a composition approach in which standard building blocks are combined to create schemas. This approach promotes the reusability of existing components and drives standardization across the industry (through Experience Data Model) to support vendor schemas and components in Platform, as well as standardization within large enterprise organizations.

## Building blocks of schema

To ingest data into Experience Platform, a dataset is created which references a schema. The dataset schema provides an abstract definition of the real-world object, including the attributes that object should have, as well as constraints for how the data being ingested should look. 

Schemas are composed using the following formula:

**Class + Mixin&ast; = Dataset Schema**

&ast;A schema is composed of a class and _zero or more_ mixins. This means that you could compose a dataset schema without using mixins at all.

### Schema

Experience Platform uses schemas to describe the structure of data in a consistent and reusable way. Schemas should always be designed with reusability in mind. By defining data consistently across systems, it becomes easier to retain meaning and therefore gain value from the data. As noted above, a schema consists of a base class, zero or more mixins, and fields to represent the data. 

Before data arrives in Platform, a schema is created to describe the data that will be ingested and provide constraints to the type of data that can be ingested.

An example of a schema could be "Loyalty Members", where a company wishes to ingest data related to members of its loyalty program.

### Class

Composing a schema begins by assigning a class. Classes define the behavioral aspects of the data the schema will contain (record or time-series). In addition to this, classes describe the smallest number of common properties that all schemas based on that class would need to include and provide a way for multiple compatible datasets to be merged. A class also determines which mixins will be eligible for use in the schema (this is discussed in more detail in the [mixin](#mixin) section that follows). 

There are standard classes provided with every integration of Experience Platform, known as "Industry" classes. Industry classes are generally accepted industry standards that apply to a broad set of use cases. Examples of Industry classes include the XDM Profile and XDM ExperienceEvent classes provided by Adobe. 

Experience Platform also allows for "Vendor" classes, which are those classes defined by Experience Platform partners and made available to all customers who use that vendor service or application within Platform. 

There are also classes used to describe more specific use cases for individual organizations within Platform, called "Customer" classes. Customer classes are defined by the user when there are no Industry or Vendor classes available to describe a unique use case. 

For example, the "Loyalty Members" schema describes record data about an individual and therefore can be based on the Profile class, a standard Industry class defined by Adobe.

### Mixin

A mixin is a reusable component that defines one or more fields that implement certain functions, like Personal Details, Hotel Preferences, Address, etc. Mixins are intended to be included as part of a dataset schema that implements a compatible class. 

Mixins define which class(es) they are compatible with based on the behavior of the data they represent (record or time series). This means that not all mixins are available for use with all classes.

Mixins have the same scope and definition as classes, in that there are Industry mixins, Vendor mixins, and Customer mixins that are defined by individual organizations using Platform. Experience Platform includes many standard Industry mixins while also allowing vendors to define mixins for their users, and individual users to define mixins for their own specific concepts. 

For example, to capture details such as "First Name" and "Home Address" for your "Loyalty Members" schema, you would be able to use standard mixins that define those common concepts. However, a loyalty-specific field (such as "Loyalty Program Level"), does not have a pre-defined mixin, so you could define your own to capture this information.

Remember that schemas are composed of "zero or more" mixins, so this means that you could compose a valid schema without using any mixins at all.

### Data Type

Data types are used as reference field types in classes or schemas in the same way as basic literal fields. The key difference is that data types can define multiple sub-fields. Similar to a mixin, a data type allows for the consistent use of a multi-field structure, but has more flexibility than a mixin because a data type can be included anywhere in a schema by adding it as the 'data type' of a field. 

Experience Platform provides a number of common data types as part of the Schema Registry to support the use of standard patterns for describing common data structures. This is explained in more detail in the Schema Registry tutorials, where it will become more clear as you walk through the steps to define data types.

### Field

A field is the most basic building block of a schema. Fields provide constraints regarding the type of data they can contain by defining a specific data type. These basic data types define a single field, whereas the [data types](#data-type) previously mentioned allow you to define multiple sub-fields and re-use the same multi-field structure throughout various schemas. So, in addition to defining a field's 'data type' as one of the data types defined in the registry, Experience Platform supports basic scalar types such as:

- string
- integer
- number
- boolean
- array
- object

The valid ranges of these scalar types can be further constrained to certain patterns, formats, minimums/maximums, or pre-defined values. Using these constraints, a wide range of more specific field types can be represented, including:

- enum
- long
- short
- byte
- date
- date-time
- map

> **Note:** The "map" field type allows for key-value pair data, including multiple values for a single key. Maps can only be defined at the system level, meaning you may encounter a map in an industry or vendor-defined schema, but it is not available for use in fields you define. The [Schema Registry API Developer Guide](../schema_registry_developer_guide.md) contains more information on defining field types.

### XDM fields

In addition to basic fields and the ability to define your own data types, XDM provides a standard set of fields and data types that are implicitly understood by Experience Platform services and provide greater consistency when used across Platform components.

These fields, such as "First Name" and "Email Address" contain added connotations beyond basic scalar field types, telling Platform that any fields sharing the same XDM data type will behave in the same way. This behavior can be trusted to be consistent regardless of where the data is coming from or in which Platform service the data is being used.

The complete list of fields is available through the [XDM Field Dictionary](xdm_field_dictionary.md). It is recommended to use XDM field and data types wherever possible to support consistency and standardization across Experience Platform.

## Composition example

Dataset schemas are built using a composition model. Experience Platform users compose schemas to represent data that will be ingested into Platform. As previously mentioned, these schemas are composed of a class and zero or more mixins that are compatible with that class.

For example, a schema describing purchases made at a retail store might be called "Store Transactions". The schema implements the class XDM ExperienceEvent combined with the standard Commerce mixin and a user-defined Product Info mixin. 

Another dataset schema to track website traffic might be called "Web Visits". It also implements the XDM ExperienceEvent class, but this time combines the standard Web mixin.

The diagram below shows these schemas and the fields contributed by each mixin. It also contains two schemas based on the XDM Profile class, including the "Loyalty Members" schema we discussed earlier.

![](images/schema_composition.png)

### Union

While Experience Platform allows you to compose schema for specific use cases, it also allows you to see a "union" of schemas for a specific class type. In the previous diagram we saw two schemas based on the XDM ExperienceEvent class and two schemas based on XDM Profile class. The union, shown below, aggregates the fields of all schemas that share the same class (XDM ExperienceEvent and XDM Profile, respectively). 

![](images/union_schema.png)

By enabling a schema for use with Unified Profile Service (UPS), it will be included in the union for that class type. UPS delivers robust, 360&deg; profiles of customer attributes as well as a timestamped account of every event that customer has had across any system integrated with Platform. UPS uses the union view to represent this data and provide a holistic view of each individual customer.

For more information on working with UPS, see the [Unified Profile Service Overview](../../unified_profile_architectural_overview/unified_profile_architectural_overview.md).

## Next steps

Now that you understand the basics of schema composition, you are ready to begin building schemas using the Schema Registry.

The Schema Registry is used to access the Schema Library within Adobe Experience Platform, and provides a user interface and RESTful API from which all available library resources are accessible. The Schema Library contains Industry resources defined by Adobe, Vendor resources defined by Experience Platform partners, and classes, mixins, data types, and schemas that you compose within your organization.

To begin composing schema using the UI, follow along with the [Schema Editor tutorial](../../../tutorials/schema_editor_tutorial/schema_editor_tutorial.md) to build the "Loyalty Members" schema mentioned throughout this document.

To begin using the Schema Registry API, begin by reading the [Schema Registry API developer guide](../schema_registry_developer_guide.md). After reading the developer guide, you will be ready to begin building the "Loyalty Members" schema using the API. 