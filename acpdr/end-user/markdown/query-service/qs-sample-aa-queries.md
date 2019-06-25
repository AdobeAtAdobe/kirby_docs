# Sample Queries for Adobe Analytics Data

Data from selected Adobe Analytics report suites are transformed into Experience Event XDM schema and ingested into Experience Platform as datasets for you. There are many use cases for Query Service with this Data, and the following sample queries should work with your Adobe Analytics datasets. Information on where your Analytics Fields land in Experience Event XDM can be [found here](solutionref/analytics-field-map.md).

A note about the following examples: you will need to edit the SQL to fill in the expected parameters for your queries based on the dataset, eVar, event, or timeframe you are interested in evaluating. You will need to provide parameters wherever you see { } in the SQL.

Also, note whether the sample SQL calls for post_values or not. If it does, then you need to use a table that represents a dataset with post values in it. Datasets will have tablenames that tell you if they are mid or post values. If the sample query does not specify, you can use either. 

## Hourly Visitor Count for a Given Day
```
SELECT Substring(from_utc_timestamp(timestamp, 'America/New_York'), 1, 10)                               AS Day,
       Substring(from_utc_timestamp(timestamp, 'America/New_York'), 12, 2)                               AS Hour, 
       Count(DISTINCT enduserids._experience.aaid.id) AS Visitor_Count 
FROM   {target_table_post_values}
WHERE _acp_year = {target_year} 
      AND _acp_month = {target_month}  
      AND _acp_day = {target_day}
GROUP  BY Day, Hour
ORDER  BY Hour;
```


## Hourly Activity Count for a Given Day
```
SELECT Substring(from_utc_timestamp(timestamp, 'America/New_York'), 1, 10)                        AS Day,
       Substring(from_utc_timestamp(timestamp, 'America/New_York'), 12, 2)                        AS Hour, 
       Count(concat(enduserids._experience.aaid.id, 
                    _experience.analytics.session.num,
                    _experience.analytics.session.depth)) AS Count 
FROM   {target_table_post_values}
WHERE  _acp_year = {target_year} 
       AND _acp_month = {target_month}  
       AND _acp_day = {target_day}
GROUP  BY Day, Hour
ORDER  BY Hour;
```

## Number of Events per Visit
```
SELECT concat(enduserids._experience.aaid.id, 
              '-#', 
              _experience.analytics.session.num) AS aaid_sess_key, 
       Count(timestamp)                          AS Count 
FROM   {target_table_post_values}
WHERE  _acp_year = {target_year} 
       AND _acp_month = {target_month}  
       AND _acp_day = {target_day}
GROUP BY aaid_sess_key
ORDER BY Count DESC;
```

## Top 10 Viewed Pages for a Given Day
```
SELECT web.webpagedetails.name                 AS Page_Name, 
       Sum(web.webpagedetails.pageviews.value) AS Page_Views 
FROM   {target_table}
WHERE  _acp_year = {target_year}
       AND _acp_month = {target_month}
       AND _acp_day = {target_day}
GROUP  BY web.webpagedetails.name 
ORDER  BY page_views DESC 
LIMIT  10;
```

## Top 10 Most Active Users
```
SELECT enduserids._experience.aaid.id AS aaid, 
       Count(timestamp)               AS Count
FROM   {target_table}
WHERE  _acp_year = {target_year}
       AND _acp_month = {target_month}
       AND _acp_day = {target_day}
GROUP  BY enduserids._experience.aaid.id
ORDER  BY Count DESC
LIMIT  10;
```

## Top 10 Cities by User Activity
```
SELECT concat(placeContext.geo.stateProvince, ' - ', placeContext.geo.city) AS state_city, 
       Count(timestamp)                                                     AS Count
FROM   {target_table}
WHERE  _acp_year = {target_year}
       AND _acp_month = {target_month}
       AND _acp_day = {target_day}
GROUP  BY state_city
ORDER  BY Count DESC
LIMIT  10;
```
## Top 10 Viewed Products 
```
SELECT Product_SKU,
       Sum(Product_Views) AS Total_Product_Views
FROM  (SELECT Explode(productlistitems.sku) AS Product_SKU, 
              commerce.productviews.value   AS Product_Views 
       FROM   {target_table}
       WHERE  _acp_year = {target_year}
              AND _acp_month = {target_month}
              AND _acp_day = {target_day}
              AND commerce.productviews.value IS NOT NULL) 
GROUP BY Product_SKU 
ORDER BY Total_Product_Views DESC
LIMIT  10;
```

## Top 10 Total Order Revenue
```
SELECT Purchase_ID, 
       Round(Sum(Product_Items.priceTotal * Product_Items.quantity), 2) AS Total_Order_Revenue 
FROM   (SELECT commerce.`order`.purchaseid AS Purchase_ID, 
               Explode(productlistitems)   AS Product_Items 
        FROM   {target_table} 
        WHERE  commerce.`order`.purchaseid IS NOT NULL 
               AND _acp_year = {target_year} 
               AND _acp_month = {target_month}  
               AND _acp_day = {target_day}) 
GROUP  BY Purchase_ID 
ORDER  BY total_order_revenue DESC 
LIMIT  10;
```
## Evar Instances
```
SELECT _experience.analytics.customdimensions.evars.{target_evar} AS {target_evar},
       Count(_experience.analytics.customdimensions.evars.{target_evar}) AS Instances
FROM   {target_table_post_values}
WHERE  _experience.analytics.customdimensions.evars.{target_evar} IS NOT NULL 
        AND _acp_year = {target_year} 
        AND _acp_month = {target_month}  
        AND _acp_day = {target_day}
GROUP  BY _experience.analytics.customdimensions.evars.{target_evar} 
ORDER  BY instances DESC 
LIMIT  10;
```

## Event Counts by Day
```
SELECT Substring(from_utc_timestamp(timestamp, 'America/New_York'), 1, 10) AS Day, 
       Substring(from_utc_timestamp(timestamp, 'America/New_York'), 12, 2) AS Hour, 
       Sum(_experience.analytics.event1to100.{target_event}.value) AS Event_Count
FROM   {target_table}
WHERE  _experience.analytics.event1to100.{target_event}.value IS NOT NULL 
        AND _acp_year = {target_year} 
        AND _acp_month = {target_month}  
        AND _acp_day = {target_day}
GROUP  BY Day, Hour
ORDER  BY Hour;
```
