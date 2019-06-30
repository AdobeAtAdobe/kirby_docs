# General guidance for writing queries

Refer to this document for the general [SQL Syntax](qs-sql-syntax.md)

## Working with Schema fields and objects

Most often the field you will want to use in your query will be nested within an object of the schema. To access the field you can use either dot-notation `.` or bracket-notation `[]`. The following SQL statement uses dot-notation to traverse the endUserIds object down to the mcid object.

  ```sql
  SELECT endUserIds._experience.mcid
  FROM {analytics_table_name}
  WHERE endUserIds._experience.mcid IS NOT NULL
  LIMIT 1
  ```
  * `{analytics_table_name}`: The name of your analytics table. 

This next SQL statement uses bracket-notation to traverse the endUserIds object down to the mcid object. 
 
  ```sql
  SELECT endUserIds['_experience']['mcid']
  FROM {analytics_table_name}
  WHERE endUserIds._experience.mcid IS NOT NULL
  LIMIT 1
  ```
* `{analytics_table_name}`: The name of your analytics table. 

Notice both returned the same result, a flattened object rather than a single value:

```
              endUserIds._experience.mcid   
--------------------------------------------------------
 (48168239533518554367684086979667672499,"(ECID)",true)
(1 row)
```

The `endUserIds._experience.mcid` object contains these three parameters:

* `id`
* `namespace`
* `primary`

When the column is only declared down to the object, it returns the entire object as a string. The XDM schema is more complex than what you might have had experience with before because multiple solutions, channels, and use-cases need to be accounted for.  To view only the ID value, use:
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

## Single quotes, double quotes, back quote and when to use them

This section explains when to use single quotes, double quotes, and back quotes in queries. 

The single quote `'` is used to create text strings. It can be used in the SELECT statement to return a static text value in the result and in the WHERE clause to evaluate the content of a column.

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

The double quote `"` is used to declare an identifier with spaces.

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

The back quote `` ` `` is used to escape reserved column names when using the dot-notation syntax. For example, `order` is a reserve in SQL and the back quote needs to be used to access `commerce.order`:

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
