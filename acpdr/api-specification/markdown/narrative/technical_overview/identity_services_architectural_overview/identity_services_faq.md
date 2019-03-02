# Identity Service - FAQ and Recommendations

## Overview

This document is intended to centralize both frequently asked questions and recommendations as they relate to working with Identity Service. 

## FAQ

### What is Identity data?

Data that can be used to identify a user is referred to as identity data. This could include identifiers for a logged in user, such as a username, email address, or an ID from a CRM system. Users engaging anonymously could also be identified, such as by their device or cookie ID. 

### What is an Identity Namespace?

Identity Namespaces serve several functions on Adobe Experience Platform.

* A profile identity is the unique value that a system uses to refer to a person. The identity namespace is what distinguishes the system in which that value identifies that profile. An example of this could be a Loyalty ID, where the namespace would reflect your rewards system and distinguishes that identifier from that same person who might be identified by a numeric ID in your eCommerce system.
* The identity namespace indicates the type of identity. For example, when trying to access your GDPR data a customer has to indicate the type of identity they are accessing by, for instance email or phone.
* Namespacing identities helps avoid conflict. For example, both your rewards system and you CRM could have a profile with the ID of 12345, with no assurance both systems are referring to the same person. The namespace resolves ambiguity.

Namespaces must be created in Identity Service prior to being used. For more information, see [Identity Namespace Architectural Overview](../identity_namespace_overview/identity_namespace_overview.md).

### How do I send multiple IDs within Profile XDM?

XDM schemas include an `identities` array which is used to list an entity's identities. An identity specifies the value used to reference an entity in one of your systems, and the Namespace for that system. For example an identity could be an email address, where the Namespace would name the help-desk system in which that email address is the person's identifier. For more information, see how to specify record IDs in the [Identity Service Overview](identity_services_architectural_overview.md#specify-record-ids). For recommendations, see [below](#recommendations).

### How do I associate an Identity to an Identity Namespace?

Any identity supplied in the `identities` array of a Profile or ExperienceEvent consists of an ID value and namespace. For example, an individual could be represented as someone@somewhere.com in your CRM, and as ID 123456 in your rewards system. Those would be associated to their system of origination by the namespace. The following is an example of how these IDs might be provided in XDM sent to Experience Platform. In this example, "crm" and "rewards" are both custom namespaces that must created prior to use must have been would each be a custom namespace:

```
{
	"endUserIDs": {
		"_experience": {
			"ecid": {
				"id": "83115878867093271677830342615471247088",
				"namespace": {
					"code": "ECID"
				},
				"primary": false
			},
			"adcloud": {
				"id": "2dce0c8c00005e7f-11f2400000000004",
				"namespace": {
					"code": "AdCloud"
				},
				"primary": false
			}
		},
		"_customer": {
			"default": {
				"crm": {
					"id": "someone@somewhere.com",
					"namespace": {
						"code": "crm"
					}
				}
			},
			"rewards": {
				"id": "123456",
				"namespace": {
					"code": "rewards"
				}
			}
		}
	}
}
```

### How can I find the list of ID Namespaces available for my use?

Using the API, you are able to list Identity Namespaces available for your organization. Learn how to list available Namespaces [here](../identity_namespace_overview/identity_namespace_overview.md#list-available-namespaces).

### How can I create a custom Namespace for my enterprise?

Identity Service comes with several Namespaces you can use to group your identifiers out of the box. If you require a custom Namespace, see [Identity Namespace Architectural Overview](../identity_namespace_overview/identity_namespace_overview.md).

### What is Private Identity Graph?

Private Identity Graph helps large enterprises by reconciling the many identifiers generated in different channels and recognizes them collectively as a single consumer to provide a complete and accurate profile of the enterprise's consumers as 'People' to analyze and target.

### Should I encrypt all Personally Identifiable Information (PII) before sending?

DULE based labeling is required and Adobe will take care of the rest. Any PII data needs to be appropriately DULE labeled as belonging to I1. Internally, before storing it in the identity graph, Adobe converts any I1 labeled data via salting and encrypting to a hashed ID value that is safe and secure at all times.

For more information on DULE, visit the [Data Usage Labeling and Enforcement (DULE) User Guide](../../../../../end-user/markdown/dule_overview/dule_overview.md).

### Are there any considerations when hashing PII based Identities?

If you are sending in hashed IDs (email, IDs, etc.), the same encryption technique used for that ID needs to be used across various datasets. This ensures that the same hashed values, used as a common key, are used across Adobe Analytics and Adobe Campaign or other datasets. If for whatever reason they are different, Adobe will not be able to find a link and fail to deliver unified segmentation across datasets.

### What will happen when I mark an attribute as Identity?

There are basically two purposes of providing XIDs (ID plus Namespace) in the Profile/ExperienceEvent XDM: 

* Provide known ID relationships or mappings - Any IDs provided in the identities array are mapped, as well as the values to any fields marked as identity fields. For instance, if a record in data sent to Experience Platform contains a value for MCID, email address, phone number, loyalty number, login ID, those values are all mapped as identifying a singular person or entity in the Identity graph.
* Reconcile on ID - Every ID is considered as a reconciliation key and hence extends Identity Graph with the new relationship without duplicating an existing node. If a record set contains (ECID1, EmailId1) from one source and (EmailId1, CRM1) as Identity pair from another source, Identity Graph will link ECID1 — EmailId1 — CRM1. In this example, reconciliation happened on EmailId1.

### How does the Identity Service SDK handle PII?

The Identity Service SDK supports creating a strong one way cryptographic hash of PII.

### What is DCS?

DCS stands for Adobe’s Data Collection Service that is deployed on Adobe’s edge data centers.

### What are known and anonymous identities?

A known identity refers to identity that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Some examples might be email address or loyalty card number from a customer’s CRM system.

An anonymous identity refers to identity that cannot be used on its own or with other information to identify, contact, or locate a single person. An example of this might be a cookie ID.

### Are there any Identity Namespaces I can use out of the box?

The following Namespaces are provided for use by all organizations. These are referred to as the Standard Namespaces.

|Display Name|ID|Code|Description|
|------------|---|---|-----------|
|CORE|0|CORE|legacy name: "Adobe AudienceManager"|
|ECID|4|ECID|alias: "Adobe Marketing Cloud ID", "Adobe Experience Cloud ID", "Adobe Experience Platform ID"|
|Email|6|Email||
|Phone|7|Phone||
|Windows AID|8|WAID||
|AdCloud|411|AdCloud|alias: Ad Cloud|
|Adobe Target|9|TNTID|Target ID|
|Google Ad ID|20914|GAID|GAID|
|Apple IDFA|20915|IDFA|ID for Advertisers|

### When should I create a custom Identity Namespace?

See recommendations around creating custom Namespaces below.

## Recommendations

### What not to label as identity and why

Fields like zip code, IP address should not be labeled as Identity as they will end up representing a lot of people in the same bucket as opposed to individuals. They should be used more for household or individual strategies. These include attributes such as email, username, or home address.

### When to create a custom Identity Namespace

Though there are several standard Identity Namespaces provided for use by default, you may find you need different Namespaces to properly suit the various sources of data within your own ecosystem. 

Standard Namespaces such as 'Phone' and 'Email' are, indeed, very generic and won't suffice if there are more than one system which would identify a profile by these properties. You may wish to use more specific Namespaces like: 'CRMPhone', 'CallCenterPhone' etc. to more fully qualify the different identity types that exist in your infrastructure.
