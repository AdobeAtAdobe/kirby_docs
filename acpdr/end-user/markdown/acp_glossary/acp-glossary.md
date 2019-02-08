# Adobe Experience Platform Glossary


## A

<a name="Access key ID"></a>
__Access key ID:__ Access key ID is a unique identifier that's associated with an Amazon S3 secret access key. The access key ID and secret access key are used together to sign AWS requests.

<a name="Adobe Experience Platform"></a>
__Adobe Experience Platform:__  Experience Platform centralizes and standardizes diverse content and data to identify a customer and deliver consistent and compelling experiences. It is the foundational structure for building and managing integrated Adobe and partner solutions.

<a name="Adobe Connectors"></a>
__Adobe Connectors:__ Adobe Connectors are pre-configured connections created by Adobe to enable data to flow in and out of Experience Platform. Connectors include Microsoft Dynamics, Salesforce, Amazon S3, and Azure Blob.

<a name="Adobe I/O"></a>
__Adobe I/O:__ Adobe I/O is part of Experience Platform and provides access to everything developers need to integrate, extend, and customize Experience Platform including APIs, events, developer console, and helpful tooling.

<a name="Amazon S3 bucket"></a>
__Amazon S3 bucket:__ Amazon S3 buckets are the foundational containers for data stored in the Amazon ecosystem. Buckets contain objects, each object is stored and retrieved using a unique developer-assigned key.

<a name="Amazon S3 connector"></a>
__Amazon S3 connector:__ Amazon S3 connector allows customers of Experience Platform to securely connect and access their Amazon S3 data.

<a name="Append Save Strategy"></a>
__Append Save Strategy:__ `Append` save strategy is an option used when specifying third-party data to ingest via a connection and appending any new data or rows at the end of the dataset. The previously ingested rows remain untouched and only rows created since the last scheduled run are ingested into Experience Platform. Any rows that were changed in the source system remain unchanged on Experience Platform.

<a name="Array"></a>
__Array:__ Arrays are used for ordered elements with the same data type.

<a name="Attributes"></a>
__Attributes:__ Attributes are specified characteristics that represent a profile.

<a name="Audience"></a>
__Audience__: An audience is a collection of profiles that meet the segment definition criteria.

<a name="Audience Snapshot"></a>
__Audience Snapshot__: An audience snapshot is a segment definition capturing all who meet the segment rules at the time of segmentation.

## B

<a name="Backfill Period"></a>
__Backfill Period:__ Backfill period is an option to set the length of time for ingesting third-party historical data via a connection. Selecting a backfill period of forever will ingest the entire history of the source data to Experience Platform.  

<a name="Batch"></a>
__Batch:__ Batch is a set of data collected over a period of time and processed together as a single unit.

<a name="Batch ID"></a>
__Batch ID:__ Batch ID is an Adobe-generated identifier for a batch of data.

__Business intelligence tools:__ Business intelligence, also known as "BI" tools are primarily integrated with the Experience Platform Query Service. BI tools are types of application software that collect and process large amounts of unstructured data from internal and external systems.

<a name="Business Intelligence Tools"></a>
__Business Intelligence Tools:__ Business intelligence tools, also known as "BI" tools are used to connect to Query Service to build reports and visualizations using the data found in the Data Lake.

## C

<a name="Class"></a>
__Class__: Class defines the smallest set of behaviors used to build a schema and is the base behavior that describes the business object.

<a name="Client"></a>
__Client:__ A client is an external tool or application which connects to Query Service via postgres protocol or HTTP API.

<a name="Command Line Interface"></a>
__Command Line Interface:__ Command Line Interface is a command line tool used to connect to Query Service for raw query execution.

<a name="Composition"></a>
__Composition__: A composition is a grouping of components that form together to make up the schema.

<a name="Connection"></a>
__Connection:__ A connection is a virtual pipeline that enables data to flow in and out of Experience Platform.

<a name="Connection Labels"></a>
__Connection Labels:__ Labels applied to a connection will result in all ingested datasets and fields to inherit the specified labels. 

