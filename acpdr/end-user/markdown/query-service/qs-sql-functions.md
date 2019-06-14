# ADF functions

The Spark SQL helpers provide Spark SQL user-defined functions to encapsulate the Analytics business logic like Sessionization and Attribution.



## Window functions

The majority of the business logic requires gathering the touchpoints for a customer and ordering them by time. This support is provided by Spark SQL in the form of window functions. Window functions are part of standard SQL and are supported by many other SQL engines.

A window function updates an aggregation and provides every row in your ordered subset or rows. The most basic aggregation function is `SUM()`. `SUM()` takes your rows and gives you one total. If you instead apply `SUM()` to a window, turning it into a window function, you receive a cumulative sum with each row.

The majority of the Spark SQL helpers are window functions that are updated with each row in your window, with the state of that row added.

### Sessionization

When you are working with ExperienceEvent data from a website, mobile application, interactive voice response system, or any other customer interaction channel it helps if events can be grouped around a related period of activity. Typcially, the customer has a specific intent driving their activity like researching a product, paying a bill, checking account balance, filling out an application, etc and this grouping helps associate the events to uncover more context about the customer experience.

Specification:

Syntax: `SESS_TIMEOUT(timestamp, expirationInSeconds) OVER ([partition] [order] [frame])`

| Parameter | Description | 
| --- | --- |
| timestamp | Timestamp field found in the dataset |
| expirationInSeconds | Number of seconds needed between events to qualify the end of the current session and start of a new session |

| Returned Object Parameters |  Description  | 
| ---------------------- | ------------- |
| `timestamp_diff`       | Time in seconds between current record and last record |
| `num`                  | A unqiue session number, starting at 1, for the key defined in the PARTITION BY of the window function.   |
| `is_new`               | A boolean used to identify if a record is the first of a session    |
| `depth`                | Depth of the current record within the session  |

Example:

```
SELECT
  session.timestamp_diff,
  session.num,
  session.is_new,
  session.depth
FROM (
  SELECT 
    endUserIds._experience.ecid.id, 
    timestamp,
    SESS_TIMEOUT(timestamp, 60 * 30)
      OVER (PARTITION BY endUserIds._experience.mcid.id
          ORDER BY timestamp
          ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
      AS session
FROM experience_events 
)
ORDER BY endUserIds._experience.ecid.id, timestamp ASC
LIMIT 10
```

### Attribution

**First touch attribution**

Determines the allocation for the first, single channel.

Syntax: `ATTRIBUTION_FIRST_TOUCH(timestamp, channelName, channelValue) OVER ([partition] [order] [frame])`

Example:

```
SELECT endUserIds._experience.mcid.id, timestamp, marketing.trackingCode,
    ATTRIBUTION_FIRST_TOUCH(timestamp, 'trackingCode', marketing.trackingCode)
      OVER(PARTITION BY endUserIds._experience.mcid.id
           ORDER BY timestamp
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
      AS first_touch
FROM experience_events
ORDER BY endUserIds._experience.mcid.id, timestamp ASC
```

**Last touch attribution**

Determines the allocation for the last, single channel.

Syntax: `ATTRIBUTION_LAST_TOUCH(timestamp, channelName, channelValue) OVER ([partition] [order] [frame])`

Example:

```
SELECT endUserIds._experience.mcid.id, timestamp, marketing.trackingCode,
    ATTRIBUTION_LAST_TOUCH(timestamp, 'trackingCode', marketing.trackingCode)
      OVER(PARTITION BY endUserIds._experience.mcid.id
           ORDER BY timestamp
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
      AS last_touch
FROM experience_events
ORDER BY endUserIds._experience.mcid.id, timestamp ASC
```

### Previous/next touch

**Previous touch**

Determines the previous value of a particular field within the window.

Syntax: `PREVIOUS(key, [shift, [ignoreNulls]]) OVER ([partition] [order] [frame])`

Example:

```
SELECT endUserIds._experience.mcid.id, _experience.analytics.session.num, timestamp, web.webPageDetails.name
    PREVIOUS(web.webPageDetails.name, 3)
      OVER(PARTITION BY endUserIds._experience.mcid.id, _experience.analytics.session.num
           ORDER BY timestamp
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
      AS previous_page
FROM experience_events
ORDER BY endUserIds._experience.mcid.id, _experience.analytics.session.num, timestamp ASC
```

**Next touch**

Determines the next value of a particular field within the window.

Syntax: `NEXT(key, [shift, [ignoreNulls]]) OVER ([partition] [order] [frame])`

Example:

```
SELECT endUserIds._experience.mcid.id, _experience.analytics.session.num, timestamp, web.webPageDetails.name
    NEXT(web.webPageDetails.name, 2, true)
      OVER(PARTITION BY endUserIds._experience.mcid.id, _experience.analytics.session.num
           ORDER BY timestamp
           ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)
      AS next_page
FROM experience_events
ORDER BY endUserIds._experience.mcid.id, _experience.analytics.session.num, timestamp ASC
```

### Time-between

**Time-between previous match**

Provides a new dimension, which measures the time that has elapsed since a particular incident.

Syntax: `TIME_BETWEEN_PREVIOUS_MATCH(time, eventDefintion, [timeUnit]) OVER ([partition] [order] [frame])`

Example:

```
SELECT endUserIds._experience.mcid.id, _experience.analytics.session.num, timestamp, web.webPageDetails.name
    TIME_BETWEEN_PREVIOUS_MATCH(ts, web.webPageDetails.name='registration complete', 'minutes')
      OVER(PARTITION BY endUserIds._experience.mcid.id, _experience.analytics.session.num
           ORDER BY timestamp
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
      AS time_between_previous_match
FROM experience_events
ORDER BY endUserIds._experience.mcid.id, _experience.analytics.session.num, timestamp ASC
```

**Time-between next match**

Provides a new dimension, that measures the time before which a particular event occured.

Syntax: `TIME_BETWEEN_NEXT_MATCH(time, eventDefintion, [timeUnit]) OVER ([partition] [order] [frame])`

Example:

```
SELECT endUserIds._experience.mcid.id, _experience.analytics.session.num, timestamp, web.webPageDetails.name
    TIME_BETWEEN_NEXT_MATCH(ts, web.webPageDetails.name='registration complete', 'hours')
      OVER(PARTITION BY endUserIds._experience.mcid.id, _experience.analytics.session.num
           ORDER BY timestamp
           ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)
      AS time_between_next_match
FROM experience_events
ORDER BY endUserIds._experience.mcid.id, _experience.analytics.session.num, timestamp ASC
```
