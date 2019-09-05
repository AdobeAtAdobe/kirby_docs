# Sample queries for Adobe Analytics data

Data from selected Adobe Analytics report suites are transformed into Experience Event XDM schema and ingested into Experience Platform as datasets for you. There are many use cases for Query Service with this data, and the following sample queries should work with your Adobe Analytics datasets. Information on where your Analytics fields land in Experience Event XDM can be [found here](solutionref/analytics-field-map.md).

A note about the following examples: You need to edit the SQL to fill in the expected parameters for your queries based on the dataset, eVar, event, or timeframe you are interested in evaluating. Provide parameters wherever you see { } in the SQL.

Also, note whether the sample SQL calls for post_values. If it does, then you need to use a table that represents a dataset with post values in it. Datasets have tablenames that tell you if they are mid or post values. If the sample query does not specify, you can use either. 

## Hourly visitor count for a given day
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


## Hourly activity count for a given day
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

## Number of events per visit
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

## Top 10 viewed pages for a given day
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

## Top 10 most active users
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

## Top 10 cities by user activity
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
## Top 10 viewed products 
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

## Top 10 total order revenue
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
## Evar instances
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

## Event counts by day
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

## Merchandising variables (product syntax)

In Adobe Analytics, custom product-level data can be collected through specially configured variables called "Merchandising Variables." These are based on either an eVar or Custom Event. The difference between these variables and their standard use is that they represent a separate value for each product found on the hit rather than only a single value for the hit. These variables are referred to as Product Syntax Merchandising Variables. 

This allows for collection of information like a per product "discount amount" or information about the product's "location on page" in the customer's search results.

Here are the XDM fields to access the merchandising variables in your Analytics dataset.

### eVars

```
productListItems[#]._experience.analytics.customDimensions.evars.evar#
```

Where `[#]` is an array index and `evar#` is the specific eVar variable.

### Custom events

```
productListItems[#]._experience.analytics.event1to100.event#.value
```

Where `[#]` is an array index and `event#` is the specific custom event variable.

### Sample queries

Here is a sample query returning a merchandising eVar and event for the first product found in the `productListItems`.

```
SELECT
  productListItems[0]._experience.analytics.customDimensions.evars.eVar1,
  productListItems[0]._experience.analytics.event1to100.event1.value
FROM adobe_analytics_midvalues
WHERE _ACP_YEAR=2019 AND _ACP_MONTH=7 AND _ACP_DAY=23
  AND productListItems[0].SKU IS NOT NULL
  AND productListItems[0]._experience.analytics.customDimensions.evars.eVar1 IS NOT NULL
  AND productListItems[0]._experience.analytics.event1to100.event1.value IS NOT NULL
LIMIT 10
```

This next query explodes the `productListItems` and returns each merchandising eVar and event per product. The `_id` field is included to show the relationship to the original hit. The `_id` value is a unique primary key in the Experience Event dataset.

```
SELECT
  _id,
  productItem._experience.analytics.customDimensions.evars.eVar1,
  productItem._experience.analytics.event1to100.event1.value
FROM (
  SELECT
    _id,
    explode(productListItems) as productItem
  FROM adobe_analytics_midvalues
  WHERE _ACP_YEAR=2019 AND _ACP_MONTH=7 AND _ACP_DAY=23
  AND productListItems[0].SKU IS NOT NULL
  AND productListItems[0]._experience.analytics.customDimensions.evars.eVar1 IS NOT NULL
  AND productListItems[0]._experience.analytics.event1to100.event1.value IS NOT NULL
)
LIMIT 20
```

### Common error when implementing the sample queries

The "No such struct field" error is encountered when you attempt to retrieve a field that doesn't existing in your current dataset. Evaluate the reason returned in the error message to identify an available field then update your query and rerun.

```
ERROR: ErrorCode: 08P01 sessionId: XXXX queryId: XXXX Unknown error encountered. Reason: [No such struct field evar1 in eVar10, eVar13, eVar62, eVar88, eVar2;]
```
