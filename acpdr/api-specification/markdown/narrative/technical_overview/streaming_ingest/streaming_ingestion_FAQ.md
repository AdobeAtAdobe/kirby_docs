# Frequently asked questions about streaming ingestion
This document provides answers to frequently asked questions about Streaming Ingestion on Adobe Experience Platform.

Streaming Ingestion APIs allow client and server-side devices to send data to Adobe Experience Platform in real-time via RESTful interfaces. These APIs allow sub-second refresh of Real-time Customer Profiles allowing you to deliver hyper relevant experiences to customers. See the [Getting Started with Streaming Ingestion][Getting Started With Streaming Ingestion] guide for more information. 

<!--- link to Peter Nolan's trouble shooting doc when ready PR-587 
Didn't find what you are looking for? Check out the [Trouble Shooting Guide][Trouble Shooting Guide] for more help. --->

This document covers the following questions: 
- [Can I send data in an authenticated way?](#can-i-send-data-in-an-authenticated-way)
- [What is the latency for Real-time Customer Profile to see the messages I'm sending using Streaming Ingestion?](#what-is-the-latency-for-real-time-customer-profile-to-see-the-messages-im-sending-using-streaming-ingestion)
- [How do I know that the payload I'm sending is formatted properly?](#how-do-i-know-that-the-payload-im-sending-is-formatted-properly)
- [How do I know if the data I'm sending is being received?](#how-do-i-know-if-the-data-im-sending-is-being-received)
- [Is there a way to know if the JSON payload is valid before sending it to Adobe?](#is-there-a-way-to-know-if-the-json-payload-is-valid-before-sending-it-to-adobe)
- [Why is my streaming data not available in Experience Data Lake?](#why-is-my-streaming-data-not-available-in-experience-data-lake)
- [How do I parse the response returned for the HTTP request?](#how-do-i-parse-the-response-returned-for-the-http-request)
- [Why are my sent messages not being received by Real-time Customer Profile? ](#why-are-my-sent-messages-not-being-received-by-real-time-customer-profile)
- [What happens when synchronous validation is requested on an edge that does not support it?](#what-happens-when-synchronous-validation-is-requested-on-an-edge-that-does-not-support-it)
<!-- - [Can I include multiple messages in the same HTTP request?](#can-i-include-multiple-messages-in-the-same-http-request?) -->

## Can I send data in an authenticated way?
Yes, Experience Platform supports secured data collection. For more information on how to send authenticated data to Platform, please see the [Authenticated Data Collection][Authenticated Data Collection] documentation.

## What is the latency for Real-time Customer Profile to see the messages I'm sending using Streaming Ingestion?
Streaming to Real-time Customer Profile will typically take under 60 seconds. Actual latencies might vary due to data volumes, message size, and public internet behavior.

## How do I know that the payload I'm sending is formatted properly?
Streaming Ingestion APIs support two modes of validation: synchronous and asynchronous. Synchronous validation should be used during your development process. Synchronous validation will drop records that fail XDM validation and provide immediate feedback on why they failed (for example: "Invalid XDM Message Format").  

Asynchronous validation should be used in production. Streaming Validation service detects messages that fail asynchronous validation, and sends the malformed data to the data lake where it can be retrieved later for futher analysis and replay. 

For more information on synchronous and asynchronous validation, see the [streaming validation][Streaming Validation] overview. For steps on how to view batches that fail validation, please refer to the guide on [retrieving failed batches][Retrieving Failed Batches].

## How do I know if the data I'm sending is being received?
You can check if your data has been received by using the appropriate Streaming Ingestion APIs to retrieve (GET) the data in question. For detailed steps on retrieving Streaming Ingestion data, please see the [Getting started with Streaming Ingestion][Getting Started With Streaming Ingestion] guide.

## Is there a way to know if the JSON payload is valid before sending it to Adobe?
You cannot check if the JSON payload is valid without first sending the payload to Adobe. If synchronous validation is requested, you will either recieve an error message indicating it is invalid or a populated JSON object indicating it is valid. If operating in asynchronous validation mode, Streaming Validation service will detect and send malformed data to the data lake where it can later be retrieved for analysis. See [retrieving failed batches][Retrieving Failed Batches] for more information.

<!--
### Can I include multiple messages in the same HTTP request?
-->

## Why is my streaming data not available in Experience Data Lake?
There are a variety of reasons why batch ingestion may fail to reach Experience Data Lake, such as invalid formatting, missing data, or server errors. To determine why your batch failed, you must retrieve the batch using the [Data Ingestion API][Data Ingestion Service] and view its details. For detailed steps on retrieving a failed batch, see the [Retrieving failed batches][Retrieving Failed Batches] guide.

## How do I parse the response returned for the HTTP request?
You can parse through a response by checking the status code and data inside of the returned object. Please see our [Data Ingestion Service][Data Ingestion Service] for more information on parsing HTTP responses.

## Why are my sent messages not being received by Real-time Customer Profile? 
Messages can be rejected by Real-time Customer Profile for any of the following reasons:
1. The identity namespace is invalid. There are two types of identity namespaces: default and custom. When using custom namespaces, please make sure the namespace has been registered with the Identity Service.
2. The identity value provided is invalid. 

See the [Identity Namespace overview][identity-namespace] for more information on using default and custom namespaces. You can also go to **Monitoring** under **Data Management** in the left-nav menu on Platform and click **Streaming End-to-End** for more information on why a message did not make it to Profile. 

## What happens when synchronous validation is requested on an edge that does not support it?
A 501 error response is returned when synchronous validation is not possible. This means that synchronous validation is not supported for this location. Please see the [streaming validation][Streaming Validation] developer guide for more information on synchronous validation.


<!-- [Trouble Shooting Guide]: (../aep_faq_and_troubleshooting/aep_faq_and_troubleshooting.md) --->
[Authenticated Data Collection]: authenticated_data_collection.md
[Getting Started With Streaming Ingestion]: getting_started_with_platform_streaming_ingestion.md 
[Streaming Validation]: streaming_validation.md
[Retrieving Failed Batches]: retrieving_failed_batches.md
[Platform UI]: https://platform.adobe.com
[Data Ingestion Service]: https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/ingest-api.yaml
[identity-namespace]: ../identity_namespace_overview/identity_namespace_overview.md