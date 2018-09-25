# Identity Service - FAQ and Recommendations

## Overview

This document is intended to centralize both frequently asked questions and recommendations as they relate to working with Identity Service. 

## FAQ

### What is Private Identity Graph?

It is an enterprise Identity Graph built with both anonymous and known consumer Identities to enable marketers perform people based marketing and analysts perform omni-channel analysis. 

### How often is Identity Graph updated?

The Identity Graph is currently updated once a week, but we are working on more frequent updates including updates based on real time deterministic signals. 

### Are there any considerations when hashing PII based Identities?

If customers are sending in hashed IDs (Email IDs etc.), the same encryption technique used for that ID needs to be used across various datasets. 
This ensures that the same hashed values, used as a common key, are coming via Adobe Analytics and Adobe Campaign or other datasets.  
If for whatever reason they are different, Adobe will not be able to find a link and fail to deliver unified segmentation across datasets.

### How does the Identity Service SDK handle PII?

The Identity Service SDK supports creating a strong one way cryptographic hash of PII, or personally identifiable information. 

### What is DCS?

DCS stands for Adobe’s Data Collection Service that is deployed on Adobe’s edge data centers.

### What are known and anonymous identities?

__Known identity__ refers to identity that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Example: email-id or loyalty card number from a customer’s CRM system.

__Anonymous identity__ refers to identity that cannot be used on its own or with other information to identify, contact, or locate a single person. Example: cookie-id.

### Are there any Identity Namespaces I can use out of the box?

The following Namespaces are provided for use by all organizations. These are referred to as the Standard Namespaces.

|Display Name|ID|Code|Description|
|------------|---|---|-----------|
|CORE|0|CORE|legacy name: "Adobe AudienceManager"|
|ECID|4|ECID|alias: "Adobe Marketing Cloud ID", "Adobe Experience Cloud ID"|
|Email|6|Email||
|Phone|7|Phone|| 
|Windows AID|8|WAID|| 
|AdCloud|411|AdCloud|alias: Ad Cloud|
|Adobe Target|9|TNTID|Target ID|
|Google Ad ID|20914|GAID|GAID| 
|Apple IDFA|20915|IDFA|ID for Advertisers|
|Google Cloud Messaging - Push ID|20919|GCM|GCM| 
|Apple Push Notification Service - Push ID|20920|APNS|APNS| 

### When should I create a custom Identity Namespace?

See recommendations around creating custom Namespaces below.

## Recommendations

### When to create a custom Identity Namespace

Though there are several Standard Identity Namespace provided for use by default (refer to question 2.5 above), you may find you need different Namespaces to properly suit the various sources of data within your own ecosystem. 

Standard Namespaces such as 'Phone' and 'Email' are, indeed, very generic and won't suffice if there are more than one system which would identify a profile by these properties. You may wish to use more specific Namespaces like: 'CRMPhone', 'CallCenterPhone' etc. to more fully qualify the different identity types that exist in your infrastructure.