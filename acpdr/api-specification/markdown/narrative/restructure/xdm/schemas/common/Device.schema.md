---
layout: default
---

# Device

An identified device that is an application or browser instance that is trackable across sessions, normally by cookies.
## Properties

`object`


###  typeId
`string` 

An identifier for the device. This may be an identifier from Device Atlas or another service that identifies the hardware that is being used.


###  typeIdService
`string` 

The namespace of the service that is used to identify the device type. For example: "deviceAtlas".


###  type
`string` 

Type of device being tracked.

 *x ∈  {mobile,tablet,desktop,ereader,gamingConsole,television,setTopBox,mediaPlayer}*
 


###  manufacturer
`string` 

The name of the organization who owns the design and creation of the Device. For example, 'Apple' is the manufacturer of the iPhone.


###  model
`string` 

The name of the model for the Device. This is the common, human-readable or marketing name for the Device. The 'iPhone 6S' is a particular model of mobile phone.


###  modelNumber
`string` 

The unique model number designation assigned by the manufacturer for this Device. Model numbers are not versions, but unique identifiers that identify a particular model configuration. While the model for a particular phone might be 'iPhone 6S' the model number would be 'A1633', or 'A1634' based on configuration at the time of sale.


###  screenHeight
`integer` 

The number of veritcal pixels of the device's active display in its default orientation.


###  screenWidth
`integer` 

The number of horizontal pixels of the device's active display in its default orientation.


###  colorDepth
`integer` 

The number of colors the display is able to represent.



