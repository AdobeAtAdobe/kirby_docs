# Azure Blob Connector for Adobe Cloud Platform

The Microsoft Azure Blob Connector for Adobe Cloud Platform provides an API and wizard to ingest data from your Azure Blob data store onto Adobe Cloud Platform (ACP). The Azure Blob connector for ACP allows you to:

* Connect to your Azure Blob account.
* Select one or more datasets from a list of available datasets.
* Preview a sample of data for accuracy.
* Identify each dataset as a lookup file, event, or record.
* Set a schedule and frequency for ingesting data.
* Save the Azure Blob connector and modify it as needed.

This article provides steps to set up and configure the Azure Blob connector through API calls. 


## Setting up the Azure Blob Connector
Set up an account to access APIs and provide credentials to create a connector:  

<!---### Prerequisites
* Register the schema of the incoming file.
* Register the metadata associated with the file, such as *DataSetName*, *UserID*, *IMSOrg*, and *ConnectionParameters*.
* Get the details of the file ingested using an API call to the Catalog API.--->


### Set up an Adobe I/O account 
See [authenticating and accessing APIs](https://www.adobe.io/apis/cloudplatform/dataservices/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) to  create an access token used to authenticate API calls from Adobe I/O.

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.

### Set up an ACP connection to the Azure Blob
After setting up an Adobe I/O account, use the POST call and provide the *imsOrgId*, *accessToken*, and *Blob* connection string to set up a connection. 

```
curl -X POST https://platform.adobe.io/data/foundation/ connectors/account/ -H 'authorization: Bearer <accessToken>'

-H 'content-type: application/json' -H 'x-api-key: <api_key>' -H 'x-gw-ims-org-id: <ImsOrgId>@AdobeOrg' -d

'{
  "params": {
    "connectionString": {
      "value": "<connection string as retrieved from Azure portal>",
      "isSecret": true
    }
  },
  "type": "azure-blob-inbound"
}'
```
### Create a Dataset
Once the account and connection are successfully created, the *Connection ID* can be used to create a dataset. You can configure ACP datasets, pipeline, and triggers with a successful POST call.

You will want to provide a unique and identifiable name for the dataset, allowing you to identify it clearly when monitoring your data ingestion. 

The following are various properties of JSON for creating a dataset.

Property Name | Description
------------ | -------------
params/datasets/name	| Mandatory. Name of the dataset 
params/datasets/tags/* | Optional. Provide tags associated with dataset.
params/datasets/fields/*	| Conditional. Needs to be specified if params/datasets/schema is not defined. This contains information about schema of files to be ingested. Can be retrieved from schema API call defined below.
params/datasets/schema	| Conditional. Needs to be specified if params/datasets/fieldsis not specified. This is pointer to the schema in the schema registry.
params/datasets/fileDescription	| Optional. Identify the kind of file to ingest: CSV (default) or parquet



#### Simple Payload Example
```
curl -X POST https: //platform.adobe.io/data/foundation/connectors/connections/<connectionId>/datasets -H 'authorization: Bearer <accessToken>' -H 'content-type: application/json'
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
Note: The Schedule API is optional. Make this call only if you want to schedule the ingestion or send a blank JSON {} as the payload for a one-time run.

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


## Additional Adobe Cloud Platform APIs

In addition to the Create Account and Create Dataset APIs, you can use these for specific needs.

**Object Listing API** 

This API lists the content of an Azure blob.

```
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/<connection id>/objects?object=/<container>/<path>' \
  -H 'authorization: Bearer <Access token>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <API Key>' \
  -H 'x-gw-ims-org-id: <IMS Org>'
```
  
**Preview Object API**

This API lists the content of the file. Currently only parquet files are supported for preview.

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


