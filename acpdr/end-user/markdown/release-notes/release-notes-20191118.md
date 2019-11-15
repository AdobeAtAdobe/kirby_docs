---

title: Adobe Experience Platform Release Notes
description: Experience Platform release notes November 18, 2019
doc-type: release notes
last-update: November 18, 2019
author: crhoades, ens28527

---

# Adobe Experience Platform release notes 

## Release date: November 18, 2019

New release:
[Real-time Customer Data Platform](#real-time-customer-data-platform)

Updates to existing features:
 *   [Data Ingestion](#data-ingestion)
 *   [Data Science Workspace](#data-science-workspace)
 *   [Experience Data Model (XDM) System](#experience-data-model-xdm-system)
 *   [Query Service](#query-service)

## Real-time Customer Data Platform

Built on Adobe Experience Platform, the Adobe Real-time Customer Data Platform (real-time CDP) helps companies bring together known and unknown data to activate customer profiles with intelligent decisioning throughout the customer journey. Real-time CDP combines multiple enterprise data sources to create unified profiles in real time that can be used to provide one-to-one personalized customer experiences across all channels and devices.

Real-time Customer Data Platform includes tools for data governance, identity management, advanced segmentation, and data science so that you can build profiles and define audiences, as well as derive rich insights while being able to enforce strict data governance policies.

Adobe connects to a large ecosystem of partners, not to mention native integrations with Adobe Experience Cloud, so you can seamlessly activate these audiences and deliver great customer experiences across all channels, from on-site or in-app personalization to email, paid media, call centers, connected devices, and more.

With Real-time CDP, you can:

* Achieve a single view of your customer with streaming collection of customer data from across the enterprise.
* Responsibly manage profiles with trusted governance and privacy controls for known and unknown identifiers.
* Generate actionable insights and scale audiences with AI and machine learning powered by Adobe Sensei and built for marketers.
* Deliver personalized experiences in realtime across all channels and destinations.

### Key features

|Feature|Description|
|---|---|
|Home page metrics dashboard|The Adobe Real-time Customer Data Platform (Real-time CDP) home page includes a metrics dashboardthat shows information about profiles and segments. The home page also contains links to learning materials.|

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

## Experience Data Model (XDM) System

Standardization and interoperability are key concepts behind Experience Platform. Experience Data Model (XDM), driven by Adobe, is an effort to standardize customer experience data and define schemas for customer experience management.

XDM is a publicly documented specification designed to improve the power of digital experiences. It provides common structures and definitions for any application to communicate with services on Adobe Experience Platform. By adhering to XDM standards, all customer experience data can be incorporated into a common representation delivering insights in a faster, more integrated way. You can gain valuable insights from customer actions, define customer audiences through segments, and use customer attributes for personalization purposes.

**New features**

| Feature    | Description  |
| ---------- | ------------ |
| Notification schema | New schema that represents notification data sent during the data ingestion process. |
| Adobe AdCloud DSP schemas | Five new schemas have been added to represent Adobe Advertising Cloud demand-side platform (DSP) metadata:<ul><li>Placement</li><li>Campaign</li><li>Package</li><li>Advertiser</li><li>Account</li></ul>  |
| ExperienceEvent Implementation Details mixin | New ExperienceEvent mixin that adds a standard field to store information about the software used to collect the event. |
| Profile Privacy mixin | New profile mixin that adds fields to accept general out-out and sales/sharing opt-out signals for Real-time Customer Profile. |
| Format constraints for `xdm:alternateDisplayInfo` | The "Title" and "Description" fields for `xdm:alternateDisplayInfo` must both be strings to pass validation. |
| Name change: XDM Individual Profile  | The "title" of the "XDM Profile" class has been updated to "XDM Individual Profile". The formal `$id` of the class has not changed. |

To learn more about working with XDM using the Schema Registry API and Schema Editor, please read the [XDM System documentation](https://www.adobe.io/apis/experienceplatform/home/xdm.html).

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