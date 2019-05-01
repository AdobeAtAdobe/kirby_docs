# Unified Profile Overview

## Overview

The Unified Profile Service (UPS) in Adobe Experience Platform provides a Unified, 360° Consumer Profile that enables marketers to drive coordinated, consistent and relevant experiences with their audiences across channels. With UPS, you have one place to go to get a holistic view of your entire user base aggregated across all systems, as well as actionable timestamped account of every event they've had in any of your systems, when you need it.

![Unified Profile In Action](unified-profile.png)

### Unified Profile in Adobe Experience Platform

Unified Profile provides cohesion of data across any standardized datasets you choose to onboard.

![Unified Profile In Action](up-in-adobe-experience-platform.png)

### Using the API

This document describes interacting with UPS using Adobe's Platform APIs. See the [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html) for information on how to access these services.

---

## Ingesting XDM Data

UPS maintains XDM data in the Profile Store which can be updated via batch or stream ingestion. XDM data can be ingested into the UPS based on and triggered by batch data being [ingested](../ingest_architectural_overview/ingest_architectural_overview.md) and managed by Data Catalog Service.

Enabling Unified Profile to ingest Adobe Data Catalog is handled by a Tag on a dataset, named specifically "unifiedProfile". The Tag is configured with an `enabled` property that when set to true enables the dataset for ingestion into UPS.

### Batch Ingestion of Profile XDM DataSets

The following is an example `PATCH` request adding the "unifiedProfile" Tag to a dataset using the dataset ID. The resulting profile ID is set to the value of the `identities.id` field. `identities` is an array in the XDM Profile schema. `identities.id`, then, will resolve to the `id` property of the first element in that array.

__Example Data Catalog Service request - Add Unified Profile configuration Tag__

```
PATCH https://platform.adobe.io/data/foundation/catalog/dataSets/5a7d26e92a6e55000086d459
```

__Example body__

```
{
   "tags" : {
        "unifiedProfile": ["enabled:true"],
        "unifiedIdentity": ["enabled: true"]
    }
}
```

### Batch Ingestion of ExperienceEvent XDM DataSets

The following is an example `PATCH` request adding the "unifiedProfile" Tag for an ExperienceEvent dataset using the `datasetId`. Initial releases limit ExperienceEvents to being related to only XDM Profiles, or extensions of the XDM Profile schema.

```
PATCH https://platform.adobe.io/data/foundation/catalog/dataSets/5a7d26e92a6e55000086d459
```

__Example body__

```
{
   "tags" : {
        "unifiedProfile": ["enabled:true"],
        "unifiedIdentity": ["enabled: true"]
    }
}
```

### Verify a DataSet is Enabled in Profile

To check if your dataset has been enabled in UPS, use the Data Catalog Service API to get the dataset using the `datasetId`. A dataset is enabled if it contains a `unifiedProfile` Tag with a colon-delimited property string for `enabledAt`. The value of this tuple reports the time after which ingested Profile data would be made accessible via UPS.

```
GET https://platform.adobe.io/data/foundation/catalog/dataSets/5b020a27e7040801dedbf46e
```

__Example response__

```
{
    "5b020a27e7040801dedbf46e": {
        "version": "1.0.3",
        "imsOrg": "1BD6382559DF0C130A49422D@AdobeOrg",
        "name": "Unified Profile Ingestion Test Events DataSet",
        "created": 1526860327407,
        "updated": 1526860337773,
        "createdClient": "AEP_UNIFIED_PROFILE",
        "createdUser": "AEP_UNIFIED_PROFILE@AdobeID",
        "updatedUser": "acp_foundation_dataTracker@AdobeID",
        "namespace": "ACP",
        "tags": {
            "unifiedProfile": [
                "enabled:true",
                "identityField:endUserIds._vendor.adobe.experience.analytics.id.id",
                "orderField:timestamp",
                "relatedModels:test_small_1526860248587",
                "enabledAt:2018-05-20 23:52:09"
            ]
        },
        "dule": {},
        "statsCache": {},
        "lastBatchId": "c134eeb63cc1421ea6baeb6149aeb597",
        "lastBatchStatus": "success",
        "lastSuccessfulBatch": "c134eeb63cc1421ea6baeb6149aeb597",
        "viewId": "5b020a27e7040801dedbf46f",
        "aspect": "production",
        "status": "enabled",
    }
}
```

For more details on this and other Data Catalog Service APIs, visit the [Swagger API reference](../../../../../../acpdr/swagger-specs/catalog.yaml).

### Monitoring Ingestion

Depending on the size of the data, batches take varying lengths of time to ingest. Using the Bulk Ingestion API, the first step to uploading a batch of data is to create the batch. You are provided with a `batchId` in the response. In the example below the batch ID is "29285e08378f4a41827e7e70fb7cb8f0", provided as the value to the `batch` request parameter, indicating to retrieve all batches _related to that batch_. Using that ID, you are able to poll the dataset for the status of the batch from ingestion until the `status` in the response indicates completion ("success" or "failure").

__Example request for related Unified Profile batches__

```
GET https://platform-stage.adobe.io/data/foundation/catalog/batches?batch=29285e08378f4a41827e7e70fb7cb8f0&createdClient=acp_core_unifiedProfile_feeds
```

__Arguments__

* `batch` - Indicates to retrieve all batches _related to_ the ID provided as the value of this parameter
* `createdClient` - This parameter filters by the client who generated the batch. In the case of Unified Profile, that will always be "acp_core_unifiedProfile_feeds"

__Example positive response__

