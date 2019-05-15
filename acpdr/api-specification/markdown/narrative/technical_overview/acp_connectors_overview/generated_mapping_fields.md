# Generated Mapping Fields

These fields need to be transformed, and require logic beyond a direct copy from Adobe Analytics to be generated into Experience Data Model (XDM).

Analytics Field | XDM Field | XDM Type | DataSet | Properties 
--------------- | --------- | -------- | ------- | ----------
m_prop1 - m_prop75 | _experience.analytics.customDimensions.listprops.prop1 - _experience.analytics.customDimensions.listprops.prop75 | Object | mid | {} 
m_hier1 - m_hier5 | _experience.analytics.customDimensions.hierarchies.hier1 - _experience.analytics.customDimensions.hierarchies.hier5 | Object | mid | {values (array), delimiter (string)} 
m_mvvar1 - m_mvvar3 | _experience.analytics.customDimensions.lists.list1.list[] - _experience.analytics.customDimensions.lists.list3.list[] | array | mid | {value (string), key (string)} 
m_color | device.colorDepth | integer | mid | {} 
m_cookies | environment.browserDetails.cookiesEnabled | boolean | mid | {} 
m_event_list | commerce.purchases, commerce.productViews, commerce.productListOpens, commerce.checkouts, commerce.productListAdds, commerce.productListRemovals, commerce.productListViews | Object | mid | {id (string), value (number)} 
m_event_list | _experience.analytics.event1to100.event1 - _experience.analytics.event1to100.event100, _experience.analytics.event101to200.event101 - _experience.analytics.event101to200.event200, _experience.analytics.event201to300.event201 - _experience.analytics.event201to300.event300, _experience.analytics.event301to400.event301 - _experience.analytics.event301to400.event400, _experience.analytics.event401to500.event401 - _experience.analytics.event401to500.event500, _experience.analytics.event501to600.event501 - _experience.analytics.event501to600.event600, _experience.analytics.event601to700.event601 - _experience.analytics.event601to700.event700, _experience.analytics.event701to800.event701 - _experience.analytics.event701to800.event800, _experience.analytics.event801to900.event801 - _experience.analytics.event801to900.event900, _experience.analytics.event901to1000.event901 - _experience.analytics.event901to1000.event1000 | Object | mid | {id (Object), value (Object)} 
m_geo_country | placeContext.geo.countryCode | string | mid | {} 
m_geo_latitude | placeContext.geo._schema.latitude | number | mid | {} 
m_geo_longitude | placeContext.geo._schema.longitude | number | mid | {} 
m_java_enabled | environment.browserDetails.javaEnabled | boolean | mid | {} 
m_latitude | placeContext.geo._schema.latitude | number | mid | {} 
m_longitude | placeContext.geo._schema.longitude | number | mid | {} 
m_page_event_var1 | web.webInteraction.URL | string | mid | {} 
m_page_event_var2 | web.webInteraction.name | string | mid | {} 
m_page_type | web.webPageDetails.isErrorPage | boolean | mid | {} 
m_pagename_no_url | web.webPageDetails.pageViews.value | number | mid | {} 
m_paid_search | search.isPaid | boolean | mid | {} 
m_product_list | productListItems[].items | array | mid | {SKU (string), quantity (integer), priceTotal (number)} 
m_ref_type | web.webReferrer.type | string | mid | {} 
m_search_engine | search.searchEngine | string | mid | {} 
post_prop1 - post_prop75 | _experience.analytics.customDimensions.listprops.prop1 - _experience.analytics.customDimensions.listprops.prop75 | Object | post | {} 
post_hier1 - post_hier5 | _experience.analytics.customDimensions.hierarchies.hier1 - _experience.analytics.customDimensions.hierarchies.hier5 | Object | post | {values (array), delimiter (string)} 
post_mvvar1 - post_mvvar3 | _experience.analytics.customDimensions.lists.list1.list[] - _experience.analytics.customDimensions.lists.list3.list[] | array | post | {value (string), key (string)} 
post_cookies | environment.browserDetails.cookiesEnabled | boolean | post | {} 
post_currency | commerce.order.currencyCode | string | mid,post | {} 
post_cust_hit_time_gmt | timestamp | string | mid,post | {} 
post_cust_visid | identityMap | object | mid,post | {} 
post_cust_visid | endUserIDs._experience.aacustomid.primary | boolean | mid,post | {} 
post_cust_visid | endUserIDs._experience.aacustomid.namespace.code | string | mid,post | {} 
post_event_list | commerce.purchases, commerce.productViews, commerce.productListOpens, commerce.checkouts, commerce.productListAdds, commerce.productListRemovals, commerce.productListViews | Object | post | {id (string), value (number)} 
post_event_list | _experience.analytics.event1to100.event1 - _experience.analytics.event1to100.event100, _experience.analytics.event101to200.event101 - _experience.analytics.event101to200.event200, _experience.analytics.event201to300.event201 - _experience.analytics.event201to300.event300, _experience.analytics.event301to400.event301 - _experience.analytics.event301to400.event400, _experience.analytics.event401to500.event401 - _experience.analytics.event401to500.event500, _experience.analytics.event501to600.event501 - _experience.analytics.event501to600.event600, _experience.analytics.event601to700.event601 - _experience.analytics.event601to700.event700, _experience.analytics.event701to800.event701 - _experience.analytics.event701to800.event800, _experience.analytics.event801to900.event801 - _experience.analytics.event801to900.event900, _experience.analytics.event901to1000.event901 - _experience.analytics.event901to1000.event1000 | Object | post | {id (Object), value (Object)} 
post_java_enabled | environment.browserDetails.javaEnabled | boolean | post | {} 
post_latitude | placeContext.geo._schema.latitude | number | post | {} 
post_longitude | placeContext.geo._schema.longitude | number | post | {} 
post_page_event | web.webInteraction.type | string | mid,post | {} 
post_page_event | web.webInteraction.linkClicks.value | number | mid,post | {} 
post_page_event_var1 | web.webInteraction.URL | string | post | {} 
post_page_event_var2 | web.webInteraction.name | string | post | {} 
post_page_type | web.webPageDetails.isErrorPage | boolean | post | {} 
post_pagename_no_url | web.webPageDetails.pageViews.value | number | post | {} 
post_product_list | productListItems[].items | array | post | {SKU (string), quantity (integer), priceTotal (number)} 
post_search_engine | search.searchEngine | string | post | {} 
post_visid_high + visid_low | identityMap | object | mid,post | {} 
post_visid_high + visid_low | endUserIDs._experience.aaid.id | string | mid,post | {} 
post_visid_high | endUserIDs._experience.aaid.primary | boolean | mid,post | {} 
post_visid_high | endUserIDs._experience.aaid.namespace.code | string | mid,post | {} 
post_visid_low | identityMap | object | mid,post | {} 
mvvar1_instances | .list.items[] | Object | post | {} 
mvvar2_instances | .list.items[] | Object | post | {} 
mvvar3_instances | .list.items[] | Object | post | {} 
color | device.colorDepth | integer | post | {} 
first_hit_ref_type | _experience.analytics.endUser.firstWeb.webReferrer.type | string | post | {} 
first_hit_time_gmt | _experience.analytics.endUser.firstTimestamp | integer | post | {} 
geo_country | placeContext.geo.countryCode | string | post | {} 
geo_latitude | placeContext.geo._schema.latitude | number | post | {} 
geo_longitude | placeContext.geo._schema.longitude | number | post | {} 
hit_time_gmt | receivedTimestamp | string | mid,post | {} 
hitid_high + hitid_low | _id | string | mid,post | {} 
hitid_low | _id | string | mid,post | {} 
homepage | web.webPageDetails.isHomePage | boolean | mid,post | {} 
ip | environment.ipV4 | string | mid,post | {} 
j_jscript | environment.browserDetails.javaScriptEnabled | boolean | mid,post | {} 
mcvisid_high + mcvisid_low | identityMap | object | mid,post | {} 
mcvisid_high + mcvisid_low | endUserIDs._experience.mcid.id | string | mid,post | {} 
mcvisid_high | endUserIDs._experience.mcid.primary | boolean | mid,post | {} 
mcvisid_high | endUserIDs._experience.mcid.namespace.code | string | mid,post | {} 
mcvisid_low | identityMap | object | mid,post | {} 
paid_search | search.isPaid | boolean | post | {} 
ref_type | web.webReferrer.type | string | post | {} 
sdid_high + sdid_low | _experience.target.supplementalDataID | string | mid,post | {} 
sdid_low | _experience.target.supplementalDataID | string | mid,post | {} 
visit_paid_search | _experience.analytics.session.search.isPaid | boolean | post | {} 
visit_ref_type | _experience.analytics.session.web.webReferrer.type | string | post | {} 
visit_search_engine | _experience.analytics.session.search.searchEngine | string | post | {} 
visit_start_time_gmt | _experience.analytics.session.timestamp | integer | post | {} 
mobilebeaconproximity | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.proximity | string | mid,post | {} 
videochapter | media.mediaTimed.mediaChapter.chapterAssetReference._xmpDM.duration | integer | mid,post | {} 
videolength | media.mediaTimed.primaryAssetReference._xmpDM.duration | integer | mid,post | {} 