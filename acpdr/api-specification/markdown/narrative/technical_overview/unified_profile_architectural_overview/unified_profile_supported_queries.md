# Unified Profile Overview

## Supported PQL Queries

<a id="pql-q1"></a>
__Q1 - People with a US address__ 

```
{                             
    "name": "q1",
    "description": "Profiles whose home address is in the US",
    "query": "homeAddress.countryISO = \"US\"" 
}
```

<a id="pql-q1.1"></a>
__Q1.1 - People with a home address__

```
{ 
    "name": "q1.1",
    "description": "Profiles which have a home address",
    "query": "homeAddress" 
}
```


<a id="pql-q1.2"></a>
__Q1.2 - People whose home address has a country specified__	

```
{ 
    "name": "q1.2",
    "description": "Profiles for which have a home address with specified country",
    "query": "homeAddress.countryISO" 
}
```

<a id="pql-q1.3"></a>
__Q1.3 - People whose home and work addresses are in the same country__

```
{ 
    "name": "q1.3",
    "description": "Profiles whose home address is in the same country as their work address",
    "query": "homeAddress.countryISO = workAddress.countryISO" 
}
```

<a id="pql-q2"></a>
__Q2 - People with home addresses in California or Oregon__

```
{ 
    "name": "q2",
    "description": "Profiles whose home address is in California or Oregon",
    "query": "homeAddress.countryISO = \"US\" and homeAddress.stateProvinceISO in [\"CA\", \"OR\"]" 
}
```

<a id="pql-q3"></a>
__Q3 - People whose work and home addresses are in different states__

```
{ 
    "name": "q3",
    "description": "Profiles whose work address is in a different state from their home address",
    "query": "homeAddress.stateProvinceISO != workAddress.stateProvinceISO" 
}
```

<a id="pql-q4"></a>
__Q4 - People with a *.edu email extension__

```
{ 
    "name": "q4",
    "description": "Profiles whose work email address has .edu extension",
    "query": "workEmail.address like \"%.edu\"" 
}
```

<a id="pql-q5"></a>
__Q5 - People who viewed Photoshop__ 

```
{ 
    "name": "q5",
    "description": "Profiles who have viewed Photoshop in a commerce store",
    "query": "{ PV as xEvent.metrics.commerce.productListViews.value > 0, Item as PV.productListItems.SKU = \"PS\" }" 
}
```


<a id="pql-q6"></a>
__Q6 - Cart abandonment__

```
{ 
    "name": "q6",
    "description": "Profiles who have abandoned a cart in a commerce store",
    "query": "{ xEvent.metrics.commerce.abandons.value > 0 }" 
}
```

<a id="pql-q7"></a>
__Q7 - Abandonment of multiple carts__	

```
{ 
    "name": "q7",
    "description": "Profiles who have abandoned two separate carts within 2 days of each other",
    "query": "{ A1 as xEvent.metrics.commerce.abandons.value > 0, A2 as xEvent.metrics.commerce.abandons.value > 0: A1.id != A2.id and A1.timestamp occurs < 2 days before A2.timestamp }" 
}
```

<a id="pql-q8"></a>
__Q8 - People who have placed an order__

```
{ 
    "name": "q8",
    "description": "Profiles who have placed an order in a commerce store",
    "query": "{ xEvent.commerce.order }" 
}
```

<a id="pql-q8.1"></a>
__Q8.1 - People who have placed an order where a purchase ID for that order exists__

```
{ 
    "name": "q8.1",
    "description": "Profiles who have placed an order in a commerce store with a purchase id",
    "query": "{ xEvent.commerce.order.purchaseId != \"\" }" 
}
```

<a id="pql-q9"></a>
__Q9 - People whose order contains a Photoshop product__

```
{ 
    "name": "q9",
    "description": "Profiles who have ordered Photoshop from a commerce store",
    "query": "{ Order as xEvent.commerce.order, Item as Order.productListItems.SKU = \"PS\" }" 
}
```

<a id="pql-q10"></a>
__Q10 - People who have ordered twice in two weeks__

```
{ 
    "name": "q10",
    "description": "Profiles who have placed at least two orders within some 2 week period from a commerce store",
    "query": "{ Order1 as xEvent.commerce.order, Order2 as xEvent.commerce.order: Order2.timestamp occurs after Order1.timestamp and Order2.timestamp occurs < 2 weeks after Order1.timestamp }" 
}
```

<a id="pql-q11"></a>
__Q11 - Customers with US addresses who've ordered twice in a two-week period__

```
{ 
    "name": "q11",
    "description": "Profiles with home address in the US who have placed at least two orders within some 2 week period from a commerce store",
    "query": "homeAddress.countryISO = \"US\" and { Order1 as xEvent.commerce.order, Order2 as xEvent.commerce.order: Order2.timestamp occurs after Order1.timestamp and Order2.timestamp occurs < 2 weeks after Order1.timestamp }" 
}
```