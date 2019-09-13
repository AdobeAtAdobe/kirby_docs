---
layout: default
---

# Payment Item

A payment associated with an order that defines the type of payment, the amount and the associated currency.
## Properties

`object`


###  transactionId
`string` 

The unique transaction identifier for this payment item.


###  paymentAmount
`number` 

The value of the payment.


###  paymentType
`string` 

The method of payment for this order. Enumerated, custom values allowed.

 *x ∈  {cash,creditCard,debitCard,check,payPal,wireTransfer,creditCardReferenceTransaction,other}*
 


###  currencyCode
`string` 

The ISO 4217 currency code used for this payment item.



