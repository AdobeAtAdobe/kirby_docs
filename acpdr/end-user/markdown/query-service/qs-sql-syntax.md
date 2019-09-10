
# SQL syntax

## Define a SELECT query

The following syntax defines a `SELECT` query supported by XDW Query Service:

```
[ WITH with_query [, ...] ]
SELECT [ ALL | DISTINCT [( expression [, ...] ) ] ]
    [ * | expression [ [ AS ] output_name ] [, ...] ]
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY grouping_element [, ...] ]
    [ HAVING condition [, ...] ]
    [ WINDOW window_name AS ( window_definition ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT | MINUS } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start ]
```

where `from_item` can be one of:

```
table_name [ * ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    [ LATERAL ] ( select ) [ AS ] alias [ ( column_alias [, ...] ) ]
    with_query_name [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    from_item [ NATURAL ] join_type from_item [ ON join_condition | USING ( join_column [, ...] ) ]
```

and `grouping_element` can be one of:

```
( )
    expression
    ( expression [, ...] )
    ROLLUP ( { expression | ( expression [, ...] ) } [, ...] )
    CUBE ( { expression | ( expression [, ...] ) } [, ...] )
    GROUPING SETS ( grouping_element [, ...] )
```

and `with_query` is:

```
 with_query_name [ ( column_name [, ...] ) ] AS ( select | values )
 
TABLE [ ONLY ] table_name [ * ]
```


## JOINS

`SELECT` query using joins has the following syntax:

```
SELECT statement
FROM statement
[JOIN | INNER JOIN | LEFT JOIN | LEFT OUTER JOIN | RIGHT JOIN | RIGHT OUTER JOIN | FULL JOIN | FULL OUTER JOIN]
ON join condition
```


## UNION, INTERSECT, and EXCEPT

The `UNION`, `INTERSECT`, and `EXCEPT` clauses are supported to combine or exclude like rows from two or more tables:

```
SELECT statement 1
[UNION | UNION ALL | UNION DISTINCT | INTERSECT | EXCEPT | MINUS]
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

## Spark SQL commands 

### DROP TABLE
Drop a table and delete the directory associated with the table from the file system if this is not an EXTERNAL table. If the table to drop does not exist, an exception is thrown.

```
DROP [TEMP] TABLE [IF EXISTS] [db_name.]table_name
```

Parameters
-  `IF EXISTS`: If the table does not exist, nothing happens
- `TEMP`: Temporary table 

### SET
Set a property, return the value of an existing property, or list all existing properties. If a value is provided for an existing property key, the old value will be overridden.

```
SET property_key [ To | =] property_value
```

To return the value for any setting, use `SHOW [setting name]`

## PostgreSQL commands

### BEGIN
This command is parsed and the completed command is sent back to the client. This is the same as the `START TRANSACTION` command.

```
BEGIN [ TRANSACTION ]
```
Parameters
- `TRANSACTION`: Optional key words. Listens it, no action is taken on this.

### CLOSE
`CLOSE` frees the resources associated with an open cursor. After the cursor is closed, no subsequent operations are allowed on it. A cursor should be closed when it is no longer needed.

```
CLOSE { name }
```
Parameters
- `name`: the name of an open cursor to close.

### COMMIT
No action will be taken in Query Service as response to Commit transaction statement.

```
COMMIT [ WORK | TRANSACTION ]
```
Parameters
- `WORK`
- `TRANSACTION`: Optional key words. They have no effect.

### DEALLOCATE
DEALLOCATE is used to deallocate a previously prepared SQL statement. If you do not explicitly deallocate a prepared statement, it is deallocated when the session ends.

```
DEALLOCATE [ PREPARE ] { name | ALL }
```

Parameters
- `Prepare`: This key word is ignored
- `name`: The name of the prepared statement to deallocate.
- `ALL`: Deallocate all prepared statements

### DECLARE

`DECLARE` allows a user to create cursors, which can be used to retrieve a small number of rows at a time out of a larger query. After the cursor is created, rows are fetched from it using `FETCH`.

```
DECLARE name CURSOR [ WITH  HOLD ] FOR query
```
Parameters
- `name`: The name of the cursor to be created.
- `WITH HOLD`: Specifies that the cursor can continue to be used after the transaction that created it successfully commits.
- `query`: A `SELECT` or `VALUES` command which will provide the rows to be returned by the cursor. 

### EXECUTE
`EXECUTE` is used to execute a previously prepared statement. Since prepared statements only exist for the duration of a session, the prepared statement must have been created by a `PREPARE` statement executed earlier in the current session.

If the `PREPARE` statement that created the statement specified some parameters, a compatible set of parameters must be passed to the `EXECUTE` statement, or else an error is raised. Note that (unlike functions) prepared statements are not overloaded based on the type or number of their parameters; the name of a prepared statement must be unique within a database session.

```
EXECUTE name [ ( parameter [, ...] ) ]
```

Parameters
- `name`: The name of the prepared statement to execute.
- `parameter`: The actual value of a parameter to the prepared statement. This must be an expression yielding a value that is compatible with the data type of this parameter, as was determined when the prepared statement was created. 

### EXPLAIN
This command displays the execution plan that the PostgreSQL planner generates for the supplied statement. The execution plan shows how the table(s) referenced by the statement will be scanned — by plain sequential scan, index scan, etc. — and if multiple tables are referenced, what join algorithms will be used to bring together the required rows from each input table.

The most critical part of the display is the estimated statement execution cost, which is the planner's guess at how long it will take to run the statement (measured in cost units that are arbitrary, but conventionally mean disk page fetches). Actually two numbers are shown: the start-up cost before the first row can be returned, and the total cost to return all the rows. For most queries the total cost is what matters, but in contexts such as a subquery in EXISTS, the planner will choose the smallest start-up cost instead of the smallest total cost (since the executor will stop after getting one row, anyway). Also, if you limit the number of rows to return with a LIMIT clause, the planner makes an appropriate interpolation between the endpoint costs to estimate which plan is really the cheapest.

The ANALYZE option causes the statement to be actually executed, not only planned. Then actual run time statistics are added to the display, including the total elapsed time expended within each plan node (in milliseconds) and the total number of rows it actually returned. This is useful for seeing whether the planner's estimates are close to reality.

```
EXPLAIN [ ( option [, ...] ) ] statement
EXPLAIN [ ANALYZE ] statement

