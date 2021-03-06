# Data Governance overview

One of the core capabilities of Adobe Experience Platform is to bring data from multiple enterprise systems together to better allow marketers to identify, understand, and engage customers. This data may be subject to usage restrictions defined by your organization or by legal regulations. It is therefore important to ensure that your data operations within Platform are compliant with data usage policies. 

Adobe Experience Platform Data Governance allows you to manage customer data and ensure compliance with regulations, restrictions, and policies applicable to data use. It plays a key role within Experience Platform at various levels, including cataloging, data lineage, data usage labeling, data usage policies, and controlling usage of data for marketing actions.

This guide provides an overview of the following concepts related to Data Governance:

* [Data governance roles](#data-governance-roles)
* [Data Usage Labeling and Enforcement (DULE)](#dule-framework)
* [Data usage labels](#data-usage-labels)
* [Data usage policies](#data-usage-policies)
* [Policy enforcement](#policy-enforcement)
* [Future releases](#future-releases)

At the end of this guide you will find a table outlining key [Data Governance terminology](#data-governance-terminology) with definitions that will assist you when working with Data Governance concepts.

## Data governance roles

As a concept, data governance is neither automatic, nor does it occur in a vacuum. What began as a role for one individual, typically recognized as a _**data steward**_, has grown considerably as the data governance ecosystem has expanded. Today, data governance requires continual management and monitoring in order to be successful and relies on data stewards having tools with which data can be properly labeled, usage policies can be created, and compliance with those policies can be enforced.

While data governance should be the responsibility of every individual in the organization, here are some of the essential roles within the data governance cycle:

![Data Governance Roles](dule_images/Data_Governance_roles.png "Essential Data Governance Roles")

### Data steward

Data stewards are the heart of data governance. This role is responsible for interpreting regulations, contractual restrictions, and policies, and applying them directly to the data. Informed by their understanding of these regulations, restrictions, and policies, the role of a data steward includes:

* Reviewing data, datasets, and data samples to apply and manage metadata usage labeling.
* Creating data policies and applying them to datasets and fields.
* Communicating data policies to the organization.

### Marketer

Marketers are the end point of data governance. They request data from the data governance infrastructure created by data stewards, scientists, and engineers. Marketers encompass a number of different specialties under the marketing umbrella, including the following:

* Marketing Analysts request data to enable understanding of customers, both as individuals and in groups (also known as segments).
* Marketing Specialists and Experience Designers use data to design new customer experiences. 


## DULE framework

Data Usage Labeling and Enforcement (DULE) is the core framework for Experience Platform Data Governance. DULE simplifies and streamlines the process of categorizing data and creating data usage policies. Once data labels have been applied and data usage policies are in place, marketing actions can be evaluated to ensure the correct use of data.

There are three key elements to the DULE framework: Labels, Policies, and Enforcement.

1. **[Labels](#data-usage-labels):** Classify data that reflects privacy-related considerations and contractual conditions to be compliant with regulations and organization policies.
2. **[Policies](#data-usage-policies):** Describe what kind(s) of marketing actions are allowed or not allowed to be taken on data that contains certain labels.
3. **[Enforcement](#policy-enforcement):** Uses the policy framework to advise and enforce policies across different data usage patterns. 

## Data usage labels

Data Governance enables data stewards to apply usage labels at the dataset and field level to categorize data according to the type of policies that apply.

The DULE framework includes predefined data usage labels that can be used to categorize data in four ways:

![Data Usage Label Categories](dule_images/DULE_label_categories.png "There are four categories of data usage labels.")

* **Contract "C" Data Labels:** Label and categorize data that has contractual obligations or is related to customer data governance policies. 
* **Identity "I" Data Labels:** Label and categorize data that can identify or contact a specific person.
* **Sensitive "S" Data Labels:** Label and categorize data related to sensitive data such as geographic data.
* **GDPR Data Labels:** Label and categorize data that may contain personal identifiers for use in GDPR access and/or delete requests.

> **Note:** See the guide on [supported data usage labels](dule_supported_labels.md) for a complete list of available labels, as well as definitions for each label type.

Labels can be applied at any time, providing flexibility in how you choose to govern data. Best practice encourages labeling data as soon as it is ingested into Experience Platform, or as soon as data becomes available in Platform.

See the tutorial on [working with data usage labels](../../tutorials/dule/dule_working_with_labels.md) for step-by-step instructions on how to apply DULE labels to datasets and fields using the UI.

## Data usage policies

In order for data usage labels to effectively support data compliance, data usage policies must be implemented. Data usage policies are rules that restrict the kinds of marketing actions that you are allowed to perform on data that contains certain Governance labels.

An example of a marketing action might be the desire to export a dataset to a third-party service. If you attempt to export a dataset that has an "I" label (Identity data) applied to it, and there is a policy in place saying that data containing Personally Identifiable Information (PII) cannot be exported, you will receive a response from the Policy Service telling you that a data usage policy has been violated.

### Creating and managing policies

Once data usage labels have been applied, data stewards can create policies using the [DULE Policy Service API](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/dule-policy-service.yaml). As a data steward, you can use the API to manage and evaluate policies related to marketing actions being taken on data containing DULE labels. 

Within the Policy Service API, all policies and marketing actions are referred to as either `core` or `custom` resources. `core` resources are defined and maintained by Adobe, whereas `custom` resources are created and maintained by individual customers. The `custom` resources are therefore unique and visible solely to the organization that created them.

See the tutorial on [creating a DULE policy](../../tutorials/dule/create_a_dule_policy_tutorial.md) for step-by-step instructions on working with the Policy Service API. For a comprehensive guide on performing the key operations provided by the API, see the [Policy Service developer guide](dule_policy_service_developer_guide.md).

## Policy enforcement

Once data usage labels have been applied to Platform datasets, and data usage policies have been defined for marketing actions against those labels, Governance capabilities allow you to enforce those policies and prevent data operations that constitute policy violations.

There are two methods of policy enforcement provided by Data Governance features on Platform:

* [API-based enforcement](#api-based-enforcement)
* [Automatic enforcement](#automatic-enforcement)

### API-based enforcement

The Policy Service API provides endpoints that allow you to test marketing actions against datasets or arbitrary combinations of DULE labels in order to check if any policy violations occur. Based on the API response, you can then set up protocols within your experience application to appropriately enforce data usage policy compliance.

See the tutorial on [API-based policy enforcement](../../tutorials/dule/policy-enforcement.md) for more information.

### Automated enforcement

Certain applications that are built on top of Experience Platform (such as Real-time Customer Data Platform) provide automatic enforcement for data usage policies. Each application maintains its own method of surfacing policy violations and providing steps for resolving issues. 

Please consult the documentation for the Platform-based application you are using for more information on automatic data usage policy enforcement. For information on automatic policy enforcement in Real-time CDP, please refer to the [Real-time CDP Data Governance overview](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/privacy/data-governance-overview.html).

## Future releases

Subsequent releases of Data Governance will provide the following features:

* Custom data usage labels: Create new labels and definitions based on your organization’s needs.
* Auditing: Monitor data access activities and identify and report on compliance issues.

## Next steps

This document provided a high-level introduction to Data Governance and the DULE framework. You can now continue to the [data usage labels user guide](../../tutorials/dule/dule_working_with_labels.md) and start adding usage labels to your experience data.

## Appendix

The following section provides additional information regarding Data Governance.

### Data Governance terminology

The following table outlines key terms related to Data Governance and the DULE framework.

|Term|Definition |
|---|---|
|**Contract labels**|Contract "C" labels are used to categorize data that has contractual obligations or is related to your organization's data governance policies.|
|**Cross-site data**|Cross-site data is the combination of data from several sites, including a combination of on-site data and off-site data or a combination of data from several off-site sources.|
|**Data governance**|Data governance encompasses the strategies and technologies used to ensure data is in compliance with regulations and corporate policies with respect to data usage.|
|**Data steward**|The data steward is the person responsible for the management, oversight, and enforcement of an organization's data assets. A data steward also ensures data governance policies are safeguarded and maintained to be compliant with government regulations and organization policies.|
|**Data usage labels**|Data usage labels provide users the ability to categorize data that reflects privacy-related considerations and contractual conditions to be compliant with regulations and corporate policies.|
|**Dataset labels**|Labels can be added to a dataset. All fields within a dataset inherit the dataset's labels.|
|**DULE**|DULE is an acronym for "Data Usage Labeling and Enforcement." A key part of data governance, DULE is a collection of features that allows for data usage labeling and applying data access policies for governance needs within an organization.|
|**Field labels**|Field labels are data governance labels that are either inherited from a dataset or applied directly to a field.  Data governance labels applied to a field are not inherited up to a dataset.|
|**Geofence**| A geofence is a virtual geographic boundary, defined by GPS or RFID technology, that enables software to trigger a response when a mobile device enters or leaves a particular area.|
|**Identity labels**|Identity "I" labels are used to categorize data that can identify or contact a specific person.|
|**Interest-based targeting**|Interest-based targeting, also known as personalization, occurs if the following three conditions are met: data collected on-site is, used to make inferences about a users’ interest, is used in another context, such as on another site or app (off-site) and is used to select which content or ads are served based on those inferences.|
|**Marketing action**|A marketing action, in the context of the data governance framework, is an action that an Experience Platform data consumer takes, for which there is a need to check for violations of data usage policies|
|**Policy**|In the data governance framework, a policy is a rule that describes what kind of marketing actions are allowed or not allowed to be taken on specific data.|
|**Sensitive Labels**|Sensitive “S” labels are used to categorize data that you, and your organization, consider sensitive.|

## Additional resources

The following video is intended to support your understanding of Data Governance, and outlines the key aspects of the Data Usage Labeling and Enforcement (DULE) framework.

<a href="https://docs.adobe.com/content/help/en/platform-learn/tutorials/data-governance/understanding-data-governance.html" target="_blank"><img src="./dule_images/understanding_data_governance.png"></a>

