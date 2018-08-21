# Identity Services - Overview
<!-- The majority of the documentation here came from: https://wiki.corp.adobe.com/display/DMSArchitecture/Unified+Identity+Service+-+API+Specification-->

## 1. Overview

Delivering right and relevant digital experiences requires a correct and complete identification of your End User. Unified Identity Service (UIS) provides API based access to consumer Identity Graphs which resolves a known or anonymous identity to all other known and anonymous identities of a person. Identity Graph solves the fundamental challenge posed by the fragmentation of identities and thus profiles, across multiple devices owned by a consumer, and is needed for improving the accuracy and reach of digital marketing campaigns.

![Identity Services in the ACP](is-in-action.png)

## 2. Definition of Terms

### 2.1 XID

Experience ID (XID) is the identity object for Experience Cloud, serving as the encapsulation of the Namespace ID (NID) and the identity in the Namespace. There are multiple representations of XIDs - including the existing solution specific representations such as AMO Id, Analytics Id, Target ID, AAM ID and the Marketing Cloud ID. All types of identities can be expressed as an XID, including a consumer identity or a physical device id.

An AMO cookie-id (for example `Was_2AAAAFZ7q3xO`) is an XID with a Namespace ID of 411.  Similarly an AAM cookie-id (for example `64077380566994308300716050799446918829`) is an XID with a namespace of 0. 
<!-- CORE-13607 - Please explain: The native serialized format also supports one way hashing of PII type of identities through the SDK. -->
Unified Identity Services provide a native serialized format of XID. A native format of XID can be obtained either using an SDK or using a REST API. The native serialized format also supports one way hashing of PII type of identities through the SDK.

### 2.2. Identity Namespace

Profile data in the ACP is an aggregate of data from varying solutions, creating the need to qualify a given identifier with the system from which it comes. Namespaces are a cornerstone of the Identity Services. For more information, see the [Identity Namespace Overview](../identity_namespace_overview/identity_namespace_overview.md). 

### 2.3 IMS Org Id

Customer/Partner IMS Org Id as created in Adobe's customer onboarding process. For more information, see the [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html).

## 3. Ingesting XDM Data to Identity Graph

### 3.1 Tag DataSet

UIS maintains XDM data in the Identity graph which can be updated via batch or stream ingestion. XDM data can be ingested into the User Identity Service based on and triggered by batch data being [ingested](../ingest_architectural_overview/ingest_architectural_overview.md) and managed by Data Catalog Service.

Enablement for ingestion by Identity graph is handled by a Tag on a DataSet, named specifically "unifiedIdentity".

```
PATCH https://platform.adobe.io/data/foundation/catalog/dataSets/5a7d26e92a6e55000086d459 HTTP/1.1

Body:

{
    "tags" :  {
        "unifiedIdentity": ["enabled:true"]
    }
}
```

Most use cases require data to be in both profiles and identity. Below tags enable your data to be ingested to both Profiles and Identity.

```
PATCH https://platform.adobe.io/data/foundation/catalog/dataSets/5a7d26e92a6e55000086d459 HTTP/1.1

Body:

{
    "tags" :  {
        "unifiedProfile": ["enabled:true", "identityField:identities.id"],
        "unifiedIdentity": ["enabled:true"]
    }
}
```

### 3.2 Decide on Identity Fields

Depending on your enterprise data collection strategy, you will decide which fields you want to mark as Identity.

* A Telecom company prefers ‘Phone Number’ in both offline and online data sets
* A retail company relies on ‘Email address’ in offline data sets and MCID in online data sets (because of high percentage of anonymous visitors)
* A bank prefers ‘Loyalty #’ in offline data sets and ‘login ID’ in online data sets (because 90% users are authenticated)
* Companies like Adobe prefer ‘GUID’ which is their own proprietary ID

### 3.3 Label Identity Fields

Conforming to the Profile XDM, identities can be labeled by adding them to the `identity` array. For example: 

```JSON
{
  "identities": [
    { 
      "xid": "GU8rb925s2L2fkF55boQKCbliQ8", 
      "namespace": { 
        "code": "CRMId" 
      },
      "id": "87374043487584731811119677934421981925" 
    },
    { 
      "xid": "GbZWRW8tXrZ4gABvwzC_gAAAAAAA", 
      "namespace": { 
        "code": "AVID" 
      },
      "id": "2d5eb67880006fc3-30bf800000000000" 
    },
    { 
      "xid": "A2-s19jafhDickW6PP0c5dpi", 
      "namespace": { 
        "code": "mcId" 
      },
      "id": "82781972020839607487123257673310321221" 
    }
  ]
}
```

Conforming to the ExperienceEvent XDM, Identities can be labeled by mentioning within `endUserIds`:

```JSON
{
  "endUserIds": { 
    "_vendor": { 
      "adobe": { 
        "experience": { 
          "mcId": { 
            "id": "55115069898928455152185628961882945298", 
            "namespace":{ 
              "code": "mcId" 
            }
          }, 
          "analytics": { 
            "id": { 
              "id": "2d542d820000593e-045f400000000035", 
              "namespace":{
                "code": "AVID"
              } 
            }
          }
        }
      }
    }
  }
}
```

## 4. ECID - an essential tool

Experience Cloud ID service is Adobe’s client side tool to perform identity management. Three primary functions:

* Identifies visitors 
* Facilitates synchronization with partners 
* Feeds pairwise links to connect with offline or other IDs to the graph

Identifying your online users requires instrumentizing your site or mobile app with the Experience Cloud ID Service (ECID), which provides a universal and persistent ID that identifies your visitors across all solutions in the Experience Cloud.
 
If you are working with a website implementation, explore the resources [here](https://marketing.adobe.com/resources/help/en_US/mcvid).

If you are working with a mobile app, see how ECID is used to [track visitors between an app and mobile web](https://marketing.adobe.com/resources/help/en_US/mobile/ios/hybrid_app.html).

Deploying these tools can be simple and easy to manage if you use [Adobe Launch](https://marketing.adobe.com/resources/help/en_US/mcvid/mcvid-standard.html).

Also, see the [GDPR Documentation](https://www.adobe.io/apis/cloudplatform/gdpr/docs/alldocs.html#!api-specification/markdown/narrative/gdpr/gathering-your-ids.md) for information on using ECID for GDPR compliance.
