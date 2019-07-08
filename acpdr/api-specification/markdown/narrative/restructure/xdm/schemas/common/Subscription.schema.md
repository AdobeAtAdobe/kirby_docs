---
layout: default
---

# Subscription

Subscriptions are licensed entitlements to software, services or goods that are utilized in a time or usage based way.
## Properties

`object`


###  id
`string` 

Unique identifier for the subscription instance.


###  subscriber
[`common.Person.schema`](../common/Person.schema.md) 

The owner of the subscription.


###  device
[`common.Device.schema`](../common/Device.schema.md) 

The device linked to the subscription.


###  environment
[`common.Environment.schema`](../common/Environment.schema.md) 

Environment of the subscription.

This can be either then known environment at the time of the subscription
or the environment of the application for subscriptions related to an
Application.



###  SKU
`string` 

Stock Keeping Unit, a generally unique identifier for a product.


###  planName
`string` 

The human readable name for the subscription.


###  type
`string` 

The scope of entitlement in relation to how many people are covered by the subscription.


###  country
`string` 

The country that the subscription contractual/agreement terms are rooted in.


###  startDate
`date` 

The date the subscription begins.


###  endDate
`date` 

The date the current subscription term ends.


###  term
`integer` 

The numeric value of the term.


###  termUnitOfTime
`string` 

The unit of time for the term period.


###  renew
`string` 

The agreed way that the subscription may continue after the end date.


###  topUp
`string` 

Agreed terms for how consumable aspects of a subscription are repurchased during a billing period.


###  status
`string` 

The current status of the subscription.


###  contractId
`string` 

Unique ID for the contract that governs this subscription.


###  paymentMethod
`string` 

The payment method for recurring payments.


###  billingPeriod
`string` 

The duration between billings.


###  billingStartDate
`date` 

The date when the first bill is due.


###  chargeMethod
`string` 

The way the billing is setup to charge the customer.


###  paymentStatus
`string` 

The standing of the account.


###  category
`string` 

The main, top level categorization of this type of subscription.


###  subCategory
`string` 

The specific sub categorization of the subscription.


###  revision
`string` 

The identification between subscriptions of the same name and category hierarchy.


###  reason
`string` 

The general intent the member has for the use of the subscription.



