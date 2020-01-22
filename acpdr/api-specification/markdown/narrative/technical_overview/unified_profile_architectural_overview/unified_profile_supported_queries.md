# Supported PQL queries

## Overview

Segmentation enables a multitude of use cases ranging from simple segmentation for filtering data to more complex uses for targeting and personalization. Real-time Customer Profile's segmentation engine provides these capabilities using a language built to query XDM Individual Profile data; the Profile Query Language, or PQL. Segments are defined as a query in PQL, where any Profiles meeting the conditions are considered part of the Segment. See [Profile Query Language](unified_profile_pql.md) for more information on PQL, or [Real-time Customer Profile overview](unified_profile_architectural_overview.md) for more information on Profile and Segmentation.

## Classes of queries

Queries can be broken into classes of use cases, as described in this section.

### Simple demographic

A Simple Demographic query is one where the conditions center around geographic locations. A query can be said to be a Simple Demographic query when it only includes demographic criteria.

#### Example - People with a US address

```json
{ 
    "meta": "Profiles whose home address is in the US",
    "value": "homeAddress.countryISO = \"US\"" ,
    "type": "PQL",
    "format": "pql/text"
}
```

### Time Series

A query whose conditions are based on timestamps, most typically events, are considered Time Series queries.  

#### Example - People who have ordered twice in two weeks

```json
{ 
    "meta": "Profiles who have placed at least two orders within some 2 week period from a commerce store",
    "value": "select Order1 from xEvent where Order1.commerce.order, Order2 from xEvent where Order2.commerce.order and Order2.timestamp occurs < 2 weeks after Order1.timestamp",
    "type": "PQL",
    "format": "pql/text"
}
```

#### Example - People whose profile has changed since April 1st, 2019

```
    "meta": "ACS reverse replication time range predicate",
    "value": "_repo.modifyDate occurs after date(2019, 4, 1)",
    "type": "PQL",
    "format": "pql/text"
```

### Demography and Time Series

Queries can be developed which have criteria based on both geographic locations and timestamps and are considered Demography and Time Series queries.

#### Example - Customers with US addresses who've ordered twice in a two-week period

```json
{ 
    "meta": "Profiles with home address in the US who have placed at least two orders within some 2 week period from a commerce store",
    "value": "homeAddress.countryISO = \"US\" and (select Order1 from xEvent where Order1.commerce.order, Order2 from xEvent where Order2.commerce.order and Order2.timestamp occurs < 2 weeks after Order1.timestamp)",
    "type": "PQL",
    "format": "pql/text"
}
```
<!-- NOTE: The info for this section comes from https://wiki.corp.adobe.com/display/DMSArchitecture/Supported+PQL+Query+Types
           which includes mention of query classes which are planned to be supported, but aren't supported for this document's publish date
-->

## Supported PQL query types

The following are examples demonstrating the use of PQL's supported operators, functions and other features.

### Q1 
__People with a US address__ - Simple demographic

```
{                             
    "meta": "Profiles whose home address is in the US",
    "value": "homeAddress.countryISO = \"US\"",
    "type": "PQL",
    "format": "pql/text"
}
```

### Q1a
__People with a home address__ - Simple demographic

```
{ 
    "meta": "Profiles which have a home address",
    "value": "homeAddress",
    "type": "PQL",
    "format": "pql/text"
}
```

### Q1b 
__People whose home address has a country specified__ - Simple demographic

```
{ 
    "meta": "Profiles for which have a home address with specified country",
    "value": "homeAddress.countryISO",
    "type": "PQL",
    "format": "pql/text"
}
```

### Q1c 
__People whose home and work addresses are in the same country__ - Simple demographic

```
{ 
    "meta": "Profiles whose home address is in the same country as their work address",
    "value": "homeAddress.countryISO = workAddress.countryISO",
    "type": "PQL",
    "format": "pql/text"
}
```

### Q2 
__People with home addresses in California or Oregon__ - Simple demographic

```
{ 
    "meta": "Profiles whose home address is in California or Oregon",
    "value": "homeAddress.countryISO = \"US\" and homeAddress.stateProvinceISO in [\"CA\", \"OR\"]",
    "type": "PQL",
    "format": "pql/text"
}
```
### Q3 
__People whose work and home addresses are in different states__ - Simple demographic

