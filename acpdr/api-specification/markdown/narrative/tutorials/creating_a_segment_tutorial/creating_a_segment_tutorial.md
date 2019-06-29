# Creating segments in Experience Platform via API

## Overview

This tutorial covers the workflow for using Segmentation Service to create a segment in Adobe Experience Platform. 

### Creating segments

Segmentation Service behaves on/with the following components:

* __Segments__ are classified subsets of your user base, such as "Men over 50"
* __Definitions__ are the rules, in terms of the conditions that an union schema object must meet to qualify for a Segment
* __Segmentation jobs__ are asynchronous processes which isolate members of your user base per the rules described by a definition
* An __audience__ is the collection of XDM objects which met the qualifications, or conditions, as set out by the segment definition

In summary, the following tasks are involved in segmentation and are detailed in this section:

[First, develop your segment definition](#step-1-develop-a-segment-definition) - Start with determining your marketable segment, first conceptually, then on Platform as criteria that your profile data must meet to qualify for your segment. Those that qualify constitute the members of that segment, or audience.  
[Preview, or view estimates of, your segment](#optional-step-2-estimate-and-preview-audience) - As the testing step of the iterations of developing, testing, and refining your definition, you can apply your definition against a sample of your profile store, giving you summary information such as the estimated size of the resulting audience, or a sample set of qualifying profiles to spot-check against the results you expect.  
[Then, segment your user base](#step-3-segment-your-user-base) - Once your definition has been built, tested, and saved, run it against your user base using the Segment Jobs API. A segment job builds the audience which you then must export to a dataset where it can be accessed directly or used by any Platform solution.  
[Finally, export your segment](#step-4-export-your-segment) - Using the Export API, persist audience members to a Profile dataset where it can be accessed by Platform or custom solutions.  

### Prerequisite topics

[Unified Profile](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md) is a generic lookup entity store, and is used to manage any XDM Platform data. Unified Profile facilitates building customer personalization use cases by merging data across various enterprise data assets and providing access to that unified data. Unified Profile provides tools for looking up entities by identity, as well as robust segmentation tools.  
[Authenticating and Accessing Adobe Experience Platform APIs](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) - This tutorial shows the initial steps to set up an integration in Adobe I/O Console and use an integration to access Platform APIs. The steps in this tutorial describe how to create an integration and gain access to the following values needed for required headers:
* IMS Organization ID
* API Key (Client ID)
* Access Token 

### Related topics

[Using Adobe Unified Profile Segment Builder](../../../../../end-user/markdown/segmentation_overview/segmentation.md) - This overview gives a walk-through of the Segment Builder, and should help familiarize you with the tools you'll use to build segments in the Experience Platform UI  
[Experience Data Model (XDM)](../../technical_overview/schema_registry/schema_composition/schema_composition.md) provides the framework to refer to and manage the schemas that your data must conform to for use as entities on Platform.

### Requirements

All APIs in this document require the following headers. Some require additional headers which will be listed in context.

|Header|Description|Example Value|
|---|---|---|
|`Authorization`|The Access Token as described in [Prerequisite topics](#prerequisite-topics), prefixed with "Bearer "|Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....|
|`x-gw-ims-org-id`|The IMS Organization ID as described in [Prerequisite topics](#prerequisite-topics)|17FA2AFD56CF35747F000101@AdobeOrg|
|`x-api-key`|The API Key (Client ID) as described in [Prerequisite topics](#prerequisite-topics)|25622d14d3894ea590628717f2cb7462|

---

## Step 1: Develop a segment definition

The first task in segmentation is to define the segment, represented in a construct aptly referred to as a segment definition. Rules can be based on conditions related to any Profile or ExperienceEvent data you supply to Unified Profile.

A segment definition is represented as a construct which includes the PQL statement defining the rules for the segment using the [Unified Profile Segment Definitions API](../../../../../../acpdr/swagger-specs/profile-segment-definitions-api.yaml). For more information on PQL, a prerequisite, visit the [Profile Query Language Overview](../../technical_overview/unified_profile_architectural_overview/unified_profile_pql.md), or a reference [list of supported queries](../../technical_overview/unified_profile_architectural_overview/unified_profile_supported_queries.md).

#### Additional required headers

The following headers are required in addition to those listed in [Requirements](#requirements), above.

|Header|Value|
|---|---|
|Content-Type|application/json|

#### Service endpoint

```
POST https://platform.adobe.io/data/core/ups/segment/definitions
```

#### Request body

```
{
    "name": "{DEFINITION_NAME}",
    "schema": {
        "name": "{SCHEMA}",
    },
    "expression": {
        "type": "{TYPE}",
        "format": "{FORMAT}",
        "value": "{PQL_STATEMENT}"
    },
    "mergePolicyId": "{MERGE_POLICY_ID}",
    "description": "{DEFINITION_DESCRIPTION}"
}
```

Where the following describes the request body object:

* `name` (__required__) - Specify a name by which to refer to the segment. Choose a name that is descriptive and unique per segment
* `schema` (__required__) - Entity which consists of either an `id` or `name` field, naming the schema of the entities in the segment
* `expression` (__required__) - Entity which consists of the following fields:
  * `type` - Specifies the expression type. Currently only "PQL" is supported
  * `format` - Indicating the structure of the expression in `value`. Options are:
    * **"pql/text** - A textual representation of a segment definition, according to the published PQL grammar.  For example, "workAddress.stateProvince = homeAddress.stateProvince" is a pql/text segment definition.
    * **"pql/json"** - A segment definition in json format. For more on JSON formatted PQL, start with [JSON formatted queries](../../technical_overview/unified_profile_architectural_overview/unified_profile_supported_queries.md#json-formatted-queries).
  * `value` - Expression of above type to select records from xdmSchema
  * `meta` - This can contain more info about the expression and related meta data
* `mergePolicyId` - Specify the merge policy to use for the exported data. For information on working with merge policies, see the tutorial [Working with merge policies via API](../../tutorials/configuring_up_tutorial/configuring_merge_policies_tutorial.md)
* `description` - Human readable description of the definition

#### Example request

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/segment/definitions \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  -d '{
        "name": "My Sample Cart Abandons Segment Definition",
        "schema": {
            "name": "MyProfile",
        },
        "expression": {
            "type": "PQL",
            "format": "pql/text",
            "value": "xEvent.metrics.commerce.abandons.value > 0"
        },
        "mergePolicyId": "mpid1",
        "description": "This Segment represents those users who have abandoned a cart"
    }'
```

#### Example response

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

From the response, collect the segment definition ID (`id`), which will be used in future steps.

---

## Optional Step 2: Estimate and preview audience

As you develop your segment definition, you can use Unified Profile's estimate and preview tools to gain summary-level information quickly along the way to help ensure you are isolating the expected audience. Estimate information includes the projected resulting audience size and the confidence interval. A preview would produce a paginated list of qualifying profiles for a segment definition, allowing you to spot-check the results against what you expect.

Using the APIs to get an estimate of the number of qualifying profiles varies only slightly from previewing a sample of the resulting audience. Working with the [Unified Profile Preview API](../../../../../../acpdr/swagger-specs/profile-preview-api.yaml), you'll supply PQL to create a preview job rather than a segment definition. In this way, you are able to test your PQL predicates until they produce the desirable results and then use that PQL to create a segment definition which is applied against your actual user base to produce a segment.

To preview or get an estimate of your segment there are a couple of steps involved, as you must:

* [Create a preview job](#estimate-and-preview-audience---step-1-create-a-preview-job)
* [Get estimate or preview](#estimate-and-preview-audience---step-2-verify-with-estimate-or-preview) using the ID of the preview, the artifact of running the preview job
  
Data samples are used to evaluate segments and estimate the number of qualifying profiles. New data is loaded into memory each morning (between 12AM-2AM PT, which is 7-9AM UTC), and all segmentation queries are estimated using that day's sample data. Consequently, any new fields added or additional data collected will be reflected in estimates the following day.

The sample size depends on the overall number of entities in your profile store and breaks down into the following categories:

* __Up to 1 million profiles__: use full data set
* __1 to 20 million profiles__: use a sample set of 1 million profiles
* __Over 20 million profiles__: use a 5% sample size

Estimates generally run over 10-15 seconds, beginning with a rough estimate and refining as more records are read.

### Estimate and preview audience - Step 1: Create a preview job

Run a query as a preview job using the `POST https://platform.adobe.io/data/core/ups/preview` API call. The response from this call includes a `previewId` which will be used to `GET` estimate or preview results. In the body of this `POST` will be the query information. For example, the PQL expression, predicate type, predicate XDM model, graph type, and merge strategy.

Because of the varying length of time required to run a query, the estimate and preview processes are asynchronous. Once the query execution has initiated, you would need to `GET` the preview or estimate and determine its state as it progresses. The `state` of the preview will be "RUNNING" until processing is complete, at which point it becomes "RESULT_READY" or "FAILED".

#### Service endpoint

```
POST https://platform.adobe.io/data/core/ups/preview
```

#### Request body

```
{
    "predicateExpression": "{PREDICATE_EXPRESSION}",
    "predicateType": "{PREDICATE_TYPE}",
    "predicateModel": "{PREDICATE_MODEL}",
    "graphType": "{GRAPH_TYPE}",
    "mergeStrategy": "{MERGE_STRATEGY}"
}
```

#### Example request

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/preview \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 1BD6382559DF0C130A49422D@AdobeOrg'
  -d '{
        "predicateExpression": "xEvent.metrics.commerce.abandons.value > 0",
        "predicateType": "pql/text",
        "predicateModel": "_xdm.context.profile",
        "graphType": "simple",
        "mergeStrategy": "simple"
    }'
```

#### Example response

```
{
   "state": "RUNNING",
   "previewQueryId": "4a45e853-ac91-4bb7-a426-150937b6af5c",
   "previewQueryStatus": "RUNNING",
   "previewId": "MDoyOjRhNDVlODUzLWFjOTEtNGJiNy1hNDI2LTE1MDkzN2I2YWY1Yzo0Mg",
   "previewExecutionId": 42
}
```

### Estimate and preview audience - Step 2: Verify with estimate or preview

Using the `previewId` returned from Step 1, periodically get the estimate or preview using one of the following services until the `state` in the response reaches "RESULT_READY".

#### Service endpoint to get estimate information

```
GET https://platform.adobe.io/data/core/ups/estimate/{PREVIEW_ID}
```

#### Example request

```
curl -X GET \
  https://platform.adobe.io/data/core/ups/estimate/MDoyOjRhNDVlODUzLWFjOTEtNGJiNy1hNDI2LTE1MDkzN2I2YWY1Yzo0Mg \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 1BD6382559DF0C130A49422D@AdobeOrg'
```

#### Example response

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

#### Service endpoint to preview audience

```
GET https://platform.adobe.io/data/core/ups/preview/{previewId}
```

#### Example request

```
curl -X GET \
  https://platform.adobe.io/data/core/ups/preview/MDoyOjRhNDVlODUzLWFjOTEtNGJiNy1hNDI2LTE1MDkzN2I2YWY1Yzo0Mg \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 1BD6382559DF0C130A49422D@AdobeOrg'
```

#### Example response

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

---

## Step 3: Segment your user base

Once you have satisfactorily developed and tested your segment definition and saved the definition, you are able to create a segment job which will build the audience using the [Unified Profile Segment Jobs API](../../../../../../acpdr/swagger-specs/profile-segment-jobs-api.yaml).

### Segment your user base - Step 1: Create a segment job

In this step, all qualifying profiles are augmented to add the segment to the profile's list of segment memberships. A segmentation job is asynchronous, and is created referencing the segment definition, as well as merge policies controlling the manner by which Unified Profile merges overlapping attributes across your profile fragments. When a segment job finalizes successfully, you can gather various information about your segment, such as any errors that may have occurred and the ultimate size of your audience.

#### Service endpoint

```
POST https://platform.adobe.io/data/core/ups/segment/jobs
```

#### Request body

```
[
    {
        "segmentId" : "{SEGMENT_ID}"
    }
]
```

Where the value for `segmentId` is the `id` attribute of the response from creating the segment definition, identifying the definition for which to build the audience.

#### Example request

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/segment/jobs \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  -d '[
        {
            "segmentId" : "{SEGMENT_ID}"
        }
    ]'
```

#### Example response

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

Segment jobs run asynchronously, and a job's `status` can be checked by retrieving a segment job by ID (returned from creating the segment job), which will return its status.

#### Service endpoint

```
GET https://platform.adobe.io/data/core/ups/segment/jobs/{SEGMENT_JOB_ID}
```

#### Example request

```
curl -X GET \
  https://platform.adobe.io/data/core/ups/segment/jobs/3456 \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 1BD6382559DF0C130A49422D@AdobeOrg'
```

#### Example response

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

Repeat the call to retrieve your segment job until the `status` reaches "SUCCEEDED", indicating you can export your audience to a dataset.

---

## Step 4: Export your segment

After a segmentation job has successfully updated qualifying profiles in your profile store, adding the segment to the profile's list of segment memberships, you can export your audience to a dataset where it can be accessed and acted upon. 

The Profile Export API is used to isolate an audience built by a segment job for access. Once a segment job has completed running (its `status` attribute has reached "SUCCEEDED"), the Profile Export API can be used to generate XDM Profiles for each member of the audience in your chosen dataset. In summary, the following steps are required to export your audience:

[Identify your dataset](#export-audience---step-1-create-or-select-audience-dataset) - Specify the dataset to hold audience members, creating a new one if needed  
[Generate audience profiles in dataset](#export-audience---step-2-generate-xdm-profiles-for-audience-members) - Export jobs populate the results of a segment job as XDM Profiles in a dataset  
[Wait for audience profiles to complete persisting](#export-audience---step-3-wait-for-export-to-complete) - Export jobs are asynchronous. Get an export job until its status indicates completion (its `status` attribute has reached "SUCCEEDED", or "FAILED")  
[Read audience data](#export-audience---step-4-read-profiles-from-audience-dataset) - Using the Data Access API, retrieve the resulting XDM Profiles representing the members of your audience

The following contains examples demonstrating use of the Profile Export API. Please visit the [Swagger API Reference](../../../../../../acpdr/swagger-specs/profile-export-api.yaml) for complete coverage of the Profile Export API.

### Export audience - Step 1: Create or select audience dataset

An audience must be exported to a dataset created to persist the union view schema, but one that is not enabled for Unified Profile itself. 

#### Service endpoint

```
POST https://platform.adobe.io/data/foundation/catalog/dataSets
```
#### Request body

```
{
	"name": "Segment Export",
	"schemaRef": {
		"id": "https://ns.adobe.com/xdm/context/profile__union",
		"contentType": "application/vnd.adobe.xed+json;version=1"
	},
	"fileDescription": {
		"persisted": true,
		"containerFormat": "parquet",
		"format": "parquet"
	},
	"aspect": "production"
}
```

#### Example request

```
curl -X POST \
  https://platform.adobe.io/data/foundation/catalog/dataSets \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg' \
  -d '{
	"name": "Segment Export",
	"schemaRef": {
		"id": "https://ns.adobe.com/xdm/context/profile__union",
		"contentType": "application/vnd.adobe.xed+json;version=1"
	},
	"fileDescription": {
		"persisted": true,
		"containerFormat": "parquet",
		"format": "parquet"
	},
	"aspect": "production"
}'
```

#### Example response

```
[@/datasets/5b020a27e7040801dedba61b"] 
```

The response to the API request to create a dataset comes in the form of an array of string dataset IDs containing exactly one ID, "5b020a27e7040801dedba61b" in the example above.

### Export audience - Step 2: Generate XDM Profiles for audience members

Trigger an export job to persist the audience members to the dataset from above by providing the `datasetId` from establishing the audience dataset in Step 1, and the segment(s) to export, by segment ID. 

#### Service endpoint

```
POST https://platform.adobe.io/data/core/ups/export/jobs
```

#### Request body

```
{
	"fields": "identities.id,personalEmail.address",
	"mergePolicy": {
		"id": "e5bc94de-cd14-4cdf-a2bc-88b6e8cbfac2",
		"version": 1
	},
	"filter": {
		"segments": [{
			"segmentId": "4edc8488-2c35-4f6d-b4c6-9075c68d2df4"
		}],
		"fromIngestTimestamp": "2018-10-25T13:22:04-07:00"
	},
	"additionalFields" : {
		"eventList": {
			"fields": "environment.browserDetails.name,environment.browserDetails.version",
			"filter": {
				"fromIngestTimestamp": "2018-10-25T13:22:04-07:00"
			}
		}
	},
	"destination": {
		"dataSetId": "5b020a27e7040801dedba61b"
	},
	"schema": {
		"name": "_xdm.context.profile"
	}
}
```

Breaking down the attributes of this request body:

* `fields` - You can choose to limit the size of each audience member by using the `fields` property to limit the data populated within the members in the dataset. This parameter was also available at segment creation time, and so the fields in the segment may have been filtered. Using this parameter, you are only able to pare down what is included in the segment fields. Omitting this value will result in all fields being included in the exported data.
* `filter` - Use this field to specify one or more filters to apply to the segment before export.
  * `segments` - Specify the segments to export. While this property is optional, omitting it from your request will result in all data from all segments being exported. Provide an array of segment constructs with `segmentId` populated with the ID of the segment to export.
  * `fromIngestTimestamp` - By supplying this value, all and only the events ingested after this timestamp will be exported from the segments being exported. This is not the event time itself but the ingestion time for the events. This will be in the [RFC 3339](https://tools.ietf.org/html/rfc3339) format.
* `mergePolicy` - Specify the merge policy to govern the exported data. Specify a merge policy when there are multiple segments being exported. If merge policy is not specified here, export will default to use the merge policy of the segment.
  * `id` - Provide the ID of the merge policy.
  * `version` - You may optionally specify the specific version of the merge policy to use. Omitting this value will default to the most recent version.
* `additionalFields` - This object controls the fields exported for child or associated objects. The settings provided as `eventList` govern the fields exported for ExperienceEvents.
  * `fields` - Control the fields to export.
  * `filter` - You can specify criteria limiting the results included from associated objects. Supply the minimum value required for export, typically a date.
* `destination` (__required__) - This object's `dataSetId` attribute indicates the dataset into which to persist the members meeting the conditions of the related definition ("5c81ac183f0bd914b741ae35" from the example above).
* `schema` (__required__) - This attribute's `name` property names the schema of the exported dataset.

The result of successfully running an export job is a dataset populated with only those individuals that qualified for the last completed run of the segment job. Any members that existed in that dataset, but did not qualify for the segment at the time of the last completed run of the segment job, would be removed from the dataset.

#### Example response

```
{
  "id": 100,
  "jobType": "BATCH",
  "destination": {
    "datasetId": "5b020a27e7040801dedba61b",
    "batchId": "da5cfb4de32c4b93a09f7e37fa53ad52"
  },
  "fields": "identities.id,personalEmail.address",
  "schema": {
    "name": "_xdm.context.profile"
  },
  "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
  "status": "FAILED",
  "filter": {
    "segments": [
      {
        "segmentId": "52c26d0d-45f2-47a2-ab30-ed06abc981ff",
        "snapshotName": "peopleInCA"
      }
    ],
    "fromIngestTimestamp": "2018-01-01T00:00:00Z",
    "fromTimestamp": "2018-01-01T00:00:00Z"
  },
  "additionalFields": {
    "eventList": {
      "fields": "environment.browserDetails.name,environment.browserDetails.version",
      "filter": {
        "fromIngestTimestamp": "2018-01-01T00:00:00Z"
      }
    }
  },
  "mergePolicy": {
    "id": "timestampOrdered-none-mp",
    "version": 1
  },
  "profileInstanceId": "ups",
  "errors": [
    {
      "code": "0100000003",
      "msg": "Error in Export Job",
      "callStack": "com.adobe.aep.unifiedprofile.common.logging.Logger"
    }
  ],
  "metrics": {
    "totalTime": {
      "startTimeInMs": 123456789000,
      "endTimeInMs": 123456799000,
      "totalTimeInMs": 10000
    },
    "profileExportTime": {
      "startTimeInMs": 123456789000,
      "endTimeInMs": 123456799000,
      "totalTimeInMs": 10000
    },
    "aCPDatasetWriteTime": {
      "startTimeInMs": 123456789000,
      "endTimeInMs": 123456799000,
      "totalTimeInMs": 10000
    }
  },
  "computeGatewayJobId": {
    "exportJob": "f3058161-7349-4ca9-807d-212cee2c2e94",
    "pushJob": "feaeca05-d137-4605-aa4e-21d19d801fc6"
  },
  "creationTime": 1538615973895,
  "updateTime": 1538616233239,
  "requestId": "d995479c-8a08-4240-903b-af469c67be1f"
}
```

### Export audience - Step 3: Wait for export to complete

Iteratively retrieve the export job by ID until the `status` reaches "SUCCEEDED".

### Export audience - Step 4: Read profiles from audience dataset

Once export is complete, use the Data Access API to access the data using the `batchId` returned from the export service call, "da5cfb4de32c4b93a09f7e37fa53ad52" in the example above. Note that a segment may be chunked, and a batch could consist of several files. You must first list the files belonging to the batch, and download each Parquet file by file ID. 

For more information on using the Data Access API, [see the tutorial](../../tutorials/data_access_tutorial/data_access_tutorial.md).

---

## Now you know

After following this tutorial, which focuses on creating audience segments, the following should be demystified:

* The data and condition types you can use to build the rules for your segments
* Getting from your entire profile store to marketable subsets of your user-base
* Exporting your segment to a dataset to be accessed by Platform solutions

For more in-depth information on Unified Profile, see the [Unified Profile Overview](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md).