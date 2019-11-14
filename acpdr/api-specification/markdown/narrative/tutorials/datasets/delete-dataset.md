# Delete a dataset or specific batch in a dataset

Adobe Experience Platform enables you to ingest data from multiple sources and build robust profiles for individual customers. Occasionally it may be necessary to delete a dataset, or an individual batch from within a dataset, to remove data from Platform that you no longer require. This tutorial provides step-by-step instructions for working with Profile System Jobs in order to delete a dataset or delete a specific batch within a dataset using the [Real-time Customer Profile API](../../../../../../acpdr/swagger-specs/real-time-customer-profile.yaml). 

This tutorial includes the following operations:

* [View all delete requests created by your organization](#view-delete-requests)
* [Create a new delete request](#create-a-delete-request)
  * [Delete a dataset](#delete-a-dataset)
  * [Delete a batch](#delete-a-batch)
* [Check the status of a specific delete request by its ID](#lookup-a-delete-request)
* [Remove a delete request](#remove-a-delete-request)

## Getting started

This tutorial requires a working understanding of the various Adobe Experience Platform services involved in creating audience segments. Before beginning this tutorial, please review the documentation for the following services:

* [Real-time Customer Profile](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md): Provides a unified, customer profile in real-time based on aggregated data from multiple sources.
* [Data Ingestion](https://www.adobe.io/apis/experienceplatform/home/data-ingestion.html): The ability to bring data into Platform via batch ingestion, streaming ingestion, and third-party data connectors.
* [Data Access](../../technical_overview/data_access_architectural_overview/data_access_architectural_overview.md): The Data Access API enables you to easily discover and access ingested datasets within Experience Platform.
* [Experience Data Model (XDM)](../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Platform organizes customer experience data.
* [Sandboxes](../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

### Required headers

This tutorial also requires you to have completed the [authentication tutorial](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) in order to successfully make calls to Platform APIs. Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

* Authorization: Bearer `{ACCESS_TOKEN}`
* x-api-key: `{API_KEY}`
* x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform are isolated to specific virtual sandboxes. Requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

* x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../../technical_overview/sandboxes/sandboxes-overview.md). 

All POST, PUT, and PATCH requests require an additional header:

* Content-Type: application/json

## View delete requests

A delete request is a long-running, asynchronous process, meaning that your organization may be running multiple delete requests at once. In order to view all delete requests that your organization is currently running, you can perform a GET request to the `/system/jobs` endpoint. 

#### API format

```http
GET /system/jobs
GET /system/jobs?{QUERY_PARAMETERS}
```

You may also use optional query parameters to filter the list of delete requests returned in the response. To use multiple parameters, separate each parameter using an ampersand (`&`). Commonly used parameters include:
  * **start**: Offset the page of results returned, as per the create time of the request. Example: `start=4`  
  * **limit**: Limit the number of results returned. Example: `limit=10`  
  * **page**: Return a specific page of results, as per the create time of the request. Example: `page=2`
  * **sort**: Sort results by a specific field in ascending (`asc`) or descending (`desc`) order. The sort parameter does not work when returning multiple pages of results. Example: `sort=batchId:asc` 

#### Request

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/system/jobs \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
```
#### Response

The response includes a "children" array with an object for each delete request containing the details of that request.

```json
{
  "_page": {
    "count": 100,
    "next": "K1JJRDpFaWc5QUwyZFgtMEpBQUFBQUFBQUFBPT0jUlQ6MSNUUkM6MiNGUEM6QWdFQUFBQVFBQWZBQUg0Ly9yL25PcmpmZndEZUR3QT0="
  },
  "children": [
    {
      "id": "9c2018e2-cd04-46a4-b38e-89ef7b1fcdf4",
      "imsOrgId": "{IMS_ORG}",
      "batchId": "8d075b5a178e48389126b9289dcfd0ac",
      "jobType": "DELETE",
      "status": "COMPLETED",
      "metrics": "{\"recordsProcessed\":5,\"timeTakenInSec\":1}",
      "createEpoch": 1559026134,
      "updateEpoch": 1559026137
    },
    {
      "id": "3f225e7e-ac8c-4904-b1d5-0ce79e03c2ec",
      "imsOrgId": "{IMS_ORG}",
      "dataSetId": "5c802d3cd83fc114b741c4b5",
      "jobType": "DELETE",
      "status": "PROCESSING",
      "metrics": "{\"recordsProcessed\":0,\"timeTakenInSec\":15}",
      "createEpoch": 1559025404,
      "updateEpoch": 1559025406
    }
  ]
}
```

* **_page.count**: The total number of requests. This response has been truncated for space.
* **_page.next**: If an additional page of results exists, view the next page of results by replacing the ID value in a [lookup request](#lookup-a-delete-request) with the "next" value provided.
* **jobType**: The type of job being created, in this case it will always return "DELETE".
* **status**: The status of the delete request. Possible values: "NEW", "PROCESSING", "COMPLETED", "ERROR".
* **metrics**: An array that includes the number of records that have been processed ("recordsProcessed") and the time in seconds that the request has been processing, or how long the request took to complete ("timeTakenInSec").

## Create a delete request

Initiating a new delete request is done through a POST request to the `/systems/jobs` endpoint, where the ID of the dataset or batch to be deleted is provided in the body of the request.

### Delete a dataset

In order to delete a dataset, the dataset ID must be included in the body of the POST request. This action will delete ALL data for a given dataset. Experience Platform allows you to delete datasets based on both record and time series schemas.

#### API format

```http
POST /system/jobs
```

#### Request

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/system/jobs \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
        "dataSetId": "5c802d3cd83fc114b741c4b5"
      }'
```

* **dataSetId**: **(Required)** The ID of the dataset you wish to delete.

#### Response

A successful request returns the details of the newly created delete request, including a unique, system-generated, read-only ID for the request. This is can be used to lookup the request and check its status. The "status" for the request at time of creation is typically "NEW" until it begins processing. The "dataSetId" in the response should match the "dataSetId" sent in the request.

```json
{
    "id": "3f225e7e-ac8c-4904-b1d5-0ce79e03c2ec",
    "imsOrgId": "{IMS_ORG}",
    "dataSetId": "5c802d3cd83fc114b741c4b5",
    "jobType": "DELETE",
    "status": "NEW",
    "createEpoch": 1559025404,
    "updateEpoch": 1559025406
}
```

* **id**: The unique, system-generated, read-only ID of the delete request.
* **dataSetId**: The ID of the dataset, as specified in the POST request.

### Delete a batch

In order to delete a batch, the batch ID must be included in the body of the POST request. Please be advised that you cannot delete batches for datasets based on record schemas. Only batches for datasets based on time series schemas may be deleted. 

> **Note:** The reason you cannot delete batches for datasets based on record schemas is because record type dataset batches overwrite previous records and therefore cannot be "undone" or deleted. The way to remove the impact of erroneous batches for datasets based on record schemas is to reingest the batch with the correct data and it will overwrite the incorrect records. 

For more information on record and time series behavior, please review the [section on XDM data behaviors](../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md#data-behaviors-in-xdm-system) in the [XDM System overview](../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md).

#### API format

```http
POST /system/jobs
```

#### Request

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/system/jobs \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
       "batchId": "8d075b5a178e48389126b9289dcfd0ac"
      }'
```

* **batchId**: **(Required)** The ID of the batch you wish to delete.

#### Response

A successful request returns the details of the newly created delete request, including a unique, system-generated, read-only ID for the request. This is can be used to lookup the request and check its status. The "status" for the request at time of creation is typically "NEW" until it begins processing. The "batchId" in the response should match the "batchId" sent in the request.

```json
{
    "id": "9c2018e2-cd04-46a4-b38e-89ef7b1fcdf4",
    "imsOrgId": "{IMS_ORG}",
    "batchId": "8d075b5a178e48389126b9289dcfd0ac",
    "jobType": "DELETE",
    "status": "NEW",
    "createEpoch": 1559026131,
    "updateEpoch": 1559026132
}
```

* **id**: The unique, system-generated, read-only ID of the delete request.
* **batchId**: The ID of the batch, as specified in the POST request.

If you attempt to initiate a delete request for a Record dataset batch, you will encounter a 400-level error, similar to the following:

```json
{
    "requestId": "bc4eb29f-63a8-4653-9133-71238884bb81",
    "errors": {
        "400": [
            {
                "code": "500",
                "message": "Batch can only be specified for EE type 'a294e36d382649dab2cc6ad64a41b674'"
            }
        ]
    }
}
```

## Lookup a delete request

To view a specific delete request, including details such as its "status", you can perform a GET request to the `/system/jobs` endpoint and include the ID of the delete request in the request path.

#### API format

```http
GET /system/jobs/{DELETE_REQUEST_ID}
```

* **{DELETE_REQUEST_ID}**: **(Required)** The ID of the delete request that you wish to view.

#### Request

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/system/jobs/9c2018e2-cd04-46a4-b38e-89ef7b1fcdf4 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
```

#### Response

The response includes the details of the delete request, including its updated status. The ID of the delete request in the response should match the ID sent in the request path.

```json
{
    "id": "9c2018e2-cd04-46a4-b38e-89ef7b1fcdf4",
    "imsOrgId": "{IMS_ORG}",
    "batchId": "8d075b5a178e48389126b9289dcfd0ac",
    "jobType": "DELETE",
    "status": "COMPLETED",
    "metrics": "{\"recordsProcessed\":5,\"timeTakenInSec\":1}",
    "createEpoch": 1559026134,
    "updateEpoch": 1559026137
}
```

* **jobType**: The type of job being created, in this case it will always return "DELETE".
* **status**: The status of the delete request. Possible values: "NEW", "PROCESSING", "COMPLETED", "ERROR".
* **metrics**: An array that includes the number of records that have been processed ("recordsProcessed") and the time in seconds that the request has been processing, or how long the request took to complete ("timeTakenInSec").  

Once the delete request status is "COMPLETED" you can confirm that the data has been deleted by attempting to access the deleted data using the Data Access API. For step-by-step instructions on how to use the Data Access API to access datasets and batches, please review the [Data Access tutorial](../../tutorials/data_access_tutorial/data_access_tutorial.md).

## Remove a delete request

Experience Platform allows you to delete a previous request, which may be useful for a number of reasons including if the delete job did not complete or became stuck in the processing stage. In order to remove a delete request, you can perform a DELETE request to the `/system/jobs` endpoint and include the ID of the delete request that you wish to remove to the request path.

#### API format

```http
DELETE /system/jobs
```

#### Request

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/system/jobs/9c2018e2-cd04-46a4-b38e-89ef7b1fcdf4 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
```

#### Response

A successful delete request returns HTTP Status 200 (OK) and an empty response body. You can confirm the request was deleted by performing a GET request to lookup the delete request by its ID. This will return an HTTP Status 404 (Not Found), indicating the delete request was removed.

## Next Steps

After completing this tutorial, you now know the steps involved in deleting datasets and batches containing data that you no longer need in Experience Platform. You can now begin to delete data from your organization, being mindful that the delete request cannot be undone, therefore you should only delete data that you are confident you do not need now and will not need in the future.