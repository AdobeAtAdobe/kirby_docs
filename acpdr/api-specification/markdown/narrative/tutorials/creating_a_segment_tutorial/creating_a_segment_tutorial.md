# Create a segment using the Real-time Customer Profile API

This document provides a tutorial for creating and exporting an audience segment using the [Real-time Customer Profile API](../../../../../../acpdr/swagger-specs/real-time-customer-profile.yaml). For information on how to build segments using the user interface, please see the [Segment Builder documentation](../../../../../end-user/markdown/segmentation_overview/segmentation.md).

The tutorial covers the following steps:

1. [Develop a segment definition](#develop-a-segment-definition) 
1. [Estimate and preview an audience](#estimate-and-preview-an-audience)
1. [Segment your user base](#segment-your-user-base)
1. [Export the segment](#export-the-segment)

## Getting started

This tutorial requires a working understanding of the various Adobe Experience Platform services involved in creating audience segments. Before beginning this tutorial, please review the documentation for the following services:

- [Real-time Customer Profile](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md): Provides a unified, real-time consumer profile based on aggregated data from multiple sources.
- [Adobe Experience Platform Segmentation Service](../../../../../end-user/markdown/segmentation_overview/segmentation.md): Allows you to build audience segments from your Real-time Customer Profile data.
- [Experience Data Model (XDM)](../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Platform organizes customer experience data.

This tutorial also requires you to have completed the [authentication tutorial](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) in order to successfully make calls to Platform APIs. Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

* Authorization: Bearer `{ACCESS_TOKEN}`
* x-api-key: `{API_KEY}`
* x-gw-ims-org-id: `{IMS_ORG}`

All POST, PUT, and PATCH requests require an additional header:

* Content-Type: application/json

## Develop a segment definition

The first step in segmentation is to define a segment, represented in a construct called a **segment definition**. A segment definition is an object that encapsulates a query written in Profile Query Language (PQL). This object is also called a **PQL predicate**. PQL predicates define the rules for the segment based on conditions related to any record or time series data you supply to Real-time Customer Profile. See the [list of supported PQL queries](../../technical_overview/unified_profile_architectural_overview/unified_profile_supported_queries.md) for available options.

You can create a new segment definition by making a POST request to the `/segment/definitions` endpoint in the Real-time Customer Profile API. The following example outlines how to format a definition request, including what information is required in order for a segment to be defined successfully.

#### API format

```http
POST /segment/definitions
```

#### Request

The following request creates a new segment definition for a schema called "MyProfile".

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/segment/definitions \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
        "name": "My Sample Cart Abandons Segment Definition",
        "schema": {
            "name": "MyProfile",
        },
        "expression": {
            "type": "PQL",
            "format": "pql/text",
            "value": "xEvent.metrics.commerce.abandons.value > 0",
        },
        "mergePolicyId": "mpid1",
        "description": "This Segment represents those users who have abandoned a cart"
    }'
```

* `name`: (**Required**) A unique name by which to refer to the segment. 
* `schema`: (**Required**) The schema associated with the entities in the segment. Consists of either an `id` or `name` field.
* `expression`: (**Required**) An entity containing the following fields:
  * `type`: Specifies the expression type. Currently only "PQL" is supported.
  * `format`: Indicates the structure of the expression in `value`. 
    * You can choose between two possible formats:
      * `pql/text`: A textual representation of a segment definition, according to the published PQL grammar.  For example, `workAddress.stateProvince = homeAddress.stateProvince`.
      * `pql/json`: A segment definition in JSON format. For more information regarding JSON-formatted queries, see the [JSON section](../../technical_overview/unified_profile_architectural_overview/unified_profile_supported_queries.md#json-formatted-queries) in the [Supported PQL queries guide](../../technical_overview/unified_profile_architectural_overview/unified_profile_supported_queries.md).
  * `value`: An expression that conforms to the type indicated in `format` to select records from "MyProfile".
* `mergePolicyId`: The identifier of the merge policy to use for the exported data. See the [merge policy configuration tutorial](../../tutorials/configuring_up_tutorial/configuring_merge_policies_tutorial.md) for more information.
* `description`: A human readable description of the definition.

#### Response

A successful response returns the details of the newly created segment definition, including its system-generated, read-only `id` which will be used later in this tutorial.

```json
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

## Estimate and preview an audience

As you develop your segment definition, you can use the estimate and preview tools within Real-time Customer Profile to view summary-level information to help ensure you are isolating the expected audience. Estimates provide statistical information on a segment definition, such as the projected audience size and confidence interval. Previews provide paginated lists of qualifying profiles for a segment definition, allowing you to compare the results against what you expect.

By estimating and previewing your audience, you can test and optimize your PQL predicates until they produce a desireable result, where they can then be used in an updated segment definition.

There are two required steps to preview or get an estimate of your segment:

1. [Create a preview job](#create-a-preview-job)
1. [View estimate or preview](#view-an-estimate-or-preview) using the ID of the preview job
  
### How estimates are generated

Data samples are used to evaluate segments and estimate the number of qualifying profiles. New data is loaded into memory each morning (between 12AM-2AM PT, which is 7-9AM UTC), and all segmentation queries are estimated using that day's sample data. Consequently, any new fields added or additional data collected will be reflected in estimates the following day.

The sample size depends on the overall number of entities in your profile store. These sample sizes are represented in the following table:

Entities in profile store | Sample size
--- | ---
Less than 1 million | Full data set
1 to 20 million | 1 million
Over 20 million | 5% of total

Estimates generally run over 10-15 seconds, beginning with a rough estimate and refining as more records are read.

### Create a preview job

You can create a new preview job by making a POST request to the `/preview` endpoint.
 
#### API format

```http
POST /preview
```

#### Request

The following request creates a new preview job. The request body contains the query information related to the segment.

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/preview \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
  -d '{
        "predicateExpression": "xEvent.metrics.commerce.abandons.value > 0",
        "predicateType": "pql/text",
        "predicateModel": "_xdm.context.profile",
        "graphType": "simple",
        "mergeStrategy": "simple"
    }'
```

* `predicateExpression`: The PQL expression to query the data by.
* `predicateModel`: The name of the XDM schema the Profile data is based on.

#### Response

A successful response returns the details of the newly created preview job, including its ID and current processing state.

```json
{
   "state": "RUNNING",
   "previewQueryId": "4a45e853-ac91-4bb7-a426-150937b6af5c",
   "previewQueryStatus": "RUNNING",
   "previewId": "MDoyOjRhNDVlODUzLWFjOTEtNGJiNy1hNDI2LTE1MDkzN2I2YWY1Yzo0Mg",
   "previewExecutionId": 42
}
```

* `state`: The current state of the preview job. Will be "RUNNING" until processing is complete, at which point it becomes "RESULT_READY" or "FAILED".
* `previewId`: The ID of the preview job, to be used for lookup purposes when viewing an estimate or preview, as outlined in the following section.

### View an estimate or preview

Estimate and preview processes are run asynchronously as different queries can take different lengths of time to complete. Once a query has been initiated, you can use API calls to retrieve (GET) the current state of the estimate or preview as it progresses.

Using the Real-time Customer Profile API, you can lookup a preview job's current state by its ID. If the state is "RESULT_READY", you can view the results. Depending on whether you want to view an estimate or a preview, each have their own endpoint in the API. Examples for both are provided below.

**View an estimate**

#### API format

```http
GET /estimate/{previewId}
```

* `{previewId}`: The ID of the preview job you want to access.

#### Request

The following request retrieves an estimate, using the `previewId` created in the previous step.

```shell
curl -X GET \
  https://platform.adobe.io/data/core/ups/estimate/MDoyOjRhNDVlODUzLWFjOTEtNGJiNy1hNDI2LTE1MDkzN2I2YWY1Yzo0Mg \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

A successful response returns the details of the estimate.

```json
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
* `state`: The current state of the preview job. Will be "RUNNING" until processing is complete, at which point it becomes "RESULT_READY" or "FAILED".
* `_links > preview`: When the preview job's current state is "RESULT_READY", this attribute provides a URL to view the estimate.

**View a preview**

#### API format

```http
GET /preview/{previewId}
```

* `{previewId}`: The ID of the preview job you want to view.

#### Request

The following request retrieves a preview, using the `previewId` created in the previous step.

```shell
curl -X GET \
  https://platform.adobe.io/data/core/ups/preview/MDoyOjRhNDVlODUzLWFjOTEtNGJiNy1hNDI2LTE1MDkzN2I2YWY1Yzo0Mg \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

A successful response returns the details of the preview.

```json
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
         "XID_ADOBE-MARKETING-CLOUD-ID-3": {
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
      "size": 3
   }
}
```

## Segment your user base

Once you have developed, tested, and saved your segment definition, you can create a segment job to build an audience  using the Real-time Customer Profile API.

### Create a segment job

A segment job is an asynchronous process that creates a new audience segment. It references a segment definition, as well as any merge policies controlling how Real-time Customer Profile merges overlapping attributes across your profile fragments. When a segment job successfully completes, you can gather various information about your segment, such as any errors that may have occurred and the ultimate size of your audience.

You can create a new segment job by making a POST request to the `/segment/jobs` endpoint in the Profile API.

#### API format

```http
POST /segment/jobs
```

#### Request

The following request creates a new segment job based on the two segment definitions provided in the payload.

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/segment/jobs \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '[
        {
          "segmentId" : "42f49f2d-edb0-474f-b29d-2799d89cd5a6"
        },
        {
          "segmentId" : "54a20f19-9a0w-293a-9b82-409b1p3v0192"
        }
    ]'
```

* `segmentId`: The identifier of a segment definition from which to build the audience. At least one segment ID must be supplied in the payload array.

#### Response

A successful response returns the details of the newly created segment job.

```json
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
        },
        {
            "segmentId": "54a20f19-9a0w-293a-9b82-409b1p3v0192",
            "segment": {
                "id": "54a20f19-9a0w-293a-9b82-409b1p3v0192",
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
                "name": "USA3",
                "ttlInDays": 1
            }
        }
    ],
    "updateTime": 1533581808162,
    "imsOrgId": "{IMS_ORG}",
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
* `id`: The identifier of the new segment job, used for lookup purposes later in this tutorial.
* `status`: The current status of the segment job. Will be "PROCESSING" until processing is complete, at which point it becomes "SUCCEEDED" or "FAILED".

Once a segment job is created, you can use the `id` returned to lookup (GET) the job's current status.

#### API format

```http
GET /segment/jobs/{segmentJobId}
```

* `{segmentJobId}`: The identifier of the segment job you want to access.

#### Request

```shell
curl -X GET \
  https://platform.adobe.io/data/core/ups/segment/jobs/80388706-29fa-40d3-81cf-a297d0224ad9 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

A successful response returns the details of the segmentation job, and will provide different information depending on the job's current status.

```json
{
    "profileInstanceId": "ups",
    "errors": [],
    "computeJobId": 13377,
    "modelName": "_xdm.context.profile",
    "id": "80388706-29fa-40d3-81cf-a297d0224ad9",
    "status": "SUCCEEDED",
    "segments": [
        {
            "segmentId": "b560a09a-de85-4a1c-8477-2f3da1d9e86b",
            "segment": {
                "id": "b560a09a-de85-4a1c-8477-2f3da1d9e86b",
                "version": 1,
                "expression": {
                    "type": "PQL",
                    "format": "pql/json",
                    "value": "homeAddress.country = \"US\""
                },
                "mergePolicy": {
                    "id": "0bf16e61-90e9-4204-b8fa-ad250360957b",
                    "version": 1
                }
            },
            "snapshot": {
                "name": "",
                "ttlInDays": 0
            }
        }
    ],
    "requestId": "prgu92v4VNvsGuuXticcsqX96UXGjXtS",
    "computeGatewayJobId": "a7c33b77-3aeb-497f-bc88-807915c57b5f",
    "metrics": {
        "totalTime": {
            "startTimeInMs": 1547063631503,
            "endTimeInMs": 1547063731181,
            "totalTimeInMs": 99678
        },
        "profileSegmentationTime": {
            "startTimeInMs": 1547063669001,
            "endTimeInMs": 1547063720887,
            "totalTimeInMs": 51886
        }
    },
    "updateTime": 1547063731181,
    "imsOrgId": "{IMS_ORG}",
    "creationTime": 1547063631503,
    "_links": {
        "cancel": {
            "href": "/segment/jobs/80388706-29fa-40d3-81cf-a297d0224ad9",
            "method": "DELETE"
        },
        "checkStatus": {
            "href": "/segment/jobs/80388706-29fa-40d3-81cf-a297d0224ad9",
            "method": "GET"
        }
    }
}
```

Repeat the above API call to continue retrieving the segment job until the `status` reaches "SUCCEEDED", indicating that you can export the segment to a dataset.

## Export the segment

After a segmentation job has successfully completed (its `status` attribute has reached "SUCCEEDED"), you can export your audience to a dataset where it can be accessed and acted upon. 

The following steps are required to export your audience:

1. [Create a target dataset](#create-a-target-dataset) - Create the dataset to hold audience members.
1. [Generate audience profiles in the dataset](#generate-xdm-profiles-for-audience-members) - Populate the dataset with XDM Profiles based on the results of a segment job.
1. [Monitor export progress](#monitor-export-progress) - Check the current progress of the export process. 
1. [Read audience data](#read-audience-data) - Retrieve the resulting XDM Profiles representing the members of your audience.

### Create a target dataset

An audience must be exported to a dataset that is enabled for persisting in the union view schema, but not enabled for Real-time Customer Profile itself.

The following section demonstrates how to create such a dataset using the [Catalog Service API](../../../../../../acpdr/swagger-specs/catalog.yaml). If you already have a compatible dataset and know its ID, you can proceed to the next step on [generating audience profiles](#generate-xdm-profiles-for-audience-members).

#### API format

```http
POST /dataSets
```
#### Request

The following request creates a new dataset, providing configuration parameters in the payload.

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/catalog/dataSets \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
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

* `name`: A descriptive name for the dataset.
* `schemaRef > id`: The ID of the union view that the dataset will be associated with.
* `fileDescription > persisted`: When set to true, this enables the dataset to persist in the union view.

#### Response

A successful response returns an array containing the read-only, system generated ID of the newly created dataset. Each dataset ID is unique. This ID will be used for lookup purposes later in this tutorial.

```json
[
  "@/datasets/5b020a27e7040801dedba61b"
] 
```

### Generate XDM Profiles for audience members

Once you have a union-persisting dataset, you can create an export job to persist the audience members to the dataset by providing the `datasetId` and the segments to export in a POST request to the `/export/jobs` endpoint in the Real-time Customer Profile API.

#### API format

```http
POST /export/jobs
```

#### Request

The following request creates a new export job, providing configuration parameters in the payload.

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/export/jobs \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
    "fields": "identities.id,personalEmail.address",
    "mergePolicy": {
      "id": "e5bc94de-cd14-4cdf-a2bc-88b6e8cbfac2",
      "version": 1
    },
    "filter": {
      "segments": [
        {
          "segmentId": "4edc8488-2c35-4f6d-b4c6-9075c68d2df4",
          "segmentNs": "ups"
        }
      ],
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
      "datasetId": "5b020a27e7040801dedba61b"
    },
    "schema": {
      "name": "_xdm.context.profile"
    }
  }'
```

* `fields` - *(Optional)* Limits the data fields to be included in the export to only those provided in this parameter. The same parameter is also available when creating a segment, as discussed in the [Segment your user base](#segment-your-user-base) section earlier in this document. Therefore, the fields in the segment may have already been filtered. Omitting this value will result in all fields being included in the exported data.
* `mergePolicy`: *(Optional)* Specifies the merge policy to govern the exported data. Include this parameter when there are multiple segments being exported. Omitting this value will cause the Export Service to use the merge policy provided by the segment.
  * `id`: The ID of the merge policy.
  * `version`: The specific version of the merge policy to use. Omitting this value will default to the most recent version.
* `filter`: *(Optional)* Specifies one or more of the following filters to apply to the segment before export:
  * `segments`: Specifies the segments to export. Omitting this value will result in all data from all segments being exported. Accepts an array of segment objects, each containing a `segmentId` attribute populated with the ID of the segment to export. If applicable, the listed objects can also include the namespace of the segment under a `segmentNs`attribute.
  * `fromIngestTimestamp`: Limits exported profiles to only include those that have been updated after this timestamp. The timestamp must be provided in [RFC 3339](https://tools.ietf.org/html/rfc3339) format.
* `additionalFields > eventList`: *(Optional)* Controls the time series event fields exported for child or associated objects by providing one or more of the following settings:
  * `fields`: Control the fields to export.
  * `filter`: Specifies criteria that limits the results included from associated objects. Expects a minimum value required for export, typically a date.
      * `fromIngestTimestamp`: Filters time series events to those that have been ingested after the provided timestamp. This is not the event time itself but the ingestion time for the events.
* `destination > datasetId`: (**Required**) The ID of the dataset which will persist the audience members meeting the conditions of the related segment definition.
* `schema > name`: (**Required**) The name of the schema associated with the dataset being exported to.

#### Response

A successful response returns a dataset populated with profiles that qualified for the last completed run of the segment job. Any profiles that may have previously existed in the dataset but did not qualify for the segment during the last completed run of the segment job, have been removed.

```json
{
    "profileInstanceId": "ups",
    "jobType": "BATCH",
    "filter": {
      "segments": [
        {
          "segmentId": "39549c64-0090-4c06-8a96-c8f7b212144e"
        }
      ]
    },
    "id": 24115,
    "schema": {
        "name": "_xdm.context.profile"
    },
    "mergePolicy": {
        "id": "0bf16e61-90e9-4204-b8fa-ad250360957b",
        "version": 1
    },
    "status": "NEW",
    "requestId": "IwkVcD4RupdSmX376OBVORvcvTdA4ypN",
    "computeGatewayJobId": {},
    "metrics": {
        "totalTime": {
            "startTimeInMs": 1559674261657
        }
    },
    "destination": {
        "datasetId": "5cf6bcf79ecc7c14530fe436",
        "batchId": ""
    },
    "updateTime": 1559674261868,
    "imsOrgId": "{IMS_ORG}",
    "creationTime": 1559674261657
}
```

### Monitor export progress

As the export job processes, monitor its status by making GET requests to the `/export/jobs/{exportJobId}` endpoint until the job's `status` reaches "SUCCEEDED".

#### API format

```http
GET /export/jobs/{exportJobId}
```

* `{exportJobId}`: The ID of the export job you want to access.

#### Request

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/export/jobs/24115 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

```json
{
  "profileInstanceId": "ups",
  "jobType": "BATCH",
  "filter": {
    "segments": [
      {
        "segmentId": "39549c64-0090-4c06-8a96-c8f7b212144e"
      }
    ]
  },
  "id": 24115,
  "schema": {
    "name": "_xdm.context.profile"
  },
  "mergePolicy": {
    "id": "0bf16e61-90e9-4204-b8fa-ad250360957b",
    "version": 1
  },
  "status": "SUCCEEDED",
  "requestId": "YwMt1H8QbVlGT2pzyxgwFHTwzpMbHrTq",
  "computeGatewayJobId": {
    "exportJob": "305a2e5c-2cf3-4746-9b3d-3c5af0437754",
    "pushJob": "963f275e-91a3-4fa1-8417-d2ca00b16a8a"
  },
  "metrics": {
    "totalTime": {
      "startTimeInMs": 1547053539564,
      "endTimeInMs": 1547054743929,
      "totalTimeInMs": 1204365
    },
    "profileExportTime": {
      "startTimeInMs": 1547053667591,
      "endTimeInMs": 1547053778195,
      "totalTimeInMs": 110604
    },
    "aCPDatasetWriteTime": {
      "startTimeInMs": 1547054660416,
      "endTimeInMs": 1547054698918,
      "totalTimeInMs": 38502
    }
  },
  "destination": {
    "datasetId": "5cf6bcf79ecc7c14530fe436",
    "batchId": "c2591d40a1e04bb78228974f6eb4d5bc"
  },
  "updateTime": 1547054743929,
  "imsOrgId": "{IMS_ORG}",
  "creationTime": 1547053539564
}
```

* `batchId`: The identifier of the batch created from a successful export, to be used for lookup purposes when reading audience data as outlined in the next section.

### Read audience data

Once the export successfully completes, you can use the [Data Access API](../../../../../../acpdr/swagger-specs/data-access-api.yaml) to access the data using the `batchId` associated with the export. Depending on the size of the segment, the data may be in chunks and the batch may consist of several files.

For more information on using the Data Access API to access and download batch files, see the [Data Access tutorial](../../tutorials/data_access_tutorial/data_access_tutorial.md).

## Next steps

By following this tutorial, you have successfully created an audience segment from your profile store and persisted it to a dataset. See the [Data Access tutorial](../../tutorials/data_access_tutorial/data_access_tutorial.md) for steps on how to access and download the segment.