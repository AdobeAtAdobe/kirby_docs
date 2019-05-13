---

title: Adobe Experience Platform Release Notes
description: Template for Experience Platform release notes
doc-type: release notes
last-update: April 2019
author: crhoades

---

# Adobe Experience Cloud release notes

New features and fixes in Adobe Experience Platform.

>**Important:** This page contains pre-release content and is subject to change prior to the planned release.

>**Note:** Subscribe to the [Adobe Priority Product Update](https://www.adobe.com/subscription/priority-product-update.html) to be notified via email about upcoming releases. You will receive the notice three to five business days in advance of the release. New information published after the release will be marked with the publication date.

May 2019

* [Data Ingestion and Management](#data-ingestion-and-management)
* [XDM System and Experience Data Model (XDM)](#xdm-system-and-experience-data-model-xdm)
* [Profile, Identity, and Segmentation](#profile-identity-and-segmentation)
* [Data Governance](#data-governance)
* [Experience Decisioning Service](#experience-decisioning-service)

## Data Ingestion and Management

New features and fixes in Data Ingestion and Management:

* [Data Ingestion](#data-ingestion)
* [Batch](#batch)
* [Connectors](#connectors)
* [Adobe Solutions](#adobe-solutions)
* [Streaming](#streaming)
* [Monitoring](#monitoring)
* [Dataset Management](#dataset-management)
* [Catalog](#catalog)
* [ETL](#etl)

For product documentation, see [Analytics Help Home](https://marketing.adobe.com/resources/help/en_US/reference/).

### Data Ingestion 

Adobe Experience Platform provides rich set of features for customers to ingest any type and any latency of data. Customers can ingest using Batch or Streaming API, using Adobe built connector, using data integration partners or UI.

### Batch

Batch Ingestion API allows you to ingest any type of data into Adobe Experience Platform. Bulk Ingestion API provides a secure and scalable mechanism to ingest data that conform to XDM or non XDM schemas.

| Feature    | Description  |
| -----------| ---------- |
| Rich format support | Supports ingestion of JSON, Parquet, CSV |
| Data Validation | Three levels of validation are performed on the data: Schema, Data Type, and Constraints |
| Data Encryption in motion | Protects and secures data in while it is transmitted across data networks. |
| Multi-part Uploads |  Large File uploads supported for files 256MB or larger |
| Auto-partitioned | Data is automatically partitioned to improve scalability and optimize performance of large datasets. |

**Known issues**

None.

For product documentation, see [Batch Ingestion Overview](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/ingest_architectural_overview/ingest_architectural_overview.md).

### Connectors

Adobe Experience Platform Connectors help you easily ingest your data from multiple sources, allowing you to structure, label, and enhance your data using Platform services. Platform connectors let you authenticate to cloud based storage systems and CRM services, set times for ingestion runs, and manage data ingestion throughput. 

| Feature    | Description  |
| -----------| ---------- |
| Cloud-based Storage connectors | Ingest data from Microsoft Azure Blob and Amazon S3 cloud storage to Adobe Experience Platform  |
| Microsoft Dynamics CRM & Salesforce CRM | Discover all data available in Microsoft Dynamics or Salesforce CRM. Ingest any object, standard or custom from MS Dynamics or Salesforce CRM. Incremental data can be ingested hourly or daily. | |

**Known issues**

* Cloud-based Storage connectors can only be used through API calls. 


For product documentation, see [Connectors for Adobe Experience Platform](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/acp_connectors_overview/acp-connectors-overview.md).

### Adobe Solutions

Adobe provides managed data transfer from Adobe Solution to Adobe Experience Platform. Data transfer from the following solutions is available with this release.

| Feature    | Description  |
| -----------| ---------- |
| Adobe Analytics  | Report Suites |
| Adobe Audience Manager  | Data collection Logs, Onboarded data, Traits & segment. |
| AdCloud | DSP Events |
| Adobe Campaign Standard | Profile and Events |
| Target (Preview) | Events


**Known issues**

None.

### Streaming

Streaming ingestion lets users send data to Experience Platform in real time from client and server-side devices. Allows updates to Real-Time Customer Profiles at sub-second latency with support for authenticated data collection and multi-record payloads.

| Feature    | Description  |
| -----------| ---------- |
| Synchronous Validation  | Allows immediate discovery of errors in the JSON payload improving developer velocity. |
| End-to-End Monitoring | Monitor streaming data from ingestion to consumption in the Data Lake and Real-time Customer Profile. |
| Authenticated Data Collection | Toggle on or off the option to require auth tokens from clients. Allows Adobe Experience Platform services to differentiate between records coming from trusted sources and un-trusted sources. |
| Send data in real-time through Launch | Use the Adobe Experience Platform extension in Launch to easily send XDM formatted data from client devices in real-time. |

**Known issues**

None.

For product documentation, see [Getting Started with Adobe Experience Platform Streaming Ingestion APIs](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/streaming_ingest/getting_started_with_platform_streaming_ingestion.md).

### Monitoring

Monitor batch and streaming ingestion into Adobe Experience Platform from client and server-side devices in real-time. 

| Feature    | Description  |
| -----------| ---------- |
| Monitoring Streaming Data | End to end monitoring of streamed data to Data Lake, Real-Time Customer Profile, and to Identity Service.|

**Known issues**

None.

### Dataset Management

Adobe Experience Platform provides customers the ability to discover all their data stored in platform and manage the data via UI and Restful API

| Feature    | Description  |
| -----------| ---------- |
| Scalable | Scalable data. Ingest petabytes of data and make it available within SLA |
| Data Encryption at REST  | Protects and secures data by encrypting data at rest. |
| GDPR Support  | Follow GDPR legal guidelines for the collection and processing of personal information of individuals within the European Union (EU) |

**Known issues**

None.

### Catalog

Catalog is the system of record for data location and lineage within Adobe Experience Platform. Catalog holds the metadata and descriptions of files and directories within Experience Platform, acting as a metadata store where users can find information about all organizational data being stored in Platform.

| Feature    | Description  |
| -----------| ---------- |
| Catalog Service API | Catalog provides a RESTful API from which users can create and manage multiple object types including Accounts, Batches, Connections, Connectors, Datasets, Tags, and Transforms related to Platform data. |

**Known issues**

None.

To begin working with the Catalog Service API, please review the [Catalog Service Overview](https://www.adobe.io/apis/experienceplatform/home/services/allservices.html#!api-specification/markdown/narrative/technical_overview/catalog_architectural_overview/catalog_architectural_overview.md).

### ETL

Adobe Experience Platform supports integration with Data Processing Tools that have the ability to extract, transform, and load (ETL) data from numerous sources into Experience Platform, ensuring that data conforms to the correct specifications for use by Platform services. A number of partners offer pre-configured connectors for Experience Platform. Documentation is also available for developing ETL connectors.

| Feature    | Description  |
| -----------| ---------- |
| ETL Connectors  | Vendors such as Unifi, Informatica, TMM Data, and SnapLogic provide secure connectors for their Data Processing tools to connect to Adobe Experience Platform. |
| ETL Integration  | Experience Platform offers ETL integration documentation for users wishing to create a secure connector for extracting, transforming, and loading data into Platform. |

**Known issues**

None.

For product documentation, see [Developing ETL Integrations for Adobe Experience Platform](https://www.adobe.io/apis/experienceplatform/home/services/allservices.html#!api-specification/markdown/narrative/integration_guides/etl_integration_guide/etl_integration_guide.md).

## XDM System and Experience Data Model (XDM)

Standardization and interoperability are key concepts behind Experience Platform. Experience Data Model (XDM), driven by Adobe, is an effort to standardize customer experience data and define schemas for customer experience management.

XDM is a publicly documented specification designed to improve the power of digital experiences. It provides common structures and definitions for any application to use to communicate with services on Adobe Experience Platform. By adhering to XDM standards, all customer experience data can be incorporated into a common representation delivering insights in a faster, more integrated way. You can gain valuable insights from customer actions, define customer audiences through segments, and express customer attributes for personalization purposes.

XDM is the fuel that allows Experience Cloud, powered by Adobe Experience Platform, to deliver the right message to the right person, on the right channel, at exactly the right moment.

The methodology on which Experience Platform is built, XDM System, operationalizes Experience Data Model schemas for use by Experience Platform components.

| Feature    | Description  |
| -----------| ---------- |
| Schema Registry | The Schema Registry provides a user interface (Schema Editor) and RESTful API from which all schema-related resources can be viewed and managed. The Schema Editor and Schema Registry API can also be used to create and manage new schemas and resources that are unique to each IMS organization. |
| Schema Library  | The Schema Library contains all Schema Registry resources, including those defined by an individual IMS organization and those made available to all users by Adobe, Experience Platform partners, and vendors whose applications are integrated with Experience Platform. |

**Known issues**

None.

To learn more about working with XDM using the Schema Registry API and Schema Editor, please read the [XDM System documentation](https://www.adobe.io/apis/experienceplatform/home/xdm.html).

## Profile, Identity, and Segmentation

New features and fixes in Profile, Identity, and Segmentation:

* [Profile](#profile)
* [Identity](#identity)
* [Segmentation](#segmentation)

### Profile

_Add product summary_

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Known issues**

* Issue
* Issue
* Issue
* Issue

For product documentation, see [Unified Profile Overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md).

### Identity

_Add product summary_

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Known issues**

* Issue
* Issue
* Issue
* Issue

For product documentation, see [Identity Service Overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md).

### Segmentation

_Add product summary_

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Known issues**

* Issue
* Issue
* Issue
* Issue

## Data Governance

### Data Usage Labeling and Enforcement (DULE)

Adobe Experience Platform allows companies to bring data from multiple enterprise systems together to better allow marketers to identify, understand, and engage customers. Experience Platform includes end-to-end data governance infrastructure, including DULE, to ensure the proper use of data within Platform and when being shared between systems.

Data governance is a series of strategies and technologies used to manage customer data and ensure compliance with regulations, restrictions, and policies applicable to data use. It plays a key role within Experience Platform at various levels, including cataloging, data lineage, data usage labeling, data access policies, and access control on data for marketing actions.

Getting started with data governance requires a strong understanding of the regulations, contractual obligations, and corporate policies that apply to your customer data. From there, data can be classified by applying the appropriate data usage labels, and its use can be controlled through the definition of data usage policies.

The DULE framework simplifies and streamlines the process of categorizing data and creating data usage policies through the Experience Platform user interface and DULE Policy Service API. 

| Feature    | Description  |
| -----------| ---------- |
| Label Experience Platform entities  | Apply and manage data usage labels at the connection, dataset, and dataset field level based on pre-defined categorized labels. |
| Create data usage policies  | Define and manage data usage policies based on the presence of labels and attempted marketing actions. |
| Check policy violations  | Evaluate whether or not defined usage policies are violated when performing marketing actions on Platform data. |

**Known issues**

* None.

For more information, please see the [Data Usage Labeling and Enforcement (DULE) User Guide](https://www.adobe.io/apis/experienceplatform/home/dule/duleservices.html#!end-user/markdown/dule_overview/dule_overview.md).


