# Basics of schema composition

This document provides an introduction to Experience Data Model (XDM) schemas and the building blocks, principles, and best practices for composing schemas to be used in Adobe Experience Platform. For general information on XDM and how it is used within Platform, see the [XDM System overview](../xdm_system/xdm_system_in_experience_platform.md).

This document covers the following topics:

* [Understanding schemas](#understanding-schemas)
* [Planning a schema](#planning-your-schema), including:
    * [Data behaviors](#data-behaviors-in-experience-platform)
    * [Identity fields](#identity)
    * [Schema evolution principles](#schema-evolution-principles)
* The [basic building blocks of a schema](#building-blocks-of-a-schema), including:
    * [Class](#class)
    * [Mixin](#mixin)
    * [Data type](#data-type)
    * [Field](#field)
* [Standard fields for use in schemas](#xdm-fields)
* [Schema composition example](#composition-example)
* [Union schemas](#union)
* [Mapping datafiles to XDM schemas](#mapping-datafiles-to-xdm-schemas)

## Understanding schemas

A schema is a set of rules that represent and validate the structure and format of data. At a high level, schemas provide an abstract definition of a real-world object (such as a person) and outline what data should be included in each instance of that object (such as first name, last name, birthday, and so on).

In addition to describing the structure of data, schemas apply constraints and expectations to data so it can be validated as it moves between systems. These standard definitions allow data to be interpreted consistently, regardless of origin, and remove the need for translation across applications.

Experience Platform maintains this semantic normalization through the use of schemas. Schemas are the standard way of describing data in Experience Platform, allowing all data that conforms to schemas to be reusable without conflicts across an organization and even to be sharable between multiple organizations.

### Relational tables versus embedded objects

When working with relational databases, best practices involve normalizing data, or taking an entity and dividing it into discrete pieces that are then displayed across multiple tables. In order to read the data as a whole or update the entity, read and write operations must be made across many individual tables using JOIN.

Through the use of embedded objects, XDM schemas can directly represent complex data and store it in self-contained documents with hierarchical structure. One of the main benefits to this structure is that it allows you to query the data without having to reconstruct the entity by expensive joins to multiple denormalized tables.

### Schemas and big data

Modern digital systems generate vast amounts of behavioral signals (transaction data, web logs, internet of things, display, and so on). This big data offers extraordinary opportunities to optimize experiences, but is challenging to use due to the scale and variety of the data. In order to gain value from the data, its structure, format, and definitions must be standardized so that it can be processed consistently and efficiently.

Schemas solve this problem by allowing data to be integrated from multiple sources, standardized through common structures and definitions, and shared across solutions. This allows subsequent processes and services to answer any type of question being asked of the data, moving away from the traditional approach to data modeling where all of the questions that will be asked of the data are known in advance and the data is modeled to conform to those expectations.

### Schema-based workflows in Experience Platform

Standardization is a key concept behind Experience Platform. XDM, driven by Adobe, is an effort to standardize customer experience data and define standard schemas for customer experience management. 

The infrastructure on which Experience Platform is built, known as XDM System, facilitates schema-based workflows and includes the Schema Registry, Schema Editor, schema metadata, and service consumption patterns. See the [XDM System overview](../xdm_system/xdm_system_in_experience_platform.md) for more information.

## Planning your schema

The first step in building a schema is to determine the concept, or real-world object, that you are trying to capture within the schema. Once you identify the concept you are trying to describe, you can begin planning your schema by thinking about things like the type of data, potential identity fields, and how the schema may evolve in the future.

### Data behaviors in Experience Platform

Data intended for use in Experience Platform is grouped into two behavior types:

* **Record data**: Provides information about the attributes of a subject. A subject could be an organization or an individual.
* **Time series data**: Provides a snapshot of the system at the time an action was taken either directly or indirectly by a record subject.

All XDM schemas describe data that can be categorized as record or time series. The data behavior of a schema is defined by the schema's **class**, which is assigned to a schema when it is first created. XDM classes are described in further detail later in this document.

Both record and time series schemas contain a map of identities (`xdm:identityMap`). This field contains the identity representation of a subject, drawn from fields marked as "Identity" as described in the next section.

### Identity

Schemas are used for ingesting data into Experience Platform. This data can be used across multiple services to create a single, unified view of an individual entity. Therefore, it is important when thinking about schemas to think about "Identity" and which fields can be used to identify a subject regardless of where the data may be coming from. 

To help with this process, key fields can be marked as "Identity". Upon data ingestion, the data in those fields will be inserted into the "Identity Graph" for that individual. The graph data can then be accessed by [Real-time Customer Profile](../../unified_profile_architectural_overview/unified_profile_architectural_overview.md) and other Experience Platform services to provide a stitched-together view of each individual customer.

Fields that are commonly marked as "Identity" include: email address, phone number, [Experience Cloud ID (ECID)](https://marketing.adobe.com/resources/help/en_US/mcvid/), CRM ID, or other unique ID fields. You should also consider any unique identifiers specific to your organization, as they may be good "Identity" fields as well.

It is important to think about customer identities during the schema planning phase in order to help ensure data is being brought together to build the most robust profile possible. See the [Identity Service overview](../../identity_services_architectural_overview/identity_services_architectural_overview.md) to learn more about how identity information can help you deliver digital experiences to your customers.

### Schema evolution principles

As the nature of digital experiences continues to evolve, so must the schemas used to represent them. A well-designed schema is therefore able to adapt and evolve as needed, without causing destructive changes to previous versions of the schema.

Since maintaining backwards compatibility is crucial for schema evolution, Experience Platform enforces a purely additive versioning principle to ensure that any revisions to the schema only result in non-destructive updates and changes. In other words, **breaking changes are not supported.**

|Supported changes | Breaking changes (Not supported)|
|------------------------------------|---------------------------------|
|<ul><li>Adding new fields to an existing schema</li><li>Making a mandatory field optional</li></ul>|<ul><li>Removing previously defined fields</li><li>Introducing new mandatory fields</li><li>Renaming or redefining existing fields</li><li>Removing or restricting previously supported field values</li><li>Moving attributes to a different location in the tree</li></ul>|

> **Note:** If a schema has not yet been used to ingest data into Experience Platform, you may introduce a breaking change to that schema. However, once the schema has been used in Platform, it must adhere to the additive versioning policy.

### Schemas and data ingestion

In order to ingest data into Experience Platform, a dataset must first be created. Datasets are the building blocks for data transformation and tracking for [Catalog Service](../../catalog_architectural_overview/catalog_architectural_overview.md), and generally represent tables or files that contain ingested data. All datasets are based on existing XDM schemas, which provide constraints for what the ingested data should contain and how it should be structured. See the [Adobe Experience Platform Data Ingestion documentation](https://www.adobe.io/apis/experienceplatform/home/data-ingestion.html) for more information.

## Building blocks of a schema

Experience Platform uses a composition approach in which standard building blocks are combined to create schemas. This approach promotes the reusability of existing components and drives standardization across the industry to support vendor schemas and components in Platform.

Schemas are composed using the following formula:

**Class + Mixin&ast; = XDM Schema**

&ast;A schema is composed of a class and _zero or more_ mixins. This means that you could compose a dataset schema without using mixins at all.

### Class

Composing a schema begins by assigning a class. Classes define the behavioral aspects of the data the schema will contain (record or time-series). In addition to this, classes describe the smallest number of common properties that all schemas based on that class would need to include and provide a way for multiple compatible datasets to be merged. 

A class also determines which mixins will be eligible for use in the schema. This is discussed in more detail in the [mixin](#mixin) section that follows. 

There are standard classes provided with every integration of Experience Platform, known as "Industry" classes. Industry classes are generally accepted industry standards that apply to a broad set of use cases. Examples of Industry classes include the XDM Individual Profile and XDM ExperienceEvent classes provided by Adobe. 

Experience Platform also allows for "Vendor" classes, which are classes defined by Experience Platform partners and made available to all customers who use that vendor service or application within Platform. 

There are also classes used to describe more specific use cases for individual organizations within Platform, called "Customer" classes. Customer classes are defined by an organization when there are no Industry or Vendor classes available to describe a unique use case. 

For example, a schema representing members of a Loyalty program describes record data about an individual and therefore can be based on the XDM Individual Profile class, a standard Industry class defined by Adobe.

### Mixin

A mixin is a reusable component that defines one or more fields that implement certain functions such as personal details, hotel preferences, or address. Mixins are intended to be included as part of a schema that implements a compatible class. 

Mixins define which class(es) they are compatible with based on the behavior of the data they represent (record or time series). This means that not all mixins are available for use with all classes.

Mixins have the same scope and definition as classes: there are Industry mixins, Vendor mixins, and Customer mixins that are defined by individual organizations using Platform. Experience Platform includes many standard Industry mixins while also allowing vendors to define mixins for their users, and individual users to define mixins for their own specific concepts. 

For example, to capture details such as "First Name" and "Home Address" for your "Loyalty Members" schema, you would be able to use standard mixins that define those common concepts. However, concepts that are specific to less-common use cases (such as "Loyalty Program Level") often do not have a pre-defined mixin. In this case, you must define your own mixin to capture this information.

Remember that schemas are composed of "zero or more" mixins, so this means that you could compose a valid schema without using any mixins at all.

### Data type

Data types are used as reference field types in classes or schemas in the same way as basic literal fields. The key difference is that data types can define multiple sub-fields. Similar to a mixin, a data type allows for the consistent use of a multi-field structure, but has more flexibility than a mixin because a data type can be included anywhere in a schema by adding it as the "data type" of a field. 

Experience Platform provides a number of common data types as part of the Schema Registry to support the use of standard patterns for describing common data structures. This is explained in more detail in the Schema Registry tutorials, where it will become more clear as you walk through the steps to define data types.

### Field

A field is the most basic building block of a schema. Fields provide constraints regarding the type of data they can contain by defining a specific data type. These basic data types define a single field, whereas the [data types](#data-type) previously mentioned allow you to define multiple sub-fields and re-use the same multi-field structure throughout various schemas. So, in addition to defining a field's "data type" as one of the data types defined in the registry, Experience Platform supports basic scalar types such as:

- String
- Integer
- Number
- Boolean
- Array
- Object

The valid ranges of these scalar types can be further constrained to certain patterns, formats, minimums/maximums, or pre-defined values. Using these constraints, a wide range of more specific field types can be represented, including:

- Enum
- Long
- Short
- Byte
- Date
- Date-time
- Map

> **Note:** The "map" field type allows for key-value pair data, including multiple values for a single key. Maps can only be defined at the system level, meaning you may encounter a map in an industry or vendor-defined schema, but it is not available for use in fields you define. The [Schema Registry API developer guide](../schema_registry_developer_guide.md) contains more information on defining field types.

Some data operations used by downstream services and applications enforce constraints on specific field types. Affected services include, but are not limited to:

* [Real-time Customer Profile](../../unified_profile_architectural_overview/unified_profile_architectural_overview.md)
* [Identity Service](../../identity_services_architectural_overview/identity_services_architectural_overview.md)
* [Segmentation](../../../../../../end-user/markdown/segmentation_overview/segmentation.md)
* [Query Service](../../../../../../end-user/markdown/query-service/qs-intro.md)
* [Data Science Workspace](../../data_science_workspace_overview/dsw_overview.md)

Before creating a schema for use in downstream services, please review the appropriate documentation for those services in order to better understand the field requirements and constraints for the data operations the schema is intended for.

### XDM fields

In addition to basic fields and the ability to define your own data types, XDM provides a standard set of fields and data types that are implicitly understood by Experience Platform services and provide greater consistency when used across Platform components.

These fields, such as "First Name" and "Email Address" contain added connotations beyond basic scalar field types, telling Platform that any fields sharing the same XDM data type will behave in the same way. This behavior can be trusted to be consistent regardless of where the data is coming from, or in which Platform service the data is being used.

See the [XDM field dictionary](xdm_field_dictionary.md) for a complete list of available XDM fields. It is recommended to use XDM fields and data types wherever possible to support consistency and standardization across Experience Platform.

## Composition example

Schemas represent the format and structure of data that will be ingested into Platform, and are built using a composition model. As previously mentioned, these schemas are composed of a class and zero or more mixins that are compatible with that class.

For example, a schema describing purchases made at a retail store might be called "Store Transactions". The schema implements the XDM ExperienceEvent class combined with the standard Commerce mixin and a user-defined Product Info mixin. 

Another schema which tracks website traffic might be called "Web Visits". It also implements the XDM ExperienceEvent class, but this time combines the standard Web mixin.

The diagram below shows these schemas and the fields contributed by each mixin. It also contains two schemas based on the XDM Individual Profile class, including the "Loyalty Members" schema mentioned previously in this guide.

![](images/schema_composition.png)

### Union

While Experience Platform allows you to compose schemas for particular use cases, it also allows you to see a "union" of schemas for a specific class type. The previous diagram shows two schemas based on the XDM ExperienceEvent class and two schemas based on XDM Individual Profile class. The union, shown below, aggregates the fields of all schemas that share the same class (XDM ExperienceEvent and XDM Individual Profile, respectively). 

![](images/union_schema.png)

By enabling a schema for use with Real-time Customer Profile, it will be included in the union for that class type. Profile delivers robust, centralized profiles of customer attributes as well as a timestamped account of every event that customer has had across any system integrated with Platform. Profile uses the union view to represent this data and provide a holistic view of each individual customer.

For more information on working with Profile, see the [Real-time Customer Profile overview](../../unified_profile_architectural_overview/unified_profile_architectural_overview.md).

## Mapping datafiles to XDM schemas

All datafiles that are ingested into Experience Platform must conform to the structure of an XDM schema. For more information on how to format datafiles to comply with XDM hierarchies (including sample files), see the document on [sample ETL transformations](../../../integration_guides/etl_integration_guide/etl_transformation.md). For general information about ingesting datafiles into Experience Platform, see the [batch ingestion overview](../../ingest_architectural_overview/ingest_architectural_overview.md).

## Next steps

Now that you understand the basics of schema composition, you are ready to begin building schemas using the Schema Registry.

The Schema Registry is used to access the Schema Library within Adobe Experience Platform, and provides a user interface and RESTful API from which all available library resources are accessible. The Schema Library contains Industry resources defined by Adobe, Vendor resources defined by Experience Platform partners, and classes, mixins, data types, and schemas that have been composed by members of your organization.

To begin composing schema using the UI, follow along with the [Schema Editor tutorial](../../../tutorials/schema_editor_tutorial/schema_editor_tutorial.md) to build the "Loyalty Members" schema mentioned throughout this document.

To begin using the Schema Registry API, start by reading the [Schema Registry API developer guide](../schema_registry_developer_guide.md). After reading the developer guide, follow the steps outlined in the tutorial on [creating a schema using the Schema Registry API](../../../tutorials/schema_registry_api_tutorial/schema_registry_api_tutorial.md).