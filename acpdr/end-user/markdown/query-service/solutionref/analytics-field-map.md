# Adobe Analytics Field Mapping to ExperienceEvent XDM

Adobe Analytics report suites are published to Adobe Experience Platform as two separate datasets. These are referred to as postvalues and midvalues. The postvalues dataset reflects the data as it's used in Analysis Workspace and the midvalues reflect the data as collected after being transformed by Processing Rules and VISTA without the commerce or visitor profile processing. The midvalues dataset makes it possible for the Query Service's Adobe Defined Functions (ADFs) customize the sessionization and attribution applied to reporting. Both datasets are pre-filtered to exclude the standard bot traffic and rows flagged as excluded from reporting in Analytics. The midvalues dataset is also streamed to the Adobe Experience Platform to support near real-time use cases of Unified Profile.

| Field Prefix | Description |
| --- | --- |
| m\_ | Used to populate fields in the midvalues dataset. These mid values have data processing applied (Analytics VISTA and Processing Rules) but no attribution. |
| post\_ | Used to populate the fields in the postvalues dataset. These post values have additional processing applied, including attribution, and include visit based fields. |

![ADC Process](../graphics/Analytics%20Data%20Connector%20Process.png?token=AAAaGnEEYGCU6OxcnHfA8BUdznYMzDqcks5cJUGLwA%3D%3D)

Direct Mapping

These are fields that are mapped directly as is to XDM from Analytics.

**Count:** 930

