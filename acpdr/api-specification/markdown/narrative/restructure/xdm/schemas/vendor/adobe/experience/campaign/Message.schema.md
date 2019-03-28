---
layout: default
---

# Message

A message part of a campaign activity.
A message is created each `Profile` targeted in a `Delivery`. If a profile
is targeted twice within the same delivery, two messages will be created.

## Properties

`object`


###  id
`string` _Required_




###  profile
[`experience.Profile.schema`](../../../../experience/Profile.schema.md) 

The recipient of the message.

This property is primarily used to link the message to a Profile using the EndCustomerId
but it can also be used to freeze some properties of the profile at the time the message
was sent.



###  delivery
[`campaign.Delivery.schema`](../../../../_vendor/adobe/experience/campaign/Delivery.schema.md) _Required_

The campaign activity originating this message.



###  from
`string` 

Address used as a from/sender/caller address.
Depending on the communication channel, the `address` has a different format.

  * `email`: an email address.
  * `textMessage` or `phone`: a shortcode or phone number.



###  to
`string` 

Address used to deliver the message to the recipient.
Depending on the communication channel, the `address` has a different format.

  * `email`: an email address.
  * `textMessage` or `phone`: a phone number.
  * `directMail`: a postal address.
  * `pushNotification`: a push registration token.



###  quarantine
`boolean` 

Address moved to quarantine.
The quarantine is set to true when the message failed to deliver in a way
that indicates that no future messages will be deliverable either to this
address.



###  proofMember
`boolean` 

The recipient of this message is a member of the proof group for this campaign activity.


###  seedMember
`boolean` 

The recipient of this message is a member of a seed list for this campaign
activity.



###  controlGroupMember
`boolean` 

The recipient of this message is a member of a control group
for this campaign activity.

Messages to control group members are not delivered.



###  testMember
`boolean` 

The recipient of this message is a member of a test group for this campaign activity.


###  size
`integer` 

Size in bytes of the message.

* For email, the `size` reflects the all MIME envelop of the message, including
the encoded attachments if any.
* For SMS, the `size` reflects the number of bytes necessary to deliver the message.
If that number is over 160 the message will be delivered over more than one SMS.



###  scheduledAt
`date-time` 

The date and time the message is expected to be delivered.


###  variant
`string` 

A campaign activity can have multiple variants (French, English) but a
message delivered to a recipient always contains one of them.

> IMPORTANT: Using the mirror page, the recipient can switch from one
  variant to another (ex: switch of the language).



###  IP
`string` 

Outbound IP address used to deliver the message.


###  reason
`string` 

The reason why the message could/would not be delivered.

 *x ∈  {unknownUser,invalidDomain,disabled,mailboxFull,refused,unreachable}*
 


###  reasonMessage
`string` 

Reason of message delivery failure when the status is `bounce` or `nonDeliverable`.



###  offerPlacements
[`campaign.OfferPlacement.schema`](../../../../_vendor/adobe/experience/campaign/OfferPlacement.schema.md)[] 

Offers displayed in the message.



