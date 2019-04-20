# ADF Functions

The Spark SQL helpers provide Spark SQL user-defined functions to encapsulate the Analytics business logic like Sessionization and Attribution.



## Window Functions

The majority of the business logic requires gathering the touchpoints for a customer and ordering them by time. This support is provided by Spark SQL in the form of window functions. Window functions are part of standard SQL and are supported by many other SQL engines.

A window function updates an aggregation and provides every row in your ordered subset or rows. The most basic aggregation function is `SUM()`. `SUM()` takes your rows and gives you one total. If you instead apply `SUM()` to a window, turning it into a window function, you receive a cumulative sum with each row.

The majority of the Spark SQL helpers are window functions that are updated with each row in your window, with the state of that row added.

### Sessionization

Example:

```
SELECT endUserIds._experience.mcid.id, timestamp,
       SESS_TIMEOUT(ts, 60 * 30)
         OVER (PARTITION BY endUserIds._experience.mcid.id
               ORDER BY timestamp
               ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
         AS sess
FROM experience_events
ORDER BY endUserIds._experience.mcid.id, timestamp ASC
```

### Attribution

**First Touch Attribution**

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

**Last Touch Attribution**

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

### Previous/Next touch

**Previous Touch**

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

**Next Touch**

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

### Time-Between

**Time-Between Previous Match**

Provides a new dimension, that measures the time which has elapsed since a particular incident.

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

**Time-Between Next Match**

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
