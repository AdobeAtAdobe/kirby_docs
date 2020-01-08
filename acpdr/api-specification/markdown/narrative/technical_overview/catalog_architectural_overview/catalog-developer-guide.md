# Catalog Service developer guide

Catalog Service is the system of record for data location and lineage within Adobe Experience Platform. Catalog acts as a metadata store or "catalog" where you can find information about your data within Experience Platform, without needing to access the data itself. See the [Catalog overview](catalog_architectural_overview.md) for more information.

This developer guide provides steps for performing various operations in the Catalog API. The guide includes sample API calls for performing the following actions:

- [View a list of objects](#list-objects)
- [View a specific object](#view-a-specific-object)
- [View multiple specific objects](#view-multiple-specific-objects)
- [Update an object](#update-an-object)
- [Overwrite an object](#overwrite-an-object)
- [Delete an object](#delete-an-object)

It is recommended that you use this document in conjunction with the guide on [filtering Catalog data](filtering-catalog-data.md) to refine the returned results of your API calls.

The [appendix](#appendix) section contains additional information for working with the Catalog API, and covers the following topics:
- [View interrelated objects](#view-interrelated-objects)
- [Make multiple requests in a single call](#make-multiple-requests-in-a-single-call)
- [Additional request headers](#additional-request-headers)
- [Data compaction](#data-compaction)

## Getting started

Catalog tracks metadata for several kinds of resources and operations within Experience Platform. This developer guide requires a working understanding of the various Experience Platform services involved with creating and managing these resources:

* [Experience Data Model (XDM)](../schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Platform organizes customer experience data.
* [Batch ingestion](../ingest_architectural_overview/ingest_architectural_overview.md): How Experience Platform ingests and stores data from data files, such as CSV and Parquet.
* [Streaming ingestion](../streaming_ingest/streaming_ingest_overview.md): How Experience Platform ingests and stores data from client- and server-side devices in real-time.

The following sections provide additional information that you will need to know or have on-hand in order to successfully make calls to the Catalog Service API.

### Reading sample API calls

This guide provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../sandboxes/sandboxes-overview.md). 

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

### Best practices for Catalog API calls

When performing GET requests to the Catalog API, best practice is to include query parameters in your requests in order to return only the objects and properties that you need. Unfiltered requests can cause response payloads to reach past 3GB in size, which can slow overall performance.

You can view specific objects by including their ID in the request path or use query parameters such as `properties` and `limit` to filter responses. Filters can be passed as headers and as query parameters, with those passed as query parameters taking precedence. See the document on [filtering Catalog data](filtering-catalog-data.md) for more information.

Since some queries can put a heavy load on the API, global limits have been implemented on Catalog queries to further support best practices.

## Sample API calls

The following sections provide important information regarding common operations in the Catalog API. Each operation includes the general **API format**, a sample **request** showing required headers and properly formatted payloads, and a sample **response** for a successful call.

Most of the examples in this document use the `/dataSets` endpoint, but the principles can be applied to other endpoints within Catalog (such as `/batches` and `/accounts`). See the [Catalog Service API reference](../../../../../../acpdr/swagger-specs/catalog.yaml) for a complete list of all calls and operations available for each endpoint.

## List objects

You can retrieve a list of all available objects of a specific type through a single API call, with best practice being to include filters that limit the size of the response.

#### API format

```http
GET /{OBJECT_TYPE}
GET /{OBJECT_TYPE}?{FILTER}={VALUE}&{FILTER_2}={VALUE}
```
* `{OBJECT_TYPE}`: The type of Catalog object to be listed. Valid objects are:
    * `accounts`
    * `batches`
    * `connections`
    * `connectors`
    * `dataSets`
    * `dataSetFiles`
    * `dataSetViews`
* `{FILTER}`: A query parameter used to filter the results returned in the response. Multiple parameters are separated by ampersands (`&`). See the guide on [filtering Catalog data](filtering-catalog-data.md) for more information.

#### Request

The sample request below retrieves a list of datasets, with a `limit` filter reducing the response to five results, and a `properties` filter that limits the properties displayed for each dataset.

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets?limit=5&properties=name,description,files' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of Catalog objects in the form of key-value pairs, filtered by the query parameters provided in the request. For each key-value pair, the key represents a unique identifier for the Catalog object in question, which can then be used in another call to [view that specific object](#view-a-specific-object) for more details.

> **Note:** If a returned object does not contain one or more of the requested properties indicated by the `properties` query, the response returns only the requested properties that it does include, as shown in "Sample Dataset 3" and "Sample Dataset 4" below.

```json
{
    "5ba9452f7de80400007fc52a": {
        "name": "Sample Dataset 1",
        "description": "Description of dataset.",
        "files": "@/dataSets/5ba9452f7de80400007fc52a/views/5ba9452f7de80400007fc52b/files"
    },
    "5bb276b03a14440000971552": {
        "name": "Sample Dataset 2",
        "description": "Description of dataset.",
        "files": "@/dataSets/5bb276b03a14440000971552/views/5bb276b01250b012f9acc75b/files"
    },
    "5bceaa4c26c115000039b24b": {
        "name": "Sample Dataset 3"
    },
    "5bda3a4228babc0000126377": {
        "name": "Sample Dataset 4",
        "files": "@/dataSets/5bda3a4228babc0000126377/views/5bda3a4228babc0000126378/files"
    },
    "5bde21511dd27b0000d24e95": {
        "name": "Sample Dataset 5",
        "description": "Description of dataset.",
        "files": "@/dataSets/5bde21511dd27b0000d24e95/views/5bde21511dd27b0000d24e96/files"
    }
}
```

## View a specific object

If you know the unique identifier for a specific Catalog object, you can perform a GET request to view that object's details. 

> **Note:** When viewing specific objects, it is still best practice to [filter by properties](#filter-by-displaying-select-properties) and return only the properties you are interested in.

#### API format

```http
GET /{OBJECT_TYPE}/{OBJECT_ID}
GET /{OBJECT_TYPE}/{OBJECT_ID}?properties={PROPERTY_1},{PROPERTY_2},{PROPERTY_3}
```
* `{OBJECT_TYPE}`: The type of Catalog object to be retrieved. Valid objects are:
    * `accounts`
    * `batches`
    * `connections`
    * `connectors`
    * `dataSets`
    * `dataSetFiles`
    * `dataSetViews`
* `{OBJECT_ID}`: The identifier of the specific object you want to retrieve.

#### Request

The following request retrieves a dataset by its ID, returning its `name`, `description`, `state`, `tags`, and `files` properties.

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets/5ba9452f7de80400007fc52a?properties=name,description,state,tags,files' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the specified dataset with only the requested `properties` in the body.

```json
{
    "5ba9452f7de80400007fc52a": {
        "name": "Sample Dataset",
        "description": "Sample dataset containing important data.",
        "state": "DRAFT",
        "tags": {
            "adobe/pqs/table": [
                "sample_dataset"
            ]
        },
        "files": "@/dataSets/5ba9452f7de80400007fc52a/views/5ba9452f7de80400007fc52b/files"
    }
}
```

> **Note:** Properties whose values are prefixed with `@` represent interrelated objects. See the appendix section on [viewing interrelated objects](#view-interrelated-objects) for steps on how to view the details of these objects.

## View multiple specific objects

If you wish to view several specific objects, rather than making one request per object, Catalog provides a simple shortcut for requesting multiple objects of the same type. You can use a single GET request to return multiple specific objects by including a comma-separated list of IDs. 

> **Note:** Even when requesting specific Catalog objects, it is still best practice to `properties` query parameter to return only the properties you need.

#### API format

```http
GET /{OBJECT_TYPE}/{ID_1},{ID_2},{ID_3},{ID_4}
GET /{OBJECT_TYPE}/{ID_1},{ID_2},{ID_3},{ID_4}?properties={PROPERTY_1},{PROPERTY_2},{PROPERTY_3}
```
* `{OBJECT_TYPE}`: The type of Catalog object to be retrieved. Valid objects are:
    * `accounts`
    * `batches`
    * `connections`
    * `connectors`
    * `dataSets`
    * `dataSetFiles`
    * `dataSetViews`
* `{ID}`: An identifier for one of the specific objects you want to retrieve.

#### Request

The following request includes a comma-separated list of dataset IDs as well as a comma-separated list of properties to be returned for each dataset.

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets/5bde21511dd27b0000d24e95,5bda3a4228babc0000126377,5bceaa4c26c115000039b24b,5bb276b03a14440000971552,5ba9452f7de80400007fc52a?properties=name,description,files' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of the specified datasets, containing only the requested properties (`name`, `description`, and `files`) for each. 

> **Note:** If a returned object does not contain one ore more of the requested properties indicated by the `properties` query, the response returns only the requested properties that it does include, as shown in "Sample Dataset 3" and "Sample Dataset 4" below.

```json
{
    "5ba9452f7de80400007fc52a": {
        "name": "Sample Dataset 1",
        "description": "Description of dataset.",
        "files": "@/dataSets/5ba9452f7de80400007fc52a/views/5ba9452f7de80400007fc52b/files"
    },
    "5bb276b03a14440000971552": {
        "name": "Sample Dataset 2",
        "description": "Description of dataset.",
        "files": "@/dataSets/5bb276b03a14440000971552/views/5bb276b01250b012f9acc75b/files"
    },
    "5bceaa4c26c115000039b24b": {
        "name": "Sample Dataset 3"
    },
    "5bda3a4228babc0000126377": {
        "name": "Sample Dataset 4",
        "files": "@/dataSets/5bda3a4228babc0000126377/views/5bda3a4228babc0000126378/files"
    },
    "5bde21511dd27b0000d24e95": {
        "name": "Sample Dataset 5",
        "description": "Description of dataset.",
        "files": "@/dataSets/5bde21511dd27b0000d24e95/views/5bde21511dd27b0000d24e96/files"
    }
}
```

## Update an object

You can update part of a Catalog object by including its ID in the path of a PATCH request. There are two methods for performing PATCH operations on Catalog objects:

* [Using fields](#update-using-fields)
* [Using JSON Patch notation](#update-using-json-patch-notation)

> **Note:** PATCH operations on an object cannot modify its expandable fields, which represent interrelated objects.  Modifications to interrelated objects must be made directly.

### Update using fields

The following example call demonstrates how to update an object using fields and values.

#### API format

```http
PATCH /{OBJECT_TYPE}/{OBJECT_ID}
```
* `{OBJECT_TYPE}`: The type of Catalog object to be updated. Valid objects are:
    * `accounts`
    * `batches`
    * `connections`
    * `dataSets`
    * `dataSetFiles`
    * `dataSetViews`
* `{OBJECT_ID}`: The identifier of the specific object you want to update.

#### Request

The following request updates the `name` and `description` fields of a dataset to the values provided in the payload. Object fields that are not to be updated can be excluded from the payload.

```shell
curl -X PATCH \
  https://platform.adobe.io/data/foundation/catalog/dataSets/5ba9452f7de80400007fc52a \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
       "name":"Updated Dataset Name",
       "description":"Updated description for Sample Dataset"
      }'
```

#### Response

A successful response returns an array containing ID of the updated dataset. This ID should match the one sent in the PATCH request. Performing a GET request for this dataset now shows that only the `name` and `description` have been updated while all other values remain unchanged.

```json
[
    "@/dataSets/5ba9452f7de80400007fc52a"
]
```

### Update using JSON Patch notation

The following example call demonstrates how to update an object using JSON Patch, as outlined in [RFC-6902](https://tools.ietf.org/html/rfc6902).

<!-- (Include once API fundamentals guide is published) 

For more information on JSON Patch syntax, see the [API fundamentals guide](). 

-->

#### API format

```http
PATCH /{OBJECT_TYPE}/{OBJECT_ID}
```
* `{OBJECT_TYPE}`: The type of Catalog object to be updated. Valid objects are:
    * `accounts`
    * `batches`
    * `connections`
    * `dataSets`
    * `dataSetFiles`
    * `dataSetViews`
* `{OBJECT_ID}`: The identifier of the specific object you want to update.

#### Request

The following request updates the `name` and `description` fields of a dataset to the values provided in each JSON Patch object. When using JSON Patch, you must also set the Content-Type header to `application/json-patch+json`.

```shell
curl -X PATCH \
  https://platform.adobe.io/data/foundation/catalog/dataSets/5ba9452f7de80400007fc52a \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'Content-Type: application/json-patch+json' \
  -d '[
        { "op": "add", "path": "/name", "value": "New Dataset Name" },
        { "op": "add", "path": "/description", "value": "New description for dataset" }
      ]'
```

#### Response

A successful response returns an array containing the ID of the updated object. This ID should match the one sent in the PATCH request. Performing a GET request for this object now shows that only the `name` and `description` have been updated while all other values remain unchanged.

```json
[
    "@/dataSets/5ba9452f7de80400007fc52a"
]
```

## Overwrite an object

You can overwrite the contents of a Catalog object using a PUT request, wherein the entire resource is replaced with the request payload.

> **Note:** If you only need to update a few specific fields within a Catalog object, using a PATCH request may be more efficient.

#### API format

```http
PUT /{OBJECT_TYPE}/{OBJECT_ID}
```
* `{OBJECT_TYPE}`: The type of Catalog object to be overwritten. Valid objects are:
    * `accounts`
    * `batches`
    * `connections`
    * `dataSets`
    * `dataSetFiles`
    * `dataSetViews`
* `{OBJECT_ID}`: The identifier of the specific object you want to overwrite.

#### Request

The following request overwrites a dataset with the values provided in the payload.

```shell
curl -X PUT \
  https://platform.adobe.io/data/foundation/catalog/dataSets/5ba9452f7de80400007fc52a \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "name": "New Dataset Name",
        "description": "New description for dataset",
        "state": "DRAFT",
        "tags": {
            "adobe/pqs/table": [
                "sample_dataset"
            ]
        },
        "files": "@/dataSets/5ba9452f7de80400007fc52a/views/5ba9452f7de80400007fc52b/files"
    }'
```

#### Response

A successful response returns an array containing the ID of the overwritten object. This ID should match the one sent in the PUT request. Performing a GET request for this object now shows that its details have be replaced with those provided in the payload of the previous PUT request.

```json
[
    "@/dataSets/5ba9452f7de80400007fc52a"
]
```

## Delete an object

You can delete a Catalog object by providing its ID in the path of a DELETE request. 

> **Warning:** Take extra care when deleting objects, as this cannot be undone and may produce breaking changes elsewhere in Experience Platform.

#### API format

```http
DELETE /{OBJECT_TYPE}/{OBJECT_ID}
```
* `{OBJECT_TYPE}`: The type of Catalog object to be deleted. Valid objects are:
    * `accounts`
    * `batches`
    * `connections`
    * `dataSets`
    * `dataSetFiles`
    * `dataSetViews`
* `{OBJECT_ID}`: The identifier of the specific object you want to delete.

#### Request

The following request deletes a dataset whose ID is specified in the request path.

```shell
curl -X DELETE \
  'https://platform.adobe.io/data/foundation/catalog/dataSets/5ba9452f7de80400007fc52a' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns HTTP status 200 (OK) and an array containing the ID of the deleted dataset. This ID should match the one sent in the DELETE request. Performing a GET request on the deleted object returns HTTP status 404 (Not Found), confirming that the dataset has been deleted successfully.

```json
[
    "@/dataSets/5ba9452f7de80400007fc52a"
]
```

> **Note:** If no Catalog objects match the ID provided in your request, you may still receive an HTTP Status Code 200, but the response array will be empty.

## Next steps

By reading this document, you have been introduced to the core operations provided by the Catalog Service API. For more information on how to filter responses, see the guide on [filtering Catalog data](filtering-catalog-data.md). For a step-by-step workflow that demonstrates how the Catalog API is involved with data ingestion, see the tutorial on [creating a dataset](../../tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md).

## Appendix

The following sections contain additional information to help you work with the Catalog API.

### View interrelated objects

Some Catalog objects can be interrelated with other Catalog objects. Any fields that are prefixed by `@` in response payloads denote related objects. The values for these fields take the form of a URI, which can be used in a separate GET request to retrieve the related objects they represent.

The example dataset returned in the section on [looking up a specific dataset](#view-a-specific-object) contains a `files` field with the following URI value: `"@/dataSets/5ba9452f7de80400007fc52a/views/5ba9452f7de80400007fc52b/files"`. The contents of the `files` field can be viewed by using this URI as the path for a new GET request.

#### API format

```http
GET {OBJECT_URI}
```
* `{OBJECT_URI}`: The URI provided by the interrelated object field (excluding the `@` symbol).

#### Request

The following request uses the URI provided the example dataset's `files` property to retrieve a list of the dataset's associated files.

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets/5ba9452f7de80400007fc52a/views/5ba9452f7de80400007fc52b/files' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of related objects. In this example, a list of dataset files is returned.

```json
{
    "7d501090-0280-11ea-a6bb-f18323b7005c-1": {
        "id": "7d501090-0280-11ea-a6bb-f18323b7005c-1",
        "batchId": "7d501090-0280-11ea-a6bb-f18323b7005c",
        "dataSetViewId": "5ba9452f7de80400007fc52b",
        "imsOrg": "{IMS_ORG}",
        "createdUser": "{USER_ID}",
        "createdClient": "{CLIENT_ID}",
        "updatedUser": "{USER_ID}",
        "version": "1.0.0",
        "created": 1573256315368,
        "updated": 1573256315368
    },
    "148ac690-0280-11ea-8d23-8571a35dce49-1": {
        "id": "148ac690-0280-11ea-8d23-8571a35dce49-1",
        "batchId": "148ac690-0280-11ea-8d23-8571a35dce49",
        "dataSetViewId": "5ba9452f7de80400007fc52b",
        "imsOrg": "{IMS_ORG}",
        "createdUser": "{USER_ID}",
        "createdClient": "{CLIENT_ID}",
        "updatedUser": "{USER_ID}",
        "version": "1.0.0",
        "created": 1573255982433,
        "updated": 1573255982433
    },
    "64dd5e19-8ea4-4ddd-acd1-f43cccd8eddb-1": {
        "id": "64dd5e19-8ea4-4ddd-acd1-f43cccd8eddb-1",
        "batchId": "64dd5e19-8ea4-4ddd-acd1-f43cccd8eddb",
        "dataSetViewId": "5ba9452f7de80400007fc52b",
        "imsOrg": "{IMS_ORG}",
        "createdUser": "{USER_ID}",
        "createdClient": "{CLIENT_ID}",
        "updatedUser": "{USER_ID}",
        "version": "1.0.0",
        "created": 1569499425037,
        "updated": 1569499425037
    }
}
```

### Make multiple requests in a single call

The root endpoint of the Catalog API allows for multiple requests to be made within a single call. The request payload contains an array of objects representing what would normally be individual requests, which are then executed in order. 

If these requests are modifications or additions to Catalog and any one of the changes fails, all changes will revert.

#### API format

```http
POST /
```

#### Request

The following request creates a new dataset, then creates related views for that dataset. This example demonstrates the use of template language to access values returned in previous calls for use in subsequent calls.

For example, if you would like to reference a value that was returned from a previous sub-request, you can create a reference in the format: `<<{REQUEST_ID}.{ATTRIBUTE_NAME}>>` (where `{REQUEST_ID}` is the user-supplied ID for the sub-request, as demonstrated below). You can reference any attribute available in the body of a previous sub-request's response object by using these templates.

> **Note:** When an executed sub-request returns only the reference to an object (as is the default for most POST and PUT requests in the Catalog API), this reference is aliased to the value `id` and can be used as  `<<{OBJECT_ID}.id>>`. 

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/catalog \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'Content-Type: application/json' \
  -d '[
    {
      "id": "firstObjectId",
      "resource": "/dataSets",
      "method": "post",
      "body": {
        "type": "raw",
        "name": "First Dataset"
      }
    }, 
    {
      "id": "secondObjectId",
      "resource": "/datasetViews",
      "method": "post",
      "body": {
        "status": "enabled",
        "aspect": "production",
        "dataSetId": "<<firstObjectId.id>>"
      }
    }
  ]'
```
* `id`: User-supplied ID that is attached to the response object so that you can match up requests to responses. Catalog does not store this value and simply returns it in the response for reference purposes.
* `resource`: The resource path relative to the root of the Catalog API. The protocol and domain should not be part of this value, and it should be prefixed with "/". 
    * When using PATCH or DELETE as the sub-request's `method`, include the object ID in the resource path. Not to be confused with the user-supplied `id`, the resource path uses the ID of the Catalog object itself (for example, `resource: "/dataSets/1234567890"`).
* `method`: The name of the method (GET, PUT, POST, PATCH, or DELETE) related to the action taking place in the request.
* `body`: The JSON document that would normally be passed as the payload in a POST, PUT, or PATCH request. This property is not required for GET or DELETE requests.

#### Response

A successful response returns an array of objects containing the `id` that you assigned to each request, the HTTP status code for the individual request, and the response `body`. Since the three sample requests were all to create new objects, the `body` of each object is an array containing only the ID of the newly created object, as is the standard with most successful POST responses in Catalog.

```json
[
    {
        "id": "firstObjectId",
        "code": 200,
        "body": [
            "@/dataSets/5be230aef5b02914cd52dbfa"
        ]
    },
    {
        "id": "secondObjectId",
        "code": 200,
        "body": [
            "@/dataSetViews/5be230aef5b02914cd52dbfb"
        ]
    }
]
```

Take care when inspecting the response to a multi-request, as you will need to verify the code of each individual sub-request and not rely solely on the HTTP status code for the parent POST request.  It is possible for a single sub-request to return a 404 (such as a GET request on an invalid resource) while the overall request returns 200.

### Additional request headers

Catalog provides several header conventions to help you maintain the integrity of your data during updates.

**If-Match**

It is good practice to use object versioning to prevent the type of data corruption that occurs when an object is saved by multiple users near-simultaneously. 

Best practice when updating an object involves first making an API call to view (GET) the object to be updated. Contained within the response (and any call where the response contains a single object) is an `E-Tag` header containing the version of the object. Adding the object version as a request header named `If-Match` in your update (PUT or PATCH) calls will result in the update only succeeding if the version is still the same, helping to prevent data collision.

If the versions do not match (the object was modified by another process since you retrieved it), you will receive HTTP status 412 (Precondition Failed) indicating that access to the target resource has been denied.

**Pragma**

On occasion, you may wish to validate an object without saving the information. Using the `Pragma` header with a value of `validate-only` allows you to send POST or PUT requests for validation purposes only, preventing any changes to the data from being persisted.

### Data compaction

Compaction is an Experience Platform service that merges data from small files into larger files without changing any data. For performance reasons, it is sometimes beneficial to combine a set of small files into larger files in order to provide faster access to data when being queried.

When the files in an ingested batch have been compacted, its associated Catalog object is updated for monitoring purposes.

<img src="https://i.imgur.com/aIgvaQu.png" alt="back-to-top" width="50" height="50" style="position: fixed; bottom: 30px; float: right; right: 10%; left: 90%; opacity: 0.4; padding-top: 0px; padding-bottom: 0px; border-style: hidden; border-radius: 50%;" onmouseover="this.style.opacity = 0.9;" onmouseout="this.style.opacity = 0.4;" onclick="document.documentElement.scrollTop = document.getElementsByClassName('udp-header')[0].offsetHeight; document.body.scrollTop = document.getElementsByClassName('udp-header')[0].offsetHeight;">