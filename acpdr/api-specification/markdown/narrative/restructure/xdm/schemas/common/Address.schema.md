---
layout: default
---

# Address

A postal address. Address could relate to a persons home, work, preferred store location etc.
## Properties

`object`


###  primary
`boolean` 

Primary address indicator. A Profile can have only one `primary` address at a given point of time.



###  type
`string` 

The way the address relates to the person. e.g 'work' or 'home'. Note this is person neutral, all persons will have a common address.type, if it is person specific the relationship attribute should be used e.g address.relationship='residence'

 *x ∈  {home,work,unknown}*
 


###  label
`string` 

Free form name of the address.


###  street1
`string` 

Primary Street level information, apartment number, street number and street name.


###  street2
`string` 

Optional street information second line.


###  street3
`string` 

Optional street information third line.


###  street4
`string` 

Optional street information fourth line.


###  city
`string` 

The town, city, village or other metropolitan identity of the address.


###  region
`string` 

The region, county, or district portion of the address.


###  stateProvince
`string` 

The state, province, region, territory portion of the address.


###  stateProvinceISO
`string` 

The country subdivision as defined by the second part of [ISO 3166-2](https://www.iso.org/iso-3166-country-codes.html#2012_iso3166-2)
(without the first part and the hyphen ISO 3166-1 alpha-2).

Example:

* CA: from ISO 3166-2 `US-CA` value designating the state of California in the United States of America.
* 75: from ISO 3166-2 `FR-75` value designating the metropolitan department of Paris in France.

> NOTE: This value must be combined with countryCodeISO to compose a valid ISO 3166-2 code.



###  postalCode
`string` 

The postal code, zip code of other postal ordering for the address. Note, if zip codes are used either the base zip or zip+4 format can be used.


###  country
`string` 

The name of the government-administered territory.


###  countryISO
`string` 

The alpha-2 code of the country as defined by [ISO 3166-1](https://www.iso.org/iso-3166-country-codes.html).


###  latitude
`number` 

Defines the latitude of the delivery address.


###  longitude
`number` 

Defines the longitude of the delivery address.


###  status
`string` 

An indication as to the ability to use the address.

 *x ∈  {active,incomplete,pendingVerification,blacklisted,blocked}*
 


###  statusReason
`string` 

A description of the current status.


###  lastVerifiedDate
`date` 

The date that the address was last verified as still belonging to the person.


###  audit
[`common.AuditTrail.schema`](../common/AuditTrail.schema.md) 





