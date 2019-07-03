---
layout: default
---

# Geo Shape

The geographic shape of a place. Based on http://schema.org/GeoShape.
## Properties

`object`


###  id
`string` _Required_

The unique identifier of the shape.


###  description
`string` 

A description of what the shape is defining.


###  polygon
[`common.GeoCoordinates.schema`](../common/GeoCoordinates.schema.md)[] 

A series of four or more coordinates where the first and final coordinates are identical.


###  circle
[`common.GeoCircle.schema`](../common/GeoCircle.schema.md) 

A circular region with a specific radius centered on a geographic coordinate.


###  box
[`common.GeoCoordinates.schema`](../common/GeoCoordinates.schema.md)[] 

The area enclosed by the rectangle formed by two coordinates. The first coordinate is the lower corner and the second coordinate is the upper corner of a rectangle.


###  altitude
`number` 

The specific or minimum altitude of the shape. This value conforms to the WGS84 datum and is measured in meters.


###  ceiling
`number` 

The maximum altitude of the shape. Only valid when used in combination with elevation. This value conforms to the WGS84 datum and is measured in meters.



