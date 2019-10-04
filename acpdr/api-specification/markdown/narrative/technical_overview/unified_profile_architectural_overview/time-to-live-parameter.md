# Time-to-live parameter in Adobe Experience Platform

Adobe Experience Platform allows you to delete customer data as it becomes less relevant by means of the time-to-live (TTL) parameter.  

This overview will help you understand the role and use of TTL within the context of Experience Events. The following topics are covered:

* [Understanding TTL](#understanding-ttl): Understand the big picture about TTL and its role within Experience Platform.
* [Getting started with the Catalog Service API](#getting-started-with-the-catalog-service-api): Learn how to use the Schema Registry API
* [Configure TTL](#configure-ttl-at-the-dataset-level): Familiarize yourself with TTL in dataset tags.

## Understanding TTL

Data in Adobe Experience Platform is grouped into two types: record and time-series. While record data is comprised of attributes, time series data represents a snapshot of the system when a direct or indirect action was taken. See the section on [data behaviors](../schema_registry/xdm_system/xdm_system_in_experience_platform#data-behaviors-in-xdm-system.md) in the Experience Data Model (XDM) System overview for more information.

Experience Events use record and time series data to represent immutable records of the various interactions customers can have with your brand in sequence, storing them within [Real-time Customer Profile](unified_profile_architectural_overview.md). While data ingestion allows you to capture recent customer activities, the TTL parameter allows you to discard data as its value deteriorates relative to recently ingested customer data. 

TTL allows you to control the length of time (in seconds) that time-series data is persisted. Once the TTL parameter has expired, the associated data is removed from Real-time Customer Profile. Although the default value is set to 120 days, this parameter is configurable to any value, including "never delete".
 
TTL is configured by applying TTL tags to datasets. The tag adds a specified TTL value to a dataset, and will apply to all data that is ingested into that dataset (either by batch ingestion or streaming ingestion). An example API call for adding a TTL tag to a dataset is provided in a subsequent section of this document.

> Note: TTL should be applied to Experience Event datasets only and not Profile datasets.

## Getting started with the Catalog Service API

This tutorial also requires you to have completed the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) in order to successfully make calls to Platform APIs. Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

* Authorization: Bearer `{ACCESS_TOKEN}`
* x-api-key: `{API_KEY}`
* x-gw-ims-org-id: `{IMS_ORG}`

All POST, PUT, and PATCH requests require an additional header:

* Content-Type: application/json

## Configure TTL at the dataset level
 
TTL can be specified at the dataset level by specifying the `id` of a dataset in a PATCH request to the [Catalog Service API](../../../../../../acpdr/swagger-specs/catalog.yaml)

#### API format

```http
PATCH /datasets/{DATASET_ID}
```
* `{DATASET_ID}`: The `id` value of the dataset you want to configure TTL for.

#### Request

The following request updates the `tags` property of the dataset specified in the request path. It adds a new string to the `Profile` array that takes the form of a key-value pair: `"ttlInDays:{TIME_IN_DAYS}"`, where `{TIME_IN_DAYS}` can be any positive integer. If you want the TTL value to be "never delete", set the integer to -1.

```shell
curl -X PATCH \
  https://platform.adobe.io/data/foundation/catalog/datasets/5d8e9cf5872f18164763f971 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' \
  -d ' {
    "tags" : {
	    "Profile": ["enabled:true", "ttlInDays:90"],
	    "Identity": ["enabled:true"]
    }
 }
```
* `tags > Profile`: An array that accepts TTL strings for configuration purposes.

> **Important:** Be sure to include any existing tags for the specified dataset within the payload. Omitting existing tags will cause the request to attempt to overwrite those tags, which will result in a 403 (Forbidden) error.

#### Response

A successful response returns HTTP status 200 (OK) along with the ID of the dataset in the response payload. Performing a lookup (GET) request on the dataset will show the newly added tag under the dataset's `tags` property.

```json
[
    "@/dataSets/5d8e9cf5872f18164763f971"
]
```
