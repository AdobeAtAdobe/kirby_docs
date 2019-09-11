---

title: Adobe Experience Platform Release Notes
description: Experience Platform release notes September 10, 2019
doc-type: release notes
last-update: September 10, 2019
author: ens28527

---

# Adobe Experience Platform release notes 
## Release date: September 10, 2019

Updates to existing features:
*   [Data Science Workspace](#data-science-workspace)

## Data Science Workspace

Adobe Experience Platform Data Science Workspace is a fully managed service within Experience Platform that enables data scientists to seamlessly generate insights from data and content across Adobe solutions and third party systems by building and operationalizing Machine Learning Models. Data Science Workspace is tightly integrated with Platform and powers the end-to-end data science lifecycle, including exploration and preparation of XDM data, followed by the development and operationalization of Models to automatically enrich Real-time Customer Profile with Machine Learning Insights.

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Scheduling of Services via the UI | Integrated with Platform Orchestration Service to automate Model training and scoring with user-defined schedules using the UI. |
| Service Gallery | Browse, monitor, and access machine learning Services with the ability to schedule automated training and scoring jobs, all within the redesigned Service Gallery. |
| JupyterLab 5.0.0 | JupyterLab UI improvements. |

**Known issues**

*   There is currently no accessible way in the Service Gallery to delete an existing Service. In the meantime please refer to the [Sensei Machine Learning API reference](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/sensei-ml-api.yaml) to delete an existing Service through API calls.
*   The Service Gallery does not have pagination support to filter a Service's training and scoring runs.
*   When configuring scheduled training or scoring runs through the Service Gallery, setting the frequency to hourly prevents the schedule from being applied.

For more information, visit the [Data Science Workspace Overview](https://www.adobe.io/apis/experienceplatform/home/data-science-workspace/dsw-overview.html) or refer to the [Data Science Workspace Tutorials](https://www.adobe.io/apis/experienceplatform/home/tutorials/data-science-workspace/dsw-tutorials.html).
