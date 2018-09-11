# Connectors for Adobe Cloud Platform
Adobe Cloud Platform (ACP) Connectors help you easily ingest your data from multiple sources, allowing you to structure, label, and enhance your data using platform services. You can ingest data from a variety of sources such as cloud-based storage and CRM accounts. 


## Adobe Cloud Platform Data Connectors
Adobe Cloud Platform (ACP) provides connectors to ingest all of your diverse data from various SaaS and file-based sources. 


**ACP Connectors.** Use custom connector APIs and wizards to ingest cloud-based storage and CRM data. These connectors let you authenticate to your storage systems and CRM services, set times for ingestion runs, and manage data ingestion throughput.

* [Azure Blob Connector](../../tutorials/creating_a_connector_tutorial/ACP_azure_blob_connector_tutorial.md)
ingests your data from Microsoft Azure Blob cloud storage to Adobe Cloud Platform. 


* [Amazon S3 Connector](../../tutorials/creating_a_connector_tutorial/ACP_s3_connector_tutorial.md) ingests your data from Amazon S3 cloud storage to Adobe Cloud Platform.  


* [Microsoft Dynamics Connector](../../tutorials/creating_a_connector_tutorial/ACP_dynamic_connector_tutorial.md) lets you set up Microsoft Dynamics CRM data to ingest into the platform on a defined schedule. The Microsoft Dynamics connector also supports backfill data ingestion.

* [Salesforce Connector](../../tutorials/creating_a_connector_tutorial/ACP_salesforce_connector_tutorial.md) lets you set up Salesforce CRM data to ingest into the platform on a defined schedule.


<!---
## Adobe Cloud Platform Connection APIs 

These APIs are used to ingest and manage data:

* Connector API
* Catalog API 




####API Features 
Connector APIs provide these basic features:

* Call a single platform service rather than multiple services.
* Build applications on the platform using a minimal set of APIs.
* Provide consistency across all connector types.
* Employ credentials before allowing data to persist. 



### Basic Requirements for Connectors
* Files in the source location should adhere to the same schema or an error will be returned.
* You will need to configure a new connection for files with different schemas and provide a new folder location.
* A user token will be used to access connectors APIs and can be fetched from the [ACP console] (https://console.adobe.io).
* --->


###Important Conditions
* For incremental ingestion, you will have to clean up data after every ingestion run.
* Currently, a pipeline run is configured for a delay of 30 minutes between consecutive runs. 

####Preview Data
To know if data is ingested, enable the Preview button in the top right corner of the connector wizard. 

You can also use Catalog APIs to see if dataset files are being created for the current batch, or make a batch query with *datasetViewId* filter from Catalog services to see if batches are getting created properly.


## Other APIs used for ACP Connectors
Beyond the Create Account and Create Dataset APIs, here are few other helper APIs:

### Object Listing API 
This API lists the content of an object:

```
curl -X GET \
   `https://platform.adobe.io/data/foundation/connectors/connections/<connection id>/objects?object=s3://<bucket name>/	<path>'\
  	-H 'authorization: Bearer <Access token>' \
  	-H 'content-type: application/json' \
  	-H 'x-api-key: <API Key>' \
  	-H 'x-gw-ims-org-id: <IMS Org>' 
```

### Preview Object API
This API lists the content of the file. (Currently only CSV files are supported for preview.)

```
curl -X GET \
  'https://platform.adobe.io/data/foundation/connectors/connections/<connection Id>/rows?object=s3://<bucket name>/<path>&fileType=delimited' \
   -H 'authorization: Bearer <Access Token>' \
   -H 'content-type: application/json' \
   -H 'x-api-key: <API Key>' \
   -H 'x-gw-ims-org-id: <IMS Org>'
```
   
   
### Schema Discovery API
This API lists fields of a file. Currently only CSV files are supported

```
curl -X GET \
'https://platform.adobe.io/data/foundation/connectors/connections/<connection Id>/fields?object=s3://<bucket name>/<path>&fileType=delimited' \
  -H 'authorization: Bearer <Access Token>' \
  -H 'content-type: application/json' \
  -H 'x-api-key: <API Key>' \
  -H 'x-gw-ims-org-id: <IMS Org>'
```

