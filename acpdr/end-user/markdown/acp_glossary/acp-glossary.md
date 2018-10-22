# Glossary of the Adobe Experience Platform


## A

__Adobe Experience Platform:__ Adobe Experience Platform (AEP) centralizes and standardizes content and data; to help identify, understand and engage customers to deliver consistent, continuous and compelling experiences. AEP leverages Adobe Sensei, Adobe’s AI and machine learning framework across Adobe Creative, Document and Experience Clouds. 

__Adobe Connectors:__ Adobe Connectors are pre-configured connections created by Adobe, that enable data to flow in and out of the Adobe Experience Platform. An example of an Adobe connector would be Salesforce, Microsoft Dynamics, Adobe Analytics or Adobe Campaign.

__Adobe I/O:__ Adobe I/O is part of Adobe Experience Platform and provides access to everything developers need to integrate, extend and customize Adobe Experience Platform including APIs, events, developer console, and helpful tooling. 

__Append Save Strategy:__ `Append` save strategy is an option when specifying 3rd party data to ingest via a connection, any new data or rows are written to the end of the dataset. The previously ingested rows remain untouched and only rows created since the last scheduled run are ingested into the Adobe Experience Platform. Any rows that were changed in the source system remained unchanged on the AEP. 

## B

__Backfill Period:__ Backfill period is an option for ingesting 3rd party data via a connection, how far back in time is existing data is ingested to the Adobe Experience Platform. Selecting a backfill period of forever will ingest the entire history of the source data to AEP.

__Batch:__ Batch is a set of data collected over a period of time and processed together as a single unit.

## C

__Connection:__ A connection is a virtual pipeline that enables data to flow in and out of the Adobe Experience Platform.

__Connection Labels:__ Connection labels are data governance labels that are applied when setting up or editing a connection. Data governance labels added to a connection are inherited down or applied to all datasets and fields ingested through the connection.

__Contractual Data "C" Labels:__ Contractual data "C" labels are a type of data governance label that is used to categorize data that has contractual obligations or is related to an organization's data governance policies. 

__C1 Contractual Data Label:__ C1 contractual data label specifies that data can only be exported from Adobe Experience Cloud, in an aggregated form without including individual or device identifiers.  An example of the type of data that would have C1 label applied, includes data that originated from social media such as Facebook or Twitter.

__C2 Contractual Data Label:__ C2 contractual data governance label specifies data cannot be exported to a 3rd party. An example of the type of data that would have C2 label applied, includes data that originated from social media and a 3rd party data provider.

__C3 Contractual Data Label:__ C3 contractual data governance label specifies data cannot be used in conjunction with directly identifiable information. An example of the type of data that would have C3 label applied, includes data sourced from ad networks, ad servers and 3rd party data providers.

__C4 Contractual Data Label:__ C4 contractual data governance label specifies data cannot be used for any targeting, including customer's own sites and apps. C4 label is customer privacy policy specific and aligns with ICO cookie categories such as performance, functionality and advertising cookies.

__C5 Contractual Data Label:__ C5 contractual data governance label specifies data cannot be used for targeting on customer's own sites and apps. C5 label is customer privacy policy specific and is a subset of the C4 label, it limits targeting on the customer sites and apps only, cross site targeting would be permitted.

__C6 Contractual Data Label:__ C6 contractual data governance label specifies data cannot be used for cross-site targeting. C6 label is customer privacy policy specific and is a subset of the C4 label, it limits cross-site targeting, however customer site and app targeting would be permitted.  C6 label is customer privacy policy specific and is roughly similar to ICO advertising cookies.

__C7 Contractual Data Label:__ C7 contractual data governance label specifies data cannot be used for performance and optimization of customer's own website. C7 label is customer privacy policy specific and is roughly similar to ICO performance and functionality cookies.

__Created Date Column:__ Selecting a `Created Date` column, is an option when specifying 3rd party data via a connection. When the `Append` save strategy is selected and the dataset contains multiple date related schema, the user must choose from the available date / time type schema to specify `Created Date` key column. `Created Date` option is not available when the `Overwrite` save strategy is selected.

__Customer Data Model:__ A collection of related schemas and schema descriptors for a customer’s business domain.


## D

__Dataset:__ A dataset is a storage and management construct for a collection of data, typically a table, that contains schema (columns) and fields (rows).

__Data Governance:__ Data governance encompasses the strategies and technologies used to ensure data is in compliance with regulations and organization policies with respect to data usage.

__Data Governance Labels:__ Data governance labels provide users the ability to classify data that reflects privacy related considerations and contractual conditions to be compliant with regulations and organization policies. Data governance labels added to a connection are inherited down or applied to all datasets and fields ingested through the connection.  Data governance labels can also be applied directly to datasets and fields.

__Data Integration Partners:__ Data integration partners are companies that Adobe partners with to integrate and automate the flow of data to and from 3rd party sources to and from the Adobe Experience Platform.

