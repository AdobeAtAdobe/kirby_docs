# Data Access Overview

## Overview

The Data Access API supports Adobe Experience Platform by providing users with a RESTful interface focused on the discoverability and accessibility of ingested datasets within Experience Platform.

![Data Access on Experience Platform](Data_Access_Experience_Platform.png)


### API Specification Reference
The Swagger API reference documentation can be found [here](../../../../../../acpdr/swagger-specs/data-access-api.yaml).

### Common Use Cases
The Data Access API supports a multitude of common use cases in order to streamline data access and discovery:

* Retrieve a list of files within a batch
* Access and Download files within a batch
* Parallel / Resumable downloads using HTTP Range headers
* Pagination Support for Directory listings

#### Retrieve List of Files Within a Batch

By using a batch identifier (batchID), the Data Access API can retrieve a list of files belonging to that particular batch.

##### API Format

```http
GET /batches/{BATCH_ID}/files
```

##### Request

```shell
curl -X GET https://platform.adobe.io/data/foundation/export/batches/{BATCH_ID}/files \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

- `{BATCH_ID}`: The ID of the specified batch
- `{ACCESS_TOKEN}`: Token provided after authentication 
- `{API_KEY}`: Your specific API key for your unique Platform integration (available via [Adobe Console](https://console.adobe.io))
- `{IMS_ORG}`: The IMS Organization credentials for your unique Platform integration
- `{SANDBOX_NAME}`: The name of the sandbox the operation will take place in. See the [sandboxes overview](../sandboxes/sandboxes-overview.md) for more information.

##### Response
```JSON
{
  "data": [
    {
      "dataSetFileId": "{FILE_ID_1}",
      "dataSetViewId": "string",
      "version": "1.0.0",
      "created": "string",
      "updated": "string",
      "isValid": true,
      "_links": {
        "self": {
          "href": "https://platform.adobe.io/data/foundation/export/files/{FILE_ID_1}"
        }
      }
    },
    {
      "dataSetFileId": "{FILE_ID_2}",
      "dataSetViewId": "string",
      "version": "1.0.0",
      "created": "string",
      "updated": "string",
      "isValid": true,
      "_links": {
        "self": {
          "href": "https://platform.adobe.io/data/foundation/export/files/{FILE_ID_2}"
        }
      }
    },
  ],
  "_page": {
    "limit": 100,
    "count": 1
  }
}
```

The `"data"` array contains a list of all files within the specified batch. Each file returned has its own unique ID (`{FILE_ID}`) contained within the `"dataSetFileId"` field. This unique ID can then be used to access or download the file.

* `{FILE_ID}`: The file ID for each file in the specified batch
* `"href"`: The url to access the file



#### Access and Download Batch Files

By using a file identifier (`{FILE_ID}`), the Data Access API can be used to access specific details of a file, including its name, size in bytes, and a link to download.

The response will contain a data array. Depending on whether the file pointed to by the ID is an individual file or a directory, the data array returned may contain a single entry or a list of files belonging to that directory. Each file element will include the details of the file.

##### API Format

```http
GET /files/{FILE_ID}
```

##### Request

```shell
curl -X GET https://platform.adobe.io/data/foundation/export/files/{FILE_ID} \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

- `{FILE_ID}`: Equal to the `"dataSetFileId"`, the ID of the file to be accessed
- `{ACCESS_TOKEN}`: Token provided after authentication 
- `{API_KEY}`: Your specific API key for your unique Platform integration (available via [Adobe Console](https://console.adobe.io))
- `{IMS_ORG}`: The IMS Organization credentials for your unique Platform integration
- `{SANDBOX_NAME}`: The name of the sandbox the operation will take place in. See the [sandboxes overview](../sandboxes/sandboxes-overview.md) for more information.

##### Single File Response
```JSON
{
  "data": [
    {
      "name": "{FILE_NAME}",
      "length": "{LENGTH}",
      "_links": {
        "self": {
          "href": "https://platform.adobe.io/data/foundation/export/files/{FILE_ID}?path={FILE_NAME}"
        }
      }
    }
  ],
  "_page": {
    "limit": 100,
    "count": 1
  }
}
```

* `{FILE_NAME}`: Name of the file (e.g. profiles.csv)
* `{LENGTH}`: Size of the file (in bytes)
* `"href"`: URL to download the file

##### Directory Response
```JSON
{
  "data": [
    {
      "dataSetFileId": "{FILE_ID_1}",
      "dataSetViewId": "string",
      "version": "1.0.0",
      "created": "string",
      "updated": "string",
      "isValid": true,
      "_links": {
        "self": {
          "href": "https://platform.adobe.io/data/foundation/export/files/{FILE_ID_1}"
        }
      }
    },
    {
      "dataSetFileId": "{FILE_ID_2}",
      "dataSetViewId": "string",
      "version": "1.0.0",
      "created": "string",
      "updated": "string",
      "isValid": true,
      "_links": {
        "self": {
          "href": "https://platform.adobe.io/data/foundation/export/files/{FILE_ID_2}"
        }
      }
    }
  ],
  "_page": {
    "limit": 100,
    "count": 2
  }
}
```

When a directory is returned, it contains an array of all files within the directory. The `"href"` field within each array item links to the individual file within the directory.
* `{FILE_ID}`: The file ID of an individual file in the specified batch
* `"href"`: The url to access an individual file

#### Access the contents of a file
The Data Access API can also be used to access the contents of a file. This can then be used to download the contents to an external source.

##### API Format

```http
GET /files/{dataSetFileId}?path={FILE_NAME}
```

##### Request

```shell
curl -X GET https://platform.adobe.io/data/foundation/export/files/{FILE_ID}?path={FILE_NAME} \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

- `{FILE_ID}`: The ID of the file within a dataset
- `{FILE_NAME}`: The full name of the file (e.g. profiles.csv)
- `{ACCESS_TOKEN}`: Token provided after authentication 
- `{API_KEY}`: Your specific API key for your unique Platform integration (available via [Adobe Console](https://console.adobe.io))
- `{IMS_ORG}`: The IMS Organization credentials for your unique Platform 
integration
- `{SANDBOX_NAME}`: The name of the sandbox the operation will take place in. See the [sandboxes overview](../sandboxes/sandboxes-overview.md) for more information.

##### Response

```
Contents of the file
```

### Additional Code Samples
For additional samples, please refer to the [How to Query Data via Data Access API](../../tutorials/data_access_tutorial/data_access_tutorial.md) tutorial.


### Terminology

| Term          | Description                                                                            |
| ------------- |----------------------------------------------------------------------------------------|
| Dataset       | A collection of data that includes schema and fields.                                  |
| Batch         | A set of data collected over a period of time and processed together as a single unit. |

---
