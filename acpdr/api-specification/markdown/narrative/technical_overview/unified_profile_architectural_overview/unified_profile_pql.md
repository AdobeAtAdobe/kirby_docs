# Unified Profile Overview

## 1. Profile Query Language (PQL)

The following discusses the features of the Profile Query Language (PQL) and the functions it supports.

## 2. Purpose of PQL

PQL is a DSL (domain specific lkanguage) whose execution environment is designed to make it easy to query both the CRM and the Time Series Events associated with individual Profiles, so as to be able assign the Profiles to Segments. PQL operates on XDM data on the Profile Store and the Events coming in via the Platform Event pipeline. 

## 3. Elements of PQL

PQL is composed of various basic elements that are combined together to create PQL queries. We will look into those in some detail below.

### 3.1 Types

Since PQL is XDM compliant, it will support the types that XDM has. These include basic scalar data types such as String, Double, Int, Boolean, Number, DateLiteral,  object data types and vector data types such as collections or sets. The eventual full set of data types that PQL will support is listed at XDM Data Types. PQL statements themselves will not have declarations of types and the type inferencing during execution is currently implicit.

PQL allows the use of dot-notation to access an object and its fields, such "touchpoint.type". If the field is referring to another object or a vector of other objects, it is possible to chain the dots in a running dot notation. For example, you could have "user.address.street". Since the PQL execution happens in the context of a single user, it is possible to omit the "user" prefix to that and refer to "address.street". Since the XDM structure will largely follow a STAR schema, we don't anticipate many levels of running dots to be required, though the language does support it.

#### 3.1.1 Literals

PQL provides support for StringLiteral, DateLiteral, ListLiteral, Number and BooleanLiteral.

#### 3.1.2 StringLiteral

This is defined as a string of characters surrounded by double quotes such as "John".

#### 3.1.3 DateLiteral

This can be a timestamp literal such as 'now', 'today', 'tomorrow' or 'yesterday' or a Date literal of the form 'yyyy/mm/dd'

#### 3.1.4 ListLiteral

This is a way of defining a list on the fly using '[' element1 , element2 , ...']'.  Please note that the elements are separated by a comma.

#### 3.1.5 Number

Can be an UnsignedInt, Decimal or a Scientific Number such as 2.02 E -6.3

#### 3.1.6 BooleanLiteral

These are 'true' and 'false'

#### 3.1.7 Coercion of types

PQL will try to match the RHS type to the LHS type of an expression to the extent possible. At the time of query construction, the compiler will consult with the XDM registry to ascertain the types of the various fields involved in these expressions and match them. For example, we may be able to coerce a stringLiteral "true" to the BooleanLiteral 'true' if it makes sense to do so. If it is not possible to coerce them, then an error will be thrown.

### 3.2 Operators

Criteria can be structured using operators such as:

* Boolean operators (and, or, not) - e.g. q2.
* Equality, inequality (=, !=)
* Numerical comparisons (<, >, <=, >=) - e.g. q1, q3.
* Time series conditions: occurs - e.g. q7, q10.
* Others: like, in - e.g. q2, q4.
* Set formation over variable definitions: {} - e.g. q6-q11.
* Count

__Examples of operators in use__

```
emailAddress like "%.edu" and stateProvinceISO="CA"
 
touchpoint.type="FLIGHT" and touchpoint.destination in ["SJC","DAL"]
```

### 3.3 Constants

The following are functions which can be used as values. 

* `now` - Date and timestamp of the current time 
* `today` - Date only of the current time

### 3.4 Functions

PQL fully supports XDM and all data types supported by XDM. Queries are built using the following functions:


