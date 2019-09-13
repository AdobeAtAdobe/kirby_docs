---
layout: default
---

# Email Address

A standard email address.
## Properties

`object`


###  primary
`boolean` 

Primary email indicator.

A Profile can have only one `primary` email address at a given point of time.



###  address
`string` 

The technical address, e.g 'name@domain.com' as commonly defined in RFC2822 and subsequent standards.


###  label
`string` 

Additional display information that maybe available, e.g MS Outlook rich address controls display 'John Smith smithjr@company.uk', the 'John Smith' part is data that would be placed in the label.


###  type
`string` 

The way the account relates to the person. e.g 'work' or 'personal'

 *x ∈  {unknown,personal,work,education}*
 


###  status
`string` 

An indication as to the ability to use the email address.

 *x ∈  {active,incomplete,pendingVerification,blacklisted,blocked}*
 


###  statusReason
`string` 

A description of the current status.


###  audit
[`common.AuditTrail.schema`](../common/AuditTrail.schema.md) 





