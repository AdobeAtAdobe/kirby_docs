---
layout: default
---

# Profile

XDM Individual Profiles are a singular representation of the attributes of identified and
partially identified persons. Profiles that are highly identified maybe used for
personal communications or highly targeted engagements and can contain detailed
personal information such as names, gender, date of birth, locations, and contact
information like phone numbers and email addresses. Profiles may range to the
other end of the identification spectrum where only anonymous behavioral signals
are being observed and the amount of identification is simple browser cookies.
In this latter case, the sparse Profile data is useful to build more knowledge
on the interests and preferences of the anonymous profile, and over time can
become richer as the person interacting with brand becomes more engaged and
ultimately signs-on to notifications, subscriptions, purchases and other
connections with the brand that enrich and fill out the profile.

XDM Individual Profile can contain personal information, identification information, contact
details and communication preferences. Over time XDM Individual Profile will expand to cater
for other Profile data such as preference, propensities and other attributes.


## Properties

`object`


###  endUserIds
[`common.EndUserIds.schema`](../common/EndUserIds.schema.md) 

Condensed, normalized encapsulation of an end user identifier from a specific data source.



###  person
[`common.Person.schema`](../common/Person.schema.md) 

An individual actor, contact, or owner.



###  addresses
[`common.Address.schema`](../common/Address.schema.md)[] 

A postal address. Address could relate to a persons home, work, preferred
store location etc.



###  emails
[`common.EmailAddress.schema`](../common/EmailAddress.schema.md)[] 

A standard email address.



###  phoneNumbers
[`common.PhoneNumber.schema`](../common/PhoneNumber.schema.md)[] 

Information that allows the phone calling of a person. Typically an
alphanumeric number, 1-222-333 4444 in North America, but can have a wide
range of formats.



###  optInOut
[`common.OptInOut.schema`](../common/OptInOut.schema.md) 

Describes a users opting in and out preferences for communication by medium
and communication type.



###  pushNotificationTokens
[`common.PushNotificationToken.schema`](../common/PushNotificationToken.schema.md)[] 

Push notification tokens are used to communicate with applications that
are installed on devices or SaaS application accounts.



###  orgUnitId
`string` 

The unit ID within the organization owning the profile. This ID can be used to reference the organization details maintained in another dataset.


###  geoUnitId
`string` 

The geographical unit ID within the organization owning the profile. This ID can be used to reference the geographical information maintained in another dataset.


###  audit
[`common.AuditTrail.schema`](../common/AuditTrail.schema.md) 




###  organizations
`string`[] 





