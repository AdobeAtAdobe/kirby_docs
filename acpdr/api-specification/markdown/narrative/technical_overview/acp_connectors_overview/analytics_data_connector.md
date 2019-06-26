# Analytics Data Connector

The Analytics Data Connector streams data collected by Analytics to Adobe Experience Platform in real time. The connector also converts SCDS-formated Analytics data into Experience Data Model (XDM) for consumption by Platform.

## What is Experience Data Model (XDM)?

XDM is a publicly documented specification that provides common structures and definitions for an application to use to communicate with services on Adobe Experience Platform. 

Adhering to XDM standards allows data to be uniformly incorporated, making it easier to deliver data and gather information.

For more information about XDM, check out how [XDM is used in Adobe Experience Platform][xdm].

## How are fields mapped from Adobe Analytics to XDM?

Fields are either **directly mapped** or **transformed (generated) mapped**.

For the directly mapped fields, check out [this document][direct].

For the generated mapped fields, check out [this document][indirect].

[xdm]: ../schema_registry/xdm_system/xdm_system_in_experience_platform.md

[direct]: direct_mapping_fields.md
[indirect]: generated_mapping_fields.md