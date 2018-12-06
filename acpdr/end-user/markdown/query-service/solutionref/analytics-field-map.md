# Adobe Analytics Field Mapping to ExperienceEvent XDM

Adobe Analytics report suites are published to Adobe Experience Platform as two separate datasets. These are referred to as postvalues and midvalues. The postvalues dataset reflects the data as it's used in Analysis Workspace and the midvalues reflect the data as collected after being transformed by Processing Rules and VISTA without the commerce or visitor profile processing. Making possible the Query Service's Adobe Defined Functions (ADFs) that allow for customized sessionization and attribution to be applied at query time. Both datasets are pre-filtered to exclude the standard bot traffic and rows flagged as excluded from reporting in Analytics.

| Field Prefix | Description |
| --- | --- |
| m\_ | Used to populate fields in the midvalues dataset. These mid values have data processing applied (Analytics VISTA and Processing Rules) but no attribution. |
| post\_ | Used to populate the fields in the postvalues dataset. These post values have additional processing applied, including attribution, and include visit based fields. |


| Category | Analytics Field | XDM Field | Properties |
| -------- | --------------- | --------- | ---------- |
| Custom | m\_evar1 - m\_evar250 | \_experience.analytics.customDimensions.eVars.eVar1 - \_experience.analytics.customDimensions.eVars.eVar250 |
| Custom | m\_prop1 - m\_prop75 | \_experience.analytics.customDimensions.props.prop1 - \_experience.analytics.customDimensions.props.prop75 |
| Custom | m\_prop1 - m\_prop75 | \_experience.analytics.customDimensions.listprops.prop1 - \_experience.analytics.customDimensions.listprops.prop75 | value[].items <br> delimiter |
| Custom | m\_hier1 | \_experience.analytics.customDimensions.hierarchies.hier1 | value[].items <br> delimiter |
| Custom | m\_hier2 | \_experience.analytics.customDimensions.hierarchies.hier2 | value[].items <br> delimiter |
| Custom | m\_hier3 | \_experience.analytics.customDimensions.hierarchies.hier3 | value[].items <br> delimiter |
| Custom | m\_hier4 | \_experience.analytics.customDimensions.hierarchies.hier4 | value[].items <br> delimiter |
| Custom | m\_hier5 | \_experience.analytics.customDimensions.hierarchies.hier5 | value[].items <br> delimiter |
| Custom | m\_mvvar1 | \_experience.analytics.customDimensions.lists.list1 | list[].items.key <br> list[].items.value |
| Custom | m\_mvvar2 | \_experience.analytics.customDimensions.lists.list2 | list[].items.key <br> list[].items.value |
| Custom | m\_mvvar3 | \_experience.analytics.customDimensions.lists.list3 | list[].items.key <br> list[].items.value |
| Tech | m\_browser | \_experience.analytics.environment.browserID |
| Tech | m\_browser\_height | environment.browserDetails.viewportHeight |
| Tech | m\_browser\_width | environment.browserDetails.viewportWidth |
| Experience | m\_campaign | marketing.trackingCode |
| Web | m\_channel | web.webPageDetails.siteSection |
| Tech | m\_color | device.colorDepth |
| Tech | m\_cookies | environment.browserDetails.cookiesEnabled |
| Custom | m\_event\_list | commerce.checkouts <br><br> commerce.productListAdds <br><br> commerce.productListOpens <br><br> commerce.productListRemovals <br><br> commerce.productListReopens <br><br> commerce.productListViews <br><br> commerce.productViews <br><br> commerce.purchases <br><br> \_experience.analytics.event1to100.event1 - \_experience.analytics.event1to100.event100 <br><br> \_experience.analytics.event101to200.event1 - \_experience.analytics.event101to200.event100 <br><br> \_experience.analytics.event201to300.event1 - \_experience.analytics.event201to300.event100 <br><br> \_experience.analytics.event301to400.event1 - \_experience.analytics.event301to400.event100 <br><br> \_experience.analytics.event401to500.event1 - \_experience.analytics.event401to500.event100 <br><br> \_experience.analytics.event501to600.event1 - \_experience.analytics.event501to600.event100 <br><br> \_experience.analytics.event601to700.event1 - \_experience.analytics.event601to700.event100 <br><br> \_experience.analytics.event701to800.event1 - \_experience.analytics.event701to800.event100 <br><br> \_experience.analytics.event801to900.event1 - \_experience.analytics.event801to900.event100 <br><br> \_experience.analytics.event901to1000.event1 - \_experience.analytics.event901to1000.event100 | \_type <br> id <br> value <br> unit |
| Profile | m\_geo\_city | placeContext.geo.city |
| Profile | m\_geo\_country | placeContext.geo.countryCode |
| Profile | m\_geo\_dma | placeContext.geo.dmaID |
| Profile | m\_geo\_latitude | placeContext.geo.\_schema.latitude |
| Profile | m\_geo\_longitude | placeContext.geo.\_schema.longitude |
| Profile | m\_geo\_region | placeContext.geo.stateProvince |
| Profile | m\_geo\_zip | placeContext.geo.postalCode |
| Tech | m\_java\_enabled | environment.browserDetails.javaEnabled |
| Search | m\_keywords | search.keywords |
| Profile | m\_latitude | placeContext.geo.\_schema.latitude |
| Profile | m\_longitude | placeContext.geo.\_schema.longitude |
| Tech | m\_mobile\_id | device.typeID |
| Tech | m\_mobile\_id | device.typeIDService |
| Tech | m\_os | \_experience.analytics.environment.operatingSystemID |
| Web | m\_page\_event\_var1 | web.webInteraction.URL |
| Web | m\_page\_event\_var2 | web.webInteraction.name |
| Web | m\_page\_type | web.webPageDetails.isErrorPage |
| Web | m\_page\_url | web.webPageDetails.URL |
| Web | m\_pagename\_no\_url | web.webPageDetails.name |
| Web | m\_pagename\_no\_url | web.webPageDetails.pageViews.value |
| Search | m\_paid\_search | search.isPaid |
| Commerce | m\_product\_list | productListItems[] |
| Web | m\_ref\_type | web.webReferrer.type |
| Web | m\_referrer | web.webReferrer.URL |
| Search | m\_search\_engine | search.searchEngine |
| Search | m\_search\_page\_num | search.pageDepth |
| Profile | m\_state | \_experience.analytics.customDimensions.stateProvince |
| Web | m\_user\_server | web.webPageDetails.server |
| Profile | m\_zip | \_experience.analytics.customDimensions.postalCode |
| Custom | post\_evar1 - post\_evar250 | \_experience.analytics.customDimensions.eVars.eVar1 - \_experience.analytics.customDimensions.eVars.eVar250 |
| Custom | post\_prop1 - post\_prop75 | \_experience.analytics.customDimensions.props.prop1 - \_experience.analytics.customDimensions.props.prop75 |
| Custom | post\_prop1 - post\_prop75 | \_experience.analytics.customDimensions.listprops.prop1 - \_experience.analytics.customDimensions.listprops.prop75 | value[].items <br> delimiter |
| Custom | post\_hier1 | \_experience.analytics.customDimensions.hierarchies.hier1 | value[].items <br> delimiter |
| Custom | post\_hier2 | \_experience.analytics.customDimensions.hierarchies.hier2 | value[].items <br> delimiter |
| Custom | post\_hier3 | \_experience.analytics.customDimensions.hierarchies.hier3 | value[].items <br> delimiter |
| Custom | post\_hier4 | \_experience.analytics.customDimensions.hierarchies.hier4 | value[].items <br> delimiter |
| Custom | post\_hier5 | \_experience.analytics.customDimensions.hierarchies.hier5 | value[].items <br> delimiter |
| Custom | post\_mvvar1 | \_experience.analytics.customDimensions.lists.list1 | list[].items.key <br> list[].items.value |
| Custom | post\_mvvar2 | \_experience.analytics.customDimensions.lists.list2 | list[].items.key <br> list[].items.value |
| Custom | post\_mvvar3 | \_experience.analytics.customDimensions.lists.list3 | list[].items.key <br> list[].items.value |
| Tech | post\_browser\_height | environment.browserDetails.viewportHeight |
| Tech | post\_browser\_width | environment.browserDetails.viewportWidth |
| Experience | post\_campaign | marketing.trackingCode |
| Web | post\_channel | web.webPageDetails.siteSection |
| Tech | post\_cookies | environment.browserDetails.cookiesEnabled |
| Commerce | post\_currency | commerce.order.currencyCode |
| Core | post\_cust\_hit\_time\_gmt | timestamp |
| Profile | post\_cust\_visid | endUserIDs.\_experience.aacustomid.id |
| Custom | post\_event\_list | commerce.checkouts <br><br> commerce.productListAdds <br><br> commerce.productListOpens <br><br> commerce.productListRemovals <br><br> commerce.productListReopens <br><br> commerce.productListViews <br><br> commerce.productViews <br><br> commerce.purchases <br><br> \_experience.analytics.event1to100.event1 - \_experience.analytics.event1to100.event100 <br><br> \_experience.analytics.event101to200.event1 - \_experience.analytics.event101to200.event100 <br><br> \_experience.analytics.event201to300.event1 - \_experience.analytics.event201to300.event100 <br><br> \_experience.analytics.event301to400.event1 - \_experience.analytics.event301to400.event100 <br><br> \_experience.analytics.event401to500.event1 - \_experience.analytics.event401to500.event100 <br><br> \_experience.analytics.event501to600.event1 - \_experience.analytics.event501to600.event100 <br><br> \_experience.analytics.event601to700.event1 - \_experience.analytics.event601to700.event100 <br><br> \_experience.analytics.event701to800.event1 - \_experience.analytics.event701to800.event100 <br><br> \_experience.analytics.event801to900.event1 - \_experience.analytics.event801to900.event100 <br><br> \_experience.analytics.event901to1000.event1 - \_experience.analytics.event901to1000.event100 | \_type <br> id <br> value <br> unit |
| Web | post\_first\_hit\_page\_url | \_experience.analytics.endUser.firstWeb.webPageDetails.URL |
| Web | post\_first\_hit\_pagename | \_experience.analytics.endUser.firstWeb.webPageDetails.name |
| Tech | post\_java\_enabled | environment.browserDetails.javaEnabled |
| Search | post\_keywords | search.keywords |
| Profile | post\_latitude | placeContext.geo.\_schema.latitude |
| Profile | post\_longitude | placeContext.geo.\_schema.longitude |
| Web | post\_page\_event | web.webInteraction.type |
| Web | post\_page\_event\_var1 | web.webInteraction.URL |
| Web | post\_page\_event\_var2 | web.webInteraction.name |
| Web | post\_page\_type | web.webPageDetails.isErrorPage |
| Web | post\_page\_url | web.webPageDetails.URL |
| Web | post\_pagename\_no\_url | web.webPageDetails.name |
| Web | post\_pagename\_no\_url | web.webPageDetails.pageViews.value |
| Commerce | post\_product\_list | productListItems[] |
| Commerce | post\_purchaseid | commerce.order.purchaseID |
| Web | post\_referrer | web.webReferrer.URL |
| Search | post\_search\_engine | search.searchEngine |
| Profile | post\_state | \_experience.analytics.customDimensions.stateProvince |
| Web | post\_user\_server | web.webPageDetails.server |
| Profile | post\_visid\_high | endUserIDs.\_experience.aaid.id |
| Profile | post\_visid\_high | endUserIDs.\_experience.aaid.primary |
| Profile | post\_visid\_high | endUserIDs.\_experience.aaid.namespace.code |
| Profile | post\_visid\_low | endUserIDs.\_experience.aaid.id |
| Profile | post\_zip | \_experience.analytics.customDimensions.postalCode |
| Tech | accept\_language | environment.browserDetails.acceptLanguage |
| Tech | browser | \_experience.analytics.environment.browserID |
| Tech | color | device.colorDepth |
| Commerce | currency | commerce.order.currencyCode |
| Web | first\_hit\_ref\_type | \_experience.analytics.endUser.firstWeb.webReferrer.type |
| Web | first\_hit\_referrer | \_experience.analytics.endUser.firstWeb.webReferrer.URL |
| Core | first\_hit\_time\_gmt | \_experience.analytics.endUser.firstTimestamp |
| Profile | geo\_city | placeContext.geo.city |
| Profile | geo\_country | placeContext.geo.countryCode |
| Profile | geo\_dma | placeContext.geo.dmaID |
| Profile | geo\_latitude | placeContext.geo.\_schema.latitude |
| Profile | geo\_longitude | placeContext.geo.\_schema.longitude |
| Profile | geo\_region | placeContext.geo.stateProvince |
| Profile | geo\_zip | placeContext.geo.postalCode |
| Core | hit\_time\_gmt | receivedTimestamp |
| Core | hitid\_high | id |
| Core | hitid\_low | id |
| Web | homepage | web.webPageDetails.isHomePage |
| Core | ip | environment.ipV4 |
| Core | ipv6 | environment.ipV6 |
| Tech | j\_jscript | environment.browserDetails.javaScriptVersion |
| Tech | j\_jscript | environment.browserDetails.javaScriptEnabled |
| Tech | java\_enabled | environment.browserDetails.javaEnabled |
| Profile | mcvisid\_high | endUserIDs.\_experience.mcid.id |
| Profile | mcvisid\_high | endUserIDs.\_experience.mcid.primary |
| Profile | mcvisid\_high | endUserIDs.\_experience.mcid.namespace.code |
| Profile | mcvisid\_low | endUserIDs.\_experience.mcId.id |
| Tech | mobile\_id | device.typeID |
| Tech | mobile\_id | device.typeIDService |
| Tech | os | \_experience.analytics.environment.operatingSystemID |
| Web | page\_event | web.webInteraction.type |
| Search | paid\_search | search.isPaid |
| Web | ref\_type | web.webReferrer.type |
| Web | referrer | web.webReferrer.URL |
| Tech | s\_resolution | device.screenWidth |
| Tech | s\_resolution | device.screenHeight |
| Search | search\_engine | search.searchEngine |
| Search | search\_page\_num | search.pageDepth |
| Tech | user\_agent | environment.browserDetails.userAgent |
| Web | user\_server | web.webPageDetails.server |
| Core | visit\_num | \_experience.analytics.session.num |
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
| Content Aware - Video | videoad | advertising.adAssetReference.\_id |
| Content Aware - Video | videocontenttype | media.mediaTimed.primaryAssetViewDetails.broadcastContentType |
| Content Aware - Video | videoadinpod | advertising.adAssetViewDetails.index |
| Content Aware - Video | videoplayername | media.mediaTimed.primaryAssetViewDetails.playerName |
| Content Aware - Video | videochannel | media.mediaTimed.primaryAssetViewDetails.broadcastChannel |
| Content Aware - Video | videoadplayername | advertising.adAssetViewDetails.playerName |
| Content Aware - Video | videochapter | media.mediaTimed.mediaChapter.chapterAssetReference.\_id |
| Content Aware - Video | videochapter | media.mediaTimed.mediaChapter.chapterAssetReference.\_xmpDM.duration |
| Content Aware - Video | videoname | media.mediaTimed.primaryAssetReference.\_dc.title |
| Content Aware - Video | videolength | media.mediaTimed.primaryAssetReference.\_xmpDM.duration |
| Content Aware - Video | videoadname | advertising.adAssetReference.\_dc.title |
| Content Aware - Video | videoadlength | advertising.adAssetReference.\_xmpDM.duration |
| Content Aware - Video | videoshow | media.mediaTimed.primaryAssetReference.\_iptc4xmpExt.Series.\_iptc4xmpExt.Name |
| Content Aware - Video | videoseason | media.mediaTimed.primaryAssetReference.\_iptc4xmpExt.Season.\_iptc4xmpExt.Name |
| Content Aware - Video | videoepisode | media.mediaTimed.primaryAssetReference.\_iptc4xmpExt.Episode.\_iptc4xmpExt.Name |
| Content Aware - Video | videonetwork | media.mediaTimed.primaryAssetViewDetails.broadcastNetwork |
| Content Aware - Video | videoshowtype | media.mediaTimed.primaryAssetReference.showType |
| Content Aware - Video | videoadload | media.mediaTimed.primaryAssetViewDetails.adLoadType |
| Content Aware - Video | videofeedtype | media.mediaTimed.primaryAssetViewDetails.sourceFeed |
| Content Aware - Mobile App | mobilebeaconmajor | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.beaconMajor |
| Content Aware - Mobile App | mobilebeaconminor | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.beaconMinor |
| Content Aware - Mobile App | mobilebeaconuuid | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.proximityUUID |
| Content Aware - Video | videosessionid | media.mediaTimed.primaryAssetViewDetails.\_id |
| Content Aware - Video | videogenre | media.mediaTimed.primaryAssetReference.\_iptc4xmpExt.Genre |
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
