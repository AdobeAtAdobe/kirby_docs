---
layout: default
---

# Commerce Metrics

Quantifiable measures used to track and assess the status of a commerce business process.
## Properties

`object`


###  productViews
[`common.Metric.schema`](../common/Metric.schema.md) 

Number of views of a product has occurred. (same as productView in Adobe Analytics).



###  productListOpens
[`common.Metric.schema`](../common/Metric.schema.md) 

Number of opens, initializations of a new product list has occurred. (same as scOpen in Adobe Analytics).



###  productListAdds
[`common.Metric.schema`](../common/Metric.schema.md) 

Number of adds of a product to the product list has occurred. (same as scAdd in Adobe Analytics).



###  productListRemovals
[`common.Metric.schema`](../common/Metric.schema.md) 

Number of removals of a product entry from a product list has occurred. (same as scRemove in Adobe Analytics).



###  productListViews
[`common.Metric.schema`](../common/Metric.schema.md) 

Number of views of a product list has occurred. (same as scView in Adobe Analytics)



###  saveForLaters
[`common.Metric.schema`](../common/Metric.schema.md) 

Number of requests to save a product list for a future session.



###  checkouts
[`common.Metric.schema`](../common/Metric.schema.md) 

Number of actions during a checkout process of a product list, there can be more than one checkout event if there are multiple steps in a checkout
process. If there are multiple steps the event time information and
referenced page or experience is used to identify the step individual
events represent in order.



###  abandons
[`common.Metric.schema`](../common/Metric.schema.md) 

Number of abandons for which a product list has been identified as no longer purchasable or accessible by the user without the user re-creating the product list from scratch.



###  productListReopens
[`common.Metric.schema`](../common/Metric.schema.md) 

Number of reopens for which a product list that was no longer accessible has been re-activated by the user, for example via a re-marketing activity.



###  purchases
[`common.Metric.schema`](../common/Metric.schema.md) 

Number of orders has occurred. purchase is the only required action in a commerce conversion. Purchase must have a product list referenced. (same as Adobe Analytics)




