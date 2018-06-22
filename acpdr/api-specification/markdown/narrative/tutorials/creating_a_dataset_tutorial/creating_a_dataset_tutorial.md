# Tutorial: Creating and Populating a Dataset and ingesting data from a file

## 1. Objective

This document is intended to provide a tutorial on creating and populating a customer dataset using a file. The steps that will be explained in this tutorial are:

* Extend an existing XDM schema with custom properties
* Create a new Dataset using the updated schema
* Create a Batch for uploading data into the new Dataset
* Upload the files to the batch using the Bulk Ingestion API
* Signal to the server that the Batch has been completed
* Verify that the operation was successful by reading back the data in the dataset using Data Access APIs

Data can also be ingested via a connector. The tutorial to create and populate a dataset via a connector can be found [here](https://git.corp.adobe.com/experience-platform/documentation/blob/master/api-specification/markdown/narrative/tutorials/creating_a_connector_tutorial/creating_a_connector_tutorial.md)

### 1.1. Audience
This document is written for users who need to understand Adobe Cloud Platform and have to integrate the platform with customer-owned or third party systems. Users include data engineers, data architects, data scientists, and app developers within Adobe I/O who will need to perform Adobe Cloud Platform API calls.

### 1.2. Version Information
*Version* : Preview

### 1.3. License Information
Terms of service : https://www.adobe.com/legal/terms.html


### 1.4. URI Scheme
*Host* : __platform.adobe.io__  
*Schemes* : __HTTPS__

### 1.5. About the Docs

This document is kept up-to-date and can be updated without announcement.

---

## 2. Datasets from a Schema

There are two ways data can be ingested into a dataset. The first is batch ingestion via file upload and the second is [ingestion via setting up a connector](../creating_a_connector_tutorial/creating_a_connector_tutorial.md). This tutorial focuses on ingesting data using a file.

### 2.1. Prerequisites

Follow this [Tutorial](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for authorization to start making API calls.

From the tutorial you should now have the following values:
* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.

### 2.2. Creating Dataset and Ingest File<a name="2_2_Header"></a>

We will begin with creating a dataset by extending the `Profile` XDM schema and populating it by uploading a file through the Bulk Ingestion API.

#### 2.2.1. Extending the standard Schema

The `Person` entity is under the `core.Profile` model. The Profile model is an abstraction of an individual that contains all the relevant information that an organization maintains of a person. The Person entity is a schema that describes the qualities of the person. For example their name, gender, and birthday. We will be extending the core 'Person' entity with the custom property `HairColor`.

You can use the following API call via terminal to create a custom object. The response body will indicate the path where the schema is stored.

#### Request

POST /xdms/{namespace}/{objectName}/_customer/{extensionNS}


```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/catalog/xdms/core/Person/_customer/CustomerCompany" /
  -H 'Authorization: Bearer {ACCESS_TOKEN}' /
  -H 'x-api-key: {CLIENT_ID}' /
  -H 'x-gw-ims-org-id: {IMS_ORG}' /
  -H "content-type: application/json" /
  -d "{JSON_PAYLOAD}"
```


In our example we are putting our `Person` object in JSON format into the `{objectName}` field, `core` in the `{namespace}` field and `default` in the `{extensionNS}` field. This is because we want to extend the core `Person` entity in the IMS Org's namespace. Modifying this core entity will reflect also for all other datasets that use the `Person` entity. Lastly `default` refers to the extension namespace which is used for different branches of a company. In this case we are using `default` as an example.


`{namespace}`: The base namespace. (E.g. core)  
`{objectName}`: Name of the entity we want to extend.  
`{extensionNS}`: Name of the extension namespace we want to put the extension in. (E.g. company branch)  
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.  
`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  

`{JSON_PAYLOAD}`: Data set to be posted. The example we use in our tutorial is here:  

```JSON
{
   "title": "Hair Color",
   "type": "object",
   "description": "Hair Color of Person",
   "extNamespace": "CustomerCompany",
   "properties": {
     "hairColor":{
       "type":"string",
       "description":"Hair Color"
      }
     }
 }
```

#### Response

```
@/xdms/core/Person/_customer/CustomerCompany/
```

We can verify our extension by querying `Person` entity object using a separate API call.  

#### Request

GET /xdms/{namespace}/{objectName}

```SHELL
curl -X GET "https://platform.adobe.io/data/foundation/catalog/xdms/core/Person" /
  -H 'Authorization: Bearer {ACCESS_TOKEN}' /
  -H 'x-api-key: {CLIENT_ID}' /
  -H 'x-gw-ims-org-id: {IMS_ORG}' /
```
`{namespace}`: The base namespace. (E.g. core)  
`{objectName}`: Name of the entity we want to extend.  
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.  
`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  

#### Response

```JSON
{
    "created": "number",
    "updated": "number",
    "title": "Person",
    "type": "object",
    "description": "An individual actor, contact, or owner.",
    "properties": {
        "firstName": {},
        "lastName": {},
        "middleName": {},
        "courtesyTitle": {},
        "birthDay": {},
        "birthMonth": {},
        "birthYear": {},
        "gender": {},
        "audit": {},
        "_customer": {
            "type": "object",
            "properties": {
                "default": {},
                "CustomerCompany": {
                    "version": "1",
                    "created": "number",
                    "updated": "number",
                    "createdClient": "{API_KEY}",
                    "updatedUser": "string",
                    "imsOrg": "{IMS_ORG}",
                    "title": "Hair Color",
                    "type": "object",
                    "description": "Hair Color of Person",
                    "properties": {
                        "hairColor": {
                            "type": "string",
                            "description": "Hair Color"
                        }
                    },
                    "extNamespace": "{extensionNS}"
                }
            }
        }
    },
    "id": "core/Person",
    "xdmVersion": "0.9.7",
    "xdmType": "entity"
}
```

The `HairColor` extension is now shown under the `properties` key of `Person`. By extending the `Person` entity here, any datasets within the same IMS ORG with the parent schema (E.g. `Profile`) will also inherit this newly extended property. Additionally if a user in the same IMS Org extended the `Person` entity with another property (ex. HairLength) existing Datasets with schemas that have the `Person` entity will also gain the `HairLength` property.


#### 2.2.2. Creating a Dataset<a name="2_2_2_Header"></a>

After extending the `Person` entity we can now create a dataset with the parent schema `Profile`. Remember that this parent schema will include the `HairColor` extended property. We can create the dataset using the following API call.  

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

We are using the `Profile` schema for this dataset. Other schemas one could use can be found in the [XDM registry](https://github.com/adobe/xdm/blob/master/docs/reference/README.md). For the file format, we chose [parquet](https://parquet.apache.org/documentation/latest/) to be the file format.

#### Response ####
```JSON
["@/dataSets/{DATASET_ID}"]
```

`{DATASET_ID}`: The ID of the dataset that was created. We will use this ID when creating a batch in the next section.

#### 2.2.3. Creating a Batch

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
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.  
`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.
`{DATASET_ID}`: The ID of the dataset to upload the files into.  


#### Response


```JSON
{
  "id": "{BATCH_ID}",
  "imsOrg": "{IMG_ORG}",
  "updated": 1520368161969,
  "status": "loading",
  "created": 1520368161969,
  "relatedObjects": [

  ],
  "version": "1.0.0",
  "tags": {
    "acp_producer": [
      "e6be7e083490427b8aab60ba4abfb981"
    ],
    "acp_stagePath": [
      "acp_foundation_push\/stage\/18dda765fa6048e4901add83f926f399"
    ]
  },
  "createdUser": "acp_foundation_push@AdobeID",
  "updatedUser": "acp_foundation_push@AdobeID"
}
```

The response gives the batch ID which will be used in subsequent calls to upload files to and signal for promotion.

`{BATCH_ID}`: The ID of the batch that was just created (used in subsequent calls).  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration


#### 2.2.4. File Upload

After successfully creating a new batch for uploading, files can be then be uploaded to a specific dataset. Note that in [2.3 Creating a Dataset](#2_2_2_Header) we specified the format of our data to be a parquet file. The files you upload must be in the same format which you specified.

If the original file being uploaded is greater than 512 MB, it will need to be broken up into 512 MB chunks and uploaded one at a time.  Each 512 MB chunk can be uploaded to a dataset in the same batch by repeating this step (2.4.3) for each file, using the same batch ID.

#### Request

PUT /batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}  

```SHELL
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/{BATCH_ID}/datasets/{DATASET_ID}/files/{FILE_NAME}.parquet" \
-H "content-type: application/octet-stream" \
-H "x-gw-ims-org-id: {IMG_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
--data-binary "@{FILE_PATH_AND_NAME}.parquet"
```

`{BATCH_ID}`: The ID of the batch that was just created (used in subsequent calls).  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration
`{DATASET_ID}`: The ID of the dataset to upload the files into.  
`{FILE_NAME}` Name of file as it will be seen in the dataset.  
`{FILE_PATH_AND_NAME}`: The path and filename of the file to be uploaded into the dataset.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.    

#### Response
```
#Status 200 OK, with empty response
```

#### 2.2.5. Signal Batch Completion

After all data files have been uploaded to the batch, it can be signaled for promotion.  By doing this, the service knows to start creating Catalog DataSetFile entries for the promoted files and associate them with the Batch generated above. The Catalog Batch is marked successful which triggers any downstream flows that can then work on the now available data.  

#### Request
POST /batches/{BATCH_ID}?actions=PROMOTE


```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/[BATCH_ID]?action=PROMOTE" \
-H "x-gw-ims-org-id: {IMG_ORG}" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key : {API_KEY}"
```

`{BATCH_ID}`: The ID of the batch that was just created (used in subsequent calls).  
`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   

#### Response
```
#Status 200 OK, with empty response
```

#### 2.2.6. Read data from the dataset

With the batch ID you can use the Data Access APIs to get a list of files in the batch that you uploaded previously. The response will return an array containing a list of files IDs which reference the files in the batch. Next the files can be downloaded with the Data Access APIs. The name, size in bytes, and a link to download the file or folder will be returned.

Detailed steps to do this can be found in the [Data Access Tutorial](../data_access_tutorial/data_access_tutorial.md) in sections 2. and 3.  
