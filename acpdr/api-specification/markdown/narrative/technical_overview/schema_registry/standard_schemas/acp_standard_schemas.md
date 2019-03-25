# Using Standard Schemas in Adobe Experience Platform

## Overview

In order to gain insights from data, we need to ensure that similar data is consistently defined in the same way. When data definitions are consistent, this removes the need for translation and improves the interoperability of data across systems.

To gain consistency in data definitions, Adobe Experience Platform uses standard schemas across its many services. This document provides an overview of how standard schemas are used across Experience Platform, including:

- How different Platform components utilize standard schemas
- The Schema Library and key standard schemas
- The Schema Registry and its role within Platform
- The Data Model workspace and how to view, extend, and create schemas

## Adobe Experience Platform Components and Use of Schema

Adobe Experience Platform is schema agnostic, meaning that any schema that conforms to the standard can be used across Platform. Examples of standard schemas include those defined by Adobe as part of Experience Data Model (XDM), as well as Common Data Model (CDM) schemas published by Microsoft. Standard schemas are also supplied by other Platform partners and you can create your own by mixing and matching available schemas or by defining new schemas.

Standard schemas are available for use by all Experience Platform services, such as Data Catalog, Unified Profile Service, and Unified Segmentation, each of which is outlined below.

### Experience Data Lake & Data Catalog

Adobe Experience Platform contains a central Data Catalog of assets and their related schemas. The Experience Data Lake (XDL) is highly granular, storing all of your data managed by Platform, regardless of origin or file format.

To ingest data into Adobe Experience Platform, a dataset is created which references a target schema, providing constraints to how the data should look. If the dataset is created without a target schema, Experience Platform will derive an observed schema through the inspection of fields and field types.

The datasets are then tracked in the data catalog and stored alongside their target and observed schemas. The catalog provides the ability for you to discover datasets, as well as understand the formats and storage locations of the datasets, dependencies, lineage, etc.

### Unified Profile Service

Unified Profile Service (UPS) in Adobe Experience Platform provides a unified, 360° customer profile for each individual in your entire user base. It contains data that is aggregated across all systems, as well as actionable timestamped accounts of events involving the individual, in any of your systems that have been ingested into Experience Platform.

UPS consumes schema formatted data, preferably in the form of Profile and ExperienceEvent, and responds to queries that can span record (profile) and event (time series) data. The Profile Service maintains a single record of each profile, merging data together to form a "single source of truth" for each individual.

#### Difference between data in XDL and UPS

Experience Data Lake (XDL) and Unified Profile Service (UPS) are both examples of datastores, but each has its own objective.

XDL is very granular and contains all information that has ever been collected. This includes data that you may not have a use for today, but that you may discover value for using in the future.

UPS provides an aggregation of subject data, merging it together to create a single view of each individual in your user base. This information is therefore not as granular, and may lose fidelity over time as it is updated and merged together.

### Unified Segmentation

Unified Segmentation uses fields from the Profile standard schema (such as "age", "region", "gender") to query profiles and create an audience based on the segment definition. 

These audiences, or subsets, of customers are based on shared characteristics and allow you to target them with different messaging, offers, or solutions. Segment definitions can be stored and queried using the Unified Profile Service in order to generate audiences.

## Schema Library

The Schema Library contains all of the standard schemas that are available within Platform. This includes schemas curated by Adobe (Experience Data Model), as well as those provided by Experience Platform partners and defined by your own organization.

### Key Experience Data Model (XDM) Schemas

Principal schemas for Adobe Experience Platform can be grouped into two different behavior types: Time Series and Record.

Time Series data provides a snapshot of the system at the time an action was taken either directly or indirectly by a subject. ExperienceEvent is one example of a Time Series schema, but you can also define your own within Experience Platform. We recommend using ExperienceEvent, as it is the preferred schema to express Time Series data in Adobe Experience Platform.

Record data provides information about attributes of a subject. This could be an organization or individual, and represents the state. The Profile schema is an example of a Record schema, but not the only one. It is preferred schema for consumer record data in Experience Platform.

Record schemas and Time Series schemas can contain one or more identity fields. Identity fields contain the identity representation of the subject, such as a CRM identifier, Experience Cloud ID (ECID), browser cookie, AdvertisingId, or other IDs in different domains.

