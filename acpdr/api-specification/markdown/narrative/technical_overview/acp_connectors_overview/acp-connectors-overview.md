# Sources overview

Adobe Experience Platform allows data to be ingested from external sources while providing you with the ability to structure, label, and enhance incoming data using Platform services. You can ingest data from a variety of sources such as Adobe Solutions, cloud-based storage, third party software, and your CRM.

Experience Platform provides a RESTful API and an interactive UI that lets you set-up source connections to various data providers with ease. These source connections allow you to you authenticate to your storage systems and CRM services, set times for ingestion runs, and manage data ingestion throughput.

## Centralizing your data

In this day and age where the world is augmented by digital technologies, information is constantly being generated and digitally stored. By leveraging the power of machine learning and advancements in the field of data science, useful insights can be derived through data analysis to help understand why things are the way they are. As an organization, data science can be applied to help better understand their customers given that the required data is available and uniform in representation. With the growing demand for data, the natural bottleneck in capitalising digital information is obtaining it at-scale, especially when it is scattered across innumerable locations and represented in countless ways. Sources on Experience Platform lifts the restrictions involved in data collection by centralizing your data to represent them in unified fashion.

## Types of sources

Sources in Experience Platform are grouped into the following categories:

### Adobe applications

Experience Platform allow data to be ingested from other Adobe applications, including Adobe Analytics, Adobe Audience Manager, and Experience Platform Launch. See the following related documents for more information:

-   [Adobe Audience Manager connector overview](./audience_manager_connector.md)
-   [Create an Adobe Audience Manager source connector in the UI](../../tutorials/sources_tutorial/aam-ui-tutorial.md)
-   [Adobe Analytics data connector overview](./analytics_data_connector.md)
-   [Create an Adobe Analytics source connector in the UI](../../tutorials/sources_tutorial/adobe-analytics-ui-tutorial.md)

### Cloud Storage

Cloud storage sources allow you to bring your own data into Platform without the need to download, format, or upload. Every step of the process is integrated into the Sources workflow using the user interface. Support for cloud storage providers include Amazon S3, Azure Blob, FTP servers, and SFTP servers. See the following related documents for more information:

-   [Create an Azure Blob or Amazon S3 source connector in the UI](../../tutorials/sources_tutorial/amazon-s3-ui-tutorial.md)
-   [Create an FTP or SFTP source connector in the UI](../../tutorials/sources_tutorial/ftp-sftp-ui-tutorial.md)

### Customer Relationship Management (CRM)

CRM systems provide data can be help build customer relations which creates loyalty and customer retention. Experience Platform provides support for ingesting CRM data from Microsoft Dynamics 365 and Salesforce. See the following related documents for more information:

-   [Create a Microsoft Dynamics 365 or Salesforce source connector in the UI](../../tutorials/sources_tutorial/dynamics-salesforce-ui-tutorial.md)