```
{
    "5b7129a879323401ef2a6486": {
        "imsOrg": "F47E32E75AB004490A49403E@AdobeOrg",
        "created": 1534142888068,
        "createdClient": "acp_core_unifiedProfile_feeds",
        "createdUser": "acp_core_unifiedProfile_feeds@AdobeID",
        "updatedUser": "acp_core_unifiedProfile_feeds@AdobeID",
        "updated": 1534142955152,
        "replay": {},
        "status": "success",
        "errors": [],
        "version": "1.0.3",
        "availableDates": {},
        "relatedObjects": [
            {
                "type": "batch",
                "id": "29285e08378f4a41827e7e70fb7cb8f0"
            }
        ],
        "metrics": {
            "startTime": 1534142943819,
            "endTime": 1534142951760,
            "recordsRead": 108,
            "recordsWritten": 108
        }
    }
}
```

__Example negative response__

```
{
    "5b96ce65badcf701e51f075d": {
        "imsOrg": "4A21D36B544916100A4C98A7@AdobeOrg",
        "status": "failed",
        "relatedObjects": [
            {
                "type": "batch",
                "id": "29285e08378f4a41827e7e70fb7cb8f0"
            }
        ],
        "replay": {},
        "availableDates": {},
        "metrics": {
            "startTime": 1536610322329,
            "endTime": 1536610438083,
            "recordsRead": 4004,
            "recordsWritten": 4004,
            "failureReason": "Job aborted due to stage failure: Task 0 in stage 1.0 failed 4 times,:"
        },
        "errors": [
            {
                "code": "0070000017",
                "description": "Unknown error occurred."
            },
            {
                "code": "unknown",
                "description": "Job aborted."
            }
        ],
        "created": 1536609893629,
        "createdClient": "acp_core_unifiedProfile_feeds",
        "createdUser": "acp_core_unifiedProfile_feeds@AdobeID",
        "updatedUser": "acp_core_unifiedProfile_feeds@AdobeID",
        "updated": 1536610442814,
        "version": "1.0.5"
    }
}
```

A recommended interval is two minutes. For more information on working with Catalog datasets and batches, see [Data Catalog Services](../catalog_architectural_overview/catalog_architectural_overview.md).

---

## Profile Merging

One of the key features of UPS is being able to unify multi-channel data. Unified Profile stores data in "profile fragments". A profile fragment is a tuple of {ID, dataset/datastream} where:

* __ID__ is the primary identity of the record (e.g. XID in case of XDM Profile)
* __Dataset/Datastream__ refers to where the data came from (e.g. catalog batch dataset, streaming datastream etc.). Each dataset/datastream conforms to exactly one XDM schema

As Unified Profile ingests data, records within a profile fragment are updated at ingest time. However, records across profile fragments are merged at access time using merge policies.

### Merge Policies

A merge policy is a set of configurations controlling aspects of identity stitching and attribute merging. UPS provides the tools to manage various merge policies for unified profiles by way of the Merge Policies API. Merge policies are related to a schema, where an IMS Org can create any number of merge policies for a single schema.

Merge policies give you the control to handle situations such as:

* An environment where multiple datasets, say datasets DS1 and DS2, store the same attribute of a Profile (eg: firstName). Using merge policies, you are able to give precedence to DS1 such that merged Profiles always contain the value of the data from DS1
* DULE Labels restrict you from using data from a particular dataset. By creating a merge policy and leaving that dataset out of the dataset precedence list, you are able to suppress any data from that dataset from being used in a merged Profile

The Profile Configuration API centralizes merge rules used throughout UPS APIs, including Segmentation Jobs and the Profile Access API.

When using an API that accepts a merge policy without specifying one, the IMS Org's default merge policy for the given schema will be used. If a default merge policy has not been specified, the system will generate one automatically when needed.

There are two parts to merging Profile data across stores:

* Identity stitching
* Attribute merging

#### Identity stitching

Identity Stitching refers to determining when multiple fragments of a Profile refer to a single person. For more information, see [Identity Service overview](../identity_services_architectural_overview/identity_services_architectural_overview.md).

#### Attribute merging

When multiple profile fragments contain the same data elements, merge policies can be used to tune prioritization of your data by allowing you to specify the order of data precedence by dataset. When a merge policy is created with an attribute merge type of "dataSetPrecedence", you supply a list of datasets sorted from highest to lowest precedence. The following demonstrates creating a merge policy wherein a dataset "ds1" should be regarded as highest priority data when the records' `createdAt` value fails to distinguish.

```
POST https://platform.adobe.io/data/core/ups/config/mergePolicies
```

__Example body__

```
{
  "name":"Name",
  "id":1,
  "updateTime":1529687772669,
    "identityGraph": {
        "type":"none"
    },
    "attributeMerge": {
    "type": "dataSetPrecedence",
    "data": {
      "order": ["ds1", "ds2"]
    }
  },
  "imsOrgId":"1BD6382559DF0C130A49422D@AdobeOrg",
  "creationTime":1529687772669
}
```

Note that when "dataSetPrecedence" is used, only data from the datasets listed is merged. In other words, using the example merge policy above, merged data will only ever include data from datasets "ds1" and "ds2".

### Working with the Merge Policies API

Using the merge policies API, you are able to:

* GET all merge policies
* CREATE a merge policy
* GET a merge policy by id
* DELETE a merge policy by id

See the [Swagger API Reference](../../../../../../acpdr/swagger-specs/profile-access.yaml) for more details.

---

## Accessing Data using IDs

This section discusses using the Profile Access API to get Profiles and ExperienceEvents. Visit the [Swagger API Reference](../../../../../../acpdr/swagger-specs/profile-access.yaml) for complete coverage of the Profile Access API.

Profiles and time-series ExperienceEvent data are retrieved from separate `GET` calls.