| Analytics Field | XDM Field  | XDM Type | DataSet | Properties | Description |
| --------------- | ---------- | -------- | ------- | ---------- |------------ |
| m_evar1 - m_evar250 | _experience.analytics.customDimensions.eVars.eVar1 - _experience.analytics.customDimensions.eVars.eVar250 | string | mid | {} | - |
| m_prop1 - m_prop75 | _experience.analytics.customDimensions.props.prop1 - _experience.analytics.customDimensions.props.prop75 | string | mid | {} | - |
| m_browser | _experience.analytics.environment.browserID | integer | mid | {} | - |
| m_browser_height | environment.browserDetails.viewportHeight | integer | mid | {} | - |
| m_browser_width | environment.browserDetails.viewportWidth | integer | mid | {} | - |
| m_campaign | marketing.trackingCode | string | mid | {} | - |
| m_channel | web.webPageDetails.siteSection | string | mid | {} | - |
| m_domain | environment.domain | string | mid | {} | - |
| m_geo_city | placeContext.geo.city | string | mid | {} | - |
| m_geo_dma | placeContext.geo.dmaID | integer | mid | {} | - |
| m_geo_region | placeContext.geo.stateProvince | string | mid | {} | - |
| m_geo_zip | placeContext.geo.postalCode | string | mid | {} | - |
| m_keywords | search.keywords | string | mid | {} | - |
| m_os | _experience.analytics.environment.operatingSystemID | integer | mid | {} | - |
| m_page_url | web.webPageDetails.URL | string | mid | {} | - |
| m_pagename_no_url | web.webPageDetails.name | string | mid | {} | - |
| m_referrer | web.webReferrer.URL | string | mid | {} | - |
| m_search_page_num | search.pageDepth | integer | mid | {} | - |
| m_state | _experience.analytics.customDimensions.stateProvince | string | mid | {} | - |
| m_user_server | web.webPageDetails.server | string | mid | {} | - |
| m_zip | _experience.analytics.customDimensions.postalCode | string | mid | {} | - |
| post_evar1 - post_evar250 | _experience.analytics.customDimensions.eVars.eVar1 - _experience.analytics.customDimensions.eVars.eVar250 | string | post | {} | - |
| post_prop1 - post_prop75 | _experience.analytics.customDimensions.props.prop1 - _experience.analytics.customDimensions.props.prop75 | string | post | {} | - |
| post_browser_height | environment.browserDetails.viewportHeight | integer | post | {} | - |
| post_browser_width | environment.browserDetails.viewportWidth | integer | post | {} | - |
| post_campaign | marketing.trackingCode | string | post | {} | - |
| post_channel | web.webPageDetails.siteSection | string | post | {} | - |
| post_cust_visid | endUserIDs._experience.aacustomid.id | string | mid,post | {} | - |
| post_first_hit_page_url | _experience.analytics.endUser.firstWeb.webPageDetails.URL | string | post | {} | - |
| post_first_hit_pagename | _experience.analytics.endUser.firstWeb.webPageDetails.name | string | post | {} | - |
| post_keywords | search.keywords | string | post | {} | - |
| post_page_url | web.webPageDetails.URL | string | post | {} | - |
| post_pagename_no_url | web.webPageDetails.name | string | post | {} | - |
| post_purchaseid | commerce.order.purchaseID | string | mid,post | {} | - |
| post_referrer | web.webReferrer.URL | string | post | {} | - |
| post_state | _experience.analytics.customDimensions.stateProvince | string | post | {} | - |
| post_user_server | web.webPageDetails.server | string | post | {} | - |
| post_zip | _experience.analytics.customDimensions.postalCode | string | post | {} | - |
| accept_language | environment.browserDetails.acceptLanguage | string | mid,post | {} | - |
| browser | _experience.analytics.environment.browserID | integer | post | {} | - |
| domain | environment.domain | string | post | {} | - |
| first_hit_referrer | _experience.analytics.endUser.firstWeb.webReferrer.URL | string | post | {} | - |
| geo_city | placeContext.geo.city | string | post | {} | - |
| geo_dma | placeContext.geo.dmaID | integer | post | {} | - |
| geo_region | placeContext.geo.stateProvince | string | post | {} | - |
| geo_zip | placeContext.geo.postalCode | string | post | {} | - |
| ipv6 | environment.ipV6 | string | mid,post | {} | - |
| j_jscript | environment.browserDetails.javaScriptVersion | string | mid,post | {} | - |
| os | _experience.analytics.environment.operatingSystemID | integer | post | {} | - |
| search_page_num | search.pageDepth | integer | post | {} | - |
| user_agent | environment.browserDetails.userAgent | string | mid,post | {} | - |
| visit_keywords | _experience.analytics.session.search.keywords | string | post | {} | - |
| visit_num | _experience.analytics.session.num | integer | post | {} | - |
| visit_page_num | _experience.analytics.session.depth | integer | post | {} | - |
| visit_referrer | _experience.analytics.session.web.webReferrer.URL | string | post | {} | - |
| visit_search_page_num | _experience.analytics.session.search.pageDepth | integer | post | {} | - |
| mobileappid | application.name | string | mid,post | {} | - |
| mobiledevice | device.model | string | mid,post | {} | - |
| pointofinterest | placeContext.POIinteraction.POIDetail.name | string | mid,post | {} | - |
| pointofinterestdistance | placeContext.POIinteraction.POIDetail.geoInteractionDetails.distanceToCenter | number | mid,post | {} | - |
| mobileplaceaccuracy | placeContext.POIinteraction.POIDetail.geoInteractionDetails.deviceGeoAccuracy | number | mid,post | {} | - |
| mobileplacecategory | placeContext.POIinteraction.POIDetail.category | string | mid,post | {} | - |
| mobileplaceid | placeContext.POIinteraction.POIDetail.POIID | string | mid,post | {} | - |
| video | media.mediaTimed.primaryAssetReference._id | string | mid,post | {} | - |
| videoad | advertising.adAssetReference._id | string | mid,post | {} | - |
| videocontenttype | media.mediaTimed.primaryAssetViewDetails.broadcastContentType | string | mid,post | {} | - |
| videoadpod | advertising.adAssetViewDetails.adBreak._id | string | mid,post | {} | - |
| videoadinpod | advertising.adAssetViewDetails.index | integer | mid,post | {} | - |
| videoplayername | media.mediaTimed.primaryAssetViewDetails.playerName | string | mid,post | {} | - |
| videochannel | media.mediaTimed.primaryAssetViewDetails.broadcastChannel | string | mid,post | {} | - |
| videoadplayername | advertising.adAssetViewDetails.playerName | string | mid,post | {} | - |
| videochapter | media.mediaTimed.mediaChapter.chapterAssetReference._id | string | mid,post | {} | - |
| videoname | media.mediaTimed.primaryAssetReference._dc.title | string | mid,post | {} | - |
| videoadname | advertising.adAssetReference._dc.title | string | mid,post | {} | - |
| videoshow | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Series._iptc4xmpExt.Name | string | mid,post | {} | - |
| videoseason | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Season._iptc4xmpExt.Name | string | mid,post | {} | - |
| videoepisode | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Episode._iptc4xmpExt.Name | string | mid,post | {} | - |
| videonetwork | media.mediaTimed.primaryAssetViewDetails.broadcastNetwork | string | mid,post | {} | - |
| videoshowtype | media.mediaTimed.primaryAssetReference.showType | string | mid,post | {} | - |
| videoadload | media.mediaTimed.primaryAssetViewDetails.adLoadType | string | mid,post | {} | - |
| videofeedtype | media.mediaTimed.primaryAssetViewDetails.sourceFeed | string | mid,post | {} | - |
| mobilebeaconmajor | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.beaconMajor | number | mid,post | {} | - |
| mobilebeaconminor | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.beaconMinor | number | mid,post | {} | - |
| mobilebeaconuuid | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.proximityUUID | string | mid,post | {} | - |
| videosessionid | media.mediaTimed.primaryAssetViewDetails._id | string | mid,post | {} | - |
| videogenre | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Genre | array | mid,post | {title (Object), description (Object), type (Object), meta:xdmType (Object), items (string), meta:xdmField (Object)} | - |
| mobileinstalls | application.firstLaunches | Object | mid,post | {id (string), value (number)} | - |
| mobileupgrades | application.upgrades | Object | mid,post | {id (string), value (number)} | - |
| mobilelaunches | application.launches | Object | mid,post | {id (string), value (number)} | - |
| mobilecrashes | application.crashes | Object | mid,post | {id (string), value (number)} | - |
| mobilemessageclicks | directMarketing.clicks | Object | mid,post | {id (string), value (number)} | - |
| mobileplaceentry | placeContext.POIinteraction.poiEntries | Object | mid,post | {id (string), value (number)} | - |
| mobileplaceexit | placeContext.POIinteraction.poiExits | Object | mid,post | {id (string), value (number)} | - |
| videotime | media.mediaTimed.timePlayed | Object | mid,post | {id (string), value (number)} | - |
| videostart | media.mediaTimed.impressions | Object | mid,post | {id (string), value (number)} | - |
| videocomplete | media.mediaTimed.completes | Object | mid,post | {id (string), value (number)} | - |
| videosegmentviews | media.mediaTimed.mediaSegmentViews | Object | mid,post | {id (string), value (number)} | - |
| videoadstart | advertising.impressions | Object | mid,post | {id (string), value (number)} | - |
| videoadcomplete | advertising.completes | Object | mid,post | {id (string), value (number)} | - |
| videoadtime | advertising.timePlayed | Object | mid,post | {id (string), value (number)} | - |
| videochapterstart | media.mediaTimed.mediaChapter.impressions | Object | mid,post | {id (string), value (number)} | - |
| videochaptercomplete | media.mediaTimed.mediaChapter.completes | Object | mid,post | {id (string), value (number)} | - |
| videochaptertime | media.mediaTimed.mediaChapter.timePlayed | Object | mid,post | {id (string), value (number)} | - |
| videoplay | media.mediaTimed.starts | Object | mid,post | {id (string), value (number)} | - |
| videototaltime | media.mediaTimed.totalTimePlayed | Object | mid,post | {id (string), value (number)} | - |
| videoqoetimetostart | media.mediaTimed.primaryAssetViewDetails.qoe.timeToStart | Object | mid,post | {id (string), value (number)} | - |
| videoqoedropbeforestart | media.mediaTimed.dropBeforeStarts | Object | mid,post | {id (string), value (number)} | - |
| videoqoebuffercount | media.mediaTimed.primaryAssetViewDetails.qoe.buffers | Object | mid,post | {id (string), value (number)} | - |
| videoqoebuffertime | media.mediaTimed.primaryAssetViewDetails.qoe.bufferTime | Object | mid,post | {id (string), value (number)} | - |
| videoqoebitratechangecount | media.mediaTimed.primaryAssetViewDetails.qoe.bitrateChanges | Object | mid,post | {id (string), value (number)} | - |
| videoqoebitrateaverage | media.mediaTimed.primaryAssetViewDetails.qoe.bitrateAverage | Object | mid,post | {id (string), value (number)} | - |
| videoqoeerrorcount | media.mediaTimed.primaryAssetViewDetails.qoe.errors | Object | mid,post | {id (string), value (number)} | - |
| videoqoedroppedframecount | media.mediaTimed.primaryAssetViewDetails.qoe.droppedFrames | Object | mid,post | {id (string), value (number)} | - |
| videoprogress10 | media.mediaTimed.progress10 | Object | mid,post | {id (string), value (number)} | - |
| videoprogress25 | media.mediaTimed.progress25 | Object | mid,post | {id (string), value (number)} | - |
| videoprogress50 | media.mediaTimed.progress50 | Object | mid,post | {id (string), value (number)} | - |
| videoprogress75 | media.mediaTimed.progress75 | Object | mid,post | {id (string), value (number)} | - |
| videoprogress95 | media.mediaTimed.progress95 | Object | mid,post | {id (string), value (number)} | - |
| videoresume | media.mediaTimed.resumes | Object | mid,post | {id (string), value (number)} | - |
| videopausecount | media.mediaTimed.pauses | Object | mid,post | {id (string), value (number)} | - |
| videopausetime | media.mediaTimed.pauseTime | Object | mid,post | {id (string), value (number)} | - |
| videosecondssincelastcall | media.mediaTimed.primaryAssetViewDetails.sessionTimeout | integer | mid,post | {} | - |

