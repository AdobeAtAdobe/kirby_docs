# Unified Profile Overview

## Supported PQL Query Types

The following are examples demonstrating the use of PQL's supported operators, functions and other features.

### Q1 
__People with a US address__

```
{                             
    "name": "q1",
    "description": "Profiles whose home address is in the US",
    "query": "homeAddress.countryISO = \"US\"" 
}
```

### Q1a
__People with a home address__

```
{ 
    "name": "q1a",
    "description": "Profiles which have a home address",
    "query": "homeAddress" 
}
```


### Q1b 
__People whose home address has a country specified__	

```
{ 
    "name": "q1b",
    "description": "Profiles for which have a home address with specified country",
    "query": "homeAddress.countryISO" 
}
```


### Q1c 
__People whose home and work addresses are in the same country__

```
{ 
    "name": "q1c",
    "description": "Profiles whose home address is in the same country as their work address",
    "query": "homeAddress.countryISO = workAddress.countryISO" 
}
```

### Q2 
__People with home addresses in California or Oregon__

```
{ 
    "name": "q2",
    "description": "Profiles whose home address is in California or Oregon",
    "query": "homeAddress.countryISO = \"US\" and homeAddress.stateProvinceISO in [\"CA\", \"OR\"]" 
}
```
### Q3 
__People whose work and home addresses are in different states__

```
{ 
    "name": "q3",
    "description": "Profiles whose work address is in a different state from their home address",
    "query": "homeAddress.stateProvinceISO != workAddress.stateProvinceISO" 
}
```

### Q4 
__People with an *.edu email extension__

```
{ 
    "name": "q4",
    "description": "Profiles whose work email address has .edu extension",
    "query": "workEmail.address like \"%.edu\"" 
}
```

### Q5 
__People who viewed Photoshop__ 

```
{ 
    "name": "q5",
    "description": "Profiles who have viewed Photoshop in a commerce store",
    "query": "{ PV as xEvent.metrics.commerce.productListViews.value > 0, Item as PV.productListItems.SKU = \"PS\" }" 
}
```


### Q6 
__People who abandoned one cart__

```
{ 
    "name": "q6",
    "description": "Profiles who have abandoned a cart in a commerce store",
    "query": "{ xEvent.metrics.commerce.abandons.value > 0 }" 
}
```

### Q7 
__People who abandoned multiple carts__

```
{ 
    "name": "q7",
    "description": "Profiles who have abandoned two separate carts within 2 days of each other",
    "query": "{ A1 as xEvent.metrics.commerce.abandons.value > 0, A2 as xEvent.metrics.commerce.abandons.value > 0: A1.id != A2.id and A1.timestamp occurs < 2 days before A2.timestamp }" 
}
```

### Q8 
__People who have placed an order__

```
{ 
    "name": "q8",
    "description": "Profiles who have placed an order in a commerce store",
    "query": "{ xEvent.commerce.order }" 
}
```
### Q8a 
__People who have placed an order where a purchase ID for that order exists__

```
{ 
    "name": "q8a",
    "description": "Profiles who have placed an order in a commerce store with a purchase id",
    "query": "{ xEvent.commerce.order.purchaseId != \"\" }" 
}
```

### Q9 
__People whose order contains a Photoshop product__

```
{ 
    "name": "q9",
    "description": "Profiles who have ordered Photoshop from a commerce store",
    "query": "{ Order as xEvent.commerce.order, Item as Order.productListItems.SKU = \"PS\" }" 
}
```

### Q10 
__People who have ordered twice in two weeks__

```
{ 
    "name": "q10",
    "description": "Profiles who have placed at least two orders within some 2 week period from a commerce store",
    "query": "{ Order1 as xEvent.commerce.order, Order2 as xEvent.commerce.order: Order2.timestamp occurs after Order1.timestamp and Order2.timestamp occurs < 2 weeks after Order1.timestamp }" 
}
```

### Q11 
__Customers with US addresses who've ordered twice in a two-week period__

```
{ 
    "name": "q11",
    "description": "Profiles with home address in the US who have placed at least two orders within some 2 week period from a commerce store",
    "query": "homeAddress.countryISO = \"US\" and { Order1 as xEvent.commerce.order, Order2 as xEvent.commerce.order: Order2.timestamp occurs after Order1.timestamp and Order2.timestamp occurs < 2 weeks after Order1.timestamp }" 
}
```
