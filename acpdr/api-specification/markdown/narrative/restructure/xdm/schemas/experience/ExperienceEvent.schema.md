---
layout: default
---

# ExperienceEvent

The core ExperienceEvent XDM is used to capture observations that are altering one or more related XDMs/entities. The ExperienceEvent captures information about the observation taking place and when it is occurring. It is critical for time domain analytics as it allows observation and analysis of changes that occur in windows of time and comparison with other windows of time to track trends. ExperienceEvent are either explicit or implicit. Explicit events are direct observations of a human action taking place during a session. Implicit events are events that are being raised without a direct human action. Examples of implicit events are scheduled email sending of newsletters, battery voltage reaching a certain threshold, a person entering into range of a proximity sensor. While not all events are easily categorized across all data sources, it is extremely valuable to harmonize similar events into similar types for processing where possible, and the XDM specifications does this by defining a set of enumerated **type** attribute values with specific semantic meanings. Where possible events must be constrained to these enumerated values to facilitate interoperability.
## Properties

`object`


###  id
`string` _Required_

The unique identifier for the ExperienceEvent.


###  dataSource
[`common.DataSource.schema`](../common/DataSource.schema.md) _Required_

Globally unique identification of a data source.


###  timestamp
`integer` _Required_

The timestamp when the first event of the touchpoint occurred. Milliseconds since midnight of January 1, 1970.


###  endUserIds
[`common.EndUserIds.schema`](../common/EndUserIds.schema.md) 

Condensed, normalized encapsulation of all end user identifiers.



###  metrics
[`common.Metrics.schema`](../common/Metrics.schema.md) 

The metrics for actions performed during this observation.


###  environment
[`common.Environment.schema`](../common/Environment.schema.md) 

Information about the surrounding situation the event observation occurred in, specifically detailing transitory information such as the network or software versions.


###  productListItems
[`common.ProductListItem.schema`](../common/ProductListItem.schema.md)[] 

A list of items representing a product selected by a customer with specific options and pricing that are for that usage context at a specific point of time and may differ from the product record.


###  device
[`common.Device.schema`](../common/Device.schema.md) 

An identified Device/Application or Device/Browser instance that is trackable across sessions, normally by cookies.


###  commerce
[`common.Commerce.schema`](../common/Commerce.schema.md) 

The commerce specific data related to this interaction.


###  application
[`common.Application.schema`](../common/Application.schema.md) 

The application related to the event observation. It could be either the application targeted by the event like the send of a push notification or the application originating the event such as a click, or a login.


###  search
[`common.Search.schema`](../common/Search.schema.md) 

The information related to web or mobile search.


###  web
[`common.Web.schema`](../common/Web.schema.md) 

The information related to web page and link of the ExperienceEvent.


###  marketing
[`common.Marketing.schema`](../common/Marketing.schema.md) 

The information related to marketing activities that are active with the touchpoint.


###  locationContext
[`common.LocationContext.schema`](../common/LocationContext.schema.md) 

The transient circumstances related to the observation. Examples include locale specific information such as weather, local time, traffic, day of the week, workday vs. holiday, working hours.


###  _vendor
[`_vendor.ExperienceEvent.schema`](../_vendor/ExperienceEvent.schema.md) 

Vendor extensions to ExperienceEvent



