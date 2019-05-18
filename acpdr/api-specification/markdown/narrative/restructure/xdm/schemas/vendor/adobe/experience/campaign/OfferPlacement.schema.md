---
layout: default
---

# Offer Placement

The Offer Placement represents the instance of an offer displayed in a message.

## Properties

`object`


###  offer
`object` _Required_

An offer defined in the Offer Service.
#### **Properties**
*  **id** `integer`  
Unique identifier of the offer.

*  **name** `string`  
Name of the offer.




###  activity
`object` _Required_

A group of offers.
Multiple Offers can be clubbed into same Offer activity. Like “Christmas Offer” is an activity which can have
two offers “BOGO”, “Discount20”.
Depending upon the profile, the Offer Service can pick different offers from the same activity.

#### **Properties**
*  **id** `integer`  
Unique identifier of the offer activity in the Offer Service.

*  **activityName** `string`  
Name of the offer activity in the Offer Service.




###  placement
`object` _Required_

A location in the message where the offer will be displayed.
#### **Properties**
*  **id** `integer`  
Unique identifier of the placement.

*  **name** `string`  
Name of the placement.





