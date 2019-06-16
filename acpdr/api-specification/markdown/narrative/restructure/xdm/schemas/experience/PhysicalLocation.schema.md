---
layout: default
---

# Physical Location


## Properties

`object`


###  id
`string` _Required_

The unique identifier of the location.


###  description
`string` 

The description of the physical location.


###  address
[`common.Address.schema`](../common/Address.schema.md) 

The physical address of the location.


###  phoneNumber
`string` 

The phone number.


###  locationCode
`string` 

A short code that uniquely identifies this location.


###  shape
[`common.GeoShape.schema`](../common/GeoShape.schema.md) 

The geographic shape of the physical location.


###  pointOfInterest
[`common.GeoCoordinates.schema`](../common/GeoCoordinates.schema.md) 

The coordinates of the point of interest for this location.


###  containedByLocation
[`common.Reference.schema`](../common/Reference.schema.md) 

A relation between this location and another one that contains it.


###  containsLocations
[`common.Reference.schema`](../common/Reference.schema.md)[] 

An array of one or more physical locations that are contained in this one.



