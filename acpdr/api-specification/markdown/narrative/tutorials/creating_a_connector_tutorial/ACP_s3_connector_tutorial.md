# Amazon S3 Connector for Adobe Cloud Platform
 

The Amazon S3 Connector for Adobe Cloud Platform provides an API and wizard to ingest data from your S3 data store onto Adobe Cloud Platform (ACP). The S3 connector for ACP allows you to:

* Authenticate to your S3 account.
* Select one or more datasets from a list of available datasets.
* Preview a sample of data for accuracy.
* Identify each dataset as a lookup file, event, or record.
* Set a schedule and frequency for ingesting data.
* Save the S3 connector and modify it as needed.

This article provides steps to set up and configure the S3 connector using API calls.

## Setting up the Amazon S3 Connector 

Set up an account to access APIs and provide credentials to create a connector: 

<!---### Prerequisites
* Register the schema of the incoming file.
* Register the metadata associated with the file, such as *DataSetName*, *UserID*, *IMSOrg*, and *ConnectionParameters*.
* Platform data engineer should be able to get the details of the file ingested using an API call to the Catalog API.--->


### Set up an Adobe I/O account 
See [authenticating and accessing APIs](./alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) to  create an access token used to authenticate API calls from Adobe I/O.

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.

### Set up an ACP connection to Amazon S3 
Use the below POST call and provide the *imsOrgId*, *accessToken*, and AWS access keys. 

```
curl -X POST https://platform.adobe.io/data/foundation/ connectors/account/ -H 'authorization: Bearer <accessToken>'

-H 'content-type: application/json' -H 'x-api-key: <api_key>' -H 'x-gw-ims-org-id: <ImsOrgId>@AdobeOrg' -d

'{
  "params": {
    "s3AccessKey": "<awsAccessKey>",
    "s3SecretKey": {
    "value": "<awsSecretAccessKey>",
    "isSecret": true
    }
  },
  "type": "amazon-s3"
   }'
```

### Create a Dataset
Once the account and connection are successfully created, the *Connection ID* can be used to create a dataset. You can configure datasets, pipeline, and triggers with a successful POST call.

You will want to provide a unique and identifiable name for the dataset, allowing you to identify it clearly when monitoring your data ingestion.  

The following are various properties of JSON for creating a dataset.

Property Name | Description
------------ | -------------
params/datasets/name	| Mandatory. Name of the dataset. 
params/datasets/tags/* | Optional. Provide tags associated with dataset.
params/datasets/fields/*	| Conditional. Needs to be specified if params/datasets/schema is not defined. This contains information about the schema of files to be ingested. Can be retrieved from schema API call defined below.
params/datasets/schema	| Conditional. Needs to be specified if params/datasets/fieldsis not specified. This is pointer to the schema in schema registry.
params/datasets/fileDescription	| Optional. Identify the kind of file to ingest: CSV (default) or parquet.


#### Simple Payload Example
```
curl -X POST https: //platform.adobe.io/data/foundation/connectors/connections/<connectionId>/datasets -H 'authorization: Bearer <accessToken>' -H 'content-type: application/json'

-H 'x-api-key: <api_key>' -H 'x-gw-ims-org-id: <ImsOrgId>@AdobeOrg'-d 
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
Schedule API (OPTIONAL - Make this call only if you want to do scheduled ingestion or send a blank JSON {} as the payload for a one-time run).

The following configuration will ingest data every 15 minutes.

``` 
curl -X POST https: //platform.adobe.io/data/foundation/connectors/connections/<connectionId>/schedule -H 'authorization: Bearer <accessToken>' -H 'content-type: application/json' 
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

### Preview Data
You can see a preview of the dataset by selecting it in the user interface and clicking the preview icon. This lets you view the dataset before ingestion. 


#### Default Settings
* For an incremental ingestion, you will have to clean up the data after every ingestion run.
* Currently, the pipeline run is configured for a delay of 30 minutes between consecutive runs. This will be become configurable in coming sprint.
 
 

## Additional Adobe Cloud Platform APIs

In addition to the Create Account and Create Dataset APIs, you can use these for specific needs.

**Object Listing API** 

Lists the content of an Amazon S3.

```
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/<connection id>/objects?object=/<container>/<path>' \
  -H 'authorization: Bearer <Access token>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <API Key>' \
  -H 'x-gw-ims-org-id: <IMS Org>'
```
  
**Preview Object API**
This API lists the content of the file. Currently only CSV files are supported for preview.

```
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/<connection Id>/rows?object=/<container>/<path>&fileType=delimited' \
  -H 'authorization: Bearer <Access Token>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <API Key>' \
  -H 'x-gw-ims-org-id: <IMS Org>'
```
**Schema Discovery API**

This API lists fields of a file. Currently only CSV files are supported.

```
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/<connection Id>/fields?object=/<container>/<path>&fileType=delimited' \
  -H 'authorization: Bearer <Access Token>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <API Key>' \
  -H 'x-gw-ims-org-id: <IMS Org>'
```