The ExperienceEvent and Profile schemas are outlined in more detail below.

#### ExperienceEvent

The ExperienceEvent Standard Schema is used to capture the state when a set of events occurred, including the point in time and identity of the subject involved. Experience Events are fact records of what occurred, thus they are immutable and represent what happened without aggregation or interpretation. They are critical for time-domain analytics as they allow for observation and analysis of changes that occur in a given window of time and the comparison between multiple windows of time to track trends.

Experience Events can be either explicit or implicit. Explicit events are directly observable human actions taking place during a point in a journey. Implicit events are events that are raised without a direct human action, but still relate to an individual. Examples of implicit events are the scheduled sending of email newsletters, battery voltage reaching a certain threshold, or a settling credit card.

While not all events are easily categorized across all data sources, it is extremely valuable to harmonize similar events into similar types where possible for processing. 

![ExperienceEvent Customer Journey](ExperienceEvent_customer_journey.png "ExperienceEvents show a customer journey over time")

#### Profile

The Profile schema is a single representation of the attributes of both identified and partially-identified subjects. Profiles that are highly identified may be used for personal communications or targeted engagements, and can contain detailed personal information such as name, gender, date of birth, location, and contact information like phone number and email address. 

Less-identified profiles may consist of only anonymous behavioral signals, such as browser cookies. In that case, the sparse profile data is used to build an information base into which the interests and preferences of the anonymous profile are collated and stored (by the Unified Profile Service). These identifiers may become more detailed over time as the subject signs up for notifications, subscriptions, purchases, etc. This increase in profile attributes may eventually result in an identified subject and allow for a higher degree of targeted engagement. 

## Schema Registry

The Schema Registry is used to access the Schema Library, providing a user interface (the Data Model workspace, outlined below) and a RESTful API from which all available schemas are discoverable.

Using API calls and/or the Data Model workspace, you are able to view, manage, and extend all schemas made available to you by Adobe, Experience Platform partners, and vendors whose applications you use. The Schema Registry also allows you to create and manage new schemas through both the API and user interface.

For more information on using the Schema Registry API, see the [Adobe Experience Platform: Schema Registry Development Guide](../acp_schema_registry.md).

## Data Model Workspace

The Data Model workspace provides a visualization of the Schema Library allowing you to view all of the schemas available to you, as well as perform Schema Registry actions such as extending an existing schema and creating a new one. 

Once you log in to Adobe Experience Platform, click on Data Model in the top navigation and you will be taken to the Data Model workspace. You will then see a list of schemas, aka the Schema Library, where you can view, manage, and extend all available schemas as required.

![Schema Library in the Data Model Workspace](DataModelWorkspace.png "View the Schema Library within the Data Model Workspace")

### Viewing a Schema

Viewing a schema from within the Schema Library is as simple as clicking on the schema name in the Data Model workspace. Once clicked, the schema will be displayed in the workspace on the right, including all of the fields and field types.

A Field containing a reference to another schema (for example, "person") will display a Type consisting of the name of the schema on which it is based ("Person"). In the example below, the fields homeAddress and workAddress both have a field type of Address because they are both referencing the standard schema, Address.

Mousing over a schema will display a blue line showing the relationship between that schema and others it references. For example, the Person reference schema has a field called "name" with a type "Person Name"; the blue line from Profile to Person, and from Person to Person Name, highlights the references being made between them.

![Navigating a Schema](NavigatingSchema.png "Navigating the Profile Schema")

### Creating a New Schema

From the Data Model Workspace, clicking the Create Schema button will open the Add Schema dialog and allow you to begin defining a new schema. 

![Create a New Schema](NewSchema.png "Add Schema dialog opens")

Best practices for completing the Add Schema dialog include:
- **Name** - Use all lowercase without spaces (`/_customer/default/newschemaname`)
- **Display Name** - Capitalize each word, also known as "Title Case" (`New Schema Name`)
- **Description** - Include a description that is detailed enough that a new user could understand the meaning and intention behind the schema.

**UI vs API:** When defining a schema in the UI, you will be directed to create your schema within the `_customer/default` extension. The API provides functionality for defining your own extension names, allowing you to define schemas for different departments, teams, etc. within your organization (such as defining schema for "retail" and "web" teams). Schemas defined in this way in the API appear alongside all other schema in the UI, with no discernible difference between them. 

