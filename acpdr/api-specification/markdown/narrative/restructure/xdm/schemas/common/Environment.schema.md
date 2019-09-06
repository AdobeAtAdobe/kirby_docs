---
layout: default
---

# Environment

Information about the surrounding situation the event observation occurred in, specifically detailing transitory information such as the network or software versions. > IMPORTANT: All values should be aligned with the [DeviceAtlas](https://deviceatlas.com) database licensed by Adobe. 
## Properties

`object`


###  type
`string` 

The type of the application environment.

 *x ∈  {browser,application,iot,externalSystem}*
 


###  browserDetails
[`common.BrowserDetails.schema`](../common/BrowserDetails.schema.md) 

The browser specific details such as brwoser name, version, javascript version, user agent string, accept language.


###  operatingSystem
`string` 

The name of the operating system used when the observation was made. This attribute should not contain any version information i.e. 10.5.3, but can contain *edition* designations such as 'Ultimate', or 'Professional'.


###  operatingSystemVersion
`string` 

The full version identifier for the operating system used when the observation was made. Versions are generally numerically composed, but may be in a vendor defined format.


###  colorDepth
`integer` 

The number of bits used for each color component of a single pixel.


###  viewportHeight
`integer` 

The vertical size (in pixels) of the window the experience was displayed inside. For a web view event, the browser viewport height.


###  viewportWidth
`integer` 

The horizontal size (in pixels) of the window the experience was displayed inside. For a web view event, the browser viewport width.


###  connectionType
`string` 

Internet connection type.

 *x ∈  {dialUp,isdn,bisdn,dsl,cable,wirelessWIFI,mobile,mobileEdge,mobileGPRS,mobile2G,mobile3G,mobileLTE,t1,t3,oc3,lan,modem}*
 


###  carrier
`string` 

A mobile network carrier or MNO, also known as a wireless service provider, wireless carrier, cellular company, or mobile network carrier, is a provider of services wireless communications that owns or controls all the elements necessary to sell and deliver services to an end user.


###  ipV4
`ipv4` 

The numerical label assigned to a device participating in a computer network that uses the Internet Protocol for communication. 


###  ipV6
`ipv6` 

The numerical label assigned to a device participating in a computer network that uses the Internet Protocol for communication. 



