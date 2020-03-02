# Create a Google Cloud Storage source connector in the UI

Source connectors in Adobe Experience Platform provide the ability to ingest externally sourced data on a scheduled basis. This tutorial provides steps for creating a Google Cloud Storage (hereinafter referred to as "GCS") source connector using the Platform user interface.

The following steps are covered:

- [Connect your GCS account](#connect-your-gcs-account)
- [Configure a dataflow](#configure-a-dataflow)
    - [Select data](#select-data)
    - [Map data fields to an XDM schema](#map-data-fields-to-an-xdm-schema)
    - [Schedule ingestion runs](#schedule-ingestion-runs)
    - [Review dataflow](#review-your-dataflow)
- [Monitor data ingestion](#monitor-data-ingestion)

The appendix to this tutorial provides additional information for working with source connectors:

- [Disable a dataflow](#disable-a-dataflow)
- [Activate inbound data for Profile hydration](#activate-inbound-data-for-profile-hydration)

## Getting started

This tutorial requires a working understanding of the following components of Adobe Experience Platform:

-   [Experience Data Model (XDM) System](../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Experience Platform organizes customer experience data.
    -   [Basics of schema composition](../../technical_overview/schema_registry/schema_composition/schema_composition.md): Learn about the basic building blocks of XDM schemas, including key principles and best practices in schema composition.
    -   [Schema Editor tutorial](../../tutorials/schema_editor_tutorial/schema_editor_tutorial.md): Learn how to create custom schemas using the Schema Editor UI.
-   [Real-time Customer Profile](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md): Provides a unified, real-time consumer profile based on aggregated data from multiple sources.

### Supported file formats

Experience Platform supports the following file formats to be ingested from external storages:

*   Delimiter-separated values (DSV): Support for DSV formatted data files is currently limited to comma-separated values. The value of field headers within DSV formatted files must only consist of alphanumeric characters and underscores. Support for general DSV files will be provided in the future.
*   JavaScript Object Notation (JSON): JSON formatted data files must be XDM compliant.
*   Apache Parquet: Parquet formatted data files must be XDM compliant.

### Gather required credentials

In order to access your GCS data on Platform, you must provide a valid GCS **Access Key ID** and **Secret**. You can learn more about how to obtain these values by reading the <a href="https://cloud.google.com/docs/authentication/production" target="_blank">server-to-server authentication guide</a> for Google Cloud.

## Connect your GCS account

Once you have gathered your required credentials, you can follow the steps below to create a new inbound base connection to link your GCS account to Platform.

If you already have a GCS base connection, you may skip this section and [configure a dataflow](#configure-a-dataflow).

Log in to <a href="https://platform.adobe.com" target="_blank">Adobe Experience Platform</a> and then select **Sources** from the left navigation bar to access the *Sources* workspace. The *Catalog* screen displays a variety of sources for which you can create inbound base connections with, and each source shows the number of existing base connections associated to them.

Under the *Cloud Storage* category, select **Google Cloud Storage** to expose an information bar on the right-hand side of your screen. The information bar provides a brief description for the selected source as well as options to connect with the source view its documentation, or to connect with the source. To create a new inbound base connection, click **Connect source**. 

![](images/google-cloud-storage/sources-catalog.png)

The _Connect to Google Cloud Storage_ dialog appears. On the input form, provide the base connection with a name, an optional description, and your GCS credentials. When finished, click **Connect** and then allow some time for the new base connection to establish.

![](images/google-cloud-storage/gcs-credentials.png)

Once a base connection is established, you can continue on to the next section and configure a dataflow to bring data into Platform.

## Configure a dataflow

A dataflow is a scheduled task that retrieves and ingests data from a source to a Platform dataset. Follow the steps below to configure a new dataflow using your GCS base connector.

Within the _Sources_ workspace, click the **Browse** tab to list your existing base connections. Find your GCS connection and click its name to access the *Source activity* screen.

![](images/google-cloud-storage/browse-base-connectors.png)

The *Source activity* screen lists all active and inactive dataflows for the connection. The information column on the right-hand side of the UI provides useful information regarding the selected base connection, such as the connector ID. Click **Select data** to configure a new dataflow using the base connector you are viewing.

![](images/google-cloud-storage/flows-none.png)

### Select data

The *Select data* step appears, providing an interactive interface for you to explore your GCS file hierarchy.

* The left half of the interface is a directory browser, displaying your server's files and directories.
* The right half of the interface lets you preview up to 100 rows of data from a compatible file.

Clicking a listed folder allows you to traverse the folder heirarchy into deeper folders. Once you have a compatible file or folder selected, the **Select data format** dropdown appears, where you can choose a format to display the data in the preview window.

![](images/google-cloud-storage/select-data-format.png)

You can choose to upload all files within the selected folder by clicking **Next**. If you want to upload to a specific file, select that file from the listing before clicking **Next**.

>   **Note:** Supported file formats include CSV, JSON, and Parquet. JSON and Parquet files must be XDM compliant.

![](images/google-cloud-storage/select-data-next.png)

### Map data fields to an XDM schema

The *Mapping* step appears, providing an interactive interface to map the source data to a Platform dataset. Source files formatted in JSON or Parquet must be XDM compliant and do not require you to manually configure the mapping. CSV files, conversely, require you to explicitly configure the mapping, but allow you to pick which source data fields to map.

Choose a dataset for inbound data to be ingested into. You can either use an existing dataset or create a new one.

**Use an existing dataset**

To ingest data into an existing dataset, select **Use existing dataset**, then click the dataset icon.

![](images/google-cloud-storage/use-existing-dataset.png)

The _Select dataset_ dialog appears. Find the dataset you you wish to use, select it, then click **Continue**.

![](images/google-cloud-storage/select-dataset.png)

**Use a new dataset**

To ingest data into a new dataset, select **Create new dataset** and enter a name and description for the dataset in the fields provided. Next, click the schema icon.

![](images/google-cloud-storage/use-new-dataset.png)

The _Select schema_ dialog appears. Select the schema you wish to apply to the new dataset, then click **Done**.

![](images/google-cloud-storage/select-schema.png)

Based on your needs, you can choose to map fields directly, or use mapper functions to transform source data to derive computed or calculated values. For more information on data mapping and mapper functions, refer to the tutorial on [mapping CSV data to XDM schema fields](../../tutorials/map-csv-to-xdm/map-csv-to-xdm.md#map-csv-fields-to-xdm-schema-fields).

Once your source data is mapped, click **Next**.

![](images/google-cloud-storage/mapping-data.png)

### Schedule ingestion runs

The *Scheduling* step appears, allowing you to configure an ingestion schedule to automatically ingest the selected source data using the configured mappings. The following table outlines the different configurable fields for scheduling:

Field | Description
--- | ---
Frequency | Selectable frequencies include Minute, Hour, Day, and Week.
Interval | An integer that sets the interval for the selected frequency.
Start time | A UTC timestamp for which the very first ingestion will occur.
Backfill | Upon creating a dataflow, the selected source file is copied into Platform regardless of the configured *Start time*. If *Backfill* is enabled, the initial copy of the source file is ingested together with the version that exists in your cloud storage during the first scheduled ingestion.

Dataflows are designed to automatically ingest data on a scheduled basis. If you wish to only ingest once through this workflow, you can do so by configuring the **Frequency** to "Day" and applying a very large number for the **Interval**, such as 10000 or similar.

Provide values for the schedule and click **Next**.

![](images/google-cloud-storage/scheduling.png)

### Review your dataflow 

The *Review* step appears, allowing you to review your new dataflow before it is created. Details are grouped within the following categories:

* *Source details*: Shows the source type, the relevant path of the chosen source file, and the amount of columns within that source file.
* *Target details*: Shows which dataset the source data is being ingested into, including the schema that the dataset adheres to.
* *Schedule details*: Shows the active period, frequency, and interval of the ingestion schedule.

Once you have reviewed your dataflow, click **Finish** and allow some time for the dataflow to be created.

![](images/google-cloud-storage/review.png)

## Monitor data ingestion

Once your GCS dataflow has been created, you can monitor the data that is being ingested through it. Follow the steps below to access a dataflow's dataset monitor.

Within the _Sources_ workspace, click the **Browse** tab to list your base connections. In the displayed list, find the connection that contains the dataflow you wish to monitor by clicking its name.

![](images/google-cloud-storage/browse-base-connectors.png)

 The *Source activity* screen appears. From here, click the name of a dataset whose activity you want to monitor.

![](images/google-cloud-storage/select-dataflow-dataset.png)

The *Dataset activity* screen appears. This page displays the rate of messages being consumed in the form of a graph.

![](images/google-cloud-storage/dataset-activity.png)

Below the graph is a list of batches that were ingested into the dataset, showing their status (successful or failed) and the number of records ingested. If a batch is ingested into a Profile-enabled dataset, the number of ingested profiles and identities are displayed.

You can view more details about a listed batch by clicking its ID.

![](images/google-cloud-storage/select-batch.png)

![](images/google-cloud-storage/batch-details.png)

For more information on monitoring datasets and ingestion, refer to the tutorial on [monitoring streaming dataflows](../../technical_overview/streaming_ingest/monitor-data-flows.md).

## Next steps

By following this tutorial, you have successfully created a GCS base connection, created a dataflow to bring in data from an external cloud storage, and gained insight on monitoring datasets. Incoming data can now be used by downstream Platform services such as Real-time Customer Profile and Data Science Workspace. See the following documents for more details:

*   [Real-time Customer Profile overview](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md)
*   [Data Science Workspace overview](../../technical_overview/data_science_workspace_overview/dsw_overview.md)

## Appendix

The following sections provide additional information for working with source connectors.

### Disable a dataflow

When a dataflow is created, it immediately becomes active and ingests data according to the schedule it was given. You can disable an active dataflow at any time by following the instructions below.

Within the _Sources_ workspace, click the **Browse** tab. Next, click the name of the base connection that the active dataflow you wish to disable belongs to.

![](images/google-cloud-storage/browse-base-connectors.png)

The _Source activity_ page appears. Select the active dataflow from the list to open its *Properties* column on the right-hand side of the screen, which contains an **Enabled** toggle button. Click the toggle to disable the dataflow. The same toggle can be used to re-enable a dataflow after it has been disabled.

![](images/google-cloud-storage/toggle-enabled.png)

### Activate inbound data for Profile hydration

Inbound data from your GCS storage can be used towards enriching and hydrating your Real-time Customer Profile data.

In order to enrich customer profiles, the target dataset's source schema must be compatible for use in Real-time Customer Profile. A compatible schema satisfies the following requirements:

*   The schema has at least one attribute specified as an identity property.
*   The schema has an identity property defined as the primary identity.
*   A mapping within the dataflow exists wherein the primary identity is a target attribute.

Within the Sources workspace, click the **Browse** tab to list your base connections. In the displayed list, find the connection that contains the dataflow you wish to hydrate profiles with. Click the connection's name to access its details.

![](images/google-cloud-storage/browse-base-connectors.png)

The connection's *Source activity* screen appears, displaying the datasets that the connection is ingesting source data into. Click the name of the dataset you wish to enable for Profile.

![](images/google-cloud-storage/select-dataflow-dataset.png)

The _Dataset activity_ screen appears. The _Properties_ column on the right-hand side of the screen displays the details of the dataset, and includes a **Profile** switch and a link to the schema the dataset adheres to. Click the name of the schema to view its composition.

![](images/google-cloud-storage/select-dataset-schema.png)

The *Schema Editor* appears, showing the structure of the schema in the center canvas. Within the canvas, select the field to be set as the primary identity. Under the *Field properties* tab that appears, select the **Identity** checkbox, then **Primary identity**. Finally, select an appropriate **Identity namespace**, then click **Apply**.

![](images/google-cloud-storage/set-schema-identity.png)

Click the top-level object of the schema's structure and the *Schema properties* column appears. Enable the schema for Profile by toggling the **Profile** switch. Click **Save** to finalize your changes.

![](images/google-cloud-storage/enable-profile.png)

Now that the schema is enabled for Profile, return to the _Dataset activity_ screen and enable the dataset for Profile by clicking the **Profile** toggle within the *Properties* column.

![](images/google-cloud-storage/enable-profile-dataset.png)

With both the schema and dataset enabled for Profile, data ingested into that dataset will now also hydrate customer profiles.

> **Note:** Existing data within a recently enabled dataset is not consumed by Profile.