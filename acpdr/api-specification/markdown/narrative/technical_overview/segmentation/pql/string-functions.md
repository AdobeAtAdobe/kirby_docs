# String functions

Profile Query Language (PQL) offers functions to make interaction with strings simpler. More information about other PQL functions can be found in the [Profile Query Language overview](../profile_query_language.md).

This document provides details for the following functions:

- [Like](#like)
- [Starts with](#starts-with)
- [Does not start with](#does-not-start-with)
- [Ends with](#ends-with)
- [Does not end with](#does-not-end-with)
- [Contains](#contains)
- [Does not contain](#does-not-contain)
- [Equals](#equals)
- [Not equal to](#not-equal-to)
- [Matches](#matches)
- [Regular expression group](#regular-expression-group)

## Like

The `like` function is used to determine if a string matches a specified pattern.

#### Format

```sql
{STRING_1} like {STRING_2}
```

| Argument | Description |
| --------- | ----------- |
| `{STRING_1}` | The string to perform the check on. |
| `{STRING_2}` | The expression to match against the first string. There are two supported special characters for creating an expression: `%` and `_`. <ul><li>`%` is used to represent zero or more characters.<li>`_` is used to represent exactly one character.</ul>

#### Example

The following PQL query retrieves all the cities containing the pattern "es".

```sql
city like "%es%"
```

## Starts with

The `startsWith` function is used to determine if a string starts with a specified substring.

#### Format

```sql
{STRING_1}.startsWith({STRING_2}, {BOOLEAN})
```

| Argument | Description |
| --------- | ----------- |
| `{STRING_1}` | The string to perform the check on. |
| `{STRING_2}` | The string to search for within the first string. |
| `{BOOLEAN}` | An optional parameter to determine if the check is case sensitive. By default, this is set to true. |

#### Example

The following PQL query determines, with case sensitivity, if the person's name starts with "Joe".

```sql
person.name.startsWith("Joe")
```

## Does not start with

The `doesNotStartWith` function is used to determine if a string does not start with a specified substring.

#### Format

```sql
{STRING_1}.doesNotStartWith({STRING_2}, {BOOLEAN})
```

| Argument | Description |
| --------- | ----------- |
| `{STRING_1}` | The string to perform the check on. |
| `{STRING_2}` | The string to search for within the first string. |
| `{BOOLEAN}` | An optional parameter to determine if the check is case sensitive. By default, this is set to true. |

#### Example

The following PQL query determines, with case sensitivity, if the person's name does not start with "Joe".

```sql
person.name.doesNotStartWith("Joe")
```

## Ends with

The `endsWith` function is used to determine if a string ends with a specified substring.

#### Format

```sql
{STRING_1}.endsWith({STRING_2}, {BOOLEAN})
```

| Argument | Description |
| --------- | ----------- |
| `{STRING_1}` | The string to perform the check on. |
| `{STRING_2}` | The string to search for within the first string. |
| `{BOOLEAN}` | An optional parameter to determine if the check is case sensitive. By default, this is set to true. |

#### Example

The following PQL query determines, with case sensitivity, if the person's email address ends with ".com".

```sql
person.emailAddress.endsWith(".com")
```

## Does not end with

The `doesNotEndWith` function is used to determine if a string does not end with a specified substring.

#### Format

```sql
{STRING_1}.doesNotEndWith({STRING_2}, {BOOLEAN})
```

| Argument | Description |
| --------- | ----------- |
| `{STRING_1}` | The string to perform the check on. |
| `{STRING_2}` | The string to search for within the first string. |
| `{BOOLEAN}` | An optional parameter to determine if the check is case sensitive. By default, this is set to true. |

#### Example

The following PQL query determines, with case sensitivity, if the person's email address does not end with ".com".

```sql
person.emailAddress.doesNotEndWith(".com")
```

## Contains

The `contains` function is used to determine if a string contains a specified substring.

#### Format

```sql
{STRING_1}.contains({STRING_2}, {BOOLEAN})
```

| Argument | Description |
| --------- | ----------- |
| `{STRING_1}` | The string to perform the check on. |
| `{STRING_2}` | The string to search for within the first string. |
| `{BOOLEAN}` | An optional parameter to determine if the check is case sensitive. By default, this is set to true. |

#### Example

The following PQL query determines, with case sensitivity, if the person's email address contains the string "2010@gm".

```sql
person.emailAddress.contains("2010@gm")
```

## Does not contain

The `doesNotContain` function is used to determine if a string does not contain a specified substring.

#### Format

```sql
{STRING_1}.doesNotContain({STRING_2}, {BOOLEAN})
```

| Argument | Description |
| --------- | ----------- |
| `{STRING_1}` | The string to perform the check on. |
| `{STRING_2}` | The string to search for within the first string. |
| `{BOOLEAN}` | An optional parameter to determine if the check is case sensitive. By default, this is set to true. |

#### Example

The following PQL query determines, with case sensitivity, if the person's email address does not contain the string "2010@gm".

```sql
person.emailAddress.doesNotContain("2010@gm")
```

## Equals

The `equals` function is used to determine if a string is equal to the specified string.

#### Format

```sql
{STRING_1}.equals({STRING_2})
```

| Argument | Description |
| --------- | ----------- |
| `{STRING_1}` | The string to perform the check on. |
| `{STRING_2}` | The string to compare with the first string. |

#### Example

The following PQL query determines, with case sensitivity, if the person's name is "John".

```sql
person.name.equals("John")
```

## Not equal to

The `notEqualTo` function is used to determine if a string is not equal to the specified string.

#### Format

```sql
{STRING_1}.notEqualTo({STRING_2})
```

| Argument | Description |
| --------- | ----------- |
| `{STRING_1}` | The string to perform the check on. |
| `{STRING_2}` | The string to compare with the first string. |

#### Example

The following PQL query determines, with case sensitivity, if the person's name is not "John".

```sql
person.name.notEqualTo("John")
```

## Matches

The `matches` function is used to determine if a string matches a specific regular expression. Please refer to [this document](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html) for more information on matching patterns in regular expressions.

#### Format

```sql
{STRING_1}.matches(STRING_2})
```

#### Example

The following PQL query determines, without being case sensitive, if the person's name starts with "John".

```sql
person.name.matches("(?i)^John")
```

## Regular expression group

The `regexGroup` function is used to extract specific information, based on the regular expression provided.

#### Format

```sql
{STRING}.regexGroup({EXPRESSION})
```

#### Example

The following PQL query is used to extract the domain name from an email address.

```sql
emailAddress.regexGroup("@(\w+)", 1)
```

## Next steps

Now that you have learned about string functions, you can use them within your PQL queries. For more information about other PQL functions, please read the [Profile Query Language overview](../profile_query_language.md).