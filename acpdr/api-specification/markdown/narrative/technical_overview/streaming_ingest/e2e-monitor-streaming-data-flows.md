# Monitoring Streaming Data Flows
This page will help you get familiar with the options in [Adobe Experience Platform][platform] to help monitoring streaming data end-to-end, from ingestion to consumption in the Data Lake and in Unified Profile.

## Navigating 
First you will need to login to [Adobe Experience Platform][platform]. Next, select the "Monitoring" section on the side navigation menu located on the left. 

Afterwards, select the "Streaming End-to-End" tab at the top of the page.

You will then see a screen similar to image below.

![](images/aep-streaming-end-to-end.png)

## Streaming End-to-End
The "Streaming End-to-End" page is divided into two parts: a graph displaying the rate of messages being streamed and a detailed view of the incoming streamed data.

The first part of the page displays the rate of messages being streamed into the Platform for your entire organization. This view defaults to showing you the trend for the last seven days, but you can increase or decrease the range to help locate the batches you are interested in. 

The second part of the page provides you a detailed view into how the streamed data is getting persisted into the Data Lake. As part of ingestion process, streamed data gets discretized into batches of roughly 15 minutes each affording the view below. 

Batches can be of two types, successful or failed. Successful batches contain records which were persisted successfully into the Data Lake. Failed batches, as the name implies, contain records which encountered failures on the ingestion path to the platform. 

### Successful Batches 
Successful batches contain records which were persisted successfully into the Data Lake.   

![](images/streaming-end-to-end-success.png)

From the detailed view, you can see the total number of records ingested in the batch.

### Failed Batches
Failed batches contain records which failed processing due to validation errors, profile errors or identity errors.

![](images/streaming-end-to-end-errors.png)

By clicking into the failed batch, you can gather more information on why it failed. 

![](images/dataset-batch-overview-error-code.png)

The image above shows the detailed view for a failed batch. You'll notice the batch ID, record count, error code, reason for failure, and other useful pieces of information.

The Details section includes information about the error as well as the location in the published JSON where the error was encountered. 

For more information on failed batches and how to download them, please see: [Retrieving Failed Batches](retrieving_failed_batches.md)

[platform]: http://platform.adobe.com