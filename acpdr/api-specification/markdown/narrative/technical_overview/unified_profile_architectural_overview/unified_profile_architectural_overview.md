# Unified Profile in Adobe Experience Platform

Unified Profile in Adobe Experience Platform provides a unified, real-time consumer profile that enables marketers to drive coordinated, consistent and relevant experiences with their audiences across channels. With Unified Profile, you have one place to go to get a holistic view of your consumer base aggregated across all systems, as well as actionable timestamped account of every event they've had in any of your systems, when you need it.

This overview describes the role and use of Unified Profile. In specific:

[Understanding Unified Profile](#understanding-unified-profile) - See the big picture about Unified Profile and its role on Experience Platform.  
[The union view](#the-unified-profile) - Understand the components involved in unifying profile data to build the union view, how to control the parameters involved, and the composition of the union view schema.   
[The real time profile](#the-real-time-profile) - See how Unified Profile's real time segmentation can work for you.  
[Data governance](#data-governance) - Learn how you can use DULE and certain Unified Profile access parameters to ensure reliable compliance with any data usage restrictions and policies that govern your consumers' data.  
[Getting data to Unified Profile](#getting-data-to-unified-profile) - The power of Unified Profile and Identity Service to build the union view depends on the data you supply.  
[Creating audience segments](#creating-audience-segments) - Learn how to build audience segments which are used across Platform solutions, and can be used by your integrations as well.

## Understanding Unified Profile

Unified Profile is a generic lookup entity store that merges data across various enterprise data assets and provides access to that data in the form of unified consumer profiles, and related time series events. Though Unified Profile ingests data from Catalog Batch Ingestion and uses Identity Service for alternate mapped identities to merge related data, it maintains its own data in the profile store. In other words, the profile store is separate from Catalog data (Data Lake), and separate from Identity Service data (identity graph).

Unified Profile helps to inform and empower actions across channels, Platform, and Adobe solution integrations. Furthermore, Unified Profile is used to power machine learning & Sensei. Unified Profile APIs can also be used directly to enrich the functionality of third-party solutions, CRMs, and proprietary solutions.

![Unified Profile In Action](unified-profile.png)

Unified Profile's relationship with these and other solutions is highlighted in this overview. 

---

## The profile

A profile is a representation of a subject, an organization or an individual, also referred to as record data. The profile of a product may include a SKU and description, whereas the profile of a person contains information like first name, last name, and email address. On Experience Platform, these types of data are built per your agenda. The XDM Profile standard schema, the preferred schema to implement when describing consumer record data, supplies the data integral to supporting the interaction of many Platform solutions. In specific, it contains:

* Time series events
* Identities
* Segment memberships

### Time series events

Time series data provides a snapshot of the system at the time an action was taken either directly or indirectly by a subject, as well as data detailing the event itself. Represented by the standard XDM schema ExperienceEvent, time series data can describe items being added to a cart, link clicks, video views, etc.

Time series data can be used to base segmentation rules, and events can be accessed individually in the context of a profile.

To learn more about using ExperienceEvent data for segmentation using the Platform UI, visit the documentation on [Segment Builder](../../../../../end-user/markdown/segmentation_overview/segmentation.md). For segmentation using the API, visit [Creating segments in Experience Platform via API](../../tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md).

### Identities

Within a particular identity map, identities are linked when multiple identities are sent together in a single record. These identities are considered shared for a profile and can be accessed when retrieving the profile. 

Identity Service manages identity maps. You can learn more by visiting the [Identity Service overview](../identity_services_architectural_overview/identity_services_architectural_overview.md).

### Segment memberships

When a segmentation job is run, qualifying profiles are amended, adding the segment to their list of segment memberships. Segment memberships (field `segments`) is not a standard field of XDM Profiles, but are a mixin added to your schema when that schema has been enabled for Unified Profile, including it in the union.

To learn more about using segmentation using the Platform UI, visit the documentation on [Segment Builder](../../../../../end-user/markdown/segmentation_overview/segmentation.md). For segmentation using the API, visit [Creating segments in Experience Platform via API](../../tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md).

A discussion on enabling schemas for the union view can be found [below](#union-schema).

### Profile fragments

An individual as it exists in a single dataset is considered a "profile fragment". This is fitting, as it is only a fragment of the total potential data you could have for that individual. When Unified Profile is used to access an entity, it can supply you with a merged view of all profile fragments for that entity across datasets, referred to as the union view.

---

## The union view

One of the key features of Unified Profile is the ability to unify multi-channel data. Unified Profile can supply you with a merged view of the individuals in your consumer base, across datasets and for linked identities, referred to as the union view. 

Profile merging occurs on data access in Unified Profile, more specifically when accessing a profile by identity or segment export. There are several considerations to factor when merging profile data: 

* Which datasets to include in the union view
* Which data wins in the event of a data conflict - where merged datasets report different values for the same attribute
* Regulations, contractual obligations, and corporate policies that apply to your consumer data
* Whether to include data under linked identities, and which identity map to use

Much of the options around these aspects are controlled by merge policies.

### Merge policies

A merge policy is a set of configurations controlling aspects of identity stitching and data fragment merging. Merge policies are specific to a single schema, and can only be used to access entities adhering to that schema. Merge policies are private to an organization and, though there may be several for a single schema, there can only be one default for each schema.

Using Unified Profile to access data, you are presented with the option of specifying the merge policy by which to govern the data to retrieve. Platform provides a default merge policy for any XDM schema, or you can create a merge policy and mark it as your organization's default for a schema. If no merge policy is defined, and the schema or related schema to retrieve is "_xdm.context.profile", Unified Profile fetches and merges all data fragments for all related identities.

Merge policies are used to control variables of:

* Identity stitching - Merge policies include configurations for choosing which identity graph, if any, to fetch linked identities for which to merge data.
* Attribute merging - Data conflicts require an access-time rule to follow for resolution. This is provided as an attribute merge type in merge policies.

For information on working with merge policies, see the tutorial [Configuring Unified Profile via API](../../tutorials/configuring_up_tutorial/configuring_up_tutorial.md).

### Identity stitching

Unified Profile uses [Identity Service](../identity_services_architectural_overview/identity_services_architectural_overview.md) to get linked identities for each individual. In merge policies, you specify which (if any) identity graph to use, where profile fragments for associated identities are merged with the individual's union view.

### Attribute merging

When multiple profile fragments are being merged that contain the same data elements, data conflicts will arise. Merge policies can be used to tune prioritization of your data by allowing you to specify the order of data precedence by dataset or timestamp. 

![](merging-across-datasets.png)

### Union schema

A union schema is one that has been enabled for Unified Profile. The union view schema is an aggregate of the union schemas merged to form the union view. A union schema can be viewed on Adobe Experience Platform by selecting it from those listed on the  "Union Schemas" page.

![](unified-profile-schema.png)

For more information on working with the schema editor, which enables you to enable a schema for union using the UI, visit the [Basics of schema composition](../../technical_overview/schema_registry/schema_composition/schema_composition.md#union). 
For direction on how to enable a schema via API, see [Schema Registry API developer guide](../../technical_overview/schema_registry/schema_registry_developer_guide.md#unified-profile). 

---

## The real-time profile

Unified Profile ingests data delivered using real time data inlets, updating the profile store with data conforming to an XDM schema enabled for Unified Profile. Additionally, Unified Profile checks post-ingest profiles and time series data as having included or excluded them from segments. A profile qualifying for the "Abandoned cart" segment would be immediately disqualified from the segment, discontinuing display of targeted content, the instant he clicks the "Confirm checkout" button.

For more, start with the [Streaming Ingestion overview](..\streaming_ingest\streaming_ingest_overview.md).

---

## Data governance 

Data governance is a series of strategies and technologies used to manage customer data and ensure compliance with regulations, restrictions, and policies applicable to data use. As it relates to accessing data, it plays a key role within Experience Platform at various levels, including data usage labeling, data access policies, and access control on data for marketing actions.

Data governance is managed at several points, from deciding what data to add to Platform to what specific data fields to retrieve on accessing that data as well as from what datasets. 

### Data Usage Labeling and Enforcement (DULE)

Data Usage Labeling and Enforcement (DULE) is a means to control how fields are used from the schema level using usage labels. Usage labels categorize data that falls into the following:

* __Contractual data__ - Used to indicate data that is controlled by contractual obligations, including that the data cannot be exported to a 3rd party or that it isn't permissible for use in data science workflows.
* __Identity data__ - Indicates data that could be used to identify or contact a person. These labels indicate whether data can directly or indirectly identify a person.
* __Sensitive data__ - These labels categorize sensitive geographic data.

For more information on usage labeling, start with the [Data Usage Labeling and Enforcement (DULE) User Guide](https://www.adobe.io/apis/experienceplatform/home/dule/duleservices.html).

### Dataset selection

Using merge policies, you are able to indicate what datasets to include where a merge would occur; during segmentation, access, and segment export. Any datasets not included would not be merged into the union view. This method can be used to exclude data from datasets that are restricted from being used for the reason for which the data is being accessed.

### Field selection

Unified Profile supports redacted data responses <!-- or do we call this something else? Subset? -->, meaning that rather than retrieve entire profiles, you are able to indicate which fields to return. In this way, you are able to reduce your result sets to only the fields required for your purpose.

---

## Getting data to Unified Profile

Platform provides tools that you can use to send your record and time series data to Unified Profile, supporting real time streaming ingestion and batch ingestion. 

> **Note:** All data collected through Adobe solutions, including Analytics Cloud, Marketing Cloud, and Advertising Cloud, flows into Experience Platform and is ingested into Unified Profile. <!-- ? --> 

![](up-in-adobe-experience-platform.png)

See the tutorial [Adding data to Unified Profile](../ingest_architectural_overview/ingest_architectural_overview.md) for more details.

---


## Creating audience segments

The cornerstone of your marketing campaign is your audience. Unified Profile provides the tools for segmenting your customer base into audiences consisting of members meeting criteria with exactly the precision you require. With segmentation, you can isolate members of your user base by criteria such as:

* Users for whom one week has passed since last making a purchase
* Users for whom the sum of the purchases is greater than $10,000
* Users who have seen a campaign and then clicked on it within 30 minutes, for any 3 of a list of campaigns specified by their Campaign ID

For step by step instructions to create and work with segmentation using the API, see the tutorial [Creating Segments in Experience Platform](../../tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md).

For information on working with segmentation using the Adobe Experience Platform UI, visit [Segment Builder](../../../../../end-user/markdown/segmentation_overview/segmentation.md).


