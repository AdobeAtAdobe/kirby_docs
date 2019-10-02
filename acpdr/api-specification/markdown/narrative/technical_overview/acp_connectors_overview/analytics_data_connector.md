# Adobe Analytics data connector

The Adobe Analytics data connector streams data collected by Adobe Analytics to Adobe Experience Platform in real time. The connector also converts SCDS-formated Analytics data into Experience Data Model (XDM) for consumption by Platform.

## What is Experience Data Model (XDM)?

XDM is a publicly documented specification that provides common structures and definitions for an application to use to communicate with services on Adobe Experience Platform. 

Adhering to XDM standards allows data to be uniformly incorporated, making it easier to deliver data and gather information.

For more information about XDM, check out how [XDM is used in Adobe Experience Platform][xdm].

## How are fields mapped from Adobe Analytics to XDM?

Fields are either **directly mapped** or **transformed (generated) mapped**. Please see documentation for [Analytics mapping fields][mapping] for more information. 

## What is the expected latency for Analytics Data on Platform?

| Analytics Data | Latency | 
| --- | --- | 
| Streaming (mid) | <5 minutes.* | 
| Batch (mid & post) | 60-120 minutes.* | 
| Backfill data - 13 Months of Data or 10 Billion events (whichever is lower) | 4 weeks. |


> __*Note:__ Latency will vary depending on customer configuration, data volumes, and consumer applications. For example, if the Analytics implementation is configured with `A4T` the latency to Pipeline will increase to 5-10 minutes.

[xdm]: ../schema_registry/xdm_system/xdm_system_in_experience_platform.md

[mapping]: analytics_mapping_fields.md