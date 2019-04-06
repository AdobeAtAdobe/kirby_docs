
# SQL syntax

## Define a SELECT query

The following syntax defines a `SELECT` query supported by XDW Query Service:

```
\[ WITH with_query \[, ...\] \]
SELECT \[ ALL | DISTINCT \[ ON ( expression \[, ...\] ) \] \]
    \[ \* | expression \[ \[ AS \] output_name \] \[, ...\] \]
    \[ FROM from_item \[, ...\] \]
    \[ WHERE condition \]
    \[ GROUP BY grouping_element \[, ...\] \]
    \[ HAVING condition \[, ...\] \]
    \[ WINDOW window\_name AS ( window\_definition ) \[, ...\] \]
    \[ { UNION | INTERSECT | EXCEPT } \[ ALL | DISTINCT \] select \]
    \[ ORDER BY expression \[ ASC | DESC | USING operator \] \[ NULLS { FIRST | LAST } \] \[, ...\] \]
    \[ LIMIT { count | ALL } \]
    \[ OFFSET start \[ ROW | ROWS \] \]
    \[ FETCH { FIRST | NEXT } \[ count \] { ROW | ROWS } ONLY \]
```	

where `from_item` can be one of:

```
\[ ONLY \] table\_name \[ * \] \[ \[ AS \] alias \[ ( column\_alias \[, ...\] ) \] \]
    \[ LATERAL \] ( select ) \[ AS \] alias \[ ( column_alias \[, ...\] ) \]
    with\_query\_name \[ \[ AS \] alias \[ ( column_alias \[, ...\] ) \] \]
    from\_item \[ NATURAL \] join\_type from\_item \[ ON join\_condition | USING ( join_column \[, ...\] ) \]
```

and `grouping_element` can be one of:

```
( )
    expression
    ( expression \[, ...\] )
    ROLLUP ( { expression | ( expression \[, ...\] ) } \[, ...\] )
    CUBE ( { expression | ( expression \[, ...\] ) } \[, ...\] )
    GROUPING SETS ( grouping_element \[, ...\] )
```

and `with_query` is:

```
 with\_query\_name \[ ( column_name \[, ...\] ) \] AS ( select | values )
 
TABLE \[ ONLY \] table_name \[ * \]
```


## JOINS

`SELECT` query using joins has the following syntax:

```
SELECT statement
FROM statement
\[JOIN | INNER JOIN | LEFT JOIN | LEFT SEMI JOIN | LEFT OUTER JOIN | RIGHT JOIN | RIGHT OUTER JOIN | FULL JOIN | FULL OUTER JOIN\]
ON join condition
```


## UNION, INTERSECT, and EXCEPT

The `UNION`, `INTERSECT`, and `EXCEPT` clauses are supported to combine or exclude like rows from two or more tables:

```
SELECT statement 1
\[UNION | UNION ALL | UNION DISTINCT | INTERSECT | EXCEPT\]
SELECT statement 2
```
## CREATE TABLE AS SELECT

The following syntax defines a `CREATE TABLE AS SELECT (CTAS)` query supported by XDW Query Service:

```
CREATE TABLE table_name AS (select_query)
```

where select_query is a SELECT statement, syntax of which is defined above in this document.

Example:
```
CREATE TABLE Chairs AS (SELECT color, count(*) AS no_of_chairs FROM Inventory i WHERE i.type=="chair" GROUP BY i.color)
```
Please note that for a given CTAS query:

1. the SELECT statement MUST have alias for the aggregate functions such as COUNT, SUM, MIN, etc. 
2. the SELECT statement can be provided with or without parentheses().

## INSERT INTO

The following syntax defines a `INSERT INTO` query supported by XDW Query Service:

```
INSERT INTO table_name select_query
```

where select_query is a SELECT statement, syntax of which is defined above in this document.

Example:
```
INSERT INTO Customers SELECT SupplierName, City, Country FROM OnlineCustomers;
```
Please note that for a given INSERT INTO query:

1. the SELECT statement MUST NOT be enclosed in parentheses().
2. Schema of the result of SELECT statement must conform to that of the table defined in the INSERT INTO.

## Parameterised Query
1. Prepare Statement
```
PREPARE <plan name >[( comma-separated list of datatypes)] AS [query]
where query is any statement which may or maynot contains parameters ($1, $2, ...)
Eg. PREPARE temp AS select * from csv10000rows where id >= $1 and id <= $2;
 ```
 
2. Execute Statement
```
EXECUTE <plan name>[(list of actual values of parameters)]
Eg: EXECUTE  temp(10000, 10005);
```
 
3. Deallocate Statement
```
DEALLOCATE [PREAPRE ] <plan name> | ALL
Eg 1 : DEALLOCATE temp;
Eg 2 : DEALLOCATE PREPARE ALL;
```