### Access Unified Profile By Record ID

This section highlights using the Profile Access API to get a Unified Profile, given the Profile's ID and Namespace. Visit the [Swagger API Reference](../../../../../../acpdr/swagger-specs/profile-access.yaml) for complete coverage of the Profile Access API.

The parameters for accessing a Profile are as follows:

* `schema.name` (__required__) - Names the entity type, by schema name, for the record to return. Support both XED and FullURINameXED
* `entityId` (__required__) - Record ID for the entity
* `entityIdNS` (optional) - Represents the [Identity Namespace](../identity_namespace_overview/identity_namespace_overview.md) if the ID provided is NOT in native XID format
* `mergePolicyId` (optional) - Names the merge policy to use for the exported data

__Example Unified Profile Service request - Get a Unified Profile by ID__

```
GET https://platform.adobe.io/data/core/ups/access/entities/?schema.name={schema}&entityId={id}&entityIdNS={IDNS}
```

__Example response__

```
{
    "GU8rb925s2L2fkF55boQKCbliQ8,GbZWRW8tXrZ4gABvwzC_gAAAAAAA,A2-s19jafhDickW6PP0c5dpi": {
        "record": {
            "extraField1": 1,
            "personalEmail": {
                "address": "vmountneyji@pcworld.com"
            },
            "extraField2": 2,
            "identities": [
                {
                    "xid": "GU8rb925s2L2fkF55boQKCbliQ8",
                    "namespace": {
                        "code": "CRMId",
                        "id": 11111
                    },
                    "id": "87374043487584731811119677934421981925"
                },
                {
                    "xid": "GbZWRW8tXrZ4gABvwzC_gAAAAAAA",
                    "namespace": {
                        "code": "AVID",
                        "id": 22222
                    },
                    "id": "2d5eb67880006fc3-30bf800000000000"
                },
                {
                    "xid": "A2-s19jafhDickW6PP0c5dpi",
                    "namespace": {
                        "code": "ecId",
                        "id": 4
                    },
                    "id": "82781972020839607487123257673310321221"
                }
            ],
            "homePhone": {
                "number": "878-183-0090"
            },
            "person": {
                "firstName": "Val",
                "lastName": "Mountney",
                "gender": "xy",
                "courtesyTitle": "Mr"
            }
        }
    }
}
```

### Access ExperienceEvents by Profile Record ID

This section highlights using the Profile Access API to get a paginated list of ExperienceEvents for a given Profile, given the Profile's ID and Namespace. Visit the [Swagger API Reference](../../../../../../acpdr/swagger-specs/profile-access.yaml) for complete coverage of the Profile Access API.

The parameters for accessing ExperienceEvents are as follows:

* `schema.name` (__required__) - Names the entity type, by schema name, for the record to return. Support both XED and FullURINameXED
* `entityId` (__required__) - Record ID for the entity
* `entityIdNS` - Represents the [Identity Namespace](../identity_namespace_overview/identity_namespace_overview.md) if the ID provided is NOT in native XID format
* `mergePolicyId` - Names the merge policy to use for the exported data
* `relatedSchema.name` - Names the schema of the Profile
* `relatedEntityId` - Names the ID of the Profile
* `relatedEntityIdNS` - Names the namespace of the Profile ID provided

__Example UPS request - Get ExperienceEvents for a Unified Profile__

```
GET https://platform.adobe.io/data/core/ups/access/entities/?schema.name=_xdm.context.experienceevent&relatedschema.name=_xdm.context.profile&entityID={}&relatedentityIdNS={}
```

__Example response__

```
{
    "records": [
        {
            "recordId": "2d542d820000593e-045f400000000035",
            "timestamp": "1519511589000",
            "sourceId": "5af4be93e787d301dab86453",
            "record": {
                "timestamp": 1519511589000,
                "productListItems": [
                    {
                        "SKU": "PS",
                        "name": "Brooklyn",
                        "quantity": 38,
                        "priceTotal": 25.46
                    }
                ],
                "locationContext": {
                    "localTime": "2018-02-24T17:33:09 EST",
                    "geo": {
                        "city": "Penhold",
                        "latitude": 52.13342,
                        "longitude": -113.8687,
                        "postalCode": "L2E",
                        "stateProvince": "Alberta",
                        "countryCode": "CA"
                    }
                },
                "web": {},
                "id": "b0a52a9b-fea3-44e3-acf2-9422e70426f7",
                "environment": {
                    "colorDepth": 32,
                    "viewportHeight": 267,
                    "viewportWidth": 1585
                },
                "metrics": {
                    "commerce": {
                        "productViews": {
                            "value": 1
                        }
                    },
                    "web": {
                        "pageViews": {
                            "value": 1
                        }
                    }
                },
                "endUserIds": {
                    "_vendor": {
                        "adobe": {
                            "experience": {
                                "ecId": {
                                    "id": "55115069898928455152185628961882945298",
                                    "namespace": {
                                        "id": 0,
                                        "code": "ecId"
                                    }
                                },
                                "analytics": {
                                    "id": {
                                        "id": "2d542d820000593e-045f400000000035",
                                        "namespace": {
                                            "id": 22222,
                                            "code": "AVID"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        ],
        "page": {
            "sortField": "timestamp",
            "sort": "asc",
            "pageOffset": "2d542d820000593e-045f400000000035-5af4be93e787d301dab86453-1519511589000",
            "pageSize": 7
        },
        "link": {
            "next": ""
        }
    }
}
```

---

## Understanding Your Profile Data

XDM schemas provide robust structures for very detailed and fine-tuned data. The data you choose to add to Unified Profile may vary, however, as you may not provide data for every data field in a schema.

