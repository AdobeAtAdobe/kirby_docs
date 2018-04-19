# Unified Profile Overview

## 1. Overview

The Unified Profile Service (UPS) in Adobe Cloud Platform provides a Unified, 360° Consumer Profile that enables marketers to drive coordinated, consistent and relevant experiences with their audiences across channels. With Unified Profile, you have one place to go to get a holistic view of your entire user base aggregated across all systems, as well as actionable timestamped account of every event they've had in any of your systems, when you need it.

![Unified Profile In Action](up-in-action.png)

### 1.1 Audience

This document is aimed at technical personas and should be a useful tool for all users that need to:

* Consume Adobe Cloud Platform APIs
* Understand Adobe Cloud Platform Architecture
* Understand how the Unified Profile works with Adobe Cloud Platform
* Architect integrations between customer-owned and 3rd party systems and Adobe Cloud Platform

### 1.2 Version Information
*Version* : Preview

### 1.3 License Information
*Terms of service* : https://www.adobe.com/legal/terms.html

### 1.4 URI Scheme
*Host* : __platform.adobe.io__  
*BasePath* : __/data/core/ups/__   
*Schemes* : __HTTPS__ 

### 1.5 About the Docs
The HTML rendition of this documentation is kept up-to-date on a per commit basis and can therefore change without announcement. If you require a persistent version of the documentation, it is recommended that you seek out the PDF rendition.

### 1.6 Unified Profile in Adobe Cloud Platform

Unified Profile provides cohesion of data across any standardized DataSets you choose to onboard.

![Unified Profile In Action](up-in-acp.png)

### 1.7 Using the API

This document describes interacting with UPS using Adobe's Platform APIs. See the [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html) for information on how to access these services.

---

## 2. Ingesting XDM Data

UPS maintains XDM data in the Profile Store which can be updated via batch or stream ingestion. 

### 2.1 Batch Ingestion of Profile XDM DataSets

XDM data can be ingested into the Unified Profile Service based on and triggered by batch data being [ingested](../ingest_architectural_overview/ingest_architectural_overview.md) and managed by Data Catalog Service. 

Both enablement and configuration for ingestion by Unified Profile are handled by a Tag on a DataSet, named specifically "unifiedProfile". The following is an example Patch request adding the "unifiedProfile" Tag, where the `enabled` property set to true enables the DataSet for ingestion into UPS. The `identityField` Tag property names the location in the XDM schema of the primary identity field; `identities.id` in the example below. Dot-notation is used to specify attributes within a hierarchy. For more information, see information on PQL [here](unified_profile_pql.md). 

> If the value named by `identityField` is in an array, the first element in the array will be used

__Example Data Catalog Service request - Add Unified Profile configuration tag:__

```
PATCH https://platform.adobe.io/data/foundation/catalog/dataSets/5a7d26e92a6e55000086d459 HTTP/1.1

Body:

{
    "tags" :  {
        "unifiedProfile": ["enabled:true", "identityField:identities.id"]
    }
}
```

### 2.2 Batch Ingestion of ExperienceEvent XDM DataSets

Time-series data, or ExperienceEvents, are referenced in the context of another XDM Schema. As such, the Tag for enabling ingestion of ExperienceEvents requires an `orderField` which would be used to order query results, and a `relatedModels` attribute indicating the XDM Schema it's related to. Initial releases limit ExperienceEvents to being related to only XDM Profiles, or Extensions of the XDM Profile Schema.    

```
PATCH https://platform.adobe.io/data/foundation/catalog/dataSets/5a7d26e92a6e55000086d459 HTTP/1.1

Body:

{
    "tags" :  {
        "unifiedProfile": ["enabled:true", "identityField:endUserIds._vendor.adobe.experience.analytics.id.id", "orderField:timestamp", "relatedModels:Profile"]
    }
}
```

---

## 3. Accessing Profiles in the Unified Profile Service

This section describes the methods for accessing Unified Profiles as they exist in the Profile Store. 

### 3.1 Access Unified Profile By Record ID

