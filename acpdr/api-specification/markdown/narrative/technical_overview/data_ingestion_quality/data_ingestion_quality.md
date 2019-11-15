# Data quality in Adobe Experience Platform

Adobe Experience Platform provides well-defined guarantees for completeness, accuracy, and consistency for any data uploaded through either batch or streaming ingestion. The following document provides a summary of the supported checks and validation behaviors for batch and streaming ingestion in Experience Platform.

## Supported checks

&nbsp; | Batch Ingestion | Streaming Ingestion 
------ | --------------- | -------------------
Data type check | Yes | Yes
Enum check | Yes | Yes
Range check (min, max) | Yes | Yes
Required field check | Yes | Yes
Pattern check | No | Yes
Format check | No | Yes

## Supported validation behaviors

Both batch and streaming ingestion prevent failed data from going downstream by moving bad data for retrieval and analysis in Data Lake.

More information about how Platform monitors and validates data can be found in the [monitoring data flows documentation][data-flows].

[data-flows]: ../streaming_ingest/monitor-data-flows.md

[streaming-validation]: ../streaming_ingest/streaming_validation.md
[batch-validation]: ../streaming_ingest/retrieving_failed_batches.md