---
layout: default
---

# Product

XDM product variant, master product and key attributes of product in the product catalog.
## Properties

`object`


###  id
`string` 

The internal unique ID of the variant in the commerce backend system.


###  SKU
`string` 

The unique SKU (Stock Keeping Unit) of the variant assigned by the vendor.


###  name
`string` 

The name of the product.


###  description
`string` 

The localized description of the product.


###  category
`string` 

Primary categorization (category) name of the Master/variant.


###  department
`string` 

Primary department the product is associated with.


###  brand
`string` 

Brand of the Master/Variant products.


###  masterProductId
`string` 

The internal unique ID of the product in the commerce backend system.


###  masterProductSKU
`string` 

The unique SKU (Stock Keeping Unit) of the master product assigned by the vendor or manufacturer(to update).


###  masterProductName
`string` 

The localized name of the product.


###  masterProductDescription
`string` 

The description of the product.


###  fabrication
`string` 

Primary material the product is constructed with.


###  gender
`string` 

Gender the product is marketed to. [male,female,unisex,unknown].


###  size
`number` 

Standard product size for the product.


###  unitOfMeasure
`string` 

Standard unit of measure of the varient. Denotes the units for the size measurement.


###  countryOfOrigin
`string` 

Country of origin as defined by customs requirements.


###  COGS
`number` 

Cost of Good Sold. In the currencyCode currency.


###  listPrice
`number` 

Default price of the product before sales and discounting. In the currencyCode currency.


###  currencyCode
`string` 

The ISO 4217 currency code used for cost and pricing.


###  originalSaleDate
`string` 

First date the product was made available for sale. The time using RFC3339 with a stated timezone offset such as "2001-07-04T12:08:56-07:00". An example formatting pattern is "yyyy-MM-dd'T'HH:mm:ssXXX".


###  productCreateDate
`string` 

The date when this product varient was created. The time using RFC3339 with a stated timezone offset such as "2001-07-04T12:08:56-07:00". An example formatting pattern is "yyyy-MM-dd'T'HH:mm:ssXXX".


###  productLastModified
`string` 

The date when this product varient was last modified. The time using RFC3339 with a stated timezone offset such as "2001-07-04T12:08:56-07:00". An example formatting pattern is "yyyy-MM-dd'T'HH:mm:ssXXX".


###  productURL
`string` 

The URL for the primary Product View of the product varient page.


###  manufacturerName
`string` 

Manufacturer of the product.


###  supplierName
`string` 

The distributor of the product.



