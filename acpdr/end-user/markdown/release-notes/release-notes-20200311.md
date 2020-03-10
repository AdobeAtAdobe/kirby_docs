---

title: Adobe Experience Platform Release Notes
description: Experience Platform release notes March 11, 2020
doc-type: release notes
last-update: March 9, 2020
author: ens71067

---

# Adobe Experience Platform release notes 
## Release date: March 11, 2020

New features in Adobe Experience Platform:

- [Data Ingestion](#data-ingestion)
- [Identity Service](#identity-service)

## Data Ingestion

Adobe Experience Platform provides a rich set of features to ingest any type and latency of data. Adobe Experience Platform Data Ingestion provides multiple alternatives for ingesting data including Batch APIs, Streaming APIs, native Adobe connectors, data integration partners, or the Adobe Experience Platform UI.

### Key features

Feature | Description
------- | -----------
Partial batch ingestion | Partial batch ingestion is the ability to ingest data containing errors, up to a certain threshold. With this capability, users can successfully ingest all their correct data into Adobe Experience Platform while all their incorrect data is batched separately. Details are added to unsuccessful batches to explain why they did not pass validation. More information about partial batch ingestion can be found in the [partial batch ingestion documentation](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/ingest_architectural_overview/partial_batch_ingestion.md).

For more information, visit the [Data Ingestion documentation](https://www.adobe.io/apis/experienceplatform/home/data-ingestion.html) or refer to the [Data Ingestion Service API reference](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!/acpdr/swagger-specs/ingest-api.yaml).

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