<a name="Contract Data C Labels"></a>
__Contract Data "C" Labels:__ Contract `C` labels are used to categorize data that has contractual obligations or is related to a customer's data governance policies.

<a name="C1 Contract Label"></a>
__C1 Contract Label:__ `C1` contract data governance label specifies data can only be exported from Adobe Experience Cloud in an aggregated form without including individual or device identifiers. For example, data that originated from social networks. 

<a name="C2 Contract Label"></a>
__C2 Contract Label:__ `C2` contract data governance label specifies data that cannot be exported to a third-party. Some data providers have terms in their contracts that prohibit the export of data from where it was originally collected.  For example, social networks contracts often restrict the transfer of data you receive from them. C2 is more restrictive than C1, which only requires aggregation and anonymous data.

<a name="C3 Contract Label"></a>
__C3 Contract Label:__ `C3` contract data governance label specifies data that cannot be combined or otherwise used with directly identifiable information. Some data providers have terms in their contracts that prohibit the combination or use of that data with directly identifiable information.  For example, contracts for data sourced from ad networks, ad servers, and third-party data providers often include specific contractual prohibitions on the use of directly identifiable data.

<a name="C4 Contract Label"></a>
__C4 Contract Label:__ `C4` contract data governance label specifies data cannot be used for targeting any ads or content, either on-site or cross-site. C4 is the most restrictive label as it encompasses C5, C6, and C7 labels.

<a name="C5 Contract Label"></a>
__C5 Contract Label:__ `C5` contract data governance label specifies data cannot be used for interest-based, cross-site targeting of content or ads. Interest-based targeting, or personalization, occurs if the following three conditions are met:  The data collected on-site is used to make inferences about a user's interest, is used in another context, such as on another site or app and is used to select which content or ads are served based on those inferences.

<a name="C6 Contract Label"></a>
__C6 Contract Label:__ `C6` contract data governance label specifies data cannot be used for on-site ad targeting. Data cannot be used for on-site ad targeting, including the selection and delivery of advertisements on your organization’s websites or apps or to measure the delivery and effectiveness of such advertisements.  This includes using previously collected on-site data about the users’ interest to select ads, process data about what advertisements were shown, when and where they were shown, and whether the users took any action related to the advertisement, such as clicking an ad or making a purchase.

<a name="C7 Contract Label"></a>
__C7 Contract Label:__ `C7` contract data governance label specifies data cannot be used for on-site targeting of content.  Data cannot be used for on-site content targeting, including the selection and delivery of content on your organization’s websites or apps or to measure the delivery and effectiveness of such content.  This includes previously collected information about users’ interest to select content, processing data about what content was shown, how often or how long it was shown, when and where it was shown, and whether the uses took any actions related to the content, including for example clicking on content.

<a name="C8 Contract Label"></a>
__C8 Contract Label:__ `C8` contract data governance label specifies data cannot be used for measurement of your organization’s websites or apps. Data cannot be used to measure, understand, and report on users’ usage of your organization’s sites or apps. This does not include interest-based targeting, which is the collection of information about your use of this service to subsequently personalize content and/or advertising in other contexts.

<a name="C9 Contract Label"></a>
__C9 Contract Label:__ `C9` contract data governance label specifies data cannot be used in Data Science workflows. Some contracts include explicit prohibitions on data used for data science.  Sometimes these are phrased in terms that prohibit the use of data for artificial intelligence (AI), machine-learning (ML), or modeling.

<a name="Created Date Column"></a>
__Created Date Column:__ Selecting a `Created Date` column is an option when specifying third-party data via a connection. When the append save strategy is selected and the dataset contains a multiple dates related schema, the user must choose from the available date/time schema to specify a `Created Date` key column. `Created Date` option is not available when the overwrite save strategy is selected.

<a name="Create Table as Select"></a>
__Create Table as Select:__ Create Table as Select is a SQL command which, when executed as a part of a complete and valid SQL query, will instruct the Query Service to persist the results of the query in a dataset on the Data Lake. Options include: Create New, Overwrite all Previous, and Append to Previous.

