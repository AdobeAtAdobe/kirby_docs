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
*Version* : Beta

### 1.3 License Information
*Terms of service* : https://www.adobe.com/legal/terms.html

### 1.4 URI Scheme
*Host* : __platform.adobe.io__  
*BasePath* : __/data/core/up/__   
*Schemes* : __HTTPS__ 

### 1.5 About the Docs
The HTML rendition of this documentation is kept up-to-date on a per commit basis and can therefore change without announcement. If you require a persistent version of the documentation, it is recommended that you seek out the PDF rendition.

### 1.6 Unified Profile in Adobe Cloud Platform

Unified Profile provides cohesion of data across any standardized DataSets you choose to onboard.

![Unified Profile In Action](up-in-acp.png)

### 1.7 Using the API

This document describes interacting with Profile Services using Adobe's Platform APIs. See the [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html) for information on how to access these services.

---

## 2. Ingesting XDM Data

UPS maintains XDM data in the Profile Store which can be updated via batch or stream ingestion. 

### 2.1 Batch Ingestion

XDM data can be ingested into the Unified Profile Service from batch data being [ingested](../allservices.html.html#!api-specification/markdown/narrative/technical_overview/ingest_architectural_overview/ingest_architectural_overview.md) and managed by Data Catalog Service. 

Both enablement and configuration for ingestion by Unified Profile are handled by a Tag on a DataSet, named specifically "unifiedProfile". The following is an example Patch request adding the `unifiedProfile` Tag, where the `enabled` property set to true enables the DataSet for ingestion into UPS. As Unified Profile can contain a number of identifiers from possibly several different systems, identifying the primary identifier is handled using a query string specifying which value in the XDM schema to use. The `identityField` Tag property names the location in the XDM schema of the primary identity field; `endUserIds.mcId.id` in the example below. (Note that the `identityField` will be deprecated once XDM adds support for it)

__Example Data Catalog Service request - Add Unified Profile configuration tag:__

```
PATCH /data/foundation/catalog/dataSets/5a7d26e92a6e55000086d459 HTTP/1.1

Body:

{
    "tags" :  {
        "unifiedProfile": ["enabled:true", "identityField:endUserIds.mcId.id"]
    }
}
```

---

## 3. Accessing Profiles in the Unified Profile Service

Access a Unified Profile as it is stored on the hub. 

### 3.1 Access Unified Profile By Record ID

The following example demonstrates the use of the `fields` parameter to limit the fields returned.

___Example Unified Profile Service request for a Unified Profile:___

```
GET /data/core/ups/models/profile/5a7d26e92a6e55000086d459?fields=endUserIds.mcId.id,person.firstName,person.lastName,emails.address
```

___Example response (given example request):___

```
{
  "endUserIds":
    {
      "mcId": {
        "id": "5a7d26e92a6e55000086d459"
      }
    },
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

---

## 4. Segmenting Your Audience

The cornerstone of your marketing campaign is your audience. Unified Profile Services provides the tools for segmenting your user base into Segments with exactly the precision you require, working with the major components of segmentation.

* __Segments__ are a classified subsets of your user base, such as "Men over 50"
* __Predicates__ define the Segment rules in terms of the conditions that an XDM object must be met to qualify for a Segment
* __Segmentation Jobs__ are scheduled or manually invoked to apply Predicates to your DataSet, creating an Audience
* An __Audience__ is the collection of XDM objects which met the qualifications, or condition, as set out by the Segment Predicate

Segmentation is supported for XDM Profile and ExperienceEvent schemas, with plans to expand to include additional schemas in the future. Segmentation is handled in the steps described by the remainder of this section.

### 4.1 Define a Segment

Your first step is to define the rules for the segment, which is to create the Segment Predicate. Predicates built from Profile (as in CRM data) and ExperienceEvents (as in touchpoint events) can isolate subsets of your user base such as:

* Users for whom one week has passed since last making a purchase
* Users for whom the sum of the purchases is greater than $10,000 
* Users who have seen a campaign and then clicked on it within 30 minutes, for any 3 of a list of campaigns specified by their campaign id

#### 4.1.1 Create a Predicate

Create a Predicate which can then be run by ID or name against XDM data to build your Audience - those XDM objects which qualified for the rule. Predicates are queries built using PQL; a query language designed to build conditions which can be applied to XDM data.  The examples listed below reference a q# shorthand for more detailed examples in section 4.1.2 further in the document. 

* Queries may be over Profile-only (e.g. q1), ExperienceEvent-only (e.g. q5), or a combination of Profile and ExperienceEvent (q11).
* Queries can contain variables, which allow conditions over multiple objects to be specified (e.g. q10: two orders within a two-week period).
* Query validation against XDM schemas.
* Operators/functions:
  * Boolean operators (and, or, not) - e.g. q2.
  * Equality, inequality (=, !=)
  * Numerical comparisons (<, >, <=, >=) - e.g. q1, q3.
  * Time series conditions: occurs - e.g. q7, q10.
  * Others: like, in - e.g. q2, q4.
  * Set formation over variable definitions: {} - e.g. q6-q11.
  * Count


__Example request to create a new Predicate:__

```
POST /data/core/ups/segment/predicates HTTP/1.1

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
    "name": "My Sample Cart Abandons Segment Predicate",
    "type": "PQL",
    "description": "This segment represents those users who have abandoned a cart",
    "expression": "xEvent.metrics.commerce.abandons.value > 0",
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

__Q1 - People with a US address__ 

```
{                             
    "name": "q1",
    "description": "Profiles whose home address is in the US",
    "query": "homeAddress.countryISO = \"US\"" 
}
```

__Q1.1 - People with a home address__

```
{ 
    "name": "q1.1",
    "description": "Profiles which have a home address",
    "query": "homeAddress" 
}
```


__Q1.2 - People whose home address has a country specified__	

```
{ 
    "name": "q1.2",
    "description": "Profiles for which have a home address with specified country",
    "query": "homeAddress.countryISO" 
}
```

__Q1.3 - People whose home and work addresses are in the same country__

```
{ 
    "name": "q1.3",
    "description": "Profiles whose home address is in the same country as their work address",
    "query": "homeAddress.countryISO = workAddress.countryISO" 
}
```

__Q2 - People with home addresses in California or Oregon__

```
{ 
    "name": "q2",
    "description": "Profiles whose home address is in California or Oregon",
    "query": "homeAddress.countryISO = \"US\" and homeAddress.stateProvinceISO in [\"CA\", \"OR\"]" 
}
```

__Q3 - People whose work and home addresses are in different states__

```
{ 
    "name": "q3",
    "description": "Profiles whose work address is in a different state from their home address",
    "query": "homeAddress.stateProvinceISO != workAddress.stateProvinceISO" 
}
```

__Q4 - People with a *.edu email extension__

```
{ 
    "name": "q4",
    "description": "Profiles whose work email address has .edu extension",
    "query": "workEmail.address like \"%.edu\"" 
}
```

__Q5 - People who viewed Photoshop__ 

```
{ 
    "name": "q5",
    "description": "Profiles who have viewed Photoshop in a commerce store",
    "query": "{ PV as xEvent.metrics.commerce.productListViews.value > 0, Item as PV.productListItems.SKU = \"PS\" }" 
}
```


__Q6 - Cart abandonment__

```
{ 
    "name": "q6",
    "description": "Profiles who have abandoned a cart in a commerce store",
    "query": "{ xEvent.metrics.commerce.abandons.value > 0 }" 
}
```

__Q7 - Abandonment of multiple carts__	

```
{ 
    "name": "q7",
    "description": "Profiles who have abandoned two separate carts within 2 days of each other",
    "query": "{ A1 as xEvent.metrics.commerce.abandons.value > 0, A2 as xEvent.metrics.commerce.abandons.value > 0: A1.id != A2.id and A1.timestamp occurs < 2 days before A2.timestamp }" 
}
```

__Q8 - People who have placed an order__

```
{ 
    "name": "q8",
    "description": "Profiles who have placed an order in a commerce store",
    "query": "{ xEvent.commerce.order }" 
}
```

__Q8.1 - People who have placed an order where a purchase ID for that order exists__

```
{ 
    "name": "q8.1",
    "description": "Profiles who have placed an order in a commerce store with a purchase id",
    "query": "{ xEvent.commerce.order.purchaseId != \"\" }" 
}
```

__Q9 - People whose order contains a Photoshop product__

```
{ 
    "name": "q9",
    "description": "Profiles who have ordered Photoshop from a commerce store",
    "query": "{ Order as xEvent.commerce.order, Item as Order.productListItems.SKU = \"PS\" }" 
}
```

__Q10 - People who have ordered twice in two weeks__

```
{ 
    "name": "q10",
    "description": "Profiles who have placed at least two orders within some 2 week period from a commerce store",
    "query": "{ Order1 as xEvent.commerce.order, Order2 as xEvent.commerce.order: Order2.timestamp occurs after Order1.timestamp and Order2.timestamp occurs < 2 weeks after Order1.timestamp }" 
}
```

__Q11 - Customers with US addresses who've ordered twice in a two-week period__

```
{ 
    "name": "q11",
    "description": "Profiles with home address in the US who have placed at least two orders within some 2 week period from a commerce store",
    "query": "homeAddress.countryISO = \"US\" and { Order1 as xEvent.commerce.order, Order2 as xEvent.commerce.order: Order2.timestamp occurs after Order1.timestamp and Order2.timestamp occurs < 2 weeks after Order1.timestamp }" 
}
```

### 4.2 Segment Your Base

Predicates are run against stored XDM data and the data streaming in from various events, creating an Audience. Segmentation can be performed asynchronously using Segment Jobs, with support for realtime segmentation coming soon.

#### 4.2.1 Create a Segment Job

A Segment Job is a queued process of running one or more Predicates against your Adobe Cloud Platform XDM data which either builds or rebuilds the Audience for each Segment. 

__Example request to create a Segment Job:__

```
POST /data/core/ups/segment/jobs HTTP/1.1

Body:

{
    "type": "BATCH",
    "predicateIds": "1234",
    "model": "Profile"
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
        "dataGraphType": "string",
        "sink": "string",
        "mergeStrategy": "string",
        "creationTime": "2018-03-20T08:08:43.952Z",
        "updateTime": "2018-03-20T08:08:43.952Z"
    }
}
```

Segment Jobs run asynchronously, though a job's status can be checked by GETting a Segment Job by ID (returned from creating the Segment Job), which will return its status.

```
GET /data/core/ups/segment/jobs/3456 HTTP/1.1

Example Response:

{
    "status": true,
    "segmentJob": {
        "id": 0,
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


