# Direct Mapping Fields

These fields are directly mapped as is from Analytics to Experience Data Model (XDM).

## Midvalues Datasets

These fields are used to populate fields in the midvalues dataset. Midvalues data has data processing applied, but no attribution.

Midvalue fields start with the prefix `m_`.

Analytics Field | XDM Field | XDM Type | DataSet | Properties 
--------------- | --------- | -------- | ------- | ----------
m_evar1 - m_evar250 | _experience.analytics.customDimensions.eVars.eVar1 - _experience.analytics.customDimensions.eVars.eVar250 | string | mid | {}
m_prop1 - m_prop75 | _experience.analytics.customDimensions.props.prop1 - _experience.analytics.customDimensions.props.prop75 | string | mid | {}
m_browser | _experience.analytics.environment.browserID	| integer | mid | {}
m_browser_height | environment.browserDetails.viewportHeight | integer | mid | {}
m_browser_width | environment.browserDetails.viewportWidth | integer | mid | {}
m_campaign | marketing.trackingCode | string | mid | {}
m_channel | web.webPageDetails.siteSection | string | mid | {}
m_domain | environment.domain | string | mid | {}
m_geo_city | placeContext.geo.city | string | mid | {}
m_geo_dma | placeContext.geo.dmaID | integer | mid | {}
m_geo_region | placeContext.geo.stateProvince | string | mid | {}
m_geo_zip | placeContext.geo.postalCode | string | mid | {}
m_keywords | search.keywords | string | mid | {}
m_mobile_id | device.typeID | string | mid | {}
m_os | _experience.analytics.environment.operatingSystemID | integer | mid | {}
m_page_url | web.webPageDetails.URL | string | mid | {}
m_pagename_no_url | web.webPageDetails.name | string | mid | {}
m_referrer | web.webReferrer.URL | string | mid | {}
m_search_age_num | search.pageDepth | integer | mid | {}
m_state | _experience.analytics.customDimensions.stateProvince | string | mid | {}
m_user_server | web.webPageDetails.server | string | mid | {}
m_zip | _experience.analytics.customDimensions.postalCode | string | mid | {}

## Postvalues Datasets

These fields are used to populate fields in the postvalues dataset. Postvalues data has additional processing applied, including attribution and visit based fields.

Postvalue fields start with the prefix `post_`.

Analytics Field | XDM Field | XDM Type | DataSet | Properties 
--------------- | --------- | -------- | ------- | ----------
post_evar1 - post_evar250 | _experience.analytics.customDimensions.eVars.eVar1 - _experience.analytics.customDimensions.eVars.eVar250 | string | post | {}
post_prop1 - post_prop75 | _experience.analytics.customDimensions.props.prop1 - _experience.analytics.customDimensions.props.prop75	| string | post | {}
post_browser_height | environment.browserDetails.viewportHeight	| integer | post | {}
post_browser_width | environment.browserDetails.viewportWidth | integer | post | {}
post_campaign | marketing.trackingCode | string | post | {}
post_channel | web.webPageDetails.siteSection | string | post | {}
post_cust_visid | endUserIDs._experience.aacustomid.id | string | mid,post |  {}
post_first_hit_page_url | _experience.analytics.endUser.firstWeb.webPageDetails.URL	| string | post | {}
post_first_hit_pagename	| _experience.analytics.endUser.firstWeb.webPageDetails.name | string | post | {}
post_keywords | search.keywords | string | post | {}
post_page_url | web.webPageDetails.URL | string | post | {}
post_pagename_no_url | web.webPageDetails.name | string | post | {}
post_purchaseid | commerce.order.purchaseID | string | mid,post | {}
post_referrer | web.webReferrer.URL | string | post | {}
post_state | _experience.analytics.customDimensions.stateProvince | string | post | {}
post_user_server | web.webPageDetails.server | string | post | {}
post_zip | 	_experience.analytics.customDimensions.postalCode | string | post | {}

## Split Mapping

These fields have a single source and map to **multiple** XDM locations.

Analytics Field | XDM Field | XDM Type | DataSet | Properties
--------------- | --------- | -------- | ------- | ----------
s_resolution | device.screenWidth, device.screenHeight | integer | mid,post | []
mobileosversion | environment.operatingSystem, environment.opersatingSystemVersion | string | mid,post | []
videoadlength | advertising.adAssetReference._xmpDM.duration | integer | mid,post | []

