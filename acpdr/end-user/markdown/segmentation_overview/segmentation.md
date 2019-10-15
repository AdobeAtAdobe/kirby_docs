# Segmentation Service overview

Adobe Experience Platform Segmentation Service provides a user interface and RESTful API that allows you to build segments and generate audiences from your Real-time Customer Profile data. These segments are centrally configured and maintained on Platform, and are readily accessible by any Adobe solution. 

This document provides an overview of Segmentation Service and the role it plays in Adobe Experience Platform. The following topics are covered:
* [How does segmentation work?](#how-does-segmentation-work): Understand the big picture about segmentation and its role within Experience Platform.
* [Segment metadata](#segment-metadata): Learn why segment names and merge policies play an important role within Experience Platform.
* [Advanced Segmentation Service features](#advanced-segmentation-features): Learn alternative ways to generate audiences using different segment types. 
* [Segmentation Service data types](#segmentation-service-data-types): Learn how data types influence the segment definition process.

It is important to understand the following key terms used throughout this document:
* __Segmentation__: Dividing a large group of individuals (such as customers, prospects, users, or organizations) into smaller groups that share similar traits and will respond similarly to marketing strategies.
* __Segment definition__: The rule set used to describe key characteristics or behavior of a target audience. Once conceptualized, the rules outlined in a segment definition are used to determine qualifying audience members for a segment.
* __Audience__: The resulting set of profiles that meet the criteria of a segment definition.

## How does segmentation work?

Segmentation is the process of defining specific attributes or behaviors shared by a subset of profiles from your profile store to distinguish a marketable group of people from your customer base. For example, in an email campaign called "Did you forget to buy your sneakers?", you may want an audience of all users who searched for running shoes within the last 30 days, but who did not complete a purchase. 

Once a segment has been conceptually defined it is built in Experience Platform. Typically, segments are built by the marketer or audience specialist although some organizations prefer they be created by their marketing department, in collaboration with their data analysts. Upon reviewing the data being sent to Platform, the data analyst composes the segment definition by selecting which fields and values will be used to build the rules or conditions of the segment. This is done using either the UI or API. 

### Create segments

Whether created using the API or using the Segment Builder, segments are ultimately defined using Profile Query Language (PQL). This is where the conceptual segment definition gets described in the language built to retrieve profiles meeting the criteria. For more information, see the [PQL overview](../../../api-specification/markdown/narrative/technical_overview/unified_profile_architectural_overview/unified_profile_pql.md). To learn what queries are supported by PQL see [supported PQL queries](../../../api-specification/markdown/narrative/technical_overview/unified_profile_architectural_overview/unified_profile_supported_queries.md). 

To learn how to create and use segments in the Segment Builder (the UI implementation of Segmentation Service), see the [Segment Builder guide](segment-builder-guide.md). 

For information on building segment definitions using the API, see the tutorial on [creating audience segments using the API](../../../api-specification/markdown/narrative/tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md).

 >**Note**: In the event a schema is extended, all future uploads must update newly added fields accordingly. For more information on customizing Experience Data Model (XDM), visit the [Schema Editor tutorial](../../../api-specification/markdown/narrative/tutorials/schema_editor_tutorial/schema_editor_tutorial.md).

### Evaluate segments

**Streaming segmentation**

Streaming segmentation is an ongoing data selection process that updates your segments in response to user activity. Once a segment has been built and saved, the segment definition is applied against incoming data on either Real-time Customer Profile or the edge service, depending on how the segment is activated (or used downstream). Segment additions and removals are processed regularly, ensuring your target audience remains relevant. 

**Batch segmentation**

As an alternative to an ongoing data selection process, batch segmentation moves all profile data at once through segment definitions to produce corresponding audiences. Once created, this segment is saved and stored so that you can export it for use.

 To learn how to evaluate segments see the [segment evaluation tutorial](../../../api-specification/markdown/narrative/tutorials/segmentation/evaluate_segment.md). 

### Access segmentation results

See the Profile API tutorial to learn how to [access an exported segment](../../../api-specification/markdown/narrative/tutorials/consuming_unified_profile_data/consuming_unified_profile_data.md#access-an-exported-segment).
  
## Segment metadata

Segment metadata facilitates indexing in the event any of your segments are to be reused and/or combined. 

Composing your segments (through either the API or Segment Builder) requires that you to define a segment name and merge policy.

### Segment names

When creating a new segment, you are required to provide a segment name. The segment name is used to identify a particular segment amongst the collection built by Segmentation Service. Segment names should therefore be descriptive, concise, and unique.

> **Note:** When planning a segment, remember that segments can be referenced from, and combined with, any other segment. When selecting a name, consider the possibility that your segment may contain reusable portions.

### Merge policies

Merge policies are rules used by Profile to determine how data will be prioritized and combined into a unified view under certain conditions. 
If a merge policy is not defined, the default Platform merge policy is used. If you would rather use a merge policy specific to your organization, you can create your own and mark it as your organization's default.

>Note: Estimation of audience sizes is based on the organization's default profile merge policy.

### Other segment metadata

In addition to segment name and merge policy, Segment Builder offers you an additional "segment description" metadata field where you can summarize your segment definition's purpose.

## Advanced segmentation features

Segments can be configured to continually generate an audience on an ongoing basis by combining [streaming data ingestion](../../../api-specification/markdown/narrative/technical_overview/streaming_ingest/streaming_ingest_overview.md) with any of the following advanced segmentation features: 
* Sequential segmentation
* Dynamic segmentation
* Multi-entity segmentation
* Personalization payload

These advanced features are discussed in more detail in the following sections.

### Sequential segmentation

A standard user journey is sequential in nature.  Adobe Experience Platform allows you to define an ordered series of segments to reflect this journey thereby capturing sequences of events as they occur. You can arrange events into their desired order by using the visual event timeline in the Segment Builder.

An example of a customer journey that would require sequential segmentation would be product view > product add > checkout > No purchase. 

### Dynamic segmentation

Dynamic segmentation solves the scalability problems marketers traditionally face when building segments for marketing campaigns.

Unlike static segmentation which requires you to explicitly and repeatedly capture every possible use case, dynamic segmentation uses variables to build the rule logic and dynamically express relationships.

### Use case: Looking for customers who make purchases outside their home state

To illustrate the value of this advanced segmentation feature, consider a data architect collaborating with a marketer to identify customers who made purchases outside their home state.

**The problem**

Static segmentation requires you to define individual segments with a unique home state attribute, before filtering for purchase events that do not equal the home state. An explicit segment of this type would read "I'm looking for people from Utah where the state of their purchase is not Utah". Creating an audience using this method requires you to define one segment for every US state, for a total of 50 segments.

As a result of the different segment combinations that inevitably arise as you scale, the manual process required for static segmentation becomes more time consuming, reducing your overall efficiency.

**The solution**

By assigning a variable to the purchase state attribute, your dynamic segment simplifies to "find me a purchase where the state of that purchase is not equal to the customer's home state". Doing so allows you to then consolidate 50 static segments into a single dynamic segment. 
 
### Multi-entity segmentation

With the advanced multi-entity segmentation feature, you can create segments using multiple XDM classes thereby adding extensions to person schemas. As a result, Segmentation Service can access additional fields during segment definition as if they were native to the profile data store.

Multi-entity segmentation provides the flexibility needed to identify audiences based on data relevant to your business needs. This process can be done quickly and easily without requiring expertise in querying databases. This enables you to add key data to your segments without having to make costly changes to data streams or wait for a back-end data merge. 

### Use case: Price driven promotion
To illustrate the value of this advanced segmentation feature, consider a data architect collaborating with a marketer. 

In this example, the data architect is joining data for an individual (made up of schemas with XDM Profile and XDM ExperienceEvent as their base classes) to another class using a key. Once joined, the data architect or the marketer can use these new fields during segment definition as if they were native to the base class schema.

**The problem**

The data architect and marketer both work for the same clothing retailer. The retailer has over 1,000 stores across North America and periodically lowers product prices throughout their lifecycle. As a result, the marketer wants to run a special campaign to give shoppers who have shopped for these items a chance to purchase them at the discounted price.

The data architect's resources include access to web data from customer browsing as well as cart addition data containing product SKU identifiers. They also have access to a separate "products" class, where additional product information (including product price) is stored. Their guidance is to focus on customers who added a product to their cart within the last 14 days, but did not purchase the item, whose price has now dropped.

**The solution**
>Note: We will assume in this example that the data architect has already established an ID Namespace.

Using the API, the data architect relates the key from the ExperienceEvent schema with the "products" class. Doing so allows the data architect to make use of the additional fields from the "products" class as if they are native to the ExperienceEvent schema. As the final step of the configuration work, the data architect needs to bring the appropriate data into Real-time Customer Profile. This is done by enabling the "products" dataset for use with Profile. With the configuration work complete, either the data architect or the marketer can build the target segment in Segment Builder.

See the [schema composition overview](../../../api-specification/markdown/narrative/technical_overview/schema_registry/schema_composition/schema_composition.md#union) to learn how to define relationships across XDM classes.

### Personalization payload

Segments can now carry a payload of contextual details to enable deep personalization of Adobe Solutions as well as external non-Adobe applications. These payloads can be added while defining your target segment.

With contextual data built into the segment itself, this advanced Segmentation Service feature allows you to better connect with your customer.

Segment Payload helps you answer questions surrounding your customer’s frame of reference such as:
* What: What product was purchased? What product should be recommended next?
* When: At what time and date did the purchase occur?
* Where: In which store or city did the customer make their purchase?

While this solution does not change the binary nature of segment membership, it does add additional context to each profile through an associated segment membership object. Each segment membership object has the capacity to include three kinds of contextual data:

* **Identifier**: this is the ID for the segment 
* **Attributes**: this would include information about the segment ID such as last qualification time, XDM version, status and so on.
* **Event data**: Specific aspects of experience events which resulted in the profile qualifying for the segment

Adding this specific data to the segment itself allows execution engines to personalize the experience for the customers in their target audience.

### Use cases

To illustrate the value of this advanced segmentation feature, consider three standard use cases that illustrate the challenges that were present in marketing applications prior to the Segment Payload enhancement:
* Email personalization
* Email retargeting
* Ad retargeting

**Email personalization**

A marketer building an email campaign may have attempted to build a segment for a target audience by using recent customer store purchases within the last three months. Ideally, this segment would require both the item name and the name of the store where the purchase was made. Prior to enhancement, the challenge was capturing the store identifier from the purchase event and assigning it to that customer’s profile.

**Email retargeting**

It is often complex to create and qualify segments for email campaigns targeting "cart abandonment". Prior to the enhancement, knowing which products to include in a personalized message was difficult due to the availability of the required data. Data for which products were abandoned is tied to experience events which were formerly challenging to monitor and extract data from.

**Ad retargeting**

Another traditional challenge for marketers has been creating ads to retarget customers with abandoned shopping cart items. While segment definitions addressed this challenge, prior to the enhancement, there was no formal method to differentiate between purchased products and abandoned products. Now you can target specific datasets during segment definition. 

## Segmentation Service data types

All XDM data types are supported within Segmentation Service. The rules that constitute a segment definition are contextualized by the following data types.

### String data

Segment definitions use string data to define non-numerical constraints for segment audiences, such as "country name" or "loyalty program level". 

String data is included in segment definitions using logical, inclusive/exclusive, and comparison statements. Once a string attribute is added to your segment definition, you can use string-relevant statements to evaluate it against other string fields.

|Statement type|Examples|
|----------------|---------------|
|Logical|and, or, not|
|Inclusive/exclusive|include, must exist, exclude, must not exist|
|Comparison|equals, does not equal, contains, starts with|


### Date data

Date data allows you to assign time-based context to your segment definitions, either by using specific start/end dates or by using date-relevant statements as shown in the table below. One implementation might be creating an audience of customers that have interacted with your brand anytime *this year* and has also been active *within* the last few days.

|Example field|Date-relevant statements|Timeline|
|----------------|---------------|-------------------|
|person.firstPurchase|today, yesterday, this month, this year| Relevant to the day the segment was built.
|person.lastPurchase|in last, during, before, after, within|Relevant within any given week/month.

### Experience Events

As an Adobe Experience Platform schema, XDM ExperienceEvents record explicit and implicit customer interactions with Platform-integrated applications, including a snapshot of the system at the time the interaction took place. ExperienceEvents are fact records. As such, they are a data source available to you during segment definition.

As seen in the table below, event data is rendered using keywords which help refine event behavior and specify event attributes. 

|Keyword|Use|
|----------------|---------------|
|Include/exclude|Describes the behavior of the event through the inclusion or omission of data.|
|Any/all|Helps determine the number of qualifying segments.|
|"Apply time rule" toggle button|Encorporates date data.|
|Equals, does not equal, starts with, does not start with, ends with, does not end with, contains, does not contain, exists, does not exist|Encorporates string data.|

### Segments

Existing segment definitions can also be used as components of a new segment definition, adding their attribute and event-based rules to the new segment.

### Other data types

In addition to those mentioned above, the list of supported data types also includes:
* String
* Uniform resource identifier
* Enum
* Number
* Long
* Integer
* Short
* Byte
* Boolean
* Date
* Date-time
* Array
* Object
* Map
* Events

## Next steps

Segmentation Service provides a consolidated workflow to build segments from Real-time Customer Profile data. In summary:

* Segmentation is the process of defining a subset of profiles from your profile store, allowing you to characterize behavior or attributes of a desired marketable group. Segmentation Service makes this process possible.
* When planning a segment, keep in mind that a segment can be referenced from, and combined with, any other segment.
* A segment can be built from rules based on profile data, related time series data, or both.
* Segments can either be evaluated on-demand or continuously. When evaluated on-demand, all profile data is passed through the segment definitions at once. When evaluated continuously, data streams through segment definitions as it enters Platform.
  
To learn how to define segments in the UI, see the [Segment Builder guide](segment-builder-guide.md). For information on building segment definitions using the API, see the tutorial on [creating segments using the API](../../../api-specification/markdown/narrative/tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md).