```
{ 
    "meta": "Profiles whose work address is in a different state from their home address",
    "value": "homeAddress.stateProvinceISO != workAddress.stateProvinceISO",
    "type": "PQL",
    "format": "pql/text"
}
```

### Q4 
__People with an *.edu email extension__ - Simple demographic

```
{ 
    "meta": "Profiles whose work email address has .edu extension",
    "value": "workEmail.address like \"%.edu\"",
    "type": "PQL",
    "format": "pql/text"
}
```

### Q5 
__People who viewed Photoshop__ - Time series

```
{ 
    "meta": "Profiles who have viewed Photoshop in a commerce store",
    "value": "select PV from xEvent where PV.metrics.commerce.productListViews.value > 0, Item from PV.productListItems where Item.SKU = \"PS\"",
    "type": "PQL",
    "format": "pql/text"
}
```


### Q6 
__People who abandoned one cart__ - Time series

```
{ 
    "meta": "Profiles who have abandoned a cart in a commerce store",
    "value": "select X from xEvent where X.metrics.commerce.abandons.value > 0",
    "type": "PQL",
    "format": "pql/text"
}
```

### Q7 
__People who abandoned multiple carts__ - Time series

```
{ 
    "meta": "Profiles who have abandoned two separate carts within 2 days of each other",
    "value": "select A1 from xEvent where A1.metrics.commerce.abandons.value > 0, A2 from xEvent where A2.metrics.commerce.abandons.value > 0 and A1.id != A2.id and A1.timestamp occurs < 2 days before A2.timestamp",
    "type": "PQL",
    "format": "pql/text"
}
```

### Q8 
__People who have placed an order__ - Time series

```
{ 
    "meta": "Profiles who have placed an order in a commerce store",
    "value": "select X from xEvent where X.commerce.order",
    "type": "PQL",
    "format": "pql/text"
}
```
### Q8a 
__People who have placed an order where a purchase ID for that order exists__ - Time series

```
{ 
    "meta": "Profiles who have placed an order in a commerce store with a purchase id",
    "value": "select X from xEvent where X.commerce.order.purchaseId != \"\"",
    "type": "PQL",
    "format": "pql/text"
}
```

### Q9 
__People whose order contains a Photoshop product__ - Time series

```
{ 
    "meta": "Profiles who have ordered Photoshop from a commerce store",
    "value": "select Order from xEvent where Order.commerce.order, Item from Order.productListItems where Item.SKU = \"PS\"",
    "type": "PQL",
    "format": "pql/text"
}
```

### Q10 
__People who have ordered twice in two weeks__ - Time series

```
{ 
    "meta": "Profiles who have placed at least two orders within some 2 week period from a commerce store",
    "value": "select Order1 from xEvent where Order1.commerce.order, Order2 from xEvent where Order2.commerce.order and Order2.timestamp occurs < 2 weeks after Order1.timestamp" ,
    "type": "PQL",
    "format": "pql/text"
}
```

### Q11 
__Customers with US addresses who've ordered twice in a two-week period__ - Demography and time series

```
{ 
    "meta": "Profiles with home address in the US who have placed at least two orders within some 2 week period from a commerce store",
    "value": "homeAddress.countryISO = \"US\" and (select Order1 from xEvent where Order1.commerce.order, Order2 from xEvent where Order2.commerce.order and Order2.timestamp occurs < 2 weeks after Order1.timestamp)",
    "type": "PQL",
    "format": "pql/text"
}
```

### Q12
__Customers whose profile has changed within the last 30 minutes__ - Time series

```
    "type": "PQL",
    "format": "pql/text",
    "value": "_repo.lastModifiedDate occurs <= 30 minutes before now",
    "meta": "ACS reverse replication time range predicate"
```

## JSON formatted queries

The above examples are all PQL as articulated in text, for example "workAddress.stateProvince = homeAddress.stateProvince".  This is the recommended approach to formatting PQL, as it is terse and easiest to understand. Queries will incur some overhead over their JSON counterparts as formatting PQL in text requires the parser/grammar in order to process.