Some Unified Profile services require XDM data field names, such as `field` parameters indicating specific data fields to retrieve, or when building segment rules. For cases such as these, you are able to list all fields for a given schema for which data has been supplied during any ingest. In this way, you have a view of the schema fields used by your data, rather than all fields available.

__Service endpoint__

`https://platform.adobe.io/data/core/ups/observedschemanonnull`

__Example request__

```
curl -X GET \
  https://platform.adobe.io/data/core/ups/observedschemanonnull \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -H 'model-name: _xdm.context.profile'
```

__Example response__

```
{
    "nonNullCols": [
        "pf.identities.id",
        "pf.identities.namespace.code",
        "pf.identities.primary",
        "pf.person.name.firstName",
        "pf.person.name.lastName",
        "pf.person.name.courtesyTitle",
        "pf.person.birthYear",
        "pf.homeAddress._schema.latitude",
        "pf.homeAddress._schema.longitude",
        "pf.homeAddress.countryCode",
        "pf.homeAddress.stateProvince",
        "pf.homeAddress.city",
        "pf.homeAddress.postalCode",
        "pf.homeAddress.street1",
        "pf.homeAddress.country",
        "pf.workAddress._schema.latitude",
        "pf.workAddress._schema.longitude",
        "pf.workAddress.countryCode",
        "pf.workAddress.stateProvince",
        "pf.workAddress.city",
        "pf.workAddress.postalCode",
        "pf.workAddress.street1",
        "pf.workAddress.country",
        "pf.personalEmail.address",
        "pf.workEmail.address",
        "pf.homePhone.number",
        "tps._id",
        "tps.timestamp",
        "tps.endUserIDs._experience.mcid.id",
        "tps.endUserIDs._experience.mcid.namespace.code",
        "tps.endUserIDs._experience.aacustomid.id",
        "tps.endUserIDs._experience.aacustomid.namespace.code",
        "tps.endUserIDs._experience.aacustomid.primary",
        "tps.endUserIDs._experience.acid.id",
        "tps.endUserIDs._experience.acid.namespace.code",
        "tps.environment.browserDetails.userAgent",
        "tps.environment.browserDetails.acceptLanguage",
        "tps.environment.browserDetails.cookiesEnabled",
        "tps.environment.browserDetails.javaScriptVersion",
        "tps.environment.browserDetails.javaEnabled",
        "tps.environment.colorDepth",
        "tps.environment.viewportHeight",
        "tps.environment.viewportWidth",
        "tps.placeContext.localTime",
        "tps.placeContext.geo._schema.latitude",
        "tps.placeContext.geo._schema.longitude",
        "tps.placeContext.geo.countryCode",
        "tps.placeContext.geo.stateProvince",
        "tps.placeContext.geo.city",
        "tps.placeContext.geo.postalCode"
    ]
}
```

As in the response above, all fields prefixed with "pf" are Profile (_xdm.context.profile) fields, where those prefixed with "tps" are ExperienceEvent (_xdm.context.experienceevent) fields. Using them in service calls, you would exclude those prefixes, whereby just the field name remains. For instance, using one of these fields in a request to preview all audiences where a home address city (referred to as "pf.homeAddress.city") has been specified, the field `predicateExpression` would be set to "homeAddress.city":

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/preview \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
        "predicateExpression": "homeAddress.city",
        "predicateType": "pql/text",
        "predicateModel": "_xdm.context.profile",
        "graphType": "simple",
        "mergeStrategy": "simple"
    } 
