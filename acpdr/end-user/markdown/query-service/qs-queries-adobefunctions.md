# Using Adobe functions

One of Adobe's big differentiators is that they understand experience data and what customers need to be able to do with that data. You can use this understanding to build helper functions that make your job easier.

## Sessionization

The `SESS_TIMEOUT()` reproduces the visit groupings found with Adobe Analytics. It performs a similar time-based grouping, but with customizable parameters.

**Syntax:**

`SESS_TIMEOUT(timestamp, timeout_in_seconds) OVER ([partition] [order] [frame])`

**Returns:**

Structure with fields `(timestamp_diff, num, is_new, depth)`

1. Explore the row-level `SESS_TIMEOUT()` and output:
  ```sql
  SELECT analyticsVisitor,
         session.is_new,
         session.timestamp_diff,
         session.num,
         session.depth
  FROM (SELECT endUserIDs._experience.aaid.id as analyticsVisitor,
           SESS_TIMEOUT(timestamp, 60 * 30)
             OVER (PARTITION BY endUserIDs._experience.aaid.id
                   ORDER BY timestamp
                   ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
             AS session
    FROM your_analytics_table
    WHERE _ACP_YEAR = 2018
  )
  LIMIT 100;
  ```
  ![Image](graphics/2C-S-1.png)
2. Create a new trended report with visitors, sessions, and page views:
  ```sql
  SELECT 
    date_format( from_utc_timestamp(timestamp, 'EDT') , 'yyyy-MM-dd') as Day,
    COUNT(DISTINCT analyticsVisitor ) as Visitors,
    COUNT(DISTINCT analyticsVisitor || session.num ) as Sessions,
    SUM( PageViews ) as PageViews
  FROM 
    ( 
      SELECT 
      timestamp,
      endUserIDs._experience.aaid.id as analyticsVisitor,
      SESS_TIMEOUT(timestamp, 60 * 30) 
        OVER (PARTITION BY endUserIDs._experience.aaid.id 
              ORDER BY timestamp 
              ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) 
        AS session,
      web.webPageDetails.pageviews.value as PageViews
      FROM your_analytics_table
      WHERE _ACP_YEAR = 2018
    )
  GROUP BY Day 
  ORDER BY Day DESC 
  LIMIT 31;
  ```
  ![Image](graphics/2C-S-2.png)

## Attribution

Attribution is how you allocate metrics or conversions like revenue, order, or signups to your marketing effort.

In Adobe Analytics, attribution settings are configured per variables like an eVar and generated as data is ingested.

The Attribution ADFs found in the query service allow those allocations to be defined and generated at query time.

This example focuses on last-touch attribution, but Adobe also offers first-touch attribution. Other options with timeouts and event-based expiration will be available in future versions of Query Service.

**Syntax:**

`ATTRIBUTION_LAST_TOUCH(timestamp, [channel_name], column) OVER ([partition] [order] [frame])`

**Returns:**

struct with field `(value)`

1. Explore the row-level attribution.
```sql
SELECT
  endUserIds._experience.aaid.id,
  _experience.analytics.customDimensions.evars.evar10 as MemberLevel,
  ATTRIBUTION_LAST_TOUCH(timestamp, 'eVar10', _experience.analytics.customDimensions.evars.evar10)
      OVER(PARTITION BY endUserIds._experience.aaid.id
           ORDER BY timestamp
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW).value
      AS LastMemberLevel,
  commerce.purchases.value as Orders
FROM your_analytics_table 
WHERE _ACP_YEAR=2018 AND _ACP_MONTH=4
LIMIT 50;
```
![Image](graphics/2C-A-1.png)
2. Create a breakdown of orders by Last Member Level (eVar10).
```sql
SELECT
  LastMemberLevel,
  SUM(Orders) as MemberLevelOrders
FROM 
(SELECT
  ATTRIBUTION_LAST_TOUCH(timestamp, 'eVar10', _experience.analytics.customDimensions.evars.evar10)
      OVER(PARTITION BY endUserIds._experience.aaid.id
           ORDER BY timestamp
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW).value
      AS LastMemberLevel,
  commerce.purchases.value as Orders
FROM your_analytics_table 
WHERE _ACP_YEAR=2018 AND _ACP_MONTH=4
)
GROUP BY LastMemberLevel 
ORDER BY MemberLevelOrders DESC
LIMIT 25;
```
![Image](graphics/2C-A-2.png)

## Pathing

Pathing helps to understand how customers navigate your site. The `NEXT()` and `PREVIOUS()` ADFs make this possible.

**Syntax:**

```
NEXT(key, [shift, [ignoreNulls]]) OVER ([partition] [order] [frame])
PREVIOUS(key, [shift, [ignoreNulls]]) OVER ([partition] [order] [frame])
```

**Returns:**

struct with field `(value)`

1. Select the current page and next page.
  ```sql
  SELECT 
    endUserIds._experience.aaid.id,
    timestamp,
    web.webPageDetails.name,
    NEXT(web.webPageDetails.name, 1, true)
        OVER(PARTITION BY endUserIds._experience.aaid.id
             ORDER BY timestamp
             ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING).value
        AS next_pagename
  FROM your_analytics_table
  WHERE _ACP_YEAR=2018 
  LIMIT 10;
  ```
  ![Image](graphics/2C-P-1.png)
2. Create a breakdown report for the top five page names on entry of the session.
  ```sql
  SELECT 
    PageName,
    PageName_2,
    PageName_3,
    PageName_4,
    PageName_5,
    SUM(PageViews) as PageViews
  FROM
    (SELECT
      PageName,
      NEXT(PageName, 1, true)
        OVER(PARTITION BY VisitorID, session.num
              ORDER BY timestamp
              ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING).value
        AS PageName_2,
      NEXT(PageName, 2, true)
        OVER(PARTITION BY VisitorID, session.num
              ORDER BY timestamp
              ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING).value
        AS PageName_3,
      NEXT(PageName, 3, true)
         OVER(PARTITION BY VisitorID, session.num
              ORDER BY timestamp
              ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING).value
        AS PageName_4,
      NEXT(PageName, 4, true)
         OVER(PARTITION BY VisitorID, session.num
              ORDER BY timestamp
              ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING).value
        AS PageName_5,
      PageViews,
      session.depth AS SessionPageDepth
    FROM
      (SELECT 
    	  endUserIds._experience.aaid.id as VisitorID,
   	  timestamp,
   	  web.webPageDetails.pageviews.value AS PageViews,
    	  web.webPageDetails.name AS PageName,
        SESS_TIMEOUT(timestamp, 60 * 30) 
          OVER (PARTITION BY endUserIDs._experience.aaid.id 
                ORDER BY timestamp 
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) 
        AS session
      FROM your_analytics_table
      WHERE _ACP_YEAR=2018)
    )
  WHERE SessionPageDepth=1
  GROUP BY PageName, PageName_2, PageName_3, PageName_4, PageName_5
  ORDER BY PageViews DESC
  LIMIT 100;
  ```
  ![Image](graphics/2C-P-2.png)