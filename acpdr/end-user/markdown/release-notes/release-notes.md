---

title: Adobe Experience Platform Release Notes
description: Experience Platform release notes September 10, 2019
doc-type: release notes
last-update: September 13, 2019
author: ens28527

---

# Adobe Experience Platform release notes 
## Release date: September 10, 2019

Updates to existing features:
 *   [Data Ingestion](#data-ingestion)
 *   [Data Science Workspace](#data-science-workspace)
 *   [Query Service](#query-service)

## Data Ingestion

Adobe Experience Platform provides a rich set of features to ingest any type and latency of data. Adobe Experience Platform Data Ingestion provides multiple alternatives for ingesting data including Batch APIs, Streaming APIs, native Adobe connectors, data integration partners, or the Adobe Experience Platform UI.

**New features**

| Feature    | Description  |
| ----------- | ---------- |
| New domain for streaming ingestion | The `dcs.data.adobe.net` domain has been moved to the new common data collection domain `dcs.adobedc.net`. Users must update their implementations according to the revised Adobe Experience Platform streaming ingestion documentation. All documentation related to Adobe Experience Platform streaming ingestion has been updated to use the new domain.

For more information, visit the [Data Ingestion documentation](https://www.adobe.io/apis/experienceplatform/home/data-ingestion.html) or refer to the [Data Ingestion Service API reference](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!/acpdr/swagger-specs/ingest-api.yaml).

## Data Science Workspace

Adobe Experience Platform Data Science Workspace is a fully managed service within Experience Platform that enables data scientists to seamlessly generate insights from data and content across Adobe solutions and third-party systems by building and operationalizing Machine Learning Models. Data Science Workspace is tightly integrated with Platform and powers the end-to-end data science lifecycle, including exploration and preparation of XDM data, followed by the development and operationalization of Models to automatically enrich Real-time Customer Profile with Machine Learning Insights.

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Scheduling of Services via the UI | Integrated with Platform Orchestration Service to automate Model training and scoring with user-defined schedules using the UI. |
| Service Gallery | Browse, monitor, and access machine learning Services with the ability to schedule automated training and scoring jobs, all within the redesigned Service Gallery. |
| JupyterLab 5.0.0 | JupyterLab UI improvements. |

**Known issues**

*   There is currently no accessible way in the Service Gallery to delete an existing Service. In the meantime, please refer to the [Sensei Machine Learning API reference](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/sensei-ml-api.yaml) to delete an existing Service through API calls.
*   The Service Gallery does not have pagination support to filter a Service's training and scoring runs.
*   When configuring scheduled training or scoring runs through the Service Gallery, setting the frequency to hourly prevents the schedule from being applied.

For more information, visit the [Data Science Workspace Overview](https://www.adobe.io/apis/experienceplatform/home/data-science-workspace/dsw-overview.html) or refer to the [Data Science Workspace Tutorials](https://www.adobe.io/apis/experienceplatform/home/tutorials/data-science-workspace/dsw-tutorials.html).

## Query Service
Query Service provides the ability to use standard SQL to query data in Adobe Experience Platform to support a variety of analysis and data management use cases. It is a serverless tool that allows you to join datasets from the Data Lake and capture the query results as a new dataset for use in reporting, Data Science Workspace, or for ingestion into Real-time Customer Profile.

You can use Query Service to build data analysis ecosystems, creating a picture of customers across their various interaction channels. These channels might include point-of-sale systems, web, mobile, or CRM systems.

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Improvements to Query Editor | Added a save function that allows you to save a query and work on it later. Added a "Browse" tab to the Query Service user interface on Adobe Experience Platform that shows queries saved by users in your organization.<br><br>Implemented a "Query Details" panel that displays useful metadata about the query being viewed. |
| New attribution functions | Adobe-defined functions in Query Service to query for channel attribution with expiration parameters. |
| Enhancements to SQL syntax | Support for iLike syntax.
| Generate datasets with a defined XDM Schema | Added a new clause in Create Table as Select (CTAS) queries that allows you to specify a target schema. |

For more information, refer to the [Query Service documentation](https://www.adobe.io/apis/experienceplatform/home/services/query-service/query-service.html).