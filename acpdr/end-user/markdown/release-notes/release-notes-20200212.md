---

title: Adobe Experience Platform Release Notes
description: Experience Platform release notes February 26, 2020
doc-type: release notes
last-update: December 12, 2019
author: ens71067

---

# Adobe Experience Platform release notes 
## Release date: February 12, 2020

New features in Adobe Experience Platform:
* [Identity Service](#identity-service)
* [Sources](#sources)
* [Experience Edge](experience-edge)

## Identity Service

Delivering relevant digital experiences requires having a complete understanding of your customer. This is made more difficult when your customer data is fragmented across disparate systems, causing each individual customer to appear to have multiple "identities". 

Adobe Experience Platform Identity Service helps you to gain a better view of your customer and their behavior by bridging identities across devices and systems, allowing you to deliver impactful, personal digital experiences in real-time.

### New features

| Feature | Description |
| ------- | ----------- |
| Enhanced Private Graph | Private Graph functionality has been enhanced to reduce graph generation latency from a weekly batch process to a daily refreshed graph, allowing Identity Service customers to access more up-to-date identity graphs and linkages. |

### Known issues

* None

For more information about identity service, see the [identity service overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md)

## Sources

Adobe Experience Platform can ingest data from external sources while allowing you to structure, label, and enhance that data using Platform services. You can ingest data from a variety of sources such as Adobe applications, cloud-based storage, third party software, and your CRM system.

Experience Platform provides a RESTful API and an interactive UI that lets you set up source connections for various data providers with ease. These source connections allow you to authenticate and connect to external storage systems and CRM services, set times for ingestion runs, and manage data ingestion throughput.

### New features

| Feature | Description |
| ------- | ----------- |
| API support for SaaS - Service systems| New source connectors for Salesforce Service Cloud API and ServiceNow API. |
| API support for SaaS - Marketing systems| New source connectors for HubSpot API. |
| API support for NoSQL database systems | New source connectors for AWS Redshift, GreenplumDB, Google BigQuery, MariaDB, MySQL, PostgreSQL, and SQL Server APIs. |
| API support for cloud storage systems | New source connectors for Azure Data Lake Service Gen 2 API and Google Cloud Storage API.
| UI support for cloud storage systems | New source connectors for Azure Data Lake Service Gen2 and Google Cloud Storage in the UI.

### Known issues

* None

For more information about sources, see the [sources overview](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/acp_connectors_overview/acp-connectors-overview.md).


## Experience Edge

Experience Edge is a Platform initiative tha provides a single, optimized gateway for requests that want to interact with other Adobe Experience Cloud edge services, such as Adobe Target, Adobe Audience Manager, and Adobe Analytics.

### New features

| Feature | Description |
| ------- | ----------- |
| Opt-in/opt-out | Support has been added for opt-in and opt-out requests. |

### Known issues

* None