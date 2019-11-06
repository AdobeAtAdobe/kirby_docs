# Catalog Service overview

Catalog is the system of record for data location and lineage within Adobe Experience Platform. Catalog is not the actual files or directories containing data, rather it holds the metadata and description of those files and directories. 

Simply put, Catalog acts as a metadata store or "catalog" where you can find information about your data within Experience Platform.

You can use Catalog to answer the following questions:

* Where is my data located?
* At what stage of processing is this data?
* What systems or processes have acted on my data?
* What errors occurred during processing?
* If successful, how much data was processed?

## Catalog objects

Catalog "objects" are the metadata encapsulation of data, schemas, provisioning, and operations on Platform. Catalog Service supports the following object types:

|Object|API Endpoint|Definition|
|---|---|---|
|Account|/accounts|Accounts represent a collection of authentication credentials used by a customer to create connections of a specific type. Each connection has a set of unique parameters that are persisted by Catalog and secured in an Azure Key Vault via Security Services.|
|Batch|/batches|Batches allow Catalog users to understand which operations and applications have been performed on objects tracked by the system. A batch outlines the final results (records processed, size on disk, etc.) but may also include links to Datasets, DatasetViews, and more that were affected by the batch operation.|
|Connection|/connections|Connections are customer-specific instances of Connectors. As an example, when a user selects the Azure Blob Connector and supplies the necessary details as defined by that Connector, the result is a Connection.|
|Connector|/connectors|Connectors define how and when data is ingested into Platform. They define how data is to be gathered from technology sources (like S3, RedShift, and SFTP) and partner sources (like DFA, SAP, MSFT and ExactTarget). Connectors also define how and when Adobe Solution data is ingested into Platform.|
|Dataset|/dataSets|Datasets are the building blocks for data transformation and tracking in Catalog Service. Generally, datasets represent a table or file made available by a Connection. |
|Dataset File|/datasetFiles|Dataset Files represent blocks of data that has been saved on Platform. As records of literal files, these are where you can find the file size and which batch the file came from. This construct will also provide the number of records contained in the file.|
|Transform|/transforms|Transforms are used to house the instructions that translate data into a new form. As a customer maps their newly uploaded data to XDM schema, a Transform is created to document links to the repository where the code resides, as well as a link to the vehicle (or engine) used to perform that work.|


## Getting started with Catalog Service API

Catalog provides a RESTful API through which you can perform basic CRUD operations against the supported object types.

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

### Best practices for API queries

