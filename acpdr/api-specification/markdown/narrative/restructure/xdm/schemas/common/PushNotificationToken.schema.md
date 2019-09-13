---
layout: default
---

# Push Notification Token

Push notification tokens are used to communicate with applications that
are installed on devices or SaaS application accounts. Examples include mobile
application notifications over notification services like the Apple Push
Notification service.

## Properties

`object`


###  token
`string` 

The service specific token used to address the application for
communication. e.g an Apple APN ID or a Google GCM ID.



###  registrationDate
`date-time` 

Date and time when the profile has authorized its application to receive
push notifications.



###  deregistrationDate
`date-time` 

Date and time when the profile has disabled push notifications on the application.



###  environment
[`common.Environment.schema`](../common/Environment.schema.md) 

Environment of at the time of the registration.



###  device
[`common.Device.schema`](../common/Device.schema.md) 

The device originating the registration.


###  application
[`common.Application.schema`](../common/Application.schema.md) 

Application registered to receive Push Notifications.



###  communicationChannel
[`common.CommunicationChannel.schema`](../common/CommunicationChannel.schema.md) 

Channels for communicating with customers or users.



