# Consuming Unified Profile Data

## Overview

Unified Profile is the centrally accessible source of data for Adobe Experience Platform solutions, providing access to unified customer profile data that helps inform and empower actions across any channel, platform and Adobe Solution integrations. This customer data, paired with a rich history of behavioral and interaction data, is used to power machine learning & Sensei. Unified Profile APIs can also be directly used to enrich the functionality of third-party solutions, CRMs, and proprietary solutions.

### Objective

This tutorial covers methods of accessing your Unified Profile data on Experience Platform. In specific, it covers the following:

[Accessing Profile Data by Identity](#accessing-data-by-identity) - Access a single entity by the primary identifier.  
[Accessing Profile Data by List of Identities](#accessing-data-by-list-of-identities) - Access multiple entities by an array of identities.  
[Accessing Touch Point Events for a Profile by Identity](#accessing-touch-point-events-for-a-profile-by-identity) - ExperienceEvents represent customer touch points and are only accessible relative to the entity to which they are related. Access ExperienceEvents for a given profile.  
[Accessing Touch Point Events for Multiple Profiles by Identity](#accessing-touch-point-events-for-multiple-profiles-by-identity) - Access ExperienceEvents for a collection of Profile identities.
[Accessing an Exported Segment](#accessing-an-exported-segment) - The final step in segmentation is to export the segment to a dataset. Access segment data using the Data Access API.  

### Prerequisite Topics

[__Unified Profile__](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md) is a generic lookup entity store, and is used to manage any XDM Platform data. Unified Profile facilitates building customer personalization use cases by merging data across various enterprise data assets and providing access to that unified data. Unified Profile provides tools for looking up entities by ID, as well as robust segmentation tools.  
[__Authenticating and Accessing Adobe Experience Platform APIs__](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) - This tutorial shows the initial steps to set up an integration in Adobe I/O Console and use the created integration to access Platform APIs. The steps in this tutorial describe how to create an integration and gain access to the following values needed for required headers:
* IMS Organization ID
* API Key (Client ID)
* Access Token 

### Related Topics

[__Experience Data Model (XDM)__](../../technical_overview/schema_registry/standard_schemas/acp_standard_schemas.md) provides the framework to refer to and manage the schemas that your data must conform to for use as entities on Platform.

### Requirements

All APIs in this document require the following headers. Some require additional headers which will be listed in context.

|Header|Description|Example Value|
|---|---|---|
|__`Authorization`__|The Access Token as described in [Prerequisite Topics](#prerequisite-topics), prefixed with "Bearer "|Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....|
|__`x-gw-ims-org-id`__|The IMS Organization ID as described in [Prerequisite Topics](#prerequisite-topics)|17FA2AFD56CF35747F000101@AdobeOrg|
|__`x-api-key`__|The API Key (Client ID) as described in [Prerequisite Topics](#prerequisite-topics)|25622d14d3894ea590628717f2cb7462|

---

## Merging Profiles

Unified Profile can supply you with a merged view of entities being accessed, across datasets and for linked identities, referred to as the unified profile. 

On Experience Platform, "profile" is a term used to describe the attributes of an entity. The profile of a product may include a SKU and description, where the profile of a person contains information like first name, last name, and email address. Speaking in terms of a user, it's easy to imagine the numerous systems maintaining its own profile data and where time series activities are occurring. Each of those systems, perhaps an eCommerce system, commissions engine, and call center CRM, should be added to a dataset on Platform specific to that system. An entity as it exists in a single dataset is considered a "profile fragment".

### Merge Policies

Profile merging occurs on data access in Unified Profile. Some use cases handled by Merge Policies include:

* Accessing data from a specific dataset
* Placing a higher priority on data coming from a dataset more likely than others to have updated and maintained information
* Adhering to legal concerns such as contractual or DULE obligations, where use of data from a particular dataset is not allowed, perhaps for a particular purpose
* Getting a unified profile made up of all profile data found for all linked identities

Any API providing access Unified Profile data, namely Profile Access and Profile Export APIs, requires a Merge Policy. When you don't specify a Merge Policy explicitly, a default will be used. Platform provides a default Merge Policy for any XDM schema, or you can create a Merge Policy and mark it as your organization's default for a schema. If no merge policy ID is defined, and the `schema.name` or `relatedSchema.name` is "_xdm.context.profile", profile access will fetch and merge all related identities.

Merge Policies are specific to a single schema, and can only be used to access entities adhering to that schema. Merge policies are private to an organization and, though there may be several for a single schema, there can only be one default for each schema. 

For information on working with Merge Policies, see the tutorial [Activating Unified Profile](../activating_up_tutorial/activating_up_tutorial.md).

### Data Governance 

Data governance is a series of strategies and technologies used to manage customer data and ensure compliance with regulations, restrictions, and policies applicable to data use. As it relates to accessing data, it plays a key role within Experience Platform at various levels, including data usage labeling, data access policies, and access control on data for marketing actions.

Data governance is managed at several points, from deciding what data to add to Platform to what specific data fields to retrieve on accessing that data as well as from what datasets. 

#### Data Usage Labeling and Enforcement (DULE)

Field names can be specified in data access services requests, allowing you to specify what fields to populate in your result. Data Usage Labeling and Enforcement (DULE) framework is a means to control how fields are used from the schema level using usage labels. Usage labels categorize data that falls into the following:

* Contractual Data - Used to indicate data that is controlled by contractual obligations, including that the data cannot be exported to a 3rd party or that it isn't permissible for use in Data Science workflows.
* Identity Data - Indicates data that could be used to identify or contact a person. These labels indicate whether data can directly or indirectly identify a person.
* Sensitive Data - These labels categorize sensitive geographic data.

For more information on usage labeling, start with the [Data Usage Labeling and Enforcement (DULE) User Guide](https://www.adobe.io/apis/experienceplatform/home/dule/duleservices.html).

#### Dataset Selection

Using Merge Policies, you are able to indicate what datasets to include where a merge would occur; during Segmentation, Access, and Export. Any datasets not included would not be merged into the unified profile.

---

## Accessing Profile Data by Identity

Access an entity by an identifier, which would consist of the ID value and the identity namespace.

__Service endpoint__

`GET https://platform.adobe.io/data/core/ups/access`

__Request parameters__

|Parameter|Description|Example|
|---|---|---|
|__`schema.name`__|The XDM schema of the entity to retrieve|_xdm.context.profile|
|__`relatedSchema.name`__|If `schema.name` is "_xdm.context.experienceevent", this value names the schema of the entity related to the ExperienceEvents.|_xdm.context.profile|
|__`entityId`__|The value of this can be set one of two ways; using a fully qualified identifier consisting of ID value and namespace, or providing an XID.|5558525235|
|__`entityIdNS`__|This field specifies the identity namespace when `entityId` is not provided as an XID.|phone|
|__`relatedEntityId`__|If `schema.name` is "ExperienceEvent", this value specifies the namespace of the identity of the related entity. This value follows the same rules as `entityId`.|69935279872410346619186588147492736556|
|__`relatedEntityIdNS`__|If `schema.name` is "ExperienceEvent", this value specifies the namespace of the value provided by `relatedEntityId` identity of the entity related to the ExperienceEvents.|CRMID|
|__`fields`__|This value allows you to isolate the data returned to what you need. Use this field to specify which schema field values to include in data retrieved.|personalEmail,person.name,person.gender|
|__`mergePolicyId`__|Identifies the Merge Policy by which to govern the data returned. If one is not specified in the service call, your organization's default for that schema will be used. If not default Merge Policy has been configured, the default is no profile merge and no identity stitching.|5aa6885fcf70a301dabdfa4a|
|__`startTime`__|Specify the start time to filter time-series objects, at millisecond granularity.|1539838505|
|__`endTime`__|Specify the end time to filter time-series objects, at millisecond granularity.|1539838510|
|__`limit`__|Numeric value specifying the maximum number of objects to return. <br>__Default: 1000__|100|

__Example request - Get consumer email and name by ID__

```
curl -X GET \
  'https://platform.adobe.io/data/core/ups/access/entities?schema.name=_xdm.context.profile&entityId=janedoe@example.com&entityIdNS=email&fields=identities,person.name,workEmail' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
```
__Example response__

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
    }
}
```

---

## Accessing Profile Data by List of Identities

Access a number of entities by their identifiers, where an identifier consists of the ID value and the identity namespace.

__Service endpoint__

`POST https://platform.adobe.io/data/core/ups/access/entities`

__Example request - Get email and name for several consumers by IDs__

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

__Example response__

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

## Accessing Touch Point Events for a Profile by Identity

Look up ExperienceEvents by the identifier of the associated profile.

__Service endpoint__

`GET https://platform.adobe.io/data/core/ups/access/entities`

__Request parameters__

|Parameter|Description|Example|
|---|---|---|
|__`schema.name`__|The XDM schema of the entity to retrieve|_xdm.context.profile|
|__`relatedSchema.name`__|If `schema.name` is "ExperienceEvent", this value names the schema of the entity related to the ExperienceEvents.|_xdm.context.profile|
|__`entityId`__|The value of this can be set one of two ways; using a fully qualified identifier consisting of ID value and namespace, or providing an XID.|5558525235|
|__`entityIdNS`__|This field specifies the identity namespace when `entityId` is not provided as an XID.|phone|
|__`relatedEntityId`__|If `schema.name` is "ExperienceEvent", this value specifies the namespace of the identity of the related entity. This value follows the same rules as `entityId`.|69935279872410346619186588147492736556|
|__`relatedEntityIdNS`__|If `schema.name` is "ExperienceEvent", this value specifies the namespace of the value provided by `relatedEntityId` identity of the entity related to the ExperienceEvents.|CRMID|
|__`fields`__|This value allows you to isolate the data returned to what you need. Use this field to specify which schema field values to include in data retrieved.|personalEmail,person.name,person.gender|
|__`mergePolicyId`__|Identifies the Merge Policy by which to govern the data returned. If one is not specified in the service call, your organization's default for that schema will be used. If not default Merge Policy has been configured, the default is no profile merge and no identity stitching.|5aa6885fcf70a301dabdfa4a|
|__`timeFilter.startTime`__|Specify the start time to filter time-series objects, at millisecond granularity.|1539838505|
|__`timeFilter.endTime`__|Specify the end time to filter time-series objects, at millisecond granularity.|1539838510|
|__`limit`__|Numeric value specifying the maximum number of objects to return. <br>__Default: 1000__|100|

__Example request - Get ExperienceEvents by Profile ID__

The following example retrieves the end user identities, web and channel for all ExperienceEvents for a given Profile by Profile ID between a date/time range. Results are paginated. 

```
curl -X GET \
  'https://platform.adobe.io/data/core/ups/access/entities?schema.name=_xdm.context.experienceevent&relatedSchema.name=_xdm.context.profile&relatedEntityId=89149270342662559642753730269986316900&relatedEntityIdNS=ECID&fields=endUserIDs,web,channel&startTime=1531260476000&endTime=1531260480000&limit=1' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
```

__Example response__

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

### Accessing a Subsequent Page of Touch Point Events

Results are paginated when retrieving ExperienceEvents, where the initial call would produce the first page. If there are subsequent pages of results, there will be a non-empty value in the result for `_page.next`. Additionally, the resulting JSON will produce a fully qualified request URL for retrieving the subsequent page, as `_links.next`. Notice the URL begins with "/entities", to which you must prefix "https://platform.adobe.io/data/core/ups/access" to make the service call.

__Example request - Get next page of ExperienceEvents by Profile ID__

The following example retrieves a subsequent (any page after the first) page of a request using the request URI as provided in a result, as `_links.next.href`.

```
curl -X GET \
  'https://platform.adobe.io/data/core/ups/access/entities?start=c8d11988-6b56-4571-a123-b6ce74236037&orderby=timestamp&schema.name=_xdm.context.experienceevent&relatedSchema.name=_xdm.context.profile&relatedEntityId=89149270342662559642753730269986316900&relatedEntityIdNS=ECID&fields=endUserIDs,web,channel&startTime=1531260476000&endTime=1531260480000&limit=1' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
```

__Example response__

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

## Accessing Touch Point Events for Multiple Profiles by Identity

Look up ExperienceEvents by the identifiers of a collection associated profiles.

__Service endpoint__

`POST https://platform.adobe.io/data/core/ups/access/entities`

__Request body__

|Parameter|Description|Example|
|---|---|---|
|__`schema.name`__|The XDM schema of the entity to retrieve|_xdm.context.profile|
|__`relatedSchema.name`__|If `schema.name` is "ExperienceEvent", this value names the schema of the entity related to the ExperienceEvents.|_xdm.context.profile|
|__`identities`__|List of profiles for which to retrieve associated ExperienceEvents. Each entry of this can be set one of two ways; using a fully qualified identifier consisting of ID value and namespace, or providing an XID.|```[ { "relatedEntityId": "GkouAW-yD9aoRCPhRYROJ-TetAFW" } ]```|
|__`fields`__|This value allows you to isolate the data returned to what you need. Use this field to specify which schema field values to include in data retrieved.|personalEmail,person.name,person.gender|
|__`mergePolicyId`__|Identifies the Merge Policy by which to govern the data returned. If one is not specified in the service call, your organization's default for that schema will be used. If not default Merge Policy has been configured, the default is no profile merge and no identity stitching.|5aa6885fcf70a301dabdfa4a|
|__`timeFilter.startTime`__|Specify the start time to filter time-series objects, at millisecond granularity.|1539838505|
|__`timeFilter.endTime`__|Specify the end time to filter time-series objects, at millisecond granularity.|1539838510|
|__`limit`__|Numeric value specifying the maximum number of objects to return. <br>__Default: 1000__|100|

__Example request - Get email and name for several consumers by IDs__

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

__Example response__

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

### Accessing a Subsequent Page of Touch Point Events

In the example above, notice the first profile ("GkouAW-yD9aoRCPhRYROJ-TetAFW") in the result set provides a value for `_links.next.payload`. Using this payload in a call to the same endpoint will retrieve the subsequent page of ExperienceEvent data for that profile.

__Example request - Get next page of ExperienceEvents by Profile IDs__

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

## Accessing an Exported Segment

Accessing data using criteria, or rules, is facilitated by Segmentation Service. A segment definition is created using the Segmentation API, tested using the Preview API, and applied against your profile store using the Segment Jobs API. [Visit this tutorial](../creating_a_segment_tutorial/creating_a_segment_tutorial.md) for more details on this.

The final step in segmentation is to export your segment using the Export API. An example of a response from the Export call is as follows:

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

Once export is complete, use the Data Access API to access the data using the `batchId` returned from the Export service call, "5b565efc0a488f01e2c19972" in the example above. Note that a segment may be chunked, and a batch could consist of several files. You must first list the files belonging to the batch, and download each Parquet file by file ID. 

For more information on using the Data Access API, [see the tutorial](../data_access_tutorial/data_access_tutorial.md).