|Function Type|Function|Example|
|:---| :---| ---|
|Aggregates|count|{   touchpoint.type="FLIGHT" }.count() > 1|
|Time|addDays<br>addMonths<br>addYears|{<br>&nbsp;&nbsp;touchpoint.type=\"FLIGHT\" and<br>&nbsp;&nbsp;touchpoint.ts_flight occurs = 3 [days&#124;months&#124;years] after today<br>}|
|Time|addHours<br>addMinutes<br>addSeconds|{<br>&nbsp;&nbsp;touchpoint.type=\"FLIGHT\" and<br>&nbsp;&nbsp;touchpoint.ts_flight occurs = 3 [hours&#124;minutes&#124;seconds] after now<br>}|
|Time|subDays<br>subMonths<br>subYears|{<br>&nbsp;&nbsp;touchpoint.type=\"FLIGHT\" and<br>&nbsp;&nbsp;touchpoint.ts_flight occurs = 3 [days&#124;months&#124;years] before today<br>}|
|Time|subHours<br>subMinutes<br>subSeconds|{<br>&nbsp;&nbsp;touchpoint.type=\"FLIGHT\" and<br>&nbsp;&nbsp;touchpoint.ts_flight occurs = 3 [hours&#124;minutes&#124;seconds] before now<br>}|

### 3.5 Sets

Segment Predicates can be written using Sets, or code blocks which create a grouping of logic. Sets allow you to:

* Logically group the conditions that make up the Predicate definition
* Create a construct of select data to be used by the parent scope
* Control the order of operation, as all Sets are evaluated first; from the inner-most (sets can be nested) out
* Sets create a scope within which Variables and Conditions can be evaluated separately from the rest of the Predicate definition. 

Sets are syntactically composed such that variables are defined first, delimited by commas. The Condition statement is after the Variables declarations, separated by a semi-colon.

__Example Set__

```
{
   var1 as model.entity,
   var2 as model.entity2  
   :
   var1.prop1 and var2.prop1
}
```

#### 3.5.1 Variables

Variables are listed first in a Set, where multiple variables are separated by a comma. A Variable is a reference to the element referenced at the last property of a dot-delimited hierarchy. Variables can also be used to reference the result of a query, such as the following examples.

__Example assigning query results to variable__

```
{ 
  A1 as xEvent.metrics.commerce.abandons.value > 0, 
  A2 as xEvent.metrics.commerce.abandons.value > 0
  :
  A1.id != A2.id and A1.timestamp occurs < 2 days before A2.timestamp
}

{
  PV as xEvent.metrics.commerce.productListViews.value > 0, 
  Item as PV.productListItems.SKU = \"PS\" 
}
```

#### 3.5.2 Conditions

Conditions are statements which evaluate to a boolean. Conditions are optional, though the lack of one results in the selected object(s) from the object created by the Variables in the Set construct being returned, which could be used to perform an Aggregate function, such as count(). 

### 3.6 Statement

Every PQL query is a statement that is composed of expressions that are built together using the features discussed above. PQL allows for compound expressions that are constructed using arbitrary combinations of conjunctions and disjunctions, comparisons etc. These will follow the natural priority of the operators if they are not separated by parentheses. PQL also allows for the use of parentheses to control the evaluation of these expressions. The typical structure of a statement is to have the CRM related portions of the query at the beginning and then have the related ExperienceEvent portions later, possibly within a Set construct.

For CRM statements, since the execution is running in the context of a single user, it is possible to omit the `user` portion in the expressions and refer to the fields directly.

There are various types of statements supported in PQL. They are as follows:

#### 3.6.1 Basic Expression

At the basic level, the atomic instructions are either accessors of data in the form of A.B, functions or literals.

#### 3.6.2 Compound Expressions

These combine the basic expressions and allow for boolean expressions, arithmetic expressions and comparison expressions. These comparison expressions support checking for equality and inequality of expressions. The arithmetic expressions support the basic arithmetic operations and the boolean expressions can be combined with 'and' 'or' and 'not' keywords. Some examples are,

```
user.age > 35 and
user.state = "CA"
```

#### 3.6.3 Time Expressions

A special kind of expression is supported in PQL which allows the user to query the time attributes of the touchpoint events. This is known as the "occurs" statement. The syntax of the statement is as follows:

```
timeExpression
    : basicExpression 'occurs' durationExpression? dateTimeReference
    ;
durationExpression
    : comparisonOperator? number duration
    ;
duration
    : (SECOND | MINUTE | HOUR | DAY | WEEK | MONTH | YEAR)
    ;
dateTimeReference
    : preposition basicExpression
    | 'between' basicExpression 'and' basicExpression
    | dotExpression
    | variable
    ;   
preposition
    : ('after' | 'before' | 'of')
    ;
```

__Example time expression__

```
stateProvinceISO="MO" and
{
  touchpoint.ts_flight occurs <= 1 month before today
}
```

This allows you to construct natural sounding queries without having to go through extensive Date and DateTime operations.