<a name="Cross-site Data"></a>
__Cross-site Data:__ Cross-site data is the combination of data from several sites, including a combination of on-site data and off-site data or a combination of data from several off-site sources.

<a name="Custom Identity Type"></a>
__Custom Identity Namespace:__ Custom identity types are customer created identifiers used to represent identities for a specific organization or business case.
 


## D

<a name="Data Stream"></a>
__Data Stream:__ A data stream is a set or collection of messages which share the same schema and are sent by the same source.

<a name="Dataset"></a>
__Dataset:__ A dataset is a storage and management construct for a collection of data, typically a table, that contains schema (columns) and fields (rows).

<a name="Dataset ID"></a>
__Dataset ID:__ An Adobe-generated identifier for an ingested dataset.

<a name="Dataset Output"></a>
__Dataset Output:__ Dataset output provides a mechanism for determining what the *Create Table as Select* option will be used for a particular Query Service run.

<a name="Data Governance"></a>
__Data Governance:__ Data governance encompasses the strategies and technologies used to ensure data is in compliance with regulations and organization policies with respect to data usage.

<a name="Data Governance Labels"></a>
__Data Governance Labels:__ Data governance labels provide users the ability to classify data that reflects privacy-related considerations and contractual conditions to be compliant with regulations and corporate policies. Data governance labels added to a connection are inherited down or applied to all datasets and fields ingested through the connection.  Data governance labels can also be applied directly to datasets and fields.

<a name="Data Integration Partners"></a>
__Data Integration Partners:__ Data integration partners simplify and automate the loading and transformation of massive volumes of data from over 200 sources into Experience Platform without writing code.

<a name="Dataset Labels"></a>
__Dataset Labels:__ Dataset labels can inherit labels added via a connection. Edit connection to add, edit, or remove dataset labels. Labels can be added to a dataset. Fields will inherit all dataset labels.

<a name="Data Science Workspace"></a>
__Data Science Workspace:__ Data Science Workspace is a value-add feature of Adobe Experience Platform that enables customers to create machine learning models utilizing data across Adobe Solutions, all to gain insights and predictions for end-user digital experiences.

<a name="Data Source"></a>
__Data Source:__ A data source is a user designated origin of data. Examples of a data source are a mobile app, profile and/or experience events, website profile events or a CRM.

<a name="Data Steward"></a>
__Data Steward:__ A data steward is a person or entity that provides safeguards for ensuring data governance labels are maintained to be compliance with regulations and corporate policies.

<a name="Data type"></a>
__Data type:__ Data type is a reusable object with properties in a hierarchical representation.
 
<a name="Delta Save Strategy"></a>
__Delta Save Strategy:__ Delta save strategy is an option for ingesting third-party data via a connection. The option allows the user to specify that new or changed rows of source data are ingested into Experience Platform. New rows are added to the end of the dataset and changed rows are updated in the dataset on Experience Platform.

__Display Name:__ Display name is a user-friendly name of a field that is shown in the UI.


<a name="DULE"></a>
__DULE:__ DULE is an acronym for *Data Usage Labeling and Enforcement*. DULE is a key part of data governance and a collection of key features that allows for data usage labeling and applying data access policies for governance needs within an organization.

## E

<a name="Enumeration"></a>
__Enumeration:__  An enum is a list of values that represent the valid data for a field.

<a name="Events"></a>
__Events__: Events are the behavior data associated with a profile.

<a name="Experience Data Model"></a>
__Experience Data Model (XDM):__ Experience Data Model (XDM) is the concept of using standard schemas to unify data for use with Experience Platform and Adobe Experience Cloud solutions. XDM standardizes how data is structured and speeds up and simplifies the process of gaining insights from massive amounts of data.

<a name="Experiment"></a>
__Experiment:__ An experiment is a process of creating a trained model by training the instance with a sample portion of the live production data.

