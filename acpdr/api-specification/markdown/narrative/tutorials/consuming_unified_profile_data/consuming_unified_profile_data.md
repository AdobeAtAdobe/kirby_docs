# Accessing Unified Profile data via API

## Overview

This tutorial covers methods of accessing your Unified Profile data on Experience Platform. In specific, it covers the following:

[Understanding your Unified Profile data](#understanding-your-unified-profile-data) - In this section, we demonstrate how to gain visibility into the data fields that are populated across the profiles in your profile store.  
[Summarizing your data](#summarizing-data) - This section walks you through using the API to inspect the distribution of values populated in your profile store for a particular field.  
[Accessing profile data by identity](#accessing-profile-data-by-identity) - Access a single entity by a given identity.  
[Accessing profile data by list of identities](#accessing-profile-data-by-list-of-identities) - Access multiple entities by an array of identities.  
[Accessing time series events for a profile by identity](#accessing-time-series-events-for-a-profile-by-identity) - ExperienceEvents represent customer time series events, or touch points, and are only accessible relative to the entity to which they are related. Access time series events for a given profile.  
[Accessing time series events for multiple profiles by identities](#accessing-time-series-events-for-multiple-profiles-by-identities) - Access time series events for a collection of profile identities.  
[Accessing an exported segment](#accessing-an-exported-segment) - The final step in segmentation is to export the segment to a dataset. Access segment data using the Data Access API.  

### Prerequisite topics

[Unified Profile](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md) is a generic lookup entity store, and is used to manage any XDM Platform data. Unified Profile facilitates building customer personalization use cases by merging data across various enterprise data assets and providing access to that unified data. Unified Profile provides tools for looking up entities by identity, as well as robust segmentation tools.  
[Authenticating and Accessing Adobe Experience Platform APIs](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) - This tutorial shows the initial steps to set up an integration in Adobe I/O Console and use an integration to access Platform APIs. The steps in this tutorial describe how to create an integration and gain access to the following values needed for required headers:
* IMS Organization ID
* API Key (Client ID)
* Access Token 

### Related topics

[Experience Data Model (XDM)](../../technical_overview/schema_registry/schema_composition/schema_composition.md) provides the framework to refer to and manage the schemas that your data must conform to for use as entities on Platform.

### Requirements

All APIs in this document require the following headers. Some require additional headers which will be listed in context.

|Header|Description|Example Value|
|---|---|---|
|`Authorization`|The Access Token as described in [Prerequisite Topics](#prerequisite-topics), prefixed with "Bearer "|Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....|
|`x-gw-ims-org-id`|The IMS Organization ID as described in [Prerequisite Topics](#prerequisite-topics)|17FA2AFD56CF35747F000101@AdobeOrg|
|`x-api-key`|The API Key (Client ID) as described in [Prerequisite Topics](#prerequisite-topics)|25622d14d3894ea590628717f2cb7462|

---

## Understanding your Unified Profile data

XDM tools allow you to build schemas that are very robust structures for very detailed and fine-tuned data. The data you choose to add to Unified Profile may vary, however, as you may not provide data for every data field in a schema.

Some Unified Profile services require XDM data field names, such as `field` parameters indicating specific data fields to retrieve, or when building segment rules. For cases such as these, you are able to list all fields for a given schema for which data has been supplied during any ingest. In this way, you have a view of the schema fields used by your data, rather than all fields available.

#### Service endpoint

```
GET https://platform.adobe.io/data/core/ups/observedschemanonnull
```

#### Example request

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

#### Example response

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
    }'
```

## Summarizing data

Unified Profile provides summarizations of data for fields containing continuous values such as age, or where values are restricted to a set of possible values such as state or eye color. Use the summary behavior to glean value distribution for values that occur within your profile store a minimum 5%.

![Unified Profile Summary](up-summary.png)

Numeric fields are automatically partitioned according to the clustering of values across your profile store for the field being summarized. The distributions are given for those automatically generated partitions.

If the field to summarize has no values that occur more than 5%, such as fields with high cardinality like email or system ID, a failure response will be returned as these fields do not convey useful information.

The service endpoint to get a summary of the data for an XDM field is as follows:

```
GET https://platform.adobe.io/data/core/ups/preview/data/summary/{SCHEMA-FIELD}
```

Where `SCHEMA-FIELD` names the XDM schema field to summarize. For instance, "pf.homeAddress._schema.longitude".

### Longitude example

Get summary data to understand the demographics of your consumer base by longitude.

#### Example request for summary of longitude values

```
GET https://platform.adobe.io/data/core/ups/preview/data/summary/pf.homeAddress._schema.longitude
```

#### Example response

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

### Country code example

Get summary data to understand the demographics of your consumer base by country code.

#### Example request for summary of country code values

```
GET https://platform.adobe.io/data/core/ups/preview/data/summary/pf.homeAddress.countryCode
```

#### Example response

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

## Accessing Profile data by identity

Access an entity by an identity, which would consist of the ID value and the identity namespace.

> **Note:** If a related graph links more than 50 identities, this service will return an HTTP status code of 422 and a message "UPS-ACCSDK-1000005:Too many related identities. Got: 446, max: 50".

#### Service endpoint

```
GET https://platform.adobe.io/data/core/ups/access
```

#### Request parameters

|Parameter|Description|Example|
|---|---|---|
|`schema.name`|The XDM schema of the entity to retrieve|_xdm.context.profile|
|`relatedSchema.name`|If `schema.name` is "_xdm.context.experienceevent", this value names the schema of the entity related to the ExperienceEvents.|_xdm.context.profile|
|`entityId`|The value of this can be set one of two ways; using a fully qualified identity consisting of ID value and namespace, or providing an XID.|5558525235|
|`entityIdNS`|This field specifies the identity namespace when `entityId` is not provided as an XID.|phone|
|`relatedEntityId`|If `schema.name` is "ExperienceEvent", this value specifies the namespace of the identity of the related entity. This value follows the same rules as `entityId`.|69935279872410346619186588147492736556|
|`relatedEntityIdNS`|If `schema.name` is "ExperienceEvent", this value specifies the namespace of the value provided by `relatedEntityId` identity of the entity related to the ExperienceEvents.|CRMID|
|`fields`|This value allows you to isolate the data returned to what you need. Use this field to specify which schema field values to include in data retrieved.|personalEmail,person.name,person.gender|
|`mergePolicyId`|Identifies the Merge Policy by which to govern the data returned. If one is not specified in the service call, your organization's default for that schema will be used. If not default Merge Policy has been configured, the default is no profile merge and no identity stitching.|5aa6885fcf70a301dabdfa4a|
|`startTime`|Specify the start time to filter time-series objects, at millisecond granularity.|1539838505|
|`endTime`|Specify the end time to filter time-series objects, at millisecond granularity.|1539838510|
|`limit`|Numeric value specifying the maximum number of objects to return. <br>__Default: 1000__|100|

#### Example request

This example will get a consumer's email and name using an identity:

```
curl -X GET \
  'https://platform.adobe.io/data/core/ups/access/entities?schema.name=_xdm.context.profile&entityId=janedoe@example.com&entityIdNS=email&fields=identities,person.name,workEmail' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
```

#### Example response

```
{
    "BVrqzwVv7o2p3naHvnsWpqZXv3KJgA": {
        "entityId": "BVrqzwVv7o2p3naHvnsWpqZXv3KJgA",
        "sources": [
            "1000000000"
        ],
        "entity": {
            "identities": [
                {
                    "id": "89149270342662559642753730269986316601",
                    "namespace": {
                        "code": "ecid"
                    }
                },
                {
                    "id": "janedoe@example.com",
                    "namespace": {
                        "code": "email"
                    }
                },
                {
                    "id": "janesmith@example.com",
                    "namespace": {
                        "code": "email"
                    }
                },
                {
                    "id": "89149270342662559642753730269986316604",
                    "namespace": {
                        "code": "ecid"
                    }
                },
                {
                    "id": "58832431024964181144308914570411162539",
                    "namespace": {
                        "code": "ecid"
                    }
                },
                {
                    "id": "89149270342662559642753730269986316602",
                    "namespace": {
                        "code": "ecid"
                    },
                    "primary": true
                }
            ],
            "person": {
                "name": {
                    "firstName": "Jane",
                    "middleName": "F",
                    "lastName": "Doe"
                }
            },
            "workEmail": {
                "primary": true,
                "address": "janedoe@example.com",
                "label": "Jane Doe",
                "type": "work",
                "status": "active"
            }
        },
        "lastModifiedAt": "2018-08-28T20:57:24Z"
    }
}
```

---

## Accessing profile data by list of identities

Access a number of entities by their identities, where an identity consists of the ID value and the identity namespace.


> **Note:** If a related graph links more than 50 identities, this service will return an HTTP status code of 422 and a message "UPS-ACCSDK-1000005:Too many related identities. Got: 446, max: 50".

#### Service endpoint

```
POST https://platform.adobe.io/data/core/ups/access/entities
```

#### Example request

This example demonstrates getting an email and name for several consumers by list of identities:

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/access/entities \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  -d '{
    "schema":{
        "name":"_xdm.context.profile"
    },
    "fields":["identities","person.name","workEmail"],
    "identities":[
        {
            "entityId":"89149270342662559642753730269986316601",
            "entityIdNS":{
                "code":"ECID"
            }
        },
        {
            "entityId":"89149270342662559642753730269986316900",
            "entityIdNS":{
                "code":"ECID"
            }
        },
        {
            "entityId":"89149270342662559642753730269986316602",
            "entityIdNS":{
                "code":"ECID"
            }
        }
    ]
}'
```

#### Example response

```
{
    "A29cgveD5y64ezlhxjUXNzcm": {
        "entityId": "A29cgveD5y64ezlhxjUXNzcm",
        "sources": [
            "1000000000"
        ],
        "entity": {
            "identities": [
                {
                    "id": "89149270342662559642753730269986316601",
                    "namespace": {
                        "code": "ecid"
                    }
                },
                {
                    "id": "janedoe@example.com",
                    "namespace": {
                        "code": "email"
                    }
                },
                {
                    "id": "05DD23564EC4607F0A490D44",
                    "namespace": {
                        "code": "ecid"
                    }
                },
                {
                    "id": "89149270342662559642753730269986316603",
                    "namespace": {
                        "code": "ecid"
                    }
                },
                {
                    "id": "janesmith@example.com",
                    "namespace": {
                        "code": "email"
                    }
                },
                {
                    "id": "89149270342662559642753730269986316604",
                    "namespace": {
                        "code": "ecid"
                    }
                },
                {
                    "id": "89149270342662559642753730269986316700",
                    "namespace": {
                        "code": "ecid"
                    }
                },
                {
                    "id": "89149270342662559642753730269986316701",
                    "namespace": {
                        "code": "ecid"
                    }
                },
                {
                    "id": "58832431024964181144308914570411162539",
                    "namespace": {
                        "code": "ecid"
                    }
                },
                {
                    "id": "89149270342662559642753730269986316602",
                    "namespace": {
                        "code": "ecid"
                    },
                    "primary": true
                }
            ],
            "person": {
                "name": {
                    "firstName": "Jane",
                    "middleName": "F",
                    "lastName": "Doe"
                }
            },
            "workEmail": {
                "primary": true,
                "address": "janedoe@example.com",
                "label": "Jane Doe",
                "type": "work",
                "status": "active"
            }
        },
        "lastModifiedAt": "2018-08-28T20:57:24Z"
    },
    "A29cgveD5y64e2RixjUXNzcm": {
        "entityId": "A29cgveD5y64e2RixjUXNzcm",
        "sources": [
            ""
        ],
        "entity": {},
        "lastModifiedAt": "1970-01-01T00:00:00Z"
    },
    "A29cgveD5y64ezphxjUXNzcm": {
        "entityId": "A29cgveD5y64ezphxjUXNzcm",
        "sources": [
            "1000000000"
        ],
        "entity": {
            "identities": [
                {
                    "id": "89149270342662559642753730269986316602",
                    "namespace": {
                        "code": "ecid"
                    },
                    "primary": true
                },
                {
                    "id": "janedoe@example.com",
                    "namespace": {
                        "code": "email"
                    }
                }
            ],
            "person": {
                "name": {
                    "firstName": "Jane",
                    "middleName": "F",
                    "lastName": "Doe"
                }
            },
            "workEmail": {
                "primary": true,
                "address": "janedoe@example.com",
                "label": "Jane Doe",
                "type": "work",
                "status": "active"
            }
        },
        "lastModifiedAt": "2018-08-27T23:25:52Z"
    }
}
```

---

## Accessing time series events for a profile by identity

Look up ExperienceEvents by the identity of the associated profile.

> **Note:** If a related graph links more than 50 identities, this service will return an HTTP status code of 422 and a message "UPS-ACCSDK-1000005:Too many related identities. Got: 446, max: 50".

#### Service endpoint

```
GET https://platform.adobe.io/data/core/ups/access/entities
```

#### Request parameters

|Parameter|Description|Example|
|---|---|---|
|`schema.name`|The XDM schema of the entity to retrieve|_xdm.context.profile|
|`relatedSchema.name`|If `schema.name` is "ExperienceEvent", this value names the schema of the entity related to the ExperienceEvents.|_xdm.context.profile|
|`entityId`|The value of this can be set one of two ways; using a fully qualified identifier consisting of ID value and namespace, or providing an XID.|5558525235|
|`entityIdNS`|This field specifies the identity namespace when `entityId` is not provided as an XID.|phone|
|`relatedEntityId`|If `schema.name` is "ExperienceEvent", this value specifies the namespace of the identity of the related entity. This value follows the same rules as `entityId`.|69935279872410346619186588147492736556|
|`relatedEntityIdNS`|If `schema.name` is "ExperienceEvent", this value specifies the namespace of the value provided by `relatedEntityId` identity of the entity related to the ExperienceEvents.|CRMID|
|`fields`|This value allows you to isolate the data returned to what you need. Use this field to specify which schema field values to include in data retrieved.|personalEmail,person.name,person.gender|
|`mergePolicyId`|Identifies the merge policy by which to govern the data returned. If one is not specified in the service call, your organization's default for that schema will be used. If not default merge policy has been configured, the default is no profile merge and no identity stitching.|5aa6885fcf70a301dabdfa4a|
|`orderBy`|Specify the field by which to order results as in `orderBy=timestamp` or `orderBy=+timestamp` to sort by name in ascending order (the default), or `orderBy=-timestamp`, to sort in descending order. To omit this value would result in the default sorting of `timestamp` in ascending order.|
|`timeFilter.startTime`|Specify the start time to filter time-series objects, at millisecond granularity.|1539838505|
|`timeFilter.endTime`|Specify the end time to filter time-series objects, at millisecond granularity.|1539838510|
|`limit`|Numeric value specifying the maximum number of objects to return. <br>__Default: 1000__|100|

__Example request - Get ExperienceEvents by profile identity__

The following example retrieves the end user identities, web and channel for all ExperienceEvents for a given profile by identity between a date/time range. Results are paginated. 

```
curl -X GET \
  'https://platform.adobe.io/data/core/ups/access/entities?schema.name=_xdm.context.experienceevent&relatedSchema.name=_xdm.context.profile&relatedEntityId=89149270342662559642753730269986316900&relatedEntityIdNS=ECID&fields=endUserIDs,web,channel&startTime=1531260476000&endTime=1531260480000&limit=1' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
```

#### Example Response

```
{
    "_page": {
        "orderby": "timestamp",
        "start": "c8d11988-6b56-4571-a123-b6ce74236036",
        "count": 1,
        "next": "c8d11988-6b56-4571-a123-b6ce74236037"
    },
    "children": [
        {
            "relatedEntityId": "A29cgveD5y64e2RixjUXNzcm",
            "entityId": "c8d11988-6b56-4571-a123-b6ce74236036",
            "timestamp": 1531260476000,
            "entity": {
                "endUserIDs": {
                    "_experience": {
                        "ecid": {
                            "id": "89149270342662559642753730269986316900",
                            "namespace": {
                                "code": "ecid"
                            }
                        }
                    }
                },
                "channel": {
                    "_type": "web"
                },
                "web": {
                    "webPageDetails": {
                        "name": "Fernie Snow",
                        "pageViews": {
                            "value": 1
                        }
                    }
                }
            },
            "lastModifiedAt": "2018-08-21T06:49:02Z"
        }
    ],
    "_links": {
        "next": {
            "href": "/entities?start=c8d11988-6b56-4571-a123-b6ce74236037&orderby=timestamp&schema.name=_xdm.context.experienceevent&relatedSchema.name=_xdm.context.profile&relatedEntityId=89149270342662559642753730269986316900&relatedEntityIdNS=ECID&fields=endUserIDs,web,channel&startTime=1531260476000&endTime=1531260480000&limit=1"
        }
    }
}
```

### Accessing a subsequent page of time series events

Results are paginated when retrieving ExperienceEvents, where the initial call would produce the first page. If there are subsequent pages of results, there will be a non-empty value in the result for `_page.next`. Additionally, the resulting JSON will produce a fully qualified request URL for retrieving the subsequent page, as `_links.next`. 

> **Note:** In the example response above, notice the URL begins with "/entities", to which you must prefix "https://<span></span>platform.adobe.<span></span>io/data/core/ups/access" to make the service call.
> 
> **Note:** If a related graph links more than 50 identities, this service will return an HTTP status code of 422 and a message "UPS-ACCSDK-1000005:Too many related identities. Got: 446, max: 50".

#### Example request

The following example retrieves a subsequent (any page after the first) page of a request using the request URI as provided in a result, as `_links.next.href`.

```
curl -X GET \
  'https://platform.adobe.io/data/core/ups/access/entities?start=c8d11988-6b56-4571-a123-b6ce74236037&orderby=timestamp&schema.name=_xdm.context.experienceevent&relatedSchema.name=_xdm.context.profile&relatedEntityId=89149270342662559642753730269986316900&relatedEntityIdNS=ECID&fields=endUserIDs,web,channel&startTime=1531260476000&endTime=1531260480000&limit=1' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
```

#### Example response

This example demonstrates a result where there are no subsequent pages of results.

```
{
    "_page": {
        "orderby": "timestamp",
        "start": "c8d11988-6b56-4571-a123-b6ce74236037",
        "count": 1,
        "next": ""
    },
    "children": [
        {
            "relatedEntityId": "A29cgveD5y64e2RixjUXNzcm",
            "entityId": "c8d11988-6b56-4571-a123-b6ce74236037",
            "timestamp": 1531260477000,
            "entity": {
                "endUserIDs": {
                    "_experience": {
                        "ecid": {
                            "id": "89149270342662559642753730269986316900",
                            "namespace": {
                                "code": "ecid"
                            }
                        }
                    }
                },
                "channel": {
                    "_type": "web"
                },
                "web": {
                    "webPageDetails": {
                        "name": "Fernie Snow",
                        "pageViews": {
                            "value": 1
                        }
                    }
                }
            },
            "lastModifiedAt": "2018-08-21T06:50:01Z"
        }
    ],
    "_links": {
        "next": {
            "href": ""
        }
    }
}
```

The above example shows an empty `_links.next.href` indicating there are no more pages of results.

---

## Accessing time series events for multiple profiles by identities

Look up ExperienceEvents by the identities of a collection associated profiles.

> **Note:** If a related graph links more than 50 identities, this service will return an HTTP status code of 422 and a message "UPS-ACCSDK-1000005:Too many related identities. Got: 446, max: 50".

#### Service endpoint

```
POST https://platform.adobe.io/data/core/ups/access/entities
```

#### Request body

|Parameter|Description|Example|
|---|---|---|
|`schema.name`|The XDM schema of the entity to retrieve|_xdm.context.profile|
|`relatedSchema.name`|If `schema.name` is "ExperienceEvent", this value names the schema of the entity related to the ExperienceEvents.|_xdm.context.profile|
|`identities`|List of profiles for which to retrieve associated ExperienceEvents. Each entry of this can be set one of two ways; using a fully qualified identity consisting of ID value and namespace, or providing an XID.|`[ { "relatedEntityId": "GkouAW-yD9aoRCPhRYROJ-TetAFW" } ]`|
|`fields`|This value allows you to isolate the data returned to what you need. Use this field to specify which schema field values to include in data retrieved.|personalEmail,person.name,person.gender|
|`mergePolicyId`|Identifies the Merge Policy by which to govern the data returned. If one is not specified in the service call, your organization's default for that schema will be used. If not default Merge Policy has been configured, the default is no profile merge and no identity stitching.|5aa6885fcf70a301dabdfa4a|
|`orderBy`|Specify the field by which to order results as in `orderBy=timestamp` or `orderBy=+timestamp` to sort by name in ascending order (the default), or `orderBy=-timestamp`, to sort in descending order. To omit this value would result in the default sorting of `timestamp` in ascending order.|
|`timeFilter.startTime`|Specify the start time to filter time-series objects, at millisecond granularity.|1539838505|
|`timeFilter.endTime`|Specify the end time to filter time-series objects, at millisecond granularity.|1539838510|
|`limit`|Numeric value specifying the maximum number of objects to return. <br>__Default: 1000__|100|

#### Example request

The following example would get an email and name for several consumers by a list of identities:

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/access/entities \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  -d '{
    "schema": {
        "name": "_xdm.context.experienceevent"
    },
    "relatedSchema": {
        "name": "_xdm.context.profile"
    },
    "timeFilter": {
        "startTime": 1537275882000
    },
    "fields": [
        "endUserIDs",
        "placeContext.localTime",
        "placeContext.geo.countryCode"
    ],
    "identities": [
        {
            "relatedEntityId": "GkouAW-yD9aoRCPhRYROJ-TetAFW"
        }
    ],
    "limit": 10
}'
```

#### Example response

```
{
    "GkouAW-yD9aoRCPhRYROJ-TetAFW": {
        "_page": {
            "orderby": "timestamp",
            "start": "ee0fa8eb-f09c-4d72-a432-fea7f189cfcd",
            "count": 10,
            "next": "40cb2fb3-78cd-49d3-806f-9bdb22748226"
        },
        "children": [
            {
                "relatedEntityId": "GkouAW-yD9aoRCPhRYROJ-TetAFW",
                "entityId": "ee0fa8eb-f09c-4d72-a432-fea7f189cfcd",
                "timestamp": 1537275882000,
                "entity": {
                    "endUserIDs": {
                        "_experience": {
                            "mcid": {
                                "id": "67971860962043911970658021809222795905",
                                "namespace": {
                                    "code": "ECID"
                                }
                            },
                            "aacustomid": {
                                "id": "50353446361742744826197433431642033796",
                                "namespace": {
                                    "code": "CRMID"
                                },
                                "primary": true
                            },
                            "acid": {
                                "id": "2de32e9a00003314-2fd9c00000000026",
                                "namespace": {
                                    "code": "AVID"
                                }
                            }
                        }
                    },
                    "placeContext": {
                        "localTime": "2018-09-18T13:04:42Z",
                        "geo": {
                            "countryCode": "MX"
                        }
                    }
                },
                "lastModifiedAt": "2018-10-24T17:35:01Z"
            },
            {
                "relatedEntityId": "GkouAW-yD9aoRCPhRYROJ-TetAFW",
                "entityId": "a9e137b4-1348-4878-8167-e308af523d8b",
                "timestamp": 1537275889000,
                "entity": {
                    "endUserIDs": {
                        "_experience": {
                            "mcid": {
                                "id": "67971860962043911970658021809222795905",
                                "namespace": {
                                    "code": "ECID"
                                }
                            },
                            "aacustomid": {
                                "id": "50353446361742744826197433431642033796",
                                "namespace": {
                                    "code": "CRMID"
                                },
                                "primary": true
                            },
                            "acid": {
                                "id": "2de32e9a00003314-2fd9c00000000026",
                                "namespace": {
                                    "code": "AVID"
                                }
                            }
                        }
                    },
                    "placeContext": {
                        "localTime": "2018-09-18T13:04:49Z",
                        "geo": {
                            "countryCode": "MX"
                        }
                    }
                },
                "lastModifiedAt": "2018-10-24T17:35:01Z"
            },
            ...
        ],
        "_links": {
            "next": {
                "href": "/entities",
                "payload": {
                    "schema": {
                        "name": "_xdm.context.experienceevent"
                    },
                    "relatedSchema": {
                        "name": "_xdm.context.profile"
                    },
                    "timeFilter": {
                        "startTime": 1537275882000
                    },
                    "fields": [
                        "endUserIDs",
                        "placeContext.localTime",
                        "placeContext.geo.countryCode"
                    ],
                    "identities": [
                        {
                            "relatedEntityId": "GkouAW-yD9aoRCPhRYROJ-TetAFW",
                            "start": "40cb2fb3-78cd-49d3-806f-9bdb22748226"
                        }
                    ],
                    "limit": 10
                }
            }
        }
    },
    "GkouAW-2u-7iWt5vQ9u2wm40JOZY": {
        "_page": {
            "orderby": "timestamp",
            "start": "2746d0db-fa64-4e29-b67e-324bec638816",
            "count": 9,
            "next": ""
        },
        "children": [
            {
                "relatedEntityId": "GkouAW-2u-7iWt5vQ9u2wm40JOZY",
                "entityId": "2746d0db-fa64-4e29-b67e-324bec638816",
                "timestamp": 1537559483000,
                "entity": {
                    "endUserIDs": {
                        "_experience": {
                            "mcid": {
                                "id": "76436745599328540420034822220063618863",
                                "namespace": {
                                    "code": "ECID"
                                }
                            },
                            "aacustomid": {
                                "id": "48593470048917738786405847327596263131",
                                "namespace": {
                                    "code": "CRMID"
                                },
                                "primary": true
                            },
                            "acid": {
                                "id": "2de32e9a80007451-03da600000000028",
                                "namespace": {
                                    "code": "AVID"
                                }
                            }
                        }
                    },
                    "placeContext": {
                        "localTime": "2018-09-21T19:51:23Z",
                        "geo": {
                            "countryCode": "US"
                        }
                    }
                },
                "lastModifiedAt": "2018-10-24T17:34:58Z"
            },
            {
                "relatedEntityId": "GkouAW-2u-7iWt5vQ9u2wm40JOZY",
                "entityId": "9bf337a1-3256-431e-a38c-5c0d42d121d1",
                "timestamp": 1537559486000,
                "entity": {
                    "endUserIDs": {
                        "_experience": {
                            "mcid": {
                                "id": "76436745599328540420034822220063618863",
                                "namespace": {
                                    "code": "ECID"
                                }
                            },
                            "aacustomid": {
                                "id": "48593470048917738786405847327596263131",
                                "namespace": {
                                    "code": "CRMID"
                                },
                                "primary": true
                            },
                            "acid": {
                                "id": "2de32e9a80007451-03da600000000028",
                                "namespace": {
                                    "code": "AVID"
                                }
                            }
                        }
                    },
                    "placeContext": {
                        "localTime": "2018-09-21T19:51:26Z",
                        "geo": {
                            "countryCode": "US"
                        }
                    }
                },
                "lastModifiedAt": "2018-10-24T17:34:58Z"
            },
            ...
        ],
        "_links": {
            "next": {
                "href": ""
            }
        }
    }
}`
```

### Accessing a subsequent page of time series events

In the example above, notice the first profile ("GkouAW-yD9aoRCPhRYROJ-TetAFW") in the result set provides a value for `_links.next.payload`. Using this payload in a call to the same endpoint will retrieve the subsequent page of ExperienceEvent data for that profile.

> **Note:** If a related graph links more than 50 identities, this service will return an HTTP status code of 422 and a message "UPS-ACCSDK-1000005:Too many related identities. Got: 446, max: 50".

#### Example request

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/access/entities \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  -d '{
    "schema": {
        "name": "_xdm.context.experienceevent"
    },
    "relatedSchema": {
        "name": "_xdm.context.profile"
    },
    "timeFilter": {
        "startTime": 1537275882000
    },
    "fields": [
        "endUserIDs",
        "placeContext.localTime",
        "placeContext.geo.countryCode"
    ],
    "identities": [
        {
            "relatedEntityId": "GkouAW-yD9aoRCPhRYROJ-TetAFW",
            "start": "40cb2fb3-78cd-49d3-806f-9bdb22748226"
        }
    ],
    "limit": 10
}'
```

---

## Accessing an exported segment

Accessing data using criteria, or rules, is facilitated by Segmentation Service. A segment definition is created using the Segmentation API, tested using the Preview API, and applied against your profile store using the Segment Jobs API. [Visit this tutorial](../creating_a_segment_tutorial/creating_a_segment_tutorial.md) for more details on this.

The final step in segmentation is to export your segment using the Export API. An example of a response from the Profile Export API call is as follows:

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

Once export is complete, use the Data Access API to access the data using the `batchId` returned from the export service call, "5b565efc0a488f01e2c19972" in the example above. Note that a segment may be chunked, and a batch could consist of several files. You must first list the files belonging to the batch, and download each Parquet file by file ID. 

For more information on using the Data Access API, [see the tutorial](../data_access_tutorial/data_access_tutorial.md).
