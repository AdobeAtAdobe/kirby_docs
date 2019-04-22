# Introduction to Data Access

## Overview
The purpose of Data Access API's id to provide a REST interface to download the data from the platform.

### What can you do using the Data Access API's?

* Using data access API's you can your download the data files from the platform.
* Data access API will also let you browse files that were uploaded together in a batch. You can then select the files that you wish to download from that batch.
* The API also allows you to download the files in chunks. For a particular file you can specify the range of bytes you want to download in a single API call using the range header. 

## Before using Data Access API's

1. Make sure you have a valid IMS Token. Data access makes use of IMS tokens for authentication. Clients need to supply a bearer token with a  valid scope, client id to access data using the API's. 
Make sure you have Access to Catalog.
2. Data platform has the Catalog Service that keeps a record of the meta data of all the data in the platform. You can use the Catalog API's to browse the meta data of your data in the platform and get the id of the batch or the file you want to access/download. 

## Detailed description of API's

### Authentication Headers

| Key | Value | Description |
|-----|-------|-------------|
| Authorization | Bearer: ims_token | IMS token is required in the header for authentication by adobe io gateway |
| x-api-key | adobe_io_api_key | A valid api key is required to access the service via adobe io |
| x-gw-ims-org-id | ims_org_id | IMSOrg Id is required in the header to identify the IMS org to which the client belongs to |

### Terms

| Term | Description |
| ---- | ----------- |
| Batch | It is the same as the Catalog Batch entity. It is the logical entity used to track the operations being performed on a batch of data within the platform since it was ingested into the platform. A batch may contain multiple data files belonging to different data sets. |
| Files | It is the same as the Catalog file entity and contains the actual data that can be downloaded. |
| data (Response) | It is an array object in the response contains the response entities e.g.: File objects. |
| links (Response) | The links serve 2 purposes. The "self" links are the links pointing to a single file which can be used to download the file. Links are also used in paginated results to point to the next page in the response. Only forward links are available. |
| page (Response) | The page entity in the response gives the metadata of the response useful in processing paginated results. The count gives the total number of elements e.g.: files in the response and the limit gives the number of results displayed per page. |

### List of available API's

Link to api specs can be found under data access in the dropdown of the following Specification. You can try out the API's from the swagger doc. To try out the API's, supply the IMS token in the Authorize tab as "Bearer ims_token".  

| HTTP request | Path | Description |
| ------------ | ---- | ----------- |
| GET | /batches/batchId/files | Returns a list of all the data files belonging to a batch. |
| HEAD | /files/dataSetFileId | Returns the meta data header including the size of file in byes and file format. |
| GET | /files/dataSetFileId | Downloads the file identified by the fileId.<br/><br/>Can also be used to download the file in chunks be specifying the range of bytes to be downloaded in one API call in the Range header. e.g.: Range: bytes=0-100 |

## Examples
### GET /batches/batchId/files
A GET request to get a list of files belonging to a particular batch:

| Request with batchid |
| ------- |
| `curl -X GET "https://platform-dev.adobe.io/data/foundation/export/batches/batch_id/files" -H "Authorization: Bearer ims_token" -H "x-api-key: x_api_key_value" -H "x-gw-ims-org-id: ims_org_id@AdobeOrg"` |

