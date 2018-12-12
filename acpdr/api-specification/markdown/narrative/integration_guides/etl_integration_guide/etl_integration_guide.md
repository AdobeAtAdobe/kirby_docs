# Data Integration Patterns for ETL Tools

Partners are key to the success of Adobe Experience Platform, and the [Adobe Exchange program](https://partners.adobe.com/exchangeprogram/experiencecloud.html) assists with varying levels of partner integration through multiple benefit packages, including Experience Platform, with the ETL Ecosystem. To support Adobe Exchange partners participating in the ETL Ecosystem program, Adobe and their partners can create premium ETL connectors to integrate with Adobe Experience Platform.

In this guide you will learn how to create high-performance, secure connectors for Adobe/partner integration, including implementation of Experience Platform functions. Building secure connectors allows Adobe and partners to effectively implement both Adobe Experience Platform and partner ETL capabilities.

## Developing ETL Integrations for Adobe Experience Platform

This guide outlines general steps for ingesting data into Adobe Experience Platform.

The ETL Connector for Adobe Experience Platform is located, installed, and operated entirely within the ETL Ecosystem. Experience Platform provides data storage, administration, access, usage controls, and other domain-specific data services. Experience Platform also exposes common RESTful APIs including:

-   [Catalog](../../../../../../acpdr/swagger-specs/catalog.yaml)
-   [Data Access](../../../../../../acpdr/swagger-specs/data-access-api.yaml)
-   [Batch Ingestion](../../../../../../acpdr/swagger-specs/bulk-ingest-api.yaml)
-   [Authentication and Authorization APIs](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md)

This guide also includes sample API calls for ETL partners to use when designing a connector, with links to documentation that outlines each Experience Platform service, and use of the API, in more detail. 

A sample reference integration is available as Apache 2.0 license on [Github](https://github.com/adobe/acp-data-services-etl-reference).


## Workflow

The following workflow diagram provides a high-level overview for the integration of Adobe Experience Platform components and the ETL application and connector.

![](media/etl.png)


## Adobe Experience Platform Components 

There are multiple Experience Platform components involved in ETL partner integration. The following list outlines several key components and functionalities for ETL partners:

-   **Data Discovery** - Records the metadata of ingested and transformed data in Experience Platform.
-   **Data Access** - Provides users the interface to access their data in Experience Platform.
-   **Data Ingestion** – Pushes data to Experience Platform with Data Ingestion APIs.
-   **Adobe Identity Management System (IMS)** - Provides framework for authentication to Adobe services.
-   **IMS Organization** - A corporate entity that can own or license products and services and allow access to its members.
-   **IMS User** - Members of an IMS Organization. The Organization to User relationship is many to many.

## Authenticating to Adobe Experience Platform

Adobe is committed to privacy and security. Nearly all Adobe services require your application to authenticate through the Adobe IMS to receive client credentials. Client credentials determine the access and permissions granted to your application.

Any API that accesses a service or content on behalf of an end-user must authenticate using OAuth and JSON Web Token (JWT) standards.

-   Your application must be registered through the Adobe I/O Console. The I/O Console is where you can generate an API Key, an important requirement to obtain client credentials.
-   If your integration needs to access content or a service for an end user, that user must be authenticated as well. Your integration will need to pass the OAuth token granted by Adobe IMS.
-   For service-to-service integrations, you will also need a JSON Web Token (JWT) that encapsulates your client credentials and authenticates the identity of your integration. You can exchange the JWT for the OAuth token that authorizes access. 

The [Adobe I/O Authentication](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html) guide provides step-by-step instructions for authenticating to Experience Platform.

## Design Phase

To begin, a partner logs in to the user interface (UI) for Experience Platform and creates datasets for ingestion using a standard connector or push-service connector.

In the UI, the partner creates the output dataset by selecting Profile, ExperienceEvent, or other schema in the Experience Data Model (XDM) Registry.

In the ETL tool, the partner will start designing their mapping transforms after configuring the appropriate connection (using their credentials). The ETL tool is assumed to already have Experience Platform connectors installed (process not defined in this Integration Guide).

Generic mockups for a sample ETL tool and workflow have been provided in the [ETL Workflow](etl_workflow.md) guide. While ETL tools may differ in format, most expose similar functionality.

_**Note**_: Partners will also have to specify a time stamp filter marking the date to ingest data and offset (i.e. The window for which data is to be read). The ETL tool should support taking these two parameters in this or another relevant UI. In Adobe Experience Platform, these parameters will be mapped to either available dates (if present) or captured date present in batch object of dataset.

### View List of Datasets

Using the source of data for mapping, a list of all available datasets can be fetched using the [Catalog API](../../../../../../acpdr/swagger-specs/catalog.yaml). 

You can issue a single API request to view all available datasets (e.g. `GET /datasets`), with best practice being to include query parameters that limit the size of the response. 

In cases where _full_ dataset information is being requested the response payload can reach past 3GB in size, which can slow overall performance. Therefore, using query parameters to filter only the information needed will make Catalog queries more efficient.

Refer to the [Catalog Service Overview](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md) for detailed information on querying datasets and available response filters.

#### Best Practices When Querying Datasets

It is best practice to use query parameters whenever possible when using Experience Platform APIs. You can use multiple filters in a single call by separating parameters with an ampersand (`&`). Some query parameters accept comma-separated lists of values, such as the "properties" filter in the sample request below. 

The "limit" query parameter constrains the number of objects returned. Catalog responses are automatically metered according to configured limits:

- If a limit parameter is not specified, the maximum number of objects per response payload is 20.
- The global limit for all other Catalog queries is 100 objects.
- For dataset queries, if observableSchema is requested using the properties query parameter, the maximum number of datasets returned is 20.
- Invalid limit parameters (including `limit=0`) are met with an HTTP 400 error that outlines proper ranges.
- If limits or offsets are passed as query parameters, they take precedence over those passed as headers.

Query parameters are covered in more detail in the [filtering data with query parameters](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md#filtering-data-with-query-parameters) section of the [Catalog Service Overview](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md).

#### Request

```SHELL
curl -X GET "https://platform.adobe.io/data/foundation/catalog/datasets?limit=5&properties=name,description,schema" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}" \
  -H "x-gw-ims-org-id: {IMS_ORG}"
```

Please refer to the [Catalog Service Overview](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md) for detailed examples of how to use the [Catalog API](../../../../../../acpdr/swagger-specs/catalog.yaml).

### View Dataset Schema

The "schema" property of a dataset contains an API link pointing to an external definition in the [XDM Schema Registry](../../technical_overview/schema_registry/acp_schema_registry.md). The registry schema represents the list of all _potential_ fields that could be used by the dataset, not necessarily the fields that _are_ being used (see "observableSchema" below). 

This is the schema you use when you need to present the user with a list of all available fields that could be written to.

The schema being referenced by a dataset can be found by looking at the "schema" property. 

```json
{
    "5ba9452f7de80400007fc52a": {
        "name": "Sample Dataset 1",
        "description": "Description of Sample Dataset 1.",
        "schema": "@/xdms/context/person"
    }
}
```

The "schema" value (`@/xdms/context/person` above) points to a specific schema in the XDM Schema Registry. Detailed use of the XDM Schema Registry API and best practices in defining XDM Field Types can be found in the [XDM Schema Registry Guide](../../technical_overview/schema_registry/acp_schema_registry.md).

You can retrieve the schema by sending a request as shown in the sample request below.

#### Request

```SHELL
curl -X GET "https://platform.adobe.io/data/foundation/catalog/xdms/context/person?expansion=xdm" \
  -H "Accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}"
``` 

_**Note:**_ `expansion=xdm` is an optional query parameter that tells the API to fully expand and in-line any referenced schemas. You may want to do this when presenting a list of all potential fields to the user.

The JSON schema that is returned describes the structure and field level "type", "format", "minimum", and "maximum" that represents the data serialized as JSON. If using a serialization format other then JSON for ingestion, you should use data types that match the "meta:xdmType" as described in the [Mapping XDM Types to Other Formats](../../technical_overview/schema_registry/acp_schema_registry.md#mapping-xdm-types-to-other-formats) table. This table, along with in-depth examples of how to use the XDM Schema Registry API can be found in the [Schema Registry Guide](../../technical_overview/schema_registry/acp_schema_registry.md).

#### Dataset "fields" Property (DEPRECATED - EOL 2019-01-19)

Datasets contain a "fields" property that is deprecated and remains available temporarily for backwards compatibility. It should only be used if the "schema" property is NOT populated. 

The "fields" property represents the schema for both reading and writing. The JSON structure of the "fields" attribute is different from the standard JSON schema format used by the schema registry and the "observableSchema" property (outlined below).

```json
{
    "598d6e81b2745f000015edcb": {
        "fields": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "age",
                "type": "string"
            }
        ],
    }
}
```

#### The "observableSchema" Property

The "observableSchema" property of a dataset has a JSON structure matching that of the XDM schema JSON. The "observableSchema" contains the fields that were present in the incoming input files. When writing data to Experience Platform, a user is not required to use every field from the target schema. Instead they should supply only those fields that are being used. 

The observable schema is the schema that you would use if reading the data or presenting a list of fields that are available to read/map from.

```json
{
    "598d6e81b2745f000015edcb": {
        "observableSchema": {
            "type": "object",
            "meta:xdmType": "object",
            "properties": {
                "name": {
                    "type": "string",
                },
                "age": {
                    "type": "string",
                }
            }
        }
    }
}
```

### Preview Data

The ETL application may provide a capability to preview data (["Figure 8" in the ETL Workflow](etl_workflow.md)). The Data Access API also provide several options to preview data. 

Additional information, including step-by-step guidance for previewing data using the Data Access API, can be found in the [How to Query Data via Data Access API](../../tutorials/data_access_tutorial/data_access_tutorial.md) tutorial.

### Get Dataset Details Using "properties" Query Parameter 

As shown in the steps above to [view a list of datasets](#view-list-of-datasets), you can request "files" using the "properties" query parameter.

You can refer to the [Catalog Service Overview](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md) for detailed information on querying datasets and available response filters.

#### Request

```SHELL
curl -X GET "https://platform.adobe.io/data/foundation/catalog/datasets?limit=1&properties=files" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}" \
  -H "x-gw-ims-org-id: {IMS_ORG}"
```

#### Response

The response will include one dataset (`limit=1`) showing the "files" property.

```json
{
  "5bf479a6a8c862000050e3c7": {
    "files": "@/dataSets/5bf479a6a8c862000050e3c7/views/5bf479a654f52014cfffe7f1/files"
  }
}
```

### List Dataset Files Using "files" Attribute

You can also use a GET request to fetch file details using the "files" attribute.

#### Request
```shell
curl -X GET "https://platform.adobe.io/data/foundation/catalog/dataSets/5bf479a6a8c862000050e3c7/views/5bf479a654f52014cfffe7f1/files" \
  -H "Accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

##### Response

The response includes file IDs as top-level properties and file details contained within each file object.

```json
{
    "194e89b976494c9c8113b968c27c1472-1": {
        "batchId": "194e89b976494c9c8113b968c27c1472",
        "dataSetViewId": "5bf479a654f52014cfffe7f1",
        "imsOrg": "{IMS_ORG}",
        "availableDates": {},
        "createdUser": "{USER_ID}",
        "createdClient": "{API_KEY}",
        "updatedUser": "{USER_ID}",
        "version": "1.0.0",
        "created": 1542749145828,
        "updated": 1542749145828
    },
    "14d5758c107443e1a83c714e56ca79d0-1": {
        "batchId": "14d5758c107443e1a83c714e56ca79d0",
        "dataSetViewId": "5bf479a654f52014cfffe7f1",
        "imsOrg": "{IMS_ORG}",
        "availableDates": {},
        "createdUser": "{USER_ID}",
        "createdClient": "{API_KEY}",
        "updatedUser": "{USER_ID}",
        "version": "1.0.0",
        "created": 1542752699111,
        "updated": 1542752699111
    },
    "ea40946ac03140ec8ac4f25da360620a-1": {
        "batchId": "ea40946ac03140ec8ac4f25da360620a",
        "dataSetViewId": "5bf479a654f52014cfffe7f1",
        "imsOrg": "{IMS_ORG}",
        "availableDates": {},
        "createdUser": "{USER_ID}",
        "createdClient": "{API_KEY}",
        "updatedUser": "{USER_ID}",
        "version": "1.0.0",
        "created": 1542756935535,
        "updated": 1542756935535
    }
}
```

### Fetch File Details

The file IDs returned in the previous response can be used in a GET request to fetch further file details via the Data Access API. 

The [Data Access Overview](../../technical_overview/data_access_architectural_overview/data_access_architectural_overview.md) contains details on how to use the Data Access API.

#### Request

```shell
curl -X GET "https://platform.adobe.io/data/foundation/export/files/ea40946ac03140ec8ac4f25da360620a-1" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

#### Response
```json
[
    {
    "name": "{FILE_NAME}.parquet",
    "length": 2576,
    "_links": {
        "self": {
            "href": "https://platform.adobe.io/data/foundation/export/files/{FILE_ID}?path={FILE_NAME}.parquet"
            }
        }
    }
]
```

### Preview File Data

The "href" property an be used to fetch preview data via the [Data Access API](../../technical_overview/data_access_architectural_overview/data_access_architectural_overview.md) .

#### Request

```shell
curl -X GET "https://platform.adobe.io/data/foundation/export/files/ea40946ac03140ec8ac4f25da360620a-1?path=samplefile.parquet" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

The response to the above request will contains a preview of the file's contents. 

More information on the Data Access API, including detailed requests and responses, is available in the [Data Access Overview](../../technical_overview/data_access_architectural_overview/data_access_architectural_overview.md).

### Get "fileDescription" from Dataset

The destination component as output of transformed data, the Data Engineer will choose an Output Dataset (["Figure 12" in the ETL Workflow](etl_workflow.md)). The XDM schema is associated with the output Dataset. The data to be written will be identified by the "fileDescription" attribute of the dataset entity from the Data Discovery APIs. This information can be fetched using a dataset ID (`{DATASET_ID}`). The "fileDescription" property in the JSON response will provide the requested information. 

#### Request
```shell
curl -X GET "https://platform.adobe.io/data/foundation/catalog/dataSets/{dataset_ID}" \
-H "accept: application/json" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
```

#### Response

```json
{
"59c93f3da7d0c00000798f68": {
    "version": "1.0.4",
    "fileDescription": {
        "persisted": false,
        "format": "parquet"
    }
}
```

Data will be written to Experience Platform using the [Batch Ingestion API](../../../../../../acpdr/swagger-specs/bulk-ingest-api.yaml).  Writing of data is an asynchronous process. When data is written to Adobe Experience Platform, a batch is created and marked as a success only after data is fully written.

Data in Experience Platform should be written in the form of parquet files.

## Execution phase

As the execution starts, the connector (as defined in the source component) will read the data from Experience Platform using the [Data Access API](../../../../../../acpdr/swagger-specs/data-access-api.yaml). The transformation process will read the data for a certain time range. Internally, it will query batches of source datasets. While querying, it will use a parameterized (rolling for time series data, or incremental data) start date and list dataset files for those batches, and start making requests for data for those dataset files.

### Read Data from Experience Platform

Using the [Catalog API](../../../../../../acpdr/swagger-specs/catalog.yaml), you can fetch all batches between a specified start time and end time, and sort them by the order they were created.

#### Request 
```shell
curl -X GET "https://platform.adobe.io/data/foundation/catalog/batches?dataSet=DATASETID&createdAfter=START_TIMESTAMP&createdBefore=END_TIMESTAMP&sort=desc:created" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization:Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

Details on filtering batches can be found in the [How to Query Data via Data Access API](../../../tutorials/data_access_tutorial/data_access_tutorial.md) tutorial.

### Get Files out of a Batch

Once you have the ID for the batch you are looking for (`{BATCH_ID}`), it is possible to retrieve a list of files belonging to a specific batch via the [Data Access API](../../../../../../acpdr/swagger-specs/data-access-api.yaml).  Details for doing so are available in the [How to Query Data via Data Access API](../../../tutorials/data_access_tutorial/data_access_tutorial.md) tutorial.

#### Request
```shell
curl -X GET "https://platform.adobe.io/data/foundation/export/batches/{BATCH_ID}/files" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

### Access File Using File ID

Using the unique ID of a file (`{FILE_ID`), the [Data Access API](../../../../../../acpdr/swagger-specs/data-access-api.yaml) can be used to access the specific details of the file, including its name, size in bytes, and a link to download it.

#### Request 

```shell
curl -X GET "https://platform.adobe.io/data/foundation/export/files/{FILE_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-api-key : {API_KEY}"
```

The response may point to a single file, or a directory. Details on each can be found in the [How to Query Data via Data Access API](../../../tutorials/data_access_tutorial/data_access_tutorial.md) tutorial.

### Access File Content

The [Data Access API](../../../../../../acpdr/swagger-specs/data-access-api.yaml) can be used to access the contents of a specific file. To fetch the contents, a GET request is made using the value returned for `_links.self.href` when accessing a file using the file ID.

#### Request

```shell
curl -X GET "https://platform.adobe.io/data/foundation/export/files/{DATASET_FILE_ID}?path=filename1.csv" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "x-api-key: {API_KEY}"
```

The response to this request contains the contents of the file. For more information, including details on response pagination, see the [How to Query Data via Data Access API](../../../tutorials/data_access_tutorial/data_access_tutorial.md) tutorial.

### Validate Records for Schema Compliance

When data is being written, users can opt to validate data according to the validation rules defined in the XDM schema. More information on schema validation can be found in the [ETL Ecosystem Integration Reference Code on GitHub](https://github.com/adobe/acp-data-services-etl-reference/blob/fd08dd9f74ae45b849d5482f645f859f330c1951/README.md#validation).

If you are using the reference implementation found on [GitHub](https://github.com/adobe/acp-data-services-etl-reference/blob/fd08dd9f74ae45b849d5482f645f859f330c1951/README.md#validation), you can turn on schema validation in this implementation using the system property `-DenableSchemaValidation=true`.

Validation can be performed for logical XDM types, using attributes such as `minLength` and `maxlength` for strings, `minimum` and `maximum` for integers, and more. The [Defining XDM Field Types](../../technical_overview/schema_registry/acp_schema_registry.md#defining-xdm-field-types-in-the-api) table in the [XDM Schema Registry Guide](../../technical_overview/schema_registry/acp_schema_registry.md) outlines XDM types and the properties that can be used for validation. 

**_Note:_** The minimum and maximum values provided for various `integer` types are the MIN and MAX values that the type can support, but these values can be further constrained to minimums and maximums of your choosing.

### Create a Batch

Once the data is processed, the ETL tool will write the data back to Experience Platform using the [Batch Ingestion API](../../../../../../acpdr/swagger-specs/bulk-ingest-api.yaml). Before data can be added to a dataset, it must be linked to a batch which will later be uploaded into a specific dataset.

#### Request

```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}" \
  -d '{
        "datasetId":"{DATASET_ID}"
      }'
```

Details for creating a batch, including sample requests and responses can be found in the [Batch Ingestion Overview](../../technical_overview/ingest_architectural_overview/ingest_architectural_overview.md).

### Write to Dataset

After successfully creating a new batch, files can then be uploaded to a specific dataset. Multiple files can be posted in a batch until it is promoted. Files can be uploaded using the _Small File Upload API_; however, if your files are too large and the gateway limit is exceeded, you can use the _Large File Upload API_. Details for using both Large and Small File Upload can be found in the [Batch Ingestion Overview](../../technical_overview/ingest_architectural_overview/ingest_architectural_overview.md).

#### Request

Data in Experience Platform should be written in the form of parquet files.

```shell
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id:{IMS_ORG}" \
  -H "Authorization:Bearer ACCESS_TOKEN" \
  -H "x-api-key: API_KEY" \
  -H "content-type: application/octet-stream" \
  --data-binary "@{FILE_PATH_AND_NAME}.parquet"
```

### Mark Batch Upload Complete

After all files have been uploaded to the batch, the batch can be signaled for completion. By doing this, the Catalog "DataSetFile" entries are created for the completed files and associated with the generate batch. The Catalog batch is then marked as successful, which triggers downstream flows to ingest the available data. 

Data will first land in the staging location on Adobe Experience Platform and then will be moved to the final location after cataloging and validation. Batches will be marked as successful once all the data is moved to a permanent location.

#### Request

```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}?action=COMPLETE" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization:Bearer {ACCESS_TOKEN}" \
  -H "x-api-key : {API_KEY}"
```

If successful, the response will return HTTP Status 200 OK and the response body will be empty.

The ETL tool will make sure to note the timestamp of source dataset(s) as the data is read.

In next transformation execution, likely by schedule or event invocation, the ETL will start requesting the data from the previously-saved timestamp and all data going forward.

### Get Last Batch Status

Before running new tasks in the ETL tool, you must ensure that the last batch was successfully completed. The [Catalog Service API](../../../../../../acpdr/swagger-specs/catalog.yaml) provides a batch-specific option which provides the details of the relevant batches.

#### Request
```shell
curl -X GET "https://platform.adobe.io/data/foundation/catalog/batches?limit=1&sort=desc:created" \
  -H "Accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}"
```

#### Response

New tasks can be scheduled if the previous batch "status" value is "success" as shown below:

```json
"{BATCH_ID}": {
    "imsOrg": "{IMS_ORG}",
    "created": 1494349962314,
    "createdClient": "{API_KEY}",
    "createdUser": "CLIENT_USER_ID@AdobeID",
    "updatedUser": "CLIENT_USER_ID@AdobeID",
    "updated": 1494349963467,
    "status": "success",
    "errors": [],
    "version": "1.0.1",
    "availableDates": {}
}
```

### Get Last Batch Status by ID

An individual batch status can be retrieved through the [Catalog Service API](../../../../../../acpdr/swagger-specs/catalog.yaml) by issuing a GET request using the `{BATCH_ID}`. The `{BATCH_ID}` used would be the same as the ID returned when the batch was created.

#### Request

```shell
curl -X GET "https://platform.adobe.io/data/foundation/catalog/batches/{BATCH_ID}" \
  -H "Accept: application/json" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}"
```

#### Response - Success

The following response shows a "success":

```json
"BATCHID": {
    "imsOrg": "{IMS_ORG}",
    "created": 1494349962314,
    "createdClient": "API_KEY",
    "createdUser": "CLIENT_USER_ID@AdobeID",
    "updatedUser": "CLIENT_USER_ID@AdobeID",
    "updated": 1494349962314,
    "status": "success",
    "errors": [],
    "version": "1.0.1",
    "availableDates": {}
}
``` 
    
#### Response - Failure

In case of failure the "errors" can be extracted from the response and surfaced on the ETL tool as error messages.

```json
"BATCHID": {
    "imsOrg": "{IMS_ORG}",
    "created": 1494349962314,
    "createdClient": "API_KEY",
    "createdUser": "CLIENT_USER_ID@AdobeID",
    "updatedUser": "CLIENT_USER_ID@AdobeID",
    "updated": 1494349962314,
    "status": "failure",
    "errors": [
        {
            "code": "200",
            "description": "Error in validating schema for file: 'adl://dataLake.azuredatalakestore.net/connectors-dev/stage/BATCHID/dataSetId/contact.csv' with errorMessage=adl://dataLake.azuredatalakestore.net/connectors-dev/stage/BATCHID/dataSetId/contact.csv is not a Parquet file. expected magic number at tail [80, 65, 82, 49] but found [57, 98, 55, 10] and errorType=java.lang.RuntimeException",
            "rows": []
        }
    ],
    "version": "1.0.1",
    "availableDates": {}
}
```    

## Incremental vs Snapshot Data and Events vs Profiles

Data can be represented in a two by two matrix as follows:

| Incremental Events            | Incremental Profiles |
|-------------------------------|----------------------|
| Snapshot Events (less likely) | Snapshot Profiles    |

Event data is typically when there are indexed time stamp columns in each row.

Profile data is typically when there is not a time stamp in data and each row can be identified by a primary/composite key.

Incremental data is where only new/updated data comes into the system and appends to current data in the datasets.

Snapshot data is when all data comes into the system and replaces some or all previous data in a dataset.

In the case of incremental events, the ETL tool should use the available dates/create date of the batch entity. In case of push service, available dates will not be present, so tool will use batch created/updated date for marking increments. Every batch of incremental events is required to be processed.

For incremental profiles, ETL tool will use created/updated dates of batch entity. Commonly every batch of incremental profile data is required to be processed.

Snapshot events are very less likely due to sheer size of the data. But if this were to be required, the ETL tool must pick only the last batch for processing.

When snapshot profiles are used, the ETL tool will have to pick the last batch of the data that arrived in the system. But if requirement is to keep track of the versions of changes, then all batches will be required to be processed. De-duplication processing within the ETL process will help in controlling storage costs.

## Batch Replay and Data Reprocessing

Bath replay and data reprocessing may be required in cases where a client discovers that for the past 'n' days, data being ETL processed has not occurred as expected or source data itself may not have been correct. 

To do this, the client's data administrators will use the Platform UI to remove the batches containing corrupt data. Then, the ETL will likely need to be re-run, thus repopulating with correct data. If the source itself had corrupt data, the data engineer/administrator will need to correct the source batches and re-ingest the data (either into Adobe Experience Platform or via ETL connectors).

Based upon the type of data being generated, it will be the data engineer's choice to remove a single batch or all batches from certain datasets. Data will be removed/archived as per Experience Platform guidelines.

It is a likely scenario that the ETL functionality to purge data will be important.

Once purging is complete, the client admins will have to reconfigure Adobe Experience Platform to restart processing for core services from the time when the batches are deleted.

## Concurrent Batch Processing

At the client's discretion, data admins/engineers may decide to extract, transform, and load data in sequential manner or concurrent manner depending of the characteristics of a particular dataset. This will also be based upon the use case the client is targeting with the transformed data.

For example, if the client is persisting to an updatable persistence store and the sequence or order of events is important, the client may need to strictly process jobs with sequential ETL transformations.

In other cases, out of order data can be processed by downstream applications/processes that internally sort using a specified time stamp. In those cases, parallel ETL transformations may be viable to improve processing times.

For source batches, it will again be dependent upon client preference and consumer constraint. If the source data can be picked up in parallel without regard to the regency/ordering of a row, then the transformation process can create process batches with a higher degree of parallelism (optimization based on out of order processing). But if the transform has to honor time stamps or change precedence ordering, the Data Access API or ETL tool scheduler/invocation will have to ensure that batches are not processed out of order where possible.

## Deferral

Deferral is a process in which input data is not yet complete enough to be sent out to downstream processes, but may be usable in the future. Clients will determine their individual tolerance for data windowing for future matching versus the cost of processing to inform their decision to put aside data and reprocess it in the next transformation execution, hoping it can be enriched and reconciled/stitched at some future time inside the retention window. This cycle is ongoing until the row is processed sufficiently or it is deemed too stale to continue investing in. Every iteration will generate deferred data which is a superset of all deferred data in previous iterations.

Adobe Experience Platform does not identify deferred data currently, so client implementations must rely on the ETL and Dataset manual configurations to create another dataset in Platform mirroring the source dataset which can be used to keep deferred data. In this case, deferred data will be similar to snapshot data. In every execution of the ETL transform, the source data will be united with deferred data and sent for processing.

## Changelog

Date|Action|Description
---|---|---
2018-01-19|EOL and Remove "fields" property from Dataset|Previously, datasets had a "fields" property containing a copy of the schema. This capability should no longer be used. If the "fields" property is found, it should be ignored and the Observed / Target schema used instead.