When performing Catalog queries, it is best practice to include query parameters in your requests in order to return only the objects and properties that you need. For example, you can perform GET requests to view specific objects by their `{id}` or [use query parameters](#filtering-data-with-query-parameters) such as "[properties](#filter-by-displaying-select-properties)" and "[limit](#filter-using-limits)" to filter responses. Filters can be passed as headers and as query parameters, with those passed as query parameters taking precedence.

Since some queries can put a heavy load on the API, global limits have been implemented on Catalog queries to further support best practices. For more information, see the [filter using limits](#filter-using-limits) section later in this document.

## Sample API calls

In addition to providing an introduction to working with Catalog Service, this document outlines some of the common conventions used across most Catalog APIs:

- [View a list of objects](#listing-objects)
- [View a specific object](#view-a-specific-object)
- [Update or modify an object](#update-an-object)
- [Delete an object](#remove-an-object)
- [View multiple objects](#view-multiple-objects-by-id)
- [View interrelated objects](#view-interrelated-objects-using-expansion-query-parameter)
- [Link multiple requests](#multiple-requests-in-a-single-call)
- [Filter data using query parameters](#filtering-data-with-query-parameters)

Most of the examples in this document use the `/dataSets` endpoint, but the principles can be applied to other endpoints within Catalog. The complete [Catalog Service API Reference](../../../../../../acpdr/swagger-specs/catalog.yaml) shows all calls and operations available for each endpoint.

## Listing objects

It is possible to view a list of all available objects through a single API call (e.g. `GET /dataSets`), with best practice being to include filters that limit the size of the response. In cases where _full_ dataset information is being requested the response payload can reach past 3GB in size, which can slow overall performance. Using filters to limit the size of the response prevents lag in the system.

For more information on using filters, see the section on [filtering data with query parameters](#filtering-data-with-query-parameters) later in this document.

#### API format

```http
GET /dataSets
GET /dataSets?{filter}={value}&{filter2}={value}
```

#### Request

The sample request below includes two filters, separated by an ampersand (`&`). 

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets?limit=5&properties=name,description,files' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

The response consists of a JSON object comprised of individual objects for each returned dataset. The response is limited to the five most recent datasets (`limit=5`) and the requested properties (name, description, and files) are the only properties that will be displayed. If a dataset does not contain all of the requested properties, it will return any of the requested properties that it does include, as shown in "Sample Dataset 3" and "Sample Dataset 4" below.

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

The previous response object returned five datasets, listed by ID. Using the object ID, you can perform a GET request to view details of the specific object. 

Even though you are requesting a specific object, it is best practice to [filter by properties](#filter-by-displaying-select-properties) and return only the properties you are interested in.

#### API format

```http
GET /dataSets/{id}
GET /dataSets/{id}?properties={property1},{property2},{property3}
```

#### Request

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets/5ba9452f7de80400007fc52a?properties=name,description,state,tags,transforms,files' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

The response shows the specified dataset with only the requested fields (name, description, state, tags, transforms, and files) in the body.

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
        "transforms": "@/dataSets/5ba9452f7de80400007fc52a/views/5ba9452f7de80400007fc52b/transforms",
        "files": "@/dataSets/5ba9452f7de80400007fc52a/views/5ba9452f7de80400007fc52b/files",
    }
}
```

## Update an object

Catalog offers two possible ways of updating a specific values within a dataset. Both involve a PATCH request to the dataset `{id}` and require you to supply the values (or single value) to be updated in the request payload.

Catalog also supports PUT operations to update entire objects, wherein the full object is replaced with the request payload.


### Updating objects: PUT vs PATCH

The distinction between PUT and PATCH is an important one, as PUT will replace the entire resource with the request payload (in other words, PUT is _re-writing_ the resource to contain only the contents of the request payload), whereas PATCH will modify the current resource values for the field (or multiple fields) provided in the request payload and leave the rest unaltered. 

> **Note:** Neither PATCH nor PUT will modify expandable fields.  Modifications to related objects must be done directly on that object.

### PATCH 1

#### API format

```http
PATCH /dataSets/{id}
```

#### Request

Requests containing a payload require the header `Content-Type: application/json` be added, as shown in the sample below.

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

A successful response will include an array containing the updated dataset `{id}`. This `{id}` should match the one sent in the PATCH request.

```json
[
    "@/dataSets/5ba9452f7de80400007fc52a"
]
```

If you were to now perform a GET request for this dataset, only the "name" and "description" would be updated while the other values would remain unchanged. 

### PATCH 2

Alternatively, Catalog supports `json-patch` as described in [RFC-6902](https://tools.ietf.org/html/rfc6902).

#### API format

```http
PATCH /dataSets/{id}
```

#### Request

To use this method, the request must have the header `Content-Type: application/json-patch+json` and contain the fields to be updated in the payload, as shown below.

```shell
curl -X PATCH \
  https://platform.adobe.io/data/foundation/catalog/dataSets/5ba9452f7de80400007fc52a \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json-patch+json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '[
        {"op":"add","path":"/name","value":"New Dataset Name"},
        {"op":"add","path":"/description","value":"New description for dataset"}
      ]'
```

#### Response

A successful response will include an array containing the updated dataset `{id}`. This `{id}` should match the one sent in the PATCH request.

```json
[
    "@/dataSets/5ba9452f7de80400007fc52a"
]
```

Performing a GET request for this dataset would reveal that only the "name" and "description" have been updated while the other values remain unchanged. 


### Remove an object

Catalog allows for the removal of objects using a DELETE request. Take extra care when deleting objects as this cannot be undone and may produce breaking changes elsewhere in Experience Platform.

#### API format

```http
DELETE /dataSets/{id}
```

#### Request

```shell
curl -X DELETE \
  'https://platform.adobe.io/data/foundation/catalog/dataSets/5ba9452f7de80400007fc52a' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful deletion will return HTTP Status Code 200 (OK) and the response will contain an array with the `{id}` of the deleted dataset. This should match the `{id}` you provided in the request.

Performing a GET request on the deleted `{id}` will return an HTTP Status Code 404 (Not Found), confirming that the dataset has been deleted successfully.

```json
[
    "@/dataSets/5ba9452f7de80400007fc52a"
]
```

> **Note:** If no datasets match the `{id}` provided in your request, you may still receive an HTTP Status Code 200, but the response array will be empty.

### View multiple objects by ID

When you wish to view several specific objects, rather than making one request per object, Catalog provides a simple shortcut for requesting multiple objects of the same type. 

You can use a single GET request to return multiple specific objects by including a comma-separated list of IDs. 

Despite requesting specific datasets, it is still best practice to [filter by properties](#filter-by-displaying-select-properties) to return only the properties you need.

#### API format

```http
GET /dataSets/{id1},{id2},{id3},{id4}
GET /dataSets/{id1},{id2},{id3},{id4}?properties={property1},{property2},{property3}
```

#### Request

The sample request includes a comma-separated list of dataset IDs as well as a comma-separated list of properties to be returned.

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets/5bde21511dd27b0000d24e95,5bda3a4228babc0000126377,5bceaa4c26c115000039b24b,5bb276b03a14440000971552,5ba9452f7de80400007fc52a?properties=name,description,files' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

The response body consists of a JSON object with individual objects for each dataset, containing only the requested properties (name, description, and files). 

If a dataset does not contain all of the requested properties, it will return any of the requested properties that it does include, as shown in "Sample Dataset 3" and "Sample Dataset 4" in the following response:

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

### View interrelated objects using `expansion` query parameter

Catalog manages interrelated objects. These related objects, if queried properly, can be joined automatically via Catalog and included in the response. As you inspect a response, fields prefixed by `@` denote interrelated objects that can be expanded. 

For example, when [a specific dataset was requested](#view-an-object) earlier, the response contained a `"transforms"` field with the value `"@/dataSets/5ba9452f7de80400007fc52a/views/5ba9452f7de80400007fc52b/transforms"`. 

This field can be expanded to show details by issuing a GET request to the dataset `{id}` and using the `expansion` query parameter.

#### API format

```http
GET /dataSets/{id}?expansion=transforms
```

#### Request

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets/5ba9452f7de80400007fc52a?expansion=transforms' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

> **Note:** You can expand multiple fields in a single GET request by using a comma-delimited list, such as `expansion=transforms,files`.

#### Response

The response now shows the expanded "transforms" field and its details. 

```JSON
{
    "5ba9452f7de80400007fc52a": {
        "name": "Sample Dataset",
        "description": "Sample dataset containing important data",
        "dule": {},
        "statsCache": {},
        "state": "DRAFT",
        "createdUser": "{CREATED_USER}",
        "imsOrg": "{IMS_ORG}",
        "createdClient": "{CREATED_CLIENT}",
        "updatedUser": "{UPDATED_USER}",
        "version": "1.0.0",
        "tags": {
            "unifiedProfile": [
                "enabled:true"
            ]
        },
        "created": 1537819952110,
        "updated": 1537819952876,
        "viewId": "5ba9452f7de80400007fc52b",
        "aspect": "production",
        "status": "enabled",
        "fields": [],
        "fileDescription": {
            "persisted": true,
            "format": "csv",
            "delimiters": [
                ","
            ],
            "containerFormat": "text",
            "charset": "UTF-8"
        },
        "transforms": {
            "58ed52ea6da08e0f72ebc99a": {
                "version": "1.0.0",
                "imsOrg": "{IMS_ORG}",
                "created": 1491948266385,
                "createdClient": "{CREATED_CLIENT}",
                "createdUser": "{CREATED_USER}",
                "updatedUser": "{UPDATED_USER}",
                "updated": 1491948266385,
                "dataSetViewId": "58ed4a86215b2f0c215a4539",
                "codeUrl": "git://foo.bar/path/to/code.git"
            }
        },
        "files": "@/dataSets/5ba9452f7de80400007fc52a/views/5ba9452f7de80400007fc52b/files",
        "observableSchema": {},
        "schemaMetadata": {},
        "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/bc82c518380478b59a95c63e0f843121",
            "contentType": "application/vnd.adobe.xed+json;version=1"
        
    }
}
```

### Multiple requests in a single call

Catalog provides a multi-request method that not only allows for multiple requests to be made on a single connection, but if those requests are modifications/additions to Catalog and any one of the changes fails, all changes will roll-back.

#### API format

```http
POST /
```

#### Request

The request payload contains an array of objects representing what would normally be individual requests. 

Requests are executed in order and values returned from a previous call are made available in subsequent calls through template language. For example, if you would like to reference a value from a previous object, you can create a reference in the format: `<<{ID of object}.{attribute from body}>>`. You can reference any attribute available in the "body" of a previous object through these templates.

There is also a special use case, such that when a PUT or POST is executed and only the reference to the object is returned by default, this can be aliased to the value `id` and can be used as  `<<firstObject.id>>`, for example.

The request that follows creates (POST) a new dataset and then creates (POST) related views and transforms.

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/catalog/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
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
]'
```

The request involves several important fields, outlined in more detail below:
* `"id"`: User-supplied ID that is attached to the response object so that you can match up requests to responses. Catalog does not use this value except to pass it back in the response.
* `"resource"`: The resource path relative to the root (Catalog). The protocol and domain should not be part of this value and it is expected to be prefixed with "/". When using PATCH and DELETE, include the object `{id}` in the resource path. Not to be confused with the user-supplied `"id"`, the resource path uses the `{id}` of the dataset itself (e.g. `"resource": "/dataSets/1234567890"`).
* `"method"`: The name of the method (e.g. GET, PUT, POST, PATCH, DELETE) related to the action taking place in the request.
* `"body"`: The JSON document that would normally be passed as the payload in a POST, PUT, or PATCH request.

#### Response

Take care when inspecting the response to a multi-request, as you will need to verify the code of each individual request and not rely solely on the HTTP Status Code for the POST request.  It is possible for a single sub-request to return a 404 (for example a GET done on an invalid resource) while the overall request returns 200.

The response to a multi-request is an array with objects containing the `"id"` that you assigned to each request, the HTTP Status Code for the individual request, and the typical response `"body"` for a request of this nature. 

Since the three sample requests were all to create (POST) new objects, it makes sense that the "body" of each object is an array containing only the `{id}` of the newly created object, as is the standard with most successful POST responses in Catalog.

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
    },
    {
        "id": "thirdObjectId",
        "code": 200,
        "body": [
            "@/transforms/5be230aef5b02914cd52dbfc"
        ]
    }
]
```

## Filtering data with query parameters

Catalog allows response data to be filtered by specifying query parameters and attributes during your request. Best practices for Catalog Service include using query parameters to filter responses. Filters reduce the load on the API and help to improve overall performance.

Please refer to the [Catalog Service RESTful API](../../../../../../acpdr/swagger-specs/catalog.yaml) documentation to better understand what filters are available for a given API endpoint.  The following examples outline the most common types of filters used in Catalog.

### Filter by combining multiple filters

Using an ampersand (`&`), you can combine multiple filters in a single request. When additional conditions are added to a request, an AND relationship is assumed. 

#### API format

```http
GET /dataSets?{filter}={value}&{filter2}={value}&{filter3}={value}
```

### Filter using limits

To improve the speed of API requests, use the `limit` query parameter to constrain the number of objects returned.

Catalog responses are automatically metered according to configured limits:

* If a `limit` parameter is not specified, the maximum number of objects per response payload is 20.
* The global limit for all other Catalog queries is 100 objects.
* For dataset queries, if `observableSchema` is requested using the `properties` query parameter, the maximum number of datasets returned is 20.
* Invalid `limit` parameters (including `limit=0`) are met with a 400-level error response that outlines proper ranges.
* If limits or offsets are passed as query parameters, they take precedence over those passed as headers.

#### API format

```http
GET /dataSets?limit=3
```

#### Request

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/dataSets?limit=3 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

The above request will return three datasets (`limit=3`) and the details therein.

### Filter by displaying specific properties

Querying objects can often return more information than you actually need. To help reduce the load on the system, it is best practice to use the `properties` query parameter to return only the properties of the object that you need.

The `properties` parameter can be used to filter within a single object or a group of objects, returning only the requested properties in the response. You can use `properties` to return a single property or send a comma-separated list of top-level fields to return more than one. 

#### API format

```http
GET /dataSets?properties={property1},{property2},{property3}
GET /dataSets/{id}?properties={property1},{property2},{property3}
GET /dataSets/{id1},{id2},{id3},{id4}?properties={property1},{property2},{property3}
```

#### Request

The following request includes a comma-separated list of properties, as well as a `limit` to the number of datasets returned. If the request did not include a "limit" parameter, the response would contain a maximum of 20 objects.

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets?limit=4&properties=created,updated,name,schemaRef' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

The response object includes four datasets (`limit=4`) with only the requested properties displayed. If a dataset does not include any of the requested properties it will display as an empty object `{}` ("Dataset1" below) or as an object showing any of the requested properties that it does include ("Dataset2").

A dataset may return a requested property as an empty object if it contains the property but there is no value ("Dataset3"). 

Otherwise, the dataset will display the full value of all requested properties ("Dataset4").

```json
{
    "Dataset1": {
        "name": "Dataset 1",
        "created": 1554233977834,
        "updated": 1554244841056
    },
    "Dataset2": {
        "name": "Dataset 2",
        "created": 1541284178110,
        "updated": 1541284608521,
        "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/bc82c518380478b59a95c63e0f843121",
            "contentType": "application/vnd.adobe.xed+json;version=1"
        }
    },
    "Dataset3": {
        "name": "Dataset 3",
        "created": 1541028420007,
        "updated": 1541028428418
    },
    "Dataset4": {
        "name": "Dataset 4",
        "created": 1540270671178,
        "updated": 1540297501986,
        "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/142afb78d8b368a5ba97a6cc8fc7e033",
            "contentType": "application/vnd.adobe.xed+json;version=1"
        }
    }
}
```

### Filter by shifting response list forward

To shift the response list forward, or "offset" the results, you can use the `start` query parameter. Remember that the `start` parameter uses zero-based numbering with the origin index being zero. (In other words, to access the third object you would write `start=2` because the first object has an index equal to zero.) 

If the `start` parameter is not paired with a `limit` parameter, the maximum number of objects returned is 20.

#### API format

```http
GET /dataSets?start={number}
```
#### Request

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/dataSets?limit=2&start=4 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

The response includes a JSON object containing two top-level items (`limit=2`), one for each dataset and its details (details have been condensed). The response is shifted by four (`start=4`), meaning the datasets shown are number five and six chronologically.

```json
{
    "Dataset5": {},
    "Dataset6": {}
}
```

### Filter using tags

Some objects in Catalog support the use of tags. Tags can be used to attach information to an object and then be used later to retrieve the object. The choice of what tags to use and how to apply them depends on your organizational processes, however there are a few limitations to tags:

* The only Catalog objects that currently support tags are Datasets, Batches, and Connections.
* Tag names are unique to your IMS organization, meaning that you cannot see tags created by other organizations, nor can they see yours.
* Adobe processes may leverage tags for specific behaviors and would, as a standard, prefix used tag names with "adobe". Therefore, you should avoid this convention in declaring tag names.
* The following are reserved tag names, used across Experience Platform, and therefore cannot be declared as a tag name for your organization:
  * "unifiedProfile" - This tag name is reserved for datasets to be ingested by Unified Profile.
  * "unifiedIdentity" - This tag name is reserved for datasets to be ingested by Unified Identity.

#### API format

Filter by a specific tag having a specific value:
```
GET /dataSets?tags={TAG_NAME}:{TAG_VALUE}
```
Filter by multiple tags having specific values (assumes an AND relationship):
```
GET /dataSets?tags={TAG_NAME}:{TAG_VALUE},{TAG2_NAME}:{TAG2_VALUE}
```
Filter by a tag value containing a wildcard (e.g. `test*` returns any dataset where the tag value begins with "test"):
```
GET /dataSets?tags={TAG_NAME}:{TAG_VALUE}*
```
Filter by the existence of a specific tag. This request uses a wildcard (`*`) to accept any value:
```
GET /dataSets?tags={TAG_NAME}:*
```

#### Request

This sample dataset contains `"tags"`:

```json
{
    "5be1f2ecc73c1714ceba66e2": {
        "imsOrg": "{IMS_ORG}",
        "tags": {
            "sampleTag": [
                "123456"
            ],
            "secondTag": [
                "tag_string"
            ]
        },
        "name": "Sample Dataset",
        "description": "Same dataset containing sample data.",
        "dule": {
            "identity": [
                "I1"
            ]
        },
        "statsCache": {},
        "state": "DRAFT",
        "lastBatchId": "ca12b29612bf4052872edad59573703c",
        "lastBatchStatus": "success",
        "lastSuccessfulBatch": "ca12b29612bf4052872edad59573703c",
        "namespace": "{NAMESPACE}",
        "createdUser": "{CREATED_USER}",
        "createdClient": "{CREATED_CLIENT}",
        "updatedUser": "{UPDATED_USER}",
        "version": "1.0.0",
        "created": 1541534444286,
        "updated": 1541534444286
    }
}

```
The following sample request could be made to filter by one tag having a specific value AND the second tag being present.
```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/dataSets?tags=sampleTag:123456,secondTag:* \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

The response contains individual objects that meet the parameters. Unless a limit was also specified, the response will contain a maximum of 20 objects. 

In the sample response below, the objects are minimized for space but when expanded would contain the details for each dataset.

```json
{
    "5be1f2ecc73c1714ceba66e2": {},
    "5bb276b03a14440000971552": {},
    "5bde21511dd27b0000d24e95": {},
    "5bda3a4228babc0000126377": {},
    "5bceaa4c26c115000039b24b": {}
}
```

### Filter using date range queries

Some Catalog APIs have query parameters that allow for ranged queries, most often in the case of dates. Each service will indicate which attributes are allowed. When additional params are added to a query, the operation is assumed to be additive (AND).

#### API format

```http
GET /batches?createdAfter={UNIX Epoch Time}&createdBefore={UNIX Epoch Time}
```

#### Request

The following request returns batches created during the month of April 2019.
```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/batches?createdAfter=1554076800000&createdBefore=1556668799000' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

### Filter by sorting

Sorting response data involves using the `orderBy` query parameter. This parameter requires a "direction" (`asc` for ascending or `desc` for descending), a colon (`:`) and then the field to be sorted by. If a direction is not specified, the default direction is ascending.

Sort parameters can be joined together allowing you to order by one field and then determine direction based on another. 

#### API format

```http
GET /dataSets?orderBy=asc:created
GET /dataSets?orderBy=desc:created
GET /dataSets?orderBy=created,desc:updated
```

### Filter by property

Certain Catalog APIs, such as `/dataSets` allow filtering by property. Some simple filters are designed for equivalency comparisons, while others support wildcards.  

#### API format

```http
GET /dataSets?property={VALUE}
```

|Supported Operations|Description|
|---|---|
|Existence|Stating only the property name will only return entries where the property exists|
|~|Match the (string) value against a regular expression|
|< , > , <= , >= , == , !=|Comparison of the field value against another field or value|

> **Note:** Simple filters support the ability to pass in a set of values.  If a set is passed in, it is treated like an "in" clause for an array (i.e. is the value of this field in the provided list).  You can invert the query by prefixing a `!` character to the list to return "where the value is not in the provided list" (e.g. `/dataSets?name=!samplename,anothername`).

#### Additional Examples

|Usage|Explanation|
|---|---|
|`GET /dataSets?property=name`|Returns only datasets which contain the property `name`|
|`GET /dataSets?property=!name`|Returns only datasets that don't contain the property `name`|
|`GET /dataSets?property=name~^Sample`|Returns only datasets whose name starts with the word `Sample`|
|`GET /dataSets?property=version>1.0.0`|Returns only datasets whose version are greater than 1.0.0|

> **Note:** The `name` property supports the use of a wildcard `*` character within, or as, the search string. Wildcards match empty/no character, such that the search string `te*st` will match the value "test". Asterisks are escaped using `**` (double asterisk) to represent a single asterisk as a literal string in your search string.

#### Request

The following request will return any datasets with a version number greater than 1.0.3.

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/dataSets?property=version>1.0.3 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```
Any top-level object property can be used in the request, meaning that for the following sample object, you could filter by property for "name", "description", and "subItem", but NOT by "sampleKey".

```json
{
  "5ba9452f7de80400007fc52a": {
      "name": "Sample Dataset",
      "description": "Sample dataset containing important data",
      "subitem": {
          "sampleKey": "sampleValue"
      }
  }
}
```

#### Response

The response object for the above request contains objects for each dataset that meets the criteria. Without specifying a limit, the maximum number of objects in the response will be 20.

## Headers

Catalog provides visibility into the success of data ingestion by giving you access to reported errors and provides several header conventions to help you maintain the integrity of your data during updates.

### E-Tag/If-Match

It is good practice to use object versioning to prevent the type of data corruption that occurs when an object is saved by multiple users near-simultaneously. 

Best practice when updating an object involves first making an API call to view (GET) the object to be updated. Contained within the response (and any call where the response contains a single object) is an `E-Tag` header containing the version of the object. Adding the object version as a request header named `If-Match` in your update (PUT or PATCH) calls will result in the update only succeeding if the version is still the same, helping to prevent data collision.

If the versions do not match (the object was modified by another process since you received it), you will receive HTTP Status Code 412 (Precondition Failed) indicating that access to the target resource has been denied.

### Pragma

On occasion, you may wish to validate an object without saving the information. If you require the ability to POST or PUT for validation purposes only, and do not wish the data in the request to be persisted, you can use a Pragma header set to `validate-only`. 




