# XDM System overview

Standardization and interoperability are key concepts behind Adobe Experience Platform. Experience Data Model (XDM), driven by Adobe, is an effort to standardize customer experience data and define schemas for customer experience management. 

XDM is a publicly documented specification designed to improve the power of digital experiences. It provides common structures and definitions for any application to use to communicate with Platform services. By adhering to XDM standards, all customer experience data can be incorporated into a common representation that can deliver insights in a faster, more integrated way. You can gain valuable insights from customer actions, define customer audiences through segments, and express customer attributes for personalization purposes.

XDM is the foundational framework that allows Adobe Experience Cloud, powered by Experience Platform, to deliver the right message to the right person, on the right channel, at exactly the right moment. The methodology on which Experience Platform is built, **XDM System**, operationalizes Experience Data Model schemas for use by Platform services.

This document provides an overview of the role of XDM System within Experience Platform, and includes the following topics:

* [XDM schemas](#xdm-schemas)
* [Data behaviors in XDM System](#data-behaviors-in-xdm-system)
* [XDM schemas and Experience Platform services](#xdm-schemas-and-experience-platform-services)
    * [Catalog Service & Data Lake](#catalog-service---data-lake)
    * [Query Service](#query-service)
    * [Real-time Customer Profile](#real-time-customer-profile)
    * [Data Science Workspace](#data-science-workspace)
    * [Decisioning Service](#decisioning-service)

## XDM schemas

Experience Platform uses schemas to describe the structure of data in a consistent and reusable way. By defining data consistently across systems, it becomes easier to retain meaning and therefore gain value from data.

Before data can be ingested into Platform, a schema must be composed to describe the data's structure and provide constraints to the type of data that can be contained within each field. Schemas consist of a base class and zero or more mixins.

For more information on the schema composition model, including design principles and best practices, see the [basics of schema composition](../schema_composition/schema_composition.md).

### Schema Registry and Schema Library

The **Schema Registry** provides a user interface and RESTful API from which you can view and manage all schema-related resources in the Adobe Experience Platform **Schema Library**. The Schema Library contains industry standard resources made available to you by Adobe, as well as resources from Experience Platform partners and vendors whose applications you use. The Schema Registry UI and API can also be used to create and manage new schemas and resources that are unique to your organization.

For a comprehensive guide to the major operations available in the Schema Registry, see the [Schema Registry developer guide](../schema_registry_developer_guide.md).

## Data behaviors in XDM System

Data intended for use in Experience Platform is grouped into two behavior types:

* **Record data**: Provides information about the attributes of a subject. A subject could be an organization or an individual.
* **Time series data**: Provides a snapshot of the system at the time an action was taken either directly or indirectly by a record subject.

All XDM schemas describe data that can be categorized as record or time series. The data behavior of a schema is defined by the schema's **class**, which is assigned to a schema when it is first created. XDM classes describe the smallest number of properties a schema must contain in order to represent a particular data behavior.

Although you are able to define your own classes within the Schema Registry, it is recommended that you use the preferred classes **XDM Profile** and **XDM ExperienceEvent** for record and time series data, respectively. These classes are outlined in more detail below.

### XDM Profile

XDM Profile is a record-based class that forms a singular representation of the attributes of both identified and partially-identified subjects. Profiles that are highly identified may be used for personal communications or targeted engagements, and can contain detailed personal information such as name, gender, date of birth, location, and contact information including phone numbers and email addresses. 

Less-identified profiles may consist only of anonymous behavioral signals like browser cookies. In this case, the sparse profile data is used to build an information base into which the interests and preferences of the anonymous profile are collated and stored. These identifiers may become more detailed over time as the subject signs up for notifications, subscriptions, purchases, and so on. This increase in profile attributes may eventually result in an identified subject and allow for a higher degree of targeted engagement. 

As a consumer profile continues to grow, it becomes a robust repository of an individual's personal information, identification information, contact details, and communication preferences.

### XDM ExperienceEvent

XDM ExperienceEvent is a time-series-based class used to capture the state of the system when an event (or set of events) occurred, including the point in time and identity of the subject involved. Experience Events are fact records of what occurred, thus they are immutable and represent what happened without aggregation or interpretation. They are critical for time-domain analytics as they can be used to analyze changes that occur in a given window of time, and to compare between multiple windows of time to track trends.

Experience Events can be either explicit or implicit. Explicit events are directly observable human actions taking place during a point in a journey. Implicit events are events that are raised without a direct human action, but still relate to an individual. Examples of implicit events can include the scheduled sending of email newsletters or battery voltage reaching a certain threshold.

While not all events are easily categorized across all data sources, it is extremely valuable to harmonize similar events into similar types where possible for processing. 

![ExperienceEvent Customer Journey](images/ExperienceEvent-customer-journey.png "Experience Events show a customer journey over time")

## XDM schemas and Experience Platform services

Experience Platform is schema agnostic, meaning that any schema that conforms to the XDM standard is available for use by Platform services. The ways in which different Platform services use schemas are outlined in more detail below.

### Catalog Service, Data Ingestion & Data Lake

Catalog Service is the system of record for Experience Platform assets and their related schemas. Catalog is not the actual files or directories containing data, but rather it holds the metadata and descriptions of those files and directories.

Catalog data is stored in the Data Lake, a highly granular data store containing all data managed by Platform, regardless of origin or file format. 

To begin ingesting data into Experience Platform, a dataset is created using Catalog Service. The dataset references an XDM schema describing the structure of the data to be ingested. If a dataset is created without a schema, Experience Platform will derive an "observed schema" by inspecting the type and content of ingested data fields. Datasets are then tracked in Catalog and stored in the Data Lake alongside the schemas and observed schemas on which they are based. 

For more information on Catalog, see the [Catalog Service overview](../../catalog_architectural_overview/catalog_architectural_overview.md). For more information on Adobe Experience Platform Data Ingestion, see the [batch ingestion overview](../../ingest_architectural_overview/ingest_architectural_overview.md) and [streaming ingestion overview](../../streaming_ingest/streaming_ingest_overview.md).

### Query Service

Adobe Experience Platform Query Service allows you to use standard SQL to query Experience Platform data to support many different use cases. 

After a schema has been composed and a dataset has been created which references that schema, data is then ingested and stored in the Data Lake. Using Query Service, you can join any datasets in the Data Lake and capture the query results as a new dataset for use in reporting, machine learning, or for ingestion into Real-time Customer Profile. 

To learn more about Query Service, please see the [Query Service introduction](../../../../../../end-user/markdown/query-service/qs-intro.md).

### Real-time Customer Profile

Real-time Customer Profile provides a centralized consumer profile for targeted and personalized experience management. Each profile contains data that is aggregated across all systems, as well as actionable timestamped accounts of events involving the individual that have taken place in any of the systems you use with Experience Platform.

Real-time Customer Profile consumes schema-formatted data based on the XDM Profile or XDM ExperienceEvent classes, and responds to queries based on that data. Profile does not support the use of schemas based on other classes.

Profile maintains an instance of each customer profile, merging data together to form a "single source of truth" for the individual. This unified data is represented using what is known as a "union view". A union view aggregates the fields of all schemas that implement the same class into a single schema.  When composing a schema using the UI or API, you can enable the schema for use with Real-time Customer Profile and tag it for inclusion in the union view. The tagged schema will then participate in the schema definition being fed to Profile.

As XDM Profile and XDM ExperienceEvent data is ingested and managed by Catalog, it triggers Real-time Customer Profile to begin ingesting data that has been enabled for its use. The more interactions and details that are ingested, the more robust individual profiles become.

XDM Profile data helps inform and empower actions across any channel or Adobe solution integration, and when paired with a rich history of behavioral and interaction data, this data is used to power machine learning. The Real-time Customer Profile API can also be used to enrich the functionality of third-party solutions, CRMs, and proprietary solutions.

See the [Real-time Customer Profile overview](../../unified_profile_architectural_overview/unified_profile_architectural_overview.md) for more information.

### Data Science Workspace

Adobe Experience Platform Data Science Workspace uses machine learning and artificial intelligence to gain insights from data stored within Experience Platform. Data Science Workspace allows data scientists to build recipes based on XDM Profile and XDM ExperienceEvent data about customers and their activities, facilitating predictions such as buying propensity and recommended offers that the individual is likely to appreciate and use.

With Data Science Workspace, data scientists can easily create intelligent services APIs powered by machine learning. These services work with other Adobe solutions, including Adobe Target and Adobe Analytics Cloud, to help you automate personalized, targeted digital experiences.

For more information on using Experience Platform data to power insights, see the [Data Science Workspace overview](../../data_science_workspace_overview/dsw_overview.md).

### Decisioning Service

Decisioning Service provides the capability to configure personalized offer decisioning in Platform-integrated applications. Offers could be product recommendations, content components for a web experience, conversation scripts, and actions to take.

Decisioning Service leverages Real-time Customer Profile data, and is therefore only compatible with datasets based on schemas implementing the XDM Profile or XDM ExperienceEvent class.

See the [Decisioning Service overview](../../decisioning-overview/decisioning-service-overview.md) for more information.

## Next steps

Now that you better understand the role of schemas throughout Experience Platform, you are ready to start composing your own. 

To learn design principles and best practices for composing schemas to be used with Experience Platform, begin by reading the [basics of schema composition](../schema_composition/schema_composition.md). For step-by-step instructions on how to create a schema, see the tutorials on creating a schema [using the API](../../../tutorials/schema_registry_api_tutorial/schema_registry_api_tutorial.md) or [using the user interface](../../../tutorials/schema_editor_tutorial/schema_editor_tutorial.md).