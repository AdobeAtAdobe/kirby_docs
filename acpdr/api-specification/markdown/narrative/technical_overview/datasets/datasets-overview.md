# Datasets in Experience Platform

All data that is successfully ingested into Adobe Experience Platform is persisted within the Data Lake as datasets. A dataset is a storage and management construct for a collection of data, typically a table, that contains a schema (columns) and fields (rows). Datasets also contain metadata that describes various aspects of the data they store. 

This document provides a high-level overview of datasets in Experience Platform, covering the following concepts:

* [Creating datasets and tracking metadata](#creating-datasets-and-tracking-metadata)
* [Enforcing constraints on dataset data](#enforcing-constraints-on-dataset-data)
* [Ingesting data into datasets](#ingesting-data-into-datasets)
* [Applying usage labels to datasets](#applying-usage-labels-to-datasets)
* [Datasets in downstream Platform services](#datasets-in-downstream-platform-services)

## Creating datasets and tracking metadata

Catalog Service is the system of record for data location and lineage within Experience Platform, and is used to create and manage datasets. Catalog tracks the metadata for each dataset, which includes a reference to the Experience Data Model (XDM) schema the dataset conforms to (explained in the next section) and the number of records ingested into that dataset.

See the [Catalog Service overview](../catalog_architectural_overview/catalog_architectural_overview.md) for more information.

## Enforcing constraints on dataset data

Experience Data Model (XDM) is the standardized framework by which Platform organizes customer experience data. All data that is ingested into Platform must conform to a pre-defined XDM schema before it can be persisted in the Data Lake as a dataset.

All datasets contain a reference to the XDM schema that constrains the format and structure of the data that they can store. Attempting to upload data to a dataset that does not conform to the dataset's XDM schema will cause ingestion to fail.

For more information on XDM, see the [XDM System overview](../schema_registry/xdm_system/xdm_system_in_experience_platform.md).

## Ingesting data into datasets

Adobe Experience Platform Data Ingestion represents the multiple methods by which Platform ingests data from various sources. Regardless of the method of ingestion, all successfully ingested data is converted to batch files. Batches are units of data that consist of one or more files to be ingested as a single unit. These batch files are then added to dedicated datasets and persisted within the Data Lake.

See the [Data Ingestion overview](../ingest_architectural_overview/data-ingestion-overview.md) for more information.

## Applying usage labels to datasets

Adobe Experience Platform Data Governance allows you to manage customer data in order to ensure compliance with regulations, restrictions, and policies applicable to data use. Using Data Usage Labeling and Enforcement (DULE) as its core framework, Data Governance allows you to apply usage labels to categorize data according to the usage policies that apply to that data.

Data usage labels can be applied to entire datasets or individual dataset fields. Labels added at the dataset level are inherited by all fields within that dataset.

See the [Data Governance overview](../data_governance/dule_overview.md) for more information on the service. For steps on how to work with usage labels in the Experience Platform UI, see the [data usage labels user guide](../../tutorials/dule/dule_working_with_labels.md).

## Datasets in downstream Platform services

Once datasets have been used to store ingested data, those datasets are then used by downstream Platform services to update customer profiles, gain insights through machine learning, and more.

The following is a list of downstream services that use datasets for various operations. Please review the documentation for each service for more information.

* [Data Access API](../data_access_architectural_overview/data_access_architectural_overview.md): Allows you to access and download the contents of files stored within datasets.
* [Adobe Experience Platform Identity Service](../identity_services_architectural_overview/identity_services_architectural_overview.md): Bridges identities across devices and systems, linking datasets together based on the identity fields defined by the XDM schemas they conform to.
* [Real-time Customer Profile](../unified_profile_architectural_overview/unified_profile_architectural_overview.md): Leverages Identity Service to create detailed customer profiles from your datasets in real-time. Real-time Customer pulls data from the Data Lake and persists customer profiles in its own separate data store.
* [Adobe Experience Platform Segmentation Service](../../../../../end-user/markdown/segmentation_overview/segmentation.md): Allows you to build segments and generate audiences from your Real-time Customer Profile data. These audiences can then be exported to their own datasets within the Data Lake.
* [Adobe Experience Platform Data Science Workspace](../data_science_workspace_overview/dsw_overview.md): Uses machine learning and artificial intelligence to uncover insights in large datasets.
* [Adobe Experience Platform Query Service](../../../../../end-user/markdown/query-service/qs-intro.md): Allows you to use standard SQL to query data in Experience Platform, joining any datasets within the Data Lake and capturing query results as a new dataset for use in reporting, Data Science Workspace, or Real-time Customer Profile.
* [Adobe Experience Platform Decisioning Service](../decisioning-overview/decisioning-service-overview.md): Leverages Real-time Customer Profile to determine the most likely choice a customer will make from a set of options, based on the behavioral data that Profile pulls from enabled datasets.

## Next steps

By reading this document, you have been introduced to the core uses of datasets in Experience Platform, as well as the various Platform services that utilize datasets. For more details on the many ways datasets are used in Platform, please review the service documentation linked throughout this overview.

<!-- (Add after dataset user guide publishes)
For steps on how to interact with datasets within the Experience Platform UI, see the [datasets user guide]().
-->