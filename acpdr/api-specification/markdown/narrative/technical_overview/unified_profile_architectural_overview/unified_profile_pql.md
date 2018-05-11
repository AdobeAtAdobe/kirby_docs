# Unified Profile Overview

## 1. Profile Query Language (PQL)

The following discusses the features of the Profile Query Language (PQL) and the functions it supports.

## 2. Purpose of PQL

PQL is a DSL (domain specific language) whose execution environment is designed to make it easy to query both the CRM and the Time Series Events associated with individual Profiles, so as to be able assign the Profiles to Segments. PQL operates on XDM data on the Profile Store and the Events coming in via the Platform Event pipeline. 

## 3. Elements of PQL

PQL is composed of various basic elements that are combined together to create PQL queries. We will look into those in some detail below.

### 3.1 Types

Since PQL is XDM compliant, it will support the types that XDM has. These include basic scalar data types such as String, Double, Int, Boolean, Number, DateLiteral,  object data types and vector data types such as collections or sets. The eventual full set of data types that PQL will support is listed at XDM Data Types. PQL statements themselves will not have declarations of types and the type inferred during execution is currently implicit.

PQL allows the use of dot-notation to access an object and its fields, such `person.firstName`. If the field is referring to another object or a vector of other objects, it is possible to chain the dots in a running dot notation. For example, you could have `metrics.commerce.abandons.value`. Since the XDM structure will largely follow a STAR schema, we don't anticipate many levels of running dots to be required, though the language does support it.

#### 3.1.1 Literals

PQL provides support for StringLiteral, DateLiteral, ListLiteral, Number and BooleanLiteral.

__String Literal__

This is defined as a string of characters surrounded by double quotes such as "John".

__Date Literal__

This can be a timestamp literal such as 'now' or 'today'.

__List Literal__

This is a way of defining a list on the fly using '[' element1 , element2 , ...']'.  Please note that the elements are separated by a comma.

__Numeric Literal__

Can be an UnsignedInt, Decimal or a Scientific Number such as 2.02 E -6.3

__Boolean Literal__

These are 'true' and 'false'

#### 3.1.2 Coercion of types

PQL will try to match the RHS type to the LHS type of an expression to the extent possible. At the time of query construction, the compiler will consult with the XDM registry to ascertain the types of the various fields involved in these expressions and match them. For example, we may be able to coerce a stringLiteral "true" to the BooleanLiteral 'true' if it makes sense to do so. If it is not possible to coerce them, then an error will be thrown during query validation.

### 3.2 Select operator

PQL includes the "select" operator, which allows the construction of sets of matching objects among one or more array-valued fields. These are primarily expected to be ExperienceEvents, but any array-valued property can be used. The syntax of "select" is as follows:

```
select
    V1 from <object1>.<arrayField1> where <condition1>,
    V2 from <object2>.<arrayField2> where <condition2>,
    ...
```

For example, the following selects profiles which contain at least one ExperienceEvent which occurred before today and which contains a `productListItem` with SKU equal to "PS":

```
select
    X from xEvent where X.timestamp occurs before today,
    I from X.productListItems where I.SKU = "PS"
```

#### 3.2.1 Variables

The select operator uses variables which are declared to the left of the "from" keyword (V1, V2, X, I ... are the variables in the examples above). The variables range over items in the values of the array-valued expressions defined between the `from` and `where` keywords. The conditions following the `where` keywords can reference the variable being declared in the current from clause as well as variables from previous from clauses, but not variables from later from clauses.

Multiple `from` clauses in a select expression are separated by commas. Also note that the `where` keyword and following condition are optional.

Variables which are defined within a select expression can only be referenced within that select expression, and, moreover, only to the right of where they are declared within the select expression.

Select expressions can be nested (e.g. `condition1` above may itself contain a select expression).  In this case, variables declared in the outer select are visible to the inner select, subject to the "to the right of" rule noted above.

#### 3.2.2 Select result