```

## Summarizing Data 

Unified Profile provides summarizations of data for fields containing continuous values such as age, or where values are restricted to a set of possible values such as state or eye color. Use the summary behavior to glean value distribution for values that occur within your profile store a minimum 5%.

![Unified Profile Summary](up-summary.png)

Numeric fields are automatically partitioned according to the clustering of values across your profile store for the field being summarized. The distributions are given for those automatically generated partitions.

If the field to summarize has no values that occur more than 5%, such as fields with high cardinality like email or system ID, a failure response will be returned as these fields do not convey useful information.

The service endpoint to get a summary of the data for an XDM field is as follows:

```
GET https://platform.adobe.io/data/core/ups/preview/data/summary/{SCHEMA-FIELD}
```

Where `SCHEMA-FIELD` names the XDM schema field to summarize. For instance, "pf.homeAddress._schema.longitude".

### Longitude Example

Get summary data to understand the demographics of your consumer base by longitude.

__Example request for summary of longitude values__

```
GET https://platform.adobe.io/data/core/ups/preview/data/summary/pf.homeAddress._schema.longitude
```

__Example response__

```
{
	"quantiles": {
		"pct40": -98.76600142249998,
		"pct50": -94.0084823,
		"pct100": -52.6912126,
		"pct10": -118.118266245,
		"pct80": -78.37563784266666,
		"pct0": -157.86,
		"pct70": -82.47644212,
		"pct60": -87.99093141600001,
		"pct30": -99.581649195,
		"pct20": -106.34355807714286,
		"pct90": -73.75254579999998
	},
	"summaries": [{
		"percentage": 0.09627375471568593,
		"exclusiveUpperBound": -106.34355807714286,
		"cardinality": 965.9216479850512,
		"inclusiveLowerBound": -118.118266245,
		"hll": "NOT-SUPPORTED-CURRENTLY",
		"value": "-118.118266245:-106.34355807714286"
	}, {
		"percentage": 0.10656123243076433,
		"exclusiveUpperBound": -99.581649195,
		"cardinality": 1069.1366670471361,
		"inclusiveLowerBound": -106.34355807714286,
		"hll": "NOT-SUPPORTED-CURRENTLY",
		"value": "-106.34355807714286:-99.581649195"
	}, {
		"percentage": 0.10114427374702012,
		"exclusiveUpperBound": -78.37563784266666,
		"cardinality": 1014.7879229442261,
		"inclusiveLowerBound": -82.47644212,
		"hll": "NOT-SUPPORTED-CURRENTLY",
		"value": "-82.47644212:-78.37563784266666"
	}, {
		"percentage": 0.1034787975412938,
		"exclusiveUpperBound": -73.75254579999998,
		"cardinality": 1038.2103715366227,
		"inclusiveLowerBound": -78.37563784266666,
		"hll": "NOT-SUPPORTED-CURRENTLY",
		"value": "-78.37563784266666:-73.75254579999998"
	}, {
		"percentage": 0.09902487161178347,
		"exclusiveUpperBound": -98.76600142249998,
		"cardinality": 993.5238057478365,
		"inclusiveLowerBound": -99.581649195,
		"hll": "NOT-SUPPORTED-CURRENTLY",
		"value": "-99.581649195:-98.76600142249998"
	}, {
		"percentage": 0.08931089503860541,
		"exclusiveUpperBound": -87.99093141600001,
		"cardinality": 896.0627657399768,
		"inclusiveLowerBound": -94.0084823,
		"hll": "NOT-SUPPORTED-CURRENTLY",
		"value": "-94.0084823:-87.99093141600001"
	}, {
		"percentage": 0.10901006611982293,
		"exclusiveUpperBound": -94.0084823,
		"cardinality": 1093.7059952047655,
		"inclusiveLowerBound": -98.76600142249998,
		"hll": "NOT-SUPPORTED-CURRENTLY",
		"value": "-98.76600142249998:-94.0084823"
	}, {
		"percentage": 0.10358499159862096,
		"exclusiveUpperBound": -118.118266245,
		"cardinality": 1039.275824308903,
		"inclusiveLowerBound": -157.86,
		"hll": "NOT-SUPPORTED-CURRENTLY",
		"value": "-157.86:-118.118266245"
	}, {
		"percentage": 0.10040217006872898,
		"exclusiveUpperBound": -82.47644212,
		"cardinality": 1007.3423422662145,
		"inclusiveLowerBound": -87.99093141600001,
		"hll": "NOT-SUPPORTED-CURRENTLY",
		"value": "-87.99093141600001:-82.47644212"
	}, {
		"percentage": 0.08741707457716474,
		"exclusiveUpperBound": -52.6912126,
		"cardinality": 877.0619260354822,
		"inclusiveLowerBound": -73.75254579999998,
		"hll": "NOT-SUPPORTED-CURRENTLY",
		"value": "-73.75254579999998:-52.6912126"
	}],
	"id": "1BD6382559DF0C130A49422D@AdobeOrg-pf.homeAddress._schema.longitude",
	"summaryType": "NUMBER",
	"fieldName": "pf.homeAddress._schema.longitude"
}
```

In the response above, you can glean that your user base is within the boundaries of -157.86 and -52.6912126, and the number of estimated consumers per logical grouping. The groups your values are split into is determined by the summary services and returned in the response JSON in the `quantiles` property.

### Country Code Example

Get summary data to understand the demographics of your consumer base by country code.

__Example request for summary of country code values__

```
GET https://platform.adobe.io/data/core/ups/preview/data/summary/pf.homeAddress.countryCode
```

__Example response__

```
{
  "quantiles": {
    "pct40": 0.0,
    "pct50": 0.0,
    "pct100": 0.0,
    "pct10": 0.0,
    "pct80": 0.0,
    "pct0": 0.0,
    "pct70": 0.0,
    "pct60": 0.0,
    "pct30": 0.0,
    "pct20": 0.0,
    "pct90": 0.0
  },
  "summaries": [{
    "percentage": 0.2637181166795846,
    "exclusiveUpperBound": 0.0,
    "cardinality": 2646.717948309003,
    "inclusiveLowerBound": 0.0,
    "hll": "NOT-SUPPORTED-CURRENTLY",
    "value": "CA"
  }, {
    "percentage": 0.48713712210991167,
    "exclusiveUpperBound": 0.0,
    "cardinality": 4888.987456035888,
    "inclusiveLowerBound": 0.0,
    "hll": "NOT-SUPPORTED-CURRENTLY",
    "value": "US"
  }, {
    "percentage": 0.24914476121050375,
    "exclusiveUpperBound": 0.0,
    "cardinality": 2500.4573804998995,
    "inclusiveLowerBound": 0.0,
    "hll": "NOT-SUPPORTED-CURRENTLY",
    "value": "MX"
  }],
  "id": "1BD6382559DF0C130A49422D@AdobeOrg-pf.homeAddress.countryCode",
  "summaryType": "STRING",
  "fieldName": "pf.homeAddress.countryCode"
}
```

In the response above, notice the lack of discernable values in `quantiles`. This is due to the values being non-numeric. 

---

## Segmenting Your Base - Creating and Working with Audiences

The cornerstone of your marketing campaign is your audience. UPS provides the tools for segmenting your user base into audiences consisting of members meeting criteria with exactly the precision you require. With segmentation, you can isolate members of your user base by criteria such as:

* Users for whom one week has passed since last making a purchase
* Users for whom the sum of the purchases is greater than $10,000
* Users who have seen a campaign and then clicked on it within 30 minutes, for any 3 of a list of campaigns specified by their Campaign ID

UPS behaves on/with the following components:

* __Segments__ are classified subsets of your user base, such as "Men over 50"
* __Definitions__ are the rules, in terms of the conditions that an XDM object must meet to qualify for a Segment
* __Segmentation Jobs__ are asynchronous processes which isolate members of your user base per the rules described by a Definition
* An __Audience__ is the collection of XDM objects which met the qualifications, or conditions, as set out by the Segment Definition

Segmentation is supported for XDM Profile and ExperienceEvent schemas, with plans to expand to include additional schemas in the future. Segmentation is handled in the steps described by the remainder of this section.

In summary, the following tasks are involved in segmentation and are detailed in this section:

* __Develop a Definition__ - Determine and design the criteria that objects must meet to qualify for your Segment, and write the query representation of those rules
* __Estimate and Preview Your audience__ - As an optional step in the iterations of writing and testing your Definition, process your Definition in a summary mode, gleaning information summarizing your audience as well as the progress of the asynchronous Preview Job
* __Segment Your Audience__ - Create a reusable Definition and use Segmentation Jobs to keep that audience current and relevant
* __Get Results__ - Using the Export API, persist audience members to a Profile dataset

### Develop a Segment Definition

A Segment Definition encapsulates the complete set of criteria that define a specific audience, written as a query in Adobe's proprietary Profile Query Language (PQL) specifically designed for building queries on XDM data. The following summarizes PQL, though more in-depth detail can be found [here](unified_profile_pql.md). In the context of this section, to develop the Segment Definition is to compose the PQL query describing the desired audience.

Segment Definitions are built using the Profile Segment Definition API. The following examples serve as only a summary. Visit the [Swagger API Reference](../../../../../../acpdr/swagger-specs/profile-segment-definitions-api.yaml) for complete coverage of the Segment Definitions API.

#### Persist the Definition

Definitions are persisted to Experience Platform as a predicate expression in PQL to be referenced by ID. This is helpful in creating a centrally-managed collection of queries to be reused, and simplifying API calls. The request body consists of the following properties:

* `name` (__required__) - Specify a name by which to refer to the Segment. Choose a name that is descriptive and unique per Segment
* `schema` (__required__) - Entity which consists of either an `id` or `name` field, naming the schema of the entities in the Segment
* `expression` (__required__) - Entity which consists of the following fields:
  * `type` - Specifies the expression type. Currently only "PQL" is supported
  * `format` - Either "pql/text" or "pql/json" <!-- TODO: more info? -->
  * `value` - Expression of above type to select records from xdmSchema
  * `meta` - This can contain more info about the expression and related meta data
* `mergePolicyId` - Specify the merge policy to use for the exported data <!-- TODO: mergePolicy or mergePolicyId? -->
* `description` - Human readable description of the definition <!-- TODO: SEEMS TO BE GONE? How long should the value max -->

__Example Unified Profile request - Create a new Definition__

```
POST https://platform.adobe.io/data/core/ups/segment/definitions
```

__Example body__

```
{
    "name": "My Sample Cart Abandons Segment Definition",
    "schema": {
        "name": "MyProfile",
    },
    "type": "PQL",
    "format": "pql/text",
    "mergePolicyId": "mpid1",
    "description": "This Segment represents those users who have abandoned a cart",
    "expression": "xEvent.metrics.commerce.abandons.value > 0"
}
```

__Example response__

```
{
    "id": "1234",
    "name": "My Sample Cart Abandons Segment Definition",
    "description": "This Segment represents those users who have abandoned a cart",
    "type": "PQL",
    "format": "pql/text",
    "expression": "xEvent.metrics.commerce.abandons.value > 0",
    "_links": {
        "self": {
            "href": "https://platform.adobe.io/data/core/ups/segment/definitions/1234"
        }
    }
}
```

#### Supported Query Types

You can find a list of supported PQL query examples [here](unified_profile_supported_queries.md), and more detailed information covering the Profile Query Language [here](unified_profile_pql.md).

### Estimate and Preview Your Audience

The Profile Preview API allows for a direct path between a segment definition PQL query and a summary of the qualifying/relevant audience. The following are overview level examples demonstrating estimating and previewing audiences. Visit the [Swagger API Reference](../../../../../../acpdr/swagger-specs/profile-preview-api.yaml) for complete coverage of the Profile Preview API.

Unified Profile uses data samples to evaluate segments and estimate the number of qualifying profiles. New data is loaded into memory each morning (between 12AM-2AM PT, which is 7-9AM UTC), and all segmentation queries are estimated using that day's sample data. Consequently, any new fields added or additional data collected will be reflected in estimates the following day.

The sample size depends on the overall number of entities in your profile store and breaks down into the following categories:

* __Up to 1 million profiles__: use full data set
* __1 to 20 million profiles__: use a sample set of 1 million profiles
* __Over 20 million profiles__: use a 5% sample size

Estimates generally run over 10-15 seconds, beginning with a rough estimate and refining as more records are read.

#### Estimate and Preview audience - Step 1: Create a Preview Job

Run a query as a Preview Job using the `POST https://platform.adobe.io/data/core/ups/preview` API call. The response from this call includes a `previewId` which will be used to `GET` estimate or preview results. In the body of this `POST` will be the query information. For example, the PQL expression, predicate type, predicate XDM model, graph type, and merge strategy. 

