# XDM System in Adobe Experience Platform

Standardization and interoperability are key concepts behind Experience Platform. Experience Data Model (XDM), driven by Adobe, is an effort to standardize customer experience data and define schemas for customer experience management. 

XDM is a publicly documented specification designed to improve the power of digital experiences. It provides common structures and definitions for any application to use to communicate with services on Adobe Experience Platform. By adhering to XDM standards, all customer experience data can be incorporated into a common representation delivering insights in a faster, more integrated way. You can gain valuable insights from customer actions, define customer audiences through segments, and express customer attributes for personalization purposes.

XDM is the fuel that allows Experience Cloud, powered by Adobe Experience Platform, to deliver the right message to the right person, on the right channel, at exactly the right moment.

The methodology on which Experience Platform is built, XDM System, operationalizes Experience Data Model schemas for use by Experience Platform components.

This document provides an overview of the role of schemas within Experience Platform, including:

* [Data behaviors in Experience Platform](#data-behaviors-in-experience-platform)
* The use of schema by Platform Components:
  * [Schema Registry](#schema-registry)
  * [Catalog & Experience Data Lake](#catalog--experience-data-lake)
  * [Query Service](#query-service)
  * [Data Science Workspace](#data-science-workspace)
  * [Unified Profile Service](#unified-profile-service)

## Data behaviors in Experience Platform

Data intended for use in Experience Platform is grouped into two behavior types: Record and Time Series.

Record data provides information about attributes of a subject. The subject could be an organization or individual. The XDM Profile class is an example of a record data-based class that a schema may implement, but not the only one. You are able to define your own classes within Experience Platform, however, XDM Profile is the preferred class for schemas to implement when describing consumer record data.

Time series data provides a snapshot of the system at the time an action was taken either directly or indirectly by a subject. XDM ExperienceEvent is one example of a time series data-based class that a schema may implement, but you can also define your own within Experience Platform. It is recommended that you use XDM ExperienceEvent, as it is the preferred class to express time series data in Adobe Experience Platform.

Record data schemas and time series data schemas may also contain one or more identity fields. Identity fields stitch together to form a single identity representation of a subject and include information such as a CRM identifier, Experience Cloud ID (ECID), browser cookie, AdvertisingId, or other IDs in different domains. See the Unified Profile Service section later in this document for more information.

XDM Profile and XDM ExperienceEvent classes are outlined in more detail below.

### XDM Profile

XDM Profile forms a singular representation of the attributes of both identified and partially-identified subjects. Profiles that are highly identified may be used for personal communications or targeted engagements, and can contain detailed personal information such as name, gender, date of birth, location, and contact information including phone numbers and email addresses. 

Less-identified profiles may consist of only anonymous behavioral signals, such as browser cookies. In this case, the sparse profile data is used to build an information base into which the interests and preferences of the anonymous profile are collated and stored. These identifiers may become more detailed over time as the subject signs up for notifications, subscriptions, purchases, etc. This increase in profile attributes may eventually result in an identified subject and allow for a higher degree of targeted engagement. 

As a consumer profile continues to grow, it becomes a robust repository of personal information, identification information, contact details, and communication preferences for an individual.

### XDM ExperienceEvent

XDM ExperienceEvent is used to capture the state when a set of events occurred, including the point in time and identity of the subject involved. Experience Events are fact records of what occurred, thus they are immutable and represent what happened without aggregation or interpretation. They are critical for time-domain analytics as they allow for observation and analysis of changes that occur in a given window of time and the comparison between multiple windows of time to track trends.

Experience Events can be either explicit or implicit. Explicit events are directly observable human actions taking place during a point in a journey. Implicit events are events that are raised without a direct human action, but still relate to an individual. Examples of implicit events are the scheduled sending of email newsletters, battery voltage reaching a certain threshold, or a settling credit card.

While not all events are easily categorized across all data sources, it is extremely valuable to harmonize similar events into similar types where possible for processing. 

![ExperienceEvent Customer Journey](images/ExperienceEvent-customer-journey.png "Experience Events show a customer journey over time")

## Experience Platform components and use of schema

Adobe Experience Platform is schema agnostic, meaning that any schema that conforms to the XDM standard is available for use by Experience Platform components. The ways in which various Platform services (such as Catalog, Unified Profile, and Segmentation) use schemas are outlined in more detail below.

### Schema Registry

The Schema Registry provides a user interface and RESTful API from which you can view and manage all schema-related resources in the Adobe Experience Platform Schema Library. The Schema Library contains resources made available to you by Adobe, Experience Platform partners, and vendors whose applications you use. The Schema Registry UI and API can also be used to create and manage new schemas and resources that are unique to your organization.

Experience Platform uses schemas to describe the structure of data in a consistent and reusable way. Schemas are designed with reusability in mind. By defining data consistently across systems, it becomes easier to retain meaning and therefore gain value from data. Schemas consist of a base class, zero or more mixins, and fields to represent the data.

Before data arrives in Platform, a schema is composed to describe the data that will be ingested and provide constraints to the type of data that can be contained within each field.

For more information on the schema composition model, including design principles and best practices, read the [Basics of Schema Composition](../schema_composition/schema_composition.md).

### Catalog & Experience Data Lake

Adobe Experience Platform contains a central Catalog of assets and their related schemas. Catalog is not the actual files or directories containing data, rather it holds the metadata and descriptions of those files and directories. Simply put, Catalog acts as a metadata store or "catalog" where you can find information about your data within Experience Platform and acts as the system of record for data location, lineage, schema definition, and usage labeling.

Catalog data is stored in the Experience Data Lake (XDL), a highly granular data store containing all data managed by Platform, regardless of origin or file format. 

To begin ingesting data into Experience Platform, a dataset is created via the UI or Catalog Service API. The dataset references a schema describing the structure of the data to be ingested. If a dataset is created without a schema, Experience Platform will derive an "observed schema" through the inspection of fields and field types during ingestion. Datasets are then tracked in Catalog and stored in XDL alongside the schema and observed schema on which they are based. 

More information about Catalog, including use of the Catalog API, is available in the [Catalog Service Overview](../../catalog_architectural_overview/catalog_architectural_overview.md).

### Query Service

Query Service allows you to use standard SQL to query Experience Platform data to support many different use cases. 

After a schema has been composed, and a dataset has been created which references that schema, data is then ingested and stored in the data lake. Through Query Service, you can join any datasets in Experience Data Lake and capture the query results as a new dataset for use in reporting, Data Science Workspace, or for ingestion into Unified Profile Service. 

Learn more about Query Service by reading the [Query Service Introduction](../../../../../../end-user/markdown/query-service/qs-intro.md). 

### Data Science Workspace

Data Science Workspace (DSW) uses machine learning and artificial intelligence to unleash insights from data stored within Experience Platform. Using XDM Profile and XDM ExperienceEvent data, DSW allows data scientists to build recipes based on data about customers and their activities and make predictions such as buying propensity and recommended offers that the individual is likely to appreciate and use.

With Data Science Workspace, data scientists can easily create intelligent services APIs powered by machine learning. These services work with other Adobe solutions, including Adobe Target and Adobe Analytics Cloud, to help you automate personalized, targeted digital experiences.

For more information on using Experience Platform data to power insights, see the [Data Science Workspace Overview](../../data_science_workspace_overview/dsw_overview.md)

### Unified Profile Service

Unified Profile Service (UPS) provides a 360&deg; profile for every individual in your customer base. Each profile contains data that is aggregated across all systems, as well as actionable timestamped accounts of events involving the individual that have taken place in any of the systems you use with Experience Platform.

UPS consumes schema formatted data, typically based on the XDM Profile or XDM ExperienceEvent classes, and responds to queries based on that data. 

Unified Profile maintains an instance of each profile, merging data together to form a "single source of truth" for the individual using what is known as a 'union view' to represent the data. A union view aggregates the fields of all schemas that implement the same class (such as ExperienceEvent or Profile) into a single schema.  When composing a schema via the UI or API, you can enable the schema for use with UPS and tag it for inclusion in the union view. The tagged schema will then participate in the schema definition being fed to UPS.

As XDM Profile and XDM ExperienceEvent data is ingested and managed by Catalog, it triggers UPS to begin ingesting data that has been enabled for its use. The more interactions and details that are ingested, the more robust individual profiles become.

XDM Profile data helps inform and empower actions across any channel or Adobe solution integration, and when paired with a rich history of behavioral and interaction data, this data is used to power machine learning. Unified Profile APIs can also be used to enrich the functionality of third-party solutions, CRMs, and proprietary solutions.

To learn more about UPS, begin by reading the [Unified Profile Overview](../../unified_profile_architectural_overview/unified_profile_architectural_overview.md).

#### Difference between data in XDL and UPS

Experience Data Lake (XDL) and Unified Profile Service (UPS) are both examples of datastores, but each has its own objective.

XDL is very granular and contains all information that has ever been collected. This includes data that you may not have a use for today, but that you may discover value for using in the future.

UPS provides an aggregation of subject data, merging it together to create a single view of each individual in your user base. This information is therefore not as granular, and may lose fidelity over time as it is updated and merged together.

#### Consuming Unified Profile data

Unified Profile acts a generic lookup entity store and facilitates building personalization use cases by merging data across various enterprise data assets and providing access to that unified data. There are multiple methods for accessing Unified Profile data on Experience Platform, including performing a lookup for a specific entity (or entities) by an identifier (or array of identifiers).

The [Consuming Unified Profile data](../../../tutorials/consuming_unified_profile_data/consuming_unified_profile_data.md) tutorial contains a walk through of how to perform Unified Profile entity lookups using the API.

Another common way of accessing UPS data is through segmentation. Specifically, Segment Builder is a workspace within Experience Platform for building segments from Unified Profiles. Using fields contained within the union view of the XDM Profile class (such as "age", "region", "gender"), segmentation allows you to query profiles and create an audience based on the segment definition. These audiences, or subsets, of customers are based on shared characteristics and allow you to target them with different messaging, offers, or solutions.  

More information about segmentation is available in the [Segment Builder overview](../../../../../../end-user/markdown/segmentation_overview/segmentation.md).

## Next steps

Now that you better understand the role of schemas throughout Experience Platform, you are ready to start composing your own. 

To learn design principles and best practices for composing schemas to be used with Experience Platform, begin by reading the [basics of schema composition](../schema_composition/schema_composition.md).