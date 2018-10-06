# SQL Functions

## ADF Functions

The Spark SQL helpers provide Spark SQL user-defined functions to encapsulate the Analytics business logic like Sessionization and Attribution.



## Window Functions

The majority of the business logic requires gathering the touchpoints for a customer and ordering them by time. This support is provided by Spark SQL in the form of window functions. Window functions are part of standard SQL and are supported by many other SQL engines.

A window function updates an aggregation and provides every row in your ordered subset or rows. The most basic aggregation function is `SUM()`. `SUM()` takes your rows and gives you one total. If you instead apply `SUM()` to a window, turning it into a window function, you receive a cumulative sum with each row.

The majority of the Spark SQL helpers are window functions that are updated with each row in your window, with the state of that row added.

### Sessionization

Example:

```
SELECT endUserIds._experience.mcid, timestamp,
       SESS_TIMEOUT(ts, 60 * 30)
         OVER (PARTITION BY endUserIds._experience.mcid
               ORDER BY timestamp
               ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
         AS sess
FROM experience_events
ORDER BY endUserIds._experience.mcid, timestamp ASC
```

### Attribution

**First Touch Attribution**

Determines the allocation for the first, single channel.

Syntax: `ATTRIBUTION\_FIRST\_TOUCH(timestamp, channelName, channelValue) OVER (\[partition\] \[order\] \[frame\])`

Example:

```
SELECT endUserIds._experience.mcid, timestamp, marketing.trackingCode,
    ATTRIBUTION\_FIRST\_TOUCH(timestamp, 'trackingCode', marketing.trackingCode)
      OVER(PARTITION BY endUserIds._experience.mcid
           ORDER BY timestamp
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
      AS first_touch
FROM experience_events
ORDER BY endUserIds._experience.mcid, timestamp ASC
```

**Last Touch Attribution**

Determines the allocation for the last, single channel.

Syntax: `ATTRIBUTION\_LAST\_TOUCH(timestamp, channelName, channelValue) OVER (\[partition\] \[order\] \[frame\])`

Example:

```
SELECT endUserIds._experience.mcid, timestamp, marketing.trackingCode,
    ATTRIBUTION\_LAST\_TOUCH(timestamp, 'trackingCode', marketing.trackingCode)
      OVER(PARTITION BY endUserIds._experience.mcid
           ORDER BY timestamp
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
      AS last_touch
FROM experience_events
ORDER BY endUserIds._experience.mcid, timestamp ASC
```

### Previous/Next touch

**Previous Touch**

Determines the previous value of a particular field within the window.

Syntax: `PREVIOUS(key, \[shift, \[ignoreNulls\]\]) OVER (\[partition\] \[order\] \[frame\])`

Example:

```
SELECT endUserIds._experience.mcid, sessionId, timestamp, pageName
    PREVIOUS(pageName, 3)
      OVER(PARTITION BY endUserIds._experience.mcid, sessionId
           ORDER BY timestamp
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
      AS previous_page
FROM experience_events
ORDER BY endUserIds._experience.mcid, sessionId, timestamp ASC
```

**Next Touch**

Determines the next value of a particular field within the window.

Syntax: `NEXT(key, \[shift, \[ignoreNulls\]\]) OVER (\[partition\] \[order\] \[frame\])`

Example:

```
SELECT endUserIds._experience.mcid, sessionId, timestamp, pageName
    NEXT(pageName, 2, true)
      OVER(PARTITION BY endUserIds._experience.mcid, sessionId
           ORDER BY timestamp
           ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)
      AS next_page
FROM experience_events
ORDER BY endUserIds._experience.mcid, sessionId, timestamp ASC
```

### Time-Between

**Time-Between Previous Match**

Provides a new dimension, that measures the time which has elapsed since a particular incident.

Syntax: `TIME\_BETWEEN\_PREVIOUS_MATCH(time, eventDefintion, \[timeUnit\]) OVER (\[partition\] \[order\] \[frame\])`

Example:

```
SELECT endUserIds._experience.mcid, sessionId, timestamp, pageName
    TIME\_BETWEEN\_PREVIOUS_MATCH(ts, pageName='registration complete', 'minutes')
      OVER(PARTITION BY endUserIds._experience.mcid, sessionId
           ORDER BY timestamp
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
      AS time\_between\_previous_match
FROM experience_events
ORDER BY endUserIds._experience.mcid, sessionId, timestamp ASC
```

**Time-Between Next Match**

Provides a new dimension, that measures the time before which a particular event occured.

Syntax: `TIME\_BETWEEN\_NEXT_MATCH(time, eventDefintion, \[timeUnit\]) OVER (\[partition\] \[order\] \[frame\])`

Example:

```
SELECT endUserIds._experience.mcid, sessionId, timestamp, pageName
    TIME\_BETWEEN\_NEXT_MATCH(ts, pageName='registration complete', 'hours')
      OVER(PARTITION BY endUserIds._experience.mcid, sessionId
           ORDER BY timestamp
           ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)
      AS time\_between\_next_match
FROM experience_events
ORDER BY endUserIds._experience.mcid, sessionId, timestamp ASC
```