where option can be one of:
    ANALYZE [ boolean ]
    TYPE VALIDATE
    FORMAT { TEXT | JSON }
```
Parameters
- `ANALYZE`: Carry out the command and show actual run times and other statistics. This parameter defaults to `FALSE`.
- `FORMAT`: Specify the output format, which can be TEXT, XML, JSON, or YAML. Non-text output contains the same information as the text output format, but is easier for programs to parse. This parameter defaults to `TEXT`.
- `statement`: Any `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `VALUES`, `EXECUTE`, `DECLARE`, `CREATE TABLE AS`, or `CREATE MATERIALIZED VIEW AS` statement, whose execution plan you wish to see.

> **Important:** Keep in mind that the statement is actually executed when the ANALYZE option is used. Although EXPLAIN will discard any output that a SELECT would return, other side effects of the statement will happen as usual. 

### Example:
To show the plan for a simple query on a table with a single `integer` column and 10000 rows:
```
EXPLAIN SELECT * FROM foo;

                       QUERY PLAN
---------------------------------------------------------
 Seq Scan on foo  (cost=0.00..155.00 rows=10000 width=4)
(1 row)
```

### FETCH

`FETCH` retrieves rows using a previously-created cursor.

A cursor has an associated position, which is used by `FETCH`. The cursor position can be before the first row of the query result, on any particular row of the result, or after the last row of the result. When created, a cursor is positioned before the first row. After fetching some rows, the cursor is positioned on the row most recently retrieved. If `FETCH` runs off the end of the available rows then the cursor is left positioned after the last row. If there is no such row, an empty result is returned, and the cursors is left positioned before the first row or after the last row as appropriate. 


```
FETCH num_of_rows [ IN | FROM ] cursor_name
```

Parameters
- `num_of_rows`: A possibly-signed integer constant, determining the location or number of rows to fetch. 
- `cursor_name`: An open cursor's name.

### PREPARE
`PREPARE` creates a prepared statement. A prepared statement is a server-side object that can be used to optimize performance. When the `PREPARE` statement is executed, the specified statement is parsed, analyzed, and rewritten. When an `EXECUTE` command is subsequently issued, the prepared statement is planned and executed. This division of labor avoids repetitive parse analysis work, while allowing the execution plan to depend on the specific parameter values supplied.

