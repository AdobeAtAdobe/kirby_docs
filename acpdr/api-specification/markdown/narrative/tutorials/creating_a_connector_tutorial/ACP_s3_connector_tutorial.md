# The ACP Connector for Amazon S3


This article helps you build and ingest a dataset from Amazon S3 using the ACP Amazon S3 Connector from the Adobe Cloud Platform (ACP). 

Adobe connectors provide two ways to create and ingest a dataset: 

* Use the Batch Ingestion API batch ingestion of delimited files. See  [batch ingestion via file upload](./alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md). 

* Ingest files by setting up a connector. The following steps show you how to ingest data using the ACP Amazon S3 Connector.

## Setting up the ACP Connectors for Amazon S3

These steps and API calls are required to configure the data connectors and ingest data into the platform. The APIs allow you to orchestrate data connectors on the Adobe Data Foundation and ingest data into the Adobe Cloud Platform.


Note: Data is ingested into the source schema. The platform needs to have a record of the data ingested and source schema to help build the ETL template.


### Requirements
* Ability to register the schema of the incoming file
* Ability to register the metadata associated with the file, such as DataSetName, UserID, IMSOrg, and ConnectionParameters
* Platform data engineer should be able to get the details of the file ingested using an API call to the Catalog API.


### Step 1: Set up an ACP account and connection 
Set up an account for the Amazon S3 data connector. Follow this [tutorial](./alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for authorization to start making API calls.


Use the below POST call and provide the imsOrgId, accessToken, and Blob connection string. This single call  provides handles to various operations in the platform.

```
curl -X POST https://platform-int.adobe.io/data/foundation/ connectors/account/ -H 'authorization: Bearer <accessToken>'

-H 'content-type: application/json' -H 'x-api-key: <api_key>' -H 'x-gw-ims-org-id: <ImsOrgId>@AdobeOrg' -d

'{
  "params": {
+     "s3AccessKey": "<awsAccessKey>",
+     "s3SecretKey": {
+       "value": "<awsSecretAccessKey>",
+       "isSecret": true
+     }
+   },
+   "type": "amazon-s3"
+ }'
```

### Step 2: Creating the Connection ID
Once the account and connection are successfully created, the connection ID can be used to create a dataset. You can configure ADF datasets, pipeline, and triggers using a successful POST call.

Note: It is suggested to provide a unique and identifiable name for the dataset. You will be monitoring the ingestion status from the ACP user interface 

The following are various properties of JSON for creating a dataset.

Property Name | Description
------------ | -------------
params/datasets/name	| Mandatory. Name of the dataset. 
params/datasets/tags/* | Optional. Provide tags associated with dataset.
params/datasets/fields/*	| Conditional. Needs to be specified if params/datasets/schema is not defined. This contains information about the schema of files to be ingested. Can be retrieved from schema API call defined below.
params/datasets/schema	| Conditional. Needs to be specified if params/datasets/fieldsis not specified. This is pointer to the schema in schema registry.
params/datasets/fileDescription	| Optional. Identify the kind of file to ingest: CSV (default) or parquet


#### Simple Payload Example
```
curl-X POST https: //platform-int.adobe.io/data/foundation/connectors/connections/<connectionId>/datasets -H 'authorization: Bearer <accessToken>' -H 'content-type: application/json'

+-H 'x-api-key: <api_key>' -H 'x-gw-ims-org-id: <ImsOrgId>@AdobeOrg'-d 
-H 'x-api-key: <api_key>' -H 'x-gw-ims-org-id: <ImsOrgId>@AdobeOrg'-d 
'{
  "params": {
    "datasets": [
      {
        "name": "<DataSetName>",
        "tags": {
          "connectors-objectName": [
            "<Object path>"
          ]
        },
        "fileDescription": {
            "persisted": true,
            "format": "parquet"
        },
		"schema":"@/xdms/model/Profile"
      }
    ]
  }
}'
```
Schedule API (OPTIONAL - Make this call only if you want to do scheduled ingestion or send a blank json {} as the payload if you want to do a one-time run).

The following configuration will ingest data every 15 minutes.

``` 
curl-X POST https: //platform-int.adobe.io/data/foundation/connectors/connections/<connectionId>/schedule -H 'authorization: Bearer <accessToken>' -H 'content-type: application/json' 
-H 'x-api-key: <api_key>' -H 'x-gw-ims-org-id: <ImsOrgId>@AdobeOrg'-d 
'{
	"ingestStart" : "2018-05-24T09:36:01.257Z",
	"frequency": {
            "month": "*",
            "day": "*",
            "dayOfWeek": "*",
            "hour": "*",
            "minute": "*/15",
            "timezone": "UTC"
        }
}'
```

### Step 3: Preview Data
The status of the data ingestion can be seen from the ACP user interface. 
Go to the ACP UI and select the dataset created. Additional data can be previewed with the help of preview icon.

<screen shot>

To know if data is ingested, please note the preview button on top right corner. That should be enabled. Also, one can use catalog APIs to see if datasetFiles are being created for the current batch. 

Note: You can also make batch query with a datasetViewId filter from the Catalog API to see if the batches are properly created.

To get list of the Catalog end points, select the Catalog API from the drop-down menu on top right corner

<see https://git.corp.adobe.com/pages/experience-platform/api-specification/>

< Will you see a batches list> Currently on click datasets, you will not see batches list. This is because of a bug which will be fixed in coming sprint. 

#### Default Settings
* For an incremental ingestion, you will have to clean up the data after every ingestion run.
* Currently, the pipeline run is configured for a delay of 30 minutes between consecutive runs. This will be become configurable in coming sprint.
 
 

## Integrating with ACP APIs

<Apart from Create Account and Create Dataset>

**Object Listing API** 

Lists the content of an Amazon S3.

```
curl -X GET \
  'https://platform-int.adobe.io/data/foundation/connectors/connections/<connection id>/objects?object=/<container>/<path>' \
  -H 'authorization: Bearer <Access token>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <API Key>' \
  -H 'x-gw-ims-org-id: <IMS Org>'
```
  
**Preview Object API**
This API lists the content of the file. Currently only CSV files are supported for preview.

```
curl -X GET \
  'https://platform-int.adobe.io/data/foundation/connectors/connections/<connection Id>/rows?object=/<container>/<path>&fileType=delimited' \
  -H 'authorization: Bearer <Access Token>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <API Key>' \
  -H 'x-gw-ims-org-id: <IMS Org>'
```
**Schema Discovery API**

This API lists fields of a file. Currently only CSV files are supported.

```
curl -X GET \
  'https://platform-int.adobe.io/data/foundation/connectors/connections/<connection Id>/fields?object=/<container>/<path>&fileType=delimited' \
  -H 'authorization: Bearer <Access Token>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <API Key>' \
  -H 'x-gw-ims-org-id: <IMS Org>'
```


