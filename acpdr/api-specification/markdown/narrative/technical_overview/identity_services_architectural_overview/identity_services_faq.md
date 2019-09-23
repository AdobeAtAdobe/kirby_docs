# Identity Service - FAQ and recommendations

## Overview

This document is intended to centralize both frequently asked questions, troubleshooting tips, and recommendations as they relate to working with Identity Service. In specific:

[FAQ](#faq)  
[Recommendations](#recommendations)  
[Troubleshooting](#troubleshooting)  
[Error codes](#missing-expected-identity-links)  

---

## FAQ

[What is identity data?](#what-is-identity-data)  
[What is an identity namespace?](#what-is-an-identity-namespace)  
[How do I send multiple IDs within XDM?](#how-do-i-send-multiple-ids-within-xdm)  
[How do I associate an identity to an identity namespace?](#how-do-i-associate-an-identity-to-an-identity-namespace)  
[How can I find the list of identity namespaces available for my use?](#how-can-i-find-the-list-of-identity-namespaces-available-for-my-use)  
[How can I create a custom namespace for my enterprise?](#how-can-i-create-a-custom-namespace-for-my-enterprise)  
[What is Private Identity Graph?](#what-is-private-identity-graph)  
[Should I encrypt all Personally Identifiable Information (PII) before sending?](#should-i-encrypt-all-personally-identifiable-information-pii-before-sending)  
[Are there any considerations when hashing PII based Identities?](#are-there-any-considerations-when-hashing-pii-based-identities)  
[What is the benefit of supplying identity data?](#what-is-the-benefit-of-supplying-identity-data)  
[How does Identity Service handle PII?](#how-does-identity-service-handle-pii)  
[What are known and anonymous identities?](#what-are-known-and-anonymous-identities)  
[Are there any identity namespaces I can use out of the box?](#are-there-any-identity-namespaces-i-can-use-out-of-the-box)  
[When should I create a custom identity namespace?](#when-should-i-create-a-custom-identity-namespace)  



### What is identity data?

Data that can be used to identify a user is referred to as identity data. This could include identifiers for a logged in user, such as a username, email address, or an ID from a CRM system. Users engaging anonymously could also be identified, such as by their device or cookie ID. 

### What is an identity namespace?

Identity namespaces serve several functions on Adobe Experience Platform.

* A profile identity is the unique value that a system uses to refer to a person. The identity namespace is what distinguishes the system in which that value identifies that profile. An example of this could be a Loyalty ID, where the namespace would reflect your rewards system and distinguishes that identifier from that same person who might be identified by a numeric ID in your eCommerce system.
* The identity namespace indicates the type of identity. For example, when trying to access your GDPR data a customer has to indicate the type of identity they are accessing by, for instance email or phone.
* Namespacing identities helps avoid conflict. For example, both your rewards system and your CRM could have a profile with the ID of 12345, with no assurance both systems are referring to the same person. The namespace resolves ambiguity.

Namespaces must be created in Identity Service prior to being used. For more information, see [Identity Namespace Architectural Overview](../identity_namespace_overview/identity_namespace_overview.md).

### How do I send multiple IDs within XDM?

__Label XDM fields as identity__

Any string typed field in schemas implementing either record or time series XDM classes can be labeled as an identity field. After doing so, any value provided for that attribute would be considered an identity and the identity graph would be enhanced with the relationships between it and the other identities in the data. To label a field as identity is to add a descriptor to the XDM schema field, which can be done using the Experience Platform UI or the Identity Service API.

For more information, see how to label a field as identity in the [Identity Service overview](identity_namespace_overview#marking-xdm-fields-as-identity).

__List known identities in identity map__

XDM schemas include an identity map which is used to list an entity's identities. An identity specifies the value used to reference an entity in one of your systems, and the namespace for that system. For example an identity could be an email address, where the namespace would name the help-desk system in which that email address is the person's identifier. 

For more information, see how to construct an identity map in the [Identity Service Overview](identity_services_architectural_overview.md#identity-maps). For recommendations, see [below](#recommendations).

### How do I associate an identity to an identity namespace?

#### Identity field

Identities created from values of identity fields take on the namespace of the descriptor labeling that field as an identity field. 

For more information, see how to label a field as identity in the [Identity Service overview](identity_namespace_overview#marking-xdm-fields-as-identity).

#### Identity map in XDM data

Any identity supplied in the identity map of a Profile or ExperienceEvent consists of an ID value and namespace. For example, an individual could be represented as "someone<i></i>@somewhere.com" in your CRM, and as ID "123456" in your rewards system. Those would be associated to their system of origination by the namespace. 

For more information, see how to construct an identity map in the [Identity Service overview](identity_services_architectural_overview.md#identity-maps). For recommendations, see [below](#recommendations).

### How can I find the list of identity namespaces available for my use?

Using the API, you are able to list namespaces available for your organization. Learn how to list available Namespaces [here](../identity_namespace_overview/identity_namespace_overview.md#list-available-namespaces).

### How can I create a custom namespace for my enterprise?

Identity Service comes with several namespaces you can use to group your identifiers out of the box. If you require a custom namespace, see [Identity Namespace overview](../identity_namespace_overview/identity_namespace_overview.md).

### What is Private Identity Graph?

When more than one identifier is included in any data sent to a streaming endpoint or dataset enabled for Identity Service, those identities are linked in the identity graph private to your organization. Identity Service provides services for gleaning identities for a given consumer or entity, allowing identity stitching and profile merging.

The private identity graph helps large enterprises by reconciling the many identifiers generated in different channels and recognizes them collectively as a single consumer to provide a complete and accurate profile of the enterprise's consumers as 'People' to analyze and target.

### Should I encrypt all Personally Identifiable Information (PII) before sending?

To ensure your customers' PII is always encrypted, use DULE based labeling and Adobe will take care of the rest. Any PII data needs to have the `I1` DULE labeled applied at the schema field level. Internally, before storing it in the identity graph, Adobe converts any `I1` labeled data via salting and encrypting to a hashed ID value that is safe and secure at all times.

For more information on DULE, visit the [Data Usage Labeling and Enforcement (DULE) User Guide](../../../../../end-user/markdown/dule_overview/dule_overview.md).

### Are there any considerations when hashing PII based identities?

If you are sending in hashed PII values, like email or phone, you must use the same encryption technique across various datasets. This ensures that the same value across datasets generates the same hashed values and are able to be matched and linked in the identity graph. If for whatever reason they are different, Adobe does not detect a link and fails to deliver unified segmentation across datasets.

### What is the benefit of supplying identity data?

There are basically two purposes for including identity data in your record and time series data: 

* Provide known ID relationships or mappings - Identities provided in the identity map of record and time series data are mapped in your private identity graph, as well as the values to any fields marked as identity fields. For instance, if a record in data sent to Experience Platform contains a value for MCID, email address, phone number, loyalty number, login ID, those values are all mapped as identifying a singular person or entity in the identity graph. Where the `identities` map requires explicitly listing all known identities, labeling XDM fields allows the identities to be discovered more organically, within the natural structure of your data.
* Reconcile on ID - Every ID is considered as a reconciliation key and hence extends identity graph with the new relationship without duplicating an existing node. If a record set contains "ECID1" and "EmailId1" from one source and "EmailId1" and "CRM1" as an identity pair from another source, identity graph will link "ECID1" — "EmailId1" — "CRM1". In this example, reconciliation happened on "EmailId1".

### How does Identity Service handle PII?

Identity Service creates a strong one way cryptographic hash of PII prior to persisting values. In specific, identity data in the "Phone" and "Email" namespaces will automatically be SHA-256 hashed. "Email" values are transformed to lower case prior to hashing.

### What are known and anonymous identities?

A known identity refers to identity that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Some examples might be email address or loyalty card number from a customer’s CRM system.

An anonymous identity refers to identity that cannot be used on its own or with other information to identify, contact, or locate a single person. An example of this might be a cookie ID.

### Are there any identity namespaces I can use out of the box?

The following namespaces are provided for use by all organizations. These are referred to as the standard namespaces.

|Display Name|ID|Code|Description|
|------------|---|---|-----------|
|CORE|0|CORE|legacy name: "Adobe AudienceManager"|
|ECID|4|ECID|alias: "Adobe Marketing Cloud ID", "Adobe Experience Cloud ID", "Adobe Experience Platform ID"|
|Email|6|Email||
|Email (SHA256, lowercased)|11|Emails|Standard namespace for pre-hashed email. Values provided in this namespace must be lower-cased before hashing with SHA-256.|
|Phone|7|Phone||
|Windows AID|8|WAID||
|AdCloud|411|AdCloud|alias: Ad Cloud|
|Adobe Target|9|TNTID|Target ID|
|Google Ad ID|20914|GAID|GAID|
|Apple IDFA|20915|IDFA|ID for Advertisers|

### When should I create a custom identity namespace?

See recommendations around creating custom namespaces below.

---

## Recommendations

[What not to label as identity and why](#what-not-to-label-as-identity-and-why)  
[When to create a custom identity namespace](#when-to-create-a-custom-identity-namespace)  
[Marking XDM schema fields as identity versus the Identity map](#marking-xdm-schema-fields-as-identity-versus-the-identity-map)  

### What not to label as identity and why

Fields like zip code, IP address should not be labeled as identity as they will end up representing a lot of people in the same bucket as opposed to individuals. They should be used more for household or individual strategies. These include attributes such as email, username, or home address.

### When to create a custom identity namespace

Though there are several standard identity namespaces provided for use by default, you may find you need different namespaces to properly suit the various sources of data within your own ecosystem. 

### Marking XDM schema fields as identity versus the Identity map

The following table describes when the recommended approach for including identity data in your XDM would be identity map and when an identity field is the better method.

> **Note:** An advantage `identityMap` has is the ability to include multiple identity values for a single namespace.

Write|XDM identity field|`identityMap`
---|---|---
UI|Supported|Supported
Developer|Recommended|Supported
ETL|Recommended|Avoid - While this is supported, data should be formatted naturally when using an ETL, favoring identity fields over `identityMap`.
Internal solutions|Preferred|Common

---

## Troubleshooting

The following provides some tips for dealing with unexpected results while working with Identity Service API operations.

### Missing expected identity links

To view related identities for a particular identity, use Identity Service's [cluster API](identity_services_api.md#cluster-members-api). <!-- TODO: Add UI doc link when it's available-->If you do not see the linked identities you expect, first ensure identity information is provided appropriately in your XDM data. For more on providing identities, see information on [providing XDM data to Identity Service](identity_services_architectural_overview#providing-xdm-data-to-identity-service).

---

## Error codes

The REST API operations supporting Identity Service, and all of Experience Platform, return HTTP status codes as defined by [HTTP/1.1 Status Code Definitions](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html). 

[Identity Service error codes](#identity-service-error-codes)  
[Batch Ingestion error codes](#batch-ingestion-error-codes)  


### Identity Service error codes

The following lists error codes you might encounter when working with Identity Service API.

**HTTP status code 400 (InvalidInput)**

* **Missing required query parameter** - When your API call is missing a parameter, this message will include that parameter name. An example message is "Missing required query parameter: nsId", in which case `nsId` is missing. Keep in mind that namespace can be supplied via the namespace ID (`nsId`) or the namespace code (`ns`). The variations include:
  * Missing required query parameter: nsId
  * Missing required query parameter: id
  * Missing required query parameter: xid or (nsid,id)
  * Missing required query parameter: targetNs
  * Missing required query parameter: xids or compositeXids
* **Timestamp should be within last 180 days** - Identity Service purges data older than 180 days and attempts to access data older than this will result in an error.
* **There is a limit of 1000 XIDs in a single call** - This message results if you attempt to retrieve identity information for more than the maximum number of identities by XID in a single batch.
* **There is a limit for 1000 compositeXids in a single call** - This message results if you attempt to retrieve identity information for more than the maximum number of identities by composite XID (ID value and namespace) in a single batch. 
* **Missing required header 'x-gw-ims-org-id'** - All Platform APIs require the IMS Organization ID. For information on how to obtain this, see See [__Authenticating and Accessing Adobe Experience Platform APIs__](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).
* **Invalid graph type specified** - This message indicates that a graph type used is not among the valid values. To understand what graph types are supported, see the [Identity Service overview](identity_services_architectural_overview#identity-graphs).

**HTTP status code 401 (UnauthorizedAccess)**

* **Service token doesn't have valid scope. Either acp.core.identity or acp.foundation is required** - This error indicates the caller IMS Organization has not been provisioned with the proper permissions for Identity Service. To learn how to enable your organization for Identity Service, start [here](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).
* **Gateway service token is not valid** - In the case of this error, your access token is invalid. Access tokens expire every 24 hours, and could be a possible reason for this error. Try generating a new access token by following the instructions [here](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).
* **Authorization service token is not valid** - In the case of this error, your access token is invalid. Access tokens expire every 24 hours, and could be a possible reason for this error. Try generating a new access token by following the instructions [here](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).
* **User token doesn't have valid product context. Product Context 'acp' is required** - The access token you use must have been generated from an Experience Platform integration, generated using the instructions [here](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).

**HTTP status code 403 (AccountNotProvisioned)**

* **The IMS Org. {YOUR_IMS_ORG_ID} is not provisioned for Identity service usage** - This error indicates the caller IMS Organization has not been provisioned with the proper permissions for Identity Service. To learn how to enable your organization for Identity Service, start [here](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).

**HTTP status code 500 (InternalError)**

* **Internal Server Error. There was a problem processing your request** - This error indicates an unexpected exception occurred in the execution of a Platform service call. It is advised that your automated calls to the Platform services be written to retry service calls a few times at a timed interval.

### Batch Ingestion error codes

Identity Service ingests identity data from record and time series data that is uploaded to Platform using Batch Ingestion. As batch ingestion is an asynchronous process, you must view the details for a batch to view errors. Errors will accumulate as the batch progresses until the batch is complete.

The following are errors that may occur during batch ingestion related to Identity Service.

**Error code: InvalidInput**

* **Unknown XDM Schema** - Identity Service only consumes identities for record or time series data (typically inheriting from the Profile or ExperienceEvent class, respectively). Any data not adhering to one of these will trigger this error.
* **There were 0 valid identities in the first 100 rows of the processed batch** - This error occurs when the first 100 rows of a batch presented no identities. This error does not indicate conclusively that no identities were found in subsequent records, however.
* **Skipped {X number of} records as they had only 1 identity per xdm record** - Identity Service only links identities where a single record presented two or more identities. This message indicates the number of records ingested where only one identity could be found and resulted in no change to the identity graph. This error occurs once in a batch ingestion, where the count is indicated within the message.
* **Namespace Code {ERRONEOUS_CODE} is not registered for this IMS Org** - This error indicates a record that presented an identity where the namespace (the value for which will replace `{ERRONEOUS_CODE}`) did not exist or was inaccessible to your organization.
 
**Error code: UnauthorizedAccess**

* **Invalid IMS Token/IMS Org|Internal error - when tried to get native XID from identity and namespace code** - When Identity Service persists an identity, it generates and assigns a unique ID, called the XID. This error indicates there was an error during the process of finding the XID for a given ID value and namespace.

**Error code: AccountNotProvisioned** 

* **Skipping batch ingestion as IMS Org is not provisioned for Private Identity Graph** - This error indicates the caller IMS Organization has not been provisioned with the proper permissions for Identity Service. To learn how to enable your organization for Identity Service, start [here](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md).

**Error code: InternalError**

* **Internal Error. There was a problem during the ingestion** - 
This error indicates an unexpected exception occurred during a batch ingestion.  It is advised that your automated calls to the Platform services be written to retry service calls a few times at a timed interval.
