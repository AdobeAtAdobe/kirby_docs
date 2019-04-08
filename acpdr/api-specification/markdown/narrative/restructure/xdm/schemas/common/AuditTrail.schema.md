---
layout: default
---

# Audit Trail

Information related to the creation and the modifications of an entity.

## Properties

`object`


###  createdOn
`date-time` 

Creation date of the entity.



###  modifiedOn
`date-time` 

Last modification date of the entity.
At creation time, `modifiedOn` is set as `createdOn`.



###  createdByUserId
`string` 

User id who has created the entity.



###  modifiedByUserId
`string` 

User id who last modified the entity.
At creation time, `modifiedByUser` is set as `createdByUser`.



###  createdByBatchId
`string` 

The Data Set Files in Catalog Services which has been originating the creation of the entity.



###  modifiedByBatchId
`string` 

The last Data Set Files in Catalog Services which has modified the entity.
At creation time, `modifiedByBatchId` is set as `createdByBatchId`.




