# Data Catalog Services - Technical Overview

## 1. Overview

The Data Catalog serves on the Adobe Cloud Platform as the system of record for data location, schema definition, lineage, and usage labelling for batched data across the platform. Data Catalog Services answer the following questions:

* Where is my data located?
* At what stage of processing is this data?
* What systems or processes have acted on my data?
* What errors occurred during processing?
* If successful, how much data was processed?

### 1.1 Audience

This document is aimed at technical personas and should be a useful tool for all users that need to:

* Consume the Adobe Cloud Platform APIs
* Understand the Adobe Cloud Platform Architecture
* Understand how Data Catalog Services work on the Adobe Cloud Platform
* Architect integrations between customer-owned and 3rd party systems and the Adobe Cloud Platform

### 1.2 URI Scheme

*Host* : __platform.adobe.io__   
*BasePath* : __/data/foundation/catalog/__  
*Schemes* : __HTTPS__  

### 1.3 About the Docs

The HTML rendition of this documentation is kept up-to-date on a per commit basis and can therefore change without announcement. If you require a persistent version of the documentation, it is recommended that you seek out the PDF rendition.

---

## 2. Using the Data Catalog API

This document describes interacting with Data Catalog Services using Adobe's Platform APIs. See [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html) for information on how to access these services.

### 2.1 Specify Multiple IDs

Often it's desirable to request a specific collection of objects based on their IDs.  Rather than making one request per object, Data Catalog Service provides a simple shortcut for requesting multiple objects of the same type with a single query with the use of comma-separated IDs.

__Example Catalog Service request, demonstrating a multi-object request:__

```
GET /dataSets/5601dc3ee91c55aa3834b607,0ad0554e4fa033861780c2962e,...
```

### 2.2 Expansions

The Data Catalog manages objects that are interrelated. Some fields are returned in XDM responses as an abbreviated representation of an underlying list of values by default. These are prefixed with @, such as `@/dataSets/58ed485dee812c05a7cfc8d0/views/58ed4a86215b2f0c215a4539/files`. This is an example of an expandable field which could be returned in its full detailed form using the `expansions` request parameter. 

For example, a query for a particular DataSet yields a record that contains several expandable fields and you would like to retrieve detailed, expanded list of all Transforms.


__Example Data Catalog Service request, demonstrating requesting Transforms be expanded:__

```
GET /dataSets/58ed485dee812c05a7cfc8d0?expansion=transforms
```

> Multiple fields can be specified as a comma-delimited list, such as `expansion=transforms,files`

__Example Data Catalog Service response, demonstrating the use of the `expansion` request parameter:__

```JSON
{
  "58ed485dee812c05a7cfc8d0": {
    "version": "1.0.0",
    "imsOrg": "1376517755E72AC07F000101@AdobeOrg",
    "name": "limit/offset test 4",
    "created": 1491945565855,
    "updated": 1491946118111,
    "createdClient": "MCDPCatalogServiceQa2",
    "createdUser": "MCDPCatalogServiceQa2@AdobeID",
    "updatedUser": "MCDPCatalogServiceQa2@AdobeID",
    "aspect": "production",
    "status": "enabled",
    "editable": true,
    "basePath": "ab://some/path/to/blob",
    "fileDescription": {
      "persisted": false
    },
    "transforms": {
      "58ed52ea6da08e0f72ebc99a": {
        "version": "1.0.0",
        "imsOrg": "1376517755E72AC07F000101@AdobeOrg",
        "created": 1491948266385,
        "createdClient": "MCDPCatalogServiceQa2",
        "createdUser": "MCDPCatalogServiceQa2@AdobeID",
        "updatedUser": "MCDPCatalogServiceQa2@AdobeID",
        "updated": 1491948266385,
        "dataSetViewId": "58ed4a86215b2f0c215a4539",
        "codeUrl": "git://foo.bar/path/to/code.git"
      }
    },
    "files": "@/dataSets/58ed485dee812c05a7cfc8d0/views/58ed4a86215b2f0c215a4539/files",
    "children": "@/dataSetViews/58ed4a86215b2f0c215a4539/children",
    "viewId": "58ed4a86215b2f0c215a4539"
  }
}
```

### 2.3 PUT vs PATCH

