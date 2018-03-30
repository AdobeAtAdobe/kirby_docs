# Tutorial - Get Data to Unified Profile

## 1. Objective
(explain what this document will be about and what topics will be covered,
get data to unified profile)

### 1.1. Audience
This document is written for users who need to understand the Adobe Cloud Platform and have to integrate the platform with customer-owned or third party systems. Users include data engineers, data architects, data scientists, and app developers within Adobe I/O who will need to perform Adobe Cloud Platform API calls.

### 1.2. Version Information
*Version* : Beta

### 1.3. License Information
Terms of service : https://www.adobe.com/legal/terms.html


### 1.4 URI Scheme
*Host* : platform.adobe.io  
*BasePath* : /data/foundation/import/  
*Schemes* : HTTPS

### 1.5. About the Docs

The HTML rendition of this documentation is kept up-to-date on a per commit basis and can therefore change without announcement. If you require a persistent version of the documentation, it is recommended that you seek out the PDF rendition.

---

## 2. Get Data to Unified Profile

### 2.1. Prerequisites
Follow this [Tutorial](https://git.corp.adobe.com/experience-platform/documentation/blob/960b25b46a7b473b3e202111a1804e259687f3ec/api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for authorization to start making API calls.

Once we have the following values we can move on to the next section:
* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.

### 2.2. Create Dataset
Before we can get data into the unified profile we will need to create our dataset our data will conform to. For this tutorial we start with creating a dataset with `Profile` schema. Other schemas one could use can be found in the [XDM registry](https://github.com/adobe/xdm/blob/master/docs/reference/README.md).

#### Request

POST /dataSets

```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/catalog/dataSets?requestDataSource=true" /
  -H "accept: application/json" /
  -H 'Authorization: Bearer {ACCESS_TOKEN}' /
  -H 'x-api-key: {CLIENT_ID}' /
  -H 'x-gw-ims-org-id: {IMS_ORG}' /
  -H "content-type: application/json" /
  -d "{JSON_PAYLOAD}"
```

`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.  
`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  

`{JSON_PAYLOAD}`: Data set to be posted. The example we used in our tutorial is here:

```JSON
{
      "name":"ProfileDataset",
      "schema":"@/xdms/model/Profile",
      "fileDescription": {
        "persisted": true,
        "containerFormat": "parquet",
        "format": "parquet"
      }
}
```

For the file format, we chose [parquet](https://parquet.apache.org/documentation/latest/) to be the file format. We put this in the fileDescription so that the server knows to expect a certain format when processing the Batch.

#### Response ####
```JSON
["@/dataSets/{DATASET_ID}"]
```

`{DATASET_ID}`: The ID of the dataset that was created. We will use this ID when creating a batch in the next section.

### 2.3. Enable a Dataset for Unified Profile Service

Now with the dataset containing the `Profile` XDM schema, we will update the dataset to add a `Tag` attribute named `unifiedProfile`. This tag configures the specific dataset to be ingested into the Unified Profile Service. Note that any dataset conforming to XDM can be ingested as either Profile or ExperienceEvent type.

In our example, our patch request adds the `unifiedProfile` Tag with the `enabled` property set to true to enable the dataset for ingestion into the Unified Profile Service. `identityField` names the location of the primary identify field using dot notation.

To access

If the Profile had ID for 3 different ID they would be named customerId under that key. You could say Profiles in the dataset then use the ID for mcId as the primary key by specifying customerIds.mcId.id.

#### Request
```
PATCH /dataSets/{id}
```

```SHELL
curl -X PATCH "https://platform-int.adobe.io/data/foundation/catalog/dataSets/%7Bid%7D" \
  -H "accept: application/json" \
  -H "x-api-key: {API_KEY}" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "content-type: application/json" \
  -d "{ \
        "tags\" : { \
          "unifiedProfile\": [\ "enabled:true\", \"identityField:endUserIds.mcId.id\ "] \
        }
      }"
```

#### Response

```JSON
["@/dataSets/{DATASET_ID}"]
```

`{DATASET_ID}`: The ID of the dataset that was patched. This should be the same value as the ID we passed into the endpoint.


#### 2.4. Ingest Data Via Bulk Ingestion service

The follow are the steps to ingest data via the bulk ingestion service:
* Create Batch
* Upload file
* Signal Batch Complete


We first start with Creating a Batch:

#### POST /batches

Before data can be added to a dataset, it must be linked to a batch, which will later be uploaded into a specified dataset.

#### Request
POST /batches

```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
-H "accept: application/json" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
-d '{"datasetId":"{DATASET_ID}"}'
```
**IMS_ORG:** Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
**ACCESS_TOKEN:** Token provided after authentication.  
**API_KEY:** Your specific API key value found in your unique Adobe Cloud Platform integration.  
**DATASET_ID:** The ID of the dataset to upload the files into.  

#### Response
```JSON
{
    "id": "{BATCH_ID}",
    "imsOrg": "{IMS_ORG}",
    "updated": 0,
    "status": "loading",
    "created": 0,
    "relatedObjects": [
        {
            "type": "dataSet",
            "id": "{DATASET_ID}"
        }
    ],
    "version": "1.0.0",
    "tags": {},
    "createdUser": "string",
    "updatedUser": "string"
}
```
**BATCH_ID:** The ID of the batch that was just created (used in subsequent requests).  
**IMS_ORG:** Your IMS org specified in the request.  
**DATASET_ID:** The ID of the dataset to upload the files into.  

After successfully creating a new batch for uploading, files can be then be uploaded to a specific dataset.  

If the file is smaller than 512MB, it can be uploaded in a single chunk, which we will walk through here. If the original file being uploaded is greater than 512 MB, it will need to be broken up into 512 MB chunks, before being ingested, and uploaded one file at a time. Uploading a larger file is covered in [section 4.3.2.1 of the Data Ingestion Technical Overview](https://git.corp.adobe.com/experience-platform/documentation/blob/master/api-specification/markdown/narrative/technical_overview/ingest_architectural_overview/ingest_architectural_overview.md).

Data is uploaded to the schema defined (`Profile schema`) by when the dataset was created.  The file being uploaded must match the XDM schema of the dataset it will be uploaded into.

#### Request
PUT /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}

```SHELL
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet" \
-H "content-type: application/octet-stream" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}" \
--data-binary "@{FILE_PATH_AND_NAME}.parquet"
```
**BATCH_ID:** The ID of the batch to write files to.  
**DATASET_ID:** The ID of the dataset to upload the files into.  
**FILE_NAME:** Name of file as it will be seen in the dataset.  
**IMS_ORG:** Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
**ACCESS_TOKEN:** Token provided after authentication.  
**FILE_PATH_AND_NAME:** The path and filename of the file to be uploaded into the dataset.  

#### Response
```JSON
#Status 200 OK, with empty response
```

#### 2.5. Data Access

TODO - this flow has not been finalized yet