Split Mapping

These fields have a single source and map to multiple XDM locations.

**Count:** 5

| Analytics Field | XDM Field  | XDM Type | DataSet | Properties | Description |
| --------------- | ---------- | -------- | ------- | ---------- |------------ |
| s_resolution | device.screenWidth | integer | mid,post | [] | - |
| s_resolution | device.screenHeight | integer | mid,post | [] | - |
| mobileosversion | environment.operatingSystem | string | mid,post | [] | - |
| mobileosversion | environment.operatingSystemVersion | string | mid,post | [] | - |
| videoadlength | advertising.adAssetReference._xmpDM.duration | integer | mid,post | [] | - |

Transformed or Generated Mapping

These XDM paths require logic beyond a direct copy from Analytics.

**Count:** 81

| Analytics Field | XDM Field  | XDM Type | DataSet | Properties | Description |
| --------------- | ---------- | -------- | ------- | ---------- |------------ |
| m_prop1 - m_prop75 | _experience.analytics.customDimensions.listprops.prop1 - _experience.analytics.customDimensions.listprops.prop75 | Object | mid | {} | - |
| m_hier1 - m_hier5 | _experience.analytics.customDimensions.hierarchies.hier1 - _experience.analytics.customDimensions.hierarchies.hier5 | Object | mid | {values (array), delimiter (string)} | - |
| m_mvvar1 - m_mvvar3 | _experience.analytics.customDimensions.lists.list1.list[] - _experience.analytics.customDimensions.lists.list3.list[] | array | mid | {value (string), key (string)} | - |
| m_color | device.colorDepth | integer | mid | {} | - |
| m_cookies | environment.browserDetails.cookiesEnabled | boolean | mid | {} | - |
| m_event_list | commerce.purchases, commerce.productViews, commerce.productListOpens, commerce.checkouts, commerce.productListAdds, commerce.productListRemovals, commerce.productListViews | Object | mid | {id (string), value (number)} | - |
| m_event_list | _experience.analytics.event1to100.event1 - _experience.analytics.event1to100.event100, _experience.analytics.event101to200.event101 - _experience.analytics.event101to200.event200, _experience.analytics.event201to300.event201 - _experience.analytics.event201to300.event300, _experience.analytics.event301to400.event301 - _experience.analytics.event301to400.event400, _experience.analytics.event401to500.event401 - _experience.analytics.event401to500.event500, _experience.analytics.event501to600.event501 - _experience.analytics.event501to600.event600, _experience.analytics.event601to700.event601 - _experience.analytics.event601to700.event700, _experience.analytics.event701to800.event701 - _experience.analytics.event701to800.event800, _experience.analytics.event801to900.event801 - _experience.analytics.event801to900.event900, _experience.analytics.event901to1000.event901 - _experience.analytics.event901to1000.event1000 | Object | mid | {id (Object), value (Object)} | - |
| m_geo_country | placeContext.geo.countryCode | string | mid | {} | - |
| m_geo_latitude | placeContext.geo._schema.latitude | number | mid | {} | - |
| m_geo_longitude | placeContext.geo._schema.longitude | number | mid | {} | - |
| m_java_enabled | environment.browserDetails.javaEnabled | boolean | mid | {} | - |
| m_latitude | placeContext.geo._schema.latitude | number | mid | {} | - |
| m_longitude | placeContext.geo._schema.longitude | number | mid | {} | - |
| m_page_event_var1 | web.webInteraction.URL | string | mid | {} | - |
| m_page_event_var2 | web.webInteraction.name | string | mid | {} | - |
| m_page_type | web.webPageDetails.isErrorPage | boolean | mid | {} | - |
| m_pagename_no_url | web.webPageDetails.pageViews.value | number | mid | {} | - |
| m_paid_search | search.isPaid | boolean | mid | {} | - |
| m_product_list | productListItems[].items | array | mid | {SKU (string), quantity (integer), priceTotal (number)} | - |
| m_ref_type | web.webReferrer.type | string | mid | {} | - |
| m_search_engine | search.searchEngine | string | mid | {} | - |
| post_prop1 - post_prop75 | _experience.analytics.customDimensions.listprops.prop1 - _experience.analytics.customDimensions.listprops.prop75 | Object | post | {} | - |
| post_hier1 - post_hier5 | _experience.analytics.customDimensions.hierarchies.hier1 - _experience.analytics.customDimensions.hierarchies.hier5 | Object | post | {values (array), delimiter (string)} | - |
| post_mvvar1 - post_mvvar3 | _experience.analytics.customDimensions.lists.list1.list[] - _experience.analytics.customDimensions.lists.list3.list[] | array | post | {value (string), key (string)} | - |
| post_cookies | environment.browserDetails.cookiesEnabled | boolean | post | {} | - |
| post_currency | commerce.order.currencyCode | string | mid,post | {} | - |
| post_cust_hit_time_gmt | timestamp | string | mid,post | {} | - |
| post_cust_visid | identityMap | object | mid,post | {} | - |
| post_cust_visid | endUserIDs._experience.aacustomid.primary | boolean | mid,post | {} | - |
| post_cust_visid | endUserIDs._experience.aacustomid.namespace.code | string | mid,post | {} | - |
| post_event_list | commerce.purchases, commerce.productViews, commerce.productListOpens, commerce.checkouts, commerce.productListAdds, commerce.productListRemovals, commerce.productListViews | Object | post | {id (string), value (number)} | - |
| post_event_list | _experience.analytics.event1to100.event1 - _experience.analytics.event1to100.event100, _experience.analytics.event101to200.event101 - _experience.analytics.event101to200.event200, _experience.analytics.event201to300.event201 - _experience.analytics.event201to300.event300, _experience.analytics.event301to400.event301 - _experience.analytics.event301to400.event400, _experience.analytics.event401to500.event401 - _experience.analytics.event401to500.event500, _experience.analytics.event501to600.event501 - _experience.analytics.event501to600.event600, _experience.analytics.event601to700.event601 - _experience.analytics.event601to700.event700, _experience.analytics.event701to800.event701 - _experience.analytics.event701to800.event800, _experience.analytics.event801to900.event801 - _experience.analytics.event801to900.event900, _experience.analytics.event901to1000.event901 - _experience.analytics.event901to1000.event1000 | Object | post | {id (Object), value (Object)} | - |
| post_java_enabled | environment.browserDetails.javaEnabled | boolean | post | {} | - |
| post_latitude | placeContext.geo._schema.latitude | number | post | {} | - |
| post_longitude | placeContext.geo._schema.longitude | number | post | {} | - |
| post_page_event | web.webInteraction.type | string | mid,post | {} | - |
| post_page_event | web.webInteraction.linkClicks.value | number | mid,post | {} | - |
| post_page_event_var1 | web.webInteraction.URL | string | post | {} | - |
| post_page_event_var2 | web.webInteraction.name | string | post | {} | - |
| post_page_type | web.webPageDetails.isErrorPage | boolean | post | {} | - |
| post_pagename_no_url | web.webPageDetails.pageViews.value | number | post | {} | - |
| post_product_list | productListItems[].items | array | post | {SKU (string), quantity (integer), priceTotal (number)} | - |
| post_search_engine | search.searchEngine | string | post | {} | - |
| post_visid_high + visid_low | identityMap | object | mid,post | {} | - |
| post_visid_high + visid_low | endUserIDs._experience.aaid.id | string | mid,post | {} | - |
| post_visid_high | endUserIDs._experience.aaid.primary | boolean | mid,post | {} | - |
| post_visid_high | endUserIDs._experience.aaid.namespace.code | string | mid,post | {} | - |
| post_visid_low | identityMap | object | mid,post | {} | - |
| mvvar1_instances | .list.items[] | Object | post | {} | - |
| mvvar2_instances | .list.items[] | Object | post | {} | - |
| mvvar3_instances | .list.items[] | Object | post | {} | - |
| color | device.colorDepth | integer | post | {} | - |
| first_hit_ref_type | _experience.analytics.endUser.firstWeb.webReferrer.type | string | post | {} | - |
| first_hit_time_gmt | _experience.analytics.endUser.firstTimestamp | integer | post | {} | - |
| geo_country | placeContext.geo.countryCode | string | post | {} | - |
| geo_latitude | placeContext.geo._schema.latitude | number | post | {} | - |
| geo_longitude | placeContext.geo._schema.longitude | number | post | {} | - |
| hit_time_gmt | receivedTimestamp | string | mid,post | {} | - |
| hitid_high + hitid_low | _id | string | mid,post | {} | - |
| hitid_low | _id | string | mid,post | {} | - |
| homepage | web.webPageDetails.isHomePage | boolean | mid,post | {} | - |
| ip | environment.ipV4 | string | mid,post | {} | - |
| j_jscript | environment.browserDetails.javaScriptEnabled | boolean | mid,post | {} | - |
| mcvisid_high + mcvisid_low | identityMap | object | mid,post | {} | - |
| mcvisid_high + mcvisid_low | endUserIDs._experience.mcid.id | string | mid,post | {} | - |
| mcvisid_high | endUserIDs._experience.mcid.primary | boolean | mid,post | {} | - |
| mcvisid_high | endUserIDs._experience.mcid.namespace.code | string | mid,post | {} | - |
| mcvisid_low | identityMap | object | mid,post | {} | - |
| paid_search | search.isPaid | boolean | post | {} | - |
| ref_type | web.webReferrer.type | string | post | {} | - |
| sdid_high + sdid_low | _experience.target.supplementalDataID | string | mid,post | {} | - |
| sdid_low | _experience.target.supplementalDataID | string | mid,post | {} | - |
| visit_paid_search | _experience.analytics.session.search.isPaid | boolean | post | {} | - |
| visit_ref_type | _experience.analytics.session.web.webReferrer.type | string | post | {} | - |
| visit_search_engine | _experience.analytics.session.search.searchEngine | string | post | {} | - |
| visit_start_time_gmt | _experience.analytics.session.timestamp | integer | post | {} | - |
| mobilebeaconproximity | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.proximity | string | mid,post | {} | - |
| videochapter | media.mediaTimed.mediaChapter.chapterAssetReference._xmpDM.duration | integer | mid,post | {} | - |
| videolength | media.mediaTimed.primaryAssetReference._xmpDM.duration | integer | mid,post | {} | - |
