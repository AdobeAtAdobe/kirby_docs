# Streaming Ingestion Overview

## Overview

Streaming Ingestion for Adobe Experience Platform provides users a method to send data from client and server-side devices to Experience Platform in real-time.

## What can you do with Streaming Ingestion?

The most important goal of Platform is to create a complete, high fidelity, and real-time Unified Profile that can drive hyper-personalized experiences. Streaming Ingestion plays a key role in delivering data to Unified Profile and Data Lake with as little latency as possible.

### Stream profile records and ExperienceEvents

With streaming ingestion, users can stream profile records and ExperienceEvents to Platform in seconds to help drive real-time personalization. All data sent to streaming ingestion APIs is automatically persisted in the Data Lake.

Check out this [guide][getting-started] to learn more.

### Automatically stream to specific datasets

Publishers can send data to an existing dataset or have one created automatically for them. 

Check out this [guide][dataset-stream] to learn more.

## Adobe Experience Platform Extension

You can use the Adobe Experience Platform extension to create a new streaming connection. The Experience Platform extension provides actions to send beacons formatted in Experience Data Model (XDM) for real-time ingestion to Experience Platform. Visit the [Experience Platform Extension][aep-extension] documentation for more information. 


[getting-started]: getting_started_with_platform_streaming_ingestion.md

[dataset-stream]: streaming_to_datasets_in_adobe_experience_platform.md

[aep-extension]: https://docs.adobe.com/content/help/en/launch/using/extensions-ref/adobe-extension/adobe-experience-platform-extension.html