If you require better control over extension names, we recommend using the API when defining schemas. Steps on how to define schemas with specific extensions can be found in the [Adobe Experience Platform: Schema Registry Development Guide](../acp_schema_registry.md).

![Buyer schema](Buyer_schema.png "The new Buyer schema in the Data Model workspace")

Once you complete the Add Schema dialog, your new schema will open in the workspace. You will notice a colored strip on the left side of the schema box indicating it is a Custom schema. The list of fields will be blank, but you can use the plus sign (+) to add new fields and references.

### Adding a Field

In the [Schema Design Principles and Best Practices](../schema_design/schema_principles.md) example, we created a custom Buyer schema with several fields.

To add a field to the Buyer schema, click the plus sign (+) next to FIELDS to open the Add Field dialog.

![Add Company Name field to Buyer](CompanyName.png "Add Field dialog opens to add Company Name field to Buyer schema")

The Buyer schema will now have a field named "companyName" with type "string".

![Buyer schema with Company Name](Buyer_Company_Name.png)

### Adding a Reference to a Reference Schema

The [Schema Design Principles and Best Practices](../schema_design/schema_principles.md) example also included our Buyer schema referencing Person and several other reference schemas. 

To use reference schemas in the Data Model workspace, click the plus sign next to fields to open the Add Field dialog again. Using the Field Type dropdown, select "Schema" and search the Schema dropdown by typing "person" to select the Person standard schema. 

![Adding a Field](ReferencePerson.png "Use Add Field dialog to add a Reference to the Person Schema")

Once added, you will see a new field under Buyer named "person" with a type "Person" (Remember, if the Field references a schema, its Type is the name of the reference schema). The Person schema is now displayed in the workspace, along with a reference to Person Name, as the Person Name schema is referenced within Person.

![Adding Reference Schema](Buyer_reference_Person.png "Buyer schema now contains a reference to Person")

Using the same steps as above, you can now add references to the Phone Number, Email Address, and Address reference schemas. 

![Buyer schema with multiple reference schemas](Buyer_with_references.png "The Buyer schema now references multiple reference schema")

> **Note:** The Person schema has been minimized (you can minimize a schema by clicking on the schema name) in order to show the other reference schemas.

### Extensibility

A wide assortment of standard schemas are available to you within Platform, but there will be times when you need to express non-standard data unique to your organization. In order to accommodate this need, library schemas are extensible, meaning that you can add custom fields for personalized data.

These extended fields are injected into the base schema, allowing any application that can consume the original schema to be able to understand the new, extended schema.

#### When to Create a New Schema vs When to Extend an Existing Library Schema

Occasionally you may find that it is better to define a new schema rather than extend an existing one. Below is a table outlining basic guidelines for when to extend an existing library schema vs when to create a new schema. 

|Extend Library Schema|Create New Schema|
|---------------------|--------------------|
|Add a field for a specific use case| Define a concept to be reused across multiple schemas|
|Existing schema maintains its meaning after extension| Extension changes the meaning of the schema or negates current usage of existing schema|
|Add a few new fields to define custom data | Extend a majority of fields in existing schema|
|Continue to use majority of existing schema fields| Use only part of existing schema and the fields you are using have less value in overall definition|

### Extending a Schema

The [Schema Design Principles](../schema_design/schema_principles.md) example also involved extending the Person schema to include a custom "Interests" field. 

To do this, click the plus sign under Person to add a new field. Since the Interests field will contain a list of interests, also known as an array of strings, you will need to select the Field Type "String" and check the box next to Array.

![Adding an Array of Interests](ArrayOfInterests.png)

You will now see the Interests field under Person with a type of "String[]", indicating an array of strings. There is also a dot next to the field name, denoting that it is an extension.

![Extending Person with Interests Array](Person_Interests_Extension.png)

Once you click the Save button to save your new Buyer schema, you will be able to use it within Adobe Experience Platform as you would any other schema.

You have now successfully extended an existing schema and defined a new schema to represent your specific use case. From here, you can use schemas to define datasets and datastreams using Data Catalog, and start loading data into these schemas.