Because of the varying length of time required to run a query, the estimate and preview processes are asynchronous. Once the query execution has initiated, you would need to `GET` the preview or estimate and determine its state as it progresses. The `state` of the preview will be "RUNNING" until processing is complete, at which point it becomes "RESULT_READY" or "FAILED".

__Example request to create a Preview Job__

```
POST https://platform.adobe.io/data/core/ups/preview
```

__Example body__

```
{
    "predicateExpression": "person.birthDay",
    "predicateType": "pql/text",
    "predicateModel": "_xdm.context.profile",
    "graphType": "simple",
    "mergeStrategy": "simple"
}
```

__Example response__

```
{
   "state": "RUNNING",
   "previewQueryId": "4a45e853-ac91-4bb7-a426-150937b6af5c",
   "previewQueryStatus": "RUNNING",
   "previewId": "MDoyOjRhNDVlODUzLWFjOTEtNGJiNy1hNDI2LTE1MDkzN2I2YWY1Yzo0Mg==",
   "previewExecutionId": 42
}
```

A Preview Job can be used to access estimate or preview information summarizing the audience yielded by the query run.

#### Estimate and Preview audience - Step 2: Retrieve Estimate or Preview

Using the `previewId` returned from Step 1, periodically get the estimate or preview using one of the following services until the `state` in the response reaches "RESULT_READY".