While PATCH is a well known method for REST services, there are a few notes about how it operates in Data Catalog. The distinction between PUT and PATCH is an important one, as PUT will replace the entire resource with the presented payload, and PATCH will simply modify only the fields provided in the request. One of the most common mistakes to make with Data Catalog is to use PUT when the desired action requires PATCH.  

Data Catalog Services supports two methods for PATCH. If you pass a subset of the object you are PATCHing the Data Catalog Service; this will only alter the fields present in the object body.

```
PATCH /dataSets/123456

{
    "name":"bob"
}
```

In the above example all other values in the dataset will be retained except name, which will be changed to "bob".  If this was instead a PUT, any other mutable values of the dataset would be unset.

Alternatively, Data Catalog Services also support json-patch as described in [RFC-6902](https://tools.ietf.org/html/rfc6902).  One thing to note is that if you are using this method your content-type MUST be `json-patch+json`

```
PATCH /dataSets/123456

content-type: application/json-patch+json
[
    {"op":"add","path":"/name","value":"bob"}
]
```

> Neither PATCH nor PUT will modify expansions.  Modifications to expansions must be done directly on the expansion resource.

### 2.4 Batching Data Catalog Requests - Transactional API

This is not to be confused with the Batch object supported by Data Catalog. Rather, this API satisfies a use-case offering a multi-request method that not only allows for multiple requests to be made on a single connection, but if those requests are modifications/additions to the catalog, all changes will __transactionally__ roll-back if any one change fails.

The API signature is a POST on the root API: 

__Data Catalog Service Request:__

```
POST /
```

Where the POST body is an array of objects containing the information needed to represent what would normally be a single request:

```
[
    {
        "id": "firstObjectId",
        "resource": "/dataSetFile",
        "method": "put",
        "body": {
            "id": "56c62ca67b8f2a643b6c1ae8",
            "dataSetViewId": "6af287f491059dea782709da6b"
        }
    }, 
    {
        "id": "secondObjectId",
        "resource": "/dataSetFiles/56c62ca67b8f2a643b6c1ae8",
        "method": "get"
    }
]
```

Requests are executed in order and values returned from a previous call are made available in subsequent calls through a templating message.  If you would like to reference a value from another object, you create a reference in the style <<[ID of object].[attribute from body]>>.  You can reference any attribute available in the "body" of a previous object through this templating language, as well as a single special case:  When a PUT or POST is executed, only the reference to the object is returned by default, aliased to the value `id` (ex. <<firstObject.id>>).

```
[
   {
       "id": "firstObjectId",
       "resource": "/dataSet",
       "method": "post",
       "body": {
           "type": "raw",
           "name": "firstdataset"
       }
   }, 
   {
       "id": "secondObjectId",
       "resource": "/dataSetViews",
       "method": "post",
       "body": {
           "status": "enabled",
           "aspect": "production",
           "dataSetId": "<<firstObjectId.id>>"
       }
   },
       {
       "id": "thirdObjectId",
       "resource": "/transforms",
       "method": "post",
       "body": {
           "dataSetViewId": "<<secondObjectId.id>>",
           "codeUrl": "git://example.com/foo/bar/something.git",
           "args": [ "argV", "argC"]
       }
   }
]
```

__Example Catalog Response:__

```
[
    {
        "id": "firstObjectId",
        "body": [
            "@/dataSetFiles/56c62ca67b8f2a643b6c1ae8"
        ],
        "code": 200
    },
    {
        "id": "secondObjectId",
        "body": {
            "56c62ca67b8f2a643b6c1ae8": {
                "created": 1455836898440,
                "createdClient": "MCDPCatalogServiceQa2",
                "dataSetViewId": "6af287f491059dea782709da6b",
                "imsOrg": "1376517755E72AC07F000101@AdobeOrg",
                "version": "1.0.15"
            }
        },
        "code": 200
    }
]
```

> Be aware that because of the nature of multi-request you will need to verify the code of each individual request and not rely on the standard HTTP status code passed to the browser.  It is possible for a single sub-request to return a 404 (for example a GET done on an invalid resource) but the actual HTTP response to still be a 200.  



---

## 3. Components

The Data Catalog Service is an orchestration between the following components: 

|Object|JSON Schema|Definition|
|---|---|---|
|Account|accountSchema|Accounts represent a collection of authentication credentials used by a customer to create Connections of a specific type. Each Connection has a set of unique parameters that are persisted by Catalog and secured in an Azure Key Vault by way of the Security Service.|
|Batch|batchSchema|Batches allow Catalog users to understand which operations and applications have operated on objects tracked by the system. First, a batch outlines the final results (records processed, size on disk etc) but may also include links to DataSets, DataSetViews, etc. that were affected by the batch operation.|
|Connector|connectorSchema|Connectors define how and when data is ingested into the platform. They define how data is to be gathered from technology sources (like S3, RedShift, and SFTP) and partner sources (like DFA, SAP, MSFT and ExactTarget). <br>Connectors also define how and when Adobe Solution data is ingested into the platform.|
|Connection|connectionSchema|Connections are customer-specific instances of Connectors. As an example, a user selects the Azure Blob Connector, supplies the necessary details as defined by that Connector, and ends up with a Connection.|
|DataSet|dataSetSchema|DataSets are the building blocks for data transformation and tracking in the Catalog Service. This is your interface to the data. DataSets can tell you where the data came from, what fields it was originally composed of, and what fields are being exposed for use.|
|DataSetFile|dataSetFileSchema|A DataSetFile represents a block of data that's been saved on the platform. As record of a literal file, this is where you'll go to find the file's size and what batch it came from. This construct will also provide the number of records contained in the file.|


> Internally, DataSets have a DataSetView construct which you will see in responses but should not consider in your developments.

---

## 4. Data Discovery

Data Catalog Services offers a robust set of options for accessing your data. The following describe modifiers to services which access data. 

### 4.1 Filtering

Many APIs allow response data to be filtered by string or numeric attributes. Please refer to the swagger documentation for a given API to understand what filters might be available. For example, you can filter a list of DataSets by those tagged a certain way.

__Example Data Catalog Service request, demonstrating filtering by tagname:__

```
GET /dataSets/58ed485dee812c05a7cfc8d0?tags=tagname:tagvalue
```

#### 4.1.1 Filtering by Property

Certain APIs allow filtering by property. The table below lists the operations supported. 

|Operation|Description|
|---|---|
|Existence|Stating only the property name will only return entries where the property exists|
|~|Match the (string) value against a regular expression|
|< / > / <= / >= / == / !=|Comparison of the field value against another field or value|

__Examples:__

|Usage|Explanation|
|---|---|
|GET/dataSets?property=name|Returns only data sets which contain the property `name`|
|GET /dataSets?property=!name|Returns only data sets that don't contain the property `name`|
|GET /dataSets?property=name~^Sample|Returns only data sets whose name starts with the word `Sample`|
|GET /dataSets?property=version>1.0.0|Returns only data sets whose version are greater than 1.0.0|

> The `name` property supports the use of the wildcard `*` character within, or as, the search string. Wildcards match empty/no character, such that the the search string `te*st` will match the value "test". Asterisks are escaped using "**" (double asterisk), to represent a single asterisks as a literal string in your search string.
  
### 4.2. Data Range Queries

Some Data Catalog APIs have query parameters that allow ranged queries, most often in the case of dates. Each service will indicate which attributes are allowed. When additional params are added on to a query, the operation is assumed to be additive (AND).

__Range Queries:__

```
// Get Batches created in August
GET /batches?createdAfter=1501545600000&createdBefore=1504137600000
 
// Get Batches with data that is related to August
GET /batches?startAfter=1501545600000&endBefore=1504137600000
```

### 4.3. Limiting & Offsets

Data Catalog responses are automatically metered according to configured limits:

* 20 response objects by default
* Maximum limits are defined on a per-environment basis dynamically by operations. Invalid limits are met with error responses that outline proper ranges
* If limits or offsets are passed as query parameters, they take precedence over those passed as headers

#### 4.3.1 Limit Number of Objects in a Response

To constrain an API response to a limited number of objects, use the `limit` query parameter.

__Example Data Catalog Service Request, demonstrating limiting the number of objects returned:__

```
GET /dataSet?limit=1
```

#### 4.3.2 Shift Response List Forward

To shift the response list forward, you can use the `start` query parameter.

__Data Catalog Service Request:__

```
GET /dataSet?limit=1&start=140
```

Alternatively, you can send in a `Range` header to indicate what objects you want in a response.

|Header|Value|Description|
|---|---|---|
`Range`|`objects=140-141`|Using the `Range` header also allows you to see how many objects would normally be returned without any limit by inspecting the Content-`Content-Range` header.<br><br>__Note__: Using the `Range` header does incur an additional cost because we query to see the total count as well. Use lightly.|
|OR|
|`Content-Range`|`objects 140-141/311`||

### 4.4 Sorting

Sorting the response collections is done by making a request with the `orderBy` query parameter. The value is two-part, with the first part being the direction, the delimiter (a colon “:” character), followed by the field to be sorted by. If the direction is not specified, the default direction is taken to be ascending. 

__Data Catalog Service Request:__

```
GET /dataSet?orderBy=asc:created
GET /dataSet?orderBy=desc:created
GET /dataSet?orderBy=created,desc:updated
```

### 4.5 Mixed Examples

As a reminder, additional conditions are assumed to be ANDed with others on the request. 

__Example multi-factor queries:__

```
// Get a list of DataSets recently created by me.
GET /dataSets?sort=desc:created&createdUser=foobar@AdobeID
 
// Get a list of failed Batches in August, sorted by creation date.
GET /batches?createdAfter=1501545600000&createdBefore=1504137600000&sort=desc:created&status=failure
```

---

## 5. Data Quality

Adobe Data Catalog provides visibility into the success of your data ingestions by providing access to errors reported. Maintain the integrity of your data during updates using the features described in this section.

### 5.1 Assert Object Version

It is good practice to use object versioning to prevent the type of data corruption that occurs when multiple threads save an object near-simultaneously. API calls to get a single object, as should be the case when getting an object to perform an update, will include the version of the object retrieved as response header `E-Tag`. Adding that version as a response header named `If-Match` in your PUT calls will result in the update only succeeding if the version is still the same, preventing data collission. 

|Header|Value|Description|
|---|---|---|
|`If-Match`|`version`<br><br>A version is provided as a response header (`E-Tag`) in responses that contain a single object|If during PUT operations, you wish to make sure you’re editing the object as it existed when you received it, you can send your request with an `If-Match` header.<br><br>1. If the versions in the request and the Data Catalog match, the PUT is executed and your data is updated.<br>2. If the versions do not match (the object was modified by another process since you received it), you’ll receive a HTTP 412 response.|

### 5.2 Validate Update Only

Perform an update in hypothetical, validation mode. Do not actually persist data.

|Header|Value|Description|
|---|---|---|
|`Pragma`|`validate-only`|When added to a POST or PUT call, the update process operates to validate only, and will not actually persist the data|

---

## 6. Data Curation

Your data exists on Adobe Cloud Platform as a conglomeration of data from any number of disparate systems and data sources. Once on the platform, Data Catalog allows you to work with your data your way.

### 6.1 Tags

Some objects in the catalog support tags that provision the attachment of information to an object, which can then be used to retrieve it.  Tags may be used however your processes require, and there are very few limitations to tag names.

* Tag names are namespaced to a customer and are unique to each customer, regardless of tag name
* Adobe components and processes may leverage tags for internal behavior and would, as a standard, prefix used tag names with an "adobe" prefix. Your tag names, then, should avoid this convention
* The following are reserved tag names, used by various ACP components:
  * "unifiedProfile" - This tag name is used to enable a DataSet to be ingested by Unified Profile

__Example uses of tags:__

```
# Assume this object is created:
POST /dataSets
  
{
    "type":"master",
    "name":"Test Master DataSet with Tags",
    "tags":{
        "customTag1_SomeId":["223344"],
        "customTag2_SomeString":["bar"]
    }
}
 
# Filter down to DataSets that contain a single tag with a particular value:
GET /dataSets?tags=customTag1_SomeId:223344
  
# Filter down to DataSets that contain both tag/value combinations:
GET /dataSets?tags=customTag1_SomeId:223344,customTag2_SomeString:bar
  
# By tag value:
GET /dataSets?tags=customTag2_SomeString:bar*
  
# By tag existence:
GET /dataSets?tags=customTag1_SomeId:*
```

Objects that currently support tags: DataSet, Batch, Connection

### 6.2 Delete DataSetFiles for a Batch

This functionality allows for the deletion of all DataSetFiles for a given Batch, by ID. An empty array and an HTTP 200 response will be returned if no DataSetFiles are found.

__Example DELETE Request/Response:__

```
DELETE /dataSetFiles?batchId=12345ABCD12345
  
Response: 200
[
    "@/dataSetFiles/678222A2233385221DF"
]
```
