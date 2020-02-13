# Map functions

Profile Query Language (PQL) offers functions to make interaction with maps easier. More information about other PQL functions can be found in the [Profile Query Language overview](../profile_query_language.md).

This document provides details for the following functions:

- [Get](#get)
- [Keys](#keys)
- [Values](#values)

## Get

The `get` function is used to retrieve the value of a map for a given key.

#### Format

```sql
{MAP}.get({STRING})
```

#### Example

The following PQL query gets the value of the identity map for the key `example@example.com`.

```sql
identityMap.get("example@example.com")
```

## Keys

The `keys` function is used to retrieve all the keys for a given map.

#### Format

```sql
{MAP}.keys()
```

#### Example

The following PQL query gets all the keys for the map `identityMap`.

```sql
identityMap.keys()
```

## Values

The `values` function is used to retrieve all the values of a given map.

#### Format

```sql
{MAP}.values()
```

#### Example

The following PQL query gets all the values for the map `identityMap`.

```sql
identityMap.values()
```

## Next steps

Now that you have learned about map functions, you can use them within your PQL queries. For more information about other PQL functions, please read the [Profile Query Language overview](../profile_query_language.md).