---
layout: default
---

# Data Source

The Datasource acts as a namespace or unique identifier associated with a collection of data. Each EndUserID is associated with a given Datasource. A user can create and obtain information about a Datasource during the solution onboarding.

## Properties

`object`


###  id
`integer` _Required_

The numeric ID associated with this Datasource. This would be provided by the individual or system that created the Datasource.



###  code
`string` 

The string based name associated associated with the id attribute. Sometimes refered to as the data source integration code.


###  tags
`string`[] 

Tags are used to indicate how the aliases represented by a given data
source should be interpreted by applications using those aliases.

Examples:

* `isAVID`: data sources representing Analytics visitor IDs.
* `isCRSKey`: data sources representing aliases that should be used as keys in CRS.

Tags are set when the data source is created but they are also included in
pipeline messages when referencing a given data source.