<a name="Experiments"></a>
__Experiments:__ Experiments is the process of applying a trained model to a small portion of the live production data to validate its performance. This is different from a trained model that is tested against a holdout test dataset. This is also different from the concept of an Experiment in some ML frameworks where it actually means a sample modeling project.

<a name="ExperienceEvent"></a>
__ExperienceEvent:__ ExperienceEvent is an Experience Platform standard schema used to define behavioral event data.

## F

<a name="Field"></a>
__Field:__ A field is the lowest level element of a dataset. Each field has a name for referencing and a type to identify the type of data that it contains. Field types can include, integer, number, string, Boolean and schema.

<a name="Field Labels"></a>
__Field Labels:__ Field labels are data governance labels that are either inherited from a connection and/or a dataset or applied directly to a field.  Governance labels from a field are inherited across the dataset or connection.

<a name="Field Name"></a>
__Field Name:__ Field is a name used to reference the field in queries and services.

<a name="Frequency"></a>
__Frequency:__ Frequency determines how often a recurring scheduled Query Service query will run.

## G

<a name="GDPR"></a>
__GDPR:__ The General Data Protection Regulation (GDPR) is a legal framework that sets guidelines for the collection and processing of personal information of individuals within the European Union (EU). The GDPR sets out the principles for data management and the rights of the individual and covers all companies that deal with the data of EU citizens.

<a name="GDPR Data Label"></a>
__GDPR Data Label:__ GDPR governance label is used to define the fields that may contain personal identifiers for use in GDPR access and/or delete requests.

## H

## I

__Identity:__ Identity is an identifier such as a cookie ID, device ID, or email ID that uniquely represents an end customer.

<a name="Identity I Data Labels"></a>
__Identity "I" Data Labels:__ `Identity I` labels are used to categorize data that can identify or contact a specific person.

<a name="Identity Graph"></a>
__Identity Graph:__ Identity Graph is the output of grouped, stitched, and linked identity types translated to a visual representation of an identity within Unified Profile.

<a name="Identity Namespace"></a>
__Identity Namespace:__ An identity namespace is an identifier such as cookie ID, device ID, or email ID to indicate the context from which data originates and is used to recognize and link identities across Experience Cloud.

<a name="Identity Service"></a>
__Identity Service:__ Experience Platform Identity Service UI enables the creation and management of identity types to enable linking of identities across devices and channels for a complete user-view from Unified Profile.

<a name="Identity Type"></a>
__Identity Namespace:__ An identity namespace is an identifier such as a cookie ID, device ID, or email ID to indicate the context from which data originates and is used to recognize and link identities across Experience Cloud.

<a name="I1 Data Label"></a>
__I1 Data Label:__ The `I1` data label is used to classify directly identifiable data that can identify or contact a specific person rather than a device.

<a name="I2 Data Label"></a>
__I2 Data Label:__ The `I2` data label is used to classify indirectly identifiable data that can be used in combination with any other data to identify or contact a specific person.

<a name="Ingest"></a>
__Ingest:__ Ingestion is the process of adding data from a source to Experience Platform. Data can be ingested to Experience Platform in a number of ways including streamed, batched, or added via connector.

<a name="Ingestion Schedule"></a>
__Ingestion Schedule:__ Ingestion schedule provides time-based options when ingesting from a source to Experience Platform.

<a name="Instance"></a>
__Instance:__ An instance is an occurrence of the recipe configured with the right data definition to help solve specific business problems. It acts as the holder of configuration information to tailor the general model specification to a more narrow goal. A model instance will maintain a reference to the list of trained models that are created from it. Modifications to an instance can be tracked as a new version.

<a name="Interest-Based targeting or personalization"></a>
__Interest-Based targeting or personalization:__ Interest-based targeting, also known as personalization, occurs if the following three conditions are met: data collected on-site is used to make inferences about a user's interest, data is used in another context such as on another site or app (off-site), and if data is used to select which content or ads are served based on those inferences.


## J
<a name="JupyterLab"></a>
__JupyterLab:__ *JupyterLab* is an open-source web application used in Data Science Workspace primarily designed to provide a user interface based on Jupyter Notebook and offers complete support for data science languages.