## Other Values

Analytics Field | XDM Field | XDM Type | DataSet | Properties 
--------------- | --------- | -------- | ------- | ----------
accept_language | environment.browserDetails.acceptLanguage | string | mid,post | {}
browser | _experience.analytics.environment.browserID | integer | post | {} 
domain | environment.domain | string | post | {} 
first_hit_referrer | _experience.analytics.endUser.firstWeb.webReferrer.URL | string | post | {} 
geo_city | placeContext.geo.city | string | post | {} 
geo_dma | placeContext.geo.dmaID | integer | post | {} 
geo_region | placeContext.geo.stateProvince | string | post | {} 
geo_zip | placeContext.geo.postalCode | string | post | {} 
ipv6 | environment.ipV6 | string | mid,post | {} 
j_jscript | environment.browserDetails.javaScriptVersion | string | mid,post | {} 
os | _experience.analytics.environment.operatingSystemID | integer | post | {} 
search_page_num | search.pageDepth | integer | post | {} 
user_agent | environment.browserDetails.userAgent | string | mid,post | {} 
visit_keywords | _experience.analytics.session.search.keywords | string | post | {} 
visit_num | _experience.analytics.session.num | integer | post | {} 
visit_page_num | _experience.analytics.session.depth | integer | post | {} 
visit_referrer | _experience.analytics.session.web.webReferrer.URL | string | post | {} 
visit_search_page_num | _experience.analytics.session.search.pageDepth | integer | post | {} 
mobileappid | application.name | string | mid,post | {} 
mobiledevice | device.model | string | mid,post | {} 
pointofinterest | placeContext.POIinteraction.POIDetail.name | string | mid,post | {} 
pointofinterestdistance | placeContext.POIinteraction.POIDetail.geoInteractionDetails.distanceToCenter | number | mid,post | {} 
mobileplaceaccuracy | placeContext.POIinteraction.POIDetail.geoInteractionDetails.deviceGeoAccuracy | number | mid,post | {} 
mobileplacecategory | placeContext.POIinteraction.POIDetail.category | string | mid,post | {} 
mobileplaceid | placeContext.POIinteraction.POIDetail.POIID | string | mid,post | {} 
video | media.mediaTimed.primaryAssetReference._id | string | mid,post | {} 
videoad | advertising.adAssetReference._id | string | mid,post | {} 
videocontenttype | media.mediaTimed.primaryAssetViewDetails.broadcastContentType | string | mid,post | {} 
videoadpod | advertising.adAssetViewDetails.adBreak._id | string | mid,post | {} 
videoadinpod | advertising.adAssetViewDetails.index | integer | mid,post | {} 
videoplayername | media.mediaTimed.primaryAssetViewDetails.playerName | string | mid,post | {} 
videochannel | media.mediaTimed.primaryAssetViewDetails.broadcastChannel | string | mid,post | {} 
videoadplayername | advertising.adAssetViewDetails.playerName | string | mid,post | {} 
videochapter | media.mediaTimed.mediaChapter.chapterAssetReference._id | string | mid,post | {} 
videoname | media.mediaTimed.primaryAssetReference._dc.title | string | mid,post | {} 
videoadname | advertising.adAssetReference._dc.title | string | mid,post | {} 
videoshow | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Series._iptc4xmpExt.Name | string | mid,post | {} 
videoseason | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Season._iptc4xmpExt.Name | string | mid,post | {} 
videoepisode | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Episode._iptc4xmpExt.Name | string | mid,post | {} 
videonetwork | media.mediaTimed.primaryAssetViewDetails.broadcastNetwork | string | mid,post | {} 
videoshowtype | media.mediaTimed.primaryAssetReference.showType | string | mid,post | {} 
videoadload | media.mediaTimed.primaryAssetViewDetails.adLoadType | string | mid,post | {} 
videofeedtype | media.mediaTimed.primaryAssetViewDetails.sourceFeed | string | mid,post | {} 
mobilebeaconmajor | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.beaconMajor | number | mid,post | {} 
mobilebeaconminor | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.beaconMinor | number | mid,post | {} 
mobilebeaconuuid | placeContext.POIinteraction.POIDetail.beaconInteractionDetails.proximityUUID | string | mid,post | {} 
videosessionid | media.mediaTimed.primaryAssetViewDetails._id | string | mid,post | {} 
videogenre | media.mediaTimed.primaryAssetReference._iptc4xmpExt.Genre | array | mid,post | {title (Object), description (Object), type (Object), meta:xdmType (Object), items (string), meta:xdmField (Object)} 
mobileinstalls | application.firstLaunches | Object | mid,post | {id (string), value (number)} 
mobileupgrades | application.upgrades | Object | mid,post | {id (string), value (number)} 
mobilelaunches | application.launches | Object | mid,post | {id (string), value (number)} 
mobilecrashes | application.crashes | Object | mid,post | {id (string), value (number)} 
mobilemessageclicks | directMarketing.clicks | Object | mid,post | {id (string), value (number)} 
mobileplaceentry | placeContext.POIinteraction.poiEntries | Object | mid,post | {id (string), value (number)} 
mobileplaceexit | placeContext.POIinteraction.poiExits | Object | mid,post | {id (string), value (number)} 
videotime | media.mediaTimed.timePlayed | Object | mid,post | {id (string), value (number)} 
videostart | media.mediaTimed.impressions | Object | mid,post | {id (string), value (number)} 
videocomplete | media.mediaTimed.completes | Object | mid,post | {id (string), value (number)} 
videosegmentviews | media.mediaTimed.mediaSegmentViews | Object | mid,post | {id (string), value (number)} 
videoadstart | advertising.impressions | Object | mid,post | {id (string), value (number)} 
videoadcomplete | advertising.completes | Object | mid,post | {id (string), value (number)} 
videoadtime | advertising.timePlayed | Object | mid,post | {id (string), value (number)} 
videochapterstart | media.mediaTimed.mediaChapter.impressions | Object | mid,post | {id (string), value (number)} 
videochaptercomplete | media.mediaTimed.mediaChapter.completes | Object | mid,post | {id (string), value (number)} 
videochaptertime | media.mediaTimed.mediaChapter.timePlayed | Object | mid,post | {id (string), value (number)} 
videoplay | media.mediaTimed.starts | Object | mid,post | {id (string), value (number)} 
videototaltime | media.mediaTimed.totalTimePlayed | Object | mid,post | {id (string), value (number)} 
videoqoetimetostart | media.mediaTimed.primaryAssetViewDetails.qoe.timeToStart | Object | mid,post | {id (string), value (number)} 
videoqoedropbeforestart | media.mediaTimed.dropBeforeStarts | Object | mid,post | {id (string), value (number)} 
videoqoebuffercount | media.mediaTimed.primaryAssetViewDetails.qoe.buffers | Object | mid,post | {id (string), value (number)} 
videoqoebuffertime | media.mediaTimed.primaryAssetViewDetails.qoe.bufferTime | Object | mid,post | {id (string), value (number)} 
videoqoebitratechangecount | media.mediaTimed.primaryAssetViewDetails.qoe.bitrateChanges | Object | mid,post | {id (string), value (number)} 
videoqoebitrateaverage | media.mediaTimed.primaryAssetViewDetails.qoe.bitrateAverage | Object | mid,post | {id (string), value (number)} 
videoqoeerrorcount | media.mediaTimed.primaryAssetViewDetails.qoe.errors | Object | mid,post | {id (string), value (number)} 
videoqoedroppedframecount | media.mediaTimed.primaryAssetViewDetails.qoe.droppedFrames | Object | mid,post | {id (string), value (number)} 
videoprogress10 | media.mediaTimed.progress10 | Object | mid,post | {id (string), value (number)} 
videoprogress25 | media.mediaTimed.progress25 | Object | mid,post | {id (string), value (number)} 
videoprogress50 | media.mediaTimed.progress50 | Object | mid,post | {id (string), value (number)} 
videoprogress75 | media.mediaTimed.progress75 | Object | mid,post | {id (string), value (number)} 
videoprogress95 | media.mediaTimed.progress95 | Object | mid,post | {id (string), value (number)} 
videoresume | media.mediaTimed.resumes | Object | mid,post | {id (string), value (number)} 
videopausecount | media.mediaTimed.pauses | Object | mid,post | {id (string), value (number)} 
videopausetime | media.mediaTimed.pauseTime | Object | mid,post | {id (string), value (number)} 
videosecondssincelastcall | media.mediaTimed.primaryAssetViewDetails.sessionTimeout | integer | mid,post | {} 