When a select expression is evaluated, the result is the set of tuples (V1, V2, X, I ...) which satisfy the conditions within the select expression. A select expression is therefore multi-valued, and hence the count() function can be applied to the result. For example, the following defines profiles which have more than 5 associated ExperienceEvents each of which include more than 2 `productListItems`.:

```
(select X from xEvent where X.productListItems.count() > 2).count() > 5
```

#### 3.2.3 Aggregate functions

Since the select construct evaluates to a set of tuples, it is possible to run aggregation functions on them. Currently, PQL only supports the 'count()' function, but other aggregation functions are planned for implementation.

### 3.3 Statement

Every PQL query is a statement that is composed of expressions that are built together using the features discussed above. PQL allows for compound expressions that are constructed using arbitrary combinations of conjunctions and disjunctions, comparisons etc. These will follow the natural priority of the operators if they are not separated by parentheses. PQL also allows for the use of parentheses to control the evaluation of these expressions. The typical structure of a statement is to have the CRM related portions of the query at the beginning and then have the related ExperienceEvent portions later, possibly within a Select construct.

For CRM statements, since the execution is running in the context of a single user, it is possible to omit the `user` portion in the expressions and refer to the fields directly.

There are various types of statements supported in PQL. They are as follows.

#### 3.3.1 Basic Expression

At the basic level, the atomic instructions are either accessors of data in the form of A.B, functions or literals.

#### 3.3.2 Compound Expressions

These combine the basic expressions and allow for boolean expressions, arithmetic expressions and comparison expressions. These comparison expressions support checking for equality and inequality of expressions. The arithmetic expressions support the basic arithmetic operations and the boolean expressions can be combined with 'and' 'or' and 'not' keywords. Some examples are,

```
user.age > 35 and
user.state = "CA"
```

#### 3.3.3 Time Expressions

A special kind of expression is supported in PQL which allows the user to query the timestamp attributes of ExperienceEvents. This is known as the "occurs" statement. The syntax of the statement is as follows:

```
X.timestamp occurs <comparison> <integer> <timeunits> <direction> <relative term|Y.timestamp>

X.timestamp: the timestamp attribute on an ExperienceEvent bound to variable X.

<comparison>: a comparison operator, which can be '>', '>=', '<', '<=', '=', or '!='.

<integer>: a non-negative integer.

<timeunits>: second(s), minute(s), hour(s), day(s), week(s), month(s) or year(s).

<direction>: 'before', 'after' or 'from'.

<relative term>: a timestamp literal: 'today', 'now', 'yesterday' or 'tomorrow'

Y.timestamp: another reference to a timestamp attribute.

Note: <comparison>, <integer> and <timeunits> can be omitted (but must either all be present or all omitted).
```

__Example time expressions__

The following demonstrates a condition wherein event X occurred sometime between one month ago and the start of today.

```
X.timestamp occurs <= 1 month before today
```

The following illustrates omitting the `comparison`, `integer` and `timeunits` parameters, and states that the event occurred before today.

```
X.timestamp occurs before today
```

The following shows an occurs expression in the context of a complete PQL query.

The `occurs` operator allows you to construct natural sounding queries without having to go through extensive Date and DateTime operations.

```
stateProvinceISO="MO" and (select X from xEvent where X.timestamp occurs <= 1 month before today)
```

#### 3.3.4 String Functions

The following describes functions that are available for comparing String literals.

##### startsWith

* Form
  * `string1`.startsWith(`string2`)
  * `string1`.startsWith(`string2`, `boolean`)
* Arguments
  * `string1` (required): the string to perform the check on
  * `string2` (required): the string to search for within the first string
  * `boolean` (optional - default `true` if not specified) : if `true` or not specified, the check will be case sensitive, if `false`, the check will be case insensitive
* Result
  * Boolean: `true` if both strings are not null and the first string starts with the second, `false` otherwise