Accessing an object by ID retrieves all properties of that object as an XDM Model. The following example demonstrates the use of the `fields` parameter to limit the fields returned. 

___Example Unified Profile Service request for a Unified Profile:___

```
GET https://platform.adobe.io/data/core/ups/models/profile/5a7d26e92a6e55000086d459?fields=person.firstName,person.lastName,emails.address HTTP/1.1

Example Response: 

{
  "person": {
    "firstName": "Paul",
    "lastName": "Pennington"
  },
  "emails": [
    {
      "address": "ppennington@email.com"
    }
  ]
}
```

### 3.2 Access ExperienceEvents by Profile Record ID

Access a paginated list of ExperienceEvents for a given XDM Profile. 

___Example Unified Profile Service request for ExperienceEvents for a Unified Profile:___

```
GET https://platform.adobe.io/data/core/ups/models/profile/5a7d26e92a6e55000086d459/ExperienceEvent HTTP/1.1

Example Response: 

{
  "records":[
    {
      "recordId": string,
      "sourceId": string,
      "timestamp": string,
      "record": JSON
    }
  ],
  "page":{
      "sortField": string,
      "sort": string,
      "pageOffset": string,
      "pageSize": number
  },
  "link":{
    "next": string
  }
}
```



---

## 4. Segmenting Your Base - Creating and Working with Audiences

The cornerstone of your marketing campaign is your audience. Unified Profile Service provides the tools for segmenting your user base into Audiences consisting of members meeting criteria with exactly the precision you require. With segmentation, you can isolate members of your user base by criteria such as:

* Users for whom one week has passed since last making a purchase
* Users for whom the sum of the purchases is greater than $10,000 
* Users who have seen a campaign and then clicked on it within 30 minutes, for any 3 of a list of campaigns specified by their campaign id

Unified Profile Segmentation behaves on/with the following components:

* __Segments__ are classified subsets of your user base, such as "Men over 50"
* __Predicates__ define the Segment rules in terms of the conditions that an XDM object must meet to qualify for a Segment
* __Segmentation Jobs__ are asynchronous processes which isolate members of your user base per the rules described by a Predicate
* An __Audience__ is the collection of XDM objects which met the qualifications, or conditions, as set out by the Segment Predicate

Segmentation is supported for XDM Profile and ExperienceEvent schemas, with plans to expand to include additional schemas in the future. Segmentation is handled in the steps described by the remainder of this section. In summary, the following tasks are involved in Segmentation and are detailed in this section:

* __Develop a Predicate__ - Determine and design the criteria that objects must meet to qualify for your Segment, and write the query representation of those rules
* __Estimate and Preview Your Audience__ - As a step in the iterations of writing and testing your Predicate, Process your Predicate in a summary mode, gleaning information summarizing your Audience as well as the progress of the asynchronous Preview Job
* __Segment Your Audience__ - Create a reusable Predicate and use Segment Jobs to keep that Audience current and relevant
* __Get Results__ - Using the Scan API, persist Audience members to a Profile DataSet

### 4.1 Develop a Predicate

A Predicate encapsulates the complete set of criteria that define a specific Audience, written as a query in Adobe's proprietary Profile Query Language (PQL) specifically designed for building queries on XDM data. The following summarizes PQL, though more in-depth detail can be found [here](unified_profile_pql.md). In the context of this section, to develop the Predicate is to compose the PQL query describing the desired Audience.

