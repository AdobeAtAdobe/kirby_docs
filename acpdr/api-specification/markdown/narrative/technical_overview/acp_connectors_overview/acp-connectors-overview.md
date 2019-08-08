# Connectors for Adobe Experience Platform
Adobe Experience Platform Connectors help you easily ingest your data from multiple sources, allowing you to structure, label, and enhance your data using Platform services. You can ingest data from a variety of sources such as cloud-based storage and CRM accounts. 

## Adobe Experience Platform data connectors
Adobe Experience Platform provides connectors to ingest all of your diverse data from various SaaS and file-based sources. 

**Platform connectors.** Use custom connector APIs and wizards to ingest cloud-based storage and CRM data. These connectors let you authenticate to your storage systems and CRM services, set times for ingestion runs, and manage data ingestion throughput.

Tutorials:
* [Azure Blob connector](../../tutorials/creating_a_connector_tutorial/ACP_azure_blob_connector_tutorial.md) ingests your data from Microsoft Azure Blob cloud storage to Adobe Experience Platform. 


* [Amazon S3 connector](../../tutorials/creating_a_connector_tutorial/ACP_s3_connector_tutorial.md) ingests your data from Amazon S3 cloud storage to Adobe Experience Platform.  


* [Microsoft Dynamics connector](../../tutorials/creating_a_connector_tutorial/ACP_dynamic_connector_tutorial.md) lets you set up Microsoft Dynamics CRM data to ingest into the Platform on a defined schedule. The Microsoft Dynamics connector also supports backfill data ingestion.

* [Salesforce connector](../../tutorials/creating_a_connector_tutorial/ACP_salesforce_connector_tutorial.md) lets you set up Salesforce CRM data to ingest into the Platform on a defined schedule.

* [Using Connector UI](../../tutorials/creating_a_connector_tutorial/using_data_connector_ui_tutorial.md) to set up Salesforce and Microsoft Dynamics connectors. 

### Important conditions
* For incremental ingestion, you will have to clean up data after every ingestion run.
* Currently, a pipeline run is configured for a delay of 30 minutes between consecutive runs. 

#### Preview data
To know if data is ingested, enable the Preview button in the top right corner of the connector wizard. 

You can also use Catalog APIs to see if dataset files are being created for the current batch, or make a batch query with *datasetViewId* filter from Catalog services to see if batches are getting created properly.

## Other APIs used for Platform Connectors
Beyond the Create Account and Create Dataset APIs, a few other helper APIs are listed below. Please see the [Partner Connectors RESTful API Resource](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/partner-connectors-api.yaml) for further information on Platform Connector APIs.

### Object Listing API 
This API lists the content of an object:
```shell
curl -X GET https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects?object=s3://{BUCKET_NAME}/{PATH} \
  -H 'authorization: Bearer {ACCESS_TOKEN}' \
  -H 'content-type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' 
```
### Preview Object API
This API lists the content of the file. (Currently only CSV files are supported for preview.)
```shell
curl -X GET https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects?object=s3://{BUCKET_NAME}/{PATH}&fileType=delimited \
   -H 'authorization: Bearer {ACCESS_TOKEN}' \
   -H 'content-type: application/json' \
   -H 'x-api-key: {API_KEY}' \
   -H 'x-gw-ims-org-id: {IMS_ORG}'
```
### Schema Discovery API
This API lists fields of a file. Currently only CSV files are supported

```shell
curl -X GET https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects?object=s3://{BUCKET_NAME}/{PATH}&fileType=delimited \
-H 'authorization: Bearer {ACCESS_TOKEN}' \
-H 'content-type: application/json' \
-H 'x-api-key: {API_KEY}' \
-H 'x-gw-ims-org-id: {IMS_ORG}'
```

