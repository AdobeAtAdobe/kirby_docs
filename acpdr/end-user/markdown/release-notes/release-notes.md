---

title: Adobe Experience Platform Release Notes
description: Experience Platform v1.0 release notes June 27, 2019
doc-type: release notes
last-update: May 31, 2019
author: crhoades

---

# Adobe Experience Platform release notes 
## v1.0, June 27, 2019

New features in Adobe Experience Platform.

* [Data Governance](#data-governance)
* [Data Ingestion and Management](#data-ingestion-and-management)
* [Data Science Workspace](#data-science-workspace)
* [Decisioning Service](#decisioning-service)
* [Experience Data Model (XDM) and XDM System](#experience-data-model-xdm-and-xdm-system)
* [Profile, Identity, and Segmentation](#profile-identity-and-segmentation)
* [Query Service](#query-service)

## Data Governance

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

For more information, please see the [Data Usage Labeling and Enforcement (DULE) User Guide](https://www.adobe.io/apis/experienceplatform/home/dule/duleservices.html#!end-user/markdown/dule_overview/dule_overview.md).

## Data Ingestion and Management

New features in Data Ingestion and Management:

* [Data Ingestion](#data-ingestion)
* [Batch](#batch)
* [Connectors](#connectors)
* [Adobe Solutions](#adobe-solutions)
* [Streaming Ingestion](#streaming-ingestion)
* [Monitoring](#monitoring)
* [Dataset Management](#dataset-management)
* [Catalog](#catalog)
* [ETL](#etl)

For product documentation, see [Data Ingestion](https://www.adobe.io/apis/experienceplatform/home/data-ingestion.html).

### Data Ingestion

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

### Batch

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

For product documentation, see [Batch Ingestion Overview](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/ingest_architectural_overview/ingest_architectural_overview.md).

### Connectors

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue


For product documentation, see [Connectors for Adobe Experience Platform](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/acp_connectors_overview/acp-connectors-overview.md).

### Adobe Solutions

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

### Streaming Ingestion

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

For product documentation, see [Getting Started with Adobe Experience Platform Streaming Ingestion APIs](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/streaming_ingest/getting_started_with_platform_streaming_ingestion.md).

### Monitoring

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

### Dataset Management

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

### Catalog

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

To begin working with the Catalog Service API, please review the [Catalog Service Overview](https://www.adobe.io/apis/experienceplatform/home/services/allservices.html#!api-specification/markdown/narrative/technical_overview/catalog_architectural_overview/catalog_architectural_overview.md).

### ETL

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

For product documentation, see [Developing ETL Integrations for Adobe Experience Platform](https://www.adobe.io/apis/experienceplatform/home/services/allservices.html#!api-specification/markdown/narrative/integration_guides/etl_integration_guide/etl_integration_guide.md).

## Data Science Workspace

(Description for initial release)

**Key features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

(Link to documentation)

**Known issues**

* Issue
* Issue

## Decisioning Service

(Description for initial release)

**Key features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Known issues**

* Issue
* Issue

(Link to documentation)

## Experience Data Model (XDM) and XDM System

Standardization and interoperability are key concepts behind Experience Platform. Experience Data Model (XDM), driven by Adobe, is an effort to standardize customer experience data and define schemas for customer experience management.

XDM is a publicly documented specification designed to improve the power of digital experiences. It provides common structures and definitions for any application to communicate with services on Adobe Experience Platform. By adhering to XDM standards, all customer experience data can be incorporated into a common representation delivering insights in a faster, more integrated way. You can gain valuable insights from customer actions, define customer audiences through segments, and use customer attributes for personalization purposes.

XDM is the mechanism that allows Experience Cloud, powered by Adobe Experience Platform, to deliver the right message to the right person, on the right channel, at exactly the right moment.

The methodology on which Experience Platform is built, XDM System operationalizes Experience Data Model schemas for use by Experience Platform components.

**New features**

| Feature    | Description  |
| ---------- | ------------ |
| JSON Schema constraints  | The following datatypes now have additional options in the user interface to define constraints: <ul><li>`string` - min/max length, pattern, default value, formats (as defined in [JSON Schema draft-6](https://tools.ietf.org/html/draft-wright-json-schema-01))</li><li>`double` - min/max, default value</li></ul> |
| Custom `$id`  | You can now provide your own `$id` value when creating resources in POST requests. |
| Schema Registry performance improvements  | Optimized union schema generation, and enhanced schema caching to greatly improve API response times. |

**Fixes**

* Moved the identityMap field out of context/profile and into its own mixin to make defining identities more intuitive.
* Patched all existing schemas based on context/profile with context/identitymap.
* Fixed error message when no version is supplied.
* Fixed bug where Schema Registry was giving random responses for profile union schema calls.
* Fixed bug where union schemas were not displaying the correct fields in Schema Registry.
* Fixed bug where identity descriptors were occasionally not able to be created with valid namespaces.
* Fixed dereference issue if an object uses `properties` instead of `allOf`.

**Known issues**

* Cannot extend a Platform-supplied mixin by adding a field.
* Descriptors are not deleted when a mixin is removed from the schema composition.
* Unable to create an enum field with no labels.

To learn more about working with XDM using the Schema Registry API and Schema Editor, please read the [XDM System documentation](https://www.adobe.io/apis/experienceplatform/home/xdm.html).


## Profile, Identity, and Segmentation

New features in Profile, Identity, and Segmentation:

* [Profile](#profile)
* [Identity Service](#identity-service)
* [Segmentation Service](#segmentation-service)

### Profile

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

For product documentation, see [Profile Overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md).

### Identity Service

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

For product documentation, see [Identity Service Overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md).

### Segmentation Service

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Fixes**

* Fix
* Fix
* Fix
* Fix

**Known issues**

* Issue
* Issue

For product documentation, see [Segment Builder Overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!end-user/markdown/segmentation_overview/segmentation.md) for building segments using the Platform UI, or [Creating segments via API](https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md) for instructions on building segments using the API.

## Query Service

Query Service provides the ability to use standard SQL to query data in Adobe Experience Platform to support many different use cases. It is a serverless tool which allows you to join any datasets in Experience Data Lake and capture the query results as a new dataset for use in reporting, Data Science Workspace, or for ingestion into Profile Service.

You can use Query Service to build data analysis ecosystems, creating a picture of consumers across their various interaction channels. These channels might include:

* Point-of-sale system
* Web
* Mobile
* CRM system

**Key features**

| Feature    | Description  |
| -----------| ---------- |
| Feature A  | Text |
| Feature B  | Text |
| Feature C  | Text |

**Known issues**

* Issue
* Issue

For more information about Query Service, see the [product documentation](https://www.adobe.io/apis/experienceplatform/home/services/query-service/query-service.html).