* Queries may be over Profile-only (e.g. [q1](unified_profile_supported_queries.md#q1)), ExperienceEvent-only (e.g. [q5](unified_profile_supported_queries.md#q5)), or a combination of Profile and ExperienceEvent ([q11](unified_profile_supported_queries.md#q11)).
* Queries can contain variables, which simplify or make clearer a single field or a composite value resulting from a calculation or condition (e.g. [q10](unified_profile_supported_queries.md#q10): two orders within a two-week period).
* Operators/functions:
  * Boolean operators (and, or, not) - e.g. [q2](unified_profile_supported_queries.md#q2).
  * Equality, inequality (=, !=)
  * Numerical comparisons (<, >, <=, >=) - e.g. [q1](unified_profile_supported_queries.md#q1), [q3](unified_profile_supported_queries.md#q3).
  * Time series conditions: occurs - e.g. [q7](unified_profile_supported_queries.md#q7), [q10](unified_profile_supported_queries.md#q10).
  * Others: like, in - e.g. [q2](unified_profile_supported_queries.md#q2), [q4](unified_profile_supported_queries.md#q4).
  * Set formation over variable definitions: {} - e.g. [q6](unified_profile_supported_queries.md#q6)-[q11](unified_profile_supported_queries.md#q11).
  * Count


#### 4.1.1 Optionally Persist the Predicate

All processes and jobs within the Unified Profile Service that use or reference PQL allow for Predicates to be used in PQL form within the call. Additionally, a Predicate could be persisted to the Experience Cloud Platform to be reused by ID. This is helpful in creating a centrally-managed collection of queries to be reused, and simplifying API calls.  

__Example request to create a new Predicate:__

```
POST https://platform.adobe.io/data/core/ups/segment/predicates HTTP/1.1

Body:

{
    "name": "My Sample Cart Abandons Segment Predicate",
    "type": "PQL",
    "description": "This segment represents those users who have abandoned a cart",
    "expression": "xEvent.metrics.commerce.abandons.value > 0"
}

Example Response:

{
  "id": "1234",
  "name": "My Sample Segment Predicate",
  "type": "PQL",
  "description": "This segment represents the users who like PS.",
  "expression": "TBD - Segment Language NOT FINALIZED",
  "createdAt": "2018-04-17T20:04:39.674Z",
  "createdBy": "1111111111111",
  "updatedAt": "2018-04-17T20:04:39.675Z",
  "updatedBy": "22222222222",
  "_links": {
    "self": {
      "href": "string",
      "templated": true,
      "type": "string",
      "deprecation": "string",
      "profile": "string",
      "title": "string",
      "hreflang": "string",
      "name": "string"
    }
  }
}
```

#### 4.1.2 Supported Query Types

You can find a list of supported PQL query examples [here](unified_profile_supported_queries.md), and more detailed information covering the Profile Query Language [here](unified_profile_pql.md).

### 4.2 Estimate and Preview Your Audience

The Preview API allows for a direct path between Predicate query and the qualifying/relevant Audience. This is useful in testing your Predicate expression as you build it, or for one-time queries. You can find a list of supported PQL queries and more information [here](unified_profile_supported_queries.md).

Previewing an audience consists of creating and initializing a Preview Session which is used to send Predicate expressions for asynchronous processing. 

#### 4.2.1 Estimate and Preview Audience - Step 1:  Create a Preview Session

Create an interactive Session for performing Preview operations using the `POST https://platform.adobe.io/data/core/ups/previewsession` API call. The state of the Preview Session will be `STARTING`.

#### 4.2.2 Estimate and Preview Audience - Step 2: Wait for Completion

Creating a Session is an asynchronous operation. Poll using the `GET https://platform.adobe.io/data/core/ups/previewsession/{previewSessionId}` API call for status using the `previewSessionId` returned from Step 1. You may initialize the Session once the it has reached the state `READY_TO_INITIALIZE`. 

#### 4.2.3 Estimate and Preview Audience - Step 3: Initialize a Session

Use the `POST https://platform.adobe.io/data/core/ups/previewsession/{previewSessionId}/initialize` API call to initialize the Preview Session when it has reached the `READY_TO_INITIALIZE` state. 

#### 4.2.4 Estimate and Preview Audience - Step 4: Wait for Completion

While initializing, the Preview Session will be in the `BUSY` state. Poll using the `GET https://platform.adobe.io/data/core/ups/previewsession/{previewSessionId}` API call for status until the Preview Session reaches the `READY` state.  

#### 4.2.5 Estimate and Preview Audience - Step 5: Submit Preview Jobs

With an initialized Session, you are able to submit a PQL expression for evaluation using the `POST https://platform.adobe.io/data/core/ups/preview/{previewSessionId}` API call, passing a Predicate query and the model against which to run it. The response of this call provides the IDs required to poll for state and retrieve the resulting Audience using the `GET https://platform.adobe.io/data/core/ups//preview/{previewSessionId}/execution/{previewExecutionId}` call. This call supports the use of You can includes a `previewExecutionId` which can be used to poll for execution state.

#### 4.2.6 Estimate and Preview Audience - Step 6: Iteratively Estimate and Wait for Completion

Poll using the `GET https://platform.adobe.io/data/core/ups/preview/{previewSessionId}/execution/{previewExecutionId}` API call. When the response of this call report a `state` of "RESULT_READY", results can be gleaned from the `results` in the response. 

During job processing, Estimate information covering the progress of the Preview Job and what information has been gleaned of the Segment of the job can be accessed using the `GET https://platform.adobe.io/data/core/ups/estimate/{previewSessionId}/execution/{previewExecutionId}` API call. Job Estimate information is refreshed each 5 minutes during processing. 

__Example Preview Job Estimate:__

> TODO: Explanation needed - what is estimatedSize, standardError, confidenceInterval, profilesReadSoFar, profilesMatchedSoFar...

```
{
  "estimatedSize": 0,
  "standardError": 0,
  "confidenceInterval": "98.6%",
  "profilesReadSoFar": 0,
  "profilesMatchedSoFar": 0,
  "_links": {
    "preview": "string"
  }
}
``` 

#### 4.2.7 Estimate and Preview Audience - Step 7: Read Results

When the response of the `GET https://platform.adobe.io/data/core/ups/preview/{previewSessionId}/execution/{previewExecutionId}` API call shows a `state` of "RESULT_READY", you are able to access the results. Preview results are returned in an abbreviated form; providing IDs and links to retrieve each object. Results are paginated, where `next` and `prev` associated links (provided as `_links` in the response) provide the means by which to traverse back and forth through the pages.

```
GET https://platform.adobe.io/data/core/ups/preview/{previewSessionId}/execution/{previewExecutionId}  HTTP/1.1

Example Response:

{
    "XID_ADOBE-MARKETING-CLOUD-ID-1": {
        "_href" : "https://platform.adobe.io/data/core/ups/models/profile/XID_ADOBE-MARKETING-CLOUD-ID-1",
        "endCustomerIds" : {
            "XID_COOKIE_ID_1" : {
                "_href" : "https://platform.adobe.io/data/core/ups/models/profile/XID_COOKIE_ID_1"
            },
            "XID_PROFILE_ID_1" : {
                "_href" : "https://platform.adobe.io/data/core/ups/models/profile/XID_PROFILE_ID_1"
            }
        }
    },
    "XID_COOKIE-ID-2": {
        "_href" : "https://platform.adobe.io/data/core/ups/models/profile/XID_COOKIE-ID-2" ,
        "endCustomerIds" : {
            "XID_COOKIE_ID_2-1" : {
                "_href" : "https://platform.adobe.io/data/core/ups/models/profile/XID_COOKIE_ID_2-1"
            },
            "XID_PROFILE_ID_2" : {
                "_href" : "https://platform.adobe.io/data/core/ups/models/profile/XID_PROFILE_ID_2"
            }
        }
    },
    "XID_ADOBE-MARKETING-CLOUD-ID-1000": {
        "_href" : "https://platform.adobe.io/data/core/ups/models/profile/XID_ADOBE-MARKETING-CLOUD-ID-1000" 
    },
    "_links" : {
        "_self" : "https://platform.adobe.io/data/core/ups/preview?predicate.expression=<expr-1>&limit=1000",
        "next" : "",
        "prev" : ""
    }
}
```

#### 4.2.8 Estimate and Preview Audience - Step 8: Delete the Preview Execution

You can submit several Predicates for processing (starting with step 5) using the same Preview Session, but you must delete the Preview Execution prior to submitting subsequent queries.

```
DELETE https://platform.adobe.io/data/core/ups/preview/{previewSessionId}/execution/{previewExecutionId}  HTTP/1.1
```

### 4.3 Create a Segment Job

A Segment Job is an asynchronous process which isolates members of your user base per one or more Predicates. Once a Segment The [Scan API](#scan-api) is used to access these Audiences by the `sink` name configured which, in the example below, is "Profile_Segmented".

__Example request to create a Segment Job:__

```
POST https://platform.adobe.io/data/core/ups/segment/jobs HTTP/1.1

Body:

{
    "type": "BATCH",
    "predicateIds": "1234",
    "model": "Profile",
    "sink": "Profiles_Segmented"
}

Example Response:

{
    "status": true,
    "segmentJob": {
        "id": 3456,
        "type": "string",
        "imsOrgId": "string",
        "status": "string",
        "progress": "string",
        "predicateIds": "string",
        "predicates": "string",
        "model": "string",
        "computeJobId": 0,
        "dataStart": "string",
        "dataEnd": "string",
        "dataGraphType": "coop",
        "sink": "Profiles_Segmented",
        "mergeStrategy": "string",
        "creationTime": "2018-03-20T08:08:43.952Z",
        "updateTime": "2018-03-20T08:08:43.952Z"
    }
}
```

Segment Jobs run asynchronously, and a job's `status` can be checked by retrieving a Segment Job by ID (returned from creating the Segment Job), which will return its status.

```
GET https://platform.adobe.io/data/core/ups/segment/jobs/3456 HTTP/1.1

Example Response:

{
    "status": true,
    "segmentJob": {
        "id": 3456,
        "type": "string",
        "imsOrgId": "string",
        "status": "string",
        "progress": "string",
        "predicateIds": "string",
        "predicates": "string",
        "model": "string",
        "computeJobId": 0,
        "dataStart": "string",
        "dataEnd": "string",
        "dataGraphType": "string",
        "sink": "string",
        "mergeStrategy": "string",
        "creationTime": "2018-03-20T08:24:07.200Z",
        "updateTime": "2018-03-20T08:24:07.200Z"
    }
}
```

Repeat the call to retrieve your Segment Job until the `status` reaches "SUCCEEDED", indicating the job is ready to be run. 

<a name="scan-api"></a>
### 4.4 Scan Your Audience

The Scan API is used to isolate an Audience built by a Segment Job for access. Once a Segment Job has completed running (its `status` attribute has reached "SUCCEEDED"), the Scan API can be used to generate XDM Profiles for each member of that Audience in your chosen DataSet.  In summary, the following steps are required to Scan your Audience:

* __Identify your DataSet__ - A DataSet should be created to hold each Audience
* __Generate Audience Profiles in DataSet__ - Scan Jobs populate the results of a Segment Job as Profiles in a DataSet
* __Wait for Audience Profiles to Complete Persisting__ - Scan Jobs are asynchronous. GET a Segment Job until its status indicates completion
* __Delete Scan Job__ - It is good practice to delete Scan Jobs unless they are meant to be reused
* __Read Audience Data__ - Using the Data-Access-SDK, retrieve the Profiles of the members of your Audience 

#### 4.4.1 Scan Audience - Step 1: Create or Select Audience DataSet

A DataSet used to store Audiences can be reused, but must exist prior to running the Scan, and must have been created with the following properties (either via the API or UI), where `schema` must be a Standard XDM Profile or an extension of a Standard XDM Profile. The following is an example:

```
POST https://platform.adobe.io/data/foundation/catalog/dataSets HTTP/1.1

Body:

{
  "fileDescription" : {
    "persisted": true,
    "containerFormat": "parquet",
    "format": "parquet"
  },
  "schema" : "@/xdms/model/Profile"
}

Response:

[
    "@/dataSets/MyIsolatedProfilesDS_Id"
]
```

> You will use this DataSet ID in other API calls

#### 4.4.2 Scan Audience - Step 2: Generate XDM Profiles for Audience Members

Trigger a Scan Job to refresh the Audience Member DataSet named by the `datasetId` attribute of the request body. The result is a DataSet which represents only those Profiles which qualified for the last completed run of the Segment Job. The Segment Job is specified by the value for the `model-name` path variable in the URL below is set to the `model` value used to create the Segment Job, and the `sink` value used is the value to use for the `isMemberOfAudience` attribute of the request.

Any members who existed in that DataSet, but did not qualify for the Segment at the time of the last completed run of the Segment Job, will be removed from the DataSet.

```
POST https://platform.adobe.io/data/core/ups/scan/models/<model-name>/jobs HTTP/1.1

Body:

{
    "datasetId" : "MyIsolatedProfilesDS"
    "isMemberOfAudience" : "Profiles_Segmented"
}

Response:

{
    "status": true,
    "scanJob": {
        "id": 306,
        "datasetId" : "MyIsolatedProfilesDS_Id",
        "isMemberOfAudience" : "Profiles_Segmented",
        "status": "PROCESSING/SUCCEEDED/FAILED/NEW",
        "batchId" : "<output-catalog-batch-id-which-contains-data - only-available-when-job-is-success>",
        "type": "BATCH",
        "updateTime": "2018-03-11 22:14:49",
        "imsOrgId": "1BD6382559DF0C130A49422D@AdobeOrg",
        "creationTime": "2018-03-11 22:14:49"
    }
}
```

#### 4.4.3 Scan Audience - Step 3: Wait for Scan to Complete
 
Iteratively retrieve the Scan Job by the `id` supplied in the `scanJob` JSON note of the GET response until the `status` reaches "SUCCEEDED". 

#### 4.4.4 Scan Audience - Step 4: Kill Existing Scan Job

Once the Scan has completed, the Scan Job should be killed.

```
DELETE https://platform.adobe.io/data/core/ups/scan/models/<model-name>/jobs/<id> HTTP/1.1
```

#### 4.4.5 Scan Audience - Step 5: Read Profiles from Audience DataSet

To use the Data-Access-SDK to read data, you must have the `viewId` of your Audience DataSet. The following is an example Data Catalog API call to retrieve the properties, including `viewId`, for your DataSet:

```
GET https://platform.adobe.io/data/foundation/catalog/dataSets/<dataSet-Id> HTTP/1.1

Response:
 
{ 
  "5aa6885ecf70a301dabdfa49": {
     "version": "1.0.1",
     "imsOrg": "1BD6382559DF0C130A49422D@AdobeOrg",
     "name": "untitled",
     "created": 1520863326880,
     "updated": 1520863327034,
     "createdClient": "acp_core_unifiedProfile_feeds",
     "createdUser": "acp_core_unifiedProfile_feeds@AdobeID",
     "updatedUser": "acp_core_unifiedProfile_feeds@AdobeID",
     "namespace": "ACP",
     "viewId": "5aa6885fcf70a301dabdfa4a",
     "aspect": "production",
     "status": "enabled",
     "fields": [...],
     "basePath": "adl://foo.azuredatalakestore.net/platform/1234/dataSetViewId=67899",
     "fileDescription": {
         "persisted": false
     },
     "transforms": "@/dataSets/5aa6885ecf70a301dabdfa49/views/5aa6885fcf70a301dabdfa4a/transforms",
     "files": "@/dataSets/5aa6885ecf70a301dabdfa49/views/5aa6885fcf70a301dabdfa4a/files",
     "schema": "@/xdms/model/Profile",
     "observableSchema": {}
  }
}
```
 
With the `viewId`, you are able to use the Data Access SDK to read data. Data Access SDK is an official SDK provided by Platform foundation to read any data present inside a valid DataSet. For more information on using the Data Access SDK, [see the tutorial](../alltutorials.html#!api-specification/markdown/narrative/tutorials/data_access_tutorial/data_access_tutorial.md), [samples](https://git.corp.adobe.com/experience-platform/data-access-sdk-sample) or [see the project on GitHub](https://git.corp.adobe.com/experience-platform/data-access-sdk). 
 
