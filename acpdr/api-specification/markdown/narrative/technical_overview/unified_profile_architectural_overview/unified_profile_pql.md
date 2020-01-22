# Profile Query Language (PQL)

## Overview

The following discusses the features of the Profile Query Language (PQL) and the functions it supports.

## Purpose of PQL

PQL is a query language developed to support the definition and execution of segmentation queries over Real-time Customer Profile.  Initially, it is focused on queries over profiles (i.e. _xdm.context.profile) and their associated experience events (i.e. _xdm.context.experienceevent), as the name Profile Query Language suggests.  However, it will soon be extended to support segmentation over any XDM schema.

PQL is a DSL (Domain Specific Language), meaning that it has a defined grammar which is tailored to its domain.  Specifically, PQL makes it easy to create and evaluate segment definitions which combine both CRM-style profile conditions and the kind of time series conditions which are required when segmenting over experience events.

PQL is XDM-compliant; it supports evaluating queries against data which has been ingested into the Real-time Customer Profile in XDM format.  Prior to evaluation, PQL supports validating queries against the XDM schemas which they reference, so that any schema-related problems with the queries can be identified as early as possible.

A PQL query is evaluated over one profile at a time (with its linked experience events).  There is therefore always an implicit profile in context in the initial version of PQL (e.g. a PQL expression such as person.birthDay is understood to apply to the profile in context without explicitly including a reference to _xdm.context.profile).

## Elements of PQL

PQL is composed of various basic elements that are combined together to create PQL queries. We will look into those in some detail below.

### Types

Since PQL is XDM compliant, it will support the types that XDM has. These include basic scalar data types such as String, Double, Int, Boolean, Number, DateLiteral,  object data types and arrays. The eventual full set of data types that PQL will support is listed at XDM Data Types. PQL statements themselves will not have declarations of types and the type inferred during execution is currently implicit.

PQL allows the use of dot-notation to access an object and its fields, such `workEmail.address`. If the field is referring to another object or an array of other objects, it is possible to chain the dots in a running dot notation. For example, you could have `_xdm.context.experienceevent.metrics.commerce.productListViews.value`. 

Note that the top-level properties referenced in these two examples ("homeAddress" and "person") are root properties on _xdm.context.profile.  As noted above, in the initial version of PQL, _xdm.context.profile is always assumed to be the root model and is not explicitly included in the PQL queries.  When PQL is extended to support other root schemas, we will most likely require that references to the root schema (profile or otherwise) be included in the query.

#### Arrays

PQL supports querying over arrays (as it must be XDM-compliant, as arrays form a key part of XDM).  Arrays can be used in a number of PQL functions such as `select`.  However, note that the "running dot" notation cannot be currently used to directly access properties of items within an array – e.g. if "arrayProp" is a property whose type is Array of Obj1, where Obj1 is a model which itself has a property "itemProp", the expression "arrayProp.itemProp" is not currently allowed in PQL, since itemProp is a property on the items in the array, not on the array itself.  The supported way to reference item properties within an array is as follows: 

`select X from arrayProp where X.itemProp = ...`

#### Literals

PQL provides support for string, relative time reference, integer, double and boolean literals.

##### String literal

This is defined as a string of characters surrounded by double quotes such as "John".

##### Boolean literal

These are 'true' and 'false'. (Note: boolean literals are not surrounded by quotes in PQL.)

##### Integer literal

E.g. 123, -123 or 0.

##### Double literal

Examples:

* 4.5
* 0.45
* .45
* 2.02E12
* 2.02E-12

##### Date literal

This can be a timestamp literal such as`now`,`today`,`tomorrow` or `yesterday`. Date literals can also be constructed using the following construct:

```
date({year}, {month}, {day})
```

where `year`, `month` and `day` are integers.

For instance, the following constructs a date representing the date 28th August, 2018:

```
date(2018, 8, 28)
```

##### List literal/Array

A list of literal values, using square brackets and comma as delimiter.  Examples:

* `[1, 2, 3]`
* `["US", "CA"]`

##### Relative time references

PQL utilizes a number of reserved words to form timestamp and time interval references, usually relative.  These are:

* `now`, `today`, `yesterday`, `tomorrow`
* `this`, `last`, `next`
* `before`, `after`, `from`
* `millisecond`, `second`, `minute`, `hour`, `day`, `week`, `month`, `year`, `decade`, `century`, `millenium`
* `milliseconds`, `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, `years`, `decades`, `centuries`, `millennia`

The above reserved words are used as literals in PQL expressions, frequently in combination with each other and other PQL constructs.  Examples are:

* `X.timestamp occurs before today`
* `X.timestamp occurs last month`
* `X.timestamp occurs <= 3 days before now`

See the section on the [`occurs`](#occurs) function for more details

#### XDM references

PQL expressions access record and time series data using XDM references.  For example:

* `person.birthYear`
* `homeAddress.countryCode`

In PQL, there is always an implicit profile in context, so XDM Individual Profile references start with immediate profile properties. In other words, to refer to `profile.person`, you would use `person`. For `profile.homeAddress`, use `homeAddress`, etc.

##### xEvent

PQL contains a reserved word, `xEvent`, which is used to refer to the array of ExperienceEvents which is linked to a profile.  E.g. `xEvent.device.model` evaluates to a list devices used in recorded ExperienceEvents associated with a particular profile.  When PQL is extended to support a larger set of XDM schemas, it is likely that additional keywords will be introduced to capture similar links which apply to other schemas.  A more general mechanism to specify these relationships, which does not involve using reserved words such as xEvent, is also anticipated.

XDM references in PQL can refer to primitive types (e.g. `person.birthYear` has type Integer), arrays (e.g. `xEvent`) or complex objects (e.g. `person`).  PQL's type coercion allows most references to be used in a Boolean position (e.g. at the top level of a query expression).  For example, the simple query `person` is a valid PQL query, and will evaluate to true if the profile has a `person` property defined, and false otherwise.  For array-valued XDM properties or other array-valued PQL expressions, the value is coerced to true if the property is defined and is non-empty, false otherwise, when in Boolean position.

#### Comparisons
PQL supports comparison operators which allow conditions relating XDM properties and literals to be defined.

Examples are:

* `person.birthYear = 1980`
* `person.birthYear > 1980`
* `homeAddress.countryCode != workAddress.countryCode`

Note that comparison operators can compare XDM references with literals, or XDM references with other XDM references.

See the functions table below for more details. <!-- Add link to anchor -->

#### Boolean Operators

PQL supports boolean operators which allow basic conditions such as comparisons described above to be combined.

Examples are:

* `person.birthYear = 1980 and homeAddress.countryCode != workAddress.countryCode`
* `person.birthYear = 1980 or homeAddress.countryCode != workAddress.countryCode`
* `not(  person.birthYear = 1980 and homeAddress.countryCode != workAddress.countryCode )`
* `!(  person.birthYear = 1980 and homeAddress.countryCode != workAddress.countryCode )`

Note that PQL supports both `not` and `!` for logical negation.

#### Precedence

PQL follows normal rules of precedence.  Parentheses can be inserted to change or clarify precedence.  For example:

* `person.birthYear = 1980 and (homeAddress.countryCode != workAddress.countryCode or homeAddress.countryCode = "US")`
* `person.birthYear - (person.birthMonth + person.birthDay)`

#### Select operator

In PQL, the select operator allows a filtering condition to be applied to an array-valued expression to return the subset of the array which matches the condition.

The most common use case for this is filtering experience events based on some condition.  Take for example:

* `select X from xEvent where X.timestamp occurs yesterday`

In this example, the array-valued expression is `xEvent`, which as explained above refers to the array of experience events linked to the current profile, while the filtering condition is `X.timestamp occurs yesterday`.  A variable `X` is declared in the select statement which ranges over items within the array-valued expression (in this case ExperienceEvents), and is used in the filtering condition in order to reference properties on each candidate ExperienceEvent.

Note that, while select is often used with `xEvent`, it can be used with any array-valued property.

The select example given above just uses a single variable.  More generally, PQL supports multiple variables, array-expressions and filtering conditions in a single select statement.  The general form of select is as follows:

```
select
    V1 from <object1>.<arrayField1> where <condition1>,
    V2 from <object2>.<arrayField2> where <condition2>