Prepared statements can take parameters: values that are substituted into the statement when it is executed. When creating the prepared statement, refer to parameters by position, using $1, $2, etc. A corresponding list of parameter data types can optionally be specified. When a parameter's data type is not specified or is declared as unknown, the type is inferred from the context in which the parameter is first referenced (if possible). When executing the statement, specify the actual values for these parameters in the `EXECUTE` statement.

Prepared statements only last for the duration of the current database session. When the session ends, the prepared statement is forgotten, so it must be recreated before being used again. This also means that a single prepared statement cannot be used by multiple simultaneous database clients; however, each client can create their own prepared statement to use. Prepared statements can be manually cleaned up using the `DEALLOCATE` command.

Prepared statements potentially have the largest performance advantage when a single session is being used to execute a large number of similar statements. The performance difference will be particularly significant if the statements are complex to plan or rewrite, e.g. if the query involves a join of many tables or requires the application of several rules. If the statement is relatively simple to plan and rewrite but relatively expensive to execute, the performance advantage of prepared statements will be less noticeable.

```
PREPARE name [ ( data_type [, ...] ) ] AS SELECT
```
Parameters
- `name`: An arbitrary name given to this particular prepared statement. It must be unique within a single session and is subsequently used to execute or deallocate a previously prepared statement.
- `data-type`: The data type of a parameter to the prepared statement. If the data type of a particular parameter is unspecified or is specified as unknown, it will be inferred from the context in which the parameter is first referenced. To refer to the parameters in the prepared statement itself, use $1, $2, etc.


### ROLLBACK
`ROLLBACK` rolls back the current transaction and causes all the updates made by the transaction to be discarded.
```
ROLLBACK [ WORK ]
```
Parameters
- `WORK`

### SELECT INTO
`SELECT INTO` creates a new table and fills it with data computed by a query. The data is not returned to the client, as it is with a normal `SELECT`. The new table's columns have the names and data types associated with the output columns of the `SELECT`.
```
[ WITH [ RECURSIVE ] with_query [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( expression [, ...] ) ] ]
    * | expression [ [ AS ] output_name ] [, ...]
    INTO [ TEMPORARY | TEMP | UNLOGGED ] [ TABLE ] new_table
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY expression [, ...] ]
    [ HAVING condition [, ...] ]
    [ WINDOW window_name AS ( window_definition ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } ONLY ]
    [ FOR { UPDATE | SHARE } [ OF table_name [, ...] ] [ NOWAIT ] [...] ]
```

Parameters
- `TEMPORARAY` or `TEMP`: If specified, the table is created as a temporary table.
- `UNLOGGED:` if specified, the table is created as an unlogged table.
- `new_table` The name (optionally schema-qualified) of the table to be created. 

Example:
Create a new table `films_recent` consisting of only recent entries from the table `films`:
```
SELECT * INTO films_recent FROM films WHERE date_prod >= '2002-01-01';
```

### SHOW
`SHOW` will display the current setting of run-time parameters. These variables can be set using the SET statement, by editing the postgresql.conf configuration file, through the `PGOPTIONS` environmental variable (when using libpq or a libpq-based application), or through command-line flags when starting the postgres server.

```
SHOW name
```

Parameters
- `name`:
    - `SERVER_VERSION`: Shows the server's version number.
    - `SERVER_ENCODING`: Shows the server-side character set encoding. At present, this parameter can be shown but not set, because the encoding is determined at database creation time.
    - `LC_COLLATE`: Shows the database's locale setting for collation (text ordering). At present, this parameter can be shown but not set, because the setting is determined at database creation time.
    - `LC_CTYPE`: Shows the database's locale setting for character classification. At present, this parameter can be shown but not set, because the setting is determined at database creation time.
    `IS_SUPERUSER`: True if the current role has superuser privileges.
- `ALL`: Show the values of all configuration parameters with descriptions.

Example

Show the current setting of the parameter `DateStyle`
```
SHOW DateStyle;
 DateStyle
-----------
 ISO, MDY
(1 row)
```

### START TRANSACTION
This command is just parsed and sent the completed command back to client. This is the same as the `BEGIN` command.

```
START TRANSACTION [ transaction_mode [, ...] ]

where transaction_mode is one of:

    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }
    READ WRITE | READ ONLY
```