| Response |
| ------- |
| `{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`"data": [`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"dataSetFileId":`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"data_set_file_id_value_1",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"dataSetViewId": "data_set_view_id_value",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"version": "1.0.0",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"created": "created_timestamp",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"updated": "last_updated_timestamp",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"isValid": boolean_value,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"_links": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"self": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"href": "https://platform-dev.adobe.io:443/data/foundation/export/files/data_set_file_id_1"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`},`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"dataSetFileId":`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"data_set_file_id_value_1",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"dataSetViewId": "data_set_view_id_value",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"version": "1.0.0",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"created": "created_timestamp",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"updated": "last_updated_timestamp",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"isValid": boolean_value,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"_links": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"self": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"href": "https://platform-dev.adobe.io:443/data/foundation/export/files/data_set_file_id_1"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`},`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`],`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`      "_page": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"limit":`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`specified_limit/default_limit_100,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"count": total_number_of_results`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>`}` |

### HEAD /files/dataSetFileId
A HEAD request to get headers in response with file meta data:

| Request with datasetfileid |
| ------- |
| `curl --head "https://platform-dev.adobe.io/data/foundation/export/files/data_set_file_id_value?path=file_name.csv" -H "Authorization: Bearer ims_token" -H "x-api-key: x_api_key_value" -H "x-gw-ims-org-id: ims_org_id@AdobeOrg"` |

The response will be the header which will have information about the requested fileId. The response header will indicate the total size of the file in bytes, the file format, the unit for specifying the range to download the files in chunks (byes) and will also give the request id.

| Response |
| ------- |
| `HTTP/1.1 200 OK`<br/>`Accept-Ranges: bytes'<br/>'Cache-Control: no-cache`<br/>`Content-Length: 2996`<br/>`Content-Type: application/csv`<br/>`Date: Fri, 05 Jan 2018 21:51:01 GMT`<br/>`Pragma: no-cache`<br/>`Request-Id: b8870c15-96fe-49cb-bc7b-d38644669e67`<br/>`Server: openresty`<br/>`X-Frame-Options: SAMEORIGIN`<br/>`X-Request-Id: aTAkUvaq3hdWHSygjkRbZg7vyLU15pAI`<br/>`X-Request-Id: aTAkUvaq3hdWHSygjkRbZg7vyLU15pAI`<br/>`Connection: keep-alive` |

### GET /files/dataSetFileId
GET request to download a file using file id

| Request with datasetfileid |
| ------- |
| `curl -X GET "https://platform-dev.adobe.io/data/foundation/export/files/data_set_file_id_value" -H "Authorization: Bearer ims_token" -H "x-api-key: x_api_key_value" -H "x-gw-ims-org-id: ims_org_id@AdobeOrg"` |

The response will contain a data array. Depending on whether the file pointed to by the fileId is an individual file or a directory the data array may contain a single entry or a list of files belonging to that directory. Each file element will have the details of the file like name of the file, size of the file in bytes, link to download the file. 

#### Case 1: File Id points to a single file
| Response |
| ------- |
| `{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`"data": [`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"name": "file_name.file_format",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"length": "length_of_file_in_bytes",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"_links": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"self": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"href": "https://platform-dev.adobe.io:443/data/foundation/export/files/data_set_file_id_value?path=file_name.file_format.csv"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`],`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`"_page": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"limit": specified_limit/default_limit_100,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"count": 1`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>`}` |

#### Case 2: FileId points to a directory. The data array will contain multiple entries.

| Response |
| ------- |
| `{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`"data": [`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"dataSetFileId": "data_set_file_id_value_1",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"dataSetViewId": "data_set_view_id",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"version": "1.0.0",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"created": "created_timestamp",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"updated": "last_updated_timestamp",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"isValid": boolean_value,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"_links": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"self": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"href": "https://platform-dev.adobe.io:443/data/foundation/export/files/data_set_file_id_value_1"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`},`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"dataSetFileId": "data_set_file_id_value_2",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"dataSetViewId": "data_set_view_id",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"version": "1.0.0",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"created": "created_timestamp",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"updated": "last_updated_timestamp",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"isValid": boolean_value,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"_links": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"self": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"href": "https://platform-dev.adobe.io:443/data/foundation/export/files/data_set_file_id_value_2"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`],`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`"_page": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"limit": 100,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"count": 2`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>`}` |

#### Pagination
The responses are paginated. By default, the number of entries per page = 100. The count parameter will indicate the total number number of results in the data array and limit indicates the number of entries per page.

* Limit:<br/>
You can specify the number of entries per page according to your requirements using the "limit" query parameter<br/>
The next parameter in the links field of the response at the end of each page will have the link to the next page of results. It is simply a link with offset set to the next index of results array and specified limit value.
* Offsets:<br/>
The offset can be set by the "start" query parameter. You can also control the range of results displayed using the start and limit parameter. 

Example: 

| Request: Pagination Limits and Offsets |
| ------- |
| `curl -X GET "https://platform-dev.adobe.io/data/foundation/export/batches/batch_id/files?limit=1&start=0" -H "Authorization: Bearer ims_tokeb" -H "x-api-key: x_api_key_value" -H "x-gw-ims-org-id: ims_org_id@AdobeOrg"` |

The response will contain one file element in the data array since the specified limit = 1.

The offset is set to 0, thus the very first file in the result array will be returned.

The next link in the response will have the link to the next page of responses with the offset (start) set to 1 (the next indescribable in the results to be displayed).

| Response |
| ------- |
| `{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`"data": [`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"dataSetFileId": "data_set_file_id_value",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"dataSetViewId": "data_set_view_id_value",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"version": "1.0.0",`<br/&nbsp;&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"created": "created_timestamp",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"updated": "last_updated_timestamp",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"isValid": boolean_value,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"_links": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"self": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"href": "https://platform-dev.adobe.io:443/data/foundation/export/files/data_set_file_id"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`],`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`"_page": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"limit": 1,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"count": 1`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`},`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`"_links": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"next": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"href": "https://platform-dev.adobe.io:443/data/foundation/export/batches/batch_id/files?start=1&limit=1"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`},`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"page": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"href": "https://platform-dev.adobe.io:443/data/foundation/export/batches/batch_id/files?limit={limit}&start={start}",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"templated": true`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>`}` |

#### Partial File downloads
The API also allows for downloading files in chunks.

The HEAD response gives the size of file in bytes.

In the get file request GET /files/fileId, a range header can be specified to download a specific range of bytes from a file.

The API by default downloads the entire file if the range is not specified.

Example:

| Request: Pagination Limits and Offsets |
| ------- |
| `curl -X GET "https://platform-dev.adobe.io/data/foundation/export/files/data_set_file_id?path=file_name.file_format" -H "Authorization: Bearer ims_token" -H "x-api-key: x_api_key_value" -H "x-gw-ims-org-id: ims_org_id@AdobeOrg" -H "Range: bytes=0-100"` |

The first 100 bytes of the file will be downloaded. 


 
