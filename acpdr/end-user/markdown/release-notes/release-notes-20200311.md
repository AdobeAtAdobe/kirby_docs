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

## Data Ingestion

Adobe Experience Platform provides a rich set of features to ingest any type and latency of data. Adobe Experience Platform Data Ingestion provides multiple alternatives for ingesting data including Batch APIs, Streaming APIs, native Adobe connectors, data integration partners, or the Adobe Experience Platform UI.

### Key features

Feature | Description
------- | -----------
Partial batch ingestion | Partial batch ingestion is the ability to ingest data containing errors, up to a certain threshold. With this capability, users can successfully ingest all their correct data into Adobe Experience Platform while all their incorrect data is batched separately. Details are added to unsuccessful batches to explain why they did not pass validation. More information about partial batch ingestion can be found in the [partial batch ingestion documentation](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/ingest_architectural_overview/partial_batch_ingestion.md).

For more information, visit the [Data Ingestion documentation](https://www.adobe.io/apis/experienceplatform/home/data-ingestion.html) or refer to the [Data Ingestion Service API reference](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!/acpdr/swagger-specs/ingest-api.yaml).