# Adding Data to Unified Profile

## Overview

Unified Profile is the centrally accessible source of data for Adobe Experience Platform solutions, providing access to unified customer profile data that helps inform and empower actions across any channel, platform and Adobe Solution integrations. This customer data, paired with a rich history of behavioral and interaction data, is used to power machine learning & Sensei. Unified Profile APIs can also be directly used to enrich the functionality of third-party solutions, CRMs, and proprietary solutions.

### Objective

This tutorial covers all methods of adding to and updating your Unified Profile data on Experience Platform. In specific, it covers how to get data to Unified Profile using:

[Batch Ingestion](#bringing-data-into-unified-profile-as-a-parquet-file) - Deliver batched data in the form of [Parquet](http://parquet.apache.org/documentation/latest/) files to a dataset.  
[Streaming Ingestion](#streaming-ingestion) - Deliver real-time data as JSON to a streaming endpoint.  

### Prerequisite Topics

[__Unified Profile__](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md) is a generic lookup entity store, and is used to manage XDM Platform data as actionable entities. Unified Profile facilitates building customer personalization use cases by merging data across various enterprise data assets and providing access to that unified data.  
[__Authenticating and Accessing Adobe Experience Platform APIs__](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) - This tutorial shows the initial steps to set up an integration in Adobe I/O Console and use the created integration to access Adobe Experience Platform APIs. The steps in this tutorial describe how to gain access to the following values needed for required headers:
* IMS Organization ID
* API Key (Client ID)
* Access Token

### Related Topics

In the context of managing your data entities, several Platform solutions and components come into play. For this tutorial, you should have an understanding of each of the following:

[__Catalog Service__](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md) provides the means to upload data files to Experience Platform and maintains metadata about batch transfers. Catalog Service can be configured to notify Unified Profile and Identity Service of data uploaded to datasets.  
[__Streaming Ingestion__](../../technical_overview/streaming_ingest/getting_started_with_platform_streaming_ingestion.md) facilitates real time communication of touchpoint events that can be made actionable within a visitor's session.  
[__Experience Data Model (XDM)__](../../technical_overview/schema_registry/standard_schemas/acp_standard_schemas.md) provides the framework to refer to and manage the schemas that your data must conform to for use as entities on Platform.

---

## Bringing Data into Unified Profile as a Parquet File

Unified Profile can sync your profile store with data uploaded to datasets, adding new profiles or overwriting data of profiles already in the store.

Before data uploaded to a dataset will be automatically sent to Unified Profile, the dataset has to be specially configured.

For complete instructions on configuring a dataset for Unified Profile, visit [Configuring a Dataset for Unified Profile and Identity Service Using APIs](../unified_profile_dataset_tutorial/unified_profile_dataset_tutorial.md).

---

## Streaming Ingestion

Any XDM compliant data delivered to any streaming endpoint will automatically add or overwrite that record in Unified Profile. If more than one identity is supplied in the Profile or ExperienceEvent data consumed, those identities will be mapped in the identity graph without additional configuration.

Visit [Getting Started with Adobe Experience Platform Streaming Ingestion APIs](../../technical_overview/streaming_ingest/getting_started_with_platform_streaming_ingestion.md) for more details.

---

## Optional: Confirming Your Data Upload

While this step is optional, it's always a good idea to spot check your upload when it's the first of a new dataset or if any part of your process changes, such as using a new ETL or new data source. To do this, using some known identities from your source data, use Unified Profile APIs to ensure you can retrieve the entities you uploaded as expected.

Unified Profile receives batch data as it gets loaded into a dataset. If you are unable to retrieve any of the entities you expect, your dataset may not be enabled for Unified Profile. If you check and your dataset has been enabled, try ensuring your source data format and identifiers support your expectations.

You can find details on this by visiting the [Accessing Data in Unified Profile](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md#accessing-profiles-in-the-unified-profile-service) section of the [Unified Profile Overview](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md#accessing-profiles-in-the-unified-profile-service).

---

## Now You Know

After following this tutorial, which focuses on importing your data into Unified Profile, the following should be demystified:

* How can I get my profile data into Adobe Experience Platform?
* What format do I use to send my data?
* How does Unified Profile handle updates to profiles?

For more in-depth information on Unified Profile, see the [Unified Profile Overview](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md).