However, there are certain cases wherein formatting in JSON is preferable. The JSON structure is more verbose. Though reading PQL in JSON is harder to understand, it is more suitable for machine to machine interaction. UI and other integrations mostly work with JSON structures. PQL scales better in JSON format for very large queries as it is semantically very close to internal representation of PQL.

The following examples offer demonstrations of how PQL might be structured as JSON.

### JQ1
__Customers whose name is "Andres Monroy" and who has a birth day on the 6th of any month__

![](ui-jq1.png)

#### PQL JSON pseudocode

```
{
  segmentDefinition: {
    container: {
      items: [
        segmentRule {
          comparisonType: 'eq',
          id: 'profile.person.firstName'
          value: 'Andres'
        },
        segmentRule {
          comparisonType: 'eq',
          id: 'profile.person.lastName'
          value: 'Monroy'
        },
        segmentRule {
          comparisonType: 'eq',
          id: 'profile.person.birthDay'
          value: 6
        }
      ]
    }
  }
}
```

#### PQL JSON

The following is the JSON form of the PQL

```
{
  "nodeType": "fnApply",
  "fnName": "and",
  "params": [
    {
      "nodeType": "fnApply",
      "fnName": "=",
      "params": [
        {
          "literalType": "string",
          "nodeType": "literal",
          "value": "Andres"
        },
        {
          "nodeType": "fieldLookup",
          "fieldName": "firstName",
          "object": {
            "nodeType": "fieldLookup",
            "fieldName": "person",
            "object": {
              "nodeType": "literal",
              "literalType": "XDMObject",
              "value": "profile"
            }
          }
        }
      ]
    },
    {
      "nodeType": "fnApply",
      "fnName": "=",
      "params": [
        {
          "literalType": "string",
          "nodeType": "literal",
          "value": "Monroy"
        },
        {
          "nodeType": "fieldLookup",
          "fieldName": "lastName",
          "object": {
            "nodeType": "fieldLookup",
            "fieldName": "person",
            "object": {
              "nodeType": "literal",
              "literalType": "XDMObject",
              "value": "profile"
            }
          }
        }
      ]
    },
    {
      "nodeType": "fnApply",
      "fnName": "=",
      "params": [
        {
          "literalType": "integer",
          "nodeType": "literal",
          "value": "6"
        },
        {
          "nodeType": "fieldLookup",
          "fieldName": "birthDay",
          "object": {
            "nodeType": "fieldLookup",
            "fieldName": "person",
            "object": {
              "nodeType": "literal",
              "literalType": "XDMObject",
              "value": "profile"
            }
          }
        }
      ]
    }
  ]
}
```

### JQ2
__Customers whose name is "Andres" and also either a last name of "Monroy" or a birth day on the 6th of any month__

![](ui-jq2.png)

#### PQL JSON pseudocode

```
{
  definition: {
    container: {
      logicalOperator: 'and',
      items: [
        segmentRule: {
          id: 'profile.person.firstName',
          value: 'Andres',
          comparisonType: 'eq'
        },
        segmentContainer: {
          logicalOperator: 'or',
          items: [
            segmentRule: {
              id: 'profile.person.lastName',
              value: 'Monroy',
              comparisonType: 'eq'
            },
            segmentRule: {
              id: 'profile.person.birthDay',
              value: 6,
              comparisonType: 'eq'
            },
          ]
        },
      ]
    }
  }
}
```

#### PQL JSON

