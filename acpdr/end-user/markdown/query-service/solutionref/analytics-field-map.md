# Adobe Analytics Field Mapping to ExperienceEvent XDM

Adobe Analytics report suites are published to the Adobe Experience Platform as two separate datasets. These are referred to as postvalues and midvalues. The postvalues dataset reflects the data as it's used in Analysis Workspace and the midvalues reflect the data as collected after being transformed by Processing Rules and VISTA without the commerce or visitor profile processing. Making possible the Query Service's Adobe Defined Functions (ADFs) that allow for customized sessionization and attribution to be applied at query time. Both datasets are pre-filtered to exclude the standard bot traffic and rows flagged as excluded from reporting in Analytics.

| Field Prefix | Description |
| --- | --- |
| m_ | Used to populate fields in the midvalues dataset. These mid values have data processing applied (Analytics VISTA and Processing Rules) but no attribution. |
| post_ | Used to populate the fields in the postvalues dataset. These post values have additional processing applied, including attribution, and include visit based fields. |


| Category | Analytics Field | XDM Field | Properties |
| -------- | --------------- | --------- | ---------- |
| Custom | m_evar1 - m_evar250 | _experience.analytics.customDimensions.eVars.eVar1 - _experience.analytics.customDimensions.eVars.eVar250 |
| Custom | m_prop1 - m_prop75 | _experience.analytics.customDimensions.props.prop1 - _experience.analytics.customDimensions.props.prop75 |
| Custom | m_prop1 - m_prop75 | _experience.analytics.customDimensions.listprops.prop1 - _experience.analytics.customDimensions.listprops.prop75 | value[].items <br> delimiter |
| Custom | m_hier1 | _experience.analytics.customDimensions.hierarchies.hier1 | value[].items <br> delimiter |
| Custom | m_hier2 | _experience.analytics.customDimensions.hierarchies.hier2 | value[].items <br> delimiter |
| Custom | m_hier3 | _experience.analytics.customDimensions.hierarchies.hier3 | value[].items <br> delimiter |
| Custom | m_hier4 | _experience.analytics.customDimensions.hierarchies.hier4 | value[].items <br> delimiter |
| Custom | m_hier5 | _experience.analytics.customDimensions.hierarchies.hier5 | value[].items <br> delimiter |
| Custom | m_mvvar1 | _experience.analytics.customDimensions.lists.list1 | list[].items.key <br> list[].items.value |
| Custom | m_mvvar2 | _experience.analytics.customDimensions.lists.list2 | list[].items.key <br> list[].items.value |
| Custom | m_mvvar3 | _experience.analytics.customDimensions.lists.list3 | list[].items.key <br> list[].items.value |
| Tech | m_browser | _experience.analytics.environment.browserID |
| Tech | m_browser_height | environment.browserDetails.viewportHeight |
| Tech | m_browser_width | environment.browserDetails.viewportWidth |
| Experience | m_campaign | marketing.trackingCode |
| Web | m_channel | web.webPageDetails.siteSection |
| Tech | m_color | device.colorDepth |
| Tech | m_cookies | environment.browserDetails.cookiesEnabled |
| Custom | m_event_list | commerce.checkouts <br><br> commerce.productListAdds <br><br> commerce.productListOpens <br><br> commerce.productListRemovals <br><br> commerce.productListReopens <br><br> commerce.productListViews <br><br> commerce.productViews <br><br> commerce.purchases <br><br> _experience.analytics.event1to100.event1 - _experience.analytics.event1to100.event100 <br><br> _experience.analytics.event101to200.event1 - _experience.analytics.event101to200.event100 <br><br> _experience.analytics.event201to300.event1 - _experience.analytics.event201to300.event100 <br><br> _experience.analytics.event301to400.event1 - _experience.analytics.event301to400.event100 <br><br> _experience.analytics.event401to500.event1 - _experience.analytics.event401to500.event100 <br><br> _experience.analytics.event501to600.event1 - _experience.analytics.event501to600.event100 <br><br> _experience.analytics.event601to700.event1 - _experience.analytics.event601to700.event100 <br><br> _experience.analytics.event701to800.event1 - _experience.analytics.event701to800.event100 <br><br> _experience.analytics.event801to900.event1 - _experience.analytics.event801to900.event100 <br><br> _experience.analytics.event901to1000.event1 - _experience.analytics.event901to1000.event100 | _type <br> id <br> value <br> unit |
| Profile | m_geo_city | placeContext.geo.city |
| Profile | m_geo_country | placeContext.geo.countryCode |
| Profile | m_geo_dma | placeContext.geo.dmaID |
| Profile | m_geo_latitude | placeContext.geo._schema.latitude |
| Profile | m_geo_longitude | placeContext.geo._schema.longitude |
| Profile | m_geo_region | placeContext.geo.stateProvince |
| Profile | m_geo_zip | placeContext.geo.postalCode |
| Tech | m_java_enabled | environment.browserDetails.javaEnabled |
| Search | m_keywords | search.keywords |
| Profile | m_latitude | placeContext.geo._schema.latitude |
| Profile | m_longitude | placeContext.geo._schema.longitude |
| Tech | m_mobile_id | device.typeID |
| Tech | m_mobile_id | device.typeIDService |
| Tech | m_os | _experience.analytics.environment.operatingSystemID |
| Web | m_page_event_var1 | web.webInteraction.URL |
| Web | m_page_event_var2 | web.webInteraction.name |
| Web | m_page_type | web.webPageDetails.isErrorPage |
| Web | m_page_url | web.webPageDetails.URL |
| Web | m_pagename_no_url | web.webPageDetails.name |
| Web | m_pagename_no_url | web.webPageDetails.pageViews.value |
| Search | m_paid_search | search.isPaid |
| Commerce | m_product_list | productListItems[] |
| Web | m_ref_type | web.webReferrer.type |
| Web | m_referrer | web.webReferrer.URL |
| Search | m_search_engine | search.searchEngine |
| Search | m_search_page_num | search.pageDepth |
| Profile | m_state | _experience.analytics.customDimensions.stateProvince |
| Web | m_user_server | web.webPageDetails.server |
| Profile | m_zip | _experience.analytics.customDimensions.postalCode |
| Custom | post_evar1 - post_evar250 | _experience.analytics.customDimensions.eVars.eVar1 - _experience.analytics.customDimensions.eVars.eVar250 |
| Custom | post_prop1 - post_prop75 | _experience.analytics.customDimensions.props.prop1 - _experience.analytics.customDimensions.props.prop75 |
| Custom | post_prop1 - post_prop75 | _experience.analytics.customDimensions.listprops.prop1 - _experience.analytics.customDimensions.listprops.prop75 | value[].items <br> delimiter |
| Custom | post_hier1 | _experience.analytics.customDimensions.hierarchies.hier1 | value[].items <br> delimiter |
| Custom | post_hier2 | _experience.analytics.customDimensions.hierarchies.hier2 | value[].items <br> delimiter |
| Custom | post_hier3 | _experience.analytics.customDimensions.hierarchies.hier3 | value[].items <br> delimiter |
| Custom | post_hier4 | _experience.analytics.customDimensions.hierarchies.hier4 | value[].items <br> delimiter |
| Custom | post_hier5 | _experience.analytics.customDimensions.hierarchies.hier5 | value[].items <br> delimiter |
| Custom | post_mvvar1 | _experience.analytics.customDimensions.lists.list1 | list[].items.key <br> list[].items.value |
| Custom | post_mvvar2 | _experience.analytics.customDimensions.lists.list2 | list[].items.key <br> list[].items.value |
| Custom | post_mvvar3 | _experience.analytics.customDimensions.lists.list3 | list[].items.key <br> list[].items.value |
| Tech | post_browser_height | environment.browserDetails.viewportHeight |
| Tech | post_browser_width | environment.browserDetails.viewportWidth |
| Experience | post_campaign | marketing.trackingCode |
| Web | post_channel | web.webPageDetails.siteSection |
| Tech | post_cookies | environment.browserDetails.cookiesEnabled |
| Commerce | post_currency | commerce.order.currencyCode |
| Core | post_cust_hit_time_gmt | timestamp |
| Profile | post_cust_visid | endUserIDs._experience.aacustomid.id |
| Custom | post_event_list | commerce.checkouts <br><br> commerce.productListAdds <br><br> commerce.productListOpens <br><br> commerce.productListRemovals <br><br> commerce.productListReopens <br><br> commerce.productListViews <br><br> commerce.productViews <br><br> commerce.purchases <br><br> _experience.analytics.event1to100.event1 - _experience.analytics.event1to100.event100 <br><br> _experience.analytics.event101to200.event1 - _experience.analytics.event101to200.event100 <br><br> _experience.analytics.event201to300.event1 - _experience.analytics.event201to300.event100 <br><br> _experience.analytics.event301to400.event1 - _experience.analytics.event301to400.event100 <br><br> _experience.analytics.event401to500.event1 - _experience.analytics.event401to500.event100 <br><br> _experience.analytics.event501to600.event1 - _experience.analytics.event501to600.event100 <br><br> _experience.analytics.event601to700.event1 - _experience.analytics.event601to700.event100 <br><br> _experience.analytics.event701to800.event1 - _experience.analytics.event701to800.event100 <br><br> _experience.analytics.event801to900.event1 - _experience.analytics.event801to900.event100 <br><br> _experience.analytics.event901to1000.event1 - _experience.analytics.event901to1000.event100 | _type <br> id <br> value <br> unit |
| Web | post_first_hit_page_url | _experience.analytics.endUser.firstWeb.webPageDetails.URL |
| Web | post_first_hit_pagename | _experience.analytics.endUser.firstWeb.webPageDetails.name |
| Tech | post_java_enabled | environment.browserDetails.javaEnabled |
| Search | post_keywords | search.keywords |
| Profile | post_latitude | placeContext.geo._schema.latitude |
| Profile | post_longitude | placeContext.geo._schema.longitude |
| Web | post_page_event | web.webInteraction.type |
| Web | post_page_event_var1 | web.webInteraction.URL |
| Web | post_page_event_var2 | web.webInteraction.name |
| Web | post_page_type | web.webPageDetails.isErrorPage |
| Web | post_page_url | web.webPageDetails.URL |
| Web | post_pagename_no_url | web.webPageDetails.name |
| Web | post_pagename_no_url | web.webPageDetails.pageViews.value |
| Commerce | post_product_list | productListItems[] |
| Commerce | post_purchaseid | commerce.order.purchaseID |
| Web | post_referrer | web.webReferrer.URL |
| Search | post_search_engine | search.searchEngine |
| Profile | post_state | _experience.analytics.customDimensions.stateProvince |
| Web | post_user_server | web.webPageDetails.server |
| Profile | post_visid_high | endUserIDs._experience.aaid.id |
| Profile | post_visid_high | endUserIDs._experience.aaid.primary |
| Profile | post_visid_high | endUserIDs._experience.aaid.namespace.code |
| Profile | post_visid_low | endUserIDs._experience.aaid.id |
| Profile | post_zip | _experience.analytics.customDimensions.postalCode |
| Tech | accept_language | environment.browserDetails.acceptLanguage |
| Tech | browser | _experience.analytics.environment.browserID |
| Tech | color | device.colorDepth |
| Commerce | currency | commerce.order.currencyCode |
| Web | first_hit_ref_type | _experience.analytics.endUser.firstWeb.webReferrer.type |
| Web | first_hit_referrer | _experience.analytics.endUser.firstWeb.webReferrer.URL |
| Core | first_hit_time_gmt | _experience.analytics.endUser.firstTimestamp |
| Profile | geo_city | placeContext.geo.city |
| Profile | geo_country | placeContext.geo.countryCode |
| Profile | geo_dma | placeContext.geo.dmaID |
| Profile | geo_latitude | placeContext.geo._schema.latitude |
| Profile | geo_longitude | placeContext.geo._schema.longitude |
| Profile | geo_region | placeContext.geo.stateProvince |
| Profile | geo_zip | placeContext.geo.postalCode |
| Core | hit_time_gmt | receivedTimestamp |
| Core | hitid_high | id |
| Core | hitid_low | id |
| Web | homepage | web.webPageDetails.isHomePage |
| Core | ip | environment.ipV4 |
| Core | ipv6 | environment.ipV6 |
| Tech | j_jscript | environment.browserDetails.javaScriptVersion |
| Tech | j_jscript | environment.browserDetails.javaScriptEnabled |
| Tech | java_enabled | environment.browserDetails.javaEnabled |
| Profile | mcvisid_high | endUserIDs._experience.mcid.id |
| Profile | mcvisid_high | endUserIDs._experience.mcid.primary |
| Profile | mcvisid_high | endUserIDs._experience.mcid.namespace.code |
| Profile | mcvisid_low | endUserIDs._experience.mcId.id |
| Tech | mobile_id | device.typeID |
| Tech | mobile_id | device.typeIDService |
| Tech | os | _experience.analytics.environment.operatingSystemID |
| Web | page_event | web.webInteraction.type |
| Search | paid_search | search.isPaid |
| Web | ref_type | web.webReferrer.type |
| Web | referrer | web.webReferrer.URL |
| Tech | s_resolution | device.screenWidth |
| Tech | s_resolution | device.screenHeight |
| Search | search_engine | search.searchEngine |
| Search | search_page_num | search.pageDepth |
| Tech | user_agent | environment.browserDetails.userAgent |
| Web | user_server | web.webPageDetails.server |
| Core | visit_num | _experience.analytics.session.num |
| Content Aware - Mobile App | mobileappid | application.name |
| Content Aware - Mobile App | mobiledevice | device.typeID |
| Content Aware - Mobile App | mobileosversion | environment.operatingSystem |
| Content Aware - Mobile App | mobileosversion | environment.operatingSystemVersion |
| Content Aware - Mobile App | pointofinterest | placeContext.POIinteraction.POIDetail.name |
| Content Aware - Mobile App | pointofinterestdistance | placeContext.POIinteraction.POIDetail.geoInteractionDetails.distanceToCenter |
| Content Aware - Mobile App | mobilebeaconproximity | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.proximity |
| Content Aware - Mobile App | mobileplaceaccuracy | placeContext.POIinteraction.POIDetail.geoInteractionDetails.deviceGeoAccuracy |
| Content Aware - Mobile App | mobileplacecategory | placeContext.POIinteraction.POIDetail.category |
| Content Aware - Mobile App | mobileplaceid | placeContext.POIinteraction.POIDetail.POIID |
| Content Aware - Video | videoad | advertising.adAssetReference._id |
| Content Aware - Video | videocontenttype | media.mediaTimed.primaryAssetViewDetails.broadcastContentType |
| Content Aware - Video | videoadinpod | advertising.adAssetViewDetails.index |
| Content Aware - Video | videoplayername | media.mediaTimed.primaryAssetViewDetails.playerName |
| Content Aware - Video | videochannel | media.mediaTimed.primaryAssetViewDetails.broadcastChannel |
| Content Aware - Video | videoadplayername | advertising.adAssetViewDetails.playerName |
| Content Aware - Video | videochapter | media.mediaTimed.mediaChapter.chapterAssetReference._id |
| Content Aware - Video | videochapter | media.mediaTimed.mediaChapter.chapterAssetReference._xmpDM.duration |
| Content Aware - Video | videoname | media.mediaTimed.primaryAssetReference._dc.title |
| Content Aware - Video | videolength | media.mediaTimed.primaryAssetReference._xmpDM.duration |
| Content Aware - Video | videoadname | advertising.adAssetReference._dc.title |
| Content Aware - Video | videoadlength | advertising.adAssetReference._xmpDM.duration |
| Content Aware - Video | videoshow | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Series._iptc4xmpExt.Name |
| Content Aware - Video | videoseason | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Season._iptc4xmpExt.Name |
| Content Aware - Video | videoepisode | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Episode._iptc4xmpExt.Name |
| Content Aware - Video | videonetwork | media.mediaTimed.primaryAssetViewDetails.broadcastNetwork |
| Content Aware - Video | videoshowtype | media.mediaTimed.primaryAssetReference.showType |
| Content Aware - Video | videoadload | media.mediaTimed.primaryAssetViewDetails.adLoadType |
| Content Aware - Video | videofeedtype | media.mediaTimed.primaryAssetViewDetails.sourceFeed |
| Content Aware - Mobile App | mobilebeaconmajor | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.beaconMajor |
| Content Aware - Mobile App | mobilebeaconminor | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.beaconMinor |
| Content Aware - Mobile App | mobilebeaconuuid | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.proximityUUID |
| Content Aware - Video | videosessionid | media.mediaTimed.primaryAssetViewDetails._id |
| Content Aware - Video | videogenre | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Genre |
| Content Aware - Mobile App | mobileinstalls | application.firstLaunches |
| Content Aware - Mobile App | mobileupgrades | application.upgrades |
| Content Aware - Mobile App | mobilelaunches | application.launches |
| Content Aware - Mobile App | mobilecrashes | application.crashes |
| Content Aware - Mobile App | mobilemessageclicks | directMarketing.clicks |
| Content Aware - Mobile App | mobileplaceentry | placeContext.POIinteraction.poiEntries |
| Content Aware - Mobile App | mobileplaceexit | placeContext.POIinteraction.poiExits |
| Content Aware - Video | videotime | media.mediaTimed.timePlayed |
| Content Aware - Video | videostart | media.mediaTimed.impressions |
| Content Aware - Video | videocomplete | media.mediaTimed.completes |
| Content Aware - Video | videosegmentviews | media.mediaTimed.mediaSegmentViews |
| Content Aware - Video | videoadstart | advertising.impressions |
| Content Aware - Video | videoadcomplete | advertising.completes |
| Content Aware - Video | videoadtime | advertising.timePlayed |
| Content Aware - Video | videochapterstart | media.mediaTimed.mediaChapter.impressions |
| Content Aware - Video | videochaptercomplete | media.mediaTimed.mediaChapter.completes |
| Content Aware - Video | videochaptertime | media.mediaTimed.mediaChapter.timePlayed |
| Content Aware - Video | videoplay | media.mediaTimed.starts |
| Content Aware - Video | videototaltime | media.mediaTimed.totalTimePlayed |
| Content Aware - Video | videoqoetimetostart | media.mediaTimed.primaryAssetViewDetails.qoe.timeToStart |
| Content Aware - Video | videoqoedropbeforestart | media.mediaTimed.dropBeforeStarts |
| Content Aware - Video | videoqoebuffercount | media.mediaTimed.primaryAssetViewDetails.qoe.buffers |
| Content Aware - Video | videoqoebuffertime | media.mediaTimed.primaryAssetViewDetails.qoe.bufferTime |
| Content Aware - Video | videoqoebitratechangecount | media.mediaTimed.primaryAssetViewDetails.qoe.bitrateChanges |
| Content Aware - Video | videoqoebitrateaverage | media.mediaTimed.primaryAssetViewDetails.qoe.bitrateAverage |
| Content Aware - Video | videoqoeerrorcount | media.mediaTimed.primaryAssetViewDetails.qoe.errors |
| Content Aware - Video | videoqoedroppedframecount | media.mediaTimed.primaryAssetViewDetails.qoe.droppedFrames |
| Content Aware - Video | videoprogress10 | media.mediaTimed.progress10 |
| Content Aware - Video | videoprogress25 | media.mediaTimed.progress25 |
| Content Aware - Video | videoprogress50 | media.mediaTimed.progress50 |
| Content Aware - Video | videoprogress75 | media.mediaTimed.progress75 |
| Content Aware - Video | videoprogress95 | media.mediaTimed.progress95 |
| Content Aware - Video | videoresume | media.mediaTimed.resumes |
| Content Aware - Video | videopausecount | media.mediaTimed.pauses |
| Content Aware - Video | videopausetime | media.mediaTimed.pauseTime |
| Content Aware - Video | videosecondssincelastcall | media.mediaTimed.primaryAssetViewDetails.sessionTimeout |
