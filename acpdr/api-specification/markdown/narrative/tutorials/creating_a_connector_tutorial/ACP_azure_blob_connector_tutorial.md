# Azure Blob Connector for Adobe Experience Platform

The Microsoft Azure Blob Connector for Adobe Experience Platform provides an API and wizard to ingest data from your Azure Blob data store onto Adobe Experience Platform. The Azure Blob connector for Platform allows you to:

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
See [authenticating and accessing APIs](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) to create an access token used to authenticate API calls from Adobe I/O.

After you set up authorization for APIs, these values are returned:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.

### Set up a Platform connection to the Azure Blob
After you set up an Adobe I/O account, use the POST call and provide the *imsOrgId*, *accessToken*, and *Blob* connection string to set up a connection.

```shell
curl -X POST https://platform.adobe.io/data/foundation/ connectors/account/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
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
Once you create the account and connection, you can use the *Connection ID* to create a dataset. You can configure Platform datasets, pipeline, and triggers with a successful POST call.

Provide a unique and identifiable name for the dataset, so you can identify it clearly when monitoring your data ingestion.

The following are various properties of JSON for creating a dataset.

Property Name | Description
------------ | -------------
params/datasets/name	| Required. Name of the dataset.
params/datasets/tags/* | Optional. Provide tags associated with dataset.
params/datasets/fields/*	| Conditional. Specify if params/datasets/schema is not defined. This property contains information about schema of files to ingest. Retrieve from schema API call (defined below).
params/datasets/schema	| Conditional. Specify if params/datasets/fields is not set. This property points to the schema in the schema registry.
params/datasets/fileDescription	| Optional. Identify the kind of file to ingest: CSV (default) or parquet.



#### Simple Payload Example
```shell
curl -X POST https://platform.adobe.io/data/foundation/connectors/connections/<connectionId>/datasets \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'\
  -d '{
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
		            "schema":"@/xdms/context/profile"
                }
            ]
        }
}'
```
*Note:* The Schedule API is optional. Make this call only if you want to schedule the ingestion or send a blank JSON {} as the payload for a one-time run.

The following configuration ingests data every 15 minutes.

```shell
curl -X POST https://platform.adobe.io/data/foundation/connectors/connections/<connectionId>/schedule \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'\
  -d '{
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


## Additional Adobe Experience Platform APIs

In addition to the Create Account and Create Dataset APIs, you can use the following APIs for specific needs.

**Object Listing API**

This API lists the content of an Azure blob.

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/<connection id>/objects?object=/<container>/<path>' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

**Preview Object API**

This API lists the content of the file. Currently only parquet files are supported for preview.

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/<connection Id>/rows?object=/<container>/<path>&fileType=delimited' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```
**Schema Discovery API**

This API lists fields of a file. Currently only CSV files are supported.

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/<connection Id>/fields?object=/<container>/<path>&fileType=delimited' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```
