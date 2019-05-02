# Unified Profile - Supported PQL Queries

## Overview

Segmentation enables a multitude of use cases ranging from simple segmentation for filtering data to more complex uses for targeting and personalization. Unified Profile's segmentation engine provides these capabilities using a language built to query XDM Profile data; the Profile Query Language, or PQL. Segments are defined as a query in PQL, where any Profiles meeting the conditions are considered part of the Segment. See [Profile Query Language](unified_profile_pql.md) for more information on PQL, or [Unified Profile](unified_profile_architectural_overview.md) for more information on Unified Profile and Segmentation.

## Classes of Queries

Queries can be broken into classes of use cases, as described in this section.

### Simple Demographic

A Simple Demographic query is one where the conditions center around geographic locations. A query can be said to be a Simple Demographic query when it only includes demographic criteria.

__Example - People with a US address__

```json
{ 
    "name": "q1",
    "description": "Profiles whose home address is in the US",
    "query": "homeAddress.countryISO = \"US\"" 
}
```

### Time Series

A query whose conditions are based on timestamps, most typically events, are considered Time Series queries.  

__Example - People who have ordered twice in two weeks__

```json
{ 
    "name": "q10",
    "description": "Profiles who have placed at least two orders within some 2 week period from a commerce store",
    "query": "select Order1 from xEvent where Order1.commerce.order, Order2 from xEvent where Order2.commerce.order and Order2.timestamp occurs < 2 weeks after Order1.timestamp" 
}
```

### Demography and Time Series

Queries can be developed which have criteria based on both geographic locations and timestamps and are considered Demography and Time Series queries.

__Example - Customers with US addresses who've ordered twice in a two-week period

```json
{ 
    "name": "q11",
    "description": "Profiles with home address in the US who have placed at least two orders within some 2 week period from a commerce store",
    "query": "homeAddress.countryISO = \"US\" and (select Order1 from xEvent where Order1.commerce.order, Order2 from xEvent where Order2.commerce.order and Order2.timestamp occurs < 2 weeks after Order1.timestamp)" 
}
```
<!-- NOTE: The info for this section comes from https://wiki.corp.adobe.com/display/DMSArchitecture/Supported+PQL+Query+Types
           which includes mention of query classes which are planned to be supported, but aren't supported for this document's publish date
-->

## Supported PQL Query Types

The following are examples demonstrating the use of PQL's supported operators, functions and other features.

### Q1 
__People with a US address__ - Simple Demographic

```
{                             
    "name": "q1",
    "description": "Profiles whose home address is in the US",
    "query": "homeAddress.countryISO = \"US\"" 
}
```

### Q1a
__People with a home address__ - Simple Demographic

```
{ 
    "name": "q1a",
    "description": "Profiles which have a home address",
    "query": "homeAddress" 
}
```

### Q1b 
__People whose home address has a country specified__ - Simple Demographic

```
{ 
    "name": "q1b",
    "description": "Profiles for which have a home address with specified country",
    "query": "homeAddress.countryISO" 
}
```

### Q1c 
__People whose home and work addresses are in the same country__ - Simple Demographic

```
{ 
    "name": "q1c",
    "description": "Profiles whose home address is in the same country as their work address",
    "query": "homeAddress.countryISO = workAddress.countryISO" 
}
```

### Q2 
__People with home addresses in California or Oregon__ - Simple Demographic

```
{ 
    "name": "q2",
    "description": "Profiles whose home address is in California or Oregon",
    "query": "homeAddress.countryISO = \"US\" and homeAddress.stateProvinceISO in [\"CA\", \"OR\"]" 
}
```
### Q3 
__People whose work and home addresses are in different states__ - Simple Demographic

```
{ 
    "name": "q3",
    "description": "Profiles whose work address is in a different state from their home address",
    "query": "homeAddress.stateProvinceISO != workAddress.stateProvinceISO" 
}
```

### Q4 
__People with an *.edu email extension__ - Simple Demographic

```
{ 
    "name": "q4",
    "description": "Profiles whose work email address has .edu extension",
    "query": "workEmail.address like \"%.edu\"" 
}
```

### Q5 
__People who viewed Photoshop__ - Time Series

```
{ 
    "name": "q5",
    "description": "Profiles who have viewed Photoshop in a commerce store",
    "query": "select PV from xEvent where PV.metrics.commerce.productListViews.value > 0, Item from PV.productListItems where Item.SKU = \"PS\"" 
}
```


### Q6 
__People who abandoned one cart__ - Time Series

```
{ 
    "name": "q6",
    "description": "Profiles who have abandoned a cart in a commerce store",
    "query": "select X from xEvent where X.metrics.commerce.abandons.value > 0" 
}
```

### Q7 
__People who abandoned multiple carts__ - Time Series

```
{ 
    "name": "q7",
    "description": "Profiles who have abandoned two separate carts within 2 days of each other",
    "query": "select A1 from xEvent where A1.metrics.commerce.abandons.value > 0, A2 from xEvent where A2.metrics.commerce.abandons.value > 0 and A1.id != A2.id and A1.timestamp occurs < 2 days before A2.timestamp" 
}
```

### Q8 
__People who have placed an order__ - Time Series

```
{ 
    "name": "q8",
    "description": "Profiles who have placed an order in a commerce store",
    "query": "select X from xEvent where X.commerce.order"
}
```
### Q8a 
__People who have placed an order where a purchase ID for that order exists__ - Time Series

```
{ 
    "name": "q8a",
    "description": "Profiles who have placed an order in a commerce store with a purchase id",
    "query": "select X from xEvent where X.commerce.order.purchaseId != \"\"" 
}
```

### Q9 
__People whose order contains a Photoshop product__ - Time Series

```
{ 
    "name": "q9",
    "description": "Profiles who have ordered Photoshop from a commerce store",
    "query": "select Order from xEvent where Order.commerce.order, Item from Order.productListItems where Item.SKU = \"PS\"" 
}
```

### Q10 
__People who have ordered twice in two weeks__ - Time Series

```
{ 
    "name": "q10",
    "description": "Profiles who have placed at least two orders within some 2 week period from a commerce store",
    "query": "select Order1 from xEvent where Order1.commerce.order, Order2 from xEvent where Order2.commerce.order and Order2.timestamp occurs < 2 weeks after Order1.timestamp" 
}
```

### Q11 
__Customers with US addresses who've ordered twice in a two-week period__ - Demography and Time Series

```
{ 
    "name": "q11",
    "description": "Profiles with home address in the US who have placed at least two orders within some 2 week period from a commerce store",
    "query": "homeAddress.countryISO = \"US\" and (select Order1 from xEvent where Order1.commerce.order, Order2 from xEvent where Order2.commerce.order and Order2.timestamp occurs < 2 weeks after Order1.timestamp)" 
}
```
