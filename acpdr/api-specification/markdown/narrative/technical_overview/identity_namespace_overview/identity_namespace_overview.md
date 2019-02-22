# Identity Namespace Overview

## Overview

User Profile data aggregated in Adobe Experience Platform could come from many disparate systems, each of which may have data relevant to a particular user, and each system may represent and identify that user differently.  In this scenario, a "User ID" is only reliable in the context of a specific system of record.

An end user could be identified by a multitude of values, such as:

* A cookie ID that was set during a session on your site
* The device identifier for the tablet used to view your site
* An email address collected during an offline interaction
* The CRM ID provided during a product purchase
* Countless others

An Identity Namespace is an indicator of the context from which data originates, such as a help desk system using an email address to identify a user, or a CRM which may use a numeric ID. Adobe provides several pre-defined standard Identity Namespaces including a Namespace for each Adobe solution, as well as for many industry standard solutions IDs such as the Windows AID (WAID) and Google Ad ID (GAID). Generic Namespaces, such as for "Email" and "Phone" are among the standard Identity Namespaces. You may also create new Namespaces to represent additional systems and ID types.

When multiple identifiers are provided in a single profile fragment, those identities are linked in the identity graph maintained by Identity Service. In this way, Identity Namespaces make it possible for Unified Profile to aggregate profile data for a particular person which may originate from several different systems within your organization into one robust unified view. For more information on Unified Profile, visit [Unified Profile Overview](../unified_profile_architectural_overview/unified_profile_architectural_overview.md).

Identity Namespaces are also used to comply with General Data Protection Regulation (GDPR) concerns. Visit [GDPR on Adobe Experience Platform Overview](../../../../../api-specification/markdown/narrative/gdpr/gdpr-on-platform-overview.md) for a step by step breakdown. Or, go straight to the [Adobe Experience Platform GDPR Service Overview](../../../../../api-specification/markdown/narrative/gdpr/use-cases/gdpr-api-overview.md) to understand the GDPR Service API.

### Using the API

This document describes interacting with Identity Namespace Service using Adobe's Experience Platform APIs. All services, unless otherwise indicated, require the following headers:

* `X-Gw-Ims-Org-Id` - Your organization ID
* `Authorization` -  Your bearer token value, prefixed with "Bearer "
* `X-Api-Key` - Your API key

See the [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html) for details on obtaining your Adobe Identity Management System (IMS) credentials.

---

## Working with Identity Namespaces

In this section, we will discuss the aspects of working with Identity Namespaces within Experience Platform, including:

[Listing available namespaces](#listing-namespaces-available-for-your-organization): View a list of all Identity Namespaces available for use by your organization. Before creating a new Identity Namespace, you should check to see if one already exists which meets the requirements of your data
[Creating custom Namespaces](#creating-a-custom-namespace):  Create a Namespace for use by your organization
[Labeling your data](#labeling-your-data): Include identity entities in your XDM formatted data. All identities ingested into Platform must include a Namespace

### Listing Available Namespaces

List details for all Namespaces available for use by your organization to determine which to use to group each Profile ID included in your data. The following are standard Namespaces, and are provided for use by all organizations.

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

__Example request to list Namespaces__

```
GET https://platform.adobe.io/data/core/idnamespace/identities
```

__Example response__

```
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
    },
    ...
]
```

### Creating a Custom Namespace

When your goals require a Namespace besides what is available, you can create a custom Namespace which will be available only to your organization.

For recommendations around creating custom Namespaces, see [the FAQ](../identity_services_architectural_overview/identity_services_faq.md).

__Example request to create a Namespace__

```
POST https://platform.adobe.io/data/core/idnamespace/identities
```

__Example body__

```
{
  "shared": false,
  "description": "Test Namespace Details",
  "idType": "COOKIE",
  "code": "TEST",
  "name": "Test Namespace"
}
```

__Example response__

```
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

### Labeling Your Data

In incoming XDM Profile data, indicating the Namespace for each profile ID is a function of specifying the `code` for the Namespace property of each identity under the `identities` array. The following JSON snippet is an example of an XDM `Identity` entity referencing the custom Namespace created above:

```
identities: [
 {
    "id": "example@email.com",
    "authenticatedState": "",
    "primary": "",
    "namespace" : {
      "code": "TEST"
    }
 }
]
```
