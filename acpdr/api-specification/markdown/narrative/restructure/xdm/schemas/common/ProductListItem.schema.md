---
layout: default
---

# Product List Item

The product list item is a list item representing a product selected by a customer with specific options and pricing that are for that usage context at a specific point of time and may differ from the product record. For example the product record contains details from the product information system that are consistent for all customers, where the product list item has the actual price offered to the customer at that time which may vary due to sales campaigns or seasonal pricing.
## Properties

`object`


###  SKU
`string` _Required_

Stock Keeping Unit, the unique identifier for a product defined by the vendor.


###  lineItemId
`string` 

The line item identifier for this product entry.


###  name
`string` 

The display name for the product as presented to the user for this product view.


###  productAddMethod
`string` 

The method that was used to add a product item to the list by the visitor. Set with product list add metrics.


###  currencyCode
`string` 

The ISO 4217 currency code used for pricing the product.


###  quantity
`integer` 

The number of units the customer has indicated they require of the product.


###  priceTotal
`number` 

The total price for the product line item.



