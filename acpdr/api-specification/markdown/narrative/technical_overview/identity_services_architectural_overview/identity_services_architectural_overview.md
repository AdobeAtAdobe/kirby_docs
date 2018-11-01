# Identity Service - Overview
<!-- The majority of the documentation here came from: https://wiki.corp.adobe.com/display/DMSArchitecture/Unified+Identity+Service+-+API+Specification-->

## Overview

Delivering relevant digital experiences requires resolving all identities of each of your end users, giving you the power to react to your consumers based on unlimited aspects of their profile or behavior. Unified Identity Service (UIS) provides API based access to consumer identity graphs which resolves a known or anonymous identity to all other known and anonymous identities of a person. UIS solves the fundamental challenge posed by the fragmentation of identities and thus profiles, across multiple devices owned by a consumer, and is needed for improving the accuracy and reach of digital marketing campaigns.

![Identity Service on Platform](identity-service.png)


## Definition of Terms

### Identity Namespace

Identity Namespace fully qualifies an identity. Each of your end users could potentially be represented using as many different identifiers as there are systems of record in your infrastructure. With all of that profile data being ingested into Adobe Experience Platform, Identity Namespaces provide the context in which a given ID was set and is referenced by. Identity Namespace also prevents collision of identities that belong to different namespaces. For more information, see the [Identity Namespace Overview](../identity_namespace_overview/identity_namespace_overview.md).

### IMS Org Id

Customer/Partner IMS Org Id as created in Adobe's customer onboarding process. For more information, see the [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html).

### XID

Experience ID (XID) is the identity object for Experience Platform, serving as the encapsulation of the Identity Namespace ID (NID) and the Identity Namespace value (ID). There are multiple representations of XIDs - including the existing solution specific representations such as AMO ID, Analytics ID, Target ID and AAM ID. All types of identities can be expressed as an XID, including a consumer identity or a physical device ID.

An AMO cookie-id (for example `Was_2AAAAFZ7q3xO`) is an XID with a Namespace ID of 411.  Similarly an AAM cookie-id (for example `64077380566994308300716050799446918829`) is an XID with a namespace of 0. Identity Service provide a native serialized format of XID. A native format of XID can be obtained either using an SDK or using a REST API. The native serialized format also supports one way hashing of PII type of identities through the SDK. This is a feature pending implementation.

## Providing XDM Data to Identity Service

### Decide on Identity Fields

Depending on your enterprise data collection strategy, you will decide which fields you want to mark as identity. To get the maximum benefit of Platform and the most complete identities, you should upload both online and offline data. Online data is data such as a username or perhaps email address, and describes online presence and behavior. Offline data refers to data such as from your CRM or the ID from a loyalty program and makes your identities more robust and provides cohesion of the data across your disparate systems.

Some examples could be:

* A Telecom company prefers ‘Phone Number’ in both offline and online data sets
* A retail company relies on ‘Email Address’ in offline data sets and ECID in online data sets (because of high percentage of anonymous visitors)
* A bank prefers ‘Loyalty #’ in offline data sets and ‘login ID’ in online data sets (because 90% users are authenticated)
* Companies like Adobe prefer ‘GUID’ which is their own proprietary ID

### Specify Record IDs

When uploading data conforming to the Profile XDM, specify the relevant IDs by adding them to the `identities` array. For example: 

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
        "code": "ECID" 
      },
      "id": "82781972020839607487123257673310321221" 
    }
  ]
}
```

For data conforming to the ExperienceEvent XDM, identities can be provided as an entry in `endUserIds`:

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
			"aaid": {
				"id": "2dce0c8c00001976-03ea400000000003",
				"namespace": {
					"code": "AAID"
				},
				"primary": false
			},
			"acid": {
				"id": "2dce0c8c00003ae4-3f06400000000002",
				"namespace": {
					"code": "acid"
				},
				"primary": false
			},
			"tntid": {
				"id": "2dce0c8c000074c7-2ad9e00000000001",
				"namespace": {
					"code": "tntid"
				},
				"primary": false
			},
			"adcloud": {
				"id": "2dce0c8c00005e7f-11f2400000000004",
				"namespace": {
					"code": "AdCloud"
				},
				"primary": false
			},
			"phonenumberid": {
				"id": "903-767-7425",
				"namespace": {
					"code": "Phone"
				},
				"primary": false
			},
			"emailid": {
				"id": "maxinehirthe@parallels.com",
				"namespace": {
					"code": "Email"
				},
				"primary": false
			}
		}
	}
}
```

### Tag DataSet

UIS maintains XDM data in the identity graph, where data can be uploaded and updated via [batch](../ingest_architectural_overview/ingest_architectural_overview.md) or [streaming ingestion](../streaming_ingest/getting_started_with_platform_streaming_ingestion.md). XDM data can be uploaded into the UIS based on and triggered by batch data being ingested and managed by [Data Catalog Service](../catalog_architectural_overview/catalog_architectural_overview.md).

With batch ingestion, enablement for ingestion into the identity graph is handled by a tag on a dataset, named specifically "unifiedIdentity". Streaming data is ingested by UID and UP by default without configuration.

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

Most use cases require data to be used by both [Unified Profile Services](../unified_profile_architectural_overview/unified_profile_architectural_overview.md) (UPS) and UIS. Below is an example of adding tags enable your data to be ingested to both systems.

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

### Upload Your Data to Adobe Experience Platform

All that's left is to provide your data; the core of Experience Platform. To get the most complete consumer identity, you will want to upload profile and behavioral data from all of the systems where relevant data is stored, and from all systems used by your consumers to interact with your brand. UIS will stitch your data as an identity graph, where each consumer is represented as an aggregate of all data stored about them, across any of the systems you onboard.

Platform supports batch and streaming ingestion of data conforming to an XDM schema. 

#### Batch Ingestion

Batches of data can be uploaded to datasets in Platform using [batch ingestion](../ingest_architectural_overview/ingest_architectural_overview.md).

#### Streaming Ingestion

Use Platform's [streaming ingestion](../streaming_ingest/getting_started_with_platform_streaming_ingestion.md) to upload data, allowing you to react to changes to your consumers' data and to their interactions with your brand near real-time. 