* Examples
  * workEmail.address.startsWith("joe")
    * `true` where `workEmail` = "joe.lean@work.com"
    * `false` where `workEmail` = "JOE.lean@work.com"
  * workEmail.address.startsWith("joe", true)
    * `true` where `workEmail` = "joe.lean@work.com"
    * `false` where `workEmail` = "JOE.lean@work.com"
  * workEmail.address.startsWith("joe", false)
    * `true` where `workEmail` = "joe.lean@work.com"
    * `true` where `workEmail` = "JOE.lean@work.com"

##### doesNotStartWith

* Form
  * `string1`.doesNotStartWith(`string2`)
  * `string1`.doesNotStartWith(`string2`, `boolean`)
* Arguments - same as [__startsWith__](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string __does not__ start with the second, `false` otherwise
* Examples
  * workEmail.address.doesNotStartWith("joe")
    * `false` where `workEmail` = "joe.lean@work.com"
    * `true` where `workEmail` = "JOE.lean@work.com"
  * workEmail.address.doesNotStartWith("joe", true)
    * `false` where `workEmail` = "joe.lean@work.com"
    * `true` where `workEmail` = "JOE.lean@work.com"
  * workEmail.address.doesNotStartWith("joe", false)
    * `false` where `workEmail` = "joe.lean@work.com"
    * `false` where `workEmail` = "JOE.lean@work.com"

##### endsWith

* Form
  * `string1`.endsWith(`string2`)
  * `string1`.endsWith(`string2`, `boolean`)
* Arguments - same as [__startsWith__](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string ends with the second, `false` otherwise
* Examples
  * workEmail.address.endsWith(".edu")
    * `true` where `workEmail` = "joe.lean@work.edu"
    * `false` where `workEmail` = "joe.lean@work.EDU"
  * workEmail.address.endsWith(".edu", true)
    * `true` where `workEmail` = "joe.lean@work.edu"
    * `false` where `workEmail` = "joe.lean@work.EDU"
  * workEmail.address.endsWith(".edu", false)
    * `true` where `workEmail` = "joe.lean@work.edu"
    * `true` where `workEmail` = "joe.lean@work.EDU"

##### doesNotEndWith

* Form
  * `string1`.doesNotEndWith(`string2`)
  * `string1`.doesNotEndWith(`string2`, `boolean`)
* Arguments - same as [__startsWith__](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string __does not__ end with the second, `false` otherwise
* Examples
  * workEmail.address.doesNotEndWith(".edu")
    * `false` where `workEmail` = "joe.lean@work.edu"
    * `true` where `workEmail` = "joe.lean@work.EDU"
  * workEmail.address.doesNotEndWith(".edu", true)
    * `false` where `workEmail` = "joe.lean@work.edu"
    * `true` where `workEmail` = "joe.lean@work.EDU"
  * workEmail.address.doesNotEndWith(".edu", false)
    * `false` where `workEmail` = "joe.lean@work.edu"
    * `false` where `workEmail` = "joe.lean@work.EDU"

##### contains

* Form
  * `string1`.contains(`string2`)
  * `string1`.contains(`string2`, `boolean`)
* Arguments - same as [__startsWith__](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string contains the second, `false` otherwise.
* Examples
  * workEmail.address.contains("yahoo")
    * `true` where `workEmail` = "joe.lean@yahoo.com"
    * `false` where `workEmail` = "joe.lean@YAHOO.com"
  * workEmail.address.contains("yahoo", true)
    * `true` where `workEmail` = "joe.lean@yahoo.com"
    * `false` where `workEmail` = "joe.lean@YAHOO.com"
  * workEmail.address.contains("yahoo", false)
    * `true` where `workEmail` = "joe.lean@yahoo.com"
    * `true` where `workEmail` = "joe.lean@YAHOO.com"

##### doesNotContain

* Form
  * `string1`.doesNotContain(`string2`)
  * `string1`.doesNotContain(`string2`, `boolean`)
* Arguments - same as [__startsWith__](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string __does not__ contain the second, `false` otherwise.
* Examples
  * workEmail.address.doesNotContain("yahoo")
    * `false` where `workEmail` = "joe.lean@yahoo.com"
    * `true` where `workEmail` = "joe.lean@YAHOO.com"
  * workEmail.address.doesNotContain("yahoo", true)
    * `false` where `workEmail` = "joe.lean@yahoo.com"
    * `true` where `workEmail` = "joe.lean@YAHOO.com"
  * workEmail.address.doesNotContain("yahoo", false)
    * `false` where `workEmail` = "joe.lean@yahoo.com"
    * `false` where `workEmail` = "joe.lean@YAHOO.com"

##### equals

* Form
  * `string1`.equals(`string2`)
  * `string1`.equals(`string2`, `boolean`)
* Arguments - same as [__startsWith__](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string equals the second, `false` otherwise
* Examples
  * person.firstName.equals("John")
    * `true` where `firstName` = "John"
    * `false` where `firstName` = "john"
  * person.firstName.equals("John", true)
    * `true` where `firstName` = "John"
    * `false` where `firstName` = "john"
  * person.firstName.equals("John", false)
    * `false` where `firstName` = "Johnny"
    * `true` where `firstName` = "John"
    * `true` where `firstName` = "john"

##### notEqualTo

* Form
  * `string1`.notEqualTo(`string2`)
  * `string1`.notEqualTo(`string2`, `boolean`)
* Arguments - same as [__startsWith__](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string __does not__ equal the second, `false` otherwise
* Examples
  * person.firstName.notEqualTo("John")
    * `false` where `firstName` = "John"
    * `true` where `firstName` = "john"
  * person.firstName.notEqualTo("John", true)
    * `false` where `firstName` = "John"
    * `true` where `firstName` = "john"
  * person.firstName.notEqualTo("John", false)
    * `true` where `firstName` = "Johnny"
    * `false` where `firstName` = "John"
    * `false` where `firstName` = "john"

##### Notes on String functions

* The String parameters to the above functions can be any String-valued PQL expressions, including string literals and string-valued XDM property references. As such, these functions can be used to compare an XDM string property to a fixed value, or to compare two XDM string properties.
* The negative versions are not precisely the negations of the corresponding positive versions, due to how null values are treated.  For instance, an XDM property reference which turns out to be undefined during evaluation will return false for both contains and doesNotContain.
* __equals__ and __notEqualTo__ are added as string-specific functions in order to support the case sensitivity switch parameter.  `=` and `!=` are maintained in PQL as before for use on any type, and imply case sensitivity when used on strings.

## 4. Language Examples

The following are examples of PQL intended to illustrate the structure and capabilities of the language.

### 4.1 Example 1: Operates purely on CRM data

Where a statement is based purely CRM data, the root entity `user` is implied and must be omitted from the dot-notation field paths in the statement.

```
countryISO = "US" and
stateProvinceISO = "CA" and
ageBetween25And35 = "Y"
```

### 4.2 Example 2: Operates on both CRM data and ExperienceEvent (touchpoint) data

This example shows the query that combines searching the CRM data and the events while allowing for filters for dates. This example also illustrates the use of variables and a `select` construct that is bounded by parenthesis.

```
countryISO = "US" 
and
stateProvinceISO = “CA" 
and (
  select
    F1 from xEvent where F1.type = "FLIGHT",
    F2 from xEvent where F2.type = "FLIGHT" and F1 != F2 and F2.ts_flight occurs <= 30 days after F1.ts_flight
)
```

### 4.3 Example 3: Operation on a Set

The following example shows that PQL can support arbitrary combinations of conjunctions and disjunctions. PQL supports the use of parentheses to enable these combinations. The other notable feature in this example is a function call on the Set to count the number of elements in it.

```
(select X from xEvent where X.type = "FLIGHT").count() > 1
and
(select X from xEvent where X.type = "LOST_BAG").count() > 0
```
