# Running Queries

Query service provides customer a SQL interface to interact with experience and custom data. Depending on the size of the data, the kind of your query and the expected size of the output you will need to pick one of the following Query flows.

## Interactive experience

*   Queries are expected to return within three minutes.
*   Queries must have reasonable size output, for example about 1-10k.
*   Use either PSQL or 3rd party BI tools for your analysis.

For interactive queries, you can connect with PSQL or use one of the supported third party tools like Tableau or Power BI. The Adobe Query Service interface provides the option of getting all the connection parameters for connection to PSQL and BI tools.

## Interactive queries that failed because of time out

The interactive interface limits query time to three minutes or less. Queries that do not execute within that time will fail.

For these queries, use the Adobe Query Service interface to promote the query as a Create Table as Select (CTAS) query and provide a new dataset name to persist results to.

## Non-interactive experience

*   Queries are expected to take longer.
*   Query output is another dataset.
*   The dataset generated could be of substantial size.

For non-interactive experiences, use the HTTP API provided by Adobe, which takes a select and creates a Create Table as Select (CTAS) query, and outputs the results to the specified dataset.

Using the Adobe interface, queries (especially those that fail during execution due to a timeout) can be promoted to run as a CTAS query by providing a output dataset name.

## Timestamp

By default, the date and time are shown in the GMT time zone. You can adjust the timestamp to another time zone in the query. For example:

```
SELECT from_utc_timestamp(timestamp, 'America/New_York') ...
```

*   **[Supported Syntax](qs-syntax.md)**

*   **[Downloading Results](qs-results.md)**