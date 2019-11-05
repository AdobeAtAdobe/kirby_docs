# Kafka connector for Adobe Experience Platform

The stream connector for Adobe Experience Platform is based on Apache Kafka Connect. This library can be used to stream JSON events from Kafka topics in your data center directly to Experience Platform in real-time.

The stream connector is a sink (one-way) connector, delivering data from Kafka topics to a registered endpoint on Experience Platform. To use this connector, you must download the library, add it to your existing Kafka deployment, and configure the Kafka topic(s) to the Adobe Streaming HTTP URL. Additional code is **not** required. The connector supports the following features:

- Authenticated collection of data
- Batching messages to reduce network calls and increase throughput

For more information on the Kafka connector, including instructions on how to set up the connector, please read the [getting started guide](https://github.com/adobe/experience-platform-streaming-connect). For a more detailed workflow, please read the [developer guide](https://github.com/adobe/experience-platform-streaming-connect/blob/master/DEVELOPER_GUIDE.md).