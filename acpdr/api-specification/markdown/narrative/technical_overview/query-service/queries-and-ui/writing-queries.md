# General guidance for writing queries

Refer to this document for the general [SQL Syntax](../sql/syntax.md).

## Working with schema fields and objects

Most often, the field you want to use in your query is nested within an object of the schema. To access the field, you can use either dot-notation (`.`) or bracket-notation (`[]`). The following SQL statement uses dot-notation to traverse the `endUserIds` object down to the `mcid` object.

  ```sql
  SELECT endUserIds._experience.mcid
  FROM {analytics_table_name}
  WHERE endUserIds._experience.mcid IS NOT NULL
  LIMIT 1
  ```
  - `{analytics_table_name}`: The name of your analytics table. 

The following SQL statement uses bracket-notation to traverse the `endUserIds` object down to the `mcid` object. 
 
  ```sql
  SELECT endUserIds['_experience']['mcid']
  FROM {analytics_table_name}
  WHERE endUserIds._experience.mcid IS NOT NULL
  LIMIT 1
  ```
- `{analytics_table_name}`: The name of your analytics table. 

Notice both return the same result, a flattened object rather than a single value:

```
              endUserIds._experience.mcid   
--------------------------------------------------------
 (48168239533518554367684086979667672499,"(ECID)",true)
(1 row)
```

The `endUserIds._experience.mcid` object contains these parameters:

- `id`
- `namespace`
- `primary`

When the column is only declared down to the object, it returns the entire object as a string. The XDM schema is more complex than what you might have had experience with before because multiple solutions, channels, and use cases must be accounted for.  To view only the ID value, use:

```sql
SELECT endUserIds._experience.mcid.id
FROM {analytics_table_name}
WHERE endUserIds._experience.mcid IS NOT NULL
LIMIT 1
```

``` 
     endUserIds._experience.mcid.id 
----------------------------------------
 48168239533518554367684086979667672499
(1 row)
```

## When to use single quotes, double quotes, and back quotes

This section explains when to use single quotes, double quotes, and back quotes in queries. 

### Single quotes

Use the single quote (`'`) to create text strings. It can be used in the `SELECT` statement to return a static text value in the result, and in the `WHERE` clause to evaluate the content of a column.

Declare a static text value for a column:
```sql
SELECT 
  'datasetA',
  timestamp,
  web.webPageDetails.name
FROM {analytics_table_name}
LIMIT 10
```

Return events for a specific page:
```sql
SELECT 
  timestamp,
  endUserIds._experience.mcid.id
FROM {analytics_table_name}
WHERE web.webPageDetails.name = 'homepage'
LIMIT 10
```

### Double quotes

Use the double quote (`"`) to declare an identifier with spaces.

```sql
SELECT
  no_space_column,
  "space column"
FROM
( SELECT 
    'column1' as no_space_column,
    'column2' as "space column"
)
```

>**Note**: Double quotes **cannot** be used with dot-notation field access. 

### Back quotes

Use the back quote `` ` `` to escape reserved column names when using the dot-notation syntax. For example, `order` is a reserved word in SQL and the back quote needs to be used to access `commerce.order`:

```sql
SELECT 
  commerce.`order`
FROM {analytics_table_name}
LIMIT 10
```

The back quotes are not needed if you are using bracket-notation.
```sql
SELECT
  commerce['order']
FROM {analytics_table_name}
LIMIT 10
```

In addition, back quotes are necessary if accessing a field that starts with a number. For example, to access the field `30_day_value`, you would need to use the back quote notation.

```SQL
SELECT
    commerce.`30_day_value`
FROM {analytics_table_name}
LIMIT 10
```

## Query execution models

Query Service has two models of query execution: 

* **Interactive:** Used for query development and report generation in BI tools
* **Non-interactive:** Used for larger jobs and operational queries as a part of a data processing workflow 

### Interactive query execution

Queries submitted through the Query Service UI or through a connected client using the information in the credentials tab are executed interactively. This means that there is an active session between the client and Query Service, and that the client blocks until a submitted query returns or times out. Interactive query execution has the following limitations:

| Parameter       | Limitation  | 
| ------------- |:-------------:|
| Query timeout | 10 minutes |
| Maximum rows returned | 50,000 |
| Maximum concurrent queries | 5 |

> **Note:** To override the maximum rows limitation, include `LIMIT 0` in your query. Query timeout of 10 minutes still applies. 

Results of interactive queries are returned to the client and are not persisted unless `CREATE TABLE AS SELECT` syntax is used to persist the results as a dataset in Experience Platform. 

### Non-interactive query execution

Queries submitted through the Query Service API are run non-interactively. For more information, please read the [API reference](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/qs-api.yaml).

Non-interactive execution means that Query Service receives the API call and executes the query in the order it is received. Non-interactive queries always result in either the generation of a new dataset in Experience Platform to receive the results, or the insertion of new rows into an existing dataset. 
