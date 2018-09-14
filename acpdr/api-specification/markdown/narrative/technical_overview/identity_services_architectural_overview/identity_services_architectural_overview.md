# Identity Services - Overview
<!-- The majority of the documentation here came from: https://wiki.corp.adobe.com/display/DMSArchitecture/Unified+Identity+Service+-+API+Specification-->

## 1. Overview

Delivering relevant digital experiences requires a complete identification of your end user. Unified Identity Service (UIS) provides API based access to consumer Identity Graphs which resolves a known or anonymous identity to all other known and anonymous identities of a person. Identity Graph solves the fundamental challenge posed by the fragmentation of identities and thus profiles, across multiple devices owned by a consumer, and is needed for improving the accuracy and reach of digital marketing campaigns.

![Identity Services in the ACP](is-in-action.png)

## 2. Definition of Terms

### 2.1. Identity Namespace

Each of your end users could potentially be represented using as many different identifiers as there are systems of record in your infrastructure. 
With all of that profile data being ingested into the Adobe Cloud Platform, Identity Namespaces provide the context in which a given ID was set and is referenced by. 
For more information, see the [Identity Namespace Overview](../identity_namespace_overview/identity_namespace_overview.md). 

### 2.2 IMS Org Id

Customer/Partner IMS Org Id as created in Adobe's customer onboarding process. For more information, see the [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html).

### 2.3 XID

Experience ID (XID) is the identity object for Experience Cloud, serving as the encapsulation of the Namespace ID (NID) and the identity in the Namespace. 
There are multiple representations of XIDs - including the existing solution specific representations such as AMO Id, Analytics Id, Target ID, AAM ID and the Marketing Cloud ID. 
All types of identities can be expressed as an XID, including a consumer identity or a physical device id.

An AMO cookie-id (for example `Was_2AAAAFZ7q3xO`) is an XID with a Namespace ID of 411.  Similarly an AAM cookie-id (for example `64077380566994308300716050799446918829`) is an XID with a namespace of 0. 
<!-- CORE-13607 - Please explain: The native serialized format also supports one way hashing of PII type of identities through the SDK. -->
Unified Identity Services provide a native serialized format of XID. A native format of XID can be obtained either using an SDK or using a REST API. 
The native serialized format also supports one way hashing of PII type of identities through the SDK.

## 3. Ingesting XDM Data to Identity Graph

### 3.1 Decide on Identity Fields

Depending on your enterprise data collection strategy, you will decide which fields you want to mark as identity.
Some examples could be:

* A Telecom company prefers ‘Phone Number’ in both offline and online data sets
* A retail company relies on ‘Email address’ in offline data sets and MCID in online data sets (because of high percentage of anonymous visitors)
* A bank prefers ‘Loyalty #’ in offline data sets and ‘login ID’ in online data sets (because 90% users are authenticated)
* Companies like Adobe prefer ‘GUID’ which is their own proprietary ID

### 3.2 Specify Record IDs

When ingesting data conforming to the Profile XDM, specify the relevant IDs by adding them to the `identities` array. For example: 

```
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

For data conforming to the ExperienceEvent XDM, identities can be provided as an entry in `endUserIds`:

```
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

### 3.2 Tag DataSet

UIS maintains XDM data in the identity graph which can be updated via batch or stream ingestion. 
XDM data can be ingested into the UIS based on and triggered by batch data being [ingested](../ingest_architectural_overview/ingest_architectural_overview.md) and managed by [Data Catalog Service](../catalog_architectural_overview/catalog_architectural_overview.md).

Enablement for ingestion by identity graph is handled by a tag on a DataSet, named specifically "unifiedIdentity".

```
PATCH https://platform.adobe.io/data/foundation/catalog/dataSets/5a7d26e92a6e55000086d459 HTTP/1.1
```

__Example body__

```
{
    "tags" :  {
        "unifiedIdentity": ["enabled:true"]
    }
}
```

Most use cases require data to be used by both [Unified Profile Services](../unified_profile_architectural_overview/unified_profile_architectural_overview.md) and UIS. 
Below is an example of adding tags enable your data to be ingested to both systems.

```
PATCH https://platform.adobe.io/data/foundation/catalog/dataSets/5a7d26e92a6e55000086d459 HTTP/1.1
```

__Example body__

```
{
    "tags" :  {
        "unifiedProfile": ["enabled:true"],
        "unifiedIdentity": ["enabled:true"]
    }
}
```

## 4. ECID - An Essential Tool

Experience Cloud ID Service (ECID) is Adobe’s client side tool to perform identity management, serving three primary functions:

*  Identify each visitor 
*  Provide synchronization with Partners 
*  Feed pairwise links to connect with offline or other IDs to the graph

Identifying your online users requires instrumentizing your site or mobile app with the ECID, which provides a universal and persistent ID that identifies your visitors across all solutions in the Experience Cloud.
 
If you are working with a website implementation, explore the resources [here](https://marketing.adobe.com/resources/help/en_US/mcvid).

If you are working with a mobile app, see how ECID is used to [track visitors between an app and mobile web](https://marketing.adobe.com/resources/help/en_US/mobile/ios/hybrid_app.html).

Deploying these tools can be simple and easy to manage if you use [Adobe Launch](https://docs.adobelaunch.com).

Also, see the [GDPR Documentation](https://www.adobe.io/apis/cloudplatform/gdpr/docs/alldocs.html#!api-specification/markdown/narrative/gdpr/gathering-your-ids.md) for information on using ECID for GDPR compliance.

