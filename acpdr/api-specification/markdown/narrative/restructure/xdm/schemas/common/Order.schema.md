---
layout: default
---

# Order

The order placed for a product list.
## Properties

`object`


###  purchaseId
`string` 

Unique identifier assigned by the seller for this purchase or contract.


###  purchaseOrderNumber
`string` 

Unique identifier assigned by the purchaser for this purchase or contract.


###  payments
[`common.PaymentItem.schema`](../common/PaymentItem.schema.md)[] 

The list of payments for this order.


###  currency
`string` 

The ISO 4217 currency code used for the order totals.


###  priceTotal
`number` 

The total price of this order after all discounts and taxes have been applied.