##### Estimate

```
GET https://platform.adobe.io/data/core/ups/estimate/{previewId}
```

__Example response__

```
{
    "estimatedSize": 45,
    "state": "RESULT_READY",
    "profilesReadSoFar": 83834,
    "standardError": 0,
    "error": {
        "description": "",
        "traceback": ""
    },
    "profilesMatchedSoFar": 46,
    "totalRows": 82473,
    "confidenceInterval": "95%",
    "_links": {
        "preview": "https://platform.adobe.io/data/core/ups/preview?previewQueryId=f88bc056-ee48-40d5-9ddb-8865d7d6a0e0"
    }
}
```

##### Preview

```
GET https://platform.adobe.io/data/core/ups/preview/{previewId}
```

__Example response__

```
{
   "results": [{
         "XID_ADOBE-MARKETING-CLOUD-ID-1": {
            "_href": "https://platform.adobe.io/data/core/ups/models/profile/XID_ADOBE-MARKETING-CLOUD-ID-1",
            "endCustomerIds": {
               "XID_COOKIE_ID_1": {
                  "_href": "https://platform.adobe.io/data/core/ups/models/profile/XID_COOKIE_ID_1"
               },
               "XID_PROFILE_ID_1": {
                  "_href": "https://platform.adobe.io/data/core/ups/models/profile/XID_PROFILE_ID_1"
               }
            }
         }
      },
      {
         "XID_COOKIE-ID-2": {
            "_href": "https://platform.adobe.io/data/core/ups/models/profile/XID_COOKIE-ID-2",
            "endCustomerIds": {
               "XID_COOKIE_ID_2-1": {
                  "_href": "https://platform.adobe.io/data/core/ups/models/profile/XID_COOKIE_ID_2-1"

               },
               "XID_PROFILE_ID_2": {
                  "_href": "https://platform.adobe.io/data/core/ups/models/profile/XID_PROFILE_ID_2"
               }
            }
         },
         ...
         "XID_ADOBE-MARKETING-CLOUD-ID-1000": {
            "_href": "https://platform.adobe.io/data/core/ups/models/profile/XID_ADOBE-MARKETING-CLOUD-ID-1000"
         },
         "state": "RESULT_READY",
         "links": {
            "_self": "https://platform.adobe.io/data/core/ups/preview?expression=<expr-1>&limit=1000",
            "next": "",
            "prev": ""
         }
      }
   ],
   "page": {
      "offset": 0,
      "size": 5
   }
}
```

#### Estimate and Preview audience - Step 3: Delete Preview Job

You can delete a Preview Job by using the following API:

```
DELETE https://platform.adobe.io/data/core/ups/preview/{previewId}
```

__Example response__

```
{
    "status": true,
    "message": "KILLED"
}
```

### Create a Segment Job

