---
layout: default
---

# Delivery

An action targeting one or more persons in a campaign.

## Properties

`object`


###  id
`string` _Required_




###  title
`string` _Required_

Human readable name of the activity.


###  communicationChannel
[`common.CommunicationChannel.schema`](../../../../common/CommunicationChannel.schema.md) _Required_

The marketing channel used to execute this activity.



###  description
`string` 

Description of the activity intent.


###  trackingCode
`string` 

A human readable tracking code for this activity. A same tracking code
can be reused over multiple activities.

For instance this could be a promotion code. That same code could be used
over different channels at different point of time. All activities sharing
that same promotion code can then be grouped together within a same report
even if they are not under the same campaign.



###  startDate
`date-time` _Required_

The intended start date of the activity.

In Adobe Campaign, the start date is when the delivery of the messages is
scheduled to start.



###  endDate
`date-time` 

The intended end date of the activity.

In Adobe Campaign, the end date is the expiration date of the delivery.
After this date, no messages are expected to be delivered.

Unlike the `startDate`, the `endDate` is not required. Some activities
can be *open* and so the `endDate` is not known at the time of the creation
of the entity (e.g., a real-time messaging activity in Adobe Campaign).



###  messagesClass
`string` _Required_

Marketing classification of the messages sent through that delivery.


 *x ∈  {bulk,automation,transactional}*
 


###  campaign
[`campaign.Campaign.schema`](../../../../_vendor/adobe/experience/campaign/Campaign.schema.md) 

Campaign owning the delivery activity.



###  template
[`common.Reference.schema`](../../../../common/Reference.schema.md) _Required_

The delivery template used to initialize this delivery.

The type the template used in Adobe Campaign can be identified using the `messageClass`.

* `messageClass` = `bulk`: the template is standard delivery template.
* `messageClass` = `automation`: the template is a recurring delivery.
* `messageClass` = `transactional`: the template is a transactionnal message template.



###  testEnabled
`boolean` _Required_

Specify whether delivery is of type AB testing.




