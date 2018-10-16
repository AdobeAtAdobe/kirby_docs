# Run a Query

You can issue queries against the Query Service, connecting an external tool to the Query Service.

*   Tableau
*   Microsoft Power BI
*   PSQL command line interface
*   [Long-running queries](qs-queries-running.md#interactive-queries-that-failed-because-of-time-out) can be run via the Adobe Query Service interface.

Not all SQL syntax is supported. For the supported syntax, see [SQL Syntax](qs-sql-syntax.md).

For example, select statements are supported, but insert or update statements are not. Query Service uses a read-only paradigm for queries.

1.  Log in to the Experience Cloud, navigate to Adobe Experience Platform, and select Services.
2.  Select Query Service.
3.  Retrieve your credentials needed to connect to an external client.
4.  Use your credentials to authenticate with an external tool.
5.  Issue queries.
6.  Work with result sets to build reports or drive other use cases.
7.  Understand error messaging and debug queries.
