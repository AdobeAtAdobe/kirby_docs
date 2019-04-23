# Data Usage Labeling and Enforcement (DULE) User Guide

## Overview

Adobe Experience Platform brings data from multiple enterprise systems together to better allow marketers to identify, understand, and engage customers. Experience Platform includes end-to-end data governance infrastructure to ensure the proper use of data within Platform and when being shared between systems.

Reading this guide will help you answer the following questions:

* What is Data Governance?
* What is Data Usage Labeling and Enforcement (DULE)?
* What are Data Usage Labels and when should they be applied?

## Data Governance

Data governance is a series of strategies and technologies used to manage customer data and ensure compliance with regulations, restrictions, and policies applicable to data use. It plays a key role within Experience Platform at various levels, including cataloging, data lineage, data usage labeling, data access policies, and access control on data for marketing actions.

Getting started with data governance requires a strong understanding of the regulations, contractual obligations, and corporate policies that apply to your customer data. From there, data can be classified by applying the appropriate data usage labels, and its use can be controlled through the definition of data usage policies. 

### Data Governance Roles

Data governance is neither automatic, nor does it occur in a vacuum. What began as a role for one individual, typically recognized as a _**data steward**_, has grown considerably as the data governance ecosystem has expanded. Today, data governance requires continual management and monitoring in order to be successful, and relies on data stewards having tools with which data can be properly labeled, usage policies can be created, and compliance with those policies can be enforced.

While data governance should be the responsibility of every individual in the organization, here are some of the essential roles within the data governance cycle:

![Data Governance Roles](Data_Governance_roles.png "Essential Data Governance Roles")

#### Data Steward

Data stewards are the heart of data governance.  This role is responsible for interpreting regulations, contractual restrictions, and policies, and applying them directly to the data. Informed by their understanding of these regulations, restrictions, and policies, the role of a data steward includes:
* Reviewing data, datasets, and data samples to apply and manage metadata DULE labeling.
* Creating data policies and applying them to a data connection, dataset, or field.
* Communicating data policies to the organization.

#### Marketer

Marketers are the end point of data governance. They request data from the data governance infrastructure created by data stewards, scientists, and engineers.  Marketers encompass a number of different specialties under the marketing umbrella, including the following:
* Marketing Analysts request data to enable understanding of customers, both as individuals and in groups (also known as segments).
* Marketing Specialists and Experience Designers use data to design new customer experiences. 


## Data Usage Labeling and Enforcement (DULE)

The Data Usage Labeling and Enforcement (DULE) framework simplifies and streamlines the process of categorizing data and creating data usage policies. Once data labels have been applied and data usage policies are in place, marketing actions requiring data can immediately be evaluated to ensure the correct use of data.

There are three key elements to the DULE framework: Labels, Policies, and Enforcement.

1. **Labels:** Classify data that reflects privacy-related considerations and contractual conditions to be compliant with regulations and organization policies.
2. **Policies:** Describe how and by whom data can be accessed, and what kinds of marketing actions are allowed or not allowed on specific data.
3. **Enforcement:** Uses the policy framework to advise and enforce policies across different data access patterns. 

### Data Usage Labels

Adobe Experience Platform includes infrastructure for data governance with DULE labeling at its core.  DULE features enable data stewards to apply data usage labels to connections, datasets, and fields to categorize them according to the type of data usage policies applied.

Applying labels allows you to categorize data to ensure compliance with regulations and corporate policies. The DULE framework includes predefined data usage labels that can be used to categorize data in four ways:

![Data Usage Label Categories](DULE_label_categories.png "There are four categories of data usage labels.")

* **Contractual Data Labels:** Label and categorize data that has contractual obligations or is related to customer data governance policies. 
* **Identity Data Labels:** Label and categorize data that can identify or contact a specific person.
* **Sensitive Data Labels:** Label and categorize data related to sensitive data such as geographic data.
* **GDPR Data Labels:** Label and categorize data that may contain personal identifiers for use in GDPR access and or delete requests.

See [Supported Data Usage Labels](dule_supported_labels.md) for a complete list of available labels, as well as definitions for each label type.

### When to Apply Data Labels

Data usage labels can be applied at three levels, and are inherited down from connections to datasets and fields, and from datasets to fields. This means that data usage labels applied at the connection level are propagated to all datasets and fields in the connection, while labels applied to datasets are propagated to all fields in the dataset. Labels can also be applied directly to individual fields (column headers) in a dataset, without propagation.

Labels can be applied at any time, providing flexibility in how you choose to govern data. Best practice encourages labeling data as soon as it is ingested into Experience Platform, or as soon as data becomes available in Platform.

Step-by-step instructions for how to apply data usage labels to Connections, Datasets, and Fields are available in the [Working with Data Usage Labels in Adobe Experience Platform](dule_working_with_labels.md) tutorial.

![Data Usage Label Hierarchy](Data_usage_label_hierarchy.png "Data Usage Labels can be applied at three levels and are inherited from the top down.")


## Future Releases

Adobe Experience Platform currently supports DULE labeling at three levels: connection, dataset, and field; with full support for inheritance between levels.

Subsequent releases will provide the following features:

- Policy Creation and Management: Create policies with marketing actions and labels.
- Custom Data Usage Labels: Create new labels and definitions based on your organization’s needs.
- Policy Enforcement: Use the policy framework to advise and enforce policies across different data access patterns.
- Auditing: Monitor data access activities and identify and report on compliance issues.

## Appendix: DULE Terminology

|Term|Definition |
|---|---|
|Connection Labels|Connection labels are data governance labels that are applied when setting up or editing a connection. Data governance labels added to a connection are inherited down or applied to all datasets and fields ingested through the connection.| 
|Contractual Data Labels|Contractual data ("C") labels are a type of data governance label used to categorize data that has contractual obligations or is related to an organization's data governance policies.|
|Data Governance|Data governance encompasses the strategies and technologies used to ensure data is in compliance with regulations and organization policies with respect to data usage.|
|Data Steward|The data steward is the person responsible for the management, oversight, and enforcement of an organization's data assets. A data steward also ensures data governance policies are safeguarded and maintained to be compliant with government regulations and organization policies.|
|Data Usage Labels|Data usage labels provide users the ability to classify data that reflects privacy-related considerations and contractual conditions to be compliant with regulations and organization policies. Data governance labels added at a connection-level are inherited down to all datasets and fields ingested through that connection.  Data governance labels can also be applied directly to datasets and fields.|
|Dataset Labels|Dataset labels are data governance labels that are either inherited from a connection or applied directly to a dataset. Labels applied to a dataset are inherited by all fields within the dataset. |
|DULE|DULE is an acronym for "Data Usage Labeling and Enforcement." A key part of data governance, DULE is a collection of features that allows for data usage labeling and applying data access policies for governance needs within an organization.|
|Field Labels|Field labels are data governance labels that are either inherited from a connection or a dataset, or applied directly to a field.  Data governance labels applied to a field are not inherited up to a dataset or connection.|
|Geofence| A geofence is a virtual geographic boundary, defined by GPS or RFID technology, that enables software to trigger a response when a mobile device enters or leaves a particular area.|
|Identity Data Labels|Identity data ("I") labels are data governance labels used to categorize data that can identify or contact a specific person. |
|Policy|A policy in the data governance framework is a rule that describes what kind of marketing actions are allowed or not allowed on specific data.|
|Sensitive Data Labels|Sensitive data ("S") labels are a type of data governance label used to categorize sensitive data, such as geographic data.|