```

In the above form:

* `condition1` can reference `V1`, but not `V2`
* `condition2` can reference `V1` and `V2`, but not `V3`

The result of a multi-variable select is an array of tuples of matching values `[V1, V2]`.

For example:

```
select
    X from xEvent where X.timestamp occurs before today,
    I from X.productListItems where I.SKU = "PS"
```

Selects profiles which contain at least one ExperienceEvent which occurred before today and which contains a `productListItem` with `SKU` equal to "PS".

##### A note on coercion to Boolean

The top-level type in PQL is always Boolean.  Put differently, we are defining whether the current profile satisfies the query or not.  In the case of select, the normal return type is an array.  If the select is the top-level expression in the PQL query, the result is coerced to a Boolean value according to the following rules:

* If the select expression evaluates to an empty array, it is coerced to false.
* Otherwise, it is coerced to true.

For example, consider the following query:

```plaintext
select X from xEvent where X.timestamp occurs yesterday
```

PQL first evaluates the `select` expression as an array. In this case, the value will be an array containing all ExperienceEvents which occurred yesterday. PQL then coerces the array to a boolean value according to the coersion rule outlined above. The end result is that this query will return true if there is at least one event which occurred yesterday, and false if there are no such events.

##### Nested selects 

Select expressions can be nested.  For instance:

* `select X from xEvent where X.timestamp occurs before today and (select I from X.productListItems where I.SKU = "PS")`

##### Variables

The `select` operator uses variables which are declared to the left of the `from` keyword (which would be `V1` and `V2` in the example above).  The variables range over items in the values of the array-valued expressions defined between the `from` and `where` keywords.  The conditions following the `where` keywords can reference the variable being declared in the current from clause as well as variables from previous from clauses, but not variables from later from clauses.

Multiple `from` clauses in a select expression are separated by commas.  Also note that the `where` keyword and following condition are optional.

Variables which are defined within a select expression can only be referenced within that select expression, and, moreover, only to the right of where they are declared within the select expression.

Select expressions can be nested (e.g. `{condition1}` above may itself contain a select expression).  In this case, variables declared in the outer select are visible to the inner select, subject to the "to the right of" rule noted above.

#### Statement

Every PQL query is a statement that is composed of expressions that are built together using the features discussed above. PQL allows for compound expressions that are constructed using arbitrary combinations of conjunctions and disjunctions, comparisons etc. These will follow the natural priority of the operators if they are not separated by parentheses. PQL also allows for the use of parentheses to control the evaluation of these expressions. The typical structure of a statement is to have the CRM related portions of the query at the beginning and then have the ExperienceEvent related portions later, possibly within a select construct.

For CRM statements, since the execution is running in the context of a single user, it is possible to omit the "user" portion in the expressions and refer to the fields directly as Example 1 shows.

There are various types of statements supported in PQL. For more examples of supported queries, see [Real-time Customer Profile supported queries](unified_profile_supported_queries.md).

#### Coercion of types

PQL will try to match the RHS type to the LHS type of an expression to the extent possible. At the time of query construction, the compiler will consult with the XDM registry to ascertain the types of the various fields involved in these expressions and match them. For example, we may be able to coerce a stringLiteral "true" to the BooleanLiteral 'true' if it makes sense to do so. If it is not possible to coerce them, then an error will be thrown during query validation.

##### Operators

PQL supports the use of the traditional comparison operators and some SQL like operators. The comparison operators supported are `=`, `!=`, `<`, `>`, `<=`, `>=`. The other infix operators supported are `like` and `in`. Their usage is illustrated by the following examples:

* `emailAddress like "%.edu" and homeAddress.stateProvinceISO="CA"`
* `select X from xEvent where X.type="FLIGHT" and X.destination in ["SJC","DAL"]`

## Language Examples

The following examples of PQL to illustrate the structure and capabilities of the language.

### Example 1: Operates purely on CRM data

```
homeAddress.countryISO = "US" and
homeAddress.stateProvinceISO = "CA" and
person.birthYear > 1980
```

### Example 2: Operates on both CRM data and ExperienceEvent (touchpoint) data.

```
homeAddress.countryISO = "US" 
and
homeAddress.stateProvinceISO = “CA" 
and (
  select
    F1 from xEvent where F1.type = "FLIGHT",
    F2 from xEvent where F2.type = "FLIGHT" and F1 != F2 and F2.ts_flight occurs <= 30 days after F1.ts_flight
)
```

This example shows the query that combines searching the CRM data and the events while allowing for filters for dates. This example also illustrates the use of variables and the select operator.

### Example 3: Operation on an Array-valued property

```
(select X from xEvent where X.type = "FLIGHT").homeAddress.countryISO = "US"
and
(select X from xEvent where X.type = "LOST_BAG").stateProvinceISO = “CA" 
```

The above examples show that PQL can support arbitrary combinations of conjunctions and disjunctions. PQL supports the use of parentheses to enable these combinations.

## PQL Functions Detail

### Comparison Functions

#### =

* Form
  * `{expression1} = {expression2}`
* Arguments
  * `expression1` (required): a literal or compound expression evaluating to any type (e.g. integer, double, string, array)
  * `expression2` (required): a literal or compound expression evaluating to any type (e.g. integer, double, string, array)
* Result
  * Boolean: `true` if:
    * both arguments evaluate to values which are not null, and
    * the two values are equal
* Examples
  * `homeAddress.stateProvinceISO = "CA"`
    * In this case the first argument is a String-valued XDM expression, and the second is a string literal.  This example defines people whose home address is in California.
  * `person.birthMonth = 3`
    * In this case the first argument is an Integer-valued XDM expression, and the second is an Integer literal. This example defines people with birthday in March.

#### !=

* Form
  * `{expression1} != {expression2}`
* Arguments
  * `expression1` (required): a literal or compound expression evaluating to any type (e.g. integer, double, string, array)
  * `expression2` (required): a literal or compound expression evaluating to any type (e.g. integer, double, string, array)
* Result
  * Boolean:  `true` if:
     * both arguments evaluate to values which are not null (due to this condition `!=` is not the exact negation of `=`), and
     * the two values are not equal
* Examples
  * `homeAddress.stateProvinceISO != "CA"`
    * In this case the first argument is a String-valued XDM expression, and the second is a string literal.  This example defines people whose home address is not in California.
  * `person.birthMonth != 3`
    * In this case the first argument is an Integer-valued XDM expression, and the second is an Integer literal. This example defines people with birthday not in March.

#### &lt;

* Form
  * `{expression1} < {expression2}`
* Arguments
  * `expression1` (required): A numeric expression (either compound or literal).
  * `expression2` (required): A numeric expression (either compound or literal).
* Result
  * Boolean: `true` if: 
    * both arguments evaluate to values which are not null and are numeric, and
    * the first value is less than the second value
* Examples
  * `person.birthMonth < 3`
    * This example defines people whose birthdays fall in January or February.
  * `select X from xEvent where X.person`
    * This example defines people with at least one experience event which product list items but less than three of them.

#### &gt;

* Form
  * `{expression1} > {expression2}`
* Arguments
  * `{expression1}` (required): A numeric expression (either compound or literal).
  * `{expression2}` (required): A numeric expression (either compound or literal).
* Result
  * Boolean: `true` if:
    * both arguments evaluate to values which are not null, and are numeric, and
    * the first value is greater than the second value
* Examples
  * `person.birthMonth > 2`
    * This example defines people whose birthdays do not fall in January or February.

#### &lt;=

* Form
  * `{expression1} <= {expression2}`
* Arguments
  * `expression1` (equired): A numeric expression (either compound or literal)
  * `expression2` (equired): A numeric expression (either compound or literal)
* Result
  * Boolean: `true` if:
    * both arguments evaluate to values which are not null and are numeric, and
    * the first value is less than or equal to the second value
* Examples
  * `person.birthMonth <= 2`
    * This example defines people whose birthdays fall in January or February.

#### &gt;=

* Form
  * `{expression1} >= {expression2}`
* Arguments
  * `expression1` (required): A numeric expression (either compound or literal)
  * `expression2` (required): A numeric expression (either compound or literal)
* Result
  * Boolean: `true` if: 
    * both arguments evaluate to values which are not null and are numeric, and
    * the first value is greater than or equal to the second value
* Examples
  * `person.birthMonth >= 3`
    * This example defines people whose birthdays do not fall in January or February.


### Date/Time-related Functions

#### occurs

Occurs constrains a timestamp-valued field relative to a relative timestamp (e.g. `today`) or another timestamp-valued field.  The objects being constrained will normally be ExperienceEvents (accessed via the `xEvent` array value), but occurs is not limited to ExperienceEvents: it can be used on any timestamp-valued field.  

Timestamp-valued fields may be represented in the data as either:
 
 * long integers (since 18.4.1), where the long integer represents Unix epoch time in milliseconds, or
 * strings in ISO 8601 offset format: e.g. "2011-12-03T10:15:30+01:00" (since 18.6.1)

##### Forms

```
X.timestamp occurs {comparison} {integer} {timeunits} {direction} {relative term|date|Y.timestamp}
```
     
Examples:

* `X.timestamp occurs < 3 months before today`
* `X.timestamp occurs > 3 weeks after date(2017,10,1)`
* `X.timestamp occurs < 2 weeks after Y.timestamp`

```
X.timestamp occurs {direction} {relative term|date|Y.timestamp}
```

Examples:

* `X.timestamp occurs before today`
* `X.timestamp occurs after date(2017,10,1)`
* `X.timestamp occurs after Y.timestamp`
 
```
X.timestamp occurs (on) {relative term|date|Y.timestamp}
```
 
Examples:

* `X.timestamp occurs last year`
* `X.timestamp occurs on date(2017,10,1)`
* `X.timestamp occurs on Y.timestamp`

```
X.timestamp occurs between {relative term|date|Y.timestamp} and {relative term|date|Y.timestamp}
```
 
Examples:

* `X.timestamp occurs between date(2017,10,1) and date(2017,12,31)`
* `X.timestamp occurs between last month and last week`
* `X.timestamp occurs between Y.timestamp and Z.timestamp`

Note that the presence of `on` in the third form is optional, and is there to improve readability for some combinations.  For instance, the following are both valid and equivalent:

* `X.timestamp occurs on date(2017, 10, 1)`
* `X.timestamp occurs date(2017, 10, 1)`

##### Arguments

* `X.timestamp`: the timestamp attribute on an experience event bound to variable X
* `comparison`: a comparison operator, which can be `>`, `>=`, `<`, `<=`, `=`, or `!=` 
* `integer`: a non-negative integer 
* `timeunits`: `millisecond(s)`, `second(s)`, `minute(s)`, `hour(s)`, `day(s)`, `week(s)`, `month(s)`, `year(s)`, `decade(s)`, `century`, `centuries`, `millennium` or `millennia` 
* `direction`: `before`, `after` or `from`
* `relative term`: either
  * a timestamp literal: `today`, `now`, `yesterday` or `tomorrow`, or
  * a combination of one of `this`, `last` and `next` followed by a singular time unit
* `Y.timestamp`: another reference to a timestamp attribute

Note: the third form of occurs above is supported as of PQL 18.9.1.

##### Result 

Boolean

##### Examples 

```
X.timestamp occurs <= 1 month before today
```

Event `X` occurred sometime between one month ago and the start of today.

```
X.timestamp occurs before today
```

This illustrates omitting the {comparison}, {integer} and {timeunits} parameters, and states that the event occurred before today

```
X.timestamp occurs last month
```

This illustrates omitting the {comparison}, {integer}, {timeunits} and {direction} parameters, and states that the event occurred last month 

Note: "last month" refers to a complete calendar month.  E.g. if today is 28th August, 2018, then `last month` refers to July 1st, 2018 - July 31st,  2018. 

To specify events which have occurred within the last month, the following form would be used:

```
X.timestamp occurs <= 1 month before today
```

E.g. if today is 28th August, 2018, then the above would define events whose timestamp falls between July 28th, 2018 - August 27th, 2018.

```
X.timestamp occurs on date(2017, 10, 1)
```

The above defines events which occurred on October 1st, 2017.

```
X.timestamp occurs between date(2017, 10, 1) and date(2017, 12, 31)
```

The above defines events which occurred between October 1st, 2017 and December 31st, 2017 inclusive.

```
X.timestamp occurs between date(currentYear() - 1, 10, 1) and date(currentYear() - 1, 12, 31)
```

The above defines events which occurred between October 1st and December 31st of last year, inclusive.

```
stateProvinceISO="MO" and (select X from xEvent where X.ts_flight occurs <= 1 month before today)
```

The above shows an occurs expression in the context of a complete PQL query.

The occurs operator allows you to construct natural sounding queries without having to go through extensive Date and DateTime operations.

##### More occurs examples

|   |   |   |
|---|---|---|
|occurs|add hours|`select X from xEvent where X.type = "FLIGHT"`<br>`and`<br>`X.ts_flight occurs = 3 hours after now`|
|occurs|add minutes|`select X from xEvent where X.type = "FLIGHT"`<br>`and`<br>`X.ts_flight occurs = 3 minutes after now`|
|occurs|add months|`select X from xEvent where X.type = "FLIGHT"`<br>`and`<br>`X.ts_flight occurs = 3 months after today`|
|occurs|add seconds|`select X from xEvent where X.type = "FLIGHT"`<br>`and`<br>`X.ts_flight occurs = 300 seconds after now`|
|occurs|add years|`select X from xEvent where X.type = "FLIGHT"`<br>`and`<br>`X.ts_flight occurs = 3 years after today`|
|occurs|subtract days|`select X from xEvent where X.type = "FLIGHT"`<br>`and`<br>`X.ts_flight occurs = 3 years before today`|
|occurs|subtract hours|`select X from xEvent where X.type = "FLIGHT"`<br>`and`<br>`X.ts_flight occurs = 3 hours before now`|
|occurs|subtract minutes|`select X from xEvent where X.type = "FLIGHT"`<br>`and`<br>`X.ts_flight occurs = 3 minutes before now`|
|occurs|subtract months|`select X from xEvent where X.type = "FLIGHT"`<br>`and`<br>`X.ts_flight occurs = 3 months before today`|
|occurs|subtract seconds|`select X from xEvent where X.type = "FLIGHT"`<br>`and`<br>`X.ts_flight occurs = 3 seconds before now`|
|occurs|subtract years|`select X from xEvent where X.type = "FLIGHT"`<br>`and`<br>`X.ts_flight occurs = 3 years before today`|


#### currentMonth

* Form
  * `currentMonth()`
* Result
  * Integer: the integer value of the current month, in the range 1 to 12, based on UTC time
* Examples
  * `birthMonth = currentMonth()`
    * `true` for all profiles who have a birthday this month
    * `false` otherwise
  * `currentMonth() in [3, 4, 5]`
    * `true` during the months of March, April, and May
    * `false` otherwise

#### getMonth

* Form
  * `{timestamp}.getMonth()`
* Arguments
  * `timestamp` (required): a timestamp-valued expression. Timestamp-valued fields may be represented in the data as either:
    * long integers (since 18.4.1), where the long integer represents Unix epoch time in milliseconds
    * strings in ISO 8601 offset format: e.g. "2011-12-03T10:15:30+01:00" (since 18.6.1)
    * Java Timestamp objects, since 18.7.1
* Result
  * Integer: the integer value of the month in which `timestamp` falls, in the range 1 to 12, based on UTC time
* Examples
  * `X.timestamp.getMonth() = 3`
    * `true` for profiles who had an experience event in March of any year
    * `false` otherwise

#### currentYear

* Form
  * `currentYear()`
* Result
  * Integer: the integer value of the current year.  Current year is based on the PQL execution time.  By default, PQL execution time is the current time in UTC at the start of a PQL execution run
* Examples
  * `person.birthYear = currentYear()`
  * `currentYear() in [2015, 2016, 2017]`

#### getYear

* Form
  * `{timestampExpression}.getYear()`
* Arguments
  * `timestampExpression` (required): a timestamp-valued expression.  Timestamp-valued fields may be represented in the data as either:
    * long integers (since 18.4.1), where the long integer represents Unix epoch time in milliseconds
    * strings in ISO 8601 offset format: e.g. "2011-12-03T10:15:30+01:00" (since 18.6.1)
    * Java Timestamp objects, since 18.7.1
* Result
  * Integer: the integer value of the year in which the timestamp falls based on UTC time
* Examples
  * `select X from xEvent where X.timestamp.getYear() = 2017`
    * This example selects profiles which have events which occurred in 2017
  * `select X from xEvent where X.timestamp.getYear() = currentYear()`
    * This example selects profiles which have events which occurred in the current year

#### currentDayOfMonth

* Form
  * `currentDayOfMonth()`
* Result
  * Integer: the integer value of the current day-of-month.  Current day-of-month is based on the PQL execution time.  By default, PQL execution time is the current time in UTC at the start of a PQL execution run.
* Examples
  * `person.birthDay = currentDayOfMonth()`
  * `currentDayOfMonth() in [1, 2]`

#### getDayOfMonth

* Form
  * `{timestampExpression}.getDayOfMonth()`
* Arguments
  * `timestampExpression` (required): a timestamp-valued expression.  Timestamp-valued fields may be represented in the data as either:
    * long integers (since 18.4.1), where the long integer represents Unix epoch time in milliseconds
    * strings in ISO 8601 offset format: e.g. "2011-12-03T10:15:30+01:00" (since 18.6.1)
    * Java Timestamp objects, since 18.7.1
* Result
  * Integer: the integer value of the day-of-month in which the timestamp falls based on UTC time
* Examples
  * `select X from xEvent where X.timestamp.getDayOfMonth() <= 3`
    * This example selects profiles which have events which occurred within the first 3 days of some month.
  * `select X from xEvent where X.timestamp.getDayOfMonth() = currentDayOfMonth()`
    * This example selects profiles which have events which occurred on the same day-of-month as the current day-of-month

#### date

* Form
  * `date({yearAsInteger}, {monthAsInteger}, {dayOfMonthAsInteger})`
* Arguments
  * `yearAsInteger` (required): the year specified as an integer
  * `monthAsInteger` (required): month specified as an integer between 1 and 12
  * `dayOfMonthAsInteger` (required): day of the month specified as an integer between 1 and 31
* Result
  * Date: The date represented by the given parameters interpreted as a time interval in UTC time
* Example
  * `select X from xEvent where X.timestamp occurs on date(2017, 10, 1)`
    * This example selects profiles which have events which occurred on the 1st of October, 2017
  * `select X from xEvent where X.timestamp occurs on date(currentYear() - 1, 10, 1)`
    * This example selects profiles which have events which occurred on the 1st of October last year

### String functions

The following describes functions that are available for comparing string literals.

#### like

* Form
  * `{string1} like {string2}`
* Arguments
  * `string1` (required): the string to perform the check on
  * `string2` (required): the expression to match against the first string
* Result
  * Boolean: `true` if: 
    * both strings are not null, and
    * the first string matches the second according to the normal rules of SQL like operator

There are two special characters which can be used in the second argument:

* `%` - The percent sign represents zero, one, or multiple characters
* `_` - The underscore represents a single character

* Examples
  * `person.firstName like "John%"`
    * Matches "John", "Johnny" but not "UpJohn"
  * `person.firstName matches "%John"`
    * Matches "John" and "UpJohn" but not "Johnny"
  * `person.firstName matches "J_hn"`
    * Matches "John" and "Jahn" but not "UpJohn" or "Johnny" 

#### startsWith

* Form
  * `{string1}.startsWith({string2})`
  * `{string1}.startsWith({string2}, {boolean})`
* Arguments
  * `string1` (required): the string to perform the check on
  * `string2` (required): the string to search for within the first string
  * `boolean` (optional - default `true` if not specified) : if `true` or not specified, the check will be case sensitive, if `false`, the check will be case insensitive
* Result
  * Boolean: `true` if both strings are not null and the first string starts with the second, `false` otherwise
* Examples
  * `workEmail.address.startsWith("joe")`
    * `true` where `workEmail.address` = "joe.lean@work.com"
    * `false` where `workEmail.address` = "JOE.lean@work.com"
  * `workEmail.address.startsWith("joe", true)`
    * `true` where `workEmail.address` = "joe.lean@work.com"
    * `false` where `workEmail.address` = "JOE.lean@work.com"
  * `workEmail.address.startsWith("joe", false)`
    * `true` where `workEmail.address` = "joe.lean@work.com"
    * `true` where `workEmail.address` = "JOE.lean@work.com"

#### doesNotStartWith

* Form
  * `{string1}.doesNotStartWith({string2})`
  * `{string1}.doesNotStartWith({string2}, {boolean})`
* Arguments - same as [`startsWith`](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string `does not` start with the second, `false` otherwise
* Examples
  * `workEmail.address.doesNotStartWith("joe")`
    * `false` where `workEmail.address` = "joe.lean@work.com"
    * `true` where `workEmail.address` = "JOE.lean@work.com"
  * `workEmail.address.doesNotStartWith("joe", true)`
    * `false` where `workEmail.address` = "joe.lean@work.com"
    * `true` where `workEmail.address` = "JOE.lean@work.com"
  * `workEmail.address.doesNotStartWith("joe", false)`
    * `false` where `workEmail.address` = "joe.lean@work.com"
    * `false` where `workEmail.address` = "JOE.lean@work.com"

#### endsWith

* Form
  * `{string1}.endsWith({string2})`
  * `{string1}.endsWith({string2}, {boolean})`
* Arguments - same as [`startsWith`](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string ends with the second, `false` otherwise
* Examples
  * `workEmail.address.endsWith(".edu")`
    * `true` where `workEmail.address` = "joe.lean@work.edu"
    * `false` where `workEmail.address` = "joe.lean@work.EDU"
  * `workEmail.address.endsWith(".edu", true)`
    * `true` where `workEmail.address` = "joe.lean@work.edu"
    * `false` where `workEmail.address` = "joe.lean@work.EDU"
  * `workEmail.address.endsWith(".edu", false)`
    * `true` where `workEmail.address` = "joe.lean@work.edu"
    * `true` where `workEmail.address` = "joe.lean@work.EDU"

#### doesNotEndWith

* Form
  * `{string1}.doesNotEndWith({string2})
  * `{string1}.doesNotEndWith({string2}, {boolean})`