<a name="Jupyter Notebook"></a>
__Jupyter Notebook:__ *Jupyter Notebook* is an open-source web application utilized in Data Science Workspace that allows users to create and share documents that contain live code, equations, visualizations, and narrative text. Uses include data cleansing and transformation, numerical simulation, statistical modeling, data visualization, and machine learning.


## K

## L

## M

<a name="Machine Learning"></a>
__Machine Learning (ML):__ Machine learning is a type of artificial intelligence that builds services in a mode of self-learning without being explicitly programmed and provides the ability to learn and improve from experiences to make predictions on data.

<a name="Machine Learning Model"></a>
__Machine Learning Model:__ A machine learning model is an intelligent recipe for solving a problem and is a container for the processing logic required to build and execute a trained model.  In Adobe Data Science Workspace, machine learning models are call recipes.

<a name="Mixin"></a>
__Mixin:__ Mixin is a reusable component that defines one or more attributes that are intended to be included in a dataset schema that can be reused or added to a class.

<a name="Modified Data Column"></a>
__Modified Date Column:__ Selecting a `Modified Date` column is an option when specifying third-party data via a connection. When the `Delta` save strategy is selected and the dataset contains multiple date related schema, the user must choose from the available date/time type schema to specify modified date key column. `Modified Date` option is not available when the `Overwrite` save strategy is selected.

## N

## O

<a name="Overwrite Save Strategy"></a>
__Overwrite Save Strategy:__ `Overwrite` save strategy is an option for ingesting third-party data via a connection, where the user specifies if ingested data will be overwritten on a specified schedule. Experience Platform will ingest the specified dataset from the 3rd party source and overwrite the dataset on Experience Platform.

## P

<a name="Parquet Files"></a>
__Parquet Files:__ A parquet file is a columnar storage file format with complex nested data structures. Parquet files are required for adding data to populate a schema dataset.

<a name="Primary key"></a>
__Primary key:__ Primary key is a designation in a schema to uniquely identify all records.

<a name="Profile"></a>
__Profile:__ Profile is an Experience Platform standard data model used to define attributes of consumers. A profile can also be an aggregate of event data and attributes related to a person and or device.

<a name="Profile ID"></a>
__Profile ID:__ A profile ID is an auto-generated identifier associated with an identity type and represents a profile.


## Q

<a name="Queries"></a>
__Queries:__ A query is a request for data from database tables.

<a name="Query Editor"></a>
__Query Editor:__ Query Editor is a tool for writing, validating, and submitting SQL statements in Query Service.

<a name="Query Service"></a>
__Query Service for Adobe Experience Platform:__ *Experience Platform Query Service* enables data analysts to query ExperienceEvents and XDMs for use in analytics and machine learning.

## R
<a name="Recipe"></a>
__Recipe:__ Recipe is Adobe's term for a model specification and is a top-level container representing a specific machine learning algorithm, processing logic, and configuration required to build and execute a trained model. 

<a name="Recipe Instance"></a>
__Recipe instance:__ Recipe instance represents the instantiation of a model for a specific use case. It acts as the holder of configuration information to tailor the more general model specification to a more narrow goal. A model instance will maintain a reference to the list of trained models that are created from it. Modifications to a recipe instance can be tracked as a new version.

<a name="Record"></a>
__Record:__ A record is data that persists as rows in a dataset.

<a name="Recurrence"></a>
__Recurrence:__ A recurrence defines whether a Query Service query is scheduled to run only once or on a recurring basis.

## S

<a name="Sample Data"></a>
__Sample Data:__ Sample data is a preview of a data file, typically the first 100 rows, to provide a data scientist or engineer an idea of what schema and/or data is in the data file.

<a name="Schedule"></a>
__Schedule:__ Schedule is a user-defined specification on frequency or cadence of data ingestion from a third-party data source to Adobe Experience Platform.

<a name="Scoring"></a>
__Scoring:__ Scoring is the process where the learned model, insight, or pattern is used for a different unlabeled or unprocessed dataset. A trained model can be used to score newly arriving data or withheld data for the purposes of performing model validation or ad hoc analysis.

<a name="Schema"></a>
__Schema:__  Schema is comprised of a class and optional mixin and is used to create datasets and/or data streams. A schema includes behavioral attributes, timestamp, identity, attribute definitions, and relationships.

<a name="Schema Descriptor"></a>
__Schema Descriptor:__ Schema descriptor is an additional schema related metadata that describes behavior that can be used by Experience Platform to understand intended schema behavior such as the relationship between two schemas.

<a name="Secret Access Key"></a>
__Secret Access Key:__ A secret access key is an Amazon S3 key that is used in conjunction with the access key ID to sign AWS requests.

<a name="Segment"></a>
__Segment:__ A segment is a set of rules that include attributes and event data that qualify a number of profiles to become an audience.

__Segment Builder:__ Segment Builder is the visual development environment used to build segment definitions and serves as a common component of all solutions using Unified Segmentation on Platform.


<a name="Segment ID"></a>
__Segment ID:__ Segment ID is an auto-generated identifier associated with a segment.

<a name="Segment Membership"></a>
__Segment Membership:__ Segment membership displays which segment a profile is currently part of.

<a name="Segment Rules"></a>
__Segment Rules:__ Segment rules are where and how the user defines what the profiles qualify for the segment.

<a name="Segment Type"></a>
__Segment Type:__ There are two types of segments: One is a segment that updates dynamically with Platform data changes, and the other is an audience snapshot that captures all profiles meeting segment rules and these don't change.

<a name="Segmentation"></a>
__Segmentation:__ Segmentation is the process of dividing a large group of customers, prospects, or consumers into smaller groups that share similar attributes and will respond similarly to marketing strategies.

<a name="Sensitive Data Labels"></a>
__Sensitive Data Labels:__ Sensitive “S” labels are used to categorize data deemed sensitive, such as different types of behavioral or geographic data that you want marked as sensitive.


<a name="S1 Data Label"></a>
__S1 Data Label:__ `S1` data label is used to classify data specifying latitude and longitude that can be used to determine the precise location of a device.

<a name="S2 Data Label"></a>
__S2 Data Label:__ `S2` data label is used to classify data that can be used to determine a broadly defined geo-fence area.

<a name="Standard Identity Type"></a>
__Standard Identity Namespace:__ Standard identity namespaces are Adobe pre-defined identifiers, including Adobe and industry standard solutions employed to identify users.

<a name="Standard Schema"></a>
__Standard Schema:__ Standard schemas consist of classes and mixins and are intended for reuse.

<a name="Streaming Endpoint"></a>
__Streaming Endpoint:__ A streaming endpoint URL is a unique endpoint provided by Adobe and tied to a customer's IMS org to stream data into Experience Platform.

<a name="Symbol"></a>
__Symbol:__ Symbol is an abbreviation of an identity type that can be used as a reference in APIs.

## T

<a name="Training"></a>
__Training:__ For supervised machine learning, training is the process of learning patterns and insights from labeled data. 

<a name="Token"></a>
__Token:__ A token is a type of two-factor authentication security that can be used to authorize the use of computer services with Query Service. 

## U

<a name="Unified Profile Service"></a>
__Unified Profile Service:__ Unified Profile Service is a centrally accessible data store that offers a comprehensive view of customers using online, offline, Adobe and non-Adobe data. The event and profile data are compiled to create an aggregate of profiles that can be used for segmentation.

## V

## W

## X

<a name="XDM"></a>
 __XDM (Experience Data Model):__ XDM (Experience Data Model) is the concept of using standard schemas to unify data for use with Experience Platform and Adobe Experience Cloud solutions. XDM standardizes how data is structured and speeds up and simplifies the process of gaining insights from massive amounts of data.
 
<a name="XDM System"></a>
__XDM System:__ XDM System is the infrastructure, data semantics, and workflow in Experience Platform that is powered by standard schemas.

## Y

## Z
