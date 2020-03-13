# Adobe Audience Manager data connector

The Adobe Audience Manager data connector streams first party data collected in Adobe Audience Manager to Adobe Experience Platform. The Audience Manager connector ingests three categories of data to Platform:

- **Realtime data:** Data captured in real time on Audience Manager's data collection server. This data is used in Audience Manager to populate rule based traits and will surface in Platform in the shortest latency time. 
- **Onboarded (inbound) data:** These are the files uploaded by a user into an Amazon S3 location hosted by Audience Manager. Audience Manager uses this data to populate onboarded traits using the inbound file method and will have some latency. 
- **Profile data:** Audience Manager uses realtime and onboarded data to derive customer profiles. These profiles are used to populate identity graphs and traits on segment realizations. 

The Audience Manager connector maps these data categories to Experience Data Model (XDM) schema and sends them to Platform. Realtime data and Onboarded data are sent as XDM ExperienceEvent data, while Profile data is sent as XDM Individual Profiles.

For instructions on creating a connection with Adobe Audience Manager using the Platform UI, see the [Audience Manager connector tutorial](../../tutorials/sources_tutorial/aam-ui-tutorial.md).

## What is Experience Data Model (XDM)?
XDM is a publicly documented specification that provides a standardized framework by which Platform organizes customer experience data.

Adhering to XDM standards allows customer experience data to be uniformly incorporated, making it easier to deliver data and gather information.

For more information about how XDM is used in Experience Platform, see the [XDM Systems overview][xdm]. To learn more about how XDM Schemas like Profile and ExperienceEvent are structured, see the [basics of schema composition][schema-comp].

## XDM schemas examples

Below are examples of the Audience Manager structure mapped to XDM ExperienceEvent and XDM Individual Profile in Platform.

### ExperienceEvent - for Realtime data and Onboarded data
![](images/aam-experience-events-for-dcs-and-onboarding-data.png)

### XDM Individual Profile - for Profile data
![](images/aam-profile-xdm-for-profile-data.png)

## How are fields mapped from Adobe Audience Manager to XDM?
Please see documentation for [Audience Manager mapping fields][audience-manager-mapping-fields] for more information.

## Data management on Platform
You will find Audience Manager data under two data management sections in the UI:
- [Datasets](#datasets)
- [Connections](#connections)

### Datasets

Datasets are a storage and management construct for a collection of data, typically a table, that contains schema (columns) and fields (rows) and is made available by a data connection. Audience Manager data consists of Realtime data, Inbound data, and Profile data. To locate your Audience Manager datasets, use the search function in the UI with the provided naming conventions for each type of data.

While users have the ability to disable datasets, it is not recommended to disable datasets that will be used for segment membership in Profile.

| Dataset Name | Description |
| ------------ | ----------- |
| Audience Manager Realtime | This dataset contains data collected by direct hits on Audience Manager DCS endpoints and identity maps for Audience Manager Profiles. Keep this dataset enabled for Profile ingestion. |
| Audience Manager Realtime Profile Updates | This dataset enables Realtime targeting of Audience Manager traits and segments. It includes information for Edge regional routing, trait, and segment membership. Keep this dataset enabled for Profile ingestion. |
| Audience Manager Devices Data | Device data with ECIDs and corresponding segment realizations aggregated in Audience Manager. |
| Audience Manager Device Profile Data | Used for Audience Manager connector diagnostics. |
| Audience Manager Authenticated Profiles | This dataset contains Audience Manager authenticated profiles. |
| Audience Manager Authenticated Profiles Meta Data | Used for Audience Manager Connector diagnostics.  |
| Audience Manager Inbound {Datasource ID} **(Deprecated)** | This dataset represents onboarded records in Audience Manager via the inbound file method. This data flow is deprecated and will be removed in a subsequent release. |
| Audience Manager Inbound Meta Data **(Deprecated)** | Used for Audience Manager connector diagnostics. This data flow is deprecated and will be removed in a subsequent release.  |

### Connections	

Adobe Audience Manager creates one connection in Catalog: **Audience Manager Connection**. Catalog is the system of the records for data location and lineage within Adobe Experience Platform. A connection is a Catalog object that is a customer-specific instance of Connectors. Please see the [Catalog Service overview][catalog] for more information on Catalog, connections, and connectors. 	

## What is the expected latency for Audience Manager Data on Platform?

| Audience Manager Data | Latency | Notes |
| --- | --- | --- |
| Realtime data | < 35 minutes. | Time from being captured at Realtime node to appearing on Platform Data Lake. |
| Inbound data | < 13 hours | Time from being captured at S3 buckets to appearing on Platform Data Lake. |
| Profile data | < 2 days  | Time from being captured from Realtime/Inbound data to being added to a user profile and finally appearing on Platform Data Lake. | 

[xdm]: ../schema_registry/xdm_system/xdm_system_in_experience_platform.md
[xdm-field-dictionary]: ../schema_registry/schema_composition/xdm_field_dictionary.md
[catalog]: ../catalog_architectural_overview/catalog_architectural_overview.md
[schema-comp]: ../schema_registry/schema_composition/schema_composition.md
[audience-manager-mapping-fields]: audience_manager_mapping_fields.md