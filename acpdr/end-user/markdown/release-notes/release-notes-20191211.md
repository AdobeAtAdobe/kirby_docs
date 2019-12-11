---

title: Adobe Experience Platform Release Notes
description: Experience Platform release notes December 11, 2019
doc-type: release notes
last-update: December 10, 2019
author: ens71067

---

# Adobe Experience Platform release notes 
## Release date: December 11, 2019

New features in Adobe Experience Platform:
* [Access control](#access-control)
* [Sandboxes](#sandboxes)

Updates to existing features:
* [Segmentation Service](#segmentation-service)
* [Decisioning Service](#decisioning-service)
* [Sources](#sources)

## Access control

Experience Platform leverages [Adobe Admin Console](https://adminconsole.adobe.com) product profiles to link users with permissions and sandboxes. Permissions control access to a variety of Platform capabilities, including data modeling, profile management, and sandbox administration.

### Key features

Feature | Description
--- | ---
Permissions | In the Admin Console, the _Permissions_ tab within a Platform product profile allows you customize which Platform capabilities are available for the users attached to that profile. Available permission categories include: <br><ul><li>Data Modeling</li><li>Data Management</li><li>Profile Management</li><li>Identities</li><li>Data Monitoring</li><li>Sandbox Administration</li><li>Destinations</li><li>Sources</li></ul>
Access to sandboxes | The _Permissions_ tab within a Platform product profile can grant its users access to specific sandboxes. See the section on [sandboxes](#sandboxes) below for more information.

For more information, please see the [access control overview](../../../api-specification/markdown/narrative/technical_overview/access-control/access-control-overview.md).

## Sandboxes

Experience Platform is built to enrich digital experience applications on a global scale. Companies often run multiple digital experience applications in parallel and need to cater for the development, testing, and deployment of these applications while ensuring operational compliance.

In order to address this need, Experience Platform provides sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

### Key features

Feature | Description
--- | ---
Production sandbox | Experience Platform provides a single production sandbox, which cannot be deleted or reset.
Non-production sandboxes | Multiple non-production sandboxes can be created for a single Platform instance, allowing you to test features, run experiments, and make custom configurations without impacting your production sandbox.
Sandbox switcher | In the Experience Platform user interface, the sandbox switcher in the top-left corner of the screen allows you to switch between available sandboxes through a dropdown menu.
`x-sandbox-name` header | All calls to Experience Platform APIs must now include the new `x-sandbox-name` header, whose value references the `name` attribute of the sandbox the operation will take place in.

For more information, please see the [sandboxes overview](../../../api-specification/markdown/narrative/technical_overview/sandboxes/sandboxes-overview.md).

## Segmentation Service

Adobe Experience Platform Segmentation Service provides a user interface and RESTful API that allows you to build segments and generate audiences from your Real-time Customer Profile data. These segments are centrally configured and maintained on Platform, making them readily accessible by any Adobe application.

Segmentation Service defines a particular subset of profiles by describing the criteria that distinguishes a marketable group of people within your customer base. Segments can be based on record data (such as demographic information) or time series events representing customer interactions with your brand.

### New features

Feature | Description
--- | ---
Merged Audiences tab in Segment Builder | The _Segments_ and _Audiences_ tabs in the Segment Builder have been combined into a single _Audiences_ tab. This tab allows you to browse and search for existing audiences, which you can then drag and drop into the rule builder canvas to reference audience membership in a new segment definition.
New location for the merge policy selector | The location of the merge policy selector in the Segment Builder has been changed. To select a merge policy for a segment definition, click the gear icon on the _Fields_ tab, then use the _Merge Policy_ dropdown menu to select the merge policy that you wish to use.

### Known issues

* None

For more information, please see the [Segmentation Service overview](../segmentation_overview/segmentation.md).

## Decisioning Service

Adobe Experience Platform Decisioning Service provides the ability to programmatically and intelligently select the "Next Best Experience" from a set of available options for a given individual, deliver them to any channel or application, and perform reporting and analysis.

### New features

| Feature    | Description  |
| -----------| ---------- |
| Ranking functions | Order of offers for profiles are now derived through a ranking function, rather than a fixed set of offers across all profiles. |

### Known issues

* None.

See the [Decisioning Service overview](https://www.adobe.io/apis/experienceplatform/home/services/decisioning-service.html#!api-specification/markdown/narrative/technical_overview/decisioning-overview/decisioning-service-overview.md) for a full introduction to the service.

## Sources

Adobe Experience Platform can ingest data from external sources while allowing you to structure, label, and enhance that data using Platform services. You can ingest data from a variety of sources such as Adobe Solutions, cloud-based storage, third party software, and your CRM system.

Experience Platform provides a RESTful API and an interactive UI that lets you set up source connections for various data providers with ease. These source connections allow you to you authenticate to your storage systems and CRM services, set times for ingestion runs, and manage data ingestion throughput.

### New features

| Feature    | Description  |
| ---------- | ------------ |
| Streaming connection | Streaming ingestion enables you to send data from client- and server-side devices to Experience Platform in real-time. Release includes a new streaming connection user interface. |
| Connector support for Google Cloud Store | Support for collecting data from Google Cloud Store. |

### Known issues

* None.

For more information about sources, see the [sources overview](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/acp_connectors_overview/acp-connectors-overview.md).