```
{
  "fnName": "and",
  "nodeType": "fnApply",
  "params": [
    {
      "nodeType": "fnApply",
      "fnName": "=",
      "params": [
        {
          "literalType": "string",
          "nodeType": "literal",
          "value": "Andres"
        },
        {
          "nodeType": "fieldLookup",
          "fieldName": "firstName",
          "object": {
            "nodeType": "fieldLookup",
            "fieldName": "person",
            "object": {
              "nodeType": "literal",
              "literalType": "XDMObject",
              "value": "profile"
            }
          }
        }
      ]
    },
    {
      "nodeType": "fnApply",
      "fnName": "or",
      "params": [
        {
          "nodeType": "fnApply",
          "fnName": "=",
          "params": [
            {
              "literalType": "string",
              "nodeType": "literal",
              "value": "Monroy"
            },
            {
              "nodeType": "fieldLookup",
              "fieldName": "lastName",
              "object": {
                "nodeType": "fieldLookup",
                "fieldName": "person",
                "object": {
                  "nodeType": "literal",
                  "literalType": "XDMObject",
                  "value": "profile"
                }
              }
            }
          ]
        },
        {
          "nodeType": "fnApply",
          "fnName": "=",
          "params": [
            {
              "literalType": "integer",
              "nodeType": "literal",
              "value": "6"
            },
            {
              "nodeType": "fieldLookup",
              "fieldName": "birthDay",
              "object": {
                "nodeType": "fieldLookup",
                "fieldName": "person",
                "object": {
                  "nodeType": "literal",
                  "literalType": "XDMObject",
                  "value": "profile"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### JQ3
__Example of an ExperienceEvent, where an event was taken on a device with certain parameters__

#### PQL JSON pseudocode

```
{
  segmentDefinition: {
    container: {
      items: [
        segmentRule {
          id: profile.person.firstName,
          value: Andres,
          comparisonType: eq,
        },
        segmentRule {
          id: xEvent.device.model,
          value: 1,
          comparisonType: eq,
        },
        segmentRule {
          id: xEvent.productListItems.name,
          value: 1,
          comparisonType: eq,
        },
      ]
    }
  }
}
```

#### PQL JSON

```
{
  "nodeType": "set",
  "variables": [
    {
      "nodeType": "fnApply",
      "fnName": "=",
      "params": [
        {
          "literalType": "string",
          "nodeType": "literal",
          "value": "Andres"
        },
        {
          "nodeType": "fieldLookup",
          "fieldName": "firstName",
          "object": {
            "nodeType": "fieldLookup",
            "fieldName": "person",
            "object": {
              "nodeType": "literal",
              "literalType": "XDMObject",
              "value": "profile"
            }
          }
        }
      ]
    },
    {
      "nodeType": "varDecl",
      "varName": "_",
      "range": {
        "nodeType": "fnApply",
        "function": {
          "nodeType": "fnCreate",
          "params": [
            {
              "varName": "X1"
            }
          ],
          "body": {
            "nodeType": "fnApply",
            "fnName": "=",
            "params": [
              {
                "literalType": "string",
                "nodeType": "literal",
                "value": "1"
              },
              {
                "nodeType": "fieldLookup",
                "fieldName": "model",
                "object": {
                  "nodeType": "fieldLookup",
                  "fieldName": "device",
                  "object": {
                    "nodeType": "varRef",
                    "varName": "X1"
                  }
                }
              }
            ]
          }
        },
        "params": [
          {
            "nodeType": "fieldLookup",
            "fieldName": "xEvent",
            "object": {
              "nodeType": "varRef",
              "varName": "_"
            }
          }
        ]
      }
    },
    {
      "nodeType": "varDecl",
      "varName": "_",
      "range": {
        "nodeType": "fnApply",
        "function": {
          "nodeType": "fnCreate",
          "params": [
            {
              "varName": "X1"
            }
          ],
          "body": {
            "nodeType": "fnApply",
            "fnName": "=",
            "params": [
              {
                "literalType": "string",
                "nodeType": "literal",
                "value": "1"
              },
              {
                "nodeType": "fieldLookup",
                "fieldName": "name",
                "object": {
                  "nodeType": "varRef",
                  "varName": "X1"
                }
              }
            ]
          }
        },
        "params": [
          {
            "nodeType": "fieldLookup",
            "fieldName": "productListItems",
            "object": {
              "nodeType": "varRef",
              "varName": "_"
            }
          }
        ]
      }
    }
  ]
}
```

### Q12
__Customers whose profile has changed within the last 30 minutes__ - Time series

```
    "type": "PQL",
    "format": "pql/text",
    "value": "_repo.lastModifiedDate occurs <= 30 minutes before now",
    "meta": "ACS reverse replication time range predicate"
