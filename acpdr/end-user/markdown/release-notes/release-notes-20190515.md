---

title: Adobe Experience Platform Release Notes
description: Experience Platform v1 release notes May 15, 2019
doc-type: release notes
last-update: May 15, 2019
author: crhoades

---

# Adobe Experience Platform release notes

New features in Adobe Experience Platform.

May 2019

* [Data Ingestion and Management](#data-ingestion-and-management)
* [Experience Data Model (XDM) and XDM System](#experience-data-model-xdm-and-xdm-system)
* [Profile, Identity, and Segmentation](#profile-identity-and-segmentation)
* [Data Governance](#data-governance)

## Data Ingestion and Management

New features in Data Ingestion and Management:

* [Data Ingestion](#data-ingestion)
* [Batch](#batch)
* [Connectors](#connectors)
* [Adobe Solutions](#adobe-solutions)
* [Streaming](#streaming)
* [Monitoring](#monitoring)
* [Dataset Management](#dataset-management)
* [Catalog](#catalog)
* [ETL](#etl)

For product documentation, see [Data Ingestion](https://www.adobe.io/apis/experienceplatform/home/data-ingestion.html).

### Data Ingestion

Adobe Experience Platform provides a rich set of features to ingest any type and any latency of data. You can ingest using Batch or Streaming APIs, using Adobe built connectors, data integration partners or the Adobe Experience Platform UI.

### Batch

Use the Batch Ingestion API to ingest any type of data into Adobe Experience Platform. The Bulk Ingestion API provides a secure and scalable mechanism to ingest data that conform to XDM or non-XDM schemas.

| Feature    | Description  |
| -----------| ---------- |
| Rich format support | Supports ingestion of JSON, Parquet, CSV |
| Data Validation | Three levels of validation are performed on the data: Schema, Data Type, and Constraints |
| Data Encryption in motion | Protects and secures data while it is transmitted across data networks. |
| Multi-part Uploads |  Large File uploads supported for files 256MB or larger |
| Auto-partitioned | Data is automatically partitioned to improve scalability and optimize performance of large datasets. |

**Known issues**

None.

For product documentation, see [Batch Ingestion Overview](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/ingest_architectural_overview/ingest_architectural_overview.md).

### Connectors

Adobe Experience Platform Connectors help you easily ingest your data from multiple sources, allowing you to structure, label, and enhance your data using Experience Platform services. Platform connectors let you authenticate to cloud-based storage systems and CRM services, set times for ingestion runs, and manage data ingestion throughput. 

| Feature    | Description  |
| -----------| ---------- |
| Cloud-based Storage connectors | Ingest data from Microsoft Azure Blob and Amazon S3 cloud storage to Adobe Experience Platform  |
| Microsoft Dynamics CRM & Salesforce CRM | Discover all data available in Microsoft Dynamics or Salesforce CRM. Ingest any object, standard or custom from Microsoft Dynamics or Salesforce CRM. Incremental data can be ingested hourly or daily. | |

**Known issues**

* Cloud-based Storage connectors can only be used through API calls. 


For product documentation, see [Connectors for Adobe Experience Platform](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/acp_connectors_overview/acp-connectors-overview.md).

### Adobe Solutions

Adobe provides managed data transfer from Adobe Solutions to Adobe Experience Platform. With this release, data transfer is available from the following solutions.

| Feature    | Description  |
| -----------| ---------- |
| Adobe Analytics  | Report Suites |
| Adobe Audience Manager  | Data collection logs, Onboarded data, Traits & segments. |
| Advertising Cloud | DSP Events |
| Adobe Campaign Standard | Profile and Events |
| Target (Preview) | Events


**Known issues**

None.

### Streaming

Streaming ingestion sends data to Experience Platform in real time from client and server-side devices. Updates can be made to Real-Time Customer Profiles at sub-second latency with support for authenticated data collection and multi-record payloads.

| Feature    | Description  |
| -----------| ---------- |
| Synchronous Validation  | Allows immediate discovery of errors in the JSON payload, improving developer velocity. |
| End-to-End Monitoring | Monitors streaming data from ingestion to consumption in the data lake and Real-time Customer Profile. |
| Authenticated Data Collection | Toggles on or off the option to require authentication tokens from clients. Allows Adobe Experience Platform services to differentiate between records coming from trusted sources and untrusted sources. |
| Send data in real time through Launch | Uses the Adobe Experience Platform extension in Launch to easily send XDM-formatted data from client devices in real time. |

**Known issues**

None.

For product documentation, see [Getting Started with Adobe Experience Platform Streaming Ingestion APIs](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/streaming_ingest/getting_started_with_platform_streaming_ingestion.md).

### Monitoring

Monitor batch and streaming ingestion into Adobe Experience Platform from client and server-side devices in real time. 

| Feature    | Description  |
| -----------| ---------- |
| Monitoring Streaming Data | End to end monitoring of streamed data to the data lake, Real-Time Customer Profile, and to Identity Service.|

**Known issues**

None.

### Dataset Management

Adobe Experience Platform provides the ability to discover all your data stored in the platform and manage the data via UI and RESTful API.

| Feature    | Description  |
| -----------| ---------- |
| Scalable | Scalable data. Ingests petabytes of data and makes it available within SLA. |
| Data Encryption at REST  | Protects and secures data by encrypting data at rest. |
| GDPR Support  | Follows GDPR legal guidelines for the collection and processing of personal information of individuals within the European Union (EU). |

**Known issues**

None.

### Catalog

Catalog is the system of record for data location and lineage within Adobe Experience Platform. Catalog holds the metadata and descriptions of files and directories within Experience Platform, acting as a metadata store where you can find information about any data being stored in Platform.

| Feature    | Description  |
| -----------| ---------- |
| Catalog Service API | Catalog provides a RESTful API from which users can create and manage multiple object types including accounts, batches, connections, connectors, datasets, tags, and transforms related to Experience Platform data. |

**Known issues**

None.

To begin working with the Catalog Service API, please review the [Catalog Service Overview](https://www.adobe.io/apis/experienceplatform/home/services/allservices.html#!api-specification/markdown/narrative/technical_overview/catalog_architectural_overview/catalog_architectural_overview.md).

### ETL

Adobe Experience Platform supports integration with Data Processing Tools that can extract, transform, and load (ETL) data from numerous sources into Experience Platform, ensuring that data conforms to the correct specifications for use by Platform services. A number of partners offer preconfigured connectors for Experience Platform. Documentation is also available for developing ETL connectors.

| Feature    | Description  |
| -----------| ---------- |
| ETL Connectors  | Vendors such as Unifi, Informatica, TMM Data, and SnapLogic provide secure connectors for their Data Processing tools to connect to Adobe Experience Platform. |
| ETL Integration  | Experience Platform offers ETL integration documentation for users who want to create a secure connector for extracting, transforming, and loading data into Platform. |

**Known issues**

None.

For product documentation, see [Developing ETL Integrations for Adobe Experience Platform](https://www.adobe.io/apis/experienceplatform/home/services/allservices.html#!api-specification/markdown/narrative/integration_guides/etl_integration_guide/etl_integration_guide.md).

## Experience Data Model (XDM) and XDM System

Standardization and interoperability are key concepts behind Experience Platform. Experience Data Model (XDM), driven by Adobe, is an effort to standardize customer experience data and define schemas for customer experience management.

XDM is a publicly documented specification designed to improve the power of digital experiences. It provides common structures and definitions for any application to communicate with services on Adobe Experience Platform. By adhering to XDM standards, all customer experience data can be incorporated into a common representation delivering insights in a faster, more integrated way. You can gain valuable insights from customer actions, define customer audiences through segments, and use customer attributes for personalization purposes.

XDM is the mechanism that allows Experience Cloud, powered by Adobe Experience Platform, to deliver the right message to the right person, on the right channel, at exactly the right moment.

The methodology on which Experience Platform is built, XDM System operationalizes Experience Data Model schemas for use by Experience Platform components.

| Feature    | Description  |
| -----------| ---------- |
| Schema Registry | The Schema Registry provides a user interface (Schema Editor) and RESTful API from which all schema-related resources can be viewed and managed. The Schema Editor and Schema Registry API can also be used to create and manage new schemas and resources that are unique to each IMS organization. |
| Schema Library  | The Schema Library contains all Schema Registry resources, including those defined by an individual IMS organization and those made available to all users by Adobe, Experience Platform partners, and vendors whose applications are integrated with Experience Platform. |

**Known issues**

None.

To learn more about working with XDM using the Schema Registry API and Schema Editor, please read the [XDM System documentation](https://www.adobe.io/apis/experienceplatform/home/xdm.html).

## Profile, Identity, and Segmentation

New features in Profile, Identity, and Segmentation:

* [Profile](#profile)
* [Identity Service](#identity-service)
* [Segmentation Service](#segmentation-service)

### Profile

Profile is a generic lookup entity store that merges data across various enterprise data assets and provides access to that data in the form of real-time consumer profiles, and related time series events, called the union view. The unified view helps to inform and empower actions across channels, Platform, and Adobe solution integrations. Furthermore, Profile is used to power machine learning & Sensei. Profile APIs can also be used directly to enrich the functionality of third-party solutions, CRM systems, and proprietary solutions.

| Feature    | Description  |
| -----------| ---------- |
| Real-time customer profile  | Profile ingests data via data inlets, merges it with existing data in the profile store, and creates or modifies the unified view at near real time. This data, evolving in time with your customers' experiences, can be used to make personalized recommendations. |
| Union view | One of the key features of Profile is the ability to unify multi-channel data. Profile can supply a merged view of the individuals in your consumer base, across datasets, and for linked identities, referred to as the union view. |
| Edge | Edge Service serves as a framework for low-latency data collection, pluggable computing and rapid data activation across all addressable channels. Edge Service facilitates real-time personalization. |

**Known issues**

None.

For product documentation, see [Profile Overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md).

### Identity Service

Identity Service solves the fundamental challenge posed by the disconnected identities of your customers, caused by the fragmented nature of their data across each of the disparate systems at play in your organization's ecosystem. It does this by bridging identities across devices and across the various systems used by your consumers to engage with your brand. In this way, Identity Service facilitates a complete understanding of your customers and their behavior so you can deliver impactful digital experiences in real time.

| Feature    | Description  |
| -----------| ---------- |
| Identity graph  | An identity graph is a map of relationships between identities that updates with customer activity in near real time. Identity Service manages an identity graph visible by only your organization, and built based on your data, referred to as the private graph. Identity Service augments your private graph when a record of ingested data contains more than one identity, adding relationships between these identities. |

**Known issues**

None.

For product documentation, see [Identity Service Overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md).

### Segmentation Service

Segmentation Service defines a particular subset of profiles from your profile store, describing the criteria that distinguishes a marketable group of people within your profile store. Segments can be based on record data (such as demographic information) or time series events representing customer touch points with your brand.

For example, in an email campaign called "Did you forget to buy your sneakers?," you might want an audience segment of all users who searched for running shoes within the last 30 days, but who did not complete a purchase. Or, you might want to target web content to display only to users with a certain rating in your rewards program.

| Feature    | Description  |
| -----------| ---------- |
| Segmentation API  | RESTful services give you programmatic access to build customer segments. |
| Segment Builder  | The segment builder is a robust and intuitive workspace for building customer segments from your Profile data. |

**Known issues**

None.

For product documentation, see [Segment Builder Overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!end-user/markdown/segmentation_overview/segmentation.md) for building segments using the Platform UI, or [Creating segments via API](https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md) for instructions on building segments using the API.

## Data Governance

Adobe Experience Platform allows companies to bring data from multiple enterprise systems together to better allow marketers to identify, understand, and engage customers. Experience Platform includes an end-to-end data governance infrastructure, including Data Usage Labeling and Enforcement (DULE), to ensure the proper use of data within Platform and when being shared between systems.

Data governance is a series of strategies and technologies used to manage customer data and ensure compliance with regulations, restrictions, and policies applicable to data usage. It plays a key role within Experience Platform at various levels, including cataloging, data lineage, data usage labeling, data access policies, and access control on data for marketing actions.

Getting started with data governance requires a thorough understanding of the regulations, contractual obligations, and corporate policies that apply to your customer data. From there, data can be classified by applying the appropriate data usage labels, and its use can be controlled through the definition of data usage policies.

The DULE framework simplifies and streamlines the process of categorizing data and creating data usage policies through the Experience Platform user interface and DULE Policy Service API. 

| Feature    | Description  |
| -----------| ---------- |
| Label Experience Platform entities  | Apply and manage data usage labels at the connection, dataset, and dataset field level based on predefined categorized labels. |
| Create data usage policies  | Define and manage data usage policies based on the presence of labels and requested marketing actions. |
| Check policy violations  | Evaluate whether defined usage policies are violated when performing marketing actions on Platform data. |

**Known issues**

* None.

For more information, please see the [Data Usage Labeling and Enforcement (DULE) User Guide](https://www.adobe.io/apis/experienceplatform/home/dule/duleservices.html#!end-user/markdown/dule_overview/dule_overview.md).