A Segment Job is an asynchronous process which isolates members of your user base per one or more Definitions. The [Export API](#export-api) is used to access these audiences by the `segmentId` which is provided as the `id` attribute of the response upon creating the Segment Definition; "1234" in the example below.

This section contains examples demonstrating use of the Segment Job API. For complete coverage of the Segment Job API, please visit the [Swagger API Reference](../../../../../../acpdr/swagger-specs/profile-segment-jobs-api.yaml).

__Example request to create a Segment Job__

```
POST https://platform.adobe.io/data/core/ups/segment/jobs
```

__Example body__

```
[
    {
        "segmentId" : "1234"
    }
]
```

__Example response__

```
{
    "profileInstanceId": "ups",
    "computeJobId": 1,
    "id": "b0f99dde-6d3b-4d92-aa92-28072ded71a0",
    "status": "PROCESSING",
    "segments": [
        {
            "segmentId": "42f49f2d-edb0-474f-b29d-2799d89cd5a6",
            "segment": {
                "id": "42f49f2d-edb0-474f-b29d-2799d89cd5a6",
                "version": 1,
                "expression": {
                    "type": "PQL",
                    "format": "pql/text",
                    "value": "homeAddress.country = \"US\""
                },
                "mergePolicy": {
                    "id": "mpid1",
                    "version": 1
                }
            },
            "snapshot": {
                "name": "Canadian1",
                "ttlInDays": 1
            }
        }
    ],
    "updateTime": 1533581808162,
    "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
    "creationTime": 1533581808162,
    "_links": {
        "cancel": {
            "href": "/segment/jobs/b0f99dde-6d3b-4d92-aa92-28072ded71a0",
            "method": "DELETE"
        },
        "checkStatus": {
            "href": "/segment/jobs/b0f99dde-6d3b-4d92-aa92-28072ded71a0",
            "method": "GET"
        }
    }
}
```

Segment Jobs run asynchronously, and a job's `status` can be checked by retrieving a Segment Job by ID (returned from creating the Segment Job), which will return its status.

```
GET https://platform.adobe.io/data/core/ups/segment/jobs/3456
```

__Example response__

```
{
    "status": true,
    "segmentJob": {
        "id": 3456,
        "type": "string",
        "imsOrgId": "string",
        "status": "string",
        "progress": "string",
        "definitionIds": "string",
        "definitions": "string",
        "model": "Profile",
        "computeJobId": 0,
        "dataStart": "string",
        "dataEnd": "string",
        "dataGraphType": "string",
        "snapshot" {
            "name" : "Profiles_Segmented"
        },
        "mergeStrategy": "string",
        "creationTime": "2018-03-20T08:24:07.200Z",
        "updateTime": "2018-03-20T08:24:07.200Z"
    }
}
```

Repeat the call to retrieve your Segment Job until the `status` reaches "SUCCEEDED", indicating the Export Job is ready to be run.
<a name="export-api"></a>

### 5.4 Export Your Audience

The Profile Export API is used to isolate an audience built by a Segment Job for access. Once a Segment Job has completed running (its `status` attribute has reached "SUCCEEDED"), the Profile Export API can be used to generate XDM Profiles for each member of that audience in your chosen dataset. In summary, the following steps are required to export your audience:

* __Identify your dataSet__ - A dataset should be created to hold audience members
* __Generate audience Profiles in dataset__ - Export jobs populate the results of a Segment Job as XDM Profiles in a dataset
* __Wait for audience Profiles to complete persisting__ - Export Jobs are asynchronous. Get an Export Job until its status indicates completion (its `status` attribute has reached "SUCCEEDED", or "FAILED")
* __Read Audience Data__ - Using the Data Access SDK, retrieve the resulting XDM Profiles representing the members of your audience

The following contains examples demonstrating use of the Profile Export API. Please visit the [Swagger API Reference](../../../../../../acpdr/swagger-specs/profile-export-api.yaml) for complete coverage of the Profile Export API.

#### Export Audience - Step 1: Create or Select Audience DataSet

A dataset used to store audiences can be reused, but must exist prior to running the export, and must have been created with the following properties (either via the API or UI), where `schema` must be a standard XDM Profile or an extension of a standard XDM Profile. The following is an example:

```
POST https://platform.adobe.io/data/foundation/catalog/dataSets
```

__Example body__

```
{
  "fileDescription" : {
    "persisted": true,
    "containerFormat": "parquet",
    "format": "parquet"
  },
  "schema" : "@/xdms/context/profile"
}
```

__Example response__

```
[
    "@/dataSets/MyIsolatedProfilesDS_Id"
]
```

> You will use this dataset ID ("MyIsolatedProfilesDS_Id" in the above example) in other API calls

#### Export Audience - Step 2: Generate XDM Profiles for Audience Members

Trigger an Export Job to persist the audience members to the dataset from above by providing the `datasetId` from establishing the audience dataset in Step 1. An Export Job is an asynchronous process triggered using a `POST` to `https://platform.adobe.io/data/core/ups/export/jobs` with a request body which defines:

* `destination` (__required__) - Indicates the dataset into which to persist the members meeting the conditions of the related definition ("MyIsolatedProfilesDS_Id" from the example above)
* `model` (__required__) - Names the XDM schema name of the members. A schema will only be relative to the IMS Org ID specified in API calls, preventing members from other Orgs' data from being accessible
* `filter` (__required__) - When creating the Segment Job, you specified a `snapshot.name` value, naming the audience. This value, or `segment-id` are permissible values for this property
* `schema` - Names the schema of the exported dataset
* `mergePolicyId` - Specify the merge policy to use for the exported data
* `fields` - You can choose to limit the size of each audience member by using the `fields` property to limit the data populated within the members in the dataset.
For example, a value of `name,workAddress.city` would result in Profile records which contain only the values of each member's `name` and `workAddress.city`.

The result of successfully running an export job is a dataset populated with only those Profiles which qualified for the last completed run of the Segment Job. Any members who existed in that dataset, but did not qualify for the Segment at the time of the last completed run of the Segment Job, will be removed from the dataset.

__Example Unified Profile request - Run an Export Job__

```
POST https://platform.adobe.io/data/core/ups/export/jobs
```

__Example body__

```
{
    "fields" : [],
    "mergePolicyId" : 123,
    "filter" : {
        "segments" : [{"id":"segment-name:snapshot-name"}]
    },
    "destination" : {
        "dataSetId" : ""
    },
    "schema" : {
        "name":"_xdm.context.profile"
    }
}
```

__Example response__

```
{
    "id": 111,
    "jobType": "BATCH",
    "destination" : {
        "dataSetId" : "5aa6885ecf70a301dabdfa49"
        "batchId": "5b565efc0a488f01e2c19972",
      },
    "fields": "",
    "schema" : {
        "name":"_xdm.context.profile"
    },
    "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
    "status": "PROCESSING",
    "filter" : {
        "segments" : [{"id":"segment-name:snapshot-name"}]
     }
    "mergePolicyId" : 123,
    "updateTime": "2018-07-25 15:17:30",
    "creationTime": "2018-07-25 15:17:30"
}

```

#### Export Audience - Step 3: Wait for Export to Complete

Iteratively retrieve the Export Job by ID until the `status` reaches "SUCCEEDED".

#### Export Audience - Step 4: Read Profiles from Audience Dataset

Once export is complete, use the Data Access API to access the data using the `batchId` returned from the Export service call, "5b565efc0a488f01e2c19972" in the example above. Note that a segment may be chunked, and a batch could consist of several files. You must first list the files belonging to the batch, and download each Parquet file by file ID. 

For more information on using the Data Access API, [see the tutorial](../data_access_tutorial/data_access_tutorial.md).

