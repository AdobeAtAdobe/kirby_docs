# SQL metadata

For metadata on your dataset, the following PSQL commands are currently supported for querying:

|Command|Description|
|---|---|
|`\conninfo`|Outputs information about the current database connection.|
|`\d`|Displays a list of all visible tables, views, materialized views, sequences and foreign tables.|
|`\di`|Displays a list of indexes.|
|`\dm`|Displays a list of materialized views.|
|`\dn`|Displays a list of schemas (namespaces)|
|`\ds`|Displays a list of sequences.|
|`\dS`|Displays a list of PostgreSQL-defined tables.|
|`\dt`|Displays a list of tables.|
|`\dv`|Displays a list of views.|
|`\encoding`|Lists the current  client character set encoding.|
|`\errverbose`|Repeats the most recent server error message at maximum verbosity.|
|`\set`|Displays the names and values of all current psql variables.|
|`\timing`|Toggles the display between on and off. The display is in milliseconds. Intervals longer than one second are shown in minutes:seconds format, with hours and days fields added when needed.|
|`\dT`|Displays a list of data types.|
|`\l or \list`|Displays a list of databases in the server.|
|`\dE`|Displays a list of foreign tables.|
|`\df or \df+`|Displays a list of functions.|

`\d` commands can be combined. For example, you can issue a `\dtsn` command to display a list of all tables, sequences, and schemas. `\d` by itself shows all visible tables, views, materialized views, and sequences.

For additional information about these commands, refer to the documentation at [postgresql.org](https://www.postgresql.org/docs/10/app-psql.html). Note that not all options documented on that site are supported.

Other commands will be added to this list as they are tested.

