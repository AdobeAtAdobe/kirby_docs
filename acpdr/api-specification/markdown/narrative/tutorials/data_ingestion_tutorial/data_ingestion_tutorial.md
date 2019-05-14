# Ingest data into Adobe Experience Platform

Adobe Experience Platform allows you to easily import data into Platform as batch files. Examples of data to be ingested may include profile data from a flat file in a CRM system (such as a parquet file) or data that conforms to a known Experience Data Model (XDM) schema in the Schema Registry.

This tutorial will walk you through the steps to ingest data into Experience Platform using the user interface, including showing you how to:

* [Create a dataset](#create-a-dataset)
* [Select a dataset schema](#select-dataset-schema)
* [Enable a dataset for Unified Profile Service](#enable-dataset-for-unified-profile-service)
* [Add data to a dataset](#add-data-to-dataset)
* [View batch details](#batch-details)
* [Preview dataset data](#preview-dataset)

## Getting started

In order to complete this tutorial, you must have access to Experience Platform. If you do not have access to an IMS Organization in Experience Platform, please speak to your system administrator before proceeding. 

If you would prefer to ingest data using Data Ingestion APIs please begin by reading the [Batch Ingestion Overview](../../technical_overview/ingest_architectural_overview/ingest_architectural_overview.md).

## Datasets workspace

The Datasets workspace within Experience Platform allows you to view and manage all of the datasets that your IMS organization has made, as well as create new ones. 

View the Datasets workspace by clicking **Datasets** in the left-hand navigation. The Datasets workspace contains a list of datasets, including columns showing _Name_, _Created_ (date and time), _Source_, _Schema_, and _Last Batch Status_, as well as the date and time the dataset was _Last Updated_. 

> **Note:** Click on the filter icon next to the Search bar to use filtering capabilities to view only those datasets enabled for Unified Profile.

![View all datasets](images/datasets_workspace.png)

## Create a dataset

To create a dataset, click **Create Dataset** in the top right corner of the Datasets workspace. 

On the **Create Dataset** screen, select whether you would like to "Create Dataset from Schema" or "Create Dataset from CSV File". 

For this tutorial, a schema will be used to create the dataset. Click **Create Dataset from Schema** to continue.

![Select data source](images/create_dataset.png)

## Select dataset schema

On the **Select Schema** screen, choose a schema by clicking the radio button beside the schema you wish to use. For this tutorial, the dataset will be made using the Loyalty Members schema. Using the search bar to filter schemas is a helpful way to find the exact schema you are looking for.

Once you have selected the radio button next to the schema you wish to use, click **Next**.

![Select schema](images/select_schema.png)

## Configure dataset

On the **Configure Dataset** screen, you will be required to give your dataset a **Name** and may also provide a **Description** of the dataset as well. 

_**Notes on Dataset Names:**_
* Dataset names should be short and descriptive so that the dataset can be easily found in the library later. 
* Dataset names must be unique, meaning it should also be specific enough that it will not be reused in the future. 
* It is best practice to provide additional information about the dataset using the description field, as it may help other users differentiate between datasets in the future.

Once the dataset has a name and description, click **Finish**.

![Configure dataset](images/configure_dataset.png)

## Dataset activity

An empty dataset has now been created and you have been returned to the **Dataset Activity** tab in the Datasets workspace. You should see the name of the dataset in the top-left corner of the workspace, along with a notification that "No batches have been added." This is to be expected since you have not added any batches to this dataset yet. 

On the right-hand side of the Datasets workspace you will see the **Info** tab containing information related to your new dataset such as _Dataset ID_, _Name_, _Description_, _Table Name_, _Schema_, _Streaming_, and _Source_. The Info tab also includes information about when the dataset was _Created_ and its _Last Modified_ date. 

Also in the Info tab is a _Unified Profile_ toggle that is used for enabling your dataset for use with Unified Profile Service. Use of this toggle, and Unified Profile Service, will be explained in more detail in the section that follows.

![Dataset activity](images/dataset_activity.png)

## Enable dataset for Unified Profile Service

Datasets are used for ingesting data into Experience Platform, and that data is ultimately used to identify individuals and stitch together information coming from multiple sources. That stitched together information is called a Real-Time Customer Profile. In order for Platform to know which information should be included in the Real-Time Profile, datasets can be marked for inclusion using the **Unified Profile** toggle. 

By default, this toggle is off. If you choose to toggle on Unified Profile, all data ingested into the dataset will be used to help identify an individual and stitch together their Real-Time Profile.

To learn more about Unified Profile Service and working with identities, please review the [Identity Service](../../technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md) documentation.

1. To enable the dataset for Unified Profile, click the **Unified Profile** toggle in the **Info** tab. 

![Unified Profile toggle](images/enable_dataset_unified_profile.png)

2. A dialog will appear asking you to confirm that you want to enable the dataset for Unified Profile.

![Enable Unified Profile dialog](images/confirm_dataset_enable.png)

3. Click **Enable** and the toggle will turn blue, indicating it is on.

![Enabled for Unified Profile](images/dataset_enabled.png)

## Add data to dataset

Data can be added into a dataset in a number of different ways. You could choose to use Data Ingestion APIs or an ETL partner such as Unifi or Informatica. For this tutorial, data will be added to the dataset using the **Add Data** tab within the UI.

To begin adding data to the dataset, click on the **Add Data** tab. You can now drag and drop files or browse your computer for the files you wish to add. 

> **Note:** Platform supports two files types for data ingestion, parquet or JSON. You may add up to five files at a time, with the maximum file size of each file being 10 GB.

![Add Data tab](images/add_data.png)

## Upload a file

Once you drag and drop (or browse and select) a parquet or JSON file that you wish to upload, Platform will immediately begin to process the file and an **Uploading** dialog will appear on the **Add Data** tab showing the progress of your file upload.

![Uploading dialog](images/uploading.png)

## Dataset metrics

After the file has finished uploading, the **Dataset Activity** tab no longer shows that "No batches have been added." Instead, the Dataset Activity tab now shows dataset metrics. All metrics will show "0" at this stage as the batch has not yet loaded.

At the bottom of the tab is a list showing the _Batch ID_ of the data that was just ingested through the ["Add data to dataset"](#add-data-to-dataset) process. Also included is information related to the batch, including _Ingested_ date, number of _Records Ingested_, and the current batch _Status_.

![Dataset metrics](images/batch_loading.png)

## Batch details

Click on the _Batch ID_ to view a **Batch Overview**, showing additional details regarding the batch. Once the batch has finished loading, the information about the batch will update to show the number of _Records Ingested_ and the _File Size_. The _Status_ will also change to "Success" or "Failed". If the batch fails the _Error Code_ section will contain details regarding any errors during ingestion.

For more information and frequently asked questions regarding batch ingestion, see the [Batch Ingestion Troubleshooting Guide](../../technical_overview/ingest_architectural_overview/batch_data_ingestion_troubleshooting_guide.md).

To return to the **Dataset Activity** screen, click the name of the dataset (_Loyalty Details_) in the breadcrumb.

![Batch Overview](images/batch_overview.png)

## Preview dataset

Once the dataset is ready, an option to **Preview Dataset** appears at the top of the **Dataset Activity** tab. 

Click **Preview Dataset** to open a dialog showing sample data from within the dataset. If the dataset was created using a schema, details for the dataset schema will appear on the left-side of the preview. You can expand the schema using the arrows to see the schema structure. Each column header in the preview data represents a field in the dataset.

![Dataset details](images/dataset_details.png)

## Next steps

Now that you have created a dataset and successfully ingested data into Experience Platform, you can repeat these steps to create a new dataset or ingest more data into the existing dataset.

To find additional tutorials for working with both the user interface and Experience Platform APIs, visit the [Tutorials section](https://www.adobe.io/apis/experienceplatform/home/tutorials.html).
