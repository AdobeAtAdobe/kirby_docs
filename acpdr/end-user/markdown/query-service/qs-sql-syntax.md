
# SQL Syntax

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