* Arguments - same as [`startsWith`](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string `does not` end with the second, `false` otherwise
* Examples
  * `workEmail.address.doesNotEndWith(".edu")`
    * `false` where `workEmail.address` = "joe.lean@work.edu"
    * `true` where `workEmail.address` = "joe.lean@work.EDU"
  * `workEmail.address.doesNotEndWith(".edu", true)`
    * `false` where `workEmail.address` = "joe.lean@work.edu"
    * `true` where `workEmail.address` = "joe.lean@work.EDU"
  * `workEmail.address.doesNotEndWith(".edu", false)`
    * `false` where `workEmail.address` = "joe.lean@work.edu"
    * `false` where `workEmail.address` = "joe.lean@work.EDU"

#### contains

* Form
  * `{string1}.contains({string2})`
  * `{string1}.contains({string2}, {boolean})`
* Arguments - same as [`startsWith`](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string contains the second, `false` otherwise
* Examples
  * `workEmail.address.contains("yahoo")`
    * `true` where `workEmail.address` = "joe.lean@yahoo.com"
    * `false` where `workEmail.address` = "joe.lean@YAHOO.com"
  * `workEmail.address.contains("yahoo", true)`
    * `true` where `workEmail.address` = "joe.lean@yahoo.com"
    * `false` where `workEmail.address` = "joe.lean@YAHOO.com"
  * `workEmail.address.contains("yahoo", false)`
    * `true` where `workEmail.address` = "joe.lean@yahoo.com"
    * `true` where `workEmail.address` = "joe.lean@YAHOO.com"

#### doesNotContain

* Form
  * `string1`.doesNotContain(`string2`)
  * `string1`.doesNotContain(`string2`, `boolean`)
* Arguments - same as [`startsWith`](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string `does not` contain the second, `false` otherwise
* Examples
  * `workEmail.address.doesNotContain("yahoo")`
    * `false` where `workEmail.address` = "joe.lean@yahoo.com"
    * `true` where `workEmail.address` = "joe.lean@YAHOO.com"
  * `workEmail.address.doesNotContain("yahoo", true)`
    * `false` where `workEmail.address` = "joe.lean@yahoo.com"
    * `true` where `workEmail.address` = "joe.lean@YAHOO.com"
  * `workEmail.address.doesNotContain("yahoo", false)`
    * `false` where `workEmail.address` = "joe.lean@yahoo.com"
    * `false` where `workEmail.address` = "joe.lean@YAHOO.com"

#### equals

* Form
  * `{string1}.equals({string2})`
  * `{string1}.equals({string2}, {boolean})`
* Arguments - same as [`startsWith`](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string equals the second, `false` otherwise
* Examples
  * `firstName.equals("John")`
    * `true` where `firstName` = "John"
    * `false` where `firstName` = "john"
  * `firstName.equals("John", true)`
    * `true` where `firstName` = "John"
    * `false` where `firstName` = "john"
  * `firstName.equals("John", false)`
    * `false` where `firstName` = "Johnny"
    * `true` where `firstName` = "John"
    * `true` where `firstName` = "john"

#### notEqualTo

* Form
  * `string1`.notEqualTo(`string2`)
  * `string1`.notEqualTo(`string2`, `boolean`)
* Arguments - same as [`startsWith`](#startsWith)
* Result
  * Boolean: `true` if both strings are not null and the first string __does not__ equal the second, `false` otherwise
* Examples
  * `firstName.notEqualTo("John")`
    * `false` where `firstName` = "John"
    * `true` where `firstName` = "john"
  * `firstName.notEqualTo("John", true)`
    * `false` where `firstName` = "John"
    * `true` where `firstName` = "john"
  * `firstName.notEqualTo("John", false)`
    * `true` where `firstName` = "Johnny"
    * `false` where `firstName` = "John"
    * `false` where `firstName` = "john"

#### matches

* Form
  * `{string1} matches {string2}`
* Arguments
  * `string1` (required): the string to perform the check on
  * `string2` (required): the regular expression to match against the first string.
* Result
  * Boolean: `true` if both strings are not null and the first string matches the second according to the normal rules of regular expression matching
* Examples
  * `firstName matches "John"`
    * `true` where `firstName` = "John"
    * `true` where `firstName` = "JOHN"
    * `true` where `firstName` = "Johnny"
    * `true` where `firstName` = "UpJohn"
  * `person.firstName matches "(?i)john"` (the inclusion of "(?i)" at the start of the regular expression specifies case insensitive matching)
    * `true` where `firstName` = "John"
    * `true` where `firstName` = "JOHN"
    * `false` where `firstName` = "Johnny"
    * `false` where `firstName` = "UpJohn"
  * `person.firstName matches "^John"`
    * `true` where `firstName` = "John"
    * `false` where `firstName` = "JOHN"
    * `true` where `firstName` = "Johnny"
    * `false` where `firstName` = "UpJohn"
  * `person.firstName matches "John$"`
    * `true` where `firstName` = "John"
    * `false` where `firstName` = "JOHN"
    * `false` where `firstName` = "Johnny"
    * `true` where `firstName` = "UpJohn"
  * `person.firstName matches "J.hn"`
    * `true` where `firstName` = "John"
    * `false` where `firstName` = "JOHN"
    * `true` where `firstName` = "Johnny"
    * `true` where `firstName` = "UpJohn"
    * `true` where `firstName` = "Jahn"
  * `person.firstName matches "^J.*n$"`
    * `true` where `firstName` = "John"
    * `false` where `firstName` = "JOHN"
    * `true` where `firstName` = "Jonathan"
    * `false` where `firstName` = "Johnny"
    * `false` where `firstName` = "UpJohn"
    * `true` where `firstName` = "Jahn"


#### Notes on String functions

* The String parameters to the above functions can be any String-valued PQL expressions, including string literals and string-valued XDM property references. As such, these functions can be used to compare an XDM string property to a fixed value, or to compare two XDM string properties
* The negative versions are not precisely the negations of the corresponding positive versions, due to how null values are treated.  For instance, an XDM property reference which turns out to be undefined during evaluation will return false for both `contains` and `doesNotContain`
* `equals` and `notEqualTo` are added as string-specific functions in order to support the case sensitivity switch parameter.  `=` and `!=` are maintained in PQL as before for use on any type, and imply case sensitivity when used on strings

### Arithmetic Functions

#### + (addition)

* Form
  * `{numericExpression1} + {numericExpression2}`
* Arguments
  * `numericExpression1` (required):  A literal value or expression which resolves as a number
  * `numericExpression2` (required):  A literal value or expression which resolves as a number
* Result
  * Numeric: the sum of the values of the two argument expressions
* Examples
  * __select X from xEvent where X.commerce.checkouts.value + X.commerce.cartAbandons.value > 1__

#### * (multiplication)

* Form
  * `{numericExpression1} * {numericExpression2}`
* Arguments
  * `numericExpression1` (required):  A literal value or expression which resolves as a number
  * `numericExpression2` (required):  A literal value or expression which resolves as a number
* Result
  * Numeric: the product of the values of the two argument expressions
* Examples
  * `select X from xEvent where X.commerce.checkouts.value * X.commerce.cartAbandons.value > 1`

#### - (subtraction)

* Form
  `{numericExpression1} - {numericExpression2}`
* Arguments
  * `numericExpression1` (required):  A literal value or expression which resolves as a number
  * `numericExpression2` (required):  A literal value or expression which resolves as a number
* Result
  * Numeric: the result of subtracting the value of the second argument expression from the value of the first
* Examples
  * `select X from xEvent where X.commerce.checkouts.value - X.commerce.cartAbandons.value > 1`

#### / (division)

* Form
  * `{numericExpression1} / {numericExpression2}`
* Arguments
  * `numericExpression1` (required):  A literal value or expression which resolves as a number
  * `numericExpression2` (required):  A literal value or expression which resolves as a number
* Result
  * Numeric: the result of dividing the value of the first argument expression by the value of the second.  If the value of the second expression is 0, null is returned.  In PQL execution, null values propagate upwards in the expression tree, until a boolean position is reached, at which point the null value is cast to false.  So, for example, the expression `intField1/intField2 > 5` would evaluate to false if `intField2` had value 0 on the profile in question.
* Examples
  * `select X from xEvent where X.commerce.checkouts.value / X.commerce.cartAbandons.value > 1`

<!-- ### Aggregation Functions

#### sum

Full form: 

* Form
  * `sum {numericExpression} over {V1} from {arrayExpr1} where {booleanCondition1},  {V2} from {arrayExpr2} where {booleanCondition2}, ....`
* Arguments
  * `numericExpression` (required): the numeric expression which will be applied to each matching item, with the results being summed.  The numeric expression can reference the variables `V1`, `V2`, ... used in the expression
  * `V1` from `arrayExpr1` where `booleanCondition1`: A variable declaration, which consists of a variable name, `V1`, an array-valued expression `arrayExpr1` and a boolean condition `booleanCondition1` which is used to filter the values of the array expression prior to applying the numeric expression.  Each boolean condition can reference its own declaring variable and any variables defined to the left in the expression (e.g. `booleanCondition1` can reference `V1` while `booleanCondition2`, if present, can reference both `V1` and `V2`).  There may be multiple variable declarations within one `sum` expression. 
  
Taking the following for example: `sum X.commerce.order.priceTotal over X from xEvent where X.commerce.order.currencyCode = "USD"`

* Single variable (normal case): `X`
* `numericExpression` is `X.commerce.order.priceTotal`. The numeric expression is expected to reference whatever variables are used, in this case `X`
* `arrayExpr1` is `xEvent`, which references the array of experience events linked to the current profile
* `booleanCondition1` is `X.commerce.order.currencyCode = "USD"`. This filters down the experience events of interest to just those which are orders with currencyCode = "USD"

Simpler forms: 

* The `where` clause on each variable is optional. For example: `sum X.commerce.order.priceTotal over X from xEvent`
* If there is a single variable, and `arrayExpr` returns an array of simple numeric values, `numericExpression` can be omitted, with the array values being summed directly. E.g. `sum X from integerArray where X > 0`

Result:

A single numeric value, which is the sum of the results of applying the `numericExpression` to each matching set of variables `V1`, `V2`, ... in turn.

If `numericExpression` references a property which does not exist on the value of a variable (e.g. if `X.commerce.order.priceTotal` is applied to a value for `X` which does not have a `commerce` property), that particular tuple of variable values is omitted prior to the sum being applied.

If there are no matching sets of variables, the return value is 0.

Examples: 

* `(sum X.commerce.order.priceTotal over X from xEvent where X.commerce.order.currencyCode = "USD") > 1000`
  * Illustrates applying a comparison operator to the result of `sum`
* `(sum X.metrics.commerce.productViews + X.metrics.commerce.purchases over X from xEvent) > 3`
  * Illustrates using an arithmetic operator within the numeric expression
* `(sum X.commerce.order.priceTotal + Y.commerce.order.priceTotal over X from xEvent where X.commerce.order, Y from xEvent where Y.commerce.order and Y.timestamp occurs < 2 weeks after X.timestamp) > 1000`
  * Illustrates using two variables within a sum expression
  
#### average

* Form
  * `average <numericExpression> over <V1> from <arrayExpr1> where <booleanCondition1>,  <V2> from <arrayExpr2> where <booleanCondition2>, ....`
    * Note the syntax of `average` is exactly the same as that of sum (including the simpler forms).  See the section on [`sum`](#sum) for details
    * Likewise, the semantics is also the same as that of `sum` except that:
      * The average of the numerical values is returned, rather than the sum
      * If there are no matching sets of variables, null is returned.  In PQL execution, null values propagate upwards in the expression tree, until a boolean position is reached, at which point the null value is cast to false
      
#### min

* Form
  * `min <numericExpression> over <V1> from <arrayExpr1> where <booleanCondition1>,  <V2> from <arrayExpr2> where <booleanCondition2>, ....`
    * Note the syntax of `min` is exactly the same as that of `sum` (including the simpler forms).  See the section on [`sum`](#sum) for details
    * Likewise, the semantics is also the same as that of `sum` except that:
      * The minimum of the numerical values is returned, rather than the sum
      * If there are no matching sets of variables, null is returned.  In PQL execution, null values propagate upwards in the expression tree, until a boolean position is reached, at which point the null value is cast to false.

#### max

* Form
  * `max <numericExpression> over <V1> from <arrayExpr1> where <booleanCondition1>,  <V2> from <arrayExpr2> where <booleanCondition2>, ....`
    * Note the syntax of `max` is exactly the same as that of `sum` (including the simpler forms).  See the section on [`sum`](#sum) for details
    * Likewise, the semantics is also the same as that of `sum` except that:
      * The maximum of the numerical values is returned, rather than the sum
      * If there are no matching sets of variables, null is returned.  In PQL execution, null values propagate upwards in the expression tree, until a boolean position is reached, at which point the null value is cast to false.

#### List Functions

The following describes functions that are available for comparing values with a list of literals.

#### in

* Form
  * `{string} in {list of strings}`
  * `{integer} in {list of integers}`
  * `{double} in {list of doubles}}`
* Arguments
  * `string` (required): where the first parameter is a string, the second parameter is a list of strings which could be a [list literal](#list-literal) or a string array property of an entity which could be referenced using dot-notation. This function is case-sensitive and has no override allowing for case insensitivity
  * `integer` (required): where the first parameter is an integer, the second parameter is a list of integers which could be a [list literal](#list-literal) or an integer array property of an entity which could be referenced using dot-notation 
  * `double` (required): where the first parameter is a double, the second parameter is a list of doubles which could be a [list literal](#list-literal) or a double array property of an entity which could be referenced using dot-notation 
* Result
  * Boolean: `true` only if both of the following are true:
     * both values are not null
     * the first value is a member of the second value
* Examples
  * `homeAddress.stateProvinceISO in ["CA", "OR"]`
    * `true` where `homeAddress.stateProvinceISO` = "OR"
    * `false` where `homeAddress.stateProvinceISO` = "or"
  * `birthMonth in [3, 4, 6]` (note: birthMonth is referenced here as a hypothetical custom integer field of an XDM Individual Profile)
    * `true` where `birthMonth` = March
    * `false` where `birthMonth` = May
  * `"London" in citiesVisited` (note: citiesVisited is referenced here as a hypothetical custom string array field of an XDM Individual Profile)
    * `true` where `person.citiesVisited` = ["London","Paris","New York"]
    * `false` where `person.citiesVisited` = ["london","paris","new york"]
  * `homeAddress.city in person.favoriteCities`  (note: favoriteCities is referenced here as a hypothetical custom string array field of an XDM Person)

#### notIn

* Form
  * `{string} notIn {list of strings}`
  * `{integer} notIn {list of integers}`
  * `{double} notIn {list of doubles}`
* Arguments
  * `string` (required): where the first parameter is a string, the second parameter is a list of strings which could be a [list literal](#list-literal) or a string array property of an entity which could be referenced using dot-notation. This function is case-sensitive and has no override allowing for case insensitivity
  * `integer` (required): where the first parameter is an integer, the second parameter is a list of integers which could be a [list literal](#list-literal) or an integer array property of an entity which could be referenced using dot-notation
  * `double` (required): where the first parameter is a double, the second parameter is a list of doubles which could be a [list literal](#list-literal) or a double array property of an entity which could be referenced using dot-notation
* Result
  * Boolean: `true` only if both of the following are true:
     * both values are not null <!-- QUESTION: documentation states: "Note: Due to condition a) above, notIn is not the exact negation of in" though condition a is the same for both in and notIn -->
<!--     
     * the first value does not occur in the list of values represented by the second parameter
* Examples
  * `homeAddress.stateProvinceISO notIn ["CA", "OR"]`
    * `true` where `homeAddress.stateProvinceISO` = "or"
    * `false` where `homeAddress.stateProvinceISO` = "OR"
  * `birthMonth notIn [3, 4, 6]` (note: birthMonth is referenced here as a hypothetical custom integer field of an XDM Individual Profile)
    * `true` where `birthMonth` = 5
    * `false` where `birthMonth` = 3

#### intersects

Determine if two lists have one or more intersections.

* Form
  * `{list1}.intersects({list2})`
* Arguments
  * `list1` (required): An expression which evaluates to a list/array or a list literal
  * `list2` (required): An expression which evaluates to a list/array or a list literal
* Result
  * Boolean: `true` only if both of the following are true:
    * both arguments evaluate to values which are are not null and are lists or arrays
    * the values have at least one item in common
* Examples
  *  `person.favoriteColors.intersects(["red", "blue", "green"])` (note: favoriteColors is referenced here as a hypothetical custom list field of an XDM Person)
    * `true` where `person.favoriteColors` = ["orange", "blue", "brown"] 
    * `false` where `person.favoriteColors` = ["yellow", "violet"] 
  * `not(person.citiesVisited.intersects(person.favoriteCities))`

#### intersection

* Form
  * `{list1}.intersection({list2})`
* Arguments
  * `list1` (required): An expression which evaluates to a list/array or a list literal
  * `list2` (required): An expression which evaluates to a list/array or a list literal
* Result
  * List: list of values found in common among both list arguments, or null if there are no intersections detected
* Examples
  * `person.favoriteColors.intersection(["red", "blue", "green"])`  (note: favoriteColors is referenced here as a hypothetical custom list field of an XDM Person)
    * `["blue"]` where `person.favoriteColors` = ["orange", "blue", "brown"] 
    * `null` where `person.favoriteColors` = ["yellow", "violet"] 
  * `person.citiesVisited.intersection(person.favoriteCities)` -->

## Language examples

The following are examples of PQL intended to illustrate the structure and capabilities of the language.

### Example 1: Operates purely on CRM data

Where a statement is based purely CRM data, the root entity `user` is implied and must be omitted from the dot-notation field paths in the statement.

```
countryISO = "US" and
stateProvinceISO = "CA" and
ageBetween25And35 = "Y"
```

### Example 2: Operates on both CRM data and ExperienceEvent (touchpoint) data

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

### Example 3: Operation on a Set

The following example shows that PQL can support arbitrary combinations of conjunctions and disjunctions. PQL supports the use of parentheses to enable these combinations.

```
(select X from xEvent where X.type = "FLIGHT").homeAddress.countryISO = "US"
and
(select X from xEvent where X.type = "LOST_BAG").stateProvinceISO = “CA" 
```
