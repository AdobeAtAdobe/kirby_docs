# Amazon S3 Connector for Adobe Experience Platform

The Amazon S3 Connector for Adobe Experience Platform provides an API and wizard to ingest data from your S3 data store onto Adobe Experience Platform. The S3 connector for Platform allows you to:

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
See [authenticating and accessing APIs](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) to create an access token used to authenticate API calls from Adobe I/O.

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.

### Set up Platform connection to Amazon S3
Use the below POST call and provide the *imsOrgId*, *accessToken*, and AWS access keys.

```shell
curl -X POST https://platform.adobe.io/data/foundation/ connectors/account/ \
  -H 'authorization: Bearer <accessToken>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <api_key>' \
  -H 'x-gw-ims-org-id: <ImsOrgId>@AdobeOrg' \
  -d '{
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

### Create a dataset
Once you create the account and connection, you can use the *Connection ID* to create a dataset. You can configure datasets, pipeline, and triggers with a successful POST call.

Provide a unique and identifiable name for the dataset, so you can identify it clearly when monitoring your data ingestion.

The following are various properties of JSON for creating a dataset:

Property Name | Description
------------ | -------------
params/datasets/name  | Mandatory. Name of the dataset.
params/datasets/tags/* | Optional. Provide tags associated with dataset.
params/datasets/fields/*  | Conditional. Needs to be specified if params/datasets/schema is not defined. This contains information about the schema of files to be ingested. Can be retrieved from schema API call defined below.
params/datasets/schema  | Conditional. Needs to be specified if params/datasets/fieldsis not specified. This is pointer to the schema in schema registry.
params/datasets/fileDescription | Optional. Identify the kind of file to ingest: CSV (default) or parquet.


#### Simple payload example
```shell
curl -X POST https://platform.adobe.io/data/foundation/connectors/connections/<connectionId>/datasets \
  -H 'authorization: Bearer <accessToken>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <api_key>' \
  -H 'x-gw-ims-org-id: <ImsOrgId>@AdobeOrg' \
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

#### Incremental Ingestion

Incremental Ingestion allows users to incrementally ingest their data based on their preferred frequency. Data is picked regularly from the specified location. `backfill` Date can be specified, wherein data will be picked up from that date.

Incremental Ingestion is supported in two ways: 

1. Vanilla Format on `lastModifiedDate` of files.
2. Regular Expression (DateTime format) based Incremental Ingestion using 'connectors-objectDateTimeRegex' and 'isFolderRegex' tags in payload for POST Dataset. It provides capabilities to pick files and folders pertaining to a regex.

Currently, incremental ingestion through regular expression (regex) is supported in two ways:

1. Providing regex for files.
2. Providing regex for folders. 

Additionally, to leverage scheduled ingestion in a higher performing way, data should be partitioned with time based format - either in folders or in files as per application.

##### Providing regex on folder name

You can provide a DateTimeFormat in connectors-objectDateTimeRegex tag while posting a dataset, along with `isFolderRegex` tag. 

| Property Name                  | Description   |
| ------------------------------ |-------------  |
| connectors-objectDateTimeRegex | Provide supported DateTime formats in this tag. Similar Frequency (Daily for ddMMyyyy, etc) should be set prior to post datasets.                                                              |
| connectors-isFolderRegex       | Boolean value to determine if regex should be implemented on folders, the Default value is false. Can be used only if "connectors-objectDateTimeRegex" is also provided. |

Below are few examples for regex tag and file format at the source.

| `connectors-objectDateTimeRegex` Tag | Example file names |
| -------------------------------------|--------------------|
| dd-MM-yyyyTHH (Hourly) | <sample>-01-10-2018T08-<sample>.parquet, <sample>-01-10-2018T09-<sample>.parquet|
| dd-MM-yyyy (Daily) | <sample>-01-10-2018-<sample>.parquet , <sample>-01-12-2018-<sample>.parquet |
| MM-yyyy (Monthly) | <sample>-10-2018-<sample>.parquet |
| yyyy (Yearly) | <sample>-2018-<sample>.parquet , <sample>-2019-<sample>.parquet |

| S3 Path | isFolderRegex | Description |
| ------- | ------------- | ----------- |
| s3://<Bucket-Name/FolderA/ | false | All files inside FolderA having names with <objectDateTimeRegex> values will be picked. |
| s3://<Bucket-Name/FolderA/ | true | Regex will be applied on folder names. All folders inside FolderA having names with <objectDateTimeRegex> values will be picked. All files within the matching folders will be picked. |
| s3://<Bucket-Name/FolderA/FolderB | true | Regex will be applied on folder names. All folders inside FolderA having names starting with FolderB and containing regex <objectDateTimeRegex> values will be picked. Since path does not end with '/', it will be treated as folder regex prefix.  |

Sample Payload Example for Regex based Incremental Ingestion on files.

```shell
curl -X POST https: //platform.adobe.io/data/foundation/connectors/connections/<connectionId>/datasets -H 'authorization: Bearer <accessToken>' -H 'content-type: application/json'
-H 'x-api-key: <api_key>' -H 'x-gw-ims-org-id: <ImsOrgId>@AdobeOrg'-d
'{ 
   "params":{
      "datasets":[ 
         { 
            "name":"<Dataset Name>",
            "saveStrategy":"append",
            "backfillDate":"2018-09-21 11:00:00",
            "tags":{ 
               "connectors-objectName":[ 
                  "<Object-path>"
               ],
               "connectors-objectDateTimeRegex":[ 
                  "<SupportedRegex>"
               ],
              "connectors-isFolderRegex":[ 
                  "<True or False>"
               ]
            },
            "fileDescription":{ 
               "format":"parquet"
            },
            "schema":"@/xdms/model/Profile"
         }
      ]
   }
}'
```


Schedule API (OPTIONAL - Make this call only if you want to do scheduled ingestion or send a blank JSON {} as the payload for a one-time run).

The following configuration ingests data every 15 minutes.

```shell
curl -X POST https://platform.adobe.io/data/foundation/connectors/connections/<connectionId>/schedule \
  -H 'authorization: Bearer <accessToken>'
  -H 'content-type: application/json'
  -H 'x-api-key: <api_key>'
  -H 'x-gw-ims-org-id: <ImsOrgId>@AdobeOrg'
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

### Preview data
To see a preview of the dataset, select it in the user interface and click the preview icon. Preview lets you view the dataset before ingestion.


#### Default settings
* For an incremental ingestion, you must clean up the data after every ingestion run.
* Currently, the pipeline run is configured for a delay of 30 minutes between consecutive runs. In the future, this will be configurable.

## Additional Adobe Experience Platform APIs

In addition to the Create Account and Create Dataset APIs, you can use the following APIs for specific needs:

**Object Listing API**

Lists the content of an Amazon S3.

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/<connection id>/objects?object=/<container>/<path>' \
  -H 'authorization: Bearer <Access token>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <API Key>' \
  -H 'x-gw-ims-org-id: <IMS Org>'
```

**Preview Object API**
Lists the content of the file. You can only preview .csv files. 

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/<connection Id>/rows?object=/<container>/<path>&fileType=delimited' \
  -H 'authorization: Bearer <Access Token>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <API Key>' \
  -H 'x-gw-ims-org-id: <IMS Org>'
```
**Schema Discovery API**

Lists fields of a file. You can only preview .csv files. 

```shell
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/<connection Id>/fields?object=/<container>/<path>&fileType=delimited' \
  -H 'authorization: Bearer <Access Token>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <API Key>' \
  -H 'x-gw-ims-org-id: <IMS Org>'
```