__Dataset Labels:__ Dataset labels are data governance labels that are either inherited from a connection or applied directly to a dataset. Labels applied to a dataset are applied to all fields within the dataset.

__Data Steward:__ Data steward is the person responsible for the management, oversight and enforcement of an organization's data assets. A data steward also ensures data governance policies are safeguarded and maintained to be compliance with government regulations and organization policies.

__Delta Save Strategy:__ Delta save strategy is an option for ingesting 3rd party data via a connection. The option allows the user to specify that new or changed rows of source data are ingested into the Adobe Experience Platform. New rows are added to the end of the dataset and changed rows are updated in dataset on the AEP.

__Display Name:__ Display name is the title of a field that is shown in the schema user interface.

## E

__Experience Data Model (XDM):__ Experience Data Model (XDM) is the concept of using standard schemas to unify data for use with the Adobe Experience Platform and Adobe Experience 
solutions. XDM standardizes how data is structured and speeds up and simplifies the process of gaining insights from massive amounts of data.

__ExperienceEvent:__ ExperienceEvent is an Adobe Experience Platform standard schema used to define behavioral event data.

__Extension:__ An extension is the addition of one or more fields to an existing schema.

## F

__Field:__ A field is the lowest level element of a dataset, it has a name which allows it to be referenced and type which identifies the type of data that it contains. Field types can include, integer, number, string, Boolean and schema.

__Field Labels:__ Field labels are data governance labels that are either inherited from a connection and or a dataset or applied directly to a field.  Data governance labels applied to a field, are never applied or are inherited up to a dataset or connection.

__Field Types:__ The data type of a field. When defining a new field in a schema this is the type of data that is stored. Field types can include, integer, number, string, Boolean and schema.

## G

## H

## I

__Identity "I" Data Labels:__ Identity data "I" labels are data governance labels used to categorize data that can identify or contact a specific person.

__I1 Data Label:__ The I1 data label is used to classify data that can directly identify or contact a specific person, rather than a device. Directly identifiable data requires no further lookup tables in order to contact or identify a given individual.

__I2 Data Label:__ The I2 data label is used to classify indirectly identifiable data that can be used in combination with any other data to identify or contact a specific person.  Indirectly identifiable data can be used to contact or identify a given individual if used with other data, no matter where the additional data is located or who has control of the data.

__Ingest:__ Ingestion is the process of adding data from a source to the Adobe Experience Platform. Data can be ingested to the AEP in a number of ways, it can be streamed, batched or added via file upload.

__Ingestion Schedule:__ Ingestion schedule provides time based options for when data is ingested from a source to the Adobe Experience Platform.

## J

## K

## L

## M

__Modified Date Column:__ Selecting a `Modified Date` column, is an option when specifying 3rd party data via a connection. When the `Delta` save strategy is selected and the dataset contains multiple date related schema, the user must choose from the available date / time type schema to specify modified date key column. `Modified Date` option is not available when the `Overwrite` save strategy is selected.

## N

## O

__Overwrite Save Strategy:__ `Overwrite` save strategy is an option for ingesting 3rd party data via a connection, where the user specifies if ingested data will be overwritten on a specified schedule. The Adobe Experience platform will ingest the specified dataset from the 3rd party source and overwrite the dataset on the AEP.

## P

__Parquet Files:__ A Parquet file is a columnar storage file format with complex nested data structures. Parquet files are required for adding data to populate a schema dataset.

__Profile Standard Schema:__ Profile standard schema includes schema related to people and can contain detailed personal information such as names, gender, date of birth, locations, and contact information like phone numbers and email addresses.

## Q

## R

## S

__Sample Data:__ Sample data is a preview of a data file, typically the first 100 rows, to provide a data scientist or engineer an idea of what schema and or data is in the data file.

__Schema:__ Schema is a hierarchical organization of business data applied to a use case. On the Adobe Experience Platform, customers have a choice between an Adobe standard schema such as Profile or ExperienceEvent or a custom schema defined by a customer.

__Schema Descriptor:__ Additional schema related metadata that describes a behaviour that can be used by platform services to understand intended schema behavior such as the relationship between two schema.

__Sensitive Data Labels:__ Sensitive data "S" labels are a type of data governance label used to categorize sensitive data such as geographic data.

__S1 Data Label:__ The S1 data governance label is used to classify precise geo-location data related to latitude and longitude that can be used to determine the precise location of a device.

__S2 Data Label:__ The S2 data governance label is used to classify geo-location data associated with a broadly defined geo-fence area.

__Standard Schema:__ Standard schema is part of the library of schema that Adobe maintains and provides out of the box ready for customer use. Standard schema may be created by Adobe or Adobe partners.

## T

## U

## V

## W

## X

__XDM (Experience Data Model):__ XDM (Experience Data Model) is the concept of using standard schemas to unify data for use with the Adobe Experience Platform and Adobe Experience Cloud solutions. XDM standardizes how data is structured and speeds up and simplifies the process of gaining insights from massive amounts of data.

## Y

## Z
