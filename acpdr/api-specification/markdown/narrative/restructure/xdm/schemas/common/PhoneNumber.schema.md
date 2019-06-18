---
layout: default
---

# Phone Number

Information that allows the phone calling of a person. Typically an alphanumeric number, 1-222-333 4444 in North America, but can have a wide range of formats.
## Properties

`object`


###  primary
`boolean` 

Primary phone number indicator.

Unlike for Address or EmailAddress, there can be multiple primary phone numbers; one per communication channel.
The communication channel is defined by the type:

* `textMessaging`: type = `mobile`
* `phone`: type = `home` | `work` | `unknown`
* `fax`: type = `fax`



###  type
`string` 

The way the phone number relates to the person. e.g 'work' or 'personal'

 *x ∈  {unknown,mobile,home,work,fax}*
 


###  number
`string` 

The phone number. Note the phone number is a string and may include meaningful characters such as brackets (), hyphens - or characters to indicate sub dialing identifiers like extensions x. E.g 1-353(0)18391111 or +613 9403600x1234.


###  extension
`string` 

The internal dialing number used to call from a private exchange, operator or switchboard.


###  status
`string` 

An indication as to the ability to use the phone number.

 *x ∈  {active,incomplete,blacklisted,blocked}*
 


###  statusReason
`string` 

A description of the current status.


###  validity
`string` 

A level of technical correctness of the phone number.

 *x ∈  {consistent,inconsistent,incomplete,successfullyUsed}*
 


###  audit
[`common.AuditTrail.schema`](../common/AuditTrail.schema.md) 





