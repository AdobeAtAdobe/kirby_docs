# Comparison functions

Comparison functions are used to compare between different expressions and values, returning `true` or `false` accordingly. More information about other PQL functions can be found in the [Profile Query Language overview](../profile_query_language.md).

This document provides details for the following Profile Query Language (PQL) comparison functions: 

- [Equals](#equals)
- [Not equal](#not-equal)
- [Greater than](#greater-than)
- [Greater than or equal to](#greater-than-or-equal-to)
- [Less than](#less-than)
- [Less than or equal to](#less-than-or-equal-to)

## Equals

The `=` (equals) function checks whether one value or expression is equal to another value or expression.

#### Form

```sql
{EXPRESSION} = {VALUE}
```

#### Example

The following PQL query checks if the home address country is in Canada.

```sql
homeAddress.countryISO = "CA"
```

## Not equal

The `!=` (not equal) function checks whether one value or expression is **not** equal to another value or expression.

#### Form

```sql
{EXPRESSION} != {VALUE}
```

#### Example

The following PQL query checks if the home address country is not in Canada.

```sql
homeAddress.countryISO != "CA"
```

## Greater than

The `>` (greater than) function is used to check if the first value is greater than the second value.

#### Form

```sql
{EXPRESSION} > {EXPRESSION} 
```

#### Example

The following PQL query defines people whose birthdays do not fall in January or February.

```sql
person.birthMonth > 2
```

## Greater than or equal to

The `>=` (greater than or equal to) function is used to check if the first value is greater than or equal to the second value.

#### Form

```sql
{EXPRESSION} >= {EXPRESSION} 
```

#### Example

The following PQL query defines people whose birthdays do not fall in January or February.

```sql
person.birthMonth >= 3
```

## Less than

The `<` (less than) comparison function is used to check if the first value is less than the second value.

#### Form

```sql
{EXPRESSION} < {EXPRESSION} 
```

#### Example

The following PQL query defines people whose birthday is in January.

```sql
person.birthMonth < 2
```

## Less than or equal to

The `<=` (less than or equal to) comparison function is used to check if the first value is less than or equal to the second value.

#### Form

```sql
{EXPRESSION} <= {EXPRESSION} 
```

#### Example

The following PQL query defines people whose birthday is in January or February.

```sql
person.birthMonth <= 2
```

## Next steps

Now that you have learned about comparison functions, you can use them within your PQL queries. For more information about other PQL functions, please read the [Profile Query Language overview](../profile_query_language.md).