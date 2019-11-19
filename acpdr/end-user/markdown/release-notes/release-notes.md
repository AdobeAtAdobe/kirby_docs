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
* [Real-time Customer Data Platform](#real-time-customer-data-platform)
* [Destinations](#destinations)
* [Sources](#sources)

Updates to existing features:
* [Experience Data Model (XDM) System](#experience-data-model-xdm-system)
* [Real-time Customer Profile](#real-time-customer-profile) 
* [Segmentation Service](#segmentation-service)

## Real-time Customer Data Platform

Built on Adobe Experience Platform, the Adobe Real-time Customer Data Platform (Real-time CDP) helps companies bring together known and unknown data to activate customer profiles with intelligent decisioning throughout the customer journey. Real-time CDP combines multiple enterprise data sources to create unified profiles in real time that can be used to provide one-to-one personalized customer experiences across all channels and devices.

Real-time Customer Data Platform includes tools for data governance, identity management, advanced segmentation, and data science so that you can build profiles and define audiences, as well as derive rich insights while being able to enforce strict data governance policies.

Adobe connects to a large ecosystem of partners, not to mention native integrations with Adobe Experience Cloud, so you can seamlessly activate these audiences and deliver great customer experiences across all channels, from on-site or in-app personalization to email, paid media, call centers, connected devices, and more.

With Real-time CDP, you can:

* Achieve a single view of your customer with streaming collection of customer data from across the enterprise.
* Responsibly manage profiles with trusted governance and privacy controls for known and unknown identifiers.
* Generate actionable insights and scale audiences with AI and machine learning powered by Adobe Sensei and built for marketers.
* Deliver personalized experiences in realtime across all channels and destinations.

For more information, see the [Adobe Real-time Customer Data Platform documentation](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/overview.html).

### Key features

|Feature|Description|
|---|---|
|Destinations|Pre-built integrations with destination platforms supported by Adobe’s Real-time Customer Data Platform that activate data to those partners in a seamless way. See [Destinations](#destinations) below for more information.|
|Home page metrics dashboard|The Adobe Real-time Customer Data Platform (Real-time CDP) home page includes a metrics dashboard that shows information about profiles and segments. The home page also contains links to learning materials. See the section on [Real-time Customer Data Platform metrics](#real-time-customer-data-platform-metrics) below.|
|Sources|You can ingest data from a variety of sources such as Adobe Solutions, cloud-based storage, third party software, and your CRM. See the [Sources](#sources) section below to learn more.|

### Real-time Customer Data Platform metrics

The Adobe Real-time Customer Data Platform (Real-time CDP) home page, which includes a metrics dashboard, appears when you log in to Real-time CDP.

The home page is only one of the places where metric cards appear. Real-time CDP provides metric cards throughout your experience. These metrics inform you about the data, profile, and segment audiences in the system. 

If there is no data in the system when you log in to Real-time CDP, the dashboard on the home page does not appear. In this case, the home page provides learning material for a first time user experience. As data is collected, the dashboard automatically updates to display information about that data. 

To learn more, see the [Real-time Customer Data Platform metrics overview](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/intro/home-page-dashboards.html)

## Destinations

Destinations are pre-built integrations with destination platforms supported by Adobe’s Real-time Customer Data Platform that activate data to those partners in a seamless way. For more information, read the [Destinations overview](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/destinations-overview.html) article.

### Available destinations

With the November release, Adobe's Real-time Customer Data Platform supports the following destinations:

* Advertising: Google
* Email marketing: Adobe Campaign, Salesforce Marketing Cloud, Oracle Responsys, Oracle Eloqua

See the [destination catalog](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/destinations-cat/destinations-catalog.html) for information about each of the destinations.

### Known limitations

* The control to allow for custom activation schedules in the [activation flow](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/dest-tutorials/activate-destinations.html#activate-data) (Schedule step) is not available with the initial release. 
* There is currently no way to edit or delete a destination configuration. To work around this limitation, you can enable or disable the destination in the top right corner of the [destination details page](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/destinations-interface/destination-details-page.html#n4-controls-to-edit-activation-and-enabledisable-data-flow). 
* No validation is currently in place for account details, path, or credentials when connecting to your destination or storage account. Make sure you are entering the right credentials and double-check for spelling errors or typos. 
* No credential renewals are in place with the initial release. Once an account is expired or needs refreshing, you must create a new destination connection and remap your previously mapped segments.

## Sources

Adobe Experience Platform can ingest data from external sources while allowing you to structure, label, and enhance that data using Platform services. You can ingest data from a variety of sources such as Adobe Solutions, cloud-based storage, third party software, and your CRM system.

Experience Platform provides a RESTful API and an interactive UI that lets you set up source connections for various data providers with ease. These source connections allow you to you authenticate to your storage systems and CRM services, set times for ingestion runs, and manage data ingestion throughput.

### Key features

| Feature    | Description  |
| ---------- | ------------ |
| Sources UI | New user interface for creating, viewing, and managing source connections. |
| Revamped workflows for CRM connectors | New intuitive UI workflow for creating and managing Microsoft Dynamics and Salesforce connectors. |
| Connector support for cloud-based storages | Connectors can now access cloud-based storages. New sources include Amazon S3, Azure Blob, and FTP/SFTP servers. |

### Known issues

*   Source connectors for cloud-based storages do not support the ingestion of compressed files.

For more information about sources, see [Sources overview](https://www.adobe.io/apis/experienceplatform/home/data-ingestion/data-ingestion-services.html#!api-specification/markdown/narrative/technical_overview/acp_connectors_overview/acp-connectors-overview.md).

## Experience Data Model (XDM) System

Standardization and interoperability are key concepts behind Experience Platform. Experience Data Model (XDM), driven by Adobe, is an effort to standardize customer experience data and define schemas for customer experience management.

XDM is a publicly documented specification designed to improve the power of digital experiences. It provides common structures and definitions for any application to communicate with services on Adobe Experience Platform. By adhering to XDM standards, all customer experience data can be incorporated into a common representation delivering insights in a faster, more integrated way. You can gain valuable insights from customer actions, define customer audiences through segments, and use customer attributes for personalization purposes.

### New features

| Feature    | Description  |
| ---------- | ------------ |
| Notification schema | New schema that represents notification data sent during the data ingestion process. |
| Adobe AdCloud DSP schemas | Five new schemas have been added to represent Adobe Advertising Cloud demand-side platform (DSP) metadata:<ul><li>Placement</li><li>Campaign</li><li>Package</li><li>Advertiser</li><li>Account</li></ul>  |
| ExperienceEvent Implementation Details mixin | New ExperienceEvent mixin that adds a standard field to store information about the software used to collect the event. |
| Profile Privacy mixin | New profile mixin that adds fields to accept general out-out and sales/sharing opt-out signals for Real-time Customer Profile. |
| Format constraints for `xdm:alternateDisplayInfo` | The "Title" and "Description" fields for `xdm:alternateDisplayInfo` must both be strings to pass validation. |
| Name change: XDM Individual Profile  | The "title" of the "XDM Profile" class has been updated to "XDM Individual Profile". The formal `$id` of the class has not changed. |

### Known issues

* None.

To learn more about working with XDM using the Schema Registry API and Schema Editor user interface, please read the [XDM System documentation](https://www.adobe.io/apis/experienceplatform/home/xdm.html).

## Real-time Customer Profile

Adobe Experience Platform enables you to drive coordinated, consistent, and relevant experiences for your customers no matter where or when they interact with your brand. With Real-time Customer Profile, you can see a holistic view of each individual customer that combines data from multiple channels, including online, offline, CRM, and third party data. Profile allows you to consolidate your disparate customer data into a unified view offering an actionable, timestamped account of every customer interaction.

| Feature    | Description  |
| -----------| ---------- |
|Enhancements to Profile lookup| Users now have the ability to look up profiles using reference descriptors and related entities.|
| Clean up data for a given dataset| Users can now delete data for a given dataset or batch using the Profile System Jobs API. Instructions can be found in the [delete a dataset tutorial](https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/datasets/delete-dataset.md).
| Edge Profile query enhancements| Applications can now query Edge Profile by any of the identities of a given profile. |
|Configure merge policies per projection|Applications can now configure merge policies per projection in order to generate a view of the data as governed by a specific merge policy. |
|Computed Attributes| Computed attributes automatically compute the value of fields based on other values, calculations, and expressions. Computed attributes operate on the profile level to aggregate values such as "total purchase", "lifetime value", or "funnel status" based on an incoming event, an incoming event and profile data, or an incoming event, profile data, and historical events. To learn more, see the [computed attributes tutorial](https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/computed_attributes/computed-attributes-tutorial.md).<br/><br/>*Note: The computed attributes functionality is in alpha. The documentation and functionality are subject to change.* |

### Bug fixes

* Simplified list of available ID stitching strategies in merge policy creation workflow. See the [tutorial on working with merge policies](https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/merge_policies/create-merge-policies.md) to learn more.

### Known issues

* None.

For more information on Real-time Customer Profile, including tutorials and best practices for working with Profile data, please read the [Real-time Customer Profile Overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md).

## Segmentation Service

Adobe Experience Platform Segmentation Service provides a user interface and RESTful API that allows you to build segments and generate audiences from your Real-time Customer Profile data. These segments are centrally configured and maintained on Platform, making them readily accessible by any Adobe application.

Segmentation Service defines a particular subset of profiles by describing the criteria that distinguishes a marketable group of people within your customer base. Segments can be based on record data (such as demographic information) or time series events representing customer interactions with your brand.

| Feature    | Description  |
| -----------| ---------- |
| Scheduled segmentation | Users can now enable scheduled segment evaluation for all segments via the UI and API. Once enabled, all segments will be evaluated once per day. This does not affect on-demand segmentation capabilities which continue to work as they did previously.<br/><br/>Note: The scheduled segmentation feature cannot be used in sandboxes with more than five merge policies for XDM Individual Profile.|
| Streaming segmentation | Support for continuous evaluation of segments (streaming segmentation) allows most segment rules to be evaluated as the data is passing into Platform. This feature means that segment membership will be up to date without the need to run scheduled segmentation jobs. Some exceptions apply, such as segments using multi-entity relationships or with enriched payloads.|
| Segments as building blocks | When creating segments using the Segment Builder UI, users can now use previously-defined segments as building blocks for additional segments. <ul><li>Reference current audience membership: updates as people move in and out of audiences.</li><li>Copy logic: take the selected segment definition and duplicate it in the new segment.</li></ul>|
|View segment membership by ID namespace|Segment membership can now be viewed by ID namespace (email, ECID, and total count).|
|RBAC support|Segment Builder now provides support for basic role-based access controls and permissions.|
|Enhanced support for external audience sharing between Platform and Adobe solutions |Users can now bring in external (non-Experience Platform) audience metadata in scenarios where the number of audiences is large or not known a priori. This release includes access to Audience Manager metadata for customers who have provisioned the solution connector. This audience metadata can be used within Segment Builder to create new Experience Platform segments. <br/><br/> Additionally, segments created in Experience Platform will now be available for use in integrated Adobe solutions, including Audience Manager, Target, and Ad Cloud.|

### Bug fixes

* Fixed an issue causing Multi-Entity Segmentation to return zero profiles in case of nested relationships.
* Fixed an issue where exclusion logic was returning misleading results.
* Improved readability for multi-entity folders. They now show the friendly name of the XDM class.
* Fixed an intermittent issue where multiple copies of the same XDM folder appeared.
* Messaging is now produced to inform a user if segment estimates are unavailable for the selected merge policy.

### Known issues

* None.

To learn more about Segmentation Service, please read the [Segmentation Service overview](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!end-user/markdown/segmentation_overview/segmentation.md). Then, to begin building and working with segments, follow the [Segment Builder user guide](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!end-user/markdown/segmentation_overview/segment-builder-guide.md) for UI instructions or consult the [creating segments tutorial](https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md) for using the API.  
