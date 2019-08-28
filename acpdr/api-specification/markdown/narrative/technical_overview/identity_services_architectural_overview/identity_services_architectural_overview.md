# Identity Service overview

Delivering relevant digital experiences requires having a complete understanding of your customer. This is made more difficult when your customer data is fragmented across disparate systems, causing each individual customer to appear to have multiple "identities". Adobe Experience Platform Identity Service helps you to gain a better view of your customer and their behavior by bridging identities across devices and systems, allowing you to deliver impactful, personal digital experiences in real-time.

This document provides a high level overview of Identity Service and will help you understand the role of identities within Experience Platform, including:
* [Understanding Identity Service](#understanding-identity-service): See the big picture of Identity Service and its role within Experience Platform.  
* [Identity namespaces and identity graphs](#identity-namespaces-and-identity-graphs): Learn how Experience Platform reconciles online and offline customer activity into useful data.
* [Supplying identity data to Identity Service](#supplying-identity-data-to-identity-service): Learn how data provided to Experience Platform is processed prior to being used by Identity Service.
* [Data governance](#data-governance): Learn how Data Governance keeps your customers' personally identifiable information (PII) secure.
 
## Understanding Identity Service

Each day, customers interact with your business and establish a continuously growing relationship with your brand. A typical customer may be active in any number of systems within your organization's data infrastructure, such as your eCommerce, loyalty, and help-desk systems. That same customer may also engage anonymously on any number of devices. Identity Service allows you to piece together a complete picture of your customer, aggregating related data that might otherwise be siloed across disparate systems.

Consider an everyday example of a consumer's relationship with your brand:

Mary has an account on your eCommerce site where she has completed a few orders in the past. She typically uses her personal laptop to shop, where she logs in each time. However, during one of her visits she uses her tablet to shop for sandals, but does not place an order and does not log in. 

At this point, Mary's activity appears as two separate profiles: her eCommerce login and her tablet device, perhaps identified by device ID. 

Mary later resumes her tablet session and provides her email address while subscribing to your newsletter. Upon doing so, streaming ingestion adds a new identity as record data within her profile. As a result, Identity Service now relates Mary's tablet device activity with her eCommerce account history.

By the next click on her tablet, your targeted content could reflect Mary's full profile and history, rather than just a tablet used by an unknown shopper. 


The identity relationships that Identity Service defines and maintains are leveraged by Real-time Customer Profile to build a complete picture of a customer and their interactions with your brand. For more information, see the [Real-time Customer Profile overview](../unified_profile_architectural_overview/unified_profile_architectural_overview.md). 

### Identities

An identity is data that is unique to an entity, typically an individual person. An identity such as a login ID, ECID, or loyalty ID is referred to as a **known identity**. 

PII such as email address and phone number, serves to directly identify a customer. As a result, PII is used to match a customer's multiple identities across systems. 

**Unknown or anonymous identities** single out a device without identifying the actual person using it. This category includes information such as a visitor's IP address and cookie ID. While behavioral data can be gathered from a device using unknown identities, associating these identities across devices or mediums is limited until your customer supplies PII during their journey.

As shown in the image below, known and anonymous identities are both important components of [identity graphs](#identity-graphs), which are discussed later in this document.
![Identity stitching on Platform](identity-service-stitching.png)

Examples of Identity Service implementations include:

* A telecom company may rely on the "phone number" value, where a phone number would refer to the same individual of interest in both offline and online data sets.
* A retail company may use "email address" in offline data sets and ECID in online datasets due to the high percentage of anonymous visitors.
* A bank may prefer "account number" in offline data sets, such as branch transactions. They may depend on "login ID" in online data sets, because most visitors would be authenticated during their visit.
* Your customers may also have unique proprietary IDs, such as GUID or other universally unique identifiers.

### Identity data

If you asked a person "What is your ID?" without any further context, it would be difficult for them to provide a useful answer. By the same logic, a string value representing an identity value, whether it is a system generated ID or an email address, is only complete when supplied with a qualifier that gives the string value context: the identity namespace.

## Identity namespaces and identity graphs
 
You customers may interact with your brand through a combination of online and offline channels, resulting in the challenge of how to reconcile those fragmented interactions into a single customer identity. 

Experience Platform addresses this challenge through two concepts: [identity namespaces](#identity-namespaces) and [identity graphs](#identity-graphs).

### Identity namespaces

When your customer is interacting with your brand across multiple channels including web, mobile application, call center, or a storefront it can be difficult to understand and serve them if you cannot observe and track their activity across channels.

Understanding your customer across multiple devices and channels starts by recognizing them in each channel. Adobe Experience Platform achieves this by using identity namespaces.
An identity namespace is an identifier such as device ID or email ID used to provide the context from which data originates. Identity namespaces are used to look up or link individual identities, and provide context for identity values to prevent data collisions. For example, ID "123456" may refer to one person in your eCommerce system, and a different person in your help desk system. For more information, see the [identity namespace overview](../identity_namespace_overview/identity_namespace_overview.md).

<!-- Alex to open separate ticket to review this section (Niqui's original content) with PM -->
### Identity graphs

An identity graph is a map of relationships between different identity namespaces, providing you with a visual representation of how your customer interacts with your brand across different channels. 

All customer identity graphs are collectively managed and updated by Identity Service in near real-time, in response to customer activity. 

Identity Service manages an identity graph visible by only your organization and built based on your data, referred to as the private graph. Identity Service augments your private graph when an ingested data record contains more than one identity, adding a relationship between the identities found.

As an example of the potential types of factors to consider when supplying and labeling identity data, using phone numbers such as "work phone" may result in more relationships than you intend in the identity graph. You may find many employees refer to the same number for work, and that "home" and "mobile" better serve to keep relationships as precise as possible.

## Supplying identity data to Identity Service

This section covers how data provided to Adobe Experience Platform is processed prior to being used by Identity Service to build an identity graph for each customer.

### Decide on identity fields

Depending on your enterprise data collection strategy, the data fields you label as identities determine which data is included in your identity map. To get the maximum benefit of Adobe Experience Platform and the most comprehensive customer identities possible, you should upload both online and offline data. 
* Online data is data that describes online presence and behavior, such as usernames and email addresses.
* Offline data refers to data that is not directly related to online presence, such as IDs from CRM systems. This type of data makes your identities more robust and supports data cohesion across your disparate systems.

### Create additional identity namespaces

While Experience Platform offers a variety of standard namespaces, you may need to create additional namespaces to properly categorize your identities. For more information, see the section on [viewing and creating namespaces for your organization](../identity_namespace_overview/identity_namespace_overview.md#view-and-create-namespaces-for-your-organization) in the identity namespace overview.

> **Note:** Identity namespaces are a qualifier for identities. As a result, once a namespace has been created, it cannot be deleted.

### Include identity data in Experience Data Model (XDM)

As the standardized framework by which Platform organizes customer data, Experience Data Model (XDM) allows data to be shared and understood across Experience Platform and other services interacting with Platform. For more information see the [XDM System overview](../schema_registry/xdm_system/xdm_system_in_experience_platform.md).

Both record and time series schemas provide the means to include identity data. As data is ingested, the identity graph will create new relationships between data fragments from different namespaces if they are found to share common identity data.

### Marking XDM fields as identity

Any field of type `string` in schemas that implement either record or time series XDM classes can be labeled as an identity field. As a result, all data ingested into that field would be considered identity data.  

Identity fields also allow for the linking of identities if they share common PII data.
For example, by labeling phone number fields as identity fields, Identity Service automatically graphs relationships with the other individuals found to be using the same phone number.

>Note: The namespace of resulting identities is provided at the time the field is labeled. 

<!--- ### Identity maps

Identities can be represented as a map of XDM data ingested into Adobe Experience Platform. Below is an example of the `identityMap` construct, providing a collection of known identities, each keyed by a namespace. Each identity has a unique `id`, and a `primary` boolean indicating whether the identity in question is the primary identity of the schema. 

```
{
  "identityMap": {
    "Email": [
      {
        "id": "identity_email_a@someplace.com",
        "primary": false
      },
      {
        "id": "identity_email_b@someplace.com",
        "primary": false
      }
    ],
    "ECID": [
      {
        "id": "72204922746797553008253714834957578266",
        "primary": true
      }
    ],
    "AVID": [
      {
        "id": "2e248c9f800047ed-0e99c00000000000",
        "primary": false
      }
    ],
    "CRMId": [
      {
        "id": "64847653466462621911465369865412299222",
        "primary": false
      }
    ]
  }
}
```

For more information on schemas and XDM System, see [XDM System in Adobe Experience Platform](../schema_registry/xdm_system/xdm_system_in_experience_platform.md). --->

### Configure a dataset for Identity Service

During the streaming ingestion process, Identity Service automatically extracts identity data from record and time series data. However, before data can be ingested, it must be enabled for Identity Service. See the tutorial on  [configuring a Dataset for Real-time Customer Profile and Identity Service using APIs](../../tutorials/unified_profile_dataset_tutorial/unified_profile_dataset_api_tutorial.md) for more information.

### Ingest data to Identity Service

Identity Service consumes XDM compliant data sent to Experience Platform either by [batch ingestion](../ingest_architectural_overview/ingest_architectural_overview.md) or [streaming ingestion](../streaming_ingest/streaming_ingest_overview.md).

## Data governance

Adobe Experience Platform was built with privacy in mind and includes a data governance framework to protect your customer PII data. Identity data under the "email" or "phone" namespace is encrypted by default, but in order to ensure sensitive data is encrypted before it is persisted, data usage labels can be applied to data as it is ingested or once it arrives in Platform. For more information, please read the [Data Governance overview](../data_governance/dule_overview.md).

## Next Steps

Now that you understand the key concepts of Identity Service and its role within Experience Platform, you can begin to learn how to work with your identity graph using the [Identity Service API](identity_services_api.md).