```

## JSON formatted queries

The above examples are all PQL as articulated in text, for example "workAddress.stateProvince = homeAddress.stateProvince".  This is the recommended approach to formatting PQL, as it is terse and easiest to understand. Queries will incur some overhead over their JSON counterparts as formatting PQL in text requires the parser/grammar in order to process.

However, there are certain cases wherein formatting in JSON is preferable. The JSON structure is more verbose. Though reading PQL in JSON is harder to understand, it is more suitable for machine to machine interaction. UI and other integrations mostly work with JSON structures. PQL scales better in JSON format for very large queries as it is semantically very close to internal representation of PQL.

The following examples offer demonstrations of how PQL might be structured as JSON.

### JQ1
__Customers whose name is "Andres Monroy" and who has a birth day on the 6th of any month__

![](ui-jq1.png)

#### PQL JSON pseudocode

```
{
  segmentDefinition: {
    container: {
      items: [
        segmentRule {
          comparisonType: 'eq',
          id: 'profile.person.firstName'
          value: 'Andres'
        },
        segmentRule {
          comparisonType: 'eq',
          id: 'profile.person.lastName'
          value: 'Monroy'
        },
        segmentRule {
          comparisonType: 'eq',
          id: 'profile.person.birthDay'
          value: 6
        }
      ]
    }
  }
}
```

#### PQL JSON

The following is the JSON form of the PQL

```
{
  "nodeType": "fnApply",
  "fnName": "and",
  "params": [
    {
      "nodeType": "fnApply",
      "fnName": "=",
      "params": [
        {
          "literalType": "string",
          "nodeType": "literal",
          "value": "Andres"
        },
        {
          "nodeType": "fieldLookup",
          "fieldName": "firstName",
          "object": {
            "nodeType": "fieldLookup",
            "fieldName": "person",
            "object": {
              "nodeType": "literal",
              "literalType": "XDMObject",
              "value": "profile"
            }
          }
        }
      ]
    },
    {
      "nodeType": "fnApply",
      "fnName": "=",
      "params": [
        {
          "literalType": "string",
          "nodeType": "literal",
          "value": "Monroy"
        },
        {
          "nodeType": "fieldLookup",
          "fieldName": "lastName",
          "object": {
            "nodeType": "fieldLookup",
            "fieldName": "person",
            "object": {
              "nodeType": "literal",
              "literalType": "XDMObject",
              "value": "profile"
            }
          }
        }
      ]
    },
    {
      "nodeType": "fnApply",
      "fnName": "=",
      "params": [
        {
          "literalType": "integer",
          "nodeType": "literal",
          "value": "6"
        },
        {
          "nodeType": "fieldLookup",
          "fieldName": "birthDay",
          "object": {
            "nodeType": "fieldLookup",
            "fieldName": "person",
            "object": {
              "nodeType": "literal",
              "literalType": "XDMObject",
              "value": "profile"
            }
          }
        }
      ]
    }
  ]
}
```

### JQ2
__Customers whose name is "Andres" and also either a last name of "Monroy" or a birth day on the 6th of any month__

![](ui-jq2.png)

#### PQL JSON pseudocode

```
{
  definition: {
    container: {
      logicalOperator: 'and',
      items: [
        segmentRule: {
          id: 'profile.person.firstName',
          value: 'Andres',
          comparisonType: 'eq'
        },
        segmentContainer: {
          logicalOperator: 'or',
          items: [
            segmentRule: {
              id: 'profile.person.lastName',
              value: 'Monroy',
              comparisonType: 'eq'
            },
            segmentRule: {
              id: 'profile.person.birthDay',
              value: 6,
              comparisonType: 'eq'
            },
          ]
        },
      ]
    }
  }
}
```

#### PQL JSON

```
{
  "fnName": "and",
  "nodeType": "fnApply",
  "params": [
    {
      "nodeType": "fnApply",
      "fnName": "=",
      "params": [
        {
          "literalType": "string",
          "nodeType": "literal",
          "value": "Andres"
        },
        {
          "nodeType": "fieldLookup",
          "fieldName": "firstName",
          "object": {
            "nodeType": "fieldLookup",
            "fieldName": "person",
            "object": {
              "nodeType": "literal",
              "literalType": "XDMObject",
              "value": "profile"
            }
          }
        }
      ]
    },
    {
      "nodeType": "fnApply",
      "fnName": "or",
      "params": [
        {
          "nodeType": "fnApply",
          "fnName": "=",
          "params": [
            {
              "literalType": "string",
              "nodeType": "literal",
              "value": "Monroy"
            },
            {
              "nodeType": "fieldLookup",
              "fieldName": "lastName",
              "object": {
                "nodeType": "fieldLookup",
                "fieldName": "person",
                "object": {
                  "nodeType": "literal",
                  "literalType": "XDMObject",
                  "value": "profile"
                }
              }
            }
          ]
        },
        {
          "nodeType": "fnApply",
          "fnName": "=",
          "params": [
            {
              "literalType": "integer",
              "nodeType": "literal",
              "value": "6"
            },
            {
              "nodeType": "fieldLookup",
              "fieldName": "birthDay",
              "object": {
                "nodeType": "fieldLookup",
                "fieldName": "person",
                "object": {
                  "nodeType": "literal",
                  "literalType": "XDMObject",
                  "value": "profile"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### JQ3
__Example of an ExperienceEvent, where an event was taken on a device with certain parameters__

#### PQL JSON pseudocode

```
{
  segmentDefinition: {
    container: {
      items: [
        segmentRule {
          id: profile.person.firstName,
          value: Andres,
          comparisonType: eq,
        },
        segmentRule {
          id: xEvent.device.model,
          value: 1,
          comparisonType: eq,
        },
        segmentRule {
          id: xEvent.productListItems.name,
          value: 1,
          comparisonType: eq,
        },
      ]
    }
  }
}
```

#### PQL JSON

```
{
  "nodeType": "set",
  "variables": [
    {
      "nodeType": "fnApply",
      "fnName": "=",
      "params": [
        {
          "literalType": "string",
          "nodeType": "literal",
          "value": "Andres"
        },
        {
          "nodeType": "fieldLookup",
          "fieldName": "firstName",
          "object": {
            "nodeType": "fieldLookup",
            "fieldName": "person",
            "object": {
              "nodeType": "literal",
              "literalType": "XDMObject",
              "value": "profile"
            }
          }
        }
      ]
    },
    {
      "nodeType": "varDecl",
      "varName": "_",
      "range": {
        "nodeType": "fnApply",
        "function": {
          "nodeType": "fnCreate",
          "params": [
            {
              "varName": "X1"
            }
          ],
          "body": {
            "nodeType": "fnApply",
            "fnName": "=",
            "params": [
              {
                "literalType": "string",
                "nodeType": "literal",
                "value": "1"
              },
              {
                "nodeType": "fieldLookup",
                "fieldName": "model",
                "object": {
                  "nodeType": "fieldLookup",
                  "fieldName": "device",
                  "object": {
                    "nodeType": "varRef",
                    "varName": "X1"
                  }
                }
              }
            ]
          }
        },
        "params": [
          {
            "nodeType": "fieldLookup",
            "fieldName": "xEvent",
            "object": {
              "nodeType": "varRef",
              "varName": "_"
            }
          }
        ]
      }
    },
    {
      "nodeType": "varDecl",
      "varName": "_",
      "range": {
        "nodeType": "fnApply",
        "function": {
          "nodeType": "fnCreate",
          "params": [
            {
              "varName": "X1"
            }
          ],
          "body": {
            "nodeType": "fnApply",
            "fnName": "=",
            "params": [
              {
                "literalType": "string",
                "nodeType": "literal",
                "value": "1"
              },
              {
                "nodeType": "fieldLookup",
                "fieldName": "name",
                "object": {
                  "nodeType": "varRef",
                  "varName": "X1"
                }
              }
            ]
          }
        },
        "params": [
          {
            "nodeType": "fieldLookup",
            "fieldName": "productListItems",
            "object": {
              "nodeType": "varRef",
              "varName": "_"
            }
          }
        ]
      }
    }
  ]
}
```