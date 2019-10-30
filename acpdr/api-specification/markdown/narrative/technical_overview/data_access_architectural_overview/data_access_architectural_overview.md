# Data Access Overview

The Data Access API supports Adobe Experience Platform by providing users with a RESTful interface focused on the discoverability and accessibility of ingested datasets within Experience Platform.

![Data Access on Experience Platform](Data_Access_Experience_Platform.png)

## API specification reference
The Swagger API reference documentation can be found [here](../../../../../../acpdr/swagger-specs/data-access-api.yaml).

## Terminology

A description of some commonly used terms throughout this document.

| Term          | Description                                                                            |
| ------------- |----------------------------------------------------------------------------------------|
| Dataset       | A collection of data that includes schema and fields.                                  |
| Batch         | A set of data collected over a period of time and processed together as a single unit. |

## Common use cases
The Data Access API supports a multitude of common use cases in order to streamline data access and discovery:

* [Retrieve a list of files within a batch](#retrieve-list-of-files-within-a-batch)
* [Access and download files within a batch](#access-and-download-files-within-a-batch)
* [Access the contents of a file](#access-the-contents-of-a-file)

### Retrieve list of files within a batch

By using a batch identifier (batchID), the Data Access API can retrieve a list of files belonging to that particular batch.

#### API Format
```
GET /batches/{BATCH_ID}/files
```

#### Request
```
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

#### Response
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



### Access and download files within a batch

By using a file identifier (`{FILE_ID}`), the Data Access API can be used to access specific details of a file, including its name, size in bytes, and a link to download.

The response will contain a data array. Depending on whether the file pointed to by the ID is an individual file or a directory, the data array returned may contain a single entry or a list of files belonging to that directory. Each file element will include the details of the file.

#### API Format
```
GET /files/{FILE_ID}
```

#### Request
```
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

#### Single file response
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

#### Directory response
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



### Access the contents of a file
The Data Access API can also be used to access the contents of a file. This can then be used to download the contents to an external source.

#### API format
```
GET /files/{dataSetFileId}?path={FILE_NAME}
```

#### Request
```
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

#### Response

```
Contents of the file
```

## Additional code samples
For additional samples, please refer to the [How to Query Data via Data Access API](../../tutorials/data_access_tutorial/data_access_tutorial.md) tutorial.


## Subscribe to data ingestion events

Platform makes specific high-value events available for subscription through the [Adobe I/O console](https://console.adobe.io/). For instance, you can subscribe to data ingestion events to be notified of potential delays and failures. More information about using Adobe I/O Events can be found in the [getting started guide](https://www.adobe.io/apis/experienceplatform/events/docs.html).