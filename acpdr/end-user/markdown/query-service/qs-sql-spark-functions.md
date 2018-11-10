# Spark SQL Functions

The Spark SQL helpers provide built-in Spark SQL functions to extend SQL funcationality.

Reference: 
https://spark.apache.org/docs/2.3.0/api/sql/index.html

### explode

Example:

```
SELECT timestamp, explode(productListItems)
FROM experience_events
ORDER BY timestamp ASC
```

### from_utc_timestamp

from_utc_timestamp(timestamp, timezone) - Given a timestamp like '2017-07-14 02:40:00.0', interprets it as a time in UTC, and renders that time as a timestamp in the given time zone. For example, 'GMT+1' would yield '2017-07-14 03:40:00.0'.

Example:

```
SELECT from_utc_timestamp(timestamp, '')
FROM experience_events
ORDER BY timestamp ASC
```
### row_number 

row_number() - Assigns a unique, sequential number to each row, starting with one, according to the ordering of rows within the window partition. Use this function to find unique records.

Example:

```
SELECT
COUNT(purchaseID) AS Unique_Orders
FROM
(
  SELECT
  commerce.`order`.purchaseID as purchaseID,
  row_number() OVER (
    PARTITION BY endUserIds._experience.aaid.id, commerce.`order`.purchaseID
	ORDER BY timestamp ASC) AS rownum
	FROM experience_events
	WHERE commerce.`order`.purchaseID IS NOT NULL
) tmp WHERE rownum=1
```
