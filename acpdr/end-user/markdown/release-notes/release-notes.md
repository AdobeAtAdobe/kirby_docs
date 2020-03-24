---

title: Adobe Experience Platform Release Notes
description: Experience Platform release notes March 11, 2020
doc-type: release notes
last-update: March 10, 2020
author: ens71067

---

# Adobe Experience Platform release notes 
## Release date: March 11, 2020

Updates to existing features in Adobe Experience Platform:

- [Data Governance](#data-governance)
- [Data Ingestion](#data-ingestion)
- [Destinations](#destinations)
- [Identity Service](#identity-service)
- [Sources](#sources)

## Data Governance

Experience Platform allows companies to bring data from multiple enterprise systems together to better allow marketers to identify, understand, and engage customers. Experience Platform includes an end-to-end data governance infrastructure, including Data Usage Labeling and Enforcement (DULE), to ensure the proper use of data within Platform and when being shared between systems.

Adobe Experience Platform Data Governance is a series of strategies and technologies used to manage customer data and ensure compliance with regulations, restrictions, and policies applicable to data usage. It plays a key role within Experience Platform at various levels, including cataloging, data lineage, data usage labeling, data access policies, and access control on data for marketing actions.

### New features

> **Note:** Some of the following new features are currently in beta, and are subject to change on the full release.

| Feature | Description |
| ------- | ----------- |
| Automated enforcement of data usage policies for Real-time Customer Data Platform| Data usage policies are now enforced in the workflow of activating data to destinations. Data Governance is also embedded and enforced when making changes that affect existing activations (such as changes to dataset labels, merge policies, segment definitions, and others). |
| Data lineage for enforcement | When a data usage policy is violated in Real-time CDP, the UI displays a notification that contains data lineage information to help the user understand why the policies were violated and what they can do to resolve the violation. |


### Known issues

* None

For more information about Data Governance, see the [Data Governance overview](https://www.adobe.io/apis/experienceplatform/home/dule/duleservices.html#!api-specification/markdown/narrative/technical_overview/data_governance/dule_overview.md).

## Data Ingestion

Adobe Experience Platform provides a rich set of features to ingest any type and latency of data. Adobe Experience Platform Data Ingestion provides multiple alternatives for ingesting data including Batch APIs, Streaming APIs, native Adobe connectors, data integration partners, or the Adobe Experience Platform UI.

### Key features

Feature | Description
------- | -----------
Partial batch ingestion | Partial batch ingestion is the ability to ingest data containing errors, up to a certain threshold. With this capability, users can successfully ingest all their correct data into Adobe Experience Platform while all their incorrect data is batched separately. Details are added to unsuccessful batches to explain why they did not pass validation. More information about partial batch ingestion can be found in the [partial batch ingestion documentation](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/ingest_architectural_overview/partial_batch_ingestion.md).

For more information, visit the [Data Ingestion documentation](https://www.adobe.io/apis/experienceplatform/home/data-ingestion.html) or refer to the [Data Ingestion Service API reference](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!/acpdr/swagger-specs/ingest-api.yaml).


## Destinations

In [Adobe Real-time Customer Data Platform](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/overview.html), destinations are pre-built integrations with destination platforms that activate data to those partners in a seamless way.

### New destinations

New destinations are available where you can activate your Adobe Experience Platform data. See below for details:

Destination | Description
--- | ---
Cloud storage destinations | Adobe Real-time CDP can now deliver your segments as data files to your Amazon S3 or SFTP cloud storage locations. This enables you to send audiences and their profile attributes to your internal systems, via CSV or tab-delimited files. Read more in the [cloud storage destinations documentation](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/destinations-cat/cloud-storage/cloud-storage-destinations.html).
Advertising destinations | The Google destination card is now split into three destination cards, for the three different Google platforms currently supported in Adobe Real-time CDP: Google Ads, Google Ad Manager, Google Display & Video 360. Read about all of them and understand how to connect to them in the [advertising destinations documentation section](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/destinations-cat/advertiser-destinations/advertising-destinations.html).


## Identity Service

Delivering relevant digital experiences requires having a complete understanding of your customer. This is made more difficult when your customer data is fragmented across disparate systems, causing each individual customer to appear to have multiple "identities".

Adobe Experience Platform Identity Service helps you to gain a better view of your customer and their behavior by bridging identities across devices and systems, allowing you to deliver impactful, personal digital experiences in real-time.

### New features

| Feature | Description |
| ------- | ----------- |
| Enhanced Private Graph | Private Graph functionality has been enhanced to reduce graph generation latency from a weekly batch process to a daily refreshed graph, allowing Identity Service customers to access more up-to-date identity graphs and linkages. |

### Known issues

* None

For more information about Identity Service, see the [Identity Service overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md)

## Sources

Adobe Experience Platform can ingest data from external sources while allowing you to structure, label, and enhance that data using Platform services. You can ingest data from a variety of sources such as Adobe applications, cloud-based storage, third-party software, and your CRM system.

Experience Platform provides a RESTful API and an interactive UI that lets you set up source connections for various data providers with ease. These source connections allow you to authenticate and connect to external storage systems and CRM services, set times for ingestion runs, and manage data ingestion throughput.

### New features

| Feature | Description |
| ------- | ----------- |
| Deprecated signals for Adobe Audience Manager connector | Signal-level data from Audience Manger will no longer be sent. Note that segment membership for Traits and Segments will still be included. As a result of this change, inbound datasets will no longer be generated. |
| Renamed datasets | Datasets generated by Audience Manger connector will have updated names and descriptions. |
| Enable Profile toggle in Audience Manger | Profile toggle can be enabled or disabled to promote dataset to Real-time Customer Profile. Toggle will be enabled by default.
| UI support for cloud storage systems | New source connector for Azure Data Lake Storage Gen2 in the UI. |
| UI support for CRM systems | New source connector for HubSpot, Salesforce Service Cloud, and ServiceNow in the UI. |
| UI support for database systems | New source connector for AWS Redshift, Google BigQuery, MariaDB, Microsoft SQL Server, and MySQL in the UI. |

### Known issues

* None

For more information about sources, see the [sources overview](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/acp_connectors_overview/acp-connectors-overview.md).
