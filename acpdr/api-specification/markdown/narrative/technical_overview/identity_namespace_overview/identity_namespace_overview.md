# Identity Namespace Overview

## 1. Overview

User Profile data aggregated in the Cloud Platform could come from many disparate systems, each of which may have data relevant to a particular user, and each system may represent and identify that single user differently.  In this environment, a "User ID" is only reliable in the context of a specific system of record. 

An End User can be identified by a multitude of values, such as:

* A cookie ID that was set during a session on your site
* The device identifier for the tablet used to view your site
* An email address collected during an offline interaction
* The CRM ID provided during a product purchase
* Countless others

An Identity Namespace is an indicator of the context from which data originates, such as an email address used to ID your user in your help desk system, or the device ID of the tablet used to browse your gallery. 
Adobe provides several pre-defined Standard Identity Namespaces including a Namespace for each Adobe solution, as well as for many industry standard solutions IDs such as the Windows AID (WAID) and Google Ad ID (GAID). 
Generic Namespaces, such as for "Email" and "Phone" are provided by default. You may also create new Namespaces to represent additional systems and ID types.

Identity Namespaces also can be configured to imply security and privacy settings enabling compliance with General Data Protection Regulation (GDPR). 

### 1.1 Audience

This document is aimed at technical personas and should be a useful tool for all users that need to:

* Consume Adobe Cloud Platform APIs
* Understand Adobe Cloud Platform Architecture
* Understand how to differentiate IDs from varying systems within the Experience Cloud
* Establish compliance with GDPR
* Architect integrations between customer-owned and 3rd party systems and Adobe Cloud Platform

### 1.2 Version Information

*Version* : Preview

### 1.3 License Information

*Terms of service* : https://www.adobe.com/legal/terms.html

### 1.4 URI Scheme

*Host* : __platform.adobe.io__  
*BasePath* : __/data/core/idnamespace/__   
*Schemes* : __HTTPS__ 

### 1.5 About the Docs

This document is kept up-to-date and can be updated without announcement.

### 1.6 Using the API

This document describes interacting with Identity Namespace Services using Adobe's Platform APIs. See the [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html) for information on how to access these services.

---

## 2. Working with Identity Namespaces

In this section, we will discuss the aspects of working with Identity Namespaces within the Experience Cloud, including:

* __List Available Namespaces__: View a list of all Identity Namespaces available for use. Before creating a new Identity Namespace, you should check to see if one already exists which meets the requirements of your data.
* __Create a Namespace__:  Create a Namespace for use by your organization
* __Label Your Data__: XDM formatted data will provide identifying data along with the applicable Identity Namespace code. All data ingested into the Experience Cloud must include a Namespace.

### 2.1 List Available Namespaces

List all Namespaces available for use by your organization to determine which to use to group your data. 

__Example Request - List Namespaces__:

```
GET https://platform.adobe.io/data/core/idnamespace/identities/ HTTP/1.1

Headers:

Authorization: Bearer {TOKEN}
X-Gw-Ims-Org-Id: {imsOrgId}
X-Api-Key: {your-api-client-id}

Response:

[
  {
        "updateTime": 1441122419000,
        "code": "CORE",
        "shared": true,
        "type": "GENERAL",
        "status": "ACTIVE",
        "description": "CORE Namespace",
        "id": 0,
        "createTime": 1441122419000,
        "idType": "COOKIE",
        "name": "CORE",
        "custom": false
    },
    {
        "updateTime": 1495153678000,
        "code": "ECID",
        "shared": false,
        "type": "GENERAL",
        "status": "ACTIVE",
        "description": "ECID Namespace",
        "id": 4,
        "createTime": 1495153678000,
        "idType": "COOKIE",
        "name": "ECID",
        "custom": false
    },
    {
        "updateTime": 1522783145000,
        "code": "AdCloud",
        "shared": true,
        "type": "GENERAL",
        "status": "ACTIVE",
        "description": "Adobe AdCloud - ID Syncing Partner",
        "id": 411,
        "createTime": 1522783145000,
        "idType": "COOKIE",
        "name": "AdCloud",
        "custom": false
    }
]
```

Where `imsorg` is the Org ID for which to retrieve available Namespaces (for example - “09A55EBC5639E6017F000101@AdobeOrg”). For information on how to retrieve your IMS Org ID, or how to obtain an IMS service token, see [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html).

The following Namespaces are provided for use by all organizations. 

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

### 2.2 Create a Custom Namespace

Create a new Namespaces under the given company. For recommendations around creating custom Namespaces, see [the FAQ](../identity_services_architectural_overview/identity_services_faq.md).

__Example Request - Create Namespace__:

```
POST https://platform.adobe.io/data/core/idnamespace  HTTP/1.1

Headers:

Authorization: Bearer {TOKEN}
X-Gw-Ims-Org-Id: {imsOrgId}
X-Api-Key: {your-api-client-id}

BODY:

{
  "shared": false,
  "description": "Test Namespace Details",
  "idType": "COOKIE",
  "code": "TEST",
  "name": "Test Namespace"
}

Response:

{
    "updateTime": 1525129290000,
    "code": "TEST",
    "shared": false,
    "type": "GENERAL",
    "status": "ACTIVE",
    "description": "Test Namespace Details",
    "id": 56011,
    "createTime": 1525129290000,
    "idType": "COOKIE",
    "name": "Test Namespace",
    "custom": false
}

```

### 2.3 Label Your Data

Indicating which Identity Namespace under which to categorize your data is a function of specifying the `code` for that Namespace in your XDM data. The following is an example of an XDM `Identity` entity referencing the custom Namespace created above:

```JSON
{
  "identity" : {
    "id": "some_sys_id",
    "xid": "some_xid",
    "namespace" : {
      "id": 56011,
      "code": "TEST"
